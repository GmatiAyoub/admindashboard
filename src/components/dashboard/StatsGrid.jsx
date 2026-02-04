import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  Target, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const DashboardCard = ({ title, value, change, icon: Icon, trend = 'up', darkMode }) => {
  const isPositive = change.startsWith('+');
  const trendColors = {
    up: darkMode ? 'text-green-400' : 'text-green-600',
    down: darkMode ? 'text-red-400' : 'text-red-600',
    neutral: darkMode ? 'text-gray-400' : 'text-gray-600'
  };

  const bgColors = {
    up: darkMode ? 'bg-green-900/20' : 'bg-green-50',
    down: darkMode ? 'bg-red-900/20' : 'bg-red-50',
    neutral: darkMode ? 'bg-gray-800' : 'bg-gray-100'
  };

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 border ${
      darkMode 
        ? 'bg-gray-800/50 border-gray-700 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10' 
        : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${
          darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <Icon className={`w-6 h-6 ${
            darkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center px-3 py-1 rounded-full text-sm ${bgColors[trend]} ${trendColors[trend]}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          <span className="font-medium">{change}</span>
        </div>
        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          vs mois dernier
        </span>
      </div>
    </div>
  );
};

const StatsGrid = ({ darkMode }) => {
  const statsCards = [
    { title: 'Utilisateurs Actifs', value: '2,543', change: '+12%', icon: Users, trend: 'up' },
    { title: 'Commandes Total', value: '1,254', change: '+8%', icon: ShoppingBag, trend: 'up' },
    { title: 'Taux de Conversion', value: '3.2%', change: '+2%', icon: Target, trend: 'up' },
    { title: 'Revenus Totaux', value: '24,5K DT', change: '+23%', icon: DollarSign, trend: 'up' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <DashboardCard key={index} {...card} darkMode={darkMode} />
      ))}
    </div>
  );
};

export default StatsGrid;