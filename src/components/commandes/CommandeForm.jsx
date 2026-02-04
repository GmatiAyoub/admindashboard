import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { validateForm, formatPhone, initialFormData } from '../commandes/orderUtils';

const CommandeForm = ({ editingOrder, onSubmit, onCancel, darkMode }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (editingOrder) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        client: editingOrder.client,
        montant: editingOrder.montant.replace(' DT', ''),
        statut: editingOrder.statut,
        email: editingOrder.email,
        telephone: editingOrder.telephone,
        adresse: editingOrder.adresse,
        notes: editingOrder.notes
      });
    }
  }, [editingOrder]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'telephone') {
      formattedValue = formatPhone(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className={`rounded-2xl p-6 mb-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {editingOrder ? 'Modifier la Commande' : 'Nouvelle Commande'}
        </h2>
        <button
          onClick={onCancel}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Informations de base */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Client *
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 rounded-xl border ${formErrors.client ? 'border-red-500' : darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} ${darkMode ? 'focus:border-purple-500 focus:ring-purple-500/20' : 'focus:border-purple-500 focus:ring-purple-500/10'}`}
              placeholder="Nom du client"
            />
            {formErrors.client && (
              <p className="mt-2 text-sm text-red-500">{formErrors.client}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Montant (DT) *
            </label>
            <input
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 rounded-xl border ${formErrors.montant ? 'border-red-500' : darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'} ${darkMode ? 'focus:border-purple-500 focus:ring-purple-500/20' : 'focus:border-purple-500 focus:ring-purple-500/10'}`}
              placeholder="0.00"
            />
            {formErrors.montant && (
              <p className="mt-2 text-sm text-red-500">{formErrors.montant}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Statut *
            </label>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="En Attente">En Attente</option>
              <option value="En Cours">En Cours</option>
              <option value="Terminée">Terminée</option>
            </select>
          </div>

          {editingOrder && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                N° Commande
              </label>
              <input
                type="text"
                value={editingOrder.id}
                disabled
                className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-300 text-gray-500'}`}
              />
            </div>
          )}

          {/* Informations supplémentaires */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500' : darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              placeholder="client@example.com"
            />
            {formErrors.email && (
              <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Téléphone
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              maxLength="8"
              className={`w-full px-4 py-3 rounded-xl border ${formErrors.telephone ? 'border-red-500' : darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              placeholder="55123456"
            />
            {formErrors.telephone ? (
              <p className="mt-2 text-sm text-red-500">{formErrors.telephone}</p>
            ) : (
              <p className={`mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {formData.telephone.length}/8 caractères
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Adresse
            </label>
            <textarea
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              rows="2"
              className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              placeholder="Adresse de livraison"
            />
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="2"
              className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              placeholder="Notes supplémentaires sur la commande"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className={`px-6 py-3 rounded-xl border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            {editingOrder ? 'Mettre à jour' : 'Créer la commande'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommandeForm;