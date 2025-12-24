-- Create job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT NOT NULL,
  linkedin_url TEXT,
  cv_url TEXT,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit an application (INSERT)
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

-- Policy: Only admins can view applications
CREATE POLICY "Admins can view all job applications"
ON public.job_applications
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Only admins can update applications
CREATE POLICY "Admins can update job applications"
ON public.job_applications
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Only admins can delete applications
CREATE POLICY "Admins can delete job applications"
ON public.job_applications
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for CVs (public so we can access them)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true);

-- Storage policy: Anyone can upload resumes
CREATE POLICY "Anyone can upload resumes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Storage policy: Anyone can view resumes (needed for download)
CREATE POLICY "Anyone can view resumes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes');