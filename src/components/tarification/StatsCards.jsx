import React from 'react';
import { Package, BarChart3, TrendingUp, Target, Star, Award } from 'lucide-react';

const StatsCards = ({ darkMode, stats }) => {
  const statCards = [
    { label: 'Total Services', value: stats.total, icon: Package, color: 'bg-linear-to-r from-blue-500 to-blue-600' },
    { label: 'Prix Moyen', value: `${stats.average} DT`, icon: BarChart3, color: 'bg-linear-to-r from-green-500 to-green-600' },
    { label: 'Prix Minimum', value: `${stats.min} DT`, icon: TrendingUp, color: 'bg-linear-to-r from-yellow-500 to-yellow-600' },
    { label: 'Prix Maximum', value: `${stats.max} DT`, icon: Target, color: 'bg-linear-to-r from-red-500 to-red-600' },
    { label: 'Populaires', value: stats.popular, icon: Star, color: 'bg-linear-to-r from-purple-500 to-purple-600' },
    { label: 'Premium', value: stats.featured, icon: Award, color: 'bg-linear-to-r from-pink-500 to-pink-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      {statCards.map((stat, idx) => (
        <div key={idx} className={`rounded-xl p-4 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;