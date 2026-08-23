// Yoga Types - Data models and constants for Yoga & Wellness Guide
export const YOGA_STYLES = [
  { id: 'hatha', name: 'Hatha Yoga', icon: '🧘', color: '#FF6B6B', description: 'Traditional yoga focusing on physical postures and breathing', intensity: 'beginner' },
  { id: 'vinyasa', name: 'Vinyasa Yoga', icon: '🌊', color: '#4ECDC4', description: 'Flow-based yoga linking breath with movement', intensity: 'intermediate' },
  { id: 'ashtanga', name: 'Ashtanga Yoga', icon: '🔥', color: '#45B7D1', description: 'Rigorous sequence of postures with focus on breathing', intensity: 'advanced' },
  { id: 'iyengar', name: 'Iyengar Yoga', icon: '🎯', color: '#96CEB4', description: 'Precision-focused yoga using props for alignment', intensity: 'beginner' },
  { id: 'bikram', name: 'Bikram Yoga', icon: '🌡', color: '#FFEAA7', description: '26 postures in a heated room (40°C)', intensity: 'intermediate' },
  { id: 'kundalini', name: 'Kundalini Yoga', icon: '⚡', color: '#DDA0DD', description: 'Combines postures, breathing, meditation, and chanting', intensity: 'intermediate' },
  { id: 'yin', name: 'Yin Yoga', icon: '☯', color: '#98D8C8', description: 'Slow-paced yoga with passive stretches held for minutes', intensity: 'beginner' },
  { id: 'restorative', name: 'Restorative Yoga', icon: '😴', color: '#F7DC6F', description: 'Gentle yoga using props to support the body', intensity: 'beginner' },
  { id: 'power', name: 'Power Yoga', icon: '💪', color: '#FF6B6B', description: 'Fitness-based vinyasa practice', intensity: 'advanced' },
  { id: 'kripalu', name: 'Kripalu Yoga', icon: '💛', color: '#4ECDC4', description: 'Compassionate, awareness-based practice', intensity: 'beginner' }
];

export const CHAKRAS = [
  { id: 'root', name: 'Root Chakra', sanskrit: 'Muladhara', color: '#FF0000', location: 'Base of spine', element: 'Earth', mantra: 'LAM', benefits: ['Grounding', 'Security', 'Stability'] },
  { id: 'sacral', name: 'Sacral Chakra', sanskrit: 'Svadhisthana', color: '#FF7F00', location: 'Lower abdomen', element: 'Water', mantra: 'VAM', benefits: ['Creativity', 'Passion', 'Emotions'] },
  { id: 'solar', name: 'Solar Plexus', sanskrit: 'Manipura', color: '#FFFF00', location: 'Upper abdomen', element: 'Fire', mantra: 'RAM', benefits: ['Confidence', 'Willpower', 'Self-esteem'] },
  { id: 'heart', name: 'Heart Chakra', sanskrit: 'Anahata', color: '#00FF00', location: 'Center of chest', element: 'Air', mantra: 'YAM', benefits: ['Love', 'Compassion', 'Healing'] },
  { id: 'throat', name: 'Throat Chakra', sanskrit: 'Vishuddha', color: '#0000FF', location: 'Throat', element: 'Ether', mantra: 'HAM', benefits: ['Communication', 'Truth', 'Expression'] },
  { id: 'third-eye', name: 'Third Eye', sanskrit: 'Ajna', color: '#4B0082', location: 'Forehead', element: 'Light', mantra: 'OM', benefits: ['Intuition', 'Wisdom', 'Awareness'] },
  { id: 'crown', name: 'Crown Chakra', sanskrit: 'Sahasrara', color: '#9400D3', location: 'Top of head', element: 'Thought', mantra: 'Silence', benefits: ['Spirituality', 'Connection', 'Enlightenment'] }
];

