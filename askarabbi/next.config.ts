import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://eu-assets.i.posthog.com https://static.cloudflareinsights.com https://pagead2.googlesyndication.com https://ep2.adtrafficquality.google; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google; font-src 'self' data:; connect-src 'self' eu.i.posthog.com eu-assets.i.posthog.com wss://*.convex.cloud https://ep1.adtrafficquality.google https://csi.gstatic.com; frame-src https://googleads.g.doubleclick.net https://ep2.adtrafficquality.google https://www.google.com; frame-ancestors https://dave.is-a.dev;",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
