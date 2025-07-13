-- Add terms acceptance tracking to profiles table
ALTER TABLE public.profiles 
ADD COLUMN terms_accepted_at TIMESTAMP WITH TIME ZONE NULL,
ADD COLUMN terms_version_accepted TEXT NULL;

-- Create a table to track terms versions
CREATE TABLE public.terms_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on terms_versions
ALTER TABLE public.terms_versions ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read terms versions (public info)
CREATE POLICY "Terms versions are publicly readable" 
ON public.terms_versions 
FOR SELECT 
USING (true);

-- Only system can manage terms versions
CREATE POLICY "System can manage terms versions" 
ON public.terms_versions 
FOR ALL 
USING (false);

-- Insert initial terms version
INSERT INTO public.terms_versions (version, content, is_current) 
VALUES ('1.0.0', 'Initial terms and conditions for DwellMerge', true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_terms_accepted()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on terms_versions
CREATE TRIGGER update_terms_versions_updated_at
BEFORE UPDATE ON public.terms_versions
FOR EACH ROW
EXECUTE FUNCTION public.update_terms_accepted();

-- Create function to check if user needs to accept terms
CREATE OR REPLACE FUNCTION public.user_needs_terms_acceptance(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT tv.version != COALESCE(p.terms_version_accepted, '')
     FROM public.terms_versions tv, public.profiles p
     WHERE tv.is_current = true 
     AND p.id = user_id
     LIMIT 1),
    true
  );
$$;