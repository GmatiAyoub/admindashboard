import React from 'react';
import { ChevronLeft, Printer, User, Mail, Phone, MapPin, Package, CheckCircle, Clock, AlertCircle, Edit2 } from 'lucide-react';
import { formatDate, getStatusIcon } from '../commandes/orderUtils';

const CommandeDetail = ({ order, onClose, onEdit, darkMode }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facture - ${order?.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .company-name { font-size: 24px; font-weight: bold; color: #333; }
          .invoice-title { font-size: 20px; margin: 20px 0; color: #321168; }
          .section { margin: 20px 0; }
          .section-title { font-weight: bold; border-bottom: 2px solid #321168; padding-bottom: 5px; margin-bottom: 10px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .info-item { margin: 5px 0; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          .table th { background-color: #f8f9fa; }
          .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
          .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
          .status { display: inline-block; padding: 5px 10px; border-radius: 20px; font-size: 12px; }
          .status-pending { background: #fff3cd; color: #856404; }
          .status-processing { background: #cce5ff; color: #004085; }
          .status-completed { background: #d4edda; color: #155724; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">Votre Entreprise</div>
          <div>123 Rue des Entreprises, Tunis</div>
          <div>Tél: +216 70 000 000 | Email: contact@entreprise.tn</div>
        </div>
        
        <div class="invoice-title">FACTURE ${order?.id}</div>
        
        <div class="info-grid">
          <div>
            <div class="section-title">Informations Client</div>
            <div class="info-item"><strong>Client:</strong> ${order?.client}</div>
            <div class="info-item"><strong>Email:</strong> ${order?.email}</div>
            <div class="info-item"><strong>Téléphone:</strong> ${order?.telephone}</div>
            <div class="info-item"><strong>Adresse:</strong> ${order?.adresse}</div>
          </div>
          <div>
            <div class="section-title">Informations Commande</div>
            <div class="info-item"><strong>Date:</strong> ${order?.date}</div>
            <div class="info-item"><strong>Statut:</strong> 
              <span class="status status-${order?.statut.toLowerCase().replace(' ', '')}">
                ${order?.statut}
              </span>
            </div>
            <div class="info-item"><strong>N° Commande:</strong> ${order?.id}</div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Détails de la Commande</div>
          <table class="table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order?.produits?.map(produit => `
                <tr>
                  <td>${produit.nom}</td>
                  <td>${produit.quantite}</td>
                  <td>${produit.prix}</td>
                  <td>${(parseFloat(produit.prix.replace(' DT', '')) * produit.quantite).toFixed(2)} DT</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="total">
          Total: ${order?.montant}
        </div>
        
        ${order?.notes ? `
        <div class="section">
          <div class="section-title">Notes</div>
          <p>${order.notes}</p>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>Merci pour votre confiance !</p>
          <p>Date d'impression: ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className={`rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="p-6">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Détails de la Commande
            </h2>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {order.id} • {formatDate(order.date)}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour
            </button>
            <button
              onClick={() => {
                onEdit();
                onClose();
              }}
              className={`px-4 py-2 rounded-xl flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Modifier
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </button>
          </div>
        </div>

        {/* Grille d'informations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Informations client */}
          <div>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <User className="w-5 h-5 mr-2" />
                Informations Client
              </h3>
              <div className="space-y-4">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Client</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.client}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </p>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {order.email}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Phone className="w-4 h-4 inline mr-1" />
                      Téléphone
                    </p>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {order.telephone}
                    </p>
                  </div>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Adresse
                  </p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.adresse}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations commande */}
          <div>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Package className="w-5 h-5 mr-2" />
                Informations Commande
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date</p>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Statut</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      order.statut === 'Terminée' 
                        ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                        : order.statut === 'En Cours'
                        ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                        : darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {getStatusIcon(order.statut)}
                      <span className="ml-2">{order.statut}</span>
                    </span>
                  </div>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Montant total</p>
                  <p className="text-3xl font-bold bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    {order.montant}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produits */}
        <div className="mb-8">
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Produits Commandés
          </h3>
          <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Produit</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Quantité</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Prix unitaire</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.produits?.map((produit, index) => (
                  <tr key={index} className={darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4">
                      <span className={darkMode ? 'text-white' : 'text-gray-900'}>{produit.nom}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{produit.quantite}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{produit.prix}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(parseFloat(produit.prix.replace(' DT', '')) * produit.quantite).toFixed(2)} DT
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-right font-semibold">
                    Total:
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-2xl font-bold bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                      {order.montant}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Notes
            </h3>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{order.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandeDetail;