// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, 
  FaCalendarAlt, 
  FaBell, 
  FaUsers, 
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaRocket,
  FaClipboardList,
  FaBrain,
  FaFlag,
  FaRegBell,
  FaRegEye,
  FaLightbulb,
  FaHeartbeat,
  FaUserFriends,
  FaStar,
  FaRegCalendarAlt,
  FaRegCheckCircle,
  FaBalanceScale
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  // prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingLeft = '3rem';
    } else {
      document.body.style.paddingLeft = '';
    }
    return () => {
      document.body.style.paddingLeft = '';
    };
  }, [isMobile, isOpen]);

  // add minimal padding to body on mobile when menu button is visible
  useEffect(() => {
    if (isMobile && !isOpen) {
      document.body.style.paddingLeft = '3rem';
    } else {
      document.body.style.paddingLeft = '';
    }
    return () => {
      document.body.style.paddingLeft = '';
    };
  }, [isMobile, isOpen]);

  const menuItems = [
    // Main Dashboard
    { path: "/dashboard", name: "Dashboard", icon: FaHome, section: "main" },
    
    // Timeline Views (single item)
    { path: "/timeline", name: "Timeline Views", icon: FaCalendarAlt, section: "timeline" },
    
    // Smart Features
    { path: "/reminders", name: "Smart Reminders", icon: FaBell, section: "smart" },
    { path: "/workload", name: "Workload Awareness", icon: FaBalanceScale, section: "smart" },
    { path: "/personal-tasks", name: "Personal Tasks", icon: FaClipboardList, section: "smart" },
    { path: "/study-planner", name: "Study Planner", icon: FaBrain, section: "smart" },
    { path: "/priority", name: "Priority System", icon: FaFlag, section: "smart" },
    { path: "/progress", name: "Progress Tracking", icon: FaRegCheckCircle, section: "smart" },
    { path: "/focus", name: "Focus Mode", icon: FaRegEye, section: "smart" },
    { path: "/notifications", name: "Notifications Hub", icon: FaRegBell, section: "smart" },
    
    // Bonus Features
    { path: "/group-collab", name: "Group Collaboration", icon: FaUserFriends, section: "bonus" },
    { path: "/stress-indicator", name: "Stress Indicator", icon: FaHeartbeat, section: "bonus" },
    { path: "/smart-suggestions", name: "Smart Suggestions", icon: FaLightbulb, section: "bonus" },
    
    // Settings
    { path: "/settings", name: "Settings", icon: FaCog, section: "settings" },
  ];

  const sections = [
    { id: "main", name: "MAIN", icon: FaHome },
    { id: "timeline", name: "TIMELINE", icon: FaCalendarAlt },
    { id: "smart", name: "SMART FEATURES", icon: FaRocket },
    { id: "bonus", name: "BONUS FEATURES", icon: FaStar },
    { id: "settings", name: "SETTINGS", icon: FaCog },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return "U";
  };

  return (
    <>
      {/* Mobile menu button - only show when closed */}
      {!isOpen && (
        <button
          id="menu-button"
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-[#1C1C1E] text-white rounded-xl shadow-[0_4px_0_#000000] hover:translate-y-1 transition-all duration-200"
        >
          <FaBars className="h-5 w-5" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed top-0 left-0 z-40 h-full bg-white shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)]
          transition-transform duration-300 ease-in-out
          w-full sm:w-52 lg:w-60 overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-4 lg:p-5">
          
          {/* Logo */}
          <div className="mb-6 pt-4 lg:pt-6 relative">
            <Link to="/" className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
              Tegbar
            </Link>
            {/* close button inside sidebar for mobile */}
            {isOpen && isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute top-0 right-0 mt-3 mr-3 p-2 bg-transparent text-[#1C1C1E] hover:text-[#6B6B70] lg:hidden"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* User info */}
          <div className="mb-6 p-3 bg-[#F2F2F7] rounded-2xl border border-[#E5E5EA]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#1C1C1E] flex items-center justify-center text-white font-bold shadow-[0_4px_0_#000000]">
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#111111] truncate text-sm lg:text-base">
                  {currentUser?.displayName || "Student"}
                </p>
                <p className="text-xs text-[#6B6B70] truncate">
                  {currentUser?.email || "student@university.edu"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              const sectionItems = menuItems.filter(item => item.section === section.id);
              
              if (sectionItems.length === 0) return null;

              return (
                <div key={section.id} className="mb-5">
                  {/* Section header */}
                  <div className="flex items-center gap-2 px-4 mb-2">
                    <SectionIcon className="h-3 w-3 text-[#9A9AA0]" />
                    <h3 className="text-xs font-semibold text-[#9A9AA0] tracking-wider">
                      {section.name}
                    </h3>
                  </div>

                  {/* Section items */}
                  <ul className="space-y-1">
                    {sectionItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            onClick={() => {
                              if (isMobile) setIsOpen(false);
                            }}
                            className={`
                              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group
                              ${isActive 
                                ? 'bg-[#1C1C1E] text-white shadow-[0_4px_0_#000000]' 
                                : 'text-[#6B6B70] hover:bg-[#F2F2F7] hover:text-[#111111]'
                              }
                            `}
                          >
                            <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#9A9AA0] group-hover:text-[#111111]'}`} />
                            <span className="text-sm font-medium truncate">{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 mt-2 text-[#6B6B70] hover:bg-[#F2F2F7] hover:text-[#1C1C1E] rounded-xl transition-colors"
          >
            <FaSignOutAlt className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>

          {/* Version info */}
          <div className="mt-4 px-4 py-2 border-t border-[#E5E5EA]">
            <p className="text-xs text-[#9A9AA0]">Version 2.0.0</p>
            <p className="text-xs text-[#9A9AA0] mt-1">© 2024 Tegbar</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}