"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TidioChat() {
  const pathname = usePathname();
  const tidioKey = process.env.NEXT_PUBLIC_TIDIO_KEY;

  useEffect(() => {
    if (!tidioKey) return;
    if (pathname.startsWith("/checkout")) return;

    let timeout: NodeJS.Timeout;

    const loadTidio = () => {
      const script = document.createElement("script");
      script.src = `//code.tidio.co/${tidioKey}.js`;
      script.async = true;
      document.body.appendChild(script);
    };

    if (pathname === "/") {
      timeout = setTimeout(loadTidio, 45000);
    } else if (pathname.startsWith("/products/")) {
      timeout = setTimeout(loadTidio, 30000);
    } else if (pathname === "/cart") {
      timeout = setTimeout(loadTidio, 15000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [pathname, tidioKey]);

  return null;
}
