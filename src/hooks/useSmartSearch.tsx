
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SmartSearchResult {
  rankings: Array<{
    propertyIndex: number;
    score: number;
    explanation: string;
  }>;
  searchInsights: string;
}

export const useSmartSearch = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const performSmartSearch = async (query: string, properties: any[]): Promise<SmartSearchResult | null> => {
    if (!query.trim() || properties.length === 0) {
      return null;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('smart-search', {
        body: { query, properties }
      });

      if (error) throw error;

      toast({
        title: "Smart Search Complete",
        description: "Properties ranked by AI relevance",
      });

      return data;
    } catch (error) {
      console.error('Smart search error:', error);
      toast({
        title: "Search Error",
        description: "Unable to perform smart search. Using standard search.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    performSmartSearch,
    loading
  };
};
