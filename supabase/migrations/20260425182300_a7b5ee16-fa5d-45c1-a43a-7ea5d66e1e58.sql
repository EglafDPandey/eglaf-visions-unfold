-- 1. Restrict user_roles INSERT/UPDATE/DELETE to admins only (prevents privilege escalation)
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Tighten resumes bucket INSERT policy with file size + content-type restrictions
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;

CREATE POLICY "Public can upload resumes with restrictions"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'resumes'
  AND (metadata->>'size')::bigint <= 5242880  -- 5 MB max
  AND (
    (metadata->>'mimetype') IN (
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
  )
);