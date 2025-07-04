import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Plus, X } from 'lucide-react';

interface VideoUploadProps {
  videoUrls: string[];
  onVideoUrlAdd: (url: string) => void;
  onVideoUrlRemove: (index: number) => void;
}

const VideoUpload = ({ videoUrls, onVideoUrlAdd, onVideoUrlRemove }: VideoUploadProps) => {
  const [newVideoUrl, setNewVideoUrl] = React.useState('');

  const handleAddVideo = () => {
    if (newVideoUrl.trim() && videoUrls.length < 3) {
      onVideoUrlAdd(newVideoUrl.trim());
      setNewVideoUrl('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddVideo();
    }
  };

  const isValidVideoUrl = (url: string) => {
    const videoPatterns = [
      /youtube\.com\/watch\?v=/,
      /youtu\.be\//,
      /vimeo\.com\//,
      /\.mp4$/,
      /\.webm$/,
      /\.ogg$/
    ];
    return videoPatterns.some(pattern => pattern.test(url));
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Property Videos (Optional)</Label>
      
      <div className="flex gap-2">
        <Input
          placeholder="Enter video URL (YouTube, Vimeo, or direct video link)"
          value={newVideoUrl}
          onChange={(e) => setNewVideoUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleAddVideo}
          disabled={!newVideoUrl.trim() || videoUrls.length >= 3}
          size="sm"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {videoUrls.length > 0 && (
        <div className="space-y-3">
          {videoUrls.map((url, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Video className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Video {index + 1}</p>
                      <p className="text-xs text-muted-foreground truncate">{url}</p>
                      {!isValidVideoUrl(url) && (
                        <p className="text-xs text-destructive">⚠ URL format may not be supported</p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onVideoUrlRemove(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        <p>• Supported: YouTube, Vimeo, or direct video file links (.mp4, .webm, .ogg)</p>
        <p>• Maximum 3 videos per property</p>
        <p>• Example: https://www.youtube.com/watch?v=VIDEO_ID</p>
      </div>
    </div>
  );
};

export default VideoUpload;