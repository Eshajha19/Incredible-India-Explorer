import React from 'react';
import { Filter as FilterIcon, RotateCcw, MapPin, Compass } from 'lucide-react';

const REGIONS = ['all', 'North', 'South', 'East', 'West', 'Central', 'Northeast'];

export default function Filter({
  states = [],
  selectedState = 'all',
  onStateChange,
  selectedRegion = 'all',
  onRegionChange,
  onReset,
  hasActiveFilters
}) {
  return (
    <div className="w-full flex flex-col gap-5 bg-gradient-to-r from-emerald-950/80 via-[#0a2318]/90 to-emerald-950/80 backdrop-blur-xl border border-emerald-800/40 p-6 md:p-8 rounded-3xl shadow-[0_20px_45px_rgba(0,0,0,0.45)] my-6">
      {/* Top Row: Dropdown Filters & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-amber-400 font-bold tracking-wide text-sm md:text-base uppercase">
          <FilterIcon className="w-5 h-5" />
          <span>Tailor Safari Criteria</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* State Dropdown */}
          <div className="relative w-full sm:w-56 flex-grow sm:flex-grow-0">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={selectedState}
              onChange={(e) => onStateChange(e.target.value)}
              aria-label="Filter National Parks by State"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#061810] border border-emerald-700/50 text-white text-sm focus:outline-none focus:border-amber-400 font-medium shadow cursor-pointer transition-all"
            >
              <option value="all">All States & UTs</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Region Dropdown for Smaller Screens or Direct Selection */}
          <div className="relative w-full sm:w-48 flex-grow sm:flex-grow-0 sm:hidden">
            <select
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              aria-label="Filter National Parks by Region"
              className="w-full pl-4 pr-4 py-2.5 rounded-2xl bg-[#061810] border border-emerald-700/50 text-white text-sm focus:outline-none focus:border-amber-400 font-medium shadow cursor-pointer"
            >
              <option value="all">All Regions</option>
              {REGIONS.filter(r => r !== 'all').map(reg => (
                <option key={reg} value={reg}>{reg} India</option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="px-5 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-[#05110b] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Region Pill Buttons (Desktop/Tablet) */}
      <div className="hidden sm:flex flex-wrap items-center gap-2.5 pt-4 border-t border-emerald-900/40">
        <span className="text-xs uppercase font-extrabold text-emerald-300/70 tracking-wider mr-2 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-amber-400" />
          Region:
        </span>
        {REGIONS.map((reg) => (
          <button
            key={reg}
            type="button"
            onClick={() => onRegionChange(reg)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
              selectedRegion.toLowerCase() === reg.toLowerCase()
                ? 'btn-gold shadow-md transform scale-105 font-black text-[#05110b]'
                : 'bg-[#05140e] border border-emerald-800/40 text-emerald-100/80 hover:bg-emerald-900/50 hover:border-amber-500/40'
            }`}
          >
            {reg === 'all' ? 'All Regions' : `${reg} India`}
          </button>
        ))}
      </div>
    </div>
  );
}
