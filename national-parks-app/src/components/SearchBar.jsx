import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative w-full max-w-xl flex-grow">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-emerald-300/70 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by sanctuary name, flagship wildlife (e.g., Tiger, Rhino, Lion)..."
          aria-label="Live search sanctuaries and National Parks"
          className="w-full pl-12 pr-12 py-3.5 rounded-full bg-emerald-950/60 backdrop-blur-md border border-emerald-700/50 text-white placeholder-emerald-200/50 text-sm md:text-base focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 shadow-lg transition-all duration-300"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-4 p-1.5 rounded-full bg-emerald-900/80 hover:bg-amber-500 hover:text-[#05110b] text-emerald-200 transition-colors cursor-pointer"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
