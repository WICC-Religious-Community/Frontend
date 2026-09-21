import type { NextConfig } from 'next';

const mediaHosts = (process.env.NEXT_PUBLIC_MEDIA_HOSTS ?? '')
  .split(',')
  .map(host => host.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.ytimg.com', pathname: '/**' },
      // Media/CDN hosts are deployment-specific: NEXT_PUBLIC_MEDIA_HOSTS="cdn.example.org,img.example.org"
      ...mediaHosts.map(hostname => ({ protocol: 'https' as const, hostname, pathname: '/**' })),
    ],
    formats: ['image/webp', 'image/avif'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(self)',
      },
    ];
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
