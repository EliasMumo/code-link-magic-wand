
import React from 'react';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  selectedImages: File[];
  imagePreviewUrls: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

const ImageUpload = ({ selectedImages, imagePreviewUrls, onImageUpload, onRemoveImage }: ImageUploadProps) => {
  return (
    <div>
      <Label htmlFor="images">Property Photos (Max 10)</Label>
      <div className="mt-2">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> property photos
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10 images)</p>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={onImageUpload}
              disabled={selectedImages.length >= 10}
            />
          </label>
        </div>
        
        {/* Image Previews */}
        {imagePreviewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagePreviewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
