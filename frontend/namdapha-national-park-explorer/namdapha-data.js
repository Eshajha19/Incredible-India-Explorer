/**
 * Namdapha National Park Explorer — Data Module
 * Comprehensive dataset covering geography, altitudinal gradient, four big cats,
 * rare mammals, birdlife catalog, trekking routes, map hotspots, and gallery.
 */

const NAMDAPHA_INFO = {
    id: "namdapha",
    name: "Namdapha National Park",
    location: "Changlang District, Arunachal Pradesh, India",
    state: "Arunachal Pradesh",
    coordinates: { lat: 27.4917, lng: 96.3833 },
    area: "1,985 km² (Core: 1,808 km², Buffer: 177 km²)",
    establishedYear: 1983,
    tigerReserveYear: 1983,
    tentativeUNESCOYear: 2006,
    altitudeRange: "200 m to 4,571 m (Daphabum Peak)",
    climate: "Subtropical Monsoon with heavy equatorial rainfall (over 2,500 mm annually)",
    bestTime: "October to April (Dry Season; ideal for trekking and birding)",
    entryFees: "₹50 (Indian Nationals), ₹500 (Foreigners), Camera Fee: ₹100, Guide Fee: ₹500/day",
    nearestTransport: {
        railway: "Tinsukia Junction, Assam (140 km)",
        airport: "Dibrugarh Airport, Assam (160 km)",
        gatewayTown: "Miao Town, Changlang District (20 km to Deban)"
    },
    quickStats: [
        { label: "Park Area", value: "1,985 km²", icon: "🏞️" },
        { label: "Altitude Span", value: "200m–4,571m", icon: "🏔️" },
        { label: "Big Cat Species", value: "4 Feline Species", icon: "🐆" },
        { label: "Bird Species", value: "425+", icon: "🦅" },
        { label: "Mammal Species", value: "96+", icon: "🦧" },
        { label: "Flowering Plants", value: "1,000+", icon: "🌺" }
    ]
};

const ALTITUDE_ZONES = [
    {
        id: "zone-lowland",
        name: "Lowland Tropical Evergreen Rainforest",
        range: "200 m – 1,000 m",
        icon: "🌴",
        flora: "Dipterocarpus macrocarpus (Hollong), Shorea assamica, Wild Musa (Banana), Tree Ferns",
        fauna: "Clouded Leopard, Common Leopard, Bengal Tiger, Hoolock Gibbon, Asian Elephant, Hornbills",
        description: "Dense, multi-tiered evergreen canopy with thick woody lianas, giant buttressed trees, and lush undergrowth along the Noa-Dihing and Namdapha river valleys."
    },
    {
        id: "zone-subtropical",
        name: "Subtropical Pine & Broadleaf Forest",
        range: "1,000 m – 2,000 m",
        icon: "🌲",
        flora: "Pinus merkusii (Tenasserim Pine), Quercus (Oak), Castanopsis, Blue Vanda Orchids",
        fauna: "Red Panda, Clouded Leopard, Marbled Cat, Rufous-necked Hornbill, Flying Squirrels",
        description: "Transitional forest zone where tropical rainforest blends into subtropical pine woods. High density of epiphytic orchids and moss-draped branches."
    },
    {
        id: "zone-temperate",
        name: "Temperate Wet Deciduous & Conifer",
        range: "2,000 m – 3,500 m",
        icon: "🍁",
        flora: "Rhododendron arboreum, Abies densa (Silver Fir), Acer (Maple), Bamboo thickets",
        fauna: "Snow Leopard, Red Panda, Mishmi Takin, Musk Deer, Blyth's Tragopan, Ward's Trogon",
        description: "Cool, misty mountain zone featuring impenetrable bamboo brakes, blooming rhododendrons in spring, and mossy conifer stands."
    },
    {
        id: "zone-alpine",
        name: "Alpine Meadows & Snow Peaks",
        range: "3,500 m – 4,571 m",
        icon: "🏔️",
        flora: "Alpine grasses, Dwarf Junipers, Primula, Saxifraga, Lichens",
        fauna: "Snow Leopard, Blue Sheep (Bharal), Himalayan Black Bear, Grandala",
        description: "Rugged alpine terrain culminating at Daphabum Peak (4,571 m). Covered in heavy snow during winter, blooming with alpine wildflowers in short summer."
    }
];

