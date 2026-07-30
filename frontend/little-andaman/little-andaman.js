/* ============================================================
   Little Andaman Explorer — little-andaman.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const LITTLE_ANDAMAN_LOCATIONS = [
  {
    name: "Butler Bay",
    lat: 10.58,
    lng: 92.58,
    description: "Pristine 2+ km crescent beach — India's premier surfing destination with golden sand and turquoise waters."
  },
  {
    name: "White Surf Waterfall",
    lat: 10.62,
    lng: 92.52,
    description: "Spectacular 60m multi-tiered cascade through evergreen forest, 6.5 km from Hut Bay."
  },
  {
    name: "Hut Bay (Main Settlement)",
    lat: 10.65,
    lng: 92.48,
    description: "Main town and ferry port on the northeast coast — entry point with market, accommodation, and transport."
  },
  {
    name: "RK Bay",
    lat: 10.55,
    lng: 92.55,
    description: "Scenic bay on the east coast with rocky headlands and access to forest trails."
  },
  {
    name: "Jackson Creek",
    lat: 10.70,
    lng: 92.45,
    description: "Mangrove-lined creek on the north coast — saltwater crocodile habitat and birdwatching spot."
  },
  {
    name: "Netaji Nagar",
    lat: 10.60,
    lng: 92.50,
    description: "Village near central forest area — access point for rainforest treks and wildlife viewing."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const LITTLE_ANDAMAN_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Butler Bay — pristine crescent beach" },
  { src: "../../assets/travel_islands.png", caption: "Little Andaman coastline and turquoise waters" },
  { src: "../../assets/travel_hidden.png", caption: "White Surf Waterfall in evergreen forest" },
  { src: "../../assets/travel_mountains.png", caption: "Central ridge rainforest canopy" }
];

// ---------- 3. INTERESTING FACTS ----------
const LITTLE_ANDAMAN_FACTS = [
  "Little Andaman is the fourth-largest island in the Andaman archipelago at ~730 km², yet remains one of the least developed.",
  "Butler Bay is widely considered India's best surfing beach, with consistent swells from the open Indian Ocean.",
  "The island is a critical habitat for the dugong (sea cow) — Andaman & Nicobar's state animal — which feeds on seagrass meadows.",
  "Asian elephants regularly swim between Little Andaman, Great Nicobar, and other islands — a rare natural phenomenon.",
  "White Surf Waterfall drops ~60 meters in multiple tiers, creating a 'white surf' appearance that gives it its name.",
  "Over 80% of the island is primary evergreen rainforest with high endemism — many species found nowhere else on Earth.",
  "The island sits on the accretionary prism of the Indian-Burma plate boundary, making it geologically active with occasional tremors."
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
  const tabButtons = document.querySelectorAll(".little-andaman-tab-btn");
  const tabPanels = document.querySelectorAll(".little-andaman-tab-panel");

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
  const galleryGrid = document.getElementById("little-andaman-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  LITTLE_ANDAMAN_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "little-andaman-gallery-item";
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
  const prevBtn = document.getElementById("little-andaman-lightbox-prev");
  const nextBtn = document.getElementById("little-andaman-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("little-andaman-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("little-andaman-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("little-andaman-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = LITTLE_ANDAMAN_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = LITTLE_ANDAMAN_GALLERY[currentGalleryIndex];
  const img = document.getElementById("little-andaman-lightbox-image");
  const caption = document.getElementById("little-andaman-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("little-andaman-fact-text");
  const dotsWrap = document.getElementById("little-andaman-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    LITTLE_ANDAMAN_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "little-andaman-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = LITTLE_ANDAMAN_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % LITTLE_ANDAMAN_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("little-andaman-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("little-andaman-map", {
    scrollWheelZoom: false,
    minZoom: 9,
  }).setView([10.6, 92.5], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  LITTLE_ANDAMAN_LOCATIONS.forEach((loc) => {
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