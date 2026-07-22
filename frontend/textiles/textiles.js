document.addEventListener("DOMContentLoaded", () => {
  const textiles = [
  {
    "id": "banarasi-silk",
    "name": "Banarasi Silk",
    "state": "Uttar Pradesh",
    "region": "north",
    "material": "Silk with zari",
    "technique": "Brocade weaving",
    "significance": "Known for rich zari work, floral motifs, and bridal sarees associated with Varanasi's weaving heritage.",
    "fact": "Banarasi textiles are famous for metallic-thread patterns inspired by Mughal and floral design traditions.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "banarasi silk uttar pradesh north silk with zari brocade weaving known for rich zari work, floral motifs, and bridal sarees associated with varanasi's weaving heritage. banarasi textiles are famous for metallic-thread patterns inspired by mughal and floral design traditions."
  },
  {
    "id": "kanjeevaram-silk",
    "name": "Kanjeevaram Silk",
    "state": "Tamil Nadu",
    "region": "south",
    "material": "Mulberry silk and zari",
    "technique": "Heavy silk weaving",
    "significance": "A prestigious South Indian silk tradition recognised for contrast borders, temple motifs, and ceremonial wear.",
    "fact": "The body and border of many Kanjeevaram sarees are woven separately and joined with strong interlocking technique.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "kanjeevaram silk tamil nadu south mulberry silk and zari heavy silk weaving a prestigious south indian silk tradition recognised for contrast borders, temple motifs, and ceremonial wear. the body and border of many kanjeevaram sarees are woven separately and joined with strong interlocking technique."
  },
  {
    "id": "chanderi",
    "name": "Chanderi",
    "state": "Madhya Pradesh",
    "region": "central",
    "material": "Silk, cotton, and zari blends",
    "technique": "Lightweight handloom weaving",
    "significance": "Admired for translucent texture, delicate motifs, and elegant sarees from the historic town of Chanderi.",
    "fact": "Chanderi fabric is known for its sheer, glossy appearance and lightweight drape.",
    "image": "assets/heritage_forts.png",
    "gallery": [
      "assets/heritage_forts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "chanderi madhya pradesh central silk, cotton, and zari blends lightweight handloom weaving admired for translucent texture, delicate motifs, and elegant sarees from the historic town of chanderi. chanderi fabric is known for its sheer, glossy appearance and lightweight drape."
  },
  {
    "id": "patola",
    "name": "Patola",
    "state": "Gujarat",
    "region": "west",
    "material": "Silk",
    "technique": "Double ikat resist dyeing",
    "significance": "A highly skilled textile tradition where both warp and weft threads are dyed before weaving to create precise patterns.",
    "fact": "Double ikat Patola weaving requires exceptional planning because the pattern appears only when dyed threads align on the loom.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "patola gujarat west silk double ikat resist dyeing a highly skilled textile tradition where both warp and weft threads are dyed before weaving to create precise patterns. double ikat patola weaving requires exceptional planning because the pattern appears only when dyed threads align on the loom."
  },
  {
    "id": "pashmina",
    "name": "Pashmina",
    "state": "Jammu and Kashmir / Ladakh",
    "region": "north",
    "material": "Fine cashmere wool",
    "technique": "Fine spinning and weaving",
    "significance": "A luxury textile tradition known for soft shawls made from fine fibres associated with high-altitude Himalayan regions.",
    "fact": "Traditional Pashmina production depends on delicate fibre processing, spinning, and weaving skills.",
    "image": "assets/travel_mountains.png",
    "gallery": [
      "assets/travel_mountains.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "pashmina jammu and kashmir / ladakh north fine cashmere wool fine spinning and weaving a luxury textile tradition known for soft shawls made from fine fibres associated with high-altitude himalayan regions. traditional pashmina production depends on delicate fibre processing, spinning, and weaving skills."
  },
  {
    "id": "phulkari",
    "name": "Phulkari",
    "state": "Punjab",
    "region": "north",
    "material": "Cotton base with silk floss thread",
    "technique": "Surface embroidery",
    "significance": "A vibrant embroidery tradition whose name means flower-work, closely linked with Punjabi domestic and festive culture.",
    "fact": "Traditional Phulkari often uses geometric floral patterns created with darning stitches from the reverse side of the cloth.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "phulkari punjab north cotton base with silk floss thread surface embroidery a vibrant embroidery tradition whose name means flower-work, closely linked with punjabi domestic and festive culture. traditional phulkari often uses geometric floral patterns created with darning stitches from the reverse side of the cloth."
  },
  {
    "id": "bandhani",
    "name": "Bandhani",
    "state": "Gujarat / Rajasthan",
    "region": "west",
    "material": "Cotton, silk, georgette",
    "technique": "Tie-dye resist dyeing",
    "significance": "A colourful textile tradition made by tying tiny points of fabric before dyeing to create dotted patterns.",
    "fact": "Thousands of tiny tied knots can be used to form motifs, waves, dots, and elaborate pattern fields.",
    "image": "assets/travel_deserts.png",
    "gallery": [
      "assets/travel_deserts.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "bandhani gujarat / rajasthan west cotton, silk, georgette tie-dye resist dyeing a colourful textile tradition made by tying tiny points of fabric before dyeing to create dotted patterns. thousands of tiny tied knots can be used to form motifs, waves, dots, and elaborate pattern fields."
  },
  {
    "id": "kalamkari",
    "name": "Kalamkari",
    "state": "Andhra Pradesh / Telangana",
    "region": "south",
    "material": "Cotton fabric with natural dyes",
    "technique": "Hand painting and block printing",
    "significance": "A storytelling textile tradition known for mythological scenes, natural dyes, and drawn or printed motifs.",
    "fact": "The word Kalamkari comes from kalam, meaning pen, and kari, meaning craftsmanship.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "kalamkari andhra pradesh / telangana south cotton fabric with natural dyes hand painting and block printing a storytelling textile tradition known for mythological scenes, natural dyes, and drawn or printed motifs. the word kalamkari comes from kalam, meaning pen, and kari, meaning craftsmanship."
  },
  {
    "id": "muga-silk",
    "name": "Muga Silk",
    "state": "Assam",
    "region": "northeast",
    "material": "Muga silk",
    "technique": "Silk weaving",
    "significance": "A golden silk textile tradition of Assam valued for natural sheen, durability, and cultural importance.",
    "fact": "Muga silk has a naturally golden tone and is strongly associated with Assam's textile identity.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "muga silk assam northeast muga silk silk weaving a golden silk textile tradition of assam valued for natural sheen, durability, and cultural importance. muga silk has a naturally golden tone and is strongly associated with assam's textile identity."
  },
  {
    "id": "sambalpuri-ikat",
    "name": "Sambalpuri Ikat",
    "state": "Odisha",
    "region": "east",
    "material": "Cotton and silk",
    "technique": "Bandha ikat resist dyeing",
    "significance": "A celebrated Odisha textile tradition known for geometric, shell, flower, and wheel motifs created through resist dyeing.",
    "fact": "In Sambalpuri Bandha, threads are tie-dyed before weaving so motifs emerge directly within the woven structure.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "sambalpuri ikat odisha east cotton and silk bandha ikat resist dyeing a celebrated odisha textile tradition known for geometric, shell, flower, and wheel motifs created through resist dyeing. in sambalpuri bandha, threads are tie-dyed before weaving so motifs emerge directly within the woven structure."
  },
  {
    "id": "kantha",
    "name": "Kantha",
    "state": "West Bengal",
    "region": "east",
    "material": "Cotton and recycled cloth layers",
    "technique": "Running-stitch embroidery",
    "significance": "A narrative embroidery and quilting tradition often made through layered cloth and expressive running stitches.",
    "fact": "Kantha often transforms old fabrics into new functional and decorative textiles.",
    "image": "assets/culture.png",
    "gallery": [
      "assets/culture.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "kantha west bengal east cotton and recycled cloth layers running-stitch embroidery a narrative embroidery and quilting tradition often made through layered cloth and expressive running stitches. kantha often transforms old fabrics into new functional and decorative textiles."
  },
  {
    "id": "pochampally-ikat",
    "name": "Pochampally Ikat",
    "state": "Telangana",
    "region": "south",
    "material": "Cotton and silk",
    "technique": "Ikat resist dyeing",
    "significance": "A textile tradition from Telangana known for sharp geometric designs and colourful ikat patterns.",
    "fact": "Pochampally is strongly associated with modern Indian ikat sarees and geometric visual language.",
    "image": "assets/travel_hidden.png",
    "gallery": [
      "assets/travel_hidden.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "pochampally ikat telangana south cotton and silk ikat resist dyeing a textile tradition from telangana known for sharp geometric designs and colourful ikat patterns. pochampally is strongly associated with modern indian ikat sarees and geometric visual language."
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("textile-grid");
  const searchInput = document.getElementById("textile-search");
  const regionFilter = document.getElementById("region-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");
  const modal = document.getElementById("textile-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activeTextile = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  function titleCase(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function createCard(textile) {
    const card = document.createElement("article");
    card.className = "textile-card";
    card.dataset.id = textile.id;
    card.innerHTML = `
      <div class="textile-media">
        <img src="${escapeHtml(textile.image)}" alt="${escapeHtml(textile.name)}" loading="lazy">
        <span class="state-badge">${escapeHtml(textile.state)}</span>
        <span class="technique-badge">${escapeHtml(textile.technique)}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(textile.id)}">Explore textile</button>
      </div>
      <div class="textile-body">
        <h3>${escapeHtml(textile.name)}</h3>
        <p class="material">${escapeHtml(textile.material)}</p>
        <p class="significance">${escapeHtml(textile.significance)}</p>
        <div class="fact-preview">${escapeHtml(textile.fact)}</div>
      </div>`;
    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, { once: true });
    return card;
  }

  grid.replaceChildren(...textiles.map(createCard));
  document.getElementById("hero-count").textContent = textiles.length;

  function filterTextiles() {
    const query = searchInput.value.trim().toLowerCase();
    const region = regionFilter.value;
    const visible = textiles.filter(textile =>
      (!query || textile.search.includes(query)) &&
      (region === "all" || textile.region === region)
    );
    const ids = new Set(visible.map(textile => textile.id));
    document.querySelectorAll(".textile-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });
    const active = query || region !== "all";
    status.textContent = active
      ? `Found ${visible.length} textile tradition${visible.length === 1 ? "" : "s"}`
      : `Showing all ${visible.length} textiles`;
    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    regionFilter.value = "all";
    filterTextiles();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeTextile.gallery;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeTextile.name} gallery image ${imageIndex + 1}`;
    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };
    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function openModal(textile, trigger) {
    activeTextile = textile;
    imageIndex = 0;
    lastFocus = trigger;
    document.getElementById("modal-state").textContent =
      `${textile.state} · ${titleCase(textile.region)} India`;
    document.getElementById("modal-title").textContent = textile.name;
    document.getElementById("modal-material").textContent = textile.material;
    document.getElementById("modal-technique").textContent = textile.technique;
    document.getElementById("modal-significance").textContent = textile.significance;
    document.getElementById("modal-fact").textContent = textile.fact;
    updateImage();
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeTextile = null;
    imageIndex = 0;
    if (lastFocus) lastFocus.focus();
  }

  function stepGallery(direction) {
    if (!activeTextile) return;
    imageIndex = (imageIndex + direction + activeTextile.gallery.length) % activeTextile.gallery.length;
    updateImage();
  }

  searchInput.addEventListener("input", filterTextiles);
  regionFilter.addEventListener("change", filterTextiles);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    const textile = textiles.find(item => item.id === button.dataset.id);
    if (textile) openModal(textile, button);
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

  filterTextiles();
});
