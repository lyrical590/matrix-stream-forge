import axios from 'axios';

const API_KEY = 'AIzaSyD-arluaFfSq6EbDsYCcNC2OwzqNIL6iIE';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  viewCount?: string;
  publishedAt: string;
  description?: string;
  channelId?: string;
}

export const youtubeApi = {
  getTrendingVideos: async (maxResults = 24) => {
    try {
      const response = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          regionCode: 'US',
          maxResults,
          key: API_KEY,
        },
      });
      return response.data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics.viewCount,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
      }));
    } catch (error) {
      console.error('Error fetching trending videos:', error);
      return [];
    }
  },

  searchVideos: async (query: string, maxResults = 24) => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults,
          key: API_KEY,
        },
      });
      return response.data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
      }));
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  },

  getVideoDetails: async (videoId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'snippet,statistics',
          id: videoId,
          key: API_KEY,
        },
      });
      const item = response.data.items[0];
      if (!item) return null;
      return {
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics.viewCount,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
      };
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  }
};