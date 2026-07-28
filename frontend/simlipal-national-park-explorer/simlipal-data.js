/**
 * Simlipal National Park Explorer — Data Module
 * Comprehensive dataset covering Biosphere Reserve details, Barehipani & Joranda waterfalls,
 * Melanistic (Black) Tigers, Mayurbhanj Elephant Reserve, 4 Forest Types, 94+ Orchid species,
 * Indigenous Tribal Communities, map hotspots, and photo gallery.
 */

const SIMLIPAL_INFO = {
    id: "simlipal",
    name: "Simlipal National Park",
    aka: "Simlipal Biosphere Reserve",
    location: "Mayurbhanj District, Odisha, India",
    state: "Odisha",
    coordinates: { lat: 21.9333, lng: 86.3500 },
    area: "2,750 km² (Core Area: 845 km², Biosphere Reserve Area: 5,569 km²)",
    establishedYear: 1980,
    sanctuaryYear: 1979,
    tigerReserveYear: 1973,
    biosphereYear: 2009,
    etymology: "Derived from 'Simul' (Red Silk Cotton tree) which blooms in fiery red across the forest in spring.",
    climate: "Tropical Monsoon with pleasant winters and mist-covered mountain plateaus",
    bestTime: "November to June (Park opens November 1)",
    entryFees: "₹100 (Indian Nationals), ₹500 (Foreigners), Vehicle Permit: ₹500, Guide Fee: ₹500/day",
    nearestTransport: {
        railway: "Baripada Railway Station (60 km) / Balasore Station (76 km)",
        airport: "Bhubaneswar Biju Patnaik Airport (270 km) / Kolkata Airport (240 km)",
        gatewayTown: "Baripada & Jashipur Gate"
    },
    quickStats: [
        { label: "Biosphere Reserve", value: "5,569 km²", icon: "🌐" },
        { label: "Barehipani Fall", value: "399 meters", icon: "🌊" },
        { label: "Black Tiger Habitat", value: "World Exclusive", icon: "🐅" },
        { label: "Orchid Species", value: "94+ Species", icon: "🌺" },
        { label: "Elephant Reserve", value: "Mayurbhanj", icon: "🐘" },
        { label: "Established Year", value: "1980", icon: "🏛️" }
    ]
};

const WATERFALLS = [
    {
        id: "barehipani",
        name: "Barehipani Waterfall",
        height: "399 meters (1,309 feet)",
        type: "Two-tiered Cascading Waterfall",
        river: "Budhabalanga River",
        description: "India's second highest waterfall. Originating atop the Meghasani peak, the Budhabalanga River plunges down a dramatic two-tiered cliff into a deep green gorge surrounded by dense virgin Sal forest.",
        icon: "🌊"
    },
    {
        id: "joranda",
        name: "Joranda Waterfall",
        height: "181 meters (594 feet)",
        type: "Single Plunge Waterfall",
        river: "Joranda Stream",
        description: "A breathtaking single-drop waterfall cascading off a vertical rock wall into a mist-shrouded abyss. Located in the core area of Simlipal with an elevated viewing deck.",
        icon: "💧"
    }
];

const MELANISTIC_TIGERS = {
    title: "The World's Only Wild Melanistic (Black) Tigers",
    overview: "Simlipal is world-famous as the ONLY natural habitat on Earth where wild melanistic (black) tigers exist.",
    genetics: "Melanistic tigers are not a separate species or sub-species; they possess a rare recessive gene mutation (Transmembrane Peptidase Q gene - LMNP) that causes their black stripes to broaden and merge, almost covering their orange coat.",
    conservationStatus: "Simlipal Tiger Reserve holds the highest concentration of melanistic tigers in the world. Research conducted by NCBS (National Centre for Biological Sciences) confirmed that over 60% of Simlipal's tigers carry this unique genetic coat trait.",
    significance: "Strict anti-poaching patrols and core area protection ensure the survival of this rare genetic treasure."
};

