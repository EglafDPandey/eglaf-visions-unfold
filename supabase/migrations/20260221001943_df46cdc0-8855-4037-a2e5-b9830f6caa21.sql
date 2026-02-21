
-- Add category and tags columns to blogs table
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Create blog-images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view blog images (public bucket)
CREATE POLICY "Blog images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow admins to upload blog images
CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update blog images
CREATE POLICY "Admins can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete blog images
CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
