import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Upload, 
  Download,
  Eye,
  EyeOff,
  Bell,
  Shield,
  Globe,
  CreditCard,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Info,
  Moon,
  Sun
} from 'lucide-react';

const Parametre = ({ darkMode }) => {
  // États pour les différents onglets
  const [activeTab, setActiveTab] = useState('entreprise');
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // États pour les données
  const [entrepriseInfo, setEntrepriseInfo] = useState({
    nom: 'Kernel Solution and Innovations',
    logo: '',
    slogan: 'Innovation & Excellence',
    adresse: 'Ben Arous Hamem Linf',
    ville: 'Ben Arous',
    codePostal: '2034',
    telephone: '22458798',
    email: 'kernel@gmail.com',
    siteWeb: 'www.kernel-solutions.tn',
    siret: 'FR 123 456 789',
    tva: 'FR12345678901'
  });

  const [adminInfo, setAdminInfo] = useState({
    nom: 'Gmaty',
    prenom: 'Ayoub',
    email: 'ayou@gmail.com',
    telephone: '55123456',
    motDePasse: 'ayouuuub444',
    nouveauMotDePasse: '',
    confirmerMotDePasse: ''
  });

  const [parametres, setParametres] = useState({
    devise: 'Dinar Tunisien (DT)',
    fuseauHoraire: 'Tunis (GMT+1)',
    langue: 'Français',
    formatDate: 'DD/MM/YYYY',
    notificationsEmail: true,
    notificationsSMS: false,
    backupAutomatique: true,
    backupFrequence: 'quotidien'
  });

  const [securite, setSecurite] = useState({
    deuxFacteurs: false,
    sessionTimeout: '30',
    complexiteMotDePasse: 'moyenne',
    historiqueConnexions: true,
    logsActivites: true
  });

  // Options pour les sélecteurs
  const devisesOptions = [
    'Dinar Tunisien (DT)',
    'Euro (€)',
    'Dollar US ($)',
    'Livre Sterling (£)',
    'Yen (¥)'
  ];

  const fuseauxOptions = [
    'Tunis (GMT+1)',
    'Paris (GMT+1)',
    'Londres (GMT+0)',
    'New York (GMT-5)',
    'Tokyo (GMT+9)',
    'Sydney (GMT+10)'
  ];

  const languesOptions = ['Français', 'Anglais', 'Arabe', 'Espagnol'];

  // Gestionnaires d'événements
  const handleEntrepriseChange = (e) => {
    const { name, value } = e.target;
    setEntrepriseInfo(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleParametreChange = (name, value) => {
    setParametres(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSecuriteChange = (name, value) => {
    setSecurite(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (max 2MB)');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setEntrepriseInfo(prev => ({ ...prev, logo: reader.result }));
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Simulation de sauvegarde
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Ici, vous ajouteriez l'appel API pour sauvegarder les données
    console.log('Données à sauvegarder:', {
      entrepriseInfo,
      adminInfo,
      parametres,
      securite
    });
  };

  
  // Tabs configuration
  const tabs = [
    { id: 'entreprise', label: 'Entreprise', icon: Building },
    { id: 'admin', label: 'Administrateur', icon: User },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className={`p-6 md:p-8 min-h-screen ${darkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-linear-to-r from-purple-600 to-purple-800 rounded-xl">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Paramètres
                </h1>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gérez les paramètres de votre système
                </p>
              </div>
            </div>
            
            
          </div>

          {/* Notification de sauvegarde */}
          {saved && (
            <div className={`mb-6 p-4 rounded-xl flex items-center ${darkMode ? 'bg-green-900/30 border border-green-800/50' : 'bg-green-50 border border-green-200'}`}>
              <CheckCircle className={`w-5 h-5 mr-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                Paramètres sauvegardés avec succès!
              </span>
            </div>
          )}

          {/* Onglets */}
          <div className={`flex space-x-1 rounded-xl p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center ${activeTab === tab.id
                    ? darkMode 
                      ? 'bg-linear-to-r from-purple-600 to-purple-800 text-white shadow-lg' 
                      : 'bg-white text-purple-700 shadow'
                    : darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className={`rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6">
            {/* Onglet Entreprise */}
            {activeTab === 'entreprise' && (
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
                          onChange={handleLogoUpload}
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
                        onChange={handleEntrepriseChange}
                        className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/10'
                        }`}
                        placeholder={field.label}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Onglet Administrateur */}
            {activeTab === 'admin' && (
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
                        onChange={handleAdminChange}
                        className={`w-full px-4 py-3 rounded-xl border ${darkMode 
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
                      className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                        ? 'bg-gray-800 border-gray-700 text-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-500'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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
                        setShow: setShowNewPassword
                      },
                      { 
                        label: 'Confirmer le mot de passe', 
                        name: 'confirmerMotDePasse', 
                        value: adminInfo.confirmerMotDePasse,
                        show: showConfirmPassword,
                        setShow: setShowConfirmPassword
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
                            onChange={handleAdminChange}
                            className={`w-full px-4 py-3 rounded-xl border ${darkMode 
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
            )}

            {/* Onglet Paramètres */}
            {activeTab === 'parametres' && (
              <div>
                <h2 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Settings className="w-6 h-6 mr-3" />
                  Paramètres généraux
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Devise */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      Devise par défaut
                    </label>
                    <select
                      value={parametres.devise}
                      onChange={(e) => handleParametreChange('devise', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {devisesOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fuseau horaire */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <Globe className="w-4 h-4 inline mr-2" />
                      Fuseau horaire
                    </label>
                    <select
                      value={parametres.fuseauHoraire}
                      onChange={(e) => handleParametreChange('fuseauHoraire', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {fuseauxOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Langue */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Langue
                    </label>
                    <select
                      value={parametres.langue}
                      onChange={(e) => handleParametreChange('langue', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {languesOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Format de date */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Format de date
                    </label>
                    <select
                      value={parametres.formatDate}
                      onChange={(e) => handleParametreChange('formatDate', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="DD/MM/YYYY">JJ/MM/AAAA</option>
                      <option value="MM/DD/YYYY">MM/JJ/AAAA</option>
                      <option value="YYYY-MM-DD">AAAA-MM-JJ</option>
                      <option value="DD MMM YYYY">JJ MMM AAAA</option>
                    </select>
                  </div>
                </div>

                {/* Sauvegarde automatique */}
                <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sauvegarde automatique
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Activation de la sauvegarde automatique
                        </p>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Les données sont sauvegardées automatiquement
                        </p>
                      </div>
                      <button
                        onClick={() => handleParametreChange('backupAutomatique', !parametres.backupAutomatique)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${parametres.backupAutomatique 
                          ? 'bg-purple-600' 
                          : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          parametres.backupAutomatique ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    {parametres.backupAutomatique && (
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Fréquence de sauvegarde
                        </label>
                        <div className="flex space-x-2">
                          {['quotidien', 'hebdomadaire', 'mensuel'].map((freq) => (
                            <button
                              key={freq}
                              onClick={() => handleParametreChange('backupFrequence', freq)}
                              className={`px-4 py-2 rounded-lg capitalize ${parametres.backupFrequence === freq
                                ? darkMode 
                                  ? 'bg-purple-600 text-white' 
                                  : 'bg-purple-600 text-white'
                                : darkMode 
                                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {freq}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === 'securite' && (
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
                        onClick={() => handleSecuriteChange('deuxFacteurs', !securite.deuxFacteurs)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securite.deuxFacteurs 
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
                      onChange={(e) => handleSecuriteChange('sessionTimeout', e.target.value)}
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
                          onClick={() => handleSecuriteChange('complexiteMotDePasse', option.value)}
                          className={`flex-1 px-4 py-2 rounded-lg ${securite.complexiteMotDePasse === option.value
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
                          onClick={() => handleSecuriteChange('historiqueConnexions', !securite.historiqueConnexions)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securite.historiqueConnexions 
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
                          onClick={() => handleSecuriteChange('logsActivites', !securite.logsActivites)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securite.logsActivites 
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
            )}

            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
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
                        onClick={() => handleParametreChange('notificationsEmail', !parametres.notificationsEmail)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${parametres.notificationsEmail 
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
                        onClick={() => handleParametreChange('notificationsSMS', !parametres.notificationsSMS)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${parametres.notificationsSMS 
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
                      className={`px-6 py-3 rounded-xl flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Envoyer un email de test
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bouton de sauvegarde */}
          <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>

        {/* Informations système */}
        <div className={`mt-8 p-6 rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Info className="w-5 h-5 mr-2" />
            Informations système
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Version</p>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>2.1.0</p>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dernière sauvegarde</p>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {new Date().toLocaleDateString('fr-FR')} à {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
              </p>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Statut</p>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  Tous les services opérationnels
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} Kernel Solution and Innovations
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Tous droits réservés
              </p>
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Connecté en tant que <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {adminInfo.prenom} {adminInfo.nom}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parametre;