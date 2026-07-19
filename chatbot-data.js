/**
 * BHARAT AI - Knowledge Base
 * Context-Aware Simulated database of facts and descriptions.
 */

const bharatKnowledgeBase = [
    {
        keywords: ["hello", "hi", "namaste", "hey"],
        response: "Namaste! 🙏 I am Bharat AI, your ultimate guide to Incredible India. I can answer questions about Indian states, culture, festivals, wildlife, travel destinations, food, and famous personalities. What would you like to know?"
    },
    {
        keywords: ["taj mahal", "agra", "monument of love"],
        response: "The Taj Mahal, located in Agra, Uttar Pradesh, is a UNESCO World Heritage site and one of the New Seven Wonders of the World. Built by Mughal Emperor Shah Jahan... <br><br><button class=\"chat-action-btn btn-primary\" style=\"margin-top: 10px; padding: 5px 10px; font-size: 0.9em; border-radius: 5px; cursor: pointer;\" data-target=\"/monuments.html#taj-mahal\">Yes, take me there!</button>"
    },
    {
        keywords: ["food", "cuisine", "eat", "dish", "meal"],
        response: "Indian cuisine is incredibly diverse, characterized by sophisticated use of spices. From the rich, creamy gravies of North India (like Butter Chicken and Dal Makhani) to the tangy, coconut-based curries of South India (like Dosa and Meen Moilee), every region has a unique flavor profile."
    },
    {
        keywords: ["festival", "diwali", "holi", "celebration"],
        response: "India is the land of festivals! Major celebrations include Diwali (the Festival of Lights symbolizing the victory of good over evil), Holi (the Festival of Colors welcoming spring), Navratri (nine nights of dancing), and Eid. Each festival is celebrated with unique sweets, rituals, and massive community gatherings."
    },
    {
        keywords: ["kerala", "backwaters", "gods own country"],
        response: "Kerala, famously known as 'God's Own Country', is a lush green state in South India. It is renowned for its tranquil palm-lined backwaters, Ayurvedic treatments, spice plantations, and classical arts like Kathakali. A houseboat cruise in Alleppey is a must-do experience!"
    },
    {
        keywords: ["rajasthan", "desert", "forts", "palaces"],
        response: "Rajasthan, the 'Land of Kings', is India's largest state by area. It is famous for the vast Thar Desert, magnificent hill forts like Amer and Mehrangarh, and vibrant cities like Jaipur (Pink City), Jodhpur (Blue City), and Udaipur (City of Lakes)."
    },
    {
        keywords: ["wildlife", "tiger", "lion", "safari", "animals"],
        response: "India's wildlife is incredibly rich. It is the only country in the world that is home to both tigers and lions. You can spot the Royal Bengal Tiger in Ranthambore and Jim Corbett, the Asiatic Lion in Gir, and one-horned rhinoceroses in Kaziranga National Park."
    },
    {
        keywords: ["himalayas", "mountains", "trekking", "snow"],
        response: "The Indian Himalayas span across the northern borders, offering breathtaking landscapes, high-altitude desert valleys like Ladakh and Spiti, and spiritual towns like Rishikesh. It is a paradise for mountaineers, trekkers, and those seeking serene Buddhist monasteries."
    },
    {
        keywords: ["culture", "dance", "music", "art", "tradition"],
        response: "Indian culture is one of the oldest in the world, stretching back over 4,500 years. It features 8 recognized classical dance forms (like Bharatanatyam and Kathak), a deep tradition of classical music (Hindustani and Carnatic), and thousands of indigenous arts and crafts."
    },
    {
        keywords: ["history", "ashoka", "empire", "ancient"],
        response: "India has a rich, millennia-spanning history. From the ancient Indus Valley Civilization to the Maurya Empire led by Ashoka the Great, the golden age of the Gupta Empire, the artistic peak of the Mughal era, and the resilient struggle for independence led by Mahatma Gandhi."
    },
    {
        keywords: ["goa", "beaches", "party"],
        response: "Goa is India's smallest state but its most famous beach destination. Known for its Portuguese colonial architecture, laid-back vibe, vibrant nightlife, and sandy shores along the Arabian Sea, it is the perfect place to relax and enjoy fresh seafood."
    },
    {
        keywords: ["light mode", "theme", "dark mode"],
        response: "I see you're interested in the site's design! You can toggle between Dark Mode and our new elegant Light Mode by clicking the ☀️/🌙 icon in the navigation bar."
    },
    {
        keywords: ["premium", "globe", "vr", "timeline"],
        response: "Our Premium Features page includes a stunning 3D Interactive Globe, an 'India Through Time' slider that lets you explore historical eras, and a documentary hub with Netflix-style cinematic layouts. Check it out from the navigation menu!"
    }
];

