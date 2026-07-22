/**
 * border-stories.js
 * Border Stories Explorer - Inter-State Border Culture Dataset & Visual Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core 16 Inter-State Border Stories Dataset
export const borderStories = [
  {
    id: "b-1",
    states: ["PB", "HP"],
    borderName: "Shivalik Foothills Border (Punjab - Himachal Pradesh)",
    region: "North",
    riverBoundary: "Sutlej & Beas Rivers",
    dialect: "Puadhi Punjabi & Kangri Pahari blend",
    borderFood: "Chana Madra, Makki di Roti & Sarson da Saag",
    borderMarket: "Anandpur Sahib & Una Border Bazaar",
    tradition: "Holla Mohalla martial arts displays & Baisakhi fairs along the Anandpur valley.",
    summary: "Where the plains of Punjab meet the pine-forested foothills of Himachal, fostering a rich fusion of Sikh heritage, Pahari hospitality, and riverine trade.",
    coords: { x: 425, y: 140 }
  },
  {
    id: "b-2",
    states: ["KL", "TN"],
    borderName: "Palakkad Gap Border (Kerala - Tamil Nadu)",
    region: "South",
    riverBoundary: "Bharathappuzha (Nila River)",
    dialect: "Palakkad Tamil-Malayalam Patois",
    borderFood: "Kottai Puttu, Kanchipuram Dosa & Ramassery Idli",
    borderMarket: "Walayar & Velanthavalam Cross-Border Market",
    tradition: "Grand elephant pageants, Chenda Melam drumming, and classical Carnatic temple car festivals.",
    summary: "The major 30km mountain pass through the Western Ghats connecting Kerala's spice coast with Tamil Nadu's agricultural plains, creating a unique hybrid culture.",
    coords: { x: 480, y: 520 }
  },
  {
    id: "b-3",
    states: ["WB", "OD"],
    borderName: "Subarnarekha River Delta Border (West Bengal - Odisha)",
    region: "East",
    riverBoundary: "Subarnarekha River",
    dialect: "Baleswari Odia & Midnapore Bengali",
    borderFood: "Rasagola, Chhena Poda & Mustard Fish Curry",
    borderMarket: "Dantan & Jaleswar Inter-State Haat",
    tradition: "Tusu Parab harvest rituals, Chhau dance mask theater, and Pattachitra folk painting.",
    summary: "A fertile coastal border where Bengali and Odia literary, culinary, and craft traditions blend seamlessly along ancient river trade routes.",
    coords: { x: 600, y: 300 }
  },
  {
    id: "b-4",
    states: ["MH", "GA"],
    borderName: "Konkan Coastal Border (Maharashtra - Goa)",
    region: "West",
    riverBoundary: "Terekhol River",
    dialect: "Malvani & Bardez Konkani",
    borderFood: "Sol Kadhi, Kombdi Vade & Goan Fish Curry Rice",
    borderMarket: "Sawantwadi & Pernem Border Haat",
    tradition: "Dashavatara folk night-theater, Shigmo spring carnivals, and Sawantwadi wooden lacquerware crafts.",
    summary: "Separated by the scenic Terekhol River, this border unites Malvani Maharashtrian flavor with Goan Konkani maritime traditions.",
    coords: { x: 415, y: 400 }
  },
  {
    id: "b-5",
    states: ["GJ", "RJ"],
    borderName: "Aravalli Range Border (Gujarat - Rajasthan)",
    region: "North-West",
    riverBoundary: "Sabarmati River & Rann Salt Flats",
    dialect: "Mewari & Kutchi-North Gujarati blend",
    borderFood: "Dal Baati Churma, Handvo & Ker Sangri",
    borderMarket: "Shamlaji & Ratanpur Border Fair",
    tradition: "Garba and Ghoomar folk dances, Bandhani tie-dye textile markets, and Shamlaji tribal pilgrimage fairs.",
    summary: "Rugged desert and hill border connecting Marwari palace grandeur with Gujarati merchant maritime culture along the ancient Aravalli trade pass.",
    coords: { x: 345, y: 260 }
  },
  {
    id: "b-6",
    states: ["BR", "UP"],
    borderName: "Bhojpuri Heartland Border (Bihar - Uttar Pradesh)",
    region: "North",
    riverBoundary: "Ganga, Gandak & Ghaghara Rivers",
    dialect: "Pure Bhojpuri & Purvanchali Hindi",
    borderFood: "Litti Chokha, Sattu Paratha & Balushahi",
    borderMarket: "Buxar & Ballia Riverine Ghat Haats",
    tradition: "Chhath Puja sun worship along riverbanks, Biraha folk ballads, and Bidesia folk theater.",
    summary: "A seamless cultural continuum bound by the sacred Ganga and Ghaghara rivers, sharing deep linguistic, matrimonial, and agrarian bonds.",
    coords: { x: 520, y: 215 }
  },
  {
    id: "b-7",
    states: ["AS", "ML"],
    borderName: "Khasi-Brahmaputra Hills Border (Assam - Meghalaya)",
    region: "North-East",
    riverBoundary: "Kopili River",
    dialect: "Khasi & Kamrupi Assamese",
    borderFood: "Jadoh (Rice with Pork), Pitha Sweets & Bamboo Shoot Curry",
    borderMarket: "Khanapara & Dawki Weekly Cross-Border Haat",
    tradition: "Shad Suk Mynsiem dance, Bihu harvest songs, and living root bridge craftsmanship.",
    summary: "Where the Brahmaputra valley ascends into the misty Khasi hills, creating vibrant weekly border markets and matrilineal tribal trade.",
    coords: { x: 685, y: 220 }
  },
  {
    id: "b-8",
    states: ["KA", "KL"],
    borderName: "Coorg & Malabar Border (Karnataka - Kerala)",
    region: "South",
    riverBoundary: "Payaswini (Chandragiri) River",
    dialect: "Arebhashe, Beary & Malayalam",
    borderFood: "Pandi Curry (Coorg Pork), Akki Oti & Pathiri",
    borderMarket: "Kasaragod & Sullia Inter-State Trade Market",
    tradition: "Theyyam ritual performance, Bhoota Kola spirit worship, and Kodava warrior sword dances.",
    summary: "Dense coffee plantation and rainforest border where Kodava hill traditions meet Malabar coastal rituals and spice cultivation.",
    coords: { x: 445, y: 490 }
  },
  {
    id: "b-9",
    states: ["MP", "RJ"],
    borderName: "Chambal Valley Border (Madhya Pradesh - Rajasthan)",
    region: "Central",
    riverBoundary: "Chambal River",
    dialect: "Malvi, Nimadi & Hadoti",
    borderFood: "Poha Jalebi, Sev Tamatar & Dal Baati",
    borderMarket: "Neemuch & Chittorgarh Border Agricultural Mandi",
    tradition: "Gangaur spring festival, Tejaji livestock fairs, and Mandana mud-wall paintings.",
    summary: "Carved by the deep ravines of the Chambal River, this border blends Central Indian Malwa agriculture with Rajasthani chivalric lore.",
    coords: { x: 405, y: 260 }
  },
  {
    id: "b-10",
    states: ["TG", "AP"],
    borderName: "Krishna River Valley Border (Telangana - Andhra Pradesh)",
    region: "South",
    riverBoundary: "Krishna River",
    dialect: "Telangana & Rayalaseema Telugu blend",
    borderFood: "Gongura Pachadi, Hyderabadi Biryani & Mirchi Bajji",
    borderMarket: "Nagarjuna Sagar & Kurnool River Market",
    tradition: "Bonalu festival, Tirupati Brahmotsavam pilgrimages, and Kuchipudi dance heritage.",
    summary: "Bound by the Krishna and Godavari river systems, sharing twin capitals history, rich Telugu literature, and spicy Deccani cuisine.",
    coords: { x: 495, y: 430 }
  },
  {
    id: "b-11",
    states: ["JH", "WB"],
    borderName: "Chota Nagpur Plateau Border (Jharkhand - West Bengal)",
    region: "East",
    riverBoundary: "Damodar & Subarnarekha Rivers",
    dialect: "Manbhum Bengali & Santhali",
    borderFood: "Dhuska, Arsa Roti & Pithe Sweets",
    borderMarket: "Purulia & Jhalda Weekly Tribal Haat",
    tradition: "Purulia Chhau martial dance, Karam tribal festival, and Alpona floor art.",
    summary: "Mineral-rich plateau border where Santhal tribal heritage, Baul folk music, and Bengali artisan traditions thrive along forest villages.",
    coords: { x: 580, y: 270 }
  },
  {
    id: "b-12",
    states: ["HP", "UK"],
    borderName: "Tons River Valley Border (Himachal Pradesh - Uttarakhand)",
    region: "North",
    riverBoundary: "Tons River",
    dialect: "Jaunsari & Sirmauri Pahari",
    borderFood: "Siddu, Phaanu & Gahat dal soups",
    borderMarket: "Tiuni & Rohru Himalayan Border Bazaar",
    tradition: "Mahasu Devta temple processions, Pandav Nritya folk theater, and wooden pagoda temple architecture.",
    summary: "Deep alpine valley border along the raging Tons River, sharing sacred wooden temples, Pandava legends, and Himalayan Apple orchards.",
    coords: { x: 460, y: 130 }
  },
  {
    id: "b-13",
    states: ["AS", "NL"],
    borderName: "Patkai Foothills Border (Assam - Nagaland)",
    region: "North-East",
    riverBoundary: "Dhansiri River",
    dialect: "Nagamese Pidgin & Assamese",
    borderFood: "Smoked Pork with Bamboo Shoot & Masor Tenga",
    borderMarket: "Dimapur & Golaghat Border Trade Center",
    tradition: "Hornbill festival cultural echoes, Ali-Ai-Ligang spring dance, and Naga woven shawls.",
    summary: "Dynamic foothill border linking the fertile Assam plains with the Naga hill tribes through vibrant inter-state commercial markets.",
    coords: { x: 710, y: 210 }
  },
  {
    id: "b-14",
    states: ["KA", "MH"],
    borderName: "Belagavi Border Region (Karnataka - Maharashtra)",
    region: "West/South",
    riverBoundary: "Krishna & Ghataprabha Rivers",
    dialect: "Southern Marathi & Kannada bilingualism",
    borderFood: "Jolada Roti, Pithla Bhakri & Kunda Sweet",
    borderMarket: "Belagavi & Nipani Agricultural Trade Market",
    tradition: "Ganesh Utsav processions, Karaga rituals, and Lavani-Yakshagana theater exchanges.",
    summary: "A famous bilingual border hub where Maharashtrian sugarcane farming and Kannada silk-cotton weaving co-exist in harmony.",
    coords: { x: 430, y: 400 }
  },
  {
    id: "b-15",
    states: ["CG", "OD"],
    borderName: "Mahanadi Basin Border (Chhattisgarh - Odisha)",
    region: "Central/East",
    riverBoundary: "Mahanadi River",
    dialect: "Laria & Sambalpuri Odia",
    borderFood: "Chila Roti, Dalma & Pakhala Bhath",
    borderMarket: "Raigarh & Jharsuguda Border Mandi",
    tradition: "Bastar Dussehra bell-metal crafts, Sambalpuri handloom sarees, and Dalkhai folk dance.",
    summary: "Dense forest and riverine border sharing rich tribal bell-metal (Dhokra) metallurgy and Sambalpuri ikat weaving traditions.",
    coords: { x: 550, y: 330 }
  },
  {
    id: "b-16",
    states: ["JK", "HP"],
    borderName: "Chamba-Padder Valley Border (Jammu & Kashmir - Himachal Pradesh)",
    region: "North",
    riverBoundary: "Chenab (Chandrabhaga) River",
    dialect: "Bhaderwahi & Chambeali Pahari",
    borderFood: "Chamba Madra, Rajma Chawal & Kahwa",
    borderMarket: "Bhaderwah & Salooni Mountain Border Haat",
    tradition: "Minjar harvest fair, Machel Mata pilgrimage yatra, and Chamba Rumal embroidery.",
    summary: "Snow-capped mountain pass border connecting Jammu's Chenab valley with Himachal's Chamba valley, renowned for Pahari embroideries.",
    coords: { x: 425, y: 105 }
  }
];

/**
 * Filter border stories by search query, state, or region.
 */
