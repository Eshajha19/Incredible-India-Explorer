const geologicalWonders = [
    {
        id: 1,
        name: "Lonar Crater",
        location: "Maharashtra",
        type: "crater",
        icon: "🌋",
        description: "A meteorite impact crater lake formed around 52,000 years ago, one of the world's few basaltic impact craters.",
        history: "The Lonar Crater was created by a meteor impact approximately 52,000 years ago during the Pleistocene epoch. It is the only known impact crater in basaltic rock on Earth. The crater has a diameter of 1.8 kilometers and a depth of 137 meters. The lake inside the crater is both saline and alkaline, making it a unique ecosystem.",
        formation: "Formed by high-velocity meteor impact that penetrated the Deccan Traps basalt layers. The impact created a bowl-shaped depression that gradually filled with water, creating a unique lake with unusual chemical properties.",
        significance: [
            "Only hyper-velocity impact crater in basaltic rock on Earth",
            "Lake has both saline and alkaline properties",
            "Home to unique microbial ecosystems",
            "Important site for studying impact cratering processes",
            "Sacred site with several ancient temples around the rim"
        ],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Lonar+Crater+Maharashtra"
    },
    {
        id: 2,
        name: "Marble Rocks",
        location: "Madhya Pradesh",
        type: "rock",
        icon: "🗿",
        description: "Stunning white marble cliffs along the Narmada River, rising to 100 feet in height.",
        history: "The Marble Rocks at Bhedaghat have been carved by the Narmada River over millions of years. These stunning white marble formations have been a popular tourist destination since the British colonial era. The area is famous for its boat rides through the marble gorges, especially during moonlight when the rocks glow ethereally.",
        formation: "The marble rocks are part of the Vindhya Supergroup, formed from metamorphosed limestone deposits. The Narmada River has carved these soft marble formations over geological time, creating spectacular cliffs and gorges with smooth, polished surfaces.",
        significance: [
            "100-foot tall white marble cliffs",
            "Beautiful boat rides through marble gorges",
            "Spectacular during full moon nights",
            "Featured in several Bollywood films",
            "Geological window into ancient marine environments"
        ],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Marble+Rocks+Bhedaghat+Madhya+Pradesh"
    },
    {
        id: 3,
        name: "Gandikota",
        location: "Andhra Pradesh",
        type: "canyon",
        icon: "🏜️",
        description: "Known as the 'Grand Canyon of India', featuring spectacular gorges carved by the Pennar River.",
        history: "Gandikota was established as a fort in the 12th century and served as the capital of the Pemmasani Nayaks. The geological wonder lies in the stunning gorge formed by the Pennar River cutting through the Erramala hills, creating canyon walls that rise hundreds of feet.",
        formation: "The canyon was formed by the Pennar River eroding through quartzite and granite rock formations of the Eastern Ghats over millions of years. The hard, resistant rock created steep canyon walls while the river carved a deep channel through the landscape.",
        significance: [
            "Called the 'Grand Canyon of India'",
            "Canyon walls rise 300-400 feet",
            "Ancient fort complex with historical temples",
            "Unique geological formation in peninsular India",
            "Spectacular sunset views over the gorge"
        ],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gandikota+Andhra+Pradesh"
    },
    {
        id: 4,
        name: "Barren Island",
        location: "Andaman Sea",
        type: "volcanic",
        icon: "🔥",
        description: "India's only active volcano, located in the Andaman Sea, with a history of eruptions spanning centuries.",
        history: "Barren Island is India's only active volcano and the only confirmed active volcano in South Asia. The first recorded eruption was in 1787, and it has erupted multiple times since, with recent activity in 2017-2018. The island is uninhabited due to its volcanic nature.",
        formation: "Part of the volcanic arc formed by the subduction of the Indian Plate beneath the Burmese Plate. The stratovolcano rises from the ocean floor to an elevation of 354 meters above sea level. The volcanic activity is directly linked to tectonic plate movements in this region.",
        significance: [
            "India's only active volcano",
            "Only confirmed active volcano in South Asia",
            "Stratovolcano rising from ocean floor",
            "Important for studying volcanic activity",
            "Unique marine ecosystem around volcanic vents"
        ],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Barren+Island+Andaman+Sea"
    },
    {
        id: 5,
        name: "Columnar Basalt Formations",
        location: "St. Mary's Islands, Karnataka",
        type: "rock",
        icon: "🪨",
        description: "Hexagonal basalt columns created by volcanic cooling, similar to the Giant's Causeway in Ireland.",
        history: "The St. Mary's Islands, also known as Coconut Island, are famous for their distinctive hexagonal basalt columns. These formations were declared a National Geological Monument in 2001. The islands are among the few places in the world where columnar jointing in basalt is so prominently displayed.",
        formation: "The columnar basalt formations were created during the Deccan Traps volcanic activity around 88 million years ago. As thick lava flows cooled and contracted, they cracked in a hexagonal pattern, creating the distinctive vertical columns. The columns are typically 3-6 feet in diameter and can be up to 20 feet tall.",
        significance: [
            "National Geological Monument since 2001",
            "Hexagonal basalt columns similar to Giant's Causeway",
            "Formed during Deccan Traps volcanic activity",
            "Excellent example of columnar jointing",
            "Rare geological formation in India"
        ],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=St+Mary's+Islands+Karnataka"
    }
];

let currentFilter = 'all';
let searchQuery = '';

function createWonderCard(wonder) {
    const card = document.createElement('div');
    card.className = 'wonder-card';
    card.dataset.type = wonder.type;
    card.dataset.id = wonder.id;
    
    card.innerHTML = `
        <div class="wonder-image">${wonder.icon}</div>
        <div class="wonder-content">
            <h3>${wonder.name}</h3>
            <div class="location">📍 ${wonder.location}</div>
            <span class="type">${wonder.type.charAt(0).toUpperCase() + wonder.type.slice(1)}</span>
            <p>${wonder.description}</p>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(wonder));
    return card;
}

function renderWonders() {
    const grid = document.getElementById('wondersGrid');
    grid.innerHTML = '';
    
    const filteredWonders = geologicalWonders.filter(wonder => {
        const matchesFilter = currentFilter === 'all' || wonder.type === currentFilter;
        const matchesSearch = wonder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            wonder.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            wonder.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    
    filteredWonders.forEach(wonder => {
        grid.appendChild(createWonderCard(wonder));
    });
}

function openModal(wonder) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${wonder.name}</h2>
            <div class="location">📍 ${wonder.location}</div>
        </div>
        <div class="modal-image">${wonder.icon}</div>
        <div class="modal-section">
            <h3>Description</h3>
            <p>${wonder.description}</p>
        </div>
        <div class="modal-section">
            <h3>Geological History</h3>
            <p>${wonder.history}</p>
        </div>
        <div class="modal-section">
            <h3>Formation Process</h3>
            <p>${wonder.formation}</p>
        </div>
        <div class="modal-section">
            <h3>Significance</h3>
            <ul>
                ${wonder.significance.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <a href="${wonder.mapUrl}" target="_blank" class="map-link">🗺️ View on Google Maps</a>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderWonders();
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            renderWonders();
        });
    });
    
    // Modal close button
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderWonders();
    setupEventListeners();
});
