// ==========================================================================
// INDIAN FORTS EXPLORER - JAVASCRIPT
// ==========================================================================

// Fort Data
const fortsData = [
    {
        id: 1,
        name: "Red Fort",
        location: "Delhi",
        state: "Delhi",
        built: "1639-1648",
        builtBy: "Emperor Shah Jahan",
        era: "Mughal Era",
        architecture: "Mughal Architecture",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        history: "The Red Fort, also known as Lal Qila, is a historic fort in the city of Delhi in India. It served as the main residence of the Mughal Emperors for nearly 200 years. The fort is named for its massive enclosing walls of red sandstone. It was commissioned by Emperor Shah Jahan in 1639 when he decided to shift his capital from Agra to Delhi.",
        highlights: [
            "UNESCO World Heritage Site",
            "Largest monument in Old Delhi",
            "Hosts India's Independence Day celebrations",
            "Features Diwan-i-Aam and Diwan-i-Khas",
            "Intricate marble inlay work"
        ]
    },
    {
        id: 2,
        name: "Amer Fort",
        location: "Amer, Jaipur",
        state: "Rajasthan",
        built: "1592",
        builtBy: "Raja Man Singh I",
        era: "Rajput Era",
        architecture: "Rajput-Mughal Architecture",
        image: "https://images.unsplash.com/photo-1590716179555-8c8a9dc5c6d9?w=800&q=80",
        history: "Amer Fort, also known as Amber Fort, is located in Amer, Rajasthan. It is one of the most famous forts in Rajasthan and is known for its artistic Hindu style elements. The fort was built by Raja Man Singh I in 1592. It is situated on a hill and is a major tourist attraction in the Jaipur area.",
        highlights: [
            "UNESCO World Heritage Site",
            "Sheesh Mahal (Mirror Palace)",
            "Elephant ride to the fort entrance",
            "Beautiful frescoes and paintings",
            "Maota Lake at the foothills"
        ]
    },
    {
        id: 3,
        name: "Golconda Fort",
        location: "Hyderabad",
        state: "Telangana",
        built: "11th-16th Century",
        builtBy: "Kakatiya & Qutb Shahi Dynasties",
        era: "Medieval Era",
        architecture: "Indo-Islamic Architecture",
        image: "https://images.unsplash.com/photo-1609766856923-7e0a0c0622d4?w=800&q=80",
        history: "Golconda Fort is a fortified citadel and an early capital city of the Qutb Shahi dynasty. The fort was originally built by the Kakatiya dynasty but was later expanded by the Qutb Shahi kings. It is famous for its acoustic architecture, where a hand clap at the entrance can be heard at the highest point.",
        highlights: [
            "Famous for acoustic architecture",
            "Diamond trade center in ancient times",
            "Fateh Rahben gun",
            "Eight gates with impressive designs",
            "Water supply system with Persian wheels"
        ]
    },
    {
        id: 4,
        name: "Mehrangarh Fort",
        location: "Jodhpur",
        state: "Rajasthan",
        built: "1459",
        builtBy: "Rao Jodha",
        era: "Rajput Era",
        architecture: "Rajput Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "Mehrangarh Fort is one of the largest forts in India, located in Jodhpur, Rajasthan. It was built by Rao Jodha in 1459. The fort is situated 410 feet above the city and is enclosed by imposing thick walls. Inside its boundaries there are several palaces known for their intricate carvings and expansive courtyards.",
        highlights: [
            "One of the largest forts in India",
            "Seven gates with distinct designs",
            "Moti Mahal (Pearl Palace)",
            "Phool Mahal (Flower Palace)",
            "Museum with royal artifacts"
        ]
    },
    {
        id: 5,
        name: "Jaisalmer Fort",
        location: "Jaisalmer",
        state: "Rajasthan",
        built: "1156",
        builtBy: "Rawal Jaisal",
        era: "Rajput Era",
        architecture: "Rajput Architecture",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        history: "Jaisalmer Fort, also known as Sonar Qila or Golden Fort, is one of the largest fully preserved fortified cities in the world. It was built by Rawal Jaisal in 1156. The fort stands amidst the golden sands of the Thar Desert on Trikuta Hill. It is a living fort with about 3,000 people residing within its walls.",
        highlights: [
            "UNESCO World Heritage Site",
            "Living fort with residents",
            "Golden sandstone architecture",
            "99 bastions for defense",
            "Jain temples within the fort"
        ]
    },
    {
        id: 6,
        name: "Chittorgarh Fort",
        location: "Chittorgarh",
        state: "Rajasthan",
        built: "7th Century",
        builtBy: "Chitrangada Mori",
        era: "Rajput Era",
        architecture: "Rajput Architecture",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
        history: "Chittorgarh Fort is one of the largest forts in India and a UNESCO World Heritage Site. It was the capital of Mewar and is known for the heroic tales of Rajput warriors, particularly Rani Padmini and Maharana Pratap. The fort has witnessed three major sieges and numerous battles.",
        highlights: [
            "UNESCO World Heritage Site",
            "Largest fort in India by area",
            "Vijay Stambha (Victory Tower)",
            "Kirti Stambha (Tower of Fame)",
            "Rani Padmini's Palace"
        ]
    },
    {
        id: 7,
        name: "Gwalior Fort",
        location: "Gwalior",
        state: "Madhya Pradesh",
        built: "8th Century",
        builtBy: "Suraj Sen",
        era: "Medieval Era",
        architecture: "Indo-Islamic Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "Gwalior Fort is a hill fort near Gwalior, Madhya Pradesh. The fort has been controlled by many different rulers over its history, including the Tomars, Mughals, and Marathas. It is known for its impressive architecture and the intricate carvings on the walls of the fort.",
        highlights: [
            "One of the most impregnable forts in India",
            "Man Singh Palace with beautiful tiles",
            "Teli ka Mandir temple",
            "Gujari Mahal built for Queen Mrignayani",
            "Scenic view from the hilltop"
        ]
    },
    {
        id: 8,
        name: "Kangra Fort",
        location: "Kangra",
        state: "Himachal Pradesh",
        built: "4th Century BC",
        builtBy: "Katoch Dynasty",
        era: "Ancient Era",
        architecture: "Himalayan Architecture",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
        history: "Kangra Fort is located in the Kangra district of Himachal Pradesh. It is the largest fort in the Himalayas and probably the oldest dated fort in India. The fort was built by the Katoch dynasty and has been mentioned in the Mahabharata and Alexander's records.",
        highlights: [
            "Oldest fort in the Himalayas",
            "Mentioned in Mahabharata",
            "Survived numerous earthquakes",
            "Beautiful views of Dhauladhar range",
            "Temples within the fort complex"
        ]
    },
    {
        id: 9,
        name: "Junagarh Fort",
        location: "Bikaner",
        state: "Rajasthan",
        built: "1589-1594",
        builtBy: "Raja Rai Singh",
        era: "Rajput Era",
        architecture: "Rajput-Mughal Architecture",
        image: "https://images.unsplash.com/photo-1609766856923-7e0a0c0622d4?w=800&q=80",
        history: "Junagarh Fort is located in Bikaner, Rajasthan. Unlike most other forts in Rajasthan, this fort was built on ground level and not on a hilltop. It was built by Raja Rai Singh in 1589. The fort complex consists of palaces, temples, and pavilions with beautiful carvings and artwork.",
        highlights: [
            "Built on ground level (unique in Rajasthan)",
            "37 bastions for defense",
            "Karan Mahal with gold paintings",
            "Anup Mahal with mirror work",
            "Har Mandir temple"
        ]
    },
    {
        id: 10,
        name: "Pratapgad Fort",
        location: "Mahabaleshwar",
        state: "Maharashtra",
        built: "1656",
        builtBy: "Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Maratha Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "Pratapgad Fort is a mountain fort built in 1656 by Chhatrapati Shivaji Maharaj. It is famous for the historic battle between Shivaji and Afzal Khan. The fort is divided into two parts: the upper fort and the lower fort, with a temple of Mahadev in the upper fort.",
        highlights: [
            "Site of historic Shivaji-Afzal Khan battle",
            "Built in just 2 months",
            "Statue of Chhatrapati Shivaji Maharaj",
            "Bhavani Temple in upper fort",
            "Scenic views of the Sahyadri range"
        ]
    },
    {
        id: 11,
        name: "Raigad Fort",
        location: "Raigad",
        state: "Maharashtra",
        built: "1656",
        builtBy: "Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Maratha Architecture",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
        history: "Raigad Fort was the capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. He captured this fort in 1656 and made it his capital in 1674 when he was crowned as the Chhatrapati. The fort is located on a hilltop and has several important structures including the coronation site.",
        highlights: [
            "Capital of Maratha Empire",
            "Coronation site of Chhatrapati Shivaji",
            "Samadhi of Chhatrapati Shivaji Maharaj",
            "Rajya Sabha (Royal Court)",
            "Takes 1400 steps to reach the top"
        ]
    },
    {
        id: 12,
        name: "Srirangapatna Fort",
        location: "Srirangapatna",
        state: "Karnataka",
        built: "15th Century",
        builtBy: "Tipu Sultan",
        era: "Mysore Era",
        architecture: "Indo-Islamic Architecture",
        image: "https://images.unsplash.com/photo-1609766856923-7e0a0c0622d4?w=800&q=80",
        history: "Srirangapatna Fort is located in the Mandya district of Karnataka. It was built by the Feudal lords under the Vijayanagara Empire and later strengthened by Tipu Sultan. The fort witnessed the historic Battle of Srirangapatna in 1799 where Tipu Sultan died fighting the British.",
        highlights: [
            "Site of Tipu Sultan's final battle",
            "Tipu's Summer Palace (Dariya Daulat Bagh)",
            "Gumbaz (Tipu's mausoleum)",
            "Sriranganathaswamy Temple",
            "Located on an island in River Kaveri"
        ]
    }
];

