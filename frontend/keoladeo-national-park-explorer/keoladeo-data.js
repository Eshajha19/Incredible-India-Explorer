/**
 * Keoladeo National Park Explorer — Data Module
 * Comprehensive dataset covering UNESCO World Heritage details, Ramsar wetland ecology,
 * bird species catalog, cycling routes, historical timeline, interactive map hotspots, and gallery.
 */

const KEOLADEO_INFO = {
    id: "keoladeo",
    name: "Keoladeo National Park",
    aka: "Bharatpur Bird Sanctuary",
    location: "Bharatpur, Rajasthan, India",
    state: "Rajasthan",
    coordinates: { lat: 27.1583, lng: 77.5222 },
    area: "29 km² (2,900 hectares)",
    establishedYear: 1982,
    ramsarYear: 1981,
    unescoYear: 1985,
    unescoCriteria: "Criteria (x) — Outstanding habitat for endangered species and waterfowl concentration",
    climate: "Semi-Arid Monsoon with distinct seasonal wetland inundation",
    bestTime: "October to March (Peak Migratory Waterfowl Season); August to November (Resident Breeding Season)",
    entryFees: "₹75 (Indian Nationals), ₹500 (Foreign Nationals), Bicycle Rental: ₹50–100/day",
    nearestTransport: {
        railway: "Bharatpur Junction (5 km)",
        airport: "Agra Airport (54 km) / Jaipur Airport (180 km)",
        highway: "NH 21 (Jaipur-Agra Highway)"
    },
    quickStats: [
        { label: "Bird Species", value: "370+", icon: "🦅" },
        { label: "Wetland Area", value: "29 km²", icon: "🌾" },
        { label: "UNESCO Inscribed", value: "1985", icon: "🏛️" },
        { label: "Ramsar Designated", value: "1981", icon: "💧" },
        { label: "Wintering Waterfowl", value: "100,000+", icon: "🦆" },
        { label: "Cycling Trails", value: "4 Routes", icon: "🚲" }
    ]
};

const WETLAND_HYDROLOGY = {
    overview: "Keoladeo is a mosaic of dry grasslands, woodlands, woodland swamps, and wetlands. Uniquely, this oasis in the dry Gangetic plain is a man-made wetland system supplied with water via canals from the Ajan Bund reservoir.",
    waterSource: "Ajan Bund, a temporary reservoir fed by the Gambhir and Banganga rivers. Water is released through sluice gates into the park's 10 dyked blocks.",
    seasons: [
        {
            name: "Monsoon Inundation",
            months: "July – September",
            icon: "🌧️",
            description: "Ajan Bund water is released into the park. Marshes fill up to 1-2 meters. Micro-organisms, aquatic flora (Hydrilla, Vallisneria), and fish multiply rapidly.",
            highlight: "Massive nesting of resident waders (Painted Storks, Herons, Cormorants) in acacia babul trees."
        },
        {
            name: "Winter Migratory Peak",
            months: "October – February",
            icon: "❄️",
            description: "Water levels stabilize. Over 100,000 migratory waterfowl arrive from Siberia, Central Asia, Tibet, and Northern Europe via the Central Asian Flyway.",
            highlight: "High concentration of ducks, geese, cranes, and pelicans feeding on tubers, plants, and fish."
        },
        {
            name: "Spring Evaporation",
            months: "March – April",
            icon: "🌱",
            description: "Water recedes gradually, exposing mudflats rich in benthic invertebrates. Migratory birds begin northbound flights.",
            highlight: "Excellent sightings of raptors and shorebirds foraging in shallow waters."
        },
        {
            name: "Summer Dry Season",
            months: "May – June",
            icon: "☀️",
            description: "Marshes dry up into cracked clay. Land mammals (Nilgai, Sambar, Spotted Deer, Wild Boar) gather around remaining water holes.",
            highlight: "Reptile activity peaks; Pythons and Monitor Lizards bask in sunny clearings."
        }
    ]
};

