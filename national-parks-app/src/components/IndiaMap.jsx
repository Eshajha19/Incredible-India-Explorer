import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { indiaMapData } from '../data/indiaMapData';
import { nationalParks } from '../data/nationalParks';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Sparkles, Navigation } from 'lucide-react';

export default function IndiaMap({ selectedState, onSelectState }) {
  const [zoom, setZoom] = useState(1.0);
  const [tooltip, setTooltip] = useState({ visible: false, name: '', count: 0, x: 0, y: 0 });
  const [hoveredState, setHoveredState] = useState(null);

  const getParkCount = (stateName) => {
    return nationalParks.filter(p => p.state.toLowerCase() === stateName.toLowerCase()).length;
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => setZoom(1.0);

  const handleStateClick = (stateName) => {
    onSelectState(stateName);
    const exploreEl = document.getElementById('explore-section');
    if (exploreEl) {
      exploreEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="interactive-map" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-extrabold tracking-widest uppercase mb-4 shadow">
          <Navigation className="w-3.5 h-3.5" />
          <span>Interactive Geographical Cartography</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Interactive <span className="text-gradient-gold">India Map</span>
        </h2>
        <p className="text-base md:text-lg text-emerald-100/80 leading-relaxed">
          Hover over any sovereign Indian State or Union Territory to inspect its territorial expanse and sanctuary count. Click directly on a state to automatically filter our featured wildlife catalog!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* SVG Map Render Container (8 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 relative h-[550px] md:h-[680px] rounded-3xl bg-[#030d08] border border-emerald-500/30 overflow-hidden flex items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4"
        >
          {/* Zoom Controls */}
          <div className="absolute top-6 right-6 z-30 flex flex-col gap-2 bg-[#051810]/90 backdrop-blur-md p-2 rounded-2xl border border-emerald-700/50 shadow-xl">
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-3 rounded-xl hover:bg-amber-500 hover:text-[#05110b] text-emerald-200 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-3 rounded-xl hover:bg-amber-500 hover:text-[#05110b] text-emerald-200 transition-colors cursor-pointer border-t border-emerald-900/50"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              title="Reset Zoom"
              className="p-3 rounded-xl hover:bg-amber-500 hover:text-[#05110b] text-emerald-200 transition-colors cursor-pointer border-t border-emerald-900/50"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Active State Badge Overlay */}
          <div className="absolute top-6 left-6 z-30 bg-gradient-to-r from-[#061810]/95 to-[#05110b]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-amber-500/30 text-left shadow-lg pointer-events-none">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Currently Selected Territory:
            </span>
            <span className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              {selectedState === 'all' ? 'All States & UTs (Full Kingdom)' : selectedState}
            </span>
          </div>

          {/* Vector SVG Map */}
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            <svg
              viewBox="0 0 750 820"
              className="max-w-full max-h-full w-auto h-auto select-none"
              role="img"
              aria-label="Interactive India States Vector Map"
            >
              <g id="states-group">
                {indiaMapData.map((st) => {
                  const isSelected = selectedState.toLowerCase() === st.name.toLowerCase();
                  const isHovered = hoveredState === st.id;
                  const parkCount = getParkCount(st.name);

                  return (
                    <path
                      key={st.id}
                      d={st.path}
                      id={`map-state-${st.id}`}
                      onClick={() => handleStateClick(st.name)}
                      onMouseEnter={(e) => {
                        setHoveredState(st.id);
                        const rect = e.currentTarget.ownerSVGElement.parentElement.getBoundingClientRect();
                        setTooltip({
                          visible: true,
                          name: st.name,
                          count: parkCount,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.ownerSVGElement.parentElement.getBoundingClientRect();
                        setTooltip(prev => ({
                          ...prev,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        }));
                      }}
                      onMouseLeave={() => {
                        setHoveredState(null);
                        setTooltip(prev => ({ ...prev, visible: false }));
                      }}
                      className="transition-colors duration-200 cursor-pointer"
                      style={{
                        fill: isSelected
                          ? '#dfa133'
                          : isHovered
                          ? '#fce181'
                          : parkCount > 0
                          ? '#184f33'
                          : '#0a2318',
                        stroke: isSelected || isHovered ? '#ffffff' : '#04100a',
                        strokeWidth: isSelected || isHovered ? '2.5px' : '1px',
                        filter: isSelected ? 'drop-shadow(0 0 10px rgba(223, 161, 51, 0.6))' : 'none'
                      }}
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Real-time Floating Tooltip */}
          {tooltip.visible && (
            <div
              className="absolute z-50 pointer-events-none px-4 py-2.5 rounded-2xl bg-[#030f0a]/95 backdrop-blur-md border border-amber-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-transform duration-75 text-left min-w-[170px]"
              style={{
                left: tooltip.x + 20,
                top: tooltip.y - 40,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <p className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {tooltip.name}
              </p>
              <p className="text-[11px] text-amber-300/90 font-semibold mt-1">
                {tooltip.count === 1 ? '1 Featured Sanctuary' : tooltip.count > 1 ? `${tooltip.count} Featured Sanctuaries` : 'Explore Regional Biodiversity'}
              </p>
              <span className="text-[10px] text-emerald-300/70 block mt-0.5 font-medium">
                Click to isolate in catalog →
              </span>
            </div>
          )}
        </motion.div>

        {/* Map Guide Info Panel (4 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <div className="p-8 rounded-3xl glass-card border border-emerald-500/20 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-6 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Territory <span className="text-gradient-gold">Insights</span>
            </h3>
            <p className="text-sm md:text-base text-emerald-100/80 leading-relaxed mb-6">
              India encompasses four massive biological ecological zones—from snow leopard alpine ranges in Hemis down to the evergreen elephant forests of Periyar. 
            </p>

            <div className="space-y-4 pt-4 border-t border-emerald-900/50">
              <div className="flex items-center gap-3.5">
                <span className="w-4 h-4 rounded-full bg-[#dfa133] shadow-[0_0_10px_#dfa133] flex-shrink-0" />
                <span className="text-xs font-bold text-emerald-100">Currently Filtered & Active State</span>
              </div>
              <div className="flex items-center gap-3.5">
                <span className="w-4 h-4 rounded-full bg-[#184f33] border border-emerald-400 flex-shrink-0" />
                <span className="text-xs font-bold text-emerald-100">Featured Sanctuary Present</span>
              </div>
              <div className="flex items-center gap-3.5">
                <span className="w-4 h-4 rounded-full bg-[#0a2318] border border-emerald-900 flex-shrink-0" />
                <span className="text-xs font-bold text-emerald-300/70">Unexplored Regional Terrain</span>
              </div>
            </div>

            {selectedState !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectState('all')}
                className="mt-8 w-full py-3 rounded-2xl bg-amber-500 text-[#05110b] font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
              >
                Reset Map Selection
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
