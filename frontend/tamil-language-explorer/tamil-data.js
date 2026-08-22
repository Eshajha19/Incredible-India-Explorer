/**
 * Tamil Language Explorer — Data Module
 * Comprehensive dataset covering Tamil (தமிழ்), Classical Language of India,
 * Tamil Brahmi/Vatteluttu script evolution, verified greeting (வணக்கம் - Vanakkam),
 * audio synthesis dataset, 10 essential words, Dravidian family,
 * and 2,500+ years of Sangam literature, Thirukkural, and modern poetry.
 */

const TAMIL_INFO = {
    id: "tamil-language",
    name: "Tamil",
    nativeName: "தமிழ்",
    script: "Tamil Script (Grantha / Tamil Brahmi evolution)",
    family: "Dravidian (Southern Dravidian branch)",
    status: "Classical Language of India (First language declared Classical in 2004)",
    greeting: "வணக்கம் (Vanakkam)",
    greetingTranslit: "Vanakkam",
    greetingMeaning: "Respectful Greetings / Salutations",
    speakersWorld: "Over 85 Million Global Speakers",
    majorRegions: "Tamil Nadu, Puducherry, Sri Lanka, Singapore, Malaysia, Mauritius, South Africa",
    literaryHeritage: "Sangam Literature, Tolkappiyam, Thirukkural, Silappatikaram",
    quickStats: [
        { label: "Native Name", value: "தமிழ் (Tamil)", icon: "📜" },
        { label: "Heritage", value: "Classical (2500+ Yrs)", icon: "🏛️" },
        { label: "Language Family", value: "Dravidian", icon: "🌐" },
        { label: "Key Masterpiece", value: "Thirukkural", icon: "📖" },
        { label: "Global Reach", value: "85M+ Speakers", icon: "🌏" },
        { label: "Modern Bard", value: "Mahakavi Bharatiyar", icon: "🪶" }
    ]
};

const VOCABULARY = [
    { native: "நன்றி", translit: "Nandri", meaning: "Thank you", ipa: "[n̪ən.drɪ]" },
    { native: "நல்வரவு", translit: "Nalvaravu", meaning: "Welcome", ipa: "[n̪əl.ʋə.rə.ʋɯ]" },
    { native: "அன்பு", translit: "Anbu", meaning: "Love / Kindness", ipa: "[ən.bɯ]" },
    { native: "நண்பன்", translit: "Nanban", meaning: "Friend", ipa: "[n̪əɳ.bən]" },
    { native: "புத்தகம் / நூல்", translit: "Puthagam / Nool", meaning: "Book", ipa: "[put̪.t̪ə.ɡəm]" },
    { native: "வீடு", translit: "Veedu", meaning: "Home / House", ipa: "[ʋiː.ɖɯ]" },
    { native: "தண்ணீர் / நீர்", translit: "Thanneer / Neer", meaning: "Water", ipa: "[t̪əɳ.ɳiːr]" },
    { native: "மகிழ்ச்சி", translit: "Magizhchi", meaning: "Happiness / Joy", ipa: "[mə.ɡiɻ.tʃɪ]" },
    { native: "அழகிய", translit: "Azhagiya", meaning: "Beautiful", ipa: "[ə.ɻə.ɡɪ.jə]" },
    { native: "எப்படி இருக்கிறீர்கள்?", translit: "Eppadi irukkireergal?", meaning: "How are you? (formal)", ipa: "[ep.pə.ɖɪ i.ɾuk.ki.ɾiːr.ɡəɭ]" }
];

const LITERARY_LEGENDS = [
    {
        author: "Thiruvalluvar (c. 4th Century BCE – 5th Century CE)",
        title: "Author of Thirukkural",
        description: "Revered philosopher whose 1,330 couplets (Kurals) provide universal ethical guidelines on virtue (Aram), wealth (Porul), and love (Inbam).",
        icon: "👑"
    },
    {
        author: "Avvaiyar (Sangam & Medieval Periods)",
        title: "Iconic Sangam Poetess & Moral Philosopher",
        description: "Author of Aathichoodi, Konraiventhan, and numerous lyrical poems celebrating wisdom, courage, and moral rectitude.",
        icon: "✨"
    },
    {
        author: "Ilango Adigal (c. 5th–6th Century CE)",
        title: "Composer of Silappatikaram",
        description: "Author of one of the Five Great Epics of Tamil literature, immortalizing the righteous wrath of Kannagi.",
        icon: "🌟"
    },
    {
        author: "Subramania Bharati (1882–1921)",
        title: "Mahakavi Bharatiyar (The Great Poet)",
        description: "Pioneering patriotic poet, feminist champion, and social reformer who modernized Tamil poetic expression.",
        icon: "🪶"
    }
];

const REFERENCES = [
    { text: "Central Institute of Classical Tamil (CICT), Ministry of Education, Govt. of India.", link: "https://www.cict.in" },
    { text: "Tamil Virtual Academy (TVA), Information Technology Department, Govt. of Tamil Nadu.", link: "https://www.tamilvu.org" },
    { text: "Zvelebil, Kamil (1973). The Smile of Murugan: On Tamil Literature of South India. E.J. Brill, Leiden.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TAMIL_INFO, VOCABULARY, LITERARY_LEGENDS, REFERENCES };
}
