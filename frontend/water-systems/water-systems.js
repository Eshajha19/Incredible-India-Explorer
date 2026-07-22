document.addEventListener("DOMContentLoaded", () => {
  const systems = [
  {
    "id": "johads",
    "name": "Johads",
    "state": "Rajasthan",
    "region": "west",
    "type": "rainwater-harvesting",
    "terrain": "Arid and semi-arid villages",
    "howItWorks": "Small earthen check dams collect rainwater and slow runoff, allowing water to seep into the ground and recharge wells.",
    "importance": "Johads are community-built structures often linked with village-level water security in dry landscapes.",
    "fact": "A single well-maintained johad can improve groundwater availability for surrounding farms and settlements.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "johads rajasthan west rainwater harvesting arid and semi arid villages small earthen check dams collect rainwater and slow runoff, allowing water to seep into the ground and recharge wells. johads are community built structures often linked with village level water security in dry landscapes. a single well maintained johad can improve groundwater availability for surrounding farms and settlements."
  },
  {
    "id": "ahar-pyne",
    "name": "Ahar-Pyne",
    "state": "Bihar",
    "region": "east",
    "type": "floodplain-irrigation",
    "terrain": "Floodplains and monsoon-fed agricultural land",
    "howItWorks": "Pynes are channels that divert water into ahars, which act as storage reservoirs for irrigation and local water needs.",
    "importance": "This system uses the natural slope and seasonal water flow of Bihar's plains for agriculture.",
    "fact": "Ahar-Pyne networks show how floodwater can be stored and reused instead of being treated only as a hazard.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "ahar pyne bihar east floodplain irrigation floodplains and monsoon fed agricultural land pynes are channels that divert water into ahars, which act as storage reservoirs for irrigation and local water needs. this system uses the natural slope and seasonal water flow of bihar's plains for agriculture. ahar pyne networks show how floodwater can be stored and reused instead of being treated only as a hazard."
  },
  {
    "id": "zings",
    "name": "Zings",
    "state": "Ladakh",
    "region": "north",
    "type": "glacier-melt-storage",
    "terrain": "Cold desert and high-altitude Himalayan terrain",
    "howItWorks": "Small tanks collect and store glacier or snowmelt water so it can be used for fields during short growing seasons.",
    "importance": "Zings are adapted to Ladakh's cold desert climate where rainfall is low but meltwater is seasonally important.",
    "fact": "They reflect careful timing because water availability depends heavily on snow and glacier melt cycles.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "zings ladakh north glacier melt storage cold desert and high altitude himalayan terrain small tanks collect and store glacier or snowmelt water so it can be used for fields during short growing seasons. zings are adapted to ladakh's cold desert climate where rainfall is low but meltwater is seasonally important. they reflect careful timing because water availability depends heavily on snow and glacier melt cycles."
  },
  {
    "id": "bamboo-drip-irrigation",
    "name": "Bamboo Drip Irrigation",
    "state": "Meghalaya",
    "region": "northeast",
    "type": "drip-irrigation",
    "terrain": "Hilly and humid forested terrain",
    "howItWorks": "Bamboo channels carry spring water downhill and release it gradually near plant roots through tiny outlets.",
    "importance": "This low-cost system is strongly associated with Khasi and Jaintia hill farming knowledge.",
    "fact": "It can reduce water wastage by delivering small controlled flows directly where crops need them.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "bamboo drip irrigation meghalaya northeast drip irrigation hilly and humid forested terrain bamboo channels carry spring water downhill and release it gradually near plant roots through tiny outlets. this low cost system is strongly associated with khasi and jaintia hill farming knowledge. it can reduce water wastage by delivering small controlled flows directly where crops need them."
  },
  {
    "id": "eri-tank-system",
    "name": "Eri Tank System",
    "state": "Tamil Nadu",
    "region": "south",
    "type": "tank-irrigation",
    "terrain": "Semi-arid plains and village agricultural landscapes",
    "howItWorks": "A chain of tanks captures monsoon runoff, stores it, supports irrigation, and helps manage local water tables.",
    "importance": "Eri tanks have supported village agriculture, livestock, fisheries, and local ecology for centuries.",
    "fact": "Many tanks are connected in cascades, so overflow from one tank can feed another downstream.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "eri tank system tamil nadu south tank irrigation semi arid plains and village agricultural landscapes a chain of tanks captures monsoon runoff, stores it, supports irrigation, and helps manage local water tables. eri tanks have supported village agriculture, livestock, fisheries, and local ecology for centuries. many tanks are connected in cascades, so overflow from one tank can feed another downstream."
  },
  {
    "id": "khadin",
    "name": "Khadin",
    "state": "Rajasthan",
    "region": "west",
    "type": "runoff-farming",
    "terrain": "Desert and dryland farming zones",
    "howItWorks": "An earthen embankment captures runoff water on agricultural land, allowing moisture to remain in the soil for crops.",
    "importance": "Khadin farming is an ingenious dryland method for using brief monsoon runoff in desert regions.",
    "fact": "Crops are grown on the moist bed after water gradually infiltrates or recedes.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "khadin rajasthan west runoff farming desert and dryland farming zones an earthen embankment captures runoff water on agricultural land, allowing moisture to remain in the soil for crops. khadin farming is an ingenious dryland method for using brief monsoon runoff in desert regions. crops are grown on the moist bed after water gradually infiltrates or recedes."
  },
  {
    "id": "surangam",
    "name": "Surangam",
    "state": "Kerala / Karnataka",
    "region": "south",
    "type": "subsurface-channel",
    "terrain": "Laterite hills and sloping terrain",
    "howItWorks": "Horizontal tunnels are dug into laterite hillsides to tap groundwater and carry it out for household or farm use.",
    "importance": "Surangams are gravity-based systems, so water flows without pumps when the tunnel is properly aligned.",
    "fact": "They are especially associated with parts of Kasaragod and nearby regions with laterite landscapes.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "surangam kerala / karnataka south subsurface channel laterite hills and sloping terrain horizontal tunnels are dug into laterite hillsides to tap groundwater and carry it out for household or farm use. surangams are gravity based systems, so water flows without pumps when the tunnel is properly aligned. they are especially associated with parts of kasaragod and nearby regions with laterite landscapes."
  },
  {
    "id": "kunds",
    "name": "Kunds",
    "state": "Western India",
    "region": "west",
    "type": "rainwater-storage",
    "terrain": "Dry settlements and desert-edge regions",
    "howItWorks": "Circular or covered underground tanks collect rainwater from a prepared catchment surface for domestic use.",
    "importance": "Kunds are designed to protect precious rainwater from evaporation and contamination in arid climates.",
    "fact": "Their sloped catchment surfaces guide rainwater into storage chambers below ground.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "kunds western india west rainwater storage dry settlements and desert edge regions circular or covered underground tanks collect rainwater from a prepared catchment surface for domestic use. kunds are designed to protect precious rainwater from evaporation and contamination in arid climates. their sloped catchment surfaces guide rainwater into storage chambers below ground."
  },
  {
    "id": "kulhs",
    "name": "Kulhs",
    "state": "Himachal Pradesh",
    "region": "north",
    "type": "mountain-channel",
    "terrain": "Mountain valleys and terraced farms",
    "howItWorks": "Community-managed channels divert stream water from hillsides to irrigate terraced fields.",
    "importance": "Kulhs are built around shared maintenance and water distribution rules in Himalayan villages.",
    "fact": "The channels often follow natural contours, reducing the need for mechanical lifting.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "kulhs himachal pradesh north mountain channel mountain valleys and terraced farms community managed channels divert stream water from hillsides to irrigate terraced fields. kulhs are built around shared maintenance and water distribution rules in himalayan villages. the channels often follow natural contours, reducing the need for mechanical lifting."
  },
  {
    "id": "cheruvu-tanks",
    "name": "Cheruvu Tanks",
    "state": "Telangana / Andhra Pradesh",
    "region": "south",
    "type": "tank-irrigation",
    "terrain": "Deccan plateau villages and dryland agriculture",
    "howItWorks": "Village tanks store monsoon runoff and support irrigation, groundwater recharge, livestock, and local ecology.",
    "importance": "Cheruvus have shaped settlement and farming patterns across parts of the Deccan for generations.",
    "fact": "Tank restoration can help revive traditional water commons and improve drought resilience.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "cheruvu tanks telangana / andhra pradesh south tank irrigation deccan plateau villages and dryland agriculture village tanks store monsoon runoff and support irrigation, groundwater recharge, livestock, and local ecology. cheruvus have shaped settlement and farming patterns across parts of the deccan for generations. tank restoration can help revive traditional water commons and improve drought resilience."
  },
  {
    "id": "apatani-irrigation",
    "name": "Apatani Paddy-Fish System",
    "state": "Arunachal Pradesh",
    "region": "northeast",
    "type": "integrated-irrigation",
    "terrain": "Wet valley agricultural landscape",
    "howItWorks": "Carefully managed channels distribute water through paddy fields where rice cultivation is combined with fish rearing.",
    "importance": "The system reflects precise community water sharing and ecological farming knowledge of the Apatani valley.",
    "fact": "It combines food production, water management, and biodiversity within the same landscape.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "apatani paddy fish system arunachal pradesh northeast integrated irrigation wet valley agricultural landscape carefully managed channels distribute water through paddy fields where rice cultivation is combined with fish rearing. the system reflects precise community water sharing and ecological farming knowledge of the apatani valley. it combines food production, water management, and biodiversity within the same landscape."
  },
  {
    "id": "zabo-system",
    "name": "Zabo System",
    "state": "Nagaland",
    "region": "northeast",
    "type": "watershed-management",
    "terrain": "Hill slopes and terraced agricultural terrain",
    "howItWorks": "Rainwater from forested catchments is guided through ponds, livestock areas, and fields in an integrated watershed system.",
    "importance": "Zabo means impounding water and is known for linking forest, livestock, soil, and crop management.",
    "fact": "It treats the whole hill slope as a connected water and nutrient system.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "zabo system nagaland northeast watershed management hill slopes and terraced agricultural terrain rainwater from forested catchments is guided through ponds, livestock areas, and fields in an integrated watershed system. zabo means impounding water and is known for linking forest, livestock, soil, and crop management. it treats the whole hill slope as a connected water and nutrient system."
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("water-grid");
  const searchInput = document.getElementById("water-search");
  const regionFilter = document.getElementById("region-filter");
  const typeFilter = document.getElementById("type-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");
  const modal = document.getElementById("water-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activeSystem = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  const labelType = (value) => value.split("-").map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  [...new Set(systems.map(system => system.type))]
    .sort()
    .forEach(type => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = labelType(type);
      typeFilter.append(option);
    });

  function createCard(system) {
    const card = document.createElement("article");
    card.className = "water-card";
    card.dataset.id = system.id;
    card.innerHTML = `
      <div class="water-media">
        <img src="${escapeHtml(system.image)}" alt="${escapeHtml(system.name)}" loading="lazy">
        <span class="state-badge">${escapeHtml(system.state)}</span>
        <span class="type-badge">${escapeHtml(labelType(system.type))}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(system.id)}">Explore system</button>
      </div>
      <div class="water-body">
        <h3>${escapeHtml(system.name)}</h3>
        <p class="terrain">${escapeHtml(system.terrain)}</p>
        <p class="how">${escapeHtml(system.howItWorks)}</p>
        <div class="importance-preview">${escapeHtml(system.importance)}</div>
      </div>`;
    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, { once: true });
    return card;
  }

  grid.replaceChildren(...systems.map(createCard));
  document.getElementById("hero-count").textContent = systems.length;

  function filterSystems() {
    const query = searchInput.value.trim().toLowerCase();
    const region = regionFilter.value;
    const type = typeFilter.value;
    const visible = systems.filter(system =>
      (!query || system.search.includes(query)) &&
      (region === "all" || system.region === region) &&
      (type === "all" || system.type === type)
    );
    const ids = new Set(visible.map(system => system.id));
    document.querySelectorAll(".water-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });
    const active = query || region !== "all" || type !== "all";
    status.textContent = active
      ? `Found ${visible.length} water system${visible.length === 1 ? "" : "s"}`
      : `Showing all ${visible.length} systems`;
    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    regionFilter.value = "all";
    typeFilter.value = "all";
    filterSystems();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeSystem.gallery;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeSystem.name} gallery image ${imageIndex + 1}`;
    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };
    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(system, trigger) {
    activeSystem = system;
    imageIndex = 0;
    lastFocus = trigger;
    document.getElementById("modal-state").textContent = system.state;
    document.getElementById("modal-title").textContent = system.name;
    document.getElementById("modal-terrain").textContent = system.terrain;
    document.getElementById("modal-type").textContent = labelType(system.type);
    document.getElementById("modal-how").textContent = system.howItWorks;
    document.getElementById("modal-importance").textContent = system.importance;
    document.getElementById("modal-fact").textContent = system.fact;
    updateImage();
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeSystem = null;
    imageIndex = 0;
    if (lastFocus) lastFocus.focus();
  }

  function stepGallery(direction) {
    if (!activeSystem) return;
    imageIndex = (imageIndex + direction + activeSystem.gallery.length) % activeSystem.gallery.length;
    updateImage();
  }

  searchInput.addEventListener("input", filterSystems);
  regionFilter.addEventListener("change", filterSystems);
  typeFilter.addEventListener("change", filterSystems);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    const system = systems.find(item => item.id === button.dataset.id);
    if (system) openModal(system, button);
  });

  modalClose.addEventListener("click", closeModal);
  document.getElementById("modal-prev").addEventListener("click", () => stepGallery(-1));
  document.getElementById("modal-next").addEventListener("click", () => stepGallery(1));
  modal.addEventListener("click", event => {
    if (event.target.matches("[data-close-modal]")) closeModal();
  });
  document.addEventListener("keydown", event => {
    if (modal.hidden) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") stepGallery(-1);
    if (event.key === "ArrowRight") stepGallery(1);
  });

  filterSystems();
});
