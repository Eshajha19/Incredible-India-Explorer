/**
 * Urdu Language Explorer — Data Module
 * Comprehensive dataset covering Urdu (اردو), Perso-Arabic Nastaliq script,
 * verified greeting (آداب / السلام علیکم), audio synthesis dataset,
 * 10 essential words, Indo-Aryan lineage, and classical poetry heritage (Ghalib, Faiz, Iqbal).
 */

const URDU_INFO = {
    id: "urdu-language",
    name: "Urdu",
    nativeName: "اردو",
    script: "Perso-Arabic (Nastaliq Calligraphy)",
    family: "Indo-Aryan (Indo-Iranian / Indo-European)",
    greeting: "آداب (Aadaab) / السلام علیکم (As-salamu alaykum)",
    greetingTranslit: "Aadaab / As-salamu alaykum",
    greetingMeaning: "Respectful Greetings / Peace be upon you",
    speakersIndia: "Over 50 Million (Scheduled Language of India)",
    majorRegions: "Delhi, Uttar Pradesh, Telangana (Hyderabad/Deccan), Jammu & Kashmir, Bihar, Maharashtra",
    poetryHeritage: "Rich tradition of Ghazal, Nazm, Marsiya, and Dastangoi",
    quickStats: [
        { label: "Native Name", value: "اردو (Urdu)", icon: "📜" },
        { label: "Script", value: "Nastaliq Script", icon: "✒️" },
        { label: "Language Family", value: "Indo-Aryan", icon: "🌐" },
        { label: "Key Centers", value: "Delhi & Hyderabad", icon: "🏛️" },
        { label: "Poetic Apex", value: "Mirza Ghalib", icon: "👑" },
        { label: "Art Form", value: "Ghazal & Nazm", icon: "🎶" }
    ]
};

const VOCABULARY = [
    { native: "شکریہ", translit: "Shukriya", meaning: "Thank you", ipa: "[ʃʊk.riː.jaː]" },
    { native: "خوش آمدید", translit: "Khush aamdeed", meaning: "Welcome", ipa: "[xʊʃ aːm.diːd]" },
    { native: "محبت", translit: "Mohabbat", meaning: "Love / Affection", ipa: "[mʊ.həb.bət̪]" },
    { native: "دوست", translit: "Dost", meaning: "Friend", ipa: "[d̪oːst̪]" },
    { native: "کتاب", translit: "Kitaab", meaning: "Book", ipa: "[kɪ.t̪aːb]" },
    { native: "دل", translit: "Dil", meaning: "Heart", ipa: "[d̪ɪl]" },
    { native: "دنیا", translit: "Duniya", meaning: "World", ipa: "[d̪ʊn.jaː]" },
    { native: "شاعری", translit: "Shaayari", meaning: "Poetry", ipa: "[ʃaː.(j)ə.riː]" },
    { native: "پانی", translit: "Paani", meaning: "Water", ipa: "[paː.niː]" },
    { native: "خوبصورت", translit: "Khoobsurat", meaning: "Beautiful", ipa: "[xuːb.suː.rət̪]" }
];

const LITERARY_LEGENDS = [
    {
        poet: "Mirza Ghalib (1797–1869)",
        title: "Master of the Urdu Ghazal",
        description: "Regarded as the greatest poet of the late Mughal era, renowned for philosophical depth and timeless couplets.",
        icon: "👑"
    },
    {
        poet: "Mir Taqi Mir (1723–1810)",
        title: "Khuda-e-Sukhan (God of Poetic Craft)",
        description: "Pioneer of Delhi school of Urdu ghazals known for emotive simplicity and poignant cadence.",
        icon: "✨"
    },
    {
        poet: "Allama Iqbal (1877–1938)",
        title: "Shair-e-Mashriq (Poet of the East)",
        description: "Author of 'Sare Jahan Se Accha', whose poetry inspired philosophical thought across South Asia.",
        icon: "🌟"
    },
    {
        poet: "Faiz Ahmed Faiz (1911–1984)",
        title: "Icon of Progressive Poetry",
        description: "Revolutionary modern Urdu poet fusing lyrical romanticism with socio-political consciousness ('Hum Dekhenge').",
        icon: "🕊️"
    }
];

const REFERENCES = [
    { text: "National Council for Promotion of Urdu Language (NCPUL), Ministry of Education, Govt. of India.", link: "http://www.urducouncil.nic.in" },
    { text: "Rekhta Foundation — Largest Online Repository of Urdu Literature.", link: "https://www.rekhta.org" },
    { text: "Russell, Ralph & Islam, Khurshidul (1969). Ghalib: Life and Letters. Harvard University Press.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { URDU_INFO, VOCABULARY, LITERARY_LEGENDS, REFERENCES };
}
