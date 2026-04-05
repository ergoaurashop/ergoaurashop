import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/cart/c/:path*',
        destination: 'https://hqdyqf-9e.myshopify.com/cart/c/:path*',
      },
      {
        source: '/checkouts/:path*',
        destination: 'https://hqdyqf-9e.myshopify.com/checkouts/:path*',
      },
      {
        source: '/cart/:path*',
        destination: 'https://hqdyqf-9e.myshopify.com/cart/:path*',
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hqdyqf-9e.myshopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.alicdn.com",
      },
      {
        protocol: "https",
        hostname: "*.judgeme.com",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;