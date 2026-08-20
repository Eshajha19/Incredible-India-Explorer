/**
 * Smart Travel Packing Assistant
 * Destination, activity and seasonal recommendation data.
 */

export const PACKING_DESTINATIONS = [
    {
        id: "delhi",
        name: "Delhi",
        state: "Delhi",
        lat: 28.6139,
        lng: 77.2090,
        climate: ["hot", "warm", "monsoon", "cool"]
    },
    {
        id: "jaipur",
        name: "Jaipur",
        state: "Rajasthan",
        lat: 26.9124,
        lng: 75.7873,
        climate: ["hot", "warm", "cool", "dry"]
    },
    {
        id: "goa",
        name: "Goa",
        state: "Goa",
        lat: 15.2993,
        lng: 74.1240,
        climate: ["hot", "humid", "monsoon"]
    },
    {
        id: "mumbai",
        name: "Mumbai",
        state: "Maharashtra",
        lat: 19.0760,
        lng: 72.8777,
        climate: ["hot", "humid", "monsoon", "warm"]
    },
    {
        id: "kerala",
        name: "Kerala",
        state: "Kerala",
        lat: 10.8505,
        lng: 76.2711,
        climate: ["hot", "humid", "monsoon"]
    },
    {
        id: "manali",
        name: "Manali",
        state: "Himachal Pradesh",
        lat: 32.2432,
        lng: 77.1892,
        climate: ["cool", "cold", "snow"]
    },
    {
        id: "shimla",
        name: "Shimla",
        state: "Himachal Pradesh",
        lat: 31.1048,
        lng: 77.1734,
        climate: ["cool", "cold", "snow"]
    },
    {
        id: "leh",
        name: "Leh",
        state: "Ladakh",
        lat: 34.1526,
        lng: 77.5771,
        climate: ["cold", "dry", "snow"]
    },
    {
        id: "varanasi",
        name: "Varanasi",
        state: "Uttar Pradesh",
        lat: 25.3176,
        lng: 82.9739,
        climate: ["hot", "warm", "monsoon", "cool"]
    },
    {
        id: "kolkata",
        name: "Kolkata",
        state: "West Bengal",
        lat: 22.5726,
        lng: 88.3639,
        climate: ["hot", "humid", "monsoon", "warm"]
    },
    {
        id: "bengaluru",
        name: "Bengaluru",
        state: "Karnataka",
        lat: 12.9716,
        lng: 77.5946,
        climate: ["warm", "cool", "monsoon"]
    },
    {
        id: "rishikesh",
        name: "Rishikesh",
        state: "Uttarakhand",
        lat: 30.0869,
        lng: 78.2676,
        climate: ["warm", "cool", "monsoon"]
    }
];

export const PACKING_CATEGORIES = [
    {
        id: "clothing",
        name: "Clothing",
        icon: "👕"
    },
    {
        id: "footwear",
        name: "Footwear",
        icon: "👟"
    },
    {
        id: "toiletries",
        name: "Toiletries",
        icon: "🧴"
    },
    {
        id: "documents",
        name: "Documents",
        icon: "📄"
    },
    {
        id: "electronics",
        name: "Electronics",
        icon: "🔌"
    },
    {
        id: "health",
        name: "Health & Personal",
        icon: "💊"
    },
    {
        id: "weather",
        name: "Weather Essentials",
        icon: "🌦️"
    },
    {
        id: "activity",
        name: "Activity Gear",
        icon: "🎒"
    },
    {
        id: "safety",
        name: "Safety",
        icon: "🛡️"
    },
    {
        id: "misc",
        name: "Miscellaneous",
        icon: "📦"
    }
];