const FOUR_BIG_CATS = [
    {
        id: "snow-leopard",
        name: "Snow Leopard",
        scientificName: "Panthera uncia",
        status: "Vulnerable",
        habitat: "High Altitude Alpine Meadows & Rocky Crags (above 3,000 m)",
        icon: "🐆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Snow_leopard_portrait.jpg/800px-Snow_leopard_portrait.jpg",
        description: "The elusive 'ghost of the mountains' inhabits the snowbound upper reaches of Daphabum Peak. Namdapha is one of the few places where its range overlaps with tropical big cats.",
        adaptations: "Thick smoky-grey fur with dark rosettes, wide paws for walking on snow, and a long bushy tail used for balance and warmth."
    },
    {
        id: "clouded-leopard",
        name: "Clouded Leopard",
        scientificName: "Neofelis nebulosa",
        status: "Vulnerable",
        habitat: "Dense Lowland & Subtropical Evergreen Forests (200m–2,000m)",
        icon: "🐆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Neofelis_nebulosa.jpg/800px-Neofelis_nebulosa.jpg",
        description: "Arboreal master of the rainforest canopy. Possesses large cloud-like coat markings and exceptionally long canine teeth relative to skull size.",
        adaptations: "Flexible ankle joints allowing it to descend trees head-first and hang from branches by its hind paws."
    },
    {
        id: "common-leopard",
        name: "Indian Leopard",
        scientificName: "Panthera pardus fusca",
        status: "Vulnerable",
        habitat: "Mid-elevation Broadleaf Forests & River Valleys",
        icon: "🐆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Indian_leopard.jpg/800px-Indian_leopard.jpg",
        description: "Adaptable predator ranging from lowland forests to upper temperate hills. Hunts deer, wild boar, and smaller mammals.",
        adaptations: "Powerful muscular body built for hauling prey up into tree branches away from scavengers."
    },
    {
        id: "bengal-tiger",
        name: "Bengal Tiger",
        scientificName: "Panthera tigris tigris",
        status: "Endangered",
        habitat: "Riverine Grasslands & Lowland Valleys (Noa-Dihing Basin)",
        icon: "🐅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/800px-Tiger_in_Ranthambhore.jpg",
        description: "Apex predator of Namdapha Tiger Reserve. Wanders the dense riverine forests and bamboo groves of the Noa-Dihing valley.",
        adaptations: "Camouflaged striped coat perfectly suited for dense tropical undergrowth and river reed beds."
    }
];

const RARE_MAMMALS = [
    {
        id: "red-panda",
        name: "Red Panda",
        scientificName: "Ailurus fulgens",
        status: "Endangered",
        icon: "🦊",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Red_Panda_in_a_Tree.jpg/800px-Red_Panda_in_a_Tree.jpg",
        description: "Arboreal mammal with reddish-brown fur and a ringed tail. Inhabits temperate bamboo and oak forests between 2,000m and 3,200m elevation in Namdapha."
    },
    {
        id: "hoolock-gibbon",
        name: "Western Hoolock Gibbon",
        scientificName: "Hoolock hoolock",
        status: "Endangered",
        icon: "🦧",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Western_Hoolock_Gibbon_male_2.jpg/800px-Western_Hoolock_Gibbon_male_2.jpg",
        description: "India's ONLY ape species. Famous for vocal haunting morning duets echoing across the dense rainforest canopy."
    },
    {
        id: "mishmi-takin",
        name: "Mishmi Takin",
        scientificName: "Budorcas taxicolor taxicolor",
        status: "Vulnerable",
        icon: "🐂",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mishmi_Takin.jpg/800px-Mishmi_Takin.jpg",
        description: "Stocky ungulate adapted to steep alpine cliffs and dense bamboo thickets. Migrates vertically down to river valleys in winter."
    },
    {
        id: "namdapha-flying-squirrel",
        name: "Namdapha Flying Squirrel",
        scientificName: "Biswamoyopterus biswasi",
        status: "Critically Endangered (Endemic)",
        icon: "🐿️",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flying_squirrel_in_tree.jpg/800px-Flying_squirrel_in_tree.jpg",
        description: "Critically endangered arboreal mammal endemic to Namdapha National Park. Known only from a single specimen collected in 1981 at Deban."
    }
];

