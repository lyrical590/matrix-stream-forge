import React from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import VideoCard from '../components/VideoCard';
import { Download, Trash2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Downloads: React.FC = () => {
  const { downloads, removeDownload } = useApp();
  const { theme } = useTheme();
  const isMatrix = theme === 'matrix';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className={`text-3xl font-bold ${isMatrix ? 'matrix-text uppercase' : 'text-white'}`}>
            {isMatrix ? 'SECURE DATA STORAGE' : 'Offline Downloads'}
          </h1>
          <p className={`${isMatrix ? 'text-matrix-dark-green' : 'text-gray-400'}`}>
            {isMatrix ? '> Local encrypted packages ready for playback.' : 'Videos you can watch without internet connection.'}
          </p>
        </div>
        <div className={`flex items-center gap-3 px-6 py-3 rounded-xl border ${isMatrix ? 'border-matrix-green/30 bg-matrix-green/10 text-matrix-green' : 'border-white/10 bg-white/5 text-white'}`}>
          <Download size={20} />
          <span className="font-mono">{downloads.length} ITEMS</span>
        </div>
      </header>

      {downloads.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {downloads.map((video) => (
            <div key={video.id} className="relative group">
              <VideoCard video={video} />
              <button
                onClick={() => removeDownload(video.id)}
                className={`absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20
                  ${isMatrix ? 'bg-red-500/80 text-white hover:bg-red-600' : 'bg-red-600/80 text-white hover:bg-red-700'}
                `}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center h-[50vh] rounded-3xl border-2 border-dashed
          ${isMatrix ? 'border-matrix-green/20' : 'border-white/10'}
        `}>
          <ShieldAlert size={64} className={`mb-4 opacity-20 ${isMatrix ? 'text-matrix-green' : 'text-white'}`} />
          <p className={`text-xl font-bold ${isMatrix ? 'text-matrix-green' : 'text-white'}`}>No local data detected</p>
          <p className="text-gray-500 mt-2">Start downloading videos to see them here.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Downloads;