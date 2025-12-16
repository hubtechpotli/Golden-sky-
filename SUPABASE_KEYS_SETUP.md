# Supabase Keys Setup Guide

## Step-by-Step Instructions

### Step 1: Create Supabase Account & Project

1. **Go to Supabase**
   - Visit [https://supabase.com](https://supabase.com)
   - Click **"Start your project"** or **"Sign Up"**

2. **Sign Up / Log In**
   - Sign up with GitHub, Google, or email
   - Verify your email if required

3. **Create New Project**
   - Click **"New Project"** button
   - Fill in the project details:
     - **Name**: `golden-sky` (or any name you prefer)
     - **Database Password**: 
       - Create a strong password (minimum 12 characters)
       - **IMPORTANT**: Save this password! You'll need it later
       - Example: `MySecurePass123!@#`
     - **Region**: Choose the closest region to your users
       - For India: Select "Southeast Asia (Singapore)" or "South Asia (Mumbai)"
     - **Pricing Plan**: Free tier is fine to start

4. **Wait for Project Setup**
   - Click **"Create new project"**
   - Wait 2-3 minutes for the project to initialize
   - You'll see a loading screen

### Step 2: Get Your API Keys

Once your project is ready:

1. **Go to Project Settings**
   - In the left sidebar, click **"Settings"** (gear icon)
   - Click **"API"** in the settings menu

2. **Copy Your Keys**
   You'll see two important values:

   **a) Project URL**
   - Look for **"Project URL"** or **"URL"**
   - It looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - Click the copy icon next to it
   - This is your `NEXT_PUBLIC_SUPABASE_URL`

   **b) API Keys**
   - Find **"Project API keys"** section
   - You'll see two keys:
     - **`anon` `public`** key (REQUIRED - copy this)
     - **`service_role` `secret`** key (OPTIONAL - only if needed for admin operations)
   - Copy the **`anon` `public`** key
   - It looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   
   **Optional - Service Role Key:**
   - Only copy this if you need admin operations that bypass RLS
   - Keep it secret - never use in frontend
   - See `SERVICE_ROLE_KEY_GUIDE.md` for details

### Step 3: Create Environment File

1. **Create `.env.local` file**
   - In your project root folder (`G:\Golden sky`)
   - Create a new file named `.env.local`
   - (If it already exists, just open it)

2. **Add Your Keys**
   Open `.env.local` and add:

   ```bash
   # Supabase Configuration (REQUIRED)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Service Role Key (OPTIONAL - only if needed for admin operations)
   # SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

   **Replace with your actual values:**
   - Replace `https://your-project-id.supabase.co` with your Project URL
   - Replace `your-anon-key-here` with your anon public key

   **Example:**
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.example
   ```

### Step 4: Verify Environment File

Make sure your `.env.local` file:
- ✅ Is in the project root (same folder as `package.json`)
- ✅ Has no spaces around the `=` sign
- ✅ Has no quotes around the values (unless they contain spaces)
- ✅ Starts with `NEXT_PUBLIC_` for client-side variables

### Step 5: Restart Development Server

1. **Stop your current server** (if running)
   - Press `Ctrl + C` in the terminal

2. **Start the server again**
   ```bash
   npm run dev
   ```

   **Important**: Next.js only reads `.env.local` when the server starts, so you must restart!

### Step 6: Test the Connection

1. **Check for Errors**
   - Look at your terminal/console
   - Should see no Supabase connection errors

2. **Test a Form Submission**
   - Go to your website
   - Submit the contact form
   - Check Supabase Dashboard → **Table Editor** → `contact_forms`
   - You should see your test data!

## 📸 Visual Guide Locations

### Where to Find Keys in Supabase Dashboard:

```
Supabase Dashboard
├── Settings (⚙️ icon in left sidebar)
    └── API
        ├── Project URL ← Copy this
        └── Project API keys
            └── anon public ← Copy this
```

## 🔒 Security Notes

1. **Never commit `.env.local` to Git**
   - It's already in `.gitignore`
   - Never share your keys publicly

2. **Use `anon` key for frontend**
   - The `anon` public key is safe for frontend use
   - It has limited permissions (controlled by RLS policies)

3. **Keep `service_role` key secret**
   - Never use it in frontend code
   - Only use in server-side code if needed

## ✅ Verification Checklist

After setup, verify:
- [ ] `.env.local` file exists in project root
- [ ] Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- [ ] No typos in the keys (check for extra spaces)
- [ ] Development server restarted after adding keys
- [ ] No errors in terminal/console
- [ ] Can submit forms and see data in Supabase

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- Check `.env.local` file exists
- Verify variable names are correct (case-sensitive)
- Make sure they start with `NEXT_PUBLIC_`
- Restart your development server

### Error: "Invalid API key"
- Double-check you copied the `anon public` key (not service_role)
- Make sure there are no extra spaces
- Verify the key wasn't truncated when copying

### Can't find API keys
- Go to Settings → API (not Database)
- Look for "Project API keys" section
- The `anon` key should be visible (it's safe to expose)

### Data not saving
- Check Supabase Dashboard → Table Editor
- Verify tables exist (run SQL schema if not)
- Check browser console for errors
- Verify RLS policies allow INSERT

## 📝 Quick Reference

**File to edit**: `.env.local` (in project root)

**Required variables**:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Where to get keys**: Supabase Dashboard → Settings → API

---

**Need help?** Check the Supabase Dashboard - it has helpful tooltips and documentation links!

