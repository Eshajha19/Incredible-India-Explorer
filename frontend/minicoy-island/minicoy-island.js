/* ============================================================
   Minicoy Island Explorer — minicoy-island.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const MINICOY_LOCATIONS = [
  {
    name: "Minicoy Lighthouse",
    lat: 8.2761,
    lng: 73.0417,
    description: "Built by the British in 1885, one of the oldest and tallest lighthouses in Lakshadweep."
  },
  {
    name: "Minicoy Lagoon",
    lat: 8.2900,
    lng: 73.0450,
    description: "One of Lakshadweep's largest lagoons, enclosed by a long, curving reef along the island's western side."
  },
  {
    name: "Viringili (Fishing Hub)",
    lat: 8.2700,
    lng: 73.0500,
    description: "An area associated with Minicoy's tuna fishing activity and traditional pole-and-line boats."
  },
  {
    name: "Minicoy Jetty",
    lat: 8.2820,
    lng: 73.0480,
    description: "The main jetty linking Minicoy to ships travelling between Kochi and the Lakshadweep islands."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const MINICOY_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Minicoy's lagoon and palm-fringed shoreline" },
  { src: "../../assets/travel_islands.png", caption: "Reef waters surrounding the island" },
  { src: "../../assets/travel_hidden.png", caption: "The historic Minicoy Lighthouse" },
  { src: "../../assets/travel_forests.png", caption: "Coconut groves along Minicoy's coast" }
];

// ---------- 3. INTERESTING FACTS ----------
const MINICOY_FACTS = [
  "The Minicoy Lighthouse, built in 1885, is one of the oldest and tallest lighthouses in Lakshadweep.",
  "Minicoy's fishermen traditionally use the pole-and-line method to catch tuna one at a time.",
  "Unlike the rest of Lakshadweep, Minicoy's people speak Mahl, a language closely related to Dhivehi.",
  "Minicoy is home to one of the largest lagoons in Lakshadweep.",
  "The island is organised into traditional wards called 'Avahs,' each with its own community hall.",
  "Minicoy has a matrilineal social structure, distinct from the rest of Lakshadweep."
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
  const tabButtons = document.querySelectorAll(".minicoy-tab-btn");
  const tabPanels = document.querySelectorAll(".minicoy-tab-panel");

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
  const galleryGrid = document.getElementById("minicoy-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  MINICOY_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "minicoy-gallery-item";
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
  const prevBtn = document.getElementById("minicoy-lightbox-prev");
  const nextBtn = document.getElementById("minicoy-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("minicoy-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("minicoy-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("minicoy-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = MINICOY_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = MINICOY_GALLERY[currentGalleryIndex];
  const img = document.getElementById("minicoy-lightbox-image");
  const caption = document.getElementById("minicoy-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("minicoy-fact-text");
  const dotsWrap = document.getElementById("minicoy-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    MINICOY_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "minicoy-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = MINICOY_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % MINICOY_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("minicoy-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("minicoy-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([8.28, 73.04], 12);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  MINICOY_LOCATIONS.forEach((loc) => {
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