// DOM Elements
const fortsGrid = document.getElementById('forts-grid');
const fortSearch = document.getElementById('fort-search');
const stateFilter = document.getElementById('state-filter');
const architectureFilter = document.getElementById('architecture-filter');
const eraFilter = document.getElementById('era-filter');
const resetFilters = document.getElementById('reset-filters');
const noResults = document.getElementById('no-results');
const fortModal = document.getElementById('fort-modal');
const modalClose = document.getElementById('modal-close');

// Initialize the page
function init() {
    populateFilters();
    renderForts(fortsData);
    setupEventListeners();
}

// Populate filter dropdowns
function populateFilters() {
    // Get unique values for each filter
    const states = [...new Set(fortsData.map(f => f.state))].sort();
    const architectures = [...new Set(fortsData.map(f => f.architecture))].sort();
    const eras = [...new Set(fortsData.map(f => f.era))].sort();

    // Populate state filter
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateFilter.appendChild(option);
    });

    // Populate architecture filter
    architectures.forEach(arch => {
        const option = document.createElement('option');
        option.value = arch;
        option.textContent = arch;
        architectureFilter.appendChild(option);
    });

    // Populate era filter
    eras.forEach(era => {
        const option = document.createElement('option');
        option.value = era;
        option.textContent = era;
        eraFilter.appendChild(option);
    });
}

