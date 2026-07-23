document.addEventListener("DOMContentLoaded", () => {
  const plants = [
  {
    "id": "tulsi",
    "common": "Tulsi",
    "botanical": "Ocimum tenuiflorum",
    "region": "all-india",
    "regionLabel": "Widespread",
    "habitat": "Cultivated in homes and gardens; thrives in warm tropical and subtropical conditions.",
    "uses": [
      "Traditionally used in Ayurveda for respiratory comfort",
      "Used in household herbal infusions",
      "Traditionally associated with digestive and general wellness support"
    ],
    "fact": "Tulsi is culturally significant across India and is commonly grown near homes and temples.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "tulsi ocimum tenuiflorum widespread cultivated in homes and gardens; thrives in warm tropical and subtropical conditions. tulsi is culturally significant across india and is commonly grown near homes and temples. traditionally used in ayurveda for respiratory comfort used in household herbal infusions traditionally associated with digestive and general wellness support"
  },
  {
    "id": "ashwagandha",
    "common": "Ashwagandha",
    "botanical": "Withania somnifera",
    "region": "central-west",
    "regionLabel": "Central & Western India",
    "habitat": "Dry and subtropical regions, including semi-arid landscapes and cultivated medicinal farms.",
    "uses": [
      "Traditionally classified as a rasayana in Ayurveda",
      "Traditional use for vitality and resilience",
      "Root preparations are prominent in classical Ayurvedic practice"
    ],
    "fact": "The root is the most widely used part in traditional Ayurvedic preparations.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "ashwagandha withania somnifera central & western india dry and subtropical regions, including semi-arid landscapes and cultivated medicinal farms. the root is the most widely used part in traditional ayurvedic preparations. traditionally classified as a rasayana in ayurveda traditional use for vitality and resilience root preparations are prominent in classical ayurvedic practice"
  },
  {
    "id": "neem",
    "common": "Neem",
    "botanical": "Azadirachta indica",
    "region": "all-india",
    "regionLabel": "Widespread",
    "habitat": "Common in tropical and semi-arid regions; widely planted along roads, farms, and settlements.",
    "uses": [
      "Traditionally used in skin and hygiene practices",
      "Leaves and twigs have long-standing household uses",
      "Used in several traditional external preparations"
    ],
    "fact": "Different parts of the neem tree—leaves, bark, seeds, and twigs—have distinct traditional applications.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "neem azadirachta indica widespread common in tropical and semi-arid regions; widely planted along roads, farms, and settlements. different parts of the neem tree—leaves, bark, seeds, and twigs—have distinct traditional applications. traditionally used in skin and hygiene practices leaves and twigs have long-standing household uses used in several traditional external preparations"
  },
  {
    "id": "amla",
    "common": "Amla",
    "botanical": "Phyllanthus emblica",
    "region": "north-central",
    "regionLabel": "North & Central India",
    "habitat": "Dry deciduous forests and cultivated orchards across tropical and subtropical India.",
    "uses": [
      "Traditionally used as a rejuvenative food and herb",
      "A key ingredient in several classical formulations",
      "Traditionally associated with digestive and general wellness support"
    ],
    "fact": "The fruit is naturally rich in vitamin C and is widely used in foods, preserves, and traditional formulations.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_islands.png"
    ],
    "search": "amla phyllanthus emblica north & central india dry deciduous forests and cultivated orchards across tropical and subtropical india. the fruit is naturally rich in vitamin c and is widely used in foods, preserves, and traditional formulations. traditionally used as a rejuvenative food and herb a key ingredient in several classical formulations traditionally associated with digestive and general wellness support"
  },
  {
    "id": "brahmi",
    "common": "Brahmi",
    "botanical": "Bacopa monnieri",
    "region": "wetlands",
    "regionLabel": "Wetlands across India",
    "habitat": "Moist soils, marshy areas, pond edges, and other wet habitats.",
    "uses": [
      "Traditionally associated with memory and learning support",
      "Used in medhya rasayana traditions",
      "Commonly prepared in classical herbal formulations"
    ],
    "fact": "Brahmi is a small creeping herb adapted to wet conditions and can grow close to water bodies.",
    "image": "assets/travel_islands.png",
    "gallery": [
      "assets/travel_islands.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "brahmi bacopa monnieri wetlands across india moist soils, marshy areas, pond edges, and other wet habitats. brahmi is a small creeping herb adapted to wet conditions and can grow close to water bodies. traditionally associated with memory and learning support used in medhya rasayana traditions commonly prepared in classical herbal formulations"
  },
  {
    "id": "giloy",
    "common": "Giloy",
    "botanical": "Tinospora cordifolia",
    "region": "tropical",
    "regionLabel": "Tropical India",
    "habitat": "A climbing shrub found in tropical regions, often growing over trees and hedges.",
    "uses": [
      "Traditionally used in Ayurveda for general wellness",
      "Used in classical formulations under practitioner guidance",
      "Stem is the commonly used plant part in traditional practice"
    ],
    "fact": "Giloy is a climbing vine with characteristic heart-shaped leaves and aerial roots.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "giloy tinospora cordifolia tropical india a climbing shrub found in tropical regions, often growing over trees and hedges. giloy is a climbing vine with characteristic heart-shaped leaves and aerial roots. traditionally used in ayurveda for general wellness used in classical formulations under practitioner guidance stem is the commonly used plant part in traditional practice"
  },
  {
    "id": "turmeric",
    "common": "Turmeric",
    "botanical": "Curcuma longa",
    "region": "south-east",
    "regionLabel": "South & Eastern India",
    "habitat": "Warm, humid tropical areas with cultivated fields receiving seasonal rainfall.",
    "uses": [
      "Traditional culinary and Ayurvedic use",
      "Used in external pastes in traditional practice",
      "Included in numerous household and classical formulations"
    ],
    "fact": "The bright yellow colour comes largely from curcuminoid pigments in the underground rhizome.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "turmeric curcuma longa south & eastern india warm, humid tropical areas with cultivated fields receiving seasonal rainfall. the bright yellow colour comes largely from curcuminoid pigments in the underground rhizome. traditional culinary and ayurvedic use used in external pastes in traditional practice included in numerous household and classical formulations"
  },
  {
    "id": "shatavari",
    "common": "Shatavari",
    "botanical": "Asparagus racemosus",
    "region": "central-south",
    "regionLabel": "Central & Southern India",
    "habitat": "Tropical and subtropical scrub, forest margins, and cultivated medicinal gardens.",
    "uses": [
      "Traditionally used as a nourishing Ayurvedic herb",
      "Root preparations are used in classical formulations",
      "Associated with traditional women's wellness practices"
    ],
    "fact": "The plant develops clusters of tuberous roots, the part most commonly used in traditional formulations.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_deserts.png"
    ],
    "search": "shatavari asparagus racemosus central & southern india tropical and subtropical scrub, forest margins, and cultivated medicinal gardens. the plant develops clusters of tuberous roots, the part most commonly used in traditional formulations. traditionally used as a nourishing ayurvedic herb root preparations are used in classical formulations associated with traditional women's wellness practices"
  },
  {
    "id": "arjuna",
    "common": "Arjuna",
    "botanical": "Terminalia arjuna",
    "region": "riverine",
    "regionLabel": "Riverine India",
    "habitat": "Riverbanks and moist deciduous landscapes across many parts of the Indian subcontinent.",
    "uses": [
      "Bark is traditionally used in Ayurvedic formulations",
      "Traditional association with cardiovascular wellness",
      "Used as a component in classical preparations"
    ],
    "fact": "Arjuna trees are often found near rivers and are recognised by their broad trunks and smooth, pale bark.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_islands.png",
      "assets/travel_hidden.png"
    ],
    "search": "arjuna terminalia arjuna riverine india riverbanks and moist deciduous landscapes across many parts of the indian subcontinent. arjuna trees are often found near rivers and are recognised by their broad trunks and smooth, pale bark. bark is traditionally used in ayurvedic formulations traditional association with cardiovascular wellness used as a component in classical preparations"
  },
  {
    "id": "aloe-vera",
    "common": "Aloe Vera",
    "botanical": "Aloe vera",
    "region": "dry-west",
    "regionLabel": "Dry & Western India",
    "habitat": "Dry and semi-arid areas; also widely cultivated in household and commercial gardens.",
    "uses": [
      "Gel is traditionally used in external skin applications",
      "Used in household cosmetic preparations",
      "Included in several traditional formulations"
    ],
    "fact": "The thick succulent leaves store water-rich gel, helping the plant tolerate dry conditions.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/travel_forests.png"
    ],
    "search": "aloe vera aloe vera dry & western india dry and semi-arid areas; also widely cultivated in household and commercial gardens. the thick succulent leaves store water-rich gel, helping the plant tolerate dry conditions. gel is traditionally used in external skin applications used in household cosmetic preparations included in several traditional formulations"
  },
  {
    "id": "jatamansi",
    "common": "Jatamansi",
    "botanical": "Nardostachys jatamansi",
    "region": "himalayan",
    "regionLabel": "Himalayan Region",
    "habitat": "High-altitude Himalayan slopes and alpine-subalpine environments.",
    "uses": [
      "Traditionally used in calming and medhya formulations",
      "Rhizomes and roots are used in classical preparations",
      "Traditional association with sleep and mental well-being practices"
    ],
    "fact": "Jatamansi is a high-altitude aromatic herb whose underground parts are valued in traditional systems.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "jatamansi nardostachys jatamansi himalayan region high-altitude himalayan slopes and alpine-subalpine environments. jatamansi is a high-altitude aromatic herb whose underground parts are valued in traditional systems. traditionally used in calming and medhya formulations rhizomes and roots are used in classical preparations traditional association with sleep and mental well-being practices"
  },
  {
    "id": "mulethi",
    "common": "Mulethi",
    "botanical": "Glycyrrhiza glabra",
    "region": "north-west",
    "regionLabel": "North & Northwest",
    "habitat": "Cultivated and naturalised in suitable dry temperate and subtropical conditions.",
    "uses": [
      "Root is traditionally used for throat comfort",
      "Used in Ayurvedic herbal combinations",
      "Traditionally used in soothing preparations"
    ],
    "fact": "The root has a naturally sweet taste due to glycyrrhizin and is used in several traditional preparations.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_deserts.png",
      "assets/travel_hidden.png"
    ],
    "search": "mulethi glycyrrhiza glabra north & northwest cultivated and naturalised in suitable dry temperate and subtropical conditions. the root has a naturally sweet taste due to glycyrrhizin and is used in several traditional preparations. root is traditionally used for throat comfort used in ayurvedic herbal combinations traditionally used in soothing preparations"
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("plant-grid");
  const searchInput = document.getElementById("plant-search");
  const regionFilter = document.getElementById("region-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");

  const modal = document.getElementById("plant-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activePlant = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  const regions = [...new Map(
    plants.map(p => [p.region, p.regionLabel])
  ).entries()].sort((a,b) => a[1].localeCompare(b[1]));

  regions.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    regionFilter.append(option);
  });

  function createCard(plant) {
    const card = document.createElement("article");
    card.className = "plant-card";
    card.dataset.id = plant.id;

    card.innerHTML = `
      <div class="plant-media">
        <img src="${escapeHtml(plant.image)}" alt="${escapeHtml(plant.common)}" loading="lazy">
        <span class="region-badge">${escapeHtml(plant.regionLabel)}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(plant.id)}">
          Explore plant
        </button>
      </div>
      <div class="plant-body">
        <h3>${escapeHtml(plant.common)}</h3>
        <p class="botanical">${escapeHtml(plant.botanical)}</p>
        <p class="habitat-preview">${escapeHtml(plant.habitat)}</p>
        <div class="use-preview">${escapeHtml(plant.uses[0])}</div>
      </div>`;

    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, {once:true});
    return card;
  }

  grid.replaceChildren(...plants.map(createCard));
  document.getElementById("hero-count").textContent = plants.length;

  function filterPlants() {
    const q = searchInput.value.trim().toLowerCase();
    const region = regionFilter.value;

    const visible = plants.filter(plant =>
      (!q || plant.search.includes(q)) &&
      (region === "all" || plant.region === region)
    );

    const ids = new Set(visible.map(p => p.id));

    document.querySelectorAll(".plant-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });

    const active = q || region !== "all";

    status.textContent = active
      ? `Found ${visible.length} plant${visible.length === 1 ? "" : "s"}`
      : `Showing all ${visible.length} plants`;

    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    regionFilter.value = "all";
    filterPlants();
    searchInput.focus();
  }

  function updateImage() {
    const images = activePlant.gallery;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activePlant.common} gallery image ${imageIndex + 1}`;

    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };

    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(plant, trigger) {
    activePlant = plant;
    imageIndex = 0;
    lastFocus = trigger;

    document.getElementById("modal-region").textContent = plant.regionLabel;
    document.getElementById("modal-title").textContent = plant.common;
    document.getElementById("modal-botanical").textContent = plant.botanical;
    document.getElementById("modal-habitat").textContent = plant.habitat;
    document.getElementById("modal-fact").textContent = plant.fact;

    const usesList = document.getElementById("modal-uses");
    usesList.replaceChildren(
      ...plant.uses.map(use => {
        const li = document.createElement("li");
        li.textContent = use;
        return li;
      })
    );

    updateImage();

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activePlant = null;
    imageIndex = 0;

    if (lastFocus) lastFocus.focus();
  }

  function stepGallery(direction) {
    if (!activePlant) return;

    imageIndex =
      (imageIndex + direction + activePlant.gallery.length) %
      activePlant.gallery.length;

    updateImage();
  }

  searchInput.addEventListener("input", filterPlants);
  regionFilter.addEventListener("change", filterPlants);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;

    const plant = plants.find(item => item.id === button.dataset.id);
    if (plant) openModal(plant, button);
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

  filterPlants();
});
