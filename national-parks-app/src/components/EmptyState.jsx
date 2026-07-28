import React from 'react';
import { motion } from 'framer-motion';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="col-span-full py-16 px-6 glass-card rounded-3xl text-center flex flex-col items-center justify-center border border-amber-500/20 max-w-2xl mx-auto my-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center mb-6 text-amber-400 shadow-[0_0_30px_rgba(212,154,29,0.2)]">
        <SearchX className="w-10 h-10 animate-pulse" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-3">
        No Sanctuaries Found
      </h3>
      <p className="text-emerald-100/70 max-w-md mb-8 text-sm md:text-base leading-relaxed">
        We couldn't locate any National Parks matching your specific search query, territorial State, or regional boundary filters. Try resetting your search metrics to uncover all protected reserves!
      </p>
      <button
        type="button"
        onClick={onReset}
        className="btn-gold px-8 py-3.5 flex items-center gap-2.5 font-bold tracking-wide shadow-lg text-sm md:text-base cursor-pointer hover:scale-105 transition-all duration-300"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Reset All Filters</span>
      </button>
    </motion.div>
  );
}
