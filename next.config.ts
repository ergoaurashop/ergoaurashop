import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      // Wildcard pattern for total coverage of https sources
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
