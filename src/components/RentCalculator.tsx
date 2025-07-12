
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { useRentCalculator } from '@/hooks/useRentCalculator';

const RentCalculator = () => {
  const { calculateRent, loading } = useRentCalculator();
  const [formData, setFormData] = useState({
    property_type: '',
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    amenities: [] as string[],
  });
  const [result, setResult] = useState<any>(null);

  const amenityOptions = [
    { id: 'swimming_pool', label: 'Swimming Pool' },
    { id: 'gym', label: 'Gym/Fitness Center' },
    { id: 'parking', label: 'Parking' },
    { id: 'balcony', label: 'Balcony' },
    { id: 'air_conditioning', label: 'Air Conditioning' },
    { id: 'laundry', label: 'Laundry' },
    { id: 'dishwasher', label: 'Dishwasher' },
  ];

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter(id => id !== amenityId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.property_type || !formData.location) return;

    const calculation = await calculateRent(formData);
    if (calculation) {
      setResult(calculation);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Rent Calculator</h1>
        <p className="text-gray-600">Get an estimated rent for your property based on market data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="property_type">Property Type</Label>
                <Select value={formData.property_type} onValueChange={(value) => setFormData(prev => ({ ...prev, property_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location (e.g., Downtown Seattle)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select value={formData.bedrooms.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, bedrooms: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select value={formData.bathrooms.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, bathrooms: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {amenityOptions.map(amenity => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={formData.amenities.includes(amenity.id)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                      />
                      <Label htmlFor={amenity.id} className="text-sm">{amenity.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Calculating...' : 'Calculate Rent'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Rent Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  ${result.calculatedRent}/month
                </div>
                <p className="text-gray-600">Estimated monthly rent</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Market Comparison
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Average Rent:</span>
                    <span>${result.marketComparison.average_rent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Range:</span>
                    <span>${result.marketComparison.min_rent} - ${result.marketComparison.max_rent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Properties Compared:</span>
                    <span>{result.marketComparison.properties_compared}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence Score:</span>
                    <span>{(result.marketComparison.confidence_score * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RentCalculator;
