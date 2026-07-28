import React from 'react';
import { motion } from 'framer-motion';
import { Trees, ShieldCheck, Sparkles, PawPrint, Globe, Award } from 'lucide-react';

export default function Introduction() {
  const introItems = [
    {
      title: "What are National Parks?",
      description: "National Parks are strictly legally protected terrestrial and aquatic natural reserves dedicated to conserving pure ecosystems, endangered fauna, endemic flora, and geological wonders from industrial human exploitation.",
      icon: <Trees className="w-8 h-8 text-amber-400" />,
      badge: "Sanctuary Status"
    },
    {
      title: "Wildlife Conservation",
      description: "Spearing iconic initiatives like Project Tiger (1973) and Project Elephant, Indian zoological initiatives restore biological equilibrium, maintain secure forest corridors, and rescue apex predators from imminent extinction.",
      icon: <ShieldCheck className="w-8 h-8 text-amber-400" />,
      badge: "Scientific Guardianship"
    },
    {
      title: "India's Mega Biodiversity",
      description: "As one of Earth's recognized mega-biodiversity hotspots, India encompasses four diverse ecological domains—ranging from freezing Himalayan heights and Western Ghats rain forests to arid thorn deserts and tidal islands.",
      icon: <Globe className="w-8 h-8 text-amber-400" />,
      badge: "Ecological Hotspot"
    }
  ];

  return (
    <section id="about-section" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/40 text-amber-400 border border-amber-500/30 text-xs font-extrabold tracking-widest uppercase mb-4 shadow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sacred Ecosystems & Guardians</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Where Wilderness Reaches <span className="text-gradient-gold">Eternity</span>
        </h2>
        <p className="text-base md:text-lg text-emerald-100/80 leading-relaxed font-normal">
          India stands as a distinguished global leader in environmental stewardship—safeguarding irreplaceable biological phenomena and diverse natural sanctuaries across twenty-eight sovereign territorial states.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {introItems.map((item, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, threshold: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 sm:p-10 rounded-3xl glass-card border border-emerald-500/20 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative bg-[#06160f]"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-600/40 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider">
                  {item.badge}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-emerald-900/40 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(226,175,58,0.3)] transition-all duration-300">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-gradient-gold transition-colors mb-4">
                {item.title}
              </h3>
              <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-emerald-900/50 flex items-center gap-2 text-xs font-semibold text-emerald-300/70">
              <Award className="w-4 h-4 text-amber-400" />
              <span>National Conservation Pledge</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
