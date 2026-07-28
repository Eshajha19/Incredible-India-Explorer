import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatCard({ icon: Icon, targetValue = 100, suffix = '+', label = 'Statistics', delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const duration = 2200;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * targetValue);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.2 }}
      transition={{ duration: 0.6, delay: delay * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.04, y: -6 }}
      className="relative group p-8 rounded-3xl glass-card border border-emerald-500/20 hover:border-amber-500/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden text-center flex flex-col items-center justify-center"
    >
      {/* Subtle Background Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 rounded-full blur-2xl group-hover:from-amber-500/25 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

      {/* Icon Wrapper */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-950 to-emerald-900 border border-emerald-500/30 group-hover:border-amber-400/60 flex items-center justify-center mb-6 text-amber-400 shadow-inner group-hover:shadow-[0_0_25px_rgba(226,175,58,0.35)] transition-all duration-300">
        <Icon className="w-8 h-8 stroke-[2]" />
      </div>

      {/* Counter Number */}
      <div className="text-4xl md:text-5xl font-extrabold text-gradient-gold tracking-tight mb-2 font-mono">
        {count}{suffix}
      </div>

      {/* Label */}
      <p className="text-sm md:text-base font-semibold text-emerald-100/90 tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  );
}
