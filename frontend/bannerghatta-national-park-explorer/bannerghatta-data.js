/**
 * Bannerghatta National Park Explorer — Data Module
 * Comprehensive dataset covering History, Butterfly Park, Safari, Zoo,
 * Wildlife Rescue Centre, Flora & Fauna, Gallery, and Interactive Map.
 *
 * This module exports constants used by bannerghatta.js to dynamically render
 * the DOM elements, ensuring a clean separation of concerns.
 */

const BANNERGHATTA_INFO = {
  id: "bannerghatta",
  name: "Bannerghatta National Park",
  aka: "Bannerghatta Biological Park",
  location: "Bengaluru Rural District, Karnataka, India",
  state: "Karnataka",
  coordinates: { lat: 12.8, lng: 77.58 },
  area: "260.51 km²",
  establishedYear: 1974,
  nationalParkYear: 2002,
  etymology: "Named after the village of Bannerghatta, derived from 'Banni' (a type of tree) and 'Ghatta' (mountain).",
  climate: "Tropical Savanna, with moderate temperatures year-round and distinct wet/dry seasons.",
  bestTime: "October to May (Pleasant weather, ideal for safaris and outdoor activities)",
  entryFees: "₹80 (Indian Nationals), ₹400 (Foreigners). Separate tickets required for Safari and Butterfly Park.",
  nearestTransport: {
    railway: "KSR Bengaluru City Junction (22 km)",
    airport: "Kempegowda International Airport (55 km)",
    gatewayTown: "Bengaluru"
  },
  quickStats: [
    { label: "Distance from Bengaluru", value: "22 km", icon: "📍" },
    { label: "Butterfly Species", value: "20+", icon: "🦋" },
    { label: "Total Area", value: "260 km²", icon: "🌲" },
    { label: "Safari Zones", value: "4", icon: "🚙" },
    { label: "Bird Species", value: "90+", icon: "🦅" },
    { label: "Rescue Animals", value: "100+", icon: "🏥" }
  ]
};

const BUTTERFLY_PARK = {
  title: "India's First Butterfly Park",
  description: "Established in 2006, this is India's first enclosed butterfly park. It features a circular mesh conservatory housing over 20 species of butterflies, a museum, a video room, and an audio-visual presentation on butterfly life cycles. It serves as both a conservation site and an educational hub for visitors.",
  features: [
    "Enclosed mesh conservatory with controlled microclimate",
    "Nectar-rich host plants and larval food plants",
    "Pupal emergence chamber for educational viewing",
    "Interactive museum and audio-visual presentations"
  ]
};

const WILDLIFE = [
  {
    id: "elephant",
    name: "Asian Elephant",
    scientificName: "Elephas maximus",
    status: "Endangered",
    icon: "🐘",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Asian_Elephant_Bull_%28Elephas_maximus%29_%287856743588%29.jpg/800px-Asian_Elephant_Bull_%28Elephas_maximus%29_%287856743588%29.jpg",
    description: "Bannerghatta serves as a crucial elephant corridor connecting the Biligiriranga Hills to the Sathyamangalam forest, allowing seasonal migration."
  },
  {
    id: "sloth-bear",
    name: "Sloth Bear",
    scientificName: "Melursus ursinus",
    status: "Vulnerable",
    icon: "🐻",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sloth_Bear.jpg/800px-Sloth_Bear.jpg",
    description: "Frequently spotted in the dry deciduous forests, especially near termite mounds and fruit-bearing trees."
  },
  {
    id: "leopard",
    name: "Indian Leopard",
    scientificName: "Panthera pardus fusca",
    status: "Vulnerable",
    icon: "🐆",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Leopard_in_the_Snow.jpg/800px-Leopard_in_the_Snow.jpg",
    description: "The apex predator of the park, expertly camouflaged in the rocky, dry deciduous terrain."
  }
];

const RESCUE_CENTRE = {
  title: "Wildlife Rescue Centre",
  description: "The park operates a dedicated rescue and rehabilitation center for injured, abandoned, or confiscated wild animals. It provides state-of-the-art veterinary care and a safe, naturalistic environment for animals that cannot be released back into the wild.",
  residents: [
    "Injured leopards and carnivores",
    "Confiscated pet animals (monkeys, birds)",
    "Orphaned herbivores (deer, elephants)",
    "Retired circus animals given a peaceful retirement"
  ]
};

const MAP_HOTSPOTS = [
  {
    id: "spot-safari",
    name: "Grand Safari Entry",
    category: "gate",
    x: 40,
    y: 50,
    description: "Starting point for the lion, tiger, bear, and elephant safari routes through the core forest area."
  },
  {
    id: "spot-butterfly",
    name: "Butterfly Park",
    category: "wildlife",
    x: 60,
    y: 60,
    description: "The enclosed conservatory housing diverse butterfly species and host plants, located near the main biological park."
  },
  {
    id: "spot-rescue",
    name: "Rescue Centre",
    category: "gate",
    x: 30,
    y: 70,
    description: "The dedicated facility for rehabilitating injured and confiscated wildlife, featuring veterinary clinics and enclosures."
  }
];

const GALLERY_IMAGES = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Bannerghatta_National_Park_4-24-2011_1-09-20_PM.JPG/800px-Bannerghatta_National_Park_4-24-2011_1-09-20_PM.JPG",
    title: "Bannerghatta Landscape",
    caption: "The dry deciduous forests of Bannerghatta on the outskirts of Bengaluru, a vital green lung for the city."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Common_Mormon_butterfly.jpg/800px-Common_Mormon_butterfly.jpg",
    title: "Butterfly Park",
    caption: "A Common Mormon butterfly in the conservatory at Bannerghatta, showcasing the park's unique lepidopteran diversity."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Asian_Elephant_Bull_%28Elephas_maximus%29_%287856743588%29.jpg/800px-Asian_Elephant_Bull_%28Elephas_maximus%29_%287856743588%29.jpg",
    title: "Asian Elephant",
    caption: "An Asian elephant roaming the corridors of Bannerghatta, highlighting its role as a crucial migration route."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BANNERGHATTA_INFO, BUTTERFLY_PARK, WILDLIFE, RESCUE_CENTRE, MAP_HOTSPOTS, GALLERY_IMAGES };
}
