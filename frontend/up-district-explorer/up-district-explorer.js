/**
 * up-district-explorer.js
 * Comprehensive Dataset & Interactive Engine for all 75 Districts of Uttar Pradesh
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

export const divisions = [
  "Agra", "Aligarh", "Ayodhya", "Azamgarh", "Bareilly", "Basti", 
  "Chitrakoot", "Devipatan", "Gorakhpur", "Jhansi", "Kanpur", 
  "Lucknow", "Meerut", "Mirzapur", "Moradabad", "Prayagraj", 
  "Saharanpur", "Varanasi"
];

export const regions = [
  "Purvanchal", "Awadh", "Paschimanchal", "Bundelkhand"
];

// Complete Dataset for ALL 75 Uttar Pradesh Districts
export const districts = [
  // --- AGRA DIVISION (4) ---
  {
    id: "agra",
    name: "Agra",
    division: "Agra",
    region: "Paschimanchal",
    headquarters: "Agra",
    population: "4.41 Million",
    attractions: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh"],
    industries: ["Leather Goods", "Marble Inlay Handicrafts", "Tourism", "Footwear"],
    cuisine: ["Petha", "Bedai-Jalebi", "Mughlai Kebabs", "Bhalla"],
    festivals: ["Taj Mahotsav", "Ram Barat", "Bateshwar Mela", "Diwali"],
    coords: { x: 220, y: 190 }
  },
  {
    id: "firozabad",
    name: "Firozabad",
    division: "Agra",
    region: "Paschimanchal",
    headquarters: "Firozabad",
    population: "2.49 Million",
    attractions: ["Chandrawar Jain Temple", "Glass Bangle Bazaars", "Kanshi Ram Park"],
    industries: ["Glass Bangles", "Glassware & Chandeliers", "Chemicals"],
    cuisine: ["Glass City Bedai", "Kachori", "Rabri-Jalebi"],
    festivals: ["Kansh Leela", "Diwali", "Holi", "Mahavir Jayanti"],
    coords: { x: 250, y: 195 }
  },
  {
    id: "mainpuri",
    name: "Mainpuri",
    division: "Agra",
    region: "Paschimanchal",
    headquarters: "Mainpuri",
    population: "1.87 Million",
    attractions: ["Phoolmati Devi Temple", "Saman Bird Sanctuary", "Garha Temple"],
    industries: ["Tarkashi Wood Craft", "Agriculture", "Rice Mills"],
    cuisine: ["Mainpuri Pedas", "Kachori-Jalebi", "Mathri"],
    festivals: ["Saman Bird Festival", "Ramnavami", "Janmashtami"],
    coords: { x: 280, y: 205 }
  },
  {
    id: "mathura",
    name: "Mathura",
    division: "Agra",
    region: "Paschimanchal",
    headquarters: "Mathura",
    population: "2.55 Million",
    attractions: ["Shri Krishna Janmasthan", "Dwarkadhish Temple", "Vishram Ghat", "Govardhan Hill"],
    industries: ["Sanjhi Art", "Brass Deities & Utensils", "Oil Refinery"],
    cuisine: ["Mathura Peda", "Makhan Mishri", "Kachori-Swayi", "Lassi"],
    festivals: ["Janmashtami", "Lathmar Holi", "Govardhan Puja", "Radhashtami"],
    coords: { x: 200, y: 175 }
  },

  // --- ALIGARH DIVISION (4) ---
  {
    id: "aligarh",
    name: "Aligarh",
    division: "Aligarh",
    region: "Paschimanchal",
    headquarters: "Aligarh",
    population: "3.67 Million",
    attractions: ["Aligarh Muslim University", "Aligarh Fort (Koil)", "Teerthdham Mangalayatan"],
    industries: ["Lock Manufacturing", "Hardware Fittings", "Brass Metalware"],
    cuisine: ["Aligarhi Barule", "Sohan Halwa", "Kachori"],
    festivals: ["AMU Numaish (Exhibition)", "Aligarh Mahotsav", "Eid", "Holi"],
    coords: { x: 210, y: 145 }
  },
  {
    id: "etah",
    name: "Etah",
    division: "Aligarh",
    region: "Paschimanchal",
    headquarters: "Etah",
    population: "1.77 Million",
    attractions: ["Patna Bird Sanctuary", "Kailash Temple", "Awagarh Fort"],
    industries: ["Brass Bells & Ghungroo", "Agriculture", "Sugar Mills"],
    cuisine: ["Etah Milk Pedas", "Poori-Bhaji", "Imarti"],
    festivals: ["Patna Sanctuary Fest", "Shivratri", "Holi"],
    coords: { x: 260, y: 165 }
  },
  {
    id: "hathras",
    name: "Hathras",
    division: "Aligarh",
    region: "Paschimanchal",
    headquarters: "Hathras",
    population: "1.56 Million",
    attractions: ["Dauji Temple", "Hathras Fort", "Bohrey Wali Devi Temple"],
    industries: ["Hing (Asafoetida) Processing", "Readymade Garments", "Brassware"],
    cuisine: ["Hathras Rabri-Jalebi", "Kachori", "Bedai"],
    festivals: ["Dauji Ka Huranga", "Holi", "Diwali"],
    coords: { x: 215, y: 160 }
  },
  {
    id: "kasganj",
    name: "Kasganj",
    division: "Aligarh",
    region: "Paschimanchal",
    headquarters: "Kasganj",
    population: "1.44 Million",
    attractions: ["Soron Shukar Kshetra", "Ganga Ghats Soron", "Barah Mandir"],
    industries: ["Zari-Zardozi Craft", "Agriculture", "Oilseed Mills"],
    cuisine: ["Soron Pedas", "Ganga Ghat Sweets", "Poori Sabzi"],
    festivals: ["Soron Margashirsha Mela", "Ganga Dussehra", "Deepawali"],
    coords: { x: 255, y: 150 }
  },

  // --- AYODHYA DIVISION (5) ---
  {
    id: "ayodhya",
    name: "Ayodhya",
    division: "Ayodhya",
    region: "Awadh",
    headquarters: "Ayodhya",
    population: "2.47 Million",
    attractions: ["Shri Ram Janmabhoomi Mandir", "Hanuman Garhi", "Kanak Bhawan", "Saryu Ghats"],
    industries: ["Jaggery (Gud) Production", "Bamboo Handicrafts", "Pilgrimage Tourism"],
    cuisine: ["Ayodhya Laddu", "Ram Prasadam Peda", "Kachori Swali", "Rabri"],
    festivals: ["Deepotsav", "Ramnavami", "Shravan Jhula Mela", "Kartik Poornima"],
    coords: { x: 520, y: 220 }
  },
  {
    id: "ambedkar_nagar",
    name: "Ambedkar Nagar",
    division: "Ayodhya",
    region: "Awadh",
    headquarters: "Akbarpur",
    population: "2.40 Million",
    attractions: ["Shravan Kshetra", "Govind Sahib Shrine", "Lorepur Temple"],
    industries: ["Powerloom & Handloom Textiles", "Tanda Terracotta", "Agriculture"],
    cuisine: ["Tanda Imarti", "Akbarpur Pedas", "Kachori"],
    festivals: ["Govind Sahib Mela", "Ramnavami", "Eid"],
    coords: { x: 560, y: 230 }
  },
  {
    id: "barabanki",
    name: "Barabanki",
    division: "Ayodhya",
    region: "Awadh",
    headquarters: "Barabanki",
    population: "3.26 Million",
    attractions: ["Dewa Sharif Dargah", "Lodhreshwar Mahadev Temple", "Parijaat Tree"],
    industries: ["Handloom Weaving", "Mentha Oil Extraction", "Handicrafts"],
    cuisine: ["Dewa Shahi Halwa", "Awadhi Biryani", "Malai Paan"],
    festivals: ["Dewa Mela", "Mahashivratri at Lodheshwar", "Eid-ul-Fitr"],
    coords: { x: 460, y: 210 }
  },
  {
    id: "sultanpur",
    name: "Sultanpur",
    division: "Ayodhya",
    region: "Awadh",
    headquarters: "Sultanpur",
    population: "2.25 Million",
    attractions: ["Vijethua Maharanisthan", "Sita Kund", "Gargya Rishi Ashram"],
    industries: ["Moonj Handicrafts", "Agriculture", "Paper Products"],
    cuisine: ["Sultanpur Pedas", "Gomti Ghat Sweets", "Kachori"],
    festivals: ["Durga Puja Mahotsav", "Ramnavami", "Janmashtami"],
    coords: { x: 520, y: 260 }
  },
  {
    id: "amethi",
    name: "Amethi",
    division: "Ayodhya",
    region: "Awadh",
    headquarters: "Gauriganj",
    population: "1.86 Million",
    attractions: ["Nandmahar Dham", "Kalikan Dham", "Hanumangarhi Gauriganj"],
    industries: ["Moonj Products", "HAL Ordnance Units", "Steel Fabrication"],
    cuisine: ["Amethi Rabri", "Jalebi-Kachori", "Samosa"],
    festivals: ["Kalikan Devi Mela", "Shivratri", "Diwali"],
    coords: { x: 490, y: 260 }
  },

  // --- AZAMGARH DIVISION (3) ---
  {
    id: "azamgarh",
    name: "Azamgarh",
    division: "Azamgarh",
    region: "Purvanchal",
    headquarters: "Azamgarh",
    population: "4.61 Million",
    attractions: ["Nizamabad Black Pottery Center", "Durvasa Ashram", "Dattatreya Temple"],
    industries: ["Nizamabad Black Clay Pottery", "Silk Sarees Mubarakpur", "Agriculture"],
    cuisine: ["Azamgarhi Imarti", "Mubarakpur Sweets", "Kachori-Tarkari"],
    festivals: ["Durvasa Mela", "Durga Puja", "Chhath Puja"],
    coords: { x: 620, y: 260 }
  },
  {
    id: "ballia",
    name: "Ballia",
    division: "Azamgarh",
    region: "Purvanchal",
    headquarters: "Ballia",
    population: "3.24 Million",
    attractions: ["Dadri Mela Ground", "Bhrigu Ashram", "Surha Taal Sanctuary"],
    industries: ["Bindi Manufacturing", "Fisheries & Agriculture", "Jute Products"],
    cuisine: ["Ballia Bati Chokha", "Balushahi", "Litti-Chokha"],
    festivals: ["Dadri Cattle Fair", "Chhath Puja", "Makar Sankranti"],
    coords: { x: 680, y: 275 }
  },
  {
    id: "mau",
    name: "Mau",
    division: "Azamgarh",
    region: "Purvanchal",
    headquarters: "Mau",
    population: "2.20 Million",
    attractions: ["Vani Mandir", "Sitala Mata Temple", "Ganga-Tons Confluence"],
    industries: ["Powerloom Saree Weaving", "Handloom Textiles", "Agriculture"],
    cuisine: ["Mau Saree City Sweets", "Chokha Bati", "Jalebi"],
    festivals: ["Chhath Puja", "Durga Puja", "Eid"],
    coords: { x: 650, y: 270 }
  },

  // --- BAREILLY DIVISION (4) ---
  {
    id: "bareilly",
    name: "Bareilly",
    division: "Bareilly",
    region: "Paschimanchal",
    headquarters: "Bareilly",
    population: "4.45 Million",
    attractions: ["Trivati Nath Temple", "Dargah Ala Hazrat", "Fun City", "Ahichchhatra Ruins"],
    industries: ["Zari-Zardozi Craft", "Cane & Bamboo Furniture", "Matchstick Units"],
    cuisine: ["Bareilly Seekh Kebabs", "Cane City Pedas", "Rabri-Jalebi"],
    festivals: ["Nath Nagari Mahotsav", "Urs-e-Razvi", "Holi", "Diwali"],
    coords: { x: 310, y: 130 }
  },
  {
    id: "budaun",
    name: "Budaun",
    division: "Bareilly",
    region: "Paschimanchal",
    headquarters: "Budaun",
    population: "3.68 Million",
    attractions: ["Jama Masjid Shamsi", "Chhota Sarkar Dargah", "Roza Ziyarat"],
    industries: ["Zari-Zardozi Weaving", "Agriculture", "Oil Mills"],
    cuisine: ["Budaun Peda", "Halwa Paratha", "Seekh Kebab"],
    festivals: ["Budaun Mahotsav", "Urs Chhota Sarkar", "Shivratri"],
    coords: { x: 280, y: 135 }
  },
  {
    id: "pilibhit",
    name: "Pilibhit",
    division: "Bareilly",
    region: "Paschimanchal",
    headquarters: "Pilibhit",
    population: "2.03 Million",
    attractions: ["Pilibhit Tiger Reserve", "Chuka Beach (Sharda Sagar)", "Gauri Shankar Temple"],
    industries: ["Wooden Flute (Bansuri) Craft", "Sugar Mills", "Eco-Tourism"],
    cuisine: ["Pilibhit Rice Dishes", "Bansuri City Pedas", "Jalebi"],
    festivals: ["Pilibhit Tiger Fest", "Bansuri Mahotsav", "Chhath Puja"],
    coords: { x: 340, y: 110 }
  },
  {
    id: "shahjahanpur",
    name: "Shahjahanpur",
    division: "Bareilly",
    region: "Paschimanchal",
    headquarters: "Shahjahanpur",
    population: "3.01 Million",
    attractions: ["Shaheed Smarak (Bismil Park)", "Hanumat Dham", "Ram Prasad Bismil Memorial"],
    industries: ["Zari-Zardozi Embroidery", "Ordnance Clothing Factory", "Sugar Industry"],
    cuisine: ["Shaheed City Sweets", "Kachori", "Imarti"],
    festivals: ["Shaheed Mela", "Holi Joolus", "Diwali"],
    coords: { x: 330, y: 150 }
  },

  // --- BASTI DIVISION (3) ---
  {
    id: "basti",
    name: "Basti",
    division: "Basti",
    region: "Purvanchal",
    headquarters: "Basti",
    population: "2.46 Million",
    attractions: ["Chando Taal Sanctuary", "Bheeshma Shiv Temple", "Makhauda Dham"],
    industries: ["Wood Carving Crafts", "Sugar Mills", "Agriculture"],
    cuisine: ["Basti Peda", "Bati Chokha", "Jalebi"],
    festivals: ["Makhauda Mela", "Shivratri", "Ramnavami"],
    coords: { x: 570, y: 190 }
  },
  {
    id: "sant_kabir_nagar",
    name: "Sant Kabir Nagar",
    division: "Basti",
    region: "Purvanchal",
    headquarters: "Khalilabad",
    population: "1.71 Million",
    attractions: ["Kabir Chaura Dham (Maghar)", "Bakhira Bird Sanctuary", "Khalilabad Market"],
    industries: ["Brassware Crafts", "Handloom Handbag Weaving", "Textiles"],
    cuisine: ["Maghar Mahaprasad", "Khalilabad Sweets", "Bati Chokha"],
    festivals: ["Maghar Mahotsav", "Kabir Jayanti", "Deepawali"],
    coords: { x: 600, y: 195 }
  },
  {
    id: "siddharthnagar",
    name: "Siddharthnagar",
    division: "Basti",
    region: "Purvanchal",
    headquarters: "Navgarh",
    population: "2.56 Million",
    attractions: ["Piprahwa Stupa (Kapilvastu)", "Palta Devi Temple", "Bharat Bhari Tank"],
    industries: ["Kalanamak Rice Cultivation", "Agriculture", "Eco Tourism"],
    cuisine: ["Kalanamak Rice Kheer", "Kapilvastu Sweets", "Poori Bhaji"],
    festivals: ["Kapilvastu Mahotsav", "Buddha Purnima", "Chhath Puja"],
    coords: { x: 580, y: 160 }
  },

  // --- CHITRAKOOT DIVISION (4) ---
  {
    id: "chitrakoot",
    name: "Chitrakoot",
    division: "Chitrakoot",
    region: "Bundelkhand",
    headquarters: "Chitrakoot (Karwi)",
    population: "0.99 Million",
    attractions: ["Kamadgiri Hill", "Ramghat (Mandakini)", "Sati Anusuya Ashram", "Sphatik Shila"],
    industries: ["Wooden Toys & Carvings", "Pilgrimage Tourism", "Stone Craft"],
    cuisine: ["Chitrakoot Ramprasad Peda", "Mandakini Sweets", "Bati Chokha"],
    festivals: ["Chitrakoot Deepdan", "Ramnavami", "Somvati Amavasya Mela"],
    coords: { x: 420, y: 340 }
  },
  {
    id: "banda",
    name: "Banda",
    division: "Chitrakoot",
    region: "Bundelkhand",
    headquarters: "Banda",
    population: "1.80 Million",
    attractions: ["Bhuraghar Fort", "Bamaveshwar Temple", "Ken River Gorge"],
    industries: ["Shajar Stone Craft", "Agriculture", "Mining"],
    cuisine: ["Banda Shajar Sweets", "Bundeli Kadhi", "Bati Chokha"],
    festivals: ["Bhuraghar Fort Mela", "Shivratri", "Holi"],
    coords: { x: 390, y: 330 }
  },
  {
    id: "hamirpur",
    name: "Hamirpur",
    division: "Chitrakoot",
    region: "Bundelkhand",
    headquarters: "Hamirpur",
    population: "1.10 Million",
    attractions: ["Sangam Betwa-Yamuna", "Kal Vriksha Tree", "Meher temple"],
    industries: ["Shoes & Leather Footwear", "Agriculture", "Sand Mining"],
    cuisine: ["Hamirpur Sweets", "Bundeli Poori", "Jalebi"],
    festivals: ["Kajli Teej", "Deepawali", "Holi"],
    coords: { x: 360, y: 310 }
  },
  {
    id: "mahoba",
    name: "Mahoba",
    division: "Chitrakoot",
    region: "Bundelkhand",
    headquarters: "Mahoba",
    population: "0.87 Million",
    attractions: ["Rahila Sun Temple", "Shiv Tandav Temple", "Madan Sagar Lake", "Alha-Udal Sun Fort"],
    industries: ["Gaura Stone Craft", "Desi Paan (Betel Leaf)", "Granite Mining"],
    cuisine: ["Mahoba Paan", "Bundelkhandi Thali", "Laddoo"],
    festivals: ["Kajli Mela Mahoba", "Alha Udal Utsav", "Diwali"],
    coords: { x: 350, y: 350 }
  },

  // --- DEVIPATAN DIVISION (4) ---
  {
    id: "gonda",
    name: "Gonda",
    division: "Devipatan",
    region: "Awadh",
    headquarters: "Gonda",
    population: "3.43 Million",
    attractions: ["Paska Parikrama", "Varahi Devi Temple", "Gandhi Park Gonda"],
    industries: ["Food Processing Units", "Sugar Mills", "Agriculture"],
    cuisine: ["Gonda Milk Sweets", "Kachori", "Rabri"],
    festivals: ["Devipatan Mela", "Ramnavami", "Shivratri"],
    coords: { x: 500, y: 170 }
  },
  {
    id: "bahraich",
    name: "Bahraich",
    division: "Devipatan",
    region: "Awadh",
    headquarters: "Bahraich",
    population: "3.48 Million",
    attractions: ["Dargah Ghazi Miyan", "Katarniaghat Wildlife Sanctuary", "Sita Doh Lake"],
    industries: ["Wheat Stalk Handicrafts", "Agriculture", "Forest Produce"],
    cuisine: ["Bahraich Shahi Halwa", "Kachori", "Biryani"],
    festivals: ["Katarniaghat Fest", "Urs Ghazi Miyan", "Eid"],
    coords: { x: 450, y: 150 }
  },
  {
    id: "balrampur",
    name: "Balrampur",
    division: "Devipatan",
    region: "Awadh",
    headquarters: "Balrampur",
    population: "2.15 Million",
    attractions: ["Devipatan Shakti Peeth", "Sravasti Ruins nearby", "Balrampur Palace"],
    industries: ["Agro-based Products", "Sugar Factory", "Handicrafts"],
    cuisine: ["Patan Devi Prasadam", "Balrampur Pedas", "Jalebi"],
    festivals: ["Navratri Devipatan Mela", "Shivratri", "Diwali"],
    coords: { x: 520, y: 150 }
  },
  {
    id: "shravasti",
    name: "Shravasti",
    division: "Devipatan",
    region: "Awadh",
    headquarters: "Bhinaga",
    population: "1.11 Million",
    attractions: ["Jetavana Monastery", "Anandabodhi Tree", "Angulimala Stupa", "Sahet-Mahet"],
    industries: ["Tribal Handicrafts", "Agriculture", "Buddhist Pilgrimage"],
    cuisine: ["Shravasti Rice Kheer", "Bhinaga Sweets", "Poori-Sabzi"],
    festivals: ["Buddha Purnima", "Shravasti Mahotsav", "Diwali"],
    coords: { x: 490, y: 140 }
  },

  // --- GORAKHPUR DIVISION (4) ---
  {
    id: "gorakhpur",
    name: "Gorakhpur",
    division: "Gorakhpur",
    region: "Purvanchal",
    headquarters: "Gorakhpur",
    population: "4.44 Million",
    attractions: ["Gorakhnath Temple", "Gita Press", "Ramgarh Taal Lake", "Arogyadam"],
    industries: ["Terracotta Handicrafts", "Readymade Garments", "Railway Workshop"],
    cuisine: ["Gorakhpuri Terracotta Peda", "Ramgarh Fish Fry", "Bati Chokha"],
    festivals: ["Khichdi Mela Gorakhnath", "Gorakhpur Mahotsav", "Chhath Puja"],
    coords: { x: 630, y: 200 }
  },
  {
    id: "deoria",
    name: "Deoria",
    division: "Gorakhpur",
    region: "Purvanchal",
    headquarters: "Deoria",
    population: "3.10 Million",
    attractions: ["Deorahi Temple", "Parshuram Dham", "Dugdeshwar Nath Temple"],
    industries: ["Decorative Plastic Products", "Sugar Industry", "Agriculture"],
    cuisine: ["Deoria Pedas", "Bati Chokha", "Imarti"],
    festivals: ["Deorahi Mela", "Chhath Puja", "Shivratri"],
    coords: { x: 670, y: 220 }
  },
  {
    id: "kushinagar",
    name: "Kushinagar",
    division: "Gorakhpur",
    region: "Purvanchal",
    headquarters: "Padrauna",
    population: "3.56 Million",
    attractions: ["Mahaparinirvana Temple", "Ramabhar Stupa", "Matha Kuar Temple"],
    industries: ["Banana Fiber Handicrafts", "Sugar Mills", "Tourism"],
    cuisine: ["Banana Fiber City Sweets", "Padrauna Pedas", "Bati Chokha"],
    festivals: ["Buddha Purnima Mahotsav", "Kushinagar Mahotsav", "Chhath Puja"],
    coords: { x: 680, y: 195 }
  },
  {
    id: "maharajganj",
    name: "Maharajganj",
    division: "Gorakhpur",
    region: "Purvanchal",
    headquarters: "Maharajganj",
    population: "2.68 Million",
    attractions: ["Sohagi Barwa Wildlife Sanctuary", "Lehra Devi Temple", "Banjaari Devi Shrine"],
    industries: ["Furniture Crafts", "Rice Mills", "Agriculture"],
    cuisine: ["Lehra Devi Prasadam", "Maharajganj Sweets", "Bati Chokha"],
    festivals: ["Lehra Devi Mela", "Sohagi Barwa Fest", "Chhath Puja"],
    coords: { x: 640, y: 165 }
  },

  // --- JHANSI DIVISION (3) ---
  {
    id: "jhansi",
    name: "Jhansi",
    division: "Jhansi",
    region: "Bundelkhand",
    headquarters: "Jhansi",
    population: "1.99 Million",
    attractions: ["Jhansi Fort", "Rani Mahal", "Government Museum", "Barua Sagar"],
    industries: ["Wooden Toys & Carvings", "Brassware", "Railways Hub"],
    cuisine: ["Jhansi Bundeli Thali", "Bedai Kachaori", "Samosa", "Laddoo"],
    festivals: ["Jhansi Mahotsav", "Bundeli Utsav", "Lakshmibai Jayanti"],
    coords: { x: 320, y: 340 }
  },
  {
    id: "jalaun",
    name: "Jalaun",
    division: "Jhansi",
    region: "Bundelkhand",
    headquarters: "Orai",
    population: "1.69 Million",
    attractions: ["Kalpi Sun Temple", "Vyasa Temple Kalpi", "Lanka Tower"],
    industries: ["Handmade Paper Industry (Kalpi)", "Agriculture", "Pulses Processing"],
    cuisine: ["Kalpi Pedas", "Bundeli Kadhi", "Kachori"],
    festivals: ["Kalpi Mela", "Shivratri", "Diwali"],
    coords: { x: 330, y: 290 }
  },
  {
    id: "lalitpur",
    name: "Lalitpur",
    division: "Jhansi",
    region: "Bundelkhand",
    headquarters: "Lalitpur",
    population: "1.22 Million",
    attractions: ["Deogarh Dashavatara Temple", "Matatila Dam", "Jain Temples Deogarh"],
    industries: ["Zari Silk Sarees", "Granite & Mining", "Stone Carving"],
    cuisine: ["Lalitpur Rabri", "Bundeli Bati", "Jalebi"],
    festivals: ["Deogarh Mahotsav", "Mahavir Jayanti", "Shivratri"],
    coords: { x: 300, y: 390 }
  },

  // --- KANPUR DIVISION (6) ---
  {
    id: "kanpur_nagar",
    name: "Kanpur Nagar",
    division: "Kanpur",
    region: "Awadh",
    headquarters: "Kanpur",
    population: "4.58 Million",
    attractions: ["IIT Kanpur", "Allen Forest Zoo", "Bithoor Ghats", "J.K. Temple"],
    industries: ["Leather Goods & Saddlery", "Textile Mills", "Defense Manufacturing"],
    cuisine: ["Kanpur Thaggu Ke Laddu", "Badam Milk", "Bithoor Poori"],
    festivals: ["Bithoor Ganga Mahotsav", "Ganga Mela Kanpur", "Holi", "Diwali"],
    coords: { x: 380, y: 250 }
  },
  {
    id: "kanpur_dehat",
    name: "Kanpur Dehat",
    division: "Kanpur",
    region: "Awadh",
    headquarters: "Akbarpur (Mati)",
    population: "1.79 Million",
    attractions: ["Bhitargaon Gupta Brick Temple", "Durga Temple Paraukh", "Katha River Banks"],
    industries: ["Aluminum Utensils", "Agriculture", "Handicrafts"],
    cuisine: ["Bhitargaon Sweets", "Kachori", "Imarti"],
    festivals: ["Paraukh Fair", "Shivratri", "Holi"],
    coords: { x: 350, y: 260 }
  },
  {
    id: "auraiya",
    name: "Auraiya",
    division: "Kanpur",
    region: "Awadh",
    headquarters: "Auraiya",
    population: "1.38 Million",
    attractions: ["Devkali Temple", "Phoolmati Temple", "Yamuna Ravines"],
    industries: ["Desi Ghee Processing", "Agro Industries", "Petrochemicals"],
    cuisine: ["Auraiya Desi Ghee Sweets", "Bedai", "Rabri"],
    festivals: ["Devkali Mela", "Shivratri", "Diwali"],
    coords: { x: 310, y: 250 }
  },
  {
    id: "farrukhabad",
    name: "Farrukhabad",
    division: "Kanpur",
    region: "Awadh",
    headquarters: "Fatehgarh",
    population: "1.88 Million",
    attractions: ["Sankisa Buddhist Ruins", "Kampil Jain Temple", "Pandeshwar Nath Temple"],
    industries: ["Block Printing Craft", "Zari-Zardozi", "Potato Processing"],
    cuisine: ["Kampil Pedas", "Farrukhabad Potato Dishes", "Jalebi"],
    festivals: ["Sankisa Buddha Fest", "Kampil Mela", "Diwali"],
    coords: { x: 300, y: 200 }
  },
  {
    id: "kannauj",
    name: "Kannauj",
    division: "Kanpur",
    region: "Awadh",
    headquarters: "Kannauj",
    population: "1.66 Million",
    attractions: ["Archaeological Museum", "Lakh Bahosi Bird Sanctuary", "Gauri Shankar Temple"],
    industries: ["Attar (Perfume) Distillation", "Essential Oils", "Rose Water"],
    cuisine: ["Kannauj Gajar Halwa", "Rose Attar Kheer", "Kachori"],
    festivals: ["Kannauj International Perfume Festival", "Shivratri", "Holi"],
    coords: { x: 330, y: 210 }
  },
  {
    id: "etawah",
    name: "Etawah",
    division: "Kanpur",
    region: "Awadh",
    headquarters: "Etawah",
    population: "1.58 Million",
    attractions: ["Etawah Safari Park", "Chambal Sanctuary", "Taksiya Temple"],
    industries: ["Handloom Textile Weaving", "Agro Units", "Dairy"],
    cuisine: ["Etawah Pedas", "Bedai Jalebi", "Rabri"],
    festivals: ["Chambal Wildlife Fest", "Shivratri", "Holi"],
    coords: { x: 280, y: 230 }
  },

  // --- LUCKNOW DIVISION (6) ---
  {
    id: "lucknow",
    name: "Lucknow",
    division: "Lucknow",
    region: "Awadh",
    headquarters: "Lucknow",
    population: "4.58 Million",
    attractions: ["Bada Imambara", "Rumi Darwaza", "Chattar Manzil", "Residency"],
    industries: ["Chikankari Embroidery", "Zardozi Craft", "IT & Aerospace Hub"],
    cuisine: ["Galouti Kebab", "Tunday Kebab", "Awadhi Biryani", "Malai Paan", "Basket Chaat"],
    festivals: ["Lucknow Mahotsav", "Maha Shivratri", "Eid-ul-Fitr", "Deepawali"],
    coords: { x: 420, y: 220 }
  },
  {
    id: "hardoi",
    name: "Hardoi",
    division: "Lucknow",
    region: "Awadh",
    headquarters: "Hardoi",
    population: "4.09 Million",
    attractions: ["Sandi Bird Sanctuary", "Prahlad Ghat", "Hatraj Temple"],
    industries: ["Handloom Textiles", "Sugar Industry", "Agriculture"],
    cuisine: ["Hardoi Sweets", "Kachori-Sabzi", "Jalebi"],
    festivals: ["Sandi Bird Fest", "Holika Dahan (Prahlad)", "Diwali"],
    coords: { x: 370, y: 190 }
  },
  {
    id: "lakhimpur_kheri",
    name: "Lakhimpur Kheri",
    division: "Lucknow",
    region: "Awadh",
    headquarters: "Lakhimpur",
    population: "4.02 Million",
    attractions: ["Dudhwa National Park", "Frog Temple (Oel)", "Devkali Temple"],
    industries: ["Jute Wall Hanging Crafts", "Sugar Industry", "Eco Tourism"],
    cuisine: ["Dudhwa Forest Honey", "Lakhimpur Pedas", "Poori Sabzi"],
    festivals: ["Dudhwa Elephant Fest", "Devkali Mela", "Chhath Puja"],
    coords: { x: 390, y: 140 }
  },
  {
    id: "rae_bareli",
    name: "Rae Bareli",
    division: "Lucknow",
    region: "Awadh",
    headquarters: "Rae Bareli",
    population: "3.40 Million",
    attractions: ["Samaspur Bird Sanctuary", "Behta Bridge", "Dalmau Ganga Ghats"],
    industries: ["Rail Coach Factory (MCF)", "Mentha Processing", "Handloom"],
    cuisine: ["Dalmau Pedas", "Rae Bareli Rabri", "Kachori"],
    festivals: ["Dalmau Ganga Snan", "Samaspur Bird Fest", "Diwali"],
    coords: { x: 440, y: 250 }
  },
  {
    id: "sitapur",
    name: "Sitapur",
    division: "Lucknow",
    region: "Awadh",
    headquarters: "Sitapur",
    population: "4.48 Million",
    attractions: ["Naimisharanya (Neemsar)", "Chakratirth", "Vyas Gaddi"],
    industries: ["Durrie (Rug) Weaving", "Sugar Mills", "Agriculture"],
    cuisine: ["Neemsar Prasadam", "Sitapur Pedas", "Rabri"],
    festivals: ["Naimisharanya Parikrama Mela", "Shivratri", "Ramnavami"],
    coords: { x: 390, y: 170 }
  },
  {
    id: "unnao",
    name: "Unnao",
    division: "Lucknow",
    region: "Awadh",
    headquarters: "Unnao",
    population: "3.10 Million",
    attractions: ["Nawabganj Bird Sanctuary", "Bakalarmata Temple", "Pariyar Ghat"],
    industries: ["Zari-Zardozi Craft", "Tannery Units", "Agriculture"],
    cuisine: ["Unnao Samosa", "Nawabganj Sweets", "Kachori"],
    festivals: ["Nawabganj Bird Fest", "Pariyar Mela", "Diwali"],
    coords: { x: 400, y: 235 }
  },

  // --- MEERUT DIVISION (6) ---
  {
    id: "meerut",
    name: "Meerut",
    division: "Meerut",
    region: "Paschimanchal",
    headquarters: "Meerut",
    population: "3.44 Million",
    attractions: ["Augarnath Temple", "St. John Church", "Hastinapur Sanctuary", "Anoopshahr Ghats"],
    industries: ["Sports Goods (Cricket Bats)", "Scissors Industry", "Musical Instruments"],
    cuisine: ["Meerut Rewri-Gajak", "Nan Khatai", "Kachori-Jalebi"],
    festivals: ["Nauchandi Mela", "Hastinapur Fair", "Shivratri", "Holi"],
    coords: { x: 140, y: 100 }
  },
  {
    id: "baghpat",
    name: "Baghpat",
    division: "Meerut",
    region: "Paschimanchal",
    headquarters: "Baghpat",
    population: "1.30 Million",
    attractions: ["Pura Mahadev Temple", "Barnawa (Lakshagriha)", "Trilokpur Jain Temple"],
    industries: ["Home Furnishing Weaving", "Agriculture", "Sugar Industry"],
    cuisine: ["Baghpat Milk Pedas", "Gajak", "Poori Bhaji"],
    festivals: ["Pura Mahadev Mela", "Shivratri", "Holi"],
    coords: { x: 120, y: 95 }
  },
  {
    id: "bulandshahr",
    name: "Bulandshahr",
    division: "Meerut",
    region: "Paschimanchal",
    headquarters: "Bulandshahr",
    population: "3.49 Million",
    attractions: ["Khurja Pottery Center", "Karnaraj Temple", "Anoopshahr Ganga Ghat"],
    industries: ["Khurja Ceramic Pottery", "Dairy Farming", "Agriculture"],
    cuisine: ["Khurja Milk Cake", "Bulandshahr Sweets", "Jalebi"],
    festivals: ["Khurja Pottery Fest", "Ganga Snan", "Diwali"],
    coords: { x: 170, y: 130 }
  },
  {
    id: "gautam_buddha_nagar",
    name: "Gautam Buddha Nagar",
    division: "Meerut",
    region: "Paschimanchal",
    headquarters: "Noida",
    population: "1.65 Million",
    attractions: ["Okhla Bird Sanctuary", "Buddh International Circuit", "DLF Mall of India", "Surajpur Wetland"],
    industries: ["IT & Software Hub", "Electronics Manufacturing", "Automotive Assembly"],
    cuisine: ["Noida International Cuisine", "Street Food Chaat", "Bakery Goods"],
    festivals: ["Noida Shilp Haat Fest", "Diwali", "New Year Carnival"],
    coords: { x: 110, y: 130 }
  },
  {
    id: "ghaziabad",
    name: "Ghaziabad",
    division: "Meerut",
    region: "Paschimanchal",
    headquarters: "Ghaziabad",
    population: "4.68 Million",
    attractions: ["Doodheshwar Nath Temple", "City Forest Ghaziabad", "Swarn Jayanti Park"],
    industries: ["Engineering Goods & Machinery", "Electronics", "Textiles"],
    cuisine: ["Ghaziabad Bedai", "Kachori", "Sweets"],
    festivals: ["Doodheshwar Shivratri Mela", "Holi", "Diwali"],
    coords: { x: 115, y: 115 }
  },
  {
    id: "hapur",
    name: "Hapur",
    division: "Meerut",
    region: "Paschimanchal",
    headquarters: "Hapur",
    population: "1.34 Million",
    attractions: ["Garhmukteshwar Ganga Ghat", "Sabli Shiv Temple", "Kucheser Fort"],
    industries: ["Papad & Home Spices", "Grain Market", "Textile Weaving"],
    cuisine: ["Garh Ganga Sweets", "Hapur Papad", "Jalebi"],
    festivals: ["Garhmukteshwar Ganga Fair", "Kartik Poornima", "Holi"],
    coords: { x: 145, y: 115 }
  },

  // --- MIRZAPUR DIVISION (3) ---
  {
    id: "mirzapur",
    name: "Mirzapur",
    division: "Mirzapur",
    region: "Purvanchal",
    headquarters: "Mirzapur",
    population: "2.49 Million",
    attractions: ["Vindhyachal Shakti Peeth", "Wyndham Waterfalls", "Chunar Fort nearby", "Ashtabhuja Temple"],
    industries: ["Handmade Woollen Carpets", "Brassware Utensils", "Stone Mining"],
    cuisine: ["Vindhyachal Prasadam Peda", "Mirzapur Bati Chokha", "Balushahi"],
    festivals: ["Vindhya Navratri Mela", "Kajari Mahotsav", "Chhath Puja"],
    coords: { x: 570, y: 350 }
  },
  {
    id: "bhadohi",
    name: "Bhadohi",
    division: "Mirzapur",
    region: "Purvanchal",
    headquarters: "Gyanpur",
    population: "1.58 Million",
    attractions: ["Sita Samahit Sthal (Sitamarhi)", "Chakwa Mahadev Temple", "Gyanpur Lake"],
    industries: ["Hand-knotted Carpet Weaving", "Textiles", "Agriculture"],
    cuisine: ["Bhadohi Carpet City Sweets", "Bati Chokha", "Jalebi"],
    festivals: ["Sitamarhi Mela", "Chhath Puja", "Diwali"],
    coords: { x: 550, y: 330 }
  },
  {
    id: "sonbhadra",
    name: "Sonbhadra",
    division: "Mirzapur",
    region: "Purvanchal",
    headquarters: "Robertsganj",
    population: "1.86 Million",
    attractions: ["Salkhan Fossil Park", "Vijaygarh Fort", "Rihand Dam (Govind Ballabh Pant Sagar)", "Murlidhar Temple"],
    industries: ["Power Generation Hub (Thermal/Hydro)", "Aluminum Smelting", "Mining"],
    cuisine: ["Sonbhadra Tribal Thali", "Bati Chokha", "Mahua Sweets"],
    festivals: ["Salkhan Fossil Fest", "Tribal Cultural Fair", "Chhath Puja"],
    coords: { x: 610, y: 380 }
  },

  // --- MORADABAD DIVISION (5) ---
  {
    id: "moradabad",
    name: "Moradabad",
    division: "Moradabad",
    region: "Paschimanchal",
    headquarters: "Moradabad",
    population: "4.77 Million",
    attractions: ["Jama Masjid Moradabad", "Ramganga River Front", "Raza Library nearby"],
    industries: ["Brass Handicrafts", "Engraved Metalware", "Exports"],
    cuisine: ["Moradabadi Dal", "Biryani", "Halwa Paratha"],
    festivals: ["Moradabad Metal Expo", "Eid", "Holi"],
    coords: { x: 230, y: 110 }
  },
  {
    id: "bijnor",
    name: "Bijnor",
    division: "Moradabad",
    region: "Paschimanchal",
    headquarters: "Bijnor",
    population: "3.68 Million",
    attractions: ["Vidur Kuti", "Kanva Ashram", "Haiderpur Wetland"],
    industries: ["Wooden Craft Items", "Sugar Mills", "Paper Industry"],
    cuisine: ["Bijnor Milk Sweets", "Kachori", "Poori-Sabzi"],
    festivals: ["Vidur Kuti Mela", "Haiderpur Wetland Fest", "Diwali"],
    coords: { x: 200, y: 90 }
  },
  {
    id: "amroha",
    name: "Amroha",
    division: "Moradabad",
    region: "Paschimanchal",
    headquarters: "Amroha",
    population: "1.84 Million",
    attractions: ["Vasudev Temple", "Dargah Shah Wilayat", "Tigri Ganga Ghat"],
    industries: ["Wooden Dholak & Percussion Instruments", "Agriculture", "Textiles"],
    cuisine: ["Amrohi Dholak Sweets", "Biryani", "Halwa"],
    festivals: ["Tigri Ganga Mela", "Urs Shah Wilayat", "Holi"],
    coords: { x: 210, y: 110 }
  },
  {
    id: "rampur",
    name: "Rampur",
    division: "Moradabad",
    region: "Paschimanchal",
    headquarters: "Rampur",
    population: "2.33 Million",
    attractions: ["Raza Library", "Rampur Raza Fort", "Khasbagh Palace"],
    industries: ["Patchwork & Applique Craft", "Rampur Knives", "Mentha Extraction"],
    cuisine: ["Rampuri Taar Qorma", "Rampuri Biryani", "Adrak ka Halwa"],
    festivals: ["Rampur Jashn-e-Virasat", "Eid", "Diwali"],
    coords: { x: 260, y: 105 }
  },
  {
    id: "sambhal",
    name: "Sambhal",
    division: "Moradabad",
    region: "Paschimanchal",
    headquarters: "Sambhal",
    population: "2.20 Million",
    attractions: ["Shahi Jama Masjid Sambhal", "Kalki Vishnu Temple", "Manokamna Temple"],
    industries: ["Bone & Horn Handicrafts", "Mentha Processing", "Agriculture"],
    cuisine: ["Sambhal Milk Cake", "Biryani", "Kachori"],
    festivals: ["Kalki Jayanti Mela", "Eid", "Holi"],
    coords: { x: 225, y: 125 }
  },

  // --- PRAYAGRAJ DIVISION (4) ---
  {
    id: "prayagraj",
    name: "Prayagraj",
    division: "Prayagraj",
    region: "Awadh",
    headquarters: "Prayagraj",
    population: "5.95 Million",
    attractions: ["Triveni Sangam", "Anand Bhavan", "Prayagraj Fort", "Bade Hanuman Temple", "Naini Bridge"],
    industries: ["Moonj Crafts", "Guava Cultivation", "Educational Hub"],
    cuisine: ["Allahabadi Surkha Guava", "Sangam Kachori", "Dehati Rasgulla", "Chaat"],
    festivals: ["Kumbh Mela", "Magh Mela", "Makar Sankranti Snan", "Deepawali"],
    coords: { x: 480, y: 310 }
  },
  {
    id: "fatehpur",
    name: "Fatehpur",
    division: "Prayagraj",
    region: "Awadh",
    headquarters: "Fatehpur",
    population: "2.63 Million",
    attractions: ["Bhavani Temple Bindki", "Asothar Fort", "Ganga-Yamuna Doab Ghats"],
    industries: ["Bed Sheets & Handloom Weaving", "Agriculture", "Sugar Industry"],
    cuisine: ["Bindki Pedas", "Fatehpur Sweets", "Kachori"],
    festivals: ["Bhavani Devi Fair", "Shivratri", "Diwali"],
    coords: { x: 420, y: 290 }
  },
  {
    id: "kaushambi",
    name: "Kaushambi",
    division: "Prayagraj",
    region: "Awadh",
    headquarters: "Manjhanpur",
    population: "1.60 Million",
    attractions: ["Ghoshitaram Monastery Ruins", "Prabhosa Hill", "Sheetla Mata Temple Kara"],
    industries: ["Banana Cultivation", "Agriculture", "Buddhist Pilgrimage"],
    cuisine: ["Kara Sheetla Prasadam", "Kaushambi Banana Sweets", "Poori-Sabzi"],
    festivals: ["Kara Mela", "Buddha Purnima", "Navratri"],
    coords: { x: 450, y: 310 }
  },
  {
    id: "pratapgarh",
    name: "Pratapgarh",
    division: "Prayagraj",
    region: "Awadh",
    headquarters: "Pratapgarh",
    population: "3.21 Million",
    attractions: ["Bela Bhawani Temple", "Bhakti Dham Mangarh", "Guiswarnath Dham"],
    industries: ["Amla (Gooseberry) Processing & Products", "Agriculture", "Handicrafts"],
    cuisine: ["Pratapgarh Amla Murabba", "Amla Candy", "Bela Devi Pedas"],
    festivals: ["Bela Bhawani Mela", "Mangarh Radha Krishna Fest", "Diwali"],
    coords: { x: 490, y: 280 }
  },

  // --- SAHARANPUR DIVISION (3) ---
  {
    id: "saharanpur",
    name: "Saharanpur",
    division: "Saharanpur",
    region: "Paschimanchal",
    headquarters: "Saharanpur",
    population: "3.47 Million",
    attractions: ["Shakumbhari Devi Temple", "Darul Uloom Deoband", "Company Garden"],
    industries: ["Wood Carving Crafts", "Sugar Mills", "Paper Industry"],
    cuisine: ["Saharanpur Mango Kheer", "Wood City Pedas", "Kachori"],
    festivals: ["Shakumbhari Devi Mela", "Holi", "Diwali"],
    coords: { x: 150, y: 60 }
  },
  {
    id: "muzaffarnagar",
    name: "Muzaffarnagar",
    division: "Saharanpur",
    region: "Paschimanchal",
    headquarters: "Muzaffarnagar",
    population: "4.14 Million",
    attractions: ["Shukartal (Bhagwat Dham)", "Akshay Vat Tree", "Ganeshdham"],
    industries: ["Jaggery (Gud) Market", "Steel Rolling Mills", "Sugar Industry"],
    cuisine: ["Muzaffarnagar Gud Halwa", "Kachori-Jalebi", "Rabri"],
    festivals: ["Shukartal Bhagwat Fair", "Shivratri", "Holi"],
    coords: { x: 155, y: 80 }
  },
  {
    id: "shamli",
    name: "Shamli",
    division: "Saharanpur",
    region: "Paschimanchal",
    headquarters: "Shamli",
    population: "1.27 Million",
    attractions: ["Hanuman Dham Shamli", "Ganga Canal Ghats", "Karan Temple"],
    industries: ["Iron & Steel Fabrication", "Sugar Industry", "Agriculture"],
    cuisine: ["Shamli Sweets", "Bedai", "Rabri"],
    festivals: ["Hanuman Jayanti", "Holi", "Diwali"],
    coords: { x: 135, y: 80 }
  },

  // --- VARANASI DIVISION (4) ---
  {
    id: "varanasi",
    name: "Varanasi",
    division: "Varanasi",
    region: "Purvanchal",
    headquarters: "Varanasi",
    population: "3.67 Million",
    attractions: ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Sarnath Stupa", "Manikarnika Ghat", "Assi Ghat"],
    industries: ["Banarasi Silk Sarees", "Pink Gulabi Meenakari", "Handicrafts & Tourism"],
    cuisine: ["Banarasi Paan", "Tamatar Chaat", "Malaiyo", "Kachori Jalebi", "Rabri Lassi"],
    festivals: ["Dev Deepawali", "Kashi Mahotsav", "Maha Shivratri", "Ganga Aarti"],
    coords: { x: 590, y: 310 }
  },
  {
    id: "chandauli",
    name: "Chandauli",
    division: "Varanasi",
    region: "Purvanchal",
    headquarters: "Chandauli",
    population: "1.95 Million",
    attractions: ["Chandraprabha Wildlife Sanctuary", "Rajdari-Devdari Waterfalls", "Naugarh Fort"],
    industries: ["Black Rice (Zaid Rice) Cultivation", "Agriculture", "Forestry"],
    cuisine: ["Chandauli Black Rice Kheer", "Bati Chokha", "Balushahi"],
    festivals: ["Chandraprabha Eco Fest", "Chhath Puja", "Diwali"],
    coords: { x: 620, y: 320 }
  },
  {
    id: "ghazipur",
    name: "Ghazipur",
    division: "Varanasi",
    region: "Purvanchal",
    headquarters: "Ghazipur",
    population: "3.62 Million",
    attractions: ["Lord Cornwallis Tomb", "Zamania Fort", "Ganga River Front Ghazipur"],
    industries: ["Jute Wall Hangings", "Opium Factory", "Agriculture"],
    cuisine: ["Ghazipur Sweets", "Bati Chokha", "Poori-Sabzi"],
    festivals: ["Ghazipur Mahotsav", "Chhath Puja", "Diwali"],
    coords: { x: 640, y: 290 }
  },
  {
    id: "jaunpur",
    name: "Jaunpur",
    division: "Varanasi",
    region: "Purvanchal",
    headquarters: "Jaunpur",
    population: "4.49 Million",
    attractions: ["Shahi Bridge (Gomti)", "Atala Masjid", "Shahi Qila", "Jama Masjid Jaunpur"],
    industries: ["Woollen Carpet Weaving", "Attar Perfumes", "Agriculture"],
    cuisine: ["Jaunpuri Imarti", "Dalmoth", "Bati Chokha"],
    festivals: ["Jaunpur Mahotsav", "Eid", "Chhath Puja", "Diwali"],
    coords: { x: 560, y: 280 }
  }
];

/**
 * Get district profile object by ID.
 */
