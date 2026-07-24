// ---------- Handicrafts Data (16 crafts across UP districts) ----------
const allCrafts = [
  {
    name: "Lucknow Chikankari",
    icon: "🪡",
    district: "Lucknow",
    category: "textile",
    tags: ["GI Tagged", "Embroidery"],
    description: "A delicate white-thread embroidery style done on fine fabrics like muslin, chiffon, and organza.",
    history: "Chikankari traces its roots to the Mughal era, with the word 'chikan' derived from a Persian term for fabric fashioned by embroidery. It flourished under Awadh's Nawabs and reached its artistic peak in Lucknow.",
    artisan: "Skilled chikan artisans, many of them women working from home, use techniques like 'bakhia', 'murri', and 'keel kangan' to create over 30 distinct stitch styles, often passed down through generations.",
    districtStory: "Lucknow remains the beating heart of chikankari, with entire neighbourhoods of artisan families dedicated to hand-embroidering sarees, kurtas, and dupattas for markets across India and abroad."
  },
  {
    name: "Moradabad Brassware",
    icon: "🏺",
    district: "Moradabad",
    category: "metal",
    tags: ["GI Tagged", "Metalwork"],
    description: "Intricately engraved brass, copper, and aluminium items known for ornamental and utilitarian craftsmanship.",
    history: "Moradabad has been a metalworking hub for centuries, earning the nickname 'Peetal Nagri' (Brass City) of India for its dominance in decorative and export-quality metal crafts.",
    artisan: "Artisans use two primary engraving techniques — 'Naqashi' (done on a tinned surface) and 'Khudai' (done on lac-coated unpolished brass) — to create vases, idols, trays, and contemporary bowls.",
    districtStory: "Moradabad exports brassware to countries around the world, making it one of India's most significant handicraft export centres, employing thousands of skilled metal artisans."
  },
  {
    name: "Bhadohi Carpets",
    icon: "🧶",
    district: "Bhadohi",
    category: "carpet",
    tags: ["GI Tagged", "Hand-knotted"],
    description: "Hand-knotted wool and silk carpets known worldwide for intricate designs and remarkable durability.",
    history: "Bhadohi's carpet-weaving tradition dates back centuries and the region is often referred to as the 'Carpet City' of India, supplying premium hand-knotted rugs to global markets.",
    artisan: "Weavers use traditional knotting techniques passed through generations, with a single large carpet sometimes taking several artisans many months of patient, meticulous work to complete.",
    districtStory: "Bhadohi, along with neighbouring Mirzapur, forms the largest hand-knotted carpet weaving belt in India, contributing significantly to the country's handicraft exports."
  },
  {
    name: "Firozabad Glassware",
    icon: "🔮",
    district: "Firozabad",
    category: "glass",
    tags: ["GI Tagged", "Glasswork"],
    description: "Decorative glass bangles, beads, and lighting pieces that showcase the region's centuries-old glassblowing tradition.",
    history: "Firozabad's glass industry is believed to have flourished under Mughal patronage, and the city has since become synonymous with glass bangles across India.",
    artisan: "Glassblowers work near furnaces at extreme temperatures, shaping molten glass into bangles, chandeliers, and decorative pieces with techniques refined over many generations.",
    districtStory: "Firozabad is often called the 'Glass City' of India, and its bangle industry alone supports a vast network of artisan families and small workshops."
  },
  {
    name: "Saharanpur Wood Carving",
    icon: "🪵",
    district: "Saharanpur",
    category: "wood",
    tags: ["GI Tagged", "Woodcraft"],
    description: "Ornamental wooden furniture and decorative objects carved with intricate floral and geometric designs.",
    history: "Saharanpur's woodcraft tradition is believed to have been influenced by Kashmiri settlers, blending Kashmiri carving patterns with local craftsmanship on teak, sheesham, and deodar wood.",
    artisan: "Master carvers, known locally for their inlay and jali work, spend years perfecting the fine detailing seen on furniture, screens, and decorative panels.",
    districtStory: "Saharanpur's wood carving industry contributes significantly to India's handicraft exports, with pieces finding their way into homes and galleries worldwide."
  },
  {
    name: "Banarasi Silk Saree",
    icon: "🧵",
    district: "Varanasi",
    category: "textile",
    tags: ["GI Tagged", "Silk"],
    description: "Luxurious silk sarees woven with intricate gold and silver zari work, considered among India's finest textiles.",
    history: "Banarasi silk weaving is thought to have flourished during the Mughal era, when Persian motifs blended with Indian silk weaving traditions to create the distinctive Banarasi style.",
    artisan: "Weaver families in Varanasi work on traditional handlooms, sometimes taking weeks to complete a single saree with elaborate brocade patterns and zari borders.",
    districtStory: "Varanasi holds the highest number of GI-tagged products of any Indian city, with Banarasi silk remaining its most globally recognised textile export."
  },
  {
    name: "Varanasi Zardozi",
    icon: "✨",
    district: "Varanasi",
    category: "textile",
    tags: ["Embroidery", "Metallic Thread"],
    description: "Opulent gold and silver thread embroidery used to create lavish, intricate designs on fabric.",
    history: "Zardozi embroidery has roots in royal Mughal courts, where artisans embellished garments and tapestries for royalty using real gold and silver threads.",
    artisan: "Zardozi artisans use fine metallic threads, sequins, and beads, stitching elaborate patterns onto silk and velvet, often for bridal wear and ceremonial garments.",
    districtStory: "Varanasi's zardozi workshops continue a centuries-old tradition, with many artisan families still practising skills inherited from their ancestors."
  },
  {
    name: "Khurja Pottery",
    icon: "🏺",
    district: "Bulandshahr",
    category: "glass",
    tags: ["GI Tagged", "Ceramics"],
    description: "Refined ceramic pottery known for its distinctive blue, green, and brown glazes, often called India's ceramics capital craft.",
    history: "Khurja's pottery tradition developed with influences from Persian ceramic styles, evolving over centuries into a distinctly Indian glazed pottery art form.",
    artisan: "Potters shape refined clay on traditional wheels before hand-painting and glazing each piece, a process requiring both technical skill and artistic patience.",
    districtStory: "Khurja town, near Bulandshahr, is widely known as the 'Ceramics Capital of India', with generations of potter families keeping the tradition alive."
  },
  {
    name: "Kannauj Attar",
    icon: "🌸",
    district: "Kannauj",
    category: "textile",
    tags: ["GI Tagged", "Perfumery"],
    description: "Traditional natural perfumes distilled from flowers, herbs, and spices using centuries-old techniques.",
    history: "Kannauj's perfumery tradition is believed to be centuries old, earning the town the title 'Perfume Capital of India' for its natural attar-making heritage.",
    artisan: "Perfumers use the traditional 'deg-bhapka' distillation method, capturing floral essences in sandalwood oil over long, carefully monitored processes.",
    districtStory: "Kannauj remains home to hundreds of small-scale attar distilleries, exporting natural perfumes to markets across India and the Middle East."
  },
  {
    name: "Agra Stone Inlay",
    icon: "🗿",
    district: "Agra",
    category: "wood",
    tags: ["Stonecraft", "Pietra Dura"],
    description: "Fine marble stone-carving and inlay work inspired by the decorative techniques seen on the Taj Mahal.",
    history: "Agra's stone inlay craft, known as 'Pietra Dura', developed alongside the construction of Mughal monuments, with artisan families continuing techniques used on the Taj Mahal itself.",
    artisan: "Craftsmen embed semi-precious stones into white marble to create intricate floral patterns, a painstaking process requiring extreme precision.",
    districtStory: "Many of today's Agra stone-inlay artisans trace their lineage directly back to craftsmen who worked on the Taj Mahal centuries ago."
  },
  {
    name: "Mainpuri Tarkashi",
    icon: "🪞",
    district: "Mainpuri",
    category: "wood",
    tags: ["Wire Inlay", "Woodwork"],
    description: "A unique craft of inlaying fine brass wire into wooden furniture and decorative boxes.",
    history: "Tarkashi, meaning wire craft, developed in Mainpuri as artisans began embedding thin brass wires into wood to create striking geometric and floral patterns.",
    artisan: "Artisans carve fine grooves into wood before carefully hammering brass wire into place, creating a shimmering contrast against the dark wood surface.",
    districtStory: "Mainpuri remains one of the few places in India where this delicate wire-inlay woodcraft tradition is still actively practised and taught."
  },
  {
    name: "Varanasi Wooden Toys",
    icon: "🧸",
    district: "Varanasi",
    category: "wood",
    tags: ["Toys", "Lacquerware"],
    description: "Brightly lacquered wooden toys and figurines handcrafted using traditional turning and painting techniques.",
    history: "Varanasi's wooden toy-making tradition has been passed down for generations, with artisans crafting figurines, spinning tops, and decorative pieces for both play and display.",
    artisan: "Craftsmen shape soft wood on manual lathes before hand-painting each toy with vivid natural and synthetic colours in traditional patterns.",
    districtStory: "Varanasi's toy-making clusters continue to supply colourful wooden toys to markets across northern India, keeping a centuries-old craft alive."
  },
  {
    name: "Meerut Scissors & Tools",
    icon: "✂️",
    district: "Meerut",
    category: "metal",
    tags: ["GI Tagged", "Tool-making"],
    description: "Precision-made scissors and cutting tools known for their sharpness and durability.",
    history: "Meerut's metal tool-making tradition developed over generations, establishing the city as a major centre for scissors and cutlery production in North India.",
    artisan: "Skilled metalworkers forge, sharpen, and finish each tool by hand, combining traditional blacksmithing techniques with modern precision finishing.",
    districtStory: "Meerut remains one of India's largest hubs for scissors and cutting-tool manufacturing, exporting to both domestic and international markets."
  },
  {
    name: "Kanpur Leathercraft",
    icon: "👞",
    district: "Kanpur",
    category: "textile",
    tags: ["Leather", "Footwear"],
    description: "High-quality leather goods including footwear, saddles, and harnesses known for durability and fine finishing.",
    history: "Kanpur's leather industry grew rapidly during the colonial era, evolving into one of India's most significant leather manufacturing and export hubs.",
    artisan: "Leather artisans in Kanpur combine traditional tanning and stitching methods with modern techniques to produce footwear and goods valued for their craftsmanship.",
    districtStory: "Kanpur is often referred to as the 'Leather City' of India, home to hundreds of tanneries and workshops supplying products worldwide."
  },
  {
    name: "Farrukhabad Hand-Block Printing",
    icon: "🖨️",
    district: "Farrukhabad",
    category: "textile",
    tags: ["Block Printing", "Textile Art"],
    description: "Vibrant hand-block printed textiles known for bold colours and distinctive traditional patterns.",
    history: "Farrukhabad's block-printing tradition developed as a distinct regional style, with hand-carved wooden blocks used to stamp intricate patterns onto fabric.",
    artisan: "Printers carve detailed wooden blocks before hand-stamping fabric in layered colours, a process requiring precise alignment and a steady hand.",
    districtStory: "Farrukhabad's textile printing clusters continue to produce fabrics that are popular across India for their distinctive and vibrant regional patterns."
  },
  {
    name: "Agra Durries",
    icon: "🧵",
    district: "Agra",
    category: "carpet",
    tags: ["Flat-weave", "Cotton Rugs"],
    description: "Flat-woven cotton rugs known for bright geometric patterns and everyday comfort.",
    history: "Durrie weaving in Agra developed as a practical craft, producing sturdy, colourful floor coverings suited to daily household use across North India.",
    artisan: "Weavers use traditional handlooms to interlace cotton threads into bold geometric patterns, creating durable rugs prized for both function and design.",
    districtStory: "Agra's durrie-weaving communities continue producing these versatile rugs, popular in both traditional homes and modern interior design."
  }
];

