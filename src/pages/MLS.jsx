import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import { fetchMLSAll } from '../services/propertyService'
import { Search, SlidersHorizontal, X, Bed, Bath, Hash } from 'lucide-react'

const MLS = () => {
  const [activeTab, setActiveTab] = useState('all') 
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000 })
  const [beds, setBeds] = useState('any')
  const [baths, setBaths] = useState('any')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)

  const normalizeProperty = (p) => {
    return {
      id: p.card_id,
      title: p.Name,
      price: p.ui_price,
      rawPrice: Number(p.CurrentPrice || 0),
      location: `${p.address_line1}, ${p.City}`,
      image: p.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      beds: p.BedsTotal || p.StandardFields?.BedsTotal || '0',
      baths: p.BathsTotal || p.StandardFields?.BathsTotal || '0',
      sqft: p.LivingArea || p.BuildingAreaTotal || p.StandardFields?.LivingArea || 'N/A',
      type: p.PropertyType || p.StandardFields?.PropertyType, 
      status: p.MlsStatus || p.status,
      slug: p.card_id,
      externalLink: p.href,
      source: 'mls'
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const mlsRaw = await fetchMLSAll()
        // Filter out commercial and SOLD listings from MLS
        const filteredRaw = mlsRaw.filter(p => {
          const type = (p.PropertyType || p.StandardFields?.PropertyType || p.type || '').toLowerCase();
          const status = (p.MlsStatus || p.status || '').toLowerCase();
          const listType = (p.listing_type || '').toLowerCase();
          
          const isCommercial = type.includes('commercial') || type.includes('comm');
          const isSold = status === 'closed' || status === 'sold' || listType === 'sold';
          
          return !isCommercial && !isSold;
        });
        const normalized = filteredRaw.map(normalizeProperty)
        setProperties(normalized)
        setFilteredProperties(normalized)
      } catch (error) {
        console.error("Failed to load MLS properties:", error)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    let result = properties
    
    // Tab Filtering
    if (activeTab === 'residential') {
      result = result.filter(p => {
        const type = p.type?.toLowerCase() || '';
        return type.includes('residential') || type.includes('res') || type.includes('condo');
      })
    } else if (activeTab === 'land') {
      result = result.filter(p => {
        const type = p.type?.toLowerCase() || '';
        return type.includes('land');
      })
    }

    // Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q)
      )
    }

    // Price Filter
    result = result.filter(p => p.rawPrice >= priceRange.min && p.rawPrice <= priceRange.max)

    // Beds Filter
    if (beds !== 'any') {
      result = result.filter(p => Number(p.beds) >= Number(beds))
    }

    // Baths Filter
    if (baths !== 'any') {
      result = result.filter(p => Number(p.baths) >= (Number(baths) || 0))
    }

    setFilteredProperties(result)
  }, [activeTab, searchQuery, priceRange, beds, baths, properties])

  const tabs = [
    { id: 'all', label: 'All Active' },
    { id: 'residential', label: 'Residential' },
    { id: 'land', label: 'Land' }
  ]

  return (
    <div className="bg-surface min-h-screen">
      <Navbar isTransparent={false} />
      
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="text-[50vw] md:text-[30vw] font-heading absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 leading-none select-none italic">MLS</div>
        </div>
        <div className="max-w-[1500px] mx-auto relative z-10">
          <motion.h4 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-[10px] md:text-[12px] font-luxury-caps mb-4 md:mb-6 tracking-[0.3em] md:tracking-[0.5em]">Island-wide Search</motion.h4>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl lg:text-9xl font-heading tracking-tighter leading-none uppercase">GLOBAL MLS</motion.h1>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y border-black/5 py-6 px-6 shadow-xl">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setDisplayCount(12); }} className={`text-[11px] font-luxury-caps transition-all relative py-2 whitespace-nowrap ${activeTab === tab.id ? 'text-primary' : 'text-primary/40 hover:text-primary/60'}`}>
                {tab.label}
                {activeTab === tab.id && <motion.div layoutId="activeTabMLS" className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative flex-grow md:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
              <input type="text" placeholder="Search MLS#, location..." className="w-full pl-12 pr-6 py-3 bg-surface border-none text-[12px] font-medium focus:ring-1 focus:ring-accent transition-all rounded-sm shadow-inner" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-3 px-6 py-3 border border-black/5 hover:bg-black hover:text-white transition-all text-[11px] font-luxury-caps bg-white shadow-lg group">
              <SlidersHorizontal className="w-4 h-4 group-hover:rotate-180 transition-transform" /> Island Filters
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1500px] mx-auto">
          {loading ? (
            <div className="h-[400px] flex items-center justify-center"><div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
              {filteredProperties.slice(0, displayCount).map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-40 border-2 border-dashed border-black/5 rounded-sm shadow-inner"><p className="text-2xl font-heading italic text-primary/40">No MLS listings found matching your search.</p></div>
          )}
          
          {filteredProperties.length > displayCount && (
            <div className="mt-32 text-center">
              <button onClick={() => setDisplayCount(prev => prev + 12)} className="px-16 py-6 border-2 border-primary/10 text-[11px] font-luxury-caps hover:bg-primary hover:text-white transition-all tracking-widest shadow-2xl">
                LOAD MORE MLS PROPERTIES ({filteredProperties.length - displayCount} REMAINING)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Sidebar with Depth */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterOpen(false)} className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[110] p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-y-auto border-l-8 border-accent">
              <div className="flex justify-between items-center mb-16">
                <div className="space-y-2">
                  <h2 className="text-4xl font-heading italic uppercase tracking-tighter">MLS Filters</h2>
                  <div className="h-0.5 w-20 bg-accent" />
                </div>
                <X className="w-8 h-8 cursor-pointer hover:text-accent transition-all hover:rotate-90" onClick={() => setIsFilterOpen(false)} />
              </div>

              <div className="space-y-16">
                 {/* Price Section */}
                 <div className="p-8 bg-surface rounded-sm shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)] space-y-8">
                   <h4 className="text-[11px] font-luxury-caps text-accent flex items-center gap-3">
                     <Hash className="w-3 h-3" /> Price Budget
                   </h4>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Min ($)</label>
                        <input type="number" className="w-full bg-white p-4 text-sm font-medium border border-black/5 outline-none focus:ring-1 focus:ring-accent shadow-sm" value={priceRange.min} onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Max ($)</label>
                        <input type="number" className="w-full bg-white p-4 text-sm font-medium border border-black/5 outline-none focus:ring-1 focus:ring-accent shadow-sm" value={priceRange.max} onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))} />
                      </div>
                   </div>
                </div>

                {/* Rooms Section */}
                <div className="grid grid-cols-1 gap-8">
                   <div className="p-8 bg-surface rounded-sm shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)] space-y-6">
                      <h4 className="text-[11px] font-luxury-caps text-accent flex items-center gap-3">
                        <Bed className="w-4 h-4" /> Min Bedrooms
                      </h4>
                      <div className="flex gap-4 flex-wrap">
                        {['any', '1', '2', '3', '4', '5+'].map(num => (
                          <button 
                            key={num} 
                            onClick={() => setBeds(num)}
                            className={`px-5 py-3 text-[10px] font-bold border transition-all ${beds === num ? 'bg-primary text-white border-primary shadow-xl scale-110' : 'bg-white text-primary/40 border-black/5 hover:border-accent'}`}
                          >
                            {num.toUpperCase()}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div className="p-8 bg-surface rounded-sm shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)] space-y-6">
                      <h4 className="text-[11px] font-luxury-caps text-accent flex items-center gap-3">
                        <Bath className="w-4 h-4" /> Min Bathrooms
                      </h4>
                      <div className="flex gap-4 flex-wrap">
                        {['any', '1', '2', '3', '4+'].map(num => (
                          <button 
                            key={num} 
                            onClick={() => setBaths(num)}
                            className={`px-5 py-3 text-[10px] font-bold border transition-all ${baths === num ? 'bg-primary text-white border-primary shadow-xl scale-110' : 'bg-white text-primary/40 border-black/5 hover:border-accent'}`}
                          >
                            {num.toUpperCase()}
                          </button>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-24 pt-10 border-t border-black/5">
                <button 
                  onClick={() => setIsFilterOpen(false)} 
                  className="w-full py-7 bg-primary text-white text-[11px] font-luxury-caps hover:bg-black transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] tracking-[0.3em] font-black"
                >
                  Show {filteredProperties.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default MLS
