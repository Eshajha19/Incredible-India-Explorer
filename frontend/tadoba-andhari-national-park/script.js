
document.addEventListener("DOMContentLoaded", () => {
  const facts = [{"label": "State", "value": "Maharashtra", "detail": "Tadoba-Andhari National Park is one of Maharashtra's best-known tiger reserve landscapes."}, {"label": "Known for", "value": "Tiger Reserve", "detail": "The issue describes it as Maharashtra's oldest and one of India's finest tiger reserves."}, {"label": "Landscape", "value": "Forest + lakes", "detail": "The park is known for forests, water bodies, meadows, bamboo, and wildlife movement around lakes."}, {"label": "Core theme", "value": "Tadoba Lake", "detail": "Lakes and waterholes are central to wildlife watching and dry-season ecology."}, {"label": "Wildlife", "value": "Tigers, leopards, deer, birds", "detail": "The explorer highlights predators, herbivores, reptiles, birds, and forest life."}, {"label": "Explorer focus", "value": "History + safari zones", "detail": "This page teaches history, geography, safari zones, flora/fauna, lakes, and interesting facts."}];
  const wildlife = [{"name": "Bengal Tiger", "type": "Tiger Reserve", "emoji": "🐅", "detail": "The flagship predator and main conservation symbol of Tadoba-Andhari."}, {"name": "Indian Leopard", "type": "Predator", "emoji": "🐆", "detail": "A secretive big cat sharing forest and rocky habitats with tigers."}, {"name": "Dhole", "type": "Predator", "emoji": "🐕", "detail": "The Indian wild dog is a social predator in central Indian forests."}, {"name": "Sloth Bear", "type": "Mammal", "emoji": "🐻", "detail": "A distinctive forest mammal often linked with termite mounds and fruiting trees."}, {"name": "Sambar Deer", "type": "Herbivore", "emoji": "🌿", "detail": "A large deer species important to the prey base of big cats."}, {"name": "Spotted Deer", "type": "Herbivore", "emoji": "🦌", "detail": "A common deer species seen in forest edges and open patches."}, {"name": "Marsh Crocodile", "type": "Reptile", "emoji": "🐊", "detail": "Water bodies around the park can support crocodiles and aquatic food webs."}, {"name": "Indian Roller", "type": "Bird", "emoji": "🐦", "detail": "A colourful bird often seen around open woodland and park roads."}, {"name": "Crested Serpent Eagle", "type": "Bird", "emoji": "🦅", "detail": "A raptor species that represents the park's bird diversity."}];
  const flora = [{"title": "Teak forest", "text": "Dry deciduous teak forest gives shade, cover, nesting spaces, and habitat structure."}, {"title": "Bamboo patches", "text": "Bamboo adds dense cover for wildlife and supports smaller species in the forest understory."}, {"title": "Grassland openings", "text": "Open meadows and edges support herbivores, birds, and predator movement."}, {"title": "Riparian belts", "text": "Vegetation around streams, lakes, and waterholes becomes crucial in the dry season."}];
  const history = [{"title": "Old Maharashtra reserve", "text": "The issue highlights Tadoba-Andhari as Maharashtra's oldest national park landscape and a major tiger reserve."}, {"title": "Name and identity", "text": "The park name combines Tadoba with the Andhari river/forest landscape, connecting local geography and conservation identity."}, {"title": "Tiger conservation story", "text": "The reserve is important for central Indian tiger habitat protection, prey base conservation, and responsible tourism awareness."}, {"title": "Modern safari learning", "text": "Today the park helps visitors understand forest ecology, tiger behaviour, waterholes, birds, and safe wildlife viewing."}];
  const safariZones = [{"id": "moharli", "name": "Moharli Zone", "x": 52, "y": 68, "type": "Popular gate", "detail": "A well-known visitor/safari side often used as an entry point for Tadoba trips."}, {"id": "kolara", "name": "Kolara Zone", "x": 62, "y": 42, "type": "Safari zone", "detail": "Represents northern forest access, wildlife movement, and safari learning."}, {"id": "navegaon", "name": "Navegaon Zone", "x": 41, "y": 34, "type": "Forest gate", "detail": "A forest-side access point useful for explaining multiple safari zones."}, {"id": "pangdi", "name": "Pangdi Zone", "x": 32, "y": 62, "type": "Buffer landscape", "detail": "Symbolises buffer-zone tourism and wildlife corridors around core forests."}, {"id": "tadoba-lake", "name": "Tadoba Lake", "x": 55, "y": 55, "type": "Lake ecosystem", "detail": "Water is central to wildlife movement, birdlife, and dry-season forest ecology."}, {"id": "andhari", "name": "Andhari River belt", "x": 71, "y": 60, "type": "River / forest belt", "detail": "Represents riverine vegetation and the Andhari landscape connected to the reserve name."}];
  const lakes = [{"title": "Tadoba Lake", "text": "A signature water body connected with birds, crocodiles, herbivores, and predator movement."}, {"title": "Waterholes", "text": "Seasonal and perennial water sources become important wildlife-viewing points in dry months."}, {"title": "River belts", "text": "The Andhari river landscape supports riparian vegetation and habitat diversity."}, {"title": "Wetland edges", "text": "Lake edges and marshy areas add bird, reptile, and herbivore activity to the ecosystem."}];
  const birds = [{"name": "Crested Serpent Eagle", "detail": "A raptor linked with woodland and reptile-rich habitats."}, {"name": "Indian Roller", "detail": "A colourful bird often noticed by visitors along open forest tracks."}, {"name": "Peafowl", "detail": "India's national bird is common in many dry forest landscapes."}, {"name": "Kingfisher", "detail": "Seen near water bodies and wetland edges around lake ecosystems."}, {"name": "Drongo", "detail": "Active insect-hunting birds that add movement to forest edges."}, {"name": "Owls", "detail": "Night birds that represent the park's less-seen nocturnal biodiversity."}];
  const interesting = [{"title": "Lake-linked wildlife", "text": "Water bodies help make Tadoba-Andhari a strong wildlife-watching landscape during dry months."}, {"title": "Central Indian tiger habitat", "text": "The reserve is part of a broader central Indian forest belt important for tigers and prey."}, {"title": "Flora-fauna connection", "text": "Teak, bamboo, grasslands, water, herbivores, predators, and birds form one connected ecosystem."}, {"title": "Safari discipline matters", "text": "Quiet, distance-aware safari behaviour protects animals and improves learning for visitors."}];
  const gallery = [{"title": "Tiger reserve forest", "image": "../../assets/heritage_forts.png", "caption": "Visual placeholder for Tadoba-Andhari's tiger landscape and dry forest."}, {"title": "Lake ecosystem", "image": "../../assets/travel_rivers.png", "caption": "Water bodies support birds, crocodiles, deer, and predator movement."}, {"title": "Safari trail", "image": "../../assets/hero_banner.png", "caption": "Responsible safari focuses on learning, safety, and wildlife respect."}, {"title": "Bamboo and woodland", "image": "../../assets/travel_hidden.png", "caption": "Forest edges, bamboo patches, and meadows shape biodiversity."}];

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const factsGrid = document.getElementById("facts-grid");
  const historyGrid = document.getElementById("history-grid");
  const wildlifeGrid = document.getElementById("wildlife-grid");
  const floraGrid = document.getElementById("flora-grid");
  const lakesGrid = document.getElementById("lakes-grid");
  const birdsGrid = document.getElementById("birds-grid");
  const interestingGrid = document.getElementById("interesting-grid");
  const galleryGrid = document.getElementById("gallery-grid");
  const mapPins = document.getElementById("map-pins");
  const mapInfo = document.getElementById("map-info");

  function cardSpan(title, detail, className, index) {
    return `
      <article class="${className}">
        <span>0${index + 1}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(detail)}</p>
      </article>
    `;
  }

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

  function renderMap() {
    mapPins.innerHTML = safariZones.map((point, index) => `
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

    selectMapPoint(safariZones[0].id);
  }

  function selectMapPoint(pointId) {
    const point = safariZones.find((item) => item.id === pointId) || safariZones[0];

    document.querySelectorAll(".map-pin").forEach((pin) => {
      pin.classList.toggle("active", pin.dataset.point === point.id);
    });

    mapInfo.innerHTML = `
      <span>${escapeHtml(point.type)}</span>
      <h3>${escapeHtml(point.name)}</h3>
      <p>${escapeHtml(point.detail)}</p>
    `;
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

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderWildlife(button.dataset.filter);
    });
  });

  renderFacts();
  historyGrid.innerHTML = history.map((item, index) => cardSpan(item.title, item.text, "history-card", index)).join("");
  renderWildlife();
  floraGrid.innerHTML = flora.map((item, index) => cardSpan(item.title, item.text, "flora-card", index)).join("");
  renderMap();
  lakesGrid.innerHTML = lakes.map((item, index) => cardSpan(item.title, item.text, "lake-card", index)).join("");
  birdsGrid.innerHTML = birds.map((item, index) => `
    <article class="bird-card">
      <span>Bird 0${index + 1}</span>
      <strong>${escapeHtml(item.name)}</strong>
      <p>${escapeHtml(item.detail)}</p>
    </article>
  `).join("");
  interestingGrid.innerHTML = interesting.map((item, index) => cardSpan(item.title, item.text, "interesting-card", index)).join("");
  renderGallery();

  window.TadobaAndhariNationalParkExplorer = {
    facts: () => [...facts],
    wildlife: () => [...wildlife],
    safariZones: () => [...safariZones],
  };
});
