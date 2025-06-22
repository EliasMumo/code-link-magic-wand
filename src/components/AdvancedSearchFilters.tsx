
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { X, Search, Save } from 'lucide-react';

interface AdvancedSearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  onSearch: () => void;
  onSaveSearch?: (searchName: string, filters: any) => void;
}

const AdvancedSearchFilters = ({ onFiltersChange, onSearch, onSaveSearch }: AdvancedSearchFiltersProps) => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 1000,
    maxPrice: 5000,
    bedrooms: 'any',
    bathrooms: 'any',
    propertyType: 'any',
    amenities: [] as string[],
    isFurnished: false,
    isPetFriendly: false,
    keywords: '',
  });

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');

  const amenitiesList = [
    'Air Conditioning', 'Parking', 'Gym', 'Pool', 'Laundry', 'Balcony',
    'Garden', 'Security', 'Elevator', 'Dishwasher', 'WiFi', 'Cable TV'
  ];

  const propertyTypes = [
    'Apartment', 'House', 'Condo', 'Townhouse', 'Studio', 'Loft'
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    handleFilterChange('amenities', newAmenities);
  };

  const handlePriceRangeChange = (values: number[]) => {
    handleFilterChange('minPrice', values[0]);
    handleFilterChange('maxPrice', values[1]);
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      minPrice: 1000,
      maxPrice: 5000,
      bedrooms: 'any',
      bathrooms: 'any',
      propertyType: 'any',
      amenities: [],
      isFurnished: false,
      isPetFriendly: false,
      keywords: '',
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleSaveSearch = () => {
    if (onSaveSearch && searchName.trim()) {
      onSaveSearch(searchName.trim(), filters);
      setSearchName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Advanced Search Filters
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
            {onSaveSearch && (
              <Button variant="outline" size="sm" onClick={() => setShowSaveDialog(true)}>
                <Save className="h-4 w-4 mr-1" />
                Save Search
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location and Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter city, neighborhood, or address"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              placeholder="Search in property descriptions"
              value={filters.keywords}
              onChange={(e) => handleFilterChange('keywords', e.target.value)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label>Price Range: ${filters.minPrice} - ${filters.maxPrice}</Label>
          <div className="mt-2">
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={handlePriceRangeChange}
              max={10000}
              min={500}
              step={100}
              className="w-full"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Property Type</Label>
            <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
                {propertyTypes.map(type => (
                  <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Bedrooms</Label>
            <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Bathrooms</Label>
            <Select value={filters.bathrooms} onValueChange={(value) => handleFilterChange('bathrooms', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+ Bathroom</SelectItem>
                <SelectItem value="2">2+ Bathrooms</SelectItem>
                <SelectItem value="3">3+ Bathrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Property Features */}
        <div className="space-y-3">
          <Label>Property Features</Label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="furnished"
                checked={filters.isFurnished}
                onCheckedChange={(checked) => handleFilterChange('isFurnished', checked)}
              />
              <Label htmlFor="furnished">Furnished</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="petFriendly"
                checked={filters.isPetFriendly}
                onCheckedChange={(checked) => handleFilterChange('isPetFriendly', checked)}
              />
              <Label htmlFor="petFriendly">Pet Friendly</Label>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <Label>Amenities</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
            {amenitiesList.map(amenity => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Amenities */}
        {filters.amenities.length > 0 && (
          <div>
            <Label>Selected Amenities:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.amenities.map(amenity => (
                <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                  {amenity}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleAmenityToggle(amenity)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Save Search Dialog */}
        {showSaveDialog && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <Label htmlFor="searchName">Save this search as:</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="searchName"
                placeholder="Enter search name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Button onClick={handleSaveSearch} disabled={!searchName.trim()}>
                Save
              </Button>
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Search Button */}
        <Button onClick={onSearch} className="w-full" size="lg">
          <Search className="h-5 w-5 mr-2" />
          Search Properties
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearchFilters;
