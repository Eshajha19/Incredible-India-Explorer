const DUNAGIRI_LOCATIONS = [
  {
    name: "Dunagiri Summit",
    lat: 30.8737,
    lng: 79.3832,
    description: "The main summit at 7,066 m, a sacred peak guarding the approach to the Nanda Devi Inner Sanctuary."
  },
  {
    name: "Dunagiri Base Camp",
    lat: 30.8500,
    lng: 79.3600,
    description: "The primary base camp at approximately 4,200 m, serving as staging point for summit attempts and treks."
  },
  {
    name: "Wan Village",
    lat: 30.8100,
    lng: 79.3300,
    description: "A remote Kumaoni village at 2,200 m and the starting point for Dunagiri and Nanda Devi treks."
  },
  {
    name: "Lata Village",
    lat: 30.8300,
    lng: 79.3500,
    description: "A traditional settlement at 2,100 m along the trek route, known for its ancient temples and warm hospitality."
  },
  {
    name: "Dronagiri Village",
    lat: 30.8600,
    lng: 79.3700,
    description: "The village named after the mountain, believed to be where Dronacharya (the epic warrior) practiced penance."
  },
  {
    name: "Tapovan",
    lat: 30.4300,
    lng: 79.7600,
    description: "An alpine meadow at 4,400 m known for hot springs and stunning views of Nanda Devi and surrounding peaks."
  },
  {
    name: "Joshimath",
    lat: 30.5563,
    lng: 79.5640,
    description: "A historic town at 1,890 m and gateway to Badrinath, serving as the main base for Dunagiri expeditions."
  }
];

const DUNAGIRI_GALLERY = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dunagiri_from_Kuari_Pass.jpg/960px-Dunagiri_from_Kuari_Pass.jpg",
    caption: "Dunagiri (7,066 m) as seen from the Kuari Pass trek — one of the most iconic viewpoints in the Garhwal Himalayas."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Dunagiri_from_Kartik_Swami_Temple.jpg/960px-Dunagiri_from_Kartik_Swami_Temple.jpg",
    caption: "Dunagiri peak from Kartik Swami Temple — a sacred vantage point offering panoramic views of the Garhwal range."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Dunagiri2.jpg/960px-Dunagiri2.jpg",
    caption: "A close-up view of Dunagiri's imposing summit pyramid rising above the surrounding alpine valleys."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Dunagiri%2CAlmora%2CIndia.jpg/960px-Dunagiri%2CAlmora%2CIndia.jpg",
    caption: "Dunagiri as viewed from the Almora region — showcasing the mountain's dramatic presence in the Kumaon Himalayas."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nanda_Devi_Biosphere_Reserve_-_Chamoli.jpg/500px-Nanda_Devi_Biosphere_Reserve_-_Chamoli.jpg",
    caption: "The Nanda Devi Biosphere Reserve — Dunagiri lies within this UNESCO World Heritage buffer zone in Chamoli."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Garhwal_Himalayas_Uttarakhand_India.jpg/500px-Garhwal_Himalayas_Uttarakhand_India.jpg",
    caption: "Panoramic view of the Garhwal Himalayas — home to Dunagiri, Nanda Devi, and surrounding sacred peaks."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Dhauliganga_and_Rishiganga_Valleys.jpg/500px-Dhauliganga_and_Rishiganga_Valleys.jpg",
    caption: "The Dhauliganga and Rishiganga river valleys — the dramatic gorge carved through the heart of the Chamoli Himalayas."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Reflection_of_Nanda_Devi_Hills_on_Hemkund_Sahib_Lake_Chamoli%2C_India.jpg/500px-Reflection_of_Nanda_Devi_Hills_on_Hemkund_Sahib_Lake_Chamoli%2C_India.jpg",
    caption: "Reflection of the surrounding peaks on Hemkund Sahib Lake — a sacred alpine lake near the Dunagiri region."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Rishi_Ganga_gorge_-_Shipton-Tilman_team_climbing_buttress.jpg/500px-Rishi_Ganga_gorge_-_Shipton-Tilman_team_climbing_buttress.jpg",
    caption: "Historic photo from the Rishi Ganga gorge — the dramatic entry into the inner sanctuary guarded by Dunagiri."
  }
];

