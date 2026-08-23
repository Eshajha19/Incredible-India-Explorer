// Art Types - Data models and constants for Indian Art & Craft Gallery
export const ART_FORMS = [
  { id: 'madhubani', name: 'Madhubani', origin: 'Bihar', icon: '🎨', color: '#FF6B6B', description: 'Ancient Mithila painting tradition' },
  { id: 'warli', name: 'Warli', origin: 'Maharashtra', icon: '🏚', color: '#4ECDC4', description: 'Tribal art with geometric patterns' },
  { id: 'kalamkari', name: 'Kalamkari', origin: 'Andhra Pradesh', icon: '✍️', color: '#45B7D1', description: 'Hand-painted or block-printed cotton' },
  { id: 'pattachitra', name: 'Pattachitra', origin: 'Odisha', icon: '🖼', color: '#96CEB4', description: 'Cloth-based scroll painting' },
  { id: 'phad', name: 'Phad', origin: 'Rajasthan', icon: '📜', color: '#FFEAA7', description: 'Religious scroll painting' },
  { id: 'kathputli', name: 'Kathputli', origin: 'Rajasthan', icon: '🎭', color: '#DDA0DD', description: 'Traditional puppet art' },
  { id: 'tanjore', name: 'Tanjore', origin: 'Tamil Nadu', icon: '✨', color: '#F7DC6F', description: 'Gold leaf Classical painting' },
  { id: 'pichwai', name: 'Pichwai', origin: 'Rajasthan', icon: '🙏', color: '#FF6B6B', description: 'Narrative cloth paintings of Krishna' },
  { id: 'gond', name: 'Gond', origin: 'Madhya Pradesh', icon: '🦌', color: '#4ECDC4', description: 'Tribal art depicting nature' },
  { id: 'kolam', name: 'Kolam', origin: 'Tamil Nadu', icon: '⭕', color: '#45B7D1', description: 'Geometric line drawings' },
  { id: 'rangoli', name: 'Rangoli', origin: 'Pan-India', icon: '🌈', color: '#96CEB4', description: 'Colorful floor art patterns' },
  { id: 'mehndi', name: 'Mehndi', origin: 'Pan-India', icon: '✋', color: '#FFEAA7', description: 'Henna body art tradition' }
];

export const ART_MEDIUMS = [
  { id: 'painting', name: 'Painting', icon: '🎨', color: '#FF6B6B' },
  { id: 'sculpture', name: 'Sculpture', icon: '🗿', color: '#4ECDC4' },
  { id: 'textile', name: 'Textile', icon: '🧵', color: '#45B7D1' },
  { id: 'pottery', name: 'Pottery', icon: '🏺', color: '#96CEB4' },
  { id: 'woodwork', name: 'Woodwork', icon: '🪵', color: '#FFEAA7' },
  { id: 'metalwork', name: 'Metalwork', icon: '⚒', color: '#DDA0DD' },
  { id: 'jewelry', name: 'Jewelry', icon: '💍', color: '#F7DC6F' },
  { id: 'embroidery', name: 'Embroidery', icon: '🪡', color: '#FF6B6B' }
];

export const REGIONS = [
  { id: 'north', name: 'North India', icon: '🏔' },
  { id: 'south', name: 'South India', icon: '🌴' },
  { id: 'east', name: 'East India', icon: '🌿' },
  { id: 'west', name: 'West India', icon: '🏖' },
  { id: 'central', name: 'Central India', icon: '🏛' },
  { id: 'northeast', name: 'Northeast India', icon: '🌺' }
];

export const SKILL_LEVELS = [
  { id: 'beginner', name: 'Beginner', color: '#34d399', description: 'Just starting to learn' },
  { id: 'intermediate', name: 'Intermediate', color: '#fbbf24', description: 'Familiar with basics' },
  { id: 'advanced', name: 'Advanced', color: '#f87171', description: 'Skilled practitioner' },
  { id: 'master', name: 'Master', color: '#a78bfa', description: 'Expert level artisan' }
];

export const FORMATTERS = {
  formatPrice: (price) => `₹${price.toLocaleString('en-IN')}`,
  formatDuration: (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  },
  getRegionEmoji: (regionId) => {
    const region = REGIONS.find(r => r.id === regionId);
    return region?.icon || '📍';
  }
};

export default {
  ART_FORMS,
  ART_MEDIUMS,
  REGIONS,
  SKILL_LEVELS,
  FORMATTERS
};