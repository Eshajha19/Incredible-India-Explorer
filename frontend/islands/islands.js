/* ============================================================
   Islands of India — islands.js
   Handles: stat counters, search/filter, card modal, Leaflet
   map markers, and the rotating "Did You Know?" facts panel.
   ============================================================ */

// ---------- 1. ISLAND DATA ----------
const ISLANDS_DATA = [
  {
    id: "andaman-nicobar",
    name: "Andaman & Nicobar Islands",
    group: "Andaman & Nicobar",
    location: "Bay of Bengal",
    state: "Union Territory",
    lat: 11.7401,
    lng: 92.6586,
    islandCount: "572 islands",
    tagline: "India's largest island archipelago",
    description: "A chain of 572 islands, islets and rocky outcrops formed by the collision of the Indian and Burma tectonic plates. Only about 38 islands are inhabited, and the region is home to dense tropical rainforests, coral reefs, and several protected tribal communities.",
    highlights: ["Cellular Jail, Port Blair", "Radhanagar Beach, Havelock", "Barren Island — India's only active volcano", "Jarawa & Sentinelese tribal reserves"],
    image: "../../assets/travel_beaches.png"
  },
  {
    id: "great-nicobar",
    name: "Great Nicobar Island",
    group: "Andaman & Nicobar",
    location: "Nicobar Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 6.95,
    lng: 93.87,
    islandCount: "1 island",
    tagline: "India's southernmost island, home to Indira Point",
    description: "The largest island in the Nicobar group and India's southernmost territory, home to Indira Point, Campbell Bay National Park, and rare endemic wildlife.",
highlights: ["Indira Point — southernmost tip of India", "Campbell Bay National Park", "UNESCO Biosphere Reserve (2013)", "Nesting ground for Giant Leatherback turtles"],
    image: "../../assets/travel_hidden.png"
  },
  {
    id: "car-nicobar",
    name: "Car Nicobar",
    group: "Andaman & Nicobar",
    location: "Nicobar Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 9.1833,
    lng: 92.7667,
    islandCount: "1 island",
    tagline: "The Nicobars' most populated island, home of the Nicobarese",
    description: "A flat, coral-fringed island and the administrative headquarters of the Nicobar district, Car Nicobar is home to the indigenous Nicobarese community, vast coconut plantations, sandy beaches and traditional hodi boat races.",
    highlights: ["Largest Nicobarese population in the islands", "Extensive coconut plantations and copra economy", "Traditional villages and Chowra-style huts", "Malacca and Kakana beaches"],
    image: "../../assets/travel_beaches.png"
  },  {
    id: "south-andaman",
    name: "South Andaman",
    group: "Andaman & Nicobar",
    location: "Andaman Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 11.6234,
    lng: 92.7265,
    islandCount: "1 island",
    tagline: "Gateway to the Andamans — Port Blair, Cellular Jail & Ross Island",
    description: "Home to Port Blair, the capital of Andaman & Nicobar Islands, South Andaman blends colonial history, museums, and coastal scenery — from the Cellular Jail to Chidiya Tapu's sunsets and the ruins of Ross Island.",
    highlights: ["Cellular Jail National Memorial", "Ross Island's British colonial ruins", "Chidiya Tapu — Bird Island & sunset point", "Anthropological & Samudrika Marine Museums"],
    image: "../../assets/travel_beaches.png"
  },
  {
    id: "middle-andaman",
    name: "Middle Andaman",
    group: "Andaman & Nicobar",
    location: "Andaman Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 12.55,
    lng: 92.85,
    islandCount: "1 island",
    tagline: "Limestone caves, mangrove creeks & quiet beaches",
    description: "Home to Baratang's limestone caves and mud volcanoes, sprawling mangrove forests, and the towns of Rangat and Mayabunder, Middle Andaman offers a quieter, nature-focused side of the archipelago.",
    highlights: ["Limestone Caves, Baratang Island", "Mangrove creek boat rides", "Karmatang Beach — sea turtle nesting site", "Rangat & Mayabunder villages"],
    image: "../../assets/travel_hidden.png"
  },
  {
    id: "shaheed-dweep",
    name: "Shaheed Dweep (Neil Island)",
    group: "Andaman & Nicobar",
    location: "Andaman Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 11.835,
    lng: 93.03,
    islandCount: "1 island",
    tagline: "The Natural Bridge, beaches & the Andamans' vegetable bowl",
    description: "Formerly Neil Island, officially renamed Shaheed Dweep in 2018 — a small, laid-back island known for its Natural Bridge rock arch, Bharatpur & Laxmanpur beaches, accessible coral reefs, and the farms that supply Port Blair's markets.",
    highlights: ["Natural Bridge (Howrah Bridge)", "Bharatpur Beach snorkelling & coral reefs", "Laxmanpur Beach sunsets", "Vegetable farms — the 'vegetable bowl' of the Andamans"],
    image: "../../assets/travel_islands.png"
  },
{
    id: "little-andaman",
    name: "Little Andaman",
    group: "Andaman & Nicobar",
    location: "Andaman Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 10.6,
    lng: 92.5,
    islandCount: "1 island",
    tagline: "Butler Bay surfing, White Surf Waterfall & pristine forests",
    description: "India's fourth-largest Andaman island (~730 km²) with world-class surfing at Butler Bay, the spectacular 60m White Surf Waterfall, ancient evergreen rainforests covering 80% of the island, and critical habitat for dugongs, sea turtles, and swimming elephants.",
    highlights: ["Butler Bay — India's premier surfing beach", "White Surf Waterfall (60m cascade)", "Evergreen rainforests with high endemism", "Dugong & sea turtle nesting habitat", "Hut Bay — main settlement & ferry port"],
    image: "../../assets/travel_beaches.png"
  },
  {
    id: "swaraj-dweep",
    name: "Swaraj Dweep (Havelock Island)",
    group: "Andaman & Nicobar",
    location: "Andaman Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 11.96,
    lng: 92.98,
    islandCount: "1 island",
    tagline: "Home of Radhanagar Beach, Asia's Best Beach",
    description: "Formerly Havelock Island, renamed Swaraj Dweep in 2018 — the Andamans' premier tourism hub, famed for Radhanagar and Elephant Beach, accessible coral reefs, rich marine life, and some of the best scuba diving in India.",
    highlights: ["Radhanagar Beach — Asia's Best Beach (Time, 2004)", "Elephant Beach snorkelling & water sports", "20+ scuba diving sites, incl. Dixon's Pinnacle", "Renamed Swaraj Dweep in 2018 to honour Netaji Subhas Chandra Bose"],
    image: "../../assets/travel_beaches.png"
  },
  {
    id: "narcondam",
    name: "Narcondam Island",
    group: "Andaman & Nicobar",
    location: "North Andaman, Bay of Bengal",
    state: "Union Territory",
    lat: 13.4287,
    lng: 94.2557,
    islandCount: "1 island",
    tagline: "An extinct volcano and the only home of the Narcondam Hornbill",
    description: "A small, remote, densely-forested volcanic island east of the main Andaman group. Formed by an extinct volcano, it is the sole habitat of the endemic Narcondam Hornbill and is protected as a wildlife sanctuary.",
highlights: ["Extinct volcanic cone rising steeply from the sea", "Endemic Narcondam Hornbill found nowhere else on Earth", "Declared a Wildlife Sanctuary in 1977", "Dense tropical evergreen forest cover"],
    image: "../../assets/travel_hidden.png"
  },
  {
    id: "north-andaman",
    name: "North Andaman",
    group: "Andaman & Nicobar",
    location: "Andaman Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 13.1136,
    lng: 92.9508,
    islandCount: "1 island",
    tagline: "Saddle Peak, mangrove creeks & the Andamans' highest point",
    description: "The northernmost of the main Andaman islands, home to Saddle Peak — the highest point in the Andaman & Nicobar Islands — the Saddle Peak National Park, sprawling mangrove creeks, and the trekking and birding hub of Diglipur.",
    highlights: ["Saddle Peak — highest peak in the Andaman & Nicobar Islands", "Saddle Peak National Park", "Extensive mangrove creeks and forests", "Trekking trails through tropical rainforest"],
    image: "../../assets/travel_mountains.png"
  },  {
    id: "lakshadweep",    name: "Lakshadweep Islands",
    id: "barren-island",
    name: "Barren Island",
    group: "Andaman & Nicobar",
    location: "Andaman Sea",
    state: "Union Territory",
    lat: 12.2783,
    lng: 93.858,
    islandCount: "1 island",
    tagline: "India's only confirmed active volcano",
    description: "An uninhabited volcanic island in the Andaman Sea, home to India's only confirmed active volcano, a 2-km-wide caldera, and dive sites known for volcanic drop-offs and rich marine life.",
    highlights: ["India's only confirmed active volcano", "First recorded eruption in 1787, most recently in 2022", "Horseshoe-shaped caldera roughly 2 km wide", "Popular deep-sea diving site around the island"],
    image: "../../assets/travel_hidden.png"
  },
  {
    id: "north-sentinel-island",
    name: "North Sentinel Island",
    group: "Andaman & Nicobar",
    location: "Andaman Islands, Bay of Bengal",
    state: "Union Territory",
    lat: 11.5533,
    lng: 92.2367,
    islandCount: "1 island",
    tagline: "A protected, off-limits home to the Sentinelese people",
    description: "North Sentinel Island is home to the Sentinelese, one of the world's last uncontacted tribes. Entry is strictly prohibited by Indian law to protect the tribe's health, safety and way of life.",
    highlights: ["Home to the uncontacted Sentinelese tribe", "Protected under the Protection of Aboriginal Tribes Regulation, 1956", "Off-limits — no tourism or unauthorised entry permitted", "Part of the Andaman & Nicobar tribal reserve system"],
    image: "../../assets/travel_hidden.png"
  },
  {
    id: "lakshadweep",
    name: "Lakshadweep Islands",
    group: "Lakshadweep",
    location: "Arabian Sea",
    state: "Union Territory",
    lat: 10.5667,
    lng: 72.6417,
    islandCount: "36 islands",
    tagline: "India's smallest Union Territory",
    description: "A cluster of 36 coral islands and atolls scattered in the Arabian Sea off the Kerala coast. Built entirely from coral deposits, the islands are ringed by turquoise lagoons and are among the most pristine coral reef ecosystems in India.",
highlights: ["Kavaratti — administrative capital", "Agatti coral lagoon", "Bangaram atoll", "Minicoy — largest island in the group"],
    image: "../../assets/travel_beaches.png"
  },
  {
    id: "minicoy",
    name: "Minicoy Island",
    group: "Lakshadweep",
    location: "Arabian Sea",
    state: "Union Territory",
    lat: 8.2833,
    lng: 73.0500,
    islandCount: "1 island",
    tagline: "Lakshadweep's second-largest island, famed for its lighthouse and tuna fishing",
    description: "Geographically and culturally distinct from the rest of Lakshadweep, Minicoy is known for its historic lighthouse, thriving tuna fishing industry, a large lagoon, rich marine biodiversity and the Mahl-speaking community that shares close ties with the Maldives.",
    highlights: ["19th-century Minicoy Lighthouse", "Traditional pole-and-line tuna fishing", "Mahl — a language closely related to Dhivehi", "One of Lakshadweep's largest lagoons"],
    image: "../../assets/travel_beaches.png"
  },  {
    id: "kavaratti",
    name: "Kavaratti Island",
    group: "Lakshadweep",
    location: "Arabian Sea",
    state: "Union Territory",
    lat: 10.5669,
    lng: 72.6420,
    islandCount: "1 island",
    tagline: "The administrative capital of Lakshadweep",
    description: "The capital of the Lakshadweep Union Territory, Kavaratti is known for its calm turquoise lagoon, vivid coral reefs, a well-known marine aquarium and several historic mosques woven into the island's small, close-knit community.",
    highlights: ["Wide, calm lagoon ideal for swimming and boating", "Marine Aquarium showcasing lagoon and reef life", "Vibrant coral reefs for snorkelling and diving", "Ujra Mosque and other historic island mosques"],
    image: "../../assets/travel_beaches.png"
  },  {
    id: "majuli",
    name: "Majuli",
    group: "River Islands",
    location: "Brahmaputra River, Assam",
    state: "Assam",
    lat: 26.9526,
    lng: 94.1656,
    islandCount: "1 island",
    tagline: "World's largest inhabited river island",
    description: "Formed by the Brahmaputra and its tributaries, Majuli is a seasonally shifting river island and the cultural heart of Assamese Vaishnavite tradition, dotted with satras (monasteries) that preserve centuries-old dance, mask-making and music.",
    highlights: ["Kamalabari Satra", "Mask-making workshops", "Migratory bird habitat", "Neo-Vaishnavite culture"],
    image: "../../assets/river6.png"
  },
  {
    id: "elephanta",
    name: "Elephanta Island",
    group: "Coastal Islands",
    location: "Mumbai Harbour, Maharashtra",
    state: "Maharashtra",
    lat: 18.9633,
    lng: 72.9315,
    islandCount: "1 island",
    tagline: "UNESCO World Heritage rock-cut caves",
    description: "A short ferry ride from Mumbai's Gateway of India, Elephanta Island houses 5th–8th century rock-cut cave temples dedicated to Shiva, carved directly into basalt hillsides.",
    highlights: ["UNESCO World Heritage Site", "Trimurti Sadashiva sculpture", "Rock-cut Shiva caves"],
    image: "../../assets/Taj_Mahal.png"
  },
  {
    id: "sundarbans",
    name: "Sundarbans Islands",
    group: "Delta Islands",
    location: "Ganges Delta, West Bengal",
    state: "West Bengal",
    lat: 21.9497,
    lng: 88.9468,
    islandCount: "100+ islands",
    tagline: "World's largest mangrove delta",
    description: "A vast, low-lying cluster of islands formed where the Ganges, Brahmaputra and Meghna rivers meet the Bay of Bengal. The Sundarbans is a UNESCO World Heritage Site and the only mangrove habitat where wild Royal Bengal Tigers still swim between islands.",
    highlights: ["Royal Bengal Tiger reserve", "UNESCO World Heritage & Biosphere Reserve", "Largest mangrove forest on Earth", "Shared with Bangladesh"],
    image: "../../assets/river6.png"
  },
  {
    id: "st-marys",
    name: "St. Mary's Islands",
    group: "Coastal Islands",
    location: "Udupi, Karnataka",
    state: "Karnataka",
    lat: 13.3667,
    lng: 74.6667,
    islandCount: "4 islets",
    tagline: "Rare hexagonal basalt rock formations",
    description: "A cluster of four small islets off the Karnataka coast known for striking hexagonal, columnar basalt rock formations created by cooling volcanic lava — a geological rarity on India's western coast.",
    highlights: ["Columnar basalt rock formations", "Vasco da Gama's landing site", "Geological Monument of India"],
    image: "../../assets/travel_beaches.png"
  },
  {
    id: "diu",
    name: "Diu Island",
    group: "Coastal Islands",
    location: "Gujarat coast",
    state: "Dadra & Nagar Haveli and Daman & Diu",
    lat: 20.7144,
    lng: 70.9874,
    islandCount: "1 island",
    tagline: "Former Portuguese coastal enclave",
    description: "A small island off the Saurashtra coast connected to the mainland by bridges, Diu retains strong Portuguese colonial influence in its fort, churches and architecture after nearly 450 years of Portuguese rule.",
    highlights: ["Diu Fort (1535 CE)", "Portuguese colonial architecture", "Nagoa Beach"],
    image: "../../assets/West_India.png"
  },
  {
    id: "munroe",
    name: "Munroe Island",
    group: "Backwater Islands",
    location: "Ashtamudi Lake, Kerala",
    state: "Kerala",
    lat: 9.0333,
    lng: 76.5667,
    islandCount: "8 islets",
    tagline: "A cluster of islets in Kerala's backwaters",
    description: "Named after British Resident Colonel John Munro, this cluster of small islets sits where the Kallada River meets Ashtamudi Lake, connected by a maze of narrow canals best explored by traditional canoe.",
    highlights: ["Canal canoe rides", "Coir-making villages", "Ashtamudi Lake backwaters"],
    image: "../../assets/river6.png"
  }
];

