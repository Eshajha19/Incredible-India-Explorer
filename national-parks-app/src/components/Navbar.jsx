import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trees, Menu, X, MapPin, Compass } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (location.pathname === '/') {
        const sections = ['home', 'about-section', 'interactive-map', 'explore-section'];
        const scrollPos = window.scrollY + 180;
        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
            setActiveSection(id);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (targetId, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(targetId);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Parks', id: 'explore-section' },
    { label: 'States', id: 'explore-section' },
    { label: 'Map', id: 'interactive-map' },
    { label: 'About', id: 'about-section' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-[#05110b]/85 backdrop-blur-md border-b border-emerald-900/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#05110b] shadow-[0_0_20px_rgba(226,175,58,0.4)] group-hover:scale-105 transition-transform duration-300">
            <Trees className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
              INDIA <span className="text-gradient-gold font-normal">PARKS</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-emerald-400/80 tracking-widest -mt-1">
              Untamed Wilderness Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(item.id, e)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeSection === item.id && location.pathname === '/'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold shadow-[0_0_15px_rgba(226,175,58,0.2)]'
                  : 'text-emerald-100/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => handleNavClick('explore-section', e)}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 btn-gold text-xs font-extrabold uppercase tracking-wider cursor-pointer btn-gold-hover"
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Start Safari</span>
          </button>

          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#05110b]/95 backdrop-blur-xl border-t border-emerald-900/50 px-6 py-6 mt-3 overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`py-3 px-4 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'text-emerald-100/80 hover:bg-emerald-900/30 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-amber-500/60">→</span>
                </a>
              ))}
              <button
                type="button"
                onClick={(e) => handleNavClick('explore-section', e)}
                className="mt-2 w-full py-3.5 btn-gold flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider shadow-lg cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Sanctuaries</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
