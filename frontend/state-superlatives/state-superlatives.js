document.addEventListener("DOMContentLoaded", () => {
  const records = [
  {
    "id": "meghalaya-nohkalikai",
    "state": "Meghalaya",
    "region": "Northeast",
    "category": "Waterfalls",
    "title": "Nohkalikai Falls",
    "superlative": "Among India's tallest plunge waterfalls",
    "value": "Around 340 m",
    "location": "Cherrapunji",
    "summary": "A dramatic plunge waterfall near Cherrapunji, surrounded by misty cliffs and monsoon forests.",
    "why": "Meghalaya is famous for high rainfall, limestone landscapes, and spectacular waterfalls.",
    "image": "assets/travel_forests.png"
  },
  {
    "id": "west-bengal-sundarbans",
    "state": "West Bengal",
    "region": "East",
    "category": "Forests",
    "title": "Sundarbans Mangrove Forest",
    "superlative": "Largest mangrove forest region associated with India",
    "value": "Ganga-Brahmaputra delta mangroves",
    "location": "Sundarbans",
    "summary": "A vast mangrove ecosystem known for tidal waterways, biodiversity, and the Royal Bengal Tiger.",
    "why": "It represents one of India's most important coastal and delta ecosystems.",
    "image": "assets/travel_islands.png"
  },
  {
    "id": "tamil-nadu-brihadeeswarar",
    "state": "Tamil Nadu",
    "region": "South",
    "category": "Temples",
    "title": "Brihadeeswarar Temple",
    "superlative": "One of India's grandest Chola-era temple landmarks",
    "value": "Built in the 11th century",
    "location": "Thanjavur",
    "summary": "A monumental granite temple known for Chola architecture, sculpture, and scale.",
    "why": "Tamil Nadu's temple towns preserve some of India's most influential Dravidian architectural traditions.",
    "image": "assets/heritage_temples.png"
  },
  {
    "id": "kerala-muzhappilangad",
    "state": "Kerala",
    "region": "South",
    "category": "Beaches",
    "title": "Muzhappilangad Drive-in Beach",
    "superlative": "India's notable drive-in beach experience",
    "value": "Long driveable beach stretch",
    "location": "Kannur",
    "summary": "A coastal stretch where visitors can drive along firm sand beside the Arabian Sea.",
    "why": "Kerala blends beaches, backwaters, coastal food, and tropical landscapes.",
    "image": "assets/travel_beaches.png"
  },
  {
    "id": "assam-tea-gardens",
    "state": "Assam",
    "region": "Northeast",
    "category": "Tea",
    "title": "Assam Tea Belt",
    "superlative": "One of the world's largest tea-growing regions",
    "value": "Major tea-producing landscape",
    "location": "Brahmaputra Valley",
    "summary": "Rolling tea gardens define Assam's economy, landscape, and cultural identity.",
    "why": "Assam tea is globally recognised for strong flavour and large-scale production.",
    "image": "assets/travel_forests.png"
  },
  {
    "id": "rajasthan-thar",
    "state": "Rajasthan",
    "region": "West",
    "category": "Deserts",
    "title": "Thar Desert",
    "superlative": "India's largest desert landscape",
    "value": "Great Indian Desert",
    "location": "Western Rajasthan",
    "summary": "A vast desert region with dunes, forts, folk music, crafts, and dryland settlements.",
    "why": "Rajasthan's desert culture shaped distinctive architecture, water systems, textiles, and festivals.",
    "image": "assets/travel_deserts.png"
  },
  {
    "id": "gujarat-rann",
    "state": "Gujarat",
    "region": "West",
    "category": "Deserts",
    "title": "Great Rann of Kutch",
    "superlative": "One of the world's largest salt desert landscapes",
    "value": "Seasonal salt marsh",
    "location": "Kutch",
    "summary": "A white salt landscape famous for seasonal festivals, crafts, and surreal horizons.",
    "why": "Kutch combines desert ecology, craft communities, salt flats, and borderland culture.",
    "image": "assets/travel_deserts.png"
  },
  {
    "id": "andaman-radhanagar",
    "state": "Andaman & Nicobar Islands",
    "region": "Islands",
    "category": "Beaches",
    "title": "Radhanagar Beach",
    "superlative": "One of India's most celebrated island beaches",
    "value": "Turquoise water and white sand",
    "location": "Havelock Island",
    "summary": "A scenic beach known for clear water, soft sand, and tropical island surroundings.",
    "why": "The islands are famous for marine biodiversity, coral reefs, beaches, and forests.",
    "image": "assets/travel_islands.png"
  },
  {
    "id": "odisha-chilika",
    "state": "Odisha",
    "region": "East",
    "category": "Lakes",
    "title": "Chilika Lake",
    "superlative": "India's largest coastal lagoon",
    "value": "Brackish water lagoon",
    "location": "Odisha coast",
    "summary": "A lagoon famous for migratory birds, fishing communities, and wetland biodiversity.",
    "why": "Chilika is a major ecological and cultural landmark on India's eastern coast.",
    "image": "assets/travel_islands.png"
  },
  {
    "id": "sikkim-kanchenjunga",
    "state": "Sikkim",
    "region": "Northeast",
    "category": "Mountains",
    "title": "Kangchenjunga",
    "superlative": "India's highest mountain peak associated with Sikkim",
    "value": "8,586 m",
    "location": "Sikkim Himalaya",
    "summary": "A sacred Himalayan peak visible from many parts of Sikkim and surrounding regions.",
    "why": "Sikkim's identity is deeply connected with Himalayan ecology, monasteries, and mountain culture.",
    "image": "assets/travel_mountains.png"
  },
  {
    "id": "uttarakhand-valley-flowers",
    "state": "Uttarakhand",
    "region": "North",
    "category": "Nature",
    "title": "Valley of Flowers",
    "superlative": "One of India's most famous alpine flower valleys",
    "value": "High-altitude floral landscape",
    "location": "Chamoli",
    "summary": "A Himalayan valley known for seasonal wildflowers, meadows, and mountain biodiversity.",
    "why": "Uttarakhand's high-altitude landscapes combine pilgrimage, ecology, and mountain trekking.",
    "image": "assets/travel_mountains.png"
  },
  {
    "id": "karnataka-jog",
    "state": "Karnataka",
    "region": "South",
    "category": "Waterfalls",
    "title": "Jog Falls",
    "superlative": "One of India's most iconic high waterfalls",
    "value": "Sharavathi River drop",
    "location": "Shivamogga",
    "summary": "A powerful waterfall where the Sharavathi River drops through four major cascades.",
    "why": "Karnataka's Western Ghats contain forests, rivers, waterfalls, and heritage towns.",
    "image": "assets/travel_forests.png"
  },
  {
    "id": "maharashtra-lonar",
    "state": "Maharashtra",
    "region": "West",
    "category": "Lakes",
    "title": "Lonar Crater Lake",
    "superlative": "Unique meteor-impact crater lake in basalt rock",
    "value": "Ancient impact crater",
    "location": "Buldhana",
    "summary": "A rare geological lake formed in Deccan basalt, surrounded by temples and ecological zones.",
    "why": "It is one of India's most distinctive geological heritage sites.",
    "image": "assets/travel_hidden.png"
  },
  {
    "id": "ladakh-high-altitude",
    "state": "Ladakh",
    "region": "North",
    "category": "Mountains",
    "title": "High-altitude Cold Desert",
    "superlative": "India's iconic cold desert region",
    "value": "High Himalayan plateau",
    "location": "Ladakh",
    "summary": "A mountain desert landscape known for monasteries, passes, lakes, and stark high-altitude terrain.",
    "why": "Ladakh is unique for its ecology, architecture, Buddhist culture, and trans-Himalayan routes.",
    "image": "assets/travel_mountains.png"
  },
  {
    "id": "telangana-ramappa",
    "state": "Telangana",
    "region": "South",
    "category": "Temples",
    "title": "Ramappa Temple",
    "superlative": "UNESCO-recognised Kakatiya temple landmark",
    "value": "13th-century temple",
    "location": "Palampet",
    "summary": "A temple known for sculptural detail, floating bricks, and Kakatiya-era craftsmanship.",
    "why": "Telangana preserves Deccan forts, temple art, festivals, and Hyderabad's heritage.",
    "image": "assets/heritage_temples.png"
  }
];
  const journeyKey = "incredible-india-state-superlatives-journey";
  const grid = document.getElementById("super-grid");
  const searchInput = document.getElementById("super-search");
  const categoryFilter = document.getElementById("category-filter");
  const regionFilter = document.getElementById("region-filter");
  const emptyState = document.getElementById("empty-state");
  let journey = readJourney();
  let showJourney = false;

  const escapeHtml = (value) => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const categories = [...new Set(records.map(item => item.category))].sort();
  const regions = [...new Set(records.map(item => item.region))].sort();
  const states = [...new Set(records.map(item => item.state))];

  function readJourney() { try { const parsed = JSON.parse(localStorage.getItem(journeyKey) || "[]"); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
  function saveJourney() { localStorage.setItem(journeyKey, JSON.stringify(journey)); document.getElementById("journey-count").textContent = journey.length; }
  function searchableText(item) { return [item.state,item.region,item.category,item.title,item.superlative,item.value,item.location,item.summary,item.why].join(" ").toLowerCase(); }
  const indexed = records.map(item => ({ ...item, search: searchableText(item) }));
  function populateFilters() {
    categories.forEach(category => { const option = document.createElement("option"); option.value = category; option.textContent = category; categoryFilter.append(option); });
    regions.forEach(region => { const option = document.createElement("option"); option.value = region; option.textContent = region; regionFilter.append(option); });
  }
  function isSaved(id) { return journey.includes(id); }
  function toggleJourney(id) { journey = isSaved(id) ? journey.filter(item => item !== id) : [...journey, id]; saveJourney(); renderCards(); }
  function filteredRecords() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const region = regionFilter.value;
    return indexed
      .filter(item => !query || item.search.includes(query))
      .filter(item => category === "all" || item.category === category)
      .filter(item => region === "all" || item.region === region)
      .filter(item => !showJourney || isSaved(item.id));
  }
  function cardHtml(item) {
    const saved = isSaved(item.id);
    return `<article class="super-card" id="${escapeHtml(item.id)}" data-search-item data-compare-item data-recent-item data-deeplink-card data-category="${escapeHtml(item.category)}" data-region="${escapeHtml(item.region)}" data-compare-title="${escapeHtml(item.title)}" data-compare-image="${escapeHtml(item.image)}" data-compare-category="${escapeHtml(item.category)}" data-compare-region="${escapeHtml(item.region)}" data-compare-description="${escapeHtml(item.superlative)}"><div class="super-media"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" onerror="this.src='assets/hero_banner.png'"><span class="category-badge">${escapeHtml(item.category)}</span><span class="region-badge">${escapeHtml(item.region)}</span></div><div class="super-body"><div class="super-top"><h3>${escapeHtml(item.title)}</h3><button class="journey-btn ${saved ? "is-saved" : ""}" type="button" data-journey-id="${escapeHtml(item.id)}" aria-pressed="${saved}">${saved ? "★ Journey" : "☆ Journey"}</button></div><p class="superlative">${escapeHtml(item.superlative)}</p><div class="super-meta"><div class="meta-chip"><span>State</span><strong>${escapeHtml(item.state)}</strong></div><div class="meta-chip"><span>Value</span><strong>${escapeHtml(item.value)}</strong></div><div class="meta-chip"><span>Location</span><strong>${escapeHtml(item.location)}</strong></div><div class="meta-chip"><span>Category</span><strong>${escapeHtml(item.category)}</strong></div></div><p class="super-summary">${escapeHtml(item.summary)}</p><p class="super-why"><strong>Why it matters:</strong> ${escapeHtml(item.why)}</p></div></article>`;
  }
  function renderCards() {
    const items = filteredRecords();
    grid.innerHTML = items.map(cardHtml).join("");
    emptyState.classList.toggle("visible", items.length === 0);
    grid.hidden = items.length === 0;
    document.querySelectorAll("[data-journey-id]").forEach(button => button.addEventListener("click", () => toggleJourney(button.dataset.journeyId)));
  }
  function randomRecord() {
    const item = indexed[Math.floor(Math.random() * indexed.length)];
    searchInput.value = item.title;
    categoryFilter.value = "all";
    regionFilter.value = "all";
    showJourney = false;
    renderCards();
    document.getElementById("super-dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function resetFilters() {
    searchInput.value = "";
    categoryFilter.value = "all";
    regionFilter.value = "all";
    showJourney = false;
    renderCards();
    searchInput.focus();
  }
  populateFilters();
  document.getElementById("record-count").textContent = records.length;
  document.getElementById("state-count").textContent = states.length;
  document.getElementById("journey-count").textContent = journey.length;
  renderCards();

  searchInput.addEventListener("input", () => { showJourney = false; renderCards(); });
  categoryFilter.addEventListener("change", renderCards);
  regionFilter.addEventListener("change", renderCards);
  document.getElementById("random-record").addEventListener("click", randomRecord);
  document.getElementById("show-journey").addEventListener("click", () => { showJourney = !showJourney; renderCards(); });
  document.getElementById("reset-filters").addEventListener("click", resetFilters);
  document.getElementById("empty-reset").addEventListener("click", resetFilters);
  window.StateSuperlativesExplorer = { records: () => [...records], journey: () => [...journey], random: randomRecord };
});
