/**
 * bridges.js
 * Indian Bridges Explorer - Data & Application Logic
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

export const bridgesData = [
  {
    id: "howrah-bridge",
    name: "Howrah Bridge (Rabindra Setu)",
    state: "West Bengal",
    stateCode: "wb",
    location: "Kolkata - Howrah",
    type: "Cantilever",
    waterBody: "Hooghly River",
    lengthMeters: 705,
    yearOpened: 1943,
    image: "assets/river4.png",
    constructionHistory: "Commissioned during World War II to replace a floating pontoon bridge. Constructed by Braithwaite, Burn & Jessop (BBJ) using 26,500 tonnes of high-tensile alloy steel supplied by Tata Steel.",
    engineeringHighlights: "Famous for being constructed entirely with riveted steel without using a single nut or bolt in the main structure. It carries over 100,000 vehicles and 150,000 pedestrians daily.",
    tags: ["howrah", "kolkata", "hooghly", "cantilever", "steel", "rabindra setu", "west bengal"]
  },
  {
    id: "bandra-worli-sea-link",
    name: "Bandra-Worli Sea Link (Rajiv Gandhi Sea Link)",
    state: "Maharashtra",
    stateCode: "mh",
    location: "Mumbai",
    type: "Cable-stayed",
    waterBody: "Mahim Bay",
    lengthMeters: 5600,
    yearOpened: 2009,
    image: "assets/travel_beaches.png",
    constructionHistory: "Conceived to bypass congested city traffic between Mumbai western suburbs and South Mumbai. Built by Hindustan Construction Company (HCC) and engineered by Dar Al-Handasah.",
    engineeringHighlights: "Features twin 128-meter high concrete towers supporting stay cables spun from high-strength steel wire. Total steel wire used equals the circumference of the Earth.",
    tags: ["mumbai", "bandra", "worli", "sea link", "cable stayed", "maharashtra", "mahim bay"]
  },
  {
    id: "pamban-bridge",
    name: "Pamban Bridge",
    state: "Tamil Nadu",
    stateCode: "tn",
    location: "Rameswaram - Mandapam",
    type: "Cantilever",
    waterBody: "Palk Strait",
    lengthMeters: 2065,
    yearOpened: 1914,
    image: "assets/travel_islands.png",
    constructionHistory: "India's first sea bridge, constructed by British engineers and Indian railway workers under harsh marine conditions in a hurricane-prone gulf zone.",
    engineeringHighlights: "Features a double-leaf bascule (scissors lift) central section engineered by Scherzer that opens upwards to allow ships and naval vessels to pass underneath.",
    tags: ["pamban", "rameswaram", "tamil nadu", "palk strait", "railway", "bascule", "sea bridge"]
  },
  {
    id: "chenab-bridge",
    name: "Chenab Rail Bridge",
    state: "Jammu and Kashmir",
    stateCode: "jk",
    location: "Reasi District",
    type: "Arch",
    waterBody: "Chenab River",
    lengthMeters: 1315,
    yearOpened: 2024,
    image: "assets/travel_mountains.png",
    constructionHistory: "Built as part of the USBRL (Udhampur-Srinagar-Baramulla Railway Link) project to integrate Kashmir Valley with the national rail network across rugged Himalayan geology.",
    engineeringHighlights: "The world's highest railway bridge, standing 359 meters above the riverbed (35m higher than the Eiffel Tower). Engineered to withstand seismic zone V shocks and wind speeds up to 266 km/h.",
    tags: ["chenab", "reasi", "jammu and kashmir", "highest rail bridge", "arch bridge", "himalayas"]
  },
  {
    id: "dhola-sadiya-bridge",
    name: "Dhola-Sadiya Bridge (Bhupen Hazarika Setu)",
    state: "Assam",
    stateCode: "as",
    region: "Northeast",
    location: "Tinsukia - Sadiya",
    type: "Beam",
    waterBody: "Lohit River (Brahmaputra)",
    lengthMeters: 9150,
    yearOpened: 2017,
    image: "assets/river1.png",
    constructionHistory: "Constructed to provide seamless all-weather road connectivity between Assam and eastern Arunachal Pradesh, significantly reducing travel time by 4 hours.",
    engineeringHighlights: "India's longest river bridge over water (9.15 km). Engineered specifically to support 60-tonne Indian Army battle tanks for national defence mobility.",
    tags: ["dhola sadiya", "bhupen hazarika", "assam", "lohit", "brahmaputra", "longest bridge"]
  },
  {
    id: "bogibeel-bridge",
    name: "Bogibeel Bridge",
    state: "Assam",
    stateCode: "as",
    location: "Dibrugarh - Dhemaji",
    type: "Truss",
    waterBody: "Brahmaputra River",
    lengthMeters: 4940,
    yearOpened: 2018,
    image: "assets/river2.png",
    constructionHistory: "Approved in 1997 and inaugurated in 2018, Bogibeel took two decades to complete due to turbulent river currents during monsoon seasons.",
    engineeringHighlights: "India's longest combined rail-cum-road bridge. Features a double-deck fully welded steel truss structure designed with seismic shock absorbers.",
    tags: ["bogibeel", "dibrugarh", "assam", "brahmaputra", "truss", "rail road", "northeast"]
  },
  {
    id: "vidyasagar-setu",
    name: "Vidyasagar Setu (Second Hooghly Bridge)",
    state: "West Bengal",
    stateCode: "wb",
    location: "Kolkata - Howrah",
    type: "Cable-stayed",
    waterBody: "Hooghly River",
    lengthMeters: 823,
    yearOpened: 1992,
    image: "assets/river3.png",
    constructionHistory: "Built to relieve heavy congestion on the original Howrah Bridge. Named in honor of 19th-century educator Ishwar Chandra Vidyasagar.",
    engineeringHighlights: "The longest fan-type cable-stayed bridge in India, built using 121 stay cables held by 127-meter tall pylons.",
    tags: ["vidyasagar setu", "second hooghly bridge", "kolkata", "cable stayed", "west bengal"]
  },
  {
    id: "mahatma-gandhi-setu",
    name: "Mahatma Gandhi Setu",
    state: "Bihar",
    stateCode: "br",
    location: "Patna - Hajipur",
    type: "Box Girder",
    waterBody: "Ganges River",
    lengthMeters: 5750,
    yearOpened: 1982,
    image: "assets/heroriver.png",
    constructionHistory: "Inaugurated by Prime Minister Indira Gandhi in 1982 to connect North Bihar with Patna across the vast Gangetic floodplains.",
    engineeringHighlights: "Features 46 pre-stressed concrete piers spanning 5.75 km. Recently upgraded with modern steel truss superstructure for enhanced durability.",
    tags: ["mahatma gandhi setu", "patna", "bihar", "ganges", "ganga", "box girder"]
  },
  {
    id: "atal-setu-mthl",
    name: "Atal Setu (Mumbai Trans Harbour Link - MTHL)",
    state: "Maharashtra",
    stateCode: "mh",
    location: "Mumbai - Navi Mumbai",
    type: "Cable-stayed",
    waterBody: "Thane Creek",
    lengthMeters: 21800,
    yearOpened: 2024,
    image: "assets/travel_hero.png",
    constructionHistory: "Built across Mumbai Bay to connect Sewri in South Mumbai to Chirle in Navi Mumbai, cutting travel time from 2 hours to 20 minutes.",
    engineeringHighlights: "The longest sea bridge in India (21.8 km total, 16.5 km over sea). Built using Orthotropic Steel Decks (OSD) to allow wide navigation channels for cargo ships.",
    tags: ["atal setu", "mthl", "mumbai trans harbour link", "sea bridge", "mumbai", "navi mumbai", "maharashtra"]
  },
  {
    id: "living-root-bridge",
    name: "Living Root Bridges (Jingkieng Jri)",
    state: "Meghalaya",
    stateCode: "ml",
    location: "Sohra (Cherrapunji) & Nongriat",
    type: "Living Root",
    waterBody: "Umshiang River & Mountain Streams",
    lengthMeters: 30,
    yearOpened: 1840,
    image: "assets/Khasitr.png",
    constructionHistory: "Handcrafted by indigenous Khasi and Jaintia tribes over generations by guiding aerial roots of Ficus elastica (Indian rubber trees) across river banks using hollowed betel nut trunks.",
    engineeringHighlights: "A marvel of living bio-engineering. Unlike artificial concrete that decays over time, root bridges grow stronger with age, enduring heavy monsoon floods for centuries.",
    tags: ["living root bridge", "cherrapunji", "meghalaya", "khasi", "nongriat", "bio engineering", "jri"]
  },
  {
    id: "godavari-arch-bridge",
    name: "Godavari Arch Bridge",
    state: "Andhra Pradesh",
    stateCode: "ap",
    location: "Rajamahendravaram",
    type: "Arch",
    waterBody: "Godavari River",
    lengthMeters: 4270,
    yearOpened: 1997,
    image: "assets/river5.png",
    constructionHistory: "Built by Indian Railways to handle heavy freight and passenger traffic along the Howrah-Chennai trunk line.",
    engineeringHighlights: "Features 28 bowstring arch girders made of pre-stressed concrete. It is one of the longest prestressed concrete arch bridges in Asia.",
    tags: ["godavari arch", "rajahmundry", "andhra pradesh", "godavari", "arch bridge", "railway"]
  },
  {
    id: "saraighat-bridge",
    name: "Saraighat Bridge",
    state: "Assam",
    stateCode: "as",
    location: "Guwahati",
    type: "Truss",
    waterBody: "Brahmaputra River",
    lengthMeters: 1492,
    yearOpened: 1962,
    image: "assets/river6.png",
    constructionHistory: "Built near the historic site of the 1671 Battle of Saraighat. It was the first bridge ever constructed across the mighty Brahmaputra River.",
    engineeringHighlights: "Double-deck steel truss structure carrying a lower railway track and upper two-lane roadway across 17 spans.",
    tags: ["saraighat", "guwahati", "assam", "brahmaputra", "truss", "rail road"]
  },
  {
    id: "golden-bridge",
    name: "Golden Bridge (Narmada Bridge)",
    state: "Gujarat",
    stateCode: "gj",
    location: "Bharuch - Ankleshwar",
    type: "Truss",
    waterBody: "Narmada River",
    lengthMeters: 1432,
    yearOpened: 1881,
    image: "assets/West_India.png",
    constructionHistory: "Constructed by British engineer Sir John Hawkshaw after multiple earlier timber and iron bridges were swept away by fierce Narmada floods.",
    engineeringHighlights: "Built using imported heavy wrought iron girders. Called 'Golden Bridge' because the exorbitant construction cost was equivalent to building a bridge out of gold.",
    tags: ["golden bridge", "bharuch", "narmada", "gujarat", "wrought iron", "truss"]
  },
  {
    id: "coronation-bridge",
    name: "Coronation Bridge (Sevoke Railway/Road Bridge)",
    state: "West Bengal",
    stateCode: "wb",
    location: "Darjeeling / Sevoke",
    type: "Arch",
    waterBody: "Teesta River",
    lengthMeters: 195,
    yearOpened: 1941,
    image: "assets/travel_mountains.png",
    constructionHistory: "Built to mark the coronation of King George VI and Queen Elizabeth. Designed by John Chambers, Chief Engineer of PWD Bengal.",
    engineeringHighlights: "Features a single spandrel-arch spanning a deep river gorge over torrential Teesta waters without piers in the river bed.",
    tags: ["coronation bridge", "sevoke", "darjeeling", "teesta", "arch", "west bengal"]
  },
  {
    id: "atal-setu-goa",
    name: "Atal Setu Goa (Mandovi Cable Bridge)",
    state: "Goa",
    stateCode: "ga",
    location: "Panaji",
    type: "Cable-stayed",
    waterBody: "Mandovi River",
    lengthMeters: 5100,
    yearOpened: 2019,
    image: "assets/travel_beaches.png",
    constructionHistory: "Constructed by Larsen & Toubro (L&T) to ease chronic traffic jams between Panaji and Porvorim on the NH-66 highway.",
    engineeringHighlights: "A four-lane cable-stayed bridge elevated 30 meters above water level, illuminated by dynamic LED architectural lighting.",
    tags: ["atal setu goa", "mandovi", "panaji", "goa", "cable stayed", "l&t"]
  },
  {
    id: "ellis-bridge",
    name: "Ellis Bridge",
    state: "Gujarat",
    stateCode: "gj",
    location: "Ahmedabad",
    type: "Truss",
    waterBody: "Sabarmati River",
    lengthMeters: 480,
    yearOpened: 1892,
    image: "assets/West_India.png",
    constructionHistory: "Constructed by British engineers using steel imported from Birmingham. Named after Sir Barrow Helbert Ellis.",
    engineeringHighlights: "Historic bowstring lattice truss bridge that served as the primary landmark connection between old and new Ahmedabad for over a century.",
    tags: ["ellis bridge", "ahmedabad", "sabarmati", "gujarat", "truss", "heritage"]
  },
  {
    id: "jadukata-bridge",
    name: "Jadukata Bridge",
    state: "Meghalaya",
    stateCode: "ml",
    location: "Ranikor",
    type: "Arch",
    waterBody: "Kynshi River",
    lengthMeters: 140,
    yearOpened: 2001,
    image: "assets/travel_waterfalls.png",
    constructionHistory: "Built near the Bangladesh border in South West Khasi Hills to connect remote coal-mining and agricultural border villages.",
    engineeringHighlights: "Features a central cantilever arch span of 140 meters over a deep forested river gorge, making it one of the longest free-cantilever arch spans in India.",
    tags: ["jadukata", "ranikor", "meghalaya", "kynshi", "arch bridge", "khasi hills"]
  },
  {
    id: "loha-pul-delhi",
    name: "Old Yamuna Bridge (Loha Pul)",
    state: "Delhi",
    stateCode: "dl",
    location: "Old Delhi",
    type: "Truss",
    waterBody: "Yamuna River",
    lengthMeters: 747,
    yearOpened: 1866,
    image: "assets/Taj_Mahal.png",
    constructionHistory: "Built by East Indian Railway Company in 1866 as a major link connecting Delhi with Kolkata and Northern India rail lines.",
    engineeringHighlights: "Historic double-deck steel truss structure featuring upper railway tracks and lower roadway lanes across 12 steel spans.",
    tags: ["loha pul", "yamuna bridge", "delhi", "old delhi", "yamuna", "truss", "heritage"]
  },
  {
    id: "vembanad-rail-bridge",
    name: "Vembanad Rail Bridge",
    state: "Kerala",
    stateCode: "kl",
    location: "Kochi",
    type: "Beam",
    waterBody: "Vembanad Lake",
    lengthMeters: 4620,
    yearOpened: 2011,
    image: "assets/travel_islands.png",
    constructionHistory: "Built by Rail Vikas Nigam Limited (RVNL) to connect the International Container Transshipment Terminal (ICTT) Vallarpadam with main line rail.",
    engineeringHighlights: "Dedicated rail freight bridge supported by 132 concrete piers built across 3 small islands in the backwaters of Vembanad Lake.",
    tags: ["vembanad", "kochi", "kerala", "backwaters", "railway", "container terminal"]
  },
  {
    id: "naini-bridge",
    name: "New Yamuna Bridge (Naini Bridge)",
    state: "Uttar Pradesh",
    stateCode: "up",
    location: "Prayagraj (Allahabad)",
    type: "Cable-stayed",
    waterBody: "Yamuna River",
    lengthMeters: 1510,
    yearOpened: 2004,
    image: "assets/Taj_Mahal.png",
    constructionHistory: "Built to connect Prayagraj city with Naini across the Yamuna River and relieve severe bottlenecking during Kumbh Mela pilgrimages.",
    engineeringHighlights: "Features a six-lane dual-carriageway supported by concrete pylons and fan cable stays engineered by COWI and Hyundai Heavy Industries.",
    tags: ["naini bridge", "yamuna", "prayagraj", "allahabad", "uttar pradesh", "cable stayed"]
  },
  {
    id: "koliya-bhomora-setu",
    name: "Koliya Bhomora Setu",
    state: "Assam",
    stateCode: "as",
    location: "Tezpur - Nagaon",
    type: "Box Girder",
    waterBody: "Brahmaputra River",
    lengthMeters: 3015,
    yearOpened: 1987,
    image: "assets/river1.png",
    constructionHistory: "Named after Ahom general Koliya Bhomora Phukan who originally planned a bridge across Brahmaputra in the 17th century.",
    engineeringHighlights: "Pre-stressed concrete box girder bridge spanning 3.01 km with 27 deep well foundation piers built to withstand heavy hydraulic pressure.",
    tags: ["koliya bhomora", "tezpur", "nagaon", "assam", "brahmaputra", "box girder"]
  },
  {
    id: "laxman-jhula",
    name: "Lakshman Jhula & Ram Jhula",
    state: "Uttarakhand",
    stateCode: "uk",
    location: "Rishikesh",
    type: "Suspension",
    waterBody: "Ganges River",
    lengthMeters: 137,
    yearOpened: 1929,
    image: "assets/Kedarnath.png",
    constructionHistory: "Constructed in 1929 to replace an earlier jute rope bridge washed away during 1924 floods. Legend holds Lord Lakshman crossed the Ganges here on jute ropes.",
    engineeringHighlights: "Iconic pedestrian steel cable suspension bridge spanning 137 meters over the roaring Ganges with scenic views of Rishikesh ashrams.",
    tags: ["lakshman jhula", "ram jhula", "rishikesh", "uttarakhand", "ganges", "suspension"]
  },
  {
    id: "netaji-subhash-setu",
    name: "Netaji Subhash Chandra Bose Setu",
    state: "Odisha",
    stateCode: "od",
    location: "Cuttack - Bhubaneswar",
    type: "Beam",
    waterBody: "Kathajodi River",
    lengthMeters: 2880,
    yearOpened: 2017,
    image: "assets/East_India.png",
    constructionHistory: "Inaugurated by Chief Minister Naveen Patnaik in 2017, reducing travel distance between twin cities Cuttack and Bhubaneswar by 12 km.",
    engineeringHighlights: "Odisha's longest river bridge (2.88 km) featuring pre-stressed concrete girders and energy-efficient LED lighting poles.",
    tags: ["netaji subhash setu", "cuttack", "bhubaneswar", "odisha", "kathajodi", "beam bridge"]
  },
  {
    id: "vikramshila-setu",
    name: "Vikramshila Setu",
    state: "Bihar",
    stateCode: "br",
    location: "Bhagalpur",
    type: "Box Girder",
    waterBody: "Ganges River",
    lengthMeters: 4700,
    yearOpened: 2001,
    image: "assets/heroriver.png",
    constructionHistory: "Named after the historic Vikramshila Mahavihara ancient university. Connects NH-80 and NH-31 across the Ganges River.",
    engineeringHighlights: "Spans 4.7 km across Gangetic waters with 56 piers, facilitating major trade traffic between South and North Bihar.",
    tags: ["vikramshila setu", "bhagalpur", "bihar", "ganges", "ganganagar", "box girder"]
  },
  {
    id: "db-setu-karnataka",
    name: "Sharavathi Railway Bridge",
    state: "Karnataka",
    stateCode: "ka",
    location: "Honnavar",
    type: "Beam",
    waterBody: "Sharavathi River",
    lengthMeters: 2060,
    yearOpened: 1994,
    image: "assets/travel_waterfalls.png",
    constructionHistory: "Built as a crucial component of the Konkan Railway megaproject, overcoming treacherous coastal terrain and monsoon swells.",
    engineeringHighlights: "Karnataka's longest railway bridge (2.06 km), carrying trains on high concrete piers over the scenic Sharavathi estuary.",
    tags: ["sharavathi", "honnavar", "karnataka", "konkan railway", "railway", "estuary"]
  },
  {
    id: "chhatrapati-shivaji-setu",
    name: "Shivaji Bridge (Lloyd Bridge)",
    state: "Maharashtra",
    stateCode: "mh",
    location: "Pune",
    type: "Arch",
    waterBody: "Mutha River",
    lengthMeters: 260,
    yearOpened: 1925,
    image: "assets/Chhatrapati_Shivaji.png",
    constructionHistory: "Built during British governance in 1925 and renamed in honor of Chhatrapati Shivaji Maharaj. Connects Shanipar and Old Pune.",
    engineeringHighlights: "A historic stone masonry arch bridge built from locally quarried black basalt stone with ornamental balustrades.",
    tags: ["shivaji bridge", "pune", "maharashtra", "mutha river", "stone arch", "basalt"]
  }
];

/**
 * Filter bridges based on search query, state, and type filters.
 */
