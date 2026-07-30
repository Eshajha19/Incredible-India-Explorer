/**
 * Kuno National Park Explorer — Data Module
 * Comprehensive dataset covering History, Cheetah Project, Wildlife, Habitat,
 * Tiger Presence, Rivers, Conservation, Gallery, and Interactive Map.
 *
 * This module exports constants used by kuno.js to dynamically render
 * the DOM elements, ensuring a clean separation of concerns.
 */

const KUNO_INFO = {
  id: "kuno",
  name: "Kuno National Park",
  aka: "Kuno Wildlife Sanctuary",
  location: "Sheopur District, Madhya Pradesh, India",
  state: "Madhya Pradesh",
  coordinates: { lat: 25.85, lng: 77.35 },
  area: "748.76 km²",
  establishedYear: 2018,
  etymology: "Named after the Kuno River that flows through the park, derived from local dialects.",
  climate: "Tropical dry deciduous, with hot summers and moderate monsoon rainfall.",
  bestTime: "October to March (Pleasant weather, high wildlife visibility)",
  entryFees: "₹50 (Indian Nationals), ₹200 (Foreigners)",
  nearestTransport: {
    railway: "Gwalior Junction (120 km)",
    airport: "Gwalior Airport (120 km)",
    gatewayTown: "Sheopur / Gwalior"
  },
  quickStats: [
    { label: "Cheetahs Translocated", value: "20+", icon: "🐆" },
    { label: "Tiger Reserve Status", value: "Proposed", icon: "🐅" },
    { label: "Total Area", value: "748 km²", icon: "🌲" },
    { label: "Prey Base Density", value: "High", icon: "🦌" },
    { label: "Bird Species", value: "120+", icon: "🦅" },
    { label: "Elevation", value: "250m - 400m", icon: "⛰️" }
  ]
};

const CHEETAH_PROJECT = {
  title: "Project Cheetah",
  description: "Launched in September 2022, Project Cheetah marks the world's first intercontinental translocation of large carnivores. Cheetahs from Namibia and South Africa were brought to Kuno to establish a free-ranging population in India, restoring a species that was declared extinct in the country in 1952 due to excessive hunting and habitat loss.",
  milestones: [
    { year: "Sep 2022", event: "First 8 cheetahs arrived from Namibia and released into the enclosure." },
    { year: "Feb 2023", event: "Additional cheetahs brought from South Africa to boost genetic diversity." },
    { year: "Mar 2023", event: "First cheetah cubs born in the wild in India, marking a historic conservation milestone." },
    { year: "2024", event: "Continuous monitoring and expansion of free-ranging territories within the park." }
  ]
};

const WILDLIFE = [
  {
    id: "cheetah",
    name: "African Cheetah",
    scientificName: "Acinonyx jubatus",
    status: "Vulnerable",
    icon: "🐆",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Acinonyx_jubatus_2.jpg/800px-Acinonyx_jubatus_2.jpg",
    description: "The fastest land animal, now roaming the grasslands of Kuno as part of a historic, globally monitored reintroduction effort."
  },
  {
    id: "tiger",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    status: "Endangered",
    icon: "🐅",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/800px-Royal_Bengal_Tiger_at_Nandankanan.jpg",
    description: "Kuno has shown increasing tiger presence, with camera traps confirming their movement through the park, making it a potential future tiger reserve."
  },
  {
    id: "sloth-bear",
    name: "Sloth Bear",
    scientificName: "Melursus ursinus",
    status: "Vulnerable",
    icon: "🐻",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sloth_Bear.jpg/800px-Sloth_Bear.jpg",
    description: "Commonly found in the dry deciduous forests, often seen foraging for termites and fruits."
  }
];

const HABITAT = [
  {
    type: "Dry Deciduous Forest",
    description: "Dominant vegetation featuring Khair, Salar, and Teak trees, providing crucial cover for predators and herbivores alike."
  },
  {
    type: "Grasslands",
    description: "Crucial for cheetah hunting, offering open visibility and supporting a high density of herbivore prey like Chital and Chinkara."
  },
  {
    type: "Ravines",
    description: "Deep gullies and rocky terrain that provide natural shelters, denning sites, and protection from extreme weather for wildlife."
  }
];

const MAP_HOTSPOTS = [
  {
    id: "spot-enclosure",
    name: "Cheetah Quarantine Enclosure",
    category: "wildlife",
    x: 45,
    y: 45,
    description: "The initial acclimatization zone where translocated cheetahs were monitored and habituated before release into the wild."
  },
  {
    id: "spot-river",
    name: "Kuno River",
    category: "water",
    x: 60,
    y: 60,
    description: "The primary water source sustaining the park's diverse prey base and providing hydration during dry summer months."
  },
  {
    id: "spot-grassland",
    name: "Miyanpur Grasslands",
    category: "wildlife",
    x: 30,
    y: 70,
    description: "Expansive open grasslands ideal for cheetah coursing and high-density prey grazing."
  }
];

const GALLERY_IMAGES = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Acinonyx_jubatus_2.jpg/800px-Acinonyx_jubatus_2.jpg",
    title: "Cheetah in Kuno",
    caption: "A cheetah surveying the grasslands of Kuno National Park, a symbol of India's conservation resurgence."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kuno_National_Park_Landscape.jpg/800px-Kuno_National_Park_Landscape.jpg",
    title: "Kuno Landscape",
    caption: "The dry deciduous forests and grasslands that make Kuno an ideal and scientifically vetted cheetah habitat."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/800px-Royal_Bengal_Tiger_at_Nandankanan.jpg",
    title: "Tiger Presence",
    caption: "Camera trap evidence confirms the growing presence of Bengal tigers in the Kuno ecosystem."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KUNO_INFO, CHEETAH_PROJECT, WILDLIFE, HABITAT, MAP_HOTSPOTS, GALLERY_IMAGES };
}
