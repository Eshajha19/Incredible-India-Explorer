/**
 * Dachigam National Park Explorer — Data Module
 * Comprehensive dataset covering History, Hangul Conservation, Himalayan Ecosystem,
 * Rivers & Valleys, Wildlife, Flora, Gallery, and Interactive Map.
 *
 * This module exports constants used by dachigam.js to dynamically render
 * the DOM elements, ensuring a clean separation of concerns.
 */

const DACHIGAM_INFO = {
  id: "dachigam",
  name: "Dachigam National Park",
  aka: "Dachigam Wildlife Sanctuary",
  location: "Srinagar District, Jammu & Kashmir, India",
  state: "Jammu and Kashmir",
  coordinates: { lat: 34.18, lng: 75.02 },
  area: "141 km²",
  establishedYear: 1981,
  etymology: "Literally translates to 'ten villages', referring to the ten villages that were relocated by the Maharaja to create this protected area.",
  climate: "Temperate to Alpine, with heavy snowfall in winter and mild summers.",
  bestTime: "April to September (Lower Dachigam accessible year-round, Upper Dachigam best in summer)",
  entryFees: "₹30 (Indian Nationals), ₹300 (Foreigners)",
  nearestTransport: {
    railway: "Jammu Tawi (300 km)",
    airport: "Srinagar International Airport (22 km)",
    gatewayTown: "Srinagar"
  },
  quickStats: [
    { label: "Hangul Population", value: "~150-200", icon: "🦌" },
    { label: "Elevation Range", value: "1,675m - 4,270m", icon: "⛰️" },
    { label: "Total Area", value: "141 km²", icon: "🌲" },
    { label: "Bird Species", value: "130+", icon: "🦅" },
    { label: "Mammal Species", value: "20+", icon: "🐻" },
    { label: "Distance from Srinagar", value: "22 km", icon: "📍" }
  ]
};

const HISTORY = [
  {
    year: "1910",
    title: "Initial Protection",
    description: "The area was first protected by the Maharaja of Jammu and Kashmir to ensure a supply of clean drinking water to Srinagar city, inadvertently creating a safe haven for wildlife."
  },
  {
    year: "1950",
    title: "Sanctuary Status",
    description: "Declared a protected wildlife sanctuary, marking the beginning of formal conservation efforts specifically targeted at saving the endangered Hangul."
  },
  {
    year: "1981",
    title: "National Park Designation",
    description: "Upgraded to a National Park to provide stricter legal protection to its fragile Himalayan ecosystem, banning all grazing and human settlement in the core area."
  }
];

const HANGUL_CONSERVATION = {
  title: "The Hangul (Kashmir Stag)",
  scientificName: "Cervus hanglu hanglu",
  status: "Critically Endangered (IUCN)",
  description: "The Hangul is the state animal of Jammu & Kashmir and a subspecies of the Central Asian Red Deer. Dachigam is its last remaining natural habitat. Once widespread across Kashmir and parts of Himachal Pradesh, habitat loss, poaching, and livestock grazing reduced the population to critical levels. Intensive conservation programs, including habitat restoration, predator-proof enclosures, and anti-poaching patrols, are currently underway to save this iconic species from extinction.",
  currentPopulation: "Estimated between 150 and 200 individuals in the wild, showing a fragile but hopeful recovery.",
  threats: [
    "Habitat fragmentation due to human encroachment",
    "Unregulated livestock grazing in meadow areas",
    "Poaching and illegal hunting",
    "Climate change affecting alpine meadow ecosystems"
  ]
};

const WILDLIFE = [
  {
    id: "hangul",
    name: "Hangul (Kashmir Stag)",
    scientificName: "Cervus hanglu hanglu",
    status: "Critically Endangered",
    icon: "🦌",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/The_Last_Surviving_Population_of_Hangul.jpg/800px-The_Last_Surviving_Population_of_Hangul.jpg",
    description: "The flagship species of Dachigam, recognizable by its majestic, multi-tined antlers. It primarily inhabits the lower valleys during winter."
  },
  {
    id: "black-bear",
    name: "Himalayan Black Bear",
    scientificName: "Ursus thibetanus",
    status: "Vulnerable",
    icon: "🐻",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Asian_black_bear.jpg/800px-Asian_black_bear.jpg",
    description: "Frequently spotted foraging for fruits, nuts, and insects in the lower valleys during spring and summer months."
  },
  {
    id: "leopard",
    name: "Himalayan Leopard",
    scientificName: "Panthera pardus fusca",
    status: "Vulnerable",
    icon: "🐆",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Leopard_in_the_Snow.jpg/800px-Leopard_in_the_Snow.jpg",
    description: "The apex predator of the park, expertly camouflaged in the rocky, high-altitude terrain of Upper Dachigam."
  }
];

const FLORA = [
  {
    name: "Deodar Cedar",
    description: "Dominant coniferous tree in the lower and middle elevations, providing crucial canopy cover and preventing soil erosion."
  },
  {
    name: "Blue Pine",
    description: "Found at higher altitudes, this resilient tree is well-adapted to the cold, harsh Himalayan winters and heavy snowfall."
  },
  {
    name: "Horse Chestnut",
    description: "Provides vital food sources for wildlife, including the Hangul, during autumn when its nuts fall to the forest floor."
  },
  {
    name: "Alpine Meadows",
    description: "High-altitude grasslands that bloom with diverse wildflowers in summer, serving as crucial summer grazing grounds."
  }
];

const MAP_HOTSPOTS = [
  {
    id: "spot-lower",
    name: "Lower Dachigam",
    category: "wildlife",
    x: 50,
    y: 65,
    description: "Primary wintering ground for the Hangul, featuring dense oak, maple, and horse chestnut forests."
  },
  {
    id: "spot-upper",
    name: "Upper Dachigam",
    category: "gate",
    x: 50,
    y: 30,
    description: "High-altitude alpine meadows and the source of the Dachigam stream, accessible mainly in summer."
  },
  {
    id: "spot-stream",
    name: "Dachigam Stream",
    category: "water",
    x: 50,
    y: 50,
    description: "The lifeline of the park, flowing from the upper meadows down to the lower valleys, providing year-round water."
  }
];

const GALLERY_IMAGES = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/The_Last_Surviving_Population_of_Hangul.jpg/800px-The_Last_Surviving_Population_of_Hangul.jpg",
    title: "Hangul Stag",
    caption: "A male Hangul displaying its majestic antlers in the lower valleys of Dachigam during autumn."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/A_view_of_Lower_Dachigam.jpg/800px-A_view_of_Lower_Dachigam.jpg",
    title: "Dachigam Valley",
    caption: "The lush green valleys of Lower Dachigam, the core habitat of the Hangul and diverse birdlife."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Asian_black_bear.jpg/800px-Asian_black_bear.jpg",
    title: "Himalayan Black Bear",
    caption: "A Himalayan Black Bear foraging in the dense undergrowth of the mid-elevation forests."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DACHIGAM_INFO, HISTORY, HANGUL_CONSERVATION, WILDLIFE, FLORA, MAP_HOTSPOTS, GALLERY_IMAGES };
}
