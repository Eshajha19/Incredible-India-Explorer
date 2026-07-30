
document.addEventListener("DOMContentLoaded", () => {
  const facts = [{"label": "State", "value": "Gujarat", "detail": "Gir National Park and Wildlife Sanctuary is in Gujarat's Saurashtra region."}, {"label": "Known for", "value": "Asiatic Lions", "detail": "Gir is the last natural home of the wild Asiatic lion population."}, {"label": "Landscape", "value": "Dry deciduous forest", "detail": "The ecosystem includes teak forest, thorn scrub, grassland patches, rivers, and rocky hills."}, {"label": "Safari focus", "value": "Wildlife viewing", "detail": "Safaris help visitors understand lions, leopards, deer, birds, reptiles, and forest ecology."}, {"label": "Conservation", "value": "Lion recovery", "detail": "Gir is one of India's strongest conservation stories around habitat protection and community coexistence."}, {"label": "Best learning theme", "value": "Forest ecosystem", "detail": "The explorer page teaches wildlife, habitats, conservation, safari etiquette, and biodiversity."}];
  const wildlife = [{"name": "Asiatic Lion", "type": "Big cat", "emoji": "🦁", "detail": "The signature species of Gir and one of India's most important conservation symbols."}, {"name": "Indian Leopard", "type": "Predator", "emoji": "🐆", "detail": "A stealthy big cat sharing Gir's forest and scrubland habitats."}, {"name": "Chital", "type": "Deer", "emoji": "🦌", "detail": "Spotted deer are common prey species and important grazers in the ecosystem."}, {"name": "Sambar", "type": "Deer", "emoji": "🌿", "detail": "Large deer often found near wooded areas and water sources."}, {"name": "Nilgai", "type": "Antelope", "emoji": "🐾", "detail": "India's largest antelope adds to Gir's diverse herbivore community."}, {"name": "Marsh Crocodile", "type": "Reptile", "emoji": "🐊", "detail": "Crocodiles inhabit reservoirs and water bodies around the Gir landscape."}, {"name": "Peafowl", "type": "Bird", "emoji": "🦚", "detail": "India's national bird is a familiar presence in forest edges and open areas."}, {"name": "Vulture species", "type": "Bird", "emoji": "🪽", "detail": "Scavenging birds play a vital role in cleaning the ecosystem."}];
  const ecosystems = [{"title": "Dry deciduous forest", "text": "Teak, acacia, and mixed dry forest provide cover, shade, and hunting ground for Gir's wildlife."}, {"title": "Grassland openings", "text": "Open patches support deer, antelope, birds, and predator movement."}, {"title": "River and water zones", "text": "Water bodies sustain animals during dry months and support reptiles and birdlife."}, {"title": "Human-wildlife coexistence", "text": "Communities around Gir are part of the broader conservation story and responsible tourism model."}];
  const safari = [{"title": "Book responsibly", "text": "Use official/local guidance, verified permits, and authorised safari operators only."}, {"title": "Keep distance", "text": "Never pressure drivers to chase animals or move too close to lions and other wildlife."}, {"title": "Stay quiet", "text": "Low noise improves wildlife viewing and reduces stress on animals."}, {"title": "No littering", "text": "Carry waste back and avoid plastic pollution in forest and village-edge landscapes."}];
  const mapPoints = [{"id": "sasan", "name": "Sasan Gir", "x": 42, "y": 52, "type": "Gateway", "detail": "Main visitor gateway and common base for Gir exploration."}, {"id": "devalia", "name": "Devalia Safari Park", "x": 54, "y": 42, "type": "Interpretation zone", "detail": "A controlled safari interpretation area used by many visitors."}, {"id": "kamleshwar", "name": "Kamleshwar Dam", "x": 67, "y": 57, "type": "Water zone", "detail": "Important waterbody known for crocodiles and birdlife."}, {"id": "forestcore", "name": "Gir Forest Core", "x": 49, "y": 62, "type": "Habitat", "detail": "Dry forest, scrub, grassland and wildlife movement zone."}, {"id": "maldhari", "name": "Maldhari community belt", "x": 31, "y": 45, "type": "Coexistence", "detail": "Represents the people-nature relationship around the Gir landscape."}];
  const gallery = [{"title": "Asiatic lion habitat", "image": "../../assets/heritage_forts.png", "caption": "Visual placeholder for Gir's lion landscape and rocky forest clearings."}, {"title": "Dry forest trail", "image": "../../assets/travel_hidden.png", "caption": "Gir's dry deciduous forest supports predators, prey, birds, and reptiles."}, {"title": "Safari learning", "image": "../../assets/hero_banner.png", "caption": "Responsible safari is about observing wildlife without disturbing it."}, {"title": "Water ecosystem", "image": "../../assets/travel_rivers.png", "caption": "Water zones support crocodiles, birds, herbivores, and forest life."}];

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const factsGrid = document.getElementById("facts-grid");
  const wildlifeGrid = document.getElementById("wildlife-grid");
  const ecosystemGrid = document.getElementById("ecosystem-grid");
  const safariGrid = document.getElementById("safari-grid");
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

  function renderSimpleCards(target, data) {
    target.innerHTML = data.map((item, index) => `
      <article class="${target.id === "safari-grid" ? "safari-card" : "ecosystem-card"}">
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
  renderSimpleCards(ecosystemGrid, ecosystems);
  renderSimpleCards(safariGrid, safari);
  renderGallery();

  window.GirNationalParkExplorer = {
    facts: () => [...facts],
    wildlife: () => [...wildlife],
    mapPoints: () => [...mapPoints],
  };
});
