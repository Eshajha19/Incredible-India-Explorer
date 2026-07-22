/**
 * then-vs-now.js
 * Heritage Comparison Explorer with interactive slider & keyboard accessibility.
 */

// Dataset of minimum 10 heritage sites with historical vs present day comparison details
const heritageLocations = [
    {
        id: "taj-mahal",
        title: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        category: "monument",
        categoryLabel: "Monuments & Tombs",
        thenYear: "1860s (Early Survey)",
        nowYear: "Present Day (Restored)",
        thenDescription: "In the mid-19th century, the Taj Mahal's surrounding gardens were overgrown, and early black-and-white survey photographs show weathering on the marble minarets and outer gate.",
        nowDescription: "Extensive conservation by the Archaeological Survey of India (ASI) cleared atmospheric pollution discoloration, restored intricate Pietra Dura marble inlays, and recreated structured Mughal Charbagh gardens.",
        conservationStatus: "Protected UNESCO World Heritage Site with strict eco-zone restrictions.",
        thenGraphicStyle: "background: linear-gradient(rgba(40,25,15,0.7), rgba(40,25,15,0.7)), #8b5cf6; background-image: radial-gradient(#d97706 1px, transparent 1px); background-size: 16px 16px;",
        nowGraphicStyle: "background: linear-gradient(rgba(15,23,42,0.4), rgba(15,23,42,0.4)), #0284c7; background-image: radial-gradient(#38bdf8 1px, transparent 1px); background-size: 16px 16px;"
    },
    {
        id: "hampi-stone-chariot",
        title: "Hampi Stone Chariot & Ruins",
        location: "Vijayanagara, Karnataka",
        category: "temple",
        categoryLabel: "Temples & Caves",
        thenYear: "1856 (Alexander Greenlaw Photo)",
        nowYear: "Present Day (UNESCO Protected)",
        thenDescription: "19th-century photographs record the iconic Vittala Temple stone chariot partially buried in river silt with overgrown vegetation amidst scattered granite boulders.",
        nowDescription: "Carefully excavated and consolidated. Protective barriers prevent physical contact while night lighting illuminates the monolithic granite craftsmanship for visitors worldwide.",
        conservationStatus: "UNESCO World Heritage site with active landscape preservation.",
        thenGraphicStyle: "background: linear-gradient(rgba(60,30,10,0.75), rgba(60,30,10,0.75)), #78350f;",
        nowGraphicStyle: "background: linear-gradient(rgba(6,78,59,0.5), rgba(6,78,59,0.5)), #059669;"
    },
    {
        id: "qutub-minar",
        title: "Qutub Minar Complex",
        location: "New Delhi",
        category: "monument",
        categoryLabel: "Monuments & Tombs",
        thenYear: "1870s (ASI Survey)",
        nowYear: "Present Day",
        thenDescription: "The Alai Minar base and surrounding Quwwat-ul-Islam mosque arcades lay half-buried under sand dunes with missing parapets after centuries of weather exposure.",
        nowDescription: "Restored sandstone balconies, laser-levelled foundation monitoring, and landscaped manicured lawns framing the 73-metre tower.",
        conservationStatus: "Monitored with digital inclination sensors by ASI.",
        thenGraphicStyle: "background: linear-gradient(rgba(50,40,30,0.8), rgba(50,40,30,0.8)), #92400e;",
        nowGraphicStyle: "background: linear-gradient(rgba(30,58,138,0.5), rgba(30,58,138,0.5)), #2563eb;"
    },
    {
        id: "konark-sun-temple",
        title: "Konark Sun Temple",
        location: "Puri, Odisha",
        category: "temple",
        categoryLabel: "Temples & Caves",
        thenYear: "1903 (Sand-Filled Jagamohana)",
        nowYear: "Present Day (Reinforced)",
        thenDescription: "The main sanctuary collapsed in the 19th century. British engineers filled the remaining Jagamohana hall with sand in 1903 to prevent total structural collapse.",
        nowDescription: "The ASI has safely removed internal sand fill using robotic excavation while strengthening outer stone carved wheels and horses with chemical weathering guards.",
        conservationStatus: "National Heritage Site under active structural reinforcement.",
        thenGraphicStyle: "background: linear-gradient(rgba(70,45,20,0.8), rgba(70,45,20,0.8)), #b45309;",
        nowGraphicStyle: "background: linear-gradient(rgba(15,118,110,0.5), rgba(15,118,110,0.5)), #0d9488;"
    },
    {
        id: "ajanta-caves",
        title: "Ajanta Caves Entrance",
        location: "Chhatrapati Sambhaji Nagar, Maharashtra",
        category: "temple",
        categoryLabel: "Temples & Caves",
        thenYear: "1819 (Rediscovery Era)",
        nowYear: "Present Day (Climate Controlled)",
        thenDescription: "When John Smith rediscovered Cave 10 in 1819, dense jungle foliage covered the basalt cliff face and soot/bat guano obscured 2,000-year-old Jataka paintings.",
        nowDescription: "Equipped with cold-LED illumination, humidity sensors, visitor pathways, and micro-chemical mural stabilization by conservation experts.",
        conservationStatus: "UNESCO World Heritage preserve with strict light restriction.",
        thenGraphicStyle: "background: linear-gradient(rgba(40,40,30,0.8), rgba(40,40,30,0.8)), #451a03;",
        nowGraphicStyle: "background: linear-gradient(rgba(70,80,95,0.5), rgba(70,80,95,0.5)), #475569;"
    },
    {
        id: "victoria-memorial",
        title: "Victoria Memorial",
        location: "Kolkata, West Bengal",
        category: "colonial",
        categoryLabel: "Colonial Landmarks",
        thenYear: "1921 (Opening Era)",
        nowYear: "Present Day",
        thenDescription: "Completed in 1921 using Makrana marble, surrounded by open wetlands and early city trams on muddy pathways.",
        nowDescription: "Immaculate green lawns, illuminated fountain pools, and curated museum galleries hosting over 2 million visitors annually.",
        conservationStatus: "Maintained by Victoria Memorial Board under Ministry of Culture.",
        thenGraphicStyle: "background: linear-gradient(rgba(60,60,60,0.7), rgba(60,60,60,0.7)), #52525b;",
        nowGraphicStyle: "background: linear-gradient(rgba(14,116,144,0.5), rgba(14,116,144,0.5)), #0891b2;"
    },
    {
        id: "sanchi-stupa",
        title: "Sanchi Stupa",
        location: "Raisen, Madhya Pradesh",
        category: "monument",
        categoryLabel: "Monuments & Tombs",
        thenYear: "1850s (Ruined Mound)",
        nowYear: "Present Day (UNESCO Restored)",
        thenDescription: "Amateur 19th-century excavations left the dome breached and Torana gateways fallen in surrounding brushwood.",
        nowDescription: "Sir John Marshall restored the Great Stupa between 1912-1919. All four intricate stone Toranas stand fully assembled in pristine condition.",
        conservationStatus: "UNESCO World Heritage Site with museum complex.",
        thenGraphicStyle: "background: linear-gradient(rgba(80,50,20,0.75), rgba(80,50,20,0.75)), #9a3412;",
        nowGraphicStyle: "background: linear-gradient(rgba(21,128,61,0.5), rgba(21,128,61,0.5)), #16a34a;"
    },
    {
        id: "gateway-of-india",
        title: "Gateway of India",
        location: "Mumbai, Maharashtra",
        category: "colonial",
        categoryLabel: "Colonial Landmarks",
        thenYear: "1924 (Completion)",
        nowYear: "Present Day Waterfront",
        thenDescription: "Constructed to commemorate the royal visit of King George V, standing on a raw reclaimed sea wall with early steam ferry docks.",
        nowDescription: "A bustling basalt arch landmark with sea wall plaza, protective plazas, lighting arrays, and ferry connectivity to Elephanta Caves.",
        conservationStatus: "State protected monument with marine erosion monitoring.",
        thenGraphicStyle: "background: linear-gradient(rgba(50,50,60,0.8), rgba(50,50,60,0.8)), #475569;",
        nowGraphicStyle: "background: linear-gradient(rgba(30,64,175,0.5), rgba(30,64,175,0.5)), #1d4ed8;"
    },
    {
        id: "meenakshi-temple",
        title: "Meenakshi Amman Temple",
        location: "Madurai, Tamil Nadu",
        category: "temple",
        categoryLabel: "Temples & Caves",
        thenYear: "19th Century View",
        nowYear: "Present Day Vibrant Gopurams",
        thenDescription: "Faded stucco sculptures on the towering Gopurams due to centuries of tropical monsoon weather.",
        nowDescription: "Kumbhabhishekam consecrations every 12 years repaint thousands of mythological figures in brilliant mineral colors and protect stone pillars.",
        conservationStatus: "Active living heritage temple under HR&CE preservation.",
        thenGraphicStyle: "background: linear-gradient(rgba(70,40,40,0.8), rgba(70,40,40,0.8)), #881337;",
        nowGraphicStyle: "background: linear-gradient(rgba(192,38,211,0.4), rgba(192,38,211,0.4)), #c026d3;"
    },
    {
        id: "nalanda-ruins",
        title: "Nalanda Mahavihara Ruins",
        location: "Nalanda, Bihar",
        category: "monument",
        categoryLabel: "Monuments & Tombs",
        thenYear: "1861 (Cunningham Excavation)",
        nowYear: "Present Day Excavated Campus",
        thenDescription: "Grassy earth mounds hid the ancient 5th-century Buddhist University layout before Sir Alexander Cunningham identified the site.",
        nowDescription: "Excavated red-brick monasteries, stupas, lecture halls, and drainage networks showcased as a UNESCO World Heritage university complex.",
        conservationStatus: "UNESCO World Heritage Site with heritage buffer zone.",
        thenGraphicStyle: "background: linear-gradient(rgba(70,30,20,0.8), rgba(70,30,20,0.8)), #7c2d12;",
        nowGraphicStyle: "background: linear-gradient(rgba(180,83,9,0.5), rgba(180,83,9,0.5)), #d97706;"
    }
];

