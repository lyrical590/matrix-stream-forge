import React, { useState, useEffect } from 'react';
import { youtubeApi, Video } from '../api/youtube';
import VideoCard from '../components/VideoCard';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isMatrix = theme === 'matrix';

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await youtubeApi.getTrendingVideos(24);
      setVideos(data);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className={`animate-spin ${isMatrix ? 'text-matrix-green' : 'text-white'}`} size={48} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex flex-col gap-2">
        <h1 className={`text-3xl font-bold tracking-tight ${isMatrix ? 'matrix-text uppercase' : 'text-white'}`}>
          {isMatrix ? 'SYSTEM FEED: ACTIVE' : 'Trending Now'}
        </h1>
        <p className={`${isMatrix ? 'text-matrix-dark-green' : 'text-gray-400'}`}>
          {isMatrix ? '> Scanning worldwide network for trending visual data packages...' : 'Explore the most popular videos across the globe.'}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </motion.div>
  );
};

export default Home;