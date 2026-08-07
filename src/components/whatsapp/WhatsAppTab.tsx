"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { getWhatsAppLink, shouldShowWhatsApp } from "@/lib/constants";
import { trackOutboundClick } from "@/lib/analytics/engagement";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────
   Outline WhatsApp glyph (stroke style — pairs with minimal text)
   ──────────────────────────────────────────────────────────────── */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Speech bubble */}
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      {/* Handset */}
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   WhatsAppTab — premium docked side tab (bookmark style)
   · Docked to the right edge, vertically centered (slightly below)
   · Slim rounded-left tab (rounded only on the outer edge)
   · Brand gold, soft 1px border, no heavy drop-shadow
   · Outline WhatsApp glyph + vertical "Chat" label
   · On hover it slides out and reveals "Chat with us" (desktop)
   · Reveals after 3 seconds; respects prefers-reduced-motion
   ──────────────────────────────────────────────────────────────── */
export default function WhatsAppTab() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  // Reveal the tab ~3s after the page loads (once per session —
  // the component stays mounted across SPA navigations).
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || !pathname || !shouldShowWhatsApp(pathname)) return null;

  const waLink = getWhatsAppLink();

  const handleClick = () => {
    trackOutboundClick(waLink, "Chat with us on WhatsApp", "cta");
  };

  const tab = (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "group relative flex items-center overflow-hidden",
        "rounded-l-full bg-gold text-primary",
        "border border-primary/10",
        "w-11 transition-[width] duration-300 ease-out",
        "hover:w-[10rem] hover:border-gold-dark/40",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-gold-dark",
        "no-underline select-none",
      )}
    >
      {/* Hover label — slides in from the left as the tab widens */}
      <span
        className={cn(
          "whitespace-nowrap pl-4 pr-1",
          "text-[11px] font-semibold tracking-[0.18em]",
          "opacity-0 translate-x-3 transition-all duration-300",
          "group-hover:opacity-100 group-hover:translate-x-0",
        )}
      >
        Chat with us
      </span>

      {/* Resting content — glyph + vertical "Chat" label */}
      <span className="flex flex-col items-center gap-2 shrink-0 px-2.5 py-5">
        <WhatsAppGlyph className="h-5 w-5" />
        <span className="[writing-mode:vertical-rl] text-[11px] font-semibold tracking-[0.2em]">
          Chat
        </span>
      </span>
    </a>
  );

  if (reduceMotion) {
    return <div className="fixed right-0 top-[54%] z-40">{tab}</div>;
  }

  return (
    <motion.div
      className="fixed right-0 top-[54%] z-40"
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {tab}
    </motion.div>
  );
}
