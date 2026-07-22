document.addEventListener("app:route-changed", () => {
    const assets = [
        "assets/travel_hidden.png",
        "assets/travel_mountains.png",
        "assets/travel_forests.png",
        "assets/travel_deserts.png",
        "assets/travel_islands.png",
        "assets/travel_beaches.png",
        "assets/hero_banner.png",
    ];

    /*
     * Site format:
     *
     * [
     *   name,
     *   state,
     *   region,
     *   inscriptionYear,
     *   category,
     *   significance
     * ]
     */

    const rawSites = [
        // ============================================================
        // CULTURAL SITES
        // ============================================================

        [
            "Agra Fort",
            "Uttar Pradesh",
            "north",
            1983,
            "cultural",
            "Mughal imperial fortress and palace complex overlooking the Yamuna River.",
        ],
        [
            "Ajanta Caves",
            "Maharashtra",
            "west",
            1983,
            "cultural",
            "Buddhist rock-cut monasteries and prayer halls celebrated for murals and sculpture.",
        ],
        [
            "Archaeological Site of Nalanda Mahavihara",
            "Bihar",
            "east",
            2016,
            "cultural",
            "Ruins of a major ancient monastic and scholastic institution.",
        ],
        [
            "Buddhist Monuments at Sanchi",
            "Madhya Pradesh",
            "central",
            1989,
            "cultural",
            "Stupas, temples, monasteries, and pillars representing Buddhist artistic development.",
        ],
        [
            "Champaner-Pavagadh Archaeological Park",
            "Gujarat",
            "west",
            2004,
            "cultural",
            "A layered archaeological landscape combining fortifications, sacred sites, and urban remains.",
        ],
        [
            "Chhatrapati Shivaji Terminus",
            "Maharashtra",
            "west",
            2004,
            "cultural",
            "A landmark railway terminus blending Victorian Gothic Revival and Indian architectural traditions.",
        ],
        [
            "Churches and Convents of Goa",
            "Goa",
            "west",
            1986,
            "cultural",
            "Major churches and convents reflecting the historic spread of Christianity in Asia.",
        ],
        [
            "Dholavira: a Harappan City",
            "Gujarat",
            "west",
            2021,
            "cultural",
            "A major Indus Civilization urban settlement with sophisticated planning and water management.",
        ],
        [
            "Elephanta Caves",
            "Maharashtra",
            "west",
            1987,
            "cultural",
            "An island cave complex famed for monumental Shaiva sculpture.",
        ],
        [
            "Ellora Caves",
            "Maharashtra",
            "west",
            1983,
            "cultural",
            "A multi-faith rock-cut complex of Buddhist, Hindu, and Jain monuments.",
        ],
        [
            "Fatehpur Sikri",
            "Uttar Pradesh",
            "north",
            1986,
            "cultural",
            "A Mughal imperial city known for palaces, courtyards, and monumental gateways.",
        ],
        [
            "Great Living Chola Temples",
            "Tamil Nadu",
            "south",
            1987,
            "cultural",
            "Monumental Chola-era temples representing exceptional Dravidian architecture and sculpture.",
        ],
        [
            "Group of Monuments at Hampi",
            "Karnataka",
            "south",
            1986,
            "cultural",
            "The monumental urban and sacred remains of the Vijayanagara capital.",
        ],
        [
            "Group of Monuments at Mahabalipuram",
            "Tamil Nadu",
            "south",
            1984,
            "cultural",
            "Pallava-era rock-cut sanctuaries, monolithic rathas, reliefs, and structural temples.",
        ],
        [
            "Group of Monuments at Pattadakal",
            "Karnataka",
            "south",
            1987,
            "cultural",
            "A Chalukyan temple ensemble illustrating northern and southern Indian architectural forms.",
        ],
        [
            "Hill Forts of Rajasthan",
            "Rajasthan",
            "north",
            2013,
            "cultural",
            "A serial group of Rajput forts demonstrating defensive planning and courtly landscapes.",
        ],
        [
            "Historic City of Ahmadabad",
            "Gujarat",
            "west",
            2017,
            "cultural",
            "A historic walled city with dense neighbourhoods, religious buildings, and mercantile heritage.",
        ],
        [
            "Humayun's Tomb, Delhi",
            "Delhi",
            "north",
            1993,
            "cultural",
            "A major garden-tomb that influenced later Mughal architecture.",
        ],
        [
            "Jaipur City, Rajasthan",
            "Rajasthan",
            "north",
            2019,
            "cultural",
            "A planned historic city shaped by trade, crafts, astronomy, and urban design.",
        ],
        [
            "Kakatiya Rudreshwara (Ramappa) Temple",
            "Telangana",
            "south",
            2021,
            "cultural",
            "A refined Kakatiya temple noted for sculptural detail and innovative construction techniques.",
        ],
        [
            "Khajuraho Group of Monuments",
            "Madhya Pradesh",
            "central",
            1986,
            "cultural",
            "A renowned group of Chandella temples celebrated for architecture and sculpture.",
        ],
        [
            "Mahabodhi Temple Complex at Bodh Gaya",
            "Bihar",
            "east",
            2002,
            "cultural",
            "A sacred Buddhist site associated with the Buddha's enlightenment.",
        ],
        [
            "Maratha Military Landscapes of India",
            "Maharashtra & Tamil Nadu",
            "west",
            2025,
            "cultural",
            "A serial landscape of forts expressing Maratha military strategy across varied terrain.",
        ],
        [
            "Moidams – the Mound-Burial System of the Ahom Dynasty",
            "Assam",
            "northeast",
            2024,
            "cultural",
            "Royal burial mounds reflecting the funerary traditions of the Tai-Ahom dynasty.",
        ],
        [
            "Mountain Railways of India",
            "Multiple States",
            "north",
            1999,
            "cultural",
            "Historic mountain railway systems demonstrating engineering responses to difficult terrain.",
        ],
        [
            "Qutb Minar and its Monuments, Delhi",
            "Delhi",
            "north",
            1993,
            "cultural",
            "An early Indo-Islamic monumental complex centred on the soaring Qutb Minar.",
        ],
        [
            "Rani-ki-Vav (the Queen's Stepwell) at Patan",
            "Gujarat",
            "west",
            2014,
            "cultural",
            "An elaborately sculpted stepwell designed as an inverted temple.",
        ],
        [
            "Red Fort Complex",
            "Delhi",
            "north",
            2007,
            "cultural",
            "A Mughal palace-fort complex that became a lasting symbol of Indian history.",
        ],
        [
            "Rock Shelters of Bhimbetka",
            "Madhya Pradesh",
            "central",
            2003,
            "cultural",
            "Rock shelters preserving long sequences of human occupation and prehistoric paintings.",
        ],
        [
            "Sacred Ensembles of the Hoysalas",
            "Karnataka",
            "south",
            2023,
            "cultural",
            "Temple ensembles distinguished by intricate sculpture and Hoysala architectural design.",
        ],
        [
            "Santiniketan",
            "West Bengal",
            "east",
            2023,
            "cultural",
            "An educational and cultural landscape shaped by Rabindranath Tagore's vision.",
        ],
        [
            "Sun Temple, Konark",
            "Odisha",
            "east",
            1984,
            "cultural",
            "A monumental temple conceived as the celestial chariot of the sun god.",
        ],
        [
            "Taj Mahal",
            "Uttar Pradesh",
            "north",
            1983,
            "cultural",
            "The celebrated Mughal mausoleum renowned for symmetry, craftsmanship, and garden design.",
        ],
        [
            "The Architectural Work of Le Corbusier",
            "Chandigarh",
            "north",
            2016,
            "cultural",
            "India's component of a transnational serial property representing modernist architecture.",
        ],
        [
            "The Jantar Mantar, Jaipur",
            "Rajasthan",
            "north",
            2010,
            "cultural",
            "A monumental astronomical observatory with large masonry instruments.",
        ],
        [
            "Victorian Gothic and Art Deco Ensembles of Mumbai",
            "Maharashtra",
            "west",
            2018,
            "cultural",
            "Urban ensembles representing two influential architectural phases in Mumbai.",
        ],

        // ============================================================
        // NATURAL SITES
        // ============================================================

        [
            "Great Himalayan National Park Conservation Area",
            "Himachal Pradesh",
            "north",
            2014,
            "natural",
            "A high-altitude Himalayan ecosystem with exceptional biodiversity and ecological range.",
        ],
        [
            "Kaziranga National Park",
            "Assam",
            "northeast",
            1985,
            "natural",
            "A floodplain ecosystem famed for the greater one-horned rhinoceros and rich wildlife.",
        ],
        [
            "Keoladeo National Park",
            "Rajasthan",
            "north",
            1985,
            "natural",
            "A managed wetland of global importance for resident and migratory waterbirds.",
        ],
        [
            "Manas Wildlife Sanctuary",
            "Assam",
            "northeast",
            1985,
            "natural",
            "A biodiversity-rich sanctuary spanning grasslands, forests, and riverine habitats.",
        ],
        [
            "Nanda Devi and Valley of Flowers National Parks",
            "Uttarakhand",
            "north",
            1988,
            "natural",
            "High Himalayan landscapes of dramatic peaks, alpine meadows, and exceptional flora.",
        ],
        [
            "Sundarbans National Park",
            "West Bengal",
            "east",
            1987,
            "natural",
            "A vast mangrove ecosystem shaped by tidal waterways and deltaic processes.",
        ],
        [
            "Western Ghats",
            "Multiple States",
            "south",
            2012,
            "natural",
            "A global biodiversity hotspot with exceptional endemism across mountain ecosystems.",
        ],

        // ============================================================
        // MIXED SITE
        // ============================================================

        [
            "Khangchendzonga National Park",
            "Sikkim",
            "northeast",
            2016,
            "mixed",
            "A mountain landscape combining outstanding biodiversity with profound sacred and cultural associations.",
        ],
    ];

    /*
     * Convert the compact site arrays into site objects.
     */

    const sites = rawSites.map((site, index) => {
        const [
            name,
            state,
            region,
            year,
            category,
            significance,
        ] = site;

        const imageIndex = index % assets.length;

        return {
            id: createSlug(name),
            name,
            state,
            region,
            year,
            category,
            significance,

            image: assets[imageIndex],

            gallery: [
                assets[imageIndex],
                assets[(imageIndex + 2) % assets.length],
                assets[(imageIndex + 4) % assets.length],
            ],

            search: [
                name,
                state,
                region,
                category,
                year,
            ]
                .join(" ")
                .toLowerCase(),
        };
    });

    const fallbackImage = "assets/hero_banner.png";

    // ============================================================
    // DOM ELEMENTS
    // ============================================================

    const grid = document.getElementById("site-grid");

    const searchInput =
        document.getElementById("site-search");

    const categoryFilter =
        document.getElementById("category-filter");

    const regionFilter =
        document.getElementById("region-filter");

    const resultStatus =
        document.getElementById("result-status");

    const emptyState =
        document.getElementById("empty-state");

    const clearFilters =
        document.getElementById("clear-filters");

    const resetEmpty =
        document.getElementById("reset-empty");

    // Gallery elements

    const modal =
        document.getElementById("gallery-modal");

    const galleryImage =
        document.getElementById("gallery-image");

    const galleryTitle =
        document.getElementById("gallery-title");

    const galleryMeta =
        document.getElementById("gallery-meta");

    const galleryCaption =
        document.getElementById("gallery-caption");

    const galleryCounter =
        document.getElementById("gallery-counter");

    const galleryClose =
        document.getElementById("gallery-close");

    const galleryPrev =
        document.getElementById("gallery-prev");

    const galleryNext =
        document.getElementById("gallery-next");

    // ============================================================
    // GALLERY STATE
    // ============================================================

    let activeSite = null;
    let activeIndex = 0;
    let lastFocus = null;

    // ============================================================
    // HELPERS
    // ============================================================

    function createSlug(value) {
        return value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    // ============================================================
    // CARD CREATION
    // ============================================================

    function createSiteCard(site) {
        const article = document.createElement("article");

        article.className = "site-card";
        article.dataset.id = site.id;

        article.innerHTML = `
            <div class="site-media">
                <img
                    src="${escapeHtml(site.image)}"
                    alt="${escapeHtml(site.name)}"
                    loading="lazy"
                >

                <div class="site-badges">
                    <span class="category-badge">
                        ${escapeHtml(capitalize(site.category))}
                    </span>

                    <span class="year-badge">
                        ${site.year}
                    </span>
                </div>

                <button
                    type="button"
                    class="gallery-btn"
                    data-gallery="${escapeHtml(site.id)}"
                    aria-label="Open gallery for ${escapeHtml(site.name)}"
                >
                    ◫ Gallery
                </button>

                <button
                    type="button"
                    class="journey-bookmark-btn"
                    data-bookmark-id="unesco-${escapeHtml(site.id)}"
                    aria-pressed="false"
                    aria-label="Save ${escapeHtml(site.name)} to My Journey"
                >
                    ♡
                </button>
            </div>

            <div class="site-body">
                <h3>
                    ${escapeHtml(site.name)}
                </h3>

                <p class="site-location">
                    ${escapeHtml(site.state)}
                </p>

                <div class="site-meta">
                    <span>
                        ${escapeHtml(capitalize(site.region))}
                    </span>

                    <span>
                        Inscribed ${site.year}
                    </span>
                </div>

                <p class="site-significance">
                    ${escapeHtml(site.significance)}
                </p>
            </div>
        `;

        const image = article.querySelector("img");

        image.addEventListener(
            "error",
            () => {
                image.src = fallbackImage;
            },
            {
                once: true,
            }
        );

        return article;
    }

    // ============================================================
    // INITIAL RENDER
    // ============================================================

    function renderSites() {
        const cards = sites.map((site) =>
            createSiteCard(site)
        );

        grid.replaceChildren(...cards);
        initJourneyIntegration();
    }

    // ============================================================
    // MY JOURNEY: bookmarks + cross-explorer search index
    // ============================================================

    function initJourneyIntegration() {
        if (!window.Journey) return;

        grid.querySelectorAll(".journey-bookmark-btn").forEach((btn) => {
            const id = btn.dataset.bookmarkId;
            const card = btn.closest(".site-card");
            const site = sites.find((s) => `unesco-${s.id}` === id);

            const setPressed = () => {
                const saved = window.Journey.isSaved(id);
                btn.classList.toggle("is-saved", saved);
                btn.setAttribute("aria-pressed", String(saved));
                btn.textContent = saved ? "♥" : "♡";
            };

            setPressed();

            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.Journey.toggle({
                    id,
                    explorerPage: "unesco.html",
                    title: site ? site.name : card?.querySelector("h3")?.textContent.trim(),
                    thumbnail: site ? site.image : "",
                    category: site ? site.category : "unesco"
                });
                setPressed();
            });
        });

        window.Journey.registerSearchItems(
            "unesco.html",
            sites.map((site) => ({
                id: `unesco-${site.id}`,
                title: site.name,
                description: site.significance || "",
                link: "unesco.html"
            }))
        );
    }

    // ============================================================
    // FILTERING
    // ============================================================

    function getVisibleSites() {
        const query =
            searchInput.value.trim().toLowerCase();

        const selectedCategory =
            categoryFilter.value;

        const selectedRegion =
            regionFilter.value;

        return sites.filter((site) => {
            const matchesSearch =
                !query ||
                site.search.includes(query);

            const matchesCategory =
                selectedCategory === "all" ||
                site.category === selectedCategory;

            const matchesRegion =
                selectedRegion === "all" ||
                site.region === selectedRegion;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesRegion
            );
        });
    }

    function filterSites() {
        const visibleSites = getVisibleSites();

        const visibleIds = new Set(
            visibleSites.map((site) => site.id)
        );

        document
            .querySelectorAll(".site-card")
            .forEach((element) => {
                element.hidden =
                    !visibleIds.has(element.dataset.id);
            });

        const hasActiveFilters =
            searchInput.value.trim() ||
            categoryFilter.value !== "all" ||
            regionFilter.value !== "all";

        resultStatus.textContent = hasActiveFilters
            ? `Found ${visibleSites.length} site${
                  visibleSites.length === 1 ? "" : "s"
              }`
            : `Showing all ${visibleSites.length} sites`;

        const noResults =
            visibleSites.length === 0;

        emptyState.classList.toggle(
            "visible",
            noResults
        );

        grid.hidden = noResults;
    }

    function resetFilters() {
        searchInput.value = "";
        categoryFilter.value = "all";
        regionFilter.value = "all";

        filterSites();

        searchInput.focus();
    }

    // ============================================================
    // GALLERY
    // ============================================================

    function updateGallery() {
        if (!activeSite) {
            return;
        }

        const images = activeSite.gallery;

        galleryImage.src =
            images[activeIndex];

        galleryImage.alt =
            `${activeSite.name} gallery image ${activeIndex + 1}`;

        galleryImage.onerror = () => {
            galleryImage.onerror = null;
            galleryImage.src = fallbackImage;
        };

        galleryTitle.textContent =
            activeSite.name;

        galleryMeta.textContent =
            `${activeSite.state} · ` +
            `${capitalize(activeSite.category)} · ` +
            `${activeSite.year}`;

        galleryCaption.textContent =
            activeSite.significance;

        galleryCounter.textContent =
            `${activeIndex + 1} / ${images.length}`;
    }

    function openGallery(site, trigger) {
        activeSite = site;
        activeIndex = 0;
        lastFocus = trigger;

        updateGallery();

        modal.hidden = false;

        document.body.classList.add(
            "gallery-open"
        );

        galleryClose.focus();
    }

    function closeGallery() {
        modal.hidden = true;

        document.body.classList.remove(
            "gallery-open"
        );

        activeSite = null;
        activeIndex = 0;

        if (lastFocus) {
            lastFocus.focus();
        }
    }

    function changeGalleryImage(direction) {
        if (!activeSite) {
            return;
        }

        const imageCount =
            activeSite.gallery.length;

        activeIndex =
            (
                activeIndex +
                direction +
                imageCount
            ) % imageCount;

        updateGallery();
    }

    // ============================================================
    // INITIALIZATION
    // ============================================================

    renderSites();
    filterSites();

    // ============================================================
    // FILTER EVENTS
    // ============================================================

    searchInput.addEventListener(
        "input",
        filterSites
    );

    categoryFilter.addEventListener(
        "change",
        filterSites
    );

    regionFilter.addEventListener(
        "change",
        filterSites
    );

    clearFilters.addEventListener(
        "click",
        resetFilters
    );

    resetEmpty.addEventListener(
        "click",
        resetFilters
    );

    // ============================================================
    // GALLERY EVENTS
    // ============================================================

    grid.addEventListener(
        "click",
        (event) => {
            const button = event.target.closest(
                "[data-gallery]"
            );

            if (!button) {
                return;
            }

            const selectedSite = sites.find(
                (site) =>
                    site.id === button.dataset.gallery
            );

            if (selectedSite) {
                openGallery(
                    selectedSite,
                    button
                );
            }
        }
    );

    galleryClose.addEventListener(
        "click",
        closeGallery
    );

    galleryPrev.addEventListener(
        "click",
        () => {
            changeGalleryImage(-1);
        }
    );

    galleryNext.addEventListener(
        "click",
        () => {
            changeGalleryImage(1);
        }
    );

    modal.addEventListener(
        "click",
        (event) => {
            if (
                event.target.matches(
                    "[data-close-gallery]"
                )
            ) {
                closeGallery();
            }
        }
    );

    // ============================================================
    // KEYBOARD ACCESSIBILITY
    // ============================================================

    document.addEventListener(
        "keydown",
        (event) => {
            if (modal.hidden) {
                return;
            }

            if (event.key === "Escape") {
                closeGallery();
            }

            if (event.key === "ArrowLeft") {
                changeGalleryImage(-1);
            }

            if (event.key === "ArrowRight") {
                changeGalleryImage(1);
            }
        }
    );
});