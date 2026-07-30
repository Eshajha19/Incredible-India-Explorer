/**
 * Kaziranga National Park Explorer — Data Module
 * Comprehensive dataset covering One-Horned Rhinoceros, UNESCO World Heritage,
 * wetlands ecosystem, wildlife, bird species, conservation, safari, gallery, and map.
 */

const KAZIRANGA_INFO = {
    id: "kaziranga",
    name: "Kaziranga National Park",
    aka: "Kaziranga Tiger Reserve",
    location: "Golaghat & Nagaon Districts, Assam, India",
    state: "Assam",
    coordinates: { lat: 26.64, lng: 93.42 },
    area: "858 km² (Core: 430 km², Buffer: 428 km²)",
    establishedYear: 1974,
    tigerReserveYear: 2006,
    unescoYear: 1985,
    unescoCriteria: "Criteria (ix), (x) — Outstanding example of ongoing ecological processes and superlative natural phenomena",
    etymology: "Named after the 'Kaziranga' village. 'Kazi' means 'goat' in Karbi language and 'Ranga' means 'red' — referring to red goats once found in the region.",
    climate: "Tropical Monsoon with annual rainfall exceeding 2,200 mm",
    bestTime: "November to April (Park closed May–October due to monsoon)",
    entryFees: "₹650 (Indian Nationals), ₹2,500 (Foreigners), Elephant Safari: ₹1,200/person, Jeep Safari: ₹3,000/vehicle",
    nearestTransport: {
        railway: "Furkating Junction (50 km) / Jorhat Railway Station (96 km)",
        airport: "Jorhat Airport (97 km) / Guwahati International Airport (217 km)",
        gatewayTown: "Kohora (Central Range entry point)"
    },
    quickStats: [
        { label: "One-Horned Rhinos", value: "2,600+", icon: "🦏" },
        { label: "UNESCO Inscribed", value: "1985", icon: "🏛️" },
        { label: "Tiger Reserve", value: "Since 2006", icon: "🐅" },
        { label: "Wetland Area", value: "858 km²", icon: "🌾" },
        { label: "Bird Species", value: "500+", icon: "🦅" },
        { label: "Wildlife Density", value: "India's Finest", icon: "🐘" }
    ]
};

const RHINO_INFO = {
    title: "The Great Indian One-Horned Rhinoceros",
    scientificName: "Rhinoceros unicornis",
    conservationStatus: "Vulnerable (IUCN Red List)",
    populationGlobal: "~4,000 (two-thirds live in Kaziranga)",
    weight: "1,800 – 2,700 kg (Male) | 1,600 – 2,000 kg (Female)",
    lifespan: "35–45 years in wild",
    description: "Kaziranga is home to the world's largest population of the Great Indian One-Horned Rhinoceros. The rhino is distinguished by its single black horn (25–57 cm), thick grey-brown skin folded into shield-like plates, and a prehensile upper lip adapted for grazing. A true prehistoric survivor, it has roamed the Brahmaputra floodplains for millennia.",
    behavior: "Primarily solitary grazers, most active during early morning and late afternoon. They are excellent swimmers and can travel long distances in water. Rhinos maintain wallowing holes to cool off and coat their skin with mud as natural sunscreen and insect repellent.",
    significance: "Kaziranga's rhino conservation is one of the world's greatest success stories — from fewer than 20 individuals in the early 1900s to over 2,600 today. Dedicated anti-poaching patrols, intelligence-led operations, and community engagement have brought the population back from the brink.",
    hornUseAndPoaching: "Rhino horn is composed of keratin (same as human hair and nails). Despite having no proven medicinal value, it is prized in illegal wildlife trade for traditional East Asian medicine, driving persistent poaching threats."
};

const RHINO_BODY_PARTS = [
    { label: "Horn Length", value: "25–57 cm, single horn", icon: "🦏" },
    { label: "Shoulder Height", value: "1.7–2.0 meters", icon: "📏" },
    { label: "Body Length", value: "3.0–3.8 meters", icon: "📐" },
    { label: "Top Speed", value: "55 km/h (charge)", icon: "⚡" },
    { label: "Daily Grazing", value: "50–100 kg grass", icon: "🌿" },
    { label: "Skin Thickness", value: "1.5–2.5 cm", icon: "🛡️" }
];

