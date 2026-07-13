document.addEventListener("DOMContentLoaded", () => {
  const markets = [
  {
    "id": "chandni-chowk",
    "name": "Chandni Chowk",
    "city": "Delhi",
    "state": "Delhi",
    "region": "north",
    "type": "historic-bazaar",
    "knownFor": "Street food, jewellery, textiles, books",
    "history": "A Mughal-era market street founded in Shahjahanabad, still known for layered trade, food, faith, and architecture.",
    "fact": "Its lanes connect markets specialising in spices, wedding wear, books, silver, and traditional food.",
    "explore": "Walk the lanes, try parathas and sweets, explore spice shops, and observe old Delhi architecture.",
    "image": "assets/heritage_forts.png",
    "gallery": [
      "assets/heritage_forts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "chandni chowk delhi delhi north historic bazaar street food, jewellery, textiles, books a mughal era market street founded in shahjahanabad, still known for layered trade, food, faith, and architecture. its lanes connect markets specialising in spices, wedding wear, books, silver, and traditional food. walk the lanes, try parathas and sweets, explore spice shops, and observe old delhi architecture."
  },
  {
    "id": "johari-bazaar",
    "name": "Johari Bazaar",
    "city": "Jaipur",
    "state": "Rajasthan",
    "region": "north",
    "type": "craft-market",
    "knownFor": "Jewellery, gemstones, lac bangles, textiles",
    "history": "A historic Jaipur market associated with gems, jewellery, traditional ornaments, and the city's planned bazaar layout.",
    "fact": "The name Johari refers to jewellers, reflecting Jaipur's long link with gemstone trade.",
    "explore": "Explore jewellery stores, colourful façades, bandhani textiles, and traditional crafts.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "johari bazaar jaipur rajasthan north craft market jewellery, gemstones, lac bangles, textiles a historic jaipur market associated with gems, jewellery, traditional ornaments, and the city's planned bazaar layout. the name johari refers to jewellers, reflecting jaipur's long link with gemstone trade. explore jewellery stores, colourful façades, bandhani textiles, and traditional crafts."
  },
  {
    "id": "laad-bazaar",
    "name": "Laad Bazaar",
    "city": "Hyderabad",
    "state": "Telangana",
    "region": "south",
    "type": "craft-market",
    "knownFor": "Lac bangles, pearls, bridal accessories",
    "history": "A vibrant old market near Charminar famous for bangles, pearls, wedding accessories, and Hyderabadi shopping culture.",
    "fact": "Laad Bazaar is especially known for lacquer bangles decorated with stones and glittering designs.",
    "explore": "Shop bangles, pearl jewellery, embroidered fabrics, and experience the Charminar old-city atmosphere.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "laad bazaar hyderabad telangana south craft market lac bangles, pearls, bridal accessories a vibrant old market near charminar famous for bangles, pearls, wedding accessories, and hyderabadi shopping culture. laad bazaar is especially known for lacquer bangles decorated with stones and glittering designs. shop bangles, pearl jewellery, embroidered fabrics, and experience the charminar old city atmosphere."
  },
  {
    "id": "new-market",
    "name": "New Market",
    "city": "Kolkata",
    "state": "West Bengal",
    "region": "east",
    "type": "colonial-market",
    "knownFor": "Food, garments, flowers, accessories",
    "history": "A colonial-era market complex officially known as Sir Stuart Hogg Market, still central to Kolkata's shopping life.",
    "fact": "Its red-brick Gothic-style market building remains one of Kolkata's most recognisable commercial landmarks.",
    "explore": "Explore bakeries, food stalls, clothing shops, flower sellers, and old market corridors.",
    "image": "assets/heritage_forts.png",
    "gallery": [
      "assets/heritage_forts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "new market kolkata west bengal east colonial market food, garments, flowers, accessories a colonial era market complex officially known as sir stuart hogg market, still central to kolkata's shopping life. its red brick gothic style market building remains one of kolkata's most recognisable commercial landmarks. explore bakeries, food stalls, clothing shops, flower sellers, and old market corridors."
  },
  {
    "id": "ima-keithel",
    "name": "Ima Keithel",
    "city": "Imphal",
    "state": "Manipur",
    "region": "northeast",
    "type": "women-led-market",
    "knownFor": "Handlooms, vegetables, local crafts",
    "history": "A remarkable women-run market in Imphal, representing local entrepreneurship, community trade, and Manipuri culture.",
    "fact": "Ima Keithel means Mothers' Market and is widely recognised as one of the largest women-run markets in Asia.",
    "explore": "Explore handlooms, bamboo products, local foods, and everyday Manipuri market life.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "ima keithel imphal manipur northeast women led market handlooms, vegetables, local crafts a remarkable women run market in imphal, representing local entrepreneurship, community trade, and manipuri culture. ima keithel means mothers' market and is widely recognised as one of the largest women run markets in asia. explore handlooms, bamboo products, local foods, and everyday manipuri market life."
  },
  {
    "id": "chor-bazaar",
    "name": "Chor Bazaar",
    "city": "Mumbai",
    "state": "Maharashtra",
    "region": "west",
    "type": "antique-market",
    "knownFor": "Antiques, vintage goods, furniture, curios",
    "history": "One of Mumbai's most famous old markets, known for antiques, vintage objects, furniture, and unusual finds.",
    "fact": "The market's popular name means thieves' market, but today it is better known for second-hand and vintage shopping.",
    "explore": "Look for old posters, lamps, furniture, clocks, cameras, and quirky collectibles.",
    "image": "assets/travel_hidden.png",
    "gallery": [
      "assets/travel_hidden.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "chor bazaar mumbai maharashtra west antique market antiques, vintage goods, furniture, curios one of mumbai's most famous old markets, known for antiques, vintage objects, furniture, and unusual finds. the market's popular name means thieves' market, but today it is better known for second hand and vintage shopping. look for old posters, lamps, furniture, clocks, cameras, and quirky collectibles."
  },
  {
    "id": "devaraja-market",
    "name": "Devaraja Market",
    "city": "Mysuru",
    "state": "Karnataka",
    "region": "south",
    "type": "local-market",
    "knownFor": "Flowers, spices, fruits, incense",
    "history": "A traditional Mysuru market known for colourful flowers, spices, fruits, incense, oils, and everyday city life.",
    "fact": "Its flower stalls and spice displays make it one of Mysuru's most photogenic cultural spaces.",
    "explore": "Explore jasmine garlands, kumkum powders, banana leaves, sandalwood items, and spice stalls.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "devaraja market mysuru karnataka south local market flowers, spices, fruits, incense a traditional mysuru market known for colourful flowers, spices, fruits, incense, oils, and everyday city life. its flower stalls and spice displays make it one of mysuru's most photogenic cultural spaces. explore jasmine garlands, kumkum powders, banana leaves, sandalwood items, and spice stalls."
  },
  {
    "id": "sarafa-bazaar",
    "name": "Sarafa Bazaar",
    "city": "Indore",
    "state": "Madhya Pradesh",
    "region": "central",
    "type": "food-market",
    "knownFor": "Night street food, jewellery",
    "history": "A jewellery market by day that transforms into one of India's most famous night street-food destinations.",
    "fact": "Sarafa's night food culture makes it a rare market that shifts identity after business hours.",
    "explore": "Try poha, bhutte ka kees, jalebi, garadu, and other Indore street-food favourites.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "sarafa bazaar indore madhya pradesh central food market night street food, jewellery a jewellery market by day that transforms into one of india's most famous night street food destinations. sarafa's night food culture makes it a rare market that shifts identity after business hours. try poha, bhutte ka kees, jalebi, garadu, and other indore street food favourites."
  },
  {
    "id": "jew-town-market",
    "name": "Jew Town Market",
    "city": "Kochi",
    "state": "Kerala",
    "region": "south",
    "type": "heritage-market",
    "knownFor": "Antiques, spices, handicrafts",
    "history": "A historic market street in Mattancherry linked with spice trade, antiques, synagogues, and Kochi's multicultural heritage.",
    "fact": "The area reflects centuries of Indian Ocean trade and cultural exchange in coastal Kerala.",
    "explore": "Explore antique shops, spice stores, heritage buildings, and narrow lanes near the synagogue.",
    "image": "assets/travel_islands.png",
    "gallery": [
      "assets/travel_islands.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "jew town market kochi kerala south heritage market antiques, spices, handicrafts a historic market street in mattancherry linked with spice trade, antiques, synagogues, and kochi's multicultural heritage. the area reflects centuries of indian ocean trade and cultural exchange in coastal kerala. explore antique shops, spice stores, heritage buildings, and narrow lanes near the synagogue."
  },
  {
    "id": "floating-vegetable-market",
    "name": "Floating Vegetable Market",
    "city": "Srinagar",
    "state": "Jammu and Kashmir",
    "region": "north",
    "type": "floating-market",
    "knownFor": "Vegetables, flowers, local produce",
    "history": "A floating market on Dal Lake where vendors trade fresh produce from boats in the early morning.",
    "fact": "The market offers a rare glimpse of lake-based livelihoods and Kashmir's floating-garden culture.",
    "explore": "Visit early morning, watch boat trading, and observe vegetable and flower sellers on the lake.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "floating vegetable market srinagar jammu and kashmir north floating market vegetables, flowers, local produce a floating market on dal lake where vendors trade fresh produce from boats in the early morning. the market offers a rare glimpse of lake based livelihoods and kashmir's floating garden culture. visit early morning, watch boat trading, and observe vegetable and flower sellers on the lake."
  },
  {
    "id": "khari-baoli",
    "name": "Khari Baoli",
    "city": "Delhi",
    "state": "Delhi",
    "region": "north",
    "type": "spice-market",
    "knownFor": "Spices, dry fruits, herbs, grains",
    "history": "A historic spice market in Old Delhi, famous for wholesale spice trade, dry fruits, herbs, and aromatic lanes.",
    "fact": "It is often described as one of Asia's largest wholesale spice markets.",
    "explore": "Explore spice shops, sacks of chillies, dry fruits, herbs, and rooftop views of Old Delhi.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "khari baoli delhi delhi north spice market spices, dry fruits, herbs, grains a historic spice market in old delhi, famous for wholesale spice trade, dry fruits, herbs, and aromatic lanes. it is often described as one of asia's largest wholesale spice markets. explore spice shops, sacks of chillies, dry fruits, herbs, and rooftop views of old delhi."
  },
  {
    "id": "crawford-market",
    "name": "Crawford Market",
    "city": "Mumbai",
    "state": "Maharashtra",
    "region": "west",
    "type": "colonial-market",
    "knownFor": "Fruits, imported foods, household goods",
    "history": "A prominent Mumbai market known for its colonial-era building, produce, packaged foods, and busy trade culture.",
    "fact": "The market building is a landmark of Mumbai's colonial commercial architecture.",
    "explore": "Explore fruit displays, food shops, pet and household sections, and the old market façade.",
    "image": "assets/heritage_forts.png",
    "gallery": [
      "assets/heritage_forts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "crawford market mumbai maharashtra west colonial market fruits, imported foods, household goods a prominent mumbai market known for its colonial era building, produce, packaged foods, and busy trade culture. the market building is a landmark of mumbai's colonial commercial architecture. explore fruit displays, food shops, pet and household sections, and the old market façade."
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("bazaar-grid");
  const searchInput = document.getElementById("market-search");
  const regionFilter = document.getElementById("region-filter");
  const typeFilter = document.getElementById("type-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");
  const modal = document.getElementById("bazaar-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activeMarket = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  const labelType = (value) => value.split("-").map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  [...new Set(markets.map(market => market.type))]
    .sort()
    .forEach(type => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = labelType(type);
      typeFilter.append(option);
    });

  function createCard(market) {
    const card = document.createElement("article");
    card.className = "bazaar-card";
    card.dataset.id = market.id;
    card.innerHTML = `
      <div class="bazaar-media">
        <img src="${escapeHtml(market.image)}" alt="${escapeHtml(market.name)}" loading="lazy">
        <span class="city-badge">${escapeHtml(market.city)}</span>
        <span class="type-badge">${escapeHtml(labelType(market.type))}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(market.id)}">Explore market</button>
      </div>
      <div class="bazaar-body">
        <h3>${escapeHtml(market.name)}</h3>
        <p class="known">${escapeHtml(market.knownFor)}</p>
        <p class="history">${escapeHtml(market.history)}</p>
        <div class="fact-preview">${escapeHtml(market.fact)}</div>
      </div>`;
    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, { once: true });
    return card;
  }

  grid.replaceChildren(...markets.map(createCard));
  document.getElementById("hero-count").textContent = markets.length;

  function filterMarkets() {
    const query = searchInput.value.trim().toLowerCase();
    const region = regionFilter.value;
    const type = typeFilter.value;
    const visible = markets.filter(market =>
      (!query || market.search.includes(query)) &&
      (region === "all" || market.region === region) &&
      (type === "all" || market.type === type)
    );
    const ids = new Set(visible.map(market => market.id));
    document.querySelectorAll(".bazaar-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });
    const active = query || region !== "all" || type !== "all";
    status.textContent = active
      ? `Found ${visible.length} market${visible.length === 1 ? "" : "s"}`
      : `Showing all ${visible.length} markets`;
    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    regionFilter.value = "all";
    typeFilter.value = "all";
    filterMarkets();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeMarket.gallery;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeMarket.name} gallery image ${imageIndex + 1}`;
    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };
    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(market, trigger) {
    activeMarket = market;
    imageIndex = 0;
    lastFocus = trigger;
    document.getElementById("modal-location").textContent =
      `${market.city}, ${market.state}`;
    document.getElementById("modal-title").textContent = market.name;
    document.getElementById("modal-known").textContent = market.knownFor;
    document.getElementById("modal-type").textContent = labelType(market.type);
    document.getElementById("modal-history").textContent = market.history;
    document.getElementById("modal-explore").textContent = market.explore;
    document.getElementById("modal-fact").textContent = market.fact;
    updateImage();
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeMarket = null;
    imageIndex = 0;
    if (lastFocus) lastFocus.focus();
  }

  function stepGallery(direction) {
    if (!activeMarket) return;
    imageIndex = (imageIndex + direction + activeMarket.gallery.length) % activeMarket.gallery.length;
    updateImage();
  }

  searchInput.addEventListener("input", filterMarkets);
  regionFilter.addEventListener("change", filterMarkets);
  typeFilter.addEventListener("change", filterMarkets);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    const market = markets.find(item => item.id === button.dataset.id);
    if (market) openModal(market, button);
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

  filterMarkets();
});
