const HANUMAN_TIBBA_LOCATIONS = [
  { name: "Hanuman Tibba Summit", lat: 32.3500, lng: 77.1667, description: "The main summit of Hanuman Tibba, standing at 5,982 metres. The highest peak of the Dhauladhar range, named after Lord Hanuman." },
  { name: "Solang Valley", lat: 32.3167, lng: 77.1500, description: "A popular adventure sports destination at 2,560 m near Manali, serving as the primary base camp for Hanuman Tibba treks." },
  { name: "Manali", lat: 32.2432, lng: 77.1892, description: "The adventure capital of Himachal Pradesh at 2,050 m, gateway to Solang Valley, Rohtang Pass, and the Dhauladhar range." },
  { name: "Rohtang Pass", lat: 32.3722, lng: 77.2472, description: "A high mountain pass at 3,978 m connecting the Kullu Valley to the Lahaul-Spiti valley, offering panoramic views of Hanuman Tibba." },
  { name: "Beas River Source", lat: 32.3833, lng: 77.1167, description: "The source of the Beas River near Beas Kund, a glacial lake at the foot of the Pir Panjal range." }
];

const HANUMAN_TIBBA_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The imposing summit of Hanuman Tibba rising above the Solang Valley in the Dhauladhar range." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Panoramic Himalayan vistas of the Dhauladhar range as seen from the Manali region." },
  { src: "../../assets/Kedarnath.png", caption: "Glacial terrain and snow-capped peaks of the Dhauladhar range near Manali." },
  { src: "../../assets/Manalileh.png", caption: "High-altitude landscape on the approach through the Solang Valley to Hanuman Tibba base camp." }
];

const HANUMAN_TIBBA_FACTS = [
  "Hanuman Tibba, meaning 'Peak of Hanuman', is the highest peak of the Dhauladhar range at 5,982 metres, towering over the Kullu Valley near Manali.",
  "The mountain is named after Lord Hanuman, the monkey god of Hindu mythology, who is believed to have rested here during his mythical flight to Lanka to fetch the Sanjeevani herb.",
  "The first recorded ascent was achieved in 1939 by a British expedition, marking one of the earliest successful climbs in the Dhauladhar range.",
  "Hanuman Tibba is one of the most photographed peaks in Himachal Pradesh, its pyramid-shaped summit visible from almost every vantage point in Manali and the Kullu Valley.",
  "The Solang Valley at the foot of Hanuman Tibba is a year-round adventure sports hub, offering skiing in winter and paragliding, trekking, and mountaineering in summer.",
  "The Dhauladhar range, of which Hanuman Tibba is the highest point, forms a dramatic wall between the lush Kullu Valley and the barren Lahaul-Spiti plateau."
];

const HANUMAN_TIBBA_FAQS = [
  { question: "Where is Hanuman Tibba located?", answer: "Hanuman Tibba is located in the Kullu district of Himachal Pradesh, India, in the Dhauladhar range of the western Himalaya. It stands near the Solang Valley, approximately 14 km northwest of Manali." },
  { question: "What is the elevation of Hanuman Tibba?", answer: "Hanuman Tibba stands at 5,982 metres (19,626 feet) above sea level, making it the highest peak of the Dhauladhar range in Himachal Pradesh." },
  { question: "When was Hanuman Tibba first climbed?", answer: "The first recorded ascent was made in 1939 by a British expedition, which established the standard route via the southwest face from the Solang Valley." },
  { question: "What permits are needed to climb Hanuman Tibba?", answer: "A trekking permit from the District Magistrate's office in Manali is required. Registration at the forest checkpost near Solang Valley is also mandatory. Local guides can assist with permit arrangements." },
  { question: "What is the best season to attempt Hanuman Tibba?", answer: "The optimal climbing window is June to September, when the Dhauladhar range receives relatively less precipitation and the approach from Solang Valley is accessible. Late June to mid-July and late August to September offer the best weather windows." }
];

let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;
let lightboxKeydownHandler = null;

function init() {
  initAccordion();
  initGallery();
  initFactsRotator();
  initMap();
  initLightbox();
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

if (window.appLifecycle) {
  window.appLifecycle.registerCleanup(() => {
    if (factIntervalId) { clearInterval(factIntervalId); factIntervalId = null; }
    if (lightboxKeydownHandler) { document.removeEventListener("keydown", lightboxKeydownHandler); lightboxKeydownHandler = null; }
    if (map) { map.remove(); map = null; }
  });
}

function initAccordion() {
  const container = document.getElementById("hanuman-tibba-faq-accordion");
  if (!container) return;
  container.innerHTML = "";
  HANUMAN_TIBBA_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "hanuman-tibba-faq-item";
    item.innerHTML = `<button class="hanuman-tibba-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">${faq.question}</button><div class="hanuman-tibba-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}"><p>${faq.answer}</p></div>`;
    const button = item.querySelector(".hanuman-tibba-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      container.querySelectorAll(".hanuman-tibba-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".hanuman-tibba-faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isActive) { item.classList.add("active"); button.setAttribute("aria-expanded", "true"); }
    });
    container.appendChild(item);
  });
}

