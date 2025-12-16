import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client with service role key
// This bypasses RLS and should ONLY be used in:
// - API routes
// - Server components
// - Server actions
// NEVER use in client components!

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}

// Create server client (only if service role key is provided)
// If not provided, this will be undefined and you'll use regular client
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

// Helper function to check if admin client is available
export function hasAdminAccess() {
  return supabaseAdmin !== null
}

