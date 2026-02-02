import React, { useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  BarChart3,
  Activity,
  Target,
  Shield,
  Zap,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  MoreVertical
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

// Composant RevenueChart
const RevenueChart = ({ darkMode }) => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const revenueData = [35, 33, 89, 77, 88, 38, 54, 99, 56, 75, 93, 71];
  const maxRevenue = Math.max(...revenueData);

  return (
    <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Évolution des Revenus
          </h2>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Performance mensuelle des revenus
          </p>
        </div>
        <div className={`flex items-center px-4 py-2 rounded-full ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`}>
          <TrendingUp className="w-4 h-4 mr-2" />
          <span className="font-medium">+23% ce mois</span>
        </div>
      </div>

      <div className="h-64 mt-8">
        <div className="relative h-full flex items-end justify-between">
          {revenueData.map((value, index) => {
            const heightPercentage = (value / maxRevenue) * 100;
            const isCurrentMonth = index === new Date().getMonth();

            return (
              <div key={index} className="flex flex-col items-center flex-1 h-full group">
                <div className="flex-1 flex items-end justify-center w-full px-1">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 group-hover:opacity-100 ${
                      isCurrentMonth 
                        ? darkMode ? 'bg-linear-to-t from-purple-600 to-purple-400' : 'bg-linear-to-t from-purple-500 to-purple-300'
                        : darkMode ? 'bg-linear-to-t from-gray-700 to-gray-600' : 'bg-linear-to-t from-gray-300 to-gray-200'
                    } ${darkMode ? 'opacity-80' : 'opacity-90'}`}
                    style={{ height: `${heightPercentage}%` }}
                  >
                    <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                    }`}>
                      {months[index]}: {value}K DT
                    </div>
                  </div>
                </div>
                <div className="h-8 flex items-center mt-2">
                  <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {months[index]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Composant RecentOrders
const RecentOrders = ({ darkMode }) => {
  const [orders] = useState([
    { id: 1, client: 'Mohamed Ali', amount: '45.50 DT', status: 'En Cours', time: '10:30 AM' },
    { id: 2, client: 'Fatma Ben Salah', amount: '120.00 DT', status: 'Terminée', time: '09:45 AM' },
    { id: 3, client: 'Ahmed Trabelsi', amount: '78.25 DT', status: 'En Attente', time: '08:20 AM' },
    { id: 4, client: 'Samia Ghozzi', amount: '210.75 DT', status: 'Terminée', time: 'Hier' },
  ]);

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

// Composant Dashboard principal
const Dashboard = ({ darkMode }) => {

  const statsCards = [
    { title: 'Utilisateurs Actifs', value: '2,543', change: '+12%', icon: Users, trend: 'up' },
    { title: 'Commandes Total', value: '1,254', change: '+8%', icon: ShoppingBag, trend: 'up' },
    { title: 'Taux de Conversion', value: '3.2%', change: '+2%', icon: Target, trend: 'up' },
    { title: 'Revenus Totaux', value: '24,5K DT', change: '+23%', icon: DollarSign, trend: 'up' },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Tableau de Bord
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bienvenue sur votre interface d'administration
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <DashboardCard key={index} {...card} darkMode={darkMode} />
        ))}
      </div>

      {/* Charts and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart darkMode={darkMode} />
        </div>
        <div>
          <RecentOrders darkMode={darkMode} />
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