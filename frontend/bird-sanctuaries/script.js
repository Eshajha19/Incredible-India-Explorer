/**
 * Bird Sanctuaries Guide Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA
       ================================================================ */

    const SANCTUARIES_DATA = [
        {
            id: "keoladeo",
            name: "Keoladeo National Park",
            state: "Rajasthan",
            location: "Bharatpur",
            habitat: "Man-made wetland, woodlands, and shallow lakes",
            season: "October to March",
            tags: ["ramsar", "migratory"],
            isRamsar: true,
            residentBirds: ["Painted Stork", "Sarus Crane", "Indian Darter", "Black-headed Ibis"],
            migratoryBirds: ["Siberian Crane (historical)", "Bar-headed Goose", "Northern Pintail", "Common Teal"],
            conservation: "UNESCO World Heritage Site and Ramsar Site. A major wintering area for palaearctic migratory waterfowl.",
            facts: "Formerly known as the Bharatpur Bird Sanctuary, this reserve was created 250 years ago and was a famous duck hunting reserve of the Maharajas.",
            image: "https://images.unsplash.com/photo-1613943315668-71e84ce1cc1c?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "chilika",
            name: "Chilika Bird Sanctuary",
            state: "Odisha",
            location: "Chilika Lake, Puri",
            habitat: "Brackish water lagoon with islands and mudflats",
            season: "November to February",
            tags: ["ramsar", "migratory"],
            isRamsar: true,
            residentBirds: ["White-bellied Sea Eagle", "Brahminy Kite", "Purple Moorhen"],
            migratoryBirds: ["Greater Flamingo", "Pelican", "Spoon-billed Sandpiper", "Gull-billed Tern"],
            conservation: "Ramsar Site. Largest wintering ground for migratory birds on the Indian sub-continent.",
            facts: "Chilika is the largest coastal lagoon in India and the second largest brackish water lagoon in the world.",
            image: "https://images.unsplash.com/photo-1549487739-44167e8fc9cc?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "ranganathittu",
            name: "Ranganathittu Bird Sanctuary",
            state: "Karnataka",
            location: "Mandya (near Srirangapatna)",
            habitat: "Riverine islands and broadleaf forests along the Kaveri River",
            season: "December to May",
            tags: ["ramsar"],
            isRamsar: true,
            residentBirds: ["Asian Openbill Stork", "Spot-billed Pelican", "Great Thick-knee", "River Tern"],
            migratoryBirds: ["Little Cormorant", "Eurasian Spoonbill"],
            conservation: "Declared a Ramsar Site in 2022. Critical breeding ground for pelicans and storks.",
            facts: "It is the largest bird sanctuary in Karnataka, encompassing six islets on the banks of the Kaveri river.",
            image: "https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "vedanthangal",
            name: "Vedanthangal Bird Sanctuary",
            state: "Tamil Nadu",
            location: "Chengalpattu",
            habitat: "Freshwater lakes interspersed with Barringtonia trees",
            season: "November to March",
            tags: ["ramsar", "migratory"],
            isRamsar: true,
            residentBirds: ["Grey Pelican", "Open-billed Stork", "Cormorant", "Egrets"],
            migratoryBirds: ["Garganey", "Blue-winged Teal", "Pintail", "Sandpiper"],
            conservation: "Ramsar Site. Highly protected area heavily supported by local communities.",
            facts: "Vedanthangal is one of the oldest water bird sanctuaries in the country, protected by local villagers for centuries.",
            image: "https://images.unsplash.com/photo-1605092676920-8ac5ae40c7c8?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "sultanpur",
            name: "Sultanpur National Park",
            state: "Haryana",
            location: "Gurugram",
            habitat: "Shallow freshwater lake surrounded by dry deciduous forest",
            season: "October to February",
            tags: ["ramsar", "migratory"],
            isRamsar: true,
            residentBirds: ["Indian Courser", "Sarus Crane", "Black-necked Stork", "Purple Sunbird"],
            migratoryBirds: ["Siberian Crane", "Greater Flamingo", "Ruff", "Northern Shoveler"],
            conservation: "Ramsar Site. A vital wintering habitat for birds arriving via the Central Asian Flyway.",
            facts: "The sanctuary is a popular weekend getaway for bird watchers from Delhi and the NCR region.",
            image: "https://images.unsplash.com/photo-1444464666168-49b62d88b089?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "nalsarovar",
            name: "Nal Sarovar Bird Sanctuary",
            state: "Gujarat",
            location: "Sanand, Ahmedabad",
            habitat: "Extensive shallow lake and marshes",
            season: "November to February",
            tags: ["ramsar", "migratory"],
            isRamsar: true,
            residentBirds: ["Indian Cormorant", "Bronze-winged Jacana", "Grey Heron"],
            migratoryBirds: ["Rosy Pelican", "Lesser Flamingo", "White Stork", "Brahminy Duck"],
            conservation: "Ramsar Site since 2012. It is the largest wetland bird sanctuary in Gujarat.",
            facts: "The lake covers an area of 120 sq km and attracts over 250 species of birds in the winter.",
            image: "https://images.unsplash.com/photo-1555580252-87c6b541604a?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "kumarakom",
            name: "Kumarakom Bird Sanctuary",
            state: "Kerala",
            location: "Vembanad Lake, Kottayam",
            habitat: "Mangroves, wetlands, and backwaters",
            season: "June to August (Resident), Nov to Feb (Migratory)",
            tags: ["migratory"],
            isRamsar: false,
            residentBirds: ["Waterfowl", "Cuckoo", "Owl", "Egret", "Heron", "Water Duck"],
            migratoryBirds: ["Siberian Stork", "Teal", "Wood Beetle"],
            conservation: "Located on the banks of Vembanad Lake, the longest lake in India.",
            facts: "The best way to watch birds here is from boats cruising the lake.",
            image: "https://images.unsplash.com/photo-1504826260979-242151cefd28?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "thattekad",
            name: "Thattekad Bird Sanctuary",
            state: "Kerala",
            location: "Kothamangalam, Ernakulam",
            habitat: "Evergreen and deciduous lowland forests",
            season: "October to March",
            tags: [],
            isRamsar: false,
            residentBirds: ["Ceylon Frogmouth", "Malabar Trogon", "Malabar Grey Hornbill"],
            migratoryBirds: ["Indian Pitta", "Orange-headed Thrush", "Large-billed Leaf Warbler"],
            conservation: "Described by Salim Ali as the richest bird habitat in peninsular India.",
            facts: "It is often referred to as the Salim Ali Bird Sanctuary, honoring the famous Indian ornithologist.",
            image: "https://images.unsplash.com/photo-1552554743-bf80db45d3bc?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "harike",
            name: "Harike Wetland",
            state: "Punjab",
            location: "Tarn Taran",
            habitat: "Man-made riverine wetland and reservoir",
            season: "November to March",
            tags: ["ramsar", "migratory"],
            isRamsar: true,
            residentBirds: ["Rufous-vented Prinia", "Jerdon's Babbler", "Black-crowned Night Heron"],
            migratoryBirds: ["Greylag Goose", "Bar-headed Goose", "Common Pochard", "Tufted Duck"],
            conservation: "Ramsar Site. The largest wetland in northern India, formed by the confluence of the Beas and Sutlej rivers.",
            facts: "Harike is a crucial staging and wintering area for migratory waterfowl in the flyway.",
            image: "https://images.unsplash.com/photo-1490718585640-571217e4663a?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "pulicat",
            name: "Pulicat Bird Sanctuary",
            state: "Andhra Pradesh / Tamil Nadu",
            location: "Nellore / Tiruvallur",
            habitat: "Brackish water lagoon and mudflats",
            season: "October to March",
            tags: ["migratory"],
            isRamsar: false,
            residentBirds: ["Painted Stork", "Grey Pelican", "Grey Heron"],
            migratoryBirds: ["Greater Flamingo", "Open-billed Stork", "Egrets", "Terns"],
            conservation: "The second largest brackish water ecosystem in India after Chilika Lake.",
            facts: "The sanctuary is famous for hosting thousands of Greater Flamingos during the winter season.",
            image: "https://images.unsplash.com/photo-1473215573456-78e8b248bd17?auto=format&fit=crop&q=80&w=800"
        }
    ];

    /* ================================================================
       2. DOM ELEMENTS
       ================================================================ */

    const gridContainer = document.getElementById('sanctuaries-grid');
    const searchInput = document.getElementById('bird-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResultsMsg = document.getElementById('no-results');

    const modal = document.getElementById('sanctuary-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.querySelector('.modal-close');

    /* ================================================================
       3. INIT & RENDER
       ================================================================ */

    document.addEventListener('DOMContentLoaded', () => {
        renderGrid(SANCTUARIES_DATA);
        setupSearch();
        setupFilters();
        setupModal();
    });

    function renderGrid(data) {
        gridContainer.innerHTML = '';
        
        if (data.length === 0) {
            noResultsMsg.removeAttribute('hidden');
            return;
        }

        noResultsMsg.setAttribute('hidden', '');

        data.forEach(item => {
            const card = document.createElement('article');
            card.className = 'sanctuary-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View details for ${escapeHTML(item.name)}`);
            card.dataset.id = item.id;

            let badgesHTML = '';
            if (item.isRamsar) {
                badgesHTML += `<span class="badge ramsar">Ramsar Site</span>`;
            }
            if (item.tags.includes('migratory')) {
                badgesHTML += `<span class="badge">Migratory Hub</span>`;
            }

            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.image}" alt="${escapeHTML(item.name)}" loading="lazy" />
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3>${escapeHTML(item.name)}</h3>
                        <div class="card-meta">
                            <span class="badge">📍 ${escapeHTML(item.state)}</span>
                            ${badgesHTML}
                        </div>
                    </div>
                    <p class="card-summary">${escapeHTML(item.habitat)}</p>
                    <span class="card-action">View Details &rarr;</span>
                </div>
            `;

            // Event Listeners for Modal
            card.addEventListener('click', () => openModal(item));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(item);
                }
            });

            gridContainer.appendChild(card);
        });
    }

    /* ================================================================
       4. SEARCH & FILTERING
       ================================================================ */

    let currentFilter = 'all';
    let searchQuery = '';

    function setupSearch() {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterData();
        });
    }

    function setupFilters() {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentFilter = btn.dataset.filter;
                filterData();
            });
        });
    }

    function filterData() {
        let filtered = SANCTUARIES_DATA;

        // Apply Tag Filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(item => item.tags.includes(currentFilter));
        }

        // Apply Search Filter
        if (searchQuery) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchQuery) ||
                item.state.toLowerCase().includes(searchQuery) ||
                item.residentBirds.some(b => b.toLowerCase().includes(searchQuery)) ||
                item.migratoryBirds.some(b => b.toLowerCase().includes(searchQuery))
            );
        }

        renderGrid(filtered);
    }

    /* ================================================================
       5. MODAL LOGIC
       ================================================================ */

    function setupModal() {
        const closeModal = () => {
            modal.setAttribute('hidden', '');
        };

        modalCloseBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
                closeModal();
            }
        });
    }

    function openModal(data) {
        let ramsarBadge = data.isRamsar ? `<span class="badge ramsar" style="margin-top:0.5rem; display:inline-block;">Ramsar Wetland of International Importance</span>` : '';

        modalBody.innerHTML = `
            <div class="modal-hero">
                <img src="${data.image}" alt="${escapeHTML(data.name)}" loading="lazy" />
                <div class="modal-hero-overlay">
                    <h2 id="modal-title">${escapeHTML(data.name)}</h2>
                    <span class="badge" style="color:#fff; border-color:rgba(255,255,255,0.3)">📍 ${escapeHTML(data.location)}, ${escapeHTML(data.state)}</span>
                    <br>
                    ${ramsarBadge}
                </div>
            </div>
            <div class="modal-info">
                
                <div class="modal-info-grid">
                    <div class="detail-section">
                        <h4>🌿 Habitat & Conservation</h4>
                        <p><strong>Habitat:</strong> ${escapeHTML(data.habitat)}</p>
                        <p><strong>Status:</strong> ${escapeHTML(data.conservation)}</p>
                        
                        <h4>✨ Interesting Facts</h4>
                        <p>${escapeHTML(data.facts)}</p>
                        
                        <h4>📅 Best Season</h4>
                        <p>${escapeHTML(data.season)}</p>
                    </div>

                    <div class="detail-section">
                        <h4>🦆 Migratory Species</h4>
                        <ul class="bird-list">
                            ${data.migratoryBirds.map(b => `<li>${escapeHTML(b)}</li>`).join('')}
                        </ul>

                        <h4>🦅 Resident Species</h4>
                        <ul class="bird-list">
                            ${data.residentBirds.map(b => `<li>${escapeHTML(b)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        modal.removeAttribute('hidden');
        modalCloseBtn.focus();
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
