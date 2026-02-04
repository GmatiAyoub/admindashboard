import React from 'react';

const Footer = ({ darkMode, filteredPrices, viewMode }) => {
  return (
    <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Kernel Solutions - Tarifications
          </p>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Données mises à jour en temps réel
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
            {filteredPrices.length} services affichés
          </span>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Vue: <span className="font-medium">{viewMode === 'grid' ? 'Grille' : 'Liste'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;