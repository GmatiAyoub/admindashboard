import React, { useState } from 'react';
import ParametreHeader from '../components/parametre/ParametreHeader';
import ParametreTabs from '../components/parametre/ParametreTabs';
import EntrepriseTab from '../components/parametre/EntrepriseTab';
import AdminTab from '../components/parametre/AdminTab';
import ParametresTab from '../components/parametre/ParametresTab';
import SecuriteTab from '../components/parametre/SecuriteTab';
import NotificationsTab from '../components/parametre/NotificationsTab';
import SaveButton from '../components/parametre/SaveButton';
import SystemInfo from '../components/parametre/SystemInfo';
import ParametreFooter from '../components/parametre/ParametreFooter';

const Parametre = ({ darkMode }) => {
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
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    console.log('Données à sauvegarder:', {
      entrepriseInfo,
      adminInfo,
      parametres,
      securite
    });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'entreprise':
        return (
          <EntrepriseTab
            entrepriseInfo={entrepriseInfo}
            darkMode={darkMode}
            onLogoUpload={handleLogoUpload}
            onEntrepriseChange={handleEntrepriseChange}
          />
        );
      case 'admin':
        return (
          <AdminTab
            adminInfo={adminInfo}
            darkMode={darkMode}
            showPassword={showPassword}
            showNewPassword={showNewPassword}
            showConfirmPassword={showConfirmPassword}
            onAdminChange={handleAdminChange}
            onShowPasswordChange={setShowPassword}
            onShowNewPasswordChange={setShowNewPassword}
            onShowConfirmPasswordChange={setShowConfirmPassword}
          />
        );
      case 'parametres':
        return (
          <ParametresTab
            parametres={parametres}
            darkMode={darkMode}
            onParametreChange={handleParametreChange}
          />
        );
      case 'securite':
        return (
          <SecuriteTab
            securite={securite}
            darkMode={darkMode}
            onSecuriteChange={handleSecuriteChange}
          />
        );
      case 'notifications':
        return (
          <NotificationsTab
            parametres={parametres}
            darkMode={darkMode}
            onParametreChange={handleParametreChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-6 md:p-8 min-h-screen ${darkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto">
        <ParametreHeader 
          darkMode={darkMode}
          saved={saved}
        />
        
        <ParametreTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          darkMode={darkMode}
        />

        <div className={`rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6">
            {renderActiveTab()}
          </div>

          <SaveButton
            darkMode={darkMode}
            onSave={handleSave}
          />
        </div>

        <SystemInfo darkMode={darkMode} />
        
        <ParametreFooter
          darkMode={darkMode}
          adminInfo={adminInfo}
        />
      </div>
    </div>
  );
};

export default Parametre;