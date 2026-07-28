import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trees, ArrowUp, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickNav = (id, e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'home') {
        scrollToTop();
      }
    }
  };

  return (
    <footer className="bg-gradient-to-t from-[#020a06] to-[#040e09] border-t border-emerald-900/40 text-emerald-100/80 relative pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#05110b] shadow-[0_0_20px_rgba(226,175,58,0.3)]">
                <Trees className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                INDIA <span className="text-gradient-gold font-normal">PARKS</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-emerald-100/70">
              An official interactive ecosystem dedicated to celebrating India's extraordinary natural biodiversity, wildlife conservation awareness, and responsible ecotourism adventures.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-300 hover:text-amber-400 hover:border-amber-400 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-300 hover:text-amber-400 hover:border-amber-400 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-300 hover:text-amber-400 hover:border-amber-400 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-300 hover:text-amber-400 hover:border-amber-400 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-amber-400 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" onClick={(e) => handleQuickNav('home', e)} className="hover:text-amber-400 transition-colors block">Home Dashboard</a>
              </li>
              <li>
                <a href="#explore-section" onClick={(e) => handleQuickNav('explore-section', e)} className="hover:text-amber-400 transition-colors block">Featured Sanctuaries</a>
              </li>
              <li>
                <a href="#interactive-map" onClick={(e) => handleQuickNav('interactive-map', e)} className="hover:text-amber-400 transition-colors block">Interactive India Map</a>
              </li>
              <li>
                <a href="#about-section" onClick={(e) => handleQuickNav('about-section', e)} className="hover:text-amber-400 transition-colors block">About Conservation</a>
              </li>
              <li>
                <a href="#facts-section" onClick={(e) => handleQuickNav('facts-section', e)} className="hover:text-amber-400 transition-colors block">Wildlife Chronicles</a>
              </li>
            </ul>
          </div>

          {/* Popular Sanctuaries */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-amber-400 pl-3">
              Popular Parks
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/parks/corbett" onClick={scrollToTop} className="hover:text-amber-400 transition-colors block">Jim Corbett Tiger Reserve</Link>
              </li>
              <li>
                <Link to="/parks/kaziranga" onClick={scrollToTop} className="hover:text-amber-400 transition-colors block">Kaziranga Rhino Citadel</Link>
              </li>
              <li>
                <Link to="/parks/ranthambore" onClick={scrollToTop} className="hover:text-amber-400 transition-colors block">Ranthambore Fortress</Link>
              </li>
              <li>
                <Link to="/parks/sundarbans" onClick={scrollToTop} className="hover:text-amber-400 transition-colors block">Sundarbans Mangroves</Link>
              </li>
              <li>
                <Link to="/parks/periyar" onClick={scrollToTop} className="hover:text-amber-400 transition-colors block">Periyar Lake Sanctuary</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-amber-400 pl-3">
              Contact & Help Desk
            </h4>
            <ul className="space-y-4 text-sm text-emerald-100/75">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Paryavaran Bhawan, CGO Complex, Lodhi Road, New Delhi 110003, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>info@indiaparks-explorer.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>+91 (011) 2469-5262</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Mon – Sat: 8:00 AM – 6:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Footer Line */}
        <div className="pt-8 border-t border-emerald-900/40 text-center text-xs md:text-sm text-emerald-400/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} National Parks Explorer — Incredible India. Engineered with React 19, Tailwind CSS & Vite.</p>
          <div className="flex gap-6">
            <span className="hover:text-emerald-200 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-emerald-200 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-emerald-200 cursor-pointer transition-colors">Permits Portal</span>
          </div>
        </div>
      </div>

      {/* Floating Back-To-Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full btn-gold shadow-[0_5px_25px_rgba(212,154,29,0.5)] hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-6 h-6 text-[#05110b] stroke-[3]" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
