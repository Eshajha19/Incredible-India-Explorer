import React from 'react';
import { malpeBeachProfile } from '../../data/destinations/malpeBeach';

export const MalpeBeachView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="mb-8 border-b pb-4 border-slate-200 dark:border-slate-700">
        <span className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          {malpeBeachProfile.state} &bull; {malpeBeachProfile.district} &bull; Island Gateway
        </span>
        <h1 className="text-4xl font-bold mt-1">{malpeBeachProfile.name}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
          {malpeBeachProfile.overview}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Landscape, Island Connection & Activities */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-teal-700 dark:text-teal-400">
              Coastal Landscape & Island Connections
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <div>
                <h3 className="font-semibold text-base mb-1">Coastal Landscape</h3>
                <p>{malpeBeachProfile.coastalLandscape}</p>
              </div>
              <div className="bg-teal-50/50 dark:bg-teal-950/20 p-4 rounded-lg border border-teal-100 dark:border-teal-900">
                <h3 className="font-semibold text-base mb-1 text-teal-800 dark:text-teal-300">
                  Island Connection: {malpeBeachProfile.islandConnections.name}
                </h3>
                <p className="text-sm">{malpeBeachProfile.islandConnections.description}</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Marine & Recreational Activities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {malpeBeachProfile.marineAndRecreationalActivities.map((act, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-sm">
                  {act}
                </div>
              ))}
            </div>
          </section>

          {/* Nearby Attractions */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-teal-700 dark:text-teal-400">
              Nearby Attractions
            </h2>
            <div className="space-y-4">
              {malpeBeachProfile.nearbyAttractions.map((attraction, idx) => (
                <div key={idx} className="border-l-4 border-teal-500 pl-4 py-1">
                  <h3 className="font-semibold text-lg">{attraction.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{attraction.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Gallery */}
        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Image Gallery</h3>
            <div className="space-y-4">
              {malpeBeachProfile.imageGallery.map((img, index) => (
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
