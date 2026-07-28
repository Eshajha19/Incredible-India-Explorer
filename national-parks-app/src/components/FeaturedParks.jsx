import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import Filter from './Filter';
import ParkCard from './ParkCard';
import EmptyState from './EmptyState';
import { nationalParks } from '../data/nationalParks';
import { Compass, Sparkles } from 'lucide-react';

export default function FeaturedParks({
  searchTerm,
  onSearchChange,
  selectedState,
  onStateChange,
  selectedRegion,
  onRegionChange,
  onReset
}) {
  const uniqueStates = React.useMemo(() => {
    return Array.from(new Set(nationalParks.map((p) => p.state))).sort();
  }, []);

  const filteredParks = React.useMemo(() => {
    return nationalParks.filter((park) => {
      const matchesState = selectedState === 'all' || park.state.toLowerCase() === selectedState.toLowerCase();
      const matchesRegion = selectedRegion === 'all' || park.region.toLowerCase() === selectedRegion.toLowerCase();
      
      let matchesSearch = true;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const fullText = `${park.name} ${park.state} ${park.region} ${park.description} ${park.wildlife.join(' ')}`.toLowerCase();
        matchesSearch = fullText.includes(query);
      }

      return matchesState && matchesRegion && matchesSearch;
    });
  }, [searchTerm, selectedState, selectedRegion]);

  const hasActiveFilters = searchTerm !== '' || selectedState !== 'all' || selectedRegion !== 'all';

  return (
    <section id="explore-section" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/40 text-amber-400 border border-amber-500/30 text-xs font-extrabold tracking-widest uppercase mb-4 shadow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sanctuary Catalog & Reservations</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Featured <span className="text-gradient-gold">National Parks</span>
        </h2>
        <p className="text-base md:text-lg text-emerald-100/80 leading-relaxed">
          Explore our curated collection of India's premier wilderness sanctuaries. Search by wildlife species, geographic state, or territorial region.
        </p>
      </div>

      {/* Interactive Search & Filter Controls */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <Filter
          states={uniqueStates}
          selectedState={selectedState}
          onStateChange={onStateChange}
          selectedRegion={selectedRegion}
          onRegionChange={onRegionChange}
          onReset={onReset}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Live Status Counter & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-b border-emerald-900/40">
        <span className="text-sm sm:text-base font-medium text-emerald-100/80">
          Showing <strong className="text-amber-400 font-bold">{filteredParks.length}</strong> of <strong className="text-white font-bold">{nationalParks.length}</strong> protected sanctuaries
        </span>
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <span>⚡ Active Parameters</span>
          </div>
        )}
      </div>

      {/* Responsive Park Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {filteredParks.length > 0 ? (
          filteredParks.map((park, index) => (
            <ParkCard key={park.id} park={park} index={index} />
          ))
        ) : (
          <EmptyState onReset={onReset} />
        )}
      </div>
    </section>
  );
}
