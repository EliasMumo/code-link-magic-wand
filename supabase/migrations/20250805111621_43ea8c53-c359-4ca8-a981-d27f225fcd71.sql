-- Update profiles table to support admin role and add admin-specific columns
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_banned boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS banned_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS banned_by uuid,
ADD COLUMN IF NOT EXISTS ban_reason text;

-- Create admin management functions
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role = 'admin' FROM public.profiles WHERE id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Create function to ban users
CREATE OR REPLACE FUNCTION public.ban_user(target_user_id uuid, reason text DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Only admins can ban users';
  END IF;
  
  -- Prevent admins from banning themselves
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot ban yourself';
  END IF;
  
  -- Ban the user
  UPDATE public.profiles 
  SET 
    is_banned = true,
    banned_at = now(),
    banned_by = auth.uid(),
    ban_reason = reason
  WHERE id = target_user_id;
END;
$$;

-- Create function to unban users
CREATE OR REPLACE FUNCTION public.unban_user(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Only admins can unban users';
  END IF;
  
  -- Unban the user
  UPDATE public.profiles 
  SET 
    is_banned = false,
    banned_at = NULL,
    banned_by = NULL,
    ban_reason = NULL
  WHERE id = target_user_id;
END;
$$;

-- Create RLS policies for admin access
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin(auth.uid()) OR auth.uid() = id);

CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (public.is_admin(auth.uid()) OR auth.uid() = id);

CREATE POLICY "Admins can delete any profile" 
ON public.profiles 
FOR DELETE 
USING (public.is_admin(auth.uid()));

-- Update properties policies for admin access
CREATE POLICY "Admins can view all properties" 
ON public.properties 
FOR SELECT 
USING (public.is_admin(auth.uid()) OR is_available = true);

CREATE POLICY "Admins can update any property" 
ON public.properties 
FOR UPDATE 
USING (public.is_admin(auth.uid()) OR landlord_id = auth.uid());

CREATE POLICY "Admins can delete any property" 
ON public.properties 
FOR DELETE 
USING (public.is_admin(auth.uid()) OR landlord_id = auth.uid());

-- Prevent banned users from creating content
CREATE POLICY "Banned users cannot create properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_banned = true
  )
);

-- Create admin audit log table
CREATE TABLE public.admin_actions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id uuid NOT NULL,
  action_type text NOT NULL,
  target_user_id uuid,
  target_property_id uuid,
  details jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on admin actions
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- Only admins can view and create admin actions
CREATE POLICY "Admins can view admin actions" 
ON public.admin_actions 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can create admin actions" 
ON public.admin_actions 
FOR INSERT 
WITH CHECK (public.is_admin(auth.uid()) AND admin_id = auth.uid());