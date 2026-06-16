"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { IPHONE_PRODUCT, IPHONE_FOLDER } from "@/lib/iphone-15-pro-max-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${IPHONE_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function IPhoneStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(IPHONE_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="iphone-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="iphone-sticky-cta-inner">
        <div className="iphone-sticky-left">
          {/* Product thumbnail */}
          <div className="iphone-sticky-thumb">
            <Image
              src={getImagePath(
                "Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg",
              )}
              alt="iPhone 15 Pro Max 512GB"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="iphone-sticky-product-name">
            iPhone 15 Pro Max 512GB
          </span>
          <div className="iphone-sticky-pricing">
            <span className="iphone-sticky-price">
              {formatPrice(IPHONE_PRODUCT.price)}
            </span>
            <span className="iphone-sticky-original">
              {formatPrice(IPHONE_PRODUCT.original_price)}
            </span>
            <span className="iphone-sticky-badge">
              -{IPHONE_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="iphone-btn-primary iphone-sticky-btn"
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
          Buy Now &mdash; {formatPrice(IPHONE_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
