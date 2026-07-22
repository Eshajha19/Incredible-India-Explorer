/**
 * cultural-footprint.js
 * State Cultural Footprint Explorer - Data Structures & Interactive Network Graph Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core 20 State Nodes Dataset
export const states = [
  {
    id: "WB",
    name: "West Bengal",
    region: "East",
    capital: "Kolkata",
    summary: "Renowned for literature, renaissance philosophy, sweets, Jamdani textiles, parallel cinema, and Durga Puja pandal arts.",
    coords: { x: 620, y: 270 }
  },
  {
    id: "TN",
    name: "Tamil Nadu",
    region: "South",
    capital: "Chennai",
    summary: "Cradle of Dravidian temple architecture, Carnatic classical music, Bharatanatyam, Kanjeevaram silk, and Kollywood cinema.",
    coords: { x: 490, y: 510 }
  },
  {
    id: "MH",
    name: "Maharashtra",
    region: "West",
    capital: "Mumbai",
    summary: "Financial and entertainment hub, birthplace of Hindi cinema (Bollywood), Lavani dance, Ganesh Utsav, and Ajanta-Ellora rock art.",
    coords: { x: 420, y: 360 }
  },
  {
    id: "PB",
    name: "Punjab",
    region: "North",
    capital: "Chandigarh",
    summary: "Vibrant land of Bhangra, Sufi qawwali, Phulkari embroidery, tandoori culinary culture, and agricultural enterprise.",
    coords: { x: 400, y: 150 }
  },
  {
    id: "RJ",
    name: "Rajasthan",
    region: "North-West",
    capital: "Jaipur",
    summary: "Land of majestic forts, royal palaces, Bandhani tie-dye, Kalbelia folk dance, Dal Baati Churma, and sandstone architecture.",
    coords: { x: 360, y: 230 }
  },
  {
    id: "UP",
    name: "Uttar Pradesh",
    region: "North",
    capital: "Lucknow",
    summary: "Heartland of Gangetic heritage, Kathak dance, Awadhi Mughlai cuisine, Banarasi brocade silk, and Hindustani classical vocal gharanas.",
    coords: { x: 480, y: 210 }
  },
  {
    id: "KL",
    name: "Kerala",
    region: "South",
    capital: "Thiruvananthapuram",
    summary: "God's Own Country, celebrated for Kathakali, Kalaripayattu martial art, Ayurvedic traditions, Onam Pookkalam, and spice cuisine.",
    coords: { x: 450, y: 530 }
  },
  {
    id: "GJ",
    name: "Gujarat",
    region: "West",
    capital: "Gandhinagar",
    summary: "Maritime trading pioneer, Garba & Dandiya Raas dances, Patola silk weaving, farsan delicacies, and Jain-Hindu architectural crafts.",
    coords: { x: 320, y: 290 }
  },
  {
    id: "KA",
    name: "Karnataka",
    region: "South",
    capital: "Bengaluru",
    summary: "Home to Vijayanagara architecture, Yakshagana folk theater, Mysore silk, Carnatic classical traditions, and tech innovation.",
    coords: { x: 440, y: 450 }
  },
  {
    id: "OD",
    name: "Odisha",
    region: "East",
    capital: "Bhubaneswar",
    summary: "Famous for Odissi classical dance, Konark Sun Temple stone sculpture, Pattachitra paintings, and Ratha Yatra chariot traditions.",
    coords: { x: 580, y: 340 }
  },
  {
    id: "AS",
    name: "Assam",
    region: "North-East",
    capital: "Dispur",
    summary: "Gateway to the Northeast, known for Bihu dance & festival, Muga golden silk, tea garden culture, and Kaziranga wildlife.",
    coords: { x: 700, y: 210 }
  },
  {
    id: "BR",
    name: "Bihar",
    region: "East",
    capital: "Patna",
    summary: "Ancient seat of Maurya and Gupta empires, birthplace of Madhubani painting, Chhath Puja, and ancient Buddhist/Jain philosophy.",
    coords: { x: 550, y: 220 }
  },
  {
    id: "MP",
    name: "Madhya Pradesh",
    region: "Central",
    capital: "Bhopal",
    summary: "Heart of India, famous for Khajuraho temple sculptures, Bhimbetka rock art, Chanderi sarees, and Gond tribal paintings.",
    coords: { x: 450, y: 290 }
  },
  {
    id: "TG",
    name: "Telangana",
    region: "South-Central",
    capital: "Hyderabad",
    summary: "Famed for Deccani culture, Hyderabadi Biryani, Golconda heritage, Perini Shivatandavam dance, and Pochampally ikat textiles.",
    coords: { x: 480, y: 400 }
  },
  {
    id: "AP",
    name: "Andhra Pradesh",
    region: "South",
    capital: "Amaravati",
    summary: "Origin of Kuchipudi classical dance, Kondapalli wooden toys, Kalamkari hand-printed textiles, and Tirupati pilgrimage culture.",
    coords: { x: 500, y: 460 }
  },
  {
    id: "GA",
    name: "Goa",
    region: "West",
    capital: "Panaji",
    summary: "Unique Indo-Portuguese heritage, Shigmo & Carnival festivals, Konkani music, seafood culinary fusion, and Baroque church architecture.",
    coords: { x: 410, y: 430 }
  },
  {
    id: "JK",
    name: "Jammu & Kashmir",
    region: "North",
    capital: "Srinagar",
    summary: "Renowned for Pashmina shawls, Sufiyana Kalam music, paper-mâché crafts, Wazwan cuisine, and Himalayan wooden architecture.",
    coords: { x: 420, y: 90 }
  },
  {
    id: "HP",
    name: "Himachal Pradesh",
    region: "North",
    capital: "Shimla",
    summary: "Himalayan hill kingdom famous for Pahari miniature painting, Kullu shawls, Nati folk dance, and Buddhist monastery sanctuaries.",
    coords: { x: 440, y: 120 }
  },
  {
    id: "UK",
    name: "Uttarakhand",
    region: "North",
    capital: "Dehradun",
    summary: "Land of Gods (Devbhumi), famous for Chota Char Dham pilgrimages, Aipan ritual floor art, and Garhwali/Kumaoni folk music.",
    coords: { x: 470, y: 140 }
  },
  {
    id: "JH",
    name: "Jharkhand",
    region: "East",
    capital: "Ranchi",
    summary: "Rich tribal heritage of Chhau dance, Sohrai and Khovar mural arts, Sarhul festival, and ancient iron smelting traditions.",
    coords: { x: 560, y: 270 }
  }
];

// Core Cultural Domains List
export const domains = [
  "migration",
  "cuisine",
  "music",
  "language",
  "architecture",
  "cinema",
  "textiles",
  "festivals"
];

// Core Cross-State Cultural Influence Links Dataset
export const influences = [
  // --- Cuisine ---
  {
    id: "inf-1",
    source: "WB",
    target: "OD",
    domain: "cuisine",
    title: "Rasgulla & Sweet Confectionery Exchange",
    strength: 5,
    description: "Centuries of shared culinary rivalry and exchange over syrupy cottage cheese sweets (Rasgulla / Pahala Rasagola) and mustard-spiced fish preparations."
  },
  {
    id: "inf-2",
    source: "TN",
    target: "MH",
    domain: "cuisine",
    title: "South Indian Tiffin Culture in Western Cities",
    strength: 4,
    description: "Migration of Tamil restaurant pioneers established Udupi and South Indian tiffin rooms (Dosa, Idli, Filter Coffee) as everyday dietary staples across Mumbai."
  },
  {
    id: "inf-3",
    source: "PB",
    target: "UP",
    domain: "cuisine",
    title: "Highway Dhaba Tandoori Cuisine",
    strength: 5,
    description: "Punjabi dhaba culture popularized clay tandoor baking, butter chicken, dal makhani, and paneer dishes along major Gangetic trade and highway routes."
  },
  {
    id: "inf-4",
    source: "GJ",
    target: "MH",
    domain: "cuisine",
    title: "Farsan & Gujarati Thali Popularization",
    strength: 4,
    description: "Gujarati merchant communities in Mumbai and Thane introduced sweet-savory snacks (Dhokla, Khandvi, Farsan) and multi-course thali traditions."
  },
  {
    id: "inf-5",
    source: "KL",
    target: "KA",
    domain: "cuisine",
    title: "Malabar Coastal Spice & Coconut Fusion",
    strength: 3,
    description: "Cross-border coastal culinary trade blending Malabar black pepper, coconut oil, and seafood curry techniques with Mangalore and Coorg regional kitchens."
  },
  {
    id: "inf-6",
    source: "RJ",
    target: "MP",
    domain: "cuisine",
    title: "Dal Baati Churma & Marwari Sweets Heritage",
    strength: 4,
    description: "Marwari trade migration introduced arid-climate slow-cooked delicacies like Dal Baati Churma, Ghevar, and Mawa Kachori into Malwa & Central MP."
  },

  // --- Music & Performing Arts ---
  {
    id: "inf-7",
    source: "TN",
    target: "KA",
    domain: "music",
    title: "Carnatic Music Lineage & Trinity Compositions",
    strength: 5,
    description: "Classical compositions of Saint Tyagaraja and Muthuswami Dikshitar in Tanjore deeply shaped Carnatic vocal and veena traditions in Mysore & Bengaluru courts."
  },
  {
    id: "inf-8",
    source: "WB",
    target: "AS",
    domain: "music",
    title: "Rabindra Sangeet & Folk Melody Cross-Currents",
    strength: 4,
    description: "Tagore's musical legacy and Baul folk rhythms influenced Assamese modern song arrangement and literary songwriting in the Brahmaputra valley."
  },
  {
    id: "inf-9",
    source: "PB",
    target: "MH",
    domain: "music",
    title: "Bhangra Beats & Sufi Qawwali Integration",
    strength: 5,
    description: "Punjabi dhol rhythms, Sufi qawwali structures, and folk cadences became the bedrock of Hindi film soundtracks produced in Mumbai."
  },
  {
    id: "inf-10",
    source: "UP",
    target: "BR",
    domain: "music",
    title: "Hindustani Classical Khayal & Thumri Gharanas",
    strength: 4,
    description: "Varanasi and Lucknow classical vocal gharanas (Thumri, Dadra, Kajri) enriched folk singing and classical training across Bihar."
  },
  {
    id: "inf-11",
    source: "KL",
    target: "TN",
    domain: "music",
    title: "Chenda Melam Percussion Interchanges",
    strength: 3,
    description: "Kerala's thunderous temple drum ensembles (Chenda Melam & Panchavadyam) are frequently invited to perform at grand Tamil Nadu temple festivals."
  },

  // --- Language & Literature ---
  {
    id: "inf-12",
    source: "UP",
    target: "BR",
    domain: "language",
    title: "Gangetic Hindi & Bhojpuri Linguistic Continuum",
    strength: 5,
    description: "Deep mutual linguistic roots connecting Eastern UP Hindi dialects (Awadhi, Bhojpuri) with Bihar's Maithili, Magahi, and Bhojpuri literature."
  },
  {
    id: "inf-13",
    source: "TN",
    target: "KL",
    domain: "language",
    title: "Dravidian Root Grammar & Sangam Edicts",
    strength: 4,
    description: "Early Malayalam evolved as a distinct language branch from Middle Tamil, retaining shared grammatical structures, Sangam poetic tropes, and vocabulary."
  },
  {
    id: "inf-14",
    source: "MH",
    target: "GA",
    domain: "language",
    title: "Konkani & Marathi Script Proximity",
    strength: 4,
    description: "Centuries of geographical proximity fostered strong bilingualism, shared Devanagari literary publications, and folk theatre traditions between Goa & Maharashtra."
  },
  {
    id: "inf-15",
    source: "AS",
    target: "WB",
    domain: "language",
    title: "Eastern Indo-Aryan Common Script Ancestry",
    strength: 4,
    description: "Assamese and Bengali share a common historical script evolution derived from the Eastern Nagari / Gaudi script, fostering rich literary cross-translations."
  },

  // --- Architecture ---
  {
    id: "inf-16",
    source: "TN",
    target: "OD",
    domain: "architecture",
    title: "Dravidian Vimana & Kalinga Rekha Deula Traditions",
    strength: 4,
    description: "Medieval temple masons exchanged stone carving expertise, linking Chola Dravidian gopurams with Eastern Ganga Kalinga temple proportions."
  },
  {
    id: "inf-17",
    source: "RJ",
    target: "MP",
    domain: "architecture",
    title: "Rajput Forts, Jharokha Balconies & Sandstone Carving",
    strength: 5,
    description: "Rajput architectural motifs—ornate Jharokha balconies, chhatris (domed pavilions), and lattice jaali work—heavily influenced Gwalior, Orchha, and Indore palaces."
  },
  {
    id: "inf-18",
    source: "UP",
    target: "TG",
    domain: "architecture",
    title: "Indo-Islamic Arch & Dome Influence in Deccan",
    strength: 4,
    description: "Mughal and Delhi Sultanate architectural aesthetics directly inspired the Qutb Shahi builders of Golconda Fort and Charminar in Hyderabad."
  },
  {
    id: "inf-19",
    source: "GA",
    target: "MH",
    domain: "architecture",
    title: "Indo-Portuguese Colonial Villa Motifs",
    strength: 3,
    description: "Portuguese-influenced architectural elements like oystershell window panes, red-tiled roofs, and balcão verandas spread into coastal Konkan Maharashtra."
  },

  // --- Cinema ---
  {
    id: "inf-20",
    source: "MH",
    target: "UP",
    domain: "cinema",
    title: "Bollywood Cinema & Gangetic Storylines",
    strength: 5,
    description: "Mumbai's Hindi film industry draws writers, vocalists, and dramatic narratives rooted in North Indian folklore, UP poetry, and Gangetic cultural settings."
  },
  {
    id: "inf-21",
    source: "TN",
    target: "AP",
    domain: "cinema",
    title: "Kollywood-Tollywood Studio & Technical Collaboration",
    strength: 4,
    description: "Early South Indian cinema operated from Chennai studios (Gemini, Vijaya Vauhini), fostering decadelong artistic and technical synergy between Tamil & Telugu films."
  },
  {
    id: "inf-22",
    source: "WB",
    target: "MH",
    domain: "cinema",
    title: "Parallel Art Cinema & Director Lineage",
    strength: 4,
    description: "Bengali cinematic masters (Satyajit Ray, Mrinal Sen, Bimal Roy) moved to Mumbai, pioneering Indian parallel cinema, realistic storytelling, and classic music direction."
  },
  {
    id: "inf-23",
    source: "TG",
    target: "TN",
    domain: "cinema",
    title: "Pan-Indian VFX & Epical Storytelling",
    strength: 4,
    description: "Hyderabad's modern film infrastructure and epic spectacle filmmaking (Baahubali) created a unified Pan-Indian cinematic distribution market across South India."
  },

  // --- Textiles & Crafts ---
  {
    id: "inf-24",
    source: "WB",
    target: "AS",
    domain: "textiles",
    title: "Jamdani & Kantha Handloom Weaving Migration",
    strength: 4,
    description: "Handloom weavers migrated along the Brahmaputra, sharing running-stitch Kantha embroidery and delicate translucent Jamdani weave patterns."
  },
  {
    id: "inf-25",
    source: "GJ",
    target: "MH",
    domain: "textiles",
    title: "Bandhani Tie-Dye & Patola Silk Trade Networks",
    strength: 4,
    description: "Traditional Gujarati resist-dyeing (Bandhani) and double-ikat Patola weaving became cherished wardrobe essentials for Maharashtrian weddings and festivals."
  },
  {
    id: "inf-26",
    source: "TN",
    target: "KA",
    domain: "textiles",
    title: "Kanjeevaram Mulberry Silk Guild Exchange",
    strength: 5,
    description: "Silk weaving guilds traditionally sourced pure mulberry raw silk from Karnataka farms to weave heavy gold-zari Kanjeevaram sarees in Kanchipuram."
  },
  {
    id: "inf-27",
    source: "UP",
    target: "BR",
    domain: "textiles",
    title: "Banarasi Zari Brocade & Artisan Guilds",
    strength: 5,
    description: "Varanasi's legendary silver and gold zari brocade weaving techniques spread throughout neighboring weaver clusters across Bihar."
  },
  {
    id: "inf-28",
    source: "RJ",
    target: "GJ",
    domain: "textiles",
    title: "Ajrakh & Bagru Woodblock Print Heritage",
    strength: 4,
    description: "Shared desert riverbed dyeing artisan families (Khatri community) practice natural indigo and madder woodblock printing across Kutch and Barmer."
  },

  // --- Festivals ---
  {
    id: "inf-29",
    source: "WB",
    target: "MH",
    domain: "festivals",
    title: "Durga Puja Pandal Artistry in Western Cities",
    strength: 5,
    description: "Bengali diaspora associations in Mumbai and Pune construct grand thematic Durga Puja pandals, hiring clay idol sculptors from Kumartuli, Kolkata."
  },
  {
    id: "inf-30",
    source: "MH",
    target: "MP",
    domain: "festivals",
    title: "Ganesh Chaturthi Public Processions & Dhol Tasha",
    strength: 4,
    description: "Lokmanya Tilak's public Ganesh Utsav model and energetic Dhol-Tasha percussion troupes spread from Pune to Indore, Bhopal, and Central India."
  },
  {
    id: "inf-31",
    source: "KL",
    target: "TN",
    domain: "festivals",
    title: "Onam Harvest Floral Pookkalam Celebrations",
    strength: 3,
    description: "The grand harvest festival of Onam, complete with elaborate floral carpets (Pookkalam) and Sadhya feasts, is celebrated enthusiastically across Tamil Nadu cities."
  },
  {
    id: "inf-32",
    source: "PB",
    target: "HP",
    domain: "festivals",
    title: "Baisakhi Harvest & Gurpurab Processions",
    strength: 4,
    description: "Baisakhi spring harvest festivities and Nagar Kirtan processions are celebrated jointly across Punjabi and Himachali foothill towns."
  },
  {
    id: "inf-33",
    source: "OD",
    target: "WB",
    domain: "festivals",
    title: "Ratha Yatra Chariot Procession Traditions",
    strength: 4,
    description: "The ancient Puri Jagannath Ratha Yatra chariot festival inspired replica annual chariot processions in Kolkata, ISKCON Mayapur, and across Bengal."
  },

  // --- Migration & Diaspora ---
  {
    id: "inf-34",
    source: "BR",
    target: "MH",
    domain: "migration",
    title: "Workforce Migration & Urban Integration",
    strength: 4,
    description: "Decades of labor and professional migration from Bihar to Mumbai contributed heavily to construction, logistics, and small-enterprise ecosystems."
  },
  {
    id: "inf-35",
    source: "UP",
    target: "MH",
    domain: "migration",
    title: "Textile Mill & Commercial Migration Streams",
    strength: 4,
    description: "Historic migration of skilled textile weavers and dairy entrepreneurs from Eastern UP into Mumbai's Girangaon mill districts and suburbs."
  },
  {
    id: "inf-36",
    source: "RJ",
    target: "WB",
    domain: "migration",
    title: "Marwari Commerce & Industrial Guilds in Kolkata",
    strength: 5,
    description: "Marwari trading families from Shekhawati settled in Kolkata during the 19th century, founding major industrial houses, philanthropic trusts, and market bazaars."
  },
  {
    id: "inf-37",
    source: "KL",
    target: "KA",
    domain: "migration",
    title: "IT & Healthcare Professional Diaspora",
    strength: 3,
    description: "Strong migration of Kerala nurses, educators, and IT engineers to Bengaluru and Mangaluru, fostering vibrant Malayali cultural hubs."
  }
];

/**
 * Filter state nodes based on search query and region.
 */
