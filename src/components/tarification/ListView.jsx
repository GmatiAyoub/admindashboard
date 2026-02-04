import React from 'react';
import { Edit2, Save, X, DollarSign, Trash2, Tag, Star, Award, Package, MoreVertical } from 'lucide-react';
import { getCategoryBgColor, getCategoryTextColor } from '../tarification/helpers';

const ListView = ({
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
    <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Package className="w-4 h-4 mr-2" />
                  Service
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredPrices.map((item) => (
              <tr key={item.id} className={`transition-colors ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryBgColor(item.category, darkMode)}`}>
                      <Tag className={`w-5 h-5 ${getCategoryTextColor(item.category, darkMode)}`} />
                    </div>
                    <div className="ml-4">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <DollarSign className={`w-3 h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                          {item.unit} / unité
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBgColor(item.category, darkMode)} ${getCategoryTextColor(item.category, darkMode)}`}>
                    {item.category === 'impression' ? 'Impression' : 'Reliure'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {editingId === item.id ? (
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editPrice}
                          onChange={(e) => onEditPriceChange(e.target.value)}
                          className={`w-32 px-3 py-2 rounded-lg border ${darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          autoFocus
                        />
                      </div>
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{item.unit}</span>
                    </div>
                  ) : (
                    <div>
                      <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.price.toFixed(2)} <span className="text-sm">{item.unit}</span>
                      </p>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
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
                </td>
                <td className="px-6 py-4">
                  {editingId === item.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onSavePrice(item.id)}
                        disabled={isSaving}
                        className="px-3 py-2 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg disabled:opacity-50 flex items-center"
                      >
                        {isSaving ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Save size={14} className="mr-1" />
                            Sauvegarder
                          </>
                        )}
                      </button>
                      <button
                        onClick={onCancelEditing}
                        className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onStartEditing(item.id, item.price)}
                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="Modifier"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteService(item.id)}
                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;