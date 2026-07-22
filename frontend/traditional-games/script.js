// ==========================================================================
// TRADITIONAL GAMES EXPLORER - JAVASCRIPT
// ==========================================================================

// Traditional Games Data
const traditionalGames = [
    {
        id: 1,
        name: "Kabaddi",
        origin: "Tamil Nadu",
        region: "south",
        type: "outdoor",
        players: "2 teams of 7",
        icon: "🏃",
        description: "Kabaddi is a contact team sport that originated in ancient India. It's known as the 'game of the masses' and requires minimal equipment, making it popular across rural and urban areas.",
        rules: [
            "Two teams of seven players each occupy opposite halves of a field",
            "A 'raider' from one team enters the opponent's court to tag defenders",
            "The raider must return to their court before holding their breath",
            "Defenders must tackle the raider to prevent them from returning",
            "Points are scored for each defender tagged or successful raid",
            "The team with the most points at the end wins"
        ],
        significance: "Kabaddi is deeply rooted in Indian culture and mythology, mentioned in the Mahabharata. It promotes physical fitness, teamwork, and strategic thinking. Today, it's played professionally in the Pro Kabaddi League."
    },
    {
        id: 2,
        name: "Kho Kho",
        origin: "Maharashtra",
        region: "west",
        type: "outdoor",
        players: "2 teams of 12",
        icon: "🏃‍♂️",
        description: "Kho Kho is a traditional tag game that tests speed, agility, and teamwork. It's one of the most popular indigenous sports in India, played in schools and at national levels.",
        rules: [
            "Teams take turns to chase and defend",
            "Chasers sit in a row facing alternating directions",
            "The active chaser pursues defenders who run around the field",
            "Chasers can switch by touching ('kho') a seated teammate",
            "Defenders must avoid being tagged within a set time",
            "The team with the most successful tags wins"
        ],
        significance: "Kho Kho originated in Maharashtra and has been played for centuries. It's recognized as a competitive sport by the Indian Olympic Association and is included in national games, promoting physical endurance and quick reflexes."
    },
    {
        id: 3,
        name: "Gilli Danda",
        origin: "Rural India",
        region: "north",
        type: "outdoor",
        players: "2 or more",
        icon: "🏏",
        description: "Gilli Danda is an ancient Indian sport similar to cricket. It uses two sticks - a small one (gilli) and a larger one (danda). It's believed to be over 2,500 years old.",
        rules: [
            "The striker hits the gilli with the danda to launch it into the air",
            "While the gilli is airborne, the striker hits it again to send it far",
            "Fielders try to catch the gilli or retrieve it quickly",
            "The striker scores points based on distance covered",
            "If the gilli is caught, the striker is 'out'",
            "Teams alternate between striking and fielding"
        ],
        significance: "Gilli Danda is considered a precursor to modern cricket and baseball. It's traditionally played in rural areas during festivals and leisure time, requiring minimal equipment and promoting hand-eye coordination."
    },
    {
        id: 4,
        name: "Lagori",
        origin: "Karnataka",
        region: "south",
        type: "outdoor",
        players: "2 teams",
        icon: "🗿",
        description: "Lagori, also known as Pittu or Seven Stones, is a popular street game played across India. It involves knocking down a pile of stones and then rebuilding it while being chased.",
        rules: [
            "A pile of seven flat stones is stacked",
            "One team throws a ball to knock down the pile",
            "The throwing team then tries to rebuild the stack",
            "The opposing team tries to tag players with the ball",
            "If the stack is rebuilt, the rebuilding team scores",
            "If all players are tagged, the throwing team scores"
        ],
        significance: "Lagori is a game that brings communities together, especially during festivals. It teaches teamwork, strategy, and quick thinking. The game has regional variations and is known by different names across India."
    },
    {
        id: 5,
        name: "Chaupar",
        origin: "Ancient India",
        region: "north",
        type: "board",
        players: "2-4",
        icon: "🎲",
        description: "Chaupar is an ancient Indian board game similar to Ludo. It was played by royalty and commoners alike, with references found in the Mahabharata epic.",
        rules: [
            "Played on a cross-shaped board with four arms",
            "Players move pieces based on dice throws",
            "The objective is to move all pieces to the center home",
            "Opponents can capture each other's pieces",
            "Captured pieces must restart from the beginning",
            "First player to get all pieces home wins"
        ],
        significance: "Chaupar is one of the oldest board games in the world, dating back to the 4th century BCE. It represents the strategic thinking and mathematical prowess of ancient Indian civilization. The game is mentioned in the epic Mahabharata."
    },
    {
        id: 6,
        name: "Pachisi",
        origin: "Ancient India",
        region: "north",
        type: "board",
        players: "4",
        icon: "🎯",
        description: "Pachisi is the national game of India and the ancestor of modern Ludo. It was played in the Mughal courts and features a distinctive cross-shaped board.",
        rules: [
            "Four players play in partnerships of two",
            "Pieces move based on cowrie shell throws",
            "The board has a cross shape with four arms",
            "Players aim to move all pieces to the center",
            "Special squares allow shortcuts or safe zones",
            "The partnership that finishes first wins"
        ],
        significance: "Pachisi dates back to the 16th century and was a favorite pastime of Mughal emperors. The name comes from the Hindi word for 'twenty-five', the highest score possible. It inspired the creation of Ludo and Parcheesi."
    },
    {
        id: 7,
        name: "Satoliya",
        origin: "Rajasthan",
        region: "west",
        type: "outdoor",
        players: "2 teams",
        icon: "🪨",
        description: "Satoliya, also known as Seven Stones, is a traditional game popular in Rajasthan and surrounding states. It's similar to Lagori but with regional variations in rules.",
        rules: [
            "Seven stones are stacked in a pyramid",
            "One team throws a ball to topple the stack",
            "The throwing team must rebuild the stack",
            "The opposing team tries to eliminate players by hitting them with the ball",
            "Players can protect themselves by touching the stones",
            "The game continues until one team achieves a target score"
        ],
        significance: "Satoliya is deeply embedded in Rajasthani culture, played during festivals and community gatherings. It promotes physical fitness, teamwork, and strategic planning. The game is often accompanied by folk songs and cheers."
    },
    {
        id: 8,
        name: "Kancha",
        origin: "Bengal",
        region: "east",
        type: "indoor",
        players: "2 or more",
        icon: "🔮",
        description: "Kancha, or marble games, is a beloved childhood game across India. Players use marbles to compete in various skill-based challenges and games.",
        rules: [
            "Players take turns shooting marbles at target marbles",
            "The objective is to hit or capture opponent marbles",
            "Different games have different target configurations",
            "Players may bet marbles on the outcome",
            "Skill and precision determine the winner",
            "The player with the most marbles at the end wins"
        ],
        significance: "Kancha is a nostalgic game that generations of Indian children have grown up playing. It develops fine motor skills, hand-eye coordination, and mathematical thinking. The game has countless regional variations."
    },
    {
        id: 9,
        name: "Antakshari",
        origin: "All India",
        region: "north",
        type: "indoor",
        players: "2+ teams",
        icon: "🎤",
        description: "Antakshari is a musical game where teams sing songs starting with the last letter of the previous song. It's a popular group activity during gatherings and long journeys.",
        rules: [
            "Teams take turns singing songs",
            "Each song must start with the last letter of the previous song",
            "Songs can be from Bollywood, folk, or any genre",
            "Teams have a time limit to start their song",
            "If a team fails, they lose a turn or point",
            "The team with the most successful songs wins"
        ],
        significance: "Antakshari is more than a game - it's a cultural phenomenon that brings people together. It showcases India's rich musical heritage and is played at family gatherings, picnics, and during festivals. The game spans generations and musical tastes."
    },
    {
        id: 10,
        name: "Langdi",
        origin: "Maharashtra",
        region: "west",
        type: "outdoor",
        players: "2 teams",
        icon: "🦵",
        description: "Langdi is a traditional tag game where players must hop on one foot while chasing opponents. It's a test of balance, agility, and endurance.",
        rules: [
            "One team are 'chasers' who hop on one foot",
            "The other team are 'runners' who can run freely",
            "Chasers must tag runners while maintaining their hop",
            "If a chaser puts both feet down, they're disqualified",
            "Tagged runners join the chasers in the next round",
            "The team that tags all opponents fastest wins"
        ],
        significance: "Langdi originated in Maharashtra and is played in schools and rural areas. It's an excellent exercise for balance and leg strength. The game is often played during festivals and teaches fair play and sportsmanship."
    },
    {
        id: 11,
        name: "Atya Patya",
        origin: "Maharashtra",
        region: "west",
        type: "outdoor",
        players: "2 teams of 9",
        icon: "🏃‍♀️",
        description: "Atya Patya is a traditional tag game played on a rectangular court. It's one of the most popular indigenous sports in Maharashtra and is played competitively at state levels.",
        rules: [
            "Played on a rectangular court divided into lanes",
            "One team occupies the court as 'defenders'",
            "The other team tries to cross the court without being tagged",
            "Defenders can only move along designated lines",
            "Attackers must cross back and forth to score points",
            "The team with the most successful crosses wins"
        ],
        significance: "Atya Patya is recognized as an official sport in Maharashtra. It's played in schools and has state-level competitions. The game promotes strategic thinking, agility, and teamwork. It's been played for generations in rural and urban Maharashtra."
    },
    {
        id: 12,
        name: "Dhop Khel",
        origin: "Assam",
        region: "northeast",
        type: "outdoor",
        players: "2 teams",
        icon: "🎾",
        description: "Dhop Khel is a traditional ball game from Assam. It's similar to dodgeball but with unique rules and cultural significance in Assamese communities.",
        rules: [
            "Two teams stand on opposite sides of a court",
            "A ball (dhop) is thrown between teams",
            "Players must catch and throw the ball without touching the ground",
            "If the ball touches the ground, the throwing team loses a point",
            "Players can be eliminated if they fail to catch properly",
            "The team with the most points wins"
        ],
        significance: "Dhop Khel is an integral part of Assamese culture, played during festivals like Bihu. It promotes physical fitness and community bonding. The game is traditionally played by both men and women during community celebrations."
    },
    {
        id: 13,
        name: "Moksha Patam",
        origin: "Ancient India",
        region: "north",
        type: "board",
        players: "2-4",
        icon: "🐍",
        description: "Moksha Patam is the original Indian version of Snakes and Ladders. It was created as a moral teaching tool, with ladders representing virtues and snakes representing vices.",
        rules: [
            "Players roll dice to move along numbered squares",
            "Ladders allow players to climb up (virtues)",
            "Snakes send players down (vices)",
            "The goal is to reach the final square (Moksha/liberation)",
            "The game teaches moral lessons through gameplay",
            "First player to reach the end wins"
        ],
        significance: "Moksha Patam was invented in ancient India as a tool for moral education. The game's design reflects Hindu philosophy, with the journey representing life's path toward liberation. It was later adapted as Snakes and Ladders and spread worldwide."
    },
    {
        id: 14,
        name: "Ashtapada",
        origin: "Ancient India",
        region: "north",
        type: "board",
        players: "2",
        icon: "♟️",
        description: "Ashtapada is an ancient Indian board game believed to be the precursor to Chess. It was played on an 8x8 board and is mentioned in ancient Sanskrit texts.",
        rules: [
            "Played on an 8x8 square board",
            "Two players move pieces according to specific rules",
            "The objective is to capture the opponent's king",
            "Different pieces have different movement patterns",
            "Strategy and foresight are essential",
            "The player who checkmates the opponent wins"
        ],
        significance: "Ashtapada dates back to at least the 6th century CE and is considered the ancestor of modern Chess. The game spread from India to Persia (as Shatranj) and then to Europe. It represents India's contribution to strategic gaming."
    },
    {
        id: 15,
        name: "Uri Adi",
        origin: "Tamil Nadu",
        region: "south",
        type: "outdoor",
        players: "2 teams",
        icon: "🏺",
        description: "Uri Adi is a traditional pot-breaking game played during festivals in Tamil Nadu. Blindfolded participants try to break a hanging pot with a stick.",
        rules: [
            "A clay pot is hung at a height",
            "Participants are blindfolded and given a stick",
            "Other participants distract and guide them",
            "The blindfolded player must hit and break the pot",
            "The pot often contains prizes or sweets",
            "Success is celebrated with music and cheers"
        ],
        significance: "Uri Adi is famously played during the festival of Krishna Janmashtami, reenacting Lord Krishna's childhood mischief of stealing butter. The game is a community celebration that brings people together in joy and festivity."
    },
    {
        id: 16,
        name: "Inbuan",
        origin: "Mizoram",
        region: "northeast",
        type: "outdoor",
        players: "2",
        icon: "🤼",
        description: "Inbuan is a traditional wrestling sport from Mizoram. It's not just about strength but also about technique and balance, with strict rules prohibiting certain moves.",
        rules: [
            "Two wrestlers grip each other's belts",
            "The objective is to make the opponent touch the ground",
            "Kicking, biting, and hair pulling are prohibited",
            "Matches are conducted in rounds",
            "Points are awarded for successful takedowns",
            "The wrestler with the most points wins"
        ],
        significance: "Inbuan is an integral part of Mizo culture, traditionally played during festivals and community gatherings. It teaches discipline, respect, and physical fitness. The sport has been preserved as a cultural heritage of Mizoram."
    }
];

