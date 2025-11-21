import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Get Supabase client with lazy initialization and runtime validation.
 * Client-side Supabase instance for use in React components and hooks.
 * Uses the anon key and respects Row Level Security (RLS) policies.
 * 
 * DO NOT use this in server-side code (getServerSideProps, API routes, etc.).
 * Use serverSupabase instead for server-side operations.
 */
let supabaseInstance: SupabaseClient | null = null;
let isPlaceholder = false;

function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // On client-side, if we have real env vars but cached a placeholder, re-initialize
  if (typeof window !== 'undefined' && supabaseUrl && supabaseAnonKey && isPlaceholder) {
    supabaseInstance = null;
    isPlaceholder = false;
  }

  // Return cached instance if available and it's not a placeholder (or we're on server)
  if (supabaseInstance && (!isPlaceholder || typeof window === 'undefined')) {
    return supabaseInstance;
  }

  try {
    // During SSR (server-side), create a placeholder client that won't cause errors
    if (typeof window === 'undefined') {
      // Return a minimal client that won't cause errors during SSR
      // This will be replaced when the component mounts on the client
      supabaseInstance = createClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey || 'placeholder-anon-key'
      );
      isPlaceholder = !supabaseUrl || !supabaseAnonKey;
      return supabaseInstance;
    }

    // Client-side: validate environment variables
    if (!supabaseUrl || !supabaseAnonKey) {
      const error = new Error(
        'Missing Supabase environment variables. ' +
        'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Webflow Cloud environment variables.'
      );
      console.error(error);
      // Still create a client with placeholders to prevent crashes
      // The actual API calls will fail, but the app won't crash
      supabaseInstance = createClient(
        'https://placeholder.supabase.co',
        'placeholder-anon-key'
      );
      isPlaceholder = true;
      return supabaseInstance;
    }

    // Create and cache the real client
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    isPlaceholder = false;
    return supabaseInstance;
  } catch (error) {
    // If client creation fails for any reason, create a placeholder
    console.error('Failed to create Supabase client:', error);
    supabaseInstance = createClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    );
    isPlaceholder = true;
    return supabaseInstance;
  }
}

// Export the client - initialization is lazy and safe
// The getSupabaseClient function handles all edge cases and never throws
export const supabase = getSupabaseClient();


