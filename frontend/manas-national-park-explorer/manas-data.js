/**
 * Manas National Park Explorer — Data Module
 * Comprehensive dataset covering UNESCO World Heritage status, 5 conservation designations,
 * Golden Langur, Pygmy Hog, Bengal Tiger, Manas River, birdlife, history, interesting facts, map hotspots, and gallery.
 */

const MANAS_INFO = {
    id: "manas",
    name: "Manas National Park",
    aka: "Manas Wildlife Sanctuary",
    location: "Baksa & Chirang Districts, Bodoland Territorial Region, Assam, India",
    state: "Assam",
    coordinates: { lat: 26.6500, lng: 91.0000 },
    area: "950 km² (Core Area: 500 km², Buffer Zone: 2,837 km²)",
    establishedYear: 1990,
    sanctuaryYear: 1928,
    tigerReserveYear: 1973,
    biosphereYear: 1989,
    unescoYear: 1985,
    elephantReserveYear: 2003,
    climate: "Tropical Monsoon with heavy rainfall (3,300 mm annually)",
    bestTime: "October to April (Dry Season)",
    entryFees: "₹100 (Indian Nationals), ₹500 (Foreigners), Jeep Safari: ₹2,000–3,000",
    nearestTransport: {
        railway: "Barpeta Road Railway Station (32 km)",
        airport: "Guwahati LGBI Airport (176 km)",
        highway: "NH 27 (Connecting Barpeta Road to Bansbari Gate)"
    },
    quickStats: [
        { label: "Conservation Statuses", value: "5 Designations", icon: "🛡️" },
        { label: "Park Core Area", value: "500 km²", icon: "🏞️" },
        { label: "UNESCO Inscribed", value: "1985", icon: "🏛️" },
        { label: "Bird Species", value: "450+", icon: "🦅" },
        { label: "Mammal Species", value: "55+", icon: "🐅" },
        { label: "Transboundary Park", value: "India-Bhutan", icon: "🤝" }
    ]
};

const FIVE_STATUSES = [
    {
        title: "UNESCO World Heritage Site",
        year: "1985",
        icon: "🏛️",
        description: "Inscribed under Natural Criteria (ix) and (x) for its outstanding ongoing ecological processes, magnificent scenery, and crucial habitats for endangered species."
    },
    {
        title: "Project Tiger Reserve",
        year: "1973",
        icon: "🐅",
        description: "One of the original 9 Tiger Reserves declared during the launch of Project Tiger in 1973. A critical stronghold for Bengal Tiger conservation."
    },
    {
        title: "Chirang-Ripu Elephant Reserve",
        year: "2003",
        icon: "🐘",
        description: "Encompasses a vital elephant corridor linking India with Royal Manas National Park in Bhutan, supporting over 1,000 Asian Elephants."
    },
    {
        title: "Manas Biosphere Reserve",
        year: "1989",
        icon: "🌐",
        description: "Spans 2,837 km² of buffer forest and contiguous habitats preserving the Eastern Himalayan foothills biodiversity."
    },
    {
        title: "National Park",
        year: "1990",
        icon: "🏞️",
        description: "Officially upgraded to National Park status by the Government of India on September 7, 1990."
    }
];

const MANAS_RIVER_INFO = {
    name: "Manas River System",
    origin: "Originates in the high Himalayas of Bhutan (where it is known as Drangme Chhu) and flows south into Assam.",
    description: "The Manas River is the main river system flowing through the heart of the sanctuary. As it enters the flat alluvial plains of Assam, it splits into two major channels — the Manas River proper and the Beki River — creating rich marshlands, riverine islands, and fertile savannah grasslands.",
    keyFeatures: [
        "Transboundary river shared seamlessly between India and Bhutan",
        "Major right-bank tributary of the mighty Brahmaputra River",
        "Provides vital drinking water and mudflats for wild buffalo, rhinos, and migratory waterfowl",
        "Popular for scenic eco-tourism river rafting from Mathanguri to Bansbari"
    ]
};

