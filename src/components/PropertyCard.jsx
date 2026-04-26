import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Heart, ArrowRight, Maximize2 } from 'lucide-react'

import { useNavigate } from 'react-router-dom'

const PropertyCard = ({ status, image, title, price, location, sqft, beds, baths, details, slug, externalLink }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/property/${slug}`);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative flex flex-col h-full cursor-pointer p-4 rounded-xl transition-all duration-500 hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)]"
      onClick={handleClick}
    >
      {/* Image Container with maximum depth */}
      <div className="relative aspect-[16/11] overflow-hidden mb-8 rounded-lg 
                    shadow-[0_10px_30px_rgba(0,0,0,0.08)] 
                    translate-z-0 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] 
                    group-hover:-translate-y-1 transition-all duration-700 ease-out">
        <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out" alt="" />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-40 group-hover:opacity-60 transition-opacity" />
        
        {status && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 text-[8px] tracking-[0.3em] uppercase font-bold shadow-2xl rounded-full">
              {status}
            </span>
          </div>
        )}
        
        <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2 bg-accent text-white px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl rounded-sm">
            Explore <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex flex-col flex-grow px-2 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-[20px] md:text-[22px] font-heading text-primary leading-[1.1] tracking-tight group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="text-[20px] font-heading text-primary shrink-0 pt-0.5">
              {price}
            </p>
          </div>
          <p className="flex items-center gap-2 text-primary/60 text-[10px] tracking-widest uppercase font-semibold">
            <MapPin className="w-3.5 h-3.5 text-accent" /> {location || 'St. John, USVI'}
          </p>
        </div>
        
        {/* Footer Stats with more contrast and depth */}
        <div className="mt-auto pt-6 border-t border-black/10 flex justify-between items-center group-hover:border-accent/20 transition-colors">
          {details ? (
            <div className="space-y-1">
              <p className="text-[9px] text-accent font-luxury-caps tracking-widest uppercase font-black">Specs</p>
              <p className="text-[12px] font-bold text-primary uppercase">{details}</p>
            </div>
          ) : (
            <div className="flex gap-8">
              {[
                { label: 'Beds', val: beds || '0' },
                { label: 'Baths', val: baths || '0' },
                { label: 'Sq Ft', val: (sqft && sqft !== 'N/A') ? (isNaN(sqft) ? sqft : Number(sqft).toLocaleString()) : null }
              ].filter(stat => stat.val !== null).map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[9px] text-accent font-luxury-caps tracking-widest uppercase font-black">{stat.label}</p>
                  <p className="text-[14px] font-bold text-primary">{stat.val}</p>
                </div>
              ))}
            </div>
          )}
          <Maximize2 className="w-4 h-4 text-primary/10 group-hover:text-accent transition-colors hidden md:block" />
        </div>
      </div>

      {/* Background Depth layer */}
      <div className="absolute inset-0 bg-surface-dark/50 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </motion.div>
  )
}

export default PropertyCard
