import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, ArrowUpRight, Send, CheckCircle2, AlertCircle, Building2, MessageSquare } from 'lucide-react';

const ST_JOHN_NEIGHBORHOODS = [
  'Cruz Bay',
  'Coral Bay',
  'Chocolate Hole',
  'Peter Bay',
  'Fish Bay',
  'Great Cruz Bay',
  'Pastory / Bethany',
  'Gift Hill',
  'Estate Concordia',
  'Rendezvous Bay / Ditleff Point',
  'Mahogany Run / North Shore',
  'Bordeaux Mountain',
  'Calabash Boom / East End',
  'Other St. John Location'
];

const PROPERTY_TYPES = [
  'Single Family Villa',
  'Luxury Estate',
  'Condominium',
  'Land / Homesite',
  'Commercial Property',
  'Fractional / Timeshare',
  'Other'
];

const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  
  // Active Tab: 'general' or 'sell'
  const [activeTab, setActiveTab] = useState(typeParam === 'sell' ? 'sell' : 'general');

  // Synchronize tab when URL query changes
  useEffect(() => {
    if (typeParam === 'sell') {
      setActiveTab('sell');
    }
  }, [typeParam]);

  // General Form State
  const [generalForm, setGeneralForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    interest: 'Buying Property',
    message: ''
  });

  // Dedicated Sell Form State
  const [sellForm, setSellForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    propertyAddress: '',
    propertyType: 'Single Family Villa',
    neighborhood: 'Cruz Bay',
    askingPrice: '',
    additionalDetails: '',
    stJohnConfirmed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSubmitStatus(null);
    setValidationError('');
    setSearchParams(tab === 'sell' ? { type: 'sell' } : {});
  };

  const handleGeneralChange = (e) => {
    setGeneralForm({
      ...generalForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSellChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSellForm({
      ...sellForm,
      [name]: type === 'checkbox' ? checked : value
    });
    if (name === 'stJohnConfirmed' && checked) {
      setValidationError('');
    }
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setValidationError('');

    try {
      const concatenatedMessage = `Interest: ${generalForm.interest}\n\n${generalForm.message}`;

      const payload = {
        name: generalForm.fullName.trim(),
        email: generalForm.email.trim(),
        mobile: generalForm.mobile.trim(),
        message: concatenatedMessage
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
        setGeneralForm({
          fullName: '',
          mobile: '',
          email: '',
          interest: 'Buying Property',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting inquiry form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSellSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setValidationError('');

    // St. John Location Validation Check
    if (!sellForm.stJohnConfirmed) {
      setValidationError('Please verify that your property is located in St. John, USVI to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Concatenate all property details into the message field
      const propertyDetails = [
        '=== SELL YOUR PROPERTY SUBMISSION ===',
        'Location Verification: Confirmed St. John, USVI Property',
        `Property Address: ${sellForm.propertyAddress.trim()}`,
        `Property Type: ${sellForm.propertyType}`,
        `Neighborhood / Area: ${sellForm.neighborhood}`,
        sellForm.askingPrice.trim() ? `Asking / Target Price: ${sellForm.askingPrice.trim()}` : 'Asking / Target Price: Not specified',
        '',
        'Additional Property Details:',
        sellForm.additionalDetails.trim() || 'No additional notes provided'
      ].join('\n');

      // Send name, email, mobile atomically with property info concatenated in message
      const payload = {
        name: sellForm.fullName.trim(),
        email: sellForm.email.trim(),
        mobile: sellForm.mobile.trim(),
        message: propertyDetails
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
        setSellForm({
          fullName: '',
          email: '',
          mobile: '',
          propertyAddress: '',
          propertyType: 'Single Family Villa',
          neighborhood: 'Cruz Bay',
          askingPrice: '',
          additionalDetails: '',
          stJohnConfirmed: false
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting sell property form:', error);
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
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-[12px] font-luxury-caps tracking-[0.4em] font-bold block"
          >
            {activeTab === 'sell' ? 'LIST WITH LOCAL EXPERTS' : 'GET IN TOUCH'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading"
          >
            {activeTab === 'sell' ? 'Sell Your Property' : 'Contact Us'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 max-w-2xl mx-auto font-light leading-relaxed text-base text-balance"
          >
            {activeTab === 'sell' 
              ? 'Looking to sell your St. John residence, land, or commercial property? Submit your property details for a confidential consultation and marketing plan.'
              : "Whether you're looking to purchase your dream island home or have questions about St. John real estate, our dedicated local team is here to guide you."
            }
          </motion.p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-grow max-w-[1500px] w-full mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Column - Contact Details & Map */}
        <div className="lg:col-span-5 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading text-slate-900 leading-tight">
              {activeTab === 'sell' ? 'Ready to List Your St. John Home?' : "We'd love to hear from you."}
            </h2>
            <p className="text-slate-700 leading-relaxed max-w-md text-base">
              {activeTab === 'sell'
                ? 'Tammy Donnelly and the 340 Real Estate team specialize exclusively in St. John properties, delivering unmatched local knowledge, MLS visibility, and qualified buyers.'
                : 'Reach out directly using the form, or drop us an email or phone call. Our team generally responds within 24 hours.'
              }
            </p>
          </div>

          <div className="space-y-10">
            {/* Office Location */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border-2 border-accent/20 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-luxury-caps text-accent tracking-[0.25em] uppercase font-black">Office Location</h4>
                <p className="text-slate-900 font-bold text-lg leading-snug">340 Real Estate Company</p>
                <p className="text-slate-700 font-medium">PO Box 760</p>
                <p className="text-slate-700 font-medium">St John, VI 00831</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border-2 border-accent/20 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-luxury-caps text-accent tracking-[0.25em] uppercase font-black">Phone</h4>
                <a href="tel:+13406436068" className="text-slate-900 hover:text-accent transition-colors block text-lg font-bold">+1 (340) 643-6068</a>
                <a href="tel:+13407794478" className="text-slate-900 hover:text-accent transition-colors block text-lg font-bold">+1 (340) 779-4478</a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full border-2 border-accent/20 flex items-center justify-center text-accent bg-white shadow-sm flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-luxury-caps text-accent tracking-[0.25em] uppercase font-black">Email</h4>
                <a href="mailto:340realestateco@gmail.com" className="text-slate-900 hover:text-accent transition-colors text-lg font-bold block">340realestateco@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Map Embed Container */}
          <div className="rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl relative h-[320px] bg-slate-100 group">
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
              className="absolute top-4 left-4 bg-white text-slate-900 font-bold text-[11px] font-luxury-caps tracking-widest px-5 py-3 rounded-xl border border-slate-200 hover:bg-primary hover:text-white transition-all shadow-lg flex items-center gap-2"
            >
              Open in Maps <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column - Interactive Form Card with Tabs */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[32px] p-8 md:p-14 border border-slate-200/90 shadow-2xl space-y-8">
            
            {/* Tab Selection Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200">
              <button
                type="button"
                onClick={() => handleTabSwitch('general')}
                className={`flex-1 py-3.5 px-4 rounded-xl text-[11px] font-luxury-caps font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-white text-slate-900 shadow-md border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-accent" />
                <span>General / Buyer Inquiry</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleTabSwitch('sell')}
                className={`flex-1 py-3.5 px-4 rounded-xl text-[11px] font-luxury-caps font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'sell'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-accent" />
                <span>Sell Your Property</span>
              </button>
            </div>

            {/* TAB 1: GENERAL / BUYER INQUIRY FORM */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl font-heading text-slate-900 mb-2">Send a Message</h3>
                  <p className="text-slate-700 text-sm font-medium">Looking to buy a property or have a general inquiry? Fill out the form below.</p>
                </div>

                <form onSubmit={handleGeneralSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Full Name *</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName"
                        required
                        value={generalForm.fullName}
                        onChange={handleGeneralChange}
                        placeholder="John Doe"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="mobile" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Mobile Number</label>
                      <input 
                        type="tel" 
                        id="mobile" 
                        name="mobile"
                        value={generalForm.mobile}
                        onChange={handleGeneralChange}
                        placeholder="+1 (340) 000-0000"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        value={generalForm.email}
                        onChange={handleGeneralChange}
                        placeholder="you@email.com"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="interest" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">I am interested in...</label>
                      <div className="relative">
                        <select 
                          id="interest" 
                          name="interest"
                          value={generalForm.interest}
                          onChange={handleGeneralChange}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium appearance-none focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm cursor-pointer shadow-sm"
                        >
                          <option value="Buying Property">Buying Property in St. John</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Rental Properties">Rental Properties</option>
                          <option value="Market Consultation">Market Consultation</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-600">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Your Message *</label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows="5"
                      value={generalForm.message}
                      onChange={handleGeneralChange}
                      placeholder="How can we help you find your dream island property?"
                      className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm resize-none shadow-sm"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-primary text-white text-[11px] font-luxury-caps font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_20px_40px_rgba(26,47,47,0.15)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* TAB 2: DEDICATED SELL YOUR PROPERTY FORM */}
            {activeTab === 'sell' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl font-heading text-slate-900 mb-2">Sell Your Property in St. John</h3>
                  <p className="text-slate-700 text-sm font-medium">Provide your property details below for an expert evaluation and listing strategy.</p>
                </div>

                <form onSubmit={handleSellSubmit} className="space-y-6">
                  
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="sellFullName" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Full Name *</label>
                      <input 
                        type="text" 
                        id="sellFullName" 
                        name="fullName"
                        required
                        value={sellForm.fullName}
                        onChange={handleSellChange}
                        placeholder="e.g. Jane Smith"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="sellMobile" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="sellMobile" 
                        name="mobile"
                        required
                        value={sellForm.mobile}
                        onChange={handleSellChange}
                        placeholder="+1 (340) 000-0000"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="sellEmail" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Email Address *</label>
                      <input 
                        type="email" 
                        id="sellEmail" 
                        name="email"
                        required
                        value={sellForm.email}
                        onChange={handleSellChange}
                        placeholder="you@email.com"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="askingPrice" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Asking / Target Price (Optional)</label>
                      <input 
                        type="text" 
                        id="askingPrice" 
                        name="askingPrice"
                        value={sellForm.askingPrice}
                        onChange={handleSellChange}
                        placeholder="e.g. $1,250,000"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-2">
                    <label htmlFor="propertyAddress" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Property Address / Parcel Number *</label>
                    <input 
                      type="text" 
                      id="propertyAddress" 
                      name="propertyAddress"
                      required
                      value={sellForm.propertyAddress}
                      onChange={handleSellChange}
                      placeholder="e.g. 10-15 Estate Chocolate Hole, St. John, VI"
                      className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="propertyType" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Property Type *</label>
                      <div className="relative">
                        <select 
                          id="propertyType" 
                          name="propertyType"
                          required
                          value={sellForm.propertyType}
                          onChange={handleSellChange}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium appearance-none focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm cursor-pointer shadow-sm"
                        >
                          {PROPERTY_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-600">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="neighborhood" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Neighborhood / Location (St. John) *</label>
                      <div className="relative">
                        <select 
                          id="neighborhood" 
                          name="neighborhood"
                          required
                          value={sellForm.neighborhood}
                          onChange={handleSellChange}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium appearance-none focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm cursor-pointer shadow-sm"
                        >
                          {ST_JOHN_NEIGHBORHOODS.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-600">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="additionalDetails" className="text-[11px] font-luxury-caps text-slate-800 font-bold uppercase tracking-wider block">Additional Property Details</label>
                    <textarea 
                      id="additionalDetails" 
                      name="additionalDetails"
                      rows="4"
                      value={sellForm.additionalDetails}
                      onChange={handleSellChange}
                      placeholder="Share details such as bedrooms/bathrooms, view, amenities, recent renovations, or current rental history..."
                      className="w-full px-5 py-4 rounded-xl bg-slate-50/80 border-2 border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 transition-all text-sm resize-none shadow-sm"
                    />
                  </div>

                  {/* Location Confirmation Validation Checkbox */}
                  <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-300 flex items-start gap-3.5 shadow-sm">
                    <input 
                      type="checkbox"
                      id="stJohnConfirmed"
                      name="stJohnConfirmed"
                      checked={sellForm.stJohnConfirmed}
                      onChange={handleSellChange}
                      required
                      className="mt-1 w-4 h-4 text-accent accent-accent rounded border-slate-300 cursor-pointer"
                    />
                    <label htmlFor="stJohnConfirmed" className="text-xs text-slate-800 leading-relaxed cursor-pointer select-none">
                      <span className="font-bold text-slate-950">Location Confirmation: *</span> I confirm that this property is located on the island of <span className="font-bold text-accent">St. John, U.S. Virgin Islands</span>.
                    </label>
                  </div>

                  {validationError && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2 shadow-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-700" />
                      <span>{validationError}</span>
                    </motion.div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-accent text-white text-[12px] font-luxury-caps font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_20px_40px_rgba(197,160,89,0.3)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Property Details...</span>
                    ) : (
                      <>
                        <span>Submit Property for Listing</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Submission Feedback Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-sm flex items-start gap-3 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Thank you! Your submission has been received.</p>
                    <p className="text-emerald-900 text-xs mt-1 font-medium">Our local St. John real estate specialists will review your details and contact you shortly.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 text-sm flex items-start gap-3 shadow-sm"
                >
                  <AlertCircle className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Submission failed.</p>
                    <p className="text-rose-900 text-xs mt-1 font-medium">An error occurred while submitting your inquiry. Please try again or call us directly at +1 (340) 643-6068.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
