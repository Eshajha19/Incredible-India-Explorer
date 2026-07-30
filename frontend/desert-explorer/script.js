/**
 * Desert Landscapes of India Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA
       ================================================================ */
    const DESERT_DATA = {
        thar: [
            {
                id: "thar-geography",
                title: "Geographic Location",
                content: "Located mostly in the state of Rajasthan, extending into Gujarat, Punjab, and Haryana. It forms a natural boundary between India and Pakistan."
            },
            {
                id: "thar-climate",
                title: "Climate & Temperature",
                content: "Arid and subtropical. Temperatures can soar up to 50°C (122°F) in summer and drop to near freezing 0°C (32°F) in winter."
            },
            {
                id: "thar-landscape",
                title: "Sand Dunes & Terrain",
                content: "Characterized by vast, shifting sand dunes (barchans, longitudinal, and transverse), rocky outcrops, and sparse salt lakes."
            },
            {
                id: "thar-flora",
                title: "Native Flora",
                content: "<ul><li>Khejri Tree (State tree of Rajasthan)</li><li>Rohida</li><li>Various thorny bushes and drought-resistant cacti</li></ul>"
            },
            {
                id: "thar-fauna",
                title: "Native Fauna",
                content: "<ul><li>Great Indian Bustard (Critically Endangered)</li><li>Blackbuck</li><li>Indian Gazelle (Chinkara)</li><li>Desert Fox</li></ul>"
            },
            {
                id: "thar-communities",
                title: "Communities & Culture",
                content: "Home to tribes like the Bishnois (known for fierce conservation of trees and animals), Bhils, and nomadic pastoralists. Rich in folk music, colorful attire, and camel herding."
            },
            {
                id: "thar-adaptations",
                title: "Survival Adaptations",
                content: "Plants have deep taproots and waxy leaves to minimize water loss. Animals like the camel store fat in humps, and many rodents are nocturnal to avoid the daytime heat. Traditional architecture uses thick mud walls to keep interiors cool."
            }
        ],
        spiti: [
            {
                id: "spiti-geography",
                title: "Geographic Location",
                content: "Located in the Himalayas in the northern state of Himachal Pradesh (Spiti) and the Union Territory of Ladakh. These are high-altitude regions lying in the rain shadow of the Himalayas."
            },
            {
                id: "spiti-climate",
                title: "Climate & Temperature",
                content: "Harsh, cold arid climate. Summer temperatures range from 15°C to 25°C, while winter plummets to -20°C to -40°C (-40°F)."
            },
            {
                id: "spiti-landscape",
                title: "Rocky Landscapes",
                content: "Barren, jagged mountains, deep gorges, scree slopes, and high-altitude lakes (like Pangong Tso). Almost entirely devoid of sand dunes (except localized ones like in Hunder, Nubra Valley)."
            },
            {
                id: "spiti-flora",
                title: "Native Flora",
                content: "<ul><li>Seabuckthorn (vital for soil erosion and local economy)</li><li>Alpine scrubs</li><li>Wild roses and junipers along river banks</li></ul>"
            },
            {
                id: "spiti-fauna",
                title: "Native Fauna",
                content: "<ul><li>Snow Leopard (Ghost of the mountains)</li><li>Himalayan Ibex</li><li>Tibetan Wolf</li><li>Bactrian Camel (double-humped)</li></ul>"
            },
            {
                id: "spiti-communities",
                title: "Communities & Culture",
                content: "Predominantly Buddhist culture with ancient monasteries (Key, Tabo, Hemis) perched on cliffs. Communities rely on agriculture during the short summer and pastoralism."
            },
            {
                id: "spiti-adaptations",
                title: "Survival Adaptations",
                content: "Animals have thick coats of fur (e.g., Pashmina goats, Yaks). Houses are built with flat roofs for drying crops and thick mud/stone walls to retain heat. Agriculture depends heavily on glacier meltwater via traditional irrigation channels (Kuhls)."
            }
        ]
    };

    /* ================================================================
       2. DOM ELEMENTS
       ================================================================ */
    const tharContainer = document.getElementById('thar-content');
    const spitiContainer = document.getElementById('spiti-content');
    const themeToggleBtn = document.getElementById('theme-toggle');

    /* ================================================================
       3. INIT & RENDER
       ================================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        renderAccordions(tharContainer, DESERT_DATA.thar);
        renderAccordions(spitiContainer, DESERT_DATA.spiti);
        setupThemeToggle();
    });

    /**
     * Renders an array of data items into accessible accordions within a container
     */
    function renderAccordions(container, dataArray) {
        dataArray.forEach(item => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';

            accordionItem.innerHTML = `
                <button class="accordion-btn" aria-expanded="false" aria-controls="${item.id}-panel" id="${item.id}-btn">
                    <span>${item.title}</span>
                    <span class="accordion-icon" aria-hidden="true">▼</span>
                </button>
                <div class="accordion-panel" id="${item.id}-panel" role="region" aria-labelledby="${item.id}-btn">
                    <div class="accordion-inner">
                        ${item.content}
                    </div>
                </div>
            `;

            const btn = accordionItem.querySelector('.accordion-btn');
            const panel = accordionItem.querySelector('.accordion-panel');

            btn.addEventListener('click', () => {
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                
                // Close all other accordions in this container (optional, but good for UX)
                closeAllAccordions(container);

                if (!isExpanded) {
                    btn.setAttribute('aria-expanded', 'true');
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });

            container.appendChild(accordionItem);
        });
    }

    function closeAllAccordions(container) {
        const btns = container.querySelectorAll('.accordion-btn');
        const panels = container.querySelectorAll('.accordion-panel');
        
        btns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
        panels.forEach(panel => panel.style.maxHeight = null);
    }

    /* ================================================================
       4. THEME TOGGLE LOGIC
       ================================================================ */
    function setupThemeToggle() {
        // Check localStorage or system preference (optional enhancement)
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        document.body.className = savedTheme;
        updateToggleText(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
            const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
            
            document.body.className = newTheme;
            localStorage.setItem('theme', newTheme);
            updateToggleText(newTheme);
        });
    }

    function updateToggleText(theme) {
        if (theme === 'dark-theme') {
            themeToggleBtn.innerHTML = '☀️ Light Mode';
        } else {
            themeToggleBtn.innerHTML = '🌙 Dark Mode';
        }
    }

})();
