
import React from 'react';
import { Label } from '@/components/ui/label';
import { PropertyFormData } from '@/types/property';

interface PropertyOptionsProps {
  formData: PropertyFormData;
  onInputChange: (key: string, value: string | boolean) => void;
}

const PropertyOptions = ({ formData, onInputChange }: PropertyOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isFurnished"
          checked={formData.isFurnished}
          onChange={(e) => onInputChange('isFurnished', e.target.checked)}
          className="rounded"
        />
        <Label htmlFor="isFurnished">Furnished</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPetFriendly"
          checked={formData.isPetFriendly}
          onChange={(e) => onInputChange('isPetFriendly', e.target.checked)}
          className="rounded"
        />
        <Label htmlFor="isPetFriendly">Pet Friendly</Label>
      </div>
    </div>
  );
};

export default PropertyOptions;
