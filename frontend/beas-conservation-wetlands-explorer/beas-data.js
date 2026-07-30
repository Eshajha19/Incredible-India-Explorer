/**
 * Beas Conservation Wetlands Explorer — Data Module
 * Comprehensive dataset covering Ramsar wetland ecology, Indus River Dolphin conservation,
 * fish diversity, riverine ecosystem, interactive map hotspots, and gallery.
 */

const BEAS_INFO = {
    id: "beas",
    name: "Beas Conservation Reserve",
    aka: "Beas River Conservation Reserve",
    location: "Himachal Pradesh & Punjab, India",
    state: "Himachal Pradesh / Punjab",
    coordinates: { lat: 31.9833, lng: 75.5167 },
    area: "6,429 hectares",
    establishedYear: 2017,
    ramsarYear: 2020,
    unescoYear: null,
    climate: "Subtropical with distinct wet (monsoon) and dry seasons. River flow peaks July–September with Himalayan snowmelt.",
    bestTime: "October to April (Pleasant weather, dolphin sightings, birdwatching)",
    entryFees: "Free entry. Guided boat tours available at designated points (approx. ₹200–500 per person).",
    nearestTransport: {
        railway: "Beas Junction (10 km) / Amritsar Junction (50 km)",
        airport: "Sri Guru Ram Dass Jee International Airport, Amritsar (55 km)",
        highway: "NH 3 (Pathankot–Jalandhar Highway)"
    },
    quickStats: [
        { label: "River Length", value: "470 km", icon: "🏞️" },
        { label: "Ramsar Area", value: "6,429 ha", icon: "💧" },
        { label: "Indus Dolphins", value: "8–10", icon: "🐬" },
        { label: "Fish Species", value: "50+", icon: "🐟" },
        { label: "Ramsar Since", value: "2020", icon: "📅" },
        { label: "Bird Species", value: "200+", icon: "🦆" }
    ]
};

const BEAS_HYDROLOGY = {
    overview: "The Beas River originates at the Rohtang Pass in the Himalayas at an elevation of 4,361 m. It flows 470 km through Himachal Pradesh and Punjab before merging with the Sutlej River at Harike. The river creates a dynamic riverine wetland ecosystem with braided channels, sandbars, oxbow lakes, and riparian forests.",
    waterSource: "Himalayan glaciers (Rohtang Pass), monsoon rainfall, and snowmelt. Major tributaries include the Parvati, Hurla, Sainj, and Tirthan rivers.",
    seasons: [
        {
            name: "Summer Snowmelt",
            months: "April – June",
            icon: "🏔️",
            description: "As Himalayan snow begins to melt, the Beas swells with crystal-clear glacial runoff. Sandbars and gravel islands emerge, creating nesting grounds for river terns and plovers.",
            highlight: "Peak rafting season in Kullu Valley; clear waters reveal riverbed biodiversity."
        },
        {
            name: "Monsoon Surge",
            months: "July – September",
            icon: "🌧️",
            description: "Heavy monsoon rains cause the river to swell dramatically. Nutrient-rich sediment is deposited across floodplains, replenishing the riverine ecosystem. Dolphin sightings increase as they follow prey into shallower tributaries.",
            highlight: "Flood pulse triggers breeding in Indian major carps and catfish species."
        },
        {
            name: "Post-Monsoon Stability",
            months: "October – December",
            icon: "🍂",
            description: "Water levels stabilize. Migratory waterfowl arrive from Central Asia. The slower currents reveal deep pools favoured by the Indus River Dolphin.",
            highlight: "Best season for dolphin watching and bird photography along the banks."
        },
        {
            name: "Winter Low Flow",
            months: "January – March",
            icon: "❄️",
            description: "River flow reaches its annual minimum. Clear shallow waters expose gravel beds. Riparian vegetation provides critical shelter for resident fish and otter populations.",
            highlight: "Ideal for trekking along exposed riverbanks and sandbar camping."
        }
    ]
};

const DOLPHIN_INFO = {
    population: "8–10 individuals (estimated 2023 survey)",
    status: "Endangered (IUCN Red List)",
    scientificName: "Platanista gangetica minor",
    subspecies: "Indus River Dolphin (Indus subspecies of South Asian River Dolphin)",
    description: "The Indus River Dolphin is a freshwater dolphin species found only in the Indus River system. The Beas population represents the only confirmed breeding population of this subspecies in India, making it a critically important conservation site.",
    threats: [
        "Fragmentation of river habitats by barrages and dams",
        "Reduction in freshwater flow due to water abstraction",
        "Entanglement in fishing nets",
        "Pollution from agricultural and industrial runoff",
        "Noise disturbance from river traffic"
    ],
    conservation: [
        "Vikas-1 Barrage fish passage and flow management (2021)",
        "Community-based dolphin monitoring program by WWF-India",
        "River patrol teams to prevent illegal fishing and poaching",
        "Seasonal fishing bans in core dolphin zones",
        "Awareness programs for local fishing communities"
    ]
};

