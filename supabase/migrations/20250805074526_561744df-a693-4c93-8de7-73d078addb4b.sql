-- Fix the remaining function with mutable search_path
CREATE OR REPLACE FUNCTION public.update_terms_accepted()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;