export const PRANAYAMA_TECHNIQUES = [
  { id: 'ujjayi', name: 'Ujjayi Breath', icon: '🌬', color: '#4ECDC4', description: 'Victorious breath with gentle throat constriction', duration: '5-10 min', benefits: ['Calms mind', 'Regulates temperature', 'Improves focus'] },
  { id: 'nadi-shodhana', name: 'Nadi Shodhana', icon: '👃', color: '#45B7D1', description: 'Alternate nostril breathing', duration: '5-15 min', benefits: ['Balances energy', 'Reduces anxiety', 'Enhances clarity'] },
  { id: 'kapalabhati', name: 'Kapalabhati', icon: '💨', color: '#FF6B6B', description: 'Skull-shining breath with rapid exhales', duration: '3-5 min', benefits: ['Energizes', 'Clears sinuses', 'Detoxifies'] },
  { id: 'bhramari', name: 'Bhramari', icon: '🐝', color: '#FFEAA7', description: 'Humming bee breath', duration: '5-10 min', benefits: ['Reduces stress', 'Calms nerves', 'Improves sleep'] },
  { id: 'sitali', name: 'Sitali Pranayama', icon: '❄', color: '#98D8C8', description: 'Cooling breath through curled tongue', duration: '3-5 min', benefits: ['Cools body', 'Reduces hunger', 'Balances pitta'] },
  { id: 'bhastrika', name: 'Bhastrika', icon: '🔔', color: '#DDA0DD', description: 'Bellows breath with forceful inhale and exhale', duration: '3-5 min', benefits: ['Boosts energy', 'Clears chakras', 'Warms body'] }
];

export const MEDITATION_TYPES = [
  { id: 'mindfulness', name: 'Mindfulness', icon: '🧠', color: '#4ECDC4', description: 'Present-moment awareness practice' },
  { id: 'transcendental', name: 'Transcendental', icon: '🕉', color: '#DDA0DD', description: 'Mantra-based meditation technique' },
  { id: 'loving-kindness', name: 'Loving Kindness', icon: '💜', color: '#FF6B6B', description: 'Metta meditation cultivating compassion' },
  { id: 'yoga-nidra', name: 'Yoga Nidra', icon: '🌙', color: '#45B7D1', description: 'Yogic sleep - deep relaxation technique' },
  { id: 'zen', name: 'Zen Meditation', icon: '☯', color: '#96CEB4', description: 'Zazen sitting meditation' },
  { id: 'trataka', name: 'Trataka', icon: '🕯', color: '#FFEAA7', description: 'Candle gazing concentration practice' }
];

export const ASANA_CATEGORIES = [
  { id: 'standing', name: 'Standing Poses', icon: '🧍', color: '#FF6B6B', description: 'Build strength and stability' },
  { id: 'seated', name: 'Seated Poses', icon: '🧘', color: '#4ECDC4', description: 'Improve flexibility and calm' },
  { id: 'backbend', name: 'Backbends', icon: '🌉', color: '#45B7D1', description: 'Open heart and energize' },
  { id: 'forward-fold', name: 'Forward Folds', icon: '🙇', color: '#96CEB4', description: 'Introspective and calming' },
  { id: 'twist', name: 'Twists', icon: '🌀', color: '#FFEAA7', description: 'Detoxify and realign' },
  { id: 'inversion', name: 'Inversions', icon: '🤸', color: '#DDA0DD', description: 'Reverse blood flow and perspective' },
  { id: 'balance', name: 'Balancing', icon: '⚖', color: '#98D8C8', description: 'Focus and core strength' },
  { id: 'restorative', name: 'Restorative', icon: '😴', color: '#F7DC6F', description: 'Deep relaxation and healing' }
];

export const FORMATTERS = {
  formatDuration: (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  },
  formatDifficulty: (level) => {
    const icons = { beginner: '🟢', intermediate: '🟡', advanced: '🔴' };
    return `${icons[level] || '⚪'} ${level.charAt(0).toUpperCase() + level.slice(1)}`;
  },
  getChakraColor: (chakraId) => {
    const chakra = CHAKRAS.find(c => c.id === chakraId);
    return chakra?.color || '#94a3b8';
  }
};

export default {
  YOGA_STYLES,
  CHAKRAS,
  PRANAYAMA_TECHNIQUES,
  MEDITATION_TYPES,
  ASANA_CATEGORIES,
  FORMATTERS
};