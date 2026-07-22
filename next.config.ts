import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  experimental: {
    optimizePackageImports: ['react-hook-form', 'zod'],
  },
  async rewrites() {
    return [
      { source: '/kiosks', destination: '/kiosks/index.html' },
      { source: '/kiosks/command-center', destination: '/kiosks/command-center/index.html' },
      { source: '/kiosks/errorlens', destination: '/kiosks/errorlens/index.html' },
      { source: '/kiosks/onboarding', destination: '/kiosks/onboarding/index.html' },
    ];
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      // The original prototype shipped a /demos route; the live kiosks
      // already cover that surface, so route /demos straight to the hub.
      { source: '/demos', destination: '/kiosks', permanent: true },
      { source: '/demos/:path*', destination: '/kiosks/:path*', permanent: true },
    ];
  },
};

export default config;
