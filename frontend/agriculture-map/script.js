/**
 * Agricultural Map of India Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA
       ================================================================ */
    const AGRI_DATA = {
        north: {
            title: "Northern Region",
            crops: "Wheat, Sugarcane, Mustard, Basmati Rice",
            states: "Punjab, Haryana, Uttar Pradesh, Uttarakhand",
            seasons: "Mainly Rabi (Winter), but significant Kharif (Monsoon) crops.",
            irrigation: "Canal systems and extensive tube well networks.",
            fact: "Punjab and Haryana are known as the 'Granary of India' due to massive wheat production during the Green Revolution."
        },
        east: {
            title: "Eastern & NE Region",
            crops: "Rice, Jute, Tea, Bamboo, Spices",
            states: "West Bengal, Assam, Bihar, Odisha, NE States",
            seasons: "Primarily Kharif, with heavy dependence on monsoon rainfall.",
            irrigation: "Rainfed, with some canal and tank irrigation.",
            fact: "Assam produces more than half of India's tea, and West Bengal is the undisputed leader in Jute production."
        },
        central: {
            title: "Central Region",
            crops: "Soybean, Pulses, Wheat, Cotton",
            states: "Madhya Pradesh, Chhattisgarh",
            seasons: "Kharif and Rabi.",
            irrigation: "Mix of rainfed, well, and canal irrigation.",
            fact: "Madhya Pradesh is often called the 'Soya State' of India because of its massive soybean cultivation."
        },
        west: {
            title: "Western Region",
            crops: "Cotton, Groundnut, Sugarcane, Bajra (Pearl Millet)",
            states: "Gujarat, Maharashtra, Rajasthan",
            seasons: "Kharif dominates, especially in arid areas.",
            irrigation: "Drip irrigation is popular in dry parts; canals (like Indira Gandhi Canal) in Rajasthan.",
            fact: "Gujarat is India's largest producer of cotton and groundnut. Maharashtra leads in sugar production."
        },
        south: {
            title: "Southern Region",
            crops: "Rice, Coffee, Rubber, Spices (Pepper, Cardamom), Coconut",
            states: "Kerala, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana",
            seasons: "Kharif, Rabi, and Zaid. Year-round cropping in many parts.",
            irrigation: "Tank irrigation is historically significant, alongside modern dams.",
            fact: "Karnataka produces over 70% of India's coffee, while Kerala is the hub for rubber and spices."
        }
    };

    /* ================================================================
       2. DOM ELEMENTS & INTERACTION LOGIC
       ================================================================ */
    const mapContainer = document.querySelector('.map-container');
    const regions = document.querySelectorAll('.map-region');
    const tooltip = document.getElementById('region-tooltip');
    const mapElement = document.getElementById('agri-map');
    
    let isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Listen for resize to update mobile status
    window.addEventListener('resize', () => {
        isMobile = window.matchMedia("(max-width: 768px)").matches;
    });

    function initMapInteraction() {
        // Add Close button to tooltip for mobile
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close tooltip');
        closeBtn.addEventListener('click', hideTooltip);
        tooltip.appendChild(closeBtn);

        regions.forEach(region => {
            // Hover events (Desktop)
            region.addEventListener('mouseenter', (e) => {
                if (!isMobile) showTooltip(region, e);
            });
            
            region.addEventListener('mousemove', (e) => {
                if (!isMobile && tooltip.classList.contains('visible')) {
                    // Optional: Follow mouse if desired. 
                    // Currently, we position it relative to the container center.
                }
            });

            region.addEventListener('mouseleave', () => {
                if (!isMobile) hideTooltip();
            });

            // Click events (Mobile + Keyboard activation)
            region.addEventListener('click', (e) => {
                showTooltip(region, e);
                e.stopPropagation(); // prevent document click from closing it immediately
            });

            // Keyboard events
            region.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showTooltip(region, e);
                }
            });
        });

        // Close tooltip when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (isMobile && tooltip.classList.contains('visible') && !tooltip.contains(e.target)) {
                hideTooltip();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && tooltip.classList.contains('visible')) {
                hideTooltip();
            }
        });
    }

    function showTooltip(regionElement, event) {
        const regionKey = regionElement.getAttribute('data-region');
        const data = AGRI_DATA[regionKey];

        if (!data) return;

        // Set Active States
        regions.forEach(r => r.classList.remove('active'));
        regionElement.classList.add('active');
        mapElement.classList.add('has-active');

        // Populate Tooltip content
        // Keep the close button intact
        const closeBtnHTML = `<button class="close-btn" aria-label="Close tooltip" onclick="document.getElementById('region-tooltip').classList.remove('visible'); document.getElementById('agri-map').classList.remove('has-active'); document.querySelectorAll('.map-region').forEach(r => r.classList.remove('active'));">×</button>`;
        
        tooltip.innerHTML = `
            ${closeBtnHTML}
            <h3>${data.title}</h3>
            <p><strong>🌾 Major Crops:</strong> ${data.crops}</p>
            <p><strong>🗺️ States:</strong> ${data.states}</p>
            <p><strong>🌦️ Seasons:</strong> ${data.seasons}</p>
            <p><strong>💧 Irrigation:</strong> ${data.irrigation}</p>
            <hr style="border:0; border-top:1px solid #ddd; margin: 10px 0;">
            <p><em>${data.fact}</em></p>
        `;

        tooltip.classList.add('visible');
    }

    function hideTooltip() {
        tooltip.classList.remove('visible');
        regions.forEach(r => r.classList.remove('active'));
        mapElement.classList.remove('has-active');
    }

    /* ================================================================
       3. THEME TOGGLE LOGIC
       ================================================================ */
    const themeToggleBtn = document.getElementById('theme-toggle');

    function setupThemeToggle() {
        if (!themeToggleBtn) return;

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

    /* ================================================================
       4. INIT
       ================================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        setupThemeToggle();
        initMapInteraction();
    });

})();