const SPECIES_SPOTLIGHT = [
    {
        id: "golden-langur",
        name: "Gee's Golden Langur",
        scientificName: "Trachypithecus geei",
        category: "primate",
        status: "Endangered (Endemic)",
        icon: "🐒",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Golden_Langur_Manas.jpg/800px-Golden_Langur_Manas.jpg",
        description: "One of India's most iconic and endangered primates. Famous for its lustrous golden-apricot coat, dark black face, and long tail. Found ONLY in the forest belt between the Manas and Sankosh rivers along the India-Bhutan border.",
        fact: "Discovered to science in the 1950s by naturalist Edward P. Gee."
    },
    {
        id: "pygmy-hog",
        name: "Pygmy Hog",
        scientificName: "Porcula salvania",
        category: "mammal",
        status: "Critically Endangered (Endemic)",
        icon: "🐗",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Pygmy_hog.jpg/800px-Pygmy_hog.jpg",
        description: "The world's smallest and rarest wild pig species, standing just 25 cm tall and weighing barely 8–10 kg. Extinct across most of its historic range, Manas is its LAST natural refuge.",
        fact: "Saved from immediate extinction through the Pygmy Hog Conservation Programme (PHCP) captive breeding initiative."
    },
    {
        id: "bengal-tiger",
        name: "Bengal Tiger",
        scientificName: "Panthera tigris tigris",
        category: "big-cat",
        status: "Endangered",
        icon: "🐅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/800px-Tiger_in_Ranthambhore.jpg",
        description: "Apex predator of the alluvial grasslands and semi-evergreen forests. Tiger numbers in Manas have rebounded dramatically following anti-poaching patrols and habitat restoration post-2011.",
        fact: "Part of the Transboundary Manas Conservation Area (TraSTCA) shared with Bhutan."
    },
    {
        id: "wild-water-buffalo",
        name: "Wild Water Buffalo",
        scientificName: "Bubalus arnee",
        category: "ungulate",
        status: "Endangered",
        icon: "🐃",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Gaur%28Bos_gaurus%29.jpg/800px-Gaur%28Bos_gaurus%29.jpg",
        description: "Manas holds one of the world's largest remaining pure populations of the wild water buffalo, possessing massive backward-curving horns spreading up to 2 meters.",
        fact: "An essential keystone species for grazing and maintaining open wetland savannah habitats."
    },
    {
        id: "hispid-hare",
        name: "Hispid Hare (Caprolagus hispidus)",
        scientificName: "Caprolagus hispidus",
        category: "small-mammal",
        status: "Endangered",
        icon: "🐇",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg/800px-Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg",
        description: "Also known as the Assam rabbit. Extremely rare nocturnal lagomorph with harsh bristly fur that inhabits tall thatch grass meadows along river channels.",
        fact: "Relies heavily on controlled dry-season grassland burning management."
    },
    {
        id: "one-horned-rhino",
        name: "Great One-Horned Rhinoceros",
        scientificName: "Rhinoceros unicornis",
        category: "ungulate",
        status: "Vulnerable (Reintroduced)",
        icon: "🦏",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg",
        description: "Successfully reintroduced into Manas under the Indian Rhino Vision 2020 (IRV2020) initiative after past poaching wiped out local populations during the 1990s.",
        fact: "Over 50+ rhinos now thrive in Manas's lush grasslands."
    }
];

const BIRDLIFE = [
    {
        id: "bengal-florican",
        name: "Bengal Florican",
        scientificName: "Houbaropsis bengalensis",
        category: "grassland",
        status: "Critically Endangered",
        season: "Year-Round",
        wingspan: "110 cm",
        icon: "🐦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Great_Indian_bustard.jpg/800px-Great_Indian_bustard.jpg",
        description: "One of the rarest bustard species in the world. Males perform spectacular aerial courtship jump displays high above alluvial grass tufts.",
        callNote: "Deep croaking call during aerial courtship display."
    },
    {
        id: "great-hornbill",
        name: "Great Indian Hornbill",
        scientificName: "Buceros bicornis",
        category: "forest",
        status: "Vulnerable",
        season: "Year-Round",
        wingspan: "150 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Great_Hornbill_Keoladeo.jpg/800px-Great_Hornbill_Keoladeo.jpg",
        description: "Majestic canopy bird with bright yellow casque. Roosts atop emergent Tetrameles trees along the Manas riverbanks.",
        callNote: "Loud, resonant 'gok-gok' echoing across river valleys."
    },
    {
        id: "swamp-francolin",
        name: "Swamp Francolin",
        scientificName: "Francolinus gularis",
        category: "grassland",
        status: "Vulnerable",
        season: "Year-Round",
        wingspan: "45 cm",
        icon: "🐦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Blyths_Tragopan.jpg/800px-Blyths_Tragopan.jpg",
        description: "Endemic to flooded tall grasslands and marsh edges of the Brahmaputra floodplains.",
        callNote: "High-pitched ringing duet 'kwe-kweer-kweer'."
    },
    {
        id: "wreathed-hornbill",
        name: "Wreathed Hornbill",
        scientificName: "Rhyticeros undulatus",
        category: "forest",
        status: "Vulnerable",
        season: "Year-Round",
        wingspan: "140 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Rufous-necked_Hornbill.jpg/800px-Rufous-necked_Hornbill.jpg",
        description: "Flocks fly in formation between Royal Manas in Bhutan and Manas in Assam searching for wild figs.",
        callNote: "Grunting 'whek-whek' calls in flight."
    }
];

