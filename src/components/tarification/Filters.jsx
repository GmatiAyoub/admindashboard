import React from 'react';
import { Filter, Grid, List, Search } from 'lucide-react';

const Filters = ({ 
  darkMode, 
  categories, 
  prices, 
  selectedCategory, 
  searchTerm, 
  viewMode,
  onCategoryChange,
  onSearchChange,
  onViewModeChange
}) => {
  
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return prices.length;
    return prices.filter(p => p.category === categoryId).length;
  };

  return (
    <div className={`rounded-2xl p-4 mb-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
            <input
              type="text"
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
              }`}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={`px-4 py-3 rounded-xl border ${darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({getCategoryCount(cat.id)})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' 
              ? 'bg-linear-to-r from-purple-600 to-purple-800 text-white' 
              : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' 
              ? 'bg-linear-to-r from-purple-600 to-purple-800 text-white' 
              : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;