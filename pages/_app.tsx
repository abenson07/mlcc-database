import type { AppProps } from "next/app";
import { ToastProvider } from "@/components/common/ToastProvider";
import "@/styles/globals.css";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  // Log environment variable status in development/client-side
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
      const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!hasUrl || !hasKey) {
        console.warn('⚠️ Supabase environment variables missing:', {
          hasUrl,
          hasKey,
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'missing',
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'missing'
        });
      }
    }
  }, []);

  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
};

export default App;

