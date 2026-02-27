// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaCog, FaSignOutAlt, FaBell, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: "Features", href: "#" },
    { name: "Services", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "How it works", href: "#" },
    { name: "Contact us", href: "#" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setProfileOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get user display name or username
  const getDisplayName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    } else if (currentUser?.email) {
      // Extract username from email (for phone-based signups)
      const emailParts = currentUser.email.split('@');
      if (emailParts[0] && emailParts[1] === 'tegbar.phone') {
        // It's a phone-based user, show formatted phone
        return currentUser.email.split('@')[0].replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
      return emailParts[0];
    }
    return "User";
  };

  // Get initials for avatar
  const getInitials = () => {
    const name = getDisplayName();
    if (name.includes('@') || name.includes('-')) {
      // For email or phone, use first two characters
      return name.substring(0, 2).toUpperCase();
    }
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get random gradient color based on user id
  const getAvatarColor = () => {
    const colors = [
      'from-[#FF6B6B] to-[#FF9F6B]', // coral to orange
      'from-[#4EC5B1] to-[#6C63FF]', // teal to purple
      'from-[#5B6CFF] to-[#B8B5FF]', // blue to lilac
      'from-[#FFB86B] to-[#FF7A7A]', // orange to coral
      'from-[#6C63FF] to-[#4EC5B1]', // purple to teal
    ];
    
    // Use user uid to pick consistent color
    const index = currentUser?.uid 
      ? currentUser.uid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
      : 0;
    
    return colors[index];
  };

  // Mock notifications (replace with real notifications later)
  const notifications = [
    { id: 1, text: "Welcome to Tegbar! 🎉", time: "Just now", read: false },
    { id: 2, text: "Your profile is 80% complete", time: "2 hours ago", read: false },
    { id: 3, text: "New feature available", time: "1 day ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-[#F2F2F7] shadow-[0_4px_12px_rgba(0,0,0,0.05)] font-outfit sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* logo / brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight hover:text-[#6C63FF] transition-colors duration-200">
              Tegbar
            </Link>
          </div>

          {/* center links - hide on mobile */}
          <div className="hidden md:flex md:space-x-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#6B6B70] hover:text-[#1C1C1E] hover:bg-[#E5E5EA] px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.05)]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* right side - auth buttons or user profile */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {currentUser ? (
              // User is logged in - show profile and notifications
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-[#6B6B70] hover:text-[#1C1C1E] hover:bg-white rounded-2xl transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.05)]"
                  >
                    <FaBell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF7A7A] rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications dropdown */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] py-2 z-50">
                      <div className="px-4 py-3 border-b border-[#E5E5EA]">
                        <h3 className="font-bold text-[#111111]">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`px-4 py-3 hover:bg-[#F2F2F7] transition-colors duration-200 ${
                                !notif.read ? 'bg-[#F2F2F7]' : ''
                              }`}
                            >
                              <p className="text-sm text-[#111111]">{notif.text}</p>
                              <p className="text-xs text-[#9A9AA0] mt-1">{notif.time}</p>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-[#6B6B70]">
                            No notifications
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-3 border-t border-[#E5E5EA]">
                        <button className="text-sm text-[#1C1C1E] font-semibold hover:underline w-full text-center">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User profile dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-2xl hover:bg-white transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.05)] group"
                  >
                    {/* Avatar with gradient */}
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${getAvatarColor()} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                      {getInitials()}
                    </div>
                    
                    {/* User info */}
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-semibold text-[#111111] max-w-[150px] truncate">
                        {getDisplayName()}
                      </p>
                      <p className="text-xs text-[#6B6B70]">
                        {currentUser.emailVerified ? '✓ Verified' : 'Verify email'}
                      </p>
                    </div>
                    
                    <FaChevronDown className={`h-4 w-4 text-[#6B6B70] transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile dropdown menu */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-[0_10px_0_#E5E5EA,0_12px_24px_rgba(0,0,0,0.1)] py-2 z-50">
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-[#E5E5EA]">
                        <p className="text-sm font-semibold text-[#111111]">{getDisplayName()}</p>
                        <p className="text-xs text-[#6B6B70] truncate">{currentUser.email}</p>
                        {!currentUser.emailVerified && (
                          <Link 
                            to="/verify-email"
                            className="text-xs text-[#FF7A7A] font-semibold hover:underline mt-1 inline-block"
                            onClick={() => setProfileOpen(false)}
                          >
                            ⚠ Verify email
                          </Link>
                        )}
                      </div>

                      {/* Menu items */}
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-[#111111] hover:bg-[#F2F2F7] transition-colors duration-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FaUser className="h-4 w-4 mr-3 text-[#6B6B70]" />
                        <span className="text-sm">Your Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-3 text-[#111111] hover:bg-[#F2F2F7] transition-colors duration-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FaCog className="h-4 w-4 mr-3 text-[#6B6B70]" />
                        <span className="text-sm">Settings</span>
                      </Link>

                      <div className="border-t border-[#E5E5EA] my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-[#FF7A7A] hover:bg-[#F2F2F7] transition-colors duration-200"
                      >
                        <FaSignOutAlt className="h-4 w-4 mr-3" />
                        <span className="text-sm font-semibold">Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // User is not logged in - show login/signup buttons
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-[#1C1C1E] bg-white rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1C1C1E] rounded-2xl shadow-[0_8px_0_#000000,0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_8px_16px_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all duration-200"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile notifications badge */}
            {currentUser && unreadCount > 0 && (
              <div className="relative">
                <FaBell className="h-5 w-5 text-[#6B6B70]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF7A7A] rounded-full text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="text-[#6B6B70] hover:text-[#1C1C1E] p-2 rounded-2xl hover:bg-white hover:shadow-[0_4px_8px_rgba(0,0,0,0.05)] focus:outline-none transition-all duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-[#F2F2F7] border-t border-[#E5E5EA] shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {/* Mobile user profile section */}
            {currentUser && (
              <div className="mb-4 p-4 bg-white rounded-3xl shadow-[0_4px_8px_rgba(0,0,0,0.05)]">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getAvatarColor()} flex items-center justify-center text-white font-bold text-xl`}>
                    {getInitials()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#111111]">{getDisplayName()}</p>
                    <p className="text-xs text-[#6B6B70] truncate">{currentUser.email}</p>
                  </div>
                </div>
                
                {/* Mobile quick actions */}
                <div className="flex mt-3 space-x-2">
                  <Link
                    to="/profile"
                    className="flex-1 text-center py-2 text-sm text-[#1C1C1E] bg-[#F2F2F7] rounded-xl"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex-1 text-center py-2 text-sm text-[#1C1C1E] bg-[#F2F2F7] rounded-xl"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2 text-sm text-[#FF7A7A] bg-[#F2F2F7] rounded-xl"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}

            {/* Navigation links */}
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-[#6B6B70] hover:text-[#1C1C1E] hover:bg-[#E5E5EA] px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.05)]"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile auth buttons (only if not logged in) */}
            {!currentUser && (
              <div className="pt-3 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 text-[#1C1C1E] bg-white font-semibold rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-3 text-white font-semibold rounded-2xl bg-[#1C1C1E] shadow-[0_8px_0_#000000,0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_8px_16px_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}