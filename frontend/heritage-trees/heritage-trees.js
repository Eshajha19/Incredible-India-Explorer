document.addEventListener("DOMContentLoaded", () => {
  const trees = [
  {
    "id": "great-banyan",
    "name": "The Great Banyan",
    "scientific": "Ficus benghalensis",
    "state": "West Bengal",
    "location": "Acharya Jagadish Chandra Bose Indian Botanic Garden, Howrah",
    "age": "Over 250 years",
    "significance": "One of the world's most famous banyan trees, celebrated for its immense canopy and living network of prop roots.",
    "fact": "From a distance, the tree's prop roots and branches can resemble an entire forest rather than a single organism.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "the great banyan ficus benghalensis west bengal acharya jagadish chandra bose indian botanic garden, howrah over 250 years one of the world's most famous banyan trees, celebrated for its immense canopy and living network of prop roots. from a distance, the tree's prop roots and branches can resemble an entire forest rather than a single organism."
  },
  {
    "id": "thimmamma-marrimanu",
    "name": "Thimmamma Marrimanu",
    "scientific": "Ficus benghalensis",
    "state": "Andhra Pradesh",
    "location": "Anantapur district",
    "age": "Several centuries old",
    "significance": "A vast banyan tree associated with local tradition and widely known for its extraordinary spread across a large area.",
    "fact": "Its aerial roots descend to the ground and become pillar-like supports, allowing the canopy to keep expanding.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_deserts.png",
      "assets/travel_hidden.png"
    ],
    "search": "thimmamma marrimanu ficus benghalensis andhra pradesh anantapur district several centuries old a vast banyan tree associated with local tradition and widely known for its extraordinary spread across a large area. its aerial roots descend to the ground and become pillar-like supports, allowing the canopy to keep expanding."
  },
  {
    "id": "bodhi-tree",
    "name": "Sacred Bodhi Tree",
    "scientific": "Ficus religiosa",
    "state": "Bihar",
    "location": "Mahabodhi Temple Complex, Bodh Gaya",
    "age": "Present tree linked to an ancient sacred lineage",
    "significance": "The Bodhi Tree is central to Buddhist tradition as the sacred tree associated with the Buddha's enlightenment.",
    "fact": "The present tree is revered as part of a long-protected lineage connected symbolically and historically with the original Bodhi Tree.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_forests.png",
      "assets/heritage_ruins.png"
    ],
    "search": "sacred bodhi tree ficus religiosa bihar mahabodhi temple complex, bodh gaya present tree linked to an ancient sacred lineage the bodhi tree is central to buddhist tradition as the sacred tree associated with the buddha's enlightenment. the present tree is revered as part of a long-protected lineage connected symbolically and historically with the original bodhi tree."
  },
  {
    "id": "akshayavat",
    "name": "Akshayavat",
    "scientific": "Ficus benghalensis",
    "state": "Uttar Pradesh",
    "location": "Prayagraj",
    "age": "Ancient sacred tradition",
    "significance": "A sacred banyan associated with Hindu traditions of immortality, pilgrimage, and the spiritual landscape of Prayagraj.",
    "fact": "Its name means the 'indestructible banyan', reflecting the belief that it endures through cosmic cycles.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "akshayavat ficus benghalensis uttar pradesh prayagraj ancient sacred tradition a sacred banyan associated with hindu traditions of immortality, pilgrimage, and the spiritual landscape of prayagraj. its name means the 'indestructible banyan', reflecting the belief that it endures through cosmic cycles."
  },
  {
    "id": "parijaat-kintur",
    "name": "Parijaat of Kintur",
    "scientific": "Adansonia digitata",
    "state": "Uttar Pradesh",
    "location": "Kintur, Barabanki district",
    "age": "Estimated at several centuries",
    "significance": "A culturally revered baobab tree linked with local legends and religious traditions.",
    "fact": "Although often called Parijaat locally, botanically the tree is identified with the African baobab genus.",
    "image": "assets/travel_hidden.png",
    "gallery": [
      "assets/travel_hidden.png",
      "assets/travel_deserts.png",
      "assets/travel_forests.png"
    ],
    "search": "parijaat of kintur adansonia digitata uttar pradesh kintur, barabanki district estimated at several centuries a culturally revered baobab tree linked with local legends and religious traditions. although often called parijaat locally, botanically the tree is identified with the african baobab genus."
  },
  {
    "id": "pillalamarri",
    "name": "Pillalamarri",
    "scientific": "Ficus benghalensis",
    "state": "Telangana",
    "location": "Mahbubnagar",
    "age": "Around 700 years",
    "significance": "A historic banyan whose sprawling canopy and prop roots have made it a major natural landmark of Telangana.",
    "fact": "The name is often interpreted as referring to the many 'children' formed by its descending prop roots.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "pillalamarri ficus benghalensis telangana mahbubnagar around 700 years a historic banyan whose sprawling canopy and prop roots have made it a major natural landmark of telangana. the name is often interpreted as referring to the many 'children' formed by its descending prop roots."
  },
  {
    "id": "kabirvad",
    "name": "Kabirvad",
    "scientific": "Ficus benghalensis",
    "state": "Gujarat",
    "location": "Narmada River island near Bharuch",
    "age": "Several centuries old",
    "significance": "A large banyan grove associated in tradition with the poet-saint Kabir and visited as a cultural and natural landmark.",
    "fact": "Its many trunks are connected through the banyan's natural system of aerial roots and branching growth.",
    "image": "assets/travel_islands.png",
    "gallery": [
      "assets/travel_islands.png",
      "assets/travel_forests.png",
      "assets/travel_hidden.png"
    ],
    "search": "kabirvad ficus benghalensis gujarat narmada river island near bharuch several centuries old a large banyan grove associated in tradition with the poet-saint kabir and visited as a cultural and natural landmark. its many trunks are connected through the banyan's natural system of aerial roots and branching growth."
  },
  {
    "id": "dodda-alada-mara",
    "name": "Dodda Alada Mara",
    "scientific": "Ficus benghalensis",
    "state": "Karnataka",
    "location": "Kethohalli near Bengaluru",
    "age": "About 400 years",
    "significance": "A celebrated old banyan near Bengaluru known for a broad canopy supported by numerous prop roots.",
    "fact": "Its Kannada name translates to 'Big Banyan Tree'.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "dodda alada mara ficus benghalensis karnataka kethohalli near bengaluru about 400 years a celebrated old banyan near bengaluru known for a broad canopy supported by numerous prop roots. its kannada name translates to 'big banyan tree'."
  },
  {
    "id": "adansonia-mandu",
    "name": "Mandu Baobabs",
    "scientific": "Adansonia digitata",
    "state": "Madhya Pradesh",
    "location": "Mandu, Dhar district",
    "age": "Several centuries",
    "significance": "Historic baobab trees form an unusual botanical feature of Mandu's cultural landscape and are associated with long-distance exchange routes.",
    "fact": "Baobabs are native to Africa, making their old presence in central India a fascinating part of cultural and trade history.",
    "image": "assets/heritage_forts.png",
    "gallery": [
      "assets/heritage_forts.png",
      "assets/travel_deserts.png",
      "assets/travel_hidden.png"
    ],
    "search": "mandu baobabs adansonia digitata madhya pradesh mandu, dhar district several centuries historic baobab trees form an unusual botanical feature of mandu's cultural landscape and are associated with long-distance exchange routes. baobabs are native to africa, making their old presence in central india a fascinating part of cultural and trade history."
  },
  {
    "id": "peepal-jaya-sri-maha-bodhi-lineage",
    "name": "Anuradhapura Lineage Peepal Tradition",
    "scientific": "Ficus religiosa",
    "state": "Odisha",
    "location": "Buddhist heritage landscapes of eastern India",
    "age": "Sacred lineage tradition",
    "significance": "Peepal trees across Buddhist sacred landscapes carry cultural meaning through remembered links with the Bodhi Tree tradition.",
    "fact": "Sacred-tree lineages are often preserved through ritual memory, transplantation, and community protection.",
    "image": "assets/heritage_ruins.png",
    "gallery": [
      "assets/heritage_ruins.png",
      "assets/travel_forests.png",
      "assets/heritage_temples.png"
    ],
    "search": "anuradhapura lineage peepal tradition ficus religiosa odisha buddhist heritage landscapes of eastern india sacred lineage tradition peepal trees across buddhist sacred landscapes carry cultural meaning through remembered links with the bodhi tree tradition. sacred-tree lineages are often preserved through ritual memory, transplantation, and community protection."
  },
  {
    "id": "char-chinar",
    "name": "Char Chinar",
    "scientific": "Platanus orientalis",
    "state": "Jammu and Kashmir",
    "location": "Dal Lake, Srinagar",
    "age": "Historic landscape trees",
    "significance": "Chinar trees are iconic to Kashmir's cultural landscape, and Char Chinar is among the most recognisable island tree groupings in Dal Lake.",
    "fact": "Chinar foliage turns vivid shades of gold and red in autumn, making the species central to Kashmir's seasonal visual identity.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_islands.png",
      "assets/travel_forests.png"
    ],
    "search": "char chinar platanus orientalis jammu and kashmir dal lake, srinagar historic landscape trees chinar trees are iconic to kashmir's cultural landscape, and char chinar is among the most recognisable island tree groupings in dal lake. chinar foliage turns vivid shades of gold and red in autumn, making the species central to kashmir's seasonal visual identity."
  },
  {
    "id": "sacred-groves-meghalaya",
    "name": "Mawphlang Sacred Grove Trees",
    "scientific": "Mixed native forest species",
    "state": "Meghalaya",
    "location": "Mawphlang, East Khasi Hills",
    "age": "Ancient community-protected forest tradition",
    "significance": "The sacred grove represents a living conservation tradition where cultural beliefs have helped protect native forest biodiversity.",
    "fact": "Sacred-grove customs traditionally discourage removing plants or natural materials from the protected forest.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/travel_mountains.png"
    ],
    "search": "mawphlang sacred grove trees mixed native forest species meghalaya mawphlang, east khasi hills ancient community-protected forest tradition the sacred grove represents a living conservation tradition where cultural beliefs have helped protect native forest biodiversity. sacred-grove customs traditionally discourage removing plants or natural materials from the protected forest."
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("tree-grid");
  const searchInput = document.getElementById("tree-search");
  const stateFilter = document.getElementById("state-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");

  const modal = document.getElementById("tree-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activeTree = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  [...new Set(trees.map(tree => tree.state))]
    .sort((a,b) => a.localeCompare(b))
    .forEach(state => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateFilter.append(option);
    });

  function createCard(tree) {
    const card = document.createElement("article");
    card.className = "tree-card";
    card.dataset.id = tree.id;

    card.innerHTML = `
      <div class="tree-media">
        <img src="${escapeHtml(tree.image)}" alt="${escapeHtml(tree.name)}" loading="lazy">
        <span class="state-badge">${escapeHtml(tree.state)}</span>
        <span class="age-badge">${escapeHtml(tree.age)}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(tree.id)}">
          Explore tree
        </button>
      </div>

      <div class="tree-body">
        <h3>${escapeHtml(tree.name)}</h3>
        <p class="scientific">${escapeHtml(tree.scientific)}</p>
        <p class="location">${escapeHtml(tree.location)}</p>
        <p class="significance">${escapeHtml(tree.significance)}</p>
      </div>`;

    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, {once:true});

    return card;
  }

  grid.replaceChildren(...trees.map(createCard));
  document.getElementById("hero-count").textContent = trees.length;
  document.getElementById("hero-state-count").textContent =
    new Set(trees.map(tree => tree.state)).size;

  function filterTrees() {
    const query = searchInput.value.trim().toLowerCase();
    const state = stateFilter.value;

    const visible = trees.filter(tree =>
      (!query || tree.search.includes(query)) &&
      (state === "all" || tree.state === state)
    );

    const ids = new Set(visible.map(tree => tree.id));

    document.querySelectorAll(".tree-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });

    const active = query || state !== "all";

    status.textContent = active
      ? `Found ${visible.length} heritage stor${visible.length === 1 ? "y" : "ies"}`
      : `Showing all ${visible.length} heritage stories`;

    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    stateFilter.value = "all";
    filterTrees();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeTree.gallery;

    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeTree.name} gallery image ${imageIndex + 1}`;

    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };

    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(tree, trigger) {
    activeTree = tree;
    imageIndex = 0;
    lastFocus = trigger;

    document.getElementById("modal-state").textContent = tree.state;
    document.getElementById("modal-title").textContent = tree.name;
    document.getElementById("modal-scientific").textContent = tree.scientific;
    document.getElementById("modal-location").textContent = tree.location;
    document.getElementById("modal-age").textContent = tree.age;
    document.getElementById("modal-significance").textContent = tree.significance;
    document.getElementById("modal-fact").textContent = tree.fact;

    updateImage();

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");

    activeTree = null;
    imageIndex = 0;

    if (lastFocus) lastFocus.focus();
  }

  function stepGallery(direction) {
    if (!activeTree) return;

    imageIndex =
      (imageIndex + direction + activeTree.gallery.length) %
      activeTree.gallery.length;

    updateImage();
  }

  searchInput.addEventListener("input", filterTrees);
  stateFilter.addEventListener("change", filterTrees);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;

    const tree = trees.find(item => item.id === button.dataset.id);
    if (tree) openModal(tree, button);
  });

  modalClose.addEventListener("click", closeModal);

  document.getElementById("modal-prev")
    .addEventListener("click", () => stepGallery(-1));

  document.getElementById("modal-next")
    .addEventListener("click", () => stepGallery(1));

  modal.addEventListener("click", event => {
    if (event.target.matches("[data-close-modal]")) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (modal.hidden) return;

    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") stepGallery(-1);
    if (event.key === "ArrowRight") stepGallery(1);
  });

  filterTrees();
});
