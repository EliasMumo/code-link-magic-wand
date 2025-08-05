import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Home } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
}

const ImageGallery = ({ images, title, className = "" }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasImages = images && images.length > 0;

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!hasImages) {
    return (
      <div className={`bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center ${className}`}>
        <Home className="h-16 w-16 text-blue-400" />
      </div>
    );
  }

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main image */}
        <img 
          src={images[selectedImageIndex]} 
          alt={`${title} - Photo ${selectedImageIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openModal(selectedImageIndex)}
        />
        
        {/* Image count badge */}
        {images.length > 1 && (
          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
        
        {/* Navigation arrows for multiple images */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {/* Thumbnail strip for multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 bg-black/50 rounded p-1">
            {images.slice(0, 5).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(index);
                }}
              />
            ))}
            {images.length > 5 && (
              <span className="text-white text-xs ml-1">+{images.length - 5}</span>
            )}
          </div>
        )}
      </div>

      {/* Modal for fullscreen viewing */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0">
          <DialogHeader className="absolute top-4 left-4 z-10 bg-black/70 text-white rounded p-2">
            <DialogTitle className="text-sm">
              {title} - Photo {selectedImageIndex + 1} of {images.length}
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img 
              src={images[selectedImageIndex]} 
              alt={`${title} - Photo ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="lg"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Thumbnail navigation */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/70 rounded p-2 max-w-full overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                    index === selectedImageIndex ? 'border-white' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;