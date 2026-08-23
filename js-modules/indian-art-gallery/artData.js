// Art Data - Mock data generator for Indian Art & Craft Gallery
import { ART_FORMS, ART_MEDIUMS, REGIONS, SKILL_LEVELS } from './artTypes.js';

export const artworks = [
  {
    id: 1,
    name: 'Tree of Life Madhubani',
    artForm: 'madhubani',
    medium: 'painting',
    region: 'east',
    state: 'Bihar',
    artist: 'Sita Devi',
    price: 12500,
    description: 'Traditional Madhubani painting depicting the Tree of Life motif with intricate borders and natural pigments.',
    materials: ['Natural pigments', 'Cow dung', 'Plant extracts', 'Bamboo pen'],
    dimensions: '24" x 36"',
    technique: 'Hand-painted using traditional nib pen',
    history: 'Madhubani art originated in the Mithila region of Bihar, dating back to the Ramayana era.',
    images: ['🌳', '🎨'],
    color: '#FF6B6B',
    rating: 4.8,
    difficulty: 'advanced'
  },
  {
    id: 2,
    name: 'Warli Tribal Dance',
    artForm: 'warli',
    medium: 'painting',
    region: 'west',
    state: 'Maharashtra',
    artist: 'Jivya Soma Mashe',
    price: 8500,
    description: 'Classic Warli painting showing tribal dance patterns with geometric figures in white on brown background.',
    materials: ['White rice paste', 'Cow dung', 'Bamboo stick'],
    dimensions: '18" x 24"',
    technique: 'Applied with bamboo stick on cow dung coated wall',
    history: 'Warli art dates back to 2500 BCE, using basic geometric shapes to depict daily life.',
    images: ['💃', '🏚'],
    color: '#4ECDC4',
    rating: 4.6,
    difficulty: 'intermediate'
  },
  {
    id: 3,
    name: 'Krishna Kalamkari Saree',
    artForm: 'kalamkari',
    medium: 'textile',
    region: 'south',
    state: 'Andhra Pradesh',
    artist: 'Gurappa Chetty',
    price: 25000,
    description: 'Hand-painted Kalamkari saree depicting Krishna Leela with natural vegetable dyes.',
    materials: ['Cotton', 'Natural dyes', 'Iron pen', 'Mordants'],
    dimensions: '6.3m x 1.2m',
    technique: 'Hand-painted using natural dyes with iron pen (kalam)',
    history: 'Kalamkari has 23 steps of dyeing and printing, taking 20-25 days for one piece.',
    images: ['🧣', '🪷'],
    color: '#45B7D1',
    rating: 4.9,
    difficulty: 'master'
  },
  {
    id: 4,
    name: 'Jagannath Pattachitra',
    artForm: 'pattachitra',
    medium: 'painting',
    region: 'east',
    state: 'Odisha',
    artist: 'Raghunath Mohapatra',
    price: 15000,
    description: 'Traditional Pattachitra depicting Lord Jagannath with vibrant colors on treated cloth.',
    materials: ['Treated cotton cloth', 'Natural colors', 'Stone powder', 'Gum'],
    dimensions: '30" x 40"',
    technique: 'Painted on specially prepared tussah silk or cotton',
    history: 'Pattachitra is one of the oldest art forms of Odisha, closely linked to Jagannath temple traditions.',
    images: ['🙏', '🖼'],
    color: '#96CEB4',
    rating: 4.7,
    difficulty: 'advanced'
  },
  {
    id: 5,
    name: 'Pabuji Ki Phad',
    artForm: 'phad',
    medium: 'textile',
    region: 'west',
    state: 'Rajasthan',
    artist: 'Shree Lal Chhipa',
    price: 18000,
    description: 'Narrative Phad scroll depicting the heroic tale of Pabuji, used by Bhopa singers.',
    materials: ['Hand-spun cotton', 'Natural colors', 'Stone colors'],
    dimensions: '15ft x 5ft',
    technique: 'Painted with squirrel hair brushes on primed cotton',
    history: 'Phad paintings are 700-year-old narrative scrolls used as portable temples by Bhopa priests.',
    images: ['📜', '⚔️'],
    color: '#FFEAA7',
    rating: 4.5,
    difficulty: 'master'
  },
  {
    id: 6,
    name: 'Rajasthani Kathputli Set',
    artForm: 'kathputli',
    medium: 'sculpture',
    region: 'west',
    state: 'Rajasthan',
    artist: 'Bhopa Community',
    price: 5500,
    description: 'Traditional string puppet set depicting royal characters with colorful costumes.',
    materials: ['Wood', 'Cotton cloth', 'Rabbit hair', 'String'],
    dimensions: '12" each',
    technique: 'Carved from single piece of wood, dressed in traditional attire',
    history: 'Kathputli tradition is over 1000 years old, performed by Bhat community.',
    images: ['🎭', '👑'],
    color: '#DDA0DD',
    rating: 4.4,
    difficulty: 'intermediate'
  },
  {
    id: 7,
    name: 'Tanjore Ganesha Panel',
    artForm: 'tanjore',
    medium: 'painting',
    region: 'south',
    state: 'Tamil Nadu',
    artist: 'Rajamanickkam',
    price: 35000,
    description: 'Classic Tanjore painting of Lord Ganesha with 22-karat gold leaf work and semi-precious stones.',
    materials: ['Jackwood panel', 'Gold leaf', 'Semi-precious stones', 'Natural colors'],
    dimensions: '18" x 24"',
    technique: 'Gold leaf embossing with detailed stone setting',
    history: 'Tanjore painting originated in the 16th century under Nayak rulers.',
    images: ['✨', '🐘'],
    color: '#F7DC6F',
    rating: 5.0,
    difficulty: 'master'
  },
  {
    id: 8,
    name: 'Srinathji Pichwai',
    artForm: 'pichwai',
    medium: 'textile',
    region: 'west',
    state: 'Rajasthan',
    artist: 'Nand Kishor Sharma',
    price: 22000,
    description: 'Elaborate Pichwai painting depicting Srinathji with cows and lotus motifs.',
    materials: ['Handwoven cotton', 'Natural colors', 'Gold outline'],
    dimensions: '8ft x 6ft',
    technique: 'Hand-painted narrative cloth for temple backdrop',
    history: 'Pichwai paintings are hung behind the idol of Srinathji in Nathdwara temples.',
    images: ['🙏', '🪷'],
    color: '#FF6B6B',
    rating: 4.8,
    difficulty: 'master'
  },
  {
    id: 9,
    name: 'Gond Forest Scene',
    artForm: 'gond',
    medium: 'painting',
    region: 'central',
    state: 'Madhya Pradesh',
    artist: 'Jangarh Singh Shyam',
    price: 14000,
    description: 'Vibrant Gond painting depicting a forest scene with animals and intricate dot patterns.',
    materials: ['Canvas', 'Acrylic colors', 'Fine brushes'],
    dimensions: '24" x 30"',
    technique: 'Using dots and dashes to fill forms, creating sense of movement',
    history: 'Gond art was brought to mainstream by Jangarh Singh Shyam in 1980s.',
    images: ['🦌', '🌿'],
    color: '#4ECDC4',
    rating: 4.7,
    difficulty: 'intermediate'
  },
  {
    id: 10,
    name: 'Tamil Kolam Design',
    artForm: 'kolam',
    medium: 'painting',
    region: 'south',
    state: 'Tamil Nadu',
    artist: 'Lakshmi Ammal',
    price: 3500,
    description: 'Intricate Kolam design with geometric patterns drawn with rice flour.',
    materials: ['Rice flour', 'White stone powder'],
    dimensions: '4ft x 4ft',
    technique: 'Geometric line drawings with rice flour',
    history: 'Kolam is drawn daily at dawn as a prayer and to welcome prosperity.',
    images: ['⭕', '✨'],
    color: '#45B7D1',
    rating: 4.3,
    difficulty: 'beginner'
  },
  {
    id: 11,
    name: 'Festival Rangoli Set',
    artForm: 'rangoli',
    medium: 'painting',
    region: 'west',
    state: 'Maharashtra',
    artist: 'Anita Devi',
    price: 2800,
    description: 'Colorful Rangoli powder set with traditional patterns for Diwali and festivals.',
    materials: ['Colored powder', 'Marble dust', 'Natural colors'],
    dimensions: '3ft x 3ft patterns',
    technique: 'Freehand drawing using colored powders',
    history: 'Rangoli is an ancient art form believed to bring good luck.',
    images: ['🌈', '✨'],
    color: '#96CEB4',
    rating: 4.2,
    difficulty: 'beginner'
  },
  {
    id: 12,
    name: 'Bridal Mehndi Design',
    artForm: 'mehndi',
    medium: 'painting',
    region: 'north',
    state: 'Rajasthan',
    artist: 'Parveen Khan',
    price: 4500,
    description: 'Intricate bridal mehndi design with peacock and paisley motifs.',
    materials: ['Natural henna', 'Lemon juice', 'Essential oils'],
    dimensions: 'Full hand & feet design',
    technique: 'Applied using cone with fine tip',
    history: 'Mehndi tradition dates back to 5000 years, symbolizing joy and beauty.',
    images: ['✋', '🦚'],
    color: '#FFEAA7',
    rating: 4.6,
    difficulty: 'advanced'
  }
];

