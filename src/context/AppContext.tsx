import React, { createContext, useContext, useState, useEffect } from 'react';
import { Video } from '../api/youtube';
import { toast } from 'sonner';

interface AppContextType {
  downloads: Video[];
  history: Video[];
  downloadVideo: (video: Video) => void;
  removeDownload: (videoId: string) => void;
  addToHistory: (video: Video) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [downloads, setDownloads] = useState<Video[]>([]);
  const [history, setHistory] = useState<Video[]>([]);

  useEffect(() => {
    const savedDownloads = localStorage.getItem('app-downloads');
    const savedHistory = localStorage.getItem('app-history');
    if (savedDownloads) {
      try {
        setDownloads(JSON.parse(savedDownloads));
      } catch (e) {
        console.error('Failed to parse downloads', e);
      }
    }
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  const downloadVideo = (video: Video) => {
    if (downloads.find(v => v.id === video.id)) {
      toast.info('Video already in downloads');
      return;
    }
    const newDownloads = [video, ...downloads];
    setDownloads(newDownloads);
    localStorage.setItem('app-downloads', JSON.stringify(newDownloads));
    toast.success('Video saved offline!');
  };

  const removeDownload = (videoId: string) => {
    const newDownloads = downloads.filter(v => v.id !== videoId);
    setDownloads(newDownloads);
    localStorage.setItem('app-downloads', JSON.stringify(newDownloads));
    toast.error('Removed from offline storage');
  };

  const addToHistory = (video: Video) => {
    const filtered = history.filter(v => v.id !== video.id);
    const newHistory = [video, ...filtered].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem('app-history', JSON.stringify(newHistory));
  };

  return (
    <AppContext.Provider value={{ downloads, history, downloadVideo, removeDownload, addToHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};