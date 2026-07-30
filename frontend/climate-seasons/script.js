/**
 * Climate & Six Seasons (Ritu) Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA
       ================================================================ */
    const RITU_DATA = {
        vasant: {
            title: "Vasant Ritu (Spring)",
            emoji: "🌸",
            months: "Chaitra - Vaishakha (Mid-March to Mid-May)",
            climate: "Pleasant and moderate. The harsh winter recedes, making way for blooming flowers, new leaves, and comfortable temperatures.",
            agriculture: "Harvesting of Rabi crops like wheat, mustard, and barley.",
            festivals: "Holi, Vasant Panchami, Baisakhi, Ugadi, Gudi Padwa."
        },
        grishma: {
            title: "Grishma Ritu (Summer)",
            emoji: "☀️",
            months: "Jyeshtha - Ashadha (Mid-May to Mid-July)",
            climate: "Hot and dry. Temperatures peak across the subcontinent, often exceeding 40°C (104°F) in northern and central plains.",
            agriculture: "Preparation of soil for Kharif crops. A time for summer fruits like mangoes, watermelons, and litchis.",
            festivals: "Rath Yatra, Guru Purnima."
        },
        varsha: {
            title: "Varsha Ritu (Monsoon)",
            emoji: "🌧️",
            months: "Shravana - Bhadrapada (Mid-July to Mid-September)",
            climate: "Humid and rainy. Brought by the Southwest Monsoon winds, providing the majority of India's annual rainfall.",
            agriculture: "Crucial for sowing Kharif crops like rice, cotton, and maize. The lifeblood of Indian agriculture.",
            festivals: "Raksha Bandhan, Krishna Janmashtami, Onam, Ganesh Chaturthi."
        },
        sharad: {
            title: "Sharad Ritu (Autumn)",
            emoji: "🍂",
            months: "Ashvina - Kartika (Mid-September to Mid-November)",
            climate: "Clear skies and cooling temperatures as the monsoon retreats. Humidity drops significantly.",
            agriculture: "Harvesting of Kharif crops begins. Sowing of early Rabi crops.",
            festivals: "Navaratri, Durga Puja, Diwali, Sharad Purnima."
        },
        hemant: {
            title: "Hemant Ritu (Pre-Winter)",
            emoji: "❄️",
            months: "Margashirsha - Pausha (Mid-November to Mid-January)",
            climate: "Mild to cold. The onset of winter brings chilly mornings and evenings, especially in North India.",
            agriculture: "Active growth period for Rabi crops like wheat and gram.",
            festivals: "Makar Sankranti, Pongal, Lohri, Karthigai Deepam."
        },
        shishir: {
            title: "Shishir Ritu (Winter)",
            emoji: "🧣",
            months: "Magha - Phalguna (Mid-January to Mid-March)",
            climate: "Cold and dry. The coldest time of the year, with snowfall in the Himalayas and cold waves in the northern plains.",
            agriculture: "Maturation of Rabi crops. Orchards prepare for the spring bloom.",
            festivals: "Maha Shivaratri, Basant Panchami (transitioning to Spring)."
        }
    };

    /* ================================================================
       2. DOM ELEMENTS & SVG INTERACTION
       ================================================================ */
    const wedges = document.querySelectorAll('.wheel-wedge');
    const contentPanel = document.getElementById('season-content-panel');

    function initSVGInteraction() {
        wedges.forEach(wedge => {
            // Handle Click
            wedge.addEventListener('click', () => handleWedgeSelection(wedge));
            
            // Handle Keyboard (Enter/Space)
            wedge.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleWedgeSelection(wedge);
                }
            });
        });
    }

    function handleWedgeSelection(selectedWedge) {
        // Remove active state from all
        wedges.forEach(w => w.classList.remove('active'));
        
        // Add active state to selected
        selectedWedge.classList.add('active');

        // Get season data key
        const seasonKey = selectedWedge.getAttribute('data-season');
        const data = RITU_DATA[seasonKey];

        if (data) {
            updateContentPanel(data);
        }
    }

    function updateContentPanel(data) {
        // Construct the new HTML
        const html = `
            <div class="panel-header">
                <h3><span class="emoji">${data.emoji}</span> ${data.title}</h3>
                <div class="panel-meta">📅 ${data.months}</div>
            </div>
            <div class="panel-body">
                <h4>🌡️ Climate</h4>
                <p>${data.climate}</p>
                
                <h4>🌾 Agriculture</h4>
                <p>${data.agriculture}</p>
                
                <h4>🎉 Key Festivals</h4>
                <p>${data.festivals}</p>
            </div>
        `;

        // Update the DOM
        contentPanel.innerHTML = html;
        
        // Announce to screen readers (optional but good practice for aria-live)
        // The aria-live="polite" on the container handles this automatically when content changes
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
        initSVGInteraction();
    });

})();
