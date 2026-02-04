import React from 'react';
import { Building, Upload } from 'lucide-react';

const EntrepriseTab = ({ entrepriseInfo, darkMode, onLogoUpload, onEntrepriseChange }) => {
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <Building className="w-6 h-6 mr-3" />
        Informations de l'entreprise
      </h2>

      {/* Logo */}
      <div className="mb-8">
        <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Logo de l'entreprise
        </label>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            {entrepriseInfo.logo ? (
              <img 
                src={entrepriseInfo.logo} 
                alt="Logo" 
                className="w-40 h-40 rounded-2xl object-cover border-4 shadow-lg"
                style={{ borderColor: darkMode ? '#4B5563' : '#FFFFFF' }}
              />
            ) : (
              <div className="w-40 h-40 rounded-2xl flex items-center justify-center shadow-lg bg-linear-to-br from-purple-600 to-purple-800">
                <span className="text-3xl font-bold text-white">KSI</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <Upload className="w-5 h-5" />
              <span>Choisir un logo</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={onLogoUpload}
              />
            </label>
            <p className={`mt-3 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              PNG, JPG ou SVG. Taille max: 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire entreprise */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Nom de l\'entreprise', name: 'nom', value: entrepriseInfo.nom, required: true },
          { label: 'Slogan', name: 'slogan', value: entrepriseInfo.slogan },
          { label: 'Adresse', name: 'adresse', value: entrepriseInfo.adresse, required: true },
          { label: 'Ville', name: 'ville', value: entrepriseInfo.ville },
          { label: 'Code Postal', name: 'codePostal', value: entrepriseInfo.codePostal },
          { label: 'Téléphone', name: 'telephone', value: entrepriseInfo.telephone, required: true },
          { label: 'Email', name: 'email', value: entrepriseInfo.email, type: 'email', required: true, fullWidth: true },
          { label: 'Site Web', name: 'siteWeb', value: entrepriseInfo.siteWeb, type: 'url' },
          { label: 'Numéro SIRET', name: 'siret', value: entrepriseInfo.siret },
          { label: 'Numéro TVA', name: 'tva', value: entrepriseInfo.tva },
        ].map((field) => (
          <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={field.value}
              onChange={onEntrepriseChange}
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
    </div>
  );
};

export default EntrepriseTab;