
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from '@/types/property';
import { WORLD_CURRENCIES } from '@/lib/currency';

interface PropertyFormFieldsProps {
  formData: PropertyFormData;
  onInputChange: (key: string, value: string | boolean) => void;
}

const PropertyFormFields = ({ formData, onInputChange }: PropertyFormFieldsProps) => {
  const [currencySearch, setCurrencySearch] = useState('');

  // Filter currencies based on search
  const filteredCurrencies = useMemo(() => {
    if (!currencySearch.trim()) {
      return WORLD_CURRENCIES.slice(0, 20); // Show first 20 popular currencies by default
    }
    
    const searchLower = currencySearch.toLowerCase();
    return WORLD_CURRENCIES.filter(currency =>
      currency.code.toLowerCase().includes(searchLower) ||
      currency.name.toLowerCase().includes(searchLower) ||
      currency.symbol.includes(searchLower)
    );
  }, [currencySearch]);
  return (
    <>
      <div>
        <Label htmlFor="title">Property Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          placeholder="Beautiful 2BR apartment in downtown"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Monthly Rent</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => onInputChange('price', e.target.value)}
            placeholder="2500"
            required
          />
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <div className="space-y-2">
            <Input
              placeholder="Search currencies..."
              value={currencySearch}
              onChange={(e) => setCurrencySearch(e.target.value)}
              className="w-full"
            />
            <Select 
              value={formData.currency} 
              onValueChange={(value) => onInputChange('currency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency">
                  {formData.currency && (() => {
                    const selectedCurrency = WORLD_CURRENCIES.find(c => c.code === formData.currency);
                    return selectedCurrency 
                      ? `${selectedCurrency.code} (${selectedCurrency.symbol}) - ${selectedCurrency.name}`
                      : formData.currency;
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-sm text-muted-foreground">({currency.symbol})</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{currency.name}</span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No currencies found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="location">Full Address (for display)</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder="Complete address as you want it displayed"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Detailed Location (for accurate mapping)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input
              id="streetAddress"
              value={formData.streetAddress}
              onChange={(e) => onInputChange('streetAddress', e.target.value)}
              placeholder="123 Main Street, Apt 4B"
              required
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              placeholder="New York"
              required
            />
          </div>
          <div>
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => onInputChange('state', e.target.value)}
              placeholder="NY"
              required
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => onInputChange('country', e.target.value)}
              placeholder="United States"
              required
            />
          </div>
          <div>
            <Label htmlFor="postalCode">Postal/ZIP Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => onInputChange('postalCode', e.target.value)}
              placeholder="10001"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select value={formData.bedrooms} onValueChange={(value) => onInputChange('bedrooms', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Select value={formData.bathrooms} onValueChange={(value) => onInputChange('bathrooms', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="propertyType">Property Type</Label>
          <Select value={formData.propertyType} onValueChange={(value) => onInputChange('propertyType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Describe your property..."
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="amenities">Amenities (comma separated)</Label>
        <Input
          id="amenities"
          value={formData.amenities}
          onChange={(e) => onInputChange('amenities', e.target.value)}
          placeholder="Air conditioning, Parking, Laundry, Pet friendly"
        />
      </div>
    </>
  );
};

export default PropertyFormFields;
