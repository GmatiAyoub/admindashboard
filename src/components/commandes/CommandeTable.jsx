import React from 'react';
import { Package, User, Calendar, DollarSign, Mail, Edit2, Trash2, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Pagination from './Pagination';

const CommandeTable = ({ 
  orders, 
  onEdit, 
  onDelete, 
  onView, 
  darkMode, 
  filteredOrders,
  currentPage,
  totalPages,
  ordersPerPage,
  indexOfFirstOrder,
  indexOfLastOrder,
  setCurrentPage 
}) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusIcon = (statut) => {
    switch(statut) {
      case 'Terminée': return <CheckCircle className="w-4 h-4" />;
      case 'En Cours': return <Clock className="w-4 h-4" />;
      case 'En Attente': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <>
      <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Package className="w-4 h-4 mr-2" />
                    N° Commande
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <User className="w-4 h-4 mr-2" />
                    Client
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Date
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Montant
                  </div>
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
              {orders.map((commande, index) => (
                <tr key={index} className={`transition-colors ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {commande.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {commande.client}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Mail className={`w-3 h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {commande.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {formatDate(commande.date)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {commande.montant}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(commande.statut)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        commande.statut === 'Terminée' 
                          ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                          : commande.statut === 'En Cours'
                          ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                          : darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {commande.statut}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onEdit(commande)}
                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="Modifier"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(commande.id)}
                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => onView(commande)}
                        className={`p-2 rounded-lg ${darkMode ? 'hover:bg-blue-900/30 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          filteredOrders={filteredOrders}
          ordersPerPage={ordersPerPage}
          indexOfFirstOrder={indexOfFirstOrder}
          indexOfLastOrder={indexOfLastOrder}
          darkMode={darkMode}
        />
      </div>

      {/* Pied de page */}
      <div className={`mt-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        <div className="flex items-center justify-between">
          <p className="text-sm">
            Les données sont mises à jour en temps réel • Dernière mise à jour : Aujourd'hui à {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
          </p>
          <div className="flex items-center space-x-4">
            <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
              Total: {filteredOrders.length} commandes
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommandeTable;