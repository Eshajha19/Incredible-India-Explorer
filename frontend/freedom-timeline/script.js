// ==========================================================================
// INDIAN FREEDOM TIMELINE - JAVASCRIPT
// Interactive timeline with freedom movement events and freedom fighters
// ==========================================================================

// Timeline Events Data
const timelineEvents = [
    {
        id: 1,
        year: 1857,
        title: "First War of Independence",
        description: "The Sepoy Mutiny, also known as the First War of Independence, marked the beginning of the end of the East India Company's rule in India. It was a widespread rebellion against British rule.",
        location: "Across India",
        era: "early",
        fighters: ["Mangal Pandey", "Rani Lakshmibai", "Bahadur Shah Zafar"],
        significance: "First major organized resistance against British rule, though unsuccessful, it inspired future freedom movements.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/1857_rebellion.jpg/440px-1857_rebellion.jpg"
    },
    {
        id: 2,
        year: 1885,
        title: "Formation of Indian National Congress",
        description: "The Indian National Congress was founded by A.O. Hume and others to provide a platform for political dialogue between Indians and the British government.",
        location: "Mumbai",
        era: "early",
        fighters: ["A.O. Hume", "Dadabhai Naoroji", "Womesh Chunder Bonnerjee"],
        significance: "Laid the foundation for organized political movement in India and became the primary vehicle for the freedom struggle.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/First_session_of_Indian_National_Congress.jpg/440px-First_session_of_Indian_National_Congress.jpg"
    },
    {
        id: 3,
        year: 1905,
        title: "Partition of Bengal",
        description: "Lord Curzon partitioned Bengal into two provinces, which was seen as a divide-and-rule policy. This led to widespread protests and the Swadeshi movement.",
        location: "Bengal",
        era: "moderate",
        fighters: ["Bal Gangadhar Tilak", "Aurobindo Ghosh", "Rabindranath Tagore"],
        significance: "Sparked the Swadeshi movement and united Indians against British policies, marking the rise of extremist nationalism.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Map_of_Bengal_1905.jpg/440px-Map_of_Bengal_1905.jpg"
    },
    {
        id: 4,
        year: 1915,
        title: "Gandhi's Return to India",
        description: "Mahatma Gandhi returned from South Africa and joined the Indian freedom movement, bringing his philosophy of Satyagraha (non-violent resistance).",
        location: "Mumbai",
        era: "moderate",
        fighters: ["Mahatma Gandhi"],
        significance: "Transformed the freedom movement with non-violent civil disobedience, making it a mass movement.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Mahatma-Gandhi%2C_studio%2C_1931.jpg/440px-Mahatma-Gandhi%2C_studio%2C_1931.jpg"
    },
    {
        id: 5,
        year: 1919,
        title: "Jallianwala Bagh Massacre",
        description: "British troops under General Dyer fired on a peaceful gathering at Jallianwala Bagh in Amritsar, killing hundreds of unarmed Indians.",
        location: "Amritsar",
        era: "gandhian",
        fighters: ["Udham Singh"],
        significance: "Shocked the nation and turned public opinion completely against British rule, leading to the Non-Cooperation Movement.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Jallianwala_Bagh_memorial.jpg/440px-Jallianwala_Bagh_memorial.jpg"
    },
    {
        id: 6,
        year: 1920,
        title: "Non-Cooperation Movement",
        description: "Gandhi launched the Non-Cooperation Movement, urging Indians to boycott British goods, institutions, and services through non-violent means.",
        location: "Nationwide",
        era: "gandhian",
        fighters: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
        significance: "First mass movement under Gandhi's leadership, uniting people across regions and classes in the freedom struggle.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Non_cooperation_movement_1920s.jpg/440px-Non_cooperation_movement_1920s.jpg"
    },
    {
        id: 7,
        year: 1929,
        title: "Lahore Session & Purna Swaraj",
        description: "The Indian Naional Congress declared 'Purna Swaraj' (complete independence) as its goal at the Lahore session under Jawaharlal Nehru's presidency.",
        location: "Lahore",
        era: "gandhian",
        fighters: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel"],
        significance: "Marked the shift from seeking dominion status to demanding complete independence from British rule.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jawaharlal_Nehru_1946.jpg/440px-Jawaharlal_Nehru_1946.jpg"
    },
    {
        id: 8,
        year: 1930,
        title: "Dandi March (Salt Satyagraha)",
        description: "Gandhi led the 240-mile Dandi March to protest the British salt tax, making salt from seawater in defiance of the law.",
        location: "Gujarat",
        era: "gandhian",
        fighters: ["Mahatma Gandhi", "Sarojini Naidu", "Kasturba Gandhi"],
        significance: "Brilliantly demonstrated the power of non-violent civil disobedience and brought international attention to India's freedom struggle.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Dandi_March.jpg/440px-Dandi_March.jpg"
    },
    {
        id: 9,
        year: 1931,
        title: "Execution of Bhagat Singh",
        description: "Revolutionary freedom fighter Bhagat Singh, along with Rajguru and Sukhdev, was executed by the British for their role in the Lahore conspiracy case.",
        location: "Lahore",
        era: "gandhian",
        fighters: ["Bhagat Singh", "Rajguru", "Sukhdev"],
        significance: "Their martyrdom inspired millions of youth to join the freedom movement and became symbols of revolutionary nationalism.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Bhagat_Singh.jpg/440px-Bhagat_Singh.jpg"
    },
    {
        id: 10,
        year: 1942,
        title: "Quit India Movement",
        description: "The Congress launched the Quit India Movement, demanding immediate independence. The British responded with massive arrests and brutal suppression.",
        location: "Nationwide",
        era: "final",
        fighters: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
        significance: "Final mass movement that convinced the British that they could no longer hold onto India.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Quit_India_Movement.jpg/440px-Quit_India_Movement.jpg"
    },
    {
        id: 11,
        year: 1943,
        title: "Formation of INA",
        description: "Subhas Chandra Bose formed the Indian National Army (Azad Hind Fauj) with Japanese support to fight the British militarily.",
        location: "Singapore",
        era: "final",
        fighters: ["Subhas Chandra Bose", "Lakshmi Sahgal"],
        significance: "Provided an armed resistance alternative and inspired Indians with slogans like 'Give me blood, and I will give you freedom!'",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Subhas_Chandra_Bose_NY.jpg/440px-Subhas_Chandra_Bose_NY.jpg"
    },
    {
        id: 12,
        year: 1947,
        title: "Independence & Partition",
        description: "India gained independence on August 15, 1947, but was partitioned into India and Pakistan, leading to massive migration and communal violence.",
        location: "Nationwide",
        era: "final",
        fighters: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Lord Mountbatten"],
        significance: "Culmination of nearly 200 years of struggle, though marked by the tragedy of partition.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Indian_independence_1947.jpg/440px-Indian_independence_1947.jpg"
    }
];

