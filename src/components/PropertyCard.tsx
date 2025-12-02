
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Home, Heart, GitCompare, Video, Camera, Users } from 'lucide-react';
import { formatPrice } from '@/lib/currency';
import ImageGallery from './ImageGallery';

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
    vacancy_count?: number;
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
      className="cursor-pointer group hover:shadow-elegant transition-all duration-300 overflow-hidden border-border/50 bg-card/98 hover:border-accent/30"
      onClick={() => onClick(property)}
    >
      <div className="relative">
        <ImageGallery 
          images={property.images || []}
          title={property.title}
          className="h-48"
        />
        {/* Elegant overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div className="absolute top-3 right-3 flex gap-2">
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 bg-card/95 backdrop-blur-sm hover:bg-card border border-border/50 shadow-soft"
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
              />
            </Button>
          )}
          {onAddToComparison && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 bg-card/95 backdrop-blur-sm hover:bg-card border border-border/50 shadow-soft"
              onClick={handleComparisonClick}
            >
              <GitCompare 
                className={`h-4 w-4 transition-colors ${isInComparison ? 'text-accent' : 'text-muted-foreground'}`} 
              />
            </Button>
          )}
          <div className="flex gap-1.5">
            <Badge 
              variant={property.is_available ? 'default' : 'secondary'}
              className={property.is_available 
                ? 'bg-accent text-accent-foreground border-0 shadow-sm' 
                : 'bg-secondary text-secondary-foreground'
              }
            >
              {property.is_available ? 'Available' : 'Rented'}
            </Badge>
            {property.is_available && property.vacancy_count !== undefined && property.vacancy_count > 0 && (
              <Badge variant="outline" className="bg-card/95 backdrop-blur-sm text-xs border-accent/30 text-foreground">
                {property.vacancy_count} unit{property.vacancy_count !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge variant="outline" className="bg-card/95 backdrop-blur-sm border-border/50 text-foreground font-medium">
            {property.property_type}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-accent transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1.5 text-accent/70" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1.5 text-accent/60" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1.5 text-accent/60" />
              <span>{property.bathrooms}</span>
            </div>
            {property.images && property.images.length > 0 && (
              <div className="flex items-center">
                <Camera className="h-4 w-4 mr-1.5 text-accent/60" />
                <span>{property.images.length}</span>
              </div>
            )}
            {property.videos && property.videos.length > 0 && (
              <div className="flex items-center">
                <Video className="h-4 w-4 mr-1.5 text-accent/60" />
                <span>{property.videos.length}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-xl font-bold text-accent">
            {formatPrice(property.price, property.currency || 'USD')}/mo
          </span>
          {property.is_available && property.vacancy_count !== undefined && property.vacancy_count > 1 && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1.5 text-accent/60" />
              <span>{property.vacancy_count} available</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
