-- Create storage bucket for property videos
INSERT INTO storage.buckets (id, name, public) VALUES ('property-videos', 'property-videos', true);

-- Create storage policies for property videos
CREATE POLICY "Anyone can view property videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'property-videos');

CREATE POLICY "Landlords can upload property videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'property-videos' 
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Landlords can update their property videos" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'property-videos' 
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Landlords can delete their property videos" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'property-videos' 
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);