const TRISUL_I_LOCATIONS = [
  {
    name: "Trisul I Peak",
    lat: 30.3121,
    lng: 79.7765,
    description: "The highest of the three Trisul peaks, standing at 7,120 meters. The first 7,000m peak ever climbed."
  },
  {
    name: "Pindari Glacier",
    lat: 30.27,
    lng: 79.98,
    description: "A massive glacier forming the traditional approach route to the Trisul massif from the southeast."
  },
  {
    name: "Kausani",
    lat: 29.8438,
    lng: 79.6023,
    description: "A scenic hill station offering panoramic views of the Trisul peaks and the broader Kumaon Himalayas."
  },
  {
    name: "Nanda Devi Peak",
    lat: 30.3758,
    lng: 79.9707,
    description: "India's second highest peak at 7,816 m, located northeast of Trisul within the Nanda Devi Biosphere Reserve."
  },
  {
    name: "Munsiyari",
    lat: 30.0736,
    lng: 80.2398,
    description: "A hill town serving as the gateway to the Pindari Glacier trek and the eastern Kumaon region."
  }
];

const TRISUL_I_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The majestic Trisul I peak towering over the Kumaon Himalayas." },
  { src: "../../assets/Manalileh.png", caption: "Alpine trails leading towards the Pindari Glacier approach." },
  { src: "../../assets/Shimlakaza.png", caption: "Sunrise over the Trisul massif from the eastern ridgeline." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Scenic valleys and meadows surrounding the Trisul range." }
];

const TRISUL_I_FACTS = [
  "Trisul was the first mountain over 7,000 metres ever to be climbed, achieved in 1907 by T.G. Longstaff's expedition.",
  "The three peaks of Trisul (I, II, III) are named after Lord Shiva's trident, which is a symbol of power and protection.",
  "Trisul I is located within the Nanda Devi Biosphere Reserve, one of India's most ecologically rich protected areas.",
  "The first ascent of Trisul I was accomplished by Tom Longstaff, Charles Bruce, and Alpine guide Alexis Brocherel on June 12, 1907.",
  "The mountain is visible from the famous hill station of Kausani, which Mahatma Gandhi once called the 'Switzerland of India'.",
  "Trisul I's standard climbing route approaches via the Pindari Glacier, one of the most popular trekking routes in Uttarakhand."
];

const TRISUL_I_FAQS = [
  {
    question: "Where is Trisul I located?",
    answer: "Trisul I is located in the Kumaon region of the Garhwal Himalayas in Uttarakhand, India, within the Nanda Devi Biosphere Reserve."
  },
  {
    question: "Why is it called Trisul?",
    answer: "The name 'Trisul' refers to Lord Shiva's trident. The three peaks of the massif are said to resemble the three prongs of a trident."
  },
  {
    question: "What is the elevation of Trisul I?",
    answer: "Trisul I stands at 7,120 meters (23,360 feet) above sea level, making it the highest of the three Trisul peaks."
  },
  {
    question: "What is the historical significance of Trisul I?",
    answer: "Trisul I was the first 7,000-meter peak ever to be climbed, marking a historic milestone in Himalayan mountaineering in 1907."
  },
  {
    question: "How can trekkers experience Trisul I?",
    answer: "The Pindari Glacier trek offers stunning views of Trisul I and is one of the most popular trekking routes in Uttarakhand, suitable for experienced trekkers."
  }
];

let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;

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
    if (factIntervalId) {
      clearInterval(factIntervalId);
      factIntervalId = null;
    }
  });
}

function initAccordion() {
  const container = document.getElementById("trisul-i-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  TRISUL_I_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "trisul-i-faq-item";
    
    item.innerHTML = `
      <button class="trisul-i-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="trisul-i-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".trisul-i-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      container.querySelectorAll(".trisul-i-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".trisul-i-faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });

    container.appendChild(item);
  });
}

function initGallery() {
  const grid = document.getElementById("trisul-i-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  TRISUL_I_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "trisul-i-gallery-item";
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

function initLightbox() {
  const lightbox = document.getElementById("trisul-i-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("trisul-i-lightbox-prev");
  const nextBtn = document.getElementById("trisul-i-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("trisul-i-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("trisul-i-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = TRISUL_I_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = TRISUL_I_GALLERY[currentGalleryIndex];
  
  const img = document.getElementById("trisul-i-lightbox-image");
  const caption = document.getElementById("trisul-i-lightbox-caption");
  
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

function initFactsRotator() {
  const factEl = document.getElementById("trisul-i-fact-text");
  const dotsWrap = document.getElementById("trisul-i-fact-dots");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    TRISUL_I_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "trisul-i-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = TRISUL_I_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % TRISUL_I_FACTS.length), 6000);
}

function initMap() {
  const mapContainer = document.getElementById("trisul-i-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try {
      map.remove();
    } catch (e) {
      console.warn("Failed to remove old map instance", e);
    }
    map = null;
  }

  map = L.map("trisul-i-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.3121, 79.7765], 10);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  TRISUL_I_LOCATIONS.forEach((loc) => {
    const isPeak = loc.name.includes("Peak");
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: isPeak ? 9 : 7,
      color: isPeak ? "#ff9933" : "#0284c7",
      fillColor: isPeak ? "#ffb01f" : "#38bdf8",
      fillOpacity: 0.85,
      weight: 2,
    }).addTo(map);

    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
  });
}