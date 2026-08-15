import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import salesData from '../../sales_data.json'
import { TrendingUp, Home, Map, Building2, ExternalLink, Calendar } from 'lucide-react'

const SalesHistory = () => {
  const stats2025 = [
    {
      category: "HOMES",
      icon: <Home className="w-8 h-8" />,
      sold: `${salesData.Homes?.[0]?.sold || 48} Sold`,
      stats: [
        { label: "Lowest", val: salesData.Homes?.[0]?.low || "$255,000" },
        { label: "Highest", val: salesData.Homes?.[0]?.high || "$10,500,000" },
        { label: "Average", val: salesData.Homes?.[0]?.avg || "$5,377,500" },
        { label: "Total Volume", val: salesData.Homes?.[0]?.total || "$78,302,500" }
      ]
    },
    {
      category: "LAND",
      icon: <Map className="w-8 h-8" />,
      sold: `${salesData.Land?.[0]?.sold || 23} Sold`,
      stats: [
        { label: "Lowest", val: salesData.Land?.[0]?.low || "$37,500" },
        { label: "Highest", val: salesData.Land?.[0]?.high || "$350,000" },
        { label: "Average", val: salesData.Land?.[0]?.avg || "$193,750" },
        { label: "Total Volume", val: salesData.Land?.[0]?.total || "$3,441,500" }
      ]
    },
    {
      category: "CONDOS",
      icon: <Building2 className="w-8 h-8" />,
      sold: `${salesData.Condos?.[0]?.sold || 9} Sold`,
      stats: [
        { label: "Lowest", val: salesData.Condos?.[0]?.low || "$500,000" },
        { label: "Highest", val: salesData.Condos?.[0]?.high || "$1,500,000" },
        { label: "Average", val: salesData.Condos?.[0]?.avg || "$1,000,000" },
        { label: "Total Volume", val: salesData.Condos?.[0]?.total || "$8,405,000" }
      ]
    }
  ]

  const [activeTab, setActiveTab] = React.useState('Homes')

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/saleshistoryhero.jpeg" 
            className="w-full h-full object-cover" 
            alt="St. John Sales History" 
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent text-[12px] font-luxury-caps tracking-[0.5em]">Market Analysis</span>
            <div className="h-px w-12 bg-accent" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-heading tracking-tighter leading-none uppercase mb-8"
          >
            Sales History
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-light italic opacity-60 tracking-widest max-w-2xl mx-auto"
          >
            Tracking the evolution of St. John's luxury real estate market over the decades.
          </motion.p>
        </div>
      </section>

      {/* 2025 Numbers Section */}
      <section className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
             <div className="space-y-4">
               <span className="text-accent text-[11px] font-luxury-caps tracking-[0.4em]">Current Snapshot</span>
               <h2 className="text-5xl md:text-8xl font-heading text-primary uppercase tracking-tighter">2025 Numbers</h2>
             </div>
             <div className="flex items-center gap-4 text-primary/30 font-bold bg-surface p-6 rounded-2xl border border-black/5">
                <Calendar className="w-5 h-5 text-accent" />
                <p className="text-[13px] font-luxury-caps tracking-[0.2em]">Full Year Performance</p>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             {stats2025.map((cat, i) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-surface-dark p-12 rounded-3xl border border-black/5 relative group hover:bg-white hover:shadow-2xl transition-all duration-500"
                >
                   <div className="absolute top-12 right-12 text-accent/20 group-hover:text-accent/60 transition-colors">
                      {cat.icon}
                   </div>
                   <h3 className="text-4xl font-heading text-primary mb-2 italic group-hover:text-accent transition-colors">{cat.category}</h3>
                   <p className="text-[11px] font-luxury-caps font-black tracking-[0.3em] text-primary/40 mb-12 flex items-center gap-2">
                     <TrendingUp className="w-3 h-3" /> {cat.sold}
                   </p>

                   <div className="space-y-8">
                      {cat.stats.map(s => (
                        <div key={s.label} className="flex justify-between items-end border-b border-black/5 pb-4 group/stat">
                           <span className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] group-hover/stat:text-primary transition-colors">{s.label}</span>
                           <span className="text-2xl font-heading text-primary group-hover/stat:text-accent transition-colors">{s.val}</span>
                        </div>
                      ))}
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-32 px-6 bg-surface-dark border-y border-black/5">
         <div className="max-w-[1200px] mx-auto text-center space-y-16">
            <div className="space-y-4">
              <span className="text-accent text-[11px] font-luxury-caps tracking-[0.4em]">Growth Trends</span>
              <h2 className="text-4xl md:text-7xl font-heading text-primary uppercase tracking-tighter">Market Trajectory</h2>
            </div>
            
            <div className="relative group p-4 bg-white rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden">
               <img 
                 src="/assets/chart.png" 
                 className="w-full h-auto rounded-[32px] group-hover:scale-[1.02] transition-transform duration-1000" 
                 alt="Market Sales Chart" 
               />
               <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <p className="max-w-3xl mx-auto text-primary/40 text-[13px] font-medium leading-relaxed italic">
               Visual representation of the St. John real estate market appreciation. Historical data is sourced from official MLS records and analyzed annually by our team.
            </p>
         </div>
      </section>

      {/* Data Table Preview from sales_data.json */}
      <section className="py-32 px-6 bg-white overflow-hidden relative">
        <div className="absolute -left-20 top-20 opacity-[0.03] pointer-events-none">
           <div className="text-[25vw] font-heading leading-none select-none italic">DATA</div>
        </div>
        <div className="max-w-[1500px] mx-auto relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
              <h2 className="text-5xl font-heading text-primary uppercase tracking-tighter">Full Historical Records</h2>
              <div className="flex bg-surface p-2 rounded-xl border border-black/5">
                {['Homes', 'Land', 'Condos'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-3 text-[10px] font-luxury-caps tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg' : 'text-primary/40 hover:text-primary'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
           </div>

           <div className="overflow-x-auto bg-surface rounded-3xl border border-black/5 shadow-inner max-h-[800px] scrollbar-thin">
              <table className="w-full text-left border-collapse">
                 <thead className="sticky top-0 z-20">
                    <tr className="bg-primary text-white border-b-8 border-accent">
                       <th className="p-8 text-[11px] font-luxury-caps tracking-[0.2em] uppercase">Year</th>
                       <th className="p-8 text-[11px] font-luxury-caps tracking-[0.2em] uppercase">Sold</th>
                       <th className="p-8 text-[11px] font-luxury-caps tracking-[0.2em] uppercase">Highest Sale</th>
                       <th className="p-8 text-[11px] font-luxury-caps tracking-[0.2em] uppercase">Average Price</th>
                       <th className="p-8 text-[11px] font-luxury-caps tracking-[0.2em] uppercase">Total Volume</th>
                    </tr>
                 </thead>
                 <tbody className="text-primary/70">
                    {salesData[activeTab].map((year, idx) => (
                      <tr key={`${activeTab}-${year.year}`} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-surface'} hover:bg-accent/10 transition-colors`}>
                         <td className="p-8 font-heading text-xl font-bold italic">{year.year}</td>
                         <td className="p-8 text-[14px] font-bold">{year.sold}</td>
                         <td className="p-8 text-[14px] font-bold text-accent">{year.high}</td>
                         <td className="p-8 text-[14px] font-bold">{year.avg}</td>
                         <td className="p-8 text-[14px] font-black">{year.total}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SalesHistory