const FLYWAY_INFO = {
    name: "Central Asian Flyway (CAF)",
    coverage: "Extends from Northern Siberia, through Central Asia and the Himalayas, down to the Indian subcontinent.",
    siberianCraneStory: "Keoladeo was historically famous as the sole wintering refuge in India for the central population of the Critically Endangered Siberian Crane (Leucogeranus leucogeranus), which flew 6,400 km from the Ob River region in Russia. Though the last wintering pair was recorded at Bharatpur in 2002, Keoladeo remains a critical wetland icon for crane conservation.",
    keyOriginRegions: [
        { region: "Western & Central Siberia", distance: "5,000 – 6,500 km", species: "Pintails, Shovelers, Common Teal, Siberian Rubythroat" },
        { region: "Tibetan Plateau & High Himalayas", distance: "1,500 – 2,500 km", species: "Bar-headed Goose, Ruddy Shelduck, Black-necked Crane (stray)" },
        { region: "Central Asian Steppes & Kazakh Lakes", distance: "3,500 – 4,500 km", species: "Gadwall, Wigeon, Mallard, Ferruginous Duck" },
        { region: "Northern Europe & Black Sea", distance: "4,000 – 5,500 km", species: "Garganey, Common Pochard, Osprey" }
    ]
};

const BIRD_SPECIES = [
    {
        id: "painted-stork",
        name: "Painted Stork",
        scientificName: "Mycteria leucocephala",
        category: "migratory-waterfowl",
        categoryLabel: "Resident & Local Migrant",
        status: "Near Threatened",
        season: "August to March (Breeding Peak)",
        diet: "Small fish, frogs, crustaceans",
        wingspan: "150–160 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Painted_Stork_Keoladeo.jpg/800px-Painted_Stork_Keoladeo.jpg",
        description: "Distinctive pink tertiary feathers, bright yellow bill, and black breast band. Over 2,000 pairs nest atop Acacia babul trees in Bharatpur every autumn.",
        phoneticCall: "Silent at rest; clatters bill loudly near nests."
    },
    {
        id: "siberian-crane",
        name: "Siberian Crane",
        scientificName: "Leucogeranus leucogeranus",
        category: "endangered",
        categoryLabel: "Critically Endangered (Historic)",
        status: "Critically Endangered",
        season: "November to February (Historic Visitor)",
        diet: "Water lily tubers, sedge roots, aquatic plants",
        wingspan: "210–230 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Siberian_Crane_Leucogeranus_leucogeranus.jpg/800px-Siberian_Crane_Leucogeranus_leucogeranus.jpg",
        description: "Snow-white plumage with stark red face mask and black primary flight feathers. Flew over 6,000 km across Asia to winter in Keoladeo's shallow marshes.",
        phoneticCall: "High-pitched flute-like 'kroo-kroo' call."
    },
    {
        id: "sarus-crane",
        name: "Sarus Crane",
        scientificName: "Antigone antigone",
        category: "endangered",
        categoryLabel: "Vulnerable Resident",
        status: "Vulnerable",
        season: "Year-Round",
        diet: "Tubers, roots, insects, frogs, small snakes",
        wingspan: "220–250 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sarus_Crane_Keoladeo.jpg/800px-Sarus_Crane_Keoladeo.jpg",
        description: "The world's tallest flying bird, standing up to 1.8 meters tall. Known for lifelong monogamous pair bonds and dramatic courtship dancing displays.",
        phoneticCall: "Resonant Bugling 'ka-kurrr'."
    },
    {
        id: "bar-headed-goose",
        name: "Bar-headed Goose",
        scientificName: "Anser indicus",
        category: "migratory-waterfowl",
        categoryLabel: "High-Altitude Migrant",
        status: "Least Concern",
        season: "November to March",
        diet: "Grasses, crops, tubers, water plants",
        wingspan: "140–160 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bar-headed_Geese_in_Keoladeo.jpg/800px-Bar-headed_Geese_in_Keoladeo.jpg",
        description: "Famous for migrating over the high Himalayas at altitudes exceeding 8,000 meters. Recognized by two black bars around the back of its white head.",
        phoneticCall: "Nasal goose-like honking 'aang-aang'."
    },
    {
        id: "black-necked-stork",
        name: "Black-necked Stork",
        scientificName: "Ephippiorhynchus asiaticus",
        category: "endangered",
        categoryLabel: "Near Threatened Resident",
        status: "Near Threatened",
        season: "Year-Round",
        diet: "Large fish, water snakes, frogs, crabs",
        wingspan: "230–270 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Black-necked_Stork_Keoladeo.jpg/800px-Black-necked_Stork_Keoladeo.jpg",
        description: "Striking black and white stork with iridescent blue-green neck, massive black bill, and bright red legs. Solitary hunter in deep marsh zones.",
        phoneticCall: "Bill-clattering during courtship ritual."
    },
    {
        id: "crested-serpent-eagle",
        name: "Crested Serpent Eagle",
        scientificName: "Spilornis cheela",
        category: "raptors",
        categoryLabel: "Resident Raptor",
        status: "Least Concern",
        season: "Year-Round",
        diet: "Snakes, lizards, frogs, small mammals",
        wingspan: "120–155 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Crested_Serpent_Eagle_Keoladeo.jpg/800px-Crested_Serpent_Eagle_Keoladeo.jpg",
        description: "Medium-large raptor with black crest, yellow facial skin, and white spotted underparts. Soars high above woodland borders searching for snakes.",
        phoneticCall: "High whistle 'kluee-wip-wip'."
    },
    {
        id: "greater-flamingo",
        name: "Greater Flamingo",
        scientificName: "Phoenicopterus roseus",
        category: "migratory-waterfowl",
        categoryLabel: "Winter Visitor",
        status: "Least Concern",
        season: "December to February (Occasional)",
        diet: "Algae, diatoms, small crustaceans",
        wingspan: "140–165 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Greater_Flamingo_Bharatpur.jpg/800px-Greater_Flamingo_Bharatpur.jpg",
        description: "Tallest flamingo species with pinkish-white plumage and crimson wing coverts. Filters mud using its downward-curved bill in saline wetland patches.",
        phoneticCall: "Goose-like honking 'ka-hank'."
    },
    {
        id: "spot-billed-pelican",
        name: "Spot-billed Pelican",
        scientificName: "Pelecanus philippensis",
        category: "resident-waders",
        categoryLabel: "Near Threatened Resident",
        status: "Near Threatened",
        season: "October to March",
        diet: "Fish (hunts in cooperative groups)",
        wingspan: "220–250 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Spot-billed_Pelican_Keoladeo.jpg/800px-Spot-billed_Pelican_Keoladeo.jpg",
        description: "Greyish-white pelican with spotted upper mandible and large pinkish pouch used to scoop schools of fish from open water bodies.",
        phoneticCall: "Grunting 'huff-huff' at nesting roosts."
    },
    {
        id: "asian-openbill",
        name: "Asian Openbill",
        scientificName: "Anastomus oscitans",
        category: "resident-waders",
        categoryLabel: "Resident Wader",
        status: "Least Concern",
        season: "July to December (Breeding)",
        diet: "Apple snails (Pila globosa), water molluscs",
        wingspan: "140–150 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Asian_Openbill_Keoladeo.jpg/800px-Asian_Openbill_Keoladeo.jpg",
        description: "Greyish-white stork named after the distinctive gap between the upper and lower mandibles, adapted to extract freshwater snails from shells.",
        phoneticCall: "Clatters bill; squeaky whistle."
    },
    {
        id: "northern-pintail",
        name: "Northern Pintail",
        scientificName: "Anas acuta",
        category: "migratory-waterfowl",
        categoryLabel: "Migratory Dabbling Duck",
        status: "Least Concern",
        season: "October to March",
        diet: "Aquatic plant seeds, roots, invertebrates",
        wingspan: "80–95 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Northern_Pintail_Keoladeo.jpg/800px-Northern_Pintail_Keoladeo.jpg",
        description: "Elegant duck with long slender neck and needle-like central tail feathers in males. Highly migratory dabbler arriving in tens of thousands.",
        phoneticCall: "Soft whistling 'proop-proop'."
    },
    {
        id: "osprey",
        name: "Osprey",
        scientificName: "Pandion haliaetus",
        category: "raptors",
        categoryLabel: "Migratory Raptor",
        status: "Least Concern",
        season: "October to April",
        diet: "Live fish (specialized raptor)",
        wingspan: "150–180 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Osprey_Bharatpur.jpg/800px-Osprey_Bharatpur.jpg",
        description: "Fish-hunting raptor with white head, dark eye stripe, and specialized barbed talons. Performs spectacular feet-first dives into marsh waters.",
        phoneticCall: "Clear piping whistle 'cheep-cheep'."
    },
    {
        id: "siberian-rubythroat",
        name: "Siberian Rubythroat",
        scientificName: "Calliope calliope",
        category: "songbirds",
        categoryLabel: "Migratory Songbird",
        status: "Least Concern",
        season: "November to March",
        diet: "Insects, ants, spiders, small berries",
        wingspan: "22–26 cm",
        icon: "🐦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Siberian_Rubythroat_Keoladeo.jpg/800px-Siberian_Rubythroat_Keoladeo.jpg",
        description: "Small skulking bird of dense underbrush. Males possess a brilliant ruby-red throat patch surrounded by black and white border stripes.",
        phoneticCall: "Loud melodious whistling song."
    }
];

