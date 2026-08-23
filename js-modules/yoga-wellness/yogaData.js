// Yoga Data - Mock data generator for Yoga & Wellness Guide
import { YOGA_STYLES, CHAKRAS, PRANAYAMA_TECHNIQUES, MEDITATION_TYPES, ASANA_CATEGORIES } from './yogaTypes.js';

export const asanas = [
  { id: 1, name: 'Tadasana', english: 'Mountain Pose', category: 'standing', style: 'hatha', icon: '🧍', color: '#FF6B6B', difficulty: 'beginner', duration: '30-60 sec', sanskrit: 'ताडासन', benefits: ['Improves posture', 'Strengthens thighs', 'Increases awareness'], contraindications: ['Low blood pressure'], chakras: ['root', 'solar'] },
  { id: 2, name: 'Vrikshasana', english: 'Tree Pose', category: 'balance', style: 'hatha', icon: '🌳', color: '#4ECDC4', difficulty: 'beginner', duration: '30-60 sec', sanskrit: 'वृक्षासन', benefits: ['Improves balance', 'Strengthens legs', 'Opens hips'], contraindications: ['Ankle injuries'], chakras: ['root', 'heart'] },
  { id: 3, name: 'Adho Mukha Svanasana', english: 'Downward Dog', category: 'standing', style: 'vinyasa', icon: '🐕', color: '#45B7D1', difficulty: 'beginner', duration: '1-3 min', sanskrit: 'अधोमुख श्वानासन', benefits: ['Strengthens arms', 'Stretches hamstrings', 'Energizes body'], contraindications: ['Carpal tunnel', 'High blood pressure'], chakras: ['heart', 'throat'] },
  { id: 4, name: 'Virabhadrasana II', english: 'Warrior II', category: 'standing', style: 'hatha', icon: '⚔', color: '#96CEB4', difficulty: 'beginner', duration: '30-60 sec', sanskrit: 'वीरभद्रासन II', benefits: ['Builds stamina', 'Strengthens legs', 'Opens hips'], contraindications: ['Neck problems'], chakras: ['root', 'sacral'] },
  { id: 5, name: 'Uttanasana', english: 'Forward Fold', category: 'forward-fold', style: 'hatha', icon: '🙇', color: '#FFEAA7', difficulty: 'beginner', duration: '30-60 sec', sanskrit: 'उत्तानासन', benefits: ['Calms brain', 'Stretches hamstrings', 'Relieves stress'], contraindications: ['Back injuries', 'Hamstring tears'], chakras: ['third-eye', 'crown'] },
  { id: 6, name: 'Bhujangasana', english: 'Cobra Pose', category: 'backbend', style: 'hatha', icon: '🐍', color: '#DDA0DD', difficulty: 'beginner', duration: '15-30 sec', sanskrit: 'भुजंगासन', benefits: ['Opens chest', 'Strengthens spine', 'Improves mood'], contraindications: ['Pregnancy', 'Hernia'], chakras: ['heart', 'solar'] },
  { id: 7, name: 'Trikonasana', english: 'Triangle Pose', category: 'standing', style: 'hatha', icon: '🔺', color: '#98D8C8', difficulty: 'beginner', duration: '30-60 sec', sanskrit: 'त्रिकोणासन', benefits: ['Stretches sides', 'Improves digestion', 'Builds core'], contraindications: ['Low blood pressure'], chakras: ['sacral', 'solar'] },
  { id: 8, name: 'Navasana', english: 'Boat Pose', category: 'balance', style: 'ashtanga', icon: '⛵', color: '#F7DC6F', difficulty: 'intermediate', duration: '30-60 sec', sanskrit: 'नवासन', benefits: ['Strengthens core', 'Improves balance', 'Stimulates kidneys'], contraindications: ['Pregnancy', 'Insomnia'], chakras: ['solar', 'root'] },
  { id: 9, name: 'Ardha Matsyendrasana', english: 'Half Lord of Fishes', category: 'twist', style: 'hatha', icon: '🌀', color: '#FF6B6B', difficulty: 'intermediate', duration: '30-60 sec', sanskrit: 'अर्ध मत्स्येन्द्रासन', benefits: ['Improves digestion', 'Spinal flexibility', 'Opens shoulders'], contraindications: ['Peptic ulcers', 'Hernia'], chakras: ['sacral', 'solar'] },
  { id: 10, name: 'Sirsasana', english: 'Headstand', category: 'inversion', style: 'ashtanga', icon: '🤸', color: '#4ECDC4', difficulty: 'advanced', duration: '1-5 min', sanskrit: 'शीर्षासन', benefits: ['Calms brain', 'Strengthens core', 'Improves focus'], contraindications: ['Neck injuries', 'High blood pressure', 'Glaucoma'], chakras: ['crown', 'third-eye'] },
  { id: 11, name: 'Savasana', english: 'Corpse Pose', category: 'restorative', style: 'hatha', icon: '😴', color: '#96CEB4', difficulty: 'beginner', duration: '5-15 min', sanskrit: 'शवासन', benefits: ['Deep relaxation', 'Reduces stress', 'Calms mind'], contraindications: ['Back injuries (use support)'], chakras: ['crown'] },
  { id: 12, name: 'Chaturanga Dandasana', english: 'Four-Limbed Staff', category: 'balance', style: 'vinyasa', icon: '💪', color: '#45B7D1', difficulty: 'intermediate', duration: '15-30 sec', sanskrit: 'चतुरंग दंडासन', benefits: ['Strengthens arms', 'Builds core', 'Tones wrists'], contraindications: ['Shoulder injuries', 'Carpal tunnel'], chakras: ['solar', 'heart'] },
  { id: 13, name: 'Setu Bandhasana', english: 'Bridge Pose', category: 'backbend', style: 'hatha', icon: '🌉', color: '#DDA0DD', difficulty: 'beginner', duration: '30-60 sec', sanskrit: 'सेतु बंधासन', benefits: ['Opens chest', 'Stretches neck', 'Calms brain'], contraindications: ['Neck injuries'], chakras: ['heart', 'throat'] },
  { id: 14, name: 'Paschimottanasana', english: 'Seated Forward Bend', category: 'forward-fold', style: 'hatha', icon: '🧘', color: '#FFEAA7', difficulty: 'beginner', duration: '1-3 min', sanskrit: 'पश्चिमोत्तानासन', benefits: ['Calms mind', 'Stretches spine', 'Improves digestion'], contraindications: ['Disc herniation', 'Hamstring injuries'], chakras: ['solar', 'third-eye'] },
  { id: 15, name: 'Mayurasana', english: 'Peacock Pose', category: 'balance', style: 'ashtanga', icon: '🦚', color: '#98D8C8', difficulty: 'advanced', duration: '15-30 sec', sanskrit: 'मयूरासन', benefits: ['Strengthens wrists', 'Improves digestion', 'Builds focus'], contraindications: ['Wrist injuries', 'Pregnancy'], chakras: ['solar', 'root'] }
];

