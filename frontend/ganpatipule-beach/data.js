/* ==========================================================================
   Ganpatipule Beach Data
   Comprehensive dataset for heritage timeline, beach features, and culture.
   ========================================================================== */

/**
 * Heritage timeline of the Swayambhu Ganesh Temple.
 */
const heritageTimeline = [
    { year: '1600s', title: 'Discovery of the Swayambhu Idol', desc: 'A local Brahmin named Bhalaji Bhide discovered a naturally formed (swayambhu) idol of Lord Ganesha in a sand dune near the beach. The idol was found to be self-manifested, not carved by human hands.' },
    { year: '1650', title: 'Temple Construction Begins', desc: 'A small temple structure was built around the swayambhu idol. The location on the sand dune near the sea gave the place its name: Ganpati (Ganesha) + Pule (sand dune).' },
    { year: '1700s', title: 'Maratha Patronage', desc: 'The temple received patronage from Maratha rulers and local chieftains. The structure was expanded and a proper sanctum sanctorum was built.' },
    { year: '1800s', title: 'British Era Renovations', desc: 'Despite British colonial rule, the temple continued to thrive. Local communities maintained the temple and annual festivals grew in scale.' },
    { year: '1950s', title: 'Post-Independence Development', desc: 'After India\'s independence, the temple trust undertook major renovations. The current temple structure with traditional Konkan architecture was completed.' },
    { year: '2000s', title: 'Tourism Hub Emerges', desc: 'Ganpatipule gained recognition as both a pilgrimage site and beach destination. The Maharashtra Tourism Development Corporation (MTDC) developed resort facilities nearby.' }
];

/**
 * Temple architecture and traditions.
 */
const heritageFeatures = [
    {
        icon: '🛕',
        title: 'Swayambhu Idol',
        desc: 'The main idol is naturally formed from red laterite stone, not sculpted by human hands. Devotees believe it has divine origins and immense spiritual power.'
    },
    {
        icon: '🎨',
        title: 'Konkan Architecture',
        desc: 'The temple features traditional Konkan architectural style with sloping red-tiled roofs, wooden pillars, and intricate carvings depicting scenes from Hindu mythology.'
    },
    {
        icon: '🪔',
        title: 'Daily Rituals',
        desc: 'Five aartis are performed daily: Kakad Aarti (dawn), Madhyanh Aarti (noon), Dhup Aarti (evening), Sheja Aarti (night), and special festival aartis during Ganesh Chaturthi.'
    },
    {
        icon: '🙏',
        title: 'Pradakshina Path',
        desc: 'The circumambulation path around the temple offers views of the Arabian Sea. Devotees walk barefoot on the red soil, believing it purifies the soul.'
    },
    {
        icon: '🎋',
        title: 'Sacred Trees',
        desc: 'Ancient banyan and peepal trees surround the temple complex, considered abodes of spirits. Devotees tie sacred threads (mauli) to branches while making wishes.'
    },
    {
        icon: '📿',
        title: 'Meditation Caves',
        desc: 'Small caves near the temple are used by ascetics for meditation. The sound of waves provides a natural backdrop for spiritual practices.'
    }
];

/**
 * Beach features and natural characteristics.
 */
const beachFeatures = [
    {
        icon: '🏖️',
        title: 'Clean White Sand',
        desc: 'The beach features pristine white sand, relatively clean compared to many Indian beaches. The sand is fine and comfortable for walking barefoot.'
    },
    {
        icon: '🌊',
        title: 'Gentle Waves',
        desc: 'The Arabian Sea waves at Ganpatipule are gentle, making it safe for wading and swimming. The gradual slope of the beach allows easy entry into the water.'
    },
    {
        icon: '🌅',
        title: 'Spectacular Sunsets',
        desc: 'The west-facing beach offers stunning sunset views over the Arabian Sea. The sky transforms into shades of orange, pink, and purple each evening.'
    },
    {
        icon: '🌴',
        title: 'Coconut Palm Fringe',
        desc: 'The beach is lined with coconut palms providing natural shade. The sound of rustling palm fronds mixed with waves creates a peaceful atmosphere.'
    },
    {
        icon: '🦀',
        title: 'Tide Pool Life',
        desc: 'During low tide, rocky areas reveal tide pools with crabs, small fish, sea anemones, and colorful shells - fascinating for children and nature enthusiasts.'
    },
    {
        icon: '🐚',
        title: 'Shell Collecting',
        desc: 'The beach is rich in seashells, especially after high tides. Visitors collect cowries, conch shells, and sand dollars as souvenirs.'
    }
];

/**
 * Nearby attractions and beaches.
 */
