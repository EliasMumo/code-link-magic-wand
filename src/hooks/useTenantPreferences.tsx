
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface TenantPreferences {
  id: string;
  user_id: string;
  preferred_property_types: string[] | null;
  preferred_price_range_min: number | null;
  preferred_price_range_max: number | null;
  preferred_locations: string[] | null;
  preferred_amenities: string[] | null;
  preferred_bedrooms: number | null;
  preferred_bathrooms: number | null;
  search_frequency: number;
  last_search_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useTenantPreferences = () => {
  const [preferences, setPreferences] = useState<TenantPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPreferences = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tenant_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setPreferences(data);
    } catch (error: any) {
      console.error('Error fetching preferences:', error);
      toast({
        title: "Error",
        description: "Failed to fetch preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updatedPreferences: Partial<TenantPreferences>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('tenant_preferences')
        .upsert({
          user_id: user.id,
          ...updatedPreferences,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setPreferences(data);
      toast({
        title: "Success",
        description: "Preferences updated successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  return {
    preferences,
    loading,
    updatePreferences,
    refetch: fetchPreferences,
  };
};
