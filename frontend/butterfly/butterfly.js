document.addEventListener("DOMContentLoaded", () => {
  const butterflies = [
  {
    "id": "blue-mormon",
    "name": "Blue Mormon",
    "scientific": "Papilio polymnestor",
    "region": "western-ghats",
    "regionLabel": "Western Ghats",
    "habitat": "Evergreen and semi-evergreen forests, wooded gardens, and moist lowland habitats.",
    "status": "Locally common",
    "season": "Monsoon to early winter",
    "description": "A large swallowtail with deep black wings and striking powder-blue markings on the hindwings.",
    "fact": "The Blue Mormon is the state butterfly of Maharashtra.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "blue mormon papilio polymnestor western ghats evergreen and semi-evergreen forests, wooded gardens, and moist lowland habitats. locally common monsoon to early winter a large swallowtail with deep black wings and striking powder-blue markings on the hindwings. the blue mormon is the state butterfly of maharashtra."
  },
  {
    "id": "common-mormon",
    "name": "Common Mormon",
    "scientific": "Papilio polytes",
    "region": "all-india",
    "regionLabel": "Widespread India",
    "habitat": "Gardens, scrub, forest edges, plantations, and urban green spaces.",
    "status": "Widespread",
    "season": "Most of the year; often abundant in warm months",
    "description": "A familiar swallowtail known for female forms that mimic toxic red-bodied swallowtails.",
    "fact": "Females occur in multiple forms, including mimetic forms that resemble unpalatable species.",
    "image": "assets/travel_hidden.png",
    "gallery": [
      "assets/travel_hidden.png",
      "assets/travel_forests.png",
      "assets/hero_banner.png"
    ],
    "search": "common mormon papilio polytes widespread india gardens, scrub, forest edges, plantations, and urban green spaces. widespread most of the year; often abundant in warm months a familiar swallowtail known for female forms that mimic toxic red-bodied swallowtails. females occur in multiple forms, including mimetic forms that resemble unpalatable species."
  },
  {
    "id": "common-jezebel",
    "name": "Common Jezebel",
    "scientific": "Delias eucharis",
    "region": "all-india",
    "regionLabel": "Widespread India",
    "habitat": "Open forests, gardens, scrub, plantations, and flowering landscapes.",
    "status": "Common",
    "season": "Most of the year",
    "description": "A colourful pierid with white upperwings and bright yellow-red patterning underneath.",
    "fact": "Its bright underside colours act as a warning signal to predators.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_islands.png"
    ],
    "search": "common jezebel delias eucharis widespread india open forests, gardens, scrub, plantations, and flowering landscapes. common most of the year a colourful pierid with white upperwings and bright yellow-red patterning underneath. its bright underside colours act as a warning signal to predators."
  },
  {
    "id": "southern-birdwing",
    "name": "Southern Birdwing",
    "scientific": "Troides minos",
    "region": "western-ghats",
    "regionLabel": "Western Ghats",
    "habitat": "Moist evergreen forests, hill slopes, river valleys, and forested plantations.",
    "status": "Range-restricted",
    "season": "Monsoon and post-monsoon months",
    "description": "One of India's largest butterflies, with long black forewings and golden-yellow hindwings.",
    "fact": "Its slow, powerful flight and large wingspan make it one of the most impressive butterflies of peninsular India.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "southern birdwing troides minos western ghats moist evergreen forests, hill slopes, river valleys, and forested plantations. range-restricted monsoon and post-monsoon months one of india's largest butterflies, with long black forewings and golden-yellow hindwings. its slow, powerful flight and large wingspan make it one of the most impressive butterflies of peninsular india."
  },
  {
    "id": "common-rose",
    "name": "Common Rose",
    "scientific": "Pachliopta aristolochiae",
    "region": "all-india",
    "regionLabel": "Widespread India",
    "habitat": "Gardens, scrublands, forest edges, agricultural landscapes, and low hills.",
    "status": "Widespread",
    "season": "Most of the year",
    "description": "A black swallowtail with a red body and red markings on the hindwings.",
    "fact": "Its larvae feed on Aristolochia vines and store defensive chemicals from the host plant.",
    "image": "assets/travel_hidden.png",
    "gallery": [
      "assets/travel_hidden.png",
      "assets/travel_forests.png",
      "assets/travel_mountains.png"
    ],
    "search": "common rose pachliopta aristolochiae widespread india gardens, scrublands, forest edges, agricultural landscapes, and low hills. widespread most of the year a black swallowtail with a red body and red markings on the hindwings. its larvae feed on aristolochia vines and store defensive chemicals from the host plant."
  },
  {
    "id": "crimson-rose",
    "name": "Crimson Rose",
    "scientific": "Pachliopta hector",
    "region": "south-india",
    "regionLabel": "Southern India",
    "habitat": "Open country, coastal habitats, scrub, gardens, and forest margins.",
    "status": "Common in range",
    "season": "Most visible after rains",
    "description": "A graceful black swallowtail patterned with white wing spots and crimson hindwing patches.",
    "fact": "Like other rose butterflies, it advertises chemical defence through conspicuous colours and slow flight.",
    "image": "assets/travel_beaches.png",
    "gallery": [
      "assets/travel_beaches.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "crimson rose pachliopta hector southern india open country, coastal habitats, scrub, gardens, and forest margins. common in range most visible after rains a graceful black swallowtail patterned with white wing spots and crimson hindwing patches. like other rose butterflies, it advertises chemical defence through conspicuous colours and slow flight."
  },
  {
    "id": "common-tiger",
    "name": "Common Tiger",
    "scientific": "Danaus genutia",
    "region": "all-india",
    "regionLabel": "Widespread India",
    "habitat": "Open countryside, gardens, wetlands, scrub, and forest edges.",
    "status": "Widespread",
    "season": "Most of the year",
    "description": "An orange-and-black danaid butterfly with dark veins that create a tiger-striped appearance.",
    "fact": "Its caterpillars feed on milkweed relatives and acquire chemical defences from their host plants.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "common tiger danaus genutia widespread india open countryside, gardens, wetlands, scrub, and forest edges. widespread most of the year an orange-and-black danaid butterfly with dark veins that create a tiger-striped appearance. its caterpillars feed on milkweed relatives and acquire chemical defences from their host plants."
  },
  {
    "id": "plain-tiger",
    "name": "Plain Tiger",
    "scientific": "Danaus chrysippus",
    "region": "all-india",
    "regionLabel": "Widespread India",
    "habitat": "Open habitats, grasslands, gardens, dry scrub, roadsides, and farmland.",
    "status": "Very common",
    "season": "Throughout much of the year",
    "description": "A highly recognisable orange butterfly with black wing borders and white-spotted tips.",
    "fact": "It is one of the best-known milkweed butterflies across Africa and Asia.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/travel_forests.png"
    ],
    "search": "plain tiger danaus chrysippus widespread india open habitats, grasslands, gardens, dry scrub, roadsides, and farmland. very common throughout much of the year a highly recognisable orange butterfly with black wing borders and white-spotted tips. it is one of the best-known milkweed butterflies across africa and asia."
  },
  {
    "id": "lime-butterfly",
    "name": "Lime Butterfly",
    "scientific": "Papilio demoleus",
    "region": "all-india",
    "regionLabel": "Widespread India",
    "habitat": "Gardens, citrus orchards, open scrub, farms, and urban areas.",
    "status": "Very common",
    "season": "Most of the year",
    "description": "A fast-flying yellow-and-black swallowtail commonly associated with citrus plants.",
    "fact": "Despite being a swallowtail butterfly, it lacks the long hindwing tails seen in many Papilio species.",
    "image": "assets/travel_hidden.png",
    "gallery": [
      "assets/travel_hidden.png",
      "assets/travel_forests.png",
      "assets/hero_banner.png"
    ],
    "search": "lime butterfly papilio demoleus widespread india gardens, citrus orchards, open scrub, farms, and urban areas. very common most of the year a fast-flying yellow-and-black swallowtail commonly associated with citrus plants. despite being a swallowtail butterfly, it lacks the long hindwing tails seen in many papilio species."
  },
  {
    "id": "common-emigrant",
    "name": "Common Emigrant",
    "scientific": "Catopsilia pomona",
    "region": "all-india",
    "regionLabel": "Widespread India",
    "habitat": "Gardens, open woodland, scrub, farms, roadsides, and flowering urban spaces.",
    "status": "Common",
    "season": "Most of the year; movements increase seasonally",
    "description": "A pale yellow to greenish butterfly often seen moving rapidly across open landscapes.",
    "fact": "Large seasonal movements of emigrant butterflies can sometimes be observed after favourable weather.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_islands.png"
    ],
    "search": "common emigrant catopsilia pomona widespread india gardens, open woodland, scrub, farms, roadsides, and flowering urban spaces. common most of the year; movements increase seasonally a pale yellow to greenish butterfly often seen moving rapidly across open landscapes. large seasonal movements of emigrant butterflies can sometimes be observed after favourable weather."
  },
  {
    "id": "tailed-jay",
    "name": "Tailed Jay",
    "scientific": "Graphium agamemnon",
    "region": "peninsular-northeast",
    "regionLabel": "Peninsular & Northeast India",
    "habitat": "Wooded gardens, evergreen forests, forest edges, and lowland tropical habitats.",
    "status": "Common in suitable habitat",
    "season": "Warm and wet months",
    "description": "A restless, fast-flying swallowtail with bright green spots scattered across dark wings.",
    "fact": "Tailed Jays rarely remain still for long and often feed while rapidly vibrating their wings.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_mountains.png",
      "assets/travel_hidden.png"
    ],
    "search": "tailed jay graphium agamemnon peninsular & northeast india wooded gardens, evergreen forests, forest edges, and lowland tropical habitats. common in suitable habitat warm and wet months a restless, fast-flying swallowtail with bright green spots scattered across dark wings. tailed jays rarely remain still for long and often feed while rapidly vibrating their wings."
  },
  {
    "id": "great-eggfly",
    "name": "Great Eggfly",
    "scientific": "Hypolimnas bolina",
    "region": "all-india",
    "regionLabel": "Widespread India",
    "habitat": "Forest edges, gardens, scrub, coastal habitats, and secondary vegetation.",
    "status": "Widespread",
    "season": "Most visible in warm months",
    "description": "A strongly dimorphic butterfly: males are dark with bright iridescent spots, while females vary greatly.",
    "fact": "Females show remarkable variation in appearance and may resemble other butterfly species.",
    "image": "assets/travel_islands.png",
    "gallery": [
      "assets/travel_islands.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "great eggfly hypolimnas bolina widespread india forest edges, gardens, scrub, coastal habitats, and secondary vegetation. widespread most visible in warm months a strongly dimorphic butterfly: males are dark with bright iridescent spots, while females vary greatly. females show remarkable variation in appearance and may resemble other butterfly species."
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("butterfly-grid");
  const searchInput = document.getElementById("butterfly-search");
  const regionFilter = document.getElementById("region-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");

  const modal = document.getElementById("butterfly-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activeButterfly = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  const regions = [...new Map(
    butterflies.map(b => [b.region, b.regionLabel])
  ).entries()].sort((a,b) => a[1].localeCompare(b[1]));

  regions.forEach(([value,label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    regionFilter.append(option);
  });

  function createCard(b) {
    const card = document.createElement("article");
    card.className = "butterfly-card";
    card.dataset.id = b.id;

    card.innerHTML = `
      <div class="butterfly-media">
        <img src="${escapeHtml(b.image)}" alt="${escapeHtml(b.name)}" loading="lazy">
        <span class="region-badge">${escapeHtml(b.regionLabel)}</span>
        <span class="status-badge">${escapeHtml(b.status)}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(b.id)}">
          Explore species
        </button>
      </div>
      <div class="butterfly-body">
        <h3>${escapeHtml(b.name)}</h3>
        <p class="scientific">${escapeHtml(b.scientific)}</p>
        <p class="habitat-preview">${escapeHtml(b.habitat)}</p>
        <div class="season-box">
          <span>Seasonal visibility</span>
          ${escapeHtml(b.season)}
        </div>
      </div>`;

    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, {once:true});
    return card;
  }

  grid.replaceChildren(...butterflies.map(createCard));
  document.getElementById("hero-count").textContent = butterflies.length;

  function filterButterflies() {
    const q = searchInput.value.trim().toLowerCase();
    const region = regionFilter.value;

    const visible = butterflies.filter(b =>
      (!q || b.search.includes(q)) &&
      (region === "all" || b.region === region)
    );

    const ids = new Set(visible.map(b => b.id));

    document.querySelectorAll(".butterfly-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });

    const active = q || region !== "all";

    status.textContent = active
      ? `Found ${visible.length} species`
      : `Showing all ${visible.length} species`;

    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    regionFilter.value = "all";
    filterButterflies();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeButterfly.gallery;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeButterfly.name} gallery image ${imageIndex + 1}`;

    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };

    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(b, trigger) {
    activeButterfly = b;
    imageIndex = 0;
    lastFocus = trigger;

    document.getElementById("modal-region").textContent = b.regionLabel;
    document.getElementById("modal-title").textContent = b.name;
    document.getElementById("modal-scientific").textContent = b.scientific;
    document.getElementById("modal-habitat").textContent = b.habitat;
    document.getElementById("modal-status").textContent = b.status;
    document.getElementById("modal-season").textContent = b.season;
    document.getElementById("modal-description").textContent = b.description;
    document.getElementById("modal-fact").textContent = b.fact;

    updateImage();

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeButterfly = null;
    imageIndex = 0;

    if (lastFocus) lastFocus.focus();
  }

  function stepGallery(direction) {
    if (!activeButterfly) return;

    imageIndex =
      (imageIndex + direction + activeButterfly.gallery.length) %
      activeButterfly.gallery.length;

    updateImage();
  }

  searchInput.addEventListener("input", filterButterflies);
  regionFilter.addEventListener("change", filterButterflies);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;

    const butterfly = butterflies.find(b => b.id === button.dataset.id);
    if (butterfly) openModal(butterfly, button);
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

  filterButterflies();
});
