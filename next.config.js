/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      }
    ],
  },
  // Add stricter hydration settings to catch issues
  reactStrictMode: true,
  experimental: {
    // Use React 18's streaming and SSR features
    serverComponents: true,
    // Catch all SSR errors and show fallbacks automatically
    missingSuspenseWithCSRboundary: 'warn',
  }
};

export default nextConfig;
