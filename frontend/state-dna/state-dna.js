document.addEventListener("DOMContentLoaded", () => {
  const states = [
  {
    "id": "rajasthan",
    "state": "Rajasthan",
    "region": "West",
    "image": "assets/travel_deserts.png",
    "summary": "A desert heritage state known for forts, folk music, textiles, stepwells, royal cities, and dryland ecology.",
    "scores": {
      "Language": 74,
      "Cuisine": 82,
      "Wildlife": 78,
      "Heritage": 96,
      "Festivals": 90,
      "Geography": 94,
      "Economy": 76,
      "Dance": 88,
      "Music": 91,
      "Crafts": 97
    },
    "highlights": [
      "Forts",
      "Ghoomar",
      "Thar Desert",
      "Block prints",
      "Dal Baati Churma"
    ]
  },
  {
    "id": "kerala",
    "state": "Kerala",
    "region": "South",
    "image": "assets/travel_islands.png",
    "summary": "A tropical coastal state shaped by backwaters, Ayurveda, coconut landscapes, Kathakali, literacy, and spice trade.",
    "scores": {
      "Language": 82,
      "Cuisine": 92,
      "Wildlife": 88,
      "Heritage": 84,
      "Festivals": 86,
      "Geography": 94,
      "Economy": 80,
      "Dance": 90,
      "Music": 78,
      "Crafts": 82
    },
    "highlights": [
      "Backwaters",
      "Kathakali",
      "Sadya",
      "Ayurveda",
      "Great Hornbill"
    ]
  },
  {
    "id": "tamil-nadu",
    "state": "Tamil Nadu",
    "region": "South",
    "image": "assets/heritage_temples.png",
    "summary": "A classical culture powerhouse known for Tamil language, temple architecture, Bharatanatyam, Carnatic music, and cuisine.",
    "scores": {
      "Language": 98,
      "Cuisine": 88,
      "Wildlife": 76,
      "Heritage": 97,
      "Festivals": 89,
      "Geography": 82,
      "Economy": 86,
      "Dance": 98,
      "Music": 96,
      "Crafts": 88
    },
    "highlights": [
      "Tamil",
      "Bharatanatyam",
      "Temples",
      "Carnatic music",
      "Kanchipuram silk"
    ]
  },
  {
    "id": "assam",
    "state": "Assam",
    "region": "Northeast",
    "image": "assets/travel_forests.png",
    "summary": "A riverine and tea-rich state known for Bihu, one-horned rhinoceros, Brahmaputra culture, silk, and wetlands.",
    "scores": {
      "Language": 84,
      "Cuisine": 76,
      "Wildlife": 96,
      "Heritage": 82,
      "Festivals": 91,
      "Geography": 90,
      "Economy": 84,
      "Dance": 86,
      "Music": 82,
      "Crafts": 88
    },
    "highlights": [
      "Bihu",
      "Tea gardens",
      "Kaziranga",
      "Muga silk",
      "Brahmaputra"
    ]
  },
  {
    "id": "gujarat",
    "state": "Gujarat",
    "region": "West",
    "image": "assets/heritage_stepwells.png",
    "summary": "A trade and craft state known for Garba, stepwells, coastal history, vegetarian cuisine, lions, and textile traditions.",
    "scores": {
      "Language": 84,
      "Cuisine": 90,
      "Wildlife": 86,
      "Heritage": 91,
      "Festivals": 98,
      "Geography": 88,
      "Economy": 94,
      "Dance": 94,
      "Music": 82,
      "Crafts": 96
    },
    "highlights": [
      "Garba",
      "Patola",
      "Asiatic lion",
      "Stepwells",
      "Dhokla"
    ]
  },
  {
    "id": "west-bengal",
    "state": "West Bengal",
    "region": "East",
    "image": "assets/culture.png",
    "summary": "A literary and artistic state known for Bengali language, Durga Puja, river culture, sweets, music, theatre, and the Sundarbans.",
    "scores": {
      "Language": 94,
      "Cuisine": 91,
      "Wildlife": 84,
      "Heritage": 88,
      "Festivals": 96,
      "Geography": 82,
      "Economy": 78,
      "Dance": 74,
      "Music": 95,
      "Crafts": 84
    },
    "highlights": [
      "Durga Puja",
      "Rabindra Sangeet",
      "Sundarbans",
      "Rasgulla",
      "Literature"
    ]
  },
  {
    "id": "maharashtra",
    "state": "Maharashtra",
    "region": "West",
    "image": "assets/heritage_forts.png",
    "summary": "A diverse state shaped by forts, Marathi theatre, cinema, coastal food, cities, pilgrimage routes, and Deccan landscapes.",
    "scores": {
      "Language": 88,
      "Cuisine": 86,
      "Wildlife": 76,
      "Heritage": 92,
      "Festivals": 88,
      "Geography": 86,
      "Economy": 96,
      "Dance": 82,
      "Music": 84,
      "Crafts": 80
    },
    "highlights": [
      "Maratha forts",
      "Lavani",
      "Misal Pav",
      "Mumbai",
      "Paithani"
    ]
  },
  {
    "id": "punjab",
    "state": "Punjab",
    "region": "North",
    "image": "assets/culture.png",
    "summary": "A vibrant agrarian state known for Punjabi language, Bhangra, Sikh heritage, food, music, and community life.",
    "scores": {
      "Language": 90,
      "Cuisine": 94,
      "Wildlife": 70,
      "Heritage": 86,
      "Festivals": 92,
      "Geography": 76,
      "Economy": 82,
      "Dance": 97,
      "Music": 94,
      "Crafts": 80
    },
    "highlights": [
      "Bhangra",
      "Gurmukhi",
      "Langar",
      "Phulkari",
      "Wheat fields"
    ]
  },
  {
    "id": "odisha",
    "state": "Odisha",
    "region": "East",
    "image": "assets/heritage_temples.png",
    "summary": "A temple and coastal state known for Odissi, Jagannath culture, Pattachitra, hockey, tribal arts, and Chilika Lake.",
    "scores": {
      "Language": 86,
      "Cuisine": 78,
      "Wildlife": 82,
      "Heritage": 94,
      "Festivals": 92,
      "Geography": 84,
      "Economy": 72,
      "Dance": 95,
      "Music": 80,
      "Crafts": 94
    },
    "highlights": [
      "Odissi",
      "Jagannath",
      "Pattachitra",
      "Chilika",
      "Konark"
    ]
  },
  {
    "id": "karnataka",
    "state": "Karnataka",
    "region": "South",
    "image": "assets/heritage_temples.png",
    "summary": "A state where technology, Kannada culture, sandalwood, Hampi, Western Ghats, music, and food traditions meet.",
    "scores": {
      "Language": 86,
      "Cuisine": 84,
      "Wildlife": 88,
      "Heritage": 92,
      "Festivals": 84,
      "Geography": 90,
      "Economy": 95,
      "Dance": 82,
      "Music": 88,
      "Crafts": 86
    },
    "highlights": [
      "Kannada",
      "Hampi",
      "Sandalwood",
      "Yakshagana",
      "Mysore Pak"
    ]
  },
  {
    "id": "uttar-pradesh",
    "state": "Uttar Pradesh",
    "region": "North",
    "image": "assets/heritage_temples.png",
    "summary": "A historic heartland known for Awadhi culture, Kathak, Hindi-Urdu literature, spiritual cities, crafts, and monuments.",
    "scores": {
      "Language": 90,
      "Cuisine": 89,
      "Wildlife": 72,
      "Heritage": 98,
      "Festivals": 92,
      "Geography": 78,
      "Economy": 82,
      "Dance": 94,
      "Music": 88,
      "Crafts": 90
    },
    "highlights": [
      "Kathak",
      "Awadhi cuisine",
      "Taj Mahal",
      "Banaras",
      "Chikankari"
    ]
  },
  {
    "id": "telangana",
    "state": "Telangana",
    "region": "South",
    "image": "assets/culture.png",
    "summary": "A Deccan state known for Telugu culture, Hyderabad heritage, biryani, Bonalu, forts, crafts, and technology.",
    "scores": {
      "Language": 86,
      "Cuisine": 92,
      "Wildlife": 74,
      "Heritage": 86,
      "Festivals": 88,
      "Geography": 78,
      "Economy": 90,
      "Dance": 82,
      "Music": 78,
      "Crafts": 84
    },
    "highlights": [
      "Hyderabadi Biryani",
      "Bonalu",
      "Kakatiya",
      "Telugu",
      "Pearls"
    ]
  }
];
  const journeyKey = "incredible-india-state-dna-journey";
  const stateSelect = document.getElementById("state-select");
  const regionFilter = document.getElementById("region-filter");
  const searchInput = document.getElementById("state-search");
  const profilePanel = document.getElementById("profile-panel");
  const scoreGrid = document.getElementById("score-grid");
  const canvas = document.getElementById("dna-chart");
  const ctx = canvas.getContext("2d");
  const emptyState = document.getElementById("empty-state");
  let journey = readJourney();
  let currentId = states[0].id;
  let showJourney = false;

  const escapeHtml = (value) => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const regions = [...new Set(states.map(item => item.region))].sort();
  const axes = Object.keys(states[0].scores);

  function readJourney() { try { const parsed = JSON.parse(localStorage.getItem(journeyKey) || "[]"); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
  function saveJourney() { localStorage.setItem(journeyKey, JSON.stringify(journey)); document.getElementById("journey-count").textContent = journey.length; }
  function isSaved(id) { return journey.includes(id); }
  function average(scores) { const values = Object.values(scores); return Math.round(values.reduce((sum,value)=>sum+value,0)/values.length); }
  function searchableText(item) { return [item.state,item.region,item.summary,item.highlights.join(" "),...Object.keys(item.scores),...Object.values(item.scores)].join(" ").toLowerCase(); }
  const indexed = states.map(item => ({ ...item, search: searchableText(item) }));

  function populateControls() {
    indexed.forEach(item => { const option = document.createElement("option"); option.value = item.id; option.textContent = item.state; stateSelect.append(option); });
    regions.forEach(region => { const option = document.createElement("option"); option.value = region; option.textContent = region; regionFilter.append(option); });
    document.getElementById("state-count").textContent = states.length;
    document.getElementById("journey-count").textContent = journey.length;
  }

  function visibleStates() {
    const query = searchInput.value.trim().toLowerCase();
    const region = regionFilter.value;
    return indexed.filter(item => (!query || item.search.includes(query)) && (region === "all" || item.region === region) && (!showJourney || isSaved(item.id)));
  }

  function chooseState(id) {
    const visible = visibleStates();
    const found = visible.find(item => item.id === id) || visible[0];
    emptyState.classList.toggle("visible", !found);
    document.querySelector(".dna-layout").hidden = !found;
    scoreGrid.hidden = !found;
    if (!found) return;
    currentId = found.id;
    stateSelect.value = found.id;
    renderProfile(found);
    renderScores(found);
    drawRadar(found);
  }

  function renderProfile(item) {
    const pills = item.highlights.map(text => `<span class="highlight-pill">${escapeHtml(text)}</span>`).join("");
    profilePanel.innerHTML = `<div class="profile-media"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.state)} identity" onerror="this.src='assets/hero_banner.png'"><span class="region-badge">${escapeHtml(item.region)}</span></div><div class="profile-body"><h3>${escapeHtml(item.state)}</h3><p>${escapeHtml(item.summary)}</p><div class="highlight-row">${pills}</div><div class="dna-average"><span>Overall DNA strength</span><strong>${average(item.scores)}%</strong></div></div>`;
  }

  function renderScores(item) {
    scoreGrid.innerHTML = axes.map(axis => `<article class="score-card"><span>${escapeHtml(axis)}</span><strong>${item.scores[axis]}</strong><div class="score-track"><i style="width:${item.scores[axis]}%"></i></div></article>`).join("");
  }

  function drawRadar(item) {
    const width = canvas.width;
    const height = canvas.height;
    const center = width / 2;
    const radius = width * 0.36;
    ctx.clearRect(0,0,width,height);
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let ring=1; ring<=5; ring++) {
      ctx.beginPath();
      axes.forEach((axis,index) => {
        const angle = (Math.PI * 2 * index / axes.length) - Math.PI / 2;
        const r = radius * ring / 5;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        index === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      });
      ctx.closePath();
      ctx.strokeStyle = "rgba(148,163,184,.35)";
      ctx.stroke();
    }
    axes.forEach((axis,index) => {
      const angle = (Math.PI * 2 * index / axes.length) - Math.PI / 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(center,center);
      ctx.lineTo(x,y);
      ctx.strokeStyle = "rgba(148,163,184,.28)";
      ctx.stroke();
      const labelX = center + Math.cos(angle) * (radius + 54);
      const labelY = center + Math.sin(angle) * (radius + 34);
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text-primary") || "#f8fafc";
      ctx.fillText(axis, labelX, labelY);
    });
    ctx.beginPath();
    axes.forEach((axis,index) => {
      const angle = (Math.PI * 2 * index / axes.length) - Math.PI / 2;
      const r = radius * item.scores[axis] / 100;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;
      index === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(255,153,51,.28)";
    ctx.fill();
    ctx.strokeStyle = "#ff9933";
    ctx.lineWidth = 4;
    ctx.stroke();
    axes.forEach((axis,index) => {
      const angle = (Math.PI * 2 * index / axes.length) - Math.PI / 2;
      const r = radius * item.scores[axis] / 100;
      ctx.beginPath();
      ctx.arc(center + Math.cos(angle)*r, center + Math.sin(angle)*r, 6, 0, Math.PI*2);
      ctx.fillStyle = "#138808";
      ctx.fill();
    });
  }

  function randomState() {
    const visible = visibleStates();
    const item = visible[Math.floor(Math.random() * visible.length)] || indexed[Math.floor(Math.random() * indexed.length)];
    if (!item) return;
    searchInput.value = "";
    regionFilter.value = "all";
    showJourney = false;
    chooseState(item.id);
    document.getElementById("dna-dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  populateControls();
  chooseState(currentId);

  stateSelect.addEventListener("change", () => chooseState(stateSelect.value));
  searchInput.addEventListener("input", () => { showJourney = false; chooseState(currentId); });
  regionFilter.addEventListener("change", () => chooseState(currentId));
  document.getElementById("random-state").addEventListener("click", randomState);
  document.getElementById("save-journey").addEventListener("click", () => { journey = isSaved(currentId) ? journey.filter(id => id !== currentId) : [...journey, currentId]; saveJourney(); chooseState(currentId); });
  document.getElementById("show-journey").addEventListener("click", () => { showJourney = !showJourney; chooseState(currentId); });
  document.getElementById("reset-filters").addEventListener("click", () => { searchInput.value = ""; regionFilter.value = "all"; showJourney = false; chooseState(currentId); searchInput.focus(); });
  document.getElementById("empty-reset").addEventListener("click", () => { searchInput.value = ""; regionFilter.value = "all"; showJourney = false; chooseState(states[0].id); });
  window.StateIdentityDNAExplorer = { states: () => [...states], random: randomState, journey: () => [...journey] };
});
