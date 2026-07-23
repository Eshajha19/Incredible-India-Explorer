document.addEventListener("DOMContentLoaded", () => {
  const scripts = [
  {
    "id": "brahmi",
    "name": "Brahmi",
    "period": "c. 3rd century BCE onward",
    "periodType": "ancient",
    "region": "Pan-Indian early historic regions",
    "languages": "Prakrit, Sanskrit, early regional languages",
    "significance": "One of the most influential ancient scripts of South Asia and a major ancestor of many later Indian writing systems.",
    "fact": "Brahmi inscriptions are famously associated with Ashokan edicts across the Indian subcontinent.",
    "image": "assets/heritage_ruins.png",
    "gallery": [
      "assets/heritage_ruins.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "brahmi c. 3rd century bce onward ancient pan indian early historic regions prakrit, sanskrit, early regional languages one of the most influential ancient scripts of south asia and a major ancestor of many later indian writing systems. brahmi inscriptions are famously associated with ashokan edicts across the indian subcontinent."
  },
  {
    "id": "kharosthi",
    "name": "Kharosthi",
    "period": "c. 3rd century BCE – 3rd century CE",
    "periodType": "ancient",
    "region": "Northwest Indian subcontinent",
    "languages": "Gandhari Prakrit, Sanskrit",
    "significance": "A right-to-left script used in the northwest, reflecting cultural connections with Central Asia and ancient trade routes.",
    "fact": "Unlike most Indian scripts, Kharosthi was written from right to left.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "kharosthi c. 3rd century bce – 3rd century ce ancient northwest indian subcontinent gandhari prakrit, sanskrit a right to left script used in the northwest, reflecting cultural connections with central asia and ancient trade routes. unlike most indian scripts, kharosthi was written from right to left."
  },
  {
    "id": "devanagari",
    "name": "Devanagari",
    "period": "c. 7th century CE onward",
    "periodType": "medieval-modern",
    "region": "North and Central India",
    "languages": "Hindi, Sanskrit, Marathi, Nepali and others",
    "significance": "A major modern Indic script used for several languages and classical Sanskrit texts.",
    "fact": "Its distinctive horizontal headline is called shirorekha.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "devanagari c. 7th century ce onward medieval modern north and central india hindi, sanskrit, marathi, nepali and others a major modern indic script used for several languages and classical sanskrit texts. its distinctive horizontal headline is called shirorekha."
  },
  {
    "id": "tamil-brahmi",
    "name": "Tamil-Brahmi",
    "period": "c. 3rd century BCE – early centuries CE",
    "periodType": "ancient",
    "region": "Tamilakam / South India",
    "languages": "Old Tamil",
    "significance": "An early script used to write Tamil, adapted from Brahmi to suit Tamil phonology.",
    "fact": "Tamil-Brahmi inscriptions appear on pottery, caves, and trade-related objects.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "tamil brahmi c. 3rd century bce – early centuries ce ancient tamilakam / south india old tamil an early script used to write tamil, adapted from brahmi to suit tamil phonology. tamil brahmi inscriptions appear on pottery, caves, and trade related objects."
  },
  {
    "id": "grantha",
    "name": "Grantha",
    "period": "c. 5th century CE onward",
    "periodType": "classical-medieval",
    "region": "South India",
    "languages": "Sanskrit, Manipravalam",
    "significance": "A South Indian script historically used for writing Sanskrit, especially in Tamil-speaking regions.",
    "fact": "Grantha influenced later South Indian writing traditions and manuscript culture.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "grantha c. 5th century ce onward classical medieval south india sanskrit, manipravalam a south indian script historically used for writing sanskrit, especially in tamil speaking regions. grantha influenced later south indian writing traditions and manuscript culture."
  },
  {
    "id": "sharada",
    "name": "Sharada",
    "period": "c. 8th century CE onward",
    "periodType": "medieval",
    "region": "Kashmir and northwest Himalayas",
    "languages": "Sanskrit, Kashmiri",
    "significance": "A historic script of Kashmir used in manuscripts, inscriptions, and scholarly traditions.",
    "fact": "Sharada is closely linked with Kashmir's manuscript and intellectual history.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "sharada c. 8th century ce onward medieval kashmir and northwest himalayas sanskrit, kashmiri a historic script of kashmir used in manuscripts, inscriptions, and scholarly traditions. sharada is closely linked with kashmir's manuscript and intellectual history."
  },
  {
    "id": "modi",
    "name": "Modi",
    "period": "c. 13th – 20th century CE",
    "periodType": "medieval-modern",
    "region": "Maharashtra",
    "languages": "Marathi",
    "significance": "A cursive administrative script historically used for Marathi documents, accounts, and correspondence.",
    "fact": "Modi was designed for fast writing, making it useful for record-keeping and administration.",
    "image": "assets/heritage_forts.png",
    "gallery": [
      "assets/heritage_forts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "modi c. 13th – 20th century ce medieval modern maharashtra marathi a cursive administrative script historically used for marathi documents, accounts, and correspondence. modi was designed for fast writing, making it useful for record keeping and administration."
  },
  {
    "id": "gurmukhi",
    "name": "Gurmukhi",
    "period": "16th century CE onward",
    "periodType": "early-modern",
    "region": "Punjab",
    "languages": "Punjabi",
    "significance": "A script associated with Punjabi language and Sikh literary traditions.",
    "fact": "The Guru Granth Sahib is written in Gurmukhi script.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "gurmukhi 16th century ce onward early modern punjab punjabi a script associated with punjabi language and sikh literary traditions. the guru granth sahib is written in gurmukhi script."
  },
  {
    "id": "bengali-assamese",
    "name": "Bengali-Assamese",
    "period": "c. 11th century CE onward",
    "periodType": "medieval-modern",
    "region": "Eastern India",
    "languages": "Bengali, Assamese, Sanskrit and others",
    "significance": "A script family used in eastern India, with regional forms for Bengali and Assamese literary traditions.",
    "fact": "It developed from eastern Nagari forms and has shaped major literary cultures.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "bengali assamese c. 11th century ce onward medieval modern eastern india bengali, assamese, sanskrit and others a script family used in eastern india, with regional forms for bengali and assamese literary traditions. it developed from eastern nagari forms and has shaped major literary cultures."
  },
  {
    "id": "meitei-mayek",
    "name": "Meitei Mayek",
    "period": "Ancient roots; modern revival",
    "periodType": "revived-modern",
    "region": "Manipur",
    "languages": "Meiteilon / Manipuri",
    "significance": "A script of Manipur with a strong modern revival in education, signage, and cultural identity.",
    "fact": "Its letters have traditional names linked with body parts and cultural memory.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "meitei mayek ancient roots; modern revival revived modern manipur meiteilon / manipuri a script of manipur with a strong modern revival in education, signage, and cultural identity. its letters have traditional names linked with body parts and cultural memory."
  },
  {
    "id": "ol-chiki",
    "name": "Ol Chiki",
    "period": "20th century CE",
    "periodType": "modern",
    "region": "Jharkhand, Odisha, West Bengal and Santali-speaking regions",
    "languages": "Santali",
    "significance": "A modern script created specifically for Santali language and cultural expression.",
    "fact": "Ol Chiki was created by Pandit Raghunath Murmu in the 20th century.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "ol chiki 20th century ce modern jharkhand, odisha, west bengal and santali speaking regions santali a modern script created specifically for santali language and cultural expression. ol chiki was created by pandit raghunath murmu in the 20th century."
  },
  {
    "id": "malayalam-script",
    "name": "Malayalam Script",
    "period": "c. 9th century CE onward",
    "periodType": "medieval-modern",
    "region": "Kerala",
    "languages": "Malayalam, Sanskrit",
    "significance": "A rounded South Indian script used for Malayalam and historically influenced by Grantha and Vatteluttu traditions.",
    "fact": "The rounded shapes were suited to writing on palm leaves, where straight cuts could tear the surface.",
    "image": "assets/travel_islands.png",
    "gallery": [
      "assets/travel_islands.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "malayalam script c. 9th century ce onward medieval modern kerala malayalam, sanskrit a rounded south indian script used for malayalam and historically influenced by grantha and vatteluttu traditions. the rounded shapes were suited to writing on palm leaves, where straight cuts could tear the surface."
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("script-grid");
  const searchInput = document.getElementById("script-search");
  const periodFilter = document.getElementById("period-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");
  const modal = document.getElementById("script-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activeScript = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  const labelPeriod = (value) => value.split("-").map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" / ");

  function createCard(script) {
    const card = document.createElement("article");
    card.className = "script-card";
    card.dataset.id = script.id;
    card.innerHTML = `
      <div class="script-media">
        <img src="${escapeHtml(script.image)}" alt="${escapeHtml(script.name)}" loading="lazy">
        <span class="period-badge">${escapeHtml(labelPeriod(script.periodType))}</span>
        <span class="language-badge">${escapeHtml(script.languages.split(",")[0])}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(script.id)}">Explore script</button>
      </div>
      <div class="script-body">
        <h3>${escapeHtml(script.name)}</h3>
        <p class="region">${escapeHtml(script.region)}</p>
        <p class="significance">${escapeHtml(script.significance)}</p>
        <div class="fact-preview">${escapeHtml(script.fact)}</div>
      </div>`;
    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, { once: true });
    return card;
  }

  grid.replaceChildren(...scripts.map(createCard));
  document.getElementById("hero-count").textContent = scripts.length;

  function filterScripts() {
    const query = searchInput.value.trim().toLowerCase();
    const period = periodFilter.value;
    const visible = scripts.filter(script =>
      (!query || script.search.includes(query)) &&
      (period === "all" || script.periodType === period)
    );
    const ids = new Set(visible.map(script => script.id));
    document.querySelectorAll(".script-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });
    const active = query || period !== "all";
    status.textContent = active
      ? `Found ${visible.length} script${visible.length === 1 ? "" : "s"}`
      : `Showing all ${visible.length} scripts`;
    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    periodFilter.value = "all";
    filterScripts();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeScript.gallery;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeScript.name} gallery image ${imageIndex + 1}`;
    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };
    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(script, trigger) {
    activeScript = script;
    imageIndex = 0;
    lastFocus = trigger;
    document.getElementById("modal-region").textContent = script.region;
    document.getElementById("modal-title").textContent = script.name;
    document.getElementById("modal-period").textContent = script.period;
    document.getElementById("modal-languages").textContent = script.languages;
    document.getElementById("modal-significance").textContent = script.significance;
    document.getElementById("modal-fact").textContent = script.fact;
    updateImage();
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeScript = null;
    imageIndex = 0;
    if (lastFocus) lastFocus.focus();
  }

  function stepGallery(direction) {
    if (!activeScript) return;
    imageIndex = (imageIndex + direction + activeScript.gallery.length) % activeScript.gallery.length;
    updateImage();
  }

  searchInput.addEventListener("input", filterScripts);
  periodFilter.addEventListener("change", filterScripts);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    const script = scripts.find(item => item.id === button.dataset.id);
    if (script) openModal(script, button);
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

  filterScripts();
});
