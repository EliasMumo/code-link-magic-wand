
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface PropertyAnalytics {
  id: string;
  property_id: string;
  month_year: string;
  views_count: number;
  inquiries_count: number;
  favorites_count: number;
  avg_time_on_market: string | null;
  price_changes_count: number;
  conversion_rate: number;
  created_at: string;
  updated_at: string;
}

export const usePropertyAnalytics = (propertyId?: string) => {
  const [analytics, setAnalytics] = useState<PropertyAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase
        .from('property_analytics')
        .select('*')
        .order('month_year', { ascending: false });

      if (propertyId) {
        query = query.eq('property_id', propertyId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Transform the data to ensure proper typing
      const transformedData = (data || []).map(item => ({
        ...item,
        avg_time_on_market: item.avg_time_on_market ? String(item.avg_time_on_market) : null,
      }));
      
      setAnalytics(transformedData);
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch property analytics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [user, propertyId]);

  return {
    analytics,
    loading,
    refetch: fetchAnalytics,
  };
};