const DUNAGIRI_FACTS = [
  "Dunagiri's name derives from 'Drona' (a sage from the Mahabharata) and 'giri' (mountain). The peak is locally known as the abode of Goddess Duna, a form of Parvati.",
  "Standing at 7,066 meters, Dunagiri is one of the key peaks forming the protective ring around the legendary Nanda Devi Inner Sanctuary.",
  "The first successful ascent was made on August 5, 1958, by an Indo-Japanese expedition team led by Hukam Singh, making it one of the last major Garhwal peaks to be climbed.",
  "Dunagiri is considered sacred by the people of Chamoli. Local communities perform rituals and offer prayers before any climbing expedition approaches the mountain.",
  "The trek to Dunagiri Base Camp passes through dense forests of oak, rhododendron, and birch, transitioning to alpine meadows with views of the entire Nanda Devi massif.",
  "The Rishi Ganga River, which carves the dramatic gorge into the inner sanctuary, flows past the southern slopes of Dunagiri, creating one of the most dramatic river valleys in the Himalayas.",
  "Dunagiri was designated part of the Nanda Devi Biosphere Reserve, a UNESCO World Heritage Site, protecting its pristine alpine ecosystem and rare Himalayan wildlife."
];

const DUNAGIRI_FAQS = [
  {
    question: "Where is Dunagiri located?",
    answer: "Dunagiri is located in the Garhwal Himalayas of Uttarakhand, India, in the Chamoli district. It stands at 7,066 meters above sea level and forms part of the ring of peaks surrounding the Nanda Devi Inner Sanctuary."
  },
  {
    question: "How tall is Dunagiri?",
    answer: "Dunagiri stands at an elevation of 7,066 meters (23,182 feet), making it one of the major peaks of the Garhwal Himalayas and among the highest in Uttarakhand."
  },
  {
    question: "When was Dunagiri first climbed?",
    answer: "The first successful ascent of Dunagiri was achieved on August 5, 1958, by an Indo-Japanese expedition team led by Hukam Singh via the north face route."
  },
  {
    question: "What is the significance of Dunagiri's name?",
    answer: "The name 'Dunagiri' is derived from 'Drona' (a sage/character from the Hindu epic Mahabharata) and 'giri' (mountain in Sanskrit). Locals revere the peak as the abode of Goddess Duna."
  },
  {
    question: "When is the best time to trek near Dunagiri?",
    answer: "The best seasons are pre-monsoon (May to June) when alpine wildflowers bloom across the meadows, and post-monsoon (September to October) when skies are clear and mountain views are at their best."
  },
  {
    question: "Do I need a permit to trek near Dunagiri?",
    answer: "Yes, trekking in the Dunagiri area falls within the Nanda Devi Biosphere Reserve, which requires permits from the Forest Department. A registered guide is recommended for the trek."
  },
  {
    question: "How do I reach Dunagiri?",
    answer: "The nearest major town is Joshimath (1,890 m), accessible from Rishikesh (about 250 km). From Joshimath, the trek starts through villages like Wan and Lata towards the Dunagiri Base Camp."
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

function initAccordion() {
  const container = document.getElementById("dunagiri-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  DUNAGIRI_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "dunagiri-faq-item reveal";
    item.style.transitionDelay = (index * 0.05) + "s";

    item.innerHTML = `
      <button class="dunagiri-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="dunagiri-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".dunagiri-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      container.querySelectorAll(".dunagiri-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".dunagiri-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("dunagiri-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  DUNAGIRI_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "dunagiri-gallery-item reveal";
    figure.style.transitionDelay = (index * 0.08) + "s";
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", "Open image: " + item.caption);
    figure.innerHTML =
      '<img src="' + item.src + '" alt="' + item.caption + '" loading="lazy">' +
      '<figcaption>' + item.caption + '</figcaption>';

    figure.addEventListener("click", function() { openLightbox(index); });
    figure.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    grid.appendChild(figure);
  });
}

function initLightbox() {
  const lightbox = document.getElementById("dunagiri-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach(function(el) {
    el.addEventListener("click", closeLightbox);
  });

  lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  var prevBtn = document.getElementById("dunagiri-lightbox-prev");
  var nextBtn = document.getElementById("dunagiri-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", function(e) { e.stopPropagation(); showGalleryImage(currentGalleryIndex - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function(e) { e.stopPropagation(); showGalleryImage(currentGalleryIndex + 1); });

  document.addEventListener("keydown", function(e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  var lightbox = document.getElementById("dunagiri-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  var lightbox = document.getElementById("dunagiri-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  var total = DUNAGIRI_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  var item = DUNAGIRI_GALLERY[currentGalleryIndex];

  var img = document.getElementById("dunagiri-lightbox-image");
  var caption = document.getElementById("dunagiri-lightbox-caption");

  if (img) {
    img.style.opacity = "0";
    img.src = item.src;
    img.alt = item.caption;
    img.onload = function() { img.style.opacity = "1"; };
  }
  if (caption) caption.textContent = item.caption;
}

function initFactsRotator() {
  var factEl = document.getElementById("dunagiri-fact-text");
  var dotsWrap = document.getElementById("dunagiri-fact-dots");
  var counterEl = document.getElementById("dunagiri-fact-counter");
  var prevBtn = document.getElementById("dunagiri-fact-prev");
  var nextBtn = document.getElementById("dunagiri-fact-next");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    DUNAGIRI_FACTS.forEach(function(_, i) {
      var dot = document.createElement("button");
      dot.className = "dunagiri-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", function() { showFact(i); resetInterval(); });
      dotsWrap.appendChild(dot);
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", function() { showFact((factIndex - 1 + DUNAGIRI_FACTS.length) % DUNAGIRI_FACTS.length); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener("click", function() { showFact((factIndex + 1) % DUNAGIRI_FACTS.length); resetInterval(); });

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    factEl.style.transform = "translateY(8px)";
    setTimeout(function() {
      factEl.textContent = DUNAGIRI_FACTS[factIndex];
      factEl.style.opacity = "1";
      factEl.style.transform = "translateY(0)";
    }, 250);
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach(function(dot, di) { dot.classList.toggle("active", di === factIndex); });
    }
    if (counterEl) {
      counterEl.textContent = (factIndex + 1) + " / " + DUNAGIRI_FACTS.length;
    }
  }

  function resetInterval() {
    if (factIntervalId) clearInterval(factIntervalId);
    factIntervalId = setInterval(function() { showFact((factIndex + 1) % DUNAGIRI_FACTS.length); }, 6000);
  }

  showFact(0);
  factIntervalId = setInterval(function() { showFact((factIndex + 1) % DUNAGIRI_FACTS.length); }, 6000);
}

function initMap() {
  var mapContainer = document.getElementById("dunagiri-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try { map.remove(); } catch (e) { /* ignore */ }
    map = null;
  }

  map = L.map("dunagiri-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.8737, 79.3832], 11);

  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18,
  }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
    attribution: "",
    maxZoom: 18,
    pane: "overlayPane",
  }).addTo(map);

  DUNAGIRI_LOCATIONS.forEach(function(loc) {
    var isSummit = loc.name.includes("Summit");
    var marker = L.circleMarker([loc.lat, loc.lng], {
      radius: isSummit ? 10 : 7,
      color: isSummit ? "#ff9933" : "#0284c7",
      fillColor: isSummit ? "#ffb01f" : "#38bdf8",
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(map);

    marker.bindTooltip("<strong>" + loc.name + "</strong><br><small>" + loc.description + "</small>", {
      direction: "top",
      offset: [0, -10],
      opacity: 1,
      className: "dunagiri-map-tooltip",
    });

    marker.bindPopup("<strong>" + loc.name + "</strong><br>" + loc.description);
  });
}
