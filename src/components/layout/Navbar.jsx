import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAIStore } from '../../store/aiStore';
import axiosInstance from '../../api/axiosInstance';
import NotificationCenter from '../NotificationCenter';
import {
  BookOpen, Calendar, Home, LogOut, Menu, X, MessageCircle,
  Bell, User, ChevronDown, Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifUnread, setNotifUnread] = useState(0);
  const { togglePanel } = useAIStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      const fetchUnread = async () => {
        try {
          const { data } = await axiosInstance.get('/notifications/unread-count/' + user.userId);
          setNotifUnread(data);
        } catch (err) {
          console.error("Failed to fetch unread count", err);
        }
      };
      fetchUnread();
      const interval = setInterval(fetchUnread, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/pujas', label: 'Pujas', icon: BookOpen },
    { to: '/panchang', label: 'Panchang', icon: Calendar },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50
                    bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950
                    border-b border-orange-500/20 shadow-sacred">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-saffron flex items-center justify-center shadow-saffron animate-glow">
              <span className="text-white font-bold text-lg">🪔</span>
            </div>
            <span className="font-devanagari text-orange-300 font-bold text-lg hidden sm:block tracking-wide">
              पुरोहित दर्पण
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}
                className={"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 " + 
                           (isActive(to) 
                             ? "bg-orange-500/20 text-orange-300 border border-orange-500/30" 
                             : "text-orange-200/70 hover:text-orange-200 hover:bg-orange-500/10")}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          {/* Right: AI + bells + profile */}
          <div className="flex items-center gap-2">

            {/* AI Guru button */}
            <button
              onClick={togglePanel}
              className="flex items-center gap-2 px-3 py-2 rounded-lg
                         bg-gradient-to-r from-orange-600 to-amber-600
                         text-white text-sm font-medium
                         hover:from-orange-500 hover:to-amber-500
                         transition-all duration-200 shadow-saffron
                         hidden sm:flex">
              <Sparkles size={14} />
              Ask Guru
            </button>

            {/* Mobile AI button */}
            <button
              onClick={togglePanel}
              className="sm:hidden p-2 rounded-lg text-orange-300 hover:bg-orange-500/10">
              <MessageCircle size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-lg text-orange-300/70 hover:text-orange-300 hover:bg-orange-500/10 transition-all relative">
                <Bell size={20} />
                {notifUnread > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-stone-950 rounded-full animate-pulse" />
                )}
              </button>
              <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                           text-orange-200 hover:bg-orange-500/10 transition-all">
                <div className="w-7 h-7 rounded-full bg-gradient-saffron flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span className="text-sm hidden sm:block">{user?.fullName?.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48
                               bg-stone-900 border border-orange-500/20
                               rounded-xl shadow-sacred overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-orange-500/10">
                    <p className="text-orange-200 text-sm font-medium">{user?.fullName}</p>
                    <p className="text-orange-400/60 text-xs">{user?.role}</p>
                  </div>
                  <Link
                    to="/settings/notifications"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3
                               text-orange-200 hover:bg-orange-500/10 text-sm transition-all">
                    <Bell size={15} />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3
                               text-red-400 hover:bg-red-500/10 text-sm transition-all border-t border-orange-500/5">
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-orange-300 hover:bg-orange-500/10 rounded-lg">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-orange-500/20 py-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}
                onClick={() => setMobileOpen(false)}
                className={"flex items-center gap-3 px-4 py-3 rounded-lg text-sm " + 
                           (isActive(to)
                             ? "bg-orange-500/20 text-orange-300"
                             : "text-orange-200/70 hover:bg-orange-500/10 hover:text-orange-200")}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}