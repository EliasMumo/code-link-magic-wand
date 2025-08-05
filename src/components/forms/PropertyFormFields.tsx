
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { PropertyFormData } from '@/types/property';
import { WORLD_CURRENCIES } from '@/lib/currency';
import { cn } from '@/lib/utils';

interface PropertyFormFieldsProps {
  formData: PropertyFormData;
  onInputChange: (key: string, value: string | boolean) => void;
}

const PropertyFormFields = ({ formData, onInputChange }: PropertyFormFieldsProps) => {
  const [currencyOpen, setCurrencyOpen] = useState(false);
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
          <Popover open={currencyOpen} onOpenChange={setCurrencyOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={currencyOpen}
                className="w-full justify-between"
              >
                {formData.currency
                  ? `${formData.currency} (${WORLD_CURRENCIES.find(c => c.code === formData.currency)?.symbol}) - ${WORLD_CURRENCIES.find(c => c.code === formData.currency)?.name}`
                  : "Select currency..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" side="bottom" align="start">
              <Command>
                <CommandInput placeholder="Search currency..." />
                <CommandEmpty>No currency found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {WORLD_CURRENCIES.map((currency) => (
                    <CommandItem
                      key={currency.code}
                      value={`${currency.code} ${currency.name} ${currency.symbol}`}
                      onSelect={() => {
                        onInputChange('currency', currency.code);
                        setCurrencyOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          formData.currency === currency.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-sm text-muted-foreground">({currency.symbol})</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{currency.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder="123 Main St, City, State"
            required
          />
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
