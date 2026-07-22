/**
 * volcanoes-geology.js
 * Indian Volcanoes & Geological Formations Explorer
 */

const geologicalFormations = [
    {
        id: "barren-island",
        name: "Barren Island Volcano",
        location: "Andaman Islands",
        type: "volcanic",
        typeLabel: "Volcanic",
        badgeClass: "badge-volcanic",
        icon: "🌋",
        description: "South Asia's only confirmed active volcano and India's sole volcanic island. Located 135 km NE of Port Blair, Barren Island has erupted periodically since 1787, most recently in 2017. The 354-metre cone rises from deep ocean seafloor with lava flows reaching the sea.",
        age: "Active (Quaternary)",
        rockType: "Andesite & Basalt",
        height: "354 m above sea level",
        status: "Active — restricted access"
    },
    {
        id: "narcondam-island",
        name: "Narcondam Island (Dormant Volcano)",
        location: "North Andaman, Andaman Islands",
        type: "volcanic",
        typeLabel: "Volcanic",
        badgeClass: "badge-volcanic",
        icon: "🏝️",
        description: "A dormant stratovolcano and biodiversity hotspot 250 km NE of Port Blair. The 710-metre ancient caldera is now covered by dense evergreen forest, home to the endemic Narcondam Hornbill. Last significant eruptive activity estimated 50,000 years ago.",
        age: "Dormant (Pleistocene)",
        rockType: "Andesite",
        height: "710 m above sea level",
        status: "Wildlife Sanctuary — Protected"
    },
    {
        id: "lonar-crater",
        name: "Lonar Impact Crater Lake",
        location: "Buldana, Maharashtra",
        type: "crater",
        typeLabel: "Impact Crater",
        badgeClass: "badge-crater",
        icon: "☄️",
        description: "Formed approximately 50,000 years ago by a hypervelocity meteorite strike, the Lonar Crater (1.8 km diameter) is the world's only known impact crater formed in basaltic rock. The alkaline-saline lake within hosts unique microbial life found nowhere else on Earth.",
        age: "~50,000 years (Holocene)",
        rockType: "Basalt (impacted)",
        height: "100 m below rim",
        status: "National Geo-Heritage Monument"
    },
    {
        id: "deccan-traps",
        name: "Deccan Traps",
        location: "Maharashtra, Karnataka, Gujarat",
        type: "basaltic",
        typeLabel: "Basaltic / Igneous",
        badgeClass: "badge-basaltic",
        icon: "🪨",
        description: "One of the largest volcanic features on Earth, formed 66 Ma during a massive flood-basalt eruption coinciding with the Cretaceous–Paleogene extinction event. Covering over 500,000 sq km, the layered basalt plateau is 2 km thick in parts and reveals India's deep geological history.",
        age: "66 million years (Cretaceous)",
        rockType: "Flood Basalt",
        height: "Up to 600 m plateau",
        status: "Natural Heritage Region"
    },
    {
        id: "gilbert-hill",
        name: "Gilbert Hill (Columnar Basalt)",
        location: "Andheri, Mumbai, Maharashtra",
        type: "basaltic",
        typeLabel: "Basaltic / Igneous",
        badgeClass: "badge-basaltic",
        icon: "🗿",
        description: "A dramatic 200-ft vertical basalt monolith rising from Mumbai's suburban Andheri area. Formed by rapid solidification of Deccan Trap lava flows 66 million years ago, the hexagonal columnar jointing is identical to Ireland's Giant's Causeway and Yellowstone's Devil's Tower.",
        age: "66 million years (Cretaceous)",
        rockType: "Columnar Basalt",
        height: "200 ft (61 m) vertical face",
        status: "Grade II Heritage Site"
    },
    {
        id: "marble-rocks-bhedaghat",
        name: "Marble Rocks (Bhedaghat Gorge)",
        location: "Jabalpur, Madhya Pradesh",
        type: "basaltic",
        typeLabel: "Basaltic / Igneous",
        badgeClass: "badge-basaltic",
        icon: "💎",
        description: "The Narmada River cuts through 3 km of translucent white, grey-pink, and green metamorphic marble (dolomitic limestone) creating 100-foot soaring canyon walls that glow ethereally under moonlight. The Dhuandhar Waterfall marks the gorge's upper boundary.",
        age: "Precambrian (>500 Ma)",
        rockType: "Metamorphic Marble (Dolomite)",
        height: "30 m canyon walls",
        status: "National Monument"
    },
    {
        id: "borra-caves",
        name: "Borra Caves",
        location: "Araku Valley, Andhra Pradesh",
        type: "karst",
        typeLabel: "Karst & Caves",
        badgeClass: "badge-karst",
        icon: "🕳️",
        description: "India's largest caves system, formed by karst dissolution of Kurnool limestone over a million years. The Gosthani River carved these 80-metre deep chambers, which contain spectacular stalactites, stalagmites, and flowstones. A 2-million-year-old Shiva lingam formation is revered locally.",
        age: "1 million years (Pleistocene)",
        rockType: "Kurnool Limestone",
        height: "705 m above sea level",
        status: "Geological Survey Monument"
    },
    {
        id: "yana-karst-rocks",
        name: "Yana Rocks (Karst Spires)",
        location: "Sirsi, Karnataka",
        type: "karst",
        typeLabel: "Karst & Caves",
        badgeClass: "badge-karst",
        icon: "🏔️",
        description: "Two extraordinary black crystalline limestone spires — Bhairaveshwara Shikhara (120 m) and Mohini Shikhara (90 m) — rising abruptly from dense Western Ghats forests. These rare karst formations in crystalline limestone were sculpted by rainwater dissolution over millions of years.",
        age: ">100 million years (Cretaceous)",
        rockType: "Black Crystalline Limestone",
        height: "120 m (Bhairaveshwara Shikhara)",
        status: "State Protected Site"
    },
    {
        id: "belum-caves",
        name: "Belum Caves",
        location: "Kurnool, Andhra Pradesh",
        type: "karst",
        typeLabel: "Karst & Caves",
        badgeClass: "badge-karst",
        icon: "🦇",
        description: "India's second-longest cave system (3.2 km explored) formed by underground Chitravathi River dissolving Kurnool limestone over 1.5 million years. Contains remarkable siphons, freshwater galleries, and chambers including the Thousand-Hood Cobra formation named for overlapping stalactites.",
        age: "1.5 million years (Pleistocene)",
        rockType: "Kurnool Limestone (Proterozoic)",
        height: "120 m depth",
        status: "Government Tourist Heritage Site"
    },
    {
        id: "st-marys-islands",
        name: "St. Mary's Isles (Basaltic Columns)",
        location: "Malpe, Karnataka",
        type: "basaltic",
        typeLabel: "Basaltic / Igneous",
        badgeClass: "badge-basaltic",
        icon: "🌊",
        description: "These four Arabian Sea islets near Malpe Beach expose spectacular hexagonal and pentagonal columnar jointing formed 88 million years ago during Deccan flood basalt eruptions. The columnar pillars — some 5 metres tall — rise directly from the tide line and are a Geological Monument of India.",
        age: "88 million years (Cretaceous)",
        rockType: "Columnar Basalt (Tholeiitic)",
        height: "Sea level to 5 m columns",
        status: "National Geological Monument"
    }
];

