import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Watch from './pages/Watch';
import Profile from './pages/Profile';
import Downloads from './pages/Downloads';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import MatrixRain from './components/MatrixRain';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'sonner';
import './styles.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'matrix';
  const isMatrix = theme === 'matrix';

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-500 ${isMatrix ? 'matrix-bg' : 'bg-[#0a0a0a]'}`}>
      {isMatrix && <MatrixRain />}

      {/* Mobile Logo Bar */}
      <div className={`lg:hidden flex items-center justify-between p-4 border-b ${isMatrix ? 'border-matrix-green/20 bg-black/50 backdrop-blur-md' : 'border-white/10 bg-black/30 backdrop-blur-md'} relative z-20`}>
        <div className="flex items-center gap-2">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/cd2cc63c-5f62-47f9-b11a-a672b26f29d6/lyrical-logo-399125c6-1774684513886.webp" 
            alt="Lyrical Logo" 
            className={`w-8 h-8 rounded-lg border ${isMatrix ? 'border-matrix-green/30 shadow-[0_0_5px_rgba(0,255,65,0.3)]' : 'border-white/20'}`}
          />
          <span className={`text-xl font-black tracking-tighter ${isMatrix ? 'matrix-text uppercase' : 'text-white'}`}>Lyrical</span>
        </div>
      </div>

      <Sidebar />

      <main className="flex-1 px-4 lg:px-8 py-8 pb-24 relative z-10 w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/downloads" element={<Downloads />} />
        </Routes>
      </main>

      <BottomNav />
      
      <Toaster position="top-center" richColors theme={theme === 'matrix' ? 'dark' : 'system'} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;