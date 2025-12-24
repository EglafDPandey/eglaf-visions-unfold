-- Drop the existing restrictive INSERT policy and create a permissive one
DROP POLICY IF EXISTS "Anyone can submit contacts" ON public.contacts;

CREATE POLICY "Anyone can submit contacts"
ON public.contacts
FOR INSERT
TO public
WITH CHECK (true);

-- Also fix the admin policies to be permissive
DROP POLICY IF EXISTS "Admins can view contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can delete contacts" ON public.contacts;

CREATE POLICY "Admins can view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));