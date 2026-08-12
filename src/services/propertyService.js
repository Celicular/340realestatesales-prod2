import { useState, useEffect } from 'react';

// Using Vite proxy to bypass CORS
// Defined in vite.config.js
const INTERNAL_BASE_URL = 'https://340realestate.com/api';
const MLS_BASE_URL = 'https://api.340realestate.com';

const fixImageUrl = (url) => {
  if (!url) return null;
  // If it's a relative path from the internal API, point it to the absolute domain
  if (url.startsWith('/api/uploads/')) {
    return `https://340realestate.com${url}`;
  }
  return url;
};

export const fetchMLSAll = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${MLS_BASE_URL}/all${query ? `?${query}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.properties || [];
  } catch (error) {
    console.error('Error fetching MLS data:', error);
    return [];
  }
};

export const fetchInternalProperties = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${INTERNAL_BASE_URL}/properties?${query}`);
    const data = await response.json();

    // Fix image URLs for internal properties
    const properties = (data.properties || []).map(p => ({
      ...p,
      images: (p.images || []).map(fixImageUrl)
    }));

    return properties;
  } catch (error) {
    console.error('Error fetching internal properties:', error);
    return [];
  }
};

export const fetchPropertyBySlug = async (slug) => {
  // 1. Try internal property API first
  try {
    const response = await fetch(`${INTERNAL_BASE_URL}/properties/${slug}`);
    if (response.ok) {
      const data = await response.json();
      if (data.property) {
        const prop = data.property;
        prop.images = (prop.images || []).map(fixImageUrl);
        return { data: prop, source: 'internal' };
      }
    }
  } catch (e) {
    console.warn('Internal property fetch failed, trying MLS...');
  }

  // 2. Try MLS API 
  try {
    const mlsData = await fetchMLSAll();
    const property = mlsData.find(p => p.card_id === slug || p.mls_number?.replace('#', '') === slug);
    if (property) {
      return { data: property, source: 'mls' };
    }
  } catch (e) {
    console.error('MLS property fetch failed:', e);
  }

  return null;
};