// ---------- 2. DID YOU KNOW FACTS ----------
const ISLAND_FACTS = [
  "India is home to 1,382 named islands, islets and rocks spread across the Bay of Bengal, the Arabian Sea and its river deltas.",
  "Barren Island in the Andamans is India's only confirmed active volcano.",
  "Majuli, in Assam, is recognised as the world's largest inhabited river island — though it shrinks a little more with every flood season.",
  "The Sundarbans is the only mangrove forest in the world known to be home to a swimming tiger population.",
  "Lakshadweep's islands are built entirely of coral, with no natural rock beneath the sand.",
  "The Andaman & Nicobar Islands and Lakshadweep together extend India's maritime Exclusive Economic Zone by roughly 6 lakh sq. km.",
  "St. Mary's Islands off Karnataka have rare hexagonal basalt rock columns formed by cooling lava millions of years ago."
];

// ---------- 3. STATE ----------
let activeFilter = "all";
let searchTerm = "";
let map;
let markers = [];

// ---------- 4. DOM READY ----------
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  animateStatCounters();
  initSearchAndFilters();
  initFactsRotator();
  initMap();
  initModalEvents();
});

// ---------- 5. RENDER CARDS ----------
function renderCards() {
  const grid = document.getElementById("islands-grid");
  const emptyState = document.getElementById("islands-empty-state");
  if (!grid) return;

  const filtered = ISLANDS_DATA.filter((island) => {
    const matchesGroup = activeFilter === "all" || island.group === activeFilter;
    const haystack = (island.name + " " + island.location + " " + island.group).toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    if (emptyState) emptyState.hidden = false;
    return;
  }
  if (emptyState) emptyState.hidden = true;

  filtered.forEach((island) => {
    const card = document.createElement("article");
    card.className = "island-card";
    card.setAttribute("data-id", island.id);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "View details for " + island.name);

    card.innerHTML = `
      <div class="island-card-image">
        <img src="${island.image}" alt="${island.name}" loading="lazy">
        <span class="island-card-badge">${island.group}</span>
      </div>
      <div class="island-card-body">
        <h3>${island.name}</h3>
        <p class="island-card-location">📍 ${island.location}</p>
        <p class="island-card-tagline">${island.tagline}</p>
        <div class="island-card-footer">
          <span>${island.islandCount}</span>
          <span class="island-card-link">View Details →</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openModal(island.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") openModal(island.id);
    });

    grid.appendChild(card);
  });

  const status = document.getElementById("islands-result-status");
  if (status) {
    status.textContent = `Showing ${filtered.length} of ${ISLANDS_DATA.length} island destinations`;
  }
}

// ---------- 6. SEARCH & FILTERS ----------
function initSearchAndFilters() {
  const searchInput = document.getElementById("islands-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim();
      renderCards();
    });
  }

  const filterButtons = document.querySelectorAll(".island-filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-group");
      renderCards();
    });
  });

  const clearBtn = document.getElementById("islands-clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchTerm = "";
      activeFilter = "all";
      if (searchInput) searchInput.value = "";
      filterButtons.forEach((b) => b.classList.remove("active"));
      if (filterButtons[0]) filterButtons[0].classList.add("active");
      renderCards();
    });
  }
}

// ---------- 7. MODAL ----------
function openModal(islandId) {
  const island = ISLANDS_DATA.find((i) => i.id === islandId);
  if (!island) return;

if (island.id === "great-nicobar" || island.id === "south-andaman" || island.id === "middle-andaman" || island.id === "shaheed-dweep" || island.id === "swaraj-dweep" || island.id === "narcondam" || island.id === "minicoy") {
    const pageMap = {
      "great-nicobar": "../great-nicobar/great-nicobar.html",
      "south-andaman": "../south-andaman/south-andaman.html",
      "middle-andaman": "../middle-andaman/middle-andaman.html",
      "shaheed-dweep": "../shaheed-dweep/shaheed-dweep.html",
      "little-andaman": "../little-andaman/index.html",
      "swaraj-dweep": "../swaraj-dweep/swaraj-dweep.html",
      "narcondam": "../narcondam-island/narcondam-island.html",
      "barren-island": "../barren-island/barren-island.html",
      "north-sentinel-island": "../north-sentinel-island/north-sentinel-island.html",
      "minicoy": "../minicoy-island/minicoy-island.html"
    };    window.location.href = pageMap[island.id];
    return;
  }
  document.getElementById("island-modal-title").textContent = island.name;
  document.getElementById("island-modal-location").textContent = island.location;
  document.getElementById("island-modal-group").textContent = island.group;
  document.getElementById("island-modal-image").src = island.image;
  document.getElementById("island-modal-image").alt = island.name;
  document.getElementById("island-modal-description").textContent = island.description;

  const highlightsList = document.getElementById("island-modal-highlights");
  highlightsList.innerHTML = "";
  island.highlights.forEach((h) => {
    const li = document.createElement("li");
    li.textContent = h;
    highlightsList.appendChild(li);
  });

  const modal = document.getElementById("island-modal");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("island-modal");
  modal.hidden = true;
  document.body.style.overflow = "";
}

function initModalEvents() {
  document.querySelectorAll("[data-close-island-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ---------- 8. STAT COUNTER ANIMATION ----------
function animateStatCounters() {
  const counters = document.querySelectorAll(".island-stat-number[data-target]");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    const suffix = counter.getAttribute("data-suffix") || "";
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target.toLocaleString() + suffix;
      }
    }
    requestAnimationFrame(tick);
  });
}

// ---------- 9. DID YOU KNOW ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("island-fact-text");
  const dotsWrap = document.getElementById("island-fact-dots");
  if (!factEl) return;

  let index = 0;

  if (dotsWrap) {
    ISLAND_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "island-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    index = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = ISLAND_FACTS[index];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === index));
    }
  }

  showFact(0);
  setInterval(() => showFact((index + 1) % ISLAND_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("islands-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("islands-map", {
    scrollWheelZoom: false,
    minZoom: 3,
  }).setView([15.5, 82], 4);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  ISLANDS_DATA.forEach((island) => {
    const marker = L.circleMarker([island.lat, island.lng], {
      radius: 8,
      color: "#ff9933",
      fillColor: "#ffb01f",
      fillOpacity: 0.85,
      weight: 2,
    }).addTo(map);

    marker.bindPopup(
      `<strong>${island.name}</strong><br>${island.location}<br><em>${island.islandCount}</em>`
    );
    marker.on("click", () => openModal(island.id));
    markers.push(marker);
  });
}