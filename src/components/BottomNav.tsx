import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Download, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNav: React.FC = () => {
  const { theme } = useTheme();
  const isMatrix = theme === 'matrix';

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Download, label: 'Downloads', path: '/downloads' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 w-full border-t flex justify-around items-center px-4 py-2 z-[100] backdrop-blur-3xl transition-all duration-500 ${isMatrix ? 'bg-black/90 border-matrix-green/20' : 'bg-zinc-950/90 border-white/10'}`}>
      <div className="max-w-4xl w-full mx-auto flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex flex-col items-center gap-1 group py-2 px-4 rounded-xl transition-all duration-300
              ${isActive
                ? (isMatrix ? 'text-matrix-green' : 'text-white')
                : (isMatrix ? 'text-matrix-dark-green hover:text-matrix-green/60' : 'text-gray-500 hover:text-white/60')
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${isActive ? (isMatrix ? 'bg-matrix-green/10' : 'bg-white/10') : ''}`}>
                  <item.icon size={22} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`absolute -top-1 inset-x-0 mx-auto w-8 h-0.5 rounded-full ${isMatrix ? 'bg-matrix-green shadow-[0_0_12px_#00ff41]' : 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]'}`}
                    />
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;