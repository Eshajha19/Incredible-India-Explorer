/**
 * excavations.js
 * Archaeological Excavation Explorer - Data & Application Logic
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

export const excavationsData = [
  {
    id: "dholavira",
    title: "Dholavira (Harappan Citadel)",
    state: "Gujarat",
    stateCode: "gj",
    location: "Khadir Bet, Kutch",
    period: "Indus Valley Civilisation",
    discoveryYear: 1967,
    archaeologistOrAgency: "J.P. Joshi & R.S. Bisht (ASI)",
    artifactsDiscovered: "10-Symbol Wooden Signboard, Stone Reservoirs, Cascading Water Channels, Bead Workshops",
    image: "assets/travel_hidden.png",
    description: "A UNESCO World Heritage site and one of the five largest Indus Valley metropolises, famous for its sophisticated urban planning and stone masonry.",
    significance: "Features a unique 3-part city division (Citadel, Middle Town, Lower Town) and an unmatched rainwater harvesting system of 16 interconnected stone reservoirs.",
    tags: ["dholavira", "kutch", "gujarat", "indus valley", "harappan", "unesco", "signboard", "reservoirs"]
  },
  {
    id: "lothal",
    title: "Lothal (World's Oldest Tidal Dockyard)",
    state: "Gujarat",
    stateCode: "gj",
    location: "Bhal Region, Ahmedabad",
    period: "Indus Valley Civilisation",
    discoveryYear: 1954,
    archaeologistOrAgency: "S.R. Rao (ASI)",
    artifactsDiscovered: "Artificial Dockyard, Persian Gulf Seals, Copper Elephant Tokens, Bead Factory, Fire Altars",
    image: "assets/West_India.png",
    description: "The world's oldest known artificial tidal dockyard, connecting the Harappan empire to ancient maritime trade routes across the Arabian Sea and Mesopotamia.",
    significance: "Demonstrated advanced hydraulic engineering with lock-gates to maintain water levels during low tides, enabling bead and textile export.",
    tags: ["lothal", "ahmedabad", "gujarat", "dockyard", "indus valley", "maritime", "trade", "beads"]
  },
  {
    id: "rakhigarhi",
    title: "Rakhigarhi (Largest IVC Metropolis)",
    state: "Haryana",
    stateCode: "hr",
    location: "Hisar District",
    period: "Indus Valley Civilisation",
    discoveryYear: 1963,
    archaeologistOrAgency: "ASI & Deccan College (Amarendra Nath / V.S. Shinde)",
    artifactsDiscovered: "Ancient DNA Samples, Gold Jewellery Hoard, Terracotta Toys, Mud-Brick Granaries, Seals",
    image: "assets/North_India.png",
    description: "Spanning over 350 hectares across 7 mounds, Rakhigarhi is the largest known Indus Valley Civilisation site in the Indian subcontinent.",
    significance: "Recent DNA research on 4,500-year-old skeletal remains at Mound 7 provided groundbreaking insights into the indigenous genetic ancestry of South Asia.",
    tags: ["rakhigarhi", "hisar", "haryana", "largest ivc site", "dna", "indus valley", "granary"]
  },
  {
    id: "kalibangan",
    title: "Kalibangan (Earliest Ploughed Field)",
    state: "Rajasthan",
    stateCode: "rj",
    location: "Hanumangarh District",
    period: "Indus Valley Civilisation",
    discoveryYear: 1953,
    archaeologistOrAgency: "A. Ghosh, B.B. Lal & B.K. Thapar (ASI)",
    artifactsDiscovered: "Ploughed Agriculture Grid, Fire Altars, Cylinder Seals, Terracotta Bull Figurines",
    image: "assets/travel_deserts.png",
    description: "Located on the banks of the dried-up Ghaggar (Saraswati) river, Kalibangan displays both Pre-Harappan and Mature Harappan cultural phases.",
    significance: "Discovered the world's earliest documented ploughed agricultural field grid (c. 2800 BCE) showing dual crop sowing patterns.",
    tags: ["kalibangan", "rajasthan", "hanumangarh", "ploughed field", "fire altars", "ghaggar", "indus valley"]
  },
  {
    id: "banawali",
    title: "Banawali",
    state: "Haryana",
    stateCode: "hr",
    location: "Fatehabad District",
    period: "Indus Valley Civilisation",
    discoveryYear: 1974,
    archaeologistOrAgency: "R.S. Bisht (ASI)",
    artifactsDiscovered: "Terracotta Plow Model, Barley Grains, Touchstone with Gold Streaks, Steatite Seals",
    image: "assets/Central_India.png",
    description: "A well-fortified Harappan town built along the ancient Saraswati valley, exhibiting radial street layout planning.",
    significance: "Yielded rare evidence of a complete terracotta toy plow model, confirming advanced oxen-plow agricultural methods.",
    tags: ["banawali", "fatehabad", "haryana", "plow", "indus valley", "barley", "radial town"]
  },
  {
    id: "ropar",
    title: "Ropar (Rupnagar)",
    state: "Punjab",
    stateCode: "pb",
    location: "Rupnagar",
    period: "Indus Valley Civilisation",
    discoveryYear: 1953,
    archaeologistOrAgency: "Y.D. Sharma (ASI)",
    artifactsDiscovered: "Dog Burial with Human Master, Steatite Seal, Copper Axes, Painted Grey Ware Pottery",
    image: "assets/Golden_Temple.png",
    description: "The first Harappan site excavated in independent India post-1947, located on the banks of the Sutlej River.",
    significance: "Revealed a continuous cultural sequence across six historical periods from Harappan times through PGW to medieval eras.",
    tags: ["ropar", "rupnagar", "punjab", "sutlej", "indus valley", "dog burial", "first site"]
  },
  {
    id: "surkotada",
    title: "Surkotada Citadel",
    state: "Gujarat",
    stateCode: "gj",
    location: "Rapar, Kutch",
    period: "Indus Valley Civilisation",
    discoveryYear: 1964,
    archaeologistOrAgency: "J.P. Joshi (ASI)",
    artifactsDiscovered: "Fortified Stone Wall Gateways, Equid (Horse) Bone Fragments, Red Ware Vessels",
    image: "assets/West_India.png",
    description: "A fortified Harappan outpost featuring massive stone-rubble walls and ramparts overlooking Kutch trade routes.",
    significance: "Archaeological discovery of equid skeletal remains ignited significant scientific interest regarding early horse presence in Harappan contexts.",
    tags: ["surkotada", "kutch", "gujarat", "citadel", "horse bones", "indus valley", "fortified"]
  },
  {
    id: "keezhadi",
    title: "Keezhadi (Sangam Era Metropolis)",
    state: "Tamil Nadu",
    stateCode: "tn",
    location: "Sivagangai District",
    period: "Iron Age & Sangam Era",
    discoveryYear: 2014,
    archaeologistOrAgency: "Amarnath Ramakrishna (ASI) & Tamil Nadu Archaeology Department",
    artifactsDiscovered: "Tamil-Brahmi Potsherds, Weaving Spindles, Brick Drainage Pipelines, Agate & Carnelian Beads",
    image: "assets/South_India.png",
    description: "A major Sangam Era urban industrial settlement on the banks of the Vaigai River, push back Sangam literacy timeline to 600 BCE.",
    significance: "Carbon dating confirmed active urbanization, high literacy rates, and advanced textile dyeing industry in ancient Tamilakam contemporaneous with Northern Mahajanapadas.",
    tags: ["keezhadi", "keeladi", "tamil nadu", "sangam era", "vaigai", "tamil brahmi", "weaving"]
  },
  {
    id: "arikamedu",
    title: "Arikamedu (Indo-Roman Port)",
    state: "Puducherry",
    stateCode: "py",
    location: "Ariyankuppam",
    period: "Early Historic & Classical Era",
    discoveryYear: 1945,
    archaeologistOrAgency: "Sir Mortimer Wheeler & J.M. Casal",
    artifactsDiscovered: "Roman Amphorae Jars, Arretine Ware, Roman Coins, Glass Bead Workshop, Intaglios",
    image: "assets/travel_beaches.png",
    description: "An ancient Indo-Roman trading port and manufacturing centre mentioned in Greco-Roman records as Poduke.",
    significance: "Provided indisputable archaeological proof of flourishing 1st century BCE trade networks between the Roman Empire and South India.",
    tags: ["arikamedu", "puducherry", "roman trade", "amphorae", "poduke", "early historic", "beads"]
  },
  {
    id: "adichanallur",
    title: "Adichanallur Urn Burials",
    state: "Tamil Nadu",
    stateCode: "tn",
    location: "Thoothukudi District",
    period: "Iron Age & Sangam Era",
    discoveryYear: 1876,
    archaeologistOrAgency: "Dr. Jagor, Alexander Rea & ASI",
    artifactsDiscovered: "Gold Diadems / Crowns, Bronze Animal Figurines, Iron Swords & Spears, Burial Urns (Tali)",
    image: "assets/KanchipuramSilk.png",
    description: "One of South India's largest Megalithic / Iron Age urn burial sites located along the Thamirabarani River valley.",
    significance: "Features thousands of earthen burial urns containing skeletons, bronze tridents, gold headbands, and iron implements dating back to 900-600 BCE.",
    tags: ["adichanallur", "thoothukudi", "tamil nadu", "urn burial", "megalithic", "gold crown", "iron age"]
  },
  {
    id: "pattanam-muziris",
    title: "Pattanam (Ancient Muziris Port)",
    state: "Kerala",
    stateCode: "kl",
    location: "Ernakulam District",
    period: "Early Historic & Classical Era",
    discoveryYear: 2007,
    archaeologistOrAgency: "Kerala Council for Historical Research (P.J. Cherian)",
    artifactsDiscovered: "Ancient Dugout Canoe (6m), Roman Terra Sigillata, Chera Coinage, Frankincense Resins",
    image: "assets/travel_islands.png",
    description: "Excavation site identified with the legendary lost spice port of Muziris near the mouth of the Periyar River.",
    significance: "Unearthed a 2,000-year-old wooden canoe, wharf structures, and trade artifacts from Rome, Arabia, Egypt, and China.",
    tags: ["pattanam", "muziris", "kerala", "periyar", "canoe", "roman coins", "spice trade"]
  },
  {
    id: "kodumanal",
    title: "Kodumanal (Wootz Steel & Gemstone Hub)",
    state: "Tamil Nadu",
    stateCode: "tn",
    location: "Erode District",
    period: "Iron Age & Sangam Era",
    discoveryYear: 1985,
    archaeologistOrAgency: "Tamil University (Y. Subbarayalu & K. Rajan)",
    artifactsDiscovered: "Crucible Furnaces for Wootz Steel, Carnelian Gem Workshops, Roman Coin Hoards",
    image: "assets/South_India.png",
    description: "An ancient industrial town along the Noyyal River celebrated in Sangam literature as Kodumanam for gemstone cutting and metallurgy.",
    significance: "Discovered ancient high-temperature crucible furnaces used to forge famous Wootz steel exported across the Greco-Roman world.",
    tags: ["kodumanal", "erode", "tamil nadu", "wootz steel", "crucible", "gemstones", "sangam"]
  },
  {
    id: "sinauli",
    title: "Sinauli (Bronze Age Chariots & Royal Tombs)",
    state: "Uttar Pradesh",
    stateCode: "up",
    location: "Baghpat District",
    period: "Iron Age & Sangam Era",
    discoveryYear: 2005,
    archaeologistOrAgency: "S.K. Manjul (ASI)",
    artifactsDiscovered: "Copper-Sheathed Horse Chariots, Antenna Swords, Copper Helmets, Wooden Coffin Burials",
    image: "assets/Taj_Mahal.png",
    description: "A late Bronze Age burial ground near the Yamuna river that unveiled revolutionary evidence of sophisticated warrior culture.",
    significance: "Discovered India's first full-sized solid-wheeled copper-embellished war chariots, decorated wooden coffins, and bronze helmets dating to 1900-1800 BCE.",
    tags: ["sinauli", "baghpat", "uttar pradesh", "chariot", "copper age", "warrior", "asi"]
  },
  {
    id: "sarnath",
    title: "Sarnath Excavations (Lion Capital Site)",
    state: "Uttar Pradesh",
    stateCode: "up",
    location: "Varanasi",
    period: "Early Historic & Classical Era",
    discoveryYear: 1904,
    archaeologistOrAgency: "F.O. Oertel & John Marshall (ASI)",
    artifactsDiscovered: "Ashoka Lion Capital (National Emblem), Dhamek Stupa, Bodhisattva Statues, Viharas",
    image: "assets/ancient_india_illustration.png",
    description: "The sacred site of Deer Park (Isipatana) where Gautama Buddha delivered his first sermon (Dharmachakra Pravartana).",
    significance: "Excavated the pristine 4-lion polished sandstone pillar capital of Emperor Ashoka that became the official National Emblem of India.",
    tags: ["sarnath", "varanasi", "uttar pradesh", "lion capital", "ashoka", "buddhist", "dhamek"]
  },
  {
    id: "sanchi",
    title: "Sanchi Stupa Excavations",
    state: "Madhya Pradesh",
    stateCode: "mp",
    location: "Raisen District",
    period: "Early Historic & Classical Era",
    discoveryYear: 1912,
    archaeologistOrAgency: "Sir John Marshall & General Taylor (ASI)",
    artifactsDiscovered: "Great Stupa 1, Carved Stone Toranas, Relic Caskets of Sariputra & Maudgalyayana",
    image: "assets/Central_India.png",
    description: "A UNESCO World Heritage complex housing the oldest stone structures in India, commissioned originally by Emperor Ashoka.",
    significance: "Systematically restored by Sir John Marshall between 1912 and 1919, preserving masterwork gateway relief sculptures depicting Jataka tales.",
    tags: ["sanchi", "raisen", "madhya pradesh", "stupa", "torana", "ashoka", "unesco", "marshall"]
  },
  {
    id: "nalanda",
    title: "Nalanda Mahavihara University",
    state: "Bihar",
    stateCode: "br",
    location: "Nalanda District",
    period: "Early Historic & Classical Era",
    discoveryYear: 1915,
    archaeologistOrAgency: "D.B. Spooner & Hirananda Sastri (ASI)",
    artifactsDiscovered: "11 Brick Monasteries, Stupa Site 3, Bronze Deities, Clay Sealings of Nalanda Monk Assembly",
    image: "assets/East_India.png",
    description: "The world's first international residential university, active from 5th to 12th century CE under Gupta and Pala patronage.",
    significance: "Excavated 14 hectares of red-brick monastery quadrangles, shrines, lecture halls, and thousands of bronze, stone, and terracotta Buddhist sculptures.",
    tags: ["nalanda", "bihar", "monastery", "university", "gupta", "unesco", "buddhist"]
  },
  {
    id: "sisupalgarh",
    title: "Sisupalgarh Fortified City",
    state: "Odisha",
    stateCode: "od",
    location: "Khurda / Bhubaneswar",
    period: "Early Historic & Classical Era",
    discoveryYear: 1948,
    archaeologistOrAgency: "B.B. Lal & Monica L. Smith (ASI)",
    artifactsDiscovered: "8 Monolithic Gateway Towers, Moat Network, Roman Coins, Glass Bangles, Clay Bullae",
    image: "assets/East_India.png",
    description: "An ancient planned square fortified city believed to be Kalinganagara, capital of King Kharavela in 3rd century BCE.",
    significance: "Features a precise 1.2 km x 1.2 km square layout with defensive moat, 8 grand stone portals, and pillared hall ruins.",
    tags: ["sisupalgarh", "bhubaneswar", "odisha", "kalinga", "kharavela", "fortified city", "bb lal"]
  },
  {
    id: "hastinapur",
    title: "Hastinapur Excavations",
    state: "Uttar Pradesh",
    stateCode: "up",
    location: "Meerut District",
    period: "Iron Age & Sangam Era",
    discoveryYear: 1950,
    archaeologistOrAgency: "B.B. Lal (ASI)",
    artifactsDiscovered: "Painted Grey Ware (PGW) Vessels, Flood Wash Erosion Layer, Terracotta Figurines",
    image: "assets/Taj_Mahal.png",
    description: "Excavations conducted to correlate traditional Mahabharata epic geography with archaeological stratigraphy.",
    significance: "Identified PGW culture layers and a distinct Ganges flood wash layer matching Purana accounts of capital shifting to Kaushambi.",
    tags: ["hastinapur", "meerut", "uttar pradesh", "mahabharata", "pgw", "bb lal", "ganges flood"]
  },
  {
    id: "inamgaon",
    title: "Inamgaon Farming Village",
    state: "Maharashtra",
    stateCode: "mh",
    location: "Pune District",
    period: "Neolithic & Chalcolithic Era",
    discoveryYear: 1968,
    archaeologistOrAgency: "H.D. Sankalia, M.K. Dhavalikar & Z.D. Ansari (Deccan College)",
    artifactsDiscovered: "Rectangular Mud Houses, Clay Female Figurines, Four-Legged Burial Urns, Granaries",
    image: "assets/Chhatrapati_Shivaji.png",
    description: "One of the most intensively excavated Chalcolithic agricultural settlements of the Malwa and Jorwe cultures (1400-700 BCE).",
    significance: "Provided comprehensive insights into early farming, irrigation canals, social stratification, and house construction techniques in western India.",
    tags: ["inamgaon", "pune", "maharashtra", "jorwe culture", "chalcolithic", "deccan college"]
  },
  {
    id: "bhimbetka",
    title: "Bhimbetka Rock Shelters",
    state: "Madhya Pradesh",
    stateCode: "mp",
    location: "Raisen District",
    period: "Prehistoric & Paleolithic Era",
    discoveryYear: 1957,
    archaeologistOrAgency: "V.S. Wakankar (Vikram University)",
    artifactsDiscovered: "Prehistoric Cave Paintings (750+ Shelters), Acheulian Cleavers, Microlith Blades",
    image: "assets/Central_India.png",
    description: "A UNESCO World Heritage site featuring stone age rock shelters spanning Paleolithic, Mesolithic, and Chalcolithic eras.",
    significance: "Preserves continuous human occupational deposits and vivid cave wall paintings depicting hunting, dancing, and rituals dating back over 30,000 years.",
    tags: ["bhimbetka", "raisen", "madhya pradesh", "rock art", "paleolithic", "mesolithic", "unesco"]
  },
  {
    id: "attirampakkam",
    title: "Attirampakkam Hominin Site",
    state: "Tamil Nadu",
    stateCode: "tn",
    location: "Tiruvallur District",
    period: "Prehistoric & Paleolithic Era",
    discoveryYear: 1863,
    archaeologistOrAgency: "Robert Bruce Foote & Shanti Pappu (Sharma Centre for Heritage Education)",
    artifactsDiscovered: "1.5 Million-Year-Old Acheulian Handaxes, Cleavers, Levallois Flake Tools, Animal Footprints",
    image: "assets/South_India.png",
    description: "One of South Asia's oldest Lower Paleolithic prehistoric sites, located in the Kortallayar River basin.",
    significance: "Luminescence dating confirmed continuous hominin presence and Acheulian stone tool production dating back 1.5 million years.",
    tags: ["attirampakkam", "tiruvallur", "tamil nadu", "acheulian", "handaxe", "1.5 million years", "paleolithic"]
  },
  {
    id: "nevasa",
    title: "Nevasa Tool Site",
    state: "Maharashtra",
    stateCode: "mh",
    location: "Ahmednagar District",
    period: "Prehistoric & Paleolithic Era",
    discoveryYear: 1954,
    archaeologistOrAgency: "H.D. Sankalia (Deccan College)",
    artifactsDiscovered: "'Nevasian' Jasper & Agate Flake Tools, Fossilized Bovine Bones, Chalcolithic Copper Bangles",
    image: "assets/Warlitr.png",
    description: "A multi-period site on the Pravara River that became the type-site for Middle Paleolithic stone tool industry in India.",
    significance: "Established the defining characteristics of the Middle Paleolithic 'Nevasian' tool tradition using fine-grained siliceous raw materials.",
    tags: ["nevasa", "ahmednagar", "maharashtra", "nevasian", "middle paleolithic", "pravara", "sankalia"]
  },
  {
    id: "burzahom",
    title: "Burzahom Pit-Dwellings",
    state: "Jammu and Kashmir",
    stateCode: "jk",
    location: "Srinagar",
    period: "Neolithic & Chalcolithic Era",
    discoveryYear: 1935,
    archaeologistOrAgency: "Helmut de Terra, T.T. Paterson & T.N. Khazanchi (ASI)",
    artifactsDiscovered: "Underground Circular Pit Dwellings, Polished Stone Celts, Dog & Human Co-Burials, Harpoons",
    image: "assets/Manalileh.png",
    description: "A UNESCO tentative site near Dal Lake representing the unique northern Neolithic culture of the Kashmir Valley (3000-1000 BCE).",
    significance: "Revealed subterranean mud-plastered pit dwellings built to endure cold winters, and ritual burials of domestic dogs alongside masters.",
    tags: ["burzahom", "srinagar", "jammu and kashmir", "pit dwellings", "neolithic", "dog burial"]
  },
  {
    id: "koldihwa",
    title: "Koldihwa & Mahagara (Early Rice Site)",
    state: "Uttar Pradesh",
    stateCode: "up",
    location: "Belan Valley, Prayagraj",
    period: "Neolithic & Chalcolithic Era",
    discoveryYear: 1970,
    archaeologistOrAgency: "G.R. Sharma (University of Allahabad)",
    artifactsDiscovered: "Cord-Marked Pottery, Cultivated Rice Husk Impressions (Oryza sativa), Cattle Kraals",
    image: "assets/Taj_Mahal.png",
    description: "Neolithic farming sites in the Belan River valley providing crucial evidence on early agricultural origins in Northern India.",
    significance: "Yielded pottery sherds embedded with cultivated rice husks dated between 6500 and 5000 BCE, proving early independent rice domestication.",
    tags: ["koldihwa", "mahagara", "prayagraj", "uttar pradesh", "rice domestication", "neolithic", "belan valley"]
  },
  {
    id: "bodh-gaya",
    title: "Bodh Gaya Temple Excavations",
    state: "Bihar",
    stateCode: "br",
    location: "Gaya District",
    period: "Early Historic & Classical Era",
    discoveryYear: 1881,
    archaeologistOrAgency: "Sir Alexander Cunningham & Rajendralala Mitra (ASI)",
    artifactsDiscovered: "Diamond Throne (Vajrasana), Ashokan Sandstone Railings, Votive Stupas, Plaster Statues",
    image: "assets/East_India.png",
    description: "The UNESCO World Heritage site where Siddhartha Gautama attained Enlightenment under the Bodhi Tree.",
    significance: "Cunningham's 1881 excavation exposed the original 3rd century BCE Ashokan Vajrasana (Diamond Throne) slab and carved sandstone railings.",
    tags: ["bodh gaya", "gaya", "bihar", "buddha", "vajrasana", "ashoka", "unesco", "cunningham"]
  },
  {
    id: "gufkral",
    title: "Gufkral ('Cave of the Potter')",
    state: "Jammu and Kashmir",
    stateCode: "jk",
    location: "Pulwama District",
    period: "Neolithic & Chalcolithic Era",
    discoveryYear: 1981,
    archaeologistOrAgency: "A.K. Sharma (ASI)",
    artifactsDiscovered: "Polished Stone Celts, Bone Needles, Micro-beads, Pre-pottery Hearth Chambers",
    image: "assets/Manalileh.png",
    description: "Located near Tral in Kashmir, Gufkral (meaning 'Cave of the Potter' in Kashmiri) spans Pre-Pottery Neolithic to Megalithic eras.",
    significance: "Provided rare stratigraphical proof of the transition from pre-pottery foraging to pottery-making agricultural village life in Kashmir.",
    tags: ["gufkral", "pulwama", "jammu and kashmir", "potter cave", "neolithic", "tral", "asi"]
  }
];

/**
 * Filter excavations based on search query, state, and period.
 */
