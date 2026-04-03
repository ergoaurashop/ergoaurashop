import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { CategorySlider } from "@/components/layout/CategorySlider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { getAllCollections } from "@/lib/shopify";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ErgoAura — Live Aligned.",
    template: "%s | ErgoAura",
  },
  description:
    "Shop UAE's best viral products at ErgoAura. Free delivery over $50. Premium dropshipping store.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ergoaurashop.com"
  ),
  openGraph: {
    siteName: "ErgoAura",
    type: "website",
    locale: "en_AE",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch collections for global navigation slider
  const collections = await getAllCollections();

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-ergo-text bg-ergo-white font-sans">
        <CartProvider>
          <Header />
          <CategorySlider collections={collections} />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileNav />
        </CartProvider>
      </body>
    </html>
  );
}
