import type { NextConfig } from "next";
import userConfig from './clouduser.next.config';

const webflowOverrides: NextConfig = {
  basePath: '/admin',
  assetPrefix: 'https://951df377-11b0-47c5-a27d-69f1e787a7eb.wf-app-prod.cosmic.webflow.services/admin',
  images: {
    ...userConfig.images,
    // TODO: determine whether any of the non-custom loader options (imgix, cloudinary, akamai) work
    // and if so allow them to be used here
    loader: 'custom',
    loaderFile: userConfig.images?.loaderFile || './webflow-loader.ts',
  },
};

const nextConfig: NextConfig = {
  ...userConfig,
  ...webflowOverrides,
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
