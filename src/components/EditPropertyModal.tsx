import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Property } from '@/hooks/useProperties';
import PropertyFormFields from '@/components/forms/PropertyFormFields';
import PropertyOptions from '@/components/forms/PropertyOptions';
import ContactFields from '@/components/forms/ContactFields';
import VideoUpload from '@/components/forms/VideoUpload';
import { PropertyFormData } from '@/types/property';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface EditPropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (propertyId: string, data: any) => Promise<boolean>;
}

const EditPropertyModal = ({ property, isOpen, onClose, onUpdate }: EditPropertyModalProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    price: '',
    currency: 'USD',
    location: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    description: '',
    amenities: '',
    landlordPhone: '',
    caretakerPhone: '',
    isFurnished: false,
    isPetFriendly: false,
    vacancyCount: '1'
  });

  const [images, setImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        price: property.price.toString(),
        currency: property.currency || 'USD',
        location: property.location,
        streetAddress: property.street_address || '',
        city: property.city || '',
        state: property.state || '',
        country: property.country || '',
        postalCode: property.postal_code || '',
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        propertyType: property.property_type,
        description: property.description || '',
        amenities: property.amenities?.join(', ') || '',
        landlordPhone: '',
        caretakerPhone: property.caretaker_phone || '',
        isFurnished: property.is_furnished,
        isPetFriendly: property.is_pet_friendly,
        vacancyCount: (property as any).vacancy_count?.toString() || '1'
      });
      setImages(property.images || []);
      setImagePreviewUrls(property.images || []);
      setVideos(property.videos || []);
    }
  }, [property]);

  useEffect(() => {
    const loadProfilePhones = async () => {
      if (!user || !isOpen) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('phone, caretaker_phone')
        .eq('id', user.id)
        .single();
      if (!error && data) {
        setFormData(prev => ({ ...prev, landlordPhone: data.phone || '', caretakerPhone: data.caretaker_phone || '' }));
      }
    };
    loadProfilePhones();
  }, [user, isOpen]);

  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newSelectedImages = [...selectedImages, ...files].slice(0, 10);
    const newImageUrls = newSelectedImages.map(file => URL.createObjectURL(file));
    
    setSelectedImages(newSelectedImages);
    setImagePreviewUrls([...imagePreviewUrls, ...newImageUrls].slice(0, 10));
  };

  const handleRemoveImage = (index: number) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    
    setSelectedImages(newSelectedImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleVideoUrlAdd = (url: string) => {
    setVideos(prev => [...prev, url]);
  };

  const handleVideoUrlRemove = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    setLoading(true);
    
    // Use existing images if no new ones are selected
    const finalImages = selectedImages.length > 0 ? imagePreviewUrls : images;

    // Update phones on profile instead of properties to avoid public exposure
    try {
      if (user) {
        await supabase
          .from('profiles')
          .update({
            phone: formData.landlordPhone || null,
            caretaker_phone: formData.caretakerPhone || null,
          })
          .eq('id', user.id);
      }
    } catch (e) {
      console.error('Failed updating profile phones:', e);
    }

    const updateData = {
      title: formData.title,
      price: parseFloat(formData.price),
      currency: formData.currency,
      location: formData.location,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      property_type: formData.propertyType,
      description: formData.description,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
      is_furnished: formData.isFurnished,
      is_pet_friendly: formData.isPetFriendly,
      vacancy_count: parseInt(formData.vacancyCount) || 1,
      images: finalImages,
      videos,
    };

    const success = await onUpdate(property.id, updateData);
    if (success) {
      onClose();
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <PropertyFormFields formData={formData} onInputChange={handleInputChange} />
          <PropertyOptions formData={formData} onInputChange={handleInputChange} />
          <ContactFields formData={formData} onInputChange={handleInputChange} />
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Property Images</h3>
            <div className="space-y-4">
              <Label className="text-sm font-medium">Property Images</Label>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imagePreviewUrls.length >= 10}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className={`
                      flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer
                      transition-all duration-200 hover:bg-muted
                      ${imagePreviewUrls.length >= 10 ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
                    `}
                  >
                    <Upload className="h-8 w-8" />
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {imagePreviewUrls.length >= 10 
                          ? 'Maximum images reached' 
                          : 'Click to upload images'
                        }
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG or JPEG (MAX. 10 images)
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Property Videos</h3>
            <VideoUpload 
              videoUrls={videos} 
              onVideoUrlAdd={handleVideoUrlAdd}
              onVideoUrlRemove={handleVideoUrlRemove}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Property'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPropertyModal;