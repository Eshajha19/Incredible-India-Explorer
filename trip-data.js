/**
 * trip-data.js
 * Curated dataset of Indian travel destinations used by the Trip Planner
 * (js-modules/trip-planner.js). Rule-based, client-side only — no backend.
 *
 * Each destination:
 *  - categories: matches the planner's preference filters
 *      historical | beaches | mountains | wildlife | spiritual | heritage |
 *      desert | backwaters | adventure | city
 *  - costPerDay: approximate INR per person per day (stay + food + local
 *    transport), by tier. These are editorial estimates for planning
 *    purposes only, not live pricing.
 *  - travelHub: nearest major airport/rail hub, used for rough inter-city
 *    travel cost/time estimation.
 *  - popularity: 1-10, used only to break ties between equally-relevant
 *    destinations.
 */
(function (root) {
"use strict";
root.tripDestinations = [
  { id: "agra", name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081,
    categories: ["historical", "heritage"], highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
    minDays: 2, maxDays: 3, popularity: 10, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1500, mid: 3500, luxury: 8500 },
    description: "Home to the Taj Mahal and Mughal-era forts." },

  { id: "delhi", name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090,
    categories: ["historical", "heritage", "city"], highlights: ["Red Fort", "Qutub Minar", "India Gate"],
    minDays: 2, maxDays: 4, popularity: 10, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1800, mid: 4000, luxury: 10000 },
    description: "Capital city layered with Mughal, colonial, and modern India." },

  { id: "jaipur", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873,
    categories: ["historical", "heritage", "desert"], highlights: ["Amber Fort", "City Palace", "Hawa Mahal"],
    minDays: 2, maxDays: 3, popularity: 9, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1400, mid: 3200, luxury: 8000 },
    description: "The Pink City, gateway to royal Rajasthan." },

  { id: "jodhpur", name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243,
    categories: ["historical", "heritage", "desert"], highlights: ["Mehrangarh Fort", "Blue City streets", "Jaswant Thada"],
    minDays: 2, maxDays: 2, popularity: 7, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1300, mid: 3000, luxury: 7500 },
    description: "The Blue City beneath a dramatic hilltop fort." },

  { id: "jaisalmer", name: "Jaisalmer", state: "Rajasthan", lat: 26.9157, lng: 70.9083,
    categories: ["desert", "historical", "adventure"], highlights: ["Living Fort", "Sam Sand Dunes", "Camel safari"],
    minDays: 2, maxDays: 3, popularity: 8, bestSeason: "Nov-Feb",
    costPerDay: { budget: 1600, mid: 3800, luxury: 9500 },
    description: "Golden sandstone fort on the edge of the Thar Desert." },

  { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125,
    categories: ["historical", "heritage"], highlights: ["Lake Pichola", "City Palace", "Jag Mandir"],
    minDays: 2, maxDays: 3, popularity: 9, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1600, mid: 4000, luxury: 11000 },
    description: "Romantic lake city known as the Venice of the East." },

  { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739,
    categories: ["spiritual", "historical"], highlights: ["Ganga Aarti", "Kashi Vishwanath", "Boat ride at dawn"],
    minDays: 2, maxDays: 2, popularity: 9, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1200, mid: 2800, luxury: 7000 },
    description: "One of the world's oldest living cities, on the banks of the Ganges." },

  { id: "rishikesh", name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676,
    categories: ["spiritual", "adventure", "mountains"], highlights: ["Ganga Aarti at Triveni Ghat", "River rafting", "Yoga ashrams"],
    minDays: 2, maxDays: 3, popularity: 8, bestSeason: "Sep-Apr",
    costPerDay: { budget: 1100, mid: 2500, luxury: 6500 },
    description: "Yoga capital of the world on the banks of the Ganges." },

  { id: "haridwar", name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642,
    categories: ["spiritual"], highlights: ["Har Ki Pauri Aarti", "Mansa Devi Temple"],
    minDays: 1, maxDays: 2, popularity: 6, bestSeason: "Sep-Apr",
    costPerDay: { budget: 1000, mid: 2200, luxury: 5500 },
    description: "Sacred gateway to the Himalayas, on the Ganges." },

  { id: "amritsar", name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723,
    categories: ["spiritual", "historical"], highlights: ["Golden Temple", "Jallianwala Bagh", "Wagah Border ceremony"],
    minDays: 2, maxDays: 2, popularity: 8, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1200, mid: 2800, luxury: 6800 },
    description: "Home to the Golden Temple, spiritual heart of Sikhism." },

  { id: "shimla", name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734,
    categories: ["mountains"], highlights: ["The Ridge", "Mall Road", "Kalka-Shimla toy train"],
    minDays: 2, maxDays: 3, popularity: 8, bestSeason: "Mar-Jun, Sep-Nov",
    costPerDay: { budget: 1500, mid: 3500, luxury: 9000 },
    description: "Colonial-era hill station in the Himalayan foothills." },

  { id: "manali", name: "Manali", state: "Himachal Pradesh", lat: 32.2432, lng: 77.1892,
    categories: ["mountains", "adventure"], highlights: ["Solang Valley", "Rohtang Pass", "Old Manali cafes"],
    minDays: 2, maxDays: 4, popularity: 9, bestSeason: "Mar-Jun, Oct-Feb",
    costPerDay: { budget: 1400, mid: 3200, luxury: 8500 },
    description: "Snow-capped adventure hub in the Kullu Valley." },

  { id: "leh", name: "Leh", state: "Ladakh", lat: 34.1526, lng: 77.5771,
    categories: ["mountains", "adventure", "spiritual"], highlights: ["Pangong Lake", "Nubra Valley", "Leh Palace"],
    minDays: 3, maxDays: 5, popularity: 9, bestSeason: "May-Sep",
    costPerDay: { budget: 2000, mid: 4500, luxury: 12000 },
    description: "High-altitude Himalayan desert with monasteries and mountain passes." },

  { id: "darjeeling", name: "Darjeeling", state: "West Bengal", lat: 27.0410, lng: 88.2663,
    categories: ["mountains"], highlights: ["Tiger Hill sunrise", "Toy train", "Tea gardens"],
    minDays: 2, maxDays: 3, popularity: 7, bestSeason: "Mar-May, Oct-Nov",
    costPerDay: { budget: 1300, mid: 3000, luxury: 7500 },
    description: "Misty tea-garden hill station with Kanchenjunga views." },

  { id: "gangtok", name: "Gangtok", state: "Sikkim", lat: 27.3389, lng: 88.6065,
    categories: ["mountains", "spiritual"], highlights: ["Tsomgo Lake", "Rumtek Monastery", "MG Marg"],
    minDays: 2, maxDays: 3, popularity: 7, bestSeason: "Mar-Jun, Sep-Dec",
    costPerDay: { budget: 1400, mid: 3300, luxury: 8500 },
    description: "Capital of Sikkim, framed by the Kanchenjunga range." },

  { id: "munnar", name: "Munnar", state: "Kerala", lat: 10.0889, lng: 77.0595,
    categories: ["mountains", "backwaters"], highlights: ["Tea plantations", "Eravikulam National Park", "Mattupetty Dam"],
    minDays: 2, maxDays: 3, popularity: 8, bestSeason: "Sep-Mar",
    costPerDay: { budget: 1500, mid: 3500, luxury: 9000 },
    description: "Rolling green tea hills of the Western Ghats." },

  { id: "ooty", name: "Ooty", state: "Tamil Nadu", lat: 11.4102, lng: 76.6950,
    categories: ["mountains"], highlights: ["Nilgiri toy train", "Botanical Gardens", "Doddabetta Peak"],
    minDays: 2, maxDays: 2, popularity: 6, bestSeason: "Oct-Jun",
    costPerDay: { budget: 1300, mid: 3000, luxury: 7500 },
    description: "Queen of the Nilgiris hill stations." },

  { id: "coorg", name: "Coorg", state: "Karnataka", lat: 12.3375, lng: 75.8069,
    categories: ["mountains", "adventure"], highlights: ["Abbey Falls", "Coffee plantations", "Dubare Elephant Camp"],
    minDays: 2, maxDays: 3, popularity: 7, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1400, mid: 3300, luxury: 8000 },
    description: "Misty coffee country known as the Scotland of India." },

  { id: "goa", name: "Goa", state: "Goa", lat: 15.2993, lng: 74.1240,
    categories: ["beaches", "heritage"], highlights: ["Baga & Palolem beaches", "Old Goa churches", "Sunset cruise"],
    minDays: 3, maxDays: 5, popularity: 10, bestSeason: "Nov-Feb",
    costPerDay: { budget: 1500, mid: 3800, luxury: 10000 },
    description: "India's beach capital, blending Portuguese heritage and coastline." },

  { id: "gokarna", name: "Gokarna", state: "Karnataka", lat: 14.5479, lng: 74.3188,
    categories: ["beaches", "spiritual"], highlights: ["Om Beach", "Kudle Beach", "Mahabaleshwar Temple"],
    minDays: 2, maxDays: 3, popularity: 6, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1000, mid: 2400, luxury: 6000 },
    description: "Laid-back temple town with quiet cliffside beaches." },

  { id: "varkala", name: "Varkala", state: "Kerala", lat: 8.7379, lng: 76.7163,
    categories: ["beaches", "spiritual"], highlights: ["Varkala cliff", "Janardanaswamy Temple", "Papanasam Beach"],
    minDays: 2, maxDays: 2, popularity: 7, bestSeason: "Nov-Mar",
    costPerDay: { budget: 1300, mid: 3000, luxury: 7500 },
    description: "Clifftop beach town with mineral springs." },

  { id: "alleppey", name: "Alleppey (Alappuzha)", state: "Kerala", lat: 9.4981, lng: 76.3388,
    categories: ["backwaters", "beaches"], highlights: ["Houseboat cruise", "Backwater villages", "Alappuzha Beach"],
    minDays: 2, maxDays: 2, popularity: 9, bestSeason: "Nov-Feb",
    costPerDay: { budget: 1800, mid: 4200, luxury: 11000 },
    description: "Venice of the East — palm-fringed backwater houseboat cruises." },

  { id: "kochi", name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673,
    categories: ["heritage", "backwaters", "city"], highlights: ["Fort Kochi", "Chinese fishing nets", "Mattancherry Palace"],
    minDays: 2, maxDays: 3, popularity: 8, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1400, mid: 3300, luxury: 8500 },
    description: "Colonial-era spice port on the Malabar coast." },

  { id: "andaman", name: "Port Blair & Havelock", state: "Andaman and Nicobar Islands", lat: 11.6234, lng: 92.7265,
    categories: ["beaches", "wildlife", "adventure"], highlights: ["Radhanagar Beach", "Scuba diving", "Cellular Jail"],
    minDays: 3, maxDays: 5, popularity: 8, bestSeason: "Oct-May",
    costPerDay: { budget: 2200, mid: 5000, luxury: 13000 },
    description: "Turquoise-water archipelago in the Bay of Bengal." },

  { id: "pondicherry", name: "Pondicherry", state: "Puducherry", lat: 11.9416, lng: 79.8083,
    categories: ["beaches", "heritage", "spiritual"], highlights: ["French Quarter", "Auroville", "Promenade Beach"],
    minDays: 2, maxDays: 2, popularity: 7, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1300, mid: 3000, luxury: 7500 },
    description: "French colonial charm on the Coromandel Coast." },

  { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777,
    categories: ["city", "heritage", "beaches"], highlights: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
    minDays: 2, maxDays: 3, popularity: 9, bestSeason: "Nov-Feb",
    costPerDay: { budget: 2000, mid: 4500, luxury: 12000 },
    description: "India's coastal megacity of movies, markets, and monuments." },

  { id: "ajanta-ellora", name: "Aurangabad (Ajanta & Ellora)", state: "Maharashtra", lat: 19.8762, lng: 75.3433,
    categories: ["historical", "heritage", "spiritual"], highlights: ["Ajanta Caves", "Ellora Caves", "Bibi Ka Maqbara"],
    minDays: 2, maxDays: 2, popularity: 7, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1300, mid: 3000, luxury: 7500 },
    description: "Rock-cut Buddhist, Hindu, and Jain cave temples, UNESCO listed." },

  { id: "hampi", name: "Hampi", state: "Karnataka", lat: 15.3350, lng: 76.4600,
    categories: ["historical", "heritage", "adventure"], highlights: ["Virupaksha Temple", "Vittala Temple stone chariot", "Boulder landscape"],
    minDays: 2, maxDays: 2, popularity: 8, bestSeason: "Oct-Feb",
    costPerDay: { budget: 1100, mid: 2600, luxury: 6500 },
    description: "Ruins of the Vijayanagara Empire amid a surreal boulder landscape." },

  { id: "mysore", name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394,
    categories: ["historical", "heritage"], highlights: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens"],
    minDays: 2, maxDays: 2, popularity: 7, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1200, mid: 2800, luxury: 7000 },
    description: "Regal city of palaces and silk sarees." },

  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946,
    categories: ["city"], highlights: ["Lalbagh Gardens", "Cubbon Park", "Craft breweries"],
    minDays: 2, maxDays: 2, popularity: 6, bestSeason: "Oct-Feb",
    costPerDay: { budget: 1600, mid: 3800, luxury: 9500 },
    description: "India's Garden City and tech hub." },

  { id: "hyderabad", name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867,
    categories: ["historical", "city"], highlights: ["Charminar", "Golconda Fort", "Hyderabadi biryani"],
    minDays: 2, maxDays: 2, popularity: 7, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1400, mid: 3200, luxury: 8000 },
    description: "City of pearls and Nizami heritage." },

  { id: "khajuraho", name: "Khajuraho", state: "Madhya Pradesh", lat: 24.8318, lng: 79.9199,
    categories: ["historical", "heritage", "spiritual"], highlights: ["Western Group temples", "Intricate stone carvings"],
    minDays: 1, maxDays: 2, popularity: 6, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1200, mid: 2800, luxury: 7000 },
    description: "UNESCO temple complex famed for its sculptural artistry." },

  { id: "ranthambore", name: "Ranthambore", state: "Rajasthan", lat: 26.0173, lng: 76.5026,
    categories: ["wildlife"], highlights: ["Tiger safari", "Ranthambore Fort"],
    minDays: 2, maxDays: 2, popularity: 8, bestSeason: "Oct-Jun",
    costPerDay: { budget: 2000, mid: 4500, luxury: 12000 },
    description: "One of India's best tiger reserves." },

  { id: "kaziranga", name: "Kaziranga", state: "Assam", lat: 26.5775, lng: 93.1714,
    categories: ["wildlife"], highlights: ["One-horned rhino safari", "Elephant-back safari"],
    minDays: 2, maxDays: 2, popularity: 7, bestSeason: "Nov-Apr",
    costPerDay: { budget: 1800, mid: 4000, luxury: 10000 },
    description: "UNESCO wildlife sanctuary famous for Indian one-horned rhinos." },

  { id: "jim-corbett", name: "Jim Corbett", state: "Uttarakhand", lat: 29.5300, lng: 78.7747,
    categories: ["wildlife", "adventure"], highlights: ["Tiger safari", "Corbett Falls", "River rafting nearby"],
    minDays: 2, maxDays: 2, popularity: 7, bestSeason: "Nov-Jun",
    costPerDay: { budget: 1700, mid: 3800, luxury: 9500 },
    description: "India's oldest national park, on the Ramganga river." },

  { id: "periyar", name: "Thekkady (Periyar)", state: "Kerala", lat: 9.5916, lng: 77.1600,
    categories: ["wildlife", "mountains"], highlights: ["Periyar Lake boat safari", "Spice plantations"],
    minDays: 2, maxDays: 2, popularity: 6, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1400, mid: 3200, luxury: 8000 },
    description: "Wildlife sanctuary in the Cardamom Hills." },

  { id: "sundarbans", name: "Sundarbans", state: "West Bengal", lat: 21.9497, lng: 88.9468,
    categories: ["wildlife", "backwaters"], highlights: ["Mangrove boat safari", "Royal Bengal Tiger territory"],
    minDays: 2, maxDays: 2, popularity: 5, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1900, mid: 4200, luxury: 10500 },
    description: "World's largest mangrove delta, home to the Royal Bengal Tiger." },

  { id: "rann-of-kutch", name: "Rann of Kutch", state: "Gujarat", lat: 23.7337, lng: 69.8597,
    categories: ["desert", "heritage"], highlights: ["White salt desert", "Rann Utsav tent city", "Kalo Dungar sunset"],
    minDays: 2, maxDays: 3, popularity: 7, bestSeason: "Nov-Feb",
    costPerDay: { budget: 1500, mid: 3500, luxury: 9000 },
    description: "Vast white salt desert that glows under moonlight." },

  { id: "mcleodganj", name: "McLeodganj", state: "Himachal Pradesh", lat: 32.2432, lng: 76.3234,
    categories: ["mountains", "spiritual"], highlights: ["Dalai Lama Temple", "Triund trek", "Tibetan markets"],
    minDays: 2, maxDays: 3, popularity: 7, bestSeason: "Mar-Jun, Sep-Nov",
    costPerDay: { budget: 1200, mid: 2800, luxury: 7000 },
    description: "Little Lhasa in the Dhauladhar mountains." },

  { id: "spiti", name: "Spiti Valley", state: "Himachal Pradesh", lat: 32.2461, lng: 78.0349,
    categories: ["mountains", "adventure", "spiritual"], highlights: ["Key Monastery", "Chandratal Lake", "Kibber village"],
    minDays: 3, maxDays: 5, popularity: 7, bestSeason: "May-Oct",
    costPerDay: { budget: 1600, mid: 3600, luxury: 9000 },
    description: "Cold desert valley of ancient monasteries, Little Tibet." },

  { id: "kolkata", name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639,
    categories: ["city", "heritage"], highlights: ["Victoria Memorial", "Howrah Bridge", "College Street"],
    minDays: 2, maxDays: 3, popularity: 7, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1400, mid: 3200, luxury: 8000 },
    description: "City of joy, culture, and colonial architecture." },

  { id: "chennai", name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707,
    categories: ["city", "beaches", "heritage"], highlights: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George"],
    minDays: 2, maxDays: 2, popularity: 6, bestSeason: "Nov-Feb",
    costPerDay: { budget: 1400, mid: 3200, luxury: 8000 },
    description: "Gateway to South India on the Coromandel Coast." },

  { id: "mahabalipuram", name: "Mahabalipuram", state: "Tamil Nadu", lat: 12.6269, lng: 80.1927,
    categories: ["historical", "beaches", "heritage"], highlights: ["Shore Temple", "Pancha Rathas", "Arjuna's Penance"],
    minDays: 1, maxDays: 2, popularity: 6, bestSeason: "Nov-Feb",
    costPerDay: { budget: 1100, mid: 2600, luxury: 6500 },
    description: "UNESCO shore temples carved by the Pallava dynasty." },

  { id: "madurai", name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198,
    categories: ["spiritual", "historical"], highlights: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Palace"],
    minDays: 1, maxDays: 2, popularity: 6, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1100, mid: 2600, luxury: 6500 },
    description: "Ancient temple city on the Vaigai river." },

  { id: "bodhgaya", name: "Bodh Gaya", state: "Bihar", lat: 24.6959, lng: 84.9917,
    categories: ["spiritual", "historical"], highlights: ["Mahabodhi Temple", "Bodhi Tree", "Meditation centers"],
    minDays: 1, maxDays: 2, popularity: 6, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1000, mid: 2400, luxury: 6000 },
    description: "Where Buddha attained enlightenment, UNESCO site." },

  { id: "dharamshala", name: "Dharamshala", state: "Himachal Pradesh", lat: 32.2190, lng: 76.3234,
    categories: ["mountains", "spiritual"], highlights: ["Himalayan views", "Norbulingka Institute"],
    minDays: 2, maxDays: 2, popularity: 6, bestSeason: "Mar-Jun, Sep-Nov",
    costPerDay: { budget: 1200, mid: 2800, luxury: 7000 },
    description: "Gateway hill town to McLeodganj." },

  { id: "diu", name: "Diu", state: "Daman and Diu", lat: 20.7144, lng: 70.9874,
    categories: ["beaches", "heritage"], highlights: ["Diu Fort", "Nagoa Beach", "St. Paul's Church"],
    minDays: 1, maxDays: 2, popularity: 5, bestSeason: "Oct-Mar",
    costPerDay: { budget: 1100, mid: 2600, luxury: 6500 },
    description: "Quiet Portuguese-colonial island off Gujarat's coast." },

  { id: "lakshadweep", name: "Lakshadweep", state: "Lakshadweep", lat: 10.5667, lng: 72.6417,
    categories: ["beaches", "wildlife", "adventure"], highlights: ["Coral reefs", "Lagoon snorkeling", "Kavaratti Island"],
    minDays: 3, maxDays: 4, popularity: 6, bestSeason: "Oct-May",
    costPerDay: { budget: 2500, mid: 5500, luxury: 14000 },
    description: "Coral-fringed island chain in the Arabian Sea." },
];

if (typeof module !== "undefined" && module.exports) {
    module.exports = root.tripDestinations;
}
})(typeof window !== "undefined" ? window : globalThis);
