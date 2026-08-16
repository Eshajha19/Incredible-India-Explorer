// kannada-data.js
// Data for the Kannada Language Explorer

const KANNADA_STATS = [
    { label: "Speakers", value: "~43.7 Million" },
    { label: "Language Family", value: "Dravidian" },
    { label: "Script", value: "Kannada" },
    { label: "Primary Region", value: "Karnataka" },
];

const KANNADA_GREETING = {
    devanagari: "ನಮಸ್ಕಾರ",
    transliteration: "Namaskāra",
    meaning: "A respectful greeting meaning 'I bow to you' or 'hello/good day', widely used in Karnataka and across Kannada-speaking communities.",
    note: "Pronunciation is approximated using browser speech synthesis with the Kannada voice when available; if not, the system falls back to the closest available regional voice.",
};

const KANNADA_WORDS = [
    { script: "ನಮಸ್ಕಾರ", translit: "Namaskāra", meaning: "Hello / Greeting", note: "The standard polite greeting in Kannada." },
    { script: "ಹೇಗಿದ್ದೀರಿ", translit: "Hēgiddīri", meaning: "How are you?", note: "A common polite way to ask how someone is doing." },
    { script: "ನುಡಿ", translit: "Nudi", meaning: "Speak / Tell me", note: "Used to request someone to speak or tell something." },
    { script: "ಅಕ್ಕ", translit: "Akka", meaning: "Elder sister", note: "A respectful term used for elder sisters and sometimes older women." },
    { script: "ಅಣ್ಣ", translit: "Anna", meaning: "Elder brother", note: "A familiar term of respect for older men." },
    { script: "ಮಳೆ", translit: "Maḷe", meaning: "Rain", note: "A central word in a state shaped by the monsoon and the Western Ghats." },
    { script: "ಮನೆ", translit: "Mane", meaning: "House / Home", note: "One of the most common everyday words in Kannada." },
    { script: "ತರಕಾರಿ", translit: "Tarakari", meaning: "Vegetables", note: "A typical daily-use word in kitchens and markets." },
    { script: "ಆಹಾರ", translit: "Āhāra", meaning: "Food", note: "Derived from Sanskrit and commonly used in formal speech." },
    { script: "ಹೋಗು", translit: "Hōgu", meaning: "To go", note: "A very common action verb used in both daily speech and informal instructions." },
];

const KANNADA_SCRIPT = {
    intro: "The Kannada script is an ancient Dravidian writing system with a rounded, elegant shape and a remarkable continuity from inscriptions and manuscripts to modern printing. It is used not only for Kannada but also for some regional minority languages and specialized academic use.",
    facts: [
        { title: "Ancient Origins", detail: "Kannada script can be traced to early South Indian writing traditions and is one of the oldest living scripts in India." },
        { title: "Rounded Letterforms", detail: "Its curves, pronounced circularity, and vertical rhythm give it a distinctive and highly readable appearance." },
        { title: "Literary Continuity", detail: "From the early Champu and Vachana traditions to modern fiction and cinema, Kannada has maintained a written tradition for more than a thousand years." },
    ],
};

const KANNADA_CLASSIFICATION = {
    family: "Dravidian language family",
    siblings: ["Tamil", "Telugu", "Malayalam", "Tulu", "Kodava"],
    note: "Kannada belongs to the Dravidian family, a major language family of South Asia, and shares deep historical and structural links with Tamil, Telugu, and Malayalam despite their distinct scripts and vocabulary patterns.",
};

const KANNADA_REGION = {
    intro: "Kannada is primarily spoken in Karnataka, where it serves as the official language of the state, but it also has communities in neighboring regions such as Goa, Maharashtra, Andhra Pradesh, and Tamil Nadu.",
    districts: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Kalaburagi", "Shivamogga", "Belagavi", "Hassan", "Udupi"],
};

const KANNADA_LITERATURE = [
    {
        title: "Vachana Sahitya",
        period: "12th–14th century",
        desc: "A powerful devotional movement in Kannada that used plain, direct language to express philosophical and spiritual ideas, often challenging formal literary elitism.",
    },
    {
        title: "Kuvempu & the Modern Canon",
        period: "20th century",
        desc: "Poets and writers like Kuvempu brought Kannada literature into modern national and international recognition, blending classical forms with social and intellectual concerns.",
    },
    {
        title: "Contemporary Literary Life",
        period: "Ongoing",
        desc: "Kannada continues to thrive through fiction, theatre, poetry, essays, and journalism, with Bengaluru and Mysuru as key intellectual centers.",
    },
];

const KANNADA_CULTURE = [
    { title: "Classical Heritage", desc: "Kannada has one of the oldest literary traditions in South India, with a long record of inscriptions, poetry, and philosophical writing." },
    { title: "Festivals & Music", desc: "From Navaratri and regional temple festivals to Carnatic traditions, Kannada culture is closely tied to music, dance, and community rituals." },
    { title: "Architecture & Identity", desc: "The Chalukya, Hoysala, and Vijayanagara traditions shaped artistic identity across Karnataka, with Kannada language, literature, and temple culture deeply connected." },
];

const KANNADA_REFERENCES = [
    { text: "Ethnologue: Kannada — language profile and geolinguistic summary.", url: "https://www.ethnologue.com/language/kan/" },
    { text: "UNESCO / language resources on Kannada and Dravidian script traditions.", url: "https://www.unesco.org/" },
    { text: "Government of Karnataka — language and cultural resources.", url: "https://karnataka.gov.in/" },
    { text: "The Kannada script and literary tradition overview by academic sources and public reference archives.", url: "https://en.wikipedia.org/wiki/Kannada_language" },
];
