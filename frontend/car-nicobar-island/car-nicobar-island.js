/* ============================================================
   Car Nicobar Explorer — car-nicobar-island.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const CAR_NICOBAR_LOCATIONS = [
  {
    name: "Malacca",
    lat: 9.2167,
    lng: 92.7833,
    description: "The administrative headquarters of the Nicobar district, on the island's western coast."
  },
  {
    name: "Car Nicobar Airport",
    lat: 9.1533,
    lng: 92.8172,
    description: "The island's air link to Port Blair, shared with the Indian Air Force base."
  },
  {
    name: "Kakana Village",
    lat: 9.2000,
    lng: 92.7500,
    description: "A traditional Nicobarese village known for its coconut groves and coastal beaches."
  },
  {
    name: "Mus Village",
    lat: 9.2333,
    lng: 92.7667,
    description: "One of the island's well-known traditional villages, rebuilt after the 2004 tsunami."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const CAR_NICOBAR_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Quiet coral-fringed beaches near Malacca" },
  { src: "../../assets/travel_islands.png", caption: "Coconut groves covering much of the island" },
  { src: "../../assets/travel_hidden.png", caption: "A traditional Nicobarese village" },
  { src: "../../assets/travel_forests.png", caption: "Palm-lined shores of Car Nicobar" }
];

// ---------- 3. INTERESTING FACTS ----------
const CAR_NICOBAR_FACTS = [
  "Car Nicobar has the largest Nicobarese population of any island in the Nicobar group.",
  "Coconut plantations cover much of the island and have long supported its copra-based economy.",
  "Malacca serves as the administrative headquarters of the Nicobar district.",
  "The Ossuary Feast, honouring ancestors, is one of the most important Nicobarese cultural events.",
  "Traditional hodi (dugout canoe) races are held along the coast during local festivals.",
  "Christian missionary activity from the 1800s brought significant cultural change to the island."
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
  const tabButtons = document.querySelectorAll(".car-nicobar-tab-btn");
  const tabPanels = document.querySelectorAll(".car-nicobar-tab-panel");

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
  const galleryGrid = document.getElementById("car-nicobar-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  CAR_NICOBAR_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "car-nicobar-gallery-item";
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
  const prevBtn = document.getElementById("car-nicobar-lightbox-prev");
  const nextBtn = document.getElementById("car-nicobar-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("car-nicobar-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("car-nicobar-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("car-nicobar-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = CAR_NICOBAR_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = CAR_NICOBAR_GALLERY[currentGalleryIndex];
  const img = document.getElementById("car-nicobar-lightbox-image");
  const caption = document.getElementById("car-nicobar-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("car-nicobar-fact-text");
  const dotsWrap = document.getElementById("car-nicobar-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    CAR_NICOBAR_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "car-nicobar-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = CAR_NICOBAR_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % CAR_NICOBAR_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("car-nicobar-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("car-nicobar-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([9.19, 92.79], 10);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  CAR_NICOBAR_LOCATIONS.forEach((loc) => {
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