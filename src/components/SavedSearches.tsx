
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Trash2, Calendar } from 'lucide-react';
import { SavedSearch } from '@/hooks/useSavedSearches';

interface SavedSearchesProps {
  savedSearches: SavedSearch[];
  onLoadSearch: (searchCriteria: any) => void;
  onDeleteSearch: (searchId: string) => void;
  loading?: boolean;
}

const SavedSearches = ({ savedSearches, onLoadSearch, onDeleteSearch, loading }: SavedSearchesProps) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Loading saved searches...</p>
        </CardContent>
      </Card>
    );
  }

  if (savedSearches.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No saved searches yet</p>
          <p className="text-sm text-gray-400 mt-2">Save your search criteria to quickly access them later</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSearchCriteria = (criteria: any) => {
    const parts = [];
    
    if (criteria.location) parts.push(`Location: ${criteria.location}`);
    if (criteria.minPrice || criteria.maxPrice) {
      parts.push(`Price: $${criteria.minPrice || 0} - $${criteria.maxPrice || '∞'}`);
    }
    if (criteria.bedrooms && criteria.bedrooms !== 'any') {
      parts.push(`${criteria.bedrooms} bed${criteria.bedrooms !== '1' ? 's' : ''}`);
    }
    if (criteria.propertyType && criteria.propertyType !== 'any') {
      parts.push(criteria.propertyType);
    }
    
    return parts.length > 0 ? parts.join(' • ') : 'All properties';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Searches ({savedSearches.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedSearches.map((search) => (
            <div key={search.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{search.search_name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant={search.is_active ? 'default' : 'secondary'}>
                    {search.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSearch(search.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {formatSearchCriteria(search.search_criteria)}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  Saved on {formatDate(search.created_at)}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onLoadSearch(search.search_criteria)}
                >
                  <Search className="h-4 w-4 mr-1" />
                  Load Search
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedSearches;
