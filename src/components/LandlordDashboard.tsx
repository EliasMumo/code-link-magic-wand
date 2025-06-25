
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PropertyGrid from '@/components/PropertyGrid';

interface LandlordDashboardProps {
  properties: any[];
  onPropertyClick: (property: any) => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  onAddPropertyClick: () => void;
  loading: boolean;
}

const LandlordDashboard = ({ 
  properties, 
  onPropertyClick, 
  onToggleFavorite, 
  isFavorite, 
  onAddPropertyClick,
  loading 
}: LandlordDashboardProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Properties</h2>
        <Button 
          onClick={onAddPropertyClick}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Property
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

export default LandlordDashboard;
