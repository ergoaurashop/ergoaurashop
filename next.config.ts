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
        hostname: "ae01.alicdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ae02.alicdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ae03.alicdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ae04.alicdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "judgeme-public-images.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pictures.judgeme.com",
        pathname: "/**",
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
