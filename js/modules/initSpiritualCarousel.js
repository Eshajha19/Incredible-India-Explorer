import { spiritualData } from './spiritualData.js';

export function initSpiritualCarousel() {
    const carousel = document.getElementById('spiritual-carousel');
    const dotsContainer = document.getElementById('spiritual-dots');
    const prevBtn = document.getElementById('spiritual-prev');
    const nextBtn = document.getElementById('spiritual-next');
    const detailTitle = document.getElementById('spiritual-detail-title');
    const detailLoc = document.getElementById('spiritual-detail-location');
    const detailDesc = document.getElementById('spiritual-detail-desc');
    const exploreBtn = document.getElementById('spiritual-explore-btn');

    if (!carousel) return;

    const total = spiritualData.length;
    let activeIndex = 2; // start on Golden Temple, matching the reference image
    const VISIBLE_RANGE = 2; // shows activeIndex -2 ... +2 (5 cards)

    // Build all card elements once; visibility/position is handled in render()
    carousel.innerHTML = '';
    spiritualData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'spiritual-card';
        card.setAttribute('data-index', index);
        card.style.backgroundImage = `url(${item.image})`;
        card.innerHTML = `
            <div class="spiritual-card-rating">★ ${item.rating}</div>
            <div class="spiritual-card-overlay">
                <h4>${item.name}</h4>
                <div class="spiritual-card-loc">📍 ${item.location}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            activeIndex = index;
            render();
        });
        carousel.appendChild(card);
    });

    // Circular distance from activeIndex, shortest path around the loop
    function getCircularOffset(index) {
        let diff = index - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return diff;
    }

    function render() {
        const panel = document.querySelector('.spiritual-detail-panel');
        panel.classList.add('updating');

        const cards = carousel.querySelectorAll('.spiritual-card');

        cards.forEach((card, index) => {
            const offset = getCircularOffset(index);
            const absOffset = Math.abs(offset);

            card.classList.remove('is-active');

            if (absOffset > VISIBLE_RANGE) {
                card.style.display = 'none';
                return;
            }

            card.style.display = 'block';

            const spacing = 200;
            const scale = offset === 0 ? 1 : absOffset === 1 ? 0.8 : 0.62;
            const opacity = offset === 0 ? 1 : absOffset === 1 ? 0.7 : 0.35;
            const zIndex = 10 - absOffset;
            const translateX = offset * spacing;

            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.style.transform =
                `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`;

            if (offset === 0) card.classList.add('is-active');
        });

        const activeItem = spiritualData[activeIndex];
        detailTitle.innerText = activeItem.name; // confirm you want this back
        detailDesc.innerText = activeItem.description;

        requestAnimationFrame(() => {
            panel.classList.remove('updating');
        });
    }

    function goNext() {
        activeIndex = (activeIndex + 1) % total; // wraps to 0 at the end
        render();
    }

    function goPrev() {
        activeIndex = (activeIndex - 1 + total) % total; // wraps to last at the start
        render();
    }

    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);

    render();
}
