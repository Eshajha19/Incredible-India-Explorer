import React from 'react';

export default function MurudBeach() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
          Maharashtra · Raigad District
        </span>
        <h1 className="text-3xl font-bold mt-1">Murud Beach</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          A serene coastal haven on the Konkan coastline, famously intertwined with the legendary history of the sea-locked Murud-Janjira Fort.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Beach Overview & Coastal Landscape</h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Murud Beach offers a wide stretch of dark sand flanked by gentle rolling hills and lush green palm groves. The calm, shallow waters of the Arabian Sea make it an ideal destination for relaxed beach strolls and panoramic sunset viewing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Murud-Janjira Heritage Connection</h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            The beach serves as the primary gateway to the invincible <strong>Murud-Janjira Fort</strong>, an architectural marvel situated on an oval-shaped rock island just off the coast. Built in the 17th century, the fort remained unconquered by European and Maratha naval powers alike, holding immense historical significance in the Konkan region.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Activities & Things to Do</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Boat rides from the shore to the historic Murud-Janjira sea fort</li>
            <li>Water sports including banana boat rides, jet skiing, and horse rides on the sand</li>
            <li>Exploring local Konkani cuisine and seafood shacks</li>
            <li>Sunset photography overlooking the Arabian Sea horizon</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Nearby Attractions</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Murud-Janjira Sea Fort</li>
            <li>Ahmedabad Palace (Nawab Palace)</li>
            <li>Kashid Beach</li>
            <li>Phansad Wildlife Sanctuary</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Image Gallery & Credits</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Images sourced from open historical archives and Wikimedia Commons, credited under Creative Commons guidelines.
          </p>
        </section>
      </div>
    </div>
  );
}
