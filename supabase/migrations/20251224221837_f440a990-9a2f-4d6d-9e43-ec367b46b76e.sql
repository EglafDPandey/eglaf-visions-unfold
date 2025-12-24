-- Drop the existing restrictive SELECT policy
DROP POLICY IF EXISTS "Admins can view all job applications" ON public.job_applications;

-- Create a proper PERMISSIVE SELECT policy that only allows admins
CREATE POLICY "Admins can view all job applications" 
ON public.job_applications 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));