const districtLabels = {};
allCrafts.forEach(c => { districtLabels[c.district] = c.district; });

// ---------- State ----------
let activeDistrict = "all";
let activeCategory = "all";
let searchQuery = "";
let selectedCraftName = null;

// ---------- DOM References ----------
const craftGrid = document.getElementById("craftGrid");
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const districtList = document.getElementById("districtList");
const categoryList = document.getElementById("categoryList");

const totalCraftsStat = document.getElementById("totalCraftsStat");
const totalDistrictsStat = document.getElementById("totalDistrictsStat");

const detailEmpty = document.getElementById("detailEmpty");
const detailContent = document.getElementById("detailContent");
const detailCloseBtn = document.getElementById("detailCloseBtn");
const detailIcon = document.getElementById("detailIcon");
const detailDistrictTag = document.getElementById("detailDistrictTag");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const detailHistory = document.getElementById("detailHistory");
const detailArtisan = document.getElementById("detailArtisan");
const detailDistrictStory = document.getElementById("detailDistrictStory");

// ---------- Build District Filter Buttons ----------
function buildDistrictButtons() {
  const uniqueDistricts = [...new Set(allCrafts.map(c => c.district))].sort();
  uniqueDistricts.forEach(district => {
    const btn = document.createElement("button");
    btn.className = "district-btn";
    btn.dataset.district = district;
    btn.innerHTML = `<span class="district-name">${district}</span>`;
    districtList.appendChild(btn);
  });
}

