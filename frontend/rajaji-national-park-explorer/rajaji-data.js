/**
 * Rajaji National Park Explorer — Data Module
 * Comprehensive dataset covering History, Elephant Reserve, Shivalik Hills,
 * Wildlife, Rivers, Bird Species, Safari, Interactive Map, and Gallery.
 */

const RAJAJI_INFO = {
  id: "rajaji",
  name: "Rajaji National Park",
  aka: "Rajaji Tiger Reserve",
  location: "Haridwar, Dehradun & Pauri Garhwal Districts, Uttarakhand, India",
  state: "Uttarakhand",
  coordinates: { lat: 30.05, lng: 78.15 },
  area: "820.42 km² (Core: 560.42 km², Buffer: 260 km²)",
  establishedYear: 1983,
  tigerReserveYear: 2015,
  etymology: "Named after C. Rajagopalachari (popularly known as Rajaji), the first Indian Governor-General of independent India and a prominent freedom fighter.",
  climate: "Subtropical with hot summers and cold winters. Annual rainfall ~2000 mm.",
  bestTime: "Mid-November to Mid-June (Park closed during monsoon)",
  entryFees: "₹150 (Indian Nationals), ₹600 (Foreigners), Vehicle entry extra.",
  nearestTransport: {
    railway: "Haridwar Junction (10 km from Chilla entry)",
    airport: "Jolly Grant Airport, Dehradun (35 km)",
    gatewayTown: "Haridwar / Dehradun"
  },
  quickStats: [
    { label: "Asian Elephants", value: "400+", icon: "🐘" },
    { label: "Tiger Reserve", value: "Since 2015", icon: "🐅" },
    { label: "Total Area", value: "820 km²", icon: "🌲" },
    { label: "Bird Species", value: "315+", icon: "🦅" },
    { label: "Mammal Species", value: "50+", icon: "🦌" },
    { label: "Elevation", value: "300m - 1200m", icon: "⛰️" }
  ]
};

const HISTORY = [
  {
    year: "1948",
    title: "Motichur Sanctuary Established",
    description: "The Motichur area was first declared a wildlife sanctuary to protect the depleting wildlife populations in the Shivalik foothills."
  },
  {
    year: "1976",
    title: "Rajaji & Chilla Sanctuaries",
    description: "The Rajaji and Chilla areas were subsequently notified as separate wildlife sanctuaries, recognizing the ecological continuity of the region."
  },
  {
    year: "1983",
    title: "Formation of Rajaji National Park",
    description: "The three sanctuaries (Rajaji, Motichur, and Chilla) were merged to form the Rajaji National Park, named after the freedom fighter C. Rajagopalachari."
  },
  {
    year: "2015",
    title: "Declared a Tiger Reserve",
    description: "Owing to its growing tiger population and critical elephant corridor status, it was officially notified as the Rajaji Tiger Reserve under Project Tiger."
  }
];

const WILDLIFE = [
  {
    id: "wild-elephant",
    name: "Asian Elephant",
    scientificName: "Elephas maximus",
    status: "Endangered",
    icon: "🐘",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Elephants_in_Rajaji_National_Park.jpg/800px-Elephants_in_Rajaji_National_Park.jpg",
    description: "Rajaji hosts one of the highest densities of Asian elephants in northern India, serving as a vital corridor between the Shivaliks and the Himalayas."
  },
  {
    id: "wild-tiger",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    status: "Endangered",
    icon: "🐅",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/800px-Royal_Bengal_Tiger_at_Nandankanan.jpg",
    description: "The park has seen a steady increase in its tiger population, with camera traps regularly capturing images of tigers roaming the sal forests."
  },
  {
    id: "wild-bear",
    name: "Himalayan Black Bear",
    scientificName: "Ursus thibetanus",
    status: "Vulnerable",
    icon: "🐻",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Asian_black_bear.jpg/800px-Asian_black_bear.jpg",
    description: "Often spotted foraging for fruits and insects in the higher altitudes of the park, especially during the summer months."
  }
];

const BIRD_SPECIES = [
  {
    id: "bird-hornbill",
    name: "Great Hornbill",
    scientificName: "Buceros bicornis",
    status: "Vulnerable",
    icon: "🦜",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Great_Hornbill.jpg/800px-Great_Hornbill.jpg",
    description: "A magnificent bird with a massive casque on its beak, often heard before it is seen in the dense canopy of the sal forests."
  },
  {
    id: "bird-pheasant",
    name: "Kalij Pheasant",
    scientificName: "Lophura leucomelanos",
    status: "Least Concern",
    icon: "🐦",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kalij_Pheasant.jpg/800px-Kalij_Pheasant.jpg",
    description: "The state bird of Uttarakhand, frequently seen foraging on the forest floor in the undergrowth of Rajaji."
  }
];

const RIVERS = [
  {
    name: "Ganga River",
    description: "Forms the western boundary of the park. The riverine ecosystems support marsh crocodiles and provide vital water sources for wildlife."
  },
  {
    name: "Song River",
    description: "Flows through the heart of the Chilla range, creating beautiful pebble beds and shallow pools used by elephants for bathing."
  },
  {
    name: "Chilla Stream",
    description: "A seasonal tributary that swells during the monsoon, carving deep ravines and supporting unique riparian vegetation."
  }
];

const SAFARI_OPTIONS = [
  {
    id: "safari-chilla",
    title: "Chilla Range Jeep Safari",
    duration: "2.5 – 3 hours",
    timing: "6:00 AM – 9:00 AM & 3:00 PM – 6:00 PM",
    cost: "₹3,000 per vehicle (up to 6 persons)",
    capacity: "6 persons per gypsy",
    zones: "Chilla Range (Motichur to Ranipur)",
    highlights: [
      "Highest probability of elephant sightings",
      "Scenic drive alongside the Song River",
      "Dense sal forest canopy coverage",
      "Excellent birdwatching opportunities"
    ],
    description: "The most popular safari route, offering a perfect blend of riverine landscapes and dense forest, ideal for spotting elephants, deer, and occasionally tigers."
  }
];

const MAP_HOTSPOTS = [
  {
    id: "spot-chilla",
    name: "Chilla Range Entry",
    category: "gate",
    x: 40,
    y: 50,
    description: "Main entry point for safaris, featuring the interpretation center and forest rest house."
  },
  {
    id: "spot-motichur",
    name: "Motichur Gate",
    category: "gate",
    x: 60,
    y: 60,
    description: "Southern entry point, known for its proximity to the Ganga riverbed and high elephant movement."
  },
  {
    id: "spot-ganga",
    name: "Ganga River Corridor",
    category: "water",
    x: 25,
    y: 40,
    description: "Critical wildlife corridor and watering hole, especially active during early mornings."
  }
];

const GALLERY_IMAGES = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Elephants_in_Rajaji_National_Park.jpg/800px-Elephants_in_Rajaji_National_Park.jpg",
    title: "Elephant Herd",
    caption: "A family herd of Asian elephants crossing the Song riverbed in the Chilla range."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Shivalik_Hills_Uttarakhand.jpg/800px-Shivalik_Hills_Uttarakhand.jpg",
    title: "Shivalik Foothills",
    caption: "The majestic Shivalik hills forming the northern backdrop of the national park."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Ganga_River_Haridwar.jpg/800px-Ganga_River_Haridwar.jpg",
    title: "Ganga River",
    caption: "The holy Ganga river forming the natural western boundary of the reserve."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RAJAJI_INFO, HISTORY, WILDLIFE, BIRD_SPECIES, RIVERS, SAFARI_OPTIONS, MAP_HOTSPOTS, GALLERY_IMAGES };
}