export function filterBridges(bridges, { search = "", state = "all", type = "all" } = {}) {
  if (!Array.isArray(bridges)) return [];

  const query = search.trim().toLowerCase();

  return bridges.filter(bridge => {
    // Search query match (name, location, state, waterBody, type, engineeringHighlights, tags)
    const matchesSearch = !query || [
      bridge.name,
      bridge.location,
      bridge.state,
      bridge.waterBody,
      bridge.type,
      bridge.constructionHistory,
      bridge.engineeringHighlights,
      ...(bridge.tags || [])
    ].some(field => field && field.toLowerCase().includes(query));

    // State filter match
    const matchesState = state === "all" || bridge.stateCode === state || bridge.state.toLowerCase() === state.toLowerCase();

    // Type filter match
    const matchesType = type === "all" || bridge.type.toLowerCase() === type.toLowerCase();

    return matchesSearch && matchesState && matchesType;
  });
}

/**
 * Sort bridges by length, year opened, or name.
 */
export function sortBridges(bridges, sortBy = "length-desc") {
  if (!Array.isArray(bridges)) return [];
  const list = [...bridges];

  switch (sortBy) {
    case "length-desc":
      return list.sort((a, b) => b.lengthMeters - a.lengthMeters);
    case "length-asc":
      return list.sort((a, b) => a.lengthMeters - b.lengthMeters);
    case "year-desc":
      return list.sort((a, b) => b.yearOpened - a.yearOpened);
    case "year-asc":
      return list.sort((a, b) => a.yearOpened - b.yearOpened);
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list;
  }
}

