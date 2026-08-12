import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Properties from './pages/Properties'
import MLS from './pages/MLS'
import PropertyDetails from './pages/PropertyDetails'
import AboutStJohn from './pages/AboutStJohn'
import AboutUs from './pages/AboutUs'
import SalesHistory from './pages/SalesHistory'
import Blogs from './pages/Blogs'
import BlogDetails from './pages/BlogDetails'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/mls" element={<MLS />} />
        <Route path="/property/:slug" element={<PropertyDetails />} />
        <Route path="/about" element={<AboutStJohn />} />
        <Route path="/about-340-realestate-team" element={<AboutUs />} />
        <Route path="/saleshistory" element={<SalesHistory />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
