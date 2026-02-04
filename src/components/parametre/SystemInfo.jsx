import React from 'react';
import { Info } from 'lucide-react';

const SystemInfo = ({ darkMode }) => {
  return (
    <div className={`mt-8 p-6 rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <Info className="w-5 h-5 mr-2" />
        Informations système
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Version</p>
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>2.1.0</p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dernière sauvegarde</p>
          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {new Date().toLocaleDateString('fr-FR')} à {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
          </p>
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Statut</p>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              Tous les services opérationnels
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;