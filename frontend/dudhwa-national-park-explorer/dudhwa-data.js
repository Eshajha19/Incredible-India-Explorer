/**
 * Dudhwa National Park Explorer — Data Module
 * Comprehensive dataset covering Terai ecosystem, Barasingha (Swamp Deer), Rhinoceros reintroduction,
 * Bengal Tigers, safari zones, history, map hotspots, and photo gallery.
 */

const DUDHWA_INFO = {
    id: "dudhwa",
    name: "Dudhwa National Park",
    aka: "Dudhwa Tiger Reserve",
    location: "Lakhimpur Kheri & Bahraich Districts, Uttar Pradesh, India",
    state: "Uttar Pradesh",
    coordinates: { lat: 28.4917, lng: 80.6500 },
    area: "490.3 km² (Core Area: 490 km², Total Tiger Reserve Area: 1,280 km²)",
    establishedYear: 1977,
    sanctuaryYear: 1958,
    tigerReserveYear: 1987,
    rhinoReintroducedYear: 1984,
    ecosystem: "Terai Arc Alluvial Grasslands, Wet Savannah & Sal Deciduous Forests",
    climate: "Subtropical Monsoon with hot summers and chilly winter mornings",
    bestTime: "November 15 to April 30 (Park closes during monsoon)",
    entryFees: "₹100 (Indian Nationals), ₹500 (Foreigners), Vehicle Entry: ₹300, Guide Fee: ₹400",
    nearestTransport: {
        railway: "Palia Kalan (10 km) / Lakhimpur Station (80 km)",
        airport: "Lucknow Chaudhary Charan Singh Airport (230 km)",
        gatewayTown: "Palia Kalan & Dudhwa Forest Base"
    },
    quickStats: [
        { label: "Park Core Area", value: "490 km²", icon: "🏞️" },
        { label: "World Barasingha Pop.", value: "~50%", icon: "🦌" },
        { label: "Reintroduced Rhinos", value: "35+", icon: "🦏" },
        { label: "Bird Species", value: "450+", icon: "🦅" },
        { label: "Established Year", value: "1977", icon: "🏛️" },
        { label: "Safari Zones", value: "4 Ranges", icon: "🚜" }
    ]
};

const TERAI_ECOSYSTEM = {
    title: "The Terai Arc Landscape",
    overview: "Dudhwa represents one of the finest remaining examples of the damp, highly fertile Terai-Duar savanna and grasslands ecosystem along the sub-Himalayan belt.",
    salForests: "Dominated by towering, 150-year-old Shorea robusta (Sal) trees intertwined with Jamun, Asna, and Shisham groves creating a dense emerald canopy.",
    alluvialGrasslands: "Extensive wet grassland meadows (Phantas) carpeted with tall Narkul, Munj, and Elephant Grass standing up to 4 meters high — the essential feeding habitat for Swamp Deer and Rhinos.",
    wetlandsAndLakes: "Meandering rivers (Suheli, Mohana, Neora) create perennial oxbow lakes (Jhaadi Taal, Bankey Taal). These oxbow lagoons support Gangetic Dolphins, Marsh Crocodiles, Fishing Cats, and thousands of migratory waterfowl."
};

const SWAMP_DEER_INFO = {
    name: "Barasingha (Swamp Deer)",
    scientificName: "Rucervus duvaucelii duvaucelii",
    status: "Vulnerable / Endangered Nominate Subspecies",
    icon: "🦌",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Swamp_Deer_Barasingha.jpg/800px-Swamp_Deer_Barasingha.jpg",
    significance: "Dudhwa holds over 50% of the world's total surviving population of the nominate wetland Barasingha subspecies.",
    adaptation: "Possesses splayed hooves with rubbery pads specially adapted for wading through muddy marshes without sinking. Males grow magnificent 12-tined antlers (hence 'Barasingha' = 12 tines).",
    behavior: "Gathers in large herds of up to several hundred in the open Sathiana and Sonaripur phantas during winter mornings."
};

