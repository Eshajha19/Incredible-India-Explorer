/**
 * cultural-dna.js
 * Indian Cultural DNA Explorer - Data Structures & Network Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Core Cultural DNA Nodes
export const nodes = [
  {
    id: "sanskrit",
    name: "Sanskrit",
    category: "Languages",
    region: "North & Central",
    description: "Classical ancient Indo-Aryan language, serving as the linguistic root of northern vernaculars and the liturgical anchor of philosophical texts.",
    significance: "Influenced vocabularies across all Indian language families (including Dravidian), temple architecture chants, and classical performing arts treatises.",
    icon: "🔤",
    tags: ["classical", "indo-aryan", "literature", "himalayas", "ganga"]
  },
  {
    id: "tamil",
    name: "Classical Tamil",
    category: "Languages",
    region: "South",
    description: "One of the oldest surviving classical Dravidian languages, boasting an independent literary history dating to the Sangam assemblies.",
    significance: "Linguistic pillar of Sangam literature, ancient maritime trade records, Dravidian architectural inscriptions, and Carnatic music compositions.",
    icon: "🔤",
    tags: ["dravidian", "sangam", "south-india", "ancient", "temple-inscriptions"]
  },
  {
    id: "persian-influence",
    name: "Persian & Arabic Syncretism",
    category: "Languages",
    region: "North & Deccan",
    description: "Linguistic confluence arising from trade, courtly administrations, and Sufi interactions, blending Middle Eastern vocabularies with regional dialects.",
    significance: "Directly catalysed the birth of Urdu, influenced Mughlai cuisine terminology, administrative terms, courtly ghazals, and Sufi qawwali music.",
    icon: "🔤",
    tags: ["syncretism", "delhi-sultanate", "mughal", "courtly-arts", "literature"]
  },
  {
    id: "urdu",
    name: "Urdu",
    category: "Languages",
    region: "North & Deccan",
    description: "A rich Indo-Aryan language born from the synthesis of Khari Boli (old Hindi/Hindustani) and Persian/Arabic script and vocabulary.",
    significance: "Linguistic backbone of Ghazal writing, Bollywood songwriting, courtly etiquette, Sufi qawwali verses, and shared secular public poetry assemblies (Mushairas).",
    icon: "✍️",
    tags: ["synthesis", "hindustani", "literature", "ghazal", "poetry"]
  },
  {
    id: "hindi",
    name: "Hindi / Khari Boli",
    category: "Languages",
    region: "North & Central",
    description: "Standardized register of Hindustani, deriving its high vocabulary from Sanskrit and written in the Devanagari script.",
    significance: "Common tongue connecting folk music, spring festivals (Holi, Diwali), theatrical Ramlila productions, and modern cinematic traditions.",
    icon: "🗣️",
    tags: ["modern-standard", "devanagari", "north-india", "cinema"]
  },
  {
    id: "bengali",
    name: "Bengali",
    category: "Languages",
    region: "East",
    description: "An eastern Indo-Aryan language with strong Sanskrit roots and rich local dialects, which birthed the modern Bengali Renaissance.",
    significance: "Bridges Durga Puja songs, Rabindra Sangeet, Baul mystical folk music, weaving patterns, and unique sweets confectioneries.",
    icon: "✒️",
    tags: ["renaissance", "tagore", "east-india", "poetry", "baul"]
  },
  {
    id: "malayalam",
    name: "Malayalam",
    category: "Languages",
    region: "South",
    description: "Southern Dravidian language characterized by its deep integration of Sanskrit vocabulary alongside indigenous classical roots.",
    significance: "Used in Kathakali dance-dramas, Koodiyattam Sanskrit theatre, ayurvedic treatises, and coastal spice-trading songs.",
    icon: "🔠",
    tags: ["kerala", "dravidian-sanskrit", "kathakali", "coastal"]
  },
  {
    id: "nagara-architecture",
    name: "Nagara Temple Style",
    category: "Architecture",
    region: "North & West",
    description: "Northern temple architectural style characterised by curvilinear beehive-shaped towers (Shikhara) and square layout grids.",
    significance: "Symbolises macrocosmic geometry in stone, influencing solar/seasonal festival coordinates and North Indian classical sculpture styles.",
    icon: "🏛️",
    tags: ["shikhara", "stone-carving", "geometry", "temples", "nagara"]
  },
  {
    id: "dravidian-architecture",
    name: "Dravidian Temple Style",
    category: "Architecture",
    region: "South",
    description: "Southern temple design characterized by monumental pyramid towers (Vimana/Gopuram), pillared halls, and large ritual water tanks.",
    significance: "Served as socio-economic hubs that nurtured Carnatic music, Bharatanatyam dance, bronze sculpture casting, and handloom silk weaving.",
    icon: "🏰",
    tags: ["gopuram", "vimana", "bronze", "south-india", "weaving-guilds"]
  },
  {
    id: "indo-islamic-architecture",
    name: "Indo-Islamic Arches & Domes",
    category: "Architecture",
    region: "North & Deccan",
    description: "A synthesis of Persian/Central Asian architectural elements (arches, domes, minarets) with indigenous stone-carving traditions.",
    significance: "Manifested in monuments like Taj Mahal and Gol Gumbaz, shaping spatial layout of gardens, royal courts, and Mughlai culinary kitchens.",
    icon: "🕌",
    tags: ["domes", "arches", "pietra-dura", "gardens", "deccan"]
  },
  {
    id: "stepwells",
    name: "Stepwells & Baolis",
    category: "Architecture",
    region: "West & Central",
    description: "Subterranean water reservoirs featuring elaborate stone staircases, pillared pavilions, and subterranean cooling chambers.",
    significance: "Fused hydraulic engineering with art; served as community social spaces for women, travelers, and traditional dry-state monsoon festivals.",
    icon: "🪜",
    tags: ["water-harvesting", "rajasthan", "gujarat", "subterranean", "sculptures"]
  },
  {
    id: "colonial-gothic",
    name: "Colonial Indo-Saracenic",
    category: "Architecture",
    region: "Coastal Hubs",
    description: "Late 19th-century architectural fusion blending Victorian Gothic revival with Mughal, Rajasthani, and Temple styles.",
    significance: "Created grand civic structures (railway stations, courts) framing the modern Indian city, introducing colonial tea culture and textiles.",
    icon: "🏢",
    tags: ["colonial", "mumbai", "kolkata", "chennai", "fusion"]
  },
  {
    id: "ayurvedic-cuisine",
    name: "Ayurvedic & Spices Science",
    category: "Cuisine",
    region: "All Regions",
    description: "A dietary philosophy utilizing seasonal herbs, local vegetables, and spices based on dosha balancing (Tridosha).",
    significance: "The foundation of daily spice blending (Turmeric, Ginger, Black Pepper), shaping domestic cooking styles, agricultural cycles, and monsoon diets.",
    icon: "🍛",
    tags: ["health", "turmeric", "monsoon-diets", "ayurveda", "spices"]
  },
  {
    id: "coastal-cuisine",
    name: "Coastal Rice & Fish",
    category: "Cuisine",
    region: "Coastal South & East",
    description: "Culinary tradition defined by the abundant use of coconut, tamarind, curry leaves, rice, and fresh sea catch.",
    significance: "Linked to maritime trade routes, monsoon festivals (Onam, Nabanna), and regional boat building/fishing traditions.",
    icon: "🐟",
    tags: ["coconut", "rice", "seafood", "kerala", "bengal", "goa"]
  },
  {
    id: "tandoori-cuisine",
    name: "Wheat & Clay Oven (Tandoor)",
    category: "Cuisine",
    region: "North & Northwest",
    description: "Northern culinary style based on flatbreads (roti, naan) baked in cylindrical clay ovens alongside skewered meats.",
    significance: "Bridges Central Asian flatbread traditions with Indian fire baking, central to Punjabi community kitchens (Sanjha Chulha) and street food.",
    icon: "🫓",
    tags: ["clay-oven", "wheat", "punjab", "communal-dining"]
  },
  {
    id: "mughlai-cuisine",
    name: "Mughlai Biryani & Kebabs",
    category: "Cuisine",
    region: "North & Deccan",
    description: "Rich, aromatic cooking style utilizing dry fruits, saffron, cream, and complex layered spice blends (dum cooking).",
    significance: "Synthesized Central Asian rice dishes with Indian spices to create iconic variations (Lucknowi, Hyderabadi, Kolkata Biryanis).",
    icon: "🍗",
    tags: ["saffron", "biryani", "dum", "royal-court", "hyderabad"]
  },
  {
    id: "fermented-cuisine",
    name: "Fermented Dosa & Idli",
    category: "Cuisine",
    region: "South",
    description: "Traditional batter of rice and black lentils, fermented overnight and steamed (Idli) or griddled thin (Dosa).",
    significance: "An ancient dietary staple referenced in Kannada/Tamil texts, representing highly evolved bio-fermentation methods in domestic kitchens.",
    icon: "🥞",
    tags: ["fermentation", "staple", "south-india", "ancient-text"]
  },
  {
    id: "hindustani-music",
    name: "Hindustani Classical Music",
    category: "Music & Dance",
    region: "North & Central",
    description: "The classical music system of northern India, highlighting raga improvisation, oral lineages (Gharanas), and Persian/Indian instrumentation.",
    significance: "Heavily influenced by Persian/Sufi court singers (Amir Khusrau) and temple traditions, using instruments like Sitar, Sarod, and Tabla.",
    icon: "🎵",
    tags: ["raga", "gharana", "sitar", "tabla", "dhrupal", "khyal"]
  },
  {
    id: "carnatic-music",
    name: "Carnatic Classical Music",
    category: "Music & Dance",
    region: "South",
    description: "A highly structured classical music system of South India, emphasizing vocal composition and complex mathematical rhythmic patterns (Tala).",
    significance: "Deeply intertwined with Dravidian temple festivals, classical Bharatanatyam dance choreography, and Sanskrit/Telugu devotional poetry.",
    icon: "🎶",
    tags: ["tala", "krithi", "veena", "violin", "devotional", "tyagaraja"]
  },
  {
    id: "kathak-dance",
    name: "Kathak Dance",
    category: "Music & Dance",
    region: "North & West",
    description: "Classical dance form characterized by rapid spins, footwork, and mime storytelling (Katha) which evolved in both temples and courts.",
    significance: "Bridges Hindu Bhakti temple narrations (Krishna legends) with elegant Mughal courtly aesthetics (darbar culture, ghazals).",
    icon: "💃",
    tags: ["footwork", "spins", "ghungroo", "mughal-court", "bhakti-temple"]
  },
  {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    category: "Music & Dance",
    region: "South",
    description: "Ancient classical dance form originating in the temples of Tamil Nadu, focusing on geometric poses, footwork, and hand gestures (Mudras).",
    significance: "Visual manifestation of Dravidian architecture, Carnatic music ragas, temple sculpture postures, and the devotional Bhakti movement.",
    icon: "🧘",
    tags: ["mudras", "devadasi", "temple-sculpture", "tamil-nadu", "geometry"]
  },
  {
    id: "folk-percussion",
    name: "Folk Percussion & Drums",
    category: "Music & Dance",
    region: "All Regions",
    description: "Vibrant rhythmic beats using local drums like the Dholak, Dhol, Chenda, and Thavil to mark harvest cycles and community events.",
    significance: "Connects tribal folklore, state harvest festivals (Bihu, Baisakhi, Thrissur Pooram), and high-energy wedding celebrations.",
    icon: "🥁",
    tags: ["dhol", "chenda", "drums", "harvest", "tribal-rhythms"]
  },
  {
    id: "sufi-qawwali",
    name: "Sufi Qawwali",
    category: "Music & Dance",
    region: "North & Deccan",
    description: "Devotional assembly singing of Sufi poetry, characterized by hand-clapping chorus, percussion, and rising emotional crescendos.",
    significance: "Synthesized Persian/Urdu spiritual lyrics with Hindustani classical raga/tala frameworks, hosted at Sufi saint shrines (Dargahs).",
    icon: "🎤",
    tags: ["devotional", "dargah", "amir-khusrau", "synthesis", "qawwali"]
  },
  {
    id: "saree-textiles",
    name: "Saree Draping & Weaves",
    category: "Clothing & Textiles",
    region: "All Regions",
    description: "The art of draping a continuous unstitched fabric, styled in over 80 regional variations (Nivi, Maharashtrian, Bengali, Gujarati).",
    significance: "Features regional handloom heritage (Kanjeevaram, Banarasi, Jamdani, Patola), carrying symbols of local flora, fauna, and temple gates.",
    icon: "👘",
    tags: ["kanjeevaram", "banarasi", "weaving-guilds", "unstitched", "handloom"]
  },
  {
    id: "handloom-khadi",
    name: "Khadi & Handloom Cotton",
    category: "Clothing & Textiles",
    region: "All Regions",
    description: "Hand-spun and hand-woven natural fiber cotton cloth, representing agrarian self-reliance and community cottage industries.",
    significance: "Evolved from ancient rural looms to become the political symbol of Indian independence and sustainable modern fashion.",
    icon: "🧵",
    tags: ["gandhi", "hand-spun", "cottage-industry", "cotton", "swadeshi"]
  },
  {
    id: "pashmina-silk",
    name: "Pashmina & Brocade Silks",
    category: "Clothing & Textiles",
    region: "North & East",
    description: "Ultra-fine Himalayan cashmere wool weaving (Pashmina) and complex gold/silver metallic thread embroidery (Zardozi).",
    significance: "Associated with royal patronage, cold mountain winters, and elite gifting cultures along the Silk and Himalayan trade routes.",
    icon: "🧣",
    tags: ["cashmere", "zardozi", "silk-road", "embroidery", "kashmir"]
  },
  {
    id: "kurta-sherwani",
    name: "Kurta, Sherwani & Stitched Garments",
    category: "Clothing & Textiles",
    region: "North & Central",
    description: "Tailored long tunics (Kurta) and structured outer coats (Sherwani/Achkan) featuring button plackets and mandarin collars.",
    significance: "Bridges Persian/Central Asian tailored coats with Indian muslin/cotton fabrics, defining formal post-colonial diplomatic attire.",
    icon: "🧥",
    tags: ["sherwani", "kurta", "tailored", "colonial-era", "court-attire"]
  },
  {
    id: "diwali-harvest",
    name: "Diwali & Harvest Celebrations",
    category: "Festivals",
    region: "All Regions",
    description: "Seasonal solar-lunar festivals celebrating light, agricultural harvests, and the transition of winter crops (Pongal, Makar Sankranti, Baisakhi).",
    significance: "Triggers massive household cleaning, clay pottery lamp-making, traditional sweet preparing, and agrarian trade fairs.",
    icon: "🪔",
    tags: ["harvest", "lights", "sweet-making", "agriculture", "monsoon"]
  },
  {
    id: "spring-holi",
    name: "Holi & Spring Colors",
    category: "Festivals",
    region: "North & Central",
    description: "Vernal equinox festival celebrated by throwing organic colored powders (Gulal), lighting bonfires, and singing folk songs.",
    significance: "Symbolizes breaking of social hierarchies, folk performance gatherings, and agricultural transitions from winter crops.",
    icon: "🎨",
    tags: ["spring", "colors", "folk-music", "wheat-harvest"]
  },
  {
    id: "durga-puja",
    name: "Durga Puja & Pandals",
    category: "Festivals",
    region: "East",
    description: "Autumnal festival centering on monumental artistic structures (Pandals) housing clay idols of Goddess Durga.",
    significance: "Synthesizes fine sculpture, public light installations, street food, folk drum (Dhak) performances, and Bengali literature.",
    icon: "🥁",
    tags: ["durga-puja", "pandal", "dhak", "clay-art", "bengal"]
  },
  {
    id: "sufism-bhakti",
    name: "Bhakti-Sufi Synthesis",
    category: "Traditions & Philosophy",
    region: "All Regions",
    description: "Historical medieval devotional movement seeking personal union with the divine, emphasizing social equality and vernacular expression.",
    significance: "Directly catalysed regional language literature, Sufi shrines (Dargahs), Hindustani bhajan/qawwali music, and synthetic arts.",
    icon: "🧘",
    tags: ["bhakti", "sufism", "equality", "vernacular", "mystic"]
  },
  {
    id: "buddhist-jain-ahimsa",
    name: "Buddhist & Jain Ahimsa",
    category: "Traditions & Philosophy",
    region: "All Regions",
    description: "Core ancient philosophical tenets advocating non-violence (Ahimsa), asceticism, mindfulness, and codependency of all life forms.",
    significance: "Deeply shaped Indian vegetarianism, monastic rock-cut architecture (Ajanta, Ellora), Ashokan rock edicts, and moral code literature.",
    icon: "🕉️",
    tags: ["ahimsa", "vegetarianism", "monastic", "ajanta", "ashoka"]
  }
];

// Connection Links (Edges) showing cultural influences
export const links = [
  // Languages -> Traditions & Philosophy
  { source: "sanskrit", target: "sufism-bhakti", relationship: "Scriptural Anchor", strength: 3, description: "Sanskrit philosophical concepts (Advaita) influenced early medieval Bhakti movement texts." },
  { source: "tamil", target: "sufism-bhakti", relationship: "Catalyst of Devotion", strength: 3, description: "Sangam Tamil devotional hymns of Alvars/Nayanars initiated the pan-Indian Bhakti movement." },
  { source: "persian-influence", target: "sufism-bhakti", relationship: "Sufi Synthesis", strength: 3, description: "Persian mystic concepts merged with Bhakti ideas to create popular synthetic poetry (Kabir, Nanak)." },
  { source: "persian-influence", target: "urdu", relationship: "Linguistic Parent", strength: 3, description: "Persian language synthesis with regional dialects gave birth to the grammar and vocabulary of Urdu." },
  { source: "urdu", target: "sufi-qawwali", relationship: "Poetic Medium", strength: 3, description: "Urdu ghazal and devotional poetry serve as the lyrical core of Sufi Qawwali assemblies." },
  { source: "bengali", target: "durga-puja", relationship: "Cultural Liturgy", strength: 3, description: "Bengali devotional literature and classical poetry shape Durga Puja chants and music." },

  // Architecture -> Music, Dance & Weaving
  { source: "dravidian-architecture", target: "carnatic-music", relationship: "Performance Patronage", strength: 3, description: "Dravidian temples served as centers for musical composition, preservation, and performance." },
  { source: "dravidian-architecture", target: "bharatanatyam", relationship: "Visual Space", strength: 3, description: "Temple pillared halls (Mandapams) provided the sacred space for Bharatanatyam dance execution." },
  { source: "dravidian-architecture", target: "saree-textiles", relationship: "Weaving Imagery", strength: 2, description: "Temple towers and wall border geometries directly inspired Kanjeevaram silk saree border designs." },
  { source: "nagara-architecture", target: "diwali-harvest", relationship: "Sacred Orientation", strength: 2, description: "Nagara temple mandalas align with solar coordinates to celebrate harvest and light festivals." },
  { source: "indo-islamic-architecture", target: "mughlai-cuisine", relationship: "Royal Courtly Life", strength: 2, description: "Mughal palaces featured specialized royal kitchens (Dar-ul-Matbak) adjacent to darbar halls." },
  { source: "stepwells", target: "diwali-harvest", relationship: "Water Festivals", strength: 2, description: "Stepwells served as subterranean staging areas for monsoon, fertility, and light festivals." },

  // Cuisine -> Philosophy & Region
  { source: "buddhist-jain-ahimsa", target: "ayurvedic-cuisine", relationship: "Dietary Morality", strength: 3, description: "Philosophical insistence on non-violence (Ahimsa) established vegetarianism as a core Ayurvedic diet trait." },
  { source: "ayurvedic-cuisine", target: "coastal-cuisine", relationship: "Spices Application", strength: 2, description: "Ayurvedic warm spice balancing principles shaped the preparation of fish and coconut in coastal cooking." },
  { source: "ayurvedic-cuisine", target: "tandoori-cuisine", relationship: "Heat Balancing", strength: 2, description: "Use of digestive seeds (Cumin, Coriander) balanced the intense heat and heavy wheat flatbreads of tandoor." },
  { source: "mughlai-cuisine", target: "diwali-harvest", relationship: "Festive Adaptation", strength: 2, description: "Rich Mughlai ingredients (saffron, almonds, silver foil) were integrated into traditional festive sweet-making." },

  // Traditions & Philosophy -> Music & Dance
  { source: "sufism-bhakti", target: "sufi-qawwali", relationship: "Devotional Practice", strength: 3, description: "Bhakti-Sufi emphasis on emotional mysticism gave rise to Qawwali assemblies (Sama) at Dargahs." },
  { source: "sufism-bhakti", target: "kathak-dance", relationship: "Storytelling Core", strength: 3, description: "The Bhakti movement provided Kathak dancers with themes of divine love (Radha-Krishna legends)." },
  { source: "sufism-bhakti", target: "bharatanatyam", relationship: "Devotional Narrative", strength: 3, description: "Bhakti poetry (Padams and Javalis) forms the core narrative content for Bharatanatyam expression (Abhinaya)." },
  { source: "sufism-bhakti", target: "hindustani-music", relationship: "Devotional Ragas", strength: 2, description: "Saint-musicians (Tansen, Haridas) composed classical dhrupads praising deities and spiritual truth." },
  { source: "sufism-bhakti", target: "carnatic-music", relationship: "Compositional Soul", strength: 3, description: "The Carnatic Trinity composed devotional Kritis that defined the spiritual core of the music system." },

  // Music & Dance -> Festivals & Clothing
  { source: "hindustani-music", target: "kathak-dance", relationship: "Rhythmic Base", strength: 3, description: "Hindustani classical compositions (tarana, thumri, pakhavaj beats) accompany Kathak choreography." },
  { source: "carnatic-music", target: "bharatanatyam", relationship: "Auditory Fabric", strength: 3, description: "Carnatic vocal music and nattuvangam patterns guide the rhythmic execution of Bharatanatyam." },
  { source: "folk-percussion", target: "diwali-harvest", relationship: "Festive Rhythm", strength: 3, description: "Folk drums (Chenda, Dhol) define the high energy atmosphere of harvest and spring celebrations." },
  { source: "folk-percussion", target: "durga-puja", relationship: "Dhak Resonance", strength: 3, description: "The beating of Dhak drums is central to the ritual dances and pandal processions of Durga Puja." },
  { source: "sufi-qawwali", target: "spring-holi", relationship: "Rang Celebrations", strength: 2, description: "Famous Qawwali compositions celebrate 'Rang' (Holi colors) as symbols of divine spiritual union." },
  { source: "kathak-dance", target: "kurta-sherwani", relationship: "Drape Movement", strength: 2, description: "The spins of Kathak influenced the cut of flared ankle-length kurtas and tailored courtly sherwanis." },
  { source: "bharatanatyam", target: "saree-textiles", relationship: "Performance Draping", strength: 2, description: "Bharatanatyam dancers wear sarees draped as pleated fans to facilitate deep geometric leg postures." },

  // Clothing & Textiles -> Festivals & Region
  { source: "saree-textiles", target: "diwali-harvest", relationship: "Festive Attire", strength: 2, description: "Wearing new silk sarees is a mandatory ritual across southern harvest and light festivals." },
  { source: "saree-textiles", target: "durga-puja", relationship: "Lal Paar Saree", strength: 2, description: "Red-bordered white sarees (Gorad/Garad) represent the iconic traditional look during Durga Puja." },
  { source: "handloom-khadi", target: "diwali-harvest", relationship: "Agrarian Bond", strength: 2, description: "Handloom cotton weaves support agrarian artisans during solar harvest transitions." },
  { source: "pashmina-silk", target: "kurta-sherwani", relationship: "Royal Ensemble", strength: 2, description: "Cashmere shawls are layered over formal sherwanis during formal northern assemblies." }
];

// Preset Journeys for guided interaction
export const presetJourneys = {
  bhaktisufi: {
    name: "The Bhakti & Sufi Synthesis",
    description: "Trace how medieval devotional movements broke social boundaries, synthesized languages, and gave birth to rich classical music and dance.",
    steps: ["sufism-bhakti", "persian-influence", "urdu", "sufi-qawwali", "kathak-dance", "hindustani-music"]
  },
  templearts: {
    name: "Dravidian Temple & Classical Arts",
    description: "Explore how classical architecture served as the spiritual and physical center for vocal music, geometric dance, and textile weaving.",
    steps: ["dravidian-architecture", "carnatic-music", "bharatanatyam", "saree-textiles", "diwali-harvest"]
  },
  ayurvedaspice: {
    name: "The Ayurvedic & Coastal Spice Route",
    description: "Unravel the codependency of non-violent philosophy, Ayurvedic plant science, coastal trade networks, and regional culinary arts.",
    steps: ["buddhist-jain-ahimsa", "ayurvedic-cuisine", "coastal-cuisine", "diwali-harvest"]
  },
  indoislamic: {
    name: "Indo-Islamic Courtly Synthesis",
    description: "Follow the fusion of Central Asian structures, languages, and culinary skills with Indian stone-carving, classical ragas, and storytelling.",
    steps: ["indo-islamic-architecture", "persian-influence", "mughlai-cuisine", "hindustani-music", "kathak-dance", "kurta-sherwani"]
  }
};

/**
 * Filter nodes based on search query, category, and region.
 */
