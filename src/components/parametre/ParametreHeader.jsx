import React from 'react';
import { Settings, CheckCircle } from 'lucide-react';

const ParametreHeader = ({ darkMode, saved }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-linear-to-r from-purple-600 to-purple-800 rounded-xl">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Paramètres
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Gérez les paramètres de votre système
            </p>
          </div>
        </div>
      </div>

      {saved && (
        <div className={`mb-6 p-4 rounded-xl flex items-center ${darkMode ? 'bg-green-900/30 border border-green-800/50' : 'bg-green-50 border border-green-200'}`}>
          <CheckCircle className={`w-5 h-5 mr-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
            Paramètres sauvegardés avec succès!
          </span>
        </div>
      )}
    </div>
  );
};

export default ParametreHeader;