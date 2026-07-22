document.addEventListener("DOMContentLoaded", () => {
  const stateSymbols = [
  {
    "id": "andhra-pradesh",
    "state": "Andhra Pradesh",
    "region": "South",
    "animal": "Blackbuck",
    "bird": "Rose-ringed Parakeet",
    "flower": "Water Lily",
    "tree": "Neem",
    "fruit": "Mango",
    "dance": "Kuchipudi",
    "sport": "Kabaddi",
    "dress": "Dhoti, kurta, saree",
    "cuisine": "Pulihora, Gongura Pachadi",
    "script": "Telugu",
    "personality": "Pingali Venkayya",
    "fact": "Known for classical Kuchipudi, temple heritage, coastal cuisine, and the Telugu language tradition.",
    "image": "assets/culture.png"
  },
  {
    "id": "assam",
    "state": "Assam",
    "region": "Northeast",
    "animal": "One-horned Rhinoceros",
    "bird": "White-winged Wood Duck",
    "flower": "Foxtail Orchid",
    "tree": "Hollong",
    "fruit": "Kaji Nemu",
    "dance": "Bihu",
    "sport": "Football",
    "dress": "Mekhela Chador",
    "cuisine": "Khar, Masor Tenga",
    "script": "Assamese",
    "personality": "Srimanta Sankardev",
    "fact": "Assam is strongly associated with tea, Bihu, riverine culture, and wildlife heritage.",
    "image": "assets/travel_forests.png"
  },
  {
    "id": "bihar",
    "state": "Bihar",
    "region": "East",
    "animal": "Gaur",
    "bird": "House Sparrow",
    "flower": "Marigold",
    "tree": "Peepal",
    "fruit": "Litchi",
    "dance": "Jat-Jatin",
    "sport": "Kabaddi",
    "dress": "Dhoti-kurta, saree",
    "cuisine": "Litti Chokha",
    "script": "Devanagari",
    "personality": "Dr. Rajendra Prasad",
    "fact": "Bihar has deep links with ancient universities, Buddhist heritage, and folk traditions.",
    "image": "assets/heritage_ruins.png"
  },
  {
    "id": "gujarat",
    "state": "Gujarat",
    "region": "West",
    "animal": "Asiatic Lion",
    "bird": "Greater Flamingo",
    "flower": "Marigold",
    "tree": "Banyan",
    "fruit": "Chikoo",
    "dance": "Garba",
    "sport": "Cricket",
    "dress": "Chaniya Choli, Kediyu",
    "cuisine": "Dhokla, Undhiyu",
    "script": "Gujarati",
    "personality": "Sardar Vallabhbhai Patel",
    "fact": "Gujarat is known for Garba, coastal trade history, stepwells, crafts, and the Asiatic lion.",
    "image": "assets/travel_deserts.png"
  },
  {
    "id": "karnataka",
    "state": "Karnataka",
    "region": "South",
    "animal": "Indian Elephant",
    "bird": "Indian Roller",
    "flower": "Lotus",
    "tree": "Sandalwood",
    "fruit": "Mango",
    "dance": "Yakshagana",
    "sport": "Cricket",
    "dress": "Mysore silk saree, panche",
    "cuisine": "Bisi Bele Bath, Mysore Pak",
    "script": "Kannada",
    "personality": "Sir M. Visvesvaraya",
    "fact": "Karnataka blends technology, sandalwood, Hampi heritage, classical music, and rich cuisine.",
    "image": "assets/heritage_temples.png"
  },
  {
    "id": "kerala",
    "state": "Kerala",
    "region": "South",
    "animal": "Indian Elephant",
    "bird": "Great Hornbill",
    "flower": "Golden Shower",
    "tree": "Coconut",
    "fruit": "Jackfruit",
    "dance": "Kathakali",
    "sport": "Football",
    "dress": "Mundu, Kasavu saree",
    "cuisine": "Appam, Sadya",
    "script": "Malayalam",
    "personality": "Sree Narayana Guru",
    "fact": "Kerala is associated with backwaters, Ayurveda, Kathakali, coconut landscapes, and literacy.",
    "image": "assets/travel_islands.png"
  },
  {
    "id": "maharashtra",
    "state": "Maharashtra",
    "region": "West",
    "animal": "Indian Giant Squirrel",
    "bird": "Yellow-footed Green Pigeon",
    "flower": "Jarul",
    "tree": "Mango",
    "fruit": "Mango",
    "dance": "Lavani",
    "sport": "Cricket",
    "dress": "Nauvari saree, pheta",
    "cuisine": "Puran Poli, Misal Pav",
    "script": "Devanagari",
    "personality": "Chhatrapati Shivaji Maharaj",
    "fact": "Maharashtra is known for forts, Marathi culture, cinema, theatre, and varied regional food.",
    "image": "assets/heritage_forts.png"
  },
  {
    "id": "odisha",
    "state": "Odisha",
    "region": "East",
    "animal": "Sambar Deer",
    "bird": "Indian Roller",
    "flower": "Ashoka",
    "tree": "Sacred Fig",
    "fruit": "Mango",
    "dance": "Odissi",
    "sport": "Hockey",
    "dress": "Sambalpuri saree, dhoti",
    "cuisine": "Dalma, Pakhala",
    "script": "Odia",
    "personality": "Biju Patnaik",
    "fact": "Odisha is famous for temple architecture, Odissi dance, coastal traditions, and hockey culture.",
    "image": "assets/heritage_temples.png"
  },
  {
    "id": "punjab",
    "state": "Punjab",
    "region": "North",
    "animal": "Blackbuck",
    "bird": "Northern Goshawk",
    "flower": "Gladiolus",
    "tree": "Tahli",
    "fruit": "Kinnow",
    "dance": "Bhangra",
    "sport": "Hockey",
    "dress": "Salwar kameez, kurta-pajama",
    "cuisine": "Makki di Roti, Sarson da Saag",
    "script": "Gurmukhi",
    "personality": "Bhagat Singh",
    "fact": "Punjab is known for farming, music, Sikh heritage, Bhangra, and robust food traditions.",
    "image": "assets/culture.png"
  },
  {
    "id": "rajasthan",
    "state": "Rajasthan",
    "region": "West",
    "animal": "Chinkara",
    "bird": "Great Indian Bustard",
    "flower": "Rohida",
    "tree": "Khejri",
    "fruit": "Sangri",
    "dance": "Ghoomar",
    "sport": "Polo",
    "dress": "Ghagra, angarkha, safa",
    "cuisine": "Dal Baati Churma",
    "script": "Devanagari",
    "personality": "Maharana Pratap",
    "fact": "Rajasthan is famous for forts, deserts, stepwells, folk music, textiles, and royal history.",
    "image": "assets/travel_deserts.png"
  },
  {
    "id": "tamil-nadu",
    "state": "Tamil Nadu",
    "region": "South",
    "animal": "Nilgiri Tahr",
    "bird": "Emerald Dove",
    "flower": "Glory Lily",
    "tree": "Palm Tree",
    "fruit": "Jackfruit",
    "dance": "Bharatanatyam",
    "sport": "Kabaddi",
    "dress": "Veshti, Kanchipuram saree",
    "cuisine": "Idli, Sambar, Pongal",
    "script": "Tamil",
    "personality": "Subramania Bharati",
    "fact": "Tamil Nadu has a strong classical language tradition, temple architecture, music, and dance heritage.",
    "image": "assets/heritage_temples.png"
  },
  {
    "id": "telangana",
    "state": "Telangana",
    "region": "South",
    "animal": "Spotted Deer",
    "bird": "Indian Roller",
    "flower": "Tangedu",
    "tree": "Jammi",
    "fruit": "Mango",
    "dance": "Perini Sivatandavam",
    "sport": "Kabaddi",
    "dress": "Saree, sherwani",
    "cuisine": "Hyderabadi Biryani",
    "script": "Telugu",
    "personality": "P. V. Narasimha Rao",
    "fact": "Telangana blends Deccan heritage, Telugu culture, forts, festivals, and Hyderabad’s cuisine.",
    "image": "assets/culture.png"
  },
  {
    "id": "uttar-pradesh",
    "state": "Uttar Pradesh",
    "region": "North",
    "animal": "Swamp Deer",
    "bird": "Sarus Crane",
    "flower": "Palash",
    "tree": "Ashoka",
    "fruit": "Mango",
    "dance": "Kathak",
    "sport": "Hockey",
    "dress": "Kurta-pajama, saree",
    "cuisine": "Awadhi Biryani, Kachori",
    "script": "Devanagari",
    "personality": "Rani Lakshmibai",
    "fact": "Uttar Pradesh is central to Indian history, literature, spirituality, music, and cuisine.",
    "image": "assets/heritage_temples.png"
  },
  {
    "id": "west-bengal",
    "state": "West Bengal",
    "region": "East",
    "animal": "Fishing Cat",
    "bird": "White-throated Kingfisher",
    "flower": "Night-flowering Jasmine",
    "tree": "Chatim",
    "fruit": "Mango",
    "dance": "Chhau, Rabindra Nritya",
    "sport": "Football",
    "dress": "Tant saree, dhoti-kurta",
    "cuisine": "Machher Jhol, Rasgulla",
    "script": "Bengali",
    "personality": "Rabindranath Tagore",
    "fact": "West Bengal is known for literature, music, Durga Puja, riverine culture, and intellectual history.",
    "image": "assets/culture.png"
  }
];
  const journeyKey = "incredible-india-state-symbols-journey";
  const categories = ["animal","bird","flower","tree","fruit","dance","sport","dress","cuisine","script","personality"];
  const labels = { animal:"Animal", bird:"Bird", flower:"Flower", tree:"Tree", fruit:"Fruit", dance:"Dance", sport:"Sport", dress:"Dress", cuisine:"Cuisine", script:"Script", personality:"Personality" };
  const grid = document.getElementById("symbols-grid");
  const searchInput = document.getElementById("symbols-search");
  const regionFilter = document.getElementById("region-filter");
  const categoryFilter = document.getElementById("category-filter");
  const emptyState = document.getElementById("empty-state");
  let journey = readJourney();
  let showJourney = false;

  const escapeHtml = (value) => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const regions = [...new Set(stateSymbols.map(item => item.region))].sort();

  function readJourney() { try { const parsed = JSON.parse(localStorage.getItem(journeyKey) || "[]"); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
  function saveJourney() { localStorage.setItem(journeyKey, JSON.stringify(journey)); document.getElementById("journey-count").textContent = journey.length; }
  function searchableText(item) { return [item.state,item.region,item.fact,...categories.map(key => item[key])].join(" ").toLowerCase(); }
  const indexed = stateSymbols.map(item => ({ ...item, search: searchableText(item) }));

  function populateFilters() {
    regions.forEach(region => { const option = document.createElement("option"); option.value = region; option.textContent = region; regionFilter.append(option); });
    categories.forEach(key => { const option = document.createElement("option"); option.value = key; option.textContent = labels[key]; categoryFilter.append(option); });
  }
  function isSaved(id) { return journey.includes(id); }
  function toggleJourney(id) { journey = isSaved(id) ? journey.filter(item => item !== id) : [...journey, id]; saveJourney(); renderCards(); }
  function filteredCards() {
    const query = searchInput.value.trim().toLowerCase();
    const region = regionFilter.value;
    return indexed
      .filter(item => !query || item.search.includes(query))
      .filter(item => region === "all" || item.region === region)
      .filter(item => !showJourney || isSaved(item.id));
  }
  function cardHtml(item) {
    const selected = categoryFilter.value;
    const chips = categories.map(key => `<div class="symbol-chip ${selected === key ? "is-highlight" : ""}" data-compare-field="${escapeHtml(key)}"><span>${escapeHtml(labels[key])}</span><strong>${escapeHtml(item[key])}</strong></div>`).join("");
    const saved = isSaved(item.id);
    return `<article class="symbol-card" id="${escapeHtml(item.id)}" data-search-item data-compare-item data-recent-item data-deeplink-card data-category="${escapeHtml(item.region)}" data-region="${escapeHtml(item.region)}" data-compare-title="${escapeHtml(item.state)}" data-compare-image="${escapeHtml(item.image)}" data-compare-region="${escapeHtml(item.region)}" data-compare-description="${escapeHtml(item.fact)}"><div class="symbol-media"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.state)} symbols" onerror="this.src='assets/hero_banner.png'"><span class="region-badge">${escapeHtml(item.region)}</span></div><div class="symbol-body"><div class="symbol-top"><h3>${escapeHtml(item.state)}</h3><button class="journey-btn ${saved ? "is-saved" : ""}" type="button" data-journey-id="${escapeHtml(item.id)}" aria-pressed="${saved}">${saved ? "★ Journey" : "☆ Journey"}</button></div><p class="symbol-fact">${escapeHtml(item.fact)}</p><div class="symbol-list">${chips}</div></div></article>`;
  }
  function renderCards() {
    const cards = filteredCards();
    grid.innerHTML = cards.map(cardHtml).join("");
    emptyState.classList.toggle("visible", cards.length === 0);
    grid.hidden = cards.length === 0;
    document.querySelectorAll("[data-journey-id]").forEach(button => button.addEventListener("click", () => toggleJourney(button.dataset.journeyId)));
  }
  function randomState() {
    const item = indexed[Math.floor(Math.random() * indexed.length)];
    searchInput.value = item.state;
    regionFilter.value = "all";
    showJourney = false;
    renderCards();
    document.getElementById("symbols-dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function resetFilters() {
    searchInput.value = "";
    regionFilter.value = "all";
    categoryFilter.value = "all";
    showJourney = false;
    renderCards();
    searchInput.focus();
  }

  populateFilters();
  document.getElementById("state-count").textContent = stateSymbols.length;
  document.getElementById("journey-count").textContent = journey.length;
  renderCards();

  searchInput.addEventListener("input", () => { showJourney = false; renderCards(); });
  regionFilter.addEventListener("change", renderCards);
  categoryFilter.addEventListener("change", renderCards);
  document.getElementById("random-state").addEventListener("click", randomState);
  document.getElementById("show-journey").addEventListener("click", () => { showJourney = !showJourney; renderCards(); });
  document.getElementById("reset-filters").addEventListener("click", resetFilters);
  document.getElementById("empty-reset").addEventListener("click", resetFilters);

  window.StateSymbolsExplorer = { states: () => [...stateSymbols], journey: () => [...journey], random: randomState };
});
