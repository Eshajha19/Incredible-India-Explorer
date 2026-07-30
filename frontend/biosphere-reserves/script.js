/**
 * Biosphere Reserves Directory
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA (All 18 Biosphere Reserves)
       ================================================================ */

    const RESERVES = [
        {
            name: "Nilgiri Biosphere Reserve",
            state: "Tamil Nadu, Kerala, Karnataka",
            region: "south",
            year: 1986,
            unesco: true,
            area: "5,520 sq km",
            flora: ["Strobilanthes kunthiana", "Teak", "Sandalwood"],
            fauna: ["Nilgiri Tahr", "Lion-tailed Macaque"],
            description: "The first biosphere reserve in India. Located in the Western Ghats, it features high endemism and includes several national parks."
        },
        {
            name: "Nanda Devi National Park & Biosphere Reserve",
            state: "Uttarakhand",
            region: "north",
            year: 1988,
            unesco: true,
            area: "5,860 sq km",
            flora: ["Silver Weed", "Rhododendron", "Orchids"],
            fauna: ["Snow Leopard", "Himalayan Black Bear", "Musk Deer"],
            description: "Situated around the peak of Nanda Devi, it transitions from temperate forests to alpine meadows and is vital for high-altitude ecology."
        },
        {
            name: "Gulf of Mannar",
            state: "Tamil Nadu",
            region: "south",
            year: 1989,
            unesco: true,
            area: "10,500 sq km",
            flora: ["Seagrass", "Mangroves"],
            fauna: ["Dugong", "Sea Turtles", "Dolphins"],
            description: "A marine biosphere reserve comprising 21 islands with estuaries, beaches, and coral reefs, known for its rich marine biodiversity."
        },
        {
            name: "Nokrek",
            state: "Meghalaya",
            region: "east",
            year: 1988,
            unesco: true,
            area: "820 sq km",
            flora: ["Citrus indica", "Pitcher Plant", "Orchids"],
            fauna: ["Red Panda", "Hoolock Gibbon", "Asian Elephant"],
            description: "Located in the Garo Hills, it is a hotspot for endemic flora and the genetic mother of citrus fruits (memang narang)."
        },
        {
            name: "Sundarbans",
            state: "West Bengal",
            region: "east",
            year: 1989,
            unesco: true,
            area: "9,630 sq km",
            flora: ["Sundari Tree", "Mangroves"],
            fauna: ["Royal Bengal Tiger", "Estuarine Crocodile", "Gangetic Dolphin"],
            description: "The largest contiguous mangrove forest in the world, positioned in the delta of the Ganges, Brahmaputra, and Meghna rivers."
        },
        {
            name: "Manas",
            state: "Assam",
            region: "east",
            year: 1989,
            unesco: false,
            area: "2,837 sq km",
            flora: ["Semi-evergreen Forests", "Bhabar Tract Trees"],
            fauna: ["Pygmy Hog", "Golden Langur", "Assam Roofed Turtle"],
            description: "Located at the foothills of the Himalayas, this reserve is known for its rare and endangered endemic wildlife."
        },
        {
            name: "Simlipal",
            state: "Odisha",
            region: "east",
            year: 1994,
            unesco: true,
            area: "4,374 sq km",
            flora: ["Sal", "Orchids", "Eucalyptus"],
            fauna: ["Royal Bengal Tiger", "Asian Elephant", "Gaur"],
            description: "Derives its name from the abundance of semul (red silk cotton trees). Features high plateaus, peaks, and dense forests."
        },
        {
            name: "Dihang-Dibang",
            state: "Arunachal Pradesh",
            region: "east",
            year: 1998,
            unesco: false,
            area: "5,112 sq km",
            flora: ["Bamboo", "Temperate Broadleaf Forests"],
            fauna: ["Mishmi Takin", "Red Goral", "Musk Deer"],
            description: "Characterized by extremely rugged terrain and varying altitudes, creating distinct ecological zones from tropical to alpine."
        },
        {
            name: "Pachmarhi",
            state: "Madhya Pradesh",
            region: "west",
            year: 1999,
            unesco: true,
            area: "4,981 sq km",
            flora: ["Teak", "Sal", "Bamboo"],
            fauna: ["Giant Squirrel", "Flying Squirrel", "Tiger"],
            description: "Located in the Satpura Range. Often referred to as the 'Satpura ki Rani' (Queen of Satpura), serving as a crucial junction for north and south Indian species."
        },
        {
            name: "Achanakmar-Amarkantak",
            state: "Madhya Pradesh, Chhattisgarh",
            region: "west",
            year: 2005,
            unesco: true,
            area: "3,835 sq km",
            flora: ["Sal", "Bamboo", "Medicinal Plants"],
            fauna: ["Four-horned Antelope", "Indian Wild Dog", "Sarus Crane"],
            description: "A dramatically diverse topography bridging the Maikal hill range, giving birth to major rivers including the Narmada."
        },
        {
            name: "Great Rann of Kutch",
            state: "Gujarat",
            region: "west",
            year: 2008,
            unesco: false,
            area: "12,454 sq km",
            flora: ["Halophytes", "Scrub Forests"],
            fauna: ["Indian Wild Ass", "Flamingos", "Chinkara"],
            description: "The largest biosphere reserve in India. A unique seasonal salt marsh that hosts incredible avian migrations."
        },
        {
            name: "Cold Desert",
            state: "Himachal Pradesh",
            region: "north",
            year: 2009,
            unesco: false,
            area: "7,770 sq km",
            flora: ["Alpine Pastures", "Juniper", "Birch"],
            fauna: ["Snow Leopard", "Tibetan Wolf", "Himalayan Ibex"],
            description: "Encompasses Pin Valley National Park and surrounding areas, known for its extreme cold climate and specialized high-altitude ecology."
        },
        {
            name: "Khangchendzonga",
            state: "Sikkim",
            region: "east",
            year: 2000,
            unesco: true,
            area: "2,620 sq km",
            flora: ["Rhododendron", "Oak", "Fir"],
            fauna: ["Snow Leopard", "Red Panda", "Blood Pheasant"],
            description: "A mixed heritage site containing the world's third highest peak. Displays an exceptional altitudinal range of ecology."
        },
        {
            name: "Agasthyamalai",
            state: "Kerala, Tamil Nadu",
            region: "south",
            year: 2001,
            unesco: true,
            area: "3,500 sq km",
            flora: ["Arogyapacha", "Tropical Evergreen Forests"],
            fauna: ["Nilgiri Tahr", "Asian Elephant", "Tiger"],
            description: "A remarkably ancient ecosystem with highly localized plant endemism. Also home to the indigenous Kanikaran people."
        },
        {
            name: "Great Nicobar",
            state: "Andaman and Nicobar Islands",
            region: "islands",
            year: 1989,
            unesco: true,
            area: "885 sq km",
            flora: ["Tropical Rainforests", "Tree Ferns", "Orchids"],
            fauna: ["Nicobar Megapode", "Saltwater Crocodile", "Edible-nest Swiftlet"],
            description: "Covers a large portion of Great Nicobar Island, protecting endemic insular species and indigenous tribes."
        },
        {
            name: "Dibru-Saikhowa",
            state: "Assam",
            region: "east",
            year: 1997,
            unesco: false,
            area: "765 sq km",
            flora: ["Semi-evergreen Forests", "Deciduous Forests", "Swamp Forests"],
            fauna: ["Feral Horse", "White-winged Wood Duck", "Water Buffalo"],
            description: "Primarily a river island reserve bounded by the Brahmaputra, known for unique wetland and grassland ecology."
        },
        {
            name: "Seshachalam Hills",
            state: "Andhra Pradesh",
            region: "south",
            year: 2010,
            unesco: false,
            area: "4,755 sq km",
            flora: ["Red Sanders", "Sandalwood"],
            fauna: ["Slender Loris", "Golden Gecko", "Yellow-throated Bulbul"],
            description: "Part of the Eastern Ghats, this reserve is famous for the highly prized, endemic Red Sanders tree."
        },
        {
            name: "Panna",
            state: "Madhya Pradesh",
            region: "west",
            year: 2011,
            unesco: true,
            area: "2,998 sq km",
            flora: ["Teak", "Dry Deciduous Forests"],
            fauna: ["Tiger", "Leopard", "Sloth Bear", "Chinkara"],
            description: "Known for successful tiger reintroduction programs and its unique location at the convergence of three distinct bio-geographic zones."
        }
    ];

    /* ================================================================
       2. DOM ELEMENTS
       ================================================================ */

    const searchInput = document.getElementById('search-input');
    const filterUnesco = document.getElementById('filter-unesco');
    const filterRegion = document.getElementById('filter-region');
    const grid = document.getElementById('biosphere-grid');
    const emptyState = document.getElementById('empty-state');
    const btnClearFilters = document.getElementById('btn-clear-filters');
    const resultsCount = document.getElementById('results-count');

    /* ================================================================
       3. INIT & EVENT LISTENERS
       ================================================================ */

    document.addEventListener('DOMContentLoaded', () => {
        // Initial render
        renderCards(RESERVES);

        // Bind events
        searchInput.addEventListener('input', handleFilterChange);
        filterUnesco.addEventListener('change', handleFilterChange);
        filterRegion.addEventListener('change', handleFilterChange);
        btnClearFilters.addEventListener('click', clearFilters);
    });

    /* ================================================================
       4. FILTERING LOGIC
       ================================================================ */

    function handleFilterChange() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const unescoValue = filterUnesco.value;
        const regionValue = filterRegion.value;

        const filtered = RESERVES.filter(reserve => {
            // Text Match
            const matchesText = 
                reserve.name.toLowerCase().includes(searchTerm) || 
                reserve.state.toLowerCase().includes(searchTerm) ||
                reserve.flora.some(f => f.toLowerCase().includes(searchTerm)) ||
                reserve.fauna.some(f => f.toLowerCase().includes(searchTerm));

            // UNESCO Match
            let matchesUnesco = true;
            if (unescoValue === 'yes') matchesUnesco = reserve.unesco === true;
            if (unescoValue === 'no') matchesUnesco = reserve.unesco === false;

            // Region Match
            let matchesRegion = true;
            if (regionValue !== 'all') {
                matchesRegion = reserve.region === regionValue;
            }

            return matchesText && matchesUnesco && matchesRegion;
        });

        renderCards(filtered);
    }

    function clearFilters() {
        searchInput.value = '';
        filterUnesco.value = 'all';
        filterRegion.value = 'all';
        handleFilterChange();
    }

    /* ================================================================
       5. RENDERING LOGIC
       ================================================================ */

    function renderCards(data) {
        // Update results count
        if (data.length === 18) {
            resultsCount.textContent = 'Showing all 18 biosphere reserves.';
        } else {
            resultsCount.textContent = `Found ${data.length} biosphere reserve${data.length === 1 ? '' : 's'}.`;
        }

        // Handle empty state
        if (data.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        // Hide empty state and show grid
        emptyState.classList.add('hidden');

        // Clear existing grid
        grid.innerHTML = '';

        // Safely construct nodes to prevent XSS
        const fragment = document.createDocumentFragment();

        data.forEach(reserve => {
            const card = document.createElement('article');
            card.className = 'reserve-card';

            const unescoBadge = reserve.unesco 
                ? `<span class="badge badge-unesco">UNESCO Recognized</span>` 
                : `<span class="badge">National Only</span>`;

            card.innerHTML = `
                <div class="reserve-card-header">
                    <h3>${escapeHTML(reserve.name)}</h3>
                    ${unescoBadge}
                </div>
                <div class="reserve-meta">
                    <span title="Location">📍 ${escapeHTML(reserve.state)}</span>
                    <span title="Designation Year">📅 Est. ${reserve.year}</span>
                    <span title="Area">📏 ${escapeHTML(reserve.area)}</span>
                </div>
                <p class="reserve-desc">${escapeHTML(reserve.description)}</p>
                
                <div class="reserve-footer">
                    <div class="species-group">
                        <h4>Key Flora</h4>
                        <div class="species-list">
                            ${reserve.flora.map(f => `<span class="species-chip">${escapeHTML(f)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="species-group">
                        <h4>Key Fauna</h4>
                        <div class="species-list">
                            ${reserve.fauna.map(f => `<span class="species-chip">${escapeHTML(f)}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;

            fragment.appendChild(card);
        });

        grid.appendChild(fragment);
    }

    /* ================================================================
       6. UTILS
       ================================================================ */

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

})();
