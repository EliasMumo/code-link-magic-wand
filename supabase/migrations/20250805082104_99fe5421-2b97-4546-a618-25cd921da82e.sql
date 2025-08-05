-- Add detailed address fields and coordinates to properties table
ALTER TABLE public.properties 
ADD COLUMN street_address TEXT,
ADD COLUMN city TEXT,
ADD COLUMN state TEXT,
ADD COLUMN country TEXT,
ADD COLUMN postal_code TEXT,
ADD COLUMN latitude FLOAT8,
ADD COLUMN longitude FLOAT8;

-- Create index for location-based queries
CREATE INDEX idx_properties_coordinates ON public.properties(latitude, longitude);
CREATE INDEX idx_properties_location ON public.properties(city, state, country);