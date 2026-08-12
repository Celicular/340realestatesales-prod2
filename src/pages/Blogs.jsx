import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, ArrowRight, Search, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://340realestate.com/api/blogs")
      .then((r) => r.json())
      .then((d) => {
        const fetchedBlogs = d.blogs || [];
        setBlogs(fetchedBlogs);
        setFilteredBlogs(fetchedBlogs);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredBlogs(blogs);
    } else {
      const s = search.toLowerCase();
      setFilteredBlogs(
        blogs.filter(
          (b) =>
            b.title.toLowerCase().includes(s) ||
            b.excerpt.toLowerCase().includes(s)
        )
      );
    }
  }, [search, blogs]);

  // Helper to ensure full URL for cover images if they are relative
  const getCoverImage = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `https://340realestate.com${url}`;
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-primary py-32 md:py-48 px-6 section-indent overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-black/20 -skew-x-12 translate-x-1/4" />
        <div className="relative max-w-[1500px] mx-auto z-10 pt-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
            >
              <h4 className="text-accent text-[16px] font-luxury-caps mb-6">Discover St. John</h4>
              <h1 className="text-5xl md:text-7xl font-heading text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Our Journal <br /> & Insights
              </h1>
              <p className="text-white/70 text-lg md:text-xl font-light max-w-xl leading-relaxed italic font-heading">
                Read stories about island living, real estate market trends, home ownership tips, and everything there is to know about St. John.
              </p>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative w-full lg:w-[400px] shrink-0"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/20 text-white rounded-none placeholder:text-white/40 focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-luxury-caps text-[11px] tracking-[0.2em]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blogs List */}
      <section className="max-w-[1500px] mx-auto w-full px-6 py-24 md:py-32 flex-grow">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 opacity-80">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
            <p className="text-[12px] font-luxury-caps text-primary">Loading Articles…</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-40 border border-primary/10 bg-white shadow-xl">
            <Search className="w-12 h-12 mx-auto text-primary/30 mb-6" />
            <h2 className="text-3xl font-heading text-primary uppercase mb-4">No articles found</h2>
            <p className="text-primary/60 font-light">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filteredBlogs.map((b, i) => (
              <motion.div 
                key={b.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Link
                  to={`/blogs/${b.slug}`}
                  className="group flex flex-col h-full bg-white hover:bg-surface-dark transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] border border-primary/5 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {b.cover_image ? (
                      <img
                        src={getCoverImage(b.cover_image)}
                        alt={b.title}
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-surface-dark">
                        <span className="text-primary/30 font-luxury-caps text-[10px]">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-10 flex flex-col flex-1">
                    <h3 className="text-2xl md:text-3xl font-heading text-primary uppercase leading-tight mb-6 group-hover:text-accent transition-colors duration-300">
                      {b.title}
                    </h3>
                    <p className="text-primary/70 leading-relaxed font-light mb-8 line-clamp-3 flex-1 italic font-heading text-lg">
                      {b.excerpt}
                    </p>

                    <div className="flex flex-col gap-6 pt-8 border-t border-primary/10 mt-auto">
                      <div className="flex items-center gap-3 text-primary/60 font-luxury-caps text-[10px]">
                        <User className="w-4 h-4 text-accent" /> BY {b.author || "St. John Team"}
                      </div>
                      <span className="inline-flex items-center gap-3 text-[11px] font-luxury-caps text-accent mt-2">
                        READ ARTICLE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
