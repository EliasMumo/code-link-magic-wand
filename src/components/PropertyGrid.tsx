
import React from 'react';
import PropertyCard from './PropertyCard';
import PropertyComparison from './PropertyComparison';
import { usePropertyComparisons } from '@/hooks/usePropertyComparisons';
import { useProperties } from '@/hooks/useProperties';

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
            <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No properties found</p>
      </div>
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
        <PropertyComparison
          properties={comparisonProperties}
          onRemoveProperty={removeFromComparison}
          onClearAll={clearComparison}
          onSaveComparison={saveComparison}
        />
      )}

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={onPropertyClick}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite ? isFavorite(property.id) : false}
            onAddToComparison={addToComparison}
            isInComparison={currentComparison.includes(property.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