const HISTORY_TIMELINE = [
    {
        year: "1905–1928",
        title: "From Royal Reserve to Wildlife Sanctuary",
        description: "Formerly the private hunting reserve of the Cooch Behar royal family and Gauripur Rajas. Formally declared Manas Wildlife Sanctuary in 1928 covering 360 km²."
    },
    {
        year: "1973",
        title: "Project Tiger Reserve Declaration",
        description: "Selected as one of the original 9 Tiger Reserves created under Project Tiger led by Prime Minister Indira Gandhi."
    },
    {
        year: "1985",
        title: "UNESCO World Heritage Site Inscription",
        description: "Inscribed on the UNESCO World Heritage List for its unmatched riverine, forest, and savannah biodiversity."
    },
    {
        year: "1992–2011",
        title: "Danger List Inscription & Triumphant Recovery",
        description: "Placed on the UNESCO World Heritage in Danger list in 1992 due to ethnic conflict and poaching. Following peace agreements, community conservation, and rhino reintroductions, UNESCO triumphantly removed Manas from the Danger List in June 2011!"
    },
    {
        year: "2015–Present",
        title: "TraSTCA Transboundary Initiative",
        description: "Establishment of the Transboundary Manas Conservation Area linking Manas in India with Royal Manas National Park in Bhutan for joint tiger and elephant monitoring."
    }
];

const INTERESTING_FACTS = [
    {
        title: "5 Conservation Designations",
        icon: "🏆",
        description: "Manas holds 5 prestigious protected statuses: UNESCO World Heritage Site, Tiger Reserve, Biosphere Reserve, Elephant Reserve, and National Park."
    },
    {
        title: "Home of the Golden Langur",
        icon: "🐒",
        description: "The golden-furred Gee's Golden Langur was discovered to science right here in Manas in 1953 by naturalist E.P. Gee."
    },
    {
        title: "World's Smallest Wild Pig",
        icon: "🐗",
        description: "The Pygmy Hog, standing just 25 cm tall, exists nowhere else on Earth in the wild outside of Manas."
    },
    {
        title: "Transboundary Sister Park",
        icon: "🤝",
        description: "Manas forms a continuous transboundary protected corridor with Royal Manas National Park across the international border in Bhutan."
    },
    {
        title: "UNESCO Danger List Comeback",
        icon: "📈",
        description: "Manas is a global conservation success story — placed on the UNESCO Danger List in 1992, it recovered so strongly that UNESCO removed it from the Danger List in 2011."
    },
    {
        title: "River Rafting & Wildlife Safari",
        icon: "🚣",
        description: "Tourists can take a 35 km silent boat raft down the crystal-clear Manas River from Mathanguri to spot animals drinking along the banks."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "spot-bansbari",
        name: "Bansbari Range & Entry Gate",
        category: "gate",
        x: 22,
        y: 68,
        description: "Primary tourist entrance, ticket counter, jeep safari booking office, and forest rest houses."
    },
    {
        id: "spot-mathanguri",
        name: "Mathanguri Lodge & Manas Riverbank",
        category: "base",
        x: 48,
        y: 28,
        description: "Iconic forest bungalow on the scenic banks of Manas River directly facing the hills of Bhutan. Starting point for boat rafting."
    },
    {
        id: "spot-bhuyanpara",
        name: "Bhuyanpara Eastern Range",
        category: "range",
        x: 72,
        y: 55,
        description: "Eastern grassland sector renowned for high rhino densities, wild water buffalo herds, and Bengal Florican sightings."
    },
    {
        id: "spot-pygmy",
        name: "Pygmy Hog Conservation Center",
        category: "center",
        x: 35,
        y: 80,
        description: "Off-site soft release pre-release enclosure facility dedicated to acclimatizing captive-bred Pygmy Hogs before release."
    },
    {
        id: "spot-bhutan",
        name: "India-Bhutan Transboundary Border",
        category: "border",
        x: 52,
        y: 12,
        description: "International boundary line where Manas River flows out of the Royal Manas National Park in Bhutan into Assam."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Golden_Langur_Manas.jpg/800px-Golden_Langur_Manas.jpg",
        title: "Golden Langur in Tree Canopy",
        caption: "Endangered Golden Langur resting in the trees of Manas."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Pygmy_hog.jpg/800px-Pygmy_hog.jpg",
        title: "Pygmy Hog in Thatch Grass",
        caption: "World's smallest wild pig species in its native alluvial grassland habitat."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/800px-Tiger_in_Ranthambhore.jpg",
        title: "Bengal Tiger Patrol",
        caption: "Apex predator of the Manas Tiger Reserve."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Great_Hornbill_Keoladeo.jpg/800px-Great_Hornbill_Keoladeo.jpg",
        title: "Great Hornbill Flight",
        caption: "Canopy bird soaring over the Manas River valley."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg",
        title: "Asian Elephants at River Edge",
        caption: "Herds of wild elephants roaming the Chirang-Ripu Elephant Reserve corridor."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MANAS_INFO,
        FIVE_STATUSES,
        MANAS_RIVER_INFO,
        SPECIES_SPOTLIGHT,
        BIRDLIFE,
        HISTORY_TIMELINE,
        INTERESTING_FACTS,
        MAP_HOTSPOTS,
        GALLERY_IMAGES
    };
}