// ---------- Render Crafts ----------
function renderCrafts() {
  const filtered = allCrafts.filter(craft => {
    const matchesDistrict = activeDistrict === "all" || craft.district === activeDistrict;
    const matchesCategory = activeCategory === "all" || craft.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      craft.name.toLowerCase().includes(searchQuery) ||
      craft.district.toLowerCase().includes(searchQuery) ||
      craft.description.toLowerCase().includes(searchQuery);
    return matchesDistrict && matchesCategory && matchesSearch;
  });

  resultsCount.textContent = `Showing ${filtered.length} craft${filtered.length !== 1 ? "s" : ""}`;

  if (filtered.length === 0) {
    craftGrid.innerHTML = "";
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");
  craftGrid.innerHTML = "";

  filtered.forEach(craft => {
    const card = document.createElement("div");
    card.className = "craft-card" + (craft.name === selectedCraftName ? " selected" : "");
    card.innerHTML = `
      <span class="craft-card-icon">${craft.icon}</span>
      <span class="craft-card-district">${craft.district}</span>
      <h3 class="craft-card-name">${craft.name}</h3>
      <p class="craft-card-desc">${craft.description}</p>
      <div class="craft-card-tags">
        ${craft.tags.map(t => `<span class="craft-tag">${t}</span>`).join("")}
      </div>
    `;
    card.addEventListener("click", () => showDetail(craft));
    craftGrid.appendChild(card);
  });
}

// ---------- Detail Panel ----------
function showDetail(craft) {
  selectedCraftName = craft.name;

  detailIcon.textContent = craft.icon;
  detailDistrictTag.textContent = craft.district;
  detailTitle.textContent = craft.name;
  detailDescription.textContent = craft.description;
  detailHistory.textContent = craft.history;
  detailArtisan.textContent = craft.artisan;
  detailDistrictStory.textContent = craft.districtStory;

  detailEmpty.classList.add("hidden");
  detailContent.classList.remove("hidden");

  renderCrafts();
}

function closeDetail() {
  selectedCraftName = null;
  detailContent.classList.add("hidden");
  detailEmpty.classList.remove("hidden");
  renderCrafts();
}

detailCloseBtn.addEventListener("click", closeDetail);

// ---------- Filters ----------
districtList.addEventListener("click", (e) => {
  const btn = e.target.closest(".district-btn");
  if (!btn) return;
  districtList.querySelectorAll(".district-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeDistrict = btn.dataset.district;
  renderCrafts();
});

categoryList.addEventListener("click", (e) => {
  const btn = e.target.closest(".category-btn");
  if (!btn) return;
  categoryList.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.category;
  renderCrafts();
});

// ---------- Search ----------
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderCrafts();
});

// ---------- Stats ----------
function updateStats() {
  totalCraftsStat.textContent = allCrafts.length;
  totalDistrictsStat.textContent = new Set(allCrafts.map(c => c.district)).size;
}

// ---------- Init ----------
buildDistrictButtons();
updateStats();
renderCrafts();