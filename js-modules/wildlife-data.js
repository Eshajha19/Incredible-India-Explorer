/**
 * wildlife-data.js
 * Definitions for parks, animals, items, and traps
 */

export const PARKS = [
    {
      id: "jim-corbett",
      name: "Jim Corbett National Park",
      animal: { name: "Bengal Tiger", icon: "🐅", health: 70 },
      unlocked: true,
      difficulty: 1,
      mapSize: 10
    },
    {
      id: "kaziranga",
      name: "Kaziranga National Park",
      animal: { name: "One-Horned Rhino", icon: "🦏", health: 60 },
      unlocked: false,
      difficulty: 2,
      mapSize: 12
    },
    {
      id: "periyar",
      name: "Periyar National Park",
      animal: { name: "Indian Elephant", icon: "🐘", health: 50 },
      unlocked: false,
      difficulty: 3,
      mapSize: 12
    },
    {
      id: "hemis",
      name: "Hemis National Park",
      animal: { name: "Snow Leopard", icon: "🐆", health: 40 },
      unlocked: false,
      difficulty: 4,
      mapSize: 14
    },
    {
      id: "gir",
      name: "Gir National Park",
      animal: { name: "Asiatic Lion", icon: "🦁", health: 40 },
      unlocked: false,
      difficulty: 5,
      mapSize: 14
    }
  ];
  
export const SUPPLIES = ["Medical Kit", "Tracking Tag", "Ranger Equipment"];