export const artisans = [
  { id: 1, name: 'Sita Devi', speciality: 'madhubani', region: 'east', state: 'Bihar', awards: ['Padma Shri', 'National Award'], experience: 40, rating: 4.9 },
  { id: 2, name: 'Jivya Soma Mashe', speciality: 'warli', region: 'west', state: 'Maharashtra', awards: ['Padma Shri'], experience: 50, rating: 4.8 },
  { id: 3, name: 'Gurappa Chetty', speciality: 'kalamkari', region: 'south', state: 'Andhra Pradesh', awards: ['National Award'], experience: 35, rating: 4.7 },
  { id: 4, name: 'Raghunath Mohapatra', speciality: 'pattachitra', region: 'east', state: 'Odisha', awards: ['Padma Vibhushan'], experience: 45, rating: 5.0 },
  { id: 5, name: 'Shree Lal Chhipa', speciality: 'phad', region: 'west', state: 'Rajasthan', awards: ['Padma Shri'], experience: 30, rating: 4.6 },
  { id: 6, name: 'Rajamanickkam', speciality: 'tanjore', region: 'south', state: 'Tamil Nadu', awards: ['National Award'], experience: 25, rating: 4.9 },
  { id: 7, name: 'Nand Kishor Sharma', speciality: 'pichwai', region: 'west', state: 'Rajasthan', awards: ['Padma Shri'], experience: 35, rating: 4.8 },
  { id: 8, name: 'Jangarh Singh Shyam', speciality: 'gond', region: 'central', state: 'Madhya Pradesh', awards: ['National Award'], experience: 20, rating: 4.7 }
];

