document.addEventListener("DOMContentLoaded", () => {
  const glossaryTerms = [
  {
    "id": "dynasty",
    "term": "Dynasty",
    "category": "History",
    "definition": "A line of rulers from the same family or royal house who governed a region for several generations.",
    "example": "The Maurya, Gupta, Chola, and Mughal dynasties shaped different periods of Indian history.",
    "related": [
      {
        "label": "Heritage",
        "url": "heritage.html"
      },
      {
        "label": "Kingdoms",
        "url": "kingdoms.html"
      }
    ],
    "tags": [
      "kings",
      "empire",
      "rule"
    ]
  },
  {
    "id": "manuscript",
    "term": "Manuscript",
    "category": "Literature",
    "definition": "A handwritten text, often created on palm leaves, paper, birch bark, or cloth before printing became common.",
    "example": "Many Indian manuscripts preserve knowledge about literature, medicine, astronomy, music, and philosophy.",
    "related": [
      {
        "label": "Scripts",
        "url": "scripts.html"
      },
      {
        "label": "Learn",
        "url": "learn.html"
      }
    ],
    "tags": [
      "writing",
      "book",
      "knowledge"
    ]
  },
  {
    "id": "ikat",
    "term": "Ikat",
    "category": "Culture",
    "definition": "A textile technique where threads are resist-dyed before weaving to create patterned designs.",
    "example": "Patola and Pochampally textiles are famous Indian ikat traditions.",
    "related": [
      {
        "label": "Textiles",
        "url": "textiles.html"
      }
    ],
    "tags": [
      "textile",
      "weaving",
      "craft"
    ]
  },
  {
    "id": "mudra",
    "term": "Mudra",
    "category": "Culture",
    "definition": "A symbolic hand gesture used in Indian classical dance, yoga, sculpture, and spiritual traditions.",
    "example": "Classical dance forms use mudras to show emotions, objects, actions, and stories.",
    "related": [
      {
        "label": "Culture",
        "url": "culture.html"
      },
      {
        "label": "Classical Dance",
        "url": "classical-dance.html"
      }
    ],
    "tags": [
      "dance",
      "gesture",
      "symbol"
    ]
  },
  {
    "id": "stepwell",
    "term": "Stepwell",
    "category": "Architecture",
    "definition": "A deep water structure with steps leading down to stored water, often combining utility with beautiful architecture.",
    "example": "Rani ki Vav and Chand Baori are famous examples of Indian stepwell architecture.",
    "related": [
      {
        "label": "Stepwells",
        "url": "stepwells.html"
      },
      {
        "label": "Water Systems",
        "url": "water-systems.html"
      }
    ],
    "tags": [
      "water",
      "architecture",
      "conservation"
    ]
  },
  {
    "id": "biodiversity",
    "term": "Biodiversity",
    "category": "Nature",
    "definition": "The variety of living plants, animals, insects, birds, and microorganisms in a place.",
    "example": "India's forests, wetlands, mountains, coasts, and deserts support rich biodiversity.",
    "related": [
      {
        "label": "Wildlife",
        "url": "wildlife.html"
      },
      {
        "label": "Butterfly Explorer",
        "url": "butterfly.html"
      }
    ],
    "tags": [
      "nature",
      "wildlife",
      "ecosystem"
    ]
  },
  {
    "id": "pilgrimage",
    "term": "Pilgrimage",
    "category": "Culture",
    "definition": "A journey to a sacred or spiritually important place, often connected with faith, tradition, and community.",
    "example": "Varanasi, Amritsar, Bodh Gaya, Ajmer, and Rameswaram are important pilgrimage destinations.",
    "related": [
      {
        "label": "Spiritual Places",
        "url": "spiritual.html"
      },
      {
        "label": "Travel",
        "url": "travel.html"
      }
    ],
    "tags": [
      "faith",
      "travel",
      "sacred"
    ]
  },
  {
    "id": "heritage",
    "term": "Heritage",
    "category": "History",
    "definition": "The cultural, natural, historical, or architectural legacy passed down from earlier generations.",
    "example": "Heritage can include forts, temples, crafts, music, languages, festivals, food, and landscapes.",
    "related": [
      {
        "label": "Heritage",
        "url": "heritage.html"
      },
      {
        "label": "UNESCO Sites",
        "url": "unesco.html"
      }
    ],
    "tags": [
      "legacy",
      "culture",
      "history"
    ]
  },
  {
    "id": "classical-tradition",
    "term": "Classical Tradition",
    "category": "Music",
    "definition": "A refined art tradition with formal training, established rules, and a long history of performance and teaching.",
    "example": "Hindustani and Carnatic music are two major Indian classical music traditions.",
    "related": [
      {
        "label": "Music",
        "url": "music.html"
      },
      {
        "label": "Musical Instruments",
        "url": "musical-instruments.html"
      }
    ],
    "tags": [
      "music",
      "dance",
      "performance"
    ]
  },
  {
    "id": "raga",
    "term": "Raga",
    "category": "Music",
    "definition": "A melodic framework in Indian classical music that guides the notes, mood, and movement of a performance.",
    "example": "A raga is not just a scale; it also carries mood, time, and melodic personality.",
    "related": [
      {
        "label": "Music",
        "url": "music.html"
      },
      {
        "label": "Musical Instruments",
        "url": "musical-instruments.html"
      }
    ],
    "tags": [
      "melody",
      "classical",
      "sound"
    ]
  },
  {
    "id": "ghat",
    "term": "Ghat",
    "category": "Geography",
    "definition": "A series of steps leading to a river or waterbody, or a mountain pass/range depending on the context.",
    "example": "Varanasi has river ghats, while the Western Ghats are a major mountain range.",
    "related": [
      {
        "label": "Travel",
        "url": "travel.html"
      },
      {
        "label": "Hidden Wonders",
        "url": "hidden-wonders.html"
      }
    ],
    "tags": [
      "river",
      "mountain",
      "place"
    ]
  },
  {
    "id": "stupa",
    "term": "Stupa",
    "category": "Architecture",
    "definition": "A dome-shaped Buddhist monument built for worship, meditation, and remembrance.",
    "example": "The Great Stupa at Sanchi is one of India's most famous Buddhist monuments.",
    "related": [
      {
        "label": "Heritage",
        "url": "heritage.html"
      },
      {
        "label": "UNESCO Sites",
        "url": "unesco.html"
      }
    ],
    "tags": [
      "buddhist",
      "monument",
      "architecture"
    ]
  },
  {
    "id": "bawri",
    "term": "Baori / Bawri",
    "category": "Architecture",
    "definition": "A regional word for stepwell, especially used in parts of western and northern India.",
    "example": "Chand Baori in Rajasthan is a famous baori with a striking geometric step pattern.",
    "related": [
      {
        "label": "Stepwells",
        "url": "stepwells.html"
      }
    ],
    "tags": [
      "water",
      "stepwell",
      "architecture"
    ]
  },
  {
    "id": "thali",
    "term": "Thali",
    "category": "Food",
    "definition": "A complete meal served on one plate, usually with several small dishes, breads or rice, and accompaniments.",
    "example": "Gujarati, Rajasthani, South Indian, and Maharashtrian thalis show regional food diversity.",
    "related": [
      {
        "label": "Cuisine",
        "url": "cuisine.html"
      }
    ],
    "tags": [
      "food",
      "meal",
      "regional"
    ]
  },
  {
    "id": "ayurveda",
    "term": "Ayurveda",
    "category": "Nature",
    "definition": "A traditional Indian knowledge system focused on health, balance, lifestyle, and plant-based preparations.",
    "example": "Plants like tulsi, neem, amla, and ashwagandha are commonly discussed in Ayurvedic traditions.",
    "related": [
      {
        "label": "Medicinal Plants",
        "url": "medicinal-plants.html"
      }
    ],
    "tags": [
      "plants",
      "health",
      "traditional knowledge"
    ]
  },
  {
    "id": "baoli",
    "term": "Baoli",
    "category": "Architecture",
    "definition": "Another regional word for stepwell, often used for water structures in Delhi and nearby regions.",
    "example": "Agrasen ki Baoli in Delhi is a well-known historic baoli.",
    "related": [
      {
        "label": "Stepwells",
        "url": "stepwells.html"
      },
      {
        "label": "Water Systems",
        "url": "water-systems.html"
      }
    ],
    "tags": [
      "water",
      "stepwell",
      "Delhi"
    ]
  },
  {
    "id": "monsoon",
    "term": "Monsoon",
    "category": "Geography",
    "definition": "A seasonal wind and rainfall pattern that brings much of India's yearly rain.",
    "example": "Many traditional water systems are designed around storing and managing monsoon rain.",
    "related": [
      {
        "label": "Water Systems",
        "url": "water-systems.html"
      },
      {
        "label": "Travel",
        "url": "travel.html"
      }
    ],
    "tags": [
      "rain",
      "climate",
      "season"
    ]
  },
  {
    "id": "bazaar",
    "term": "Bazaar",
    "category": "Culture",
    "definition": "A market area where people buy, sell, bargain, eat, and experience local trade and culture.",
    "example": "Chandni Chowk, Johari Bazaar, and Laad Bazaar are famous Indian market spaces.",
    "related": [
      {
        "label": "Bazaars",
        "url": "bazaars.html"
      }
    ],
    "tags": [
      "market",
      "trade",
      "shopping"
    ]
  },
  {
    "id": "sanctuary",
    "term": "Sanctuary",
    "category": "Nature",
    "definition": "A protected area created to conserve wildlife, birds, plants, or special habitats.",
    "example": "Wildlife sanctuaries protect habitats while also supporting research and awareness.",
    "related": [
      {
        "label": "Wildlife",
        "url": "wildlife.html"
      },
      {
        "label": "Butterfly Explorer",
        "url": "butterfly.html"
      }
    ],
    "tags": [
      "wildlife",
      "conservation",
      "protected area"
    ]
  },
  {
    "id": "fort",
    "term": "Fort",
    "category": "Architecture",
    "definition": "A fortified structure built for defense, administration, storage, and royal residence.",
    "example": "Indian forts often include gates, walls, palaces, temples, water systems, and watchtowers.",
    "related": [
      {
        "label": "Heritage",
        "url": "heritage.html"
      },
      {
        "label": "Travel",
        "url": "travel.html"
      }
    ],
    "tags": [
      "defense",
      "architecture",
      "kingdom"
    ]
  }
];
  const grid = document.getElementById("glossary-grid");
  const searchInput = document.getElementById("glossary-search");
  const categoryFilter = document.getElementById("category-filter");
  const chipContainer = document.getElementById("category-chips");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");

  const escapeHtml = (value) => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const categories = [...new Set(glossaryTerms.map(term => term.category))].sort();

  function searchableText(term) {
    return [term.term, term.category, term.definition, term.example, term.tags.join(" "), term.related.map(link => link.label).join(" ")].join(" ").toLowerCase();
  }

  const terms = glossaryTerms.map(term => ({ ...term, search: searchableText(term) }));
  document.getElementById("term-count").textContent = terms.length;
  document.getElementById("category-count").textContent = categories.length;

  function addCategoryControls() {
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.append(option);
    });

    [["all", "All"], ...categories.map(category => [category, category])].forEach(([value, label]) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "category-chip" + (value === "all" ? " is-active" : "");
      chip.dataset.category = value;
      chip.textContent = label;
      chipContainer.append(chip);
    });

    chipContainer.addEventListener("click", event => {
      const chip = event.target.closest(".category-chip");
      if (!chip) return;
      categoryFilter.value = chip.dataset.category;
      updateActiveChip();
      filterTerms();
    });
  }

  function updateActiveChip() {
    document.querySelectorAll(".category-chip").forEach(chip => chip.classList.toggle("is-active", chip.dataset.category === categoryFilter.value));
  }

  function createCard(term) {
    const tags = term.tags.map(tag => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join("");
    const links = term.related.map(link => `<a class="related-link" href="${escapeHtml(link.url)}">${escapeHtml(link.label)} →</a>`).join("");
    const card = document.createElement("article");
    card.className = "glossary-card";
    card.dataset.id = term.id;
    card.dataset.category = term.category;
    card.innerHTML = `
      <div class="term-header">
        <h3>${escapeHtml(term.term)}</h3>
        <span class="category-badge">${escapeHtml(term.category)}</span>
      </div>
      <p class="definition">${escapeHtml(term.definition)}</p>
      <p class="example"><strong>Example:</strong> ${escapeHtml(term.example)}</p>
      <div class="tag-row" aria-label="Tags">${tags}</div>
      <div class="related-row" aria-label="Related explorer pages">${links}</div>`;
    return card;
  }

  function filterTerms() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const visible = terms.filter(term => (!query || term.search.includes(query)) && (category === "all" || term.category === category));
    const ids = new Set(visible.map(term => term.id));
    document.querySelectorAll(".glossary-card").forEach(card => { card.hidden = !ids.has(card.dataset.id); });
    const active = query || category !== "all";
    status.textContent = active ? `Found ${visible.length} glossary term${visible.length === 1 ? "" : "s"}` : `Showing all ${visible.length} glossary terms`;
    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    categoryFilter.value = "all";
    updateActiveChip();
    filterTerms();
    searchInput.focus();
  }

  function setupTooltips() {
    const tooltip = document.createElement("div");
    tooltip.className = "glossary-tooltip";
    tooltip.setAttribute("role", "tooltip");
    document.body.append(tooltip);

    function showTooltip(trigger) {
      const term = terms.find(item => item.id === trigger.dataset.glossaryTerm);
      if (!term) return;
      tooltip.innerHTML = `<strong>${escapeHtml(term.term)}</strong><p>${escapeHtml(term.definition)}</p>`;
      tooltip.classList.add("is-visible");
      const rect = trigger.getBoundingClientRect();
      const top = Math.max(12, rect.top - tooltip.offsetHeight - 12);
      const left = Math.min(window.innerWidth - tooltip.offsetWidth - 14, Math.max(14, rect.left + rect.width / 2 - tooltip.offsetWidth / 2));
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }

    function hideTooltip() { tooltip.classList.remove("is-visible"); }

    document.querySelectorAll(".glossary-tooltip-term").forEach(trigger => {
      trigger.addEventListener("mouseenter", () => showTooltip(trigger));
      trigger.addEventListener("focus", () => showTooltip(trigger));
      trigger.addEventListener("mouseleave", hideTooltip);
      trigger.addEventListener("blur", hideTooltip);
      trigger.addEventListener("click", () => showTooltip(trigger));
    });

    document.addEventListener("keydown", event => { if (event.key === "Escape") hideTooltip(); });
  }

  addCategoryControls();
  grid.replaceChildren(...terms.map(createCard));
  searchInput.addEventListener("input", filterTerms);
  categoryFilter.addEventListener("change", () => { updateActiveChip(); filterTerms(); });
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);
  setupTooltips();
  filterTerms();

  window.ExplorerGlossary = {
    terms: () => [...terms],
    find: (idOrTerm) => terms.find(term => term.id === idOrTerm || term.term.toLowerCase() === String(idOrTerm).toLowerCase()),
  };
});
