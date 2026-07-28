/* ============================================================
   Barren Island Explorer — barren-island.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const BARREN_LOCATIONS = [
  {
    name: "Barren Island Volcano",
    lat: 12.2783,
    lng: 93.8580,
    description: "India's only confirmed active volcano, rising to 354 m above sea level."
  },
  {
    name: "Caldera Rim",
    lat: 12.281,
    lng: 93.858,
    description: "A horseshoe-shaped caldera roughly 2 km wide, open toward the west."
  },
  {
    name: "Dive Sites (Offshore)",
    lat: 12.27,
    lng: 93.865,
    description: "Popular deep-sea dive sites along the island's volcanic drop-offs."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const BARREN_GALLERY = [
  { src: "../../assets/travel_hidden.png", caption: "Barren Island's volcanic cone" },
  { src: "../../assets/travel_deserts.png", caption: "Ash-covered slopes of the caldera" },
  { src: "../../assets/travel_beaches.png", caption: "Coastline near the island's dive sites" },
  { src: "../../assets/travel_mountains.png", caption: "View of the summit from offshore" }
];

// ---------- 3. INTERESTING FACTS ----------
const BARREN_FACTS = [
  "Barren Island is home to India's only confirmed active volcano, and one of the few active volcanoes in South Asia.",
  "The volcano's first recorded eruption was in 1787; it has erupted more than a dozen times since, most recently in 2022.",
  "Barren Island lies along the same Andaman-Sumatra subduction zone responsible for major regional earthquakes and tsunamis.",
  "The island's caldera is roughly 2 km wide and horseshoe-shaped, formed when an earlier volcanic cone collapsed.",
  "Despite its harsh terrain, Barren Island supports a small population of feral goats descended from animals introduced in the 19th century.",
  "The surrounding waters are a popular deep-sea diving destination, with steep volcanic drop-offs and healthy coral growth.",
  "Barren Island is uninhabited — landing on the island is restricted, and it is typically viewed or dived around from a boat."
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
  const tabButtons = document.querySelectorAll(".barren-tab-btn");
  const tabPanels = document.querySelectorAll(".barren-tab-panel");

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
  const galleryGrid = document.getElementById("barren-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  BARREN_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "barren-gallery-item";
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
  const prevBtn = document.getElementById("barren-lightbox-prev");
  const nextBtn = document.getElementById("barren-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("barren-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("barren-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("barren-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = BARREN_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = BARREN_GALLERY[currentGalleryIndex];
  const img = document.getElementById("barren-lightbox-image");
  const caption = document.getElementById("barren-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("barren-fact-text");
  const dotsWrap = document.getElementById("barren-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    BARREN_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "barren-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = BARREN_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % BARREN_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("barren-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("barren-map", {
    scrollWheelZoom: false,
    minZoom: 8,
  }).setView([12.2783, 93.858], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  BARREN_LOCATIONS.forEach((loc) => {
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