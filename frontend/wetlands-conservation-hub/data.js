const WETLAND_TYPES = [
  { name: 'Glacial Wetlands', icon: '🏔️', desc: 'High-altitude wetlands formed by snowmelt in the Himalayas, feeding major river systems.', states: 'Jammu & Kashmir, Ladakh, Himachal Pradesh, Uttarakhand' },
  { name: 'Riverine Wetlands', icon: '🌊', desc: 'Floodplains and oxbow lakes along India\'s rivers, critical for nutrient cycling and flood control.', states: 'Assam, Uttar Pradesh, Bihar, West Bengal' },
  { name: 'Lacustrine Wetlands', icon: '🏞️', desc: 'Lake-associated wetlands including shallow lakes and ponds, supporting diverse aquatic life.', states: 'Rajasthan, Gujarat, Madhya Pradesh, Odisha' },
  { name: 'Palustrine Wetlands', icon: '🌿', desc: 'Marshes, swamps, and bogs dominated by emergent vegetation like reeds and cattails.', states: 'West Bengal, Kerala, Tamil Nadu, Maharashtra' },
  { name: 'Coastal Wetlands', icon: '🏖️', desc: 'Mangroves, tidal flats, and estuaries along India\'s 7,516 km coastline, vital for fisheries.', states: 'Gujarat, Maharashtra, Goa, Kerala, Tamil Nadu, Andhra Pradesh, Odisha, West Bengal' },
  { name: 'Man-made Wetlands', icon: '🏗️', desc: 'Reservoirs, tanks, and aquaculture ponds created by human activity, now crucial for bird栖息.', states: 'Throughout India' },
];

const ECOSYSTEM_SERVICES = [
  { title: 'Water Purification', icon: '💧', desc: 'Wetlands filter pollutants, sediments, and excess nutrients from water, acting as nature\'s kidneys.' },
  { title: 'Flood Control', icon: '🌊', desc: 'Wetlands absorb excess rainfall and slow floodwaters, reducing downstream flood damage.' },
  { title: 'Carbon Storage', icon: '🌍', desc: 'Peatlands and mangroves store 3-5x more carbon per hectare than tropical rainforests.' },
  { title: 'Biodiversity Haven', icon: '🦆', desc: 'Wetlands support 40% of all species despite covering only 6% of Earth\'s land surface.' },
  { title: 'Fisheries Support', icon: '🐟', desc: '75% of global fish catch depends on coastal wetlands for spawning and nursery grounds.' },
  { title: 'Climate Regulation', icon: '🌡️', desc: 'Wetlands moderate local temperatures and influence rainfall patterns through evapotranspiration.' },
  { title: 'Livelihoods', icon: '👨‍🌾', desc: 'Over 1 billion people worldwide depend on wetlands for their livelihoods through fishing, farming, and tourism.' },
  { title: 'Cultural Value', icon: '🛕', desc: 'Wetlands hold spiritual significance in Indian culture — from Pushkar Lake to the Ganges riverine ecosystem.' },
];

const THREATS = [
  { title: 'Drainage & Conversion', icon: '🚜', desc: 'Over 50% of India\'s wetlands have been drained for agriculture, urban development, and infrastructure.', severity: 'Critical' },
  { title: 'Pollution', icon: '☠️', desc: 'Industrial effluents, agricultural runoff, and untreated sewage degrade water quality and harm biodiversity.', severity: 'Critical' },
  { title: 'Encroachment', icon: '🏘️', desc: 'Illegal construction and encroachment on wetland boundaries reduce habitat area and connectivity.', severity: 'High' },
  { title: 'Invasive Species', icon: '🌱', desc: 'Water hyacinth and other invasives choke native vegetation, alter hydrology, and reduce oxygen levels.', severity: 'High' },
  { title: 'Climate Change', icon: '🔥', desc: 'Rising temperatures, altered rainfall patterns, and sea-level rise threaten wetland ecosystems globally.', severity: 'Critical' },
  { title: 'Overexploitation', icon: '🎣', desc: 'Unsustainable fishing, hunting, and resource extraction deplete wetland biodiversity and productivity.', severity: 'High' },
  { title: 'Hydrological Alteration', icon: '🌊', desc: 'Dams, canals, and water diversion projects disrupt natural water flow patterns essential for wetland health.', severity: 'High' },
];

