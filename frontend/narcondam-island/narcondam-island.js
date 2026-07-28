/* ============================================================
   Narcondam Island Explorer — narcondam-island.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const NARCONDAM_LOCATIONS = [
  {
    name: "Narcondam Island",
    lat: 13.4287,
    lng: 94.2557,
    description: "A small, isolated volcanic island in the Bay of Bengal, roughly 120 km east of the main Andaman group."
  },
  {
    name: "Narcondam Peak",
    lat: 13.4310,
    lng: 94.2580,
    description: "The extinct volcanic summit at the island's centre, rising to around 710 metres above sea level."
  },
  {
    name: "Forest Camp & Landing Point",
    lat: 13.4250,
    lng: 94.2520,
    description: "The small forest department and police outpost, and the main landing point for the rare visitor permitted ashore."
  },
  {
    name: "Andaman Islands (Reference)",
    lat: 12.5,
    lng: 92.9,
    description: "The main Andaman archipelago, roughly 120 km to the west of Narcondam."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const NARCONDAM_GALLERY = [
  { src: "../../assets/travel_hidden.png", caption: "Narcondam's steep, forested volcanic slopes" },
  { src: "../../assets/travel_forests.png", caption: "Dense tropical evergreen forest covering the island" },
  { src: "../../assets/travel_islands.png", caption: "The isolated island rising from the Bay of Bengal" },
  { src: "../../assets/river2.png", caption: "Coastal waters surrounding the island" }
];

// ---------- 3. INTERESTING FACTS ----------
const NARCONDAM_FACTS = [
  "Narcondam Island is the exposed summit of an extinct volcano, with no recorded eruptions in history.",
  "The island is the only known home of the Narcondam Hornbill, a species found nowhere else on Earth.",
  "Narcondam lies roughly 120 km east of the main Andaman group, closer to Myanmar than to Port Blair.",
  "The island was declared a Wildlife Sanctuary in 1977 to protect its endemic hornbill population.",
  "Narcondam's peak rises to around 710 metres, making it one of the taller points in the Andaman & Nicobar Islands.",
  "Public access to Narcondam is tightly restricted, and only a small forest and police outpost is stationed there."
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
  const tabButtons = document.querySelectorAll(".narcondam-tab-btn");
  const tabPanels = document.querySelectorAll(".narcondam-tab-panel");

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
  const galleryGrid = document.getElementById("narcondam-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  NARCONDAM_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "narcondam-gallery-item";
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
  const prevBtn = document.getElementById("narcondam-lightbox-prev");
  const nextBtn = document.getElementById("narcondam-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("narcondam-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("narcondam-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("narcondam-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = NARCONDAM_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = NARCONDAM_GALLERY[currentGalleryIndex];
  const img = document.getElementById("narcondam-lightbox-image");
  const caption = document.getElementById("narcondam-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("narcondam-fact-text");
  const dotsWrap = document.getElementById("narcondam-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    NARCONDAM_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "narcondam-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = NARCONDAM_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % NARCONDAM_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("narcondam-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("narcondam-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([13.42, 93.8], 8);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  NARCONDAM_LOCATIONS.forEach((loc) => {
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