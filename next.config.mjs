import { execSync } from 'child_process';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_BUILD_ID: (() => {
      try {
        return execSync('git rev-parse --short HEAD').toString().trim();
      } catch {
        return 'unknown';
      }
    })(),
  },
  async rewrites() {
    const authUrl = process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL
    const restUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const rewrites = []
    if (authUrl) {
      rewrites.push({
        source: '/supabase-auth/:path*',
        destination: `${authUrl}/:path*`,
      })
    }
    if (restUrl) {
      rewrites.push({
        source: '/supabase-rest/:path*',
        destination: `${restUrl}/:path*`,
      })
    }
    return rewrites
  },
};

export default nextConfig;