export function filterStates(list = states, { search = "", region = "all" } = {}) {
  if (!Array.isArray(list)) return [];
  const query = search.trim().toLowerCase();

  return list.filter(st => {
    const matchesSearch = !query || [
      st.name,
      st.capital,
      st.region,
      st.summary
    ].some(field => field && field.toLowerCase().includes(query));

    const matchesRegion = region === "all" || st.region.toLowerCase() === region.toLowerCase();

    return matchesSearch && matchesRegion;
  });
}

/**
 * Filter influence links based on domain, origin, target, and search query.
 */
export function filterInfluences(list = influences, { domain = "all", originState = "all", targetState = "all", search = "" } = {}) {
  if (!Array.isArray(list)) return [];
  const query = search.trim().toLowerCase();

  return list.filter(inf => {
    const matchesDomain = domain === "all" || inf.domain.toLowerCase() === domain.toLowerCase();
    const matchesOrigin = originState === "all" || inf.source.toLowerCase() === originState.toLowerCase();
    const matchesTarget = targetState === "all" || inf.target.toLowerCase() === targetState.toLowerCase();

    const matchesSearch = !query || [
      inf.title,
      inf.description,
      inf.domain,
      inf.source,
      inf.target
    ].some(field => field && field.toLowerCase().includes(query));

    return matchesDomain && matchesOrigin && matchesTarget && matchesSearch;
  });
}

