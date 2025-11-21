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

function getSupabaseClient(): SupabaseClient {
  // Return cached instance if available
  if (supabaseInstance) {
    return supabaseInstance;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // During SSR (server-side), create a placeholder client that won't cause errors
    if (typeof window === 'undefined') {
      // Return a minimal client that won't cause errors during SSR
      // This will be replaced when the component mounts on the client
      supabaseInstance = createClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey || 'placeholder-anon-key'
      );
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
      return supabaseInstance;
    }

    // Create and cache the client
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
  } catch (error) {
    // If client creation fails for any reason, create a placeholder
    console.error('Failed to create Supabase client:', error);
    supabaseInstance = createClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    );
    return supabaseInstance;
  }
}

// Export the client - initialization is lazy and safe
// The getSupabaseClient function handles all edge cases and never throws
export const supabase = getSupabaseClient();


