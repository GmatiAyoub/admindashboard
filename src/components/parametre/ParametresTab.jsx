
import React from 'react';
import { Settings, CreditCard, Globe } from 'lucide-react';

const devisesOptions = [
  'Dinar Tunisien (DT)',
  'Euro (€)',
  'Dollar US ($)',
  'Livre Sterling (£)',
  'Yen (¥)'
];

const fuseauxOptions = [
  'Tunis (GMT+1)',
  'Paris (GMT+1)',
  'Londres (GMT+0)',
  'New York (GMT-5)',
  'Tokyo (GMT+9)',
  'Sydney (GMT+10)'
];

const languesOptions = ['Français', 'Anglais', 'Arabe', 'Espagnol'];

const ParametresTab = ({ parametres, darkMode, onParametreChange }) => {
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <Settings className="w-6 h-6 mr-3" />
        Paramètres généraux
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Devise */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <CreditCard className="w-4 h-4 inline mr-2" />
            Devise par défaut
          </label>
          <select
            value={parametres.devise}
            onChange={(e) => onParametreChange('devise', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {devisesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Fuseau horaire */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Globe className="w-4 h-4 inline mr-2" />
            Fuseau horaire
          </label>
          <select
            value={parametres.fuseauHoraire}
            onChange={(e) => onParametreChange('fuseauHoraire', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {fuseauxOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Langue */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Langue
          </label>
          <select
            value={parametres.langue}
            onChange={(e) => onParametreChange('langue', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {languesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Format de date */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Format de date
          </label>
          <select
            value={parametres.formatDate}
            onChange={(e) => onParametreChange('formatDate', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="DD/MM/YYYY">JJ/MM/AAAA</option>
            <option value="MM/DD/YYYY">MM/JJ/AAAA</option>
            <option value="YYYY-MM-DD">AAAA-MM-JJ</option>
            <option value="DD MMM YYYY">JJ MMM AAAA</option>
          </select>
        </div>
      </div>

      {/* Sauvegarde automatique */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Sauvegarde automatique
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Activation de la sauvegarde automatique
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Les données sont sauvegardées automatiquement
              </p>
            </div>
            <button
              onClick={() => onParametreChange('backupAutomatique', !parametres.backupAutomatique)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                parametres.backupAutomatique 
                  ? 'bg-purple-600' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                parametres.backupAutomatique ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {parametres.backupAutomatique && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Fréquence de sauvegarde
              </label>
              <div className="flex space-x-2">
                {['quotidien', 'hebdomadaire', 'mensuel'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => onParametreChange('backupFrequence', freq)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      parametres.backupFrequence === freq
                        ? darkMode 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-purple-600 text-white'
                        : darkMode 
                          ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParametresTab;