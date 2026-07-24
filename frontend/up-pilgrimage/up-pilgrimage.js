/**
 * up-pilgrimage.js
 * Uttar Pradesh Pilgrimage Circuit Planner - Data Structures & Route Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core 8 Uttar Pradesh Pilgrimage Destinations Dataset
export const destinations = [
  {
    id: "ayodhya",
    name: "Ayodhya",
    code: "AY",
    tradition: "Ramayana / Sacred Ram Janmabhoomi",
    category: "Ramayana Circuit",
    rivers: ["Saryu River"],
    description: "The revered birthplace of Lord Rama along the sacred Saryu River. A premier pilgrimage hub celebrated for Shri Ram Janmabhoomi Mandir, Hanuman Garhi, and grand Deepotsav celebrations.",
    keySites: [
      "Shri Ram Janmabhoomi Mandir",
      "Hanuman Garhi",
      "Kanak Bhawan",
      "Saryu River Ghats",
      "Treta Ke Thakur",
      "Nageshwarnath Temple"
    ],
    recommendedStayDays: 2,
    bestSeason: "October to March (Ram Navami & Deepotsav)",
    coords: { x: 480, y: 220, lat: 26.7922, lng: 82.1998 },
    icon: "🛕",
    colorTheme: "#f97316"
  },
  {
    id: "varanasi",
    name: "Varanasi (Kashi)",
    code: "VA",
    tradition: "Shaivism / Spiritual Capital of India",
    category: "Shaiva Circuit",
    rivers: ["Ganga River", "Varuna River", "Assi River"],
    description: "One of the world's oldest living cities and spiritual heart of Shaivism. Famous for Kashi Vishwanath Temple, ancient Ganga Ghats, and the divine evening Ganga Aarti.",
    keySites: [
      "Kashi Vishwanath Temple",
      "Dashashwamedh Ghat",
      "Manikarnika Ghat",
      "Assi Ghat",
      "Annapurna Temple",
      "Sankat Mochan Hanuman Temple"
    ],
    recommendedStayDays: 3,
    bestSeason: "October to March (Dev Deepawali & Maha Shivratri)",
    coords: { x: 580, y: 340, lat: 25.3176, lng: 82.9739 },
    icon: "🕉️",
    colorTheme: "#eab308"
  },
  {
    id: "mathura",
    name: "Mathura",
    code: "MA",
    tradition: "Krishna Janmabhoomi / Braj Heritage",
    category: "Krishna Circuit",
    rivers: ["Yamuna River"],
    description: "The sacred birthplace of Lord Krishna along the Yamuna River. Renowned for Shri Krishna Janmasthan Temple, Dwarkadhish Mandir, Vishram Ghat, and vibrant Janmashtami fairs.",
    keySites: [
      "Shri Krishna Janmasthan Temple",
      "Dwarkadhish Temple",
      "Vishram Ghat",
      "Gita Mandir",
      "Kansa Qila",
      "Bhuteshwar Mahadev Temple"
    ],
    recommendedStayDays: 2,
    bestSeason: "August to March (Janmashtami & Lathmar Holi)",
    coords: { x: 180, y: 190, lat: 27.4924, lng: 77.6737 },
    icon: "🪈",
    colorTheme: "#3b82f6"
  },
  {
    id: "vrindavan",
    name: "Vrindavan",
    code: "VR",
    tradition: "Radha-Krishna Devotion / Holy Groves",
    category: "Krishna Circuit",
    rivers: ["Yamuna River"],
    description: "The holy land of Lord Krishna's childhood pastimes and divine Raas Leela. Home to thousands of historic and modern temples including Banke Bihari, Prem Mandir, and ISKCON.",
    keySites: [
      "Banke Bihari Temple",
      "Prem Mandir",
      "ISKCON Vrindavan",
      "Radha Raman Temple",
      "Nidhivan",
      "Govind Devji Temple"
    ],
    recommendedStayDays: 2,
    bestSeason: "August to March (Holi & Radhashtami)",
    coords: { x: 170, y: 170, lat: 27.5804, lng: 77.7006 },
    icon: "🌸",
    colorTheme: "#ec4899"
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    code: "PR",
    tradition: "Triveni Sangam / Prayag Raj",
    category: "Sacred Rivers",
    rivers: ["Ganga River", "Yamuna River", "Mythical Saraswati River"],
    description: "The sacred confluence (Triveni Sangam) of Ganga, Yamuna, and Saraswati rivers. Host to the world's largest spiritual gathering - Kumbh Mela and annual Magh Mela.",
    keySites: [
      "Triveni Sangam Ghat",
      "Bade Hanuman Temple (Reclining Hanuman)",
      "Alopi Devi Shakti Peeth",
      "Anand Bhavan",
      "Prayagraj Fort (Akshaya Vat)",
      "Veni Madhav Temple"
    ],
    recommendedStayDays: 2,
    bestSeason: "October to March (Kumbh Mela & Magh Mela)",
    coords: { x: 460, y: 320, lat: 25.4358, lng: 81.8463 },
    icon: "🌊",
    colorTheme: "#10b981"
  },
  {
    id: "chitrakoot",
    name: "Chitrakoot",
    code: "CH",
    tradition: "Ramayana Exile Abode",
    category: "Ramayana Circuit",
    rivers: ["Mandakini River", "Payaswini River"],
    description: "The peaceful forest abode where Lord Rama, Sita, and Lakshmana spent 11 of their 14 years of exile. Celebrated for Kamadgiri Hill parikrama and Ramghat.",
    keySites: [
      "Kamadgiri Hill",
      "Ramghat (Mandakini River)",
      "Sati Anusuya Ashram",
      "Hanuman Dhara",
      "Sphatik Sheila",
      "Gupt Godavari"
    ],
    recommendedStayDays: 2,
    bestSeason: "October to March (Ramnavami & Deepavali)",
    coords: { x: 390, y: 380, lat: 25.1764, lng: 80.8661 },
    icon: "⛰️",
    colorTheme: "#8b5cf6"
  },
  {
    id: "kushinagar",
    name: "Kushinagar",
    code: "KU",
    tradition: "Buddhist Parinirvana Site",
    category: "Buddhist Circuit",
    rivers: ["Hiranyavati River"],
    description: "One of the four sacred Buddhist pilgrimage places, where Gautama Buddha attained Mahaparinirvana. Features the 6m Reclining Buddha statue and Ramabhar Stupa.",
    keySites: [
      "Mahaparinirvana Temple",
      "Ramabhar Stupa",
      "Matha Kuar Shrine",
      "Japanese Buddhist Temple",
      "Wat Thai Temple",
      "Kushinagar Museum"
    ],
    recommendedStayDays: 1,
    bestSeason: "October to March (Buddha Purnima)",
    coords: { x: 640, y: 180, lat: 26.7408, lng: 83.8887 },
    icon: "☸️",
    colorTheme: "#a855f7"
  },
  {
    id: "sarnath",
    name: "Sarnath",
    code: "SA",
    tradition: "Buddhist Dharmachakra First Sermon",
    category: "Buddhist Circuit",
    rivers: ["Ganga River Basin"],
    description: "The holy site near Varanasi where Gautama Buddha preached his first sermon after attaining enlightenment. Home to Dhamek Stupa and the Ashoka Lion Capital.",
    keySites: [
      "Dhamek Stupa",
      "Chaukhandi Stupa",
      "Ashoka Pillar & Museum",
      "Mulagandha Kuti Vihar",
      "Tibetan Monastery",
      "Deer Park"
    ],
    recommendedStayDays: 1,
    bestSeason: "October to March (Buddha Purnima)",
    coords: { x: 600, y: 330, lat: 25.3811, lng: 83.0214 },
    icon: "☸️",
    colorTheme: "#06b6d4"
  }
];

// Distance Matrix in Kilometers (approximate road distances)
export const distanceMatrix = {
  "mathura_vrindavan": 15,
  "mathura_ayodhya": 480,
  "mathura_prayagraj": 510,
  "mathura_chitrakoot": 490,
  "mathura_varanasi": 630,
  "mathura_sarnath": 640,
  "mathura_kushinagar": 680,
  
  "vrindavan_ayodhya": 470,
  "vrindavan_prayagraj": 520,
  "vrindavan_chitrakoot": 500,
  "vrindavan_varanasi": 640,
  "vrindavan_sarnath": 650,
  "vrindavan_kushinagar": 690,

  "ayodhya_prayagraj": 165,
  "ayodhya_chitrakoot": 275,
  "ayodhya_varanasi": 200,
  "ayodhya_sarnath": 210,
  "ayodhya_kushinagar": 180,

  "prayagraj_chitrakoot": 130,
  "prayagraj_varanasi": 120,
  "prayagraj_sarnath": 130,
  "prayagraj_kushinagar": 310,

  "chitrakoot_varanasi": 230,
  "chitrakoot_sarnath": 240,
  "chitrakoot_kushinagar": 420,

  "varanasi_sarnath": 12,
  "varanasi_kushinagar": 230,

  "sarnath_kushinagar": 225
};

// Preset Pilgrimage Circuits
export const presetCircuits = [
  {
    id: "ramayana_circuit",
    name: "Ramayana Sacred Circuit",
    destinations: ["ayodhya", "prayagraj", "chitrakoot", "varanasi"],
    description: "Follow the sacred footprints of Lord Rama from his birthplace in Ayodhya to Triveni Sangam, Chitrakoot exile forest, and Kashi.",
    icon: "🏹"
  },
  {
    id: "krishna_circuit",
    name: "Krishna Braj Dham Circuit",
    destinations: ["mathura", "vrindavan"],
    description: "Immerse in divine Krishna devotion across birthsite Mathura and holy groves of Vrindavan.",
    icon: "🪈"
  },
  {
    id: "buddhist_circuit",
    name: "Sacred Buddhist Dhamma Circuit",
    destinations: ["sarnath", "varanasi", "kushinagar"],
    description: "Retrace Lord Buddha's spiritual milestone journey from First Sermon at Sarnath to Mahaparinirvana at Kushinagar.",
    icon: "☸️"
  },
  {
    id: "ganga_triveni_circuit",
    name: "Triveni & Holy Ganga Circuit",
    destinations: ["prayagraj", "varanasi", "sarnath", "ayodhya"],
    description: "Pilgrimage along the holy Ganga & Yamuna river basins covering Prayagraj Sangam, Kashi, Sarnath, and Ayodhya.",
    icon: "🌊"
  },
  {
    id: "grand_up_circuit",
    name: "Grand UP Pilgrimage Yatra (All 8 Destinations)",
    destinations: ["mathura", "vrindavan", "ayodhya", "prayagraj", "chitrakoot", "varanasi", "sarnath", "kushinagar"],
    description: "Complete 8-destination grand pilgrimage covering Krishna, Rama, Shiva, and Buddha holy sites across Uttar Pradesh.",
    icon: "🚩"
  }
];

const FAVORITES_STORAGE_KEY = "up_pilgrimage_favorites";

/**
 * Get destination object by ID.
 */
