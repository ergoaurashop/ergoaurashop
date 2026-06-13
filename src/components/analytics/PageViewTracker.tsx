"use client";

// ────────────────────────────────────────────────────────────────
// PageViewTracker  —  Fires a GA4 page_view via dataLayer on
// every route change (Next.js App Router navigation).
//
// Place once in layout.tsx inside the <body>.
// ────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pushToDataLayer } from "@/lib/analytics/gtm";

export default function PageViewTracker(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPath = useRef<string>("");

  useEffect(() => {
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Skip the very first push — GTM's built-in page_view trigger already
    // handles the initial page load from the GTM snippet.
    if (!prevPath.current) {
      prevPath.current = url;
      return;
    }

    prevPath.current = url;

    pushToDataLayer({
      event: "page_view",
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
