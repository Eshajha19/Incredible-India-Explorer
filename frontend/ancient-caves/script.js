/**
 * Ancient Caves & Rock Shelters Explorer
 */
(function () {
    'use strict';

    /* ================================================================
       1. DATA
       ================================================================ */
    const CAVES_DATA = [
        {
            id: "bhimbetka",
            name: "Bhimbetka Rock Shelters",
            icon: "🦌",
            state: "Madhya Pradesh",
            period: "Paleolithic and Mesolithic periods (up to 100,000 years old)",
            unesco: true,
            architecture: "Natural rock shelters",
            significance: "Exhibits the earliest traces of human life in India.",
            paintings: "Features spectacular rock paintings showing animals, hunting scenes, dances, and daily life of early hunter-gatherers, colored with natural pigments.",
            fact: "The rock shelters were discovered accidentally in 1957 by archaeologist V.S. Wakankar."
        },
        {
            id: "ajanta",
            name: "Ajanta Caves",
            icon: "🪷",
            state: "Maharashtra",
            period: "2nd century BCE to 480 CE",
            unesco: true,
            architecture: "Buddhist rock-cut cave monuments (Chaityas and Viharas)",
            significance: "A pinnacle of ancient Indian art, representing the life of Buddha and Jataka tales.",
            paintings: "World-renowned for its exquisite tempera mural paintings which are considered masterpieces of Buddhist religious art.",
            fact: "The caves were abandoned and covered by jungle until they were 'rediscovered' by a British officer tiger-hunting in 1819."
        },
        {
            id: "ellora",
            name: "Ellora Caves",
            icon: "🕉️",
            state: "Maharashtra",
            period: "600 CE to 1000 CE",
            unesco: true,
            architecture: "Rock-cut architecture featuring Hindu, Buddhist, and Jain monuments.",
            significance: "Demonstrates the religious harmony of ancient India with sanctuaries devoted to three major religions built side-by-side.",
            paintings: "Most famous for Cave 16, the Kailasha temple, a massive monolithic temple carved from a single rock outcropping.",
            fact: "The Kailasha temple was carved top-down, removing over 200,000 tonnes of solid rock."
        },
        {
            id: "badami",
            name: "Badami Cave Temples",
            icon: "🛕",
            state: "Karnataka",
            period: "6th century CE",
            unesco: false,
            architecture: "Chalukya style rock-cut temples",
            significance: "Important for its beautifully carved Hindu and Jain temples cut into red sandstone cliffs.",
            paintings: "Known for intricate sculptural reliefs, including the spectacular 18-armed Nataraja (dancing Shiva).",
            fact: "Badami was once the regal capital of the early Chalukya dynasty."
        },
        {
            id: "elephanta",
            name: "Elephanta Caves",
            icon: "🌊",
            state: "Maharashtra (Mumbai Harbor)",
            period: "5th to 7th century CE",
            unesco: true,
            architecture: "Rock-cut stone temples dedicated primarily to Lord Shiva.",
            significance: "A remarkable expression of Hindu spiritualistic beliefs and rock-cut art.",
            paintings: "The most famous sculpture is the Trimurti, a 20-foot-high carving representing Shiva as the creator, preserver, and destroyer.",
            fact: "The island was named 'Elephanta' by Portuguese explorers after they found a colossal stone elephant near the landing area."
        },
        {
            id: "udayagiri",
            name: "Udayagiri & Khandagiri Caves",
            icon: "⛰️",
            state: "Odisha",
            period: "2nd century BCE",
            unesco: false,
            architecture: "Partly natural and partly artificial caves.",
            significance: "Primarily served as residential blocks for Jain monks during the reign of King Kharavela.",
            paintings: "Features significant early Brahmi inscriptions (Hathigumpha inscription) detailing the king's military campaigns and public works.",
            fact: "Udayagiri means 'Sunrise Hill' and Khandagiri means 'Broken Hill'."
        }
    ];

    /* ================================================================
       2. DOM ELEMENTS & RENDERING
       ================================================================ */
    const gridContainer = document.getElementById('caves-grid');
    const modalOverlay = document.getElementById('cave-modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalTitleId = 'modal-title'; // ID for accessibility

    let currentFocusTrap = null;
    let elementToFocusOnClose = null;

    function renderCards() {
        CAVES_DATA.forEach(cave => {
            const card = document.createElement('div');
            card.className = 'cave-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View details for ${cave.name}`);
            
            card.innerHTML = `
                <span class="card-icon">${cave.icon}</span>
                <h3 class="card-title">${cave.name}</h3>
                <div class="card-state">📍 ${cave.state}</div>
            `;

            card.addEventListener('click', () => openModal(cave, card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(cave, card);
                }
            });

            gridContainer.appendChild(card);
        });
    }

    /* ================================================================
       3. MODAL & FOCUS TRAP LOGIC
       ================================================================ */
    function openModal(cave, triggerElement) {
        elementToFocusOnClose = triggerElement;

        // Populate Content
        modalContent.innerHTML = `
            <h2 id="${modalTitleId}">${cave.name}</h2>
            ${cave.unesco ? `<div class="modal-tag">🏛️ UNESCO World Heritage Site</div>` : ''}
            
            <div class="modal-section">
                <h4>Historical Period</h4>
                <p>${cave.period}</p>
            </div>
            
            <div class="modal-section">
                <h4>Architecture</h4>
                <p>${cave.architecture}</p>
            </div>

            <div class="modal-section">
                <h4>Significance</h4>
                <p>${cave.significance}</p>
            </div>

            <div class="modal-section">
                <h4>Art & Highlights</h4>
                <p>${cave.paintings}</p>
            </div>

            <div class="modal-section">
                <h4>Fascinating Fact</h4>
                <p><em>${cave.fact}</em></p>
            </div>
        `;

        // Show Modal
        modalOverlay.classList.add('active');

        // Setup Focus Trap
        if (typeof window.setupFocusTrap === 'function') {
            const modalDialog = document.getElementById('cave-modal');
            currentFocusTrap = window.setupFocusTrap(modalDialog);
        } else {
            console.warn('window.setupFocusTrap is not available.');
            // Fallback focus to close button
            modalCloseBtn.focus();
        }

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';

        if (currentFocusTrap) {
            currentFocusTrap.deactivate();
            currentFocusTrap = null;
        }

        // If focus trap doesn't handle returning focus, we do it manually.
        // pages-common.js setupFocusTrap does it automatically via previousActiveElement,
        // but ensuring it here is safe.
        if (elementToFocusOnClose) {
            setTimeout(() => {
                elementToFocusOnClose.focus();
                elementToFocusOnClose = null;
            }, 100);
        }
    }

    // Modal Event Listeners
    modalCloseBtn.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    /* ================================================================
       4. THEME TOGGLE LOGIC
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
       5. INIT
       ================================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        setupThemeToggle();
        renderCards();
    });

})();