const WILDLIFE = [
    {
        id: "wild-one-horned-rhino",
        name: "One-Horned Rhinoceros",
        scientificName: "Rhinoceros unicornis",
        status: "Vulnerable",
        icon: "🦏",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/One_horned_Rhino.jpg/800px-One_horned_Rhino.jpg",
        description: "The iconic megaherbivore of Kaziranga. Over 2,600 rhinos roam the tall grasslands and wetlands of the park, making it the single most important rhino conservation area in the world."
    },
    {
        id: "wild-elephant",
        name: "Asian Elephant",
        scientificName: "Elephas maximus",
        status: "Endangered",
        icon: "🐘",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg",
        description: "Kaziranga supports a large population of wild Asian elephants. They migrate across the Brahmaputra floodplains and are frequently spotted during elephant-back safaris along the park's open meadows."
    },
    {
        id: "wild-water-buffalo",
        name: "Wild Water Buffalo",
        scientificName: "Bubalus arnee",
        status: "Endangered",
        icon: "🐃",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Wild_Buffalo_Kaziranga.jpg/800px-Wild_Buffalo_Kaziranga.jpg",
        description: "The wild ancestor of domestic water buffalo. Kaziranga protects one of the largest surviving populations of this endangered species, distinguished by its massive crescent-shaped horns."
    },
    {
        id: "wild-swamp-deer",
        name: "Swamp Deer (Barasingha)",
        scientificName: "Rucervus duvaucelii",
        status: "Endangered",
        icon: "🦌",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Swamp_Deer_Barasingha.jpg/800px-Swamp_Deer_Barasingha.jpg",
        description: "Kaziranga hosts a thriving population of Barasingha, the swamp deer known for its impressive multi-tined antlers. They graze in large herds across marshy grasslands."
    },
    {
        id: "wild-tiger",
        name: "Bengal Tiger",
        scientificName: "Panthera tigris tigris",
        status: "Endangered",
        icon: "🐅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/800px-Royal_Bengal_Tiger_at_Nandankanan.jpg",
        description: "Kaziranga was declared a Tiger Reserve in 2006 and now boasts one of the highest tiger densities in India. The tall grasslands provide perfect ambush cover for hunting."
    },
    {
        id: "wild-dolphin",
        name: "Ganges River Dolphin",
        scientificName: "Platanista gangetica",
        status: "Endangered",
        icon: "🐬",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ganges_Dolphin.jpg/800px-Ganges_Dolphin.jpg",
        description: "The Brahmaputra river system bordering Kaziranga is home to the blind Ganges River Dolphin, a freshwater cetacean that navigates murky waters using echolocation."
    }
];

const BIRD_SPECIES = [
    {
        id: "bird-greater-adjutant",
        name: "Greater Adjutant Stork",
        scientificName: "Leptoptilos dubius",
        status: "Endangered",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Greater_Adjutant_Stork_Kaziranga.jpg/800px-Greater_Adjutant_Stork_Kaziranga.jpg",
        description: "One of the world's rarest storks, Kaziranga hosts one of its last breeding strongholds. These giant scavengers nest high in the park's ancient trees."
    },
    {
        id: "bird-spotbill-pelican",
        name: "Spot-billed Pelican",
        scientificName: "Pelecanus philippensis",
        status: "Near Threatened",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Spot-billed_Pelican_Keoladeo.jpg/800px-Spot-billed_Pelican_Keoladeo.jpg",
        description: "Large waterbird with a distinctive spotted bill and expandable throat pouch. They breed in large colonies in Kaziranga's wetland trees."
    },
    {
        id: "bird-bengal-florican",
        name: "Bengal Florican",
        scientificName: "Houbaropsis bengalensis",
        status: "Critically Endangered",
        icon: "🐦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bengal_Florican_male.jpg/800px-Bengal_Florican_male.jpg",
        description: "One of the rarest bustards in the world. Kaziranga's short grasslands provide critical breeding habitat for this critically endangered species, known for the male's spectacular courtship leap display."
    },
    {
        id: "bird-wild-duck",
        name: "Lesser Whistling Duck",
        scientificName: "Dendrocygna javanica",
        status: "Least Concern",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Lesser_Whistling_Duck_Kaziranga.jpg/800px-Lesser_Whistling_Duck_Kaziranga.jpg",
        description: "Abundant winter visitor forming large flocks on Kaziranga's beels (wetland lakes). Named for its clear three-note whistling call."
    },
    {
        id: "bird-fishing-eagle",
        name: "Grey-headed Fish Eagle",
        scientificName: "Haliaeetus ichthyaetus",
        status: "Near Threatened",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Crested_Serpent_Eagle_Keoladeo.jpg/800px-Crested_Serpent_Eagle_Keoladeo.jpg",
        description: "A powerful raptor that hunts fish in Kaziranga's wetlands. Easily identified by its grey head, yellow talons, and piercing call."
    },
    {
        id: "bird-hornbill",
        name: "Oriental Pied Hornbill",
        scientificName: "Anthracoceros albirostris",
        status: "Least Concern",
        icon: "🐦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Oriental_Pied_Hornbill_Kaziranga.jpg/800px-Oriental_Pied_Hornbill_Kaziranga.jpg",
        description: "A charismatic hornbill with a striking yellow and white casque. Its loud cackling calls echo through the forest canopy as it feeds on figs and berries."
    }
];