export function getDestinationById(id, list = destinations) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(d => d.id.toLowerCase() === id.toLowerCase());
}

/**
 * Get road distance in km between two destination IDs.
 */
export function getDistance(fromId, toId) {
  if (!fromId || !toId) return 0;
  const id1 = fromId.toLowerCase();
  const id2 = toId.toLowerCase();
  if (id1 === id2) return 0;

  const key1 = `${id1}_${id2}`;
  const key2 = `${id2}_${id1}`;

  if (distanceMatrix[key1] !== undefined) return distanceMatrix[key1];
  if (distanceMatrix[key2] !== undefined) return distanceMatrix[key2];

  // Fallback Euclidean estimation if key missing
  const d1 = getDestinationById(id1);
  const d2 = getDestinationById(id2);
  if (d1 && d2) {
    const dx = d1.coords.x - d2.coords.x;
    const dy = d1.coords.y - d2.coords.y;
    return Math.round(Math.sqrt(dx * dx + dy * dy) * 1.5);
  }
  return 100;
}

/**
 * Calculate total distance in km for an array of ordered destination IDs.
 */
export function calculateRouteDistance(destIdList = []) {
  if (!Array.isArray(destIdList) || destIdList.length < 2) return 0;
  let totalKm = 0;
  for (let i = 0; i < destIdList.length - 1; i++) {
    totalKm += getDistance(destIdList[i], destIdList[i + 1]);
  }
  return totalKm;
}

