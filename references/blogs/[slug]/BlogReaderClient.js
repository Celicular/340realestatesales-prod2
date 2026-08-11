"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SocialFloat from "../../../components/SocialFloat";
import { Loader2, ChevronLeft, Calendar, User, Eye, FileText } from "lucide-react";

export default function BlogReaderClient() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then(r => {
         if (!r.ok) throw new Error(r.status);
         return r.json();
      })
      .then(d => {
         if (!d.blog) setNotFound(true);
         else setBlog(d.blog);
      })
      .catch(e => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F2ED] flex flex-col">
        <Navbar isTransparent={false} />
        <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-60 flex-grow">
          <Loader2 className="w-10 h-10 text-[#1CA7A6] animate-spin" />
          <p className="text-[13px] font-bold uppercase tracking-widest text-[#4A5568]">Loading Article…</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (notFound || !blog) {
    return (
      <main className="min-h-screen bg-[#F5F2ED] flex flex-col">
        <Navbar isTransparent={false} />
        <div className="flex flex-col items-center justify-center py-40 text-center px-6 flex-grow">
          <FileText className="w-16 h-16 text-[#083D4D]/20 mb-6" />
          <h1 className="text-[2.5rem] font-bold text-[#083D4D] mb-4" style={{ fontFamily: "Prata, serif" }}>Article Not Found</h1>
          <p className="text-[15px] text-[#6B7280] mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blogs" className="flex items-center gap-2 bg-[#083D4D] text-white px-8 py-4 rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#0F4C5C] transition-colors shadow-md">
            <ChevronLeft className="w-4 h-4" /> Back to Blogs
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  
  const blocks = Array.isArray(blog.content_blocks) ? blog.content_blocks : [];

  return (
    <main className="min-h-screen bg-[#F5F2ED] flex flex-col">
      <Navbar isTransparent={false} />

      
      <div className="relative bg-[#083D4D]">
        {blog.cover_image && (
          <div className="absolute inset-0 opacity-20">
            <img src={blog.cover_image} alt="Background cover" className="w-full h-full object-cover blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#083D4D] via-[#083D4D]/80 to-transparent" />
          </div>
        )}
        <div className="relative max-w-[900px] mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#1CA7A6] uppercase tracking-[0.2em] hover:text-white transition-colors mb-10 group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>

          <h1 className="text-[2.5rem] md:text-[4rem] font-bold text-white mb-8 leading-tight drop-shadow-lg" style={{ fontFamily: "Prata, serif" }}>
            {blog.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[12px] font-semibold text-white/70 uppercase tracking-wider">
            <div className="flex items-center gap-2"><User className="w-4 h-4 text-[#1CA7A6]" /> BY {blog.author}</div>
            <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-[#1CA7A6]" /> {Math.max(2, blocks.length)} MIN READ</div>
          </div>
        </div>
      </div>

      <div className="max-w-[850px] mx-auto w-full px-6 -mt-10 relative z-10 mb-20 lg:mb-32 flex-grow">
         
         <div className="bg-white rounded-[2rem] shadow-xl p-8 sm:p-12 md:p-16 border border-[#E8E3DC]">
           
           <p className="text-[1.2rem] sm:text-[1.5rem] text-[#083D4D] leading-relaxed mb-12" style={{ fontFamily: "Prata, serif" }}>
             {blog.excerpt}
           </p>

           <article className="flex flex-col gap-8">
             {blocks.map((block) => {
               
               if (block.type === "heading") {
                 if (block.level === "h2") return <h2 key={block.id} className="text-[2rem] sm:text-[2.5rem] font-bold text-[#083D4D] leading-tight mt-6" style={{ fontFamily: "Prata, serif" }}>{block.value}</h2>;
                 if (block.level === "h3") return <h3 key={block.id} className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[#083D4D] leading-tight mt-4" style={{ fontFamily: "Prata, serif" }}>{block.value}</h3>;
                 return <h4 key={block.id} className="text-[1.3rem] font-bold text-[#083D4D] uppercase tracking-wider mt-4">{block.value}</h4>;
               }

               if (block.type === "paragraph") {
                 return (
                   <p key={block.id} className={`text-[16px] sm:text-[18px] text-[#4A5568] leading-[1.8] tracking-wide ${block.dropCap ? "first-letter:text-[4rem] first-letter:font-bold first-letter:text-[#1CA7A6] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]" : ""}`}>
                     {block.value}
                   </p>
                 );
               }

               if (block.type === "calligraphy") {
                 return (
                   <div key={block.id} className="my-8 flex justify-center py-6 border-y border-[#F5F2ED]">
                     <p className="text-[2rem] sm:text-[2.8rem] text-[#1CA7A6] leading-relaxed italic text-center max-w-2xl px-6" style={{ fontFamily: "Prata, serif" }}>
                       {block.value}
                     </p>
                   </div>
                 );
               }

               if (block.type === "quote") {
                 return (
                   <blockquote key={block.id} className="relative my-8 px-8 sm:px-12 py-6 bg-[#F5F2ED] rounded-2xl border-l-4 border-[#1CA7A6]">
                     <div className="text-[1.2rem] sm:text-[1.4rem] font-bold text-[#083D4D] mb-4 relative z-10" style={{ fontFamily: "Prata, serif" }}>
                       "{block.value}"
                     </div>
                     {block.author && <div className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">— {block.author}</div>}
                   </blockquote>
                 );
               }

               if (block.type === "image") {
                 return (
                   <div key={block.id} className={`my-8 rounded-2xl overflow-hidden shadow-sm border border-[#E8E3DC] ${block.size === "inline" ? "max-w-xl mx-auto" : "w-full"}`}>
                     <img src={block.value} alt={block.caption || "Blog visual"} className="w-full h-auto object-cover max-h-[600px] bg-gray-100" />
                     {block.caption && <p className="p-4 bg-white text-[12px] text-center font-bold text-[#9CA3AF] uppercase tracking-wider">{block.caption}</p>}
                   </div>
                 );
               }

               if (block.type === "link") {
                 return (
                   <div key={block.id} className="my-8 flex justify-center">
                     <a href={block.url || "#"} className="inline-flex items-center justify-center gap-2 bg-[#083D4D] text-white px-10 py-5 rounded-xl text-[13px] font-bold uppercase tracking-widest hover:bg-[#0F4C5C] hover:scale-105 transition-all shadow-md">
                       {block.value || "Click Here"}
                     </a>
                   </div>
                 );
               }

               return null;
             })}
           </article>

         </div>
      </div>

      <Footer />
      <SocialFloat />
    </main>
  );
}
