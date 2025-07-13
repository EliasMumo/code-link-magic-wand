import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TermsVersion {
  id: string;
  version: string;
  content: string;
  is_current: boolean;
  created_at: string;
}

export const useTermsAcceptance = (userId: string | undefined) => {
  const [needsAcceptance, setNeedsAcceptance] = useState<boolean>(false);
  const [currentTermsVersion, setCurrentTermsVersion] = useState<TermsVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkTermsAcceptance();
  }, [userId]);

  const checkTermsAcceptance = async () => {
    try {
      // Get current terms version
      const { data: termsData, error: termsError } = await supabase
        .from('terms_versions')
        .select('*')
        .eq('is_current', true)
        .single();

      if (termsError) {
        console.error('Error fetching terms:', termsError);
        setLoading(false);
        return;
      }

      setCurrentTermsVersion(termsData);

      // Check if user needs to accept terms using the database function
      const { data: needsAcceptanceData, error: checkError } = await supabase
        .rpc('user_needs_terms_acceptance', { user_id: userId });

      if (checkError) {
        console.error('Error checking terms acceptance:', checkError);
        setLoading(false);
        return;
      }

      setNeedsAcceptance(needsAcceptanceData);
    } catch (error) {
      console.error('Error in checkTermsAcceptance:', error);
    } finally {
      setLoading(false);
    }
  };

  const acceptTerms = async () => {
    if (!userId || !currentTermsVersion) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          terms_accepted_at: new Date().toISOString(),
          terms_version_accepted: currentTermsVersion.version
        })
        .eq('id', userId);

      if (error) {
        console.error('Error accepting terms:', error);
        toast({
          title: "Error",
          description: "Failed to accept terms. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setNeedsAcceptance(false);
      toast({
        title: "Terms Accepted",
        description: "Thank you for accepting the updated terms and conditions.",
      });
    } catch (error) {
      console.error('Error in acceptTerms:', error);
      toast({
        title: "Error",
        description: "Failed to accept terms. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    needsAcceptance,
    currentTermsVersion,
    loading,
    acceptTerms,
    checkTermsAcceptance
  };
};