const RESTORATION_PROJECTS = [
  { name: 'Chilika Lake Conservation', location: 'Odisha', desc: 'Successful restoration through hydrological intervention, invasive species removal, and community participation restored fisheries and biodiversity.', year: '2000-present', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Chilika_Lake_Boat.jpg/960px-Chilika_Lake_Boat.jpg' },
  { name: 'Loktak Lake Restoration', location: 'Manipur', desc: 'Phumdi management, sewage treatment plants, and catchment area restoration to revive the floating lake ecosystem.', year: '2010-present', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Loktak_Lake_View.jpg/960px-Loktak_Lake_View.jpg' },
  { name: 'Keoladeo Wetland Revival', location: 'Rajasthan', desc: 'Water management through Ajan Bund restoration, ensuring adequate water supply for migratory birds at this Ramsar site.', year: '2015-present', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Keoladeo_Ghana_Bird_Sanctuary.jpg/960px-Keoladeo_Ghana_Bird_Sanctuary.jpg' },
  { name: 'Sundarbans Mangrove Restoration', location: 'West Bengal', desc: 'Large-scale mangrove afforestation, erosion control, and community-based conservation in the world\'s largest mangrove forest.', year: '2005-present', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sundarbans_mangrove.jpg/960px-Sundarbans_mangrove.jpg' },
  { name: 'East Kolkata Wetlands', location: 'West Bengal', desc: 'World\'s largest wastewater-fed aquaculture system, demonstrating sustainable urban wetland management.', year: '2002-present', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/East_Kolkata_Wetlands.jpg/960px-East_Kolkata_Wetlands.jpg' },
  { name: 'Pulicat Lake Conservation', location: 'Andhra Pradesh/Tamil Nadu', desc: 'Ecosystem restoration through bar mouth management, sustainable fishing practices, and dolphin conservation.', year: '2018-present', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pulicat_Lake_Birds.jpg/960px-Pulicat_Lake_Birds.jpg' },
];

const RAMSAR_SITES_TIMELINE = [
  { year: 1981, sites: ['Keoladeo National Park (Rajasthan)', 'Chilika Lake (Odisha)'], note: 'India\'s first Ramsar sites designated' },
  { year: 1990, sites: ['Wular Lake (Jammu & Kashmir)', 'Harike Lake (Punjab)', 'Sambhar Lake (Rajasthan)', 'Loktak Lake (Manipur)', 'Ashtamudi Wetland (Kerala)', 'Kolleru Lake (Andhra Pradesh)'], note: 'Six new sites added' },
  { year: 2002, sites: ['East Kolkata Wetlands (West Bengal)'], note: 'World\'s largest wastewater-fed aquaculture system recognized' },
  { year: 2005, sites: ['Bhitarkanika Mangroves (Odisha)', 'Point Calimere (Tamil Nadu)', 'Chilika Lake (re-designated)', 'Vembanad-Kol Wetland (Kerala)'], note: 'Major mangrove ecosystems included' },
  { year: 2019, sites: ['Sultanpur National Park (Haryana)', 'Bhindawas Wildlife Sanctuary (Haryana)', 'Thol Lake Wildlife Sanctuary (Gujarat)', 'Wadhvana Wetland (Gujarat)'], note: 'Four new sites added' },
  { year: 2020, sites: ['Asan Conservation Reserve (Uttarakhand)', 'Kabartal Wetland (Bihar)', 'Loktak Lake (expanded boundary)'], note: 'Himalayan and floodplain wetlands included' },
  { year: 2021, sites: ['Lonar Lake (Maharashtra)', 'Sur Sarovar (Keetham Lake) (Uttar Pradesh)', 'Tso Kar Wetland Complex (Ladakh)', 'Tawa Reservoir (Madhya Pradesh)'], note: 'First crater lake and high-altitude wetlands recognized' },
  { year: 2022, sites: ['Haiderpur Wetland (Uttar Pradesh)', 'Khangchendzonga National Park (Sikkim)', 'Ranganathittu Bird Sanctuary (Karnataka)', 'Bakhira Wildlife Sanctuary (Uttar Pradesh)', 'Karikili Bird Sanctuary (Tamil Nadu)', 'Pallikaranai Marsh Reserve Forest (Tamil Nadu)', 'Pichavaram Mangrove (Tamil Nadu)', 'Sakhya Sagar (Madhya Pradesh)', 'Udhwa Lake (Jharkhand)'], note: 'India added 10 more sites — largest single-year addition' },
  { year: 2023, sites: ['Magadi Kere Conservation Reserve (Karnataka)', 'Kerehalli Kallu Gudda conservation reserve (Karnataka)', 'Ankasamudra Bird Sanctuary (Karnataka)', 'Aghanashini Estuary (Karnataka)', 'Kudremukh National Park (Karnataka)', 'Karanji Lake (Karnataka)', 'Sultanpur National Park (boundary expansion)'], note: 'Karnataka\'s wetland ecosystems highlighted' },
  { year: 2024, sites: ['Nagarjuna Sagar Dam (Telangana)', 'Kolleru Lake (Andhra Pradesh)', 'Pala Wetland (Mizoram)', 'Gudavi Bird Sanctuary (Karnataka)', 'Naguvanahalli Lake (Karnataka)', 'Babu Rayanna Gudda (Karnataka)', 'Sonnur Lake (Karnataka)'], note: 'Southern and northeastern wetlands recognized' },
];

const CONSERVATION_INITIATIVES = [
  { title: 'National Wetland Conservation Programme (NWCP)', org: 'MoEFCC', desc: 'Launched in 1985, this flagship program identifies and conserves wetlands through financial support, management planning, and community involvement.', link: '#' },
  { title: 'Wetlands (Conservation and Management) Rules 2017', org: 'Government of India', desc: 'Regulatory framework defining wetlands, prohibited activities, and establishing State Wetland Authorities for enforcement.', link: '#' },
  { title: 'Ramsar Convention on Wetlands', org: 'International', desc: 'India became a signatory in 1982 and now has 80 Ramsar Sites — the highest in Asia — covering diverse wetland ecosystems.', link: '#' },
  { title: 'National Plan for Conservation of Aquatic Ecosystems (NPCA)', org: 'MoEFCC', desc: 'Umbrella scheme merging NWCP and National Lake Conservation Plan for holistic aquatic ecosystem management.', link: '#' },
  { title: 'Mangrove Initiative for Shoreline Habitats & Tangible Incomes (MISHTI)', org: 'Government of India', desc: 'New program for mangrove restoration along India\'s coastline, integrating climate adaptation with livelihood generation.', link: '#' },
  { title: 'State Wetland Authorities', org: 'State Governments', desc: 'Each state has established authorities for wetland identification, notification, preparation of brief documents, and management.', link: '#' },
];

const QUIZ_QUESTIONS = [
  { q: 'How many Ramsar Sites does India have?', options: ['49', '64', '80', '101'], answer: 2 },
  { q: 'Which was India\'s first Ramsar Site?', options: ['Chilika Lake', 'Keoladeo National Park', 'Wular Lake', 'Sundarbans'], answer: 1 },
  { q: 'What percentage of Earth\'s land surface do wetlands cover?', options: ['2%', '6%', '12%', '20%'], answer: 1 },
  { q: 'Which Indian state has the most Ramsar Sites?', options: ['Kerala', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'], answer: 1 },
  { q: 'How much more carbon per hectare do peatlands store compared to rainforests?', options: ['2x', '3-5x', '10x', 'Same'], answer: 1 },
  { q: 'What is the largest mangrove forest in the world?', options: ['Pichavaram', 'Sundarbans', 'Bhitarkanika', 'Godavari Delta'], answer: 1 },
  { q: 'What is the primary threat to Indian wetlands?', options: ['Climate change', 'Drainage & conversion', 'Invasive species', 'Pollution'], answer: 1 },
  { q: 'Which wetland is known as the "floating lake"?', options: ['Chilika', 'Wular', 'Loktak', 'Sambhar'], answer: 2 },
  { q: 'What percentage of global fish catch depends on coastal wetlands?', options: ['25%', '50%', '75%', '90%'], answer: 2 },
  { q: 'In which year did India join the Ramsar Convention?', options: ['1971', '1982', '1990', '2001'], answer: 1 },
];

const FEATURED_EXPLORERS = [
  {
    name: 'Beas Conservation Wetlands Explorer',
    slug: 'beas',
    tagline: 'Discover the Ramsar-designated riverine wetland, Indus River Dolphins, and rich fish diversity of the Beas River.',
    icon: '🏞️',
    path: '../beas-conservation-wetlands-explorer/index.html',
    badges: ['Ramsar Site 2020', 'Indus Dolphin Habitat', '50+ Fish Species']
  },
  {
    name: 'Nalsarovar Bird Sanctuary Explorer',
    slug: 'nalsarovar',
    tagline: 'Explore Gujarat\'s largest natural wetland, a Ramsar paradise for flamingos, pelicans, and birdwatchers.',
    icon: '🦩',
    path: '../../nalsarovar-bird-sanctuary/nalsarovar.html',
    badges: ['Ramsar Site 2012', 'Flamingo Haven', '200+ Bird Species']
  },
  {
    name: 'Longwood Shola Wetland Explorer',
    slug: 'longwood-shola',
    tagline: 'Explore the montane wetland ecosystems of Longwood Shola, a pristine Shola forest refuge in the Nilgiris.',
    icon: '🌿',
    path: '../../longwood-shola-wetland/longwood-shola.html',
    badges: ['Montane Wetland', 'Shola Forest Ecosystem', 'Endemic Species']
},
  {
    name: 'Sasthamkotta Lake Explorer',
    slug: 'sasthamkotta',
    tagline: 'Explore Kerala\'s largest freshwater lake, a Ramsar site and vital drinking water source with unique ecology.',
    icon: '💧',
    path: '../../sasthamkotta-lake/sasthamkotta-lake.html',
    badges: ['Ramsar Site 2002', 'Kerala\'s Largest Freshwater Lake', 'Drinking Water Source']
  }
];

const WETLAND_FACTS = [
  { fact: 'India has over 757,000 wetlands covering 15.3 million hectares — about 4.7% of the country\'s geographic area.' },
  { fact: 'The Sundarbans mangrove forest spans 10,000 km² across India and Bangladesh — the largest contiguous mangrove area on Earth.' },
  { fact: 'Chilika Lake in Odisha is Asia\'s largest brackish water lagoon, spanning 1,100 km² during monsoon season.' },
  { fact: 'Loktak Lake in Manipur is famous for its phumdis — floating heterotrophic masses of vegetation, soil, and organic matter.' },
  { fact: 'Wular Lake in Jammu & Kashmir is one of the largest freshwater lakes in Asia and a vital flood control basin for the Jhelum River.' },
  { fact: 'Deepor Beel in Assam is the only Ramsar Site in the Brahmaputra Valley and a critical habitat for the endangered Greater Adjutant Stork.' },
  { fact: 'India\'s wetlands support over 300 species of migratory birds that travel along the Central Asian Flyway.' },
  { fact: 'The East Kolkata Wetlands treat 60% of the city\'s sewage naturally while producing 13,000 tonnes of fish annually.' },
  { fact: 'Kolleru Lake in Andhra Pradesh is the largest freshwater lake in India, serving as a flood-balancing reservoir for the Krishna and Godavari river systems.' },
  { fact: 'Mangroves along India\'s coast protect over 40 million people from cyclones and storm surges, reducing wave height by up to 66%.' },
  { fact: 'Sambhar Lake in Rajasthan is India\'s largest inland saltwater lake and a major source of salt production.' },
  { fact: 'The Keoladeo National Park was originally a duck-hunting reserve for Maharajas and now hosts over 370 bird species.' },
];

const GALLERY_IMAGES = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Chilika_Lake_Boat.jpg/960px-Chilika_Lake_Boat.jpg', caption: 'Chilika Lake — Asia\'s largest brackish water lagoon' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Keoladeo_Ghana_Bird_Sanctuary.jpg/960px-Keoladeo_Ghana_Bird_Sanctuary.jpg', caption: 'Keoladeo National Park — A bird paradise in Bharatpur' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sundarbans_mangrove.jpg/960px-Sundarbans_mangrove.jpg', caption: 'Sundarbans Mangrove Forest — Home of the Royal Bengal Tiger' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Loktak_Lake_View.jpg/960px-Loktak_Lake_View.jpg', caption: 'Loktak Lake — The floating lake of Manipur' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pulicat_Lake_Birds.jpg/960px-Pulicat_Lake_Birds.jpg', caption: 'Pulicat Lake — Flamingo paradise on the Coromandel Coast' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/East_Kolkata_Wetlands.jpg/960px-East_Kolkata_Wetlands.jpg', caption: 'East Kolkata Wetlands — Wastewater-fed aquaculture marvel' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Vembanad_Lake_Kerala.jpg/960px-Vembanad_Lake_Kerala.jpg', caption: 'Vembanad-Kol Wetland — Kerala\'s backwater ecosystem' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Wular_Lake.jpg/960px-Wular_Lake.jpg', caption: 'Wular Lake — One of Asia\'s largest freshwater lakes' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Bhitarkanika_Mangroves.jpg/960px-Bhitarkanika_Mangroves.jpg', caption: 'Bhitarkanika Mangroves — Odisha\'s tidal treasure' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sambhar_Lake.jpg/960px-Sambhar_Lake.jpg', caption: 'Sambhar Lake — India\'s largest inland salt lake' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lonar_Lake.jpg/960px-Lonar_Lake.jpg', caption: 'Lonar Lake — Maharashtra\'s unique crater lake' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ashtamudi_Wetlands.jpg/960px-Ashtamudi_Wetlands.jpg', caption: 'Ashtamudi Wetland — Kerala\'s palm-fringed backwater' },
];
