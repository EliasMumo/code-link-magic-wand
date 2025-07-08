import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  className?: string;
}

const VideoPlayer = ({ videoUrl, title = "Property Video", className = "" }: VideoPlayerProps) => {
  const getVideoType = (url: string) => {
    // Check if it's a stored video first
    if (url.includes('property-videos')) {
      return 'stored';
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    }
    if (url.includes('vimeo.com')) {
      return 'vimeo';
    }
    if (url.includes('instagram.com')) {
      return 'instagram';
    }
    if (url.includes('facebook.com')) {
      return 'facebook';
    }
    if (url.includes('tiktok.com')) {
      return 'tiktok';
    }
    if (url.match(/\.(mp4|webm|ogg|mov|avi)$/i)) {
      return 'direct';
    }
    return 'unknown';
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const regex = /vimeo\.com\/(\d+)/;
    const match = url.match(regex);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  };

  const getInstagramEmbedUrl = (url: string) => {
    const regex = /instagram\.com\/p\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? `https://www.instagram.com/p/${match[1]}/embed/` : null;
  };

  const getFacebookEmbedUrl = (url: string) => {
    const encoded = encodeURIComponent(url);
    return `https://www.facebook.com/plugins/video.php?height=314&href=${encoded}&show_text=false&width=560&t=0`;
  };

  const getTikTokEmbedUrl = (url: string) => {
    const regex = /tiktok\.com\/@[^\/]+\/video\/(\d+)/;
    const match = url.match(regex);
    return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
  };

  const videoType = getVideoType(videoUrl);

  const renderVideo = () => {
    switch (videoType) {
      case 'stored':
      case 'direct':
        return (
          <video
            controls
            className="w-full h-full rounded-lg"
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            <source src={videoUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        );

      case 'youtube':
        const youtubeUrl = getYouTubeEmbedUrl(videoUrl);
        return youtubeUrl ? (
          <iframe
            src={youtubeUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        ) : null;

      case 'vimeo':
        const vimeoUrl = getVimeoEmbedUrl(videoUrl);
        return vimeoUrl ? (
          <iframe
            src={vimeoUrl}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        ) : null;

      case 'instagram':
        const instagramUrl = getInstagramEmbedUrl(videoUrl);
        return instagramUrl ? (
          <iframe
            src={instagramUrl}
            title={title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        ) : null;

      case 'facebook':
        const facebookUrl = getFacebookEmbedUrl(videoUrl);
        return facebookUrl ? (
          <iframe
            src={facebookUrl}
            title={title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        ) : null;

      case 'tiktok':
        const tiktokUrl = getTikTokEmbedUrl(videoUrl);
        return tiktokUrl ? (
          <iframe
            src={tiktokUrl}
            title={title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        ) : null;


      default:
        return (
          <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Unsupported video format</p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Video
                </a>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`aspect-video bg-muted rounded-lg overflow-hidden ${className}`}>
      {renderVideo()}
    </div>
  );
};

export default VideoPlayer;