const CYCLING_ROUTES = [
    {
        id: "route-1",
        title: "Main Gate to Keoladeo Temple Trail",
        distance: "1.7 km (One Way)",
        duration: "30–45 mins",
        difficulty: "Easy",
        surface: "Paved Asphalt & Fine Gravel",
        transportOptions: ["Bicycle", "Cycle Rickshaw", "Electric Van", "Walking"],
        highlights: [
            "Shanti Kutir Visitors Information Center",
            "Nursery & Medicinal Botanical Garden",
            "Acacia Babool Nesting Tree Colonies",
            "Historic Keoladeo Shiva Temple"
        ],
        description: "The primary spinal corridor of the sanctuary. Flat, tree-shaded paved road ideal for beginners and casual birdwatchers. Bordered by canals and marsh blocks on both sides."
    },
    {
        id: "route-2",
        title: "Keoladeo Temple to Python Point & Sangoan Gate",
        distance: "3.5 km (One Way)",
        duration: "1.0–1.5 hours",
        difficulty: "Easy to Moderate",
        surface: "Tarred Track & Earthen Bund",
        transportOptions: ["Bicycle", "Cycle Rickshaw", "Walking"],
        highlights: [
            "Python Point (Burrow Basking Spot)",
            "D Block Deep Water Marsh",
            "Greater Spotted Eagle Roosting Trees",
            "Sangoan Southern Boundary Gate"
        ],
        description: "Extends deep into the central wetland block. Highly recommended for spotting Indian Rock Pythons basking outside burrows, Nilgai herds, and raptors perching on dead stumps."
    },
    {
        id: "route-3",
        title: "Mansarovar & Sunkal Bund Loop Trail",
        distance: "5.2 km (Full Loop)",
        duration: "2.0–2.5 hours",
        difficulty: "Moderate",
        surface: "Gravel & Packed Clay Bund",
        transportOptions: ["Bicycle", "Walking"],
        highlights: [
            "Mansarovar Deep Water Reservoir",
            "Sunkal Bund Bird Hide Watchtower",
            "Bar-headed Goose Roosting Mudflats",
            "Sunset Viewpoint over Open Marshes"
        ],
        description: "A panoramic loop track along the elevated earthen dykes (bunds) enclosing the western water blocks. Offers elevated vantage points for photography."
    },
    {
        id: "route-4",
        title: "Kadam Kunj & Koladhar Bird Hide Trail",
        distance: "4.0 km (Round Trip)",
        duration: "1.5–2.0 hours",
        difficulty: "Moderate",
        surface: "Shaded Dirt Path & Wood Boardwalk",
        transportOptions: ["Bicycle", "Walking"],
        highlights: [
            "Ancient Mitragyna parvifolia (Kadam) Tree Grove",
            "Koladhar Submerged Hide",
            "Asian Openbill & Egret Roost",
            "Jackal & Porcupine Burrow Area"
        ],
        description: "Meanders through dense forest patches and quiet marsh nooks. Ideal for songbirds, owls, forest raptors, and shy mammals away from main tourist crowds."
    }
];