function initGallery() {
  const grid = document.getElementById("hanuman-tibba-gallery-grid");
  if (!grid) return;
  grid.innerHTML = "";
  HANUMAN_TIBBA_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "hanuman-tibba-gallery-item";
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", `Open image: ${item.caption}`);
    figure.innerHTML = `<img src="${item.src}" alt="${item.caption}" loading="lazy"><figcaption>${item.caption}</figcaption>`;
    figure.addEventListener("click", () => openLightbox(index));
    figure.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(index); } });
    grid.appendChild(figure);
  });
}

function initLightbox() {
  const lightbox = document.getElementById("hanuman-tibba-lightbox");
  if (!lightbox) return;
  document.querySelectorAll("[data-close-lightbox]").forEach((el) => el.addEventListener("click", closeLightbox));
  const prevBtn = document.getElementById("hanuman-tibba-lightbox-prev");
  const nextBtn = document.getElementById("hanuman-tibba-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));
  lightboxKeydownHandler = (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  };
  document.addEventListener("keydown", lightboxKeydownHandler);
}

function openLightbox(index) {
  const lightbox = document.getElementById("hanuman-tibba-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("hanuman-tibba-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = HANUMAN_TIBBA_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = HANUMAN_TIBBA_GALLERY[currentGalleryIndex];
  const img = document.getElementById("hanuman-tibba-lightbox-image");
  const caption = document.getElementById("hanuman-tibba-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

function initFactsRotator() {
  const factEl = document.getElementById("hanuman-tibba-fact-text");
  const dotsWrap = document.getElementById("hanuman-tibba-fact-dots");
  const prevBtn = document.getElementById("hanuman-tibba-fact-prev");
  const nextBtn = document.getElementById("hanuman-tibba-fact-next");
  if (!factEl) return;
  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);
  if (dotsWrap) {
    HANUMAN_TIBBA_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "hanuman-tibba-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => { showFact(i); resetInterval(); });
      dotsWrap.appendChild(dot);
    });
  }
  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => { factEl.textContent = HANUMAN_TIBBA_FACTS[factIndex]; factEl.style.opacity = "1"; }, 200);
    if (dotsWrap) { [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex)); }
  }
  function resetInterval() {
    if (factIntervalId) clearInterval(factIntervalId);
    factIntervalId = setInterval(() => showFact((factIndex + 1) % HANUMAN_TIBBA_FACTS.length), 6000);
  }
  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % HANUMAN_TIBBA_FACTS.length), 6000);
  if (prevBtn) prevBtn.addEventListener("click", () => { showFact((factIndex - 1 + HANUMAN_TIBBA_FACTS.length) % HANUMAN_TIBBA_FACTS.length); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { showFact((factIndex + 1) % HANUMAN_TIBBA_FACTS.length); resetInterval(); });
}

function initMap() {
  const mapContainer = document.getElementById("hanuman-tibba-map");
  if (!mapContainer || typeof L === "undefined") return;
  if (map !== null) { try { map.remove(); } catch (e) { console.warn("Failed to remove old map instance", e); } map = null; }
  map = L.map("hanuman-tibba-map", { scrollWheelZoom: false, minZoom: 6 }).setView([32.35, 77.1667], 10);
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "&copy; Esri, Maxar, Earthstar Geographics, CNES/ Airbus DS, USDA, USGS, AeroGRID, IGN & GIS User Community",
    maxZoom: 18
  }).addTo(map);
  HANUMAN_TIBBA_LOCATIONS.forEach((loc) => {
    const isPeak = loc.name.includes("Summit");
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: isPeak ? 9 : 7,
      color: isPeak ? "#ff9933" : "#0284c7",
      fillColor: isPeak ? "#ffb01f" : "#38bdf8",
      fillOpacity: 0.85,
      weight: 2
    }).addTo(map);
    marker.bindTooltip(loc.name, { direction: "top", offset: [0, -8], className: "hanuman-tibba-map-tooltip" });
    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
  });
}