const ELEPHANTS_WILDLIFE = [
    {
        id: "asian-elephant",
        name: "Asian Elephant",
        scientificName: "Elephas maximus",
        status: "Endangered",
        icon: "🐘",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg",
        description: "Simlipal forms the core of the Mayurbhanj Elephant Reserve, supporting over 400+ wild elephants roaming between high grassy plateaus and river valleys."
    },
    {
        id: "sambar-deer",
        name: "Sambar Deer",
        scientificName: "Rusa unicolor",
        status: "Vulnerable",
        icon: "🦌",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Swamp_Deer_Barasingha.jpg/800px-Swamp_Deer_Barasingha.jpg",
        description: "Largest Asiatic deer species, serving as the primary wild prey base for tigers and leopards throughout Simlipal's core forest."
    },
    {
        id: "hill-myna",
        name: "Hill Myna",
        scientificName: "Gracula religiosa",
        status: "Least Concern",
        icon: "🐦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Great_Hornbill_Keoladeo.jpg/800px-Great_Hornbill_Keoladeo.jpg",
        description: "Renowned for its vocal mimicry. Flocks nest in the tall hollows of ancient Sal trees throughout the sanctuary."
    },
    {
        id: "mugger-crocodile",
        name: "Mugger Crocodile",
        scientificName: "Crocodylus palustris",
        status: "Vulnerable",
        icon: "🐊",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg/800px-Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg",
        description: "Bred and conserved at the Ramtirtha Crocodile Breeding Center near Jashipur and released into Simlipal's clean rivers."
    }
];

const FOREST_TYPES = [
    {
        id: "forest-sal",
        name: "Tropical Moist Deciduous & Sal Forests",
        icon: "🌲",
        flora: "Shorea robusta (Sal), Terminalia tomentosa (Asan), Pterocarpus marsupium (Bija), Anogeissus latifolia",
        description: "Dominates over 70% of Simlipal. Towering Sal trees create thick green canopies that drop leaves in dry spring, paving forest floors in golden leaf beds."
    },
    {
        id: "forest-semi-evergreen",
        name: "Semi-Evergreen & Riparian Forests",
        icon: "🌿",
        flora: "Syzygium cumini (Jamun), Mango, Ferns, Mosses, Stream-bank Canes",
        description: "Flourishes along moist river valleys, ravines, and perennial streams near Barehipani and Joranda waterfalls."
    },
    {
        id: "forest-orchids",
        name: "Epiphytic Orchid Flora (94+ Species)",
        icon: "🌺",
        flora: "Dendrobium moschatum, Rhynchostylis retusa (Foxtail Orchid), Cymbidium, Bulbophyllum",
        description: "Simlipal is an orchid paradise boasting 94 species of wild orchids (including 9 endemic species) blooming in vibrant violet, pink, and white across tree trunks during May and June."
    },
    {
        id: "forest-grassland",
        name: "High Plateau Grasslands",
        icon: "🌾",
        flora: "Themeda, Imperata, Heteropogon grasses",
        description: "Open grassy rolling plateaus atop Meghasani and Khairiburu peaks offering panoramic vistas and grazing for Sambar and Gaur."
    }
];

const TRIBAL_COMMUNITIES = [
    {
        name: "Santhal Tribe",
        icon: "🏹",
        description: "One of India's largest indigenous Austroasiatic tribes. Renowned for their vibrant Baha and Sohrai festivals, exquisite wall paintings, and deep ecological reverence for the Sal forest."
    },
    {
        name: "Ho Tribe",
        icon: "🥁",
        description: "Traditional forest dwellers practicing sustainable farming, herbal medicine, and folk drumming traditions."
    },
    {
        name: "Mankidia & Khadia Tribes",
        icon: "🌴",
        description: "Particularly Vulnerable Tribal Groups (PVTGs) skilled in harvesting Siali fiber rope, gathering wild honey, and collecting non-timber forest produce without harming trees."
    },
    {
        name: "Bathudi Tribe",
        icon: "🌾",
        description: "Indigenous agricultural community with rich oral folklore celebrating river spirits and forest deities."
    }
];

