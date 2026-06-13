"use client";

// ────────────────────────────────────────────────────────────────
// useScrollDepth  —  Fires GA4 scroll_depth events at configured
// percentage thresholds (25%, 50%, 75%, 90%, 100%).
// ────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics/engagement";

interface ScrollDepthOptions {
  /** Percent thresholds to trigger (default: [25, 50, 75, 90, 100]) */
  thresholds?: number[];
  /** Only fire once per threshold (default: true) */
  once?: boolean;
}

export function useScrollDepth(options: ScrollDepthOptions = {}): void {
  const { thresholds = [25, 50, 75, 90, 100], once = true } = options;

  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of thresholds) {
        if (percent >= threshold) {
          if (once && fired.current.has(threshold)) continue;
          fired.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    };

    // Throttle to ~200ms for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once immediately in case the page loads scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholds, once]);
}
