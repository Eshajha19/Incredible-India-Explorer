import React from 'react';

export default function SandakphuPhalutTrek() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400">
          West Bengal · Singalila Ridge · Darjeeling District
        </span>
        <h1 className="text-3xl font-bold mt-1">Sandakphu–Phalut Trek</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          The highest peak in West Bengal along the famous Singalila Ridge, offering majestic panoramic views of four of the world's five highest peaks.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Trek Overview & Route Information</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Location:</strong> Singalila Ridge, West Bengal / Nepal border</li>
            <li><strong>Difficulty:</strong> Moderate to Challenging (due to high altitude up to 3,636 meters)</li>
            <li><strong>Distance & Duration:</strong> Approx. 60–70 km over 6 to 7 days</li>
            <li><strong>Best Season:</strong> October to May (clear skies and striking mountain vistas)</li>
            <li><strong>Starting Point:</strong> Manebhanjan or Dhotrey</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Sandakphu & Phalut Highlights & Viewpoints</h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Sandakphu (3,636m) and Phalut (3,600m) provide the iconic <strong>"Sleeping Buddha"</strong> panorama—a sweeping sight of the Himalayan range featuring Mount Everest, Kanchenjunga, Lhotse, and Makalu, alongside the majestic peaks of Janu and Three Sisters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Flora, Fauna & Route Villages</h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            The trail cuts through the Singalila National Park, home to dense bamboo and rhododendron forests, rare alpine flowers, and occasional sightings of the elusive red panda. Trekkers traverse scenic mountain hamlets including Tumling, Kalapokhri, and Sabarkum.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Image Gallery & Interactive Map</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Landscape photography credited to open creative commons repositories. Interactive trail mapping and elevation graphs available in the trekking explorer mode.
          </p>
        </section>
      </div>
    </div>
  );
}
