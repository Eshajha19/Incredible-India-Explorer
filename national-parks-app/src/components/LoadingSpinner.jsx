import React from 'react';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#05110b] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 rounded-full border-4 border-emerald-900/40 border-t-amber-500 flex items-center justify-center mb-6 shadow-[0_0_35px_rgba(212,154,29,0.3)]"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <PawPrint className="w-8 h-8 text-amber-400" />
        </motion.div>
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-gradient-gold tracking-wider mb-2"
      >
        UNFOLDING THE WILDERNESS...
      </motion.h3>
      <p className="text-sm text-emerald-100/60 max-w-sm">
        Preparing interactive mapping engines and rich sanctuaries catalog.
      </p>
    </div>
  );
}
