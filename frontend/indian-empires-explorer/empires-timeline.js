/**
 * empires-timeline.js
 * "Every Major Empire of India" Interactive Timeline & Territorial Expansion Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// 1. Comprehensive Empires Dataset (All 10 Required Empires/Civilizations)
export const indianEmpiresData = [
  {
    id: "empire-ivc",
    name: "Indus Valley Civilization",
    period: "c. 3300 – 1300 BCE",
    era: "Ancient",
    region: "Northwestern & Western South Asia",
    capital: "Harappa, Mohenjo-daro, Lothal, Dholavira",
    peakAreaKm: "1,250,000 km²",
    keyRulers: ["Urban Bronze Age Councils", "Merchant & Priest Guild Leaders"],
    expansionDetails: "Spread across the fertile Indus River basin, Ghaggar-Hakra river system, Punjab, Sindh, Gujarat, Rajasthan, and Haryana. Known for grid-planned cities, subterranean drainage, standard weights, and maritime dockyards at Lothal.",
    declineFactors: "Aridification and climate change, drying up of the Sarasvati River system, shifting monsoon patterns, and decline in Mesopotamian trade routes led to de-urbanization into late Harappan agrarian cultures.",
    mapStages: {
      foundation: "M 220,120 L 290,110 L 320,180 L 250,220 Z",
      peak: "M 180,90 L 340,90 L 380,240 L 220,290 L 160,200 Z",
      decline: "M 240,160 L 310,150 L 330,220 L 260,230 Z"
    }
  },
  {
    id: "empire-mahajanapadas",
    name: "Mahajanapadas",
    period: "c. 600 – 345 BCE",
    era: "Ancient",
    region: "Indo-Gangetic Plains & Central India",
    capital: "Rajgir, Pataliputra, Ujjain, Varanasi, Vaishali",
    peakAreaKm: "1,500,000 km²",
    keyRulers: ["Bimbisara", "Ajatashatru", "Mahapadma Nanda", "Prasenajit"],
    expansionDetails: "Network of 16 great kingdoms and oligarchic republics (Gana-Sanghas) stretching from Gandhara in the northwest to Anga in the east. Second urbanization of India with iron technology, punch-marked coins, and philosophical discourses of Buddha and Mahavira.",
    declineFactors: "Consolidation of power by the Kingdom of Magadha under the Nanda Dynasty, absorbing neighboring republics through military siege and strategic alliances.",
    mapStages: {
      foundation: "M 380,160 L 520,160 L 550,220 L 410,230 Z",
      peak: "M 320,140 L 620,150 L 600,260 L 340,270 Z",
      decline: "M 440,170 L 580,170 L 570,240 L 460,240 Z"
    }
  },
  {
    id: "empire-maurya",
    name: "Maurya Empire",
    period: "c. 322 – 185 BCE",
    era: "Ancient",
    region: "Pan-South Asian Subcontinent",
    capital: "Pataliputra (modern Patna)",
    peakAreaKm: "5,000,000 km²",
    keyRulers: ["Chandragupta Maurya", "Bindusara", "Ashoka the Great"],
    expansionDetails: "First pan-Indian empire unified under Chandragupta Maurya and Chanakya (Kautilya). Extended from Afghanistan to Assam and South to Karnataka under Ashoka. Famous for Edicts of Ashoka, Dhamma diplomacy, and centralized Arthashastra administration.",
    declineFactors: "Financial exhaustion, weak successors post-Ashoka, decentralization of peripheral provinces, and the military coup of commander Pushyamitra Shunga in 185 BCE.",
    mapStages: {
      foundation: "M 350,130 L 580,140 L 520,240 L 330,220 Z",
      peak: "M 150,60 L 680,120 L 620,380 L 350,420 L 180,240 Z",
      decline: "M 400,160 L 560,170 L 530,260 L 390,240 Z"
    }
  },
  {
    id: "empire-gupta",
    name: "Gupta Empire",
    period: "c. 319 – 550 CE",
    era: "Classical",
    region: "Northern, Central & Eastern India",
    capital: "Pataliputra & Ujjain",
    peakAreaKm: "3,500,000 km²",
    keyRulers: ["Chandragupta I", "Samudragupta", "Chandragupta II (Vikramaditya)", "Skandagupta"],
    expansionDetails: "Referred to as the 'Golden Age of India'. Samudragupta's Prayagraj Prashasti documents extensive conquests. Celebrated for breakthroughs in mathematics (Aryabhata), astronomy, Sanskrit literature (Kalidasa), Ajanta cave paintings, and iron metallurgy.",
    declineFactors: "Repeated invasions by the Alchon Huns (Hunas) under Toramana and Mihirakula, internal wars of succession, and rise of feudatories like Yashodharman of Malwa.",
    mapStages: {
      foundation: "M 420,160 L 580,160 L 560,230 L 410,230 Z",
      peak: "M 250,110 L 650,130 L 600,300 L 280,310 Z",
      decline: "M 460,170 L 560,170 L 540,240 L 450,230 Z"
    }
  },
  {
    id: "empire-chalukya",
    name: "Chalukya Dynasty",
    period: "c. 543 – 753 CE & 973 – 1189 CE",
    era: "Classical / Early Medieval",
    region: "Deccan Plateau & Peninsular India",
    capital: "Badami (Vatapi) & Kalyani",
    peakAreaKm: "1,100,000 km²",
    keyRulers: ["Pulakeshin I", "Pulakeshin II", "Vikramaditya VI"],
    expansionDetails: "Dominated Deccan plateau between Narmada and Kaveri rivers. Pulakeshin II successfully halted Emperor Harshavardhana's southward expansion at the Narmada River (618 CE). Renowned for Badami cave temples and Pattadakal rock-cut temple architecture.",
    declineFactors: "Over-expansion during prolonged wars with the Pallavas of Kanchi, leading to overthrow by feudatory Rashtrakuta chieftain Dantidurga in 753 CE.",
    mapStages: {
      foundation: "M 280,260 L 410,260 L 400,340 L 270,340 Z",
      peak: "M 230,220 L 510,210 L 480,380 L 220,370 Z",
      decline: "M 300,280 L 390,280 L 380,340 L 290,340 Z"
    }
  },
  {
    id: "empire-chola",
    name: "Chola Empire",
    period: "c. 848 – 1279 CE",
    era: "Medieval",
    region: "Southern India & Maritime Southeast Asia",
    capital: "Thanjavur (Tanjore) & Gangaikonda Cholapuram",
    peakAreaKm: "1,600,000 km² (Land & Maritime Influence)",
    keyRulers: ["Vijayalaya", "Rajaraja Chola I", "Rajendra Chola I", "Kulottunga I"],
    expansionDetails: "Dominant maritime empire of South Asia. Rajaraja I built the Brihadisvara Temple; Rajendra I led naval expeditions conquering Sri Lanka, Maldives, and Srivijaya (Malayan Peninsula & Sumatra) establishing Indian Ocean trade hegemony.",
    declineFactors: "Revival of the Pandya Dynasty under Jatavarman Sundara Pandyan I and Hoysala encroachment, culminating in the dissolution of Chola rule in 1279 CE.",
    mapStages: {
      foundation: "M 380,340 L 460,340 L 450,420 L 370,410 Z",
      peak: "M 320,300 L 520,290 L 560,450 L 300,450 Z",
      decline: "M 390,360 L 450,360 L 440,410 L 380,410 Z"
    }
  },
  {
    id: "empire-vijayanagara",
    name: "Vijayanagara Empire",
    period: "c. 1336 – 1646 CE",
    era: "Medieval",
    region: "Peninsular India South of Krishna River",
    capital: "Vijayanagara (Hampi)",
    peakAreaKm: "1,200,000 km²",
    keyRulers: ["Harihara I", "Bukka Raya I", "Krishnadevaraya", "Achyuta Deva Raya"],
    expansionDetails: "Established by brothers Harihara and Bukka to protect South Indian culture and autonomy. Reached zenith under Krishnadevaraya, fostering Telugu, Kannada, and Sanskrit literature, trade with Portuguese, and grand Hampi monuments.",
    declineFactors: "Catastrophic defeat at the Battle of Talikota (1565) against united Deccan Sultanates (Bijapur, Golconda, Ahmednagar, Bidar); destruction of Hampi and decentralization into independent Nayakas.",
    mapStages: {
      foundation: "M 300,300 L 420,300 L 410,380 L 290,370 Z",
      peak: "M 250,260 L 480,260 L 460,440 L 240,430 Z",
      decline: "M 320,350 L 420,350 L 410,420 L 310,410 Z"
    }
  },
  {
    id: "empire-mughal",
    name: "Mughal Empire",
    period: "c. 1526 – 1857 CE",
    era: "Early Modern",
    region: "Pan-Indian Subcontinent",
    capital: "Agra, Fatehpur Sikri, Shahjahanabad (Delhi)",
    peakAreaKm: "4,000,000 km²",
    keyRulers: ["Babur", "Humayun", "Akbar the Great", "Jahangir", "Shah Jahan", "Aurangzeb"],
    expansionDetails: "Founded by Babur after First Battle of Panipat (1526). Expanded by Akbar through administrative Mansabdari system, revenue reforms (Todar Mal), and cultural integration. Famous for Mughal architecture (Taj Mahal, Red Fort, Fatehpur Sikri).",
    declineFactors: "Protracted 27-year Deccan Campaign under Aurangzeb, financial strain, rise of Maratha Confederacy, Nadir Shah's sack of Delhi (1739), and British East India Company territorial absorption.",
    mapStages: {
      foundation: "M 300,120 L 480,130 L 450,210 L 290,190 Z",
      peak: "M 160,50 L 660,110 L 580,400 L 300,430 L 160,220 Z",
      decline: "M 340,150 L 450,150 L 430,220 L 330,210 Z"
    }
  },
  {
    id: "empire-maratha",
    name: "Maratha Empire",
    period: "c. 1674 – 1818 CE",
    era: "Early Modern",
    region: "Central, Western & Pan-Indian Subcontinent",
    capital: "Raigad, Satara, Pune",
    peakAreaKm: "2,800,000 km²",
    keyRulers: ["Chhatrapati Shivaji Maharaj", "Sambhaji", "Peshwa Baji Rao I", "Peshwa Madhavrao I"],
    expansionDetails: "Founded by Chhatrapati Shivaji Maharaj utilizing guerrilla warfare (Ganimi Kava) and hill forts. Expanded under Peshwas into a pan-Indian Confederacy stretching from Attock (Pakistan) to Thanjavur (Tamil Nadu).",
    declineFactors: "Heavy casualties at the Third Battle of Panipat (1761) against Ahmad Shah Durrani, internal rivalry among Maratha chiefs (Gaekwad, Holkar, Scindia, Bhonsle), and defeats in three Anglo-Maratha Wars.",
    mapStages: {
      foundation: "M 220,240 L 340,240 L 320,320 L 210,310 Z",
      peak: "M 180,80 L 600,120 L 540,390 L 260,400 L 160,240 Z",
      decline: "M 240,250 L 350,250 L 330,330 L 230,320 Z"
    }
  },
  {
    id: "empire-sikh",
    name: "Sikh Empire",
    period: "c. 1799 – 1849 CE",
    era: "Early Modern",
    region: "Punjab & Northwestern Subcontinent",
    capital: "Lahore & Amritsar",
    peakAreaKm: "560,000 km²",
    keyRulers: ["Maharaja Ranjit Singh", "Kharak Singh", "Nau Nihal Singh", "Maharani Jind Kaur", "Duleep Singh"],
    expansionDetails: "Unified by Maharaja Ranjit Singh ('Sher-e-Punjab') by uniting 12 Sikh Misls. Extended from the Sutlej River to the Khyber Pass, including Punjab, Kashmir, Ladakh, and Peshawar. Known for secular governance and Fauj-i-Khas European-style army.",
    declineFactors: "Court intrigue and rapid succession instability after Ranjit Singh's death (1839), leading to British provocation and defeat in the First and Second Anglo-Sikh Wars (1845–1849).",
    mapStages: {
      foundation: "M 230,80 L 320,75 L 310,140 L 220,135 Z",
      peak: "M 170,50 L 360,45 L 340,160 L 160,150 Z",
      decline: "M 240,90 L 300,90 L 290,135 L 235,130 Z"
    }
  }
];

// Helper Query Functions

export function getEmpireById(id, list = indianEmpiresData) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(e => e.id.toLowerCase() === target || e.name.toLowerCase().includes(target));
}

export function filterEmpires(query = "", era = "all", list = indianEmpiresData) {
  if (!Array.isArray(list)) return [];
  let result = list;

  if (era && era !== "all") {
    result = result.filter(e => e.era.toLowerCase() === era.toLowerCase());
  }

  const q = query.trim().toLowerCase();
  if (q) {
    result = result.filter(e => [
      e.name,
      e.period,
      e.era,
      e.region,
      e.capital,
      e.expansionDetails,
      e.declineFactors,
      ...(e.keyRulers || [])
    ].some(field => field && field.toLowerCase().includes(q)));
  }

  return result;
}

export function getEmpireStageMapData(empireId, stage = "peak", list = indianEmpiresData) {
  const empire = getEmpireById(empireId, list);
  if (!empire || !empire.mapStages) return null;
  const validStage = ["foundation", "peak", "decline"].includes(stage.toLowerCase()) ? stage.toLowerCase() : "peak";
  return {
    empireId: empire.id,
    empireName: empire.name,
    stage: validStage,
    path: empire.mapStages[validStage]
  };
}

export function filterEmpiresByEra(era = "all", list = indianEmpiresData) {
  if (!Array.isArray(list)) return [];
  if (!era || era === "all") return list;
  return list.filter(e => e.era.toLowerCase() === era.trim().toLowerCase());
}

/* Browser DOM Engine */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.indianEmpiresData = indianEmpiresData;
  window.getEmpireById = getEmpireById;
  window.filterEmpires = filterEmpires;
  window.getEmpireStageMapData = getEmpireStageMapData;
  window.filterEmpiresByEra = filterEmpiresByEra;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM References
    const empireSelect = document.getElementById("empire-selector");
    const eraTabBtns = document.querySelectorAll(".empire-era-btn");
    const searchInput = document.getElementById("empire-search-input");
    const stageBtns = document.querySelectorAll(".map-stage-btn");
    const empiresGrid = document.getElementById("empires-cards-grid");

    // Map SVG References
    const mapSvgPath = document.getElementById("empire-svg-polygon");
    const mapEmpireTitle = document.getElementById("map-empire-title");
    const mapStageLabel = document.getElementById("map-stage-label");

    let currentSelectedEmpireId = "empire-maurya";
    let currentStage = "peak";
    let currentEra = "all";

    // 1. Update Interactive SVG Map
    function updateMap() {
      const stageData = getEmpireStageMapData(currentSelectedEmpireId, currentStage);
      const empire = getEmpireById(currentSelectedEmpireId);

      if (stageData && mapSvgPath && empire) {
        mapSvgPath.setAttribute("d", stageData.path);
        if (mapEmpireTitle) mapEmpireTitle.textContent = empire.name;
        if (mapStageLabel) {
          const stageNames = { foundation: "Foundation Phase", peak: "Apex Peak Territory", decline: "Decline Phase" };
          mapStageLabel.textContent = `${stageNames[currentStage]} (${empire.period})`;
        }
      }
    }

    // 2. Render Empire Cards
    function renderEmpireCards() {
      if (!empiresGrid) return;
      empiresGrid.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterEmpires(query, currentEra);

      if (filtered.length === 0) {
        empiresGrid.innerHTML = `
          <div class="empty-empires-card">
            <h3>No Empires Found</h3>
            <p>Try adjusting your search query (e.g. Maurya, Gupta, Chola, Akbar, Hampi, Shivaji).</p>
          </div>
        `;
        return;
      }

      filtered.forEach(empire => {
        const card = document.createElement("article");
        card.className = `empire-card ${empire.id === currentSelectedEmpireId ? "selected" : ""}`;
        card.dataset.id = empire.id;

        const rulersHtml = (empire.keyRulers || [])
          .map(r => `<span class="ruler-tag">👑 ${r}</span>`)
          .join(" ");

        card.innerHTML = `
          <div class="empire-card-top">
            <span class="era-tag">${empire.era} Era</span>
            <span class="area-badge">📐 ${empire.peakAreaKm}</span>
          </div>
          <h3>${empire.name}</h3>
          <p class="empire-period">⏳ ${empire.period}</p>
          <p class="empire-capital">🏛️ <strong>Capital:</strong> ${empire.capital}</p>

          <div class="rulers-flex-row">${rulersHtml}</div>

          <div class="expansion-info-box">
            <h4>🗺️ Expansion & Zenith</h4>
            <p>${empire.expansionDetails}</p>
          </div>

          <div class="decline-info-box">
            <h4>📉 Factors of Decline</h4>
            <p>${empire.declineFactors}</p>
          </div>

          <button class="btn-inspect-map" type="button" data-id="${empire.id}">🗺️ Inspect Territorial Map</button>
        `;

        card.querySelector(".btn-inspect-map")?.addEventListener("click", () => {
          currentSelectedEmpireId = empire.id;
          if (empireSelect) empireSelect.value = empire.id;
          document.querySelectorAll(".empire-card").forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");
          updateMap();
          document.getElementById("empire-map-container")?.scrollIntoView({ behavior: "smooth" });
        });

        empiresGrid.appendChild(card);
      });
    }

    // Populate Selector Dropdown
    if (empireSelect) {
      empireSelect.innerHTML = "";
      indianEmpiresData.forEach(emp => {
        const opt = document.createElement("option");
        opt.value = emp.id;
        opt.textContent = emp.name;
        if (emp.id === currentSelectedEmpireId) opt.selected = true;
        empireSelect.appendChild(opt);
      });

      empireSelect.addEventListener("change", (e) => {
        currentSelectedEmpireId = e.target.value;
        updateMap();
        renderEmpireCards();
      });
    }

    // Era Buttons Handler
    eraTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        eraTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentEra = btn.dataset.era;
        renderEmpireCards();
      });
    });

    // Stage Buttons Handler (Foundation vs Peak vs Decline)
    stageBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        stageBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentStage = btn.dataset.stage;
        updateMap();
      });
    });

    searchInput?.addEventListener("input", renderEmpireCards);

    // Initial Render
    updateMap();
    renderEmpireCards();
  });
}