/**
 * Group an array of bridges by state name.
 */
export function groupBridgesByState(bridges) {
  if (!Array.isArray(bridges)) return {};

  return bridges.reduce((acc, bridge) => {
    const state = bridge.state || "Unknown State";
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(bridge);
    return acc;
  }, {});
}

/**
 * Extract unique state names & codes from the dataset.
 */
export function getUniqueStates(bridges = bridgesData) {
  const map = new Map();
  bridges.forEach(b => {
    if (b.state && b.stateCode) {
      map.set(b.stateCode, b.state);
    }
  });
  return Array.from(map.entries())
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Extract unique bridge types from the dataset.
 */
export function getUniqueTypes(bridges = bridgesData) {
  const set = new Set(bridges.map(b => b.type).filter(Boolean));
  return Array.from(set).sort();
}

/* ==========================================================================
   BROWSER DOM INTERACTION CODE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.bridgesData = bridgesData;
  window.filterBridges = filterBridges;
  window.sortBridges = sortBridges;
  window.groupBridgesByState = groupBridgesByState;
  window.getUniqueStates = getUniqueStates;
  window.getUniqueTypes = getUniqueTypes;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("bridge-search");
    const stateFilter = document.getElementById("state-filter");
    const typeFilter = document.getElementById("type-filter");
    const sortBySelect = document.getElementById("sort-by");
    const gridContainer = document.getElementById("bridges-grid");
    const resultStatus = document.getElementById("result-status");
    const emptyState = document.getElementById("empty-state");
    const clearFiltersBtn = document.getElementById("clear-filters");
    const emptyResetBtn = document.getElementById("empty-reset");

    // Modal elements
    const bridgeModal = document.getElementById("bridge-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalState = document.getElementById("modal-state");
    const modalType = document.getElementById("modal-type");
    const modalLocation = document.getElementById("modal-location");
    const modalWaterBody = document.getElementById("modal-water-body");
    const modalLength = document.getElementById("modal-length");
    const modalYear = document.getElementById("modal-year");
    const modalHistory = document.getElementById("modal-history");
    const modalEngineering = document.getElementById("modal-engineering");
    const modalImage = document.getElementById("modal-image");
    const modalPrevBtn = document.getElementById("modal-prev-btn");
    const modalNextBtn = document.getElementById("modal-next-btn");

    let currentFilteredBridges = [...bridgesData];
    let currentBridgeIndex = -1;

    // Populate State dropdown options dynamically
    if (stateFilter) {
      const states = getUniqueStates();
      states.forEach(({ code, name }) => {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = name;
        stateFilter.appendChild(opt);
      });
    }

    // Populate Type dropdown options dynamically
    if (typeFilter) {
      const types = getUniqueTypes();
      types.forEach(t => {
        const opt = document.createElement("option");
        opt.value = t.toLowerCase();
        opt.textContent = t;
        typeFilter.appendChild(opt);
      });
    }

    function renderCards() {
      if (!gridContainer) return;

      const searchVal = searchInput ? searchInput.value : "";
      const stateVal = stateFilter ? stateFilter.value : "all";
      const typeVal = typeFilter ? typeFilter.value : "all";
      const sortVal = sortBySelect ? sortBySelect.value : "length-desc";

      let filtered = filterBridges(bridgesData, {
        search: searchVal,
        state: stateVal,
        type: typeVal
      });

      currentFilteredBridges = sortBridges(filtered, sortVal);

      // Update counter status
      if (resultStatus) {
        resultStatus.textContent = `Showing ${currentFilteredBridges.length} of ${bridgesData.length} famous bridges`;
      }

      // Handle empty state
      if (currentFilteredBridges.length === 0) {
        gridContainer.innerHTML = "";
        if (emptyState) emptyState.hidden = false;
        return;
      } else {
        if (emptyState) emptyState.hidden = true;
      }

      gridContainer.innerHTML = "";
      const cardsWrapper = document.createElement("div");
      cardsWrapper.className = "bridges-cards-grid";
      currentFilteredBridges.forEach((bridge, idx) => {
        cardsWrapper.appendChild(createBridgeCard(bridge, idx));
      });
      gridContainer.appendChild(cardsWrapper);
    }

    function createBridgeCard(bridge, globalIdx) {
      const card = document.createElement("article");
      card.className = "bridge-card";
      card.setAttribute("data-id", bridge.id);
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${bridge.image}" alt="${bridge.name}" loading="lazy" onerror="this.src='assets/river1.png'">
          <span class="card-badge state-badge">${bridge.state}</span>
          <span class="card-badge type-badge">${bridge.type}</span>
        </div>
        <div class="card-body">
          <div class="card-location">📍 ${bridge.location}</div>
          <h3 class="card-title">${bridge.name}</h3>
          <div class="card-specs">
            <div><strong>🌊 Waterbody:</strong> ${bridge.waterBody}</div>
            <div><strong>📏 Length:</strong> ${bridge.lengthMeters.toLocaleString()} m</div>
            <div><strong>📅 Opened:</strong> ${bridge.yearOpened}</div>
          </div>
          <p class="card-highlights">${bridge.engineeringHighlights}</p>
          <button type="button" class="btn-view-details" data-index="${globalIdx}">
            Technical Specs &amp; History →
          </button>
        </div>
      `;

      const viewBtn = card.querySelector(".btn-view-details");
      viewBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        openBridgeModal(globalIdx);
      });

      card.addEventListener("click", () => {
        openBridgeModal(globalIdx);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openBridgeModal(globalIdx);
        }
      });

      return card;
    }

    function openBridgeModal(index) {
      if (index < 0 || index >= currentFilteredBridges.length) return;
      currentBridgeIndex = index;
      const bridge = currentFilteredBridges[index];

      if (modalTitle) modalTitle.textContent = bridge.name;
      if (modalState) modalState.textContent = bridge.state;
      if (modalType) modalType.textContent = `${bridge.type} Bridge`;
      if (modalLocation) modalLocation.textContent = bridge.location;
      if (modalWaterBody) modalWaterBody.textContent = bridge.waterBody;
      if (modalLength) modalLength.textContent = `${bridge.lengthMeters.toLocaleString()} meters`;
      if (modalYear) modalYear.textContent = bridge.yearOpened;
      if (modalHistory) modalHistory.textContent = bridge.constructionHistory;
      if (modalEngineering) modalEngineering.textContent = bridge.engineeringHighlights;
      if (modalImage) {
        modalImage.src = bridge.image;
        modalImage.alt = bridge.name;
      }

      if (bridgeModal) {
        bridgeModal.hidden = false;
        bridgeModal.classList.add("active");
        document.body.classList.add("modal-open");
        modalCloseBtn?.focus();
      }
    }

    function closeBridgeModal() {
      if (bridgeModal) {
        bridgeModal.hidden = true;
        bridgeModal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    }

    function resetFilters() {
      if (searchInput) searchInput.value = "";
      if (stateFilter) stateFilter.value = "all";
      if (typeFilter) typeFilter.value = "all";
      if (sortBySelect) sortBySelect.value = "length-desc";
      renderCards();
    }

    // Event Listeners
    searchInput?.addEventListener("input", renderCards);
    stateFilter?.addEventListener("change", renderCards);
    typeFilter?.addEventListener("change", renderCards);
    sortBySelect?.addEventListener("change", renderCards);
    clearFiltersBtn?.addEventListener("click", resetFilters);
    emptyResetBtn?.addEventListener("click", resetFilters);

    modalCloseBtn?.addEventListener("click", closeBridgeModal);

    modalPrevBtn?.addEventListener("click", () => {
      if (currentBridgeIndex > 0) openBridgeModal(currentBridgeIndex - 1);
    });

    modalNextBtn?.addEventListener("click", () => {
      if (currentBridgeIndex < currentFilteredBridges.length - 1) openBridgeModal(currentBridgeIndex + 1);
    });

    bridgeModal?.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close-modal") || e.target === bridgeModal) {
        closeBridgeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (bridgeModal && !bridgeModal.hidden) {
        if (e.key === "Escape") closeBridgeModal();
        if (e.key === "ArrowLeft" && currentBridgeIndex > 0) openBridgeModal(currentBridgeIndex - 1);
        if (e.key === "ArrowRight" && currentBridgeIndex < currentFilteredBridges.length - 1) openBridgeModal(currentBridgeIndex + 1);
      }
    });

    // Initial render
    renderCards();
  });
}
