-- Add currency column to properties table
ALTER TABLE public.properties 
ADD COLUMN currency text DEFAULT 'USD' NOT NULL;