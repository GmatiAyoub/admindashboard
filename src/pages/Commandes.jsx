import React, { useState } from 'react';
import CommandeForm from '../components/commandes/CommandeForm';
import CommandeTable from '../components/commandes/CommandeTable';
import CommandeDetail from '../components/commandes/CommandeDetail';
import SearchBar from '../components/commandes/SearchBar';
import { initialOrders, generateOrderId } from '../components/commandes/orderUtils';
import { Plus } from 'lucide-react';

const Commandes = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [commandes, setCommandes] = useState(initialOrders);
  
  const ordersPerPage = 8;

  const handleNewOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
    setSelectedOrder(null);
  };

  const handleEdit = (commande) => {
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

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleSubmitForm = (formData) => {
    if (editingOrder) {
      setCommandes(prev => prev.map(cmd => 
        cmd.id === editingOrder.id 
          ? { 
              ...cmd, 
              ...formData,
              montant: `${parseFloat(formData.montant).toFixed(2)} DT`,
            }
          : cmd
      ));
    } else {
      const newOrder = {
        id: generateOrderId(),
        ...formData,
        montant: `${parseFloat(formData.montant).toFixed(2)} DT`,
        date: new Date().toISOString().split('T')[0],
        produits: [{ 
          nom: 'Nouveau produit', 
          quantite: 1, 
          prix: `${parseFloat(formData.montant).toFixed(2)} DT` 
        }],
      };
      setCommandes(prev => [newOrder, ...prev]);
    }
    
    setShowForm(false);
    setEditingOrder(null);
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

        {/* Barre de recherche et filtres */}
        {!showForm && !selectedOrder && (
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            darkMode={darkMode}
            onNewOrder={handleNewOrder}
          />
        )}

        {/* Formulaire */}
        {showForm && (
          <CommandeForm
            editingOrder={editingOrder}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
            darkMode={darkMode}
          />
        )}

        {/* Tableau des commandes */}
        {!showForm && !selectedOrder && filteredOrders.length > 0 && (
          <CommandeTable
            orders={currentOrders}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            darkMode={darkMode}
            filteredOrders={filteredOrders}
            currentPage={currentPage}
            totalPages={totalPages}
            ordersPerPage={ordersPerPage}
            indexOfFirstOrder={indexOfFirstOrder}
            indexOfLastOrder={indexOfLastOrder}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* Vue détaillée */}
        {selectedOrder && !showForm && (
          <CommandeDetail
            order={selectedOrder}
            onClose={handleCloseView}
            onEdit={() => {
              handleEdit(selectedOrder);
              setSelectedOrder(null);
            }}
            darkMode={darkMode}
          />
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