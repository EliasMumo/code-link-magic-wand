
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, properties } = await req.json()
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY')
    
    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key not configured')
    }

    // Create a prompt for Deepseek to analyze the search query and rank properties
    const prompt = `You are a real estate search assistant. Analyze the user's search query and rank the provided properties based on relevance.

User Query: "${query}"

Properties:
${properties.map((p: any, index: number) => `
${index + 1}. ${p.title}
   - Location: ${p.location}
   - Price: $${p.price}/month
   - Type: ${p.property_type}
   - Bedrooms: ${p.bedrooms}
   - Bathrooms: ${p.bathrooms}
   - Description: ${p.description || 'No description'}
   - Amenities: ${p.amenities ? p.amenities.join(', ') : 'None listed'}
`).join('')}

Instructions:
1. Analyze the user's search intent and requirements
2. Rank properties from most relevant (1) to least relevant
3. Provide a relevance score (0-100) for each property
4. Include a brief explanation for the top 3 rankings

Return ONLY a JSON object with this structure:
{
  "rankings": [
    {"propertyIndex": 0, "score": 95, "explanation": "Perfect match because..."},
    {"propertyIndex": 1, "score": 85, "explanation": "Good match due to..."}
  ],
  "searchInsights": "Brief summary of what the user is looking for"
}`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://rental-property-platform.lovable.app',
        'X-Title': 'Property Search Assistant'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Parse the AI response
    let parsedResponse
    try {
      parsedResponse = JSON.parse(aiResponse)
    } catch (e) {
      // Fallback if AI doesn't return valid JSON
      console.error('Failed to parse AI response:', aiResponse)
      parsedResponse = {
        rankings: properties.map((_: any, index: number) => ({
          propertyIndex: index,
          score: 50,
          explanation: "Standard relevance"
        })),
        searchInsights: "Unable to analyze search query"
      }
    }

    return new Response(
      JSON.stringify(parsedResponse),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Smart search error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
