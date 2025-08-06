-- Add vacancy_count field to properties table
ALTER TABLE public.properties 
ADD COLUMN vacancy_count integer DEFAULT 1 CHECK (vacancy_count >= 0);