const FISH_SPECIES = [
    {
        id: "indian-mahseer",
        name: "Indian Mahseer",
        scientificName: "Tor putitora",
        status: "Endangered",
        size: "Up to 2.75 m, 55 kg",
        icon: "🐟",
        description: "The mighty mahseer, known as the 'Tiger of the River', is a prized game fish. Beas populations have declined due to dam construction blocking migration routes.",
        habitat: "Fast-flowing rocky pools and deep runs"
    },
    {
        id: "snow-trout",
        name: "Snow Trout",
        scientificName: "Schizothorax richardsonii",
        status: "Vulnerable",
        size: "30–50 cm",
        icon: "🐟",
        description: "A cold-water fish native to Himalayan rivers. Its population in the Beas is an indicator of water quality and ecosystem health.",
        habitat: "Cold, well-oxygenated upper reaches"
    },
    {
        id: "rohu",
        name: "Rohu",
        scientificName: "Labeo rohita",
        status: "Least Concern",
        size: "Up to 2 m, 45 kg",
        icon: "🐟",
        description: "One of the Indian major carps, Rohu forms a significant part of the river's fish biomass and is a key species for local fisheries.",
        habitat: "Deep pools and slow-moving lower reaches"
    },
    {
        id: "catla",
        name: "Catla",
        scientificName: "Catla catla",
        status: "Least Concern",
        size: "Up to 1.8 m, 40 kg",
        icon: "🐟",
        description: "A large freshwater carp with a distinctive upturned mouth. Catla thrive in the plankton-rich waters of the lower Beas.",
        habitat: "Surface waters of deep rivers and reservoirs"
    },
    {
        id: "mrigal",
        name: "Mrigal",
        scientificName: "Cirrhinus cirrhosus",
        status: "Least Concern",
        size: "Up to 1 m, 20 kg",
        icon: "🐟",
        description: "A bottom-feeding carp that helps maintain riverbed ecology by grazing on detritus and algae.",
        habitat: "Bottom waters of pools and slow reaches"
    },
    {
        id: "goonch",
        name: "Goonch Catfish",
        scientificName: "Bagarius bagarius",
        status: "Near Threatened",
        size: "Up to 2 m, 90 kg",
        icon: "🐟",
        description: "A giant freshwater catfish and apex predator of the Beas. Goonch populations are highly sensitive to overfishing and habitat disturbance.",
        habitat: "Deep pools and undercut banks in turbulent waters"
    },
    {
        id: "golden-mahseer",
        name: "Golden Mahseer",
        scientificName: "Tor putitora (Himalayan population)",
        status: "Endangered",
        size: "Up to 2 m, 50 kg",
        icon: "🐟",
        description: "Considered a sacred fish in Hindu mythology, the golden mahseer is an iconic species of the Himalayan rivers. Conservation efforts in the Beas focus on habitat connectivity.",
        habitat: "Pristine upper catchment pools"
    }
];

const BEAS_TIMELINE = [
    {
        year: "Ancient Era",
        title: "Beas in the Vedic Age",
        description: "The Beas (ancient Vipasa) is mentioned in the Rigveda as one of the seven sacred rivers (Sapta Sindhu). The river was a cradle of the Indus Valley Civilization's northern settlements."
    },
    {
        year: "1848",
        title: "First European Exploration",
        description: "British explorer and naturalist T. Hutton documents the rich fish diversity of the Beas River system in the Journal of the Asiatic Society of Bengal."
    },
    {
        year: "1978",
        title: "Indus Dolphin Discovery in Beas",
        description: "Scientists confirm the presence of Indus River Dolphins in the Beas River, establishing it as the only remaining habitat for the subspecies in India."
    },
    {
        year: "2017",
        title: "Declared Conservation Reserve",
        description: "The Government of Punjab declares a 6,429-hectare stretch of the Beas River as a Conservation Reserve under the Wildlife Protection Act, 1972."
    },
    {
        year: "2020",
        title: "Ramsar Site Designation",
        description: "The Beas Conservation Reserve is designated as a Wetland of International Importance (Ramsar Site No. 2448), recognizing its riverine wetland ecosystem and critical dolphin habitat."
    },
    {
        year: "2021",
        title: "Dolphin Passage at Vikas-1 Barrage",
        description: "A dedicated fish and dolphin passage is operationalized at the Vikas-1 Barrage, enabling safe upstream movement of aquatic species. This is the first such passage for dolphins in India."
    },
    {
        year: "2023",
        title: "Community Dolphin Stewardship Program",
        description: "Local fishing communities along the Beas form Dolphin Mitra (Friend of Dolphin) groups to actively participate in conservation monitoring and habitat protection."
    }
];

