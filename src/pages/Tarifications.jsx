import React, { useState } from 'react';
import { 
  Tag, 
  Plus
} from 'lucide-react';
import Header from '../components/tarification/Header';
import AddForm from '../components/tarification/AddForm';
import StatsCards from '../components/tarification/StatsCards';
import Filters from '../components/tarification/Filters';
import GridView from '../components/tarification/GridView';
import ListView from '../components/tarification/ListView';
import Summary from '../components/tarification/Summary';
import Footer from '../components/tarification/Footer';
import { initialPrices, categories } from '../components/tarification/helpers';

const Tarifications = ({ darkMode }) => {
  const [prices, setPrices] = useState(initialPrices);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'impression',
    popular: false,
    featured: false
  });

  const startEditing = (id, currentPrice) => {
    setEditingId(id);
    setEditPrice(currentPrice.toString());
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditPrice('');
  };

  const savePrice = (id) => {
    if (!editPrice || isNaN(parseFloat(editPrice))) return;
    
    const newPrice = parseFloat(editPrice);
    if (newPrice < 0) return;
    
    setIsSaving(true);
    
    setTimeout(() => {
      setPrices(prices.map(item => 
        item.id === id ? { ...item, price: newPrice } : item
      ));
      setEditingId(null);
      setEditPrice('');
      setIsSaving(false);
    }, 300);
  };

  const deleteService = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      setPrices(prices.filter(item => item.id !== id));
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const addNewItem = () => {
    if (!newItem.name.trim() || !newItem.price || isNaN(parseFloat(newItem.price))) {
      alert('Veuillez entrer un nom et un prix valide');
      return;
    }

    const newId = Math.max(...prices.map(p => p.id)) + 1;
    const newItemObj = {
      id: newId,
      name: newItem.name,
      price: parseFloat(newItem.price),
      unit: 'DT',
      category: newItem.category,
      popular: newItem.popular,
      featured: newItem.featured
    };
    
    setPrices([...prices, newItemObj]);
    setNewItem({ name: '', price: '', category: 'impression', popular: false, featured: false });
    setShowAddForm(false);
  };

  const handleNewServiceClick = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewItem({ name: '', price: '', category: 'impression', popular: false, featured: false });
  };

  // Filtrage des données
  const filteredPrices = prices.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = {
    total: prices.length,
    average: (prices.reduce((sum, item) => sum + item.price, 0) / prices.length).toFixed(2),
    min: Math.min(...prices.map(p => p.price)).toFixed(2),
    max: Math.max(...prices.map(p => p.price)).toFixed(2),
    popular: prices.filter(p => p.popular).length,
    featured: prices.filter(p => p.featured).length
  };

  return (
    <div className={`p-6 md:p-8 min-h-screen ${darkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <Header 
          darkMode={darkMode}
          onNewServiceClick={handleNewServiceClick}
        />

        {/* Formulaire d'ajout */}
        {showAddForm && (
          <AddForm
            darkMode={darkMode}
            newItem={newItem}
            onNewItemChange={handleNewItemChange}
            onCancel={handleCancelAdd}
            onAdd={addNewItem}
          />
        )}

        {/* Cartes de statistiques */}
        <StatsCards 
          darkMode={darkMode}
          stats={stats}
        />

        {/* Filtres et contrôles */}
        <Filters
          darkMode={darkMode}
          categories={categories}
          prices={prices}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          viewMode={viewMode}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchTerm}
          onViewModeChange={setViewMode}
        />

        {/* Contenu principal */}
        {filteredPrices.length === 0 ? (
          <div className="text-center py-12">
            <div className={`inline-flex p-6 rounded-2xl mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Tag className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Aucun service trouvé
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm 
                ? `Aucun résultat pour "${searchTerm}"` 
                : 'Aucun service dans cette catégorie'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <GridView
            darkMode={darkMode}
            filteredPrices={filteredPrices}
            editingId={editingId}
            editPrice={editPrice}
            isSaving={isSaving}
            onEditPriceChange={setEditPrice}
            onSavePrice={savePrice}
            onCancelEditing={cancelEditing}
            onStartEditing={startEditing}
            onDeleteService={deleteService}
          />
        ) : (
          <ListView
            darkMode={darkMode}
            filteredPrices={filteredPrices}
            editingId={editingId}
            editPrice={editPrice}
            isSaving={isSaving}
            onEditPriceChange={setEditPrice}
            onSavePrice={savePrice}
            onCancelEditing={cancelEditing}
            onStartEditing={startEditing}
            onDeleteService={deleteService}
          />
        )}

        {/* Résumé */}
        {filteredPrices.length > 0 && (
          <Summary
            darkMode={darkMode}
            filteredPrices={filteredPrices}
            prices={prices}
          />
        )}

        {/* Footer */}
        <Footer 
          darkMode={darkMode}
          filteredPrices={filteredPrices}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default Tarifications;