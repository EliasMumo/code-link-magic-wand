
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PropertyFormData } from '@/types/property';
import PropertyFormFields from '@/components/forms/PropertyFormFields';
import ImageUpload from '@/components/forms/ImageUpload';
import ContactFields from '@/components/forms/ContactFields';
import PropertyOptions from '@/components/forms/PropertyOptions';

interface AddPropertyFormProps {
  onBack: () => void;
  onSubmit: (propertyData: any) => void;
}

const AddPropertyForm = ({ onBack, onSubmit }: AddPropertyFormProps) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    description: '',
    amenities: '',
    landlordPhone: '',
    caretakerPhone: '',
    isFurnished: false,
    isPetFriendly: false
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Limit to 10 images
    const newFiles = files.slice(0, 10 - selectedImages.length);
    
    setSelectedImages(prev => [...prev, ...newFiles]);
    
    // Create preview URLs
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.landlordPhone.trim()) {
      alert('Landlord phone number is required');
      return;
    }

    // Convert images to base64 strings for storage
    const imagePromises = selectedImages.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(imageBase64Array => {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: parseInt(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        property_type: formData.propertyType,
        amenities: formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : [],
        images: imageBase64Array,
        is_furnished: formData.isFurnished,
        is_pet_friendly: formData.isPetFriendly,
        is_available: true,
        landlord_phone: formData.landlordPhone,
        caretaker_phone: formData.caretakerPhone || null
      };
      
      onSubmit(propertyData);
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-4 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New Property</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <PropertyFormFields 
              formData={formData} 
              onInputChange={handleInputChange} 
            />

            <ImageUpload
              selectedImages={selectedImages}
              imagePreviewUrls={imagePreviewUrls}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
            />

            <ContactFields 
              formData={formData} 
              onInputChange={handleInputChange} 
            />

            <PropertyOptions 
              formData={formData} 
              onInputChange={handleInputChange} 
            />

            <Button type="submit" className="w-full" size="lg">
              Add Property
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPropertyForm;
