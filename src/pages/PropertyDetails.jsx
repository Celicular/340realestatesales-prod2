import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchPropertyBySlug } from '../services/propertyService'
import { MapPin, Bath, BedDouble, Square, Calendar, Hash, ArrowLeft, Share2, Heart, Mail, Phone, ExternalLink } from 'lucide-react'

const PropertyDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true)
      try {
        const result = await fetchPropertyBySlug(slug)
        if (result) {
          setProperty(result)
        }
      } catch (error) {
        console.error("Error loading property:", error)
      }
      setLoading(false)
    }
    loadProperty()
    window.scrollTo(0, 0)
  }, [slug])

  if (loading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="bg-surface min-h-screen flex flex-col items-center justify-center space-y-8 px-6">
        <h1 className="text-4xl md:text-6xl font-heading italic text-primary/40 uppercase tracking-tighter">Property Not Found</h1>
        <p className="text-primary/60 font-medium">The listing you are looking for may have been moved or sold.</p>
        <button 
          onClick={() => navigate('/properties')}
          className="px-10 py-5 bg-primary text-white text-[11px] font-luxury-caps hover:bg-black transition-all shadow-2xl"
        >
          Return to Collection
        </button>
      </div>
    )
  }

  const data = property.data
  const isMLS = property.source === 'mls'
  const images = data.images || []
  
  // Normalize fields based on source
  const title = isMLS ? data.Name : data.title
  const price = isMLS ? data.ui_price : `$${Number(data.price).toLocaleString()}`
  const location = isMLS ? `${data.address_line1}, ${data.City}` : data.address
  const beds = isMLS ? data.BedsTotal : data.beds
  const baths = isMLS ? data.BathsTotal : data.baths
  const sqft = isMLS 
    ? (data.lot_size_acres ? `${data.lot_size_acres} Acres` : (data.lot_size_sqft ? `${data.lot_size_sqft} SqFt` : 'N/A'))
    : `${data.square_feet || 'N/A'} SqFt`
  
  const mlsNumber = isMLS ? data.mls_number : (data.id ? `#${data.id}` : 'N/A')
  const type = isMLS ? data.PropertyType : data.property_type
  const subcategory = isMLS ? data.PropertyType : data.subcategory

  return (
    <div className="bg-surface min-h-screen pb-40">
      <Navbar />
      
      {/* Gallery Section */}
      <section className="pt-32 px-6 max-w-[1500px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Photo */}
          <div className="lg:w-2/3 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden shadow-2xl rounded-sm group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={images[activeImage] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'} 
                  className="w-full h-full object-cover" 
                  alt={title} 
                />
              </AnimatePresence>
              <div className="absolute top-8 left-8 flex gap-4">
                 <span className="px-5 py-2 bg-accent/90 backdrop-blur-md text-white text-[10px] font-luxury-caps border border-white/20 shadow-lg capitalize">
                   {isMLS ? 'MLS Listing' : 'Exclusive'}
                 </span>
                 <span className="px-5 py-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-luxury-caps border border-white/20 shadow-lg">
                   {data.status || 'Active'}
                 </span>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative shrink-0 w-32 h-20 overflow-hidden rounded-sm transition-all duration-300 ${
                    activeImage === idx ? 'ring-2 ring-accent scale-95 opacity-100' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:w-1/3 space-y-12">
            <div className="space-y-6">
              <motion.button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-3 text-primary/40 hover:text-accent transition-colors text-[10px] font-luxury-caps group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Collection
              </motion.button>
              <h1 className="text-4xl md:text-5xl font-heading tracking-tight leading-tight uppercase text-primary underline-offset-8 decoration-accent/20 decoration-4">{title}</h1>
              <p className="flex items-center gap-3 text-primary/60 text-[13px] tracking-[0.2em] uppercase font-medium">
                <MapPin className="w-4 h-4 text-accent" /> {location}
              </p>
              <p className="text-6xl font-heading text-primary tracking-tighter">{price}</p>
            </div>

            <div className="grid grid-cols-3 gap-6 py-10 border-y border-black/5 bg-white/40 px-6 rounded-sm">
               <div className="text-center space-y-2">
                  <BedDouble className="w-6 h-6 mx-auto text-accent" />
                  <p className="text-[10px] font-luxury-caps text-primary/40">Beds</p>
                  <p className="text-lg font-bold">{beds || '0'}</p>
               </div>
               <div className="text-center space-y-2">
                  <Bath className="w-6 h-6 mx-auto text-accent" />
                  <p className="text-[10px] font-luxury-caps text-primary/40">Baths</p>
                  <p className="text-lg font-bold">{baths || '0'}</p>
               </div>
               <div className="text-center space-y-2">
                  <Square className="w-6 h-6 mx-auto text-accent" />
                  <p className="text-[10px] font-luxury-caps text-primary/40">Size</p>
                  <p className="text-lg font-bold whitespace-nowrap">{sqft}</p>
               </div>
            </div>

            <div className="space-y-6">
              <button className="w-full py-6 bg-primary text-white text-[11px] font-luxury-caps hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-4 group">
                 <Mail className="w-4 h-4 transition-transform group-hover:rotate-12" /> Request Private Showing
              </button>
              <div className="grid grid-cols-2 gap-4">
                 <button className="py-5 border border-black/10 text-[11px] font-luxury-caps hover:bg-surface transition-all flex items-center justify-center gap-3 bg-white">
                    <Share2 className="w-4 h-4" /> Share
                 </button>
                 <button className="py-5 border border-black/10 text-[11px] font-luxury-caps hover:bg-surface transition-all flex items-center justify-center gap-3 bg-white">
                    <Heart className="w-4 h-4" /> Save
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-32 px-6 max-w-[1500px] mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 space-y-16">
               <div className="space-y-8 bg-white p-10 md:p-14 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -mr-16 -mt-16 rounded-full" />
                  <h4 className="text-[11px] font-luxury-caps text-accent tracking-[0.4em]">EXECUTIVE SUMMARY</h4>
                  <div className="relative group">
                    <div 
                      className={`transition-all duration-700 ease-in-out overflow-y-auto scrollbar-thin pr-4 ${
                        isExpanded ? 'max-h-[600px]' : 'max-h-[180px]'
                      }`}
                    >
                      <p className="text-lg md:text-xl font-light leading-loose font-heading italic text-primary/90">
                        {data.description || "Indulge in the epitome of island luxury. This exceptional property offers unparalleled privacy and breathtaking vistas, meticulously designed for the most discerning homeowner."}
                      </p>
                    </div>
                    
                    {(data.description && data.description.length > 300) && (
                      <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-8 text-[11px] font-luxury-caps text-accent font-bold tracking-widest hover:text-primary transition-colors flex items-center gap-3 group"
                      >
                        {isExpanded ? 'COLLAPSE DESCRIPTION' : 'READ FULL DESCRIPTION'}
                        <div className={`w-8 h-[1px] bg-accent group-hover:w-12 transition-all ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                     <h4 className="text-[11px] font-luxury-caps text-accent tracking-[0.4em]">SPECIFICATIONS</h4>
                     <ul className="space-y-6">
                        <li className="flex justify-between items-center border-b border-black/5 pb-4">
                           <span className="text-[10px] font-luxury-caps text-primary/40">MLS Number</span>
                           <span className="text-sm font-bold">{mlsNumber}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-black/5 pb-4">
                           <span className="text-[10px] font-luxury-caps text-primary/40">Property Category</span>
                           <span className="text-sm font-bold capitalize">{subcategory || type || 'Residential'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-black/5 pb-4">
                           <span className="text-[10px] font-luxury-caps text-primary/40">Status</span>
                           <span className="text-sm font-bold text-accent">{data.status || 'Active'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-black/5 pb-4">
                           <span className="text-[10px] font-luxury-caps text-primary/40">Island</span>
                           <span className="text-sm font-bold">St John, USVI</span>
                        </li>
                     </ul>
                  </div>
                  <div className="space-y-8">
                     <h4 className="text-[11px] font-luxury-caps text-accent tracking-[0.4em]">LOCATION DETAIL</h4>
                     <ul className="space-y-6">
                        <li className="flex justify-between items-center border-b border-black/5 pb-4">
                           <span className="text-[10px] font-luxury-caps text-primary/40">City</span>
                           <span className="text-sm font-bold">{data.City || 'St John'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-black/5 pb-4">
                           <span className="text-[10px] font-luxury-caps text-primary/40">State/Province</span>
                           <span className="text-sm font-bold">{data.StateOrProvince || 'VI'}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-black/5 pb-4">
                           <span className="text-[10px] font-luxury-caps text-primary/40">Zip Code</span>
                           <span className="text-sm font-bold">{data.PostalCode || '00830'}</span>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4">
               <div className="sticky top-40 bg-white p-10 shadow-2xl space-y-10 border-t-8 border-accent">
                  <div className="flex items-center gap-6 pb-10 border-b border-black/5">
                     <div className="relative">
                        <img src="/assets/tammy.jpg" className="w-20 h-20 rounded-full object-cover border-2 border-accent/20" alt="Agent" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
                     </div>
                     <div>
                        <p className="text-[10px] font-luxury-caps text-accent mb-1 tracking-widest">Listing Broker</p>
                        <h4 className="text-2xl font-heading italic uppercase tracking-tighter">Tammy Donnelly</h4>
                        <p className="text-[10px] font-luxury-caps text-primary/40">Principal Broker</p>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <a href="tel:+13406436068" className="flex items-center gap-4 text-primary hover:text-accent transition-all group">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                           <Phone className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold">+1 (340) 643-6068</span>
                     </a>
                     <a href="mailto:340realestateco@gmail.com" className="flex items-center gap-4 text-primary hover:text-accent transition-all group">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                           <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">340realestateco@gmail.com</span>
                     </a>
                  </div>
                  <button 
                     onClick={() => navigate('/contact')}
                     className="w-full py-6 bg-primary text-white text-[11px] font-luxury-caps hover:bg-black transition-all group overflow-hidden relative cursor-pointer"
                  >
                     <span className="relative z-10">Contact Tammy Donnelly</span>
                     <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
               </div>
            </div>
         </div>
      </section>
      <Footer />
    </div>
  )
}

export default PropertyDetails
