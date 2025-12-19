# Webflow Cloud Setup Guide

This document outlines the configuration and setup required for deploying this Next.js application to Webflow Cloud.

## Webflow CLI Setup

The Webflow CLI is installed as a dev dependency and provides commands for managing deployments and authentication.

### Installation

The CLI is already installed via `@webflow/webflow-cli`. If you need to reinstall:

```bash
npm install --save-dev @webflow/webflow-cli
```

### Authentication

Before using the CLI, authenticate with your Webflow account:

```bash
npm run webflow:auth
```

Or directly:
```bash
npx webflow auth login
```

This will open a browser window for you to log in to your Webflow account.

### Available CLI Commands

The following npm scripts are available for Webflow Cloud operations:

- `npm run webflow:auth` - Authenticate with your Webflow account
- `npm run webflow:init` - Initialize a new Webflow Cloud project (if starting fresh)
- `npm run webflow:deploy` - Deploy your application to Webflow Cloud
- `npm run webflow:status` - Check the status of your Webflow Cloud deployment

### Initial Setup (First Time)

If this is your first time setting up Webflow Cloud for this project:

1. **Authenticate**: Run `npm run webflow:auth` to log in
2. **Initialize** (if needed): Run `npm run webflow:init` to configure the project
   - Select Next.js as your framework
   - Connect to your existing Webflow site if applicable
3. **Verify configuration**: Check that `webflow.json` contains your project ID

The project is already configured with:
- Project ID: `afb36577-31e9-44e7-bc62-6bc8754dd547`
- Framework: Next.js
- Base path: `/dashboard`

## Configuration Files

### wrangler.json
This file configures the Cloudflare Workers runtime for Webflow Cloud. The file includes:
- Node.js compatibility flags for edge runtime
- Compatibility date for Cloudflare Workers features

**Note:** Webflow Cloud will auto-generate additional configuration during deployment, but this base file ensures Node.js compatibility.

### next.config.ts
Updated to include:
- `basePath: '/dashboard'` for Webflow Cloud routing
- `assetPrefix` for CDN asset delivery
- Custom image loader (`webflow-loader.ts`) for optimized image delivery
- External packages configuration for Supabase

### webflow-loader.ts
Custom image loader for Next.js Image component that handles image optimization and CDN delivery in Webflow Cloud environments.

### webflow.json
Contains Webflow Cloud project configuration:
- Project ID
- Framework type (Next.js)
- Telemetry settings

## Required Environment Variables

Set these environment variables in your Webflow Cloud environment dashboard:

### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for server-side operations)

### Stripe Configuration
- `STRIPE_SECRET_KEY` - Stripe secret key for API operations
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret (for webhook verification)

### Google Places API (if used)
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` - Google Places API key

## Deployment Steps

### Option 1: Using Webflow CLI (Recommended for Local Deployments)

1. **Authenticate**: Run `npm run webflow:auth` if you haven't already
2. **Deploy**: Run `npm run webflow:deploy` to build and deploy your application
3. **Check Status**: Run `npm run webflow:status` to view deployment status

### Option 2: Using GitHub Integration (Recommended for CI/CD)

1. **Link your GitHub repository** to Webflow Cloud
2. **Set environment variables** in the Webflow Cloud dashboard for each environment (development, staging, production)
3. **Push to your main branch** - Webflow Cloud will automatically detect changes and deploy
4. **Monitor deployment logs** in the Webflow Cloud dashboard

## Storage Bindings (Optional)

If you need to use Webflow Cloud storage features (SQLite, Key Value Store, or Object Storage), add bindings to `wrangler.json`:

```json
{
  "r2_buckets": [
    {
      "binding": "CLOUD_FILES",
      "bucket_name": "cloud-files"
    }
  ]
}
```

After adding bindings, generate type definitions:
```bash
npx wrangler types
```

## Edge Runtime Compatibility

This application has been configured for Cloudflare Workers edge runtime:
- Stripe webhook handler updated for edge compatibility
- Node.js compatibility flags enabled in wrangler.json
- External packages properly configured in next.config.js

## Troubleshooting

- **Build failures**: Check that all environment variables are set in Webflow Cloud dashboard
- **Runtime errors**: Verify Node.js compatibility flags are enabled
- **API route issues**: Ensure server-side code uses edge-compatible APIs

## Resources

- [Webflow Cloud Documentation](https://developers.webflow.com/webflow-cloud/intro)
- [Getting Started Guide](https://developers.webflow.com/webflow-cloud/getting-started)
- [Environment Configuration](https://developers.webflow.com/webflow-cloud/environment/configuration)

