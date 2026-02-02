import React, { useState } from 'react';
import { 
  Tag, 
  Edit2, 
  Save, 
  X, 
  DollarSign, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Filter, 
  Grid, 
  List, 
  Search, 
  Trash2,
  Package,
  Star,
  Award,
  Target,
  BarChart3,
  RefreshCw,
  MoreVertical
} from 'lucide-react';

const Tarifications = ({ darkMode }) => {
  const initialPrices = [
    { id: 1, name: 'Noir & Blanc Simple', price: 0.10, unit: 'DT', category: 'impression', popular: true, featured: false },
    { id: 2, name: 'Couleur Simple', price: 0.50, unit: 'DT', category: 'impression', popular: true, featured: false },
    { id: 3, name: 'Noir & Blanc Recto-verso', price: 0.15, unit: 'DT', category: 'impression', popular: false, featured: false },
    { id: 4, name: 'Couleur Recto-verso', price: 1.00, unit: 'DT', category: 'impression', popular: false, featured: true },
    { id: 5, name: 'Impression Premium', price: 0.20, unit: 'DT', category: 'impression', popular: false, featured: true },
    { id: 6, name: 'Reliure Simple', price: 2.00, unit: 'DT', category: 'reliure', popular: true, featured: false },
    { id: 7, name: 'Reliure Spirale', price: 3.00, unit: 'DT', category: 'reliure', popular: false, featured: true },
    { id: 8, name: 'Impression Grand Format', price: 5.00, unit: 'DT', category: 'impression', popular: false, featured: false },
    { id: 9, name: 'Reliure Cartonnée', price: 4.50, unit: 'DT', category: 'reliure', popular: false, featured: false },
    { id: 10, name: 'Scan Haute Définition', price: 0.30, unit: 'DT', category: 'impression', popular: false, featured: false },
  ];

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

  const categories = [
    { id: 'all', name: 'Toutes', count: prices.length, color: 'bg-linear-to-r from-purple-500 to-purple-600' },
    { id: 'impression', name: 'Impression', count: prices.filter(p => p.category === 'impression').length, color: 'bg-linear-to-r from-blue-500 to-blue-600' },
    { id: 'reliure', name: 'Reliure', count: prices.filter(p => p.category === 'reliure').length, color: 'bg-linear-to-r from-pink-500 to-pink-600' },
  ];

  const stats = {
    total: prices.length,
    average: (prices.reduce((sum, item) => sum + item.price, 0) / prices.length).toFixed(2),
    min: Math.min(...prices.map(p => p.price)).toFixed(2),
    max: Math.max(...prices.map(p => p.price)).toFixed(2),
    popular: prices.filter(p => p.popular).length,
    featured: prices.filter(p => p.featured).length
  };

  const getCategoryColor = (category) => {
    return category === 'impression' 
      ? darkMode ? 'from-blue-500 to-blue-600' : 'from-blue-400 to-blue-500'
      : darkMode ? 'from-pink-500 to-pink-600' : 'from-pink-400 to-pink-500';
  };

  const getCategoryBgColor = (category) => {
    return category === 'impression' 
      ? darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
      : darkMode ? 'bg-pink-900/30' : 'bg-pink-50';
  };

  const getCategoryTextColor = (category) => {
    return category === 'impression' 
      ? darkMode ? 'text-blue-400' : 'text-blue-600'
      : darkMode ? 'text-pink-400' : 'text-pink-600';
  };

  return (
    <div className={`p-6 md:p-8 min-h-screen ${darkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-linear-to-r from-purple-600 to-purple-800 rounded-xl">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tarifications
                </h1>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gérez vos prix et services
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleNewServiceClick}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nouveau Service
              </button>
            </div>
          </div>

          {/* Formulaire d'ajout */}
          {showAddForm && (
            <div className={`rounded-2xl p-6 mb-8 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ajouter un nouveau service
                </h3>
                <button
                  onClick={handleCancelAdd}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nom du service
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleNewItemChange}
                    className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
                    }`}
                    placeholder="Nom du service"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Prix (DT)
                  </label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    value={newItem.price}
                    onChange={handleNewItemChange}
                    className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Catégorie
                  </label>
                  <select
                    name="category"
                    value={newItem.category}
                    onChange={handleNewItemChange}
                    className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="impression">Impression</option>
                    <option value="reliure">Reliure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="popular"
                    name="popular"
                    checked={newItem.popular}
                    onChange={handleNewItemChange}
                    className={`w-4 h-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  />
                  <label htmlFor="popular" className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    Marquer comme populaire
                  </label>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={newItem.featured}
                    onChange={handleNewItemChange}
                    className={`w-4 h-4 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  />
                  <label htmlFor="featured" className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Award className="w-4 h-4 mr-2 text-purple-500" />
                    Marquer comme premium
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancelAdd}
                  className={`px-6 py-3 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  Annuler
                </button>
                <button
                  onClick={addNewItem}
                  className="px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Ajouter le service
                </button>
              </div>
            </div>
          )}

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Total Services', value: stats.total, icon: Package, color: 'bg-linear-to-r from-blue-500 to-blue-600' },
              { label: 'Prix Moyen', value: `${stats.average} DT`, icon: BarChart3, color: 'bg-linear-to-r from-green-500 to-green-600' },
              { label: 'Prix Minimum', value: `${stats.min} DT`, icon: TrendingUp, color: 'bg-linear-to-r from-yellow-500 to-yellow-600' },
              { label: 'Prix Maximum', value: `${stats.max} DT`, icon: Target, color: 'bg-linear-to-r from-red-500 to-red-600' },
              { label: 'Populaires', value: stats.popular, icon: Star, color: 'bg-linear-to-r from-purple-500 to-purple-600' },
              { label: 'Premium', value: stats.featured, icon: Award, color: 'bg-linear-to-r from-pink-500 to-pink-600' },
            ].map((stat, idx) => (
              <div key={idx} className={`rounded-xl p-4 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filtres et contrôles */}
          <div className={`rounded-2xl p-4 mb-6 border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-64">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher un service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
                    }`}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`px-4 py-3 rounded-xl border ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' 
                    ? 'bg-linear-to-r from-purple-600 to-purple-800 text-white' 
                    : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' 
                    ? 'bg-linear-to-r from-purple-600 to-purple-800 text-white' 
                    : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

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
          // Vue Grille
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrices.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${darkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50' 
                  : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg'
                }`}
              >
                {/* Bandeau supérieur */}
                <div className={`h-2 bg-linear-to-r ${getCategoryColor(item.category)}`}></div>
                
                <div className="p-5">
                  {/* En-tête de la carte */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryBgColor(item.category)} ${getCategoryTextColor(item.category)}`}>
                          {item.category === 'impression' ? 'Impression' : 'Reliure'}
                        </span>
                        {item.popular && (
                          <span className="text-xs font-semibold px-3 py-1 bg-linear-to-r from-yellow-500 to-yellow-600 text-white rounded-full flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Populaire
                          </span>
                        )}
                        {item.featured && (
                          <span className="text-xs font-semibold px-3 py-1 bg-linear-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            Premium
                          </span>
                        )}
                      </div>
                      <h3 className={`font-bold text-lg mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </h3>
                    </div>
                    <button 
                      onClick={() => deleteService(item.id)}
                      className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                      title="Supprimer le service"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Prix */}
                  {editingId === item.id ? (
                    <div className="space-y-3">
                      <div className="relative">
                        <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className={`w-full pl-10 pr-3 py-3 rounded-xl border ${darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
                          }`}
                          placeholder="0.00"
                          autoFocus
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => savePrice(item.id)}
                          disabled={isSaving}
                          className="flex-1 px-3 py-2 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 transition-all duration-300 flex items-center justify-center"
                        >
                          {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <Save size={16} className="mr-2" />
                              Sauvegarder
                            </>
                          )}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className={`px-3 py-2 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.price.toFixed(2)} <span className="text-lg">{item.unit}</span>
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                            par unité
                          </div>
                        </div>
                        <button
                          onClick={() => startEditing(item.id, item.price)}
                          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                          title="Modifier le prix"
                        >
                          <Edit2 size={20} />
                        </button>
                      </div>
                      <div className={`text-xs text-center pt-2 border-t ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                        Cliquez sur l'icône <Edit2 className="w-3 h-3 inline mx-1" /> pour éditer
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Vue Liste
          <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Package className="w-4 h-4 mr-2" />
                        Service
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Prix
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
                  {filteredPrices.map((item) => (
                    <tr key={item.id} className={`transition-colors ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryBgColor(item.category)}`}>
                            <Tag className={`w-5 h-5 ${getCategoryTextColor(item.category)}`} />
                          </div>
                          <div className="ml-4">
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {item.name}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <DollarSign className={`w-3 h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                {item.unit} / unité
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBgColor(item.category)} ${getCategoryTextColor(item.category)}`}>
                          {item.category === 'impression' ? 'Impression' : 'Reliure'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {editingId === item.id ? (
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className={`w-32 px-3 py-2 rounded-lg border ${darkMode 
                                  ? 'bg-gray-800 border-gray-700 text-white' 
                                  : 'bg-white border-gray-300 text-gray-900'
                                }`}
                                autoFocus
                              />
                            </div>
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{item.unit}</span>
                          </div>
                        ) : (
                          <div>
                            <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {item.price.toFixed(2)} <span className="text-sm">{item.unit}</span>
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {item.popular && (
                            <span className="text-xs font-semibold px-3 py-1 bg-linear-to-r from-yellow-500 to-yellow-600 text-white rounded-full flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              Populaire
                            </span>
                          )}
                          {item.featured && (
                            <span className="text-xs font-semibold px-3 py-1 bg-linear-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center">
                              <Award className="w-3 h-3 mr-1" />
                              Premium
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingId === item.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => savePrice(item.id)}
                              disabled={isSaving}
                              className="px-3 py-2 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg disabled:opacity-50 flex items-center"
                            >
                              {isSaving ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <>
                                  <Save size={14} className="mr-1" />
                                  Sauvegarder
                                </>
                              )}
                            </button>
                            <button
                              onClick={cancelEditing}
                              className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditing(item.id, item.price)}
                              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                              title="Modifier"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteService(item.id)}
                              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Résumé */}
        {filteredPrices.length > 0 && (
          <div className={`mt-8 p-6 rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Résumé des tarifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Services affichés</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {filteredPrices.length} / {prices.length}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Valeur totale</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {filteredPrices.reduce((sum, item) => sum + item.price, 0).toFixed(2)} DT
                </p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Prix moyen</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {(filteredPrices.reduce((sum, item) => sum + item.price, 0) / filteredPrices.length || 0).toFixed(2)} DT
                </p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dernière mise à jour</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Aujourd'hui
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} Kernel Solutions - Tarifications
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Données mises à jour en temps réel
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                {filteredPrices.length} services affichés
              </span>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Vue: <span className="font-medium">{viewMode === 'grid' ? 'Grille' : 'Liste'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tarifications;