const WETLAND_ECOLOGY = {
    overview: "Kaziranga's landscape is a dynamic mosaic shaped by the annual monsoon floods of the Brahmaputra River. The park comprises tall elephant grass meadows, tropical wet evergreen forests, riparian woodlands, and numerous shallow wetland lakes ('beels') that support an extraordinary density of aquatic life.",
    floodCycle: "The Brahmaputra overflows its banks every monsoon (June–September), inundating up to 70% of the park. These annual floods deposit nutrient-rich silt, recharge groundwater, and reset the grassland succession cycle — essential for maintaining the open grazing habitat that rhinos and herbivores depend on.",
    grasslandEcology: [
        { type: "Tall Wet Grasslands", species: "Phragmites karka, Saccharum spontaneum, Arundo donax", height: "4–6 meters", role: "Primary rhino habitat and tiger ambush cover" },
        { type: "Short Grasslands", species: "Cynodon dactylon, Imperata cylindrica", height: "0.5–1 meter", role: "Preferred grazing areas for swamp deer and water buffalo" },
        { type: "Swamp/Marsh", species: "Hydrilla, Vallisneria, Nymphaea (water lilies)", depth: "0.5–2 meters", role: "Rhino wallowing, waterfowl feeding, fish breeding" }
    ],
    beels: "Over 100 seasonal and perennial beels dot the Kaziranga landscape. These wetlands are critical dry-season refuges for aquatic flora and fauna, supporting fish spawning, waterfowl congregations, and providing drinking water for the park's megafauna."
};

const CONSERVATION_HISTORY = [
    {
        year: "1905",
        title: "Initial Protection",
        description: "The area around Kaziranga was declared a Reserved Forest by the British administration, recognizing its importance as a rhino habitat."
    },
    {
        year: "1908",
        title: "Kaziranga Proposed Reserve Forest",
        description: "Mary Victoria Leiter Curzon, wife of Viceroy Lord Curzon, persuaded her husband to act on rhino protection after visiting the area. The reserve was expanded."
    },
    {
        year: "1916",
        title: "Kaziranga Game Sanctuary",
        description: "Declared a Game Sanctuary to protect the rapidly dwindling rhino population, which had fallen to below 20 individuals."
    },
    {
        year: "1950",
        title: "Kaziranga Wildlife Sanctuary",
        description: "After independence, the sanctuary was re-notified under the Assam Wildlife Protection Act with enhanced legal protection."
    },
    {
        year: "1974",
        title: "Kaziranga National Park",
        description: "Upgraded to National Park status on February 11, 1974, under the Wildlife Protection Act of 1972."
    },
    {
        year: "1985",
        title: "UNESCO World Heritage Site",
        description: "Inscribed on the UNESCO World Heritage List for its unique natural habitat and exceptional biodiversity, meeting Criteria (ix) and (x)."
    },
    {
        year: "2006",
        title: "Kaziranga Tiger Reserve",
        description: "Declared a Tiger Reserve under Project Tiger, recognizing the park's importance as a source population for Bengal Tigers in the Northeast."
    },
    {
        year: "2018–Present",
        title: "Rhino Population Crosses 2,600",
        description: "The annual census confirms Kaziranga's rhino population at 2,613. Eight anti-poaching camps and drone surveillance maintain the highest level of protection."
    }
];

