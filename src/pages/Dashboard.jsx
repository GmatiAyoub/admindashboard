import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsGrid from '../components/dashboard/StatsGrid';
import RevenueChartComponent from '../components/dashboard/RevenueChartComponent';
import RecentOrdersList from '../components/dashboard/RecentOrdersList';
import { 
  Shield,
  Zap,
  Users,
  Activity
} from 'lucide-react';

// Composant Dashboard principal
const Dashboard = ({ darkMode }) => {

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <DashboardHeader darkMode={darkMode} />

      {/* Stats Grid */}
      <StatsGrid darkMode={darkMode} />

      {/* Charts and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <RevenueChartComponent darkMode={darkMode} />
        </div>
        <div>
          <RecentOrdersList darkMode={darkMode} />
        </div>
      </div>

      {/* Additional Stats */}
      <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Statistiques de Performance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Satisfaction Client', value: '94%', icon: Shield, color: 'text-green-500' },
            { label: 'Temps de Réponse', value: '2.4min', icon: Zap, color: 'text-blue-500' },
            { label: 'Nouveaux Clients', value: '127', icon: Users, color: 'text-purple-500' },
            { label: 'Activité du Mois', value: '456', icon: Activity, color: 'text-orange-500' },
          ].map((stat, idx) => (
            <div key={idx} className={`text-center p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <div className={`inline-flex p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} Kernel Solutions - Dashboard v2.1.0
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center px-3 py-1 rounded-full ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm font-medium">Système Opérationnel</span>
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Dernière mise à jour: Aujourd'hui 14:30
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;