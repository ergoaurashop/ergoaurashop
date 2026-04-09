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
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    // If NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is missing, fallback to the hardcoded domain to prevent crashes.
    // This perfectly intercepts the native checkout paths and bounces them securely 
    // to Shopify's servers, totally bypassing Vercel's 404 handler.
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "hqdyqf-9e.myshopify.com";
    return [
      {
        source: '/cart/c/:path*',
        destination: `https://${shopifyDomain}/cart/c/:path*`,
        permanent: false,
      },
      {
        source: '/checkouts/:path*',
        destination: `https://${shopifyDomain}/checkouts/:path*`,
        permanent: false,
      }
    ];
  },
};

export default nextConfig;