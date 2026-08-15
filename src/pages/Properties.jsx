import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import { fetchInternalProperties } from '../services/propertyService'
import { Search, SlidersHorizontal, X, Bed, Bath, Hash, LayoutGrid, List } from 'lucide-react'

const Properties = () => {
  const [activeTab, setActiveTab] = useState('all') 
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000000 })
  const [beds, setBeds] = useState('any')
  const [baths, setBaths] = useState('any')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const normalizeProperty = (p) => {
    const rawType = (p.property_type || p.type || p.PropertyType || '').toString().trim();
    const rawSub = (p.subcategory || p.SubCategory || p.category || (rawType.toLowerCase().includes('land') ? 'Land' : 'Residential')).toString().trim();
    
    // Capitalize for clean display heading
    const displaySubcategory = rawSub
      ? rawSub.charAt(0).toUpperCase() + rawSub.slice(1)
      : 'Other';

    return {
      id: p.id,
      title: p.title,
      price: `$${Number(p.price).toLocaleString()}`,
      rawPrice: Number(p.price),
      location: p.address,
      image: p.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      beds: p.beds || '0',
      baths: p.baths || '0',
      sqft: p.square_feet || 'N/A',
      type: rawType.toLowerCase(),
      displayType: rawType || 'Property',
      subcategory: displaySubcategory,
      rawSubcategory: rawSub.toLowerCase(),
      status: p.listing_type || p.status || 'Active',
      slug: p.slug,
      source: 'internal'
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const internalRaw = await fetchInternalProperties()
        // Filter out commercial (case-insensitive & trim)
        const filteredRaw = internalRaw.filter(p => {
          const type = (p.property_type || p.type || p.PropertyType || '').toString().toLowerCase().trim();
          return !type.includes('commercial');
        })
        const normalized = filteredRaw.map(normalizeProperty)
        setProperties(normalized)
      } catch (error) {
        console.error("Failed to load properties:", error)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  // Derived filtered results
  const getFilteredProperties = () => {
    let result = properties
    
    // Tab Filtering
    if (activeTab === 'sold') {
      result = result.filter(p => (p.status || '').toString().toLowerCase().trim() === 'sold')
    } else {
      // Exclude Sold from other tabs
      result = result.filter(p => (p.status || '').toString().toLowerCase().trim() !== 'sold')
      
      if (activeTab === 'residential') {
        result = result.filter(p => {
          const type = (p.type || '').toLowerCase().trim();
          const sub = (p.rawSubcategory || '').toLowerCase().trim();
          return type.includes('residential') || 
                 type.includes('res') ||
                 type.includes('house') || 
                 type.includes('villa') || 
                 type.includes('cottage') || 
                 type.includes('combo') ||
                 type.includes('home') ||
                 type.includes('condo') ||
                 type.includes('dwelling') ||
                 type.includes('estate') ||
                 sub.includes('residential') ||
                 sub.includes('villa') ||
                 sub.includes('home') ||
                 sub.includes('condo') ||
                 (!type.includes('land') && !sub.includes('land'));
        })
      } else if (activeTab === 'land') {
        result = result.filter(p => {
          const type = (p.type || '').toLowerCase().trim();
          const sub = (p.rawSubcategory || '').toLowerCase().trim();
          return type === 'land' || 
                 type.includes('land') || 
                 type.includes('lot') || 
                 type.includes('parcel') || 
                 type.includes('acre') ||
                 sub.includes('land') ||
                 sub.includes('lot');
        })
      }
    }

    // Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(p => 
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.type?.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q)
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
      result = result.filter(p => Number(p.baths) >= Number(baths))
    }

    return result
  }

  const filtered = getFilteredProperties()

  // Group by subcategory
  const grouped = filtered.reduce((acc, prop) => {
    const sub = prop.subcategory;
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(prop);
    return acc;
  }, {});

  const tabs = [
    { id: 'all', label: 'All Exclusives' },
    { id: 'residential', label: 'Residential' },
    { id: 'land', label: 'Land' },
    { id: 'sold', label: 'Recently Sold' }
  ]

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <Navbar isTransparent={false} />
      
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent)] pointer-events-none" />
        <div className="absolute -right-5 md:-right-20 -bottom-10 md:-bottom-20 opacity-5 pointer-events-none overflow-hidden container">
           <div className="text-[60vw] md:text-[40vw] font-heading leading-none select-none italic whitespace-nowrap overflow-hidden">EXTRACT</div>
        </div>
        <div className="max-w-[1500px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="h-px w-8 md:w-12 bg-accent" />
            <h4 className="text-accent text-[10px] md:text-[12px] font-luxury-caps tracking-[0.3em] md:tracking-[0.5em]">The Extraction Collection</h4>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl xs:text-5xl md:text-7xl lg:text-[10rem] font-heading tracking-tighter leading-[0.9] md:leading-[0.85] uppercase break-words">340<br/>PRIVATE</motion.h1>
        </div>
      </section>

      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-2xl border-b border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1500px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-10 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`text-[12px] font-luxury-caps transition-all relative py-2 whitespace-nowrap tracking-[0.2em] font-bold ${activeTab === tab.id ? 'text-primary' : 'text-primary/30 hover:text-primary/60'}`}>
                {tab.label}
                {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative flex-grow md:min-w-[350px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
              <input type="text" placeholder="Search the collection..." className="w-full pl-14 pr-6 py-4 bg-surface-dark border-none text-[13px] font-medium focus:ring-1 focus:ring-accent transition-all rounded-lg shadow-inner" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-4 px-8 py-4 bg-primary text-white hover:bg-black transition-all text-[11px] font-luxury-caps shadow-2xl rounded-lg group">
              <SlidersHorizontal className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Filter
            </button>
          </div>
        </div>
      </div>

      <section className="py-24 px-6 relative">
        <div className="max-w-[1500px] mx-auto space-y-40">
          {loading ? (
            <div className="h-[600px] flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-accent/20 rounded-full" />
                <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin" />
              </div>
            </div>
          ) : Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([subcategory, items], index) => (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                key={subcategory} 
                className="relative"
              >
                 {/* Section Header with massive depth */}
                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-2">
                       <span className="text-accent text-[11px] font-luxury-caps tracking-[0.4em] font-black opacity-60">Category</span>
                       <h2 className="text-5xl md:text-7xl font-heading italic uppercase tracking-tighter text-primary leading-none">{subcategory}</h2>
                    </div>
                    <div className="flex items-center gap-4 text-primary/40">
                       <div className="h-px w-20 bg-primary/10" />
                       <span className="text-[10px] font-luxury-caps tracking-[0.3em] font-bold">{items.length} Exclusive Units Available</span>
                    </div>
                 </div>

                 {/* Visual distinction for the grid area */}
                 <div className="relative">
                    <div className="absolute -inset-10 bg-white/30 blur-3xl rounded-[4rem] -z-10" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-x-16 lg:gap-y-24">
                        {items.map((prop) => (
                          <PropertyCard key={prop.id} {...prop} />
                        ))}
                    </div>
                 </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-60 bg-white/50 backdrop-blur-xl border-2 border-dashed border-black/5 rounded-3xl shadow-inner">
               <div className="max-w-md mx-auto space-y-6">
                  <div className="w-20 h-20 bg-surface-dark rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="w-8 h-8 text-primary/20" />
                  </div>
                  <h3 className="text-3xl font-heading text-primary">No listings found</h3>
                  <p className="text-primary/40 text-[14px] font-medium leading-relaxed">We couldn't find any exclusive properties matching your current filters. Try adjusting your search criteria.</p>
                  <button onClick={() => { setSearchQuery(''); setActiveTab('all'); setPriceRange({ min: 0, max: 20000000 }); }} className="mt-8 text-accent text-[11px] font-luxury-caps border-b border-accent pb-1 hover:text-primary hover:border-primary transition-all">Clear all filters</button>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Filter Sidebar Redesign */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterOpen(false)} className="fixed inset-0 bg-primary/60 backdrop-blur-xl z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#FAF9F6] z-[110] p-16 shadow-[-50px_0_100px_rgba(0,0,0,0.3)] overflow-y-auto">
              <div className="flex justify-between items-center mb-20">
                <div className="space-y-1">
                  <h4 className="text-accent text-[10px] uppercase tracking-[0.4em] font-black">Search Preferences</h4>
                  <h2 className="text-5xl font-heading italic text-primary uppercase leading-none">Filters</h2>
                </div>
                <button onClick={() => setIsFilterOpen(false)} className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-20">
                {/* Price Range */}
                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                     <Hash className="w-4 h-4 text-accent" />
                     <h4 className="text-[12px] font-luxury-caps text-primary tracking-widest font-black">Price Range</h4>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-primary/40 font-bold ml-1">Minimum</label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 text-xs font-bold">$</span>
                          <input type="number" className="w-full bg-white border border-black/5 p-5 pl-10 text-sm font-bold text-primary focus:ring-1 focus:ring-accent rounded-xl shadow-sm" value={priceRange.min} onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-primary/40 font-bold ml-1">Maximum</label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 text-xs font-bold">$</span>
                          <input type="number" className="w-full bg-white border border-black/5 p-5 pl-10 text-sm font-bold text-primary focus:ring-1 focus:ring-accent rounded-xl shadow-sm" value={priceRange.max} onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))} />
                        </div>
                      </div>
                   </div>
                </div>

                {/* Rooms Selection */}
                <div className="grid grid-cols-1 gap-12">
                   <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <Bed className="w-4 h-4 text-accent" />
                        <h4 className="text-[12px] font-luxury-caps text-primary tracking-widest font-black">Minimum Bedrooms</h4>
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        {['any', '1', '2', '3', '4', '5+'].map(num => (
                          <button 
                            key={num} 
                            onClick={() => setBeds(num)}
                            className={`px-8 py-4 text-[11px] font-black rounded-xl transition-all border ${beds === num ? 'bg-primary text-white border-primary shadow-2xl scale-105' : 'bg-white text-primary/40 border-black/5 hover:border-accent'}`}
                          >
                            {num.toUpperCase()}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <Bath className="w-4 h-4 text-accent" />
                        <h4 className="text-[12px] font-luxury-caps text-primary tracking-widest font-black">Minimum Bathrooms</h4>
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        {['any', '1', '2', '3', '4+'].map(num => (
                          <button 
                            key={num} 
                            onClick={() => setBaths(num)}
                            className={`px-8 py-4 text-[11px] font-black rounded-xl transition-all border ${baths === num ? 'bg-primary text-white border-primary shadow-2xl scale-105' : 'bg-white text-primary/40 border-black/5 hover:border-accent'}`}
                          >
                            {num.toUpperCase()}
                          </button>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-32 pt-12 border-t border-black/5">
                <button 
                  onClick={() => setIsFilterOpen(false)} 
                  className="w-full py-8 bg-accent text-white text-[11px] font-luxury-caps hover:bg-primary transition-all shadow-[0_30px_60px_-15px_rgba(197,160,89,0.5)] tracking-[0.4em] font-black rounded-2xl group overflow-hidden relative"
                >
                  <span className="relative z-10">Show {filtered.length} Results</span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <button 
                  onClick={() => { setBeds('any'); setBaths('any'); setPriceRange({ min: 0, max: 20000000 }); }} 
                  className="w-full py-6 mt-4 text-[9px] font-luxury-caps text-primary/40 hover:text-primary tracking-widest transition-colors font-bold"
                >
                  Reset to default
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

export default Properties
