import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';

interface SimpleSearchProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onSearch: () => void;
}

const SimpleSearch = ({ filters, onFiltersChange, onSearch }: SimpleSearchProps) => {
  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Find Your Perfect Home</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Search */}
        <div>
          <Label className="text-base font-medium mb-2 block">Where do you want to live?</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter city, neighborhood, or area"
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              className="pl-10"
            />
          </div>
        </div>

        {/* Property Type and Bedrooms Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-base font-medium mb-2 block">Property Type</Label>
            <Select value={filters.propertyType || 'any'} onValueChange={(value) => handleFilterChange('propertyType', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="any">Any type</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">Bedrooms</Label>
            <Select value={filters.bedrooms || 'any'} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1 bedroom</SelectItem>
                <SelectItem value="2">2 bedrooms</SelectItem>
                <SelectItem value="3">3 bedrooms</SelectItem>
                <SelectItem value="4">4+ bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <Button 
          onClick={onSearch} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
          size="lg"
        >
          <Search className="h-5 w-5 mr-2" />
          Search Properties
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimpleSearch;