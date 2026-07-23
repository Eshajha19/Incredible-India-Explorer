// national-parks-timeline.js
// Interactive chronological timeline of India's National Parks.
// Integrates with search, filter, and sorting actions.

(function () {
    "use strict";

    // -------------------------------------------------------------
    // 1. DATASET — Major Indian National Parks & Sanctuaries
    // -------------------------------------------------------------
    const PARKS_DATA = [
        {
            id: "jim-corbett",
            name: "Jim Corbett National Park",
            state: "Uttarakhand",
            established: 1936,
            area: "1,318 km²",
            fauna: ["Bengal Tiger", "Asian Elephant", "Leopard", "Chital"],
            desc: "India's oldest national park, originally established as Hailey National Park. It played a pioneering role in Project Tiger (launched here in 1973) and protects pristine sub-Himalayan belt biodiversity."
        },
        {
            id: "kanha",
            name: "Kanha National Park",
            state: "Madhya Pradesh",
            established: 1955,
            area: "940 km²",
            fauna: ["Bengal Tiger", "Barasingha", "Leopard", "Dhole"],
            desc: "Famous for saving the hard-ground swamp deer (Barasingha) from near-extinction. Its lush sal forests and open meadows inspired Rudyard Kipling's iconic 'The Jungle Book'."
        },
        {
            id: "tadoba",
            name: "Tadoba Andhari Tiger Reserve",
            state: "Maharashtra",
            established: 1955,
            area: "625 km²",
            fauna: ["Bengal Tiger", "Leopard", "Sloth Bear", "Gaur"],
            desc: "Maharashtra's oldest national park. It features dense teak and bamboo forests, and the central Tadoba Lake, which serves as a vital water source in dry summers."
        },
        {
            id: "madhav",
            name: "Madhav National Park",
            state: "Madhya Pradesh",
            established: 1958,
            area: "354 km²",
            fauna: ["Leopard", "Chinkara", "Nilgai", "Golden Jackal"],
            desc: "Located in the historical region of Shivpuri. Features dry deciduous forests and served as a royal hunting reserve for Maharaja of Gwalior and Mughal emperors."
        },
        {
            id: "gir",
            name: "Gir National Park",
            state: "Gujarat",
            established: 1965,
            area: "1,412 km²",
            fauna: ["Asiatic Lion", "Leopard", "Sambar", "Chowsingha"],
            desc: "The sole natural sanctuary in the world for the Asiatic Lion. A highly successful conservation model that brought the lion population back from under 20 individuals."
        },
        {
            id: "bandhavgarh",
            name: "Bandhavgarh National Park",
            state: "Madhya Pradesh",
            established: 1968,
            area: "1,536 km²",
            fauna: ["Bengal Tiger", "Leopard", "Gaur", "Sambar"],
            desc: "Known for the highest concentration of Royal Bengal Tigers in India. The park is named after an ancient fort perched on a 800-meter hill at its center."
        },
        {
            id: "bandipur",
            name: "Bandipur National Park",
            state: "Karnataka",
            established: 1974,
            area: "874 km²",
            fauna: ["Asian Elephant", "Bengal Tiger", "Gaur", "Chital"],
            desc: "Part of the Nilgiri Biosphere Reserve, this dry deciduous forest holds a significant population of endangered Asian Elephants and protects major migratory pathways."
        },
        {
            id: "kaziranga",
            name: "Kaziranga National Park",
            state: "Assam",
            established: 1974,
            area: "858 km²",
            fauna: ["One-Horned Rhinoceros", "Wild Water Buffalo", "Swamp Deer"],
            desc: "A UNESCO World Heritage Site hosting two-thirds of the world's Great Indian One-Horned Rhinoceroses. Also features dense tall elephant grasslands and wetlands."
        },
        {
            id: "bannerghatta",
            name: "Bannerghatta National Park",
            state: "Karnataka",
            established: 1974,
            area: "260 km²",
            fauna: ["Asian Elephant", "Bengal Tiger", "Leopard", "Sloth Bear"],
            desc: "Located near Bengaluru, it includes a national park, a zoo, a butterfly park, and a biological reserve that serves as an important elephant migration corridor."
        },
        {
            id: "pench",
            name: "Pench National Park",
            state: "Madhya Pradesh",
            established: 1975,
            area: "758 km²",
            fauna: ["Bengal Tiger", "Leopard", "Gaur", "Barking Deer"],
            desc: "Named after the pristine Pench River that flows through the park. Highly regarded for its rich bird population and open canopy teak forests."
        },
        {
            id: "guindy",
            name: "Guindy National Park",
            state: "Tamil Nadu",
            established: 1976,
            area: "2.7 km²",
            fauna: ["Blackbuck", "Chital", "Jackal", "Star Tortoise"],
            desc: "One of the few national parks situated directly inside a metropolitan city (Chennai). It serves as a vital green lung and maintains dry evergreen scrub forests."
        },
        {
            id: "eravikulam",
            name: "Eravikulam National Park",
            state: "Kerala",
            established: 1978,
            area: "97 km²",
            fauna: ["Nilgiri Tahr", "Golden Jackal", "Leopard", "Mongoose"],
            desc: "Located in Munnar's high elevation shola forests. It protects the largest remaining population of the Nilgiri Tahr, a mountain goat endemic to Western Ghats."
        },
        {
            id: "ranthambore",
            name: "Ranthambore National Park",
            state: "Rajasthan",
            established: 1980,
            area: "1,334 km²",
            fauna: ["Bengal Tiger", "Leopard", "Sloth Bear", "Chital"],
            desc: "Famous for its tigers, which are highly active in daylight. The landscape is dotted with historical ruins, including the dramatic Ranthambore Fort."
        },
        {
            id: "gulf-of-mannar",
            name: "Gulf of Mannar Marine National Park",
            state: "Tamil Nadu",
            established: 1980,
            area: "560 km²",
            fauna: ["Dugong", "Sea Turtle", "Dolphin", "Corals"],
            desc: "Comprises 21 small islands along the coast. It is a marine biosphere reserve protecting coral reefs, seagrass beds, and the highly endangered Dugong (sea cow)."
        },
        {
            id: "dachigam",
            name: "Dachigam National Park",
            state: "Jammu and Kashmir",
            established: 1981,
            area: "141 km²",
            fauna: ["Hangul", "Himalayan Black Bear", "Snow Leopard", "Serow"],
            desc: "Located near Srinagar, it is the last remaining home of the Hangul (Kashmir Stag), which is critically endangered. The terrain features coniferous forests."
        },
        {
            id: "hemis",
            name: "Hemis National Park",
            state: "Ladakh",
            established: 1981,
            area: "4,400 km²",
            fauna: ["Snow Leopard", "Argali", "Bharal", "Tibetan Wolf"],
            desc: "India's largest national park. It lies in the high-altitude trans-Himalayas and is globally renowned for having the highest density of Snow Leopards."
        },
        {
            id: "keoladeo",
            name: "Keoladeo National Park",
            state: "Rajasthan",
            established: 1982,
            area: "29 km²",
            fauna: ["Siberian Crane", "Painted Stork", "Sambar", "Python"],
            desc: "Formerly known as Bharatpur Bird Sanctuary, it is a man-made wetland hosting thousands of migratory waterfowl. Registered as a UNESCO World Heritage Site."
        },
        {
            id: "periyar",
            name: "Periyar National Park",
            state: "Kerala",
            established: 1982,
            area: "925 km²",
            fauna: ["Asian Elephant", "Bengal Tiger", "Nilgiri Langur", "Lion-Tailed Macaque"],
            desc: "Centered on an artificial lake in the Western Ghats. Highly famous for scenic boat-safari wildlife viewing and spice valley contours."
        },
        {
            id: "valley-of-flowers",
            name: "Valley of Flowers National Park",
            state: "Uttarakhand",
            established: 1982,
            area: "87 km²",
            fauna: ["Musk Deer", "Snow Leopard", "Himalayan Black Bear"],
            desc: "Nestled in West Himalayas, famous for meadows of endemic alpine flowers. Along with Nanda Devi, it forms a UNESCO World Heritage Site."
        },
        {
            id: "nanda-devi",
            name: "Nanda Devi National Park",
            state: "Uttarakhand",
            established: 1982,
            area: "630 km²",
            fauna: ["Snow Leopard", "Himalayan Tahr", "Bharal", "Musk Deer"],
            desc: "Surrounds the peak of Nanda Devi (India's second highest mountain). It is a glacial basin protected by steep mountain ridges, keeping it highly pristine."
        },
        {
            id: "silent-valley",
            name: "Silent Valley National Park",
            state: "Kerala",
            established: 1984,
            area: "237 km²",
            fauna: ["Lion-Tailed Macaque", "Nilgiri Wood Pigeon", "Tiger"],
            desc: "Contains some of the last undisturbed tropical evergreen rainforests in India. Famously saved in the 1970s from a hydroelectric project by public environment campaigns."
        },
        {
            id: "great-himalayan",
            name: "Great Himalayan National Park",
            state: "Himachal Pradesh",
            established: 1984,
            area: "1,171 km²",
            fauna: ["Western Tragopan", "Snow Leopard", "Himalayan Musk Deer"],
            desc: "A UNESCO World Heritage Site preserving high-altitude Himalayan oak and alpine forests. Features unique fauna like the Western Tragopan pheasant."
        },
        {
            id: "sundarbans",
            name: "Sundarbans National Park",
            state: "West Bengal",
            established: 1984,
            area: "1,330 km²",
            fauna: ["Bengal Tiger", "Estuarine Crocodile", "Olive Ridley Turtle"],
            desc: "The largest mangrove delta forest in the world, split with Bangladesh. The tigers here are famous for having adapted to swimming in saline river tides."
        },
        {
            id: "desert-national-park",
            name: "Desert National Park",
            state: "Rajasthan",
            established: 1992,
            area: "3,162 km²",
            fauna: ["Great Indian Bustard", "Desert Fox", "Chinkara", "Sandgrouse"],
            desc: "Showcases Thar desert ecosystems, featuring shifting sand dunes and scrub forest. It is one of the last strongholds of the critically endangered Great Indian Bustard."
        }
    ];

    // -------------------------------------------------------------
    // 2. State management
    // -------------------------------------------------------------
    let searchQuery = "";
    let activeState = "all";
    let sortAscending = true; // True = oldest first
    let searchDebounceTimer = null;

    // -------------------------------------------------------------
    // 3. Page Population & Filters
    // -------------------------------------------------------------
    function populateStateDropdown() {
        const select = document.getElementById("state-filter");
        if (!select) return;

        // Get unique states from data
        const states = [...new Set(PARKS_DATA.map(p => p.state))].sort();
        
        states.forEach(state => {
            const opt = document.createElement("option");
            opt.value = state;
            opt.innerText = state;
            select.appendChild(opt);
        });
    }

    function renderTimeline() {
        const container = document.getElementById("timeline-container");
        const resultsText = document.getElementById("results-count");
        const resetBtn = document.getElementById("btn-reset-filters");
        const emptyState = document.getElementById("empty-state");
        if (!container) return;

        // 1. Filter Data
        const filtered = PARKS_DATA.filter(park => {
            const matchesState = (activeState === "all" || park.state === activeState);
            
            const q = searchQuery.toLowerCase();
            const matchesSearch = (!q || 
                park.name.toLowerCase().includes(q) || 
                park.state.toLowerCase().includes(q) || 
                park.desc.toLowerCase().includes(q) ||
                park.fauna.some(f => f.toLowerCase().includes(q))
            );
            
            return matchesState && matchesSearch;
        });

        // 2. Sort Data
        filtered.sort((a, b) => {
            if (sortAscending) {
                return a.established - b.established;
            } else {
                return b.established - a.established;
            }
        });

        // 3. Clear container
        container.innerHTML = "";

        // Update counts
        const parkCountSpan = document.getElementById("stat-parks-count");
        if (parkCountSpan) parkCountSpan.innerText = filtered.length;

        // 4. Check if empty
        if (filtered.length === 0) {
            if (emptyState) emptyState.classList.remove("hidden");
            if (resultsText) resultsText.innerText = "No results found";
            if (resetBtn) resetBtn.classList.remove("hidden");
            return;
        }

        if (emptyState) emptyState.classList.add("hidden");
        if (resultsText) {
            resultsText.innerText = `Showing ${filtered.length} of ${PARKS_DATA.length} parks`;
        }

        // Show/hide reset button
        if (resetBtn) {
            if (activeState !== "all" || searchQuery !== "") {
                resetBtn.classList.remove("hidden");
            } else {
                resetBtn.classList.add("hidden");
            }
        }

        // 5. Render cards
        filtered.forEach(park => {
            const item = document.createElement("div");
            item.className = "timeline-item";

            const card = document.createElement("div");
            card.className = "timeline-card";
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "article");
            card.setAttribute("aria-label", `${park.name}, established ${park.established} in ${park.state}`);

            // Fauna badges
            const faunaBadges = park.fauna.map(f => `<span class="badge badge-fauna">${f}</span>`).join(" ");

            card.innerHTML = `
                <span class="card-year-badge">📅 Established ${park.established}</span>
                <h3>${park.name}</h3>
                <span class="card-state-tag">📍 ${park.state}</span>
                <p class="card-desc">${park.desc}</p>
                <div style="font-size: 0.85rem; margin-bottom: 8px;">📐 <strong>Area:</strong> ${park.area}</div>
                <div class="card-badges">
                    ${faunaBadges}
                </div>
            `;

            // Node marker on the line
            const marker = document.createElement("div");
            marker.className = "timeline-marker";

            item.appendChild(card);
            item.appendChild(marker);
            container.appendChild(item);
        });
    }

    // -------------------------------------------------------------
    // 4. Initializer & Bindings
    // -------------------------------------------------------------
    function initTimeline() {
        populateStateDropdown();
        
        // Update stats
        const statesCountSpan = document.getElementById("stat-states-count");
        if (statesCountSpan) {
            const uniqueStates = new Set(PARKS_DATA.map(p => p.state));
            statesCountSpan.innerText = uniqueStates.size;
        }

        renderTimeline();

        // Bind search input with debounce
        const searchInput = document.getElementById("park-search");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
                searchDebounceTimer = setTimeout(() => {
                    searchQuery = e.target.value;
                    renderTimeline();
                }, 250);
            });
        }

        // Bind state dropdown filter
        const stateSelect = document.getElementById("state-filter");
        if (stateSelect) {
            stateSelect.addEventListener("change", (e) => {
                activeState = e.target.value;
                renderTimeline();
            });
        }

        // Bind sort toggle
        const sortBtn = document.getElementById("sort-toggle");
        if (sortBtn) {
            sortBtn.addEventListener("click", () => {
                sortAscending = !sortAscending;
                if (sortAscending) {
                    sortBtn.innerText = "Oldest Established First";
                } else {
                    sortBtn.innerText = "Newest Established First";
                }
                renderTimeline();
            });
        }

        // Bind reset filters buttons
        const resetAction = () => {
            searchQuery = "";
            activeState = "all";
            
            if (searchInput) searchInput.value = "";
            if (stateSelect) stateSelect.value = "all";
            
            renderTimeline();
        };

        const resetBtn = document.getElementById("btn-reset-filters");
        if (resetBtn) resetBtn.addEventListener("click", resetAction);

        const emptyResetBtn = document.getElementById("btn-empty-reset");
        if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAction);

        // Check if there is deep link search param
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get("search");
        if (searchParam) {
            setTimeout(() => {
                searchQuery = searchParam;
                if (searchInput) searchInput.value = searchParam;
                renderTimeline();
            }, 300);
        }
    }

    // Standard DOM Load registration
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTimeline);
    } else {
        initTimeline();
    }

    // SPA Router Cleanup hook
    if (window.appLifecycle && typeof window.appLifecycle.registerCleanup === "function") {
        window.appLifecycle.registerCleanup(() => {
            searchQuery = "";
            activeState = "all";
            sortAscending = true;
            if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
        });
    }

})();