const fallbackResponses = [
    "That is a fascinating topic! India's diversity means there is always more to learn about it. Could you specify a particular state, food, or historical era?",
    "I'm still learning about that specific detail! Try asking me about famous monuments, wildlife safaris, traditional foods, or popular tourist destinations.",
    "Incredible India has endless stories. While I search my archives for that, would you like to know about the majestic Himalayas or the serene backwaters of Kerala?"
];

// Contextual Data Branches
const contextualData = {
    "default": {
        greeting: "Namaste! I am Bharat, your personalized AI Travel Planner and Story Narrator. How can I assist you in exploring India today?",
        chips: [
            "🗺️ Plan a 5-day Kerala trip",
            "📖 Tell me a Rajput story",
            "🏛️ History of Taj Mahal"
        ],
        scopedResponses: []
    },
    "wildlife": {
        greeting: "Welcome to India's wild side! 🐅 From the Royal Bengal Tigers to the Asiatic Lions, I can guide you through our incredible national parks.",
        chips: [
            "🐅 Spot a Bengal Tiger",
            "🦏 Kaziranga Rhinos",
            "🐘 Elephant Safaris"
        ],
        scopedResponses: [
            {
                keywords: ["tiger", "bengal", "ranthambore", "corbett"],
                response: "The Royal Bengal Tiger is India's national animal. Ranthambore and Jim Corbett are among the best places to spot them in the wild! Would you like to explore Ranthambore? <br><br><button class=\"chat-action-btn btn-primary\" style=\"margin-top: 10px; padding: 5px 10px; font-size: 0.9em; border-radius: 5px; cursor: pointer;\" data-target=\"/wildlife.html#ranthambore\">Explore Ranthambore</button>"
            }
        ]
    },
    "astronomy": {
        greeting: "Look up at the stars! 🌌 India has a rich history of astronomy, from ancient observatories like Jantar Mantar to our modern space missions (ISRO).",
        chips: [
            "🔭 What is Jantar Mantar?",
            "🚀 Tell me about ISRO",
            "📜 Ancient Astronomer Aryabhata"
        ],
        scopedResponses: [
            {
                keywords: ["jantar mantar", "observatory", "telescope"],
                response: "Jantar Mantar in Jaipur is an astronomical observation site built in the early 18th century. It includes a set of some 20 main fixed instruments designed for the observation of astronomical positions with the naked eye! <br><br><button class=\"chat-action-btn btn-primary\" style=\"margin-top: 10px; padding: 5px 10px; font-size: 0.9em; border-radius: 5px; cursor: pointer;\" data-target=\"/astronomy.html#jantar-mantar\">See Jantar Mantar</button>"
            },
            {
                keywords: ["aryabhata", "ancient", "mathematician"],
                response: "Aryabhata was the first of the major mathematician-astronomers from the classical age of Indian mathematics and Indian astronomy. He discovered that the earth rotates on its axis."
            }
        ]
    },
    "arts-crafts": {
        greeting: "Welcome to the vibrant world of Indian Arts & Crafts! 🎨 Every region has its own unique style, from Madhubani painting to Kanjeevaram silk.",
        chips: [
            "🖌️ Madhubani Art",
            "🏺 Pottery traditions",
            "🧵 Silk weaving"
        ],
        scopedResponses: []
    }
};

/**
 * Returns contextual data (greeting, chips) for a given path.
 */
function getChatbotContext(path) {
    const p = path.toLowerCase();
    let contextKey = "default";
    
    if (p.includes("wildlife")) {
        contextKey = "wildlife";
    } else if (p.includes("astronomy")) {
        contextKey = "astronomy";
    } else if (p.includes("arts-crafts")) {
        contextKey = "arts-crafts";
    }
    
    return contextualData[contextKey];
}

/**
 * Finds the best response, optionally prioritizing scoped responses based on context.
 */
function findBestResponse(userInput, currentPath = "") {
    const text = userInput.toLowerCase();
    
    let bestMatch = null;
    let maxMatches = 0;

    // Check scoped responses first if path is provided
    if (currentPath) {
        const context = getChatbotContext(currentPath);
        for (const entry of context.scopedResponses) {
            let matchCount = 0;
            for (const keyword of entry.keywords) {
                if (text.includes(keyword)) {
                    matchCount++;
                }
            }
            if (matchCount > maxMatches) {
                maxMatches = matchCount;
                bestMatch = entry.response;
            }
        }
    }

    // If no good match in scoped, check global knowledge base
    if (!bestMatch) {
        for (const entry of bharatKnowledgeBase) {
            let matchCount = 0;
            for (const keyword of entry.keywords) {
                if (text.includes(keyword)) {
                    matchCount++;
                }
            }
            if (matchCount > maxMatches) {
                maxMatches = matchCount;
                bestMatch = entry.response;
            }
        }
    }

    if (bestMatch) {
        return bestMatch;
    }

    // Return a random fallback
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
}
