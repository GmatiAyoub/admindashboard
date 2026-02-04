import React from 'react';
import { User, Eye, EyeOff } from 'lucide-react';

const AdminTab = ({ 
  adminInfo, 
  darkMode, 
  showPassword, 
  showNewPassword, 
  showConfirmPassword, 
  onAdminChange,
  onShowPasswordChange,
  onShowNewPasswordChange,
  onShowConfirmPasswordChange 
}) => {
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <User className="w-6 h-6 mr-3" />
        Informations de l'administrateur
      </h2>

      {/* Informations de base */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          { label: 'Nom', name: 'nom', value: adminInfo.nom, required: true },
          { label: 'Prénom', name: 'prenom', value: adminInfo.prenom, required: true },
          { label: 'Email', name: 'email', value: adminInfo.email, type: 'email', required: true, fullWidth: true },
          { label: 'Téléphone', name: 'telephone', value: adminInfo.telephone },
        ].map((field) => (
          <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={field.value}
              onChange={onAdminChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
              }`}
              placeholder={field.label}
            />
          </div>
        ))}
      </div>

      {/* Mot de passe actuel */}
      <div className="mb-8">
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Mot de passe actuel
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={adminInfo.motDePasse}
            readOnly
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-400' 
                : 'bg-gray-50 border-gray-300 text-gray-500'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => onShowPasswordChange(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            ) : (
              <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Changement de mot de passe */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Changer le mot de passe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              label: 'Nouveau mot de passe', 
              name: 'nouveauMotDePasse', 
              value: adminInfo.nouveauMotDePasse,
              show: showNewPassword,
              setShow: onShowNewPasswordChange
            },
            { 
              label: 'Confirmer le mot de passe', 
              name: 'confirmerMotDePasse', 
              value: adminInfo.confirmerMotDePasse,
              show: showConfirmPassword,
              setShow: onShowConfirmPasswordChange
            },
          ].map((field) => (
            <div key={field.name}>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.show ? 'text' : 'password'}
                  name={field.name}
                  value={field.value}
                  onChange={onAdminChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => field.setShow(!field.show)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {field.show ? (
                    <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Exigences de sécurité:
            </p>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>• Au moins 8 caractères</li>
              <li>• Une lettre majuscule</li>
              <li>• Un chiffre</li>
              <li>• Un caractère spécial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTab;