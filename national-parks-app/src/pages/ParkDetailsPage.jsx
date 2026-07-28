import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { nationalParks } from '../data/nationalParks';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Trees, 
  PawPrint, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Navigation 
} from 'lucide-react';

export default function ParkDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const park = nationalParks.find((p) => p.id.toLowerCase() === (id || '').toLowerCase());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!park) {
    return (
      <div className="min-h-screen bg-[#05110b] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">Sanctuary Not Located</h2>
        <p className="text-emerald-200/70 mb-8 max-w-md">
          The specified National Park coordinate could not be found in our official conservation database.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn-gold px-8 py-3.5 flex items-center gap-2 font-bold cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return to Sanctuaries Hub</span>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#05110b] pt-24 pb-28 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Back Button Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-amber-300 hover:bg-amber-500 hover:text-[#05110b] font-bold text-xs uppercase tracking-wider mb-8 transition-all shadow-lg cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Catalog</span>
        </motion.button>

        {/* Large Hero Banner Section */}
        <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] rounded-3xl overflow-hidden mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-emerald-500/30 group">
          <img
            src={park.image}
            alt={park.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05110b] via-[#05110b]/50 to-transparent" />
          
          {/* Floating Badges */}
          <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
            <span className="px-4 py-2 rounded-full bg-[#05110b]/90 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-black tracking-wider uppercase shadow-xl">
              📍 {park.state} ({park.region} India)
            </span>
            <span className="px-4 py-2 rounded-full bg-emerald-900/80 backdrop-blur-md border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-bold shadow-xl">
              Ecotourism Reserve
            </span>
          </div>

          {/* Hero Content Bottom Overlay */}
          <div className="absolute bottom-8 left-6 md:left-10 right-6 max-w-4xl z-20">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-4 drop-shadow-md">
              {park.name}
            </h1>
            <p className="text-sm sm:text-lg text-emerald-100/90 max-w-3xl leading-relaxed drop-shadow font-normal">
              {park.description}
            </p>
          </div>
        </div>

        {/* Specifications Meta Row Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="p-6 rounded-2xl glass-panel text-center flex flex-col items-center">
            <MapPin className="w-7 h-7 text-amber-400 mb-2" />
            <span className="text-xs font-semibold text-emerald-300/70 uppercase tracking-wider">Territorial State</span>
            <span className="text-lg font-extrabold text-white mt-1">{park.state}</span>
          </div>
          <div className="p-6 rounded-2xl glass-panel text-center flex flex-col items-center">
            <Compass className="w-7 h-7 text-amber-400 mb-2" />
            <span className="text-xs font-semibold text-emerald-300/70 uppercase tracking-wider">Geographic Region</span>
            <span className="text-lg font-extrabold text-white mt-1">{park.region} India</span>
          </div>
          <div className="p-6 rounded-2xl glass-panel text-center flex flex-col items-center">
            <Calendar className="w-7 h-7 text-amber-400 mb-2" />
            <span className="text-xs font-semibold text-emerald-300/70 uppercase tracking-wider">Established Year</span>
            <span className="text-lg font-extrabold text-white mt-1">{park.established}</span>
          </div>
          <div className="p-6 rounded-2xl glass-panel text-center flex flex-col items-center">
            <Maximize2 className="w-7 h-7 text-amber-400 mb-2" />
            <span className="text-xs font-semibold text-emerald-300/70 uppercase tracking-wider">Protected Area</span>
            <span className="text-lg font-extrabold text-white mt-1">{park.area}</span>
          </div>
        </div>

        {/* Two Column Section: Flora & Fauna vs Facts & Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Left Column: Flora & Fauna (7 cols) */}
          <div className="lg:col-span-7 space-y-12">
            {/* Fauna (Wildlife) */}
            <div className="p-8 md:p-10 rounded-3xl glass-card border border-emerald-500/20 shadow-2xl relative bg-[#06150e]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center">
                  <PawPrint className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Flagship <span className="text-gradient-gold">Fauna & Wildlife</span>
                </h3>
              </div>
              <p className="text-emerald-100/80 mb-6 text-sm sm:text-base leading-relaxed">
                This reserve supports rich breeding ecosystems for apex predators and vulnerable ungulates. During safari trails, Keep a watchful eye for these iconic inhabitants:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {park.fauna?.map((animal, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 flex items-center gap-3 shadow">
                    <span className="text-2xl">🐅</span>
                    <span className="font-bold text-sm sm:text-base text-white">{animal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flora (Botany) */}
            <div className="p-8 md:p-10 rounded-3xl glass-card border border-emerald-500/20 shadow-2xl relative bg-[#06150e]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-400 text-emerald-400 flex items-center justify-center">
                  <Trees className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Endemic <span className="text-gradient-gold">Flora & Woodlands</span>
                </h3>
              </div>
              <p className="text-emerald-100/80 mb-6 text-sm sm:text-base leading-relaxed">
                The botanical foliage provides vital shelter, oxygen generation, and natural food corridors across varied elevations and riverine marshes:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {park.flora?.map((plant, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-2xl bg-emerald-900/40 border border-emerald-600/40 text-emerald-200 text-sm font-semibold flex items-center gap-2">
                    <span>🍃</span> {plant}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Facts, Location & Attractions (5 cols) */}
          <div className="lg:col-span-5 space-y-12">
            {/* Interesting Facts Card */}
            <div className="p-8 md:p-10 rounded-3xl glass-card border border-amber-500/30 shadow-2xl relative bg-[#071911]">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                <span>Sanctuary <span className="text-gradient-gold">Chronicles</span></span>
              </h3>
              <ul className="space-y-4">
                {park.facts?.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm md:text-base text-emerald-100/90 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location & Nearby Attractions */}
            <div className="p-8 md:p-10 rounded-3xl glass-card border border-emerald-500/20 shadow-2xl relative bg-[#06150e]">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <Navigation className="w-5 h-5 text-amber-400" />
                <span>Geographical Coordinates</span>
              </h3>
              <p className="text-sm font-medium text-emerald-200/80 mb-8 pb-4 border-b border-emerald-900/50">
                📍 {park.location}
              </p>

              <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">
                Nearby Ecotourism Attractions:
              </h4>
              <div className="space-y-2.5">
                {park.nearbyAttractions?.map((attraction, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-sm font-semibold text-emerald-100 flex items-center justify-between">
                    <span>⛰️ {attraction}</span>
                    <span className="text-amber-400 text-xs font-bold">Recommended →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* High Resolution Gallery Grid Section */}
        {park.gallery && park.gallery.length > 0 && (
          <div className="mt-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-extrabold tracking-widest uppercase mb-3">
                📸 Visual Exploration
              </span>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white">
                Sanctuary <span className="text-gradient-gold">Photo Gallery</span>
              </h3>
              <p className="text-emerald-100/80 mt-2 text-sm md:text-base">
                Authentic field captures of wildlife behavior, dawn mists, and untouched forest canopies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {park.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden bg-emerald-950 border border-emerald-700/50 shadow-xl cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`${park.name} Gallery View ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="mt-20 p-10 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0c2b1a] to-emerald-950 border border-amber-500/40 text-center shadow-2xl flex flex-col items-center justify-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready for an Unforgettable <span className="text-gradient-gold">Safari Expedition?</span>
          </h3>
          <p className="text-emerald-100/85 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed font-normal">
            Plan your sustainable wildlife expedition today. Connect with verified regional forestry officials for entry permits and certified naturalist guides.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => alert(`Safari reservation inquiries for ${park.name} will open in the upcoming seasonal permitting portal. Contact regional administrative offices for instantaneous assistance!`)}
              className="btn-gold px-8 py-4 font-bold tracking-wide text-sm sm:text-base shadow-xl cursor-pointer btn-gold-hover"
            >
              Request Permit & Safari Guidance
            </button>
            <Link
              to="/"
              className="btn-glass px-8 py-4 font-bold tracking-wide text-sm sm:text-base btn-glass-hover"
            >
              Explore More Sanctuaries
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
