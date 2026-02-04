import React from 'react';

const DashboardHeader = ({ darkMode }) => {
  return (
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
  );
};

export default DashboardHeader;