let selectedSiteId = heritageLocations[0].id;
let sliderPosition = 50;

/**
 * Calculates slider width percentage and updates visual clipping bounds.
 * @param {number} percentage - Slider position from 0 to 100
 */
function setSliderPosition(percentage) {
    sliderPosition = Math.max(0, Math.min(100, percentage));
    
    if (typeof document !== "undefined") {
        const sliderContainer = document.getElementById("comparison-slider");
        const layerThen = document.getElementById("layer-then");
        const sliderHandle = document.getElementById("slider-handle");
        
        if (layerThen && sliderHandle) {
            layerThen.style.width = `${sliderPosition}%`;
            sliderHandle.style.left = `${sliderPosition}%`;
        }
        
        if (sliderContainer) {
            sliderContainer.setAttribute("aria-valuenow", Math.round(sliderPosition));
        }
    }
}

/**
 * Renders details for the selected heritage location.
 * @param {string} siteId - ID of the site to select
 */
function selectSite(siteId) {
    const site = heritageLocations.find(s => s.id === siteId);
    if (!site) return;

    selectedSiteId = siteId;

    if (typeof document !== "undefined") {
        const titleEl = document.getElementById("current-title");
        if (titleEl) titleEl.textContent = site.title;

        const locEl = document.getElementById("current-location");
        if (locEl) locEl.textContent = `${site.location} • Historical Era: ${site.thenYear} vs ${site.nowYear}`;

        const catEl = document.getElementById("current-category");
        if (catEl) catEl.textContent = site.categoryLabel;

        const badgeThen = document.getElementById("badge-then");
        if (badgeThen) badgeThen.textContent = `THEN (${site.thenYear})`;

        const badgeNow = document.getElementById("badge-now");
        if (badgeNow) badgeNow.textContent = `NOW (${site.nowYear})`;

        const graphicThen = document.getElementById("graphic-then");
        if (graphicThen) graphicThen.style.cssText = site.thenGraphicStyle;

        const graphicNow = document.getElementById("graphic-now");
        if (graphicNow) graphicNow.style.cssText = site.nowGraphicStyle;

        const thenDesc = document.getElementById("then-description");
        if (thenDesc) thenDesc.textContent = site.thenDescription;

        const thenPeriod = document.getElementById("then-period");
        if (thenPeriod) thenPeriod.textContent = site.thenYear;

        const nowDesc = document.getElementById("now-description");
        if (nowDesc) nowDesc.textContent = site.nowDescription;

        const nowStatus = document.getElementById("now-status");
        if (nowStatus) nowStatus.textContent = site.conservationStatus;

        document.querySelectorAll(".site-card").forEach(card => {
            card.classList.toggle("active", card.dataset.id === siteId);
        });
    }

    setSliderPosition(50);
}