// DOM Elements
const gamesGrid = document.getElementById('games-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const filterTags = document.querySelectorAll('.filter-tag');
const noResults = document.getElementById('no-results');
const gameModal = document.getElementById('game-modal');
const gameModalClose = document.getElementById('game-modal-close');

// State
let currentRegion = 'all';
let currentType = 'all';
let searchQuery = '';
let gameModalFocusTrap = null;

// Initialize
document.addEventListener('app:route-changed', () => {
    renderGames(traditionalGames);
    setupEventListeners();
});

// Render Games
function renderGames(games) {
    gamesGrid.innerHTML = '';
    
    if (games.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    games.forEach(game => {
        const card = createGameCard(game);
        gamesGrid.appendChild(card);
    });
}

// Create Game Card
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = () => openGameModal(game);
    
    const regionColors = {
        north: 'rgba(255, 153, 51, 0.9)',
        south: 'rgba(18, 136, 7, 0.9)',
        east: 'rgba(255, 176, 31, 0.9)',
        west: 'rgba(255, 153, 51, 0.9)',
        northeast: 'rgba(18, 136, 7, 0.9)'
    };
    
    const typeColors = {
        board: 'rgba(18, 136, 7, 0.9)',
        outdoor: 'rgba(255, 153, 51, 0.9)',
        indoor: 'rgba(255, 176, 31, 0.9)'
    };
    
    card.innerHTML = `
        <div class="game-card-image">
            <span class="game-icon">${game.icon}</span>
            <span class="game-region-badge" style="background: ${regionColors[game.region]}">${game.region} India</span>
            <span class="game-type-badge" style="background: ${typeColors[game.type]}">${game.type}</span>
        </div>
        <div class="game-card-body">
            <p class="game-origin">${game.origin}</p>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="game-card-footer">
                <span class="game-players"><span>${game.players}</span> players</span>
                <span class="view-details-btn">View Details →</span>
            </div>
        </div>
    `;
    
    return card;
}

// Filter Games
function filterGames() {
    let filtered = traditionalGames;
    
    // Filter by region
    if (currentRegion !== 'all') {
        filtered = filtered.filter(game => game.region === currentRegion);
    }
    
    // Filter by type
    if (currentType !== 'all') {
        filtered = filtered.filter(game => game.type === currentType);
    }
    
    // Filter by search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(game => 
            game.name.toLowerCase().includes(query) ||
            game.origin.toLowerCase().includes(query) ||
            game.region.toLowerCase().includes(query) ||
            game.type.toLowerCase().includes(query) ||
            game.description.toLowerCase().includes(query)
        );
    }
    
    renderGames(filtered);
}