export const ACTIVITIES = {
    sightseeing: {
        name: "Sightseeing",
        icon: "🏛️",
        items: [
            {
                name: "Comfortable walking shoes",
                category: "footwear",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Day backpack",
                category: "activity",
                quantity: 1,
                priority: "recommended"
            },
            {
                name: "Reusable water bottle",
                category: "health",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Sunglasses",
                category: "weather",
                quantity: 1,
                priority: "recommended"
            }
        ]
    },

    trekking: {
        name: "Trekking",
        icon: "🥾",
        items: [
            {
                name: "Trekking shoes",
                category: "footwear",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Trekking backpack",
                category: "activity",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Quick-dry clothing",
                category: "clothing",
                quantity: 2,
                priority: "recommended"
            },
            {
                name: "Headlamp",
                category: "activity",
                quantity: 1,
                priority: "recommended"
            },
            {
                name: "First-aid kit",
                category: "health",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Waterproof jacket",
                category: "weather",
                quantity: 1,
                priority: "recommended"
            }
        ]
    },

    beach: {
        name: "Beach",
        icon: "🏖️",
        items: [
            {
                name: "Swimwear",
                category: "clothing",
                quantity: 2,
                priority: "essential"
            },
            {
                name: "Beach towel",
                category: "activity",
                quantity: 1,
                priority: "recommended"
            },
            {
                name: "Sunscreen",
                category: "health",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Flip-flops",
                category: "footwear",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Sun hat",
                category: "weather",
                quantity: 1,
                priority: "recommended"
            }
        ]
    },

    photography: {
        name: "Photography",
        icon: "📷",
        items: [
            {
                name: "Camera",
                category: "electronics",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Extra memory card",
                category: "electronics",
                quantity: 1,
                priority: "recommended"
            },
            {
                name: "Power bank",
                category: "electronics",
                quantity: 1,
                priority: "recommended"
            },
            {
                name: "Camera protection pouch",
                category: "activity",
                quantity: 1,
                priority: "recommended"
            }
        ]
    },

    camping: {
        name: "Camping",
        icon: "⛺",
        items: [
            {
                name: "Tent",
                category: "activity",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Sleeping bag",
                category: "activity",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Torch",
                category: "activity",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Portable first-aid kit",
                category: "health",
                quantity: 1,
                priority: "essential"
            }
        ]
    },

    religious: {
        name: "Temple & Spiritual Visits",
        icon: "🛕",
        items: [
            {
                name: "Modest clothing",
                category: "clothing",
                quantity: 1,
                priority: "essential"
            },
            {
                name: "Comfortable footwear",
                category: "footwear",
                quantity: 1,
                priority: "recommended"
            },
            {
                name: "Small scarf/stole",
                category: "clothing",
                quantity: 1,
                priority: "recommended"
            }
        ]
    }
};

export const BASE_ITEMS = [
    {
        name: "Travel ID / Passport",
        category: "documents",
        quantity: 1,
        priority: "essential"
    },
    {
        name: "Travel tickets",
        category: "documents",
        quantity: 1,
        priority: "essential"
    },
    {
        name: "Hotel / accommodation confirmation",
        category: "documents",
        quantity: 1,
        priority: "recommended"
    },
    {
        name: "Phone",
        category: "electronics",
        quantity: 1,
        priority: "essential"
    },
    {
        name: "Phone charger",
        category: "electronics",
        quantity: 1,
        priority: "essential"
    },
    {
        name: "Power bank",
        category: "electronics",
        quantity: 1,
        priority: "recommended"
    },
    {
        name: "Toothbrush",
        category: "toiletries",
        quantity: 1,
        priority: "essential"
    },
    {
        name: "Toothpaste",
        category: "toiletries",
        quantity: 1,
        priority: "essential"
    },
    {
        name: "Shampoo / body wash",
        category: "toiletries",
        quantity: 1,
        priority: "recommended"
    },
    {
        name: "Personal medicines",
        category: "health",
        quantity: 1,
        priority: "essential"
    },
    {
        name: "Basic first-aid kit",
        category: "health",
        quantity: 1,
        priority: "recommended"
    },
    {
        name: "Hand sanitizer",
        category: "health",
        quantity: 1,
        priority: "recommended"
    },
    {
        name: "Reusable water bottle",
        category: "health",
        quantity: 1,
        priority: "recommended"
    },
    {
        name: "Small day backpack",
        category: "activity",
        quantity: 1,
        priority: "recommended"
    }
];

export const WEATHER_ITEMS = {
    rain: [
        {
            name: "Umbrella",
            category: "weather",
            quantity: 1,
            priority: "essential"
        },
        {
            name: "Waterproof bag cover",
            category: "weather",
            quantity: 1,
            priority: "recommended"
        },
        {
            name: "Quick-dry clothes",
            category: "clothing",
            quantity: 2,
            priority: "recommended"
        }
    ],

    hot: [
        {
            name: "Sunscreen",
            category: "health",
            quantity: 1,
            priority: "essential"
        },
        {
            name: "Sunglasses",
            category: "weather",
            quantity: 1,
            priority: "recommended"
        },
        {
            name: "Lightweight cotton clothes",
            category: "clothing",
            quantity: 3,
            priority: "essential"
        },
        {
            name: "Sun hat / cap",
            category: "weather",
            quantity: 1,
            priority: "recommended"
        }
    ],

    cold: [
        {
            name: "Warm jacket",
            category: "clothing",
            quantity: 1,
            priority: "essential"
        },
        {
            name: "Thermal wear",
            category: "clothing",
            quantity: 1,
            priority: "essential"
        },
        {
            name: "Warm socks",
            category: "clothing",
            quantity: 2,
            priority: "recommended"
        },
        {
            name: "Gloves",
            category: "clothing",
            quantity: 1,
            priority: "recommended"
        },
        {
            name: "Warm cap",
            category: "clothing",
            quantity: 1,
            priority: "recommended"
        }
    ]
};