import React from 'react';
import { Shield } from 'lucide-react';

const SecuriteTab = ({ securite, darkMode, onSecuriteChange }) => {
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <Shield className="w-6 h-6 mr-3" />
        Paramètres de sécurité
      </h2>

      <div className="space-y-6">
        {/* Authentification à deux facteurs */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Authentification à deux facteurs (2FA)
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ajoutez une couche de sécurité supplémentaire
              </p>
            </div>
            <button
              onClick={() => onSecuriteChange('deuxFacteurs', !securite.deuxFacteurs)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securite.deuxFacteurs 
                  ? 'bg-purple-600' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                securite.deuxFacteurs ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Timeout de session */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Timeout de session (minutes)
          </label>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={securite.sessionTimeout}
            onChange={(e) => onSecuriteChange('sessionTimeout', e.target.value)}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>5 min</span>
            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {securite.sessionTimeout} min
            </span>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>120 min</span>
          </div>
        </div>

        {/* Complexité des mots de passe */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Complexité des mots de passe
          </label>
          <div className="flex space-x-2">
            {[
              { value: 'faible', label: 'Faible' },
              { value: 'moyenne', label: 'Moyenne' },
              { value: 'forte', label: 'Forte' },
              { value: 'tres-forte', label: 'Très forte' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onSecuriteChange('complexiteMotDePasse', option.value)}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  securite.complexiteMotDePasse === option.value
                    ? darkMode 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-600 text-white'
                    : darkMode 
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Historique des connexions */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Historique des connexions
                </p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Conserver l'historique des connexions
                </p>
              </div>
              <button
                onClick={() => onSecuriteChange('historiqueConnexions', !securite.historiqueConnexions)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securite.historiqueConnexions 
                    ? 'bg-purple-600' 
                    : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securite.historiqueConnexions ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Logs d'activités
                </p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Enregistrer les activités système
                </p>
              </div>
              <button
                onClick={() => onSecuriteChange('logsActivites', !securite.logsActivites)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securite.logsActivites 
                    ? 'bg-purple-600' 
                    : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securite.logsActivites ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuriteTab;