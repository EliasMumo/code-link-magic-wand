import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_banned: boolean;
  banned_at: string | null;
  banned_by: string | null;
  ban_reason: string | null;
  created_at: string;
}

interface AdminAction {
  id: string;
  admin_id: string;
  action_type: string;
  target_user_id: string | null;
  target_property_id: string | null;
  details: any;
  created_at: string;
}

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getAllUsers = async (): Promise<UserProfile[]> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const banUser = async (userId: string, reason?: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.rpc('ban_user', {
        target_user_id: userId,
        reason: reason || null
      });

      if (error) throw error;

      // Log admin action
      await logAdminAction('ban_user', userId, null, { reason });

      toast({
        title: "User Banned",
        description: "User has been successfully banned",
      });
    } catch (error: any) {
      console.error('Error banning user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to ban user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const unbanUser = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.rpc('unban_user', {
        target_user_id: userId
      });

      if (error) throw error;

      // Log admin action
      await logAdminAction('unban_user', userId, null, {});

      toast({
        title: "User Unbanned",
        description: "User has been successfully unbanned",
      });
    } catch (error: any) {
      console.error('Error unbanning user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to unban user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setLoading(true);
    try {
      // Delete user's properties first
      const { error: propertiesError } = await supabase
        .from('properties')
        .delete()
        .eq('landlord_id', userId);

      if (propertiesError) throw propertiesError;

      // Delete user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      // Log admin action
      await logAdminAction('delete_user', userId, null, {});

      toast({
        title: "User Deleted",
        description: "User and all their data has been deleted",
      });
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (propertyId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      // Log admin action
      await logAdminAction('delete_property', null, propertyId, {});

      toast({
        title: "Property Deleted",
        description: "Property has been successfully deleted",
      });
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getAllProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles:landlord_id (
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to fetch properties",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getAdminActions = async (): Promise<AdminAction[]> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_actions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching admin actions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin actions",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const logAdminAction = async (
    actionType: string,
    targetUserId?: string | null,
    targetPropertyId?: string | null,
    details?: any
  ) => {
    try {
      const { error } = await supabase
        .from('admin_actions')
        .insert({
          action_type: actionType,
          target_user_id: targetUserId,
          target_property_id: targetPropertyId,
          details: details || {},
          admin_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const makeUserAdmin = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);

      if (error) throw error;

      // Log admin action
      await logAdminAction('make_admin', userId, null, {});

      toast({
        title: "User Promoted",
        description: "User has been made an admin",
      });
    } catch (error: any) {
      console.error('Error making user admin:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to promote user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeAdminRole = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'tenant' })
        .eq('id', userId);

      if (error) throw error;

      // Log admin action
      await logAdminAction('remove_admin', userId, null, {});

      toast({
        title: "Admin Role Removed",
        description: "User admin privileges have been removed",
      });
    } catch (error: any) {
      console.error('Error removing admin role:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove admin role",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getAllUsers,
    banUser,
    unbanUser,
    deleteUser,
    deleteProperty,
    getAllProperties,
    getAdminActions,
    makeUserAdmin,
    removeAdminRole
  };
};