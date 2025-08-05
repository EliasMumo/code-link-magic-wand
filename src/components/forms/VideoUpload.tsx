import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Upload, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface VideoUploadProps {
  videoUrls: string[];
  onVideoUrlAdd: (url: string) => void;
  onVideoUrlRemove: (index: number) => void;
}

const VideoUpload = ({ videoUrls, onVideoUrlAdd, onVideoUrlRemove }: VideoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const processVideoFile = async (file: File) => {
    if (!user) return;

    if (videoUrls.length >= 3) {
      toast({
        title: "Maximum videos reached",
        description: "You can only upload 3 videos per property",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Video files must be under 100MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('property-videos')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('property-videos')
        .getPublicUrl(data.path);

      onVideoUrlAdd(publicUrl);
      
      toast({
        title: "Video uploaded",
        description: "Your video has been uploaded successfully",
      });
    } catch (error: any) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload video",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    await processVideoFile(file);

    // Reset the input
    e.target.value = '';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (uploading || videoUrls.length >= 3) return;

    const files = Array.from(e.dataTransfer.files);
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length > 0) {
      await processVideoFile(videoFiles[0]);
    }
  };

  const handleRemoveVideo = async (index: number) => {
    const videoUrl = videoUrls[index];
    
    // If it's a stored video, delete it from storage
    if (videoUrl.includes('property-videos')) {
      try {
        const path = videoUrl.split('/property-videos/')[1];
        await supabase.storage
          .from('property-videos')
          .remove([path]);
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
    
    onVideoUrlRemove(index);
  };

  const isStoredVideo = (url: string) => {
    return url.includes('property-videos');
  };

  const getVideoName = (url: string, index: number) => {
    if (isStoredVideo(url)) {
      const filename = url.split('/').pop();
      return filename || `Video ${index + 1}`;
    }
    return `Video ${index + 1}`;
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Property Videos (Optional)</Label>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={uploading || videoUrls.length >= 3}
            className="hidden"
          />
          <label
            htmlFor="video-upload"
            className={`
              flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg cursor-pointer
              transition-all duration-200 hover:bg-muted
              ${uploading || videoUrls.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
              ${isDragOver ? 'border-primary bg-muted scale-105' : ''}
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Upload className={`h-5 w-5 ${isDragOver ? 'animate-bounce' : ''}`} />
            )}
            <span className="text-sm">
              {uploading ? 'Uploading...' : isDragOver ? 'Drop video here' : 'Click to upload video or drag and drop'}
            </span>
          </label>
        </div>
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
                      <p className="text-sm font-medium truncate">
                        {getVideoName(url, index)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isStoredVideo(url) ? 'Uploaded video' : 'External video'}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveVideo(index)}
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
        <p>• Upload video files directly or use external links</p>
        <p>• Maximum 3 videos per property</p>
        <p>• Video files must be under 100MB</p>
        <p>• Supported formats: MP4, WebM, MOV, AVI</p>
        <p>• Drag and drop supported</p>
      </div>
    </div>
  );
};

export default VideoUpload;