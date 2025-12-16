# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Project Name: `golden-sky` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"

## 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with the values from step 2.

## 4. Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `SUPABASE_SCHEMA.sql`
4. Click "Run" to execute the SQL
5. Verify the tables were created by going to **Table Editor**

You should see three tables:
- `contact_forms`
- `agency_registrations`
- `whatsapp_inquiries`

## 5. Set Up Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. You should see a `documents` bucket (created by the SQL script)
3. If not, create it manually:
   - Click "New bucket"
   - Name: `documents`
   - Public: `false` (private)
   - Click "Create bucket"

## 6. Configure Storage Policies (Optional)

The SQL script includes basic storage policies. You may want to adjust them based on your needs:

1. Go to **Storage** → **Policies**
2. Review and adjust policies for the `documents` bucket
3. For file uploads, ensure authenticated users can upload

## 7. Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test the forms:
   - Contact form on `/contact` page
   - Agency registration on `/dashboard` pages
   - WhatsApp chat widget (floating button)

3. Check your Supabase dashboard:
   - Go to **Table Editor**
   - You should see data appearing in the tables when forms are submitted

## 8. Row Level Security (RLS)

The tables have RLS enabled with policies that:
- Allow anyone to INSERT (submit forms)
- Restrict SELECT (reading data) - you'll need to add admin policies

To allow admin access, you can:
1. Create an admin role in Supabase
2. Add policies that allow authenticated admin users to read data
3. Or disable RLS for development (not recommended for production)

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env.local` exists and has the correct variables
- Restart your development server after adding environment variables

### Error: "relation does not exist"
- Make sure you ran the `SUPABASE_SCHEMA.sql` script
- Check that tables exist in the Table Editor

### Files not uploading
- Check that the `documents` storage bucket exists
- Verify storage policies allow uploads
- Check browser console for specific error messages

## Next Steps

- Set up authentication if you want to restrict data access
- Create admin dashboard to view submitted forms
- Set up email notifications for new form submissions
- Configure backups and monitoring