export const yogaSessions = [
  { id: 1, name: 'Morning Energizer', style: 'vinyasa', duration: 30, difficulty: 'beginner', asanas: [3, 4, 7, 6, 11], description: 'Start your day with this energizing flow', icon: '🌅', color: '#FFB347' },
  { id: 2, name: 'Power Hour', style: 'ashtanga', duration: 60, difficulty: 'advanced', asanas: [1, 3, 4, 8, 10, 12, 11], description: 'Intense full-body workout', icon: '🔥', color: '#FF6B6B' },
  { id: 3, name: 'Stress Relief', style: 'restorative', duration: 45, difficulty: 'beginner', asanas: [5, 11, 13, 14, 9], description: 'Gentle poses for deep relaxation', icon: '😌', color: '#4ECDC4' },
  { id: 4, name: 'Core Strengthener', style: 'power', duration: 35, difficulty: 'intermediate', asanas: [8, 12, 3, 7, 2], description: 'Build a strong center', icon: '💪', color: '#45B7D1' },
  { id: 5, name: 'Evening Wind Down', style: 'yin', duration: 40, difficulty: 'beginner', asanas: [5, 14, 9, 11, 13], description: 'Gentle stretches before bed', icon: '🌙', color: '#DDA0DD' }
];

export const yogaStats = {
  totalAsanas: asanas.length,
  byCategory: ASANA_CATEGORIES.map(cat => ({
    ...cat,
    count: asanas.filter(a => a.category === cat.id).length
  })),
  byStyle: YOGA_STYLES.map(style => ({
    ...style,
    count: asanas.filter(a => a.style === style.id).length
  })),
  byDifficulty: [
    { level: 'beginner', count: asanas.filter(a => a.difficulty === 'beginner').length, color: '#34d399' },
    { level: 'intermediate', count: asanas.filter(a => a.difficulty === 'intermediate').length, color: '#fbbf24' },
    { level: 'advanced', count: asanas.filter(a => a.difficulty === 'advanced').length, color: '#f87171' }
  ],
  totalSessions: yogaSessions.length,
  totalPranayama: PRANAYAMA_TECHNIQUES.length,
  totalMeditations: MEDITATION_TYPES.length,
  totalChakras: CHAKRAS.length
};

export const getAsanaById = (id) => asanas.find(a => a.id === id);

export const getAsanasByCategory = (category) => asanas.filter(a => a.category === category);

export const getAsanasByStyle = (style) => asanas.filter(a => a.style === style);

export const getAsanasByDifficulty = (difficulty) => asanas.filter(a => a.difficulty === difficulty);

export const searchAsanas = (query) => {
  const q = query.toLowerCase();
  return asanas.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.english.toLowerCase().includes(q) ||
    a.benefits.some(b => b.toLowerCase().includes(q))
  );
};

export const getSessionById = (id) => yogaSessions.find(s => s.id === id);

export const getChakraById = (id) => CHAKRAS.find(c => c.id === id);

export default {
  asanas,
  yogaSessions,
  yogaStats,
  getAsanaById,
  getAsanasByCategory,
  getAsanasByStyle,
  getAsanasByDifficulty,
  searchAsanas,
  getSessionById,
  getChakraById
};