// Freedom Fighters Data
const freedomFighters = [
    {
        name: "Mahatma Gandhi",
        title: "Father of the Nation",
        years: "1869-1948",
        description: "Led the Indian independence movement through non-violent civil disobedience. His philosophy of Satyagraha inspired movements worldwide.",
        icon: "🕊️"
    },
    {
        name: "Jawaharlal Nehru",
        title: "First Prime Minister",
        years: "1889-1964",
        description: "A key leader of the independence movement and India's first Prime Minister. Known for his vision of modern, secular India.",
        icon: "🎓"
    },
    {
        name: "Subhas Chandra Bose",
        title: "Netaji",
        years: "1897-1945",
        description: "Formed the Indian National Army and sought armed struggle against British rule. Famous for his slogan 'Give me blood, and I will give you freedom!'",
        icon: "⚔️"
    },
    {
        name: "Bhagat Singh",
        title: "Revolutionary",
        years: "1907-1931",
        description: "A socialist revolutionary who became a symbol of youth resistance. Executed at age 23 for his role in the freedom struggle.",
        icon: "🔥"
    },
    {
        name: "Rani Lakshmibai",
        title: "Queen of Jhansi",
        years: "1828-1858",
        description: "Led the resistance against British rule in 1857. Known for her bravery and the famous quote 'I will not give up my Jhansi'.",
        icon: "👑"
    },
    {
        name: "Sardar Vallabhbhai Patel",
        title: "Iron Man of India",
        years: "1875-1950",
        description: "Played a key role in integrating princely states into independent India. Known for his strong leadership and administrative skills.",
        icon: "🛡️"
    },
    {
        name: "Mangal Pandey",
        title: "First Martyr",
        years: "1827-1857",
        description: "A soldier who sparked the 1857 rebellion by attacking British officers. Considered one of the first martyrs of the freedom movement.",
        icon: "⚔️"
    },
    {
        name: "Bal Gangadhar Tilak",
        title: "Father of Indian Unrest",
        years: "1856-1920",
        description: "Popularized the slogan 'Swaraj is my birthright'. A key figure in the early independence movement and the Swadeshi movement.",
        icon: "📚"
    }
];

// DOM Elements
const timelineContainer = document.getElementById('timeline-container');
const eventModal = document.getElementById('event-modal');
const modalClose = document.getElementById('modal-close');
const eraTabs = document.querySelectorAll('.era-tab');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentEraLabel = document.getElementById('current-era');
const fightersSpotlightGrid = document.getElementById('fighters-spotlight-grid');

// State
let currentEra = 'all';
let currentEraIndex = 0;
const eras = ['all', 'early', 'moderate', 'gandhian', 'final'];
const eraLabels = {
    'all': 'All Events',
    'early': 'Early Resistance (1857-1900)',
    'moderate': 'Moderate Phase (1900-1919)',
    'gandhian': 'Gandhian Era (1919-1942)',
    'final': 'Final Phase (1942-1947)'
};

// Initialize Timeline
function initTimeline() {
    renderTimelineEvents(currentEra);
    renderFreedomFighters();
    setupEventListeners();
    setupScrollAnimation();
}

