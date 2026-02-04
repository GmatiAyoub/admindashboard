import React from 'react';
import { Bell, Mail } from 'lucide-react';

const NotificationsTab = ({ parametres, darkMode, onParametreChange }) => {
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <Bell className="w-6 h-6 mr-3" />
        Paramètres de notifications
      </h2>

      <div className="space-y-6">
        {/* Notifications par email */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Notifications par email
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Recevez les notifications par email
              </p>
            </div>
            <button
              onClick={() => onParametreChange('notificationsEmail', !parametres.notificationsEmail)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                parametres.notificationsEmail 
                  ? 'bg-purple-600' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                parametres.notificationsEmail ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {parametres.notificationsEmail && (
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-commandes"
                  defaultChecked
                  className={`w-4 h-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
                <label htmlFor="email-commandes" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nouvelles commandes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-paiements"
                  defaultChecked
                  className={`w-4 h-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
                <label htmlFor="email-paiements" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Paiements reçus
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-alertes"
                  defaultChecked
                  className={`w-4 h-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
                <label htmlFor="email-alertes" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Alertes système
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Notifications SMS */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Notifications SMS
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Recevez les notifications par SMS
              </p>
            </div>
            <button
              onClick={() => onParametreChange('notificationsSMS', !parametres.notificationsSMS)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                parametres.notificationsSMS 
                  ? 'bg-purple-600' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                parametres.notificationsSMS ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Email de test */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Tester les notifications
          </h3>
          <button
            className={`px-6 py-3 rounded-xl flex items-center ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Mail className="w-4 h-4 mr-2" />
            Envoyer un email de test
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;