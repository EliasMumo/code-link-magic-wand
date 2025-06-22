
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PropertyFormData } from '@/types/property';

interface ContactFieldsProps {
  formData: PropertyFormData;
  onInputChange: (key: string, value: string | boolean) => void;
}

const ContactFields = ({ formData, onInputChange }: ContactFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="landlordPhone">Your Phone Number *</Label>
        <Input
          id="landlordPhone"
          type="tel"
          value={formData.landlordPhone}
          onChange={(e) => onInputChange('landlordPhone', e.target.value)}
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>
      <div>
        <Label htmlFor="caretakerPhone">Caretaker Phone (Optional)</Label>
        <Input
          id="caretakerPhone"
          type="tel"
          value={formData.caretakerPhone}
          onChange={(e) => onInputChange('caretakerPhone', e.target.value)}
          placeholder="+1 (555) 987-6543"
        />
      </div>
    </div>
  );
};

export default ContactFields;
