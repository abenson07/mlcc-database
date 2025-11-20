import { createClient } from '@supabase/supabase-js'

/**
 * Get Supabase client with lazy initialization and runtime validation.
 * Client-side Supabase instance for use in React components and hooks.
 * Uses the anon key and respects Row Level Security (RLS) policies.
 * 
 * DO NOT use this in server-side code (getServerSideProps, API routes, etc.).
 * Use serverSupabase instead for server-side operations.
 */
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate at runtime (not during build)
  if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Webflow Cloud environment variables.'
    )
  }

  // Use fallback values during build (env vars not available)
  return createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-anon-key'
  )
}

export const supabase = getSupabaseClient()