const BIRDLIFE = [
    {
        id: "great-hornbill",
        name: "Great Indian Hornbill",
        scientificName: "Buceros bicornis",
        category: "hornbills",
        status: "Vulnerable",
        season: "Year-Round",
        wingspan: "150 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Great_Hornbill_Keoladeo.jpg/800px-Great_Hornbill_Keoladeo.jpg",
        description: "Massive bird with bright yellow and black casque atop its bill. Key seed disperser in Namdapha's primary rainforests.",
        callNote: "Resonant, roaring 'kok-kok' heard across valleys."
    },
    {
        id: "rufous-necked-hornbill",
        name: "Rufous-necked Hornbill",
        scientificName: "Aceros nipalensis",
        category: "hornbills",
        status: "Vulnerable",
        season: "Year-Round",
        wingspan: "140 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Rufous-necked_Hornbill.jpg/800px-Rufous-necked_Hornbill.jpg",
        description: "Striking hornbill with rufous head and neck in males. Thrives in undisturbed mid-elevation evergreen canopy.",
        callNote: "Bark-like 'kup-kup' calls."
    },
    {
        id: "white-winged-wood-duck",
        name: "White-winged Wood Duck",
        scientificName: "Asarcornis scutulata",
        category: "waterfowl",
        status: "Endangered",
        season: "Year-Round",
        wingspan: "130–150 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/White-winged_Wood_Duck.jpg/800px-White-winged_Wood_Duck.jpg",
        description: "Arunachal Pradesh's state bird. Secretive forest duck that roosts in tree hollows and feeds in shady jungle pools.",
        callNote: "Ghostly, trumpet-like call at dusk and dawn."
    },
    {
        id: "blyths-tragopan",
        name: "Blyth's Tragopan",
        scientificName: "Tragopan blythii",
        category: "gamebirds",
        status: "Vulnerable",
        season: "Year-Round",
        wingspan: "70 cm",
        icon: "🦚",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Blyths_Tragopan.jpg/800px-Blyths_Tragopan.jpg",
        description: "Colorful pheasant of dense oak-rhododendron understorey. Males display bright yellow facial skin and horn-like wattles.",
        callNote: "Loud, mournful 'kwaa-kwaa' courtship call."
    },
    {
        id: "wards-trogon",
        name: "Ward's Trogon",
        scientificName: "Harpactes wardi",
        category: "passerines",
        status: "Near Threatened",
        season: "Year-Round",
        wingspan: "45 cm",
        icon: "🐦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Wards_Trogon.jpg/800px-Wards_Trogon.jpg",
        description: "Rare Eastern Himalayan specialty bird. Males possess maroon-red underparts and yellow bill, perching motionless in subtropical forest mid-canopy.",
        callNote: "Soft whistling 'cluck-cluck'."
    },
    {
        id: "purple-cochoa",
        name: "Purple Cochoa",
        scientificName: "Cochoa purpurea",
        category: "passerines",
        status: "Least Concern",
        season: "Summer Breeder",
        wingspan: "35 cm",
        icon: "🐦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Purple_Cochoa.jpg/800px-Purple_Cochoa.jpg",
        description: "Mysterious thrush-like bird of high canopy. Males feature rich purple-blue plumage with silver crown.",
        callNote: "High-pitched, prolonged whistle."
    }
];

const TREKKING_ROUTES = [
    {
        id: "trek-1",
        title: "Deban to Haldibari Jungle Trail",
        distance: "11 km (One Way)",
        duration: "4–5 hours",
        difficulty: "Moderate",
        terrain: "Dense Subtropical Rainforest & River Crossings",
        camps: ["Deban Forest Rest House", "Haldibari Campsite"],
        description: "Crosses the Noa-Dihing River by country boat into dense primary rainforest. Ideal for spotting Hoolock Gibbons, Hornbills, and rainforest flora."
    },
    {
        id: "trek-2",
        title: "Haldibari to Hornbill Camp Trail",
        distance: "11 km (One Way)",
        duration: "5–6 hours",
        difficulty: "Moderate to Challenging",
        terrain: "Bamboo Brakes & Ridge Trails",
        camps: ["Haldibari Campsite", "Hornbill Glade Camp"],
        description: "Ascends deeper into the core wilderness area. Hornbill Glade is named after the massive nesting colonies of Great and Wreathed Hornbills."
    },
    {
        id: "trek-3",
        title: "Hornbill to Firmbase Wilderness Expedition",
        distance: "25 km (One Way)",
        duration: "2 Days (Overnight Camp)",
        difficulty: "Challenging",
        terrain: "Primary Jungle, Stream Beds, Elevation Rise",
        camps: ["Hornbill Camp", "Bulbulia Camp", "Firmbase Camp"],
        description: "A deep wilderness expedition following the Namdapha River valley. Firmbase was an old WWII air drop site; rich in big cat tracks and Red Panda habitat."
    },
    {
        id: "trek-4",
        title: "Daphabum Peak Alpine Expedition",
        distance: "65 km (Round Trip)",
        duration: "7–9 Days Expedition",
        difficulty: "Strenuous (High Altitude)",
        terrain: "Rainforest, Rhododendron Ridge, Snowfields",
        camps: ["Firmbase", "Gandhigram", "Daphabum Base Camp"],
        description: "The ultimate expedition in Namdapha ascending to Daphabum Peak (4,571 m), the highest point in the park. Offers panoramic views of the Patkai and Himalayan ranges."
    }
];