export function filterExcavations(items, { search = "", state = "all", period = "all" } = {}) {
  if (!Array.isArray(items)) return [];

  const query = search.trim().toLowerCase();

  return items.filter(item => {
    // Search query match
    const matchesSearch = !query || [
      item.title,
      item.location,
      item.state,
      item.period,
      item.archaeologistOrAgency,
      item.artifactsDiscovered,
      item.description,
      item.significance,
      ...(item.tags || [])
    ].some(field => field && field.toLowerCase().includes(query));

    // State filter match
    const matchesState = state === "all" || item.stateCode === state || item.state.toLowerCase() === state.toLowerCase();

    // Period filter match
    const matchesPeriod = period === "all" || item.period.toLowerCase() === period.toLowerCase();

    return matchesSearch && matchesState && matchesPeriod;
  });
}

/**
 * Sort excavations by discovery year, era, or name.
 */
export function sortExcavations(items, sortBy = "year-asc") {
  if (!Array.isArray(items)) return [];
  const list = [...items];

  switch (sortBy) {
    case "year-asc":
      return list.sort((a, b) => a.discoveryYear - b.discoveryYear);
    case "year-desc":
      return list.sort((a, b) => b.discoveryYear - a.discoveryYear);
    case "name-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "period-asc":
      return list.sort((a, b) => a.period.localeCompare(b.period));
    default:
      return list;
  }
}

