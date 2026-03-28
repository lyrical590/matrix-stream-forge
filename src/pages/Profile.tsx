import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import {
  Crown,
  Monitor,
  Type,
  CheckCircle2,
  Lock,
  LogOut,
  History,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { theme, setTheme, font, setFont, isUnlocked, unlockThemes } = useTheme();
  const { history } = useApp();
  const isMatrix = theme === 'matrix';

  const themes = [
    { id: 'matrix', name: 'MATRIX GREEN', color: '#00ff41', premium: false },
    { id: 'neon', name: 'NEON LIGHTS', color: '#ff00ff', premium: true },
    { id: 'cyberpunk', name: 'NIGHT CITY', color: '#fcee0a', premium: true },
    { id: 'classic', name: 'LEGACY', color: '#ffffff', premium: true },
  ];

  const fonts = [
    { id: 'mono', name: 'System Console', style: 'font-mono' },
    { id: 'sans', name: 'Modern Sans', style: 'font-sans' },
    { id: 'serif', name: 'Elegant Serif', style: 'font-serif' },
  ];

  const handleThemeChange = (id: string, isPremium: boolean) => {
    if (isPremium && !isUnlocked) {
      toast.error('This theme requires a System Upgrade (Premium Account)');
      return;
    }
    setTheme(id as any);
    toast.success(`Theme updated: ${id.toUpperCase()}`);
  };

  const handleFontChange = (id: string) => {
    setFont(id as any);
    toast.success(`Font updated: ${id.toUpperCase()}`);
  };

  const upgradeSystem = () => {
    unlockThemes();
    toast.success('SYSTEM UPGRADED: All themes and features unlocked!', {
      icon: <Crown className="text-yellow-400" />
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className={`relative w-32 h-32 rounded-3xl overflow-hidden border-4 flex-shrink-0 ${isMatrix ? 'border-matrix-green shadow-[0_0_20px_rgba(0,255,65,0.4)]' : 'border-white/20'}`}>
          <img
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/cd2cc63c-5f62-47f9-b11a-a672b26f29d6/user-avatar-524e8a67-1774683150521.webp"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-3">
             <h1 className={`text-4xl font-black ${isMatrix ? 'matrix-text' : 'text-white'}`}>LYRICAL_OPERATOR</h1>
             {isUnlocked && <Crown className="text-yellow-500 fill-yellow-500" size={24} />}
          </div>
          <p className={`text-sm font-mono ${isMatrix ? 'text-matrix-dark-green' : 'text-gray-400'}`}>
            USER_ID: 8849-X-2024 | STATUS: {isUnlocked ? 'ADMIN_PRIVILEGED' : 'RESTRICTED_ACCESS'}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <div className={`px-4 py-1 rounded-full text-xs font-bold ${isMatrix ? 'bg-matrix-green/20 text-matrix-green border border-matrix-green/40' : 'bg-white/10'}`}>
              64.2GB DATA USED
            </div>
            <div className={`px-4 py-1 rounded-full text-xs font-bold ${isMatrix ? 'bg-matrix-green/20 text-matrix-green border border-matrix-green/40' : 'bg-white/10'}`}>
              LVL 42 OPERATOR
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className={`p-6 rounded-3xl border ${isMatrix ? 'bg-black border-matrix-green/30' : 'bg-white/5 border-white/10'}`}>
            <div className="flex items-center gap-3 mb-6">
              <Monitor className={isMatrix ? 'text-matrix-green' : 'text-white'} />
              <h2 className={`text-xl font-bold ${isMatrix ? 'matrix-text uppercase' : 'text-white'}`}>Visual Interface</h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className={`text-sm mb-4 ${isMatrix ? 'text-matrix-dark-green' : 'text-gray-400'}`}>Active Theme</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id, t.premium)}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all border
                        ${theme === t.id
                          ? (isMatrix ? 'border-matrix-green bg-matrix-green/10' : 'border-white bg-white/10')
                          : (isMatrix ? 'border-matrix-green/10 bg-black hover:border-matrix-green/40' : 'border-white/5 bg-white/5 hover:bg-white/10')
                        }
                      `}
                    >
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: t.color }} />
                      <span className="text-[10px] font-bold text-center">{t.name}</span>
                      {t.premium && !isUnlocked && (
                        <Lock size={12} className="absolute top-2 right-2 text-gray-500" />
                      )}
                      {theme === t.id && (
                        <CheckCircle2 size={12} className={`absolute top-2 right-2 ${isMatrix ? 'text-matrix-green' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className={`text-sm mb-4 ${isMatrix ? 'text-matrix-dark-green' : 'text-gray-400'}`}>System Font</p>
                <div className="flex flex-wrap gap-3">
                  {fonts.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleFontChange(f.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all border ${f.style}
                        ${font === f.id
                          ? (isMatrix ? 'border-matrix-green bg-matrix-green/10 text-matrix-green' : 'border-white bg-white/10 text-white')
                          : (isMatrix ? 'border-matrix-green/10 bg-black text-matrix-dark-green' : 'border-white/5 bg-white/5 text-gray-400')
                        }
                      `}
                    >
                      <Type size={16} />
                      <span className="text-sm">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {!isUnlocked && (
            <section className={`p-8 rounded-3xl overflow-hidden relative group cursor-pointer
              ${isMatrix ? 'bg-matrix-green text-black' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'}
            `}
            onClick={upgradeSystem}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-black uppercase italic tracking-wider">Lyrical Overload Upgrade</h2>
                  <p className="opacity-80 font-bold">Unlock all experimental themes, custom fonts, and 8K streaming.</p>
                </div>
                <button className="px-8 py-3 bg-black text-white rounded-full font-black text-sm hover:scale-105 transition-transform flex items-center gap-2">
                  <CreditCard size={18} />
                  UPGRADE NOW
                </button>
              </div>
              <Crown className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            </section>
          )}

          <section className={`p-6 rounded-3xl border ${isMatrix ? 'bg-black border-matrix-green/30' : 'bg-white/5 border-white/10'}`}>
            <div className="flex items-center gap-3 mb-6">
              <History className={isMatrix ? 'text-matrix-green' : 'text-white'} />
              <h2 className={`text-xl font-bold ${isMatrix ? 'matrix-text uppercase' : 'text-white'}`}>Recent Logins</h2>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${isMatrix ? 'bg-matrix-green/5' : 'bg-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <p className="text-sm font-bold">Lyrical Node - Sector {i*12}</p>
                      <p className="text-xs text-gray-500">202.16.44.{i*4}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border ${isMatrix ? 'bg-black border-matrix-green/30' : 'bg-white/5 border-white/10'}`}>
             <h3 className={`font-bold mb-4 ${isMatrix ? 'text-matrix-green' : 'text-white'}`}>Account Details</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Member since</span>
                  <span className="font-mono">MAR 2024</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Playtime</span>
                  <span className="font-mono">1,402 hrs</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Storage Used</span>
                  <span className="font-mono">42.8 / 100 GB</span>
                </div>
             </div>
             <div className="h-[1px] bg-white/10 my-6" />
             <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors">
               <LogOut size={18} />
               <span>Terminate Session</span>
             </button>
          </div>

          <div className={`p-6 rounded-3xl border overflow-hidden relative ${isMatrix ? 'bg-black border-matrix-green/30' : 'bg-white/5 border-white/10'}`}>
            <h3 className={`font-bold mb-4 ${isMatrix ? 'text-matrix-green' : 'text-white'}`}>Recent History</h3>
            <div className="space-y-3">
              {history.slice(0, 3).map((v) => (
                <div key={v.id} className="flex gap-2 items-center">
                  <img src={v.thumbnail} className="w-12 h-12 rounded object-cover" alt="" />
                  <p className="text-[10px] line-clamp-1">{v.title}</p>
                </div>
              ))}
              {history.length === 0 && <p className="text-xs text-gray-500 italic">No data recorded yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;