const nearbyData = [
    {
        icon: '🏰',
        title: 'Jaigad Fort',
        desc: 'A 16th-century Maratha sea fort located 14 km from Ganpatipule at the confluence of the Shastri River and Arabian Sea. Offers panoramic coastal views.'
    },
    {
        icon: '🛕',
        title: 'Arey Ware Beach',
        desc: 'A quieter, less crowded beach 6 km from Ganpatipule, known for its rocky formations, fishing boats, and authentic coastal village atmosphere.'
    },
    {
        icon: '🌳',
        title: 'Prachitgad Fort',
        desc: 'A hill fort 30 km away offering trekking opportunities and views of the Sahyadri mountains. Built by Chhatrapati Shahu Maharaj in the 18th century.'
    },
    {
        icon: '🏛️',
        title: 'Thiba Palace',
        desc: 'The exile palace of King Thiba of Burma (Myanmar) in Ratnagiri (25 km). Built by the British in 1911, now a museum showcasing Burmese artifacts.'
    }
];

/**
 * Konkan cuisine specialties.
 */
const konkanFoods = [
    { name: 'Amboli', desc: 'Savory fermented rice pancakes, a breakfast staple. Served with coconut chutney and spicy potato bhaji. Light and easy to digest.' },
    { name: 'Sol Kadhi', desc: 'Pink digestive drink made from kokum fruit and coconut milk. The signature beverage of Konkan, balancing spicy meals with its cooling properties.' },
    { name: 'Modak', desc: 'Sweet dumplings with coconut-jaggery filling in rice flour shells. The favorite sweet of Lord Ganesha, especially prepared during Ganesh Chaturthi.' },
    { name: 'Phanas Poli', desc: 'Sweet flatbread made from jackfruit pulp, wheat flour, and jaggery. A seasonal delicacy prepared during the jackfruit harvest (May-June).' },
    { name: 'Kulith Pithla', desc: 'Thick curry made from horse gram (kulith) lentils, served with bhakri (millet bread). A protein-rich traditional meal of Konkan farmers.' }
];

/**
 * Cultural festivals and traditions.
 */
const culturalTraditions = [
    { name: 'Ganesh Chaturthi', desc: 'The most important festival, lasting 10 days. The temple sees thousands of devotees. Elaborate decorations, cultural programs, and special aartis are performed.' },
    { name: 'Magha Chaturthi', desc: 'Celebrated in January/February, marking the beginning of the agricultural season. Farmers worship Ganesha for good harvests and offer first fruits.' },
    { name: 'Angarika Chaturthi', desc: 'Falls on Tuesdays (Mangalvar) that coincide with Chaturthi. Considered highly auspicious for Ganesha worship with special abhishek (ritual bath).' },
    { name: 'Gudi Padwa', desc: 'Maharashtrian New Year celebrated in March/April. Homes are decorated with gudis (bamboo poles with neem leaves and sugar crystals) symbolizing victory and prosperity.' },
    { name: 'Narali Purnima', desc: 'Coconut day festival in August marking the end of monsoon. Fishermen offer coconuts to Varuna (sea god) and begin the new fishing season with rituals.' }
];

/**
 * Image gallery data.
 */
const galleryData = [
    { src: 'https://placehold.co/400x400/FF8C00/fff?text=Ganesh+Temple', alt: 'Swayambhu Ganesh Temple', caption: 'The 400-year-old Swayambhu Ganesh Temple on the beach' },
    { src: 'https://placehold.co/400x400/C84B31/fff?text=Red+Soil+Coast', alt: 'Red laterite soil coast', caption: 'The distinctive red laterite soil of the Konkan coast' },
    { src: 'https://placehold.co/400x400/FF9933/fff?text=Temple+Aarti', alt: 'Evening temple aarti', caption: 'Dhup Aarti ceremony at sunset in the temple' },
    { src: 'https://placehold.co/400x400/6B4423/fff?text=Pristine+Beach', alt: 'Clean white sand beach', caption: 'Pristine white sand beach with coconut palms' },
    { src: 'https://placehold.co/400x400/E65100/fff?text=Sunset+View', alt: 'Sunset over Arabian Sea', caption: 'Spectacular sunset over the Arabian Sea' },
    { src: 'https://placehold.co/400x400/BF360C/fff?text=Konkan+Cuisine', alt: 'Traditional Konkan thali', caption: 'Authentic Konkan vegetarian thali with modak' },
    { src: 'https://placehold.co/400x400/FF6B00/fff?text=Temple+Architecture', alt: 'Temple architecture details', caption: 'Intricate carvings on the temple walls' },
    { src: 'https://placehold.co/400x400/2D1B14/fff?text=Sacred+Trees', alt: 'Sacred banyan tree', caption: 'Ancient banyan tree with sacred threads' }
];
