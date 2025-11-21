
import React from 'react';
import PropertyCard from './PropertyCard';
import PropertyComparison from './PropertyComparison';
import { usePropertyComparisons } from '@/hooks/usePropertyComparisons';
import { useProperties } from '@/hooks/useProperties';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/ScrollReveal';

interface PropertyGridProps {
  properties: any[];
  onPropertyClick: (property: any) => void;
  onToggleFavorite?: (propertyId: string) => void;
  isFavorite?: (propertyId: string) => boolean;
  loading?: boolean;
}

const PropertyGrid = ({ properties, onPropertyClick, onToggleFavorite, isFavorite, loading }: PropertyGridProps) => {
  const { currentComparison, addToComparison, removeFromComparison, saveComparison, clearComparison } = usePropertyComparisons();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-card rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-48 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <ScrollReveal variant="fadeUp">
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No properties found</p>
        </div>
      </ScrollReveal>
    );
  }

  // Get properties for comparison
  const comparisonProperties = properties.filter(property => 
    currentComparison.includes(property.id)
  );

  return (
    <div className="space-y-6">
      {/* Property Comparison */}
      {currentComparison.length > 0 && (
        <ScrollReveal variant="fadeDown">
          <PropertyComparison
            properties={comparisonProperties}
            onRemoveProperty={removeFromComparison}
            onClearAll={clearComparison}
            onSaveComparison={saveComparison}
          />
        </ScrollReveal>
      )}

      {/* Property Grid */}
      <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
        {properties.map((property) => (
          <ScrollRevealItem key={property.id}>
            <PropertyCard
              property={property}
              onClick={onPropertyClick}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite ? isFavorite(property.id) : false}
              onAddToComparison={addToComparison}
              isInComparison={currentComparison.includes(property.id)}
            />
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>
    </div>
  );
};

export default PropertyGrid;
