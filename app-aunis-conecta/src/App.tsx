import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Users, Calendar, User, Bell, MessageCircle, ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Import Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import CommunityScreen from './screens/CommunityScreen';
import EventsScreen from './screens/EventsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import MentorsScreen from './screens/MentorsScreen';
import NotificationsScreen from './screens/NotificationsScreen';

// --- ROUTE WRAPPER ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- MAIN LAYOUT ---

const Layout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/home', icon: Home, label: 'Home' },
        { path: '/marketplace', icon: ShoppingBag, label: 'Market' },
        { path: '/community', icon: Users, label: 'Comun' },
        { path: '/events', icon: Calendar, label: 'Event' },
        { path: '/profile', icon: User, label: 'Perfil' }
    ];

    const needsNav = ['/home', '/marketplace', '/community', '/events', '/profile', '/mentors', '/notifications', '/chat'].includes(location.pathname);

    return (
        <div className="mobile-app-container">
            {needsNav && (
                <header className="p-6 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-glass">
                    <img src="https://i.ibb.co/Kzcspycr/auniswwhi.png" className="h-6" alt="Aunis" />
                    <div className="flex gap-4">
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate('/notifications')} className="text-dim hover:text-white relative">
                            <Bell size={24} />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red rounded-full border-2 border-black"></span>
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate('/chat')} className="text-dim hover:text-white">
                            <MessageCircle size={24} />
                        </motion.button>
                    </div>
                </header>
            )}

            <main className={`flex-1 overflow-y-auto ${needsNav ? 'pb-24' : ''}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {needsNav && (
                <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-surface-raised/95 backdrop-blur-lg border-t border-glass px-6 py-4 flex justify-between items-center z-50">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-red' : 'text-dim'}`}
                            >
                                <motion.div animate={{ scale: isActive ? 1.2 : 1 }}>
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </motion.div>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            )}
        </div>
    );
};

// --- MAIN APP ---

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Auth Flow */}
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                
                {/* Main App with Nav */}
                <Route path="/home" element={<Layout><HomeScreen /></Layout>} />
                <Route path="/marketplace" element={<Layout><MarketplaceScreen /></Layout>} />
                <Route path="/service-detail" element={<Layout><ServiceDetailScreen /></Layout>} />
                <Route path="/community" element={<Layout><CommunityScreen /></Layout>} />
                <Route path="/events" element={<Layout><EventsScreen /></Layout>} />
                <Route path="/profile" element={<Layout><ProfileScreen /></Layout>} />
                
                {/* Secondary Screens with Nav */}
                <Route path="/chat" element={<Layout><ChatScreen /></Layout>} />
                <Route path="/notifications" element={<Layout><NotificationsScreen /></Layout>} />
                <Route path="/mentors" element={<Layout><MentorsScreen /></Layout>} />
            </Routes>
        </Router>
    );
};

export default App;
