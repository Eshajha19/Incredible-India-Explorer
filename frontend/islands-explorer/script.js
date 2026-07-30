/**
 * Islands of India Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA (Andaman & Nicobar and Lakshadweep)
       ================================================================ */

    const ISLANDS_DATA = {
        andaman: {
            title: "Andaman & Nicobar Islands",
            description: "Located at the juncture of the Bay of Bengal and the Andaman Sea, this archipelago is formed by the summits of a submarine mountain range. It is renowned for its tropical rainforests, endemic biodiversity, and indigenous tribes.",
            stats: [
                { icon: "📍", label: "Location", value: "Bay of Bengal" },
                { icon: "🏝️", label: "Islands", value: "572 (38 inhabited)" },
                { icon: "🏛️", label: "Capital", value: "Port Blair" },
                { icon: "📏", label: "Area", value: "8,249 sq km" }
            ],
            infoCards: [
                {
                    title: "Indigenous Tribes",
                    icon: "👥",
                    text: "Home to deeply reclusive indigenous tribes including the Sentinelese, Jarawa, Great Andamanese, Onge, and Shompen. The Sentinelese are one of the last uncontacted peoples on Earth."
                },
                {
                    title: "Marine Biodiversity",
                    icon: "🐠",
                    text: "The waters boast vibrant coral reefs, dugongs (sea cows), saltwater crocodiles, and several species of sea turtles that nest on the pristine beaches."
                },
                {
                    title: "Protected Areas",
                    icon: "🏞️",
                    text: "Houses 96 Wildlife Sanctuaries, 9 National Parks, and 1 Biosphere Reserve (Great Nicobar). Mahatma Gandhi Marine National Park is famous for its colorful coral reefs."
                }
            ],
            gallery: [
                { url: "https://images.unsplash.com/photo-1596541620005-4e36d4df6c5d?auto=format&fit=crop&q=80&w=600", alt: "Radhanagar Beach, Havelock Island", caption: "Pristine white sands of Radhanagar Beach" },
                { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600", alt: "Underwater Coral Reef", caption: "Vibrant coral reefs of the Andaman Sea" },
                { url: "https://images.unsplash.com/photo-1588628566587-bf1ee62f6b86?auto=format&fit=crop&q=80&w=600", alt: "Tropical Rainforest Andaman", caption: "Dense tropical rainforests meeting the ocean" }
            ]
        },
        lakshadweep: {
            title: "Lakshadweep Islands",
            description: "Lakshadweep, translating to 'A Hundred Thousand Islands' in Sanskrit and Malayalam, is India's smallest Union Territory. This spectacular coral archipelago lies in the Arabian Sea.",
            stats: [
                { icon: "📍", label: "Location", value: "Arabian Sea" },
                { icon: "🏝️", label: "Islands", value: "36 (10 inhabited)" },
                { icon: "🏛️", label: "Capital", value: "Kavaratti" },
                { icon: "📏", label: "Area", value: "32 sq km" }
            ],
            infoCards: [
                {
                    title: "Coral Atolls",
                    icon: "🪸",
                    text: "Comprises 12 atolls, 3 reefs, and 5 submerged banks. The islands are entirely built upon coral formations, resulting in spectacular shallow lagoons."
                },
                {
                    title: "Marine Life",
                    icon: "🐬",
                    text: "Rich in pelagic fishes, particularly tuna. The lagoons act as breeding grounds for sea turtles, manta rays, and a vast variety of colorful reef fish."
                },
                {
                    title: "Tourism & Ecology",
                    icon: "🛶",
                    text: "Tourism is strictly regulated to preserve the fragile coral ecosystem. Agatti and Bangaram are popular for scuba diving and snorkeling."
                }
            ],
            gallery: [
                { url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=600", alt: "Lakshadweep Atoll Aerial", caption: "Aerial view of a stunning coral atoll" },
                { url: "https://images.unsplash.com/photo-1518182170546-076616fd6738?auto=format&fit=crop&q=80&w=600", alt: "Sea Turtle Lakshadweep", caption: "Green sea turtle swimming in crystal clear lagoons" },
                { url: "https://images.unsplash.com/photo-1596772719602-0e9bd2dc7607?auto=format&fit=crop&q=80&w=600", alt: "Bangaram Island Beach", caption: "The serene shores of Bangaram Island" }
            ]
        }
    };

    /* ================================================================
       2. DOM ELEMENTS
       ================================================================ */

    const tabAndaman = document.getElementById('tab-andaman');
    const tabLakshadweep = document.getElementById('tab-lakshadweep');
    const panelAndaman = document.getElementById('panel-andaman');
    const panelLakshadweep = document.getElementById('panel-lakshadweep');

    /* ================================================================
       3. INIT
       ================================================================ */

    document.addEventListener('DOMContentLoaded', () => {
        // Render content for both panels
        renderPanelContent(panelAndaman, ISLANDS_DATA.andaman);
        renderPanelContent(panelLakshadweep, ISLANDS_DATA.lakshadweep);

        // Bind Tab Events
        tabAndaman.addEventListener('click', () => switchTab('andaman'));
        tabLakshadweep.addEventListener('click', () => switchTab('lakshadweep'));

        // Keyboard accessibility for tabs
        const handleKeydown = (e, targetId) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchTab(targetId);
            }
        };

        tabAndaman.addEventListener('keydown', (e) => handleKeydown(e, 'andaman'));
        tabLakshadweep.addEventListener('keydown', (e) => handleKeydown(e, 'lakshadweep'));
        
        // Append Lightbox to body
        createLightbox();
    });

    /* ================================================================
       4. TAB LOGIC
       ================================================================ */

    function switchTab(tabId) {
        if (tabId === 'andaman') {
            tabAndaman.classList.add('active');
            tabAndaman.setAttribute('aria-selected', 'true');
            tabLakshadweep.classList.remove('active');
            tabLakshadweep.setAttribute('aria-selected', 'false');

            panelAndaman.classList.add('active');
            panelAndaman.removeAttribute('hidden');
            panelLakshadweep.classList.remove('active');
            panelLakshadweep.setAttribute('hidden', '');
        } else {
            tabLakshadweep.classList.add('active');
            tabLakshadweep.setAttribute('aria-selected', 'true');
            tabAndaman.classList.remove('active');
            tabAndaman.setAttribute('aria-selected', 'false');

            panelLakshadweep.classList.add('active');
            panelLakshadweep.removeAttribute('hidden');
            panelAndaman.classList.remove('active');
            panelAndaman.setAttribute('hidden', '');
        }
    }

    /* ================================================================
       5. RENDERING LOGIC
       ================================================================ */

    function renderPanelContent(panelElement, data) {
        // Safe HTML construction
        const headerHTML = `
            <div class="island-header">
                <h2>${escapeHTML(data.title)}</h2>
                <p>${escapeHTML(data.description)}</p>
            </div>
        `;

        const statsHTML = `
            <div class="info-grid">
                ${data.stats.map(s => `
                    <div class="info-card">
                        <div class="info-icon">${s.icon}</div>
                        <h3>${escapeHTML(s.label)}</h3>
                        <p>${escapeHTML(s.value)}</p>
                    </div>
                `).join('')}
            </div>
        `;

        const infoCardsHTML = `
            <div class="info-grid">
                ${data.infoCards.map(c => `
                    <div class="info-card">
                        <div class="info-icon">${c.icon}</div>
                        <h3>${escapeHTML(c.title)}</h3>
                        <p>${escapeHTML(c.text)}</p>
                    </div>
                `).join('')}
            </div>
        `;

        const galleryHTML = `
            <div class="gallery-section">
                <h3>Discover the Beauty</h3>
                <div class="gallery-grid">
                    ${data.gallery.map(img => `
                        <div class="gallery-item" tabindex="0" role="button" aria-label="View ${escapeHTML(img.alt)}" data-img="${img.url}" data-caption="${escapeHTML(img.caption)}">
                            <img src="${img.url}" alt="${escapeHTML(img.alt)}" loading="lazy" />
                            <div class="gallery-overlay">
                                <span>${escapeHTML(img.caption)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        panelElement.innerHTML = headerHTML + statsHTML + infoCardsHTML + galleryHTML;

        // Bind Gallery Events
        const items = panelElement.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                openLightbox(item.dataset.img, item.dataset.caption);
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(item.dataset.img, item.dataset.caption);
                }
            });
        });
    }

    /* ================================================================
       6. LIGHTBOX
       ================================================================ */

    let lightboxEl, lightboxImg, lightboxCaption;

    function createLightbox() {
        lightboxEl = document.createElement('div');
        lightboxEl.className = 'lightbox';
        lightboxEl.setAttribute('role', 'dialog');
        lightboxEl.setAttribute('aria-modal', 'true');
        lightboxEl.setAttribute('aria-label', 'Image preview');

        lightboxEl.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close image preview">&times;</button>
                <img class="lightbox-img" src="" alt="Preview" />
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightboxEl);

        lightboxImg = lightboxEl.querySelector('.lightbox-img');
        lightboxCaption = lightboxEl.querySelector('.lightbox-caption');
        const closeBtn = lightboxEl.querySelector('.lightbox-close');

        const close = () => {
            lightboxEl.classList.remove('active');
        };

        closeBtn.addEventListener('click', close);
        lightboxEl.addEventListener('click', (e) => {
            if (e.target === lightboxEl) close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxEl.classList.contains('active')) {
                close();
            }
        });
    }

    function openLightbox(url, caption) {
        if (!lightboxEl) return;
        lightboxImg.src = url;
        lightboxImg.alt = caption;
        lightboxCaption.textContent = caption;
        lightboxEl.classList.add('active');
    }

    /* ================================================================
       7. UTILS
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