const RHINO_CONSERVATION = {
    title: "1984 Rhinoceros Reintroduction Project",
    overview: "One of India's most successful wildlife conservation sagas. Extinct in UP since the late 19th century due to hunting, the Great One-Horned Rhinoceros was triumphantly reintroduced to Dudhwa in 1984.",
    translocationDetails: "5 rhinos (2 males, 3 females) were translocated from Kaziranga National Park in Assam and 4 rhinos from Chitwan National Park in Nepal into a specially protected 27 km² solar-fenced enclosure in South Sonaripur.",
    currentStatus: "The population has grown to over 35+ wild rhinos. A second Rhino Rehabilitation Area (RRA-II) was established at Bhadi Tal to expand their range."
};

const TIGERS_WILDLIFE = [
    {
        id: "bengal-tiger",
        name: "Bengal Tiger",
        scientificName: "Panthera tigris tigris",
        status: "Endangered",
        icon: "🐅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/800px-Tiger_in_Ranthambhore.jpg",
        description: "Dudhwa Tiger Reserve supports a thriving tiger population. The reserve acts as a critical transboundary wildlife corridor connected to Suklaphanta & Bardia National Parks in Nepal."
    },
    {
        id: "asian-elephant",
        name: "Asian Elephant",
        scientificName: "Elephas maximus",
        status: "Endangered",
        icon: "🐘",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg",
        description: "Herds of wild Asian Elephants migrate seasonally between Nepal's Churia hills and Dudhwa's lush grasslands along the Mohana River corridor."
    },
    {
        id: "gangetic-dolphin",
        name: "Gangetic River Dolphin",
        scientificName: "Platanista gangetica",
        status: "Endangered",
        icon: "🐬",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dugong_Marsa_Alam.jpg/800px-Dugong_Marsa_Alam.jpg",
        description: "Freshwater river dolphin inhabiting the deep bends of the Geruwa and Mohana rivers in the Dudhwa reserve network."
    },
    {
        id: "fishing-cat",
        name: "Fishing Cat",
        scientificName: "Prionailurus viverrinus",
        status: "Vulnerable",
        icon: "🐈",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flying_squirrel_in_tree.jpg/800px-Flying_squirrel_in_tree.jpg",
        description: "Specialized wetland felid with webbed paws that dives into Jhaadi Taal lake to catch fish and frogs."
    }
];

const SAFARI_ZONES = [
    {
        id: "sonaripur",
        name: "Sonaripur Range & Rhino Sanctuary",
        timing: "Morning: 6:00 AM – 9:00 AM | Evening: 3:00 PM – 6:00 PM",
        type: "Jeep Safari & Protected Elephant Back Safari",
        highlights: "Rhino Rehabilitation Area Enclosure, Barasingha Phanta, Old Sal Woodlands",
        description: "The primary zone for rhino encounters. Visitors board trained Forest Department elephants accompanied by mahouts to enter the enclosed rhino tall-grass habitat."
    },
    {
        id: "salukapur",
        name: "Salukapur & Bankey Taal Zone",
        timing: "Morning: 6:00 AM – 9:30 AM | Evening: 2:30 PM – 6:00 PM",
        type: "Open 4x4 Jeep Safari & Watchtower View",
        highlights: "Bankey Taal Watchtower, Waterfowl Roost, Swamp Deer Herds, Tiger Sightings",
        description: "Famous for the elevated wooden watchtower over Bankey Taal. Offers panoramic views of thousands of migratory geese, storks, and basking crocodiles."
    },
    {
        id: "sathiana",
        name: "Sathiana Range (Deep Grasslands)",
        timing: "Morning: 6:30 AM – 10:00 AM | Evening: 2:30 PM – 5:30 PM",
        type: "Jeep Safari Trail",
        highlights: "Massive Sathiana Grassland Meadow, Wild Boar, Leopard Sightings",
        description: "Extensive savannah grasslands remote from central tourism hubs. Excellent for birdwatching, raptors, and large stag herds."
    },
    {
        id: "belrayan",
        name: "Belrayan Range (Eastern Sector)",
        timing: "Morning: 6:00 AM – 9:30 AM | Evening: 3:00 PM – 6:00 PM",
        type: "Jeep Safari",
        highlights: "Jhaadi Taal Oxbow Lake, Fishing Cat Trail, Wild Elephant Corridors",
        description: "Bordering the eastern wetlands. Jhaadi Taal is a photographer's paradise filled with water lilies and rare marsh birds."
    }
];

