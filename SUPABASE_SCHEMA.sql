-- ============================================
-- Supabase Database Schema for Golden Sky Website
-- ============================================
-- Instructions:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Click "New Query"
-- 4. Copy and paste this entire file
-- 5. Click "Run" to execute
-- ============================================

-- ============================================
-- 1. CONTACT FORMS TABLE
-- Stores contact form submissions from website
-- ============================================
CREATE TABLE IF NOT EXISTS contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ============================================
-- 2. AGENCY REGISTRATIONS TABLE
-- Stores complete agency registration data from dashboard
-- ============================================
CREATE TABLE IF NOT EXISTS agency_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pan_card VARCHAR(10) NOT NULL,
  agent_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255),
  mobile VARCHAR(20) NOT NULL,
  alternate_mobile VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  address TEXT,
  dra_number VARCHAR(50),
  aadhar_number VARCHAR(12),
  state VARCHAR(100),
  city VARCHAR(100),
  facebook VARCHAR(255),
  instagram VARCHAR(255),
  family_name_1 VARCHAR(255),
  family_relation_1 VARCHAR(50),
  family_mobile_1 VARCHAR(20),
  family_name_2 VARCHAR(255),
  family_relation_2 VARCHAR(50),
  family_mobile_2 VARCHAR(20),
  account_name VARCHAR(255),
  bank_name VARCHAR(255),
  account_number VARCHAR(50),
  ifsc_code VARCHAR(20),
  pan_card_file TEXT,
  aadhar_file TEXT,
  photo_file TEXT,
  bank_proof_file TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ============================================
-- 3. WHATSAPP INQUIRIES TABLE
-- Stores inquiries from WhatsApp chat widget
-- ============================================
CREATE TABLE IF NOT EXISTS whatsapp_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ============================================
-- 4. INDEXES FOR PERFORMANCE
-- Improves query speed for common searches
-- ============================================
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON contact_forms(email);

CREATE INDEX IF NOT EXISTS idx_agency_registrations_pan_card ON agency_registrations(pan_card);
CREATE INDEX IF NOT EXISTS idx_agency_registrations_email ON agency_registrations(email);
CREATE INDEX IF NOT EXISTS idx_agency_registrations_mobile ON agency_registrations(mobile);
CREATE INDEX IF NOT EXISTS idx_agency_registrations_status ON agency_registrations(status);
CREATE INDEX IF NOT EXISTS idx_agency_registrations_created_at ON agency_registrations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_phone ON whatsapp_inquiries(phone);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_created_at ON whatsapp_inquiries(created_at DESC);

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- Enable security policies for data access
-- ============================================
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. SECURITY POLICIES
-- ============================================

-- Allow anyone (public) to INSERT data (submit forms)
CREATE POLICY "Allow public insert on contact_forms" 
  ON contact_forms FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert on agency_registrations" 
  ON agency_registrations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert on whatsapp_inquiries" 
  ON whatsapp_inquiries FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users to SELECT/READ data (admins via Clerk)
-- Note: In production, you may want to restrict this further
CREATE POLICY "Allow authenticated read on contact_forms" 
  ON contact_forms FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated read on agency_registrations" 
  ON agency_registrations FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated read on whatsapp_inquiries" 
  ON whatsapp_inquiries FOR SELECT 
  USING (true);

-- Allow authenticated users to UPDATE agency registrations (for status changes)
CREATE POLICY "Allow authenticated update on agency_registrations" 
  ON agency_registrations FOR UPDATE 
  USING (true);

-- ============================================
-- 7. STORAGE BUCKET FOR DOCUMENTS
-- For storing KYC documents (PAN card, Aadhar, photos, etc.)
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policy: Allow public to upload (for form submissions)
CREATE POLICY "Allow public uploads to documents" 
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'documents'
  );

-- Storage policy: Allow public to read documents (for viewing)
CREATE POLICY "Allow public read documents" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'documents');

-- ============================================
-- 8. TRIGGER FOR UPDATED_AT TIMESTAMP
-- Automatically updates updated_at when record is modified
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agency_registrations_updated_at
  BEFORE UPDATE ON agency_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICATION QUERIES
-- Run these after creating tables to verify
-- ============================================
-- SELECT * FROM contact_forms LIMIT 5;
-- SELECT * FROM agency_registrations LIMIT 5;
-- SELECT * FROM whatsapp_inquiries LIMIT 5;
-- SELECT * FROM storage.buckets WHERE id = 'documents';

