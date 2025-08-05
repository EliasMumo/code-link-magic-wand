
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Home, Heart, GitCompare, Video } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    currency?: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    property_type: string;
    is_available: boolean;
    images?: string[];
    videos?: string[];
  };
  onClick: (property: any) => void;
  onToggleFavorite?: (propertyId: string) => void;
  isFavorite?: boolean;
  onAddToComparison?: (propertyId: string) => void;
  isInComparison?: boolean;
}

const PropertyCard = ({ 
  property, 
  onClick, 
  onToggleFavorite, 
  isFavorite, 
  onAddToComparison,
  isInComparison 
}: PropertyCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(property.id);
  };

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToComparison?.(property.id);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      onClick={() => onClick(property)}
    >
      <div className="relative">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Home className="h-16 w-16 text-blue-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
          )}
          {onAddToComparison && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={handleComparisonClick}
            >
              <GitCompare 
                className={`h-4 w-4 ${isInComparison ? 'text-blue-600' : 'text-gray-600'}`} 
              />
            </Button>
          )}
          <Badge variant={property.is_available ? 'default' : 'secondary'}>
            {property.is_available ? 'Available' : 'Rented'}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-white/90">
            {property.property_type}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            {property.videos && property.videos.length > 0 && (
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-1 text-primary" />
                <span>{property.videos.length}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price, property.currency || 'USD')}/mo
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
