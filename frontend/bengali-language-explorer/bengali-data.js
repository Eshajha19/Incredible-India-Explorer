/**
 * Bengali Language Explorer — Data Module
 * Comprehensive dataset covering Bengali (বাংলা), Bengali-Assamese script,
 * verified greeting (নমস্কার - Nomoskar / আদাব / শুভদিন), audio synthesis dataset,
 * 10 essential words, Eastern Indo-Aryan family, Classical Language status,
 * and sublime literary heritage of Rabindranath Tagore, Kazi Nazrul Islam, and Bankim Chandra.
 */

const BENGALI_INFO = {
    id: "bengali-language",
    name: "Bengali",
    nativeName: "বাংলা (Bangla)",
    script: "Bengali-Assamese Script (Eastern Nagari)",
    family: "Indo-Aryan (Eastern Indo-Aryan / Magadhan branch)",
    status: "Classical Language of India (Conferred in 2024)",
    greeting: "নমস্কার (Nomoskar) / শুভদিন (Shubhodin)",
    greetingTranslit: "Nomoskar / Shubhodin",
    greetingMeaning: "Respectful Greetings / Good Day",
    speakersWorld: "Over 300 Million Global Speakers (7th Most Spoken in the World)",
    majorRegions: "West Bengal, Tripura, Barak Valley (Assam), Andaman & Nicobar Islands, Bangladesh",
    bhashaAndolan: "International Mother Language Day (February 21)",
    quickStats: [
        { label: "Native Name", value: "বাংলা (Bangla)", icon: "📜" },
        { label: "Global Rank", value: "7th in the World", icon: "🌐" },
        { label: "Language Family", value: "Eastern Indo-Aryan", icon: "🗺️" },
        { label: "Bhasha Dibosh", value: "21 February", icon: "📅" },
        { label: "Nobel Laureate", value: "Rabindranath Tagore", icon: "🏆" },
        { label: "Classical Status", value: "Classical Language", icon: "🏛️" }
    ]
};

const VOCABULARY = [
    { native: "ধন্যবাদ", translit: "Dhonnobad", meaning: "Thank you", ipa: "[d̪ʱon.no.bad̪]" },
    { native: "স্বাগতম", translit: "Shagotom", meaning: "Welcome", ipa: "[ʃa.ɡo.t̪om]" },
    { native: "ভালোবাসা", translit: "Bhalobasha", meaning: "Love / Affection", ipa: "[bʱa.lo.ba.ʃa]" },
    { native: "বন্ধু", translit: "Bondhu", meaning: "Friend", ipa: "[bon.d̪ʱu]" },
    { native: "বই", translit: "Boi", meaning: "Book", ipa: "[bo.i]" },
    { native: "বাড়ি / ঘর", translit: "Bari / Ghor", meaning: "Home / House", ipa: "[ba.ɽi]" },
    { native: "জল / পানি", translit: "Jol / Paani", meaning: "Water", ipa: "[dʒol]" },
    { native: "আনন্দ", translit: "Anondo", meaning: "Joy / Happiness", ipa: "[a.non.d̪o]" },
    { native: "সুন্দর", translit: "Sundor", meaning: "Beautiful", ipa: "[ʃun.d̪or]" },
    { native: "আপনি কেমন আছেন?", translit: "Apni kemon aachen?", meaning: "How are you? (formal)", ipa: "[ap.ni ke.mon a.tʃʰen]" }
];

const LITERARY_LEGENDS = [
    {
        author: "Rabindranath Tagore (1861–1941)",
        title: "Nobel Laureate in Literature (1913)",
        description: "Author of Gitanjali and composer of national anthems for India ('Jana Gana Mana') and Bangladesh ('Amar Shonar Bangla').",
        icon: "👑"
    },
    {
        author: "Kazi Nazrul Islam (1899–1976)",
        title: "Bidrohi Kobi (The Rebel Poet)",
        description: "Fiery revolutionary poet and composer of Nazrul Geeti advocating humanism, secularism, and resistance to oppression.",
        icon: "🔥"
    },
    {
        author: "Bankim Chandra Chatterjee (1838–1894)",
        title: "Author of Anandamath & Vande Mataram",
        description: "Pioneering novelist of the Bengal Renaissance whose hymn 'Vande Mataram' became the national song of India.",
        icon: "🌟"
    },
    {
        author: "Sarat Chandra Chattopadhyay (1876–1938)",
        title: "Master of Realist Narrative Fiction",
        description: "Immortal novelist behind Devdas, Srikanta, and Charitraheen exploring deep psychological and social realities.",
        icon: "📖"
    }
];

const REFERENCES = [
    { text: "Paschimbanga Bangla Akademi, Department of Information and Cultural Affairs, Govt. of West Bengal.", link: "https://banglaakademi.org" },
    { text: "Sahitya Akademi — National Academy of Letters, India.", link: "https://sahitya-akademi.gov.in" },
    { text: "Sen, Sukumar (1960). History of Bengali Literature. Sahitya Akademi, New Delhi.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BENGALI_INFO, VOCABULARY, LITERARY_LEGENDS, REFERENCES };
}