export function filterNodes(items, { search = "", category = "all", region = "all" } = {}) {
  if (!Array.isArray(items)) return [];

  const query = search.trim().toLowerCase();

  return items.filter(node => {
    // Search query match
    const matchesSearch = !query || [
      node.name,
      node.category,
      node.region,
      node.description,
      node.significance,
      ...(node.tags || [])
    ].some(field => field && field.toLowerCase().includes(query));

    // Category filter match
    const matchesCategory = category === "all" || node.category.toLowerCase() === category.toLowerCase();

    // Region filter match
    const matchesRegion = region === "all" || node.region.toLowerCase().includes(region.toLowerCase());

    return matchesSearch && matchesCategory && matchesRegion;
  });
}

/**
 * Get connected nodes and their relationship details for a given node ID.
 */
export function getConnectedNodes(nodeId, linkList = links, nodeList = nodes) {
  if (!nodeId) return [];

  const connections = [];

  linkList.forEach(link => {
    if (link.source === nodeId) {
      const targetNode = nodeList.find(n => n.id === link.target);
      if (targetNode) {
        connections.push({
          node: targetNode,
          type: "outgoing",
          relationship: link.relationship,
          strength: link.strength,
          description: link.description
        });
      }
    } else if (link.target === nodeId) {
      const sourceNode = nodeList.find(n => n.id === link.source);
      if (sourceNode) {
        connections.push({
          node: sourceNode,
          type: "incoming",
          relationship: link.relationship,
          strength: link.strength,
          description: link.description
        });
      }
    }
  });

  return connections;
}

