import { cuisinesData } from '../data/cuisinesData.js';

/* ==========================================================================
   3. CUISINE EXPLORER
   ========================================================================== */

export function initCuisineExplorer() {
    const cuisineGrid = document.getElementById('cuisine-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Initial render
    if (!cuisineGrid) return;
    renderCuisines('all');

    // Filter Trigger click
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status
            tabBtns.forEach(b => b.classList.remove('active'));
            // Set current active
            btn.classList.add('active');

            const region = btn.getAttribute('data-region');

            // Fading grid animation
            cuisineGrid.style.opacity = '0';
            cuisineGrid.style.transform = 'translateY(15px)';
            cuisineGrid.style.transition = 'opacity 0.25s, transform 0.25s';

            setTimeout(() => {
                renderCuisines(region);
                cuisineGrid.style.opacity = '1';
                cuisineGrid.style.transform = 'translateY(0)';
            }, 250);
        });
    });

    function renderCuisines(regionFilter) {
        cuisineGrid.innerHTML = '';

        const filteredList = regionFilter === 'all'
            ? cuisinesData
            : cuisinesData.filter(item => item.region === regionFilter);

        filteredList.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'cuisine-card glass-card';

            // Determine region badge color
            let badgeClass = 'saffron-bg';
            if (dish.region === 'south') badgeClass = 'gold-bg';
            if (dish.region === 'east') badgeClass = 'green-bg';
            if (dish.region === 'west') badgeClass = 'saffron-bg';
            if (dish.region === 'northeast') badgeClass = 'gold-bg';

            card.innerHTML = `
                <div class="cuisine-card-image">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                    <span class="cuisine-region-badge ${badgeClass}">${dish.region} India</span>
                </div>
                <div class="cuisine-card-body">
                    <span class="cuisine-origin">${dish.state}</span>
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>
            `;

            cuisineGrid.appendChild(card);
        });
    }
}



// Attach to window for global inline HTML handlers
window.initCuisineExplorer = initCuisineExplorer;
