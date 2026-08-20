import React from 'react';
import { bakkhaliBeachProfile } from '../../data/destinations/bakkhaliBeach';

export const BakkhaliBeachView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100">
      {/* Header / Title */}
      <div className="mb-8 border-b pb-4 border-slate-200 dark:border-slate-700">
        <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          {bakkhaliBeachProfile.state} &bull; {bakkhaliBeachProfile.district}
        </span>
        <h1 className="text-4xl font-bold mt-1">{bakkhaliBeachProfile.name}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
          {bakkhaliBeachProfile.overview}
        </p>
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Natural Environment & Highlights */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 dark:text-emerald-400">
              Natural Environment & Coastal Features
            </h2>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li><strong>Terrain:</strong> {bakkhaliBeachProfile.naturalEnvironment.terrain}</li>
              <li><strong>Flora & Fauna:</strong> {bakkhaliBeachProfile.naturalEnvironment.coastalFloraFauna}</li>
              <li><strong>Tides & Waters:</strong> {bakkhaliBeachProfile.naturalEnvironment.tides}</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Coastal Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bakkhaliBeachProfile.coastalHighlights.map((highlight, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-sm">
                  {highlight}
                </div>
              ))}
            </div>
          </section>

          {/* Nearby Attractions */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 dark:text-emerald-400">
              Nearby Attractions
            </h2>
            <div className="space-y-4">
              {bakkhaliBeachProfile.nearbyAttractions.map((attraction, idx) => (
                <div key={idx} className="border-l-4 border-emerald-500 pl-4 py-1">
                  <h3 className="font-semibold text-lg">{attraction.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{attraction.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Activities, Quick Facts & Gallery */}
        <div className="space-y-6">
          <section className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900">
            <h3 className="text-xl font-semibold mb-3 text-emerald-800 dark:text-emerald-300">
              Activities to Experience
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {bakkhaliBeachProfile.activities.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800 text-xs text-slate-600 dark:text-slate-400">
              <strong>Best Time to Visit:</strong> {bakkhaliBeachProfile.bestTimeToGo}
            </div>
          </section>

          {/* Image Gallery */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Image Gallery</h3>
            <div className="space-y-4">
              {bakkhaliBeachProfile.imageGallery.map((img, index) => (
                <div key={index} className="overflow-hidden rounded-lg group">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {img.caption} — <span className="italic">{img.credit}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
