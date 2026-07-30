/* ============================================================
   North Andaman Explorer — north-andaman-island.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const NORTH_ANDAMAN_LOCATIONS = [
  {
    name: "Saddle Peak",
    lat: 13.1836,
    lng: 93.0181,
    description: "The highest point in the Andaman & Nicobar Islands at about 732 metres, with a distinctive twin-summit 'saddle' shape."
  },
  {
    name: "Saddle Peak National Park",
    lat: 13.1780,
    lng: 93.0050,
    description: "A 44.7 sq km national park declared in 1987, protecting the hill range and rainforest around Saddle Peak."
  },
  {
    name: "Diglipur",
    lat: 13.2545,
    lng: 92.9770,
    description: "The main town in North Andaman and the gateway for treks to Saddle Peak and boat trips through the mangrove creeks."
  },
  {
    name: "Ross & Smith Islands",
    lat: 13.2870,
    lng: 93.0540,
    description: "A pair of twin islands near Aerial Bay connected by a natural sandbar, popular for beaches and turtle nesting."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const NORTH_ANDAMAN_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "Saddle Peak rising above the North Andaman rainforest" },
  { src: "../../assets/travel_forests.png", caption: "Dense tropical forest along the Saddle Peak trail" },
  { src: "../../assets/travel_islands.png", caption: "Mangrove creeks along the North Andaman coastline" },
  { src: "../../assets/travel_beaches.png", caption: "Quiet beaches near Diglipur and Aerial Bay" }
];

// ---------- 3. INTERESTING FACTS ----------
const NORTH_ANDAMAN_FACTS = [
  "Saddle Peak, at about 732 metres, is the highest point in the entire Andaman & Nicobar Islands.",
  "Saddle Peak National Park, declared in 1987, is the only national park in the islands centred on a mountain ecosystem.",
  "The trek to Saddle Peak passes through several distinct forest zones before reaching the summit ridge.",
  "North Andaman's coast is lined with extensive tidal mangrove creeks around Kalighat and Diglipur.",
  "Ross & Smith Islands near Aerial Bay are joined by a natural sandbar that appears at low tide.",
  "The island receives rain from both the southwest and northeast monsoons, with December to April being the driest period."
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
  const tabButtons = document.querySelectorAll(".north-andaman-tab-btn");
  const tabPanels = document.querySelectorAll(".north-andaman-tab-panel");

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
  const galleryGrid = document.getElementById("north-andaman-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  NORTH_ANDAMAN_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "north-andaman-gallery-item";
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
  const prevBtn = document.getElementById("north-andaman-lightbox-prev");
  const nextBtn = document.getElementById("north-andaman-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("north-andaman-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("north-andaman-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("north-andaman-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = NORTH_ANDAMAN_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = NORTH_ANDAMAN_GALLERY[currentGalleryIndex];
  const img = document.getElementById("north-andaman-lightbox-image");
  const caption = document.getElementById("north-andaman-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("north-andaman-fact-text");
  const dotsWrap = document.getElementById("north-andaman-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    NORTH_ANDAMAN_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "north-andaman-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = NORTH_ANDAMAN_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % NORTH_ANDAMAN_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("north-andaman-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("north-andaman-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([13.2, 93.0], 10);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  NORTH_ANDAMAN_LOCATIONS.forEach((loc) => {
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