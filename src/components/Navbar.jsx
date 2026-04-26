import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Pages that should have a solid navbar by default (because they have light backgrounds)
  const isLightPage = location.pathname.startsWith('/property/') || 
                      location.pathname === '/about' || 
                      location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Exclusive Properties', href: '/properties' },
    { name: 'MLS Search', href: '/mls' },
    { name: 'About St John', href: '/about' },
    { name: 'About Us', href: '/about-340-realestate-team' },
    { name: 'Sales History', href: '/saleshistory' }
  ]

  // Determine styles based on scroll AND page type
  const isSolid = isScrolled || isLightPage;
  const textColor = isSolid ? 'text-primary' : 'text-white';
  const navItemColor = isSolid ? 'text-primary/70 hover:text-accent' : 'text-white/80 hover:text-white';
  const logoTextColor = isSolid ? 'text-primary' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
      isSolid ? 'bg-white/95 backdrop-blur-xl border-b border-black/5 py-3 shadow-2xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-shrink-0 flex items-center gap-4 group"
        >
          <Link to="/" className="flex items-center gap-4">
            <img 
              src="/assets/logo.png" 
              alt="340 Real Estate" 
              className="h-10 md:h-12 w-auto transition-all duration-500 object-contain shadow-sm" 
            />
            <div className="flex flex-col leading-none">
              <span className={`text-2xl md:text-3xl font-heading italic lowercase tracking-tighter ${logoTextColor}`}>
                340 real estate
              </span>
              <span className={`text-[8px] font-luxury-caps tracking-[0.5em] ${isSolid ? 'text-accent' : 'text-accent/80'}`}>
                Sales
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden xl:flex items-center gap-10">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                to={link.href} 
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center gap-1 ${navItemColor}`}
              >
                {link.name}
              </Link>
              <div className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full`} />
            </div>
          ))}
        </div>

        {/* Right Side Info */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-3 text-accent transition-colors">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSolid ? 'bg-accent/10' : 'bg-white/10'}`}>
                <Phone className="w-4 h-4" />
             </div>
             <a href="tel:+13406436068" className={`text-xs font-bold tracking-widest ${textColor}`}>
               +1 340-643-6068
             </a>
          </div>
          <button 
            onClick={() => navigate('/mls')}
            className={`hidden sm:flex items-center gap-3 group px-8 py-3.5 text-[9px] uppercase tracking-[0.3em] font-black transition-all duration-500 overflow-hidden relative shadow-2xl cursor-pointer ${
            isSolid ? 'bg-primary text-white hover:bg-black' : 'bg-white text-primary hover:bg-accent hover:text-white'
          }`}>
            <span className="relative z-10">MLS Search</span>
            <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform relative z-10" />
          </button>
          <div 
            className={`xl:hidden w-10 h-10 flex items-center justify-center rounded-full border cursor-pointer ${isSolid ? 'border-black/10 text-primary' : 'border-white/20 text-white'}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-primary/95 backdrop-blur-3xl text-white z-[100] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
               <img src="/assets/logo.png" className="h-12 w-auto" alt="Logo" />
               <X className="w-10 h-10 cursor-pointer text-accent" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
            <div className="space-y-10 flex flex-col items-center">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link 
                    to={item.href}
                    className="block text-5xl md:text-7xl font-heading italic lowercase hover:text-accent transition-all text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="pt-12 border-t border-white/10 flex justify-between items-end">
               <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Inquiries</p>
                  <p className="text-3xl font-heading text-accent tracking-tighter uppercase leading-none">Tammy Donnelly</p>
                  <p className="text-xl font-bold">+1 340-643-6068</p>
               </div>
               <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                     <span className="text-[10px]">IG</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                     <span className="text-[10px]">FB</span>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
