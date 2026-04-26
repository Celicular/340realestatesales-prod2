import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CheckCircle2, Award, Users, MapPin, Search } from 'lucide-react'

const AboutUs = () => {
  return (
    <div className="bg-surface min-h-screen">
      <Navbar />

      {/* Hero Section - Reduced height and top-aligned image */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/abouthero.jpg" 
            className="w-full h-full object-cover" 
            alt="About 340 Real Estate" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-primary/40 to-primary/90" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 inline-block"
          >
             <img src="/assets/logo.png" className="h-32 w-auto mb-12 mx-auto drop-shadow-2xl" alt="340 Logo" />
          </motion.div>
          
          <motion.h4 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-[14px] font-luxury-caps mb-8 tracking-[0.8em]"
          >
            The Collection of Expertise
          </motion.h4>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[8rem] font-heading tracking-tighter leading-[0.8] uppercase mb-12"
          >
            About Us
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-heading italic opacity-80 max-w-4xl mx-auto leading-tight"
          >
            "The Local Experts in St. John Real Estate"
          </motion.p>
          
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 100 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-px bg-accent mx-auto mt-20"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-40 px-6 bg-white relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            <div className="lg:col-span-8 space-y-16">
              <div className="space-y-6">
                <span className="text-accent text-[11px] font-luxury-caps tracking-[0.4em]">Our Purpose</span>
                <h2 className="text-5xl md:text-7xl font-heading text-primary uppercase tracking-tighter leading-[0.85]">
                  Your Key to Paradise:<br/>The Local Experts in St. John Real Estate
                </h2>
              </div>

              <div className="space-y-10 text-primary/70 text-xl md:text-2xl leading-relaxed font-light font-body italic">
                <p className="border-l-4 border-accent pl-10">
                  Welcome to 340 Real Estate, your dedicated partner in navigating the unique property market of the United States Virgin Islands. Our name reflects our roots—340 is the area code for the entire territory—and our service reflects our deep commitment to the community we call home.
                </p>
                <p>
                  At 340 Real Estate, we believe that buying or selling a home is more than a transaction; it's a lifestyle transition. Our team consists of long-time residents who have lived through the island's nuances, from hurricane seasons to the most breathtaking sunsets. This lived experience translates into personalized service that goes beyond the standard listing.
                </p>
                <p>
                  Our approach is built on a foundation of integrity, transparency, and deep market insights. Whether you are looking for a luxury villa in Peter Bay or a quiet plot of land in Coral Bay, we provide the clarity and expertise needed to make informed decisions.
                </p>
                <p className="text-primary font-bold not-italic">
                  Ready to find your piece of paradise? Let our local knowledge guide you home.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <div className="bg-surface p-12 rounded-3xl border border-black/5 space-y-12 sticky top-40">
                  <h4 className="text-[14px] font-luxury-caps text-primary tracking-widest border-b border-black/5 pb-6">Island Benchmarks</h4>
                  
                  <div className="space-y-8">
                     <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 bg-accent text-white flex items-center justify-center rounded-2xl shadow-xl">
                           <Award className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Total Area</p>
                           <p className="text-2xl font-heading text-primary">20 SQ MILES</p>
                        </div>
                     </div>
                     <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-2xl shadow-xl">
                           <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Dimensions</p>
                           <p className="text-2xl font-heading text-primary">7mi L x 3mi W</p>
                        </div>
                     </div>
                     <div className="flex gap-6 items-center">
                        <div className="w-14 h-14 bg-accent/20 text-accent flex items-center justify-center rounded-2xl shadow-xl">
                           <Users className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Highest Elevation</p>
                           <p className="text-2xl font-heading text-primary">1,277 FT (Bordeaux)</p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-10 space-y-4">
                     <p className="text-[10px] text-primary/30 uppercase tracking-[0.2em] font-bold leading-relaxed">
                       Real estate companies in St. John, USVI; real estate for sale in St. Thomas and the Virgin Islands; Caribbean real estate, rentals, and more.
                     </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Section Footer */}
      <section className="py-24 px-6 bg-surface-dark border-y border-black/5">
         <div className="max-w-[1200px] mx-auto text-center">
            <h4 className="text-primary/20 text-[60px] md:text-[100px] font-heading leading-none select-none italic mb-12">Expertise</h4>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[11px] font-luxury-caps text-primary/40 tracking-widest font-bold">
               <span>Peter Bay Specialists</span>
               <span>Cruz Bay Experts</span>
               <span>Coral Bay Knowledge</span>
               <span>Vacation Rental Insights</span>
               <span>Investment Consultancy</span>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUs
