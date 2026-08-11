import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, ChevronLeft, User, Eye, FileText } from "lucide-react";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`https://340realestate.com/api/blogs/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then((d) => {
        if (!d.blog) setNotFound(true);
        else setBlog(d.blog);
      })
      .catch((e) => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Helper to ensure full URL for cover images if they are relative
  const getCoverImage = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `https://340realestate.com${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col selection:bg-accent selection:text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 gap-6 flex-grow opacity-80">
          <Loader2 className="w-12 h-12 text-accent animate-spin" />
          <p className="text-[12px] font-luxury-caps text-primary">Loading Article…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-surface flex flex-col selection:bg-accent selection:text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 text-center px-6 flex-grow">
          <FileText className="w-20 h-20 text-primary/10 mb-8" />
          <h1 className="text-4xl md:text-6xl font-heading text-primary uppercase mb-6">
            Article Not Found
          </h1>
          <p className="text-primary/60 text-lg font-light mb-12 max-w-md">
            The journal entry you are looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blogs"
            className="flex items-center gap-4 bg-primary text-white px-10 py-5 text-[11px] font-luxury-caps hover:bg-black transition-colors shadow-2xl"
          >
            <ChevronLeft className="w-4 h-4" /> BACK TO JOURNAL
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const blocks = Array.isArray(blog.content_blocks) ? blog.content_blocks : [];
  const coverImage = getCoverImage(blog.cover_image);

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-primary">
        {coverImage && (
          <div className="absolute inset-0 opacity-30">
            <img
              src={coverImage}
              alt="Background cover"
              className="w-full h-full object-cover blur-sm mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
          </div>
        )}
        <div className="relative max-w-[1000px] mx-auto px-6 py-32 md:py-48 flex flex-col items-center text-center z-10 pt-48">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-3 text-[11px] font-luxury-caps text-accent hover:text-white transition-colors mb-12 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            BACK TO JOURNAL
          </Link>

          <h1 className="text-5xl md:text-7xl font-heading text-white uppercase tracking-tighter leading-[0.9] mb-12 drop-shadow-2xl">
            {blog.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-luxury-caps text-white/70">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-accent" /> BY {blog.author || "St. John Team"}
            </div>
            <div className="w-1 h-1 bg-accent rounded-full" />
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-accent" /> {Math.max(2, blocks.length)} MIN READ
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[900px] mx-auto w-full px-6 -mt-16 relative z-20 mb-32 flex-grow">
        <div className="bg-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] p-10 md:p-16 lg:p-24 border border-primary/5">
          <p className="text-2xl md:text-3xl text-primary leading-relaxed mb-16 font-heading italic text-center text-balance">
            {blog.excerpt}
          </p>

          <div className="w-12 h-0.5 bg-accent/30 mx-auto mb-16" />

          <article className="flex flex-col gap-10">
            {blocks.map((block) => {
              if (block.type === "heading") {
                if (block.level === "h2")
                  return (
                    <h2
                      key={block.id}
                      className="text-4xl md:text-5xl font-heading text-primary uppercase mt-8 mb-4 tracking-tight"
                    >
                      {block.value}
                    </h2>
                  );
                if (block.level === "h3")
                  return (
                    <h3
                      key={block.id}
                      className="text-3xl md:text-4xl font-heading text-primary uppercase mt-6 mb-3"
                    >
                      {block.value}
                    </h3>
                  );
                return (
                  <h4
                    key={block.id}
                    className="text-[13px] font-luxury-caps text-accent mt-4 mb-2"
                  >
                    {block.value}
                  </h4>
                );
              }

              if (block.type === "paragraph") {
                return (
                  <p
                    key={block.id}
                    className={`text-lg md:text-xl text-primary/80 font-light leading-[2] ${
                      block.dropCap
                        ? "first-letter:text-6xl first-letter:font-heading first-letter:text-accent first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]"
                        : ""
                    }`}
                  >
                    {block.value}
                  </p>
                );
              }

              if (block.type === "calligraphy") {
                return (
                  <div
                    key={block.id}
                    className="my-12 flex justify-center py-12 border-y border-primary/10"
                  >
                    <p className="text-3xl md:text-5xl text-accent leading-relaxed italic text-center max-w-3xl font-heading text-balance">
                      "{block.value}"
                    </p>
                  </div>
                );
              }

              if (block.type === "quote") {
                return (
                  <blockquote
                    key={block.id}
                    className="relative my-10 px-10 md:px-16 py-12 bg-surface-dark border-l-4 border-accent"
                  >
                    <div className="text-2xl md:text-3xl font-heading text-primary italic mb-6 leading-relaxed relative z-10">
                      "{block.value}"
                    </div>
                    {block.author && (
                      <div className="text-[11px] font-luxury-caps text-primary/60">
                        — {block.author}
                      </div>
                    )}
                  </blockquote>
                );
              }

              if (block.type === "image") {
                return (
                  <div
                    key={block.id}
                    className={`my-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-primary/5 ${
                      block.size === "inline" ? "max-w-2xl mx-auto" : "w-full"
                    }`}
                  >
                    <img
                      src={getCoverImage(block.value)}
                      alt={block.caption || "Blog visual"}
                      className="w-full h-auto object-cover max-h-[700px] bg-surface-dark grayscale-[10%] hover:grayscale-0 transition-all duration-1000"
                    />
                    {block.caption && (
                      <p className="p-6 bg-white text-[11px] text-center font-luxury-caps text-primary/50">
                        {block.caption}
                      </p>
                    )}
                  </div>
                );
              }

              if (block.type === "link") {
                return (
                  <div key={block.id} className="my-12 flex justify-center">
                    <a
                      href={block.url || "#"}
                      className="inline-flex items-center justify-center gap-4 bg-primary text-white px-12 py-6 text-[11px] font-luxury-caps hover:bg-black transition-all shadow-xl hover:shadow-2xl"
                    >
                      {block.value || "CLICK HERE"}
                    </a>
                  </div>
                );
              }

              return null;
            })}
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
