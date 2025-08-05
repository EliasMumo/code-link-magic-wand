-- Fix search_path for all remaining functions that need it
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

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role, phone, caretaker_phone, display_phone_preference)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'tenant'),
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'caretaker_phone',
    COALESCE(NEW.raw_user_meta_data ->> 'display_phone_preference', 'owner')
  );
  RETURN NEW;
END;
$function$;

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