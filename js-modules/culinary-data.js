/**
 * culinary-data.js
 * Recipe and Ingredient definitions
 */

export const RECIPES = [
    {
      id: "biryani",
      name: "Hyderabadi Biryani",
      ingredients: ["Rice", "Chicken", "Spices", "Mint", "Fried Onion"],
      time: 60,
      reward: 200
    },
    {
      id: "dosa",
      name: "Crispy Dosa & Sambhar",
      ingredients: ["Batter", "Oil", "Potato Masala", "Sambhar"],
      time: 45,
      reward: 150
    },
    {
      id: "chole",
      name: "Chole Bhature",
      ingredients: ["Chole", "Bhature Dough", "Oil", "Onion"],
      time: 50,
      reward: 180
    },
    {
      id: "rogan_josh",
      name: "Kashmiri Rogan Josh",
      ingredients: ["Mutton", "Oil", "Spices", "Yogurt"],
      time: 55,
      reward: 190
    },
    {
      id: "poha",
      name: "Indori Poha",
      ingredients: ["Poha", "Onion", "Spices", "Sev"],
      time: 30,
      reward: 100
    },
    {
      id: "rasgulla",
      name: "Bengali Rasgulla",
      ingredients: ["Milk", "Sugar Syrup", "Cardamom"],
      time: 40,
      reward: 120
    }
  ];
  
// Global pool for the pantry UI
export const INGREDIENTS = {
    "Rice": "🍚", 
    "Chicken": "🍗", 
    "Spices": "🌶️", 
    "Mint": "🌿", 
    "Fried Onion": "🧅",
    "Batter": "🥣", 
    "Oil": "🛢️", 
    "Potato Masala": "🥔", 
    "Sambhar": "🍲",
    "Chole": "🥘", 
    "Bhature Dough": "🍞", 
    "Onion": "🧅",
    "Mutton": "🥩", 
    "Yogurt": "🥛",
    "Poha": "🥡", 
    "Sev": "🥨",
    "Milk": "🥛", 
    "Sugar Syrup": "🍯", 
    "Cardamom": "🌱"
};
