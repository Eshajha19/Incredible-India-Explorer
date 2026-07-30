
document.addEventListener("DOMContentLoaded", () => {
  const facts = [{"label": "State", "value": "West Bengal", "detail": "Sundarbans National Park is in the Indian Sundarbans delta region of West Bengal."}, {"label": "Known for", "value": "Mangrove Forest", "detail": "The Sundarbans is one of the world's most iconic mangrove landscapes."}, {"label": "Flagship species", "value": "Royal Bengal Tiger", "detail": "The tiger is the most famous predator of the Sundarbans mangrove ecosystem."}, {"label": "Recognition", "value": "UNESCO Site", "detail": "The Sundarbans National Park is recognised as a UNESCO World Heritage Site."}, {"label": "Ecosystem", "value": "Delta + tidal forest", "detail": "The landscape is shaped by tidal channels, mudflats, islands, estuaries, and mangroves."}, {"label": "Explorer focus", "value": "Wildlife + conservation", "detail": "This page teaches biodiversity, habitat, responsible tourism, threats, and protection."}];
  const wildlife = [{"name": "Royal Bengal Tiger", "type": "Mammal", "emoji": "🐅", "detail": "The iconic predator of the Sundarbans, adapted to a tidal mangrove habitat."}, {"name": "Estuarine Crocodile", "type": "Reptile", "emoji": "🐊", "detail": "A powerful reptile associated with brackish water channels, creeks, and estuaries."}, {"name": "Fishing Cat", "type": "Mammal", "emoji": "🐈", "detail": "A wetland-specialist cat that reflects the delta's aquatic food web."}, {"name": "Spotted Deer", "type": "Mammal", "emoji": "🦌", "detail": "An important herbivore species in the forest and prey base for predators."}, {"name": "Water Monitor", "type": "Reptile", "emoji": "🦎", "detail": "A large reptile often linked with riverbanks, mudflats, and mangrove edges."}, {"name": "Kingfisher", "type": "Bird", "emoji": "🐦", "detail": "Colourful kingfishers are part of the Sundarbans' bird-rich water landscape."}, {"name": "Egret", "type": "Bird", "emoji": "🪽", "detail": "Wading birds feed along creeks, mudflats, and shallow wetland areas."}, {"name": "Olive Ridley Turtle", "type": "Reptile", "emoji": "🐢", "detail": "Marine and coastal ecosystems around the region support turtle conservation awareness."}];
  const ecosystems = [{"title": "Mangrove roots", "text": "Breathing roots and salt-tolerant trees stabilise mudflats, reduce erosion, and create shelter for young fish and crustaceans."}, {"title": "Tidal channels", "text": "Daily tides move nutrients through creeks and river mouths, shaping animal movement and forest life."}, {"title": "Delta islands", "text": "Islands, mudflats, riverbanks, and brackish waters create a shifting mosaic of habitats."}, {"title": "Human-nature edge", "text": "Local communities live near a powerful ecosystem where livelihoods, storms, wildlife, and conservation are closely linked."}];
  const conservation = [{"title": "Protect mangroves", "text": "Mangroves buffer storms, store carbon, support fisheries, and provide habitat for wildlife."}, {"title": "Reduce disturbance", "text": "Responsible tourism avoids noise, litter, unsafe boat behaviour, and wildlife harassment."}, {"title": "Climate resilience", "text": "Sea-level rise, cyclones, salinity, erosion, and habitat pressure make conservation urgent."}, {"title": "Community role", "text": "Long-term protection depends on local livelihoods, awareness, monitoring, and sustainable tourism."}];
  const mapPoints = [{"id": "sajnekhali", "name": "Sajnekhali", "x": 50, "y": 46, "type": "Interpretation zone", "detail": "A major visitor interpretation area often associated with birdwatching and forest awareness."}, {"id": "dobanki", "name": "Dobanki", "x": 64, "y": 54, "type": "Canopy / creek zone", "detail": "Represents creek-side forest learning and mangrove canopy experience."}, {"id": "sudhanyakhali", "name": "Sudhanyakhali", "x": 45, "y": 58, "type": "Watchtower zone", "detail": "A commonly known watchtower area used for understanding the forest and wildlife habitat."}, {"id": "netidhopani", "name": "Netidhopani", "x": 71, "y": 67, "type": "Deep forest story", "detail": "Represents deeper mangrove forest interpretation and tiger-habitat awareness."}, {"id": "delta", "name": "Tidal Delta Channels", "x": 35, "y": 63, "type": "Delta ecosystem", "detail": "The channels, mudflats, islands, and brackish water form the core of the Sundarbans landscape."}];
  const gallery = [{"title": "Mangrove forest", "image": "../../assets/travel_rivers.png", "caption": "Mangrove roots and tidal water define the Sundarbans ecosystem."}, {"title": "Tiger landscape", "image": "../../assets/heritage_forts.png", "caption": "Visual placeholder for the Royal Bengal tiger's protected mangrove habitat."}, {"title": "Bird-rich wetlands", "image": "../../assets/travel_hidden.png", "caption": "Creeks and mudflats support birds, fish, reptiles, and mammals."}, {"title": "Delta waters", "image": "../../assets/hero_banner.png", "caption": "Rivers, tides, and islands shape the Sundarbans explorer story."}];

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const factsGrid = document.getElementById("facts-grid");
  const wildlifeGrid = document.getElementById("wildlife-grid");
  const ecosystemGrid = document.getElementById("ecosystem-grid");
  const conservationGrid = document.getElementById("conservation-grid");
  const galleryGrid = document.getElementById("gallery-grid");
  const mapPins = document.getElementById("map-pins");
  const mapInfo = document.getElementById("map-info");

  function renderFacts() {
    factsGrid.innerHTML = facts.map((fact) => `
      <article class="fact-card">
        <span>${escapeHtml(fact.label)}</span>
        <strong>${escapeHtml(fact.value)}</strong>
        <p>${escapeHtml(fact.detail)}</p>
      </article>
    `).join("");
  }

  function renderWildlife(filter = "All") {
    const filtered = filter === "All"
      ? wildlife
      : wildlife.filter((item) => item.type === filter);

    wildlifeGrid.innerHTML = filtered.map((item) => `
      <article class="wildlife-card">
        <div class="wildlife-emoji" aria-hidden="true">${escapeHtml(item.emoji)}</div>
        <span>${escapeHtml(item.type)}</span>
        <strong>${escapeHtml(item.name)}</strong>
        <p>${escapeHtml(item.detail)}</p>
      </article>
    `).join("");
  }

  function renderSimpleCards(target, data, className) {
    target.innerHTML = data.map((item, index) => `
      <article class="${className}">
        <span>0${index + 1}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `).join("");
  }

  function renderGallery() {
    galleryGrid.innerHTML = gallery.map((item) => `
      <article class="gallery-card">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" onerror="this.src='../../assets/hero_banner.png'">
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.caption)}</p>
        </div>
      </article>
    `).join("");
  }

  function selectMapPoint(pointId) {
    const point = mapPoints.find((item) => item.id === pointId) || mapPoints[0];

    document.querySelectorAll(".map-pin").forEach((pin) => {
      pin.classList.toggle("active", pin.dataset.point === point.id);
    });

    mapInfo.innerHTML = `
      <span>${escapeHtml(point.type)}</span>
      <h3>${escapeHtml(point.name)}</h3>
      <p>${escapeHtml(point.detail)}</p>
    `;
  }

  function renderMap() {
    mapPins.innerHTML = mapPoints.map((point, index) => `
      <button
        class="map-pin"
        type="button"
        data-point="${escapeHtml(point.id)}"
        style="left:${point.x}%; top:${point.y}%"
        aria-label="${escapeHtml(point.name)}"
      >${index + 1}</button>
    `).join("");

    document.querySelectorAll(".map-pin").forEach((pin) => {
      pin.addEventListener("click", () => selectMapPoint(pin.dataset.point));
    });

    selectMapPoint(mapPoints[0].id);
  }

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderWildlife(button.dataset.filter);
    });
  });

  renderFacts();
  renderWildlife();
  renderMap();
  renderSimpleCards(ecosystemGrid, ecosystems, "ecosystem-card");
  renderSimpleCards(conservationGrid, conservation, "conservation-card");
  renderGallery();

  window.SundarbansNationalParkExplorer = {
    facts: () => [...facts],
    wildlife: () => [...wildlife],
    mapPoints: () => [...mapPoints],
  };
});
