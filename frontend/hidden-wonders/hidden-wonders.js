document.addEventListener("DOMContentLoaded", () => {
  const wonders = [
  {
    "id": "lonar-lake",
    "name": "Lonar Lake",
    "state": "Maharashtra",
    "location": "Buldhana district",
    "type": "Meteor-impact lake",
    "season": "November – February",
    "description": "A near-circular lake occupying a meteor-impact crater in basaltic terrain, surrounded by forest and historic temples.",
    "fact": "The crater formed in basalt rock, making Lonar an unusual setting for impact-crater research.",
    "images": [
      "assets/travel_hidden.png",
      "assets/travel_forests.png",
      "assets/travel_mountains.png"
    ],
    "search": "lonar lake maharashtra buldhana district meteor-impact lake a near-circular lake occupying a meteor-impact crater in basaltic terrain, surrounded by forest and historic temples."
  },
  {
    "id": "gandikota-gorge",
    "name": "Gandikota Gorge",
    "state": "Andhra Pradesh",
    "location": "Kadapa district",
    "type": "River gorge",
    "season": "October – February",
    "description": "A dramatic gorge carved by the Pennar River, where steep rocky cliffs frame sweeping canyon views beside a historic fort.",
    "fact": "The landscape combines a major geological feature with a historic fortified settlement.",
    "images": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "gandikota gorge andhra pradesh kadapa district river gorge a dramatic gorge carved by the pennar river, where steep rocky cliffs frame sweeping canyon views beside a historic fort."
  },
  {
    "id": "marble-rocks",
    "name": "Marble Rocks",
    "state": "Madhya Pradesh",
    "location": "Bhedaghat, Jabalpur",
    "type": "Marble gorge",
    "season": "October – March",
    "description": "The Narmada River passes between towering marble cliffs whose colours and textures shift with changing light.",
    "fact": "Moonlit boat rides are famous because pale marble surfaces reflect dramatically on the river.",
    "images": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/travel_islands.png"
    ],
    "search": "marble rocks madhya pradesh bhedaghat, jabalpur marble gorge the narmada river passes between towering marble cliffs whose colours and textures shift with changing light."
  },
  {
    "id": "valley-of-flowers",
    "name": "Valley of Flowers",
    "state": "Uttarakhand",
    "location": "Chamoli district",
    "type": "Alpine valley",
    "season": "July – September",
    "description": "A high Himalayan valley known for seasonal alpine flowers, mountain scenery, and exceptional biodiversity.",
    "fact": "The flowering display changes through the season with altitude, rainfall, and plant succession.",
    "images": [
      "assets/travel_forests.png",
      "assets/travel_mountains.png",
      "assets/travel_hidden.png"
    ],
    "search": "valley of flowers uttarakhand chamoli district alpine valley a high himalayan valley known for seasonal alpine flowers, mountain scenery, and exceptional biodiversity."
  },
  {
    "id": "living-root-bridges",
    "name": "Living Root Bridges",
    "state": "Meghalaya",
    "location": "Khasi & Jaintia Hills",
    "type": "Living bioengineering",
    "season": "October – April",
    "description": "Community-shaped bridges formed by guiding living aerial roots of rubber fig trees across rain-fed streams.",
    "fact": "Unlike conventional bridges, living root structures can strengthen as their roots grow and interweave.",
    "images": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "living root bridges meghalaya khasi & jaintia hills living bioengineering community-shaped bridges formed by guiding living aerial roots of rubber fig trees across rain-fed streams."
  },
  {
    "id": "magnetic-hill",
    "name": "Magnetic Hill",
    "state": "Ladakh",
    "location": "Near Leh",
    "type": "Optical illusion landscape",
    "season": "May – September",
    "description": "A famous roadside landscape where the surrounding terrain creates a gravity-defying visual impression.",
    "fact": "The apparent uphill motion is commonly understood as an optical illusion created by slope and horizon perception.",
    "images": [
      "assets/travel_mountains.png",
      "assets/travel_deserts.png",
      "assets/travel_hidden.png"
    ],
    "search": "magnetic hill ladakh near leh optical illusion landscape a famous roadside landscape where the surrounding terrain creates a gravity-defying visual impression."
  },
  {
    "id": "chandipur-beach",
    "name": "Chandipur Beach",
    "state": "Odisha",
    "location": "Balasore district",
    "type": "Receding-tide beach",
    "season": "November – February",
    "description": "A broad tidal beach known for dramatic low-tide recession that temporarily exposes large stretches of seabed.",
    "fact": "The shoreline can appear to move far away at low tide before returning as the tide rises.",
    "images": [
      "assets/travel_beaches.png",
      "assets/travel_islands.png",
      "assets/travel_hidden.png"
    ],
    "search": "chandipur beach odisha balasore district receding-tide beach a broad tidal beach known for dramatic low-tide recession that temporarily exposes large stretches of seabed."
  },
  {
    "id": "borra-caves",
    "name": "Borra Caves",
    "state": "Andhra Pradesh",
    "location": "Araku Valley region",
    "type": "Limestone cave system",
    "season": "October – March",
    "description": "A limestone cave system in the Eastern Ghats with large chambers and naturally formed mineral formations.",
    "fact": "Slow mineral deposition formed varied stalactites and stalagmites over very long periods.",
    "images": [
      "assets/travel_hidden.png",
      "assets/travel_mountains.png",
      "assets/travel_forests.png"
    ],
    "search": "borra caves andhra pradesh araku valley region limestone cave system a limestone cave system in the eastern ghats with large chambers and naturally formed mineral formations."
  },
  {
    "id": "dudhsagar-falls",
    "name": "Dudhsagar Falls",
    "state": "Goa",
    "location": "Western Ghats",
    "type": "Tiered waterfall",
    "season": "Post-monsoon",
    "description": "A powerful multi-tiered waterfall descending through forested Western Ghats terrain near the Goa–Karnataka border.",
    "fact": "Its name means 'Sea of Milk', inspired by the white appearance of the cascading water.",
    "images": [
      "assets/travel_forests.png",
      "assets/travel_mountains.png",
      "assets/travel_hidden.png"
    ],
    "search": "dudhsagar falls goa western ghats tiered waterfall a powerful multi-tiered waterfall descending through forested western ghats terrain near the goa–karnataka border."
  },
  {
    "id": "great-rann-of-kutch",
    "name": "Great Rann of Kutch",
    "state": "Gujarat",
    "location": "Kutch district",
    "type": "Seasonal salt marsh",
    "season": "November – February",
    "description": "A vast seasonal salt marsh that transforms from monsoon wetland conditions into expansive white salt flats.",
    "fact": "Seasonal water and evaporation dramatically reshape the appearance of the landscape through the year.",
    "images": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "great rann of kutch gujarat kutch district seasonal salt marsh a vast seasonal salt marsh that transforms from monsoon wetland conditions into expansive white salt flats."
  },
  {
    "id": "loktak-lake",
    "name": "Loktak Lake",
    "state": "Manipur",
    "location": "Bishnupur district",
    "type": "Freshwater lake with phumdis",
    "season": "October – March",
    "description": "A large freshwater lake known for floating masses of vegetation, soil, and organic matter called phumdis.",
    "fact": "The Loktak landscape includes floating habitats closely associated with Keibul Lamjao National Park.",
    "images": [
      "assets/travel_islands.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "loktak lake manipur bishnupur district freshwater lake with phumdis a large freshwater lake known for floating masses of vegetation, soil, and organic matter called phumdis."
  },
  {
    "id": "aghanashini-estuary",
    "name": "Aghanashini Estuary",
    "state": "Karnataka",
    "location": "Uttara Kannada",
    "type": "Estuarine landscape",
    "season": "October – March",
    "description": "A biodiverse estuarine landscape of tidal waters, mudflats, mangroves, and traditional livelihood systems.",
    "fact": "Estuaries are transition zones where river water and seawater interact, supporting distinctive food webs.",
    "images": [
      "assets/travel_islands.png",
      "assets/travel_beaches.png",
      "assets/travel_forests.png"
    ],
    "search": "aghanashini estuary karnataka uttara kannada estuarine landscape a biodiverse estuarine landscape of tidal waters, mudflats, mangroves, and traditional livelihood systems."
  }
];
  const fallbackImage = "assets/hero_banner.png";
  const grid = document.getElementById("wonder-grid");
  const searchInput = document.getElementById("wonder-search");
  const stateFilter = document.getElementById("state-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");
  const modal = document.getElementById("wonder-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");
  let activeWonder = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  [...new Set(wonders.map(w => w.state))].sort().forEach(state => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateFilter.append(option);
  });

  function createCard(w) {
    const card = document.createElement("article");
    card.className = "wonder-card";
    card.dataset.id = w.id;
    card.innerHTML = `
      <div class="wonder-media">
        <img src="${escapeHtml(w.images[0])}" alt="${escapeHtml(w.name)}" loading="lazy">
        <span class="state-badge">${escapeHtml(w.state)}</span>
        <span class="type-badge">${escapeHtml(w.type)}</span>
        <button class="gallery-button" type="button" data-wonder-id="${escapeHtml(w.id)}">◫ Explore</button>
      </div>
      <div class="wonder-body">
        <h3>${escapeHtml(w.name)}</h3>
        <p class="wonder-location">${escapeHtml(w.location)}</p>
        <p class="wonder-description">${escapeHtml(w.description)}</p>
        <div class="fun-fact-preview"><span>Fun fact</span><p>${escapeHtml(w.fact)}</p></div>
      </div>`;
    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, {once:true});
    return card;
  }

  grid.replaceChildren(...wonders.map(createCard));
  document.getElementById("hero-total").textContent = wonders.length;
  document.getElementById("hero-states").textContent = new Set(wonders.map(w => w.state)).size;

  function filter() {
    const q = searchInput.value.trim().toLowerCase();
    const state = stateFilter.value;
    const visible = wonders.filter(w =>
      (!q || w.search.includes(q)) &&
      (state === "all" || w.state === state)
    );
    const ids = new Set(visible.map(w => w.id));
    document.querySelectorAll(".wonder-card").forEach(card => card.hidden = !ids.has(card.dataset.id));
    const active = q || state !== "all";
    status.textContent = active
      ? `Found ${visible.length} wonder${visible.length === 1 ? "" : "s"}`
      : `Showing all ${visible.length} wonders`;
    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function reset() {
    searchInput.value = "";
    stateFilter.value = "all";
    filter();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeWonder.images;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeWonder.name} gallery image ${imageIndex + 1}`;
    modalImage.onerror = () => { modalImage.onerror = null; modalImage.src = fallbackImage; };
    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(wonder, trigger) {
    activeWonder = wonder;
    imageIndex = 0;
    lastFocus = trigger;
    document.getElementById("modal-location").textContent = `${wonder.location}, ${wonder.state}`;
    document.getElementById("modal-title").textContent = wonder.name;
    document.getElementById("modal-description").textContent = wonder.description;
    document.getElementById("modal-fact").textContent = wonder.fact;
    document.getElementById("modal-type").textContent = wonder.type;
    document.getElementById("modal-season").textContent = wonder.season;
    updateImage();
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeWonder = null;
    imageIndex = 0;
    if (lastFocus) lastFocus.focus();
  }

  function step(direction) {
    if (!activeWonder) return;
    imageIndex = (imageIndex + direction + activeWonder.images.length) % activeWonder.images.length;
    updateImage();
  }

  searchInput.addEventListener("input", filter);
  stateFilter.addEventListener("change", filter);
  clearButton.addEventListener("click", reset);
  emptyReset.addEventListener("click", reset);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-wonder-id]");
    if (!button) return;
    const wonder = wonders.find(w => w.id === button.dataset.wonderId);
    if (wonder) openModal(wonder, button);
  });

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", () => step(-1));
  modalNext.addEventListener("click", () => step(1));
  modal.addEventListener("click", e => {
    if (e.target.matches("[data-close-modal]")) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  filter();
});
