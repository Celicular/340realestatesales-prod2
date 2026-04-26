import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MapPin, Info, History, Compass, Waves, CheckCircle2 } from 'lucide-react'

const AboutStJohn = () => {
  const [activeMap, setActiveMap] = useState('illustrated')

  const condoCommunities = [
    { name: "Battery Hill", desc: "Harbor/St. Thomas views, shared pool" },
    { name: "Bethany/Upper Deck", desc: "South to West views" },
    { name: "Conch Villas", desc: "Enighed Pond views, walking distance to Cruz Bay" },
    { name: "Cruz Bay Villas", desc: "St. Thomas views, sunset, shared pool" },
    { name: "Cruz Views", desc: "Pocket Money Hill, sunset views" },
    { name: "Gallows Point", desc: "15 waterfront buildings, shared pool & beach" },
    { name: "Grande Bay", desc: "Cruz Bay beach, resort-style amenities" },
    { name: "Lavender Hill", desc: "Harbor views, shared pool" },
    { name: "Palm & Mango Terrace", desc: "Walking distance to town" },
    { name: "Pastory Estate", desc: "Shared pool, 5 min from Cruz Bay" },
    { name: "Selene's", desc: "6 studio units in Cruz Bay" },
    { name: "Serendip", desc: "Sunset views over St. Thomas" },
    { name: "Sirenusa", desc: "40 luxury condos, pool, gym, game room" },
    { name: "Sunset Ridge", desc: "6 two-bedroom units, timeshare, pool" },
    { name: "Villa Caribe", desc: "Lap pool, south views" },
    { name: "Virgin Grand Villas", desc: "2 seasonal homes, 3BR" },
    { name: "Westin Vacation Club", desc: "Timeshares, access to hotel facilities" }
  ]

  const subdivisions = [
    "Adrian", "Beverhoudtsberg", "Bellevue", "Annaberg", "Bethany", "Bordeaux Heights", "Calabash Boom", 
    "Carolina", "Catherineberg", "Chocolate Hole", "Concordia", "Contant", "Ditleff Point", "Dreekets Bay", 
    "Emmaus", "Eden", "Enighed", "Fish Bay", "Skytop", "Gift", "Regenback", "Glucksberg", "San Souci", 
    "Guinea Gut", "Great Cruz Bay", "Haulover", "Hansen Bay", "Mandahl", "Midland", "Pastory", "Peter Bay", 
    "Rendezvous", "Boatman Point", "Klein Bay"
  ]

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/abouthero.jpg" 
            className="w-full h-full object-cover" 
            alt="St. John Virgin Islands" 
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-[12px] font-luxury-caps mb-6 tracking-[0.5em]"
          >
            A Journey Through History & Nature
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-heading tracking-tighter leading-none uppercase mb-8"
          >
            About St. John,<br/>Virgin Islands
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-light italic opacity-80"
          >
            Discover St. John: A Journey Through History, Nature, and Island Charm
          </motion.p>
        </div>
      </section>

      {/* Intro Section with Logo Watermark */}
      <section className="py-32 px-6 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <img src="/assets/logo.png" className="w-[800px] h-auto" alt="" />
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
            <span className="text-accent text-[11px] font-luxury-caps tracking-[0.4em] mb-4 block">Destination Guide</span>
            <h2 className="text-4xl md:text-7xl font-heading text-primary mb-12 uppercase tracking-tighter">St. John, US Virgin Islands Real Estate</h2>
            <p className="text-2xl font-light italic text-primary/60 mb-20">A Historical Journey and Modern Paradise</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
               <div className="p-10 bg-surface rounded-2xl border border-black/5 space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <Info className="w-6 h-6" />
                  </div>
                  <h4 className="text-[12px] font-luxury-caps text-primary tracking-widest">Island Size</h4>
                  <p className="text-3xl font-heading text-primary">20 SQ MILES</p>
                  <p className="text-sm text-primary/40 font-medium">7 miles long, 3 miles wide</p>
               </div>
               <div className="p-10 bg-surface rounded-2xl border border-black/5 space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h4 className="text-[12px] font-luxury-caps text-primary tracking-widest">Highest Point</h4>
                  <p className="text-3xl font-heading text-primary">BORDEAUX MT</p>
                  <p className="text-sm text-primary/40 font-medium">1,277 ft above sea level</p>
               </div>
               <div className="p-10 bg-surface rounded-2xl border border-black/5 space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <History className="w-6 h-6" />
                  </div>
                  <h4 className="text-[12px] font-luxury-caps text-primary tracking-widest">Established</h4>
                  <p className="text-3xl font-heading text-primary">1917</p>
                  <p className="text-sm text-primary/40 font-medium">Purchased from Denmark</p>
               </div>
            </div>

            <div className="mt-24 pt-12 border-t border-black/5">
                <p className="text-[10px] text-primary/30 uppercase tracking-[0.2em] font-bold max-w-4xl mx-auto leading-relaxed">
                  Real estate companies in St John US Virgin Islands, real estate for sale in St John US Virgin Islands, Caribbean real estate, rentals, and more.
                </p>
            </div>
        </div>
      </section>

      {/* Historical Journey Section */}
      <section className="py-32 px-6 bg-surface-dark">
        <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-24 items-center">
           <div className="lg:w-1/2 space-y-12">
              <span className="text-accent text-[11px] font-luxury-caps tracking-[0.4em]">Our Legacy</span>
              <h2 className="text-5xl md:text-7xl font-heading text-primary uppercase tracking-tighter leading-[0.85]">Historical Journey</h2>
              <div className="space-y-8 text-primary/70 text-lg leading-relaxed font-light">
                 <p>St. John became part of the USA in 1917, purchased from Denmark. While tourism began flourishing in the 1930s, the island's true character was cemented in 1956.</p>
                 <p>Laurance S. Rockefeller donated an initial 5,000 acres of land, forming the Virgin Islands National Park. As Secretary of the Interior Fred Seaton noted at the time, this was a monumental gift for future generations.</p>
                 <p>Today, the Park has expanded to include 7,200 acres of land and 5,600 acres of marine habitat, totaling 56,500 protected acres of pristine Caribbean beauty.</p>
              </div>
           </div>
           <div className="lg:w-1/2 grid grid-cols-2 gap-8 sticky top-32">
              <div className="aspect-[4/5] bg-primary/10 rounded-2xl overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3" className="w-full h-full object-cover" alt="Historical St. John" />
              </div>
              <div className="aspect-[4/5] bg-primary/10 rounded-2xl overflow-hidden shadow-2xl mt-16">
                 <img src="https://images.unsplash.com/photo-1518197146369-011599475eaa" className="w-full h-full object-cover" alt="Island Nature" />
              </div>
           </div>
        </div>
      </section>

      {/* Modern Day Section */}
      <section className="py-32 px-6 bg-white overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto">
           <div className="text-center mb-24 space-y-6">
              <h2 className="text-5xl md:text-7xl font-heading text-primary uppercase tracking-tighter">Modern-Day St. John</h2>
              <div className="h-0.5 w-24 bg-accent mx-auto" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <div className="flex gap-6 items-start">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                       <h4 className="font-bold text-lg mb-2">No Passport Required</h4>
                       <p className="text-primary/60">As a U.S. Territory, U.S. citizens don't need a passport to visit this Caribbean gem.</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-start">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                       <h4 className="font-bold text-lg mb-2">Diverse Accommodations</h4>
                       <p className="text-primary/60">From rustic eco-camps to some of the world's most exclusive luxury villas.</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-start">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                       <h4 className="font-bold text-lg mb-2">World-Class Beaches</h4>
                       <p className="text-primary/60">Trunk Bay is consistently ranked among the world's most beautiful beaches.</p>
                    </div>
                 </div>
                 <p className="text-xl font-heading italic text-primary/80 pt-8 border-t border-black/5">
                    The island preserves its natural beauty while honoring its rich history, offering a lifestyle that is both sophisticated and grounded.
                 </p>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl group-hover:bg-accent/20 transition-all" />
                 <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" className="w-full aspect-[4/3] object-cover rounded-2xl relative z-10 shadow-2xl" alt="Modern St. John" />
              </div>
           </div>
        </div>
      </section>

      {/* Condos Grid */}
      <section className="py-32 px-6 bg-surface">
        <div className="max-w-[1500px] mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-4">
                 <span className="text-accent text-[11px] font-luxury-caps tracking-[0.4em]">Luxury Living</span>
                 <h2 className="text-5xl md:text-7xl font-heading text-primary uppercase tracking-tighter">Condo Communities</h2>
              </div>
              <p className="text-primary/40 text-[12px] font-luxury-caps font-bold">17 Distinct Communities</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {condoCommunities.map((condo, i) => (
                <div key={i} className="p-8 bg-white border border-black/5 rounded-xl hover:shadow-2xl transition-all group">
                   <h4 className="text-[14px] font-bold text-primary mb-2 group-hover:text-accent transition-colors uppercase tracking-tight">{condo.name}</h4>
                   <p className="text-[13px] text-primary/50 leading-relaxed font-medium">{condo.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Subdivisions */}
      <section className="py-32 px-6 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="text-[30vw] font-heading absolute -bottom-20 -right-20 leading-none select-none italic">LAND</div>
        </div>
        <div className="max-w-[1500px] mx-auto relative z-10 text-center">
           <span className="text-accent text-[11px] font-luxury-caps tracking-[0.4em] mb-8 block">Island Geography</span>
           <h2 className="text-5xl md:text-8xl font-heading mb-20 uppercase tracking-tighter">Land Subdivisions</h2>
           
           <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 max-w-6xl mx-auto">
              {subdivisions.map((sub, i) => (
                <span key={i} className="text-[12px] md:text-[14px] font-luxury-caps tracking-widest text-white/40 hover:text-accent transition-colors cursor-default whitespace-nowrap">
                   {sub}
                </span>
              ))}
           </div>
        </div>
      </section>

      {/* Maps Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[1500px] mx-auto">
           <div className="text-center mb-20 space-y-6">
              <h2 className="text-5xl md:text-7xl font-heading text-primary uppercase tracking-tighter">Island Maps</h2>
              <div className="flex justify-center gap-10">
                <button 
                  onClick={() => setActiveMap('illustrated')}
                  className={`text-[12px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeMap === 'illustrated' ? 'border-accent text-primary' : 'border-transparent text-primary/30 hover:text-primary'}`}
                >
                  Illustrated Map
                </button>
                <button 
                  onClick={() => setActiveMap('zones')}
                  className={`text-[12px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeMap === 'zones' ? 'border-accent text-primary' : 'border-transparent text-primary/30 hover:text-primary'}`}
                >
                  Property Zones
                </button>
                <button 
                  onClick={() => setActiveMap('google')}
                  className={`text-[12px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeMap === 'google' ? 'border-accent text-primary' : 'border-transparent text-primary/30 hover:text-primary'}`}
                >
                  Google Map
                </button>
              </div>
           </div>

           <div className="aspect-video w-full bg-surface rounded-3xl overflow-hidden shadow-2xl border border-black/5 relative group">
              {activeMap === 'illustrated' && (
                <img src="https://i.pinimg.com/736x/1e/bb/ce/1ebbcec1215e56918f8940a310f6ee33.jpg" className="w-full h-full object-cover" alt="Illustrated Map" />
              )}
              {activeMap === 'zones' && (
                <img src="https://340realestatestjohn.com/wp-content/uploads/2024/07/340_MAP_TEMPLATE_V4.jpg" className="w-full h-full object-contain bg-white p-8" alt="Property Zones Map" />
              )}
              {activeMap === 'google' && (
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60613.11195655761!2d-64.7891722421327!3d18.33440781702581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c050fb20e980309%3A0xc3f587d46c64600e!2sSaint%20John!5e0!3m2!1sen!2sus!4v1709400000000!5m2!1sen!2sus" 
                  className="w-full h-full border-0" 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="text-white text-[10px] font-luxury-caps tracking-widest">Interactive Island Intelligence</p>
              </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
  )
}

export default AboutStJohn
