
document.addEventListener("DOMContentLoaded", () => {
  const facts = [{"label": "State", "value": "Karnataka", "detail": "Bandipur National Park lies in Karnataka and forms part of the Nilgiri landscape."}, {"label": "Known for", "value": "Tiger Reserve", "detail": "Bandipur is one of India's important tiger landscapes and wildlife conservation areas."}, {"label": "Flagship animals", "value": "Tigers & Elephants", "detail": "The park is strongly associated with tigers, Asian elephants, deer, gaur, and rich forest wildlife."}, {"label": "Landscape", "value": "Nilgiri Biosphere", "detail": "Bandipur is part of the broader Nilgiri Biosphere Reserve and connects with neighbouring forests."}, {"label": "Forest types", "value": "Dry + moist deciduous", "detail": "The ecosystem includes dry deciduous forest, moist patches, scrub, grassland, and riparian zones."}, {"label": "Explorer focus", "value": "Safari + biodiversity", "detail": "This page teaches safari etiquette, forest types, wildlife, conservation, and interesting facts."}];
  const wildlife = [{"name": "Bengal Tiger", "type": "Big cat", "emoji": "🐅", "detail": "Bandipur is an important tiger reserve landscape and predator habitat."}, {"name": "Asian Elephant", "type": "Elephant", "emoji": "🐘", "detail": "Elephants move across Bandipur and the larger Nilgiri forest corridors."}, {"name": "Spotted Deer", "type": "Deer", "emoji": "🦌", "detail": "Also called chital, this deer is commonly seen in forest edges and open glades."}, {"name": "Sambar Deer", "type": "Deer", "emoji": "🌿", "detail": "A large deer species that supports the predator-prey balance of the forest."}, {"name": "Indian Gaur", "type": "Herbivore", "emoji": "🐃", "detail": "The massive gaur is one of the impressive herbivores of the Bandipur landscape."}, {"name": "Indian Leopard", "type": "Big cat", "emoji": "🐆", "detail": "Leopards share the mixed forest habitat with tigers and other wildlife."}, {"name": "Dhole", "type": "Predator", "emoji": "🐕", "detail": "The Indian wild dog is a social predator found in many forest landscapes."}, {"name": "Peafowl", "type": "Bird", "emoji": "🦚", "detail": "Birdlife adds colour and sound to Bandipur's forest and grassland edges."}];
  const forestTypes = [{"title": "Dry deciduous forest", "text": "Open teak and mixed dry forest supports deer, gaur, elephants, predators, and birdlife."}, {"title": "Moist deciduous patches", "text": "Moister forest zones create shade, food diversity, and cover for many animals."}, {"title": "Scrub and grassland edges", "text": "Open patches allow herbivores to graze and make wildlife movement easier to observe."}, {"title": "Riverine and water zones", "text": "Water sources become crucial in dry months and attract mammals, birds, and reptiles."}];
  const safari = [{"title": "Use authorised safaris", "text": "Book only through official or authorised channels and follow forest department instructions."}, {"title": "Keep silent distance", "text": "Do not shout, play music, feed animals, or ask drivers to chase wildlife."}, {"title": "Respect corridors", "text": "Elephants and other animals need safe movement across forest corridors and road edges."}, {"title": "Leave no trace", "text": "Carry waste back, avoid plastic, and keep the forest clean for wildlife and visitors."}];
  const interesting = [{"title": "Nilgiri connection", "text": "Bandipur is part of a connected southern Indian forest landscape with neighbouring protected areas."}, {"title": "Tiger reserve value", "text": "The park contributes to India's tiger conservation network and habitat protection efforts."}, {"title": "Elephant movement", "text": "The Bandipur landscape is important for Asian elephant movement across forest corridors."}, {"title": "Biodiversity classroom", "text": "The park is useful for learning how forest type, water, prey, predators, and people interact."}];
  const mapPoints = [{"id": "bandipur-gate", "name": "Bandipur safari gateway", "x": 45, "y": 54, "type": "Visitor zone", "detail": "Represents the main visitor entry and safari-learning context of the park."}, {"id": "elephant-corridor", "name": "Elephant corridor", "x": 62, "y": 43, "type": "Wildlife movement", "detail": "Symbolises the importance of safe corridors for elephants across the Nilgiri landscape."}, {"id": "tiger-zone", "name": "Tiger habitat core", "x": 51, "y": 64, "type": "Tiger reserve", "detail": "Represents protected forest where predator-prey relationships are central to conservation."}, {"id": "forest-edge", "name": "Forest-grassland edge", "x": 32, "y": 60, "type": "Biodiversity edge", "detail": "Open glades and edges are useful for herbivores, birds, and safari interpretation."}, {"id": "water-zone", "name": "Water source zone", "x": 70, "y": 64, "type": "Water ecosystem", "detail": "Water points support animals during dry periods and attract diverse wildlife."}];
  const gallery = [{"title": "Tiger reserve landscape", "image": "../../assets/heritage_forts.png", "caption": "Visual placeholder for Bandipur's protected tiger reserve habitat."}, {"title": "Elephant corridor", "image": "../../assets/travel_mountains.png", "caption": "Elephants depend on connected forests and safe movement corridors."}, {"title": "Forest safari", "image": "../../assets/hero_banner.png", "caption": "Safari is best when quiet, respectful, and learning-focused."}, {"title": "Deer and grassland edge", "image": "../../assets/travel_hidden.png", "caption": "Open patches and forest edges support deer, birds, and predators."}];

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const factsGrid = document.getElementById("facts-grid");
  const wildlifeGrid = document.getElementById("wildlife-grid");
  const forestGrid = document.getElementById("forest-grid");
  const safariGrid = document.getElementById("safari-grid");
  const interestingGrid = document.getElementById("interesting-grid");
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
  renderSimpleCards(forestGrid, forestTypes, "forest-card");
  renderSimpleCards(safariGrid, safari, "safari-card");
  renderSimpleCards(interestingGrid, interesting, "interesting-card");
  renderGallery();

  window.BandipurNationalParkExplorer = {
    facts: () => [...facts],
    wildlife: () => [...wildlife],
    mapPoints: () => [...mapPoints],
  };
});
