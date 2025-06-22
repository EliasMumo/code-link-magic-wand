
-- Create table for saved searches (if not exists)
CREATE TABLE IF NOT EXISTS public.saved_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  search_name TEXT NOT NULL,
  search_criteria JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_notification_sent TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for property comparisons (if not exists)
CREATE TABLE IF NOT EXISTS public.property_comparisons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_ids UUID[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for saved searches
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;

-- Create policies for saved searches
DROP POLICY IF EXISTS "Users can view their own saved searches" ON public.saved_searches;
CREATE POLICY "Users can view their own saved searches" 
  ON public.saved_searches 
  FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own saved searches" ON public.saved_searches;
CREATE POLICY "Users can create their own saved searches" 
  ON public.saved_searches 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own saved searches" ON public.saved_searches;
CREATE POLICY "Users can update their own saved searches" 
  ON public.saved_searches 
  FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own saved searches" ON public.saved_searches;
CREATE POLICY "Users can delete their own saved searches" 
  ON public.saved_searches 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add Row Level Security (RLS) for property comparisons
ALTER TABLE public.property_comparisons ENABLE ROW LEVEL SECURITY;

-- Create policies for property comparisons
DROP POLICY IF EXISTS "Users can view their own property comparisons" ON public.property_comparisons;
CREATE POLICY "Users can view their own property comparisons" 
  ON public.property_comparisons 
  FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own property comparisons" ON public.property_comparisons;
CREATE POLICY "Users can create their own property comparisons" 
  ON public.property_comparisons 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own property comparisons" ON public.property_comparisons;
CREATE POLICY "Users can update their own property comparisons" 
  ON public.property_comparisons 
  FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own property comparisons" ON public.property_comparisons;
CREATE POLICY "Users can delete their own property comparisons" 
  ON public.property_comparisons 
  FOR DELETE 
  USING (auth.uid() = user_id);
