-- Fix the search_path security issue for user_needs_terms_acceptance function
CREATE OR REPLACE FUNCTION public.user_needs_terms_acceptance(user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT COALESCE(
    (SELECT tv.version != COALESCE(p.terms_version_accepted, '')
     FROM public.terms_versions tv, public.profiles p
     WHERE tv.is_current = true 
     AND p.id = user_id
     LIMIT 1),
    true
  );
$function$;