/**
 * Group excavations by period.
 */
export function groupExcavationsByPeriod(items) {
  if (!Array.isArray(items)) return {};

  return items.reduce((acc, item) => {
    const period = item.period || "General Period";
    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(item);
    return acc;
  }, {});
}

/**
 * Group excavations by state.
 */
export function groupExcavationsByState(items) {
  if (!Array.isArray(items)) return {};

  return items.reduce((acc, item) => {
    const state = item.state || "Unknown State";
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(item);
    return acc;
  }, {});
}

/**
 * Extract unique state names & codes sorted alphabetically.
 */
export function getUniqueStates(items = excavationsData) {
  const map = new Map();
  items.forEach(i => {
    if (i.state && i.stateCode) {
      map.set(i.stateCode, i.state);
    }
  });
  return Array.from(map.entries())
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Extract unique periods sorted alphabetically.
 */
export function getUniquePeriods(items = excavationsData) {
  const set = new Set(items.map(i => i.period).filter(Boolean));
  return Array.from(set).sort();
}

/* ==========================================================================
   BROWSER DOM INTERACTION CODE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.excavationsData = excavationsData;
  window.filterExcavations = filterExcavations;
  window.sortExcavations = sortExcavations;
  window.groupExcavationsByPeriod = groupExcavationsByPeriod;
  window.groupExcavationsByState = groupExcavationsByState;
  window.getUniqueStates = getUniqueStates;
  window.getUniquePeriods = getUniquePeriods;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("excavation-search");
    const stateFilter = document.getElementById("state-filter");
    const periodFilter = document.getElementById("period-filter");
    const sortBySelect = document.getElementById("sort-by");
    const gridContainer = document.getElementById("excavations-grid");
    const resultStatus = document.getElementById("result-status");
    const emptyState = document.getElementById("empty-state");
    const clearFiltersBtn = document.getElementById("clear-filters");
    const emptyResetBtn = document.getElementById("empty-reset");

    // Modal elements
    const excavationModal = document.getElementById("excavation-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalState = document.getElementById("modal-state");
    const modalPeriod = document.getElementById("modal-period");
    const modalLocation = document.getElementById("modal-location");
    const modalYear = document.getElementById("modal-year");
    const modalAgency = document.getElementById("modal-agency");
    const modalArtifacts = document.getElementById("modal-artifacts");
    const modalDescription = document.getElementById("modal-description");
    const modalSignificance = document.getElementById("modal-significance");
    const modalImage = document.getElementById("modal-image");
    const modalPrevBtn = document.getElementById("modal-prev-btn");
    const modalNextBtn = document.getElementById("modal-next-btn");

    // Timeline buttons
    const timelineButtons = document.querySelectorAll(".timeline-button");
    const timelineEra = document.getElementById("timeline-era");
    const timelineTitle = document.getElementById("timeline-title");
    const timelineText = document.getElementById("timeline-text");

    const timelineEras = {
      prehistoric: {
        era: "1.5 Mya - 10,000 BCE",
        title: "Prehistoric & Paleolithic Discoveries",
        text: "Featuring Attirampakkam (1.5 million-year-old Acheulian stone axes), Bhimbetka Rock Shelters (30,000-year-old cave wall paintings), and Nevasa Middle Paleolithic tool sites across river basins."
      },
      neolithic: {
        era: "7000 - 2000 BCE",
        title: "Neolithic & Chalcolithic Settlements",
        text: "Early agricultural evolution evidenced by Koldihwa (c. 6500 BCE rice cultivation husks), Burzahom Kashmiri underground pit dwellings, and Inamgaon Jorwe culture farming villages."
      },
      indusvalley: {
        era: "2600 - 1900 BCE",
        title: "Indus Valley Civilisation Metropolises",
        text: "Monumental urban planning showcased at Dholavira (stone reservoirs & signboard), Lothal (world's oldest tidal dockyard), Rakhigarhi (350+ ha metropolis), and Kalibangan (earliest ploughed field)."
      },
      ironage: {
        era: "1000 - 300 BCE",
        title: "Iron Age, Sangam Era & Mahabharata Sites",
        text: "Ancient industrial and warrior hubs including Sinauli (copper war chariots & helmets), Keezhadi (Vaigai river Sangam town), Adichanallur (gold diadems & urn burials), and Hastinapur (PGW layers)."
      },
      earlyhistoric: {
        era: "300 BCE - 1200 CE",
        title: "Early Historic & Classical Civilisation",
        text: "Classical imperial and monastic excavation marvels including Sarnath (Ashoka Lion Capital), Sanchi (gateway toranas), Nalanda Mahavihara (11 brick monasteries), and Arikamedu (Indo-Roman port)."
      }
    };

    let currentFilteredItems = [...excavationsData];
    let currentItemIndex = -1;

    // Populate State dropdown
    if (stateFilter) {
      const states = getUniqueStates();
      states.forEach(({ code, name }) => {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = name;
        stateFilter.appendChild(opt);
      });
    }

    // Populate Period dropdown
    if (periodFilter) {
      const periods = getUniquePeriods();
      periods.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.toLowerCase();
        opt.textContent = p;
        periodFilter.appendChild(opt);
      });
    }

    function renderCards() {
      if (!gridContainer) return;

      const searchVal = searchInput ? searchInput.value : "";
      const stateVal = stateFilter ? stateFilter.value : "all";
      const periodVal = periodFilter ? periodFilter.value : "all";
      const sortVal = sortBySelect ? sortBySelect.value : "year-asc";

      let filtered = filterExcavations(excavationsData, {
        search: searchVal,
        state: stateVal,
        period: periodVal
      });

      currentFilteredItems = sortExcavations(filtered, sortVal);

      // Update counter status
      if (resultStatus) {
        resultStatus.textContent = `Showing ${currentFilteredItems.length} of ${excavationsData.length} archaeological excavation sites`;
      }

      // Handle empty state
      if (currentFilteredItems.length === 0) {
        gridContainer.innerHTML = "";
        if (emptyState) emptyState.hidden = false;
        return;
      } else {
        if (emptyState) emptyState.hidden = true;
      }

      gridContainer.innerHTML = "";
      const cardsWrapper = document.createElement("div");
      cardsWrapper.className = "excavations-cards-grid";
      currentFilteredItems.forEach((item, idx) => {
        cardsWrapper.appendChild(createExcavationCard(item, idx));
      });
      gridContainer.appendChild(cardsWrapper);
    }

    function createExcavationCard(item, globalIdx) {
      const card = document.createElement("article");
      card.className = "excavation-card";
      card.setAttribute("data-id", item.id);
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='assets/travel_hidden.png'">
          <span class="card-badge state-badge">${item.state}</span>
          <span class="card-badge period-badge">${item.period}</span>
        </div>
        <div class="card-body">
          <div class="card-location">📍 ${item.location} · Discovered: ${item.discoveryYear}</div>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-agency">🔍 <strong>Excavated by:</strong> ${item.archaeologistOrAgency}</p>
          <div class="card-artifacts"><strong>🏺 Key Finds:</strong> ${item.artifactsDiscovered}</div>
          <p class="card-description">${item.description}</p>
          <button type="button" class="btn-view-details" data-index="${globalIdx}">
            View Archaeological Details →
          </button>
        </div>
      `;

      const viewBtn = card.querySelector(".btn-view-details");
      viewBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        openExcavationModal(globalIdx);
      });

      card.addEventListener("click", () => {
        openExcavationModal(globalIdx);
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openExcavationModal(globalIdx);
        }
      });

      return card;
    }

    function openExcavationModal(index) {
      if (index < 0 || index >= currentFilteredItems.length) return;
      currentItemIndex = index;
      const item = currentFilteredItems[index];

      if (modalTitle) modalTitle.textContent = item.title;
      if (modalState) modalState.textContent = item.state;
      if (modalPeriod) modalPeriod.textContent = item.period;
      if (modalLocation) modalLocation.textContent = item.location;
      if (modalYear) modalYear.textContent = item.discoveryYear;
      if (modalAgency) modalAgency.textContent = item.archaeologistOrAgency;
      if (modalArtifacts) modalArtifacts.textContent = item.artifactsDiscovered;
      if (modalDescription) modalDescription.textContent = item.description;
      if (modalSignificance) modalSignificance.textContent = item.significance;
      if (modalImage) {
        modalImage.src = item.image;
        modalImage.alt = item.title;
      }

      if (excavationModal) {
        excavationModal.hidden = false;
        excavationModal.classList.add("active");
        document.body.classList.add("modal-open");
        modalCloseBtn?.focus();
      }
    }

    function closeExcavationModal() {
      if (excavationModal) {
        excavationModal.hidden = true;
        excavationModal.classList.remove("active");
        document.body.classList.remove("modal-open");
      }
    }

    function resetFilters() {
      if (searchInput) searchInput.value = "";
      if (stateFilter) stateFilter.value = "all";
      if (periodFilter) periodFilter.value = "all";
      if (sortBySelect) sortBySelect.value = "year-asc";
      renderCards();
    }

    // Timeline tab handlers
    timelineButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        timelineButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.dataset.key;
        const eraInfo = timelineEras[key];
        if (eraInfo) {
          if (timelineEra) timelineEra.textContent = eraInfo.era;
          if (timelineTitle) timelineTitle.textContent = eraInfo.title;
          if (timelineText) timelineText.textContent = eraInfo.text;
        }
      });
    });

    // Event Listeners
    searchInput?.addEventListener("input", renderCards);
    stateFilter?.addEventListener("change", renderCards);
    periodFilter?.addEventListener("change", renderCards);
    sortBySelect?.addEventListener("change", renderCards);
    clearFiltersBtn?.addEventListener("click", resetFilters);
    emptyResetBtn?.addEventListener("click", resetFilters);

    modalCloseBtn?.addEventListener("click", closeExcavationModal);

    modalPrevBtn?.addEventListener("click", () => {
      if (currentItemIndex > 0) openExcavationModal(currentItemIndex - 1);
    });

    modalNextBtn?.addEventListener("click", () => {
      if (currentItemIndex < currentFilteredItems.length - 1) openExcavationModal(currentItemIndex + 1);
    });

    excavationModal?.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-close-modal") || e.target === excavationModal) {
        closeExcavationModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (excavationModal && !excavationModal.hidden) {
        if (e.key === "Escape") closeExcavationModal();
        if (e.key === "ArrowLeft" && currentItemIndex > 0) openExcavationModal(currentItemIndex - 1);
        if (e.key === "ArrowRight" && currentItemIndex < currentFilteredItems.length - 1) openExcavationModal(currentItemIndex + 1);
      }
    });

    // Initial render
    renderCards();
  });
}
