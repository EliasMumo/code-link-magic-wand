
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, Loader2 } from 'lucide-react';

interface SmartSearchInputProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  searchInsights?: string;
}

const SmartSearchInput = ({ onSearch, loading = false, searchInsights }: SmartSearchInputProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const exampleQueries = [
    "2 bedroom apartment in downtown with parking",
    "pet-friendly house under $2500 near parks",
    "furnished studio in university area with gym",
    "family home with garden in quiet neighborhood",
    "modern condo in financial district with amenities"
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Try: '2 bedroom apartment in downtown with parking'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={loading || !query.trim()}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Smart Search
            </>
          )}
        </Button>
      </form>

      {searchInsights && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">AI Insights</span>
          </div>
          <p className="text-sm text-blue-700">{searchInsights}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-500">Try:</span>
        {exampleQueries.map((example, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer hover:bg-gray-50 text-xs"
            onClick={() => setQuery(example)}
          >
            {example}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SmartSearchInput;
