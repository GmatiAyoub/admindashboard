import React from 'react';
import { Search, Plus } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, darkMode, onNewOrder }) => {
  return (
    <div className={`rounded-2xl p-6 mb-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className={`px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="tous">Tous les statuts</option>
            <option value="En Cours">En Cours</option>
            <option value="Terminée">Terminée</option>
            <option value="En Attente">En Attente</option>
          </select>
        </div>

        <button 
          onClick={onNewOrder}
          className="px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center whitespace-nowrap"
        >
          <Plus size={20} className="mr-2" />
          Nouvelle Commande
        </button>
      </div>
    </div>
  );
};

export default SearchBar;