/**
 * Filters the site cards grid by search query and category.
 */
function renderSitesGrid() {
    const grid = document.getElementById("sites-grid");
    if (!grid) return;

    const query = (document.getElementById("search-input")?.value || "").toLowerCase().trim();
    const category = document.getElementById("category-filter")?.value || "all";

    const filtered = heritageLocations.filter(site => {
        const matchesCategory = category === "all" || site.category === category;
        const matchesSearch = !query || 
            site.title.toLowerCase().includes(query) ||
            site.location.toLowerCase().includes(query) ||
            site.thenDescription.toLowerCase().includes(query) ||
            site.nowDescription.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = filtered.map(site => `
        <div class="site-card ${site.id === selectedSiteId ? 'active' : ''}" data-id="${site.id}" tabindex="0" role="button" aria-label="Select ${site.title}">
            <span class="card-category">${site.categoryLabel}</span>
            <h4>${site.title}</h4>
            <p>${site.location}</p>
        </div>
    `).join('');

    // Attach click and keypress handlers
    grid.querySelectorAll(".site-card").forEach(card => {
        const id = card.dataset.id;
        card.addEventListener("click", () => selectSite(id));
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectSite(id);
            }
        });
    });
}

/**
 * Initializes slider drag and keyboard event handlers.
 */
