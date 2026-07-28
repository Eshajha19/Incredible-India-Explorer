import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Map, Sparkles, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#05110b] pt-20 pb-16">
      {/* Cinematic Background Image with Parallax */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-75 pointer-events-none"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2000&q=85")`,
          transform: `translateY(${scrollY * 0.4}px) scale(1.05)`,
        }}
        aria-hidden="true"
      />

      {/* Deep Rich Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05110b]/75 via-[#05110b]/60 to-[#05110b] z-10 pointer-events-none" />

      {/* Decorative Emerald Glow Orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-10 text-center my-auto">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/40 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-bold tracking-wide uppercase shadow-[0_0_25px_rgba(226,175,58,0.2)] backdrop-blur-md mb-6"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>India's Protected Sanctuaries & Eco Heritage</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg"
        >
          Explore India's <span className="text-gradient-gold block sm:inline">National Parks</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base sm:text-xl text-emerald-100/85 max-w-3xl mx-auto leading-relaxed font-normal mb-10 drop-shadow"
        >
          Immerse yourself in India's breathtaking wilderness and protected mega-biodiversity. Witness majestic Royal Bengal Tigers in Ranthambore, ancient rhinos across Kaziranga's marshes, and swimming predators across the Sundarbans mangrove labyrinth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            type="button"
            onClick={() => scrollToSection('explore-section')}
            className="w-full sm:w-auto px-8 py-4 btn-gold flex items-center justify-center gap-3 text-sm sm:text-base tracking-wider shadow-[0_10px_35px_rgba(212,154,29,0.4)] btn-gold-hover cursor-pointer"
          >
            <Compass className="w-5 h-5" />
            <span>Explore Parks</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('interactive-map')}
            className="w-full sm:w-auto px-8 py-4 btn-glass flex items-center justify-center gap-3 text-sm sm:text-base tracking-wider btn-glass-hover cursor-pointer"
          >
            <Map className="w-5 h-5 text-amber-400" />
            <span>Interactive Map</span>
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('about-section')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-emerald-300/70 hover:text-amber-400 transition-colors cursor-pointer group focus:outline-none"
        aria-label="Scroll down to discover more"
      >
        <div className="w-6 h-11 rounded-full border-2 border-emerald-400/50 group-hover:border-amber-400/80 flex justify-center p-1 backdrop-blur-sm transition-colors">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 rounded-full bg-amber-400"
          />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
          Scroll to Discover
          <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
        </span>
      </motion.button>
    </section>
  );
}
