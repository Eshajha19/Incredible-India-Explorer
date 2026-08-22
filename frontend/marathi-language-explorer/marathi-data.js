/**
 * Marathi Language Explorer — Data Module
 * Comprehensive dataset covering Marathi (मराठी), Devanagari script,
 * verified greeting (नमस्कार - Namaskar / जय महाराष्ट्र), audio synthesis dataset,
 * 10 essential words, Indo-Aryan lineage, Classical Language status,
 * and rich literary heritage of Sant Dnyaneshwar, Sant Tukaram, and Kusumagraj.
 */

const MARATHI_INFO = {
    id: "marathi-language",
    name: "Marathi",
    nativeName: "मराठी",
    script: "Devanagari (Balbodh style / historical Modi script)",
    family: "Indo-Aryan (Southern Indo-Aryan branch)",
    status: "Classical Language of India (Conferred in 2024)",
    greeting: "नमस्कार (Namaskar) / जय महाराष्ट्र (Jai Maharashtra)",
    greetingTranslit: "Namaskar / Jai Maharashtra",
    greetingMeaning: "Respectful Greetings / Victory to Maharashtra",
    speakersIndia: "Over 83 Million Speakers (3rd Most Spoken Language in India)",
    majorRegions: "Maharashtra, Goa (Konkan), Karnataka & Madhya Pradesh border belts, Daman & Diu",
    marathiLanguageDay: "February 27 (Birth anniversary of poet Kusumagraj)",
    quickStats: [
        { label: "Native Name", value: "मराठी (Marathi)", icon: "📜" },
        { label: "Speakers", value: "83M+ (3rd in India)", icon: "👥" },
        { label: "Language Family", value: "Indo-Aryan", icon: "🌐" },
        { label: "Bhasha Diwas", value: "27 February", icon: "📅" },
        { label: "Spiritual Apex", value: "Sant Dnyaneshwar", icon: "🪶" },
        { label: "Classical Status", value: "Classical Language", icon: "🏛️" }
    ]
};

const VOCABULARY = [
    { native: "धन्यवाद", translit: "Dhanyavaad", meaning: "Thank you", ipa: "[d̪ʱən.jə.ʋaːd̪]" },
    { native: "स्वागत आहे", translit: "Swaagat aahe", meaning: "Welcome", ipa: "[sʋaː.ɡət̪ aː.heː]" },
    { native: "प्रेम", translit: "Prem", meaning: "Love / Affection", ipa: "[preːm]" },
    { native: "मित्र / सखा", translit: "Mitra / Sakha", meaning: "Friend", ipa: "[mɪt̪.rə]" },
    { native: "पुस्तक", translit: "Pustak", meaning: "Book", ipa: "[pus.t̪ək]" },
    { native: "घर", translit: "Ghar", meaning: "House / Home", ipa: "[ɡʱəɾ]" },
    { native: "पाणी", translit: "Paani", meaning: "Water", ipa: "[paː.ɳiː]" },
    { native: "आनंद", translit: "Aanand", meaning: "Joy / Happiness", ipa: "[aː.nən̪.d̪]" },
    { native: "सुंदर", translit: "Sundar", meaning: "Beautiful", ipa: "[sun̪.d̪əɾ]" },
    { native: "तुम्ही कसे आहात?", translit: "Tumhi kase aahaat?", meaning: "How are you? (formal)", ipa: "[t̪um.ɦiː kə.seː aː.ɦaːt̪]" }
];

const LITERARY_LEGENDS = [
    {
        author: "Sant Dnyaneshwar (1275–1296 CE)",
        title: "Pioneering Bhakti Saint & Philosopher",
        description: "Composed the Dnyaneshwari (Bhavartha Deepika) and Amrutanubhav, establishing Marathi as a sublime medium for profound philosophical discourse.",
        icon: "👑"
    },
    {
        author: "Sant Tukaram (1608–1649 CE)",
        title: "Bhakti Saint & Abhanga Composer",
        description: "Composed thousands of devotional Abhangas celebrating egalitarian love and devotion to Lord Vithoba of Pandharpur.",
        icon: "✨"
    },
    {
        author: "Kusumagraj (Vishnu Vaman Shirwadkar, 1912–1999)",
        title: "Jnanpith Laureate & Playwright",
        description: "Author of the masterpiece play 'Natsamrat' and stirring modernist poetry; his birthday is celebrated as Marathi Bhasha Gaurav Din.",
        icon: "🌟"
    },
    {
        author: "Pu La Deshpande (1919–2000)",
        title: "Beloved Humorist & Cultural Icon",
        description: "Legendary playwright, satirist, and solo performer who captured the quintessential pulse of Maharashtrian cultural life.",
        icon: "🎭"
    }
];

const REFERENCES = [
    { text: "Rajya Marathi Vikas Sanstha (RMVS), Directorate of Language, Govt. of Maharashtra.", link: "https://rmvs.maharashtra.gov.in" },
    { text: "Maharashtra Sahitya Parishad — Pune.", link: "https://www.masapapune.org" },
    { text: "Feldhaus, Anne (1996). Images of Women in Maharashtrian Literature and Religion. SUNY Press.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MARATHI_INFO, VOCABULARY, LITERARY_LEGENDS, REFERENCES };
}