function initSliderEvents() {
    const container = document.getElementById("comparison-slider");
    if (!container) return;

    let isDragging = false;

    const handleMove = (clientX) => {
        const rect = container.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const percentage = (offsetX / rect.width) * 100;
        setSliderPosition(percentage);
    };

    container.addEventListener("mousedown", (e) => {
        isDragging = true;
        handleMove(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
        if (isDragging) handleMove(e.clientX);
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Touch events for mobile responsiveness
    container.addEventListener("touchstart", (e) => {
        isDragging = true;
        if (e.touches.length > 0) handleMove(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (isDragging && e.touches.length > 0) handleMove(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });

    // Keyboard Accessibility controls (Arrow keys, Home, End)
    container.addEventListener("keydown", (e) => {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            setSliderPosition(sliderPosition - step);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            setSliderPosition(sliderPosition + step);
        } else if (e.key === "Home") {
            e.preventDefault();
            setSliderPosition(0);
        } else if (e.key === "End") {
            e.preventDefault();
            setSliderPosition(100);
        }
    });
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        initSliderEvents();
        renderSitesGrid();
        selectSite(heritageLocations[0].id);

        document.getElementById("search-input")?.addEventListener("input", renderSitesGrid);
        document.getElementById("category-filter")?.addEventListener("change", renderSitesGrid);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { heritageLocations, setSliderPosition, selectSite };
}
