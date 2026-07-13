document.addEventListener("DOMContentLoaded", () => {
  const instruments = [
  {
    "id": "sitar",
    "name": "Sitar",
    "category": "String",
    "region": "North India",
    "tradition": "Hindustani Classical",
    "construction": "Wooden body, long neck, metal strings, movable frets",
    "description": "A plucked string instrument central to Hindustani classical music, known for its resonant sympathetic strings.",
    "fact": "Sitar gained global recognition in the 20th century through Indian classical concerts and cross-cultural collaborations.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "sitar string north india hindustani classical wooden body, long neck, metal strings, movable frets a plucked string instrument central to hindustani classical music, known for its resonant sympathetic strings. sitar gained global recognition in the 20th century through indian classical concerts and cross-cultural collaborations."
  },
  {
    "id": "veena",
    "name": "Veena",
    "category": "String",
    "region": "South India",
    "tradition": "Carnatic Classical",
    "construction": "Jackwood body, frets, main strings, drone strings",
    "description": "An ancient plucked string instrument strongly associated with Carnatic music and Saraswati iconography.",
    "fact": "Different veena types exist, but Saraswati Veena is especially prominent in South Indian classical tradition.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "veena string south india carnatic classical jackwood body, frets, main strings, drone strings an ancient plucked string instrument strongly associated with carnatic music and saraswati iconography. different veena types exist, but saraswati veena is especially prominent in south indian classical tradition."
  },
  {
    "id": "sarod",
    "name": "Sarod",
    "category": "String",
    "region": "North India",
    "tradition": "Hindustani Classical",
    "construction": "Metal fingerboard, skin-covered resonator, steel/bronze strings",
    "description": "A fretless lute-like instrument known for deep tone, slides, and expressive melodic phrasing.",
    "fact": "The smooth metal fingerboard allows long glides that are central to sarod performance style.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "sarod string north india hindustani classical metal fingerboard, skin-covered resonator, steel/bronze strings a fretless lute-like instrument known for deep tone, slides, and expressive melodic phrasing. the smooth metal fingerboard allows long glides that are central to sarod performance style."
  },
  {
    "id": "tabla",
    "name": "Tabla",
    "category": "Percussion",
    "region": "North India",
    "tradition": "Hindustani Classical / Folk",
    "construction": "Pair of tuned hand drums with syahi tuning paste",
    "description": "A pair of drums used widely in classical, devotional, film, folk, and fusion music.",
    "fact": "The black syahi spot helps produce complex harmonics and precise pitch on the drumhead.",
    "image": "assets/hero_banner.png",
    "gallery": [
      "assets/hero_banner.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "tabla percussion north india hindustani classical / folk pair of tuned hand drums with syahi tuning paste a pair of drums used widely in classical, devotional, film, folk, and fusion music. the black syahi spot helps produce complex harmonics and precise pitch on the drumhead."
  },
  {
    "id": "mridangam",
    "name": "Mridangam",
    "category": "Percussion",
    "region": "South India",
    "tradition": "Carnatic Classical",
    "construction": "Double-headed barrel drum, jackwood body, leather heads",
    "description": "The main rhythmic accompaniment instrument in Carnatic concerts and South Indian devotional music.",
    "fact": "Mridangam playing uses complex rhythmic syllables and mathematical patterns called korvais.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "mridangam percussion south india carnatic classical double-headed barrel drum, jackwood body, leather heads the main rhythmic accompaniment instrument in carnatic concerts and south indian devotional music. mridangam playing uses complex rhythmic syllables and mathematical patterns called korvais."
  },
  {
    "id": "shehnai",
    "name": "Shehnai",
    "category": "Wind",
    "region": "North India",
    "tradition": "Classical / Ceremonial",
    "construction": "Double-reed wooden wind instrument with flared bell",
    "description": "A traditional wind instrument often associated with auspicious ceremonies and classical performance.",
    "fact": "Ustad Bismillah Khan popularised the shehnai on major classical concert stages.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "shehnai wind north india classical / ceremonial double-reed wooden wind instrument with flared bell a traditional wind instrument often associated with auspicious ceremonies and classical performance. ustad bismillah khan popularised the shehnai on major classical concert stages."
  },
  {
    "id": "bansuri",
    "name": "Bansuri",
    "category": "Wind",
    "region": "North India",
    "tradition": "Classical / Folk",
    "construction": "Side-blown bamboo flute with finger holes",
    "description": "A bamboo flute used in folk and classical traditions, admired for its warm and lyrical sound.",
    "fact": "Bansuri is closely associated with Krishna imagery in Indian cultural traditions.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "bansuri wind north india classical / folk side-blown bamboo flute with finger holes a bamboo flute used in folk and classical traditions, admired for its warm and lyrical sound. bansuri is closely associated with krishna imagery in indian cultural traditions."
  },
  {
    "id": "santoor",
    "name": "Santoor",
    "category": "String",
    "region": "Jammu and Kashmir",
    "tradition": "Hindustani Classical / Folk",
    "construction": "Trapezoid wooden hammered dulcimer with many strings",
    "description": "A hammered string instrument linked with Kashmir and later adapted into Hindustani classical music.",
    "fact": "It is played with light wooden mallets called mezrab or kalam.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "santoor string jammu and kashmir hindustani classical / folk trapezoid wooden hammered dulcimer with many strings a hammered string instrument linked with kashmir and later adapted into hindustani classical music. it is played with light wooden mallets called mezrab or kalam."
  },
  {
    "id": "dhol",
    "name": "Dhol",
    "category": "Percussion",
    "region": "Punjab / North India",
    "tradition": "Folk / Festival",
    "construction": "Large double-sided barrel drum played with sticks",
    "description": "A loud and energetic drum used in folk dances, processions, festivals, and celebrations.",
    "fact": "Dhol rhythms are strongly associated with bhangra and festive street performances.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "dhol percussion punjab / north india folk / festival large double-sided barrel drum played with sticks a loud and energetic drum used in folk dances, processions, festivals, and celebrations. dhol rhythms are strongly associated with bhangra and festive street performances."
  },
  {
    "id": "ektara",
    "name": "Ektara",
    "category": "String",
    "region": "Bengal / Rajasthan / Folk regions",
    "tradition": "Folk / Devotional",
    "construction": "One-string drone instrument with gourd or wooden resonator",
    "description": "A simple one-string instrument used by folk singers, saints, and devotional performers.",
    "fact": "Its name literally means one string, reflecting its minimal construction and drone-like sound.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "ektara string bengal / rajasthan / folk regions folk / devotional one-string drone instrument with gourd or wooden resonator a simple one-string instrument used by folk singers, saints, and devotional performers. its name literally means one string, reflecting its minimal construction and drone-like sound."
  },
  {
    "id": "pakhawaj",
    "name": "Pakhawaj",
    "category": "Percussion",
    "region": "North India",
    "tradition": "Dhrupad / Devotional",
    "construction": "Double-headed barrel drum with horizontal playing style",
    "description": "A classical percussion instrument associated with dhrupad music and temple traditions.",
    "fact": "The pakhawaj has a deep, resonant tone and predates the modern tabla tradition.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "pakhawaj percussion north india dhrupad / devotional double-headed barrel drum with horizontal playing style a classical percussion instrument associated with dhrupad music and temple traditions. the pakhawaj has a deep, resonant tone and predates the modern tabla tradition."
  },
  {
    "id": "nadaswaram",
    "name": "Nadaswaram",
    "category": "Wind",
    "region": "Tamil Nadu",
    "tradition": "Temple / Carnatic",
    "construction": "Long double-reed wind instrument with flared bell",
    "description": "A powerful South Indian wind instrument widely used in temples, weddings, and ceremonial music.",
    "fact": "It is considered one of the loudest non-brass acoustic instruments and is often paired with thavil drums.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "nadaswaram wind tamil nadu temple / carnatic long double-reed wind instrument with flared bell a powerful south indian wind instrument widely used in temples, weddings, and ceremonial music. it is considered one of the loudest non-brass acoustic instruments and is often paired with thavil drums."
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("instrument-grid");
  const searchInput = document.getElementById("instrument-search");
  const categoryFilter = document.getElementById("category-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");
  const modal = document.getElementById("instrument-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activeInstrument = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  [...new Set(instruments.map(instrument => instrument.category))]
    .sort()
    .forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.append(option);
    });

  function createCard(instrument) {
    const card = document.createElement("article");
    card.className = "instrument-card";
    card.dataset.id = instrument.id;
    card.innerHTML = `
      <div class="instrument-media">
        <img src="${escapeHtml(instrument.image)}" alt="${escapeHtml(instrument.name)}" loading="lazy">
        <span class="region-badge">${escapeHtml(instrument.region)}</span>
        <span class="category-badge">${escapeHtml(instrument.category)}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(instrument.id)}">Explore instrument</button>
      </div>
      <div class="instrument-body">
        <h3>${escapeHtml(instrument.name)}</h3>
        <p class="tradition">${escapeHtml(instrument.tradition)}</p>
        <p class="description">${escapeHtml(instrument.description)}</p>
        <div class="construction-preview">${escapeHtml(instrument.construction)}</div>
      </div>`;
    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, { once: true });
    return card;
  }

  grid.replaceChildren(...instruments.map(createCard));
  document.getElementById("hero-count").textContent = instruments.length;

  function filterInstruments() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const visible = instruments.filter(instrument =>
      (!query || instrument.search.includes(query)) &&
      (category === "all" || instrument.category === category)
    );
    const ids = new Set(visible.map(instrument => instrument.id));
    document.querySelectorAll(".instrument-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });
    const active = query || category !== "all";
    status.textContent = active
      ? `Found ${visible.length} instrument${visible.length === 1 ? "" : "s"}`
      : `Showing all ${visible.length} instruments`;
    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    categoryFilter.value = "all";
    filterInstruments();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeInstrument.gallery;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeInstrument.name} gallery image ${imageIndex + 1}`;
    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };
    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(instrument, trigger) {
    activeInstrument = instrument;
    imageIndex = 0;
    lastFocus = trigger;
    document.getElementById("modal-region").textContent = instrument.region;
    document.getElementById("modal-title").textContent = instrument.name;
    document.getElementById("modal-category").textContent = instrument.category;
    document.getElementById("modal-tradition").textContent = instrument.tradition;
    document.getElementById("modal-construction").textContent = instrument.construction;
    document.getElementById("modal-description").textContent = instrument.description;
    document.getElementById("modal-fact").textContent = instrument.fact;
    updateImage();
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeInstrument = null;
    imageIndex = 0;
    if (lastFocus) lastFocus.focus();
  }

  function stepGallery(direction) {
    if (!activeInstrument) return;
    imageIndex = (imageIndex + direction + activeInstrument.gallery.length) % activeInstrument.gallery.length;
    updateImage();
  }

  searchInput.addEventListener("input", filterInstruments);
  categoryFilter.addEventListener("change", filterInstruments);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    const instrument = instruments.find(item => item.id === button.dataset.id);
    if (instrument) openModal(instrument, button);
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

  filterInstruments();
});
