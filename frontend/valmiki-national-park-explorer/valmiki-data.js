/**
 * Valmiki National Park Explorer — Data Module
 * Comprehensive dataset covering History, Tiger Reserve, Gandak River,
 * Himalayan Foothills, Wildlife, Bird Species, Gallery, and Interactive Map.
 *
 * This module exports constants used by valmiki.js to dynamically render
 * the DOM elements, ensuring a clean separation of concerns.
 */

const VALMIKI_INFO = {
  id: "valmiki",
  name: "Valmiki National Park",
  aka: "Valmiki Tiger Reserve",
  location: "West Champaran District, Bihar, India",
  state: "Bihar",
  coordinates: { lat: 27.35, lng: 83.95 },
  area: "898.45 km² (Core: 336.45 km², Buffer: 562 km²)",
  establishedYear: 1989,
  tigerReserveYear: 1989,
  etymology: "Named after Sage Valmiki, the author of the ancient Indian epic Ramayana, who is believed to have meditated in this serene region.",
  climate: "Subtropical monsoon, with hot, humid summers, heavy monsoon rainfall, and cool, foggy winters.",
  bestTime: "November to April (Pleasant weather, high wildlife visibility, park open)",
  entryFees: "₹100 (Indian Nationals), ₹500 (Foreigners)",
  nearestTransport: {
    railway: "Narkatiaganj Junction (25 km)",
    airport: "Gorakhpur Airport (80 km) / Patna Airport (200 km)",
    gatewayTown: "Narkatiaganj"
  },
  quickStats: [
    { label: "Bihar's Only NP", value: "Yes", icon: "🏛️" },
    { label: "Tiger Reserve", value: "Since 1989", icon: "🐅" },
    { label: "Total Area", value: "898 km²", icon: "🌲" },
    { label: "Bird Species", value: "250+", icon: "🦅" },
    { label: "Mammal Species", value: "50+", icon: "🦌" },
    { label: "Elevation", value: "100m - 800m", icon: "⛰️" }
  ]
};

const HISTORY = [
  {
    year: "1978",
    title: "Wildlife Sanctuary Notified",
    description: "The area was first notified as the Valmiki Wildlife Sanctuary to protect the unique and fragile Terai ecosystem bordering Nepal."
  },
  {
    year: "1989",
    title: "Tiger Reserve Status",
    description: "Included under Project Tiger, recognizing its critical role in conserving the Bengal tiger population and maintaining the Terai Arc Landscape."
  },
  {
    year: "1990",
    title: "National Park Designation",
    description: "The core area was officially upgraded to a National Park, affording it the highest level of legal protection under the Wildlife Protection Act."
  }
];

const TIGER_RESERVE = {
  title: "Valmiki Tiger Reserve",
  description: "As the 19th Tiger Reserve of India and the only one in Bihar, Valmiki plays a pivotal role in the Terai Arc Landscape. It serves as a vital corridor connecting the protected areas of India and Nepal, allowing for genetic exchange of tiger populations. Rigorous anti-poaching measures, community engagement, and habitat restoration have led to a steady and promising increase in the tiger population in recent years.",
  keyInitiatives: [
    "Intensive anti-poaching patrols and M-STrIPES monitoring",
    "Prey base augmentation through habitat management",
    "Community-based conservation and eco-development programs",
    "Cross-border collaboration with Nepal's Chitwan National Park"
  ]
};

const GANDAK_RIVER = {
  title: "The Gandak River",
  description: "The Gandak River forms the natural western boundary of Valmiki National Park, separating it from Nepal. This mighty river, originating in the Himalayas, is the lifeline of the reserve. Its dynamic riverine ecosystems support a rich diversity of aquatic life, including the endangered Gangetic Dolphin and the critically endangered Gharial. The riverbanks also serve as crucial watering holes for terrestrial wildlife, especially during the dry summer months."
};

const HIMALAYAN_FOOTHILLS = {
  title: "Himalayan Foothills & Terai Ecosystem",
  description: "Valmiki is situated in the Terai region, a lowland area at the base of the Himalayan foothills. This unique ecotone features a mosaic of tall, dense grasslands (phantas), moist deciduous Sal forests, and riverine vegetation. This diverse habitat structure is ideal for supporting a wide variety of species, from the elusive Hispid Hare in the grasslands to the majestic Bengal Tiger in the dense forest cover."
};

