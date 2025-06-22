
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface PropertyComparison {
  id: string;
  user_id: string;
  property_ids: string[];
  created_at: string;
  updated_at: string;
}

export const usePropertyComparisons = () => {
  const [comparisons, setComparisons] = useState<PropertyComparison[]>([]);
  const [currentComparison, setCurrentComparison] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchComparisons = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('property_comparisons')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComparisons(data || []);
    } catch (error: any) {
      console.error('Error fetching comparisons:', error);
      toast({
        title: "Error",
        description: "Failed to fetch property comparisons",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToComparison = (propertyId: string) => {
    if (currentComparison.includes(propertyId)) {
      toast({
        title: "Already Added",
        description: "This property is already in your comparison",
        variant: "destructive",
      });
      return;
    }

    if (currentComparison.length >= 3) {
      toast({
        title: "Comparison Full",
        description: "You can only compare up to 3 properties at once",
        variant: "destructive",
      });
      return;
    }

    setCurrentComparison(prev => [...prev, propertyId]);
    toast({
      title: "Added to Comparison",
      description: `Property added to comparison (${currentComparison.length + 1}/3)`,
    });
  };

  const removeFromComparison = (propertyId: string) => {
    setCurrentComparison(prev => prev.filter(id => id !== propertyId));
    toast({
      title: "Removed from Comparison",
      description: "Property removed from comparison",
    });
  };

  const saveComparison = async () => {
    if (!user || currentComparison.length < 2) {
      toast({
        title: "Error",
        description: "Please select at least 2 properties to compare",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('property_comparisons')
        .insert([
          {
            user_id: user.id,
            property_ids: currentComparison,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setComparisons(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Property comparison saved",
      });

      return data;
    } catch (error: any) {
      console.error('Error saving comparison:', error);
      toast({
        title: "Error",
        description: "Failed to save comparison",
        variant: "destructive",
      });
      return null;
    }
  };

  const clearComparison = () => {
    setCurrentComparison([]);
  };

  useEffect(() => {
    fetchComparisons();
  }, [user]);

  return {
    comparisons,
    currentComparison,
    loading,
    addToComparison,
    removeFromComparison,
    saveComparison,
    clearComparison,
    refetch: fetchComparisons,
  };
};
