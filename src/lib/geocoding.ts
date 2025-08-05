export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeocodingResult {
  coordinates: Coordinates;
  formatted_address: string;
}

export const geocodeAddress = async (
  streetAddress: string,
  city: string,
  state: string,
  country: string,
  postalCode: string
): Promise<GeocodingResult | null> => {
  try {
    // Construct full address
    const addressParts = [streetAddress, city, state, postalCode, country].filter(Boolean);
    const fullAddress = addressParts.join(', ');
    
    // Use Mapbox Geocoding API
    const mapboxToken = await getMapboxToken();
    if (!mapboxToken) {
      throw new Error('Mapbox token not available');
    }

    const encodedAddress = encodeURIComponent(fullAddress);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&limit=1`
    );

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const [longitude, latitude] = feature.center;
      
      return {
        coordinates: { latitude, longitude },
        formatted_address: feature.place_name
      };
    }

    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

// Helper function to get Mapbox token
const getMapboxToken = async (): Promise<string | null> => {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    const { data, error } = await supabase.functions.invoke('get-mapbox-token');
    if (error) throw error;
    return data.token;
  } catch (error) {
    console.error('Error fetching Mapbox token:', error);
    return null;
  }
};