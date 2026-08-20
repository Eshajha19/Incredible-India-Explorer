import React from 'react';
import { shivrajpurBeachProfile } from '../../data/destinations/shivrajpurBeach';

export const ShivrajpurBeachView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="mb-8 border-b pb-4 border-slate-200 dark:border-slate-700">
        <span className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
          {shivrajpurBeachProfile.state} &bull; {shivrajpurBeachProfile.district} &bull; Blue Flag Certified
        </span>
        <h1 className="text-4xl font-bold mt-1">{shivrajpurBeachProfile.name}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
          {shivrajpurBeachProfile.overview}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Natural & Marine Features */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-700 dark:text-cyan-400">
              Natural & Marine Features
            </h2>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li><strong>Terrain:</strong> {shivrajpurBeachProfile.naturalAndMarineFeatures.terrain}</li>
              <li><strong>Marine Life:</strong> {shivrajpurBeachProfile.naturalAndMarineFeatures.marineLife}</li>
              <li><strong>Eco Standards:</strong> {shivrajpurBeachProfile.naturalAndMarineFeatures.ecoManagement}</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Activities to Enjoy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shivrajpurBeachProfile.activities.map((act, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-sm">
                  {act}
                </div>
              ))}
            </div>
          </section>

          {/* Nearby Attractions */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-700 dark:text-cyan-400">
              Nearby Attractions
            </h2>
            <div className="space-y-4">
              {shivrajpurBeachProfile.nearbyAttractions.map((attraction, idx) => (
                <div key={idx} className="border-l-4 border-cyan-500 pl-4 py-1">
                  <h3 className="font-semibold text-lg">{attraction.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{attraction.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Visitor Info & Gallery */}
        <div className="space-y-6">
          <section className="bg-cyan-50 dark:bg-cyan-950/30 p-6 rounded-xl border border-cyan-100 dark:border-cyan-900">
            <h3 className="text-xl font-semibold mb-3 text-cyan-800 dark:text-cyan-300">
              Visitor Information
            </h3>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Best Time:</strong> {shivrajpurBeachProfile.visitorInformation.bestTimeToVisit}</li>
              <li><strong>Timings:</strong> {shivrajpurBeachProfile.visitorInformation.timings}</li>
              <li><strong>Accessibility:</strong> {shivrajpurBeachProfile.visitorInformation.accessibility}</li>
            </ul>
          </section>

          {/* Image Gallery */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Image Gallery</h3>
            <div className="space-y-4">
              {shivrajpurBeachProfile.imageGallery.map((img, index) => (
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
