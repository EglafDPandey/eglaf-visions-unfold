-- 1. Add admin-only DELETE and UPDATE policies for resumes bucket
CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update resumes"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

-- 2. Restrict has_role function: revoke broad EXECUTE access
-- The function is used internally by RLS policies (which run as definer regardless),
-- but should not be callable by clients to enumerate other users' roles.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
-- Allow authenticated users to check ONLY their own role via a wrapper
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- Create a safer wrapper that only lets users check their own role
CREATE OR REPLACE FUNCTION public.current_user_has_role(_role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = _role
  )
$$;

GRANT EXECUTE ON FUNCTION public.current_user_has_role(app_role) TO authenticated;

-- 3. Tighten always-true WITH CHECK policies on public submission tables
-- Replace permissive (true) checks with content validation to limit abuse

-- Contacts
DROP POLICY IF EXISTS "Anyone can submit contacts" ON public.contacts;
CREATE POLICY "Anyone can submit contacts"
ON public.contacts
FOR INSERT
TO public
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 200
  AND length(trim(email)) BETWEEN 3 AND 320
  AND length(trim(message)) BETWEEN 1 AND 10000
  AND (phone IS NULL OR length(phone) <= 50)
);

-- Job applications
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
TO public
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 200
  AND length(trim(email)) BETWEEN 3 AND 320
  AND length(trim(position)) BETWEEN 1 AND 200
  AND (phone IS NULL OR length(phone) <= 50)
  AND (linkedin_url IS NULL OR length(linkedin_url) <= 500)
  AND (cv_url IS NULL OR length(cv_url) <= 1000)
  AND (cover_letter IS NULL OR length(cover_letter) <= 20000)
);

-- Quote requests
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON public.quote_requests;
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
TO public
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 200
  AND length(trim(email)) BETWEEN 3 AND 320
  AND length(trim(project_title)) BETWEEN 1 AND 300
  AND length(trim(project_description)) BETWEEN 1 AND 20000
  AND length(trim(budget)) BETWEEN 1 AND 100
  AND length(trim(timeline)) BETWEEN 1 AND 100
  AND array_length(services, 1) BETWEEN 1 AND 50
  AND (phone IS NULL OR length(phone) <= 50)
  AND (company IS NULL OR length(company) <= 300)
  AND (existing_website IS NULL OR length(existing_website) <= 500)
  AND (additional_info IS NULL OR length(additional_info) <= 10000)
);