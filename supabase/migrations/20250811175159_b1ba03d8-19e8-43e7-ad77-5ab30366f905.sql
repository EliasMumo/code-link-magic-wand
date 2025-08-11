-- Update the handle_new_user function to handle Google OAuth users without explicit role
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
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', SPLIT_PART(NEW.raw_user_meta_data ->> 'full_name', ' ', 1), ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', SPLIT_PART(NEW.raw_user_meta_data ->> 'full_name', ' ', 2), ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'tenant'),
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'caretaker_phone',
    COALESCE(NEW.raw_user_meta_data ->> 'display_phone_preference', 'owner')
  );
  RETURN NEW;
END;
$function$;