const BEAS_MAP = [
    {
        id: "spot-1",
        name: "Beas River Origin (Rohtang Pass)",
        category: "heritage",
        x: 12,
        y: 8,
        description: "The Beas originates from Beas Kund, a glacial lake near Rohtang Pass at 4,361 m elevation in the Pir Panjal range of Himachal Pradesh."
    },
    {
        id: "spot-2",
        name: "Kullu Valley Reach",
        category: "wildlife",
        x: 28,
        y: 22,
        description: "The river flows through the scenic Kullu Valley, forming braided channels and gravel islands. Popular for trout fishing and white-water rafting."
    },
    {
        id: "spot-3",
        name: "Pong Dam Backwaters",
        category: "wildlife",
        x: 45,
        y: 35,
        description: "The Maharana Pratap Sagar (Pong Dam) reservoir on the Beas is a major bird area and another Ramsar site, hosting thousands of migratory waterfowl."
    },
    {
        id: "spot-4",
        name: "Beas Conservation Reserve Core Zone",
        category: "gate",
        x: 52,
        y: 50,
        description: "The 6,429-hectare Ramsar-designated stretch of the Beas. Primary habitat for the Indus River Dolphin and over 50 fish species."
    },
    {
        id: "spot-5",
        name: "Vikas-1 Barrage Dolphin Passage",
        category: "heritage",
        x: 65,
        y: 58,
        description: "India's first dedicated fish and dolphin passage, allowing safe migration past the Vikas-1 Barrage. A landmark in riverine connectivity restoration."
    },
    {
        id: "spot-6",
        name: "Harike Confluence",
        category: "gate",
        x: 85,
        y: 72,
        description: "The Beas merges with the Sutlej River at Harike, forming the Harike Wetland — another Ramsar site and one of the largest wetlands in northern India."
    },
    {
        id: "spot-7",
        name: "Beas River Bird Sanctuary Reach",
        category: "hide",
        x: 40,
        y: 65,
        description: "A stretch of the river known for high concentrations of waterfowl, including the endangered White-rumped Vulture and several migratory duck species."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Beas_River_Kullu.jpg/800px-Beas_River_Kullu.jpg",
        title: "Beas River at Kullu",
        caption: "The crystal-clear waters of the Beas flowing through the Kullu Valley amid pine-clad hills."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Indus_River_Dolphin.jpg/800px-Indus_River_Dolphin.jpg",
        title: "Indus River Dolphin",
        caption: "The endangered Indus River Dolphin surfacing in the waters of the Beas Conservation Reserve."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Beas_River_at_Sunset.jpg/800px-Beas_River_at_Sunset.jpg",
        title: "Beas River Sunset",
        caption: "Golden hour over the Beas River, with migratory waterfowl silhouetted against the setting sun."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Indian_Mahseer_Tor_putitora.jpg/800px-Indian_Mahseer_Tor_putitora.jpg",
        title: "Indian Mahseer",
        caption: "The majestic Indian Mahseer, an endangered game fish native to the Beas River system."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Harike_Wetland.jpg/800px-Harike_Wetland.jpg",
        title: "Harike Wetland at Confluence",
        caption: "The Beas-Sutlej confluence at Harike forms a vast wetland ecosystem supporting diverse birdlife."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Beas_River_Rafting.jpg/800px-Beas_River_Rafting.jpg",
        title: "River Rafting on the Beas",
        caption: "White-water rafting on the Beas near Manali is a popular eco-tourism activity promoting river conservation awareness."
    }
];

const BEAS_WETLAND_ECOLOGY = {
    overview: "The Beas Conservation Reserve is a riverine wetland ecosystem characterized by braided river channels, sandbars, gravel islands, oxbow lakes, and riparian forests. This dynamic environment supports an extraordinary diversity of aquatic and terrestrial life.",
    habitats: [
        {
            name: "River Channels & Pools",
            icon: "🌊",
            description: "Main river channels with varying flow velocities create deep pools (dolphin habitat) and shallow riffles (fish spawning grounds)."
        },
        {
            name: "Sandbars & Gravel Islands",
            icon: "🏝️",
            description: "Seasonally exposed sand and gravel deposits provide nesting sites for Indian Skimmers, River Terns, and Pratincoles."
        },
        {
            name: "Riparian Forests",
            icon: "🌳",
            description: "Narrow strips of forest along the riverbanks dominated by Shisham, Acacia, and Willow. Critical habitat for otters, jackals, and migratory songbirds."
        },
        {
            name: "Oxbow Lakes & Abandoned Channels",
            icon: "🪷",
            description: "Old river meanders cut off from the main channel form stagnant water bodies rich in aquatic vegetation, amphibians, and waterfowl."
        },
        {
            name: "Floodplain Grasslands",
            icon: "🌾",
            description: "Low-lying areas that flood during monsoon. These grasslands support grazing mammals, nesting birds, and a diversity of grasses and sedges."
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BEAS_INFO,
        BEAS_HYDROLOGY,
        DOLPHIN_INFO,
        FISH_SPECIES,
        BEAS_TIMELINE,
        BEAS_MAP,
        GALLERY_IMAGES,
        BEAS_WETLAND_ECOLOGY
    };
}
