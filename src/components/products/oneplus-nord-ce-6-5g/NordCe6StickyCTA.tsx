"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  NORD_CE6_PRODUCT,
  NORD_CE6_FOLDER,
} from "@/lib/oneplus-nord-ce-6-5g-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${NORD_CE6_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function NordCe6StickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(NORD_CE6_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="nordce6-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="nordce6-sticky-cta-inner">
        <div className="nordce6-sticky-left">
          {/* Product thumbnail */}
          <div className="nordce6-sticky-thumb">
            <Image
              src={getImagePath("oneplus-nord-ce6.webp")}
              alt="OnePlus Nord CE 6 5G"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="nordce6-sticky-product-name">
            OnePlus Nord CE 6 5G
          </span>
          <div className="nordce6-sticky-pricing">
            <span className="nordce6-sticky-price">
              {formatPrice(NORD_CE6_PRODUCT.price)}
            </span>
            <span className="nordce6-sticky-original">
              {formatPrice(NORD_CE6_PRODUCT.original_price)}
            </span>
            <span className="nordce6-sticky-badge">
              -{NORD_CE6_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="nordce6-btn-primary nordce6-sticky-btn"
        >
          {/* Shopping bag SVG */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Buy Now &mdash; {formatPrice(NORD_CE6_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