/**
 * Find node by ID.
 */
export function findNodeById(nodeId, list = nodes) {
  return list.find(n => n.id === nodeId);
}

/**
 * Extract unique categories sorted alphabetically.
 */
export function getUniqueCategories(list = nodes) {
  const set = new Set(list.map(n => n.category).filter(Boolean));
  return Array.from(set).sort();
}

/**
 * Extract unique regions.
 */
export function getUniqueRegions(list = nodes) {
  const regionsSet = new Set();
  list.forEach(node => {
    if (node.region) {
      // Split comma/ampersand separated regions if any, or keep clean
      node.region.split(/[&,]/).forEach(r => {
        const clean = r.trim();
        if (clean) regionsSet.add(clean);
      });
    }
  });
  return Array.from(regionsSet).sort();
}

/**
 * Construct a detailed step-by-step path flow from a list of node IDs.
 */
export function buildJourneyFlow(nodeIds, linkList = links, nodeList = nodes) {
  if (!Array.isArray(nodeIds) || nodeIds.length < 2) return [];

  const steps = [];

  for (let i = 0; i < nodeIds.length - 1; i++) {
    const currentId = nodeIds[i];
    const nextId = nodeIds[i + 1];

    const sourceNode = nodeList.find(n => n.id === currentId);
    const targetNode = nodeList.find(n => n.id === nextId);

    if (sourceNode && targetNode) {
      // Look for a direct link
      const directLink = linkList.find(l => 
        (l.source === currentId && l.target === nextId) ||
        (l.source === nextId && l.target === currentId)
      );

      steps.push({
        source: sourceNode,
        target: targetNode,
        linked: !!directLink,
        relationship: directLink ? directLink.relationship : "Indirect Cultural Flow",
        description: directLink ? directLink.description : `Shared cultural synthesis spanning from ${sourceNode.name} to ${targetNode.name}.`
      });
    }
  }

  return steps;
}

