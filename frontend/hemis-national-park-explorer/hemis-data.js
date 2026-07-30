/**
 * Hemis National Park Explorer Dataset
 * Comprehensive data covering Snow Leopards, High-Altitude Cold Desert Ecosystem,
 * Himalayan Wildlife, Trekking Routes, Geography, Sub-Arctic Climate, Interactive Map Hotspots, and Conservation.
 */

export const HEMIS_DATA = {
    id: 'hemis',
    name: 'Hemis National Park',
    location: 'Leh District, Ladakh Union Territory',
    established: 1981,
    totalArea: '4,400 km²',
    altitude: '3,000m – 6,000m (Stok Kangri 6,153m)',
    coordinates: { lat: 33.91, lng: 77.42 },
    type: 'High-Altitude Cold Desert National Park',

    quickStats: [
        { label: 'Total Protected Area', value: '4,400 km²', icon: '🏔️' },
        { label: 'Snow Leopard Density', value: 'Highest Worldwide (200+)', icon: '🐆' },
        { label: 'Altitude Range', value: '3,000 – 6,000m', icon: '⛰️' },
        { label: 'Mammal & Avian Species', value: '16 Mammals, 73 Birds', icon: '🦅' }
    ],

    snowLeopardSpotlight: {
        title: 'The Ghost of the Mountains (Panthera uncia)',
        subtitle: 'Hemis National Park is world-renowned as the global capital for Snow Leopard conservation.',
        densityDesc: 'With over 200 individuals inhabiting its high-altitude valleys, Hemis boasts the highest density of Snow Leopards anywhere on Earth. Known locally as "Shan", this elusive apex predator is perfectly adapted to steep, craggy slopes.',
        adaptations: [
            { title: 'Thick Smoky Fur', desc: 'Provides perfect camouflage against granitic crags and snow patches while insulating against -20°C temperatures.' },
            { title: 'Wide Paws & Furry Soles', desc: 'Act as natural snowshoes for grip on slippery scree slopes and deep snowdrifts.' },
            { title: 'Long Heavy Tail', desc: 'Nearly 1-meter long tail aids balance on steep cliffs and wraps around the body like a warm blanket during sleep.' },
            { title: 'Powerful Hind Legs', desc: 'Enables spectacular leaps up to 15 meters (50 feet) across ravine chasms.' }
        ],
        bestTrackingSeason: 'December to March (Winter) — prey species descend to valley bottoms, bringing snow leopards down to lower elevations.'
    },

    highAltitudeEcosystem: {
        title: 'High-Altitude Cold Desert Ecosystem',
        description: 'Bounded by the Indus River to the north, Hemis lies within the rain-shadow of the Greater Himalayas. It encompasses dry alpine pastures, steep scree slopes, glacial melt streams, and sparse scrub vegetation dominated by Caragana, Artemisia, Juniperus, and Salix bushes.',
        zones: [
            { name: 'Valley Bottoms (3,000 - 3,800m)', desc: 'Willows, poplars, and sea buckthorn along riverbanks; winter refuges for wildlife.' },
            { name: 'Alpine Scrub & Pastures (3,800 - 4,800m)', desc: 'Artemisia, wild roses, and alpine meadows where Bharal and Urial graze.' },
            { name: 'Nival & High Passes (4,800 - 6,000m+)', desc: 'Permanent snowfields, glaciers, and craggy ridges home to Snow Leopards and Golden Eagles.' }
        ]
    },

    himalayanWildlife: [
        {
            name: 'Bharal / Blue Sheep (Pseudois nayaur)',
            status: 'Primary Prey',
            desc: 'The primary prey of the Snow Leopard. Found on steep open slopes where they blend effortlessly with blue-grey slate rocks.',
            icon: '🐑'
        },
        {
            name: 'Ladakh Urial (Ovis vignei vignei)',
            status: 'Vulnerable Wild Sheep',
            desc: 'A rare wild sheep endemic to Ladakh, characterized by backward-curving horns. Inhabits lower valley grassy slopes.',
            icon: '🐐'
        },
        {
            name: 'Tibetan Wolf (Canis lupus chanco)',
            status: 'Predator',
            desc: 'Keystone predator roaming high plateaus and alpine meadows in small packs.',
            icon: '🐺'
        },
        {
            name: 'Eurasian Brown Bear (Ursus arctos isos)',
            status: 'Rare Omnivore',
            desc: 'Subspecies of brown bear inhabiting remote alpine valleys and digging for marmots and roots.',
            icon: '🐻'
        },
        {
            name: 'Golden Eagle & Himalayan Griffon',
            status: 'Apex Avian Raptors',
            desc: 'Majestic raptors soaring on thermal updrafts over high passes with wingspans exceeding 2 meters.',
            icon: '🦅'
        },
        {
            name: 'Royle’s Pika & Himalayan Marmot',
            status: 'Small Mammals',
            desc: 'Colonial rodents that whistle across boulders, providing critical food for eagles, foxes, and snow leopards.',
            icon: '🐹'
        }
    ],

    trekkingRoutes: [
        {
            id: 'markha-valley',
            name: 'Markha Valley Trek',
            duration: '6 – 8 Days',
            maxAltitude: '5,150m (Kongmaru La)',
            difficulty: 'Moderate to Challenging',
            desc: 'Ladakh\'s most iconic trek traversing ancient Ladakhi villages, Buddhist monasteries, Gandala Pass (4,900m), Kongmaru La (5,150m), and dramatic gorge canyons.',
            highlights: ['Tea-house stay in local villages', 'Crossing high mountain passes', 'Views of Kang Yatse peak (6,400m)']
        },
        {
            id: 'rumbak-trail',
            name: 'Rumbak Valley Snow Leopard Expedition',
            duration: '5 – 7 Days (Winter)',
            maxAltitude: '4,050m (Rumbak Village)',
            difficulty: 'Challenging (Winter Cold)',
            desc: 'The world-famous winter expedition starting from Zingchen into Rumbak Valley, guided by local Ladakhi trackers using high-power spotting scopes.',
            highlights: ['Homestays in Rumbak village', 'Spotting Snow Leopards and Bharal', 'Winter snowscapes of Ladakh']
        },
        {
            id: 'stok-kangri-base',
            name: 'Stok Kangri Base Camp Trek',
            duration: '4 – 5 Days',
            maxAltitude: '4,980m (Stok Base Camp)',
            difficulty: 'Challenging',
            desc: 'Trek along the Stok river valley providing panoramic views of the Zanskar Range and the towering Stok Kangri peak (6,153m).',
            highlights: ['Stok Palace Museum visit', 'Alpine ridge views over Leh valley', 'High-altitude glacier vistas']
        }
    ],

    geographyAndClimate: {
        geography: 'Spanning 4,400 km² south of the Indus River, Hemis is the largest notified national park in South Asia. It encompasses the Zanskar range, deep gorges of the Markha, Rumbak, and Sumdah rivers, and soaring peaks including Stok Kangri (6,153m).',
        climate: 'Hemis experiences a cold desert climate with sub-arctic conditions. Winters (Nov–Mar) are severely cold with temperatures dropping between -15°C and -30°C and snowfall across passes. Summers (Jun–Sep) feature clear skies and pleasant daytime temperatures between 15°C and 22°C.',
        bestTimeToVisit: 'June to October for trekking and greenery; December to March for Snow Leopard tracking and winter wildlife safaris.'
    },

    conservation: {
        title: 'Community-Based Conservation & Project Snow Leopard',
        desc: 'Hemis National Park pioneered community-managed wildlife conservation in India. Through the Snow Leopard Conservancy India Trust and Department of Wildlife Protection, local villagers run eco-homestays, benefit directly from eco-tourism, and maintain predator-proof livestock corrals, transforming former human-wildlife conflict into active stewardship.',
        initiatives: [
            { name: 'Himalayan Homestays', detail: 'Locally run homestays in Rumbak and Markha provide authentic hospitality while supplementing village incomes.' },
            { name: 'Predator-Proof Corrals', detail: 'Reinforced mesh enclosures prevent snow leopards from entering livestock pens, saving both livestock and snow leopards.' },
            { name: 'Nature Guide Training', detail: 'Local youths are trained as expert wildlife trackers, naturalists, and trekking guides.' }
        ]
    },

    mapHotspots: [
        {
            id: 'rumbak',
            name: 'Rumbak Valley',
            lat: 34.03,
            lng: 77.41,
            category: 'Wildlife & Tracking',
            desc: 'The global hotspot for Snow Leopard sightings, surrounded by rocky cliffs and home to Bharal herds.'
        },
        {
            id: 'markha',
            name: 'Markha Village & Valley',
            lat: 33.87,
            lng: 77.30,
            category: 'Trekking & Culture',
            desc: 'Picturesque valley village with ancient chortens, ruined fort, and lush barley fields amid stark mountains.'
        },
        {
            id: 'stok-kangri',
            name: 'Stok Kangri Peak',
            lat: 34.01,
            lng: 77.45,
            category: 'High Peak',
            desc: 'A prominent 6,153m peak dominating the skyline of Leh and Hemis National Park.'
        },
        {
            id: 'hemis-monastery',
            name: 'Hemis Monastery (Gompa)',
            lat: 33.91,
            lng: 77.70,
            category: 'Heritage Monastery',
            desc: '17th-century Tibetan Buddhist monastery of the Drukpa Lineage located at the eastern boundary of the park.'
        },
        {
            id: 'gandala-pass',
            name: 'Gandala Pass (4,900m)',
            lat: 34.01,
            lng: 77.35,
            category: 'Mountain Pass',
            desc: 'High mountain pass connecting Shingo to Rumbak Valley with sweeping views of the Zanskar range.'
        }
    ],

    gallery: [
        {
            title: 'Snow Leopard on Scree Slope',
            category: 'Wildlife',
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Snow_leopard_portrait.jpg/960px-Snow_leopard_portrait.jpg',
            caption: 'The elusive Snow Leopard camouflaged against high-altitude Ladakhi mountain slopes.'
        },
        {
            title: 'Rumbak Valley Landscape',
            category: 'Landscapes',
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Hemis_national_park.jpg/960px-Hemis_national_park.jpg',
            caption: 'Stark cold desert scenery and alpine valleys of Hemis National Park.'
        },
        {
            title: 'Bharal (Blue Sheep) Herd',
            category: 'Wildlife',
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Bharal_Pseudois_nayaur_by_Dr._Raju_Kasambe_DSCN5248_%281%29.jpg/960px-Bharal_Pseudois_nayaur_by_Dr._Raju_Kasambe_DSCN5248_%281%29.jpg',
            caption: 'Bharal grazing on steep rocky cliffs in Rumbak Valley.'
        },
        {
            title: 'Markha Valley Trek Route',
            category: 'Treks',
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Markha_Valley.jpg/960px-Markha_Valley.jpg',
            caption: 'Trekking route traversing ancient villages and high mountain passes.'
        },
        {
            title: 'Hemis Buddhist Gompa',
            category: 'Culture',
            url: 'assets/Hemis_Monastery.png',
            caption: 'The historic Hemis Monastery situated near the entrance of Hemis National Park.'
        }
    ]
};
