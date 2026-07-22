/**
 * unlock.js
 * Helpers for unlocking logic if needed outside of the store
 */

export const UNLOCKS = [
  { required: 3, reward: "Traveler Badge" },
  { required: 5, reward: "Traditional Outfit" },
  { required: 10, reward: "Golden Passport" },
  { required: 15, reward: "Explorer Avatar" },
  { required: 20, reward: "Master Explorer Title" },
  { required: 28, reward: "Incredible India Crown" }
];

export function getNextUnlock(currentStampsCount) {
  return UNLOCKS.find(unlock => unlock.required > currentStampsCount);
}
