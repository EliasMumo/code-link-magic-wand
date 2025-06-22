
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, DollarSign, X, Heart } from 'lucide-react';
import { Property } from '@/hooks/useProperties';

interface PropertyComparisonProps {
  properties: Property[];
  onRemoveProperty: (propertyId: string) => void;
  onClearAll: () => void;
  onSaveComparison?: () => void;
}

const PropertyComparison = ({ properties, onRemoveProperty, onClearAll, onSaveComparison }: PropertyComparisonProps) => {
  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No properties selected for comparison</p>
          <p className="text-sm text-gray-400 mt-2">Add properties to compare their features side by side</p>
        </CardContent>
      </Card>
    );
  }

  const comparisonRows = [
    { key: 'price', label: 'Monthly Rent', render: (property: Property) => `$${property.price.toLocaleString()}` },
    { key: 'location', label: 'Location', render: (property: Property) => property.location },
    { key: 'bedrooms', label: 'Bedrooms', render: (property: Property) => property.bedrooms.toString() },
    { key: 'bathrooms', label: 'Bathrooms', render: (property: Property) => property.bathrooms.toString() },
    { key: 'property_type', label: 'Property Type', render: (property: Property) => property.property_type },
    { key: 'is_furnished', label: 'Furnished', render: (property: Property) => property.is_furnished ? 'Yes' : 'No' },
    { key: 'is_pet_friendly', label: 'Pet Friendly', render: (property: Property) => property.is_pet_friendly ? 'Yes' : 'No' },
    { key: 'is_available', label: 'Availability', render: (property: Property) => property.is_available ? 'Available' : 'Rented' },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Property Comparison ({properties.length}/3)</CardTitle>
          <div className="flex gap-2">
            {onSaveComparison && properties.length >= 2 && (
              <Button variant="outline" size="sm" onClick={onSaveComparison}>
                <Heart className="h-4 w-4 mr-1" />
                Save Comparison
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onClearAll}>
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 border-b font-medium w-32">Feature</th>
                {properties.map((property) => (
                  <th key={property.id} className="text-center p-3 border-b border-l min-w-64">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm truncate">{property.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveProperty(property.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md flex items-center justify-center">
                        <Square className="h-8 w-8 text-blue-400" />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr key={row.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-3 border-b font-medium text-gray-700">
                    {row.label}
                  </td>
                  {properties.map((property) => (
                    <td key={property.id} className="p-3 border-b border-l text-center">
                      {row.key === 'price' && (
                        <span className="font-bold text-blue-600 text-lg">
                          {row.render(property)}
                        </span>
                      )}
                      {row.key === 'is_available' && (
                        <Badge variant={property.is_available ? 'default' : 'secondary'}>
                          {row.render(property)}
                        </Badge>
                      )}
                      {row.key !== 'price' && row.key !== 'is_available' && (
                        <span>{row.render(property)}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Amenities Row */}
              <tr className="bg-gray-50">
                <td className="p-3 border-b font-medium text-gray-700">Amenities</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-3 border-b border-l">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {property.amenities && property.amenities.length > 0 ? (
                        property.amenities.slice(0, 3).map((amenity, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">None listed</span>
                      )}
                      {property.amenities && property.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{property.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        {properties.length < 3 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-blue-700 text-sm">
              You can compare up to 3 properties. Add more properties to get a better comparison.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyComparison;
