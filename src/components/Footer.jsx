import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowUpRight, Twitter, Youtube, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 px-6 border-t-8 border-accent overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <Link to="/" className="inline-block group">
                <div className="flex items-center gap-4">
                  <img src="/assets/logo.png" className="h-16 w-auto drop-shadow-2xl group-hover:scale-105 transition-transform" alt="340 Real Estate" />
                  <div className="flex flex-col leading-none">
                    <span className="text-3xl font-heading italic lowercase tracking-tighter text-white">340 real estate</span>
                    <span className="text-[10px] font-luxury-caps tracking-[0.4em] text-accent">Sales</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/340realestateco/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <Facebook className="w-4 h-4 text-white/40 group-hover:text-white" />
              </a>
              <a href="https://www.instagram.com/340realestateco/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <Instagram className="w-4 h-4 text-white/40 group-hover:text-white" />
              </a>
              <a href="https://x.com/340realestateco" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <Twitter className="w-4 h-4 text-white/40 group-hover:text-white" />
              </a>
              <a href="https://www.youtube.com/channel/UCXXXXXX" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <Youtube className="w-4 h-4 text-white/40 group-hover:text-white" />
              </a>
              <a href="https://wa.me/13406436068" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                <MessageCircle className="w-4 h-4 text-white/40 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Contact Section - Professional & Condensed */}
          <div className="lg:col-span-5">
            <h4 className="text-accent text-[11px] font-luxury-caps tracking-[0.4em] mb-10">GET IN TOUCH</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-[9px] font-luxury-caps text-white/30 tracking-[0.2em] font-black uppercase">Email</p>
                <a href="mailto:340realestateco@gmail.com" className="text-[16px] font-heading italic hover:text-accent transition-colors block">340realestateco@gmail.com</a>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-luxury-caps text-white/30 tracking-[0.2em] font-black uppercase">Address</p>
                <p className="text-[14px] font-medium leading-relaxed text-white/70">
                  340 Real Estate Sales,<br />ST JOHN VI 00831
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-luxury-caps text-white/30 tracking-[0.2em] font-black uppercase">Phone Number</p>
                <a href="tel:+13406436068" className="text-[20px] font-bold hover:text-accent transition-colors block text-white">+1 340-643-6068</a>
              </div>
              <div className="space-y-2">
                 <p className="text-[9px] font-luxury-caps text-white/30 tracking-[0.2em] font-black uppercase">Direct Message</p>
                 <div className="flex items-center gap-2 text-accent text-[11px] font-bold group cursor-pointer">
                    Chat Now <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-accent text-[11px] font-luxury-caps tracking-[0.4em] mb-10">PARTNERSHIPS</h4>
            <div className="flex flex-wrap gap-8 opacity-60">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 border border-white/20 flex items-center justify-center font-serif text-[10px] italic">R</div>
                 <span className="text-[10px] font-luxury-caps tracking-widest uppercase">REALTOR®</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
                    <div className="w-4 h-4 border border-white/60 relative">
                       <div className="absolute top-1 left-1 w-2 h-0.5 bg-white/60" />
                       <div className="absolute bottom-1 left-1 w-2 h-0.5 bg-white/60" />
                    </div>
                 </div>
                 <span className="text-[10px] font-luxury-caps tracking-widest uppercase">Equal Housing</span>
              </div>
            </div>
            <p className="text-[9px] font-luxury-caps text-white/20 leading-relaxed uppercase pt-6">
              340 Real Estate Co LLC is a member of the St. John Board of Realtors, St Thomas Board of Realtors and the Multiple Listing Service.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-luxury-caps text-white/20 tracking-[0.2em]">
            © 2026 340 REAL ESTATE SALES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-[9px] font-luxury-caps text-white/20 hover:text-white transition-colors tracking-widest">Privacy Policy</a>
            <a href="#" className="text-[9px] font-luxury-caps text-white/20 hover:text-white transition-colors tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
