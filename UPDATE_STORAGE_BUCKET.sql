-- ============================================
-- Update Storage Bucket to Public
-- Run this ONLY if you've already run SUPABASE_SCHEMA.sql
-- ============================================

-- Update the documents bucket to be public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'documents';

-- If the bucket doesn't exist, create it
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Ensure public read policy exists (drop and recreate to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read documents" ON storage.objects;

CREATE POLICY "Allow public read documents" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'documents');

-- Verify the bucket is public
SELECT id, name, public FROM storage.buckets WHERE id = 'documents';

