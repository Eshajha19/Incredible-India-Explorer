/**
 * Periyar National Park Explorer Dataset
 * Comprehensive data covering Periyar Lake, Asian Elephants, Boat Safari,
 * Spice Forests, Wildlife Biodiversity, Interactive Map Hotspots, and Photo Gallery.
 */

const PERIYAR_DATA = {
    id: 'periyar',
    name: 'Periyar National Park & Tiger Reserve',
    location: 'Thekkady, Idukki & Pathanamthitta Districts, Kerala',
    established: 1982,
    coreArea: '350 km²',
    bufferArea: '575 km²',
    totalArea: '925 km²',
    altitude: '100m – 2016m (Kottamalai Peak)',
    lakeArea: '26 km²',
    coordinates: { lat: 9.46, lng: 77.15 },

    quickStats: [
        { label: 'Asian Elephant Population', value: '1,000+', icon: '🐘' },
        { label: 'Periyar Lake Area', value: '26 km²', icon: '🌊' },
        { label: 'Bird Species', value: '320+', icon: '🦅' },
        { label: 'Annual Visitors', value: '500,000+', icon: '🚢' }
    ],

    lakeAndBoating: {
        title: 'Periyar Artificial Lake & Boat Safaris',
        description: 'Formed by the construction of the Mullaperiyar Dam across the Periyar River in 1895, the 26 km² serene lake with submerged tree stumps forms the aquatic lifeline of the reserve. KTDC double-decker boats ferry visitors across calm waters where herds of wild elephants, gaurs, and sambar deer gather at the water edge to drink and bathe.',
        safariRules: [
            'Five boat safari slots daily (7:30 AM, 9:30 AM, 11:15 AM, 1:45 PM, 3:30 PM).',
            'Life jackets mandatory for all passengers during the 90-minute cruise.',
            'Advance online booking recommended via Kerala Forest & Wildlife Dept portal.',
            'Plastic-free sanctuary zone — littering strictly prohibited.'
        ]
    },

    elephantsAndFauna: [
        {
            name: 'Asian Elephant (Elephas maximus)',
            status: 'Flagship Species',
            desc: 'Periyar is one of India\'s premier Project Elephant reserves. Large herds of 20–30 wild elephants including mothers with calves graze along the grassy banks of Periyar Lake.',
            icon: '🐘'
        },
        {
            name: 'Bengal Tiger (Panthera tigris)',
            status: 'Apex Predator',
            desc: 'Periyar protects an estimated 40+ Bengal Tigers roaming dense evergreen canopy and bamboo brakes. Tracked via camera traps and pugmark census.',
            icon: '🐅'
        },
        {
            name: 'Nilgiri Langur (Semnopithecus johnii)',
            status: 'Endemic Primate',
            desc: 'Glossy black coat with yellowish-brown crown hair. Endemic to the Western Ghats; commonly spotted leaping through tree canopies.',
            icon: '🐒'
        },
        {
            name: 'Malabar Giant Squirrel (Ratufa indica)',
            status: 'Arboreal Herbivore',
            desc: 'Striking multi-colored tree squirrel with maroon and buff fur that builds large globular nests high up in Sal and evergreen trees.',
            icon: '🐿️'
        },
        {
            name: 'Gaur (Indian Bison)',
            status: 'Vulnerable Bovine',
            desc: 'Massive wild ox species standing up to 2 meters tall with distinctive white stockings on legs; seen grazing near lake fringes.',
            icon: '🐂'
        },
        {
            name: 'Great Indian Hornbill',
            status: 'Avian Icon',
            desc: 'Resplendent bird with impressive yellow-and-black casque. Periyar harbors 320+ bird species including Malabar Grey Hornbills and Fish Eagles.',
            icon: '🦅'
        }
    ],

    spiceForests: {
        title: 'Cardamom Hills & Spice Forest Plantations',
        description: 'Thekkady is surrounded by lush Cardamom Hills blanketed in misty evergreen, semi-evergreen, and moist deciduous rainforests. The region is India\'s spice heartland, producing high-grade Malabar Black Pepper, Green Cardamom, Cinnamon, Nutmeg, Clove, Tea, and Coffee plantations.',
        spices: [
            { name: 'Green Cardamom', desc: 'Queen of Spices grown under shady forest canopy.' },
            { name: 'Malabar Black Pepper', desc: 'Black Gold exported globally since ancient Roman spice routes.' },
            { name: 'Cinnamon & Nutmeg', desc: 'Aromatic bark and seeds harvested in eco-tours.' },
            { name: 'Organic Tea & Coffee', desc: 'Sloping estate plantations dotting Kumily and Vandiperiyar.' }
        ]
    },

    safariZones: [
        {
            id: 'zone-lake',
            name: 'KTDC Lake Boat Cruise',
            timing: '7:30 AM – 4:00 PM',
            highlight: 'Best for spotting elephants, waterbirds, and sambar deer along lake banks.',
            desc: 'Scenic 90-minute boat ride on Periyar Lake operated by KTDC.'
        },
        {
            id: 'zone-rafting',
            name: 'Bamboo Rafting & Trekking',
            timing: '8:00 AM – 5:00 PM (Full Day)',
            highlight: 'Dawn-to-dusk eco-program combining trekking through forests and bamboo rafting.',
            desc: 'Guided by tribal eco-guides across remote forest zones.'
        },
        {
            id: 'zone-night',
            name: 'Jungle Patrol (Night Trek)',
            timing: '7:00 PM – 4:00 AM (3-hour slots)',
            highlight: 'Night patrolling program accompanied by armed forest guards.',
            desc: 'Thrilling nocturnal wildlife experience listening to night calls.'
        },
        {
            id: 'zone-trail',
            name: 'Periyar Tiger Trail',
            timing: '2 Days / 1 Night Camping',
            highlight: 'Deep wilderness trekking led by rehabilitated former poachers turned eco-guides.',
            desc: 'Extreme adventure trekking with wilderness tent camping inside core reserve.'
        }
    ],

    mapHotspots: [
        { id: 'gate', name: 'Thekkady Main Entrance Gate', x: 220, y: 150, desc: 'Primary entry checkpoint and ticket counter for visitors.' },
        { id: 'jetty', name: 'KTDC Boat Jetty & Lake', x: 450, y: 280, desc: 'Embarkation point for KTDC double-decker boat safaris across Periyar Lake.' },
        { id: 'rafting', name: 'Bamboo Rafting Base', x: 680, y: 200, desc: 'Starting point for full-day bamboo rafting and forest treks.' },
        { id: 'marsh', name: 'Elephant Marsh Banks', x: 580, y: 420, desc: 'Lush grassy lake fringes where wild elephant herds congregate daily.' },
        { id: 'spice', name: 'Kumily Spice Garden Zone', x: 150, y: 460, desc: 'Organic cardamom, pepper, and cinnamon plantation walks.' }
    ],

    gallery: [
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Periyar_National_Park_02.jpg/960px-Periyar_National_Park_02.jpg',
            caption: 'Herd of wild Asian Elephants drinking at Periyar Lake shoreline.'
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Periyar_lake.jpg/960px-Periyar_lake.jpg',
            caption: 'KTDC Boat Safari cruising on serene waters of Periyar Artificial Lake.'
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Gaur_at_Periyar.jpg/960px-Gaur_at_Periyar.jpg',
            caption: 'Massive Gaur (Indian Bison) grazing in Periyar savanna meadows.'
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Nilgiri_Langur_Thekkady.jpg/960px-Nilgiri_Langur_Thekkady.jpg',
            caption: 'Endemic Nilgiri Langur perched on evergreen forest canopy.'
        }
    ]
};

if (typeof module !== 'undefined') {
    module.exports = { PERIYAR_DATA };
}
