
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface SavedSearch {
  id: string;
  user_id: string;
  search_name: string;
  search_criteria: any;
  is_active: boolean;
  last_notification_sent: string | null;
  created_at: string;
}

export const useSavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSavedSearches = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('saved_searches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedSearches(data || []);
    } catch (error: any) {
      console.error('Error fetching saved searches:', error);
      toast({
        title: "Error",
        description: "Failed to fetch saved searches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSearch = async (searchName: string, searchCriteria: any) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('saved_searches')
        .insert([
          {
            user_id: user.id,
            search_name: searchName,
            search_criteria: searchCriteria,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setSavedSearches(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Search saved successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error saving search:', error);
      toast({
        title: "Error",
        description: "Failed to save search",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteSearch = async (searchId: string) => {
    try {
      const { error } = await supabase
        .from('saved_searches')
        .delete()
        .eq('id', searchId);

      if (error) throw error;

      setSavedSearches(prev => prev.filter(search => search.id !== searchId));
      toast({
        title: "Success",
        description: "Search deleted successfully",
      });
    } catch (error: any) {
      console.error('Error deleting search:', error);
      toast({
        title: "Error",
        description: "Failed to delete search",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSavedSearches();
  }, [user]);

  return {
    savedSearches,
    loading,
    saveSearch,
    deleteSearch,
    refetch: fetchSavedSearches,
  };
};
