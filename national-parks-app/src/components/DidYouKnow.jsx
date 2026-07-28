import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trees, ShieldCheck, Globe, PawPrint } from 'lucide-react';

const FACTS = [
  {
    title: "Over 100 Sanctuaries",
    description: "India officially preserves more than 106 National Parks covering over 44,000 square kilometers, forming one of Asia's most comprehensive wildlife protection networks.",
    icon: "🇮🇳",
    badge: "Biological Heritage"
  },
  {
    title: "Bengal Tiger Empire",
    description: "The magnificent Royal Bengal Tiger is India's cherished national animal. Due to strict conservation triumphs, India protects upwards of 75% of the wild global tiger population.",
    icon: "🐅",
    badge: "Apex Predator"
  },
  {
    title: "Rhino Citadel in Kaziranga",
    description: "Assam's Kaziranga National Park is famously credited with rescuing the greater one-horned rhinoceros from imminent extinction, sheltering over 2,600 rhinos today.",
    icon: "🦏",
    badge: "UNESCO Wonder"
  },
  {
    title: "The Mangrove Labyrinth",
    description: "The Sundarbans delta represents the world's most extensive unbroken halophilic mangrove forest, globally renowned for amphibious royal tigers that readily swim across expansive salt channels.",
    icon: "🌊",
    badge: "Delta Phenomenon"
  }
];

export default function DidYouKnow() {
  return (
    <section id="facts-section" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      {/* Decorative Blur background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-extrabold tracking-widest uppercase mb-4 shadow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fascinating Wildlife Chronicles</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Did You <span className="text-gradient-gold">Know?</span>
        </h2>
        <p className="text-base md:text-lg text-emerald-100/80 leading-relaxed">
          Uncover extraordinary environmental triumphs, biological milestones, and surprising natural wonders across Indian conservation history.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {FACTS.map((item, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, threshold: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -6 }}
            className="p-8 md:p-10 rounded-3xl glass-card border border-emerald-500/20 hover:border-amber-400/60 shadow-[0_20px_45px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group relative bg-[#06150f]"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-amber-300 text-xs font-extrabold tracking-wider uppercase">
                {item.badge}
              </span>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5, ease: "easeInOut" }}
                className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform"
              >
                {item.icon}
              </motion.div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-gradient-gold transition-colors mb-4">
              {item.title}
            </h3>

            <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed font-normal">
              {item.description}
            </p>

            <div className="mt-8 pt-4 border-t border-emerald-900/50 flex items-center gap-2 text-xs font-semibold text-emerald-400/70">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verified Wildlife Conservation Insight</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
