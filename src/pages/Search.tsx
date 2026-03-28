import React, { useState } from 'react';
import { Search as SearchIcon, Loader2, PlayCircle } from 'lucide-react';
import { youtubeApi, Video } from '../api/youtube';
import VideoCard from '../components/VideoCard';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const isMatrix = theme === 'matrix';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const data = await youtubeApi.searchVideos(query);
    setVideos(data);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isMatrix ? '> ENTER SEARCH QUERY...' : 'Search for videos, channels, and more...'}
            className={`w-full px-12 py-4 rounded-full text-lg outline-none transition-all
              ${isMatrix
                ? 'bg-black border-2 border-matrix-dark-green text-matrix-green focus:border-matrix-green focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] placeholder:text-matrix-dark-green/50 font-mono'
                : 'bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-white/20'
              }
            `}
          />
          <SearchIcon
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${isMatrix ? 'text-matrix-green' : 'text-gray-400'}`}
            size={24}
          />
          <button
            type="submit"
            className={`absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full font-bold transition-all
              ${isMatrix
                ? 'bg-matrix-green text-black hover:bg-white'
                : 'bg-white text-black hover:bg-gray-200'
              }
            `}
          >
            SEARCH
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className={`animate-spin ${isMatrix ? 'text-matrix-green' : 'text-white'}`} size={48} />
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 opacity-40">
           <PlayCircle size={64} className="mb-4" />
           <p className="text-xl">Search results will appear here</p>
        </div>
      )}
    </motion.div>
  );
};

export default Search;