/**
 * Get incoming and outgoing influence connections for a given state ID.
 */
export function getStateInfluences(stateId, list = influences) {
  if (!stateId || !Array.isArray(list)) return { outgoing: [], incoming: [] };
  const sId = stateId.toUpperCase();

  const outgoing = list.filter(inf => inf.source.toUpperCase() === sId);
  const incoming = list.filter(inf => inf.target.toUpperCase() === sId);

  return { outgoing, incoming };
}

/**
 * Find state node by ID.
 */
export function findStateById(stateId, list = states) {
  if (!stateId || !Array.isArray(list)) return undefined;
  return list.find(s => s.id.toUpperCase() === stateId.toUpperCase());
}

/**
 * Get unique list of domains.
 */
export function getUniqueDomains(list = influences) {
  if (!Array.isArray(list)) return [];
  const set = new Set(list.map(inf => inf.domain).filter(Boolean));
  return Array.from(set).sort();
}

/**
 * Get unique list of state regions.
 */
export function getUniqueRegions(list = states) {
  if (!Array.isArray(list)) return [];
  const set = new Set(list.map(s => s.region).filter(Boolean));
  return Array.from(set).sort();
}

/* ==========================================================================
   BROWSER DOM & SVG NETWORK GRAPH ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.footprintStates = states;
  window.footprintInfluences = influences;
  window.footprintDomains = domains;
  window.filterStates = filterStates;
  window.filterInfluences = filterInfluences;
  window.getStateInfluences = getStateInfluences;
  window.findStateById = findStateById;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("footprint-search");
    const domainFilter = document.getElementById("domain-filter");
    const regionFilter = document.getElementById("region-filter");
    const stateSelect = document.getElementById("state-select");
    const resultStatus = document.getElementById("result-status");
    const btnResetFilters = document.getElementById("reset-filters");

    // SVG Map elements
    const svgMap = document.getElementById("footprint-map");
    const linksGroup = document.getElementById("graph-links");
    const nodesGroup = document.getElementById("graph-nodes");

    // Zoom Controls
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomOutBtn = document.getElementById("zoom-out");
    const zoomResetBtn = document.getElementById("zoom-reset");

    // Inspector Panel
    const inspectorPanel = document.getElementById("inspector-panel");
    const inspectorTitle = document.getElementById("inspector-title");
    const inspectorRegion = document.getElementById("inspector-region");
    const inspectorSummary = document.getElementById("inspector-summary");
    const inspectorOutCount = document.getElementById("inspector-out-count");
    const inspectorInCount = document.getElementById("inspector-in-count");
    const inspectorOutList = document.getElementById("inspector-out-list");
    const inspectorInList = document.getElementById("inspector-in-list");

    let currentScale = 1;
    let translateX = 0;
    let translateY = 0;
    let selectedStateId = null;

    // Domain color map
    const domainColors = {
      cuisine: "#f97316",       // orange
      music: "#ec4899",         // pink
      language: "#3b82f6",      // blue
      architecture: "#eab308",  // gold
      cinema: "#8b5cf6",        // violet
      textiles: "#10b981",      // green
      festivals: "#06b6d4",     // cyan
      migration: "#ef4444"      // red
    };

    // Populate region dropdown
    if (regionFilter) {
      getUniqueRegions(states).forEach(reg => {
        const opt = document.createElement("option");
        opt.value = reg.toLowerCase();
        opt.textContent = `${reg} Region`;
        regionFilter.appendChild(opt);
      });
    }

    // Populate state select dropdown
    if (stateSelect) {
      states.forEach(st => {
        const opt = document.createElement("option");
        opt.value = st.id;
        opt.textContent = `${st.name} (${st.id})`;
        stateSelect.appendChild(opt);
      });
    }

    function renderGraph() {
      if (!svgMap || !linksGroup || !nodesGroup) return;

      const searchVal = searchInput ? searchInput.value : "";
      const domainVal = domainFilter ? domainFilter.value : "all";
      const regionVal = regionFilter ? regionFilter.value : "all";
      const selectedStVal = stateSelect ? stateSelect.value : "all";

      const filteredSts = filterStates(states, { search: searchVal, region: regionVal });
      const activeStateIds = new Set(filteredSts.map(s => s.id));

      const activeInfluences = filterInfluences(influences, {
        domain: domainVal,
        originState: selectedStVal !== "all" ? selectedStVal : "all",
        search: searchVal
      });

      if (resultStatus) {
        resultStatus.textContent = `Showing ${activeInfluences.length} cultural influences across ${filteredSts.length} states`;
      }

      // 1. Render Influence Links (Directed curved paths with animated motion dots)
      linksGroup.innerHTML = "";
      activeInfluences.forEach(inf => {
        const sourceState = states.find(s => s.id === inf.source);
        const targetState = states.find(s => s.id === inf.target);

        if (sourceState && targetState) {
          const isHighlighted = selectedStateId && (inf.source === selectedStateId || inf.target === selectedStateId);

          // Calculate control point for slight SVG quadratic curve
          const dx = targetState.coords.x - sourceState.coords.x;
          const dy = targetState.coords.y - sourceState.coords.y;
          const cx = (sourceState.coords.x + targetState.coords.x) / 2 - dy * 0.2;
          const cy = (sourceState.coords.y + targetState.coords.y) / 2 + dx * 0.2;

          const pathStr = `M ${sourceState.coords.x},${sourceState.coords.y} Q ${cx},${cy} ${targetState.coords.x},${targetState.coords.y}`;

          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", pathStr);
          path.setAttribute("class", `graph-link-path ${isHighlighted ? "highlighted" : ""}`);
          path.setAttribute("stroke", domainColors[inf.domain] || "#94a3b8");
          path.setAttribute("stroke-width", inf.strength || 3);
          linksGroup.appendChild(path);

          // Animated particle dot flowing along curve
          const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          dot.setAttribute("r", 4);
          dot.setAttribute("fill", domainColors[inf.domain] || "#ffffff");

          dot.innerHTML = `
            <animateMotion dur="${6 - (inf.strength || 3)}s" repeatCount="indefinite" path="${pathStr}" />
          `;
          linksGroup.appendChild(dot);
        }
      });

      // 2. Render State Nodes
      nodesGroup.innerHTML = "";
      states.forEach(state => {
        const isActive = activeStateIds.has(state.id);
        const isSelected = selectedStateId === state.id;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", `state-graph-node ${isActive ? "active" : "faded"} ${isSelected ? "selected" : ""}`);
        g.setAttribute("transform", `translate(${state.coords.x}, ${state.coords.y})`);
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");

        // Outer glow circle
        const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        glow.setAttribute("r", isSelected ? 18 : 12);
        glow.setAttribute("class", "node-outer-glow");

        // Core dot
        const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        core.setAttribute("r", isSelected ? 10 : 7);
        core.setAttribute("class", "node-inner-core");

        // State label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("y", -16);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("class", "node-label-text");
        label.textContent = state.name;

        g.appendChild(glow);
        g.appendChild(core);
        g.appendChild(label);

        g.addEventListener("click", (e) => {
          e.stopPropagation();
          selectState(state.id);
        });

        g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectState(state.id);
          }
        });

        nodesGroup.appendChild(g);
      });
    }

    function selectState(stateId) {
      selectedStateId = stateId;
      const state = findStateById(stateId);
      if (!state) return;

      if (stateSelect) stateSelect.value = stateId;

      const { outgoing, incoming } = getStateInfluences(stateId);

      if (inspectorTitle) inspectorTitle.textContent = state.name;
      if (inspectorRegion) inspectorRegion.textContent = `${state.region} Region · Capital: ${state.capital}`;
      if (inspectorSummary) inspectorSummary.textContent = state.summary;
      if (inspectorOutCount) inspectorOutCount.textContent = outgoing.length;
      if (inspectorInCount) inspectorInCount.textContent = incoming.length;

      // Populate outgoing list
      if (inspectorOutList) {
        inspectorOutList.innerHTML = "";
        if (outgoing.length === 0) {
          inspectorOutList.innerHTML = "<p class='muted'>No outgoing influences mapped for this state yet.</p>";
        } else {
          outgoing.forEach(inf => {
            const targetState = findStateById(inf.target);
            const card = document.createElement("div");
            card.className = "influence-item-card";
            card.innerHTML = `
              <div class="inf-header">
                <span class="domain-tag ${inf.domain}">${inf.domain}</span>
                <strong>➔ ${targetState ? targetState.name : inf.target}</strong>
              </div>
              <h5 class="inf-title">${inf.title}</h5>
              <p class="inf-desc">${inf.description}</p>
            `;
            inspectorOutList.appendChild(card);
          });
        }
      }

      // Populate incoming list
      if (inspectorInList) {
        inspectorInList.innerHTML = "";
        if (incoming.length === 0) {
          inspectorInList.innerHTML = "<p class='muted'>No incoming influences mapped for this state yet.</p>";
        } else {
          incoming.forEach(inf => {
            const sourceState = findStateById(inf.source);
            const card = document.createElement("div");
            card.className = "influence-item-card";
            card.innerHTML = `
              <div class="inf-header">
                <span class="domain-tag ${inf.domain}">${inf.domain}</span>
                <strong>⬅ ${sourceState ? sourceState.name : inf.source}</strong>
              </div>
              <h5 class="inf-title">${inf.title}</h5>
              <p class="inf-desc">${inf.description}</p>
            `;
            inspectorInList.appendChild(card);
          });
        }
      }

      if (inspectorPanel) {
        inspectorPanel.hidden = false;
        inspectorPanel.classList.add("active");
      }

      renderGraph();
    }

    // Zoom & Pan transforms
    function updateTransform() {
      const container = svgMap?.querySelector("g");
      if (container) {
        container.setAttribute("transform", `translate(${translateX}, ${translateY}) scale(${currentScale})`);
      }
    }

    zoomInBtn?.addEventListener("click", () => {
      currentScale = Math.min(currentScale + 0.15, 2.5);
      updateTransform();
    });

    zoomOutBtn?.addEventListener("click", () => {
      currentScale = Math.max(currentScale - 0.15, 0.5);
      updateTransform();
    });

    zoomResetBtn?.addEventListener("click", () => {
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    });

    // Drag-to-pan implementation
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    svgMap?.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      svgMap.style.cursor = "grabbing";
    });

    svgMap?.addEventListener("mousemove", (e) => {
      if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
      }
    });

    svgMap?.addEventListener("mouseup", () => {
      isDragging = false;
      if (svgMap) svgMap.style.cursor = "grab";
    });

    svgMap?.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    // Event listeners
    searchInput?.addEventListener("input", renderGraph);
    domainFilter?.addEventListener("change", renderGraph);
    regionFilter?.addEventListener("change", renderGraph);
    stateSelect?.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "all") {
        selectedStateId = null;
        if (inspectorPanel) inspectorPanel.hidden = true;
        renderGraph();
      } else {
        selectState(val);
      }
    });

    btnResetFilters?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (domainFilter) domainFilter.value = "all";
      if (regionFilter) regionFilter.value = "all";
      if (stateSelect) stateSelect.value = "all";
      selectedStateId = null;
      if (inspectorPanel) inspectorPanel.hidden = true;
      renderGraph();
    });

    // Initial render
    renderGraph();
  });
}
