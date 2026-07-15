const spiritualData = [
    {
        id: "s2",
        name: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        rating: 4.9,
        image: "assets/Taj_Mahal.png",
        description: "An ivory-marble mausoleum built by Shah Jahan for Mumtaz Mahal — a monument to love recognized as one of the world's most extraordinary architectural achievements."
    },
    {
        id: "s3",
        name: "Golden Temple",
        location: "Amritsar, Punjab",
        rating: 4.9,
        image: "assets/Golden_Temple.png",
        description: "A spiritual sanctuary and one of the holiest Sikh shrines, symbolizing equality, devotion and human brotherhood."
    },
    {
        id: "s6",
        name: "Meenakshi Temple",
        location: "Madurai, Tamil Nadu",
        rating: 4.8,
        image: "assets/Meenakshi_Temple.png",
        description: "A Dravidian temple crowned with towering, painted gopurams depicting thousands of sculpted deities — a living center of worship for centuries."
    },
    {
        id: "s7",
        name: "Jama Masjid",
        location: "New Delhi",
        rating: 4.7,
        image: "assets/Jama_Masjid.png",
        description: "Commissioned by Shah Jahan, one of India's largest mosques, its red sandstone courtyard holding tens of thousands at Friday prayer."
    },
    {
        id: "s8",
        name: "Basilica of Bom Jesus",
        location: "Old Goa",
        rating: 4.6,
        image: "assets/Basilica_of_Bom_Jesus.png",
        description: "A UNESCO World Heritage Baroque church holding the mortal remains of St. Francis Xavier, its facade unplastered by design."
    },
    {
        id: "s9",
        name: "Kedarnath Temple",
        location: "Uttarakhand",
        rating: 4.9,
        image: "assets/Kedarnath.png",
        description: "Perched at 3,583m in the Garhwal Himalayas, one of the twelve Jyotirlingas — reached only on foot, mule, or by helicopter."
    },
    {
        id: "s10",
        name: "Hemis Monastery",
        location: "Ladakh",
        rating: 4.7,
        image: "assets/Hemis_Monastery.png",
        description: "The largest and wealthiest monastery in Ladakh, home to a masked Cham dance festival held once every twelve years."
    }
];

function initSpiritualCarousel() {
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
        detailTitle.innerText = activeItem.name;
        detailDesc.innerText = activeItem.description;

        requestAnimationFrame(() => {
            panel.classList.remove('updating');
        });
    }

    function goNext() {
        activeIndex = (activeIndex + 1) % total;
        render();
    }

    function goPrev() {
        activeIndex = (activeIndex - 1 + total) % total;
        render();
    }

    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);

    render();
}
