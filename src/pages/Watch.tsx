import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { youtubeApi, Video } from '../api/youtube';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { Loader2, ThumbsUp, Share2, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [related, setRelated] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToHistory, downloadVideo } = useApp();
  const { theme } = useTheme();
  const isMatrix = theme === 'matrix';

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const videoData = await youtubeApi.getVideoDetails(id);
        if (videoData) {
          setVideo(videoData);
          addToHistory(videoData);
          const relatedData = await youtubeApi.searchVideos(videoData.title, 10);
          setRelated(relatedData.filter(v => v.id !== id));
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
      setLoading(false);
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className={`animate-spin ${isMatrix ? 'text-matrix-green' : 'text-white'}`} size={48} />
      </div>
    );
  }

  if (!video) return <div className="text-center p-20">Video not found</div>;

  // Note: Most browsers block autoplay with sound. 
  // Adding mute=1 ensures autoplay works consistently.
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&modestbranding=1&rel=0`;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-6">
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-matrix-green/10 shadow-matrix-green/5">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="space-y-4">
          <h1 className={`text-2xl font-bold ${isMatrix ? 'matrix-text uppercase tracking-tight' : 'text-white'}`}>
            {video.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${isMatrix ? 'bg-matrix-green text-black' : 'bg-white/10 text-white'}`}>
                <span className="text-xl font-bold">{video.channelTitle.charAt(0)}</span>
              </div>
              <div>
                <h3 className={`font-semibold ${isMatrix ? 'text-matrix-green' : 'text-white'}`}>{video.channelTitle}</h3>
                <p className="text-xs text-gray-500">1.2M subscribers</p>
              </div>
              <button className={`ml-4 px-6 py-2 rounded-full font-bold transition-all
                ${isMatrix ? 'bg-matrix-green text-black hover:bg-white' : 'bg-white text-black hover:bg-gray-200'}
              `}>
                SUBSCRIBE
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className={`flex items-center rounded-full overflow-hidden ${isMatrix ? 'bg-black border border-matrix-green/30' : 'bg-white/5'}`}>
                <button className={`flex items-center gap-2 px-4 py-2 transition-colors ${isMatrix ? 'hover:bg-matrix-green/20' : 'hover:bg-white/10'}`}>
                  <ThumbsUp size={18} /> <span>14K</span>
                </button>
                <div className="w-[1px] h-6 bg-white/10" />
                <button className={`px-4 py-2 transition-colors ${isMatrix ? 'hover:bg-matrix-green/20' : 'hover:bg-white/10'}`}>
                  <ThumbsUp size={18} className="rotate-180" />
                </button>
              </div>

              <button
                onClick={() => downloadVideo(video)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                ${isMatrix ? 'bg-black border border-matrix-green/30 hover:bg-matrix-green/10' : 'bg-white/5 hover:bg-white/10'}
              `}>
                <Download size={18} /> <span>Save</span>
              </button>

              <button className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                ${isMatrix ? 'bg-black border border-matrix-green/30 hover:bg-matrix-green/10' : 'bg-white/5 hover:bg-white/10'}
              `}>
                <Share2 size={18} /> <span>Share</span>
              </button>
            </div>
          </div>

          <div className={`p-4 rounded-xl whitespace-pre-wrap text-sm leading-relaxed
            ${isMatrix ? 'bg-matrix-green/5 border border-matrix-green/20 text-matrix-dark-green font-mono' : 'bg-white/5 text-gray-300'}
          `}>
            <p className="font-bold mb-2">
              {parseInt(video.viewCount || '0').toLocaleString()} views • {new Date(video.publishedAt).toLocaleDateString()}
            </p>
            {video.description}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className={`text-xl font-bold px-2 ${isMatrix ? 'matrix-text uppercase' : 'text-white'}`}>Recommended</h2>
        <div className="space-y-4">
          {related.map(rv => (
            <Link
              key={rv.id}
              to={`/watch/${rv.id}`}
              className="flex gap-3 group"
            >
              <div className="relative w-40 aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-gray-900 border border-matrix-green/5">
                <img src={rv.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold line-clamp-2 leading-tight mb-1
                  ${isMatrix ? 'text-matrix-green group-hover:text-white font-mono' : 'text-white'}
                `}>
                  {rv.title}
                </h4>
                <p className={`text-xs ${isMatrix ? 'text-matrix-dark-green' : 'text-gray-400'}`}>{rv.channelTitle}</p>
                <p className="text-[10px] text-gray-500">{formatDistanceToNow(new Date(rv.publishedAt))} ago</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;