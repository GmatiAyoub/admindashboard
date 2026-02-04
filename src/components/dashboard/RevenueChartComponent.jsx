import React from 'react';
import { TrendingUp } from 'lucide-react';

const RevenueChartComponent = ({ darkMode }) => {
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

export default RevenueChartComponent;