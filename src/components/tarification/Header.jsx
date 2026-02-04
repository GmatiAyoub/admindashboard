import React from 'react';
import { Tag, Plus } from 'lucide-react';

const Header = ({ darkMode, onNewServiceClick }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-linear-to-r from-purple-600 to-purple-800 rounded-xl">
            <Tag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Tarifications
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Gérez vos prix et services
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onNewServiceClick}
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;