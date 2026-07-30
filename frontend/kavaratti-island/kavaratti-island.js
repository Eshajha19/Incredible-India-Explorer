/* ============================================================
   Kavaratti Island Explorer — kavaratti-island.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const KAVARATTI_LOCATIONS = [
  {
    name: "Kavaratti Lagoon",
    lat: 10.5669,
    lng: 72.6420,
    description: "The calm, shallow turquoise lagoon that encircles the island, popular for swimming, kayaking and glass-bottom boat rides."
  },
  {
    name: "Marine Aquarium",
    lat: 10.5651,
    lng: 72.6430,
    description: "A small aquarium showcasing the reef fish, corals and lagoon life found around Kavaratti."
  },
  {
    name: "Ujra Mosque",
    lat: 10.5680,
    lng: 72.6415,
    description: "One of the island's most notable mosques, known for its coral-stone architecture and carved wooden ceiling."
  },
  {
    name: "Kavaratti Jetty",
    lat: 10.5630,
    lng: 72.6440,
    description: "The main jetty connecting Kavaratti to ships arriving from Kochi and other Lakshadweep islands."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const KAVARATTI_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Kavaratti's calm turquoise lagoon" },
  { src: "../../assets/travel_islands.png", caption: "Coral reef waters surrounding the island" },
  { src: "../../assets/travel_hidden.png", caption: "A traditional coral-stone mosque on Kavaratti" },
  { src: "../../assets/travel_forests.png", caption: "Palm-lined shores of the island" }
];

// ---------- 3. INTERESTING FACTS ----------
const KAVARATTI_FACTS = [
  "Kavaratti is the administrative capital of the Lakshadweep Union Territory.",
  "The island's lagoon is protected by a surrounding reef, keeping its waters calm and shallow.",
  "Kavaratti is home to one of the few marine aquariums in Lakshadweep.",
  "The island has more than 50 mosques, an unusually high number for its small size.",
  "The Ujra Mosque is known for its traditional coral-stone architecture and carved ceiling.",
  "Lakshadweep's islands, including Kavaratti, are built entirely of coral, with no natural rock beneath the sand."
];

// ---------- 4. STATE ----------
let map;
let currentGalleryIndex = 0;
let factIndex = 0;

// ---------- 5. DOM READY ----------
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initGallery();
  initFactsRotator();
  initMap();
  initLightbox();
});

// ---------- 6. TAB NAVIGATION ----------
function initTabs() {
  const tabButtons = document.querySelectorAll(".kavaratti-tab-btn");
  const tabPanels = document.querySelectorAll(".kavaratti-tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === "tab-" + target);
      });
    });
  });
}

// ---------- 7. IMAGE GALLERY ----------
function initGallery() {
  const galleryGrid = document.getElementById("kavaratti-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  KAVARATTI_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "kavaratti-gallery-item";
    fig.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <figcaption>${item.caption}</figcaption>
    `;
    fig.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(fig);
  });
}

// ---------- 8. LIGHTBOX ----------
function initLightbox() {
  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });
  const prevBtn = document.getElementById("kavaratti-lightbox-prev");
  const nextBtn = document.getElementById("kavaratti-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("kavaratti-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("kavaratti-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("kavaratti-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = KAVARATTI_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = KAVARATTI_GALLERY[currentGalleryIndex];
  const img = document.getElementById("kavaratti-lightbox-image");
  const caption = document.getElementById("kavaratti-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("kavaratti-fact-text");
  const dotsWrap = document.getElementById("kavaratti-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    KAVARATTI_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "kavaratti-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = KAVARATTI_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % KAVARATTI_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("kavaratti-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("kavaratti-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([10.566, 72.642], 12);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  KAVARATTI_LOCATIONS.forEach((loc) => {
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: 8,
      color: "#ff9933",
      fillColor: "#ffb01f",
      fillOpacity: 0.85,
      weight: 2,
    }).addTo(map);

    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
  });
}