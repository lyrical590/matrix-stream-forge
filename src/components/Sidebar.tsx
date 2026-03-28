import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const isMatrix = theme === 'matrix';

  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/cd2cc63c-5f62-47f9-b11a-a672b26f29d6/lyrical-logo-399125c6-1774684513886.webp";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col sticky top-0 h-screen w-72 border-r ${isMatrix ? 'border-matrix-green/20 bg-black' : 'border-white/10 bg-zinc-950'} z-50`}>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative"
            >
              <img 
                src={logoUrl} 
                alt="Lyrical Logo" 
                className={`w-12 h-12 rounded-2xl object-cover border-2 ${isMatrix ? 'border-matrix-green shadow-[0_0_15px_rgba(0,255,65,0.3)]' : 'border-white/20 shadow-xl'}`}
              />
              {isMatrix && <div className="absolute inset-0 bg-matrix-green/20 blur-xl -z-10 rounded-full" />}
            </motion.div>
            <div className="flex flex-col">
              <span className={`text-2xl font-black tracking-tighter leading-none ${isMatrix ? 'text-matrix-green uppercase' : 'text-white'}`}>
                LYRICAL
              </span>
              <span className={`text-[10px] font-mono tracking-[0.2em] mt-1 ${isMatrix ? 'text-matrix-green/50' : 'text-gray-500'}`}>
                MULTIMEDIA
              </span>
            </div>
          </div>

          <div className={`p-5 rounded-2xl ${isMatrix ? 'bg-matrix-green/5 border border-matrix-green/10' : 'bg-white/5 border border-white/5'}`}>
             <div className="flex items-center justify-between mb-2">
               <p className={`text-[10px] font-mono uppercase tracking-widest ${isMatrix ? 'text-matrix-dark-green' : 'text-gray-500'}`}>Core Hub</p>
               <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMatrix ? 'bg-matrix-green shadow-[0_0_8px_rgba(0,255,65,0.8)]' : 'bg-green-500'}`} />
             </div>
             <p className={`text-sm font-bold font-mono ${isMatrix ? 'text-matrix-green' : 'text-white'}`}>READY FOR_USER</p>
           </div>
        </div>

        <div className="mt-auto p-8 pb-32">
           <div className={`p-5 rounded-2xl ${isMatrix ? 'bg-matrix-green/5 border border-matrix-green/10' : 'bg-white/5 border border-white/5'}`}>
             <div className="flex items-center justify-between mb-2">
               <p className={`text-[10px] font-mono uppercase tracking-widest ${isMatrix ? 'text-matrix-dark-green' : 'text-gray-500'}`}>System Status</p>
               <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMatrix ? 'bg-matrix-green shadow-[0_0_8px_rgba(0,255,65,0.8)]' : 'bg-green-500'}`} />
             </div>
             <p className={`text-lg font-black font-mono ${isMatrix ? 'text-matrix-green' : 'text-white'}`}>STABLE_v1.0.4</p>
           </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;