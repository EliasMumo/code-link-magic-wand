
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface RentCalculation {
  id: string;
  user_id: string | null;
  property_type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[] | null;
  calculated_rent: number;
  market_comparison: any | null;
  created_at: string;
}

export interface RentCalculatorParams {
  property_type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
}

export const useRentCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [calculations, setCalculations] = useState<RentCalculation[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const calculateRent = async (params: RentCalculatorParams) => {
    try {
      setLoading(true);
      
      // Simple rent calculation based on location, bedrooms, and amenities
      let baseRent = 1000; // Base rent
      
      // Adjust for bedrooms
      baseRent += params.bedrooms * 300;
      
      // Adjust for bathrooms
      baseRent += params.bathrooms * 150;
      
      // Adjust for amenities
      const amenityPricing: { [key: string]: number } = {
        'swimming_pool': 200,
        'gym': 150,
        'parking': 100,
        'balcony': 100,
        'air_conditioning': 75,
        'laundry': 50,
        'dishwasher': 25,
      };
      
      const amenityBonus = params.amenities.reduce((total, amenity) => {
        return total + (amenityPricing[amenity] || 0);
      }, 0);
      
      baseRent += amenityBonus;
      
      // Location multiplier (simplified)
      const locationMultipliers: { [key: string]: number } = {
        'downtown': 1.5,
        'city center': 1.4,
        'uptown': 1.3,
        'midtown': 1.2,
        'suburbs': 1.0,
        'outskirts': 0.8,
      };
      
      const locationKey = Object.keys(locationMultipliers).find(key => 
        params.location.toLowerCase().includes(key)
      );
      
      const multiplier = locationKey ? locationMultipliers[locationKey] : 1.1;
      const calculatedRent = Math.round(baseRent * multiplier);
      
      // Mock market comparison data
      const marketComparison = {
        average_rent: calculatedRent,
        min_rent: Math.round(calculatedRent * 0.8),
        max_rent: Math.round(calculatedRent * 1.3),
        properties_compared: Math.floor(Math.random() * 20) + 10,
        confidence_score: 0.85,
      };

      // Save calculation to database
      const { data, error } = await supabase
        .from('rent_calculations')
        .insert([
          {
            user_id: user?.id || null,
            property_type: params.property_type,
            location: params.location,
            bedrooms: params.bedrooms,
            bathrooms: params.bathrooms,
            amenities: params.amenities,
            calculated_rent: calculatedRent,
            market_comparison: marketComparison,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Rent Calculated",
        description: `Estimated rent: $${calculatedRent}/month`,
      });

      return {
        calculatedRent,
        marketComparison,
        calculation: data,
      };
    } catch (error: any) {
      console.error('Error calculating rent:', error);
      toast({
        title: "Error",
        description: "Failed to calculate rent",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchCalculations = async () => {
    try {
      const { data, error } = await supabase
        .from('rent_calculations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setCalculations(data || []);
    } catch (error: any) {
      console.error('Error fetching calculations:', error);
    }
  };

  return {
    calculateRent,
    fetchCalculations,
    calculations,
    loading,
  };
};
