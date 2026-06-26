"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// ────────────────────────────────────────────────────────────────
// Meta Pixel Script Loader + PageView Tracker
//
// Loads the Meta Pixel script site-wide and fires PageView on every
// route change for SPA navigation compatibility.
//
// Uses next/script with strategy="afterInteractive" (never blocking).
//
// Must be added once in app/layout.js inside <body>.
// ────────────────────────────────────────────────────────────────

export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();

  // Fire PageView on every route change
  useEffect(() => {
    if (!pixelId) return;

    // Ensure fbq is available before tracking
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, pixelId]);

  // Don't render anything if pixel ID is not configured
  if (!pixelId) return null;

  return (
    <>
      {/* Meta Pixel base script — loads the fbq function */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
          `,
        }}
      />

      {/* Noscript fallback for when JS is disabled */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
