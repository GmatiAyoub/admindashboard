import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Tag, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  HelpCircle,
  BarChart3,
  Users
} from 'lucide-react';

const Sidebar = ({ darkMode, setDarkMode, setSidebarWidth }) => { // Ajoutez setSidebarWidth
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { path: '/', label: 'Tableau de Bord', icon: <Home size={22} /> },
    { path: '/commandes', label: 'Commandes', icon: <ShoppingBag size={22} />, badge: '12' },
    { path: '/tarification', label: 'Tarification', icon: <Tag size={22} /> },
    { path: '/parametre', label: 'Paramètre', icon: <Settings size={22} /> },
  ];

  const sidebarWidth = !isExpanded && !isHovered ? 'w-20' : 'w-64';

  // Mettez à jour la largeur dans le parent quand elle change
  React.useEffect(() => {
    if (setSidebarWidth) {
      setSidebarWidth(sidebarWidth);
    }
  }, [sidebarWidth, setSidebarWidth]);

  // Fonction pour basculer l'état de la sidebar
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`${sidebarWidth} min-h-screen fixed left-0 top-0 z-30 border-r transition-all duration-300 ease-in-out ${
        darkMode 
          ? 'bg-[#321168] border-[#852EC7]/30' 
          : 'bg-white border-gray-100 shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bouton de toggle */}
      <button
        onClick={toggleSidebar}
        className={`absolute -right-3 top-6 z-20 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-transform ${
          !isExpanded && !isHovered ? 'opacity-0 rotate-180' : 'opacity-100'
        } ${
          darkMode 
            ? 'bg-[#852EC7] text-white hover:bg-[#6CC998]' 
            : 'bg-[#321168] text-white hover:bg-[#852EC7]'
        }`}
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo */}
      <div className={`p-6 border-b transition-all duration-300 ${
        darkMode ? 'border-[#852EC7]/30' : 'border-gray-100'
      } ${!isExpanded && !isHovered ? 'p-4' : ''}`}>
        <div className={`flex items-center ${!isExpanded && !isHovered ? 'justify-center' : 'gap-3'}`}>
          <div className={`rounded-lg flex items-center justify-center ${
            darkMode 
              ? 'bg-linear-to-br from-[#852EC7] to-[#6CC998]' 
              : 'bg-linear-to-br from-[#321168] to-[#6CC998]'
          } ${!isExpanded && !isHovered ? 'w-10 h-10' : 'w-12 h-12'}`}>
            <span className="text-white font-bold text-lg">KS</span>
          </div>
          {(isExpanded || isHovered) && (
            <div className="transition-all duration-300 overflow-hidden">
              <h1 className={`text-xl font-bold truncate ${
                darkMode ? 'text-white' : 'text-[#252547]'
              }`}>
                ADMIND
              </h1>
              <p className={`text-xs mt-1 truncate ${
                darkMode ? 'text-[#AE93AA]' : 'text-gray-600'
              }`}>
                Kernel Solutions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Mode Sombre */}
      {(isExpanded || isHovered) && (
        <div className={`px-4 py-3 border-b ${
          darkMode ? 'border-[#852EC7]/30' : 'border-gray-100'
        }`}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
              darkMode ? 'bg-[#252547] hover:bg-[#252547]/80' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-[#6CC998]/20' : 'bg-[#321168]/20'
              }`}>
                {darkMode ? <Moon size={14} className="text-[#AE93AA]" /> : <Sun size={14} className="text-[#321168]" />}
              </div>
              <span className={`font-medium text-sm ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Mode {darkMode ? 'Sombre' : 'Clair'}
              </span>
            </div>
            <div className={`relative inline-flex h-5 w-10 items-center rounded-full ${
              darkMode ? 'bg-[#6CC998]' : 'bg-[#321168]'
            }`}>
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </div>
          </button>
        </div>
      )}

      {/* Menu principal */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const showLabel = isExpanded || isHovered;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center ${showLabel ? 'justify-between px-3' : 'justify-center'} py-3 rounded-lg transition-all duration-200 group relative`}
                >
                  <div className={`flex items-center ${showLabel ? 'gap-3' : ''}`}>
                    <div className={`relative p-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? darkMode
                          ? 'bg-[#852EC7] text-white shadow-lg' 
                          : 'bg-[#321168] text-white shadow-lg'
                        : darkMode
                          ? 'bg-[#252547] text-[#AE93AA] group-hover:bg-[#852EC7] group-hover:text-white'
                          : 'bg-gray-100 text-[#321168] group-hover:bg-[#321168] group-hover:text-white'
                    }`}>
                      {item.icon}
                      {!showLabel && isActive && (
                        <div className={`absolute -right-1 -top-1 w-2 h-2 rounded-full ${
                          darkMode ? 'bg-[#6CC998]' : 'bg-[#6CC998]'
                        }`} />
                      )}
                    </div>
                    {showLabel && (
                      <span className={`font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? darkMode
                            ? 'text-white font-semibold'
                            : 'text-[#321168] font-semibold'
                          : darkMode
                            ? 'text-[#AE93AA] group-hover:text-white'
                            : 'text-gray-700 group-hover:text-[#321168]'
                      }`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {showLabel && item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                      isActive 
                        ? darkMode
                          ? 'bg-white text-[#321168]'
                          : 'bg-white text-[#321168]'
                        : darkMode
                          ? 'bg-[#852EC7] text-white'
                          : 'bg-[#321168] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Section Système */}
      {(isExpanded || isHovered) && (
        <div className="absolute bottom-24 w-full px-4">
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-[#252547]/50' : 'bg-gray-50 border border-gray-100'
          }`}>
            <h3 className={`text-sm font-semibold mb-1 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Système
            </h3>
            <p className={`text-xs ${
              darkMode ? 'text-[#AE93AA]' : 'text-gray-600'
            }`}>
              Kernel Solutions
            </p>
            <p className={`text-xs mt-1 ${
              darkMode ? 'text-[#AE93AA]' : 'text-gray-600'
            }`}>
              Version 2.1.0
            </p>
          </div>
        </div>
      )}

      {/* Footer du sidebar */}
      <div className={`absolute bottom-0 w-full p-4 border-t ${
        darkMode ? 'border-[#852EC7]/30' : 'border-gray-100'
      }`}>
        <div className={`flex items-center ${!isExpanded && !isHovered ? 'justify-center' : 'gap-3'} p-3 rounded-lg transition-colors ${
          darkMode ? 'bg-[#252547] hover:bg-[#252547]/80' : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'
        }`}>
          <div className={`rounded-full flex items-center justify-center font-bold ${
            darkMode 
              ? 'bg-linear-to-br from-[#852EC7] to-[#6CC998] text-white' 
              : 'bg-linear-to-br from-[#321168] to-[#6CC998] text-white'
          } ${!isExpanded && !isHovered ? 'w-10 h-10' : 'w-10 h-10'}`}>
            <Users size={20} />
          </div>
          {(isExpanded || isHovered) && (
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Ayoub Gmaty
              </p>
              <p className={`text-xs truncate ${
                darkMode ? 'text-[#AE93AA]' : 'text-gray-500'
              }`}>
                Administrateur
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;