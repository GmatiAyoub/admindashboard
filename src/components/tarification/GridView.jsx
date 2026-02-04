import React from 'react';
import { Edit2, Save, X, DollarSign, Trash2, Tag, Star, Award } from 'lucide-react';
import { getCategoryColor, getCategoryBgColor, getCategoryTextColor } from '../tarification/helpers';

const GridView = ({
  darkMode,
  filteredPrices,
  editingId,
  editPrice,
  isSaving,
  onEditPriceChange,
  onSavePrice,
  onCancelEditing,
  onStartEditing,
  onDeleteService
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredPrices.map((item) => (
        <div
          key={item.id}
          className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${darkMode 
            ? 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50' 
            : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg'
          }`}
        >
          {/* Bandeau supérieur */}
          <div className={`h-2 bg-linear-to-r ${getCategoryColor(item.category, darkMode)}`}></div>
          
          <div className="p-5">
            {/* En-tête de la carte */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryBgColor(item.category, darkMode)} ${getCategoryTextColor(item.category, darkMode)}`}>
                    {item.category === 'impression' ? 'Impression' : 'Reliure'}
                  </span>
                  {item.popular && (
                    <span className="text-xs font-semibold px-3 py-1 bg-linear-to-r from-yellow-500 to-yellow-600 text-white rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </span>
                  )}
                  {item.featured && (
                    <span className="text-xs font-semibold px-3 py-1 bg-linear-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center">
                      <Award className="w-3 h-3 mr-1" />
                      Premium
                    </span>
                  )}
                </div>
                <h3 className={`font-bold text-lg mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </h3>
              </div>
              <button 
                onClick={() => onDeleteService(item.id)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                title="Supprimer le service"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Prix */}
            {editingId === item.id ? (
              <div className="space-y-3">
                <div className="relative">
                  <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editPrice}
                    onChange={(e) => onEditPriceChange(e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 rounded-xl border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
                    }`}
                    placeholder="0.00"
                    autoFocus
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onSavePrice(item.id)}
                    disabled={isSaving}
                    className="flex-1 px-3 py-2 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 transition-all duration-300 flex items-center justify-center"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Sauvegarder
                      </>
                    )}
                  </button>
                  <button
                    onClick={onCancelEditing}
                    className={`px-3 py-2 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.price.toFixed(2)} <span className="text-lg">{item.unit}</span>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      par unité
                    </div>
                  </div>
                  <button
                    onClick={() => onStartEditing(item.id, item.price)}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                    title="Modifier le prix"
                  >
                    <Edit2 size={20} />
                  </button>
                </div>
                <div className={`text-xs text-center pt-2 border-t ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                  Cliquez sur l'icône <Edit2 className="w-3 h-3 inline mx-1" /> pour éditer
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;