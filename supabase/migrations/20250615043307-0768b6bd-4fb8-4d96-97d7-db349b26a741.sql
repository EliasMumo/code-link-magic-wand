
-- Add caretaker_phone column to properties table
ALTER TABLE public.properties 
ADD COLUMN caretaker_phone text;

-- Add comment to clarify the purpose of the new column
COMMENT ON COLUMN public.properties.caretaker_phone IS 'Optional caretaker phone number for property management';
