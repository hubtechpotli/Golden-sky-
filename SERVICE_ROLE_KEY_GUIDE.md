# Service Role Key Guide

## What is Service Role Key?

The **Service Role Key** is a powerful Supabase key that:
- ✅ **Bypasses Row Level Security (RLS)** - Has full database access
- ✅ **Can read/write/delete** any data regardless of policies
- ⚠️ **MUST NEVER be used in frontend code** - Only server-side
- ⚠️ **Keep it secret** - Treat it like a password

## Do You Need It?

### ✅ You DON'T need it if:
- Forms are working with `anon` key (current setup)
- Admin can view data through authenticated access
- RLS policies allow what you need

### ✅ You DO need it if:
- Admin needs to bypass RLS for bulk operations
- Need to delete records
- Need to update records without authentication
- Server-side admin operations

## For Your Current Setup

**You probably DON'T need it right now** because:
- Your RLS policies allow authenticated users to read
- Admins are authenticated via Clerk
- Forms can insert data with `anon` key

**However**, if you want admin operations to work even if RLS policies change, you can set it up.

## How to Set It Up (Optional)

### Step 1: Get Service Role Key

1. Go to Supabase Dashboard → **Settings** → **API**
2. Find **"Project API keys"** section
3. Copy the **`service_role` `secret`** key
   - ⚠️ **WARNING**: This key has full access - keep it secret!

### Step 2: Add to Environment Variables

Add to `.env.local` (NOT `.env` - this is server-side only):

```bash
# Server-side only - NEVER expose to frontend
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: 
- ❌ Do NOT add `NEXT_PUBLIC_` prefix (this is server-side only)
- ❌ Never use this in client components
- ✅ Only use in API routes or server components

### Step 3: Create Server-Side Client

I'll create a server-side Supabase client for you that uses the service role key for admin operations.

## Security Best Practices

1. **Never commit service role key** to Git
2. **Never use in frontend** - only server-side
3. **Use environment variables** - never hardcode
4. **Rotate keys** if accidentally exposed
5. **Use anon key** when possible - service role is last resort

## When to Use Each Key

| Operation | Key to Use | Location |
|-----------|-----------|----------|
| Form submissions (public) | `anon` | Frontend/Client |
| Admin viewing data | `anon` (with auth) | Frontend/Client |
| Admin bulk operations | `service_role` | Server-side only |
| Admin deleting data | `service_role` | Server-side only |
| Bypassing RLS | `service_role` | Server-side only |

---

**Recommendation**: Start with just the `anon` key. Only add `service_role` if you need admin operations that require bypassing RLS.

