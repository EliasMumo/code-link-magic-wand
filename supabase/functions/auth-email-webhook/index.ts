import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuthEmailData {
  user: {
    id: string;
    email: string;
    user_metadata?: any;
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: string;
    site_url: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authData: AuthEmailData = await req.json();
    const { user, email_data } = authData;
    
    console.log('Auth email webhook triggered:', {
      email: user.email,
      action: email_data.email_action_type
    });

    const clientId = Deno.env.get('NOTIFICATIONAPI_CLIENT_ID');
    const clientSecret = Deno.env.get('NOTIFICATIONAPI_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new Error('NotificationAPI credentials not configured');
    }

    // Determine template and merge tags based on email action type
    let templateId: string;
    let mergeTags: Record<string, any> = {};

    switch (email_data.email_action_type) {
      case 'signup':
        templateId = 'dwellmerge_signup_confirmation';
        mergeTags = {
          name: user.user_metadata?.first_name || 'User',
          confirmation_url: `${email_data.site_url}/auth/confirm?token_hash=${email_data.token_hash}&type=signup&redirect_to=${encodeURIComponent(email_data.redirect_to)}`,
          company_name: 'DwellMerge'
        };
        break;
      
      case 'recovery':
        templateId = 'dwellmerge_password_reset';
        mergeTags = {
          name: user.user_metadata?.first_name || 'User',
          reset_url: `${email_data.site_url}/auth/confirm?token_hash=${email_data.token_hash}&type=recovery&redirect_to=${encodeURIComponent(email_data.redirect_to)}`,
          company_name: 'DwellMerge'
        };
        break;
      
      case 'email_change':
        templateId = 'dwellmerge_email_change';
        mergeTags = {
          name: user.user_metadata?.first_name || 'User',
          confirmation_url: `${email_data.site_url}/auth/confirm?token_hash=${email_data.token_hash}&type=email_change&redirect_to=${encodeURIComponent(email_data.redirect_to)}`,
          company_name: 'DwellMerge'
        };
        break;
      
      default:
        console.log(`Unknown email action type: ${email_data.email_action_type}`);
        return new Response(JSON.stringify({ success: true, message: 'Unknown action type, skipped' }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
    }

    // Send email via NotificationAPI
    const response = await fetch('https://api.notificationapi.com/notifications', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationId: templateId,
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.first_name || 'User'
        },
        mergeTags
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NotificationAPI error:', errorText);
      throw new Error(`NotificationAPI error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Auth email sent successfully via NotificationAPI:', {
      template: templateId,
      email: user.email
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error in auth-email-webhook function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);