/**
 * Calculate travel duration in hours based on distance in km and mode.
 * Modes: "car" (60 km/h), "bus" (45 km/h), "train" (75 km/h).
 */
export function calculateTravelDuration(distanceKm = 0, mode = "car") {
  const dist = Number(distanceKm) || 0;
  if (dist <= 0) return 0;

  let speed = 60;
  if (mode === "bus") speed = 45;
  if (mode === "train") speed = 75;

  return Math.round((dist / speed) * 10) / 10;
}

/**
 * Calculate total duration breakdown: travel hours, stay days, and total days.
 */
export function calculateTotalDuration(destIdList = [], mode = "car") {
  const distanceKm = calculateRouteDistance(destIdList);
  const travelHours = calculateTravelDuration(distanceKm, mode);

  let stayDays = 0;
  const uniqueIds = new Set(destIdList);
  uniqueIds.forEach(id => {
    const dest = getDestinationById(id);
    if (dest) stayDays += dest.recommendedStayDays;
  });

  const travelDays = Math.ceil(travelHours / 8);
  const totalDays = stayDays + (travelDays > 0 ? travelDays : (destIdList.length > 0 ? 1 : 0));

  return {
    distanceKm,
    travelHours,
    stayDays,
    travelDays,
    totalDays
  };
}

