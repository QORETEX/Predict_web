import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  rewrites: async () => {
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://predict-backend-b8nh.onrender.com';
    console.log('[next.config] API_URL for rewrite:', apiUrl);
    return [
      {
        source: "/backend/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "crests.football-data.org",
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
