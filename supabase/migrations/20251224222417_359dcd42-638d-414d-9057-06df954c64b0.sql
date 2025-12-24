-- 1. Make resumes bucket private
UPDATE storage.buckets SET public = false WHERE id = 'resumes';

-- 2. Drop the public SELECT policy on resumes
DROP POLICY IF EXISTS "Anyone can view resumes" ON storage.objects;

-- 3. Create admin-only SELECT policy for resumes
CREATE POLICY "Admins can view resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Create quote_requests table for data persistence
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  services TEXT[] NOT NULL,
  project_title TEXT NOT NULL,
  project_description TEXT NOT NULL,
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  existing_website TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Enable RLS on quote_requests
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 6. Allow anyone to submit quote requests (public form)
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests FOR INSERT
WITH CHECK (true);

-- 7. Only admins can view quote requests (protects PII)
CREATE POLICY "Admins can view quote requests"
ON public.quote_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 8. Only admins can update quote requests
CREATE POLICY "Admins can update quote requests"
ON public.quote_requests FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 9. Only admins can delete quote requests
CREATE POLICY "Admins can delete quote requests"
ON public.quote_requests FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 10. Add trigger for updated_at
CREATE TRIGGER update_quote_requests_updated_at
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();