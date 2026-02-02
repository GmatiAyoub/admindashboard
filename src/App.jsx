import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Commandes from "./pages/Commandes";
import Parametre from "./pages/Parametre";
import Tarifications from "./pages/Tarifications";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('w-64'); // État pour la largeur de la sidebar

  return (
    <Router>
      <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Sidebar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          setSidebarWidth={setSidebarWidth} // Passez la fonction setSidebarWidth
        />
        
        {/* Contenu principal avec padding dynamique */}
        <div 
          className={`flex-1 min-h-screen transition-all duration-300 ${
            sidebarWidth === 'w-20' ? 'ml-20' : 'ml-64'
          } ${
            darkMode 
              ? 'bg-linear-to-br from-gray-900 to-gray-800 text-gray-100' 
              : 'bg-linear-to-br from-gray-50 to-blue-50 text-gray-900'
          }`}
        >
          <Routes>
            <Route path="/" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/commandes" element={<Commandes darkMode={darkMode} />} />
            <Route path="/tarification" element={<Tarifications darkMode={darkMode} />} />
            <Route path="/parametre" element={<Parametre darkMode={darkMode} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;