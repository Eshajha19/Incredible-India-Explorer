/**
 * trade-routes.js
 * Ancient Indian Trade Network - Data Structures & Network Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core Routes Dataset
export const routes = [
  {
    id: "spice-route",
    name: "Monsoon Maritime Route (Spice Route)",
    type: "maritime",
    color: "#2563eb", // blue
    pathPoints: [
      { x: 100, y: 150 }, // Rome / Alexandria
      { x: 150, y: 380 }, // Aden / Arabia
      { x: 450, y: 480 }  // Muziris / India
    ],
    description: "The legendary maritime route connecting Rome and Egypt with India's pepper-rich Malabar coast, driven by seasonal monsoon winds.",
    significance: "Brought massive flows of Roman gold coins into India in exchange for black pepper ('black gold'), cardamom, and ginger."
  },
  {
    id: "uttarapatha",
    name: "Northern Silk Road (Uttarapatha)",
    type: "land",
    color: "#d97706", // amber
    pathPoints: [
      { x: 410, y: 100 }, // Taxila
      { x: 470, y: 180 }, // Mathura
      { x: 580, y: 260 }  // Tamralipti
    ],
    description: "The great northern highway connecting Taxila (gateway to Central Asia and China) with the Gangetic plain and the port of Tamralipti.",
    significance: "Facilitated Buddhist monastic expansions, political integration, and transit of Chinese silk, wool, and horses."
  },
  {
    id: "dakshinapatha",
    name: "Southern Highway (Dakshinapatha)",
    type: "land",
    color: "#10b981", // green
    pathPoints: [
      { x: 470, y: 180 }, // Mathura
      { x: 460, y: 310 }, // Pratishthana
      { x: 500, y: 380 }, // Amaravati
      { x: 450, y: 480 }  // Muziris
    ],
    description: "The ancient inland highway connecting Mathura and the north with the Satavahana capitals and southern kingdoms.",
    significance: "Main transit route for high-carbon Wootz steel, gemstones, and muslin textiles from internal mining/weaving centers to ports."
  },
  {
    id: "maritime-silk-route",
    name: "Maritime Silk Route (Bay of Bengal)",
    type: "maritime",
    color: "#8b5cf6", // violet
    pathPoints: [
      { x: 580, y: 260 }, // Tamralipti
      { x: 490, y: 470 }, // Kaveripattinam
      { x: 780, y: 460 }, // Malacca Strait
      { x: 800, y: 120 }  // China
    ],
    description: "Maritime connection linking Bengal and Chola ports with Sri Lanka, the Straits of Malacca, and Southeast Asia to Southern China.",
    significance: "Supported massive Chola naval trade guilds, cultural transmission of Hinduism/Buddhism, and exchange of silk and porcelain."
  },
  {
    id: "east-africa-route",
    name: "East African Maritime Route",
    type: "maritime",
    color: "#ec4899", // pink
    pathPoints: [
      { x: 420, y: 280 }, // Barygaza
      { x: 150, y: 380 }, // Aden
      { x: 180, y: 480 }  // Axum / East Africa
    ],
    description: "The Indian Ocean trade link between the ports of Gujarat and Sopara and the Horn of Africa and Axumite Empire.",
    significance: "Traded Indian cottons and iron for African ivory, gold, tortoise shells, and frankincense."
  }
];

// Core Ports Dataset
export const ports = [
  {
    id: "muziris",
    name: "Muziris (Pattanam)",
    location: "Malabar Coast, Kerala",
    region: "South",
    established: "c. 1st century BCE or earlier",
    majorTradeWith: "Rome, Alexandria, Arabia, Phoenicia",
    description: "The primary spice hub of the ancient world, described in Roman texts (Pliny) and Tamil Sangam literature as a bustling river port where Yavanas (Romans) arrived with gold to buy pepper.",
    archaeologyFinds: "Wharf structures, Roman amphorae fragments, Roman gold coin hoards, brick structures, and a 2,000-year-old wooden dugout canoe.",
    image: "assets/travel_islands.png",
    coords: { x: 450, y: 480 }
  },
  {
    id: "arikamedu",
    name: "Arikamedu",
    location: "Ariyankuppam River, Puducherry",
    region: "South",
    established: "c. 2nd century BCE",
    majorTradeWith: "Rome, Egypt, Southeast Asia",
    description: "A major manufacturing port specializing in glass beads, precious stone cutting, and muslin textiles, maintaining a permanent Roman merchant settlement.",
    archaeologyFinds: "Roman Arretine ware (stamped pottery), amphorae containing residues of Mediterranean olive oil/wine, and thousands of waste glass beads.",
    image: "assets/travel_beaches.png",
    coords: { x: 490, y: 440 }
  },
  {
    id: "lothal",
    name: "Lothal Dockyard",
    location: "Saraswati/Sabarmati, Gujarat",
    region: "West",
    established: "c. 2400 BCE (Harappan Era)",
    majorTradeWith: "Sumeria, Ur, Bahrain (Dilmun), Persian Gulf",
    description: "The oldest known artificial tidal dockyard in the world, serving as a critical harbor for Indus Valley Civilisation sea trade.",
    archaeologyFinds: "Massive stone-walled basin with lock-gates, bead factory kiln, Persian Gulf seals, and terracotta models of sailing boats.",
    image: "assets/West_India.png",
    coords: { x: 420, y: 240 }
  },
  {
    id: "barygaza",
    name: "Barygaza (Bharuch)",
    location: "Narmada River Mouth, Gujarat",
    region: "West",
    established: "c. 3rd century BCE",
    majorTradeWith: "Rome, Persian Gulf, Arabia, Egypt",
    description: "The most important western Indian gateway for trade from the inland Maurya and Satavahana empires, dealing in onyx, porcelain, cotton, and silk.",
    archaeologyFinds: "Ancient Roman coins, lead coins of Satavahana kings, brick fortifications, and dry docks along the Narmada riverbed.",
    image: "assets/heroriver.png",
    coords: { x: 420, y: 280 }
  },
  {
    id: "tamralipti",
    name: "Tamralipti (Tamluk)",
    location: "Rupnarayan River, West Bengal",
    region: "East",
    established: "c. 3rd century BCE",
    majorTradeWith: "Sri Lanka, Malacca, China, Southeast Asia",
    description: "The main eastern riverine port connecting the Maurya and Gupta empires with maritime routes heading to Ceylon, Indonesia, and China.",
    archaeologyFinds: "Terracotta figurines showing Greco-Roman influences, punch-marked coins, Rouletted pottery, and Buddhist stupa ruins.",
    image: "assets/East_India.png",
    coords: { x: 580, y: 260 }
  },
  {
    id: "sopara",
    name: "Sopara (Nalasopara)",
    location: "Thane Creek, Maharashtra",
    region: "West",
    established: "c. 1000 BCE (Bronze/Iron Age)",
    majorTradeWith: "Mesopotamia, Arabia, East Africa, Rome",
    description: "An ancient western port and religious center connected to the Dakshinapatha highway, mentioned in Ashokan Rock Edicts and Buddhist Jataka tales.",
    archaeologyFinds: "Ashokan stone edict fragments, a Buddhist stupa rel casket containing gold flowers, Roman glass, and Satavahana copper coins.",
    image: "assets/Chhatrapati_Shivaji.png",
    coords: { x: 420, y: 340 }
  },
  {
    id: "kaveripattinam",
    name: "Kaveripattinam (Poompuhar)",
    location: "Kaveri River Mouth, Tamil Nadu",
    region: "South",
    established: "c. 2nd century BCE",
    majorTradeWith: "Southeast Asia, Rome, China",
    description: "The grand capital and maritime port of the Early Chola kings, celebrated in Sangam epics (Silappadikaram) for its massive lighthouse, customs house, and foreign quarters.",
    archaeologyFinds: "Brick wharf structures, Roman coin hoards, Buddha footprints in stone, and underwater remains of submerged ring-wells and walls.",
    image: "assets/travel_beaches.png",
    coords: { x: 490, y: 470 }
  }
];

// Core Trade Goods Dataset
export const goods = [
  {
    id: "pepper",
    name: "Black Pepper ('Black Gold')",
    type: "export",
    origin: "Malabar Coast, South India",
    description: "The most prized spice in antiquity. Highly demanded by the Roman elite for culinary and preservative purposes.",
    icon: "🫘"
  },
  {
    id: "muslin",
    name: "Muslin & Fine Cottons",
    type: "export",
    origin: "Bengal and Deccan (Varanasi, Madurai)",
    description: "Exquisite, ultra-fine woven cotton textiles so transparent they were famously described as 'woven wind'. Highly fashionable in Rome.",
    icon: "🧵"
  },
  {
    id: "steel",
    name: "Wootz Steel",
    type: "export",
    origin: "Deccan and South India (Tamil Nadu, Karnataka)",
    description: "High-carbon crucible steel exported in ingots. Later forged by Arab metalsmiths into legendary Damascus swords.",
    icon: "⚔️"
  },
  {
    id: "gems",
    name: "Gemstones & Gulf Pearls",
    type: "export",
    origin: "Kodumanal (Beryls) & Gulf of Mannar (Pearls)",
    description: "High-quality aquamarines, beryls, sapphires, and natural sea pearls exported to adorn Roman emperors and Chinese nobility.",
    icon: "💎"
  },
  {
    id: "wine",
    name: "Roman Wine & Olive Oil",
    type: "import",
    origin: "Italy, Spain, Greece",
    description: "Premium Mediterranean wines and olive oils shipped to royal courts and Roman merchant colonies in India.",
    icon: "🍷"
  },
  {
    id: "silk",
    name: "Silk Yarn & Fabrics",
    type: "transit-trade",
    origin: "China via Land/Sea routes",
    description: "Chinese silk traded via Uttarapatha, often refined or dyed in Indian weaving hubs before being re-exported to Rome.",
    icon: "👘"
  },
  {
    id: "frankincense",
    name: "Frankincense & Incense",
    type: "import",
    origin: "Southern Arabia & East Africa",
    description: "Aromatic resins imported for ritual temple worship, royal perfumery, and medical formulations.",
    icon: "🪵"
  },
  {
    id: "glassware",
    name: "Roman Glassware & Beads",
    type: "import",
    origin: "Alexandria & Rome",
    description: "Fine blown Roman glass vessels, metal vessels, and raw glass ingots which were reworked in Indian workshops.",
    icon: "🏺"
  }
];

// Historical Dynasty Eras
export const timelineEras = {
  maurya: {
    period: "c. 322 - 185 BCE",
    title: "Mauryan Highway Expansion",
    text: "Under Chandragupta Maurya and Emperor Ashoka, the great land highways Uttarapatha and Dakshinapatha were secured with rest houses, trade tolls, and unified coinage. Monolithic rock edicts at ports (Sopara) confirmed state-regulated trade."
  },
  romano: {
    period: "c. 1st BCE - 3rd CE",
    title: "Indo-Roman Trade Boom",
    text: "Following the discovery of the monsoon winds by Greek navigator Hippalus, Roman fleets sailed directly across the Arabian Sea. Up to 120 Roman ships sailed annually from Egyptian Red Sea ports to Muziris, bringing massive flows of gold."
  },
  satavahana: {
    period: "c. 1st BCE - 2nd CE",
    title: "Satavahana Port Control",
    text: "The Satavahana kings dominated Central India and secured the western ports (Barygaza, Sopara) and eastern outlets. They issued lead and copper coins depicting double-masted ships, celebrating their maritime trade supremacy."
  },
  gupta: {
    period: "c. 4th - 6th CE",
    title: "Gupta Golden Age Prosperity",
    text: "Inland peace and prosperity drove high craft production. The port of Tamralipti became the leading center for maritime trade with Sri Lanka, Myanmar, Java, and China, documented by visiting Chinese pilgrim Faxian."
  },
  chola: {
    period: "c. 9th - 11th CE",
    title: "Chola Naval Empire & Guilds",
    text: "The Chola dynasty built a powerful navy and chartered merchant guilds (Manigramam, Ayyavole). They sent trade embassies to Song China and launched naval campaigns to secure the Malacca Straits, protecting regional maritime routes."
  }
};

/**
 * Filter ports based on search query and region.
 */
