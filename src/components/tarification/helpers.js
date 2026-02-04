export const initialPrices = [
  { id: 1, name: 'Noir & Blanc Simple', price: 0.10, unit: 'DT', category: 'impression', popular: true, featured: false },
  { id: 2, name: 'Couleur Simple', price: 0.50, unit: 'DT', category: 'impression', popular: true, featured: false },
  { id: 3, name: 'Noir & Blanc Recto-verso', price: 0.15, unit: 'DT', category: 'impression', popular: false, featured: false },
  { id: 4, name: 'Couleur Recto-verso', price: 1.00, unit: 'DT', category: 'impression', popular: false, featured: true },
  { id: 5, name: 'Impression Premium', price: 0.20, unit: 'DT', category: 'impression', popular: false, featured: true },
  { id: 6, name: 'Reliure Simple', price: 2.00, unit: 'DT', category: 'reliure', popular: true, featured: false },
  { id: 7, name: 'Reliure Spirale', price: 3.00, unit: 'DT', category: 'reliure', popular: false, featured: true },
  { id: 8, name: 'Impression Grand Format', price: 5.00, unit: 'DT', category: 'impression', popular: false, featured: false },
  { id: 9, name: 'Reliure Cartonnée', price: 4.50, unit: 'DT', category: 'reliure', popular: false, featured: false },
  { id: 10, name: 'Scan Haute Définition', price: 0.30, unit: 'DT', category: 'impression', popular: false, featured: false },
];

export const categories = [
  { id: 'all', name: 'Toutes', color: 'bg-linear-to-r from-purple-500 to-purple-600' },
  { id: 'impression', name: 'Impression', color: 'bg-linear-to-r from-blue-500 to-blue-600' },
  { id: 'reliure', name: 'Reliure', color: 'bg-linear-to-r from-pink-500 to-pink-600' },
];

export const getCategoryColor = (category, darkMode) => {
  return category === 'impression' 
    ? darkMode ? 'from-blue-500 to-blue-600' : 'from-blue-400 to-blue-500'
    : darkMode ? 'from-pink-500 to-pink-600' : 'from-pink-400 to-pink-500';
};

export const getCategoryBgColor = (category, darkMode) => {
  return category === 'impression' 
    ? darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
    : darkMode ? 'bg-pink-900/30' : 'bg-pink-50';
};

export const getCategoryTextColor = (category, darkMode) => {
  return category === 'impression' 
    ? darkMode ? 'text-blue-400' : 'text-blue-600'
    : darkMode ? 'text-pink-400' : 'text-pink-600';
};