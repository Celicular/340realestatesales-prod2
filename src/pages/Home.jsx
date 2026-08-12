import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import PropertyCard from '../components/PropertyCard'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Instagram, Facebook, Twitter, MapPin, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fetchInternalProperties } from '../services/propertyService'

// --- Internal Helper Components ---

const SectionHeading = ({ subtitle, title, alignment = 'center', dark = false }) => (
  <div className={`space-y-6 mb-24 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.h4 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-accent text-[16px] font-luxury-caps"
    >
      {subtitle}
    </motion.h4>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`text-3xl xs:text-4xl md:text-7xl font-heading leading-[0.85] tracking-tighter uppercase ${dark ? 'text-white' : 'text-primary'}`}
    >
      {title}
    </motion.h2>
    {alignment === 'center' && (
      <div className="flex justify-center gap-2 mt-4">
        <div className="w-12 h-0.5 bg-accent/20" />
        <div className="w-4 h-0.5 bg-accent" />
        <div className="w-12 h-0.5 bg-accent/20" />
      </div>
    )}
  </div>
)

// --- Page Sections ---

const DreamBigSection = () => {
  const navigate = useNavigate()
  const cards = [
    { title: 'BUY WITH US', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511' },
    { title: 'SELL WITH US', img: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' }
  ]

  return (
    <section className="py-48 px-6 bg-surface-dark relative section-indent">
      <div className="max-w-[1500px] mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            <img src="/assets/logo.png" alt="Logo" className="h-20 w-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-40" />
          </div>
        </motion.div>
        
        <SectionHeading subtitle="Discover Excellence" title="DREAM BIG WITH US" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {cards.map((card, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 80 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
               onClick={() => navigate('/properties')}
               className="group relative h-[750px] overflow-hidden cursor-pointer shadow-[0_40px_100px_rgba(0,0,0,0.12)] hover:shadow-[0_60px_120px_rgba(0,0,0,0.25)] transition-all duration-1000"
            >
              <img src={card.img} className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
              
              <div className="absolute bottom-16 left-12 right-12 text-white">
                <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "100%" }}
                   transition={{ delay: 0.5, duration: 1 }}
                   className="h-px bg-accent/40 mb-10" 
                />
                <h3 className="text-4xl xs:text-5xl md:text-6xl font-heading italic mb-8 leading-none tracking-tight">{card.title}</h3>
                <p className="text-[12px] font-luxury-caps opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 flex items-center gap-6 translate-y-4 group-hover:translate-y-0 text-accent">
                  Learn More <div className="w-12 h-px bg-accent" /> <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FeaturedSection = ({ properties }) => {
  const navigate = useNavigate()
  const featured = properties.filter(p => 
    p.status?.toLowerCase().includes('featured') || 
    p.status?.toLowerCase().includes('sold')
  ).slice(0, 2)
  const displayProps = featured.length > 0 ? featured : properties.slice(0, 2)

  return (
    <section className="py-48 px-6 bg-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface/50 -z-0" />
      <div className="max-w-[1500px] mx-auto relative z-10">
        <SectionHeading subtitle="Success stories and marquee listings from our portfolio." title="FEATURED PROPERTIES" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40">
          {displayProps.map((p, idx) => (
             <div key={p.id} className={idx === 1 ? 'md:pt-40' : ''}>
                <PropertyCard 
                  status={p.status || "Featured"}
                  image={p.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'}
                  title={p.title}
                  price={`$${Number(p.price).toLocaleString()}`}
                  location={p.address}
                  details={`${p.beds || 0} BEDS · ${p.baths || 0} BATHS`}
                  sqft={p.square_feet}
                  slug={p.slug}
                />
             </div>
          ))}
        </div>
        <div className="text-center mt-40">
          <button 
            onClick={() => navigate('/properties')}
            className="group relative px-20 py-8 text-[12px] font-luxury-caps text-primary border-2 border-primary/10 hover:border-accent transition-all duration-500 overflow-hidden shadow-xl hover:shadow-accent/20 cursor-pointer"
          >
            <span className="relative z-10">VIEW ALL PROPERTIES</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  )
}

const NewListingsSection = ({ properties }) => {
  const newListings = properties.slice(0, 2)

  return (
    <section className="py-48 px-6 bg-surface-dark relative section-indent">
      <div className="max-w-[1500px] mx-auto relative z-10">
        <SectionHeading subtitle="Browse the latest properties added to our listings." title="NEW LISTINGS" alignment="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40">
          {newListings.map((p, idx) => (
             <div key={p.id} className={idx === 1 ? 'md:mt-40' : ''}>
                <PropertyCard 
                  status="New Listing"
                  image={p.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'}
                  title={p.title}
                  price={`$${Number(p.price).toLocaleString()}`}
                  location={p.address}
                  details={`${p.beds || 0} BEDS · ${p.baths || 0} BATHS`}
                  sqft={p.square_feet}
                  slug={p.slug}
                />
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TestimonialsSectionContent = () => {
  const [index, setIndex] = useState(0)
  const testimonials = [
    {
       text: "This was the second time we listed property with Tammy and there was never any question that we would list our home with her. Tammy is there to meet any challenges that might pop up when selling your home. Once we were under contract we had an issue surface. Rather than having to solve it ourselves Tammy was there to help. Without Tammy our sale could have fallen thru. Buying or selling on St John, Tammy is the realtor you need!",
       author: "Karen Radtke and David Carlson"
    },
    {
       text: "Tammy made our buying experience smooth and enjoyable. Her local expertise and attention to detail ensured everything went perfectly.",
       author: "Michael & Sarah Johnson"
    }
  ]

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [-150, 150])

  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden border-y-8 border-accent">
      <motion.div style={{ y }} className="absolute inset-0 opacity-60 scale-125">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" className="w-full h-full object-cover" alt="Testimonial Background" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      <div className="relative z-10 max-w-[1300px] mx-auto px-12 text-center text-white">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="mb-10 inline-block">
          <h4 className="font-luxury-caps text-[11px] text-accent font-bold tracking-[0.5em] text-glow">Client Experiences</h4>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="min-h-[350px] flex flex-col justify-center"
          >
            <blockquote className="text-lg xs:text-xl md:text-2xl lg:text-3xl font-heading italic leading-relaxed max-w-5xl mx-auto mb-12 select-none px-6">
              &quot;{testimonials[index].text}&quot;
            </blockquote>
            <p className="text-[13px] font-luxury-caps font-black tracking-[0.5em] text-white uppercase">— {testimonials[index].author}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-10 pt-16">
          <button onClick={prev} className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group cursor-pointer">
             <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button onClick={next} className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group cursor-pointer">
             <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

const AboutSectionContent = () => {
  const navigate = useNavigate()
  return (
    <section className="bg-primary text-white overflow-hidden py-0">
      <div className="flex flex-col md:flex-row items-center min-h-screen">
        <div className="md:w-1/2 p-12 md:p-32 space-y-16 order-2 md:order-1 relative">
          <SectionHeading subtitle="Who We Are" title="GET TO KNOW US" alignment="left" dark />
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/70 max-w-2xl font-heading italic">
            &quot;Have you ever found yourself daydreaming about staying forever after the most relaxing vacation of your life—sunbathing on a tropical beach...&quot;
          </p>
          <p className="text-lg font-light text-white/50 leading-loose max-w-xl">
            That dream of owning a piece of "the rock" may be closer than you think. Our team provides unparalleled local expertise for your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 pt-10">
            <button 
               onClick={() => navigate('/about-340-realestate-team')}
               className="px-14 py-6 bg-accent text-white text-[11px] font-luxury-caps hover:bg-white hover:text-primary transition-all shadow-[0_20px_40px_rgba(197,160,89,0.3)] cursor-pointer"
            >
              MEET THE TEAM
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="px-14 py-6 border-2 border-white/20 text-white text-[11px] font-luxury-caps hover:bg-white hover:text-primary transition-all cursor-pointer"
            >
              CONTACT US
            </button>
          </div>
        </div>
        <div className="md:w-1/2 h-[600px] md:h-screen relative overflow-hidden order-1 md:order-2">
          <motion.div 
            initial={{ scale: 1.4 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <img 
              src="/assets/team.jpeg" 
              className="w-full h-full object-cover grayscale-[30%] contrast-[1.1]"
              alt="Team 340"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const AreasOfExpertise = () => {
  const navigate = useNavigate()
  return (
    <section className="py-60 bg-white px-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-surface-dark/30 -skew-x-12 -z-0 translate-x-1/2" />
      <div className="max-w-[1440px] mx-auto flex flex-col items-center relative z-10">
        <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden shadow-[0_80px_150px_rgba(0,0,0,0.2)]">
          <motion.img initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ duration: 2 }} src="/assets/slh1.jpeg" className="w-full h-full object-cover" alt="Areas of Expertise" />
          <div className="absolute inset-0 bg-primary/10" />
        </div>
        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="md:-mt-48 relative z-10 bg-white p-12 md:p-32 max-w-4xl text-center shadow-[0_60px_150px_rgba(0,0,0,0.25)] border-t-[12px] border-accent">
          <h4 className="text-[13px] font-luxury-caps text-accent mb-8">BROWSE THE ISLAND</h4>
          <h2 className="text-4xl xs:text-5xl md:text-8xl font-heading mb-12 tracking-tighter uppercase leading-none">AREAS OF EXPERTISE</h2>
          <p className="text-primary/70 leading-relaxed mb-16 text-2xl font-light italic font-heading">These neighborhoods have plenty of beautiful properties to offer. Browse through available listings in the community.</p>
          <button onClick={() => navigate('/properties')} className="group relative px-20 py-8 bg-primary text-white text-[12px] font-luxury-caps hover:bg-black transition-all shadow-2xl overflow-hidden cursor-pointer">
             <span className="relative z-10">LEARN MORE</span>
             <div className="absolute top-0 left-0 w-full h-full bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-0" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

const LifestyleGrid = () => {
  const navigate = useNavigate()
  const items = [
    { label: 'Homes', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d', span: 'md:col-span-1' },
    { label: 'Land', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', span: 'md:col-span-1' },
    { label: 'Condos', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', span: 'md:col-span-1' },
    { label: 'Timeshares', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', span: 'md:col-span-2' },
    { label: 'Commercial', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', span: 'md:col-span-1' },
    { label: 'Waterfront', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', span: 'md:col-span-3' }
  ]
  return (
    <section className="py-60 bg-surface-dark px-6 section-indent">
      <div className="max-w-[1500px] mx-auto">
        <SectionHeading subtitle="Your New Chapter" title="BROWSE BY LIFESTYLE" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, duration: 0.8 }} onClick={() => navigate('/properties')} className={`relative h-[650px] overflow-hidden group cursor-pointer shadow-[0_30px_70px_rgba(0,0,0,0.15)] ${item.span}`}>
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale group-hover:grayscale-0" alt="" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 transition-all duration-700 opacity-60 group-hover:opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center border-2 border-white/20 backdrop-blur-md p-16 w-full h-full flex flex-col items-center justify-center group-hover:bg-white/5 transition-all duration-700">
                  <h3 className="text-4xl xs:text-5xl md:text-6xl font-heading text-white italic group-hover:scale-110 transition-transform duration-700 leading-none group-hover:text-glow">{item.label}</h3>
                  <div className="w-12 h-0.5 bg-accent mt-10 group-hover:w-32 transition-all duration-700 opacity-50" />
                  <span className="mt-12 text-[11px] font-luxury-caps text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0">View Properties</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Home = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProperties = async () => {
      // 1. Check local storage cache
      const cached = localStorage.getItem('340_properties_cache')
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        // Cache for 1 hour
        if (Date.now() - timestamp < 3600000) {
          setProperties(data)
          setLoading(false)
          return
        }
      }

      // 2. Fetch from API
      try {
        const data = await fetchInternalProperties()
        setProperties(data)
        // Store in cache
        localStorage.setItem('340_properties_cache', JSON.stringify({
          data,
          timestamp: Date.now()
        }))
      } catch (err) {
        console.error('Failed to fetch home properties:', err)
      } finally {
        setLoading(false)
      }
    }
    getProperties()
  }, [])

  return (
    <div className="selection:bg-accent selection:text-white bg-surface">
      <Navbar />
      <Hero />
      <DreamBigSection />
      {!loading && properties.length > 0 && <FeaturedSection properties={properties} />}
      <AboutSectionContent />
      {!loading && properties.length > 0 && <NewListingsSection properties={properties} />}
      <TestimonialsSectionContent />
      <AreasOfExpertise />
      <LifestyleGrid />
      <Footer />
    </div>
  )
}

export default Home
