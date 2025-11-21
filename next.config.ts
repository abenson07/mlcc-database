import type { NextConfig } from "next";

// User config is optional - Webflow Cloud may provide it at build time
// For now, we'll use sensible defaults
const userConfig: Partial<NextConfig> = {};

const webflowOverrides: NextConfig = {
  basePath: '/dashboard',
  assetPrefix: 'https://2dfba7bb-ccf3-4e8e-b4ff-cd72e2cae6e1.wf-app-prod.cosmic.webflow.services/dashboard',
  images: {
    ...userConfig.images,
    // TODO: determine whether any of the non-custom loader options (imgix, cloudinary, akamai) work
    // and if so allow them to be used here
    loader: 'custom',
    loaderFile: userConfig.images?.loaderFile || './webflow-loader.ts',
  },
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@supabase/supabase-js'],
  ...userConfig,
  ...webflowOverrides,
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
