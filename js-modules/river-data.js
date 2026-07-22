/**
 * river-data.js
 * Definitions for rivers, items, and landmarks
 */

export const RIVERS = [
    {
      id: "ganga",
      name: "Ganga",
      source: "Gangotri Glacier",
      destination: "Bay of Bengal",
      difficulty: 1,
      color: "#2b6cb0"
    },
    {
      id: "brahmaputra",
      name: "Brahmaputra",
      source: "Tibet",
      destination: "Bay of Bengal",
      difficulty: 2,
      color: "#2c5282"
    },
    {
      id: "godavari",
      name: "Godavari",
      source: "Nashik",
      destination: "Bay of Bengal",
      difficulty: 3,
      color: "#2a4365"
    }
  ];
  
export const FISH_TYPES = [
    { name: "Mahseer", icon: "🐟", points: 50 },
    { name: "Hilsa", icon: "🐠", points: 75 },
    { name: "Catfish", icon: "🐡", points: 100 }
];

export const OBSTACLE_TYPES = [
    { type: "Rock", icon: "🪨", damage: 1, points: -100 },
    { type: "Log", icon: "🪵", damage: 1, points: -50 },
    { type: "Pollution", icon: "🛢️", damage: 1, points: -150 }
];

export const LANDMARKS = [
    { name: "Varanasi Ghats", badge: "Sacred River Explorer", icon: "⛩️" },
    { name: "Howrah Bridge", badge: "Eastern Navigator", icon: "🌉" },
    { name: "Sundarbans", badge: "Delta Master", icon: "🐅" }
];
