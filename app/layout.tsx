import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { CategorySlider } from "@/components/layout/CategorySlider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { getAllCollections, getRecentProducts, getShopInfo } from "@/lib/shopify";
import { Shop } from "@/lib/shopify/types";
import IntegrationsWrapper from "@/components/integrations/IntegrationsWrapper";
import Script from "next/script";
import { CustomerProvider } from "@/components/providers/CustomerProvider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const shop = await getShopInfo();
  
  return {
    title: {
      default: `${shop?.name || "ErgoAura"} — ${shop?.brand?.slogan || "Live Aligned"}`,
      template: `%s | ${shop?.name || "ErgoAura"}`,
    },
    description: shop?.description || "Shop the latest viral products and best deals at ErgoAura.",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://ergoaurashop.com"
    ),
    openGraph: {
      siteName: shop?.name || "ErgoAura",
      type: "website",
      locale: "en_AE",
      url: "https://ergoaurashop.com",
      images: shop?.brand?.logo?.image?.url ? [{ url: shop.brand.logo.image.url }] : [],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global store data
  const [collections, recentProducts, shop] = await Promise.all([
    getAllCollections(),
    getRecentProducts(),
    getShopInfo(),
  ]);

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-ergo-text bg-ergo-white font-sans">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <CustomerProvider>
          <CartProvider>
            <Header shop={shop as Shop} />
            <CategorySlider collections={collections} />
            <main className="flex-grow">{children}</main>
            <Footer shop={shop as Shop} />
            <CartDrawer />
            <MobileNav />
            <IntegrationsWrapper recentProducts={recentProducts as any} />
          </CartProvider>
        </CustomerProvider>
        <Analytics />
      </body>
    </html>
  );
}