const WILDLIFE = [
  {
    id: "tiger",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    status: "Endangered",
    icon: "🐅",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/800px-Royal_Bengal_Tiger_at_Nandankanan.jpg",
    description: "The apex predator of Valmiki. Camera trap data shows a healthy and growing population, a testament to successful conservation efforts."
  },
  {
    id: "elephant",
    name: "Asian Elephant",
    scientificName: "Elephas maximus",
    status: "Endangered",
    icon: "🐘",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Asian_Elephant_Bull_%28Elephas_maximus%29_%287856743588%29.jpg/800px-Asian_Elephant_Bull_%28Elephas_maximus%29_%287856743588%29.jpg",
    description: "Valmiki hosts a significant resident elephant population and acts as a crucial corridor for migratory herds moving between India and Nepal."
  },
  {
    id: "hispid-hare",
    name: "Hispid Hare",
    scientificName: "Caprolagus hispidus",
    status: "Endangered",
    icon: "🐇",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Hispid_hare.jpg/800px-Hispid_hare.jpg",
    description: "A rare and elusive mammal entirely dependent on the tall, dense grasslands of the Terai region for survival."
  },
  {
    id: "sloth-bear",
    name: "Sloth Bear",
    scientificName: "Melursus ursinus",
    status: "Vulnerable",
    icon: "🐻",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sloth_Bear.jpg/800px-Sloth_Bear.jpg",
    description: "Frequently spotted foraging for termites and fruits in the dry and moist deciduous forest patches of the reserve."
  }
];

const BIRD_SPECIES = [
  {
    id: "hornbill",
    name: "Indian Grey Hornbill",
    scientificName: "Ocyceros birostris",
    status: "Least Concern",
    icon: "🦜",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Indian_Grey_Hornbill.jpg/800px-Indian_Grey_Hornbill.jpg",
    description: "Commonly seen and heard in the Sal forests, playing a vital role in seed dispersal and maintaining forest health."
  },
  {
    id: "peafowl",
    name: "Indian Peafowl",
    scientificName: "Pavo cristatus",
    status: "Least Concern",
    icon: "🦚",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Peacock_displaying.jpg/800px-Peacock_displaying.jpg",
    description: "The national bird of India, frequently spotted displaying its magnificent plumage in the open grasslands and forest edges."
  },
  {
    id: "junglefowl",
    name: "Red Junglefowl",
    scientificName: "Gallus gallus",
    status: "Least Concern",
    icon: "🐓",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Red_junglefowl.jpg/800px-Red_junglefowl.jpg",
    description: "The wild ancestor of the domestic chicken, thriving in the dense undergrowth of Valmiki's deciduous forests."
  }
];

const MAP_HOTSPOTS = [
  {
    id: "spot-gandak",
    name: "Gandak River Boundary",
    category: "water",
    x: 25,
    y: 50,
    description: "The western boundary of the park, rich in aquatic life and a vital watering hole for terrestrial wildlife."
  },
  {
    id: "spot-terai",
    name: "Terai Grasslands",
    category: "wildlife",
    x: 60,
    y: 60,
    description: "Tall grassland habitat critical for the Hispid hare, pygmy hog, and grazing herbivores like deer and elephants."
  },
  {
    id: "spot-entry",
    name: "Valmiki Nagar Entry",
    category: "gate",
    x: 50,
    y: 40,
    description: "The main entry point for tourists, featuring the interpretation center, forest rest house, and safari booking office."
  }
];

const GALLERY_IMAGES = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/800px-Royal_Bengal_Tiger_at_Nandankanan.jpg",
    title: "Bengal Tiger",
    caption: "A Bengal tiger roaming the dense Sal forests of Valmiki National Park, the apex predator of the Terai."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Gandak_River_Bihar.jpg/800px-Gandak_River_Bihar.jpg",
    title: "Gandak River",
    caption: "The mighty Gandak river forming the natural western boundary of the reserve, separating India and Nepal."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Asian_Elephant_Bull_%28Elephas_maximus%29_%287856743588%29.jpg/800px-Asian_Elephant_Bull_%28Elephas_maximus%29_%287856743588%29.jpg",
    title: "Asian Elephant",
    caption: "An Asian elephant moving through the Terai grasslands, highlighting Valmiki's role as a crucial migration corridor."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VALMIKI_INFO, HISTORY, TIGER_RESERVE, GANDAK_RIVER, HIMALAYAN_FOOTHILLS, WILDLIFE, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