let activeFilter = "all";

function getFilteredFormations(query = "", type = "all") {
    const q = query.toLowerCase().trim();
    return geologicalFormations.filter(f => {
        const matchType = type === "all" || f.type === type;
        const matchSearch = !q ||
            f.name.toLowerCase().includes(q) ||
            f.location.toLowerCase().includes(q) ||
            f.description.toLowerCase().includes(q) ||
            f.rockType.toLowerCase().includes(q);
        return matchType && matchSearch;
    });
}

function renderGeoGrid() {
    if (typeof document === "undefined") return;
    const grid = document.getElementById("geo-grid");
    if (!grid) return;

    const query = document.getElementById("geo-search")?.value || "";
    const filtered = getFilteredFormations(query, activeFilter);

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#8b949e;">No formations match your search.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(f => `
        <div class="geo-card" data-id="${f.id}">
            <div class="geo-card-header">
                <span class="geo-icon" aria-hidden="true">${f.icon}</span>
                <div class="geo-meta">
                    <span class="geo-type-badge ${f.badgeClass}">${f.typeLabel}</span>
                    <h3>${f.name}</h3>
                    <span class="geo-location">📍 ${f.location}</span>
                </div>
            </div>
            <div class="geo-card-body">
                <p class="geo-description">${f.description}</p>
                <div class="geo-facts">
                    <div class="fact-row"><span class="fact-label">Age:</span><span class="fact-value">${f.age}</span></div>
                    <div class="fact-row"><span class="fact-label">Rock Type:</span><span class="fact-value">${f.rockType}</span></div>
                    <div class="fact-row"><span class="fact-label">Scale:</span><span class="fact-value">${f.height}</span></div>
                    <div class="fact-row"><span class="fact-label">Status:</span><span class="fact-value">${f.status}</span></div>
                </div>
            </div>
        </div>
    `).join("");
}

function initPillFilters() {
    if (typeof document === "undefined") return;
    document.querySelectorAll(".pill").forEach(pill => {
        pill.addEventListener("click", () => {
            activeFilter = pill.dataset.filter;
            document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            renderGeoGrid();
        });
    });
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        renderGeoGrid();
        initPillFilters();
        document.getElementById("geo-search")?.addEventListener("input", renderGeoGrid);
    });
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { geologicalFormations, getFilteredFormations };
}
