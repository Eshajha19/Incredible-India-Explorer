document.addEventListener("DOMContentLoaded", () => {
  const datasets = [
  {
    "id": "heritage-sites",
    "name": "Heritage Sites",
    "page": "heritage.html",
    "category": "Heritage",
    "expectedFields": [
      "id",
      "name",
      "state",
      "category",
      "description",
      "image"
    ],
    "items": [
      {
        "id": "taj-mahal",
        "name": "Taj Mahal",
        "state": "Uttar Pradesh",
        "category": "Monument",
        "description": "A marble mausoleum and UNESCO World Heritage Site in Agra.",
        "image": "assets/heritage_temples.png"
      },
      {
        "id": "hampi",
        "name": "Hampi",
        "state": "Karnataka",
        "category": "Ruins",
        "description": "A historic landscape of temples, ruins, and Vijayanagara heritage.",
        "image": "assets/heritage_ruins.png"
      },
      {
        "id": "qutub-minar",
        "name": "Qutub Minar",
        "state": "Delhi",
        "category": "Monument",
        "description": "A tall minaret and historic complex representing Indo-Islamic architecture.",
        "image": "assets/heritage_forts.png"
      }
    ]
  },
  {
    "id": "wildlife",
    "name": "Wildlife",
    "page": "wildlife.html",
    "category": "Nature",
    "expectedFields": [
      "id",
      "name",
      "state",
      "habitat",
      "description",
      "image"
    ],
    "items": [
      {
        "id": "kaziranga",
        "name": "Kaziranga National Park",
        "state": "Assam",
        "habitat": "Grassland and wetlands",
        "description": "Known for the Indian one-horned rhinoceros and wetland biodiversity.",
        "image": "assets/travel_forests.png"
      },
      {
        "id": "gir",
        "name": "Gir National Park",
        "state": "Gujarat",
        "habitat": "Dry deciduous forest",
        "description": "The last natural habitat of the Asiatic lion.",
        "image": "assets/travel_deserts.png"
      },
      {
        "id": "sundarbans",
        "name": "Sundarbans",
        "state": "West Bengal",
        "habitat": "Mangrove delta",
        "description": "A large mangrove ecosystem associated with tigers and tidal waterways.",
        "image": "assets/travel_islands.png"
      }
    ]
  },
  {
    "id": "cuisine",
    "name": "Cuisine",
    "page": "cuisine.html",
    "category": "Culture",
    "expectedFields": [
      "id",
      "name",
      "state",
      "type",
      "description",
      "image"
    ],
    "items": [
      {
        "id": "biryani",
        "name": "Hyderabadi Biryani",
        "state": "Telangana",
        "type": "Rice dish",
        "description": "Layered rice and meat dish with fragrant spices.",
        "image": "assets/culture.png"
      },
      {
        "id": "dhokla",
        "name": "Dhokla",
        "state": "Gujarat",
        "type": "Snack",
        "description": "Steamed savoury snack made from fermented batter.",
        "image": "assets/culture.png"
      },
      {
        "id": "litti-chokha",
        "name": "Litti Chokha",
        "state": "Bihar",
        "type": "Traditional meal",
        "description": "Baked wheat balls served with mashed vegetables.",
        "image": "assets/culture.png"
      }
    ]
  },
  {
    "id": "textiles",
    "name": "Textile Traditions",
    "page": "textiles.html",
    "category": "Craft",
    "expectedFields": [
      "id",
      "name",
      "state",
      "material",
      "technique",
      "description",
      "image"
    ],
    "items": [
      {
        "id": "banarasi-silk",
        "name": "Banarasi Silk",
        "state": "Uttar Pradesh",
        "material": "Silk with zari",
        "technique": "Brocade weaving",
        "description": "Rich woven silk tradition associated with Varanasi.",
        "image": "assets/heritage_temples.png"
      },
      {
        "id": "kanjeevaram",
        "name": "Kanjeevaram Silk",
        "state": "Tamil Nadu",
        "material": "Silk and zari",
        "technique": "Heavy silk weaving",
        "description": "Ceremonial silk tradition with temple motifs and contrast borders.",
        "image": "assets/heritage_temples.png"
      },
      {
        "id": "patola",
        "name": "Patola",
        "state": "Gujarat",
        "material": "Silk",
        "technique": "Double ikat",
        "description": "Highly skilled resist-dyed textile tradition.",
        "image": "assets/travel_deserts.png"
      }
    ]
  },
  {
    "id": "water-systems",
    "name": "Water Systems",
    "page": "water-systems.html",
    "category": "Sustainability",
    "expectedFields": [
      "id",
      "name",
      "state",
      "region",
      "type",
      "description",
      "image"
    ],
    "items": [
      {
        "id": "johads",
        "name": "Johads",
        "state": "Rajasthan",
        "region": "West",
        "type": "Rainwater harvesting",
        "description": "Earthen structures that collect runoff and recharge groundwater.",
        "image": "assets/travel_deserts.png"
      },
      {
        "id": "zings",
        "name": "Zings",
        "state": "Ladakh",
        "region": "North",
        "type": "Meltwater storage",
        "description": "Small tanks storing snow and glacier meltwater.",
        "image": "assets/travel_mountains.png"
      },
      {
        "id": "kulhs",
        "name": "Kulhs",
        "state": "Himachal Pradesh",
        "region": "North",
        "type": "Mountain channel",
        "description": "Community-managed channels for terraced farms.",
        "image": "assets/travel_mountains.png"
      }
    ]
  },
  {
    "id": "scripts",
    "name": "Scripts",
    "page": "scripts.html",
    "category": "Knowledge",
    "expectedFields": [
      "id",
      "name",
      "period",
      "region",
      "languages",
      "description",
      "image"
    ],
    "items": [
      {
        "id": "brahmi",
        "name": "Brahmi",
        "period": "Ancient",
        "region": "Pan-Indian",
        "languages": "Prakrit, Sanskrit",
        "description": "Influential ancient script ancestor to many later scripts.",
        "image": "assets/heritage_ruins.png"
      },
      {
        "id": "devanagari",
        "name": "Devanagari",
        "period": "Medieval / Modern",
        "region": "North India",
        "languages": "Hindi, Sanskrit, Marathi",
        "description": "Major Indic script with a horizontal headline.",
        "image": "assets/culture.png"
      },
      {
        "id": "ol-chiki",
        "name": "Ol Chiki",
        "period": "Modern",
        "region": "Eastern India",
        "languages": "Santali",
        "description": "Modern script created for Santali language.",
        "image": "assets/culture.png"
      }
    ]
  }
];

  const searchInput = document.getElementById("dataset-search");
  const statusFilter = document.getElementById("status-filter");
  const summaryGrid = document.getElementById("summary-grid");
  const validationList = document.getElementById("validation-list");
  const resultStatus = document.getElementById("result-status");
  const emptyState = document.getElementById("empty-state");
  const resetButton = document.getElementById("reset-filters");
  const expandAllButton = document.getElementById("expand-all");

  const validImagePattern = /^(assets\/).+\.(png|jpg|jpeg|webp|svg)$/i;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function analyseDataset(dataset) {
    const issues = [];
    const ids = new Map();
    let checkedFields = 0;
    let presentFields = 0;

    dataset.items.forEach((item, index) => {
      const label = item.name || item.title || `Item ${index + 1}`;

      dataset.expectedFields.forEach((field) => {
        checkedFields += 1;

        if (item[field] !== undefined && String(item[field]).trim() !== "") {
          presentFields += 1;
        } else {
          issues.push({
            severity: "critical",
            title: `Missing required field: ${field}`,
            message: `${label} is missing the "${field}" field.`
          });
        }
      });

      if (item.id) {
        if (ids.has(item.id)) {
          issues.push({
            severity: "critical",
            title: "Duplicate ID detected",
            message: `${label} uses duplicate ID "${item.id}", also used by ${ids.get(item.id)}.`
          });
        } else {
          ids.set(item.id, label);
        }
      }

      if (item.image && !validImagePattern.test(item.image)) {
        issues.push({
          severity: "warning",
          title: "Suspicious image path",
          message: `${label} uses "${item.image}". Expected an assets/ path ending in png, jpg, jpeg, webp, or svg.`
        });
      }

      const textFields = ["description", "significance", "history", "fact", "howItWorks"];
      const hasLongText = textFields.some((field) => item[field] && String(item[field]).trim().length >= 35);

      if (!hasLongText) {
        issues.push({
          severity: "warning",
          title: "Thin description",
          message: `${label} may need a stronger description, significance, history, or fact field.`
        });
      }
    });

    const completeness = checkedFields === 0 ? 100 : Math.round((presentFields / checkedFields) * 100);
    const criticalCount = issues.filter(issue => issue.severity === "critical").length;
    const warningCount = issues.filter(issue => issue.severity === "warning").length;

    const status = criticalCount > 0
      ? "critical"
      : warningCount > 0 || completeness < 90
        ? "warning"
        : "healthy";

    const searchBlob = [
      dataset.name,
      dataset.page,
      dataset.category,
      status,
      ...issues.map(issue => `${issue.title} ${issue.message}`)
    ].join(" ").toLowerCase();

    return {
      ...dataset,
      score: completeness,
      status,
      issues,
      criticalCount,
      warningCount,
      checkedFields,
      presentFields,
      searchBlob
    };
  }

  const analysed = datasets.map(analyseDataset);

  function renderHeroStats() {
    const totalItems = analysed.reduce((sum, dataset) => sum + dataset.items.length, 0);
    const averageScore = Math.round(
      analysed.reduce((sum, dataset) => sum + dataset.score, 0) / analysed.length
    );

    document.getElementById("total-datasets").textContent = analysed.length;
    document.getElementById("total-items").textContent = totalItems;
    document.getElementById("avg-score").textContent = `${averageScore}%`;
  }

  function renderSummary() {
    const healthy = analysed.filter(dataset => dataset.status === "healthy").length;
    const warning = analysed.filter(dataset => dataset.status === "warning").length;
    const critical = analysed.filter(dataset => dataset.status === "critical").length;
    const issues = analysed.reduce((sum, dataset) => sum + dataset.issues.length, 0);

    const cards = [
      ["Datasets", analysed.length, ""],
      ["Healthy", healthy, "good"],
      ["Needs attention", warning, "warn"],
      ["Critical", critical || issues, critical ? "bad" : "warn"],
    ];

    summaryGrid.innerHTML = cards.map(([label, value, tone]) => `
      <article class="summary-card ${tone}">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </article>
    `).join("");
  }

  function statusLabel(status) {
    if (status === "healthy") return "Healthy";
    if (status === "warning") return "Needs attention";
    return "Critical";
  }

  function renderDatasetRow(dataset) {
    const issueCount = dataset.issues.length;
    const issueText = issueCount === 1 ? "1 issue" : `${issueCount} issues`;
    const issuesHtml = issueCount
      ? dataset.issues.map(issue => `
          <div class="issue-item ${escapeHtml(issue.severity)}">
            <strong>${escapeHtml(issue.title)}</strong>
            <p>${escapeHtml(issue.message)}</p>
          </div>
        `).join("")
      : `<div class="issue-item good">
          <strong>No blocking issues found</strong>
          <p>This dataset has complete required fields, unique IDs, and expected image path patterns.</p>
        </div>`;

    return `
      <article class="dataset-row" data-status="${escapeHtml(dataset.status)}">
        <button class="dataset-toggle" type="button" aria-expanded="false">
          <span class="dataset-title">
            <strong>${escapeHtml(dataset.name)}</strong>
            <span>${escapeHtml(dataset.page)} · ${escapeHtml(dataset.category)}</span>
          </span>
          <span class="dataset-meta">
            <strong>${dataset.items.length} items</strong>
            <span>${dataset.expectedFields.length} required fields</span>
          </span>
          <span class="score-pill">${dataset.score}%</span>
          <span class="status-pill ${escapeHtml(dataset.status)}">${statusLabel(dataset.status)}</span>
          <span class="dataset-chevron" aria-hidden="true">⌄</span>
        </button>

        <div class="dataset-details">
          <div class="details-grid">
            <div class="detail-box">
              <h4>Dataset summary</h4>
              <ul class="detail-list">
                <li>Page: ${escapeHtml(dataset.page)}</li>
                <li>Items checked: ${dataset.items.length}</li>
                <li>Fields present: ${dataset.presentFields} / ${dataset.checkedFields}</li>
                <li>Warnings: ${dataset.warningCount}</li>
                <li>Critical issues: ${dataset.criticalCount}</li>
              </ul>
            </div>

            <div class="detail-box">
              <h4>Validation details · ${escapeHtml(issueText)}</h4>
              <div class="issue-list">${issuesHtml}</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function getFilteredDatasets() {
    const query = searchInput.value.trim().toLowerCase();
    const status = statusFilter.value;

    return analysed.filter(dataset =>
      (!query || dataset.searchBlob.includes(query)) &&
      (status === "all" || dataset.status === status)
    );
  }

  function renderList() {
    const filtered = getFilteredDatasets();

    validationList.innerHTML = filtered.map(renderDatasetRow).join("");
    emptyState.classList.toggle("visible", filtered.length === 0);
    validationList.hidden = filtered.length === 0;

    resultStatus.textContent = filtered.length === analysed.length
      ? "Showing all datasets"
      : `Showing ${filtered.length} of ${analysed.length} datasets`;

    document.querySelectorAll(".dataset-toggle").forEach(button => {
      button.addEventListener("click", () => {
        const row = button.closest(".dataset-row");
        const isOpen = row.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
      });
    });
  }

  function resetFilters() {
    searchInput.value = "";
    statusFilter.value = "all";
    renderList();
    searchInput.focus();
  }

  function toggleAllRows() {
    const rows = Array.from(document.querySelectorAll(".dataset-row"));
    const shouldOpen = rows.some(row => !row.classList.contains("is-open"));

    rows.forEach(row => {
      row.classList.toggle("is-open", shouldOpen);
      const button = row.querySelector(".dataset-toggle");
      if (button) button.setAttribute("aria-expanded", String(shouldOpen));
    });

    expandAllButton.textContent = shouldOpen ? "Collapse all" : "Expand all";
  }

  searchInput.addEventListener("input", renderList);
  statusFilter.addEventListener("change", renderList);
  resetButton.addEventListener("click", resetFilters);
  expandAllButton.addEventListener("click", toggleAllRows);

  renderHeroStats();
  renderSummary();
  renderList();
});