const HISTORY_TIMELINE = [
    {
        year: "1760s",
        title: "Creation of Ajan Bund",
        description: "Maharaja Suraj Mal, founder of Bharatpur State, constructs the Ajan Bund dam at the confluence of Gambhir and Banganga rivers to protect Bharatpur city from floods and irrigate surrounding land."
    },
    {
        year: "1850s",
        title: "Development as Royal Duck Shoot Reserve",
        description: "Prince Harbhamji converts the natural depression into a managed water-bird hunting reserve by introducing sluice gates, dykes, and tree mounds."
    },
    {
        year: "1902",
        title: "Inauguration by Lord Curzon",
        description: "Viceroy of India Lord Curzon officially inaugurates the duck shooting reserve. Detailed shooting records carved on stone slabs record thousands of ducks harvested in single royal hunts."
    },
    {
        year: "1956",
        title: "Declared Bird Sanctuary",
        description: "Post-independence, the area is officially notified as a Bird Sanctuary, though shooting rights of the former Maharaja of Bharatpur continue until 1972."
    },
    {
        year: "1981",
        title: "Ramsar Site Designation",
        description: "Designated as a Wetland of International Importance under the UNESCO Ramsar Convention on October 1, 1981."
    },
    {
        year: "1982",
        title: "Established as Keoladeo National Park",
        description: "Upgraded to National Park status on March 10, 1982. Commercial cattle grazing inside the park is prohibited, causing local protests but creating pristine habitat."
    },
    {
        year: "1985",
        title: "UNESCO World Heritage Inscription",
        description: "Inscribed on the UNESCO World Heritage List under Natural Criteria (x) for its global significance as a major wintering ground for Palaearctic migratory waterfowl."
    },
    {
        year: "2012–Present",
        title: "Chambal Water Pipe Pipeline & Habitat Restoration",
        description: "Commissioning of the Goverdhan Drain and Chambal River pipeline project to ensure guaranteed annual water supply during drought years, safeguarding the ecosystem."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "spot-1",
        name: "Main Entrance & Shanti Kutir",
        category: "gate",
        x: 18,
        y: 22,
        description: "Park entry gate, ticket counter, bicycle hire center, guide association, and visitors interpretation museum."
    },
    {
        id: "spot-2",
        name: "Nursery & Botanical Garden",
        category: "flora",
        x: 28,
        y: 35,
        description: "Shaded medicinal botanical garden and tree nursery; excellent spot for flycatchers, warblers, and owls."
    },
    {
        id: "spot-3",
        name: "Keoladeo Shiva Temple",
        category: "heritage",
        x: 42,
        y: 48,
        description: "Ancient temple dedicated to Lord Shiva from which the park derives its name 'Keoladeo'. Central resting point."
    },
    {
        id: "spot-4",
        name: "Python Point",
        category: "wildlife",
        x: 58,
        y: 56,
        description: "Sunny earthen burrows surrounded by grass where Indian Rock Pythons bask during winter mornings."
    },
    {
        id: "spot-5",
        name: "Mansarovar Watchtower",
        category: "hide",
        x: 72,
        y: 38,
        description: "Elevated wooden watchtower overlooking open water blocks populated by thousands of geese and dabbling ducks."
    },
    {
        id: "spot-6",
        name: "Kadam Kunj Forest",
        category: "flora",
        x: 64,
        y: 72,
        description: "Dense woodland grove dominated by Mitragyna trees. Roosting habitat for Spotted Owlets and Dusky Eagle Owls."
    },
    {
        id: "spot-7",
        name: "Sangoan Southern Boundary Gate",
        category: "gate",
        x: 85,
        y: 82,
        description: "Southern tip of the sanctuary bordering agricultural fields. Good spot for Blackbuck and Sarus Crane pairs."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Painted_Stork_Keoladeo.jpg/800px-Painted_Stork_Keoladeo.jpg",
        title: "Painted Stork Colony",
        caption: "Hundreds of Painted Storks nesting in acacia trees across the flooded marshes of Keoladeo."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sarus_Crane_Keoladeo.jpg/800px-Sarus_Crane_Keoladeo.jpg",
        title: "Sarus Crane Pair",
        caption: "A pair of Sarus Cranes standing tall in the golden morning light at Bharatpur."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg/800px-Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg",
        title: "Wetland Landscape at Sunset",
        caption: "Silhouettes of waterfowl against the vibrant sunset skies over the Ajan Bund marshes."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bar-headed_Geese_in_Keoladeo.jpg/800px-Bar-headed_Geese_in_Keoladeo.jpg",
        title: "Bar-headed Geese Flocks",
        caption: "High-altitude trans-Himalayan migrants resting on mudflats."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Black-necked_Stork_Keoladeo.jpg/800px-Black-necked_Stork_Keoladeo.jpg",
        title: "Black-necked Stork in Marsh",
        caption: "Near-threatened Black-necked Stork foraging in the quiet waters of D-Block."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Crested_Serpent_Eagle_Keoladeo.jpg/800px-Crested_Serpent_Eagle_Keoladeo.jpg",
        title: "Crested Serpent Eagle Perch",
        caption: "Resident raptor scanning the woodland canopy for reptiles and amphibians."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        KEOLADEO_INFO,
        WETLAND_HYDROLOGY,
        FLYWAY_INFO,
        BIRD_SPECIES,
        CYCLING_ROUTES,
        HISTORY_TIMELINE,
        MAP_HOTSPOTS,
        GALLERY_IMAGES
    };
}
