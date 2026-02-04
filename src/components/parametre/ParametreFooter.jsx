import React from 'react';

const ParametreFooter = ({ darkMode, adminInfo }) => {
  return (
    <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Kernel Solution and Innovations
          </p>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Tous droits réservés
          </p>
        </div>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Connecté en tant que <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {adminInfo.prenom} {adminInfo.nom}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ParametreFooter;