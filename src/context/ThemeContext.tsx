import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'matrix' | 'neon' | 'cyberpunk' | 'classic';
type Font = 'mono' | 'sans' | 'serif';

interface ThemeContextType {
  theme: Theme;
  font: Font;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
  isUnlocked: boolean;
  unlockThemes: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('matrix');
  const [font, setFont] = useState<Font>('mono');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('app-theme-settings');
    if (saved) {
      try {
        const { theme: sTheme, font: sFont, isUnlocked: sUnlocked } = JSON.parse(saved);
        setTheme(sTheme);
        setFont(sFont);
        setIsUnlocked(sUnlocked);
      } catch (e) {
        console.error('Failed to parse theme settings', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-theme-settings', JSON.stringify({ theme, font, isUnlocked }));
    document.documentElement.className = `theme-${theme} font-${font} ${theme === 'matrix' ? 'matrix-theme' : ''}`;
  }, [theme, font, isUnlocked]);

  const unlockThemes = () => {
    setIsUnlocked(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, font, setTheme, setFont, isUnlocked, unlockThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};