import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, ArrowUpRight, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    interest: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        message: `Interest: ${formData.interest}\n\n${formData.message}`,
        interest: formData.interest
      };

      const response = await fetch('https://340realestate.com/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          interest: 'General Inquiry',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="selection:bg-accent selection:text-white bg-surface min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Header Section */}
      <div className="pt-48 pb-32 bg-primary text-white text-center relative overflow-hidden">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-[11px] font-luxury-caps tracking-[0.4em] block"
          >
            GET IN TOUCH
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base text-balance"
          >
            Whether you're looking to buy, sell, rent, or simply have a question about the St. John market, our local experts are here to help.
          </motion.p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-grow max-w-[1500px] w-full mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Column - Contact Details & Map */}
        <div className="lg:col-span-5 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading text-primary leading-tight">
              We'd love to hear from you.
            </h2>
            <p className="text-primary/70 leading-relaxed max-w-md">
              Reach out directly using the form, or drop us an email or phone call. Our team generally responds within 24 hours.
            </p>
          </div>

          <div className="space-y-10">
            {/* Office Location */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-luxury-caps text-primary/40 tracking-[0.2em] uppercase font-bold">Office Location</h4>
                <p className="text-primary font-semibold text-lg leading-snug">340 Real Estate Company</p>
                <p className="text-primary/70">PO Box 760</p>
                <p className="text-primary/70">St John, VI 00831</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-luxury-caps text-primary/40 tracking-[0.2em] uppercase font-bold">Phone</h4>
                <a href="tel:+13406436068" className="text-primary hover:text-accent transition-colors block text-lg font-semibold">+1 (340) 643-6068</a>
                <a href="tel:+13407794478" className="text-primary hover:text-accent transition-colors block text-lg font-semibold">+1 (340) 779-4478</a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-luxury-caps text-primary/40 tracking-[0.2em] uppercase font-bold">Email</h4>
                <a href="mailto:340realestateco@gmail.com" className="text-primary hover:text-accent transition-colors text-lg font-semibold block">340realestateco@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Map Embed Container */}
          <div className="rounded-3xl overflow-hidden border border-black/5 shadow-2xl relative h-[320px] bg-slate-100 group">
            <iframe 
              title="St John Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120935.48206894086!2d-64.82199849504543!3d18.337775086884024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c05128ef7273397%3A0x7d6f51be0e6f66bd!2sSt%20John%2C%20U.S.%20Virgin%20Islands!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a 
              href="https://maps.google.com/?q=St+John,+U.S.+Virgin+Islands" 
              target="_blank" 
              rel="noreferrer"
              className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-[10px] font-luxury-caps tracking-widest px-5 py-3 rounded-xl border border-black/10 hover:bg-white hover:text-accent transition-all shadow-lg flex items-center gap-2"
            >
              Open in Maps <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column - Styled Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[32px] p-8 md:p-14 border border-black/5 shadow-2xl space-y-10">
            <div>
              <h3 className="text-3xl font-heading text-primary mb-2">Send a Message</h3>
              <p className="text-primary/60 text-sm">Fill out the form below and we will get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-[10px] font-luxury-caps text-primary/40 font-bold uppercase tracking-wider block">Full Name *</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl bg-surface border border-primary/5 text-primary placeholder-primary/30 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-[10px] font-luxury-caps text-primary/40 font-bold uppercase tracking-wider block">Mobile Number</label>
                  <input 
                    type="text" 
                    id="mobile" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+1 (246) 000-0000"
                    className="w-full px-5 py-4 rounded-xl bg-surface border border-primary/5 text-primary placeholder-primary/30 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-luxury-caps text-primary/40 font-bold uppercase tracking-wider block">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full px-5 py-4 rounded-xl bg-surface border border-primary/5 text-primary placeholder-primary/30 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-[10px] font-luxury-caps text-primary/40 font-bold uppercase tracking-wider block">I am interested in...</label>
                <div className="relative">
                  <select 
                    id="interest" 
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-surface border border-primary/5 text-primary appearance-none focus:outline-none focus:border-accent focus:bg-white transition-all text-sm cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Buy">Buying Property</option>
                    <option value="Sell">Selling Property</option>
                    <option value="Rent">Rental Properties</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-primary/40">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-luxury-caps text-primary/40 font-bold uppercase tracking-wider block">Your Message *</label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 rounded-xl bg-surface border border-primary/5 text-primary placeholder-primary/30 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-white text-[11px] font-luxury-caps rounded-xl hover:bg-black transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_20px_40px_rgba(26,47,47,0.15)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-600 text-sm font-medium text-center bg-emerald-50 py-3 rounded-xl">
                  Thank you! Your message has been sent successfully. We will get back to you soon.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-600 text-sm font-medium text-center bg-rose-50 py-3 rounded-xl">
                  An error occurred while sending your message. Please try again or contact us directly.
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
