import React from 'react';

export default function DwarkaBeach() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400">
          Gujarat · Devbhumi Dwarka District
        </span>
        <h1 className="text-3xl font-bold mt-1">Dwarka Beach</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          A revered coastal destination along the Arabian Sea, deeply intertwined with the legendary pilgrimage heritage of Lord Krishna.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Beach Overview & Coastal Geography</h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Dwarka Beach features a scenic shoreline along the Saurashtra peninsula with clear coastal waters, sandy stretches, and constant gentle sea breezes. It acts as a serene environment where pilgrims and visitors gather for spiritual reflection and sunset views.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Cultural & Pilgrimage Significance</h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            As part of one of Hinduism's holiest Char Dham pilgrimage sites, Dwarka holds immense mythological importance as the ancient capital kingdom of Lord Krishna. The coastline is closely linked to submerged archaeological ruins of the ancient city of Dwarka.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Visitor Activities</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Evening spiritual walks along the coastal promenade during sunset</li>
            <li>Boat excursions heading toward Bet Dwarka and marine archaeological sites</li>
            <li>Seaside meditation and coastal photography</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Nearby Landmarks</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Dwarkadhish Temple (Jagat Mandir)</li>
            <li>Sudama Setu (Suspension Bridge)</li>
            <li>Gomti Ghat</li>
            <li>Bet Dwarka Island</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Image Gallery & Credits</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Images credited under open licensing and archival repositories.
          </p>
        </section>
      </div>
    </div>
  );
}
