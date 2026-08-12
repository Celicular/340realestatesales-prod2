import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  
  const [currentVideo, setCurrentVideo] = useState(0)
  const videos = ['/videos/vid1.mp4', '/videos/vid2.mp4', '/videos/vid3.mp4']

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover opacity-70 scale-110"
            >
              <source src={videos[currentVideo]} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </motion.div>
      
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center text-white px-4 max-w-5xl"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="mb-8"
        >
          <span className="font-luxury-caps text-[13px] text-accent font-bold drop-shadow-lg">VIRGIN ISLANDS REAL ESTATE SPECIALISTS</span>
        </motion.div>
        
        <div className="overflow-hidden mb-12">
          <motion.h2 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8vw] md:text-[5vw] font-heading font-black leading-[0.8] tracking-tighter uppercase drop-shadow-2xl pb-4"
          >
            ST JOHN, USVI
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
        >
          <button 
            onClick={() => navigate('/mls')}
            className="px-14 py-6 bg-white text-primary text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent hover:text-white transition-all shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            MLS SEARCH
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  )
}

export default Hero
