/**
 * Chilika Lake Explorer Dataset
 * Asia's largest brackish water lagoon & Ramsar Site #229
 */

export const CHILIKA_DATA = {
    id: 'chilika-lake',
    name: 'Chilika Lake Explorer',
    subtitle: 'Asia\'s Largest Brackish Water Lagoon & Sanctuary of the Irrawaddy Dolphin',
    location: 'Puri, Khordha & Ganjam Districts, Odisha',
    ramsarSiteNo: 229,
    ramsarDeclared: 1981,
    area: '1,165 km² (Monsoon) / 906 km² (Summer)',
    length: '64 km',
    width: '18 km',
    type: 'Brackish Water Coastal Lagoon',
    coordinates: { lat: 19.7, lng: 85.3 },

    stats: [
        { label: 'Total Lagoon Area', value: '1,165 km²', icon: '🌊' },
        { label: 'Irrawaddy Dolphin Pop.', value: '150+', icon: '🐬' },
        { label: 'Winter Waterfowl Count', value: '1,000,000+', icon: '🦩' },
        { label: 'Fishing Villages', value: '132 Villages', icon: '🚣' }
    ],

    history: {
        title: 'Maritime Heritage & Ancient Port of Kalinga',
        content: 'Chilika has a rich historical lineage dating back over 2,000 years. Chinese traveler Hiuen Tsang referenced the port of Che-li-ta-lo near the bay. Ancient sea-farers of Kalinga set sail from Chilika\'s harbour to trade spices, silks, and gemstones across Southeast Asia including Java, Sumatra, Bali, and Sri Lanka.'
    },

    geography: {
        title: 'Geography & Salinity Zones',
        content: 'Formed by silt deposition from the Daya River and tides from the Bay of Bengal, Chilika is a shallow pear-shaped lagoon separated from the ocean by a 60 km sandy spit called Rajhans. The lagoon is divided into 4 salinity zones:',
        zones: [
            { name: 'Northern Zone', detail: 'Freshwater zone dominated by riverine inflow from Daya and Bhargavi rivers.' },
            { name: 'Central Zone', detail: 'Brackish water mixing zone rich in plankton and fish biodiversity.' },
            { name: 'Southern Zone', detail: 'High salinity zone surrounded by scenic granite hills at Rambha.' },
            { name: 'Outer Channel', detail: 'Seawater channel connecting Satapada mouth to the open Bay of Bengal.' }
        ]
    },

    ramsarSite: {
        title: 'India\'s First Ramsar Wetland Site',
        content: 'In 1981, Chilika Lake was designated India\'s very first Wetland of International Importance under the Ramsar Convention. In 2002, following successful eco-restoration by the Chilika Development Authority (CDA) including opening a new sea mouth, Chilika became the first site in Asia to be removed from the Montreux Record of threatened wetlands.'
    },

    irrawaddyDolphins: {
        title: 'Irrawaddy Dolphins (Orcaella brevirostris)',
        subtitle: 'Home to one of only two lagoonal populations of Irrawaddy Dolphins worldwide.',
        content: 'The quiet waters off Satapada island are famous for Irrawaddy Dolphins. Known for their blunt, rounded heads and expressive faces, these playful marine mammals surface regularly in the channel, coexisting peacefully with traditional fishermen.',
        facts: [
            'Satapada is the primary dolphin sighting hub with eco-guided boat tours.',
            'Strict speed limits and propeller guards protect dolphins from boat strikes.',
            'Acoustic underwater monitoring tracks dolphin vocalizations.'
        ]
    },

    migratoryBirds: {
        title: 'Avian Paradise along the Central Asian Flyway',
        content: 'Every winter between November and February, over a million migratory birds fly thousands of kilometers from Siberia, Mongolia, Kazakhstan, and the Himalayas to winter at Chilika.',
        species: [
            { name: 'Greater & Lesser Flamingos', desc: 'Thousands of pink flamingos wading in shallow waters.' },
            { name: 'Bar-headed Goose', desc: 'World\'s highest-flying bird species resting during winter migration.' },
            { name: 'Northern Pintail & Gadwall', desc: 'Dabbling ducks foraging on submerged aquatic vegetation.' },
            { name: 'White-bellied Sea Eagle', desc: 'Raptor nesting in tall trees along the lagoon shores.' }
        ]
    },

    nalabanaSanctuary: {
        title: 'Nalabana Bird Sanctuary',
        content: 'Notified as a Wildlife Sanctuary in 1987, Nalabana (meaning "Island of Reeds") is a 15.5 km² island located in the central zone. During monsoon rains, the island completely submerges underwater. As winter waters recede, vast mudflats emerge, providing feeding habitat for thousands of waders and storks.'
    },

    fishingCommunities: {
        title: 'Traditional Fishing Communities',
        content: 'Over 150,000 traditional fishermen belonging to 132 villages around the lagoon rely on Chilika for their livelihood. They practice sustainable traditional fishing techniques including bamboo net enclosures (Khatta) and traditional wooden boats (Kundu).'
    },

    hotspots: [
        { id: 'satapada', name: 'Satapada Dolphin Point', lat: 19.67, lng: 85.45, desc: 'Gateway for Irrawaddy Dolphin sightings and sea mouth cruise.' },
        { id: 'nalabana', name: 'Nalabana Bird Sanctuary', lat: 19.69, lng: 85.25, desc: 'Protected bird sanctuary island teeming with winter waterfowl.' },
        { id: 'kalijai', name: 'Kalijai Temple Island', lat: 19.65, lng: 85.20, desc: 'Sacred island temple dedicated to Goddess Kalijai, patron deity of sailors.' },
        { id: 'mangalajodi', name: 'Mangalajodi Bird Village', lat: 19.91, lng: 85.42, desc: 'Community-managed eco-tourism village famed for close-up marshland birding.' },
        { id: 'rambha', name: 'Rambha Bay & Islands', lat: 19.52, lng: 85.10, desc: 'Scenic southern bay dotted with Honeymoon and Breakfast islands.' }
    ],

    gallery: [
        { title: 'Irrawaddy Dolphin Surfacing', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Chilika_Lake_Odisha.jpg/960px-Chilika_Lake_Odisha.jpg', caption: 'Irrawaddy Dolphin near Satapada in Chilika Lake.' },
        { title: 'Flamingos at Nalabana', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flamingos_Chilika_Lake.jpg/960px-Flamingos_Chilika_Lake.jpg', caption: 'Flamingo flock resting on shallow waters.' },
        { title: 'Goddess Kalijai Temple', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kalijai_Temple_Chilika.jpg/960px-Kalijai_Temple_Chilika.jpg', caption: 'Island temple surrounded by blue lagoon waters.' },
        { title: 'Traditional Fishing Boat', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Fishermen_Chilika.jpg/960px-Fishermen_Chilika.jpg', caption: 'Local fishermen gliding across morning waters.' }
    ],

    facts: [
        'Chilika was the first Asian wetland to recover so well that it was removed from the Montreux Record.',
        'The water salinity changes dynamically across seasons — nearly fresh in monsoon and ocean-salty in summer.',
        'Legend says Goddess Kalijai protects fishermen caught in sudden squalls on the lake.'
    ]
};