const HISTORY_TIMELINE = [
    {
        year: "1973",
        title: "Project Tiger Declaration",
        description: "Chosen as one of the 9 original Tiger Reserves designated during the launch of Project Tiger."
    },
    {
        year: "1979",
        title: "Wildlife Sanctuary Notification",
        description: "Declared a Wildlife Sanctuary spanning 2,200 km² by the Government of Odisha."
    },
    {
        year: "1980",
        title: "National Park Establishment",
        description: "Core area of 845 km² officially notified as Simlipal National Park."
    },
    {
        year: "2009",
        title: "UNESCO Biosphere Reserve Network",
        description: "Inscribed into the UNESCO World Network of Biosphere Reserves on May 27, 2009."
    },
    {
        year: "2021–Present",
        title: "Black Tiger Genetic Discovery",
        description: "Scientific DNA research confirms the LMNP gene mutation responsible for Simlipal's unique melanistic tigers."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "spot-pithabata",
        name: "Pithabata Entry Gate & Museum",
        category: "gate",
        x: 18,
        y: 65,
        description: "Southern entry gate near Baripada town, tourist permit counter, and nature interpretation center."
    },
    {
        id: "spot-jashipur",
        name: "Jashipur Northern Entrance",
        category: "gate",
        x: 25,
        y: 28,
        description: "Northern gateway town leading to Ramtirtha Crocodile Center and Sathkosia forest range."
    },
    {
        id: "spot-barehipani",
        name: "Barehipani Waterfall (399m)",
        category: "fall",
        x: 48,
        y: 45,
        description: "India's 2nd highest waterfall dropping 399 meters over Meghasani cliff."
    },
    {
        id: "spot-joranda",
        name: "Joranda Waterfall Viewpoint",
        category: "fall",
        x: 58,
        y: 38,
        description: "181-meter single plunge waterfall with elevated observation deck."
    },
    {
        id: "spot-chala",
        name: "Chala Core Tiger Zone",
        category: "tiger",
        x: 72,
        y: 52,
        description: "Restricted core tiger habitat and primary territory for melanistic black tigers."
    },
    {
        id: "spot-ramtirtha",
        name: "Ramtirtha Crocodile Center",
        category: "center",
        x: 32,
        y: 18,
        description: "Mugger crocodile conservation and captive breeding center at Jashipur."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Neofelis_nebulosa.jpg/800px-Neofelis_nebulosa.jpg",
        title: "Melanistic Black Tiger",
        caption: "Rare pseudo-melanistic tiger with merged black stripes endemic to Simlipal."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Pushpawati_river_inside_the_Valley_of_Flowers_Uttarakhand_I.jpg/800px-Pushpawati_river_inside_the_Valley_of_Flowers_Uttarakhand_I.jpg",
        title: "Barehipani Waterfall Cascade",
        caption: "India's 2nd highest waterfall plunging 399m over Meghasani cliff."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg",
        title: "Mayurbhanj Elephant Herd",
        caption: "Wild elephant herd in Simlipal's lush Sal forest corridor."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Golden_Langur_Manas.jpg/800px-Golden_Langur_Manas.jpg",
        title: "Sal Forest Canopy & Orchids",
        caption: "Dense Sal tree canopy draped in wild flowering orchids."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SIMLIPAL_INFO,
        WATERFALLS,
        MELANISTIC_TIGERS,
        ELEPHANTS_WILDLIFE,
        FOREST_TYPES,
        TRIBAL_COMMUNITIES,
        HISTORY_TIMELINE,
        MAP_HOTSPOTS,
        GALLERY_IMAGES
    };
}
