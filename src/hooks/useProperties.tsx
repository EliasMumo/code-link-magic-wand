
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  amenities: string[];
  images: string[];
  videos: string[];
  currency: string;
  is_furnished: boolean;
  is_pet_friendly: boolean;
  is_available: boolean;
  landlord_id: string;
  caretaker_phone: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
  inquiry_count: number;
}

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserRole = async () => {
    if (!user) {
      setUserRole(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserRole(data?.role || null);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      setProperties(data || []);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to fetch properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProperty = async (propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at' | 'view_count' | 'inquiry_count' | 'landlord_id'> & { landlord_phone: string }) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add a property",
        variant: "destructive",
      });
      return null;
    }

    if (userRole !== 'landlord') {
      toast({
        title: "Access Denied",
        description: "Only landlords can list properties",
        variant: "destructive",
      });
      return null;
    }

    try {
      // First, update the landlord's profile with their phone number
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ phone: propertyData.landlord_phone })
        .eq('id', user.id);

      if (profileError) {
        console.error('Error updating landlord profile:', profileError);
        // Continue anyway as this is not critical
      }

      // Create the property data without the landlord_phone field
      const { landlord_phone, ...propertyInsertData } = propertyData;
      
      const { data, error } = await supabase
        .from('properties')
        .insert([
          {
            ...propertyInsertData,
            landlord_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setProperties(prev => [data, ...prev]);
      
      toast({
        title: "Success",
        description: "Property added successfully",
      });

      return data;
    } catch (error: any) {
      console.error('Error adding property:', error);
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive",
      });
      return null;
    }
  };

  const incrementPropertyViews = async (propertyId: string) => {
    try {
      await supabase.rpc('increment_property_views', {
        property_uuid: propertyId
      });
    } catch (error) {
      console.error('Error incrementing property views:', error);
    }
  };

  const updateProperty = async (propertyId: string, propertyData: Partial<Omit<Property, 'id' | 'created_at' | 'updated_at' | 'landlord_id'>>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to update a property",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', propertyId)
        .eq('landlord_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProperties(prev => 
        prev.map(p => p.id === propertyId ? data : p)
      );
      
      toast({
        title: "Success",
        description: "Property updated successfully",
      });

      return true;
    } catch (error: any) {
      console.error('Error updating property:', error);
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProperty = async (propertyId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to delete a property",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId)
        .eq('landlord_id', user.id);

      if (error) throw error;

      setProperties(prev => 
        prev.filter(p => p.id !== propertyId)
      );
      
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
      return false;
    }
  };

  const togglePropertyAvailability = async (propertyId: string, currentAvailability: boolean) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to update property availability",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('properties')
        .update({ is_available: !currentAvailability })
        .eq('id', propertyId)
        .eq('landlord_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProperties(prev => 
        prev.map(p => p.id === propertyId ? data : p)
      );
      
      toast({
        title: "Success",
        description: `Property marked as ${!currentAvailability ? 'available' : 'unavailable'}`,
      });

      return true;
    } catch (error: any) {
      console.error('Error updating property availability:', error);
      toast({
        title: "Error",
        description: "Failed to update property availability",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserRole();
    }
  }, [user]);

  return {
    properties,
    loading,
    userRole,
    addProperty,
    updateProperty,
    deleteProperty,
    togglePropertyAvailability,
    incrementPropertyViews,
    refetch: fetchProperties,
  };
};
