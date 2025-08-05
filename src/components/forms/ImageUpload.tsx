
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  selectedImages: File[];
  imagePreviewUrls: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

const ImageUpload = ({ selectedImages, imagePreviewUrls, onImageUpload, onRemoveImage }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (selectedImages.length >= 10) return;

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      // Create a synthetic event to reuse existing upload logic
      const fileList = imageFiles.reduce((acc, file, index) => {
        acc[index] = file;
        return acc;
      }, {} as any);
      fileList.length = imageFiles.length;
      
      const syntheticEvent = {
        target: {
          files: fileList
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onImageUpload(syntheticEvent);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Property Images</Label>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={onImageUpload}
            disabled={selectedImages.length >= 10}
            className="hidden"
          />
          <label
            htmlFor="images"
            className={`
              flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer
              transition-all duration-200 hover:bg-muted
              ${selectedImages.length >= 10 ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
              ${isDragOver ? 'border-primary bg-muted scale-105' : ''}
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className={`h-8 w-8 ${isDragOver ? 'animate-bounce' : ''}`} />
            <div className="text-center">
              <p className="text-sm font-medium">
                {selectedImages.length >= 10 
                  ? 'Maximum images reached' 
                  : isDragOver 
                    ? 'Drop images here'
                    : 'Click to upload images or drag and drop'
                }
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG or JPEG (MAX. 10 images)
              </p>
            </div>
          </label>
        </div>
      </div>

      {imagePreviewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagePreviewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Upload up to 10 images. First image will be the main photo. Drag and drop supported.
      </p>
    </div>
  );
};

export default ImageUpload;
