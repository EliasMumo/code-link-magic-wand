import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplate {
  templateId: string;
  to: string;
  mergeTags: Record<string, any>;
  name?: string;
}

export const useEmailService = () => {
  const { toast } = useToast();

  const sendEmail = async (emailData: EmailTemplate) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-notification-email', {
        body: emailData,
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Email sending failed:', error);
      toast({
        title: 'Email Error',
        description: 'Failed to send email. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Pre-configured email templates
  const sendWelcomeEmail = async (to: string, name: string) => {
    return sendEmail({
      templateId: 'welcome_email',
      to,
      name,
      mergeTags: {
        name,
      },
    });
  };

  const sendPropertyInquiry = async (
    landlordEmail: string,
    landlordName: string,
    propertyTitle: string,
    tenantName: string,
    tenantEmail: string,
    message: string
  ) => {
    return sendEmail({
      templateId: 'property_inquiry',
      to: landlordEmail,
      name: landlordName,
      mergeTags: {
        landlord_name: landlordName,
        property_title: propertyTitle,
        tenant_name: tenantName,
        tenant_email: tenantEmail,
        inquiry_message: message,
      },
    });
  };

  const sendPasswordReset = async (to: string, name: string, resetLink: string) => {
    return sendEmail({
      templateId: 'password_reset',
      to,
      name,
      mergeTags: {
        name,
        reset_link: resetLink,
      },
    });
  };

  const sendPropertyListingConfirmation = async (
    to: string,
    name: string,
    propertyTitle: string,
    propertyId: string
  ) => {
    return sendEmail({
      templateId: 'property_listed',
      to,
      name,
      mergeTags: {
        name,
        property_title: propertyTitle,
        property_url: `${window.location.origin}/?property=${propertyId}`,
      },
    });
  };

  return {
    sendEmail,
    sendWelcomeEmail,
    sendPropertyInquiry,
    sendPasswordReset,
    sendPropertyListingConfirmation,
  };
};