const SAFARI_OPTIONS = [
    {
        id: "safari-elephant",
        title: "Elephant-back Safari",
        duration: "1.0–1.5 hours",
        timing: "5:30 AM & 6:30 AM (Seasonal)",
        cost: "₹1,200 per person",
        capacity: "4 persons per elephant",
        zones: "Central (Kohora), Western (Bagori), Eastern (Agoratoli)",
        highlights: [
            "Best chance for close-range rhino sightings",
            "Guided by trained mahouts with decades of experience",
            "Access to interior grassland areas inaccessible by jeep",
            "Spectacular sunrise views over the Brahmaputra floodplain"
        ],
        description: "The classic Kaziranga experience. Riding atop a trained elephant, you traverse the tall golden grasslands at dawn. The elevated vantage point allows for extraordinary close encounters with rhinos, elephants, and swamp deer in their natural habitat."
    },
    {
        id: "safari-jeep",
        title: "Jeep Safari (Gypsy)",
        duration: "2.0–3.0 hours",
        timing: "7:00 AM & 1:00 PM (Two shifts)",
        cost: "₹3,000 per vehicle (up to 6 persons)",
        capacity: "6 persons per jeep",
        zones: "Central (Kohora), Western (Bagori), Eastern (Agoratoli), Burapahar",
        highlights: [
            "Covers longer distances and more terrain types",
            "Better for birdwatching and tiger tracking",
            "Can visit all four ranges over multiple safaris",
            "More frequent sightings of Bengal Florican and Crested Serpent Eagle"
        ],
        description: "An open-topped Gypsy jeep safari takes you through Kaziranga's diverse terrain — from open grasslands to dense forests. Ideal for wildlife photographers and those seeking to maximize species sightings across the park's four ranges."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "spot-kohora",
        name: "Kohora Central Range Entry",
        category: "gate",
        x: 35,
        y: 30,
        description: "Main tourist entry point with Kaziranga Museum, interpretation center, and the famous Mihimukh elephant safari starting point."
    },
    {
        id: "spot-bagori",
        name: "Bagori Western Range",
        category: "gate",
        x: 15,
        y: 38,
        description: "Western entrance offering excellent rhino sightings in open meadows. The Bagori range is known for its high density of one-horned rhinos."
    },
    {
        id: "spot-agaratoli",
        name: "Agoratoli Eastern Range",
        category: "gate",
        x: 72,
        y: 28,
        description: "Eastern entry point near the Brahmaputra riverbank. Known for tiger sightings and large waterbird congregations on the floodplain beels."
    },
    {
        id: "spot-burapahar",
        name: "Burapahar Range & Ghorakati",
        category: "gate",
        x: 22,
        y: 62,
        description: "Southern hilly range with mixed deciduous forest. The only range with significant elevation, offering panoramic views of the floodplain."
    },
    {
        id: "spot-mihimukh",
        name: "Mihimukh Rhino Grazing Area",
        category: "wildlife",
        x: 42,
        y: 35,
        description: "Classic rhino viewing area in the central range. Open short grasslands where rhinos, swamp deer, and wild buffalo graze together."
    },
    {
        id: "spot-difloo",
        name: "Difloo River & Wetland Beels",
        category: "water",
        x: 55,
        y: 42,
        description: "Major wetland system with interconnected beels. Prime waterfowl habitat during winter and the best area for spotting the Ganges River Dolphin."
    },
    {
        id: "spot-panther",
        name: "Panbari Reserve Forest (Tiger Zone)",
        category: "tiger",
        x: 30,
        y: 55,
        description: "Southern forest corridor connecting Kaziranga to the Karbi Anglong hills. Crucial tiger dispersal route and prime leopard habitat."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/One_horned_Rhino.jpg/800px-One_horned_Rhino.jpg",
        title: "Great Indian One-Horned Rhinoceros",
        caption: "A majestic one-horned rhino grazing in the tall grasslands of Kaziranga's central range at dawn."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg",
        title: "Elephant Safari at Sunrise",
        caption: "Tourists on elephant-back safari crossing the golden floodplain with rhinos in the distance."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Wild_Buffalo_Kaziranga.jpg/800px-Wild_Buffalo_Kaziranga.jpg",
        title: "Wild Water Buffalo Herd",
        caption: "An endangered Wild Water Buffalo wallowing in a shallow wetland beel during summer."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/800px-Royal_Bengal_Tiger_at_Nandankanan.jpg",
        title: "Bengal Tiger in Tall Grass",
        caption: "A Bengal Tiger stalks through the tall elephant grass, Kaziranga's apex predator."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Swamp_Deer_Barasingha.jpg/800px-Swamp_Deer_Barasingha.jpg",
        title: "Swamp Deer (Barasingha) Herd",
        caption: "A herd of Barasingha grazing in the short grasslands of the Bagori range."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Greater_Adjutant_Stork_Kaziranga.jpg/800px-Greater_Adjutant_Stork_Kaziranga.jpg",
        title: "Greater Adjutant Stork Colony",
        caption: "Endangered Greater Adjutant Storks nesting high in the ancient trees of Kaziranga."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        KAZIRANGA_INFO,
        RHINO_INFO,
        RHINO_BODY_PARTS,
        WILDLIFE,
        BIRD_SPECIES,
        WETLAND_ECOLOGY,
        CONSERVATION_HISTORY,
        SAFARI_OPTIONS,
        MAP_HOTSPOTS,
        GALLERY_IMAGES
    };
}