export function getDistrictById(id, list = districts) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(d => d.id.toLowerCase() === target || d.name.toLowerCase() === target);
}

/**
 * Get all districts belonging to a specific administrative division.
 */
export function getDistrictsByDivision(divisionName, list = districts) {
  if (!divisionName || !Array.isArray(list)) return [];
  const target = divisionName.trim().toLowerCase();
  return list.filter(d => d.division && d.division.toLowerCase() === target);
}

/**
 * Get all districts belonging to a specific geographic region.
 */
export function getDistrictsByRegion(regionName, list = districts) {
  if (!regionName || !Array.isArray(list)) return [];
  const target = regionName.trim().toLowerCase();
  return list.filter(d => d.region && d.region.toLowerCase() === target);
}

/**
 * Search and filter districts by query string, division, and region.
 */
export function filterDistricts(searchQuery = "", divisionFilter = "all", regionFilter = "all", list = districts) {
  if (!Array.isArray(list)) return [];
  const q = searchQuery.trim().toLowerCase();
  const div = divisionFilter.trim().toLowerCase();
  const reg = regionFilter.trim().toLowerCase();

  return list.filter(district => {
    const matchesQuery = !q || [
      district.name,
      district.headquarters,
      district.division,
      district.region,
      ...(district.attractions || []),
      ...(district.industries || []),
      ...(district.cuisine || []),
      ...(district.festivals || [])
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesDivision = div === "all" || (district.division && district.division.toLowerCase() === div);
    const matchesRegion = reg === "all" || (district.region && district.region.toLowerCase() === reg);

    return matchesQuery && matchesDivision && matchesRegion;
  });
}

/* ==========================================================================
   BROWSER DOM & INTERACTIVE MAP ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.upDistrictsDataset = districts;
  window.upDivisionsDataset = divisions;
  window.upRegionsDataset = regions;
  window.getDistrictById = getDistrictById;
  window.getDistrictsByDivision = getDistrictsByDivision;
  window.getDistrictsByRegion = getDistrictsByRegion;
  window.filterDistricts = filterDistricts;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Element References
    const searchInput = document.getElementById("district-search");
    const divisionSelect = document.getElementById("division-filter");
    const regionSelect = document.getElementById("region-filter");

    const districtsGridContainer = document.getElementById("districts-grid");
    const totalCountBadge = document.getElementById("total-districts-count");
    const svgMapContainer = document.getElementById("up-svg-map");

    // Modal Inspector Elements
    const detailModal = document.getElementById("district-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalTitle = document.getElementById("modal-district-name");
    const modalDivision = document.getElementById("modal-division");
    const modalRegion = document.getElementById("modal-region");
    const modalHq = document.getElementById("modal-hq");
    const modalPop = document.getElementById("modal-pop");
    const modalAttractions = document.getElementById("modal-attractions");
    const modalIndustries = document.getElementById("modal-industries");
    const modalCuisine = document.getElementById("modal-cuisine");
    const modalFestivals = document.getElementById("modal-festivals");

    // Hover Tooltip Element
    const mapTooltip = document.getElementById("map-tooltip");

    // Initialize Divisions Dropdown
    if (divisionSelect) {
      divisions.forEach(divName => {
        const opt = document.createElement("option");
        opt.value = divName;
        opt.textContent = `${divName} Division`;
        divisionSelect.appendChild(opt);
      });
    }

    // Render SVG Map Nodes
    function renderSVGMapNodes(filteredList) {
      if (!svgMapContainer) return;
      svgMapContainer.innerHTML = "";

      const baseGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      
      filteredList.forEach(district => {
        const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
        node.setAttribute("class", "map-district-node");
        node.setAttribute("data-id", district.id);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", district.coords.x);
        circle.setAttribute("cy", district.coords.y);
        circle.setAttribute("r", "8");
        circle.setAttribute("fill", getRegionColor(district.region));

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", district.coords.x);
        text.setAttribute("y", district.coords.y - 12);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("class", "map-district-label");
        text.textContent = district.name;

        node.appendChild(circle);
        node.appendChild(text);

        // Hover Tooltip Events
        node.addEventListener("mouseenter", () => {
          if (mapTooltip) {
            mapTooltip.innerHTML = `
              <strong>${district.name}</strong><br>
              <small>HQ: ${district.headquarters} · ${district.division} Div</small>
            `;
            mapTooltip.style.display = "block";
          }
        });

        node.addEventListener("mousemove", (e) => {
          if (mapTooltip) {
            mapTooltip.style.left = `${e.pageX + 12}px`;
            mapTooltip.style.top = `${e.pageY + 12}px`;
          }
        });

        node.addEventListener("mouseleave", () => {
          if (mapTooltip) mapTooltip.style.display = "none";
        });

        // Click to Open Modal Inspector
        node.addEventListener("click", () => {
          openDistrictModal(district);
        });

        baseGroup.appendChild(node);
      });

      svgMapContainer.appendChild(baseGroup);
    }

    function getRegionColor(region) {
      switch (region) {
        case "Purvanchal": return "#f97316";
        case "Awadh": return "#eab308";
        case "Paschimanchal": return "#3b82f6";
        case "Bundelkhand": return "#10b981";
        default: return "#8b5cf6";
      }
    }

    // Render District Cards Grid
    function renderDistrictsGrid() {
      if (!districtsGridContainer) return;
      districtsGridContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const division = divisionSelect ? divisionSelect.value : "all";
      const region = regionSelect ? regionSelect.value : "all";

      const filtered = filterDistricts(query, division, region);

      if (totalCountBadge) {
        totalCountBadge.textContent = `${filtered.length} / 75 Districts`;
      }

      renderSVGMapNodes(filtered);

      if (filtered.length === 0) {
        districtsGridContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No UP Districts Found</h3>
            <p>Try adjusting your search query or division filter.</p>
          </div>
        `;
        return;
      }

      filtered.forEach(district => {
        const card = document.createElement("article");
        card.className = "district-card";

        const regClass = district.region ? district.region.toLowerCase() : "";

        card.innerHTML = `
          <div class="card-header">
            <span class="region-badge ${regClass}">${district.region || "UP"}</span>
            <span class="div-badge">${district.division} Div</span>
          </div>

          <h3 class="district-title">${district.name}</h3>
          <p class="district-hq">🏛️ HQ: <strong>${district.headquarters}</strong> · 👥 ${district.population}</p>

          <div class="card-section">
            <strong>✨ Famous Attractions:</strong>
            <p>${district.attractions.slice(0, 3).join(", ")}</p>
          </div>

          <div class="card-section">
            <strong>🏭 Industries & ODOP:</strong>
            <p>${district.industries.slice(0, 2).join(", ")}</p>
          </div>

          <div class="card-footer">
            <button type="button" class="btn-inspect-district">Inspect Details ➔</button>
          </div>
        `;

        card.addEventListener("click", () => {
          openDistrictModal(district);
        });

        districtsGridContainer.appendChild(card);
      });
    }

    // Open District Modal Inspector
    function openDistrictModal(district) {
      if (!detailModal) return;

      if (modalTitle) modalTitle.textContent = district.name;
      if (modalDivision) modalDivision.textContent = `${district.division} Division`;
      if (modalRegion) modalRegion.textContent = district.region || "Uttar Pradesh";
      if (modalHq) modalHq.textContent = district.headquarters;
      if (modalPop) modalPop.textContent = district.population;

      if (modalAttractions) {
        modalAttractions.innerHTML = district.attractions.map(a => `<li>📍 ${a}</li>`).join("");
      }
      if (modalIndustries) {
        modalIndustries.innerHTML = district.industries.map(i => `<li>🏭 ${i}</li>`).join("");
      }
      if (modalCuisine) {
        modalCuisine.innerHTML = district.cuisine.map(c => `<li>🍲 ${c}</li>`).join("");
      }
      if (modalFestivals) {
        modalFestivals.innerHTML = district.festivals.map(f => `<li>🎉 ${f}</li>`).join("");
      }

      detailModal.classList.add("active");
    }

    modalCloseBtn?.addEventListener("click", () => {
      detailModal?.classList.remove("active");
    });

    // Event Listeners
    searchInput?.addEventListener("input", renderDistrictsGrid);
    divisionSelect?.addEventListener("change", renderDistrictsGrid);
    regionSelect?.addEventListener("change", renderDistrictsGrid);

    // Initial Full Render
    renderDistrictsGrid();
  });
}
