import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Kiosk HTML files live under /public/kiosks/ and must be served verbatim.
  // Next serves anything in /public at the same path; no extra config needed.
  experimental: {
    optimizePackageImports: ['react-hook-form', 'zod'],
  },
};

export default config;