export function filterPorts(items, { search = "", region = "all" } = {}) {
  if (!Array.isArray(items)) return [];

  const query = search.trim().toLowerCase();

  return items.filter(port => {
    // Search query match
    const matchesSearch = !query || [
      port.name,
      port.location,
      port.region,
      port.majorTradeWith,
      port.description,
      port.archaeologyFinds
    ].some(field => field && field.toLowerCase().includes(query));

    // Region filter match
    const matchesRegion = region === "all" || port.region.toLowerCase() === region.toLowerCase();

    return matchesSearch && matchesRegion;
  });
}

/**
 * Filter routes based on route type (land/maritime).
 */
export function filterRoutes(items, type = "all") {
  if (!Array.isArray(items)) return [];
  if (type === "all") return items;
  return items.filter(r => r.type.toLowerCase() === type.toLowerCase());
}

/**
 * Find port by ID.
 */
export function findPortById(portId, list = ports) {
  return list.find(p => p.id === portId);
}

/**
 * Get unique regions from ports.
 */
export function getUniquePortsByRegion(list = ports) {
  const set = new Set(list.map(p => p.region).filter(Boolean));
  return Array.from(set).sort();
}

/**
 * Get unique categories from goods.
 */
export function getUniqueGoodsByCategory(list = goods) {
  const set = new Set(list.map(g => g.type).filter(Boolean));
  return Array.from(set).sort();
}

