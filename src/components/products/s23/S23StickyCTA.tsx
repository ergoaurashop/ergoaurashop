"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/utils";

export default function S23StickyCTA() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroRef.current = document.getElementById("s23-hero");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    const hero = heroRef.current;
    if (hero) {
      observer.observe(hero);
    }

    return () => {
      if (hero) observer.unobserve(hero);
    };
  }, []);

  const scrollToPricing = () => {
    const el = document.getElementById("s23-pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`s23-sticky-cta ${visible ? "visible" : ""}`}>
      <div className="s23-sticky-cta-inner">
        <div className="s23-sticky-pricing">
          <span className="s23-sticky-price">{formatPrice(14990)}</span>
          <span className="s23-sticky-original">{formatPrice(124999)}</span>
          <span className="s23-sticky-badge">88% OFF</span>
        </div>

        <button
          onClick={scrollToPricing}
          className="s23-btn-primary s23-sticky-btn"
        >
          🛒 Buy Now
        </button>
      </div>
    </div>
  );
}
