// scientific-institutions.js
// Logic for Indian Scientific Institutions Explorer.
// Coordinates search filters, sector tab selectors, and statistics.

(function () {
    "use strict";

    // -------------------------------------------------------------
    // 1. INSTITUTIONS DATASET
    // -------------------------------------------------------------
    const INSTITUTIONS_DATA = [
        {
            id: "iisc-bangalore",
            name: "Indian Institute of Science (IISc)",
            category: "academic",
            categoryLabel: "Academic & Research",
            established: 1909,
            location: "Bengaluru, Karnataka",
            emoji: "🏛️",
            desc: "India's premier public university for advanced scientific and technological research. Founded with pivotal support from industrialist Jamsetji Tata and the Maharaja of Mysore, it regularly ranks as India's top university for citation impact and fundamental science discoveries.",
            focus: "Advanced physics, aerospace engineering, material sciences, molecular biophysics."
        },
        {
            id: "isro",
            name: "Indian Space Research Organisation (ISRO)",
            category: "space",
            categoryLabel: "Space Research",
            established: 1969,
            location: "Bengaluru, Karnataka (HQ)",
            emoji: "🚀",
            desc: "The primary space agency of India. Operating a vast network of facilities nationwide, ISRO has successfully built low-cost launcher systems (PSLV, GSLV) and executed landmark planetary exploration missions to the Moon and Mars.",
            focus: "Satellite design, launch vehicles, Chandrayaan, Mangalyaan & Gaganyaan programs."
        },
        {
            id: "barc",
            name: "Bhabha Atomic Research Centre (BARC)",
            category: "defense",
            categoryLabel: "Defense Tech & Nuclear",
            established: 1954,
            location: "Trombay, Mumbai, Maharashtra",
            emoji: "⚛️",
            desc: "India's premier nuclear research facility, founded by Dr. Homi J. Bhabha. It handles all aspects of nuclear science, reactor engineering, and nuclear isotopes for medicine and agriculture.",
            focus: "Nuclear power reactors, fuel reprocessing, national security applications, radiological research."
        },
        {
            id: "drdo",
            name: "Defence Research & Development Organisation (DRDO)",
            category: "defense",
            categoryLabel: "Defense Tech",
            established: 1958,
            location: "New Delhi (HQ) / 50+ Labs nationwide",
            emoji: "🛡️",
            desc: "The military research and development wing of India. DRDO oversees the domestic design of advanced weapons systems, combat aircraft, radars, and naval technologies to establish defense self-reliance.",
            focus: "Agni/Prithvi ballistic missiles, Tejas Light Combat Aircraft, sonar systems, military communication."
        },
        {
            id: "csir",
            name: "Council of Scientific & Industrial Research (CSIR)",
            category: "industrial",
            categoryLabel: "CSIR & Industrial",
            established: 1942,
            location: "New Delhi (HQ) / 37 National Labs",
            emoji: "🔬",
            desc: "India's largest industrial research organization. CSIR research centers span oceanography, drug formulations, structural engineering, and chemicals, supporting domestic manufacturing and public health.",
            focus: "Generic pharmaceuticals, voter indelible ink, coal-to-liquid fuels, leather processing technology."
        },
        {
            id: "iit-bombay",
            name: "Indian Institute of Technology Bombay (IIT Bombay)",
            category: "academic",
            categoryLabel: "Academic & Research",
            established: 1958,
            location: "Mumbai, Maharashtra",
            emoji: "🎓",
            desc: "A globally renowned engineering university established with assistance from UNESCO and Soviet scientists. IIT Bombay is highly acclaimed for engineering education and houses India's leading campus-based startup incubation ecosystem.",
            focus: "Computer science, microelectronics, nanotechnology, entrepreneurship incubation."
        },
        {
            id: "tifr",
            name: "Tata Institute of Fundamental Research (TIFR)",
            category: "academic",
            categoryLabel: "Academic & Research",
            established: 1945,
            location: "Mumbai, Maharashtra",
            emoji: "🌌",
            desc: "A public research institution for basic sciences. Founded by Homi Bhabha with support from Sir Dorabji Tata Trust, it was the historic cradle of India's early atomic energy and cosmic ray research programs.",
            focus: "High-energy physics, pure mathematics, radio astronomy, molecular biology."
        },
        {
            id: "ncl-pune",
            name: "National Chemical Laboratory (CSIR-NCL)",
            category: "industrial",
            categoryLabel: "CSIR & Industrial",
            established: 1950,
            location: "Pune, Maharashtra",
            emoji: "🧪",
            desc: "A flagship laboratory of CSIR, famous for its chemistry and chemical engineering expertise. NCL's work has directly shaped India's massive agrochemical, pharmaceutical, and polymer industries.",
            focus: "Heterogeneous catalysis, green chemistry, bio-polymers, chemical plant engineering."
        },
        {
            id: "sdsc-shar",
            name: "Satish Dhawan Space Centre (SDSC SHAR)",
            category: "space",
            categoryLabel: "Space Research",
            established: 1971,
            location: "Sriharikota, Andhra Pradesh",
            emoji: "🌠",
            desc: "The primary spaceport of ISRO. SDSC handles all rocket launch operations, solid propellant processing, and spacecraft assembly for India's orbital programs.",
            focus: "Launchpad operations, rocket booster telemetry, orbital assembly facilities."
        },
        {
            id: "iit-madras",
            name: "Indian Institute of Technology Madras (IIT Madras)",
            category: "academic",
            categoryLabel: "Academic & Research",
            established: 1959,
            location: "Chennai, Tamil Nadu",
            emoji: "🎓",
            desc: "A leading engineering university consistently ranked #1 in India. IIT Madras is famous for deep-tech research and hosts India's first university-based research park supporting industrial collaborations.",
            focus: "Ocean engineering, semi-conductor chip design, electric vehicle platforms, AI research."
        }
    ];

    // -------------------------------------------------------------
    // 2. STATE VARIABLES
    // -------------------------------------------------------------
    let searchQuery = "";
    let activeCategory = "all";
    let searchDebounceTimer = null;

    // -------------------------------------------------------------
    // 3. RENDER FUNCTION
    // -------------------------------------------------------------
    function renderGrid() {
        const grid = document.getElementById("institutions-grid");
        const resultsText = document.getElementById("results-count");
        const resetBtn = document.getElementById("btn-reset-filters");
        const emptyState = document.getElementById("empty-state");
        if (!grid) return;

        // Apply filters
        const filtered = INSTITUTIONS_DATA.filter(inst => {
            const matchesCategory = (activeCategory === "all" || inst.category === activeCategory);
            
            const q = searchQuery.toLowerCase();
            const matchesSearch = (!q || 
                inst.name.toLowerCase().includes(q) || 
                inst.location.toLowerCase().includes(q) || 
                inst.desc.toLowerCase().includes(q) || 
                inst.focus.toLowerCase().includes(q)
            );
            
            return matchesCategory && matchesSearch;
        });

        // Clear grid contents
        grid.innerHTML = "";

        // Update counts in dashboard stats
        const countSpan = document.getElementById("stat-parks-count") || document.getElementById("stat-institutes-count");
        if (countSpan) countSpan.innerText = filtered.length;

        // Handle empty state
        if (filtered.length === 0) {
            if (emptyState) emptyState.classList.remove("hidden");
            if (resultsText) resultsText.innerText = "No institutions found";
            if (resetBtn) resetBtn.classList.remove("hidden");
            return;
        }

        if (emptyState) emptyState.classList.add("hidden");
        if (resultsText) {
            resultsText.innerText = `Showing ${filtered.length} of ${INSTITUTIONS_DATA.length} institutions`;
        }

        if (resetBtn) {
            if (activeCategory !== "all" || searchQuery !== "") {
                resetBtn.classList.remove("hidden");
            } else {
                resetBtn.classList.add("hidden");
            }
        }

        // Render card nodes
        filtered.forEach(inst => {
            const card = document.createElement("div");
            card.className = "institution-card";
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "article");
            card.setAttribute("aria-label", `${inst.name}, established in ${inst.established} at ${inst.location}`);

            card.innerHTML = `
                <div class="card-header-row">
                    <span class="card-icon" aria-hidden="true">${inst.emoji}</span>
                    <span class="card-category-tag tag-${inst.category}">${inst.categoryLabel}</span>
                </div>
                <h3>${inst.name}</h3>
                <div class="card-est-tag">📅 Established ${inst.established}</div>
                <div class="card-location">📍 ${inst.location}</div>
                <p class="card-desc">${inst.desc}</p>
                <div class="card-focus-block">
                    <h4>🔬 Core Focus & Tech</h4>
                    <p>${inst.focus}</p>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // 4. Initializer & Bindings
    // -------------------------------------------------------------
    function initExplorer() {
        renderGrid();

        // Bind search input with debouncing
        const searchInput = document.getElementById("inst-search");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
                searchDebounceTimer = setTimeout(() => {
                    searchQuery = e.target.value;
                    renderGrid();
                }, 250);
            });
        }

        // Bind category switcher tabs
        const tabs = document.querySelectorAll(".filter-tab");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                activeCategory = tab.dataset.category;
                renderGrid();
            });
        });

        // Reset functions
        const resetAction = () => {
            searchQuery = "";
            activeCategory = "all";
            if (searchInput) searchInput.value = "";
            tabs.forEach(t => {
                if (t.dataset.category === "all") t.classList.add("active");
                else t.classList.remove("active");
            });
            renderGrid();
        };

        const resetBtn = document.getElementById("btn-reset-filters");
        if (resetBtn) resetBtn.addEventListener("click", resetAction);

        const emptyResetBtn = document.getElementById("btn-empty-reset");
        if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAction);

        // Check for deep links in URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get("search");
        if (searchParam) {
            setTimeout(() => {
                searchQuery = searchParam;
                if (searchInput) searchInput.value = searchParam;
                renderGrid();
            }, 300);
        }

        // Hook up SPA Route change cleanups
        if (window.appLifecycle && typeof window.appLifecycle.registerCleanup === "function") {
            window.appLifecycle.registerCleanup(() => {
                searchQuery = "";
                activeCategory = "all";
                if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
            });
        }
    }

    // Standard DOM Load registration
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initExplorer);
    } else {
        initExplorer();
    }

})();
