import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Play, Download } from 'lucide-react';
import { Video } from '../api/youtube';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { theme } = useTheme();
  const { downloadVideo } = useApp();
  const isMatrix = theme === 'matrix';

  const formatViews = (views?: string) => {
    if (!views) return '';
    const num = parseInt(views);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
    return `${num} views`;
  };

  return (
    <div className={`group relative flex flex-col gap-3 rounded-2xl overflow-hidden transition-all duration-300
      ${isMatrix ? 'hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]' : 'hover:bg-white/5'}
    `}>
      <Link to={`/watch/${video.id}`} className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isMatrix ? 'bg-matrix-green text-black' : 'bg-white text-black'}`}>
            <Play fill="currentColor" size={24} />
          </div>
        </div>
      </Link>

      <div className="flex gap-3 px-2 pb-4">
        <div className="flex-1">
          <Link to={`/watch/${video.id}`}>
            <h3 className={`font-semibold line-clamp-2 text-sm lg:text-base leading-snug mb-1
              ${isMatrix ? 'text-matrix-green group-hover:text-white' : 'text-white group-hover:text-primary'}
            `}>
              {video.title}
            </h3>
          </Link>
          <p className={`text-xs lg:text-sm mb-1 ${isMatrix ? 'text-matrix-dark-green' : 'text-gray-400'}`}>
            {video.channelTitle}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formatViews(video.viewCount)}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(video.publishedAt))} ago</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            downloadVideo(video);
          }}
          className={`p-2 rounded-full transition-colors self-start
            ${isMatrix ? 'text-matrix-dark-green hover:text-matrix-green hover:bg-matrix-green/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}
          `}
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;