// Render Timeline Events
function renderTimelineEvents(era) {
    timelineContainer.innerHTML = '';
    
    const filteredEvents = era === 'all' 
        ? timelineEvents 
        : timelineEvents.filter(event => event.era === era);
    
    filteredEvents.forEach((event, index) => {
        const eventElement = createTimelineEvent(event, index);
        timelineContainer.appendChild(eventElement);
    });
    
    // Trigger animation after a short delay
    setTimeout(() => {
        document.querySelectorAll('.timeline-event').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 100);
        });
    }, 100);
}

// Create Timeline Event Element
function createTimelineEvent(event, index) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'timeline-event';
    eventDiv.dataset.eventId = event.id;
    
    eventDiv.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="event-card">
            <span class="event-year">${event.year}</span>
            <h3>${event.title}</h3>
            <p>${event.description.substring(0, 120)}...</p>
            <div class="event-meta">
                <span class="event-location">${event.location}</span>
                <span class="event-fighters">${event.fighters.slice(0, 2).join(', ')}${event.fighters.length > 2 ? ' + more' : ''}</span>
            </div>
            <div class="event-cta">Learn More</div>
        </div>
    `;
    
    // Add click event for modal
    eventDiv.addEventListener('click', () => openEventModal(event));
    
    return eventDiv;
}

// Render Freedom Fighters Spotlight
function renderFreedomFighters() {
    fightersSpotlightGrid.innerHTML = '';
    
    freedomFighters.forEach(fighter => {
        const fighterCard = document.createElement('div');
        fighterCard.className = 'fighter-card';
        
        fighterCard.innerHTML = `
            <div class="fighter-avatar">${fighter.icon}</div>
            <h3>${fighter.name}</h3>
            <div class="fighter-title">${fighter.title}</div>
            <p>${fighter.description.substring(0, 100)}...</p>
            <div class="fighter-years">${fighter.years}</div>
        `;
        
        fightersSpotlightGrid.appendChild(fighterCard);
    });
}

// Open Event Modal
function openEventModal(event) {
    document.getElementById('modal-year').textContent = event.year;
    document.getElementById('modal-title').textContent = event.title;
    document.getElementById('modal-description').textContent = event.description;
    document.getElementById('modal-significance').textContent = event.significance;
    document.getElementById('modal-image').src = event.image;
    document.getElementById('modal-image').alt = event.title;
    
    // Render freedom fighters in modal
    const fightersGrid = document.getElementById('fighters-grid');
    fightersGrid.innerHTML = '';
    
    event.fighters.forEach(fighterName => {
        const fighterData = freedomFighters.find(f => f.name === fighterName);
        const fighterMiniCard = document.createElement('div');
        fighterMiniCard.className = 'fighter-mini-card';
        
        if (fighterData) {
            fighterMiniCard.innerHTML = `
                <div class="fighter-icon">${fighterData.icon}</div>
                <div class="fighter-name">${fighterData.name}</div>
                <div class="fighter-role">${fighterData.title}</div>
            `;
        } else {
            fighterMiniCard.innerHTML = `
                <div class="fighter-icon">👤</div>
                <div class="fighter-name">${fighterName}</div>
                <div class="fighter-role">Freedom Fighter</div>
            `;
        }
        
        fightersGrid.appendChild(fighterMiniCard);
    });
    
    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Event Modal
function closeEventModal() {
    eventModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup Event Listeners
function setupEventListeners() {
    // Era tabs
    eraTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const era = tab.dataset.era;
            currentEra = era;
            currentEraIndex = eras.indexOf(era);
            
            // Update active tab
            eraTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update era label
            currentEraLabel.textContent = eraLabels[era];
            
            // Render events
            renderTimelineEvents(era);
            
            // Update navigation buttons
            updateNavigationButtons();
        });
    });
    
    // Modal close
    modalClose.addEventListener('click', closeEventModal);
    
    // Close modal on outside click
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            closeEventModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && eventModal.classList.contains('active')) {
            closeEventModal();
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentEraIndex > 0) {
            currentEraIndex--;
            navigateToEra(eras[currentEraIndex]);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentEraIndex < eras.length - 1) {
            currentEraIndex++;
            navigateToEra(eras[currentEraIndex]);
        }
    });
    
    // Update navigation buttons initially
    updateNavigationButtons();
}

// Navigate to Era
function navigateToEra(era) {
    currentEra = era;
    
    // Update active tab
    eraTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.era === era) {
            tab.classList.add('active');
        }
    });
    
    // Update era label
    currentEraLabel.textContent = eraLabels[era];
    
    // Render events
    renderTimelineEvents(era);
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Update Navigation Buttons
function updateNavigationButtons() {
    prevBtn.disabled = currentEraIndex === 0;
    nextBtn.disabled = currentEraIndex === eras.length - 1;
}

// Setup Scroll Animation
function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe timeline events
    document.querySelectorAll('.timeline-event').forEach(event => {
        observer.observe(event);
    });
}

// Initialize on DOM load
document.addEventListener('app:route-changed', initTimeline);
