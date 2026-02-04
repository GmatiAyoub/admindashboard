import React from 'react';
import { 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MoreVertical
} from 'lucide-react';

const RecentOrdersList = ({ darkMode }) => {
  const orders = [
    { id: 1, client: 'Mohamed Ali', amount: '45.50 DT', status: 'En Cours', time: '10:30 AM' },
    { id: 2, client: 'Fatma Ben Salah', amount: '120.00 DT', status: 'Terminée', time: '09:45 AM' },
    { id: 3, client: 'Ahmed Trabelsi', amount: '78.25 DT', status: 'En Attente', time: '08:20 AM' },
    { id: 4, client: 'Samia Ghozzi', amount: '210.75 DT', status: 'Terminée', time: 'Hier' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Terminée': return { bg: darkMode ? 'bg-green-900/30' : 'bg-green-50', text: darkMode ? 'text-green-400' : 'text-green-600', icon: CheckCircle };
      case 'En Cours': return { bg: darkMode ? 'bg-blue-900/30' : 'bg-blue-50', text: darkMode ? 'text-blue-400' : 'text-blue-600', icon: Clock };
      case 'En Attente': return { bg: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50', text: darkMode ? 'text-yellow-400' : 'text-yellow-600', icon: AlertCircle };
      default: return { bg: darkMode ? 'bg-gray-800' : 'bg-gray-100', text: darkMode ? 'text-gray-400' : 'text-gray-600', icon: Clock };
    }
  };

  return (
    <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Commandes Récentes
        </h2>
        <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <MoreVertical className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const { bg, text, icon: StatusIcon } = getStatusColor(order.status);
          
          return (
            <div key={order.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
              darkMode 
                ? 'border-gray-700 hover:bg-gray-800/50' 
                : 'border-gray-100 hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${bg}`}>
                  <StatusIcon className={`w-5 h-5 ${text}`} />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.client}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {order.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.amount}
                </p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
                  {order.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button className={`w-full mt-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
        darkMode 
          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}>
        <ShoppingBag className="w-5 h-5" />
        Voir toutes les commandes
      </button>
    </div>
  );
};

export default RecentOrdersList;