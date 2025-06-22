
import React from 'react';
import { Button } from '@/components/ui/button';
import PropertyGrid from '@/components/PropertyGrid';

interface FeaturedPropertiesProps {
  properties: any[];
  onPropertyClick: (property: any) => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  onViewAllClick: () => void;
  loading: boolean;
}

const FeaturedProperties = ({ 
  properties, 
  onPropertyClick, 
  onToggleFavorite, 
  isFavorite, 
  onViewAllClick,
  loading 
}: FeaturedPropertiesProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
        <Button 
          variant="outline" 
          onClick={onViewAllClick}
        >
          View All Properties
        </Button>
      </div>
      <PropertyGrid 
        properties={properties}
        onPropertyClick={onPropertyClick}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        loading={loading}
      />
    </div>
  );
};

export default FeaturedProperties;
