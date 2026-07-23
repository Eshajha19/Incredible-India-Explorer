document.addEventListener("DOMContentLoaded", () => {
  const dayStates = [
  {
    "id": "rajasthan",
    "state": "Rajasthan",
    "region": "West",
    "theme": "Desert heritage, bazaars, forts, folk music",
    "image": "assets/travel_deserts.png",
    "weather": "Dry mornings, warm afternoons, cool evenings in desert areas",
    "timeline": [
      [
        "05:30",
        "Sunrise at the fort",
        "Start the day with a golden view over sandstone forts and old city lanes.",
        "daily life"
      ],
      [
        "07:00",
        "Breakfast",
        "Enjoy poha, kachori, or masala chai before markets open.",
        "food"
      ],
      [
        "09:00",
        "Craft bazaar walk",
        "Explore block prints, blue pottery, jewellery, and leather craft stalls.",
        "markets"
      ],
      [
        "11:00",
        "Heritage visit",
        "Visit a palace, haveli, stepwell, or museum to understand royal and desert history.",
        "heritage"
      ],
      [
        "13:00",
        "Lunch",
        "Try dal baati churma, gatte ki sabzi, and bajra roti.",
        "food"
      ],
      [
        "15:00",
        "Desert transport",
        "Experience camel carts, jeeps, or local buses connecting towns and villages.",
        "transport"
      ],
      [
        "17:00",
        "Folk performance",
        "Listen to Manganiyar music or watch Ghoomar-inspired performances.",
        "tradition"
      ],
      [
        "20:00",
        "Night market",
        "Shop for textiles and enjoy sweets under decorated bazaar lights.",
        "markets"
      ]
    ]
  },
  {
    "id": "kerala",
    "state": "Kerala",
    "region": "South",
    "theme": "Backwaters, coconut groves, Ayurveda, Kathakali",
    "image": "assets/travel_islands.png",
    "weather": "Humid tropical weather with lush greenery and monsoon freshness",
    "timeline": [
      [
        "05:45",
        "Backwater morning",
        "Begin with quiet canals, fishing boats, and coconut-lined views.",
        "daily life"
      ],
      [
        "07:30",
        "Breakfast",
        "Eat appam with stew, puttu-kadala, or idiyappam.",
        "food"
      ],
      [
        "09:30",
        "Local ferry ride",
        "Use ferries or auto-rickshaws to move between towns and waterways.",
        "transport"
      ],
      [
        "11:00",
        "Spice and coir visit",
        "See pepper, cardamom, coir work, or small village craft activity.",
        "markets"
      ],
      [
        "13:00",
        "Sadya-style lunch",
        "Enjoy rice, sambar, avial, thoran, pickles, and payasam.",
        "food"
      ],
      [
        "15:30",
        "Ayurveda and nature",
        "Explore medicinal plant gardens, beach paths, or hill plantations.",
        "tradition"
      ],
      [
        "18:00",
        "Kathakali evening",
        "Watch classical theatre makeup, music, and expressive storytelling.",
        "festival"
      ],
      [
        "20:30",
        "Coastal dinner",
        "End with coconut-based curries and peaceful waterfront views.",
        "food"
      ]
    ]
  },
  {
    "id": "punjab",
    "state": "Punjab",
    "region": "North",
    "theme": "Farms, gurudwaras, food, music, and community",
    "image": "assets/culture.png",
    "weather": "Cold winters, hot summers, and bright agricultural landscapes",
    "timeline": [
      [
        "05:00",
        "Gurudwara visit",
        "Start with prayers, kirtan, and community atmosphere.",
        "tradition"
      ],
      [
        "07:30",
        "Hearty breakfast",
        "Eat paratha with curd, butter, pickle, and lassi.",
        "food"
      ],
      [
        "09:00",
        "Farm morning",
        "Visit wheat or mustard fields and learn about rural routines.",
        "daily life"
      ],
      [
        "11:30",
        "Town transport",
        "Move by tractor, bus, bike, or shared auto between villages and towns.",
        "transport"
      ],
      [
        "13:30",
        "Langar or dhaba lunch",
        "Experience community dining or classic Punjabi dhaba food.",
        "food"
      ],
      [
        "16:00",
        "Market time",
        "Explore phulkari, juttis, spices, and agricultural marketplaces.",
        "markets"
      ],
      [
        "18:30",
        "Bhangra beats",
        "Enjoy folk music, dhol rhythms, and festive energy.",
        "festival"
      ],
      [
        "21:00",
        "Family dinner",
        "End with sarson da saag, makki di roti, and warm conversations.",
        "food"
      ]
    ]
  },
  {
    "id": "west-bengal",
    "state": "West Bengal",
    "region": "East",
    "theme": "Literature, river ghats, sweets, art, Durga Puja culture",
    "image": "assets/culture.png",
    "weather": "Humid plains, river breeze, monsoon clouds, and festive autumn",
    "timeline": [
      [
        "06:00",
        "Tea and newspaper",
        "Begin with cha, adda, and morning conversations.",
        "daily life"
      ],
      [
        "08:00",
        "Breakfast",
        "Try luchi-alur dom, muri, or kochuri.",
        "food"
      ],
      [
        "10:00",
        "Tram or local train",
        "Experience city transport or suburban rail movement.",
        "transport"
      ],
      [
        "12:00",
        "Book lane and art stop",
        "Browse books, old printing shops, galleries, or college streets.",
        "markets"
      ],
      [
        "14:00",
        "Bengali lunch",
        "Eat rice, dal, vegetables, fish curry, and chutney.",
        "food"
      ],
      [
        "16:30",
        "River ghat walk",
        "Visit a Hooghly ghat or a neighbourhood cultural space.",
        "daily life"
      ],
      [
        "18:30",
        "Music or theatre",
        "Listen to Rabindra Sangeet, folk music, or theatre practice.",
        "tradition"
      ],
      [
        "21:00",
        "Sweets finish",
        "End with rasgulla, sandesh, or mishti doi.",
        "food"
      ]
    ]
  },
  {
    "id": "tamil-nadu",
    "state": "Tamil Nadu",
    "region": "South",
    "theme": "Temples, classical arts, Tamil language, filter coffee",
    "image": "assets/heritage_temples.png",
    "weather": "Warm coastal plains, hill breezes in the Nilgiris, and monsoon variation",
    "timeline": [
      [
        "05:30",
        "Temple bells",
        "Start with early temple rituals, kolam designs, and devotional music.",
        "tradition"
      ],
      [
        "07:30",
        "Breakfast",
        "Eat idli, dosa, pongal, chutney, sambar, and filter coffee.",
        "food"
      ],
      [
        "09:30",
        "Local commute",
        "Use buses, suburban trains, bikes, or autos through busy towns.",
        "transport"
      ],
      [
        "11:00",
        "Craft and textile stop",
        "Explore bronze work, Kanchipuram silk, or temple architecture details.",
        "markets"
      ],
      [
        "13:00",
        "Banana leaf lunch",
        "Enjoy rice, sambar, rasam, poriyal, curd, and appalam.",
        "food"
      ],
      [
        "15:30",
        "Language and literature",
        "Visit a library, museum, inscription site, or cultural centre.",
        "heritage"
      ],
      [
        "18:00",
        "Bharatanatyam evening",
        "Watch classical dance, Carnatic music, or local festival events.",
        "festival"
      ],
      [
        "20:30",
        "Street food",
        "Try kothu parotta, sundal, or regional snacks.",
        "food"
      ]
    ]
  },
  {
    "id": "assam",
    "state": "Assam",
    "region": "Northeast",
    "theme": "Tea gardens, Brahmaputra, Bihu, wildlife",
    "image": "assets/travel_forests.png",
    "weather": "Humid, green, riverine, and monsoon-rich",
    "timeline": [
      [
        "05:30",
        "Tea garden sunrise",
        "Begin among tea bushes, mist, and early plucking routines.",
        "daily life"
      ],
      [
        "07:30",
        "Breakfast",
        "Try pitha, rice-based snacks, and strong Assam tea.",
        "food"
      ],
      [
        "09:30",
        "River crossing",
        "Use ferries, buses, or shared vehicles around Brahmaputra towns.",
        "transport"
      ],
      [
        "11:00",
        "Silk and craft visit",
        "Explore muga silk, bamboo craft, or local weaving traditions.",
        "markets"
      ],
      [
        "13:00",
        "Assamese lunch",
        "Eat rice, khar, tenga curry, leafy greens, and chutneys.",
        "food"
      ],
      [
        "15:30",
        "Wildlife window",
        "Learn about rhinos, wetlands, birds, and forest conservation.",
        "nature"
      ],
      [
        "18:00",
        "Bihu rhythm",
        "Experience dance, dhol, pepa, and festive community gatherings.",
        "festival"
      ],
      [
        "20:30",
        "Quiet evening",
        "End with tea, river breeze, and local snacks.",
        "daily life"
      ]
    ]
  },
  {
    "id": "maharashtra",
    "state": "Maharashtra",
    "region": "West",
    "theme": "Forts, cities, theatre, coastline, street food",
    "image": "assets/heritage_forts.png",
    "weather": "Coastal humidity, Deccan heat, monsoon greenery, and hill-station coolness",
    "timeline": [
      [
        "06:00",
        "City or fort morning",
        "Start with a seafront walk, hill trek, or fort viewpoint.",
        "daily life"
      ],
      [
        "08:00",
        "Breakfast",
        "Eat poha, upma, vada pav, or misal.",
        "food"
      ],
      [
        "09:30",
        "Local transport",
        "Ride local trains, buses, autos, or shared jeeps depending on the region.",
        "transport"
      ],
      [
        "11:30",
        "Market and craft",
        "Explore flower markets, book lanes, Kolhapuri chappals, or Paithani textiles.",
        "markets"
      ],
      [
        "13:30",
        "Lunch",
        "Try thalipeeth, varan bhaat, puran poli, or coastal fish curry.",
        "food"
      ],
      [
        "16:00",
        "Heritage stop",
        "Visit a Maratha fort, cave site, museum, or theatre district.",
        "heritage"
      ],
      [
        "18:30",
        "Lavani or theatre",
        "Experience folk performance, Marathi theatre, or music events.",
        "tradition"
      ],
      [
        "21:00",
        "Street food night",
        "End with pav bhaji, bhel, kulfi, or local snacks.",
        "food"
      ]
    ]
  },
  {
    "id": "gujarat",
    "state": "Gujarat",
    "region": "West",
    "theme": "Garba, stepwells, business streets, crafts, coastal trade",
    "image": "assets/heritage_stepwells.png",
    "weather": "Dry, sunny, coastal in parts, and festive during Navratri",
    "timeline": [
      [
        "06:00",
        "Old city morning",
        "Start with pol houses, temple bells, and breakfast stalls.",
        "daily life"
      ],
      [
        "08:00",
        "Breakfast",
        "Try dhokla, thepla, fafda, jalebi, and chai.",
        "food"
      ],
      [
        "10:00",
        "Textile market",
        "Explore bandhani, patola, embroidery, and craft bazaars.",
        "markets"
      ],
      [
        "12:00",
        "Stepwell visit",
        "Study water architecture and carved stone corridors.",
        "heritage"
      ],
      [
        "14:00",
        "Gujarati thali",
        "Enjoy dal, kadhi, shaak, rotli, rice, farsan, and sweets.",
        "food"
      ],
      [
        "16:30",
        "Coastal or salt landscape",
        "Learn about ports, salt pans, or dryland ecosystems.",
        "nature"
      ],
      [
        "19:00",
        "Garba circle",
        "Experience folk dance, claps, dandiya, and Navratri energy.",
        "festival"
      ],
      [
        "21:30",
        "Night snacks",
        "Finish with khaman, sev usal, or kulfi.",
        "food"
      ]
    ]
  }
];
  const stateSelect = document.getElementById("state-select");
  const momentFilter = document.getElementById("moment-filter");
  const searchInput = document.getElementById("day-search");
  const overview = document.getElementById("state-overview");
  const list = document.getElementById("timeline-list");
  const empty = document.getElementById("empty-state");
  const escapeHtml = (value) => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const momentTypes = [...new Set(dayStates.flatMap(state => state.timeline.map(item => item[3])))].sort();

  function populateControls() {
    dayStates.forEach(state => { const option = document.createElement("option"); option.value = state.id; option.textContent = state.state; stateSelect.append(option); });
    momentTypes.forEach(type => { const option = document.createElement("option"); option.value = type; option.textContent = type[0].toUpperCase() + type.slice(1); momentFilter.append(option); });
    document.getElementById("state-count").textContent = dayStates.length;
    document.getElementById("event-count").textContent = dayStates.reduce((sum, state) => sum + state.timeline.length, 0);
  }
  function currentState() { return dayStates.find(state => state.id === stateSelect.value) || dayStates[0]; }
  function renderOverview(state) {
    overview.innerHTML = `<img src="${escapeHtml(state.image)}" alt="${escapeHtml(state.state)} daily life" onerror="this.src='assets/hero_banner.png'"><div class="overview-copy"><h3>${escapeHtml(state.state)}</h3><p>${escapeHtml(state.theme)}</p><p><strong>Typical weather:</strong> ${escapeHtml(state.weather)}</p><div class="overview-badges"><span class="overview-badge">${escapeHtml(state.region)} India</span><span class="overview-badge">Food</span><span class="overview-badge">Markets</span><span class="overview-badge">Traditions</span><span class="overview-badge">Transport</span></div></div>`;
  }
  function renderTimeline() {
    const state = currentState();
    const query = searchInput.value.trim().toLowerCase();
    const type = momentFilter.value;
    renderOverview(state);
    const filtered = state.timeline.filter(([time,title,text,kind]) => (!query || [time,title,text,kind,state.state,state.theme,state.weather].join(" ").toLowerCase().includes(query)) && (type === "all" || kind === type));
    list.innerHTML = filtered.map(([time,title,text,kind]) => `<article class="moment-card" data-search-item data-category="${escapeHtml(kind)}" data-region="${escapeHtml(state.region)}"><div class="moment-top"><div><h3>${escapeHtml(title)}</h3><span class="moment-type">${escapeHtml(kind)}</span></div><span class="moment-time">${escapeHtml(time)}</span></div><p>${escapeHtml(text)}</p></article>`).join("");
    empty.classList.toggle("visible", filtered.length === 0);
    list.hidden = filtered.length === 0;
  }
  function randomState() {
    const state = dayStates[Math.floor(Math.random() * dayStates.length)];
    stateSelect.value = state.id;
    momentFilter.value = "all";
    searchInput.value = "";
    renderTimeline();
    document.getElementById("day-dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function reset() {
    momentFilter.value = "all";
    searchInput.value = "";
    renderTimeline();
    searchInput.focus();
  }
  populateControls();
  renderTimeline();
  stateSelect.addEventListener("change", renderTimeline);
  momentFilter.addEventListener("change", renderTimeline);
  searchInput.addEventListener("input", renderTimeline);
  document.getElementById("random-state").addEventListener("click", randomState);
  document.getElementById("reset-filters").addEventListener("click", reset);
  document.getElementById("empty-reset").addEventListener("click", reset);
  window.DayInStateExplorer = { states: () => [...dayStates], random: randomState };
});