/* ==========================================================================
   BROWSER DOM & NETWORK GRAPH RENDERER
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.dnaNodes = nodes;
  window.dnaLinks = links;
  window.presetJourneys = presetJourneys;
  window.filterNodes = filterNodes;
  window.getConnectedNodes = getConnectedNodes;
  window.findNodeById = findNodeById;
  window.buildJourneyFlow = buildJourneyFlow;

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("dna-search");
    const categoryFilter = document.getElementById("category-filter");
    const regionFilter = document.getElementById("region-filter");
    const resultStatus = document.getElementById("result-status");
    const clearFiltersBtn = document.getElementById("clear-filters");

    // Graph viewport elements
    const svgGraph = document.getElementById("dna-graph");
    const nodesGroup = document.getElementById("graph-nodes");
    const linksGroup = document.getElementById("graph-links");

    // Zoom & Pan controls
    const zoomInBtn = document.getElementById("zoom-in");
    const zoomOutBtn = document.getElementById("zoom-out");
    const zoomResetBtn = document.getElementById("zoom-reset");

    // Inspector Panel
    const inspectorPanel = document.getElementById("node-inspector");
    const inspectorClose = document.getElementById("inspector-close");
    const inspectorName = document.getElementById("inspector-name");
    const inspectorCategory = document.getElementById("inspector-category");
    const inspectorRegion = document.getElementById("inspector-region");
    const inspectorDescription = document.getElementById("inspector-description");
    const inspectorSignificance = document.getElementById("inspector-significance");
    const inspectorConnectionsList = document.getElementById("inspector-connections-list");
    const btnAddToJourney = document.getElementById("btn-add-to-journey");

    // Journey Builder elements
    const customJourneyList = document.getElementById("custom-journey-list");
    const btnClearJourney = document.getElementById("btn-clear-journey");
    const journeyFlowContainer = document.getElementById("journey-flow-steps");
    const presetSelectButtons = document.querySelectorAll(".preset-journey-btn");

    let currentScale = 1;
    let translateX = 0;
    let translateY = 0;
    let selectedNodeId = null;
    let userJourneyNodeIds = [];

    // Initialize dropdowns
    if (categoryFilter) {
      getUniqueCategories().forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.toLowerCase();
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
      });
    }

    if (regionFilter) {
      getUniqueRegions().forEach(reg => {
        const opt = document.createElement("option");
        opt.value = reg.toLowerCase();
        opt.textContent = reg;
        regionFilter.appendChild(opt);
      });
    }

    // Static network coordinates mapped in circular segments based on category
    const nodeCoords = {};
    const categoriesList = getUniqueCategories();
    const radius = 280;
    const centerX = 450;
    const centerY = 350;

    nodes.forEach((node, idx) => {
      const catIdx = categoriesList.indexOf(node.category);
      const angle = (catIdx / categoriesList.length) * 2 * Math.PI + (idx * 0.15);
      const offsetRadius = radius + (idx % 2 === 0 ? 40 : -40);
      nodeCoords[node.id] = {
        x: centerX + offsetRadius * Math.cos(angle),
        y: centerY + offsetRadius * Math.sin(angle)
      };
    });

    function drawGraph() {
      if (!svgGraph || !nodesGroup || !linksGroup) return;

      const searchVal = searchInput ? searchInput.value : "";
      const catVal = categoryFilter ? categoryFilter.value : "all";
      const regVal = regionFilter ? regionFilter.value : "all";

      const filteredNodes = filterNodes(nodes, { search: searchVal, category: catVal, region: regVal });
      const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

      if (resultStatus) {
        resultStatus.textContent = `Showing ${filteredNodes.length} of ${nodes.length} cultural roots`;
      }

      // 1. Draw Links
      linksGroup.innerHTML = "";
      links.forEach(link => {
        const sourceCoord = nodeCoords[link.source];
        const targetCoord = nodeCoords[link.target];

        if (sourceCoord && targetCoord) {
          const isSourceVisible = filteredNodeIds.has(link.source);
          const isTargetVisible = filteredNodeIds.has(link.target);
          const isHighlighted = selectedNodeId === link.source || selectedNodeId === link.target;

          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", sourceCoord.x);
          line.setAttribute("y1", sourceCoord.y);
          line.setAttribute("x2", targetCoord.x);
          line.setAttribute("y2", targetCoord.y);
          line.setAttribute("class", `graph-link ${isHighlighted ? "highlighted" : ""} ${(!isSourceVisible || !isTargetVisible) ? "faded" : ""}`);
          line.setAttribute("stroke-width", link.strength);

          // Add animated pulse dot along link if highlighted
          if (isHighlighted && isSourceVisible && isTargetVisible) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("r", 4);
            circle.setAttribute("fill", "#f59e0b");
            circle.innerHTML = `<animateMotion dur="2.5s" repeatCount="indefinite" path="M ${sourceCoord.x},${sourceCoord.y} L ${targetCoord.x},${targetCoord.y}" />`;
            linksGroup.appendChild(line);
            linksGroup.appendChild(circle);
          } else {
            linksGroup.appendChild(line);
          }
        }
      });

      // 2. Draw Nodes
      nodesGroup.innerHTML = "";
      filteredNodes.forEach(node => {
        const coord = nodeCoords[node.id];
        if (!coord) return;

        const isSelected = selectedNodeId === node.id;
        const isRelated = selectedNodeId && getConnectedNodes(selectedNodeId).some(c => c.node.id === node.id);
        const isActive = !selectedNodeId || isSelected || isRelated;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", `node-group ${isSelected ? "selected" : ""} ${!isActive ? "faded" : ""}`);
        g.setAttribute("transform", `translate(${coord.x}, ${coord.y})`);
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");

        // Outer glow circle
        const glowCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        glowCircle.setAttribute("r", isSelected ? 30 : 24);
        glowCircle.setAttribute("class", "node-glow");
        glowCircle.setAttribute("fill", getCategoryColor(node.category));

        // Center circle
        const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        centerCircle.setAttribute("r", isSelected ? 24 : 18);
        centerCircle.setAttribute("class", "node-center");

        // Emoji Icon Text
        const textIcon = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textIcon.setAttribute("text-anchor", "middle");
        textIcon.setAttribute("dominant-baseline", "central");
        textIcon.setAttribute("font-size", isSelected ? "16" : "12");
        textIcon.textContent = node.icon;

        // Label Text
        const textLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textLabel.setAttribute("y", isSelected ? 42 : 32);
        textLabel.setAttribute("text-anchor", "middle");
        textLabel.setAttribute("class", "node-label");
        textLabel.textContent = node.name;

        g.appendChild(glowCircle);
        g.appendChild(centerCircle);
        g.appendChild(textIcon);
        g.appendChild(textLabel);

        // Click handler
        g.addEventListener("click", (e) => {
          e.stopPropagation();
          selectNode(node.id);
        });

        // Key handler
        g.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectNode(node.id);
          }
        });

        nodesGroup.appendChild(g);
      });
    }

    function getCategoryColor(cat) {
      switch (cat) {
        case "Languages": return "#ec4899"; // pink
        case "Architecture": return "#06b6d4"; // cyan
        case "Cuisine": return "#f59e0b"; // amber
        case "Music & Dance": return "#8b5cf6"; // violet
        case "Clothing & Textiles": return "#10b981"; // green
        case "Festivals": return "#ef4444"; // red
        case "Traditions & Philosophy": return "#3b82f6"; // blue
        default: return "#ffffff";
      }
    }

    function selectNode(nodeId) {
      selectedNodeId = nodeId;
      const node = findNodeById(nodeId);
      if (!node) return;

      // Update Inspector Panel
      if (inspectorName) inspectorName.textContent = node.name;
      if (inspectorCategory) {
        inspectorCategory.textContent = node.category;
        inspectorCategory.style.backgroundColor = getCategoryColor(node.category);
      }
      if (inspectorRegion) inspectorRegion.textContent = `📍 Region: ${node.region}`;
      if (inspectorDescription) inspectorDescription.textContent = node.description;
      if (inspectorSignificance) inspectorSignificance.textContent = node.significance;

      // Render connected nodes list
      if (inspectorConnectionsList) {
        inspectorConnectionsList.innerHTML = "";
        const connections = getConnectedNodes(nodeId);
        if (connections.length === 0) {
          inspectorConnectionsList.innerHTML = "<li>No direct influences mapped.</li>";
        } else {
          connections.forEach(conn => {
            const li = document.createElement("li");
            li.innerHTML = `
              <strong>${conn.type === "outgoing" ? "Influences" : "Influenced by"} ${conn.node.name}:</strong> 
              <span>${conn.relationship}</span> - <em>${conn.description}</em>
            `;
            li.addEventListener("click", () => selectNode(conn.node.id));
            inspectorConnectionsList.appendChild(li);
          });
        }
      }

      // Focus / animate node position into view
      const coord = nodeCoords[nodeId];
      if (coord && svgGraph) {
        translateX = centerX - coord.x * currentScale;
        translateY = centerY - coord.y * currentScale;
        updateTransform();
      }

      // Show Inspector
      if (inspectorPanel) {
        inspectorPanel.classList.add("active");
        inspectorPanel.hidden = false;
      }

      drawGraph();
    }

    function updateTransform() {
      const container = svgGraph?.querySelector("g");
      if (container) {
        container.setAttribute("transform", `translate(${translateX}, ${translateY}) scale(${currentScale})`);
      }
    }

    // Zoom events
    zoomInBtn?.addEventListener("click", () => {
      currentScale = Math.min(currentScale + 0.15, 2.5);
      updateTransform();
    });

    zoomOutBtn?.addEventListener("click", () => {
      currentScale = Math.max(currentScale - 0.15, 0.5);
      updateTransform();
    });

    zoomResetBtn?.addEventListener("click", () => {
      currentScale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    });

    // Custom Journey Builder logic
    btnAddToJourney?.addEventListener("click", () => {
      if (selectedNodeId && !userJourneyNodeIds.includes(selectedNodeId)) {
        userJourneyNodeIds.push(selectedNodeId);
        updateJourneyBuilder();
      }
    });

    btnClearJourney?.addEventListener("click", () => {
      userJourneyNodeIds = [];
      updateJourneyBuilder();
    });

    function updateJourneyBuilder() {
      if (!customJourneyList) return;

      customJourneyList.innerHTML = "";
      if (userJourneyNodeIds.length === 0) {
        customJourneyList.innerHTML = "<p class='muted'>No roots added yet. Click 'Add to Journey' in the inspector.</p>";
        if (journeyFlowContainer) journeyFlowContainer.innerHTML = "";
        return;
      }

      userJourneyNodeIds.forEach((id, idx) => {
        const node = findNodeById(id);
        if (node) {
          const chip = document.createElement("div");
          chip.className = "journey-chip";
          chip.innerHTML = `
            <span>${node.icon} ${node.name}</span>
            <button type="button" class="btn-remove-chip">&times;</button>
          `;
          chip.querySelector(".btn-remove-chip").addEventListener("click", (e) => {
            e.stopPropagation();
            userJourneyNodeIds.splice(idx, 1);
            updateJourneyBuilder();
          });
          customJourneyList.appendChild(chip);
        }
      });

      // Render step-by-step journey flow
      if (journeyFlowContainer) {
        journeyFlowContainer.innerHTML = "";
        const flow = buildJourneyFlow(userJourneyNodeIds);
        if (flow.length === 0 && userJourneyNodeIds.length > 0) {
          const singleNode = findNodeById(userJourneyNodeIds[0]);
          journeyFlowContainer.innerHTML = `
            <div class="journey-step-card">
              <h4>Start of Journey: ${singleNode.name}</h4>
              <p>${singleNode.description}</p>
            </div>
          `;
        } else {
          flow.forEach((step, idx) => {
            const card = document.createElement("div");
            card.className = "journey-step-card";
            card.innerHTML = `
              <div class="step-header">
                <span class="step-num">Step ${idx + 1}</span>
                <h4>${step.source.name} ➡️ ${step.target.name}</h4>
              </div>
              <p class="step-relation">🧬 <strong>Influence:</strong> ${step.relationship}</p>
              <p class="step-desc">${step.description}</p>
            `;
            journeyFlowContainer.appendChild(card);
          });
        }
      }
    }

    // Preset journeys click handlers
    presetSelectButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.key;
        const preset = presetJourneys[key];
        if (preset) {
          userJourneyNodeIds = [...preset.steps];
          updateJourneyBuilder();
          // Select first node of preset
          if (preset.steps.length > 0) {
            selectNode(preset.steps[0]);
          }
        }
      });
    });

    // Handle background click to deselect node
    svgGraph?.addEventListener("click", () => {
      selectedNodeId = null;
      if (inspectorPanel) {
        inspectorPanel.classList.remove("active");
        inspectorPanel.hidden = true;
      }
      drawGraph();
    });

    inspectorClose?.addEventListener("click", () => {
      selectedNodeId = null;
      if (inspectorPanel) {
        inspectorPanel.classList.remove("active");
        inspectorPanel.hidden = true;
      }
      drawGraph();
    });

    // Drag-to-pan implementation
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    svgGraph?.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      svgGraph.style.cursor = "grabbing";
    });

    svgGraph?.addEventListener("mousemove", (e) => {
      if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
      }
    });

    svgGraph?.addEventListener("mouseup", () => {
      isDragging = false;
      if (svgGraph) svgGraph.style.cursor = "grab";
    });

    svgGraph?.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    // Touch events for mobile dragging
    svgGraph?.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      }
    });

    svgGraph?.addEventListener("touchmove", (e) => {
      if (isDragging && e.touches.length === 1) {
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        updateTransform();
      }
    });

    svgGraph?.addEventListener("touchend", () => {
      isDragging = false;
    });

    // Event listeners
    searchInput?.addEventListener("input", drawGraph);
    categoryFilter?.addEventListener("change", drawGraph);
    regionFilter?.addEventListener("change", drawGraph);
    clearFiltersBtn?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "all";
      if (regionFilter) regionFilter.value = "all";
      drawGraph();
    });

    // Initial render
    drawGraph();
  });
}
