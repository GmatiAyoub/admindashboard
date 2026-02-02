import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Printer, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  DollarSign,
  X
} from 'lucide-react';

const Commandes = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const ordersPerPage = 8;

  // État du formulaire
  const [formData, setFormData] = useState({
    client: '',
    montant: '',
    statut: 'En Attente',
    email: '',
    telephone: '',
    adresse: '',
    notes: ''
  });

  // Validation des champs
  const validateForm = () => {
    const errors = {};
    
    if (!formData.client.trim()) {
      errors.client = 'Le nom du client est requis';
    } else if (formData.client.length < 2) {
      errors.client = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (!formData.montant) {
      errors.montant = 'Le montant est requis';
    } else if (parseFloat(formData.montant) <= 0) {
      errors.montant = 'Le montant doit être supérieur à 0';
    }
    
    if (formData.email && !isValidEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
    
    if (formData.telephone && !isValidPhone(formData.telephone)) {
      errors.telephone = 'Le téléphone doit contenir exactement 8 chiffres';
    }
    
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
  };

  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length > 8 ? cleaned.substring(0, 8) : cleaned;
  };

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

  useEffect(() => {
    if (formData.email && !isValidEmail(formData.email)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormErrors(prev => ({ ...prev, email: 'Format d\'email invalide' }));
    } else if (formData.email) {
      setFormErrors(prev => ({ ...prev, email: '' }));
    }
    
    if (formData.telephone && !isValidPhone(formData.telephone)) {
      setFormErrors(prev => ({ ...prev, telephone: 'Le téléphone doit contenir exactement 8 chiffres' }));
    } else if (formData.telephone) {
      setFormErrors(prev => ({ ...prev, telephone: '' }));
    }
  }, [formData.email, formData.telephone]);

  // Données initiales
  const [commandes, setCommandes] = useState([
    { 
      id: 'ORD-20260116-ABC', 
      client: 'Mohamed Ali', 
      montant: '45.50 DT', 
      statut: 'En Cours', 
      date: '2026-01-16',
      email: 'mohamed.ali@example.com',
      telephone: '55123456',
      adresse: 'Avenue Habib Bourguiba, Tunis',
      produits: [
        { nom: 'Produit A', quantite: 2, prix: '15.00 DT' },
        { nom: 'Produit B', quantite: 1, prix: '15.50 DT' }
      ],
      notes: 'Livraison avant 14h'
    },
    { 
      id: 'ORD-20260116-DEF', 
      client: 'Fatma Ben Salah', 
      montant: '120.00 DT', 
      statut: 'Terminée', 
      date: '2026-01-16',
      email: 'fatma.bensalah@example.com',
      telephone: '98123456',
      adresse: 'Rue de la Liberté, Sfax',
      produits: [
        { nom: 'Produit C', quantite: 3, prix: '30.00 DT' },
        { nom: 'Produit D', quantite: 1, prix: '30.00 DT' }
      ],
      notes: 'Client fidèle'
    },
    { 
      id: 'ORD-20260115-GHI', 
      client: 'Ahmed Trabelsi', 
      montant: '78.25 DT', 
      statut: 'En Attente', 
      date: '2026-01-15',
      email: 'ahmed.trabelsi@example.com',
      telephone: '23123456',
      adresse: 'Avenue Mohamed V, Bizerte',
      produits: [
        { nom: 'Produit E', quantite: 5, prix: '15.65 DT' }
      ],
      notes: 'À préparer rapidement'
    },
  ]);

  const generateOrderId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `ORD-${year}${month}${day}-${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
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
    
    if (editingOrder) {
      setCommandes(prev => prev.map(cmd => 
        cmd.id === editingOrder.id 
          ? { 
              ...cmd, 
              client: formData.client,
              montant: `${parseFloat(formData.montant).toFixed(2)} DT`,
              statut: formData.statut,
              email: formData.email,
              telephone: formData.telephone,
              adresse: formData.adresse,
              notes: formData.notes
            }
          : cmd
      ));
    } else {
      const newOrder = {
        id: generateOrderId(),
        client: formData.client,
        montant: `${parseFloat(formData.montant).toFixed(2)} DT`,
        statut: formData.statut,
        date: new Date().toISOString().split('T')[0],
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        produits: [{ 
          nom: 'Nouveau produit', 
          quantite: 1, 
          prix: `${parseFloat(formData.montant).toFixed(2)} DT` 
        }],
        notes: formData.notes
      };
      setCommandes(prev => [newOrder, ...prev]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      client: '',
      montant: '',
      statut: 'En Attente',
      email: '',
      telephone: '',
      adresse: '',
      notes: ''
    });
    setFormErrors({});
    setEditingOrder(null);
    setShowForm(false);
  };

  const handleNewOrder = () => {
    setFormData({
      client: '',
      montant: '',
      statut: 'En Attente',
      email: '',
      telephone: '',
      adresse: '',
      notes: ''
    });
    setFormErrors({});
    setEditingOrder(null);
    setShowForm(true);
    setSelectedOrder(null);
  };

  const handleEdit = (commande) => {
    setFormData({
      client: commande.client,
      montant: commande.montant.replace(' DT', ''),
      statut: commande.statut,
      email: commande.email,
      telephone: commande.telephone,
      adresse: commande.adresse,
      notes: commande.notes
    });
    setFormErrors({});
    setEditingOrder(commande);
    setShowForm(true);
    setSelectedOrder(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      setCommandes(prev => prev.filter(cmd => cmd.id !== id));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(null);
      }
    }
  };

  const handleView = (commande) => {
    setSelectedOrder(commande);
  };

  const handleCloseView = () => {
    setSelectedOrder(null);
  };

  const handleCancel = () => {
    resetForm();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facture - ${selectedOrder?.id}</title>
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
        
        <div class="invoice-title">FACTURE ${selectedOrder?.id}</div>
        
        <div class="info-grid">
          <div>
            <div class="section-title">Informations Client</div>
            <div class="info-item"><strong>Client:</strong> ${selectedOrder?.client}</div>
            <div class="info-item"><strong>Email:</strong> ${selectedOrder?.email}</div>
            <div class="info-item"><strong>Téléphone:</strong> ${selectedOrder?.telephone}</div>
            <div class="info-item"><strong>Adresse:</strong> ${selectedOrder?.adresse}</div>
          </div>
          <div>
            <div class="section-title">Informations Commande</div>
            <div class="info-item"><strong>Date:</strong> ${selectedOrder?.date}</div>
            <div class="info-item"><strong>Statut:</strong> 
              <span class="status status-${selectedOrder?.statut.toLowerCase().replace(' ', '')}">
                ${selectedOrder?.statut}
              </span>
            </div>
            <div class="info-item"><strong>N° Commande:</strong> ${selectedOrder?.id}</div>
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
              ${selectedOrder?.produits?.map(produit => `
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
          Total: ${selectedOrder?.montant}
        </div>
        
        ${selectedOrder?.notes ? `
        <div class="section">
          <div class="section-title">Notes</div>
          <p>${selectedOrder.notes}</p>
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

  const filteredOrders = commandes.filter(commande => {
    const matchesSearch = 
      commande.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'tous' || 
      commande.statut.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusIcon = (statut) => {
    switch(statut) {
      case 'Terminée': return <CheckCircle className="w-4 h-4" />;
      case 'En Cours': return <Clock className="w-4 h-4" />;
      case 'En Attente': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className={`p-6 md:p-8 min-h-screen ${darkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Commandes
              </h1>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Gérez toutes vos commandes
              </p>
            </div>
            
          </div>
        </div>

        {/* Barre d'outils */}
        {!showForm && !selectedOrder && (
          <div className={`rounded-2xl p-6 mb-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher une commande..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className={`px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="En Cours">En Cours</option>
                  <option value="Terminée">Terminée</option>
                  <option value="En Attente">En Attente</option>
                </select>
              </div>

              <button 
                onClick={handleNewOrder}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center whitespace-nowrap"
              >
                <Plus size={20} className="mr-2" />
                Nouvelle Commande
              </button>
            </div>
          </div>
        )}

        {/* Formulaire */}
        {showForm && (
          <div className={`rounded-2xl p-6 mb-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {editingOrder ? 'Modifier la Commande' : 'Nouvelle Commande'}
              </h2>
              <button
                onClick={handleCancel}
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
                  onClick={handleCancel}
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
        )}

        {/* Tableau des commandes */}
        {!showForm && !selectedOrder && filteredOrders.length > 0 && (
          <>
            <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Package className="w-4 h-4 mr-2" />
                          N° Commande
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <User className="w-4 h-4 mr-2" />
                          Client
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Date
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <DollarSign className="w-4 h-4 mr-2" />
                          Montant
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {currentOrders.map((commande, index) => (
                      <tr key={index} className={`transition-colors ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4">
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {commande.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {commande.client}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Mail className={`w-3 h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                {commande.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                            {formatDate(commande.date)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {commande.montant}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(commande.statut)}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              commande.statut === 'Terminée' 
                                ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                                : commande.statut === 'En Cours'
                                ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                                : darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {commande.statut}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEdit(commande)}
                              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                              title="Modifier"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(commande.id)}
                              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleView(commande)}
                              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-blue-900/30 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`}
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredOrders.length > ordersPerPage && (
                <div className={`px-6 py-4 border-t flex items-center justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Affichage de {indexOfFirstOrder + 1} à {Math.min(indexOfLastOrder, filteredOrders.length)} sur {filteredOrders.length} commandes
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg ${currentPage === 1 ? darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400' : darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700'}`}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg ${currentPage === totalPages ? darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400' : darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700'}`}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pied de page */}
            <div className={`mt-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  Les données sont mises à jour en temps réel • Dernière mise à jour : Aujourd'hui à {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
                </p>
                <div className="flex items-center space-x-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                    Total: {filteredOrders.length} commandes
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Interface de visualisation détaillée */}
        {selectedOrder && !showForm && (
          <div className={`rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="p-6">
              {/* En-tête */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Détails de la Commande
                  </h2>
                  <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedOrder.id} • {formatDate(selectedOrder.date)}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleCloseView}
                    className={`px-4 py-2 rounded-xl flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Retour
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
                          {selectedOrder.client}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Mail className="w-4 h-4 inline mr-1" />
                            Email
                          </p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {selectedOrder.email}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <Phone className="w-4 h-4 inline mr-1" />
                            Téléphone
                          </p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {selectedOrder.telephone}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Adresse
                        </p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {selectedOrder.adresse}
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
                            {formatDate(selectedOrder.date)}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Statut</p>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            selectedOrder.statut === 'Terminée' 
                              ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                              : selectedOrder.statut === 'En Cours'
                              ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                              : darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {getStatusIcon(selectedOrder.statut)}
                            <span className="ml-2">{selectedOrder.statut}</span>
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Montant total</p>
                        <p className="text-3xl font-bold bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                          {selectedOrder.montant}
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
                      {selectedOrder.produits?.map((produit, index) => (
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
                            {selectedOrder.montant}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Notes
                  </h3>
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedOrder.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Message vide */}
        {!showForm && !selectedOrder && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className={`inline-flex p-6 rounded-2xl mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Package className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Aucune commande trouvée
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm 
                ? `Aucun résultat pour "${searchTerm}"` 
                : 'Aucune commande dans cette catégorie'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('tous');
              }}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Commandes;