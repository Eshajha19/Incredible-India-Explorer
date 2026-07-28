document.addEventListener('DOMContentLoaded', () => {
  const tiFacts = [
    "The name 'Trisul' comes from the Sanskrit word for trident — the celestial weapon of Lord Shiva. The three peaks of the massif are said to represent Shiva's trident piercing the sky above the Garhwal Himalayas.",
    "Trisul I was first summited in 1907 by British mountaineer T.G. Longstaff — one of the very first 7,000-metre peaks ever climbed by humans. It predated all Kangchenjunga attempts by over four decades.",
    "The famous Roopkund 'Skeleton Lake' lies at approximately 5,029 m in the shadow of the Trisul massif. Over 500 human skeletons, dating to the 9th century CE, were discovered here in 1942.",
    "The Trisul glacier system feeds the Pindari Glacier and Kafni Glacier — two major sources of the Pindar River, which eventually joins the Alaknanda, one of the main headwaters of the Ganges.",
    "Trisul I (7,120 m), Trisul II (6,660 m), and Trisul III (6,008 m) together form a dramatic horseshoe-shaped ridge. The entire trio is visible from the popular Auli ski resort in Chamoli district.",
    "The Inner Line Permit required for Trisul is the same permit needed for treks into the Nanda Devi Biosphere Reserve. The peak lies very close to this protected UNESCO World Heritage buffer zone.",
    "At 23,360 ft, Trisul I is often considered one of the 'easiest' 7,000-metre peaks due to its moderate angle on the upper snowfields — though this reputation was established in an era of much higher risk tolerance.",
    "Local Garhwali folklore tells of a time when Lord Shiva threw his trident at a demon king to protect the sacred Nanda Devi. The trident landed in the Himalayas and became the three peaks of the Trisul massif."
  ];

  let tiFactIndex = 0;
  const tiFactText = document.getElementById('ti-fact-text');
  const tiFactDotsContainer = document.getElementById('ti-fact-dots');

  tiFacts.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('ti-fact-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to fact ${i + 1}`);
    dot.addEventListener('click', () => { tiFactIndex = i; tiUpdateFactDisplay(); });
    tiFactDotsContainer.appendChild(dot);
  });

  function tiUpdateFactDisplay() {
    tiFactText.textContent = tiFacts[tiFactIndex];
    document.querySelectorAll('.ti-fact-dot').forEach((dot, i) => dot.classList.toggle('active', i === tiFactIndex));
  }

  tiUpdateFactDisplay();
  setInterval(() => { tiFactIndex = (tiFactIndex + 1) % tiFacts.length; tiUpdateFactDisplay(); }, 5500);

  const tiMapLocations = [
    { name: "Trisul I Summit", lat: 30.305, lng: 79.783, elevation: "7,120 m", color: "#ff6b35" },
    { name: "Trisul II", lat: 30.300, lng: 79.780, elevation: "6,660 m", color: "#e63946" },
    { name: "Trisul III", lat: 30.298, lng: 79.778, elevation: "6,008 m", color: "#e63946" },
    { name: "Roopkund Lake", lat: 30.278, lng: 79.756, elevation: "5,029 m", color: "#457b9d" },
    { name: "Lohajung (Base Camp)", lat: 30.130, lng: 79.660, elevation: "2,300 m", color: "#2a9d8f" },
    { name: "Pindari Glacier", lat: 30.295, lng: 79.705, elevation: "3,660 m", color: "#457b9d" },
    { name: "Auli Ski Resort", lat: 30.530, lng: 79.604, elevation: "2,500 m", color: "#1d3557" }
  ];

  const tiMap = L.map('ti-map', { scrollWheelZoom: false }).setView([30.27, 79.74], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(tiMap);

  tiMapLocations.forEach(loc => {
    const marker = L.circleMarker([loc.lat, loc.lng], { radius: 9, color: loc.color, fillColor: loc.color, fillOpacity: 0.85, weight: 2 }).addTo(tiMap);
    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.elevation}`);
  });

  const tiGalleryItems = [
    { src: "https://images.unsplash.com/photo-1621450284971-9e35e5e20038?w=800&q=80", alt: "Trisul I summit ridgeline above the Garhwal range", caption: "Trisul I — The Trident Peak" },
    { src: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80", alt: "Roopkund Skeleton Lake at 5029 m", caption: "Roopkund Lake beneath Trisul massif" },
    { src: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&q=80", alt: "Snow-capped peaks of Garhwal Himalayas", caption: "Panoramic view of the Garhwal range" },
    { src: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80", alt: "Pindari Glacier trek route", caption: "Pindari Glacier approach trail" }
  ];

  const tiGalleryGrid = document.getElementById('ti-gallery-grid');
  tiGalleryItems.forEach((img, i) => {
    const fig = document.createElement('figure');
    fig.classList.add('ti-gallery-item');
    fig.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy"><figcaption>${img.caption}</figcaption>`;
    fig.addEventListener('click', () => tiOpenLightbox(i));
    tiGalleryGrid.appendChild(fig);
  });

  const tiLightbox = document.getElementById('ti-lightbox');
  const tiLightboxImg = document.getElementById('ti-lightbox-image');
  const tiLightboxCaption = document.getElementById('ti-lightbox-caption');
  let tiLightboxIndex = 0;

  function tiOpenLightbox(index) {
    tiLightboxIndex = index;
    tiUpdateLightboxImage();
    tiLightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    tiLightbox.querySelector('button').focus();
  }

  function tiUpdateLightboxImage() {
    const item = tiGalleryItems[tiLightboxIndex];
    tiLightboxImg.src = item.src.replace('w=800', 'w=1200');
    tiLightboxImg.alt = item.alt;
    tiLightboxCaption.textContent = `${item.caption} (${tiLightboxIndex + 1}/${tiGalleryItems.length})`;
  }

  function tiCloseLightbox() {
    tiLightbox.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-close-lightbox]').forEach(btn => btn.addEventListener('click', tiCloseLightbox));
  tiLightbox.addEventListener('click', (e) => { if (e.target === tiLightbox) tiCloseLightbox(); });

  document.getElementById('ti-lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); tiLightboxIndex = (tiLightboxIndex - 1 + tiGalleryItems.length) % tiGalleryItems.length; tiUpdateLightboxImage(); });
  document.getElementById('ti-lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); tiLightboxIndex = (tiLightboxIndex + 1) % tiGalleryItems.length; tiUpdateLightboxImage(); });

  document.addEventListener('keydown', (e) => {
    if (tiLightbox.hidden) return;
    if (e.key === 'Escape') tiCloseLightbox();
    else if (e.key === 'ArrowLeft') { tiLightboxIndex = (tiLightboxIndex - 1 + tiGalleryItems.length) % tiGalleryItems.length; tiUpdateLightboxImage(); }
    else if (e.key === 'ArrowRight') { tiLightboxIndex = (tiLightboxIndex + 1) % tiGalleryItems.length; tiUpdateLightboxImage(); }
  });

  // SPA cleanup
  if (typeof window.registerPageCleanup === 'function') {
    window.registerPageCleanup({
      intervals: [setInterval(() => {}, 5500)],
      eventListeners: [
        { target: document, type: 'keydown', handler: () => {} }
      ],
      leafletMaps: [tiMap]
    });
  }
});
