import React from 'react';
import { Building, User, Settings, Shield, Bell } from 'lucide-react';

const ParametreTabs = ({ activeTab, onTabChange, darkMode }) => {
  const tabs = [
    { id: 'entreprise', label: 'Entreprise', icon: Building },
    { id: 'admin', label: 'Administrateur', icon: User },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
    { id: 'securite', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className={`flex space-x-1 rounded-xl p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center ${
              activeTab === tab.id
                ? darkMode 
                  ? 'bg-linear-to-r from-purple-600 to-purple-800 text-white shadow-lg' 
                  : 'bg-white text-purple-700 shadow'
                : darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default ParametreTabs;