const HISTORY_TIMELINE = [
    {
        year: "1940s",
        title: "WWII Stillwell Road & Hump Route",
        description: "During World War II, the region saw Allied air routes ('The Hump') over the Himalayas to China. Aircraft remnants still lie in remote parts of the park."
    },
    {
        year: "1972",
        title: "Declared Wildlife Sanctuary",
        description: "Recognized for its pristine rainforest wilderness and officially declared a Wildlife Sanctuary under the Assam Forest Regulation."
    },
    {
        year: "1983",
        title: "Established as National Park & Tiger Reserve",
        description: "Upgraded to National Park status on June 9, 1983, and simultaneously designated as India's 15th Tiger Reserve under Project Tiger."
    },
    {
        year: "1981",
        title: "Discovery of Namdapha Flying Squirrel",
        description: "Renowned zoologist Dr. Shyamrup Biswas collects the first and only known specimen of the endemic Namdapha Flying Squirrel at Deban."
    },
    {
        year: "2006",
        title: "UNESCO World Heritage Tentative List",
        description: "Nominated to India's UNESCO World Heritage Tentative List under Natural Criteria for its remarkable altitudinal gradient and big cat diversity."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "spot-miao",
        name: "Miao Entry Gate & Museum",
        category: "gate",
        x: 12,
        y: 65,
        description: "Gateway town, Field Director Office, Inner Line Permit check post, and Namdapha Eco-Museum."
    },
    {
        id: "spot-deban",
        name: "Deban Forest Lodge & River Bank",
        category: "base",
        x: 28,
        y: 58,
        description: "Primary basecamp on the banks of Noa-Dihing River. Country boat river crossing point into core rainforest."
    },
    {
        id: "spot-haldibari",
        name: "Haldibari Campsite",
        category: "camp",
        x: 42,
        y: 48,
        description: "First jungle camp across the river; surrounded by giant Hollong trees and gibbon troops."
    },
    {
        id: "spot-hornbill",
        name: "Hornbill Glade Camp",
        category: "camp",
        x: 58,
        y: 40,
        description: "Natural forest glade famous for evening roosting flights of hundreds of hornbills."
    },
    {
        id: "spot-firmbase",
        name: "Firmbase Remote Camp",
        category: "camp",
        x: 74,
        y: 32,
        description: "Deep jungle camp along Namdapha River. Prime territory for Clouded Leopard and Red Panda sightings."
    },
    {
        id: "spot-daphabum",
        name: "Daphabum Peak (4,571m)",
        category: "peak",
        x: 88,
        y: 18,
        description: "Highest peak in Namdapha National Park. Snow-capped summit with alpine meadows and snow leopard territory."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Neofelis_nebulosa.jpg/800px-Neofelis_nebulosa.jpg",
        title: "Clouded Leopard in Rainforest",
        caption: "Master of the rainforest canopy in Namdapha National Park."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Red_Panda_in_a_Tree.jpg/800px-Red_Panda_in_a_Tree.jpg",
        title: "Red Panda in Temperate Canopy",
        caption: "Endangered Red Panda foraging in the high bamboo and rhododendron forests."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Snow_leopard_portrait.jpg/800px-Snow_leopard_portrait.jpg",
        title: "Snow Leopard of Daphabum",
        caption: "High altitude feline inhabiting snowfields above 3,500 meters."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Great_Hornbill_Keoladeo.jpg/800px-Great_Hornbill_Keoladeo.jpg",
        title: "Great Indian Hornbill",
        caption: "Iconic canopy bird dispersing seeds across Namdapha's primary rainforests."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Western_Hoolock_Gibbon_male_2.jpg/800px-Western_Hoolock_Gibbon_male_2.jpg",
        title: "Hoolock Gibbon Canopy Duet",
        caption: "India's only ape species singing morning duets across the treetops."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NAMDAPHA_INFO,
        ALTITUDE_ZONES,
        FOUR_BIG_CATS,
        RARE_MAMMALS,
        BIRDLIFE,
        TREKKING_ROUTES,
        HISTORY_TIMELINE,
        MAP_HOTSPOTS,
        GALLERY_IMAGES
    };
}
