
-- Create table for property analytics/performance tracking
CREATE TABLE IF NOT EXISTS public.property_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL,
  month_year DATE NOT NULL,
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  avg_time_on_market INTERVAL,
  price_changes_count INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,4) DEFAULT 0.0000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for tenant preferences analytics
CREATE TABLE IF NOT EXISTS public.tenant_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  preferred_property_types TEXT[],
  preferred_price_range_min DECIMAL,
  preferred_price_range_max DECIMAL,
  preferred_locations TEXT[],
  preferred_amenities TEXT[],
  preferred_bedrooms INTEGER,
  preferred_bathrooms INTEGER,
  search_frequency INTEGER DEFAULT 0,
  last_search_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for rent calculator history
CREATE TABLE IF NOT EXISTS public.rent_calculations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  property_type TEXT NOT NULL,
  location TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  amenities TEXT[],
  calculated_rent DECIMAL NOT NULL,
  market_comparison JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for property analytics
ALTER TABLE public.property_analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Landlords can view their property analytics" ON public.property_analytics;
CREATE POLICY "Landlords can view their property analytics" 
  ON public.property_analytics 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p 
      WHERE p.id = property_analytics.property_id 
      AND p.landlord_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "System can insert property analytics" ON public.property_analytics;
CREATE POLICY "System can insert property analytics" 
  ON public.property_analytics 
  FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "System can update property analytics" ON public.property_analytics;
CREATE POLICY "System can update property analytics" 
  ON public.property_analytics 
  FOR UPDATE 
  USING (true);

-- Add RLS policies for tenant preferences
ALTER TABLE public.tenant_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own preferences" ON public.tenant_preferences;
CREATE POLICY "Users can view their own preferences" 
  ON public.tenant_preferences 
  FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own preferences" ON public.tenant_preferences;
CREATE POLICY "Users can create their own preferences" 
  ON public.tenant_preferences 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own preferences" ON public.tenant_preferences;
CREATE POLICY "Users can update their own preferences" 
  ON public.tenant_preferences 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add RLS policies for rent calculations
ALTER TABLE public.rent_calculations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view rent calculations" ON public.rent_calculations;
CREATE POLICY "Anyone can view rent calculations" 
  ON public.rent_calculations 
  FOR SELECT 
  TO authenticated;

DROP POLICY IF EXISTS "Users can create rent calculations" ON public.rent_calculations;
CREATE POLICY "Users can create rent calculations" 
  ON public.rent_calculations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_analytics_property_month 
  ON public.property_analytics(property_id, month_year);

CREATE INDEX IF NOT EXISTS idx_tenant_preferences_user 
  ON public.tenant_preferences(user_id);

CREATE INDEX IF NOT EXISTS idx_rent_calculations_location_type 
  ON public.rent_calculations(location, property_type);
