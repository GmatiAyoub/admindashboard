import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage, 
  filteredOrders,
  ordersPerPage,
  indexOfFirstOrder,
  indexOfLastOrder,
  darkMode 
}) => {
  if (filteredOrders.length <= ordersPerPage) return null;

  return (
    <div className={`px-6 py-4 border-t flex items-center justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Affichage de {indexOfFirstOrder + 1} à {Math.min(indexOfLastOrder, filteredOrders.length)} sur {filteredOrders.length} commandes
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg ${currentPage === 1 ? darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400' : darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700'}`}
        >
          <ChevronLeft size={16} />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg ${currentPage === totalPages ? darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400' : darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700'}`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;