export const workshops = [
  { id: 1, title: 'Madhubani Painting Basics', artForm: 'madhubani', duration: 180, level: 'beginner', price: 1500, maxParticipants: 15, instructor: 'Sita Devi' },
  { id: 2, title: 'Warli Art Workshop', artForm: 'warli', duration: 120, level: 'beginner', price: 1000, maxParticipants: 20, instructor: 'Jivya Soma Mashe' },
  { id: 3, title: 'Advanced Kalamkari', artForm: 'kalamkari', duration: 360, level: 'advanced', price: 5000, maxParticipants: 8, instructor: 'Gurappa Chetty' },
  { id: 4, title: 'Tanjore Painting Masterclass', artForm: 'tanjore', duration: 480, level: 'advanced', price: 8000, maxParticipants: 6, instructor: 'Rajamanickkam' },
  { id: 5, title: 'Mehndi Design Course', artForm: 'mehndi', duration: 150, level: 'beginner', price: 800, maxParticipants: 25, instructor: 'Parveen Khan' },
  { id: 6, title: 'Gond Art for Beginners', artForm: 'gond', duration: 120, level: 'beginner', price: 1200, maxParticipants: 18, instructor: 'Jangarh Singh Shyam' }
];

export const artStats = {
  totalArtworks: artworks.length,
  byArtForm: ART_FORMS.map(form => ({
    ...form,
    count: artworks.filter(a => a.artForm === form.id).length
  })),
  byMedium: ART_MEDIUMS.map(medium => ({
    ...medium,
    count: artworks.filter(a => a.medium === medium.id).length
  })),
  byRegion: REGIONS.map(region => ({
    ...region,
    count: artworks.filter(a => a.region === region.id).length
  })),
  totalArtisans: artisans.length,
  totalWorkshops: workshops.length,
  avgPrice: Math.round(artworks.reduce((sum, a) => sum + a.price, 0) / artworks.length),
  avgRating: (artworks.reduce((sum, a) => sum + a.rating, 0) / artworks.length).toFixed(1),
  priceRange: {
    min: Math.min(...artworks.map(a => a.price)),
    max: Math.max(...artworks.map(a => a.price))
  }
};

export const getArtworkById = (id) => artworks.find(a => a.id === id);

export const getArtworksByForm = (formId) => artworks.filter(a => a.artForm === formId);

export const getArtworksByMedium = (mediumId) => artworks.filter(a => a.medium === mediumId);

export const getArtworksByRegion = (regionId) => artworks.filter(a => a.region === regionId);

export const getArtworksByPriceRange = (min, max) => artworks.filter(a => a.price >= min && a.price <= max);

export const searchArtworks = (query) => {
  const q = query.toLowerCase();
  return artworks.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.artist.toLowerCase().includes(q) ||
    a.state.toLowerCase().includes(q) ||
    a.description.toLowerCase().includes(q)
  );
};

export default {
  artworks,
  artisans,
  workshops,
  artStats,
  getArtworkById,
  getArtworksByForm,
  getArtworksByMedium,
  getArtworksByRegion,
  getArtworksByPriceRange,
  searchArtworks
};