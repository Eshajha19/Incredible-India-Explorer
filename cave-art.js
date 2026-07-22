// cave-art.js
// Interactive Indian Caves Art Explorer logic.
// Manages search queries, category tab clicks, and detail modal events.

(function () {
    "use strict";

    // -------------------------------------------------------------
    // 1. DATASET — Cave Artworks, Paintings & Sculptures
    // -------------------------------------------------------------
    const ARTWORKS_DATA = [
        {
            id: "padmapani-bodhisattva",
            title: "Padmapani Bodhisattva Mural",
            cave: "Ajanta Caves (Cave 1)",
            location: "Aurangabad district, Maharashtra",
            period: "Late 5th Century CE",
            patron: "Harishena (Vakataka Dynasty)",
            medium: "Fresco-secco (plaster with mineral pigments)",
            type: "painting",
            image: "assets/travel_hidden.png",
            desc: "One of the most famous masterpieces of Buddhist art. It depicts the Bodhisattva Padmapani holding a blue lotus (utpala) in his right hand. The painting features flowing contours, sophisticated three-dimensional shading (using dark pigments at borders), and a facial expression of serene compassion."
        },
        {
            id: "vajrapani-bodhisattva",
            title: "Vajrapani Bodhisattva Mural",
            cave: "Ajanta Caves (Cave 1)",
            location: "Aurangabad district, Maharashtra",
            period: "Late 5th Century CE",
            patron: "Harishena (Vakataka Dynasty)",
            medium: "Fresco-secco",
            type: "painting",
            image: "assets/travel_forests.png",
            desc: "Companion painting to Padmapani. It represents the protector Bodhisattva Vajrapani holding a thunderbolt (vajra) symbolizing spiritual power. He is depicted wearing a highly detailed, tall jewelled crown and heavy ornamental neckbands, showcasing the rich dress styles of the royal court of the Vakatakas."
        },
        {
            id: "ravana-shaking-kailasa",
            title: "Ravana Shaking Mount Kailasa",
            cave: "Ellora Caves (Cave 16 - Kailasa Temple)",
            location: "Verul, Maharashtra",
            period: "8th Century CE",
            patron: "Krishna I (Rashtrakuta Dynasty)",
            medium: "Monolithic basalt stone carving",
            type: "sculpture",
            image: "assets/travel_mountains.png",
            desc: "A dramatic double-story relief panel carved into the base of the massive monolithic Kailasa Temple. It depicts the multi-armed demon king Ravana trapped beneath Mount Kailasa trying to shake it, while Lord Shiva remains calm, stabilizing the mountain with his toe as Parvati clings to him in fear."
        },
        {
            id: "trimurti-sadashiva",
            title: "Trimurti Colossal Sculpture",
            cave: "Elephanta Caves (Cave 1)",
            location: "Elephanta Island, Mumbai, Maharashtra",
            period: "c. 5th - 6th Century CE",
            patron: "Konkan Mauryas / Kalachuri Dynasty",
            medium: "Basalt rock-cut relief",
            type: "sculpture",
            image: "assets/travel_islands.png",
            desc: "A majestic 20-foot high relief sculpture carved on the back wall of the main cave cave hall. It represents the three aspects of Shiva (Sadashiva): the central peaceful face represents the preserver (Tatpurusha), the gentle right face (Uma/Vamadeva) represents the creator, and the fierce left face (Aghora) represents the destroyer."
        },
        {
            id: "varaha-rescue-relief",
            title: "Varaha Avatar Rescue Relief",
            cave: "Udayagiri Caves (Cave 5)",
            location: "Vidisha, Madhya Pradesh",
            period: "Early 5th Century CE",
            patron: "Gupta Empire (patronized by local chiefs)",
            medium: "Sandstone rock carving",
            type: "sculpture",
            image: "assets/travel_deserts.png",
            desc: "A massive, beautifully preserved rock-cut panel showing Lord Vishnu's Varaha (boar) incarnation lifting the Earth goddess Bhudevi from the depths of the cosmic ocean. It symbolizes the restoration of peace and order, reflecting the political strength and religious synthesis of the early Gupta period."
        },
        {
            id: "bhimbetka-zoo-rock",
            title: "Prehistoric Zoo Rock Painting",
            cave: "Bhimbetka Rock Shelters",
            location: "Raisen district, Madhya Pradesh",
            period: "Mesolithic Era (c. 10,000 BCE)",
            patron: "Prehistoric hunter-gatherer clans",
            medium: "Hematite, manganese and vegetable colors on stone",
            type: "painting",
            image: "assets/travel_hidden.png",
            desc: "A famous prehistoric rock shelter wall painted over thousands of years. It displays dozens of stick-figure hunters, dancing tribesmen, and detailed animal sketches including wild bisons, elephants, deer, and giant boars. It provides valuable insight into prehistoric human life and animal density in central India."
        },
        {
            id: "dancing-shiva-tandava",
            title: "18-Armed Dancing Shiva Relief",
            cave: "Badami Caves (Cave 1)",
            location: "Badami, Karnataka",
            period: "Late 6th Century CE",
            patron: "Early Chalukya Dynasty",
            medium: "Red sandstone rock carving",
            type: "sculpture",
            image: "assets/travel_mountains.png",
            desc: "A magnificent high-relief carving located at the entrance of Cave 1. It shows Lord Shiva performing the cosmic Tandava dance with 18 arms, each holding attributes or forming dance mudras (positions). If we track the hands sequentially, they trace the geometric pathways of classical Bharatanatyam movements."
        },
        {
            id: "sittanavasal-lotus-pond",
            title: "Sittanavasal Lotus Pond Ceiling",
            cave: "Sittanavasal Cave (Arivar Koil)",
            location: "Pudukkottai district, Tamil Nadu",
            period: "7th - 9th Century CE",
            patron: "Pandya Dynasty",
            medium: "Fresco-limon (lime plaster painting)",
            type: "painting",
            image: "assets/travel_hidden.png",
            desc: "Exquisite ceiling murals depicting the Jain Samavasarana (heavenly assembly) scene, illustrated as a lush lotus pond. It contains highly detailed drawings of lotuses, swimming ducks, fishes, frolicking elephants, bulls, and Jain monks gathering flowers. It shows close similarities to Ajanta fresco methods."
        }
    ];

    // -------------------------------------------------------------
    // 2. State management
    // -------------------------------------------------------------
    let searchQuery = "";
    let activeCategory = "all";
    let searchDebounceTimer = null;

    // -------------------------------------------------------------
    // 3. Grid Rendering
    // -------------------------------------------------------------
    function renderGrid() {
        const grid = document.getElementById("artwork-grid");
        const resultsText = document.getElementById("results-count");
        const resetBtn = document.getElementById("btn-reset-filters");
        const emptyState = document.getElementById("empty-state");
        if (!grid) return;

        // Apply filters
        const filtered = ARTWORKS_DATA.filter(art => {
            const matchesCategory = (activeCategory === "all" || art.type === activeCategory);
            
            const q = searchQuery.toLowerCase();
            const matchesSearch = (!q || 
                art.title.toLowerCase().includes(q) || 
                art.cave.toLowerCase().includes(q) || 
                art.location.toLowerCase().includes(q) ||
                art.medium.toLowerCase().includes(q) ||
                art.patron.toLowerCase().includes(q)
            );
            
            return matchesCategory && matchesSearch;
        });

        // Clear previous grid items
        grid.innerHTML = "";

        // Update counts
        const countBadge = document.getElementById("artworks-count");
        if (countBadge) countBadge.innerText = filtered.length;

        // Handle empty states
        if (filtered.length === 0) {
            if (emptyState) emptyState.classList.remove("hidden");
            if (resultsText) resultsText.innerText = "No artworks found";
            if (resetBtn) resetBtn.classList.remove("hidden");
            return;
        }

        if (emptyState) emptyState.classList.add("hidden");
        if (resultsText) {
            resultsText.innerText = `Showing ${filtered.length} of ${ARTWORKS_DATA.length} masterpieces`;
        }

        if (resetBtn) {
            if (activeCategory !== "all" || searchQuery !== "") {
                resetBtn.classList.remove("hidden");
            } else {
                resetBtn.classList.add("hidden");
            }
        }

        // Generate card nodes
        filtered.forEach(art => {
            const card = document.createElement("div");
            card.className = "artwork-card";
            card.dataset.id = art.id;
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `${art.title}, inside ${art.cave}`);

            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${art.image}" alt="${art.title}">
                    <span class="card-category-tag">${art.type}</span>
                </div>
                <div class="card-info">
                    <h3>${art.title}</h3>
                    <span class="card-cave-title">🪨 ${art.cave}</span>
                    <p class="card-desc">${art.desc}</p>
                    <div class="card-meta-bar">
                        <span>📅 ${art.period}</span>
                        <span>📍 ${art.location.split(",")[0]}</span>
                    </div>
                </div>
            `;

            // Bind click and keypress to open lightbox
            const openModalAction = () => openLightbox(art.id);
            card.addEventListener("click", openModalAction);
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModalAction();
                }
            });

            grid.appendChild(card);
        });
    }

    // -------------------------------------------------------------
    // 4. Modal Lightbox Controllers
    // -------------------------------------------------------------
    function openLightbox(artId) {
        const modal = document.getElementById("art-modal");
        const art = ARTWORKS_DATA.find(a => a.id === artId);
        if (!modal || !art) return;

        // Set content details
        document.getElementById("modal-image").src = art.image;
        document.getElementById("modal-image").alt = art.title;
        document.getElementById("modal-title").innerText = art.title;
        document.getElementById("modal-art-type").innerText = art.type;
        document.getElementById("modal-location").innerText = art.cave + ", " + art.location;
        document.getElementById("modal-period").innerText = art.period;
        document.getElementById("modal-patron").innerText = art.patron;
        document.getElementById("modal-medium").innerText = art.medium;
        document.getElementById("modal-desc").innerText = art.desc;

        // Display modal
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // Prevent body scrolling
        
        // Trap focus to close button
        const closeBtn = document.getElementById("modal-close");
        if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
        const modal = document.getElementById("art-modal");
        if (!modal) return;

        modal.classList.add("hidden");
        document.body.style.overflow = ""; // Restore body scrolling
    }

    // -------------------------------------------------------------
    // 5. Initializer & Global Event Bindings
    // -------------------------------------------------------------
    function initExplorer() {
        renderGrid();

        // Search inputs
        const searchInput = document.getElementById("art-search");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
                searchDebounceTimer = setTimeout(() => {
                    searchQuery = e.target.value;
                    renderGrid();
                }, 250);
            });
        }

        // Category Tab Switches
        const tabs = document.querySelectorAll(".filter-tab");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                activeCategory = tab.dataset.category;
                renderGrid();
            });
        });

        // Reset Filter buttons
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

        // Lightbox Modal Close bindings
        const closeBtn = document.getElementById("modal-close");
        if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) modalBackdrop.addEventListener("click", closeLightbox);

        // Keyboard navigation (ESC key to close modal)
        const keydownHandler = (e) => {
            if (e.key === "Escape") {
                closeLightbox();
            }
        };
        document.addEventListener("keydown", keydownHandler);

        // Check for deep link search params
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get("search");
        if (searchParam) {
            setTimeout(() => {
                searchQuery = searchParam;
                if (searchInput) searchInput.value = searchParam;
                renderGrid();
            }, 300);
        }

        // Register event cleanups on route transitions (for SPA environment)
        if (window.appLifecycle && typeof window.appLifecycle.registerCleanup === "function") {
            window.appLifecycle.registerCleanup(() => {
                document.removeEventListener("keydown", keydownHandler);
                searchQuery = "";
                activeCategory = "all";
                if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
                document.body.style.overflow = "";
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