// Setup Event Listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterGames();
    });
    
    // Search button
    searchBtn.addEventListener('click', () => {
        searchQuery = searchInput.value;
        filterGames();
    });
    
    // Region tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentRegion = btn.dataset.region;
            filterGames();
        });
    });
    
    // Type filter tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentType = tag.dataset.type;
            filterGames();
        });
    });
    
    // Modal close
    gameModalClose.addEventListener('click', closeGameModal);
    
    // Close modal on backdrop click
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            closeGameModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !gameModal.classList.contains('hidden')) {
            closeGameModal();
        }
    });
    
    // Scroll to top button
    const scrollBtn = document.getElementById('btn-scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.style.display = 'flex';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Open Game Modal
function openGameModal(game) {
    document.getElementById('game-modal-badge').textContent = game.type;
    document.getElementById('game-modal-title').textContent = game.name;
    document.getElementById('game-modal-origin').textContent = `Origin: ${game.origin}`;
    document.getElementById('game-modal-description').textContent = game.description;
    document.getElementById('game-modal-significance').textContent = game.significance;
    
    const imgWrapper = document.querySelector('.game-modal-img-wrapper');
    imgWrapper.innerHTML = `<span class="game-icon">${game.icon}</span>`;
    
    const rulesList = document.getElementById('game-modal-rules');
    rulesList.innerHTML = '';
    game.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });
    
    gameModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    gameModalFocusTrap = window.setupFocusTrap(gameModal);
}

// Close Game Modal
function closeGameModal() {
    gameModal.classList.add('hidden');
    document.body.style.overflow = '';
    if (gameModalFocusTrap) {
        gameModalFocusTrap.deactivate();
        gameModalFocusTrap = null;
    }
}
