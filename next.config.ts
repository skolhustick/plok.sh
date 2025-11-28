import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "img-src 'self' https: data:",
              "style-src 'self' 'unsafe-inline'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api.github.com https://raw.githubusercontent.com https://www.google-analytics.com https://www.googletagmanager.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
