import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  templateId: string;
  mergeTags: Record<string, any>;
  name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, templateId, mergeTags, name }: EmailRequest = await req.json();

    const clientId = Deno.env.get('NOTIFICATIONAPI_CLIENT_ID');
    const clientSecret = Deno.env.get('NOTIFICATIONAPI_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new Error('NotificationAPI credentials not configured');
    }

    if (!templateId) {
      throw new Error('Template ID is required');
    }

    // Send email via NotificationAPI using custom template
    const response = await fetch('https://api.notificationapi.com/notifications', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationId: templateId,
        user: {
          id: to,
          email: to,
          name: name || mergeTags.name || 'User'
        },
        mergeTags: {
          ...mergeTags,
          name: name || mergeTags.name || 'User'
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NotificationAPI error:', errorText);
      throw new Error(`NotificationAPI error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Email sent successfully via NotificationAPI:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error in send-notification-email function:', error);
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