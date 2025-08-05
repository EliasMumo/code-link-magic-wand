-- Add detailed address fields to properties table (coordinates already exist)
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS street_address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT;

-- Create index for location-based queries
CREATE INDEX IF NOT EXISTS idx_properties_coordinates ON public.properties(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_properties_location ON public.properties(city, state, country);