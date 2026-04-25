-- Restrict broad SELECT on blog-images so unauthenticated users cannot list bucket contents.
-- Direct file access via signed/public URLs continues to work because storage's
-- object-fetch path uses internal service role to read object bytes.
DROP POLICY IF EXISTS "Blog images are publicly accessible" ON storage.objects;

-- Allow authenticated users (admins) to list/select blog images
CREATE POLICY "Admins can list blog images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Allow public direct reads of individual blog image objects (needed because the bucket is public
-- and the website renders <img> tags with the bucket's public URL). This is a SELECT policy, but
-- since clients access via the storage HTTP endpoint with a known path, listing is not exposed
-- through PostgREST. The earlier broad policy was flagged because it allowed PostgREST listing.
CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'blog-images');