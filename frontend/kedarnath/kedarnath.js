const KEDARNATH_LOCATIONS = [
  {
    name: "Kedarnath Peak Summit",
    lat: 30.7950,
    lng: 79.0694,
    description: "The main summit at 6,940 m, a sacred peak in the Garhwal Himalayas of Uttarakhand."
  },
  {
    name: "Kedarnath Temple",
    lat: 30.7348,
    lng: 79.0669,
    description: "One of the twelve Jyotirlingas, located at 3,583 m. One of the holiest Hindu shrines."
  },
  {
    name: "Vasuki Tal",
    lat: 30.7833,
    lng: 79.0833,
    description: "A high-altitude lake at 4,135 m with stunning views of Kedarnath and Chaukhamba peaks."
  },
  {
    name: "Gandhi Sarovar (Chorabari Tal)",
    lat: 30.7500,
    lng: 79.0500,
    description: "A glacial lake at 4,020 m, the source of the Mandakini River."
  },
  {
    name: "Chorabari Glacier",
    lat: 30.7800,
    lng: 79.0500,
    description: "The glacier that feeds the Mandakini River and lies at the base of Kedarnath Peak."
  },
  {
    name: "Rudraprayag",
    lat: 30.2833,
    lng: 78.9833,
    description: "Confluence town of Alaknanda and Mandakini rivers, gateway to Kedarnath."
  },
  {
    name: "Sonprayag",
    lat: 30.7000,
    lng: 79.0333,
    description: "The road head and starting point for the Kedarnath trek at 1,829 m."
  }
];

const KEDARNATH_GALLERY = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mt._Kedarnath.jpg/960px-Mt._Kedarnath.jpg",
    caption: "The first rays of sunlight falling on Mt. Kedarnath — the sacred 6,940 m peak in the Garhwal Himalayas."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Kedarnath_peak_and_Kedarnath_dome.jpg/960px-Kedarnath_peak_and_Kedarnath_dome.jpg",
    caption: "Kedarnath peak and Kedarnath Dome — two majestic mountains in the Gangotri Group of peaks."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/960px-Kedarnath_Temple_in_Rainy_season.jpg",
    caption: "Kedarnath Temple — one of the twelve Jyotirlingas — set against the dramatic Himalayan landscape."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Kedar_from_Tungnath_vvnataraj.jpg/960px-Kedar_from_Tungnath_vvnataraj.jpg",
    caption: "Kedar and Kedar Dome peaks as seen from Tungnath — the highest Shiva temple in the world."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Kedarnath_Temple.jpg/960px-Kedarnath_Temple.jpg",
    caption: "The ancient Kedarnath Temple at 3,583 m, with the snow-capped peak towering behind it."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Kedarnath_and_Kedar_Dome%2C_Uttarakhand_India_November_2013.jpg/960px-Kedarnath_and_Kedar_Dome%2C_Uttarakhand_India_November_2013.jpg",
    caption: "Kedarnath and Kedar Dome in November — pristine snow covering the sacred peaks."
  }
];

const KEDARNATH_FACTS = [
  "Kedarnath Peak stands at 6,940 metres and is part of the Garhwal Himalayas in Uttarakhand, towering over the famous Kedarnath Temple.",
  "The Kedarnath Temple, located at the base of the peak, is one of the twelve Jyotirlingas — the holiest Shiva shrines in Hinduism.",
  "The peak is fed by the Chorabari Glacier, which is the source of the Mandakini River, a key tributary of the Ganges.",
  "According to legend, the Pandavas from the Mahabharata sought Lord Shiva's blessings at Kedarnath after the Kurukshetra war.",
  "Kedarnath is part of the Panch Kedar — five sacred Shiva temples across the Garhwal region, each representing a part of Shiva's body.",
  "The first recorded ascent of Kedarnath Peak was in 1932 by a Swiss expedition led by G. O. Dyhrenfurth.",
  "The Kedarnath region was severely affected by the 2013 Uttarakhand floods, but the ancient temple survived with remarkable resilience."
];

let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;

function init() {
  initGallery();
  initFactsRotator();
  initMap();
  initLightbox();
  initScrollReveal();
  initParallax();
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

if (window.appLifecycle) {
  window.appLifecycle.registerCleanup(() => {
    if (factIntervalId) {
      clearInterval(factIntervalId);
      factIntervalId = null;
    }
  });
}

/* ---------- SCROLL REVEAL ANIMATIONS ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------- PARALLAX HERO ---------- */
function initParallax() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < 800) {
          hero.style.setProperty("--parallax-y", scrollY * 0.35 + "px");
          hero.style.setProperty("--parallax-opacity", 1 - scrollY / 700);
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---------- GALLERY GRID ---------- */
function initGallery() {
  const grid = document.getElementById("kedarnath-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  KEDARNATH_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "kedarnath-gallery-item reveal";
    figure.style.transitionDelay = (index * 0.08) + "s";
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", `Open image: ${item.caption}`);
    figure.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <figcaption>${item.caption}</figcaption>
    `;

    figure.addEventListener("click", () => openLightbox(index));
    figure.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    grid.appendChild(figure);
  });
}

/* ---------- LIGHTBOX ---------- */
function initLightbox() {
  const lightbox = document.getElementById("kedarnath-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  const prevBtn = document.getElementById("kedarnath-lightbox-prev");
  const nextBtn = document.getElementById("kedarnath-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex - 1); });
  if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex + 1); });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("kedarnath-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("kedarnath-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = KEDARNATH_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = KEDARNATH_GALLERY[currentGalleryIndex];

  const img = document.getElementById("kedarnath-lightbox-image");
  const caption = document.getElementById("kedarnath-lightbox-caption");

  if (img) {
    img.style.opacity = "0";
    img.src = item.src;
    img.alt = item.caption;
    img.onload = () => { img.style.opacity = "1"; };
  }
  if (caption) caption.textContent = item.caption;
}

/* ---------- FACTS ROTATOR ---------- */
function initFactsRotator() {
  const factEl = document.getElementById("kedarnath-fact-text");
  const dotsWrap = document.getElementById("kedarnath-fact-dots");
  const counterEl = document.getElementById("kedarnath-fact-counter");
  const prevBtn = document.getElementById("kedarnath-fact-prev");
  const nextBtn = document.getElementById("kedarnath-fact-next");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    KEDARNATH_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "kedarnath-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => { showFact(i); resetInterval(); });
      dotsWrap.appendChild(dot);
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { showFact((factIndex - 1 + KEDARNATH_FACTS.length) % KEDARNATH_FACTS.length); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { showFact((factIndex + 1) % KEDARNATH_FACTS.length); resetInterval(); });

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    factEl.style.transform = "translateY(8px)";
    setTimeout(() => {
      factEl.textContent = KEDARNATH_FACTS[factIndex];
      factEl.style.opacity = "1";
      factEl.style.transform = "translateY(0)";
    }, 250);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
    if (counterEl) {
      counterEl.textContent = (factIndex + 1) + " / " + KEDARNATH_FACTS.length;
    }
  }

  function resetInterval() {
    if (factIntervalId) clearInterval(factIntervalId);
    factIntervalId = setInterval(() => showFact((factIndex + 1) % KEDARNATH_FACTS.length), 6000);
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % KEDARNATH_FACTS.length), 6000);
}

/* ---------- LEAFLET MAP ---------- */
function initMap() {
  const mapContainer = document.getElementById("kedarnath-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try { map.remove(); } catch (e) { /* ignore */ }
    map = null;
  }

  map = L.map("kedarnath-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.7950, 79.0694], 11);

  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18,
  }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
    attribution: "",
    maxZoom: 18,
    pane: "overlayPane",
  }).addTo(map);

  KEDARNATH_LOCATIONS.forEach((loc) => {
    const isSummit = loc.name.includes("Summit");
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: isSummit ? 10 : 7,
      color: isSummit ? "#ff9933" : "#0284c7",
      fillColor: isSummit ? "#ffb01f" : "#38bdf8",
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(map);

    marker.bindTooltip(`<strong>${loc.name}</strong><br><small>${loc.description}</small>`, {
      direction: "top",
      offset: [0, -10],
      opacity: 1,
      className: "kedarnath-map-tooltip",
    });

    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
  });
}
