# Database Setup Guide - Step by Step

## 📋 Quick Setup Instructions

### Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Project Name**: `golden-sky` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to initialize

### Step 2: Get Your API Keys
1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Add Environment Variables
Create or edit `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Create Database Tables
1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open the file `SUPABASE_SCHEMA.sql` from your project
4. Copy **ALL** the contents
5. Paste into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Step 5: Verify Tables Created
1. Go to **Table Editor** in Supabase Dashboard
2. You should see 3 tables:
   - ✅ `contact_forms`
   - ✅ `agency_registrations`
   - ✅ `whatsapp_inquiries`

### Step 6: Verify Storage Bucket
1. Go to **Storage** in Supabase Dashboard
2. You should see a bucket named `documents`
3. If not visible, the SQL script created it automatically

### Step 7: Test the Setup
1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Submit a test form on your website
3. Go back to Supabase → **Table Editor**
4. Check the table - you should see your test data!

## 📊 Database Tables Overview

### 1. `contact_forms`
Stores contact form submissions:
- name, email, phone, message
- created_at timestamp

### 2. `agency_registrations`
Stores complete agency registration data:
- Personal info (name, PAN, Aadhar, etc.)
- Contact details (mobile, email, address)
- Family relations
- Bank account details
- KYC document file URLs
- Status (pending/approved/rejected)

### 3. `whatsapp_inquiries`
Stores WhatsApp chat inquiries:
- name, phone, service, message
- created_at timestamp

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public can INSERT** (submit forms)
- **Authenticated users can READ** (admins via Clerk)
- **Storage bucket** for document uploads

## ✅ Verification Checklist

After running the SQL:
- [ ] All 3 tables appear in Table Editor
- [ ] Storage bucket "documents" exists
- [ ] Can see table structures with all columns
- [ ] No errors in SQL Editor
- [ ] Environment variables are set
- [ ] Test form submission works

## 🐛 Troubleshooting

### Error: "relation does not exist"
- Make sure you ran the entire SQL file
- Check that all CREATE TABLE statements executed

### Error: "permission denied"
- Check RLS policies are created
- Verify storage policies exist

### No data appearing
- Check environment variables are correct
- Verify Supabase connection in browser console
- Check RLS policies allow INSERT

## 📝 Next Steps

1. ✅ Database tables created
2. ✅ Environment variables set
3. ✅ Test form submission
4. ✅ Verify data in Supabase
5. ✅ Set up admin access (see ADMIN_SETUP.md)

---

**File to use**: `SUPABASE_SCHEMA.sql` - Copy and paste this entire file into Supabase SQL Editor!