// Render fort cards
function renderForts(forts) {
    fortsGrid.innerHTML = '';

    if (forts.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    forts.forEach(fort => {
        const card = document.createElement('div');
        card.className = 'fort-card';
        card.innerHTML = `
            <div class="fort-card-image">
                <img src="${fort.image}" alt="${fort.name}" loading="lazy">
                <span class="fort-era-badge">${fort.era}</span>
            </div>
            <div class="fort-card-body">
                <span class="fort-location">${fort.location}</span>
                <h3>${fort.name}</h3>
                <p class="fort-architecture">${fort.architecture}</p>
                <p>${fort.history}</p>
                <div class="fort-card-footer">
                    <span class="fort-built">Built: <strong>${fort.built}</strong></span>
                    <span class="view-details-btn">View Details</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openModal(fort));
        fortsGrid.appendChild(card);
    });
}

// Filter forts based on search and filter selections
function filterForts() {
    const searchTerm = fortSearch.value.toLowerCase();
    const selectedState = stateFilter.value;
    const selectedArchitecture = architectureFilter.value;
    const selectedEra = eraFilter.value;

    const filtered = fortsData.filter(fort => {
        const matchesSearch = 
            fort.name.toLowerCase().includes(searchTerm) ||
            fort.location.toLowerCase().includes(searchTerm) ||
            fort.state.toLowerCase().includes(searchTerm) ||
            fort.history.toLowerCase().includes(searchTerm) ||
            fort.architecture.toLowerCase().includes(searchTerm);

        const matchesState = !selectedState || fort.state === selectedState;
        const matchesArchitecture = !selectedArchitecture || fort.architecture === selectedArchitecture;
        const matchesEra = !selectedEra || fort.era === selectedEra;

        return matchesSearch && matchesState && matchesArchitecture && matchesEra;
    });

    renderForts(filtered);
}

// Reset all filters
function resetAllFilters() {
    fortSearch.value = '';
    stateFilter.value = '';
    architectureFilter.value = '';
    eraFilter.value = '';
    renderForts(fortsData);
}

// Open modal with fort details
function openModal(fort) {
    document.getElementById('modal-image').style.backgroundImage = `url('${fort.image}')`;
    document.getElementById('modal-name').textContent = fort.name;
    document.getElementById('modal-era').textContent = fort.era;
    document.getElementById('modal-location').textContent = fort.location;
    document.getElementById('modal-state').textContent = fort.state;
    document.getElementById('modal-built').textContent = fort.built;
    document.getElementById('modal-architecture').textContent = fort.architecture;
    document.getElementById('modal-builder').textContent = fort.builtBy;
    document.getElementById('modal-history').textContent = fort.history;

    // Populate highlights
    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = '';
    fort.highlights.forEach(highlight => {
        const li = document.createElement('li');
        li.textContent = highlight;
        highlightsList.appendChild(li);
    });

    fortModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    fortModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup event listeners
function setupEventListeners() {
    fortSearch.addEventListener('input', filterForts);
    stateFilter.addEventListener('change', filterForts);
    architectureFilter.addEventListener('change', filterForts);
    eraFilter.addEventListener('change', filterForts);
    resetFilters.addEventListener('click', resetAllFilters);
    modalClose.addEventListener('click', closeModal);

    // Close modal on background click
    fortModal.addEventListener('click', (e) => {
        if (e.target === fortModal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize on DOM content loaded
document.addEventListener('app:route-changed', init);
