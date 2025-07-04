-- Add video support to properties table
ALTER TABLE public.properties 
ADD COLUMN videos text[] DEFAULT NULL;

-- Add comment for clarity
COMMENT ON COLUMN public.properties.videos IS 'Array of video URLs or file paths for property videos';