export function filterBorderStories(list = borderStories, { search = "", state = "all", region = "all" } = {}) {
  if (!Array.isArray(list)) return [];
  const query = search.trim().toLowerCase();

  return list.filter(item => {
    const matchesSearch = !query || [
      item.borderName,
      item.region,
      item.riverBoundary,
      item.dialect,
      item.borderFood,
      item.borderMarket,
      item.tradition,
      item.summary,
      ...item.states
    ].some(field => field && field.toLowerCase().includes(query));

    const matchesState = state === "all" || item.states.some(s => s.toLowerCase() === state.toLowerCase());
    const matchesRegion = region === "all" || item.region.toLowerCase() === region.toLowerCase();

    return matchesSearch && matchesState && matchesRegion;
  });
}

/**
 * Find border story by unique story ID.
 */
export function findStoryById(storyId, list = borderStories) {
  if (!storyId || !Array.isArray(list)) return undefined;
  return list.find(s => s.id.toLowerCase() === storyId.toLowerCase());
}

/**
 * Find border story connecting two specific state codes (order independent).
 */
export function findStoryByStates(stateA, stateB, list = borderStories) {
  if (!stateA || !stateB || !Array.isArray(list)) return undefined;
  const sA = stateA.toUpperCase();
  const sB = stateB.toUpperCase();

  return list.find(item => 
    (item.states.includes(sA) && item.states.includes(sB))
  );
}

/**
 * Get unique regions from border stories.
 */
export function getUniqueRegions(list = borderStories) {
  if (!Array.isArray(list)) return [];
  const set = new Set(list.map(b => b.region).filter(Boolean));
  return Array.from(set).sort();
}

/**
 * Get all unique state codes involved in border stories.
 */
export function getUniqueBorderStates(list = borderStories) {
  if (!Array.isArray(list)) return [];
  const set = new Set();
  list.forEach(b => b.states.forEach(s => set.add(s)));
  return Array.from(set).sort();
}

/* ==========================================================================
   BROWSER DOM & SVG BORDER MAP ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.borderStoriesData = borderStories;
  window.filterBorderStories = filterBorderStories;
  window.findStoryById = findStoryById;
  window.findStoryByStates = findStoryByStates;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("border-search");
    const stateFilter = document.getElementById("state-filter");
    const regionFilter = document.getElementById("region-filter");
    const resultStatus = document.getElementById("result-status");
    const btnResetFilters = document.getElementById("reset-filters");

    // SVG Map elements
    const svgMap = document.getElementById("border-map");
    const linksGroup = document.getElementById("border-links");
    const nodesGroup = document.getElementById("border-nodes");

    // Zoom Controls
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomOutBtn = document.getElementById("zoom-out");
    const zoomResetBtn = document.getElementById("zoom-reset");

    // Story Cards Grid
    const storiesGrid = document.getElementById("stories-grid");

    let currentScale = 1;
    let translateX = 0;
    let translateY = 0;
    let selectedStoryId = null;

    // Populate region filter
    if (regionFilter) {
      getUniqueRegions(borderStories).forEach(reg => {
        const opt = document.createElement("option");
        opt.value = reg.toLowerCase();
        opt.textContent = `${reg} Region`;
        regionFilter.appendChild(opt);
      });
    }

    // Populate state filter
    if (stateFilter) {
      getUniqueBorderStates(borderStories).forEach(stCode => {
        const opt = document.createElement("option");
        opt.value = stCode;
        opt.textContent = `State Code (${stCode})`;
        stateFilter.appendChild(opt);
      });
    }

    function renderMapAndStories() {
      const searchVal = searchInput ? searchInput.value : "";
      const stateVal = stateFilter ? stateFilter.value : "all";
      const regionVal = regionFilter ? regionFilter.value : "all";

      const filtered = filterBorderStories(borderStories, {
        search: searchVal,
        state: stateVal,
        region: regionVal
      });

      if (resultStatus) {
        resultStatus.textContent = `Showing ${filtered.length} of ${borderStories.length} inter-state border stories`;
      }

      // 1. Render Map Border Links & Nodes
      if (svgMap && linksGroup && nodesGroup) {
        linksGroup.innerHTML = "";
        nodesGroup.innerHTML = "";

        const activeStoryIds = new Set(filtered.map(s => s.id));

        borderStories.forEach(story => {
          const isActive = activeStoryIds.has(story.id);
          const isSelected = selectedStoryId === story.id;

          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g.setAttribute("class", `border-marker-group ${isActive ? "active" : "faded"} ${isSelected ? "selected" : ""}`);
          g.setAttribute("transform", `translate(${story.coords.x}, ${story.coords.y})`);
          g.setAttribute("tabindex", "0");
          g.setAttribute("role", "button");

          const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          ring.setAttribute("r", isSelected ? 16 : 10);
          ring.setAttribute("class", "border-ring");

          const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          dot.setAttribute("r", isSelected ? 8 : 5);
          dot.setAttribute("class", "border-core-dot");

          const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
          label.setAttribute("y", -14);
          label.setAttribute("text-anchor", "middle");
          label.setAttribute("class", "border-label");
          label.textContent = `${story.states.join("-")}`;

          g.appendChild(ring);
          g.appendChild(dot);
          g.appendChild(label);

          g.addEventListener("click", () => {
            selectedStoryId = story.id;
            renderMapAndStories();
            // Scroll to card
            const targetCard = document.getElementById(`card-${story.id}`);
            targetCard?.scrollIntoView({ behavior: "smooth", block: "center" });
          });

          nodesGroup.appendChild(g);
        });
      }

      // 2. Render Story Cards Stream
      if (storiesGrid) {
        storiesGrid.innerHTML = "";

        if (filtered.length === 0) {
          storiesGrid.innerHTML = `
            <div class="empty-story-card">
              <h3>No Border Stories Found</h3>
              <p>Try adjusting your search terms, state, or region filters.</p>
            </div>
          `;
          return;
        }

        filtered.forEach(story => {
          const isSelected = selectedStoryId === story.id;
          const card = document.createElement("article");
          card.id = `card-${story.id}`;
          card.className = `border-story-card ${isSelected ? "selected" : ""}`;
          card.innerHTML = `
            <div class="story-card-header">
              <span class="region-badge">${story.region} Region</span>
              <span class="states-badge">🤝 ${story.states.join(" & ")} Border</span>
            </div>

            <h3 class="story-title">${story.borderName}</h3>
            <p class="story-summary">${story.summary}</p>

            <div class="story-meta-grid">
              <div class="meta-item">
                <span class="meta-icon">🌊</span>
                <div>
                  <strong>River Boundary</strong>
                  <p>${story.riverBoundary}</p>
                </div>
              </div>

              <div class="meta-item">
                <span class="meta-icon">🗣️</span>
                <div>
                  <strong>Shared Dialect</strong>
                  <p>${story.dialect}</p>
                </div>
              </div>

              <div class="meta-item">
                <span class="meta-icon">🍲</span>
                <div>
                  <strong>Border Cuisine</strong>
                  <p>${story.borderFood}</p>
                </div>
              </div>

              <div class="meta-item">
                <span class="meta-icon">🛍️</span>
                <div>
                  <strong>Border Haat / Market</strong>
                  <p>${story.borderMarket}</p>
                </div>
              </div>
            </div>

            <div class="story-tradition-box">
              <strong>🎉 Shared Traditions:</strong> ${story.tradition}
            </div>
          `;

          card.addEventListener("click", () => {
            selectedStoryId = story.id;
            renderMapAndStories();
          });

          storiesGrid.appendChild(card);
        });
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

    // Reset filters
    btnResetFilters?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (stateFilter) stateFilter.value = "all";
      if (regionFilter) regionFilter.value = "all";
      selectedStoryId = null;
      renderMapAndStories();
    });

    // Event listeners
    searchInput?.addEventListener("input", renderMapAndStories);
    stateFilter?.addEventListener("change", renderMapAndStories);
    regionFilter?.addEventListener("change", renderMapAndStories);

    // Initial render
    renderMapAndStories();
  });
}
