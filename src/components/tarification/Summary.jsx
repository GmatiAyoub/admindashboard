import React from 'react';

const Summary = ({ darkMode, filteredPrices, prices }) => {
  const averagePrice = filteredPrices.length > 0 
    ? (filteredPrices.reduce((sum, item) => sum + item.price, 0) / filteredPrices.length).toFixed(2)
    : '0.00';

  return (
    <div className={`mt-8 p-6 rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Résumé des tarifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Services affichés</p>
          <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {filteredPrices.length} / {prices.length}
          </p>
        </div>
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valeur totale</p>
          <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {filteredPrices.reduce((sum, item) => sum + item.price, 0).toFixed(2)} DT
          </p>
        </div>
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Prix moyen</p>
          <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {averagePrice} DT
          </p>
        </div>
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dernière mise à jour</p>
          <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Aujourd'hui
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;