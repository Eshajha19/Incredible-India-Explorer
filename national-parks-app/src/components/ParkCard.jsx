import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, PawPrint, Shield } from 'lucide-react';

export default function ParkCard({ park, index }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/parks/${park.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4), ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.015 }}
      onClick={handleExplore}
      className="group cursor-pointer rounded-3xl glass-card border border-emerald-600/30 hover:border-amber-400/80 transition-all duration-300 overflow-hidden flex flex-col h-full shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_50px_rgba(212,154,29,0.3)] relative bg-[#06140e]"
    >
      {/* Top Image Header with Zoom Effect */}
      <div className="relative w-full h-64 overflow-hidden bg-emerald-950">
        <img
          src={park.image}
          alt={park.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06140e] via-transparent to-black/30 opacity-85" />

        {/* Floating Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-[#05110b]/90 backdrop-blur-md border border-emerald-500/40 text-emerald-200 text-xs font-extrabold flex items-center gap-1.5 shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {park.state}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-black shadow-lg uppercase tracking-wider">
            {park.region}
          </span>
        </div>

        {/* Established Date Badge Bottom Right */}
        <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-[#05110b]/80 backdrop-blur-sm border border-emerald-700/50 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Est. {park.established}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-7 flex flex-col flex-grow justify-between gap-5">
        <div>
          <h3 className="text-2xl font-extrabold text-white group-hover:text-gradient-gold transition-colors mb-2.5 leading-snug">
            {park.name}
          </h3>
          <p className="text-sm text-emerald-100/75 leading-relaxed line-clamp-3 font-normal">
            {park.description}
          </p>
        </div>

        {/* Wildlife Pill Tags */}
        <div>
          <span className="text-[11px] uppercase font-bold text-emerald-400/80 tracking-widest block mb-2.5 flex items-center gap-1.5">
            <PawPrint className="w-3.5 h-3.5 text-amber-400" />
            Flagship Species:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {park.wildlife.slice(0, 3).map((species, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-emerald-950/90 border border-emerald-700/40 text-emerald-100 text-xs font-semibold flex items-center gap-1 shadow-sm"
              >
                <span>🌿</span> {species}
              </span>
            ))}
            {park.wildlife.length > 3 && (
              <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold">
                +{park.wildlife.length - 3} More
              </span>
            )}
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold text-emerald-300/70 group-hover:text-white transition-colors flex items-center gap-1">
            <Shield className="w-4 h-4 text-emerald-400" />
            Protected Sanctuary
          </span>
          <button
            type="button"
            className="btn-gold px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md group-hover:bg-amber-400 transition-all"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
