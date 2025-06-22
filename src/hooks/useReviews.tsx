
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  property_id: string;
  tenant_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReviewsForProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReviews = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('tenant_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error: any) {
      console.error('Error fetching user reviews:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (propertyId: string, rating: number, comment?: string) => {
    if (!user) return null;

    try {
      // Check if user already reviewed this property
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('id')
        .eq('property_id', propertyId)
        .eq('tenant_id', user.id)
        .single();

      if (existingReview) {
        toast({
          title: "Review Already Exists",
          description: "You have already reviewed this property",
          variant: "destructive",
        });
        return null;
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            property_id: propertyId,
            tenant_id: user.id,
            rating: rating,
            comment: comment,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setReviews(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Review added successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error adding review:', error);
      toast({
        title: "Error",
        description: "Failed to add review",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateReview = async (reviewId: string, rating: number, comment?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('reviews')
        .update({
          rating: rating,
          comment: comment,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId)
        .eq('tenant_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setReviews(prev => prev.map(review => 
        review.id === reviewId ? data : review
      ));

      toast({
        title: "Success",
        description: "Review updated successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error updating review:', error);
      toast({
        title: "Error",
        description: "Failed to update review",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('tenant_id', user.id);

      if (error) throw error;

      setReviews(prev => prev.filter(review => review.id !== reviewId));
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
    } catch (error: any) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      });
    }
  };

  const getAverageRating = (propertyReviews: Review[]) => {
    if (propertyReviews.length === 0) return 0;
    const total = propertyReviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / propertyReviews.length) * 10) / 10;
  };

  return {
    reviews,
    loading,
    fetchReviewsForProperty,
    fetchUserReviews,
    addReview,
    updateReview,
    deleteReview,
    getAverageRating,
  };
};
