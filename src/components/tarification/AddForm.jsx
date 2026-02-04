import React from 'react';
import { X, Star, Award } from 'lucide-react';

const AddForm = ({ darkMode, newItem, onNewItemChange, onCancel, onAdd }) => {
  return (
    <div className={`rounded-2xl p-6 mb-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Ajouter un nouveau service
        </h3>
        <button
          onClick={onCancel}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Nom du service
          </label>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={onNewItemChange}
            className={`w-full px-4 py-3 rounded-xl border ${darkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
            }`}
            placeholder="Nom du service"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Prix (DT)
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            min="0"
            value={newItem.price}
            onChange={onNewItemChange}
            className={`w-full px-4 py-3 rounded-xl border ${darkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
            }`}
            placeholder="0.00"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Catégorie
          </label>
          <select
            name="category"
            value={newItem.category}
            onChange={onNewItemChange}
            className={`w-full px-4 py-3 rounded-xl border ${darkMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="impression">Impression</option>
            <option value="reliure">Reliure</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="popular"
            name="popular"
            checked={newItem.popular}
            onChange={onNewItemChange}
            className={`w-4 h-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <label htmlFor="popular" className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            Marquer comme populaire
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={newItem.featured}
            onChange={onNewItemChange}
            className={`w-4 h-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <label htmlFor="featured" className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Award className="w-4 h-4 mr-2 text-purple-500" />
            Marquer comme premium
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onCancel}
          className={`px-6 py-3 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          Annuler
        </button>
        <button
          onClick={onAdd}
          className="px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300"
        >
          Ajouter le service
        </button>
      </div>
    </div>
  );
};

export default AddForm;