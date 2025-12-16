# Admin Panel Setup Guide

## Overview
The admin panel is restricted to authorized administrators only. Regular users cannot create accounts or access admin features.

## Setting Up Admin Access

### 1. Configure Admin Emails

Edit `lib/admin.ts` and add your admin email addresses:

```typescript
const ADMIN_EMAILS = [
  "your-admin-email@example.com", // Add your admin email here
  "another-admin@example.com",     // Add more as needed
]
```

### 2. Disable Public Sign-Up in Clerk

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **User & Authentication** → **Email, Phone, Username**
3. Under **Sign-up options**, disable public sign-up:
   - Turn OFF "Allow users to sign up"
   - This prevents anyone from creating new accounts

### 3. Invite Admin Users

Since public sign-up is disabled, you need to invite admins:

1. In Clerk Dashboard, go to **Users**
2. Click **+ Invite user**
3. Enter the admin's email address
4. Send the invitation
5. The admin will receive an email to create their account

### 4. Alternative: Use Clerk Organizations (Recommended for Multiple Admins)

For better admin management:

1. In Clerk Dashboard, go to **Organizations**
2. Create a new organization called "Admins"
3. Add admin users to this organization
4. Update `lib/admin.ts` to check organization membership:

```typescript
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function requireAdmin() {
  const { userId, orgRole } = await auth()
  
  if (!userId) {
    redirect("/sign-in?redirect_url=/admin")
  }

  // Check if user is in Admin organization with admin role
  if (orgRole !== "org:admin") {
    redirect("/unauthorized")
  }

  return { userId }
}
```

## Protected Routes

The following routes are protected and require admin authentication:

- `/dashboard/*` - Agency registration forms (admin only)
- `/admin/*` - Admin dashboard to view submissions

## Admin Features

### Admin Dashboard (`/admin`)
- View all contact form submissions
- View all agency registrations
- View all WhatsApp inquiries
- Filter and manage submissions
- View detailed registration information

### Registration Forms (`/dashboard`)
- Fill agency registration details
- Upload KYC documents
- Manage registration status

## Security Notes

1. **Never commit admin emails** to version control
2. **Use environment variables** for sensitive admin lists in production
3. **Regularly review** who has admin access
4. **Use Clerk Organizations** for better access control
5. **Enable 2FA** for admin accounts in Clerk

## Testing Admin Access

1. Sign in with an admin email
2. You should see "Admin Panel" button in header
3. Access `/admin` to view dashboard
4. Access `/dashboard` to fill registration forms

## Troubleshooting

### "Access Denied" Error
- Check that your email is in `ADMIN_EMAILS` array
- Verify you're signed in with the correct account
- Clear browser cache and cookies

### Can't Sign In
- Make sure public sign-up is disabled
- Use the invitation link from Clerk
- Check spam folder for invitation email

### Admin Panel Not Loading
- Check Supabase connection
- Verify environment variables are set
- Check browser console for errors