const HISTORY_TIMELINE = [
    {
        year: "1958",
        title: "Sonaripur Sanctuary Established",
        description: "Declared a Wildlife Sanctuary spanning 212 km² specifically to protect the dwindling population of Barasingha (Swamp Deer)."
    },
    {
        year: "1977",
        title: "Declared Dudhwa National Park",
        description: "Thanks to relentless advocacy by legendary conservationist Billy Arjan Singh, the area was expanded to 490 km² and declared a National Park."
    },
    {
        year: "1984",
        title: "Historic Rhino Reintroduction",
        description: "Great One-Horned Rhinoceros reintroduced from Assam and Nepal into the Sonaripur enclosure, reviving UP's rhino lineage."
    },
    {
        year: "1987",
        title: "Dudhwa Tiger Reserve Declaration",
        description: "Kishanpur Wildlife Sanctuary was merged with Dudhwa National Park to form the Dudhwa Tiger Reserve under Project Tiger."
    },
    {
        year: "2000",
        title: "Katarniaghat Sanctuary Inclusion",
        description: "Katarniaghat Wildlife Sanctuary added to the Dudhwa Tiger Reserve network, creating a 1,280 km² contiguous Terai wilderness."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "spot-dudhwa-gate",
        name: "Dudhwa Main Entrance & Reception",
        category: "gate",
        x: 18,
        y: 62,
        description: "Park entry gate, safari booking office, interpretation museum, and forest canteen."
    },
    {
        id: "spot-sonaripur",
        name: "Sonaripur Rhino Enclosure",
        category: "rhino",
        x: 38,
        y: 42,
        description: "27 km² solar-fenced Rhino Rehabilitation Area. Elephant safari boarding point."
    },
    {
        id: "spot-bankey-taal",
        name: "Bankey Taal Watchtower",
        category: "lake",
        x: 54,
        y: 35,
        description: "Elevated watchtower overlooking Bankey Taal oxbow lake filled with waterfowl and marsh crocodiles."
    },
    {
        id: "spot-sathiana",
        name: "Sathiana Range Base",
        category: "range",
        x: 72,
        y: 52,
        description: "Deep grassland forest rest house surrounded by massive Barasingha grazing phantas."
    },
    {
        id: "spot-jhaadi-taal",
        name: "Jhaadi Taal Lake (Belrayan)",
        category: "lake",
        x: 85,
        y: 28,
        description: "Pristine oxbow lake in Belrayan range famous for lily pads and fishing cats."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Swamp_Deer_Barasingha.jpg/800px-Swamp_Deer_Barasingha.jpg",
        title: "Barasingha Stag in Meadow",
        caption: "Magnificent 12-tined Swamp Deer stag grazing in Dudhwa's tall Terai grass."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg",
        title: "Reintroduced Rhino Encounter",
        caption: "One-horned Rhinoceros in the Sonaripur tall grass enclosure."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/800px-Tiger_in_Ranthambhore.jpg",
        title: "Bengal Tiger Patrol",
        caption: "Tiger moving quietly through the ancient Sal timber forest."
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Pushpawati_river_inside_the_Valley_of_Flowers_Uttarakhand_I.jpg/800px-Pushpawati_river_inside_the_Valley_of_Flowers_Uttarakhand_I.jpg",
        title: "Bankey Taal Oxbow Wetland",
        caption: "Serene oxbow lake reflecting the emerald Sal forest canopy."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DUDHWA_INFO,
        TERAI_ECOSYSTEM,
        SWAMP_DEER_INFO,
        RHINO_CONSERVATION,
        TIGERS_WILDLIFE,
        SAFARI_ZONES,
        HISTORY_TIMELINE,
        MAP_HOTSPOTS,
        GALLERY_IMAGES
    };
}
