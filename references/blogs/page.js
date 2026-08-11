"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SocialFloat from "../../components/SocialFloat";
import { Loader2, ArrowRight, Calendar, User, Search } from "lucide-react";

export default function BlogsListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/blogs")
      .then(r => r.json())
      .then(d => {
         setBlogs(d.blogs || []);
         setFilteredBlogs(d.blogs || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredBlogs(blogs);
    } else {
      const s = search.toLowerCase();
      setFilteredBlogs(blogs.filter(b => b.title.toLowerCase().includes(s) || b.excerpt.toLowerCase().includes(s)));
    }
  }, [search, blogs]);

  return (
    <main className="min-h-screen bg-[#F5F2ED] flex flex-col">
      <Navbar isTransparent={false} />

      <div className="relative bg-[#083D4D] py-24 sm:py-32">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 0% 100%, #1CA7A6 0%, transparent 60%)" }} />
         <div className="relative max-w-[1200px] mx-auto px-6">
             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                 <div>
                     <p className="text-[#1CA7A6] text-[11px] font-bold uppercase tracking-[0.25em] mb-4">Discover St. John</p>
                     <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold text-white mb-6" style={{ fontFamily: "Prata, serif" }}>Our Journal & Insights</h1>
                     <p className="text-white/60 text-[15px] max-w-xl leading-relaxed">
                       Read stories about island living, real estate market trends, home ownership tips, and everything there is to know about St. John.
                     </p>
                 </div>
                 <div className="relative w-full lg:w-96 shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1CA7A6]" />
                    <input 
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full pl-11 pr-5 py-4 bg-white/10 border border-white/20 text-white rounded-xl placeholder:text-white/40 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all text-[13px]" 
                    />
                 </div>
             </div>
         </div>
      </div>

      <div className="max-w-[1200px] mx-auto w-full px-6 py-16 flex-grow">
        {loading ? (
           <div className="flex flex-col items-center justify-center py-24 gap-4 opacity-60">
             <Loader2 className="w-10 h-10 text-[#1CA7A6] animate-spin" />
             <p className="text-[13px] font-bold uppercase tracking-widest text-[#4A5568]">Loading Articles…</p>
           </div>
        ) : filteredBlogs.length === 0 ? (
           <div className="text-center py-32 text-[#6B7280]">
             <Search className="w-12 h-12 mx-auto text-[#1CA7A6] opacity-30 mb-4" />
             <p className="text-[1.2rem] font-bold text-[#083D4D]" style={{ fontFamily: "Prata, serif" }}>No articles found</p>
             <p className="text-[14px]">Try adjusting your search criteria.</p>
           </div>
        ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredBlogs.map(b => (
               <Link href={`/blogs/${b.slug}`} key={b.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E8E3DC] hover:shadow-xl transition-all flex flex-col h-full hover:-translate-y-1">
                 <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                   {b.cover_image ? (
                     <img src={b.cover_image} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center bg-[#083D4D]/5"><span className="text-[#083D4D]/20 font-bold tracking-widest uppercase text-[10px]">No Image</span></div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#083D4D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 
                 <div className="p-7 flex flex-col flex-1">
                   <h2 className="text-[1.3rem] font-bold text-[#083D4D] leading-snug mb-3 group-hover:text-[#1CA7A6] transition-colors" style={{ fontFamily: "Prata, serif" }}>
                     {b.title}
                   </h2>
                   <p className="text-[13px] text-[#6B7280] leading-relaxed mb-6 line-clamp-3 flex-1">
                     {b.excerpt}
                   </p>
                   
                   <div className="flex flex-col gap-3 pt-5 border-t border-[#F5F2ED]">
                      <div className="flex items-center gap-4 text-[#9CA3AF] text-[11px] font-bold uppercase tracking-wider">
                         <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{b.author}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-[12px] font-bold text-[#1CA7A6] uppercase tracking-widest mt-1">Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></span>
                   </div>
                 </div>
               </Link>
             ))}
           </div>
        )}
      </div>

      <Footer />
      <SocialFloat />
    </main>
  );
}