/* ==========================================================================
   BROWSER DOM & SVG MAP ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.tradeRoutes = routes;
  window.tradePorts = ports;
  window.tradeGoods = goods;
  window.timelineEras = timelineEras;
  window.filterPorts = filterPorts;
  window.filterRoutes = filterRoutes;
  window.findPortById = findPortById;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("trade-search");
    const typeFilter = document.getElementById("type-filter");
    const regionFilter = document.getElementById("region-filter");
    const resultStatus = document.getElementById("result-status");
    const clearFiltersBtn = document.getElementById("clear-filters");

    // SVG Map elements
    const svgMap = document.getElementById("trade-map");
    const routesGroup = document.getElementById("map-routes");
    const portsGroup = document.getElementById("map-ports");

    // Map Zoom controls
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomOutBtn = document.getElementById("zoom-out");
    const zoomResetBtn = document.getElementById("zoom-reset");

    // Modal elements
    const portModal = document.getElementById("port-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalRegion = document.getElementById("modal-region");
    const modalLocation = document.getElementById("modal-location");
    const modalYear = document.getElementById("modal-year");
    const modalTradeWith = document.getElementById("modal-tradewith");
    const modalDescription = document.getElementById("modal-description");
    const modalArchaeology = document.getElementById("modal-archaeology");
    const modalImage = document.getElementById("modal-image");
    const modalPrevBtn = document.getElementById("modal-prev-btn");
    const modalNextBtn = document.getElementById("modal-next-btn");

    // Goods Grid
    const goodsGrid = document.getElementById("goods-grid");

    // Timeline elements
    const timelineButtons = document.querySelectorAll(".timeline-button");
    const timelinePeriod = document.getElementById("timeline-period");
    const timelineTitle = document.getElementById("timeline-title");
    const timelineText = document.getElementById("timeline-text");

    let currentScale = 1;
    let translateX = 0;
    let translateY = 0;
    let selectedPortIndex = -1;
    let filteredPorts = [...ports];

    // Populate region dropdown
    if (regionFilter) {
      getUniquePortsByRegion().forEach(reg => {
        const opt = document.createElement("option");
        opt.value = reg.toLowerCase();
        opt.textContent = `${reg} India`;
        regionFilter.appendChild(opt);
      });
    }

    function renderMap() {
      if (!svgMap || !routesGroup || !portsGroup) return;

      const searchVal = searchInput ? searchInput.value : "";
      const typeVal = typeFilter ? typeFilter.value : "all";
      const regionVal = regionFilter ? regionFilter.value : "all";

      filteredPorts = filterPorts(ports, { search: searchVal, region: regionVal });
      const activePortIds = new Set(filteredPorts.map(p => p.id));
      const activeRoutes = filterRoutes(routes, typeVal);

      if (resultStatus) {
        resultStatus.textContent = `Showing ${filteredPorts.length} of ${ports.length} ancient trade ports`;
      }

      // 1. Render Routes (Animated paths)
      routesGroup.innerHTML = "";
      activeRoutes.forEach(route => {
        // Draw polyline
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        const pointsStr = route.pathPoints.map(p => `${p.x},${p.y}`).join(" ");
        polyline.setAttribute("points", pointsStr);
        polyline.setAttribute("class", "map-route-path");
        polyline.setAttribute("stroke", route.color);
        routesGroup.appendChild(polyline);

        // Add animated flow indicator dot along path
        if (route.pathPoints.length >= 2) {
          const flowDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          flowDot.setAttribute("r", 5);
          flowDot.setAttribute("fill", route.color);

          const motionPath = route.pathPoints.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
          flowDot.innerHTML = `
            <animateMotion dur="6s" repeatCount="indefinite" path="${motionPath}" />
          `;
          routesGroup.appendChild(flowDot);
        }
      });

      // 2. Render Ports (Pulsing nodes)
      portsGroup.innerHTML = "";
      ports.forEach(port => {
        const isActive = activePortIds.has(port.id);

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", `port-marker-group ${isActive ? "active" : "faded"}`);
        g.setAttribute("transform", `translate(${port.coords.x}, ${port.coords.y})`);
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");

        // Outer pulsing ring
        const pulseCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pulseCircle.setAttribute("r", 14);
        pulseCircle.setAttribute("class", "pulse-ring");
        pulseCircle.setAttribute("stroke", "#eab308");

        // Solid inner circle
        const coreCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        coreCircle.setAttribute("r", 8);
        coreCircle.setAttribute("class", "core-dot");
        coreCircle.setAttribute("fill", "#eab308");

        // Label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("y", -14);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("class", "port-map-label");
        label.textContent = port.name;

        g.appendChild(pulseCircle);
        g.appendChild(coreCircle);
        g.appendChild(label);

        // Click handler to open port detail modal
        g.addEventListener("click", (e) => {
          e.stopPropagation();
          const globalIdx = filteredPorts.findIndex(p => p.id === port.id);
          if (globalIdx !== -1) {
            openPortModal(globalIdx);
          }
        });

        // Key handler
        g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const globalIdx = filteredPorts.findIndex(p => p.id === port.id);
            if (globalIdx !== -1) {
              openPortModal(globalIdx);
            }
          }
        });

        portsGroup.appendChild(g);
      });
    }

    function openPortModal(index) {
      if (index < 0 || index >= filteredPorts.length) return;
      selectedPortIndex = index;
      const port = filteredPorts[index];

      if (modalTitle) modalTitle.textContent = port.name;
      if (modalRegion) modalRegion.textContent = `${port.region} India`;
      if (modalLocation) modalLocation.textContent = port.location;
      if (modalYear) modalYear.textContent = port.established;
      if (modalTradeWith) modalTradeWith.textContent = port.majorTradeWith;
      if (modalDescription) modalDescription.textContent = port.description;
      if (modalArchaeology) modalArchaeology.textContent = port.archaeologyFinds;
      if (modalImage) {
        modalImage.src = port.image;
        modalImage.alt = port.name;
      }

      if (portModal) {
        portModal.hidden = false;
        portModal.classList.add("active");
        document.body.classList.add("modal-open");
        modalCloseBtn?.focus();
      }
    }

    function closePortModal() {
      if (portModal) {
        portModal.hidden = true;
        portModal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
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

    // Touch events for mobile dragging
    svgMap?.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      }
    });

    svgMap?.addEventListener("touchmove", (e) => {
      if (isDragging && e.touches.length === 1) {
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        updateTransform();
      }
    });

    svgMap?.addEventListener("touchend", () => {
      isDragging = false;
    });

    // Render Goods Grid
    function renderGoods() {
      if (!goodsGrid) return;
      goodsGrid.innerHTML = "";

      goods.forEach(good => {
        const card = document.createElement("div");
        card.className = "goods-card";
        card.innerHTML = `
          <div class="goods-icon">${good.icon}</div>
          <div class="goods-info">
            <span class="goods-badge ${good.type}">${good.type}</span>
            <h4>${good.name}</h4>
            <p class="goods-origin">📍 <strong>Origin:</strong> ${good.origin}</p>
            <p class="goods-desc">${good.description}</p>
          </div>
        `;
        goodsGrid.appendChild(card);
      });
    }

    // Timeline tab handlers
    timelineButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        timelineButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.dataset.key;
        const era = timelineEras[key];
        if (era) {
          if (timelinePeriod) timelinePeriod.textContent = era.period;
          if (timelineTitle) timelineTitle.textContent = era.title;
          if (timelineText) timelineText.textContent = era.text;
        }
      });
    });

    // Event Listeners
    searchInput?.addEventListener("input", renderMap);
    typeFilter?.addEventListener("change", renderMap);
    regionFilter?.addEventListener("change", renderMap);
    clearFiltersBtn?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (typeFilter) typeFilter.value = "all";
      if (regionFilter) regionFilter.value = "all";
      renderMap();
    });

    modalCloseBtn?.addEventListener("click", closePortModal);
    modalPrevBtn?.addEventListener("click", () => {
      if (selectedPortIndex > 0) openPortModal(selectedPortIndex - 1);
    });
    modalNextBtn?.addEventListener("click", () => {
      if (selectedPortIndex < filteredPorts.length - 1) openPortModal(selectedPortIndex + 1);
    });

    portModal?.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close-modal") || e.target === portModal) {
        closePortModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (portModal && !portModal.hidden) {
        if (e.key === "Escape") closePortModal();
        if (e.key === "ArrowLeft" && selectedPortIndex > 0) openPortModal(selectedPortIndex - 1);
        if (e.key === "ArrowRight" && selectedPortIndex < filteredPorts.length - 1) openPortModal(selectedPortIndex + 1);
      }
    });

    // Initial load
    renderMap();
    renderGoods();
  });
}
