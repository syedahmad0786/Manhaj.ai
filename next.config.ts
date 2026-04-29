import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['react-hook-form', 'zod'],
  },
  async redirects() {
    return [
      // The original prototype shipped a /demos route; the live kiosks
      // already cover that surface, so route /demos straight to the hub.
      { source: '/demos', destination: '/kiosks/', permanent: true },
      { source: '/demos/:path*', destination: '/kiosks/:path*', permanent: true },
    ];
  },
};

export default config;
