import type { Metadata } from "next";
import { Suspense } from "react";
import { Nunito, Open_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_METADATA, GTM_ID } from "@/lib/constants";
import "./globals.css";
import TrustMarquee from "@/components/layout/TrustMarquee";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";

/* ── S23 Ultra fonts (Nunito headings + Open Sans body) ──
   These are scoped via CSS variables so they only apply within .s23-page. */
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE_METADATA.url),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logo/ergoauralogo.webp", type: "image/webp" },
    ],
    apple: [{ url: "/images/logo/ergoauralogo.webp", sizes: "180x180" }],
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    siteName: SITE_METADATA.title,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: SITE_METADATA.logo,
        width: 1200,
        height: 1200,
        alt: SITE_METADATA.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.logo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_METADATA.url,
  },
  category: "wellness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Playfair Display for headings */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager */}
        {GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body
        className={`min-h-screen flex flex-col ${nunito.variable} ${openSans.variable}`}
      >
        {/* JSON-LD Structured Data — site-wide schemas */}
        <OrganizationSchema />
        <WebSiteSchema />
        {/* GTM noscript fallback (shown when JS is disabled) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <TrustMarquee />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* SPA page-view tracking — wrapped in Suspense because
            PageViewTracker calls useSearchParams() which requires it. */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </body>
    </html>
  );
}