/**
 * Get favorite destination IDs from localStorage.
 */
export function getFavorites() {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Toggle favorite status for a destination ID.
 */
export function toggleFavorite(destId) {
  if (!destId || typeof localStorage === "undefined") return false;
  try {
    const current = getFavorites();
    const target = destId.toLowerCase();
    const idx = current.indexOf(target);
    let updated;
    if (idx !== -1) {
      updated = current.filter(item => item !== target);
    } else {
      updated = [...current, target];
    }
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    return updated.includes(target);
  } catch (e) {
    return false;
  }
}

/**
 * Check if a destination is favorited.
 */
export function isFavorite(destId) {
  if (!destId) return false;
  const favorites = getFavorites();
  return favorites.includes(destId.toLowerCase());
}

/**
 * Filter destinations by search query and category filter.
 */
export function filterDestinations(query = "", category = "all", list = destinations) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const cat = category.trim().toLowerCase();

  return list.filter(item => {
    const matchesQuery = !q || [
      item.name,
      item.tradition,
      item.category,
      item.description,
      ...item.rivers,
      ...item.keySites
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesCategory = cat === "all" || item.category.toLowerCase().includes(cat);

    return matchesQuery && matchesCategory;
  });
}

/**
 * Get preset circuit by ID.
 */
export function getPresetCircuit(circuitId, list = presetCircuits) {
  if (!circuitId || !Array.isArray(list)) return undefined;
  return list.find(c => c.id.toLowerCase() === circuitId.toLowerCase());
}

/* ==========================================================================
   BROWSER DOM & INTERACTIVE MAP ROUTE PLANNER ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.upDestinationsData = destinations;
  window.presetCircuitsData = presetCircuits;
  window.getDestinationById = getDestinationById;
  window.getDistance = getDistance;
  window.calculateRouteDistance = calculateRouteDistance;
  window.calculateTravelDuration = calculateTravelDuration;
  window.calculateTotalDuration = calculateTotalDuration;
  window.getFavorites = getFavorites;
  window.toggleFavorite = toggleFavorite;
  window.isFavorite = isFavorite;
  window.filterDestinations = filterDestinations;
  window.getPresetCircuit = getPresetCircuit;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Element References
    const presetButtons = document.querySelectorAll(".btn-preset-circuit");
    const transportSelect = document.getElementById("transport-mode");
    const addDestSelect = document.getElementById("add-dest-select");
    const btnAddDest = document.getElementById("btn-add-dest");
    const btnClearRoute = document.getElementById("btn-clear-route");
    const routeStopsContainer = document.getElementById("route-stops-list");

    // Summary Display Elements
    const statTotalDistance = document.getElementById("stat-total-distance");
    const statTravelTime = document.getElementById("stat-travel-time");
    const statStayDays = document.getElementById("stat-stay-days");
    const statTotalDays = document.getElementById("stat-total-days");

    // SVG Map Elements
    const svgMap = document.getElementById("up-map-svg");
    const mapNodesGroup = document.getElementById("map-dest-nodes");
    const mapRoutesGroup = document.getElementById("map-route-lines");

    // Zoom Controls
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomOutBtn = document.getElementById("zoom-out");
    const zoomResetBtn = document.getElementById("zoom-reset");

    // Details Modal / Panel Elements
    const destDetailsCard = document.getElementById("dest-details-card");
    const cardTitle = document.getElementById("card-dest-title");
    const cardTradition = document.getElementById("card-dest-tradition");
    const cardRivers = document.getElementById("card-dest-rivers");
    const cardStay = document.getElementById("card-dest-stay");
    const cardSeason = document.getElementById("card-dest-season");
    const cardDescription = document.getElementById("card-dest-desc");
    const cardSitesList = document.getElementById("card-dest-sites");
    const cardFavBtn = document.getElementById("card-fav-btn");
    const cardAddRouteBtn = document.getElementById("card-add-route-btn");

    // Destinations Grid & Search Elements
    const destSearchInput = document.getElementById("dest-search");
    const categoryFilterSelect = document.getElementById("category-filter");
    const destGridContainer = document.getElementById("destinations-grid");
    const favOnlyToggle = document.getElementById("fav-only-toggle");

    // State Variables
    let currentItinerary = ["ayodhya", "prayagraj", "chitrakoot", "varanasi"]; // Default Ramayana Circuit
    let currentTransportMode = "car";
    let activeSelectedDestId = "ayodhya";
    let currentScale = 1;
    let isFavoritesOnly = false;

    // Populate Add Destination Dropdown
    if (addDestSelect) {
      destinations.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.id;
        opt.textContent = `${d.icon} ${d.name} (${d.category})`;
        addDestSelect.appendChild(opt);
      });
    }

    // Render Full UI
    function renderAll() {
      renderItineraryStops();
      renderSummaryStats();
      renderMap();
      renderDestinationCard(activeSelectedDestId);
      renderDestinationsGrid();
    }

    // Render Itinerary Stop List
    function renderItineraryStops() {
      if (!routeStopsContainer) return;
      routeStopsContainer.innerHTML = "";

      if (currentItinerary.length === 0) {
        routeStopsContainer.innerHTML = `
          <div class="empty-route-msg">
            <p>Your itinerary is empty. Select a preset circuit or add destinations above!</p>
          </div>
        `;
        return;
      }

      currentItinerary.forEach((destId, idx) => {
        const dest = getDestinationById(destId);
        if (!dest) return;

        const stopEl = document.createElement("div");
        stopEl.className = "route-stop-item";
        
        let legDistText = "";
        if (idx > 0) {
          const prevId = currentItinerary[idx - 1];
          const dist = getDistance(prevId, destId);
          legDistText = `<span class="leg-dist-badge">🚗 ${dist} km from previous stop</span>`;
        } else {
          legDistText = `<span class="leg-dist-badge start">🚩 Starting Point</span>`;
        }

        stopEl.innerHTML = `
          <div class="stop-index">${idx + 1}</div>
          <div class="stop-info">
            <div class="stop-title">
              <strong>${dest.icon} ${dest.name}</strong>
              <span class="stop-cat">${dest.category}</span>
            </div>
            ${legDistText}
          </div>
          <div class="stop-actions">
            ${idx > 0 ? `<button type="button" class="btn-move-stop" data-dir="up" data-idx="${idx}" title="Move Up">▲</button>` : ''}
            ${idx < currentItinerary.length - 1 ? `<button type="button" class="btn-move-stop" data-dir="down" data-idx="${idx}" title="Move Down">▼</button>` : ''}
            <button type="button" class="btn-remove-stop" data-idx="${idx}" title="Remove Stop">&times;</button>
          </div>
        `;

        // Click stop to select on map
        stopEl.addEventListener("click", (e) => {
          if (!e.target.closest("button")) {
            activeSelectedDestId = destId;
            renderMap();
            renderDestinationCard(destId);
          }
        });

        // Move / Remove Handlers
        const btnUp = stopEl.querySelector('[data-dir="up"]');
        const btnDown = stopEl.querySelector('[data-dir="down"]');
        const btnRemove = stopEl.querySelector('.btn-remove-stop');

        btnUp?.addEventListener("click", () => {
          if (idx > 0) {
            const temp = currentItinerary[idx];
            currentItinerary[idx] = currentItinerary[idx - 1];
            currentItinerary[idx - 1] = temp;
            renderAll();
          }
        });

        btnDown?.addEventListener("click", () => {
          if (idx < currentItinerary.length - 1) {
            const temp = currentItinerary[idx];
            currentItinerary[idx] = currentItinerary[idx + 1];
            currentItinerary[idx + 1] = temp;
            renderAll();
          }
        });

        btnRemove?.addEventListener("click", () => {
          currentItinerary.splice(idx, 1);
          renderAll();
        });

        routeStopsContainer.appendChild(stopEl);
      });
    }

    // Render Summary Statistics
    function renderSummaryStats() {
      const summary = calculateTotalDuration(currentItinerary, currentTransportMode);

      if (statTotalDistance) statTotalDistance.textContent = `${summary.distanceKm} km`;
      if (statTravelTime) statTravelTime.textContent = `${summary.travelHours} hrs (${currentTransportMode.toUpperCase()})`;
      if (statStayDays) statStayDays.textContent = `${summary.stayDays} Days`;
      if (statTotalDays) statTotalDays.textContent = `${summary.totalDays} Days`;
    }

    // Render SVG Map Nodes and Connecting Route Polyline
    function renderMap() {
      if (!mapNodesGroup || !mapRoutesGroup) return;

      mapNodesGroup.innerHTML = "";
      mapRoutesGroup.innerHTML = "";

      // 1. Draw Connecting Route Polylines
      if (currentItinerary.length >= 2) {
        for (let i = 0; i < currentItinerary.length - 1; i++) {
          const d1 = getDestinationById(currentItinerary[i]);
          const d2 = getDestinationById(currentItinerary[i + 1]);
          if (d1 && d2) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", d1.coords.x);
            line.setAttribute("y1", d1.coords.y);
            line.setAttribute("x2", d2.coords.x);
            line.setAttribute("y2", d2.coords.y);
            line.setAttribute("class", "map-route-line");

            // Motion particle circle
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("r", 4);
            circle.setAttribute("class", "map-motion-dot");

            const animateX = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animateX.setAttribute("attributeName", "cx");
            animateX.setAttribute("from", d1.coords.x);
            animateX.setAttribute("to", d2.coords.x);
            animateX.setAttribute("dur", "2.5s");
            animateX.setAttribute("repeatCount", "indefinite");

            const animateY = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animateY.setAttribute("attributeName", "cy");
            animateY.setAttribute("from", d1.coords.y);
            animateY.setAttribute("to", d2.coords.y);
            animateY.setAttribute("dur", "2.5s");
            animateY.setAttribute("repeatCount", "indefinite");

            circle.appendChild(animateX);
            circle.appendChild(animateY);

            mapRoutesGroup.appendChild(line);
            mapRoutesGroup.appendChild(circle);
          }
        }
      }

      // 2. Draw Destination Nodes
      destinations.forEach(dest => {
        const isInItinerary = currentItinerary.includes(dest.id);
        const isSelected = activeSelectedDestId === dest.id;
        const itineraryIdx = currentItinerary.indexOf(dest.id);

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", `map-dest-node ${isInItinerary ? "in-route" : ""} ${isSelected ? "selected" : ""}`);
        g.setAttribute("transform", `translate(${dest.coords.x}, ${dest.coords.y})`);
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");
        g.setAttribute("aria-label", `${dest.name} (${dest.category})`);

        // Outer Glow Ring
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute("r", isSelected ? 18 : 12);
        ring.setAttribute("class", "node-outer-ring");

        // Core Dot
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("r", isSelected ? 9 : 6);
        dot.setAttribute("class", "node-core-dot");
        dot.setAttribute("fill", dest.colorTheme);

        // Sequence number badge if in itinerary
        if (itineraryIdx !== -1) {
          const numText = document.createElementNS("http://www.w3.org/2000/svg", "text");
          numText.setAttribute("class", "node-seq-text");
          numText.setAttribute("text-anchor", "middle");
          numText.setAttribute("dy", 4);
          numText.textContent = itineraryIdx + 1;
          g.appendChild(numText);
        }

        // Destination Label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("y", -20);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("class", "node-label");
        label.textContent = dest.name;

        g.appendChild(ring);
        g.appendChild(dot);
        g.appendChild(label);

        g.addEventListener("click", () => {
          activeSelectedDestId = dest.id;
          renderMap();
          renderDestinationCard(dest.id);
        });
        g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activeSelectedDestId = dest.id;
            renderMap();
            renderDestinationCard(dest.id);
          }
        });

        mapNodesGroup.appendChild(g);
      });
    }

    // Render Detailed Destination Card
    function renderDestinationCard(destId) {
      if (!destDetailsCard) return;
      const dest = getDestinationById(destId) || destinations[0];

      if (cardTitle) cardTitle.textContent = `${dest.icon} ${dest.name}`;
      if (cardTradition) cardTradition.textContent = dest.tradition;
      if (cardRivers) cardRivers.textContent = dest.rivers.join(", ");
      if (cardStay) cardStay.textContent = `${dest.recommendedStayDays} Days Recommended`;
      if (cardSeason) cardSeason.textContent = dest.bestSeason;
      if (cardDescription) cardDescription.textContent = dest.description;

      if (cardSitesList) {
        cardSitesList.innerHTML = "";
        dest.keySites.forEach(site => {
          const li = document.createElement("li");
          li.textContent = `📍 ${site}`;
          cardSitesList.appendChild(li);
        });
      }

      // Update Fav Button Status
      const fav = isFavorite(dest.id);
      if (cardFavBtn) {
        cardFavBtn.classList.toggle("active", fav);
        cardFavBtn.textContent = fav ? "★ Favorited" : "☆ Add Favorite";
      }

      // Update Add to Route Button Status
      const inRoute = currentItinerary.includes(dest.id);
      if (cardAddRouteBtn) {
        cardAddRouteBtn.textContent = inRoute ? "✓ In Itinerary" : "+ Add to Itinerary";
        cardAddRouteBtn.disabled = inRoute;
      }
    }

    // Render All Destinations Cards Grid
    function renderDestinationsGrid() {
      if (!destGridContainer) return;
      destGridContainer.innerHTML = "";

      const query = destSearchInput ? destSearchInput.value : "";
      const cat = categoryFilterSelect ? categoryFilterSelect.value : "all";

      let filtered = filterDestinations(query, cat);

      if (isFavoritesOnly) {
        const favs = getFavorites();
        filtered = filtered.filter(d => favs.includes(d.id));
      }

      if (filtered.length === 0) {
        destGridContainer.innerHTML = `
          <div class="empty-grid-msg">
            <p>No destinations match your search or favorite filters.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(dest => {
        const fav = isFavorite(dest.id);
        const inRoute = currentItinerary.includes(dest.id);

        const card = document.createElement("article");
        card.className = `dest-card ${inRoute ? "in-route" : ""}`;
        card.innerHTML = `
          <div class="dest-card-header">
            <span class="dest-cat-badge" style="border-color: ${dest.colorTheme}">${dest.category}</span>
            <button type="button" class="btn-fav-star ${fav ? 'active' : ''}" data-id="${dest.id}">
              ${fav ? '★' : '☆'}
            </button>
          </div>

          <h3 class="dest-card-title">${dest.icon} ${dest.name}</h3>
          <p class="dest-card-tradition">${dest.tradition}</p>
          <p class="dest-card-desc">${dest.description}</p>

          <div class="dest-card-meta">
            <span>🌊 ${dest.rivers[0]}</span>
            <span>⏱️ ${dest.recommendedStayDays} Days Stay</span>
          </div>

          <div class="dest-card-footer">
            <button type="button" class="btn-view-map" data-id="${dest.id}">🗺️ Inspect Map</button>
            <button type="button" class="btn-add-route" data-id="${dest.id}" ${inRoute ? 'disabled' : ''}>
              ${inRoute ? '✓ In Itinerary' : '+ Add Stop'}
            </button>
          </div>
        `;

        // Fav Star Listener
        const starBtn = card.querySelector(".btn-fav-star");
        starBtn?.addEventListener("click", (e) => {
          e.stopPropagation();
          const newStatus = toggleFavorite(dest.id);
          starBtn.classList.toggle("active", newStatus);
          starBtn.textContent = newStatus ? "★" : "☆";
          renderDestinationCard(activeSelectedDestId);
          if (isFavoritesOnly) {
            renderDestinationsGrid();
          }
        });

        // Inspect Map Listener
        card.querySelector(".btn-view-map")?.addEventListener("click", () => {
          activeSelectedDestId = dest.id;
          renderMap();
          renderDestinationCard(dest.id);
          svgMap?.scrollIntoView({ behavior: "smooth", block: "center" });
        });

        // Add Stop Listener
        card.querySelector(".btn-add-route")?.addEventListener("click", () => {
          if (!currentItinerary.includes(dest.id)) {
            currentItinerary.push(dest.id);
            renderAll();
          }
        });

        destGridContainer.appendChild(card);
      });
    }

    // Preset Circuits Buttons Click Listener
    presetButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        presetButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const circuitId = btn.dataset.circuitId;
        const circuit = getPresetCircuit(circuitId);
        if (circuit) {
          currentItinerary = [...circuit.destinations];
          activeSelectedDestId = currentItinerary[0];
          renderAll();
        }
      });
    });

    // Transport Mode Select Listener
    transportSelect?.addEventListener("change", (e) => {
      currentTransportMode = e.target.value;
      renderSummaryStats();
    });

    // Add Destination Button Listener
    btnAddDest?.addEventListener("click", () => {
      const selectedId = addDestSelect ? addDestSelect.value : "";
      if (selectedId && !currentItinerary.includes(selectedId)) {
        currentItinerary.push(selectedId);
        activeSelectedDestId = selectedId;
        renderAll();
      }
    });

    // Clear Route Button Listener
    btnClearRoute?.addEventListener("click", () => {
      currentItinerary = [];
      renderAll();
    });

    // Card Fav Button Click
    cardFavBtn?.addEventListener("click", () => {
      const newStatus = toggleFavorite(activeSelectedDestId);
      renderDestinationCard(activeSelectedDestId);
      renderDestinationsGrid();
    });

    // Card Add Route Click
    cardAddRouteBtn?.addEventListener("click", () => {
      if (!currentItinerary.includes(activeSelectedDestId)) {
        currentItinerary.push(activeSelectedDestId);
        renderAll();
      }
    });

    // Favorites Only Toggle
    favOnlyToggle?.addEventListener("click", () => {
      isFavoritesOnly = !isFavoritesOnly;
      favOnlyToggle.classList.toggle("active", isFavoritesOnly);
      favOnlyToggle.textContent = isFavoritesOnly ? "★ Showing Favorites Only" : "☆ View Favorites Only";
      renderDestinationsGrid();
    });

    // Search and Category Filter Listeners
    destSearchInput?.addEventListener("input", renderDestinationsGrid);
    categoryFilterSelect?.addEventListener("change", renderDestinationsGrid);

    // Zoom Controls for SVG Map
    zoomInBtn?.addEventListener("click", () => {
      currentScale = Math.min(currentScale + 0.2, 2.5);
      if (svgMap) svgMap.style.transform = `scale(${currentScale})`;
    });

    zoomOutBtn?.addEventListener("click", () => {
      currentScale = Math.max(currentScale - 0.2, 0.6);
      if (svgMap) svgMap.style.transform = `scale(${currentScale})`;
    });

    zoomResetBtn?.addEventListener("click", () => {
      currentScale = 1;
      if (svgMap) svgMap.style.transform = `scale(1)`;
    });

    // Initial Full Render
    renderAll();
  });
}
