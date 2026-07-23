document.addEventListener("DOMContentLoaded", () => {
  const imageCredits = [
  {
    "id": "hero-banner",
    "image": "hero_banner.png",
    "path": "assets/hero_banner.png",
    "page": "Home / Shared fallback",
    "category": "Shared",
    "credit": "Project local asset",
    "sourceNote": "Used as a generic fallback image when a specific explorer image is unavailable.",
    "fallbackNote": "Safe default fallback for cards, heroes, and reusable components.",
    "usage": [
      "index.html",
      "../card-deeplink/card-deeplink.js",
      "recently-viewed.js"
    ]
  },
  {
    "id": "culture",
    "image": "culture.png",
    "path": "assets/culture.png",
    "page": "Culture / Glossary / Cuisine",
    "category": "Culture",
    "credit": "Project local asset",
    "sourceNote": "Used for culture-focused pages and cards.",
    "fallbackNote": "Can be used for cultural terms when no specific image exists.",
    "usage": [
      "../culture/culture.html",
      "../glossary/glossary.html",
      "../cuisine/cuisine.html"
    ]
  },
  {
    "id": "heritage-temples",
    "image": "heritage_temples.png",
    "path": "assets/heritage_temples.png",
    "page": "Heritage / Temples / Textiles",
    "category": "Heritage",
    "credit": "Project local asset",
    "sourceNote": "Used for temple, heritage, and tradition-themed cards.",
    "fallbackNote": "Suitable fallback for heritage architecture cards.",
    "usage": [
      "../heritage/heritage.html",
      "temples.html",
      "../textiles/textiles.html"
    ]
  },
  {
    "id": "heritage-forts",
    "image": "heritage_forts.png",
    "path": "assets/heritage_forts.png",
    "page": "Heritage / Forts",
    "category": "Heritage",
    "credit": "Project local asset",
    "sourceNote": "Used for fort and monument-themed content.",
    "fallbackNote": "Suitable fallback for historical monument cards.",
    "usage": [
      "../heritage/heritage.html",
      "forts.html"
    ]
  },
  {
    "id": "heritage-stepwells",
    "image": "heritage_stepwells.png",
    "path": "assets/heritage_stepwells.png",
    "page": "Stepwells / Water Systems",
    "category": "Architecture",
    "credit": "Project local asset",
    "sourceNote": "Used for stepwell and water architecture content.",
    "fallbackNote": "Suitable fallback for water conservation systems.",
    "usage": [
      "../stepwells/stepwells.html",
      "../water-systems/water-systems.html"
    ]
  },
  {
    "id": "travel-forests",
    "image": "travel_forests.png",
    "path": "assets/travel_forests.png",
    "page": "Travel / Wildlife",
    "category": "Nature",
    "credit": "Project local asset",
    "sourceNote": "Used for forest, wildlife, and biodiversity cards.",
    "fallbackNote": "Suitable fallback for forest and nature destinations.",
    "usage": [
      "../travel/travel.html",
      "../wildlife/wildlife.html",
      "../butterfly/butterfly.html"
    ]
  },
  {
    "id": "travel-mountains",
    "image": "travel_mountains.png",
    "path": "assets/travel_mountains.png",
    "page": "Travel / Hill Stations",
    "category": "Travel",
    "credit": "Project local asset",
    "sourceNote": "Used for mountain and hill-station content.",
    "fallbackNote": "Suitable fallback for Himalayan or mountain-region cards.",
    "usage": [
      "../travel/travel.html",
      "../hill-stations/hill-stations.html",
      "../water-systems/water-systems.html"
    ]
  },
  {
    "id": "travel-deserts",
    "image": "travel_deserts.png",
    "path": "assets/travel_deserts.png",
    "page": "Travel / Desert / West India",
    "category": "Travel",
    "credit": "Project local asset",
    "sourceNote": "Used for desert and western India travel cards.",
    "fallbackNote": "Suitable fallback for Rajasthan, dryland, and desert-themed cards.",
    "usage": [
      "../travel/travel.html",
      "../water-systems/water-systems.html",
      "../bazaars/bazaars.html"
    ]
  },
  {
    "id": "travel-islands",
    "image": "travel_islands.png",
    "path": "assets/travel_islands.png",
    "page": "Travel / Islands / Wetlands",
    "category": "Nature",
    "credit": "Project local asset",
    "sourceNote": "Used for island, wetland, and coastal nature cards.",
    "fallbackNote": "Suitable fallback for island or wetland destinations.",
    "usage": [
      "../travel/travel.html",
      "../wildlife/wildlife.html",
      "../hidden-wonders/hidden-wonders.html"
    ]
  },
  {
    "id": "travel-beaches",
    "image": "travel_beaches.png",
    "path": "assets/travel_beaches.png",
    "page": "Travel / Beaches",
    "category": "Travel",
    "credit": "Project local asset",
    "sourceNote": "Used for beach and coastal travel content.",
    "fallbackNote": "Suitable fallback for coastal destinations.",
    "usage": [
      "../travel/travel.html",
      "../hidden-wonders/hidden-wonders.html"
    ]
  },
  {
    "id": "travel-hidden",
    "image": "travel_hidden.png",
    "path": "assets/travel_hidden.png",
    "page": "Hidden Wonders",
    "category": "Nature",
    "credit": "Project local asset",
    "sourceNote": "Used for lesser-known natural places and hidden destination cards.",
    "fallbackNote": "Suitable fallback for hidden or offbeat travel cards.",
    "usage": [
      "../hidden-wonders/hidden-wonders.html",
      "../travel/travel.html"
    ]
  },
  {
    "id": "heritage-ruins",
    "image": "heritage_ruins.png",
    "path": "assets/heritage_ruins.png",
    "page": "Heritage / Scripts / Ancient Sites",
    "category": "History",
    "credit": "Project local asset",
    "sourceNote": "Used for ruins, ancient sites, and historical knowledge pages.",
    "fallbackNote": "Suitable fallback for ancient universities, scripts, and ruins.",
    "usage": [
      "../heritage/heritage.html",
      "../scripts/scripts.html",
      "../universities/universities.html"
    ]
  }
];

  const grid = document.getElementById("credits-grid");
  const searchInput = document.getElementById("credits-search");
  const categoryFilter = document.getElementById("category-filter");
  const pageFilter = document.getElementById("page-filter");
  const summaryGrid = document.getElementById("summary-grid");
  const resultStatus = document.getElementById("result-status");
  const resetButton = document.getElementById("reset-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const categories = [...new Set(imageCredits.map(item => item.category))].sort();
  const pages = [...new Set(imageCredits.flatMap(item => [item.page, ...item.usage]))].sort();

  const searchableCredits = imageCredits.map(item => ({
    ...item,
    search: [
      item.image,
      item.path,
      item.page,
      item.category,
      item.credit,
      item.sourceNote,
      item.fallbackNote,
      item.usage.join(" ")
    ].join(" ").toLowerCase()
  }));

  function populateFilters() {
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.append(option);
    });

    pages.forEach(page => {
      const option = document.createElement("option");
      option.value = page;
      option.textContent = page;
      pageFilter.append(option);
    });
  }

  function renderStats() {
    document.getElementById("image-count").textContent = imageCredits.length;
    document.getElementById("category-count").textContent = categories.length;
    document.getElementById("page-count").textContent = pages.length;

    const fallbackCount = imageCredits.filter(item => item.fallbackNote).length;
    const sharedCount = imageCredits.filter(item => item.category === "Shared").length;

    const cards = [
      ["Images listed", imageCredits.length],
      ["Categories", categories.length],
      ["Fallback notes", fallbackCount],
      ["Shared assets", sharedCount]
    ];

    summaryGrid.innerHTML = cards.map(([label, value]) => `
      <article class="summary-card">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </article>
    `).join("");
  }

  function renderCard(item) {
    const usage = item.usage.map(page => `<span class="usage-pill">${escapeHtml(page)}</span>`).join("");

    return `
      <article class="credit-card">
        <div class="credit-card__image">
          <img src="${escapeHtml(item.path)}" alt="${escapeHtml(item.image)} preview" onerror="this.src='assets/hero_banner.png'">
          <span class="credit-badge">${escapeHtml(item.category)}</span>
        </div>
        <div class="credit-card__body">
          <div>
            <h3>${escapeHtml(item.image)}</h3>
            <div class="credit-path">${escapeHtml(item.path)}</div>
          </div>
          <div class="credit-meta">
            <p><strong>Page / group:</strong> ${escapeHtml(item.page)}</p>
            <p><strong>Credit:</strong> ${escapeHtml(item.credit)}</p>
            <p><strong>Source note:</strong> ${escapeHtml(item.sourceNote)}</p>
            <p><strong>Fallback note:</strong> ${escapeHtml(item.fallbackNote)}</p>
          </div>
          <div class="usage-list" aria-label="Usage locations">${usage}</div>
        </div>
      </article>
    `;
  }

  function getFilteredCredits() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const page = pageFilter.value;

    return searchableCredits.filter(item =>
      (!query || item.search.includes(query)) &&
      (category === "all" || item.category === category) &&
      (page === "all" || item.page === page || item.usage.includes(page))
    );
  }

  function renderCredits() {
    const filtered = getFilteredCredits();

    grid.innerHTML = filtered.map(renderCard).join("");
    grid.hidden = filtered.length === 0;
    emptyState.classList.toggle("visible", filtered.length === 0);

    resultStatus.textContent = filtered.length === imageCredits.length
      ? `Showing all ${imageCredits.length} image credits`
      : `Showing ${filtered.length} of ${imageCredits.length} image credits`;
  }

  function resetFilters() {
    searchInput.value = "";
    categoryFilter.value = "all";
    pageFilter.value = "all";
    renderCredits();
    searchInput.focus();
  }

  populateFilters();
  renderStats();
  renderCredits();

  searchInput.addEventListener("input", renderCredits);
  categoryFilter.addEventListener("change", renderCredits);
  pageFilter.addEventListener("change", renderCredits);
  resetButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  window.ImageCreditsPanel = {
    credits: () => [...imageCredits],
    filter: renderCredits,
  };
});
