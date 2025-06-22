
-- Update the increment_property_views function to have a secure search path
CREATE OR REPLACE FUNCTION public.increment_property_views(property_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.properties 
  SET view_count = COALESCE(view_count, 0) + 1 
  WHERE id = property_uuid;
END;
$function$;

-- Also update the increment_inquiry_count function to have a secure search path
CREATE OR REPLACE FUNCTION public.increment_inquiry_count(property_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.properties 
  SET inquiry_count = COALESCE(inquiry_count, 0) + 1 
  WHERE id = property_uuid;
END;
$function$;
