
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, Save, Sparkles } from 'lucide-react';
import AdvancedSearchFilters from './AdvancedSearchFilters';
import SavedSearches from './SavedSearches';
import SmartSearchInput from './SmartSearchInput';
import LocationSearchInput from './LocationSearchInput';
import { useSavedSearches } from '@/hooks/useSavedSearches';
import { useSmartSearch } from '@/hooks/useSmartSearch';

interface SearchFiltersProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onSearch: () => void;
  properties?: any[];
  onSmartSearchResults?: (rankedProperties: any[], insights: string) => void;
}

const SearchFilters = ({ filters, onFiltersChange, onSearch, properties = [], onSmartSearchResults }: SearchFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [searchInsights, setSearchInsights] = useState('');
  
  const { savedSearches, loading, saveSearch, deleteSearch } = useSavedSearches();
  const { performSmartSearch, loading: smartSearchLoading } = useSmartSearch();

  const handleBasicFilterChange = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleLoadSavedSearch = (searchCriteria: any) => {
    onFiltersChange(searchCriteria);
    setShowSaved(false);
  };

  const handleSaveSearch = async (searchName: string, searchFilters: any) => {
    await saveSearch(searchName, searchFilters);
  };

  const handleSmartSearch = async (query: string) => {
    const result = await performSmartSearch(query, properties);
    if (result && onSmartSearchResults) {
      // Reorder properties based on AI rankings
      const rankedProperties = result.rankings
        .sort((a, b) => b.score - a.score)
        .map(ranking => ({
          ...properties[ranking.propertyIndex],
          _aiScore: ranking.score,
          _aiExplanation: ranking.explanation
        }));
      
      setSearchInsights(result.searchInsights);
      onSmartSearchResults(rankedProperties, result.searchInsights);
    }
  };

  if (showAdvanced) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAdvanced(false)}>
            Basic Search
          </Button>
          <Button variant="outline" onClick={() => setShowSmartSearch(!showSmartSearch)}>
            <Sparkles className="h-4 w-4 mr-1" />
            Smart Search
          </Button>
          <Button variant="outline" onClick={() => setShowSaved(!showSaved)}>
            <Save className="h-4 w-4 mr-1" />
            Saved Searches
          </Button>
        </div>
        
        {showSmartSearch && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                AI-Powered Smart Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SmartSearchInput
                onSearch={handleSmartSearch}
                loading={smartSearchLoading}
                searchInsights={searchInsights}
              />
            </CardContent>
          </Card>
        )}
        
        {showSaved && (
          <SavedSearches
            savedSearches={savedSearches}
            onLoadSearch={handleLoadSavedSearch}
            onDeleteSearch={deleteSearch}
            loading={loading}
          />
        )}
        
        <AdvancedSearchFilters
          onFiltersChange={onFiltersChange}
          onSearch={onSearch}
          onSaveSearch={handleSaveSearch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Search Properties
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSmartSearch(!showSmartSearch)}>
                <Sparkles className="h-4 w-4 mr-1" />
                Smart
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAdvanced(true)}>
                <Filter className="h-4 w-4 mr-1" />
                Advanced
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowSaved(!showSaved)}>
                <Save className="h-4 w-4 mr-1" />
                Saved
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showSmartSearch && (
            <div className="mb-4">
              <SmartSearchInput
                onSearch={handleSmartSearch}
                loading={smartSearchLoading}
                searchInsights={searchInsights}
              />
            </div>
          )}

          {/* Basic Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <LocationSearchInput
                value={filters.location}
                onChange={(value) => handleBasicFilterChange('location', value)}
                placeholder="Enter city, neighborhood, or address"
              />
            </div>
            <div>
              <Label>Property Type</Label>
              <Select value={filters.propertyType} onValueChange={(value) => handleBasicFilterChange('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any type</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Bedrooms</Label>
              <Select value={filters.bedrooms} onValueChange={(value) => handleBasicFilterChange('bedrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price Range: ${filters.minPrice} - ${filters.maxPrice}</Label>
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={(values) => {
                  handleBasicFilterChange('minPrice', values[0]);
                  handleBasicFilterChange('maxPrice', values[1]);
                }}
                max={5000}
                min={500}
                step={100}
                className="mt-2"
              />
            </div>
          </div>

          <Button onClick={onSearch} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Search Properties
          </Button>
        </CardContent>
      </Card>

      {showSaved && (
        <SavedSearches
          savedSearches={savedSearches}
          onLoadSearch={handleLoadSavedSearch}
          onDeleteSearch={deleteSearch}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SearchFilters;
