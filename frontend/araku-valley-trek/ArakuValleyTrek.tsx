import React from 'react';

export default function ArakuValleyTrek() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
          Andhra Pradesh · Alluri Sitharama Raju District · Eastern Ghats
        </span>
        <h1 className="text-3xl font-bold mt-1">Araku Valley Trek</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          An immersive trekking experience through the misty hills, coffee plantations, dense forests, and vibrant tribal settlements of the Eastern Ghats.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Trek Overview & Route Information</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Location:</strong> Araku Valley, Eastern Ghats, Andhra Pradesh</li>
            <li><strong>Difficulty:</strong> Moderate</li>
            <li><strong>Distance & Duration:</strong> Approx. 10–12 km over 1 to 2 days (depending on the specific trail, e.g., Galikonda or Katiki waterfalls route)</li>
            <li><strong>Best Season:</strong> September to March (pleasant weather, post-monsoon greenery)</li>
            <li><strong>Starting Point:</strong> Araku town or nearby tribal hamlets</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Valley Landscape, Forests & Biodiversity</h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            The trek winds through undulating hills covered in dense deciduous forests, cascading streams, and sprawling organic coffee plantations. Climbers are treated to panoramic views of misty valleys, deep gorges, and rich floral biodiversity unique to the Eastern Ghats.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Local Culture & Tribal Heritage</h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Araku is home to indigenous tribal communities (such as the Bagata and Valmiki tribes). Trekkers get a unique opportunity to experience traditional Dhimsa folk dances, local handicraft markets, and sustainable tribal farming practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Nearby Attractions</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Borra Caves</li>
            <li>Katiki Waterfalls</li>
            <li>Padmapuram Botanical Gardens</li>
            <li>Coffee Museum & Plantations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Image Gallery & Map Embed</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Scenic landscape photography credited to open creative commons repositories. Interactive topographical map route preview available in explorer mode.
          </p>
        </section>
      </div>
    </div>
  );
}
