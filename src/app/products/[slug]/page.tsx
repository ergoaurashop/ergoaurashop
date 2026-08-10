import type { Metadata } from "next";
import {
  LOCAL_PRODUCTS,
  SLUG_TO_IMAGES,
  SLUG_TO_FOLDER,
} from "@/lib/products-data";
import {
  S23_PRODUCT,
  S23_REVIEWS,
  S23_REVIEW_SUMMARY,
  S23_FAQS,
  S23_FOLDER,
  S23_HERO_IMAGES,
} from "@/lib/s23-ultra-data";
import {
  S24_PRODUCT,
  S24_REVIEWS,
  S24_REVIEW_SUMMARY,
  S24_FAQS,
  S24_FOLDER,
  S24_HERO_IMAGES,
} from "@/lib/s24-ultra-data";
import {
  IPHONE_PRODUCT,
  IPHONE_REVIEWS,
  IPHONE_REVIEW_SUMMARY,
  IPHONE_FAQS,
  IPHONE_FOLDER,
  IPHONE_HERO_IMAGES,
} from "@/lib/iphone-15-pro-max-data";
import {
  EDGE_70_FUSION_PRODUCT,
  EDGE_70_FUSION_REVIEWS,
  EDGE_70_FUSION_REVIEW_SUMMARY,
  EDGE_70_FUSION_FAQS,
  EDGE_70_FUSION_FOLDER,
  EDGE_70_FUSION_HERO_IMAGES,
} from "@/lib/motorola-edge-70-fusion-data";
import {
  EDGE_70_PRODUCT,
  EDGE_70_REVIEWS,
  EDGE_70_REVIEW_SUMMARY,
  EDGE_70_FAQS,
  EDGE_70_FOLDER,
  EDGE_70_HERO_IMAGES,
} from "@/lib/motorola-edge-70-data";
import {
  NORD_CE6_PRODUCT,
  NORD_CE6_REVIEWS,
  NORD_CE6_REVIEW_SUMMARY,
  NORD_CE6_FAQS,
  NORD_CE6_FOLDER,
  NORD_CE6_HERO_IMAGES,
} from "@/lib/oneplus-nord-ce-6-5g-data";
import {
  P4POWER_PRODUCT,
  P4POWER_REVIEWS,
  P4POWER_REVIEW_SUMMARY,
  P4POWER_FAQS,
  P4POWER_FOLDER,
  P4POWER_HERO_IMAGES,
} from "@/lib/realme-p4-power-data";
import {
  IQOO_Z11X_PRODUCT,
  IQOO_Z11X_REVIEWS,
  IQOO_Z11X_REVIEW_SUMMARY,
  IQOO_Z11X_FAQS,
  IQOO_Z11X_FOLDER,
  IQOO_Z11X_HERO_IMAGES,
} from "@/lib/iqoo-z11x-data";
import {
  LAVA_AGNI_4_PRODUCT,
  LAVA_AGNI_4_REVIEWS,
  LAVA_AGNI_4_REVIEW_SUMMARY,
  LAVA_AGNI_4_FAQS,
  LAVA_AGNI_4_FOLDER,
  LAVA_AGNI_4_HERO_IMAGES,
} from "@/lib/lava-agni-4-data";
import {
  OPPO_K13_TURBO_5G_PRODUCT,
  OPPO_K13_TURBO_5G_REVIEWS,
  OPPO_K13_TURBO_5G_REVIEW_SUMMARY,
  OPPO_K13_TURBO_5G_FAQS,
  OPPO_K13_TURBO_5G_FOLDER,
  OPPO_K13_TURBO_5G_HERO_IMAGES,
} from "@/lib/oppo-k13-turbo-5g-data";
import {
  IQOO_15R_PRODUCT,
  IQOO_15R_REVIEWS,
  IQOO_15R_REVIEW_SUMMARY,
  IQOO_15R_FAQS,
  IQOO_15R_FOLDER,
  IQOO_15R_HERO_IMAGES,
} from "@/lib/iqoo-15r-data";
import {
  NORD_6_PRODUCT,
  NORD_6_REVIEWS,
  NORD_6_REVIEW_SUMMARY,
  NORD_6_FAQS,
  NORD_6_FOLDER,
  NORD_6_HERO_IMAGES,
} from "@/lib/oneplus-nord-6-data";
import {
  VIVO_V70_ELITE_PRODUCT,
  VIVO_V70_ELITE_REVIEWS,
  VIVO_V70_ELITE_REVIEW_SUMMARY,
  VIVO_V70_ELITE_FAQS,
  VIVO_V70_ELITE_FOLDER,
  VIVO_V70_ELITE_HERO_IMAGES,
} from "@/lib/vivo-v70-elite-data";
import {
  EDGE_70_PRO_PLUS_PRODUCT,
  EDGE_70_PRO_PLUS_REVIEWS,
  EDGE_70_PRO_PLUS_REVIEW_SUMMARY,
  EDGE_70_PRO_PLUS_FAQS,
  EDGE_70_PRO_PLUS_FOLDER,
  EDGE_70_PRO_PLUS_HERO_IMAGES,
} from "@/lib/motorola-edge-70-pro-plus-data";
import {
  POCO_X8_PRO_MAX_PRODUCT,
  POCO_X8_PRO_MAX_REVIEWS,
  POCO_X8_PRO_MAX_REVIEW_SUMMARY,
  POCO_X8_PRO_MAX_FAQS,
  POCO_X8_PRO_MAX_FOLDER,
  POCO_X8_PRO_MAX_HERO_IMAGES,
} from "@/lib/poco-x8-pro-max-data";
import {
  APPLE_IPHONE_17_PRO_PRODUCT,
  APPLE_IPHONE_17_PRO_REVIEWS,
  APPLE_IPHONE_17_PRO_REVIEW_SUMMARY,
  APPLE_IPHONE_17_PRO_FAQS,
  APPLE_IPHONE_17_PRO_FOLDER,
  APPLE_IPHONE_17_PRO_HERO_IMAGES,
} from "@/lib/apple-iphone-17-pro-data";
import {
  APPLE_IPHONE_AIR_PRODUCT,
  APPLE_IPHONE_AIR_REVIEWS,
  APPLE_IPHONE_AIR_REVIEW_SUMMARY,
  APPLE_IPHONE_AIR_FAQS,
  APPLE_IPHONE_AIR_FOLDER,
  APPLE_IPHONE_AIR_HERO_IMAGES,
} from "@/lib/apple-iphone-air-data";
import {
  WC2026_PRODUCT,
  WC2026_PRODUCT_IMAGES,
  WC2026_REVIEWS,
  WC2026_REVIEW_SUMMARY,
  WC2026_FAQS,
  WC2026_FOLDER,
} from "@/lib/worldcup-2026-data";
import {
  ERGO_TEST_PRODUCT,
  ERGO_TEST_REVIEWS,
  ERGO_TEST_REVIEW_SUMMARY,
  ERGO_TEST_FAQS,
} from "@/lib/ergoslug-test-data";
import { SITE_METADATA, SITE_URL } from "@/lib/constants";
import { PRODUCT_RICH_CONTENT } from "@/lib/product-content";
import { PRODUCT_REVIEW_SUMMARIES, PRODUCT_REVIEWS } from "@/lib/reviews-data";
import { formatPrice, getProductImages } from "@/lib/utils";
import ProductDetailClient from "./ProductDetailClient";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FaqSchema from "@/components/seo/FaqSchema";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Dynamically generates metadata (including Open Graph image) for each
 * product page so that social shares show the correct product image.
 * Includes canonical URL for SEO deduplication.
 */
/**
 * Encode a file-system path safely, segment by segment.
 * Handles nested paths like "Part-2/Samsung Galaxy S23 Ultra..."
 */
function encodePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

/**
 * Pre-render ALL product pages as static HTML at build time.
 * This ensures Googlebot receives fully rendered content,
 * not client-side loading skeletons.
 * Any new product added to LOCAL_PRODUCTS is automatically included.
 */
export async function generateStaticParams() {
  const regularSlugs = LOCAL_PRODUCTS.map((p) => p.slug);
  const specialSlugs = [
    "samsung-galaxy-s23-ultra",
    "samsung-galaxy-s24-ultra",
    "iphone-15-pro-max-512gb",
    "messi-argentina-2026-jersey",
    "motorola-edge-70-fusion",
    "motorola-edge-70",
    "oneplus-nord-ce-6-5g",
    "realme-p4-power",
    "iqoo-z11x",
    "lava-agni-4",
    "oppo-k13-turbo-5g",
  ];
  // ergoslug-test-test is excluded — it has noindex

  const seen = new Set<string>();
  const allSlugs: string[] = [];
  for (const slug of [...regularSlugs, ...specialSlugs]) {
    if (!seen.has(slug)) {
      seen.add(slug);
      allSlugs.push(slug);
    }
  }
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  /* ── S23 Ultra — custom metadata ── */
  if (slug === "samsung-galaxy-s23-ultra") {
    const imageUrl = `/images/products/${encodePath(S23_FOLDER)}/${encodeURIComponent("galaxy-s23-ultra-highlights-kv-1.jpg")}`;
    const title = `Samsung Galaxy S23 Ultra at ₹24,990/- | 80% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "Samsung Galaxy S23 Ultra — 200MP Camera, S Pen, Snapdragon 8 Gen 2, 12GB RAM, 512GB Storage. International Version. Get it at 80% OFF — ₹24,990/- only! Limited stock clearance.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/samsung-galaxy-s23-ultra`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/samsung-galaxy-s23-ultra`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Samsung Galaxy S23 Ultra",
          },
        ],
      },
    };
  }

  /* ── S24 Ultra — custom metadata ── */
  if (slug === "samsung-galaxy-s24-ultra") {
    const imageUrl = `/images/products/${encodePath(S24_FOLDER)}/${encodeURIComponent(S24_HERO_IMAGES[0])}`;
    const title = `Samsung Galaxy S24 Ultra at ₹43,990/- | 62% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "Samsung Galaxy S24 Ultra — 200MP Camera, S Pen, Snapdragon 8 Gen 3, 12GB RAM, 512GB Storage. International Version. Get it at 62% OFF — ₹43,990/- only! Limited stock clearance.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/samsung-galaxy-s24-ultra`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/samsung-galaxy-s24-ultra`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Samsung Galaxy S24 Ultra",
          },
        ],
      },
    };
  }

  /* ── iPhone 15 Pro Max 512GB — custom metadata ── */
  if (slug === "iphone-15-pro-max-512gb") {
    const imageUrl = `/images/products/${encodePath(IPHONE_FOLDER)}/${encodeURIComponent("Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg")}`;
    const title = `iPhone 15 Pro Max 512GB at ₹46,990 | 51% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "iPhone 15 Pro Max 512GB — A17 Pro Chip, 48MP Camera System, Titanium Design, 8GB RAM. International Version. Get it at 51% OFF — ₹46,990 only! Limited stock clearance.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/iphone-15-pro-max-512gb`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/iphone-15-pro-max-512gb`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "iPhone 15 Pro Max 512GB",
          },
        ],
      },
    };
  }

  /* ── Motorola Edge 70 Fusion — custom metadata ── */
  if (slug === "motorola-edge-70-fusion") {
    const imageUrl = `/images/products/${encodePath(EDGE_70_FUSION_FOLDER)}/${encodeURIComponent(EDGE_70_FUSION_HERO_IMAGES[0])}`;
    const title = `Motorola Edge 70 Fusion at ₹21,928 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "Motorola Edge 70 Fusion — 7000mAh Battery, Snapdragon 7s Gen 3, 144Hz Extreme AMOLED, 50MP Sony LYTIA 710, 256GB + 8GB RAM. Get it at 20% OFF — ₹21,928 only! Limited stock clearance.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/motorola-edge-70-fusion`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/motorola-edge-70-fusion`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Motorola Edge 70 Fusion",
          },
        ],
      },
    };
  }

  /* ── Motorola Edge 70 — custom metadata ── */
  if (slug === "motorola-edge-70") {
    const imageUrl = `/images/products/${encodePath(EDGE_70_FOLDER)}/${encodeURIComponent(EDGE_70_HERO_IMAGES[0])}`;
    const title = `Motorola Edge 70 at ₹22,676 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "Motorola Edge 70 — 144Hz 1.5K pOLED display, Snapdragon 7 Gen 3, 125W TurboPower charging, 50MP OIS camera, vegan leather & IP68. Get it at 20% OFF — ₹22,676 only! Limited stock.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/motorola-edge-70`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/motorola-edge-70`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Motorola Edge 70",
          },
        ],
      },
    };
  }

  /* ── OnePlus Nord CE 6 5G — custom metadata ── */
  if (slug === "oneplus-nord-ce-6-5g") {
    const imageUrl = `/images/products/${encodePath(NORD_CE6_FOLDER)}/${encodeURIComponent(NORD_CE6_HERO_IMAGES[0])}`;
    const title = `OnePlus Nord CE 6 5G at ₹23,998 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'OnePlus Nord CE 6 5G — 50MP OIS camera, Snapdragon 7 Gen 3, 6.7" 120Hz Fluid AMOLED, 5500mAh battery, 80W SUPERVOOC charging, OxygenOS. Get it at 20% OFF — ₹23,998 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/oneplus-nord-ce-6-5g`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/oneplus-nord-ce-6-5g`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "OnePlus Nord CE 6 5G",
          },
        ],
      },
    };
  }

  /* ── realme P4 Power — custom metadata ── */
  if (slug === "realme-p4-power") {
    const imageUrl = `/images/products/${encodePath(P4POWER_FOLDER)}/${encodeURIComponent(P4POWER_HERO_IMAGES[0])}`;
    const title = `realme P4 Power at ₹23,639 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'realme P4 Power — record-breaking 10001mAh battery, 6.8" 144Hz AMOLED, Dimensity 7400 Ultra, 80W SuperVOOC, realme UI. Get it at 20% OFF — ₹23,639 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/realme-p4-power`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/realme-p4-power`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "realme P4 Power",
          },
        ],
      },
    };
  }

  /* ── iQOO Z11x — custom metadata ── */
  if (slug === "iqoo-z11x") {
    const imageUrl = `/images/products/${encodePath(IQOO_Z11X_FOLDER)}/${encodeURIComponent(IQOO_Z11X_HERO_IMAGES[0])}`;
    const title = `iQOO Z11x at ₹19,999 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'iQOO Z11x — 6.72" 120Hz FHD+ display, 6000mAh battery, Snapdragon 6 Gen 1, 44W FlashCharge, FuntouchOS. Get it at 20% OFF — ₹19,999 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/iqoo-z11x`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/iqoo-z11x`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "iQOO Z11x",
          },
        ],
      },
    };
  }

  /* ── Lava Agni 4 — custom metadata ── */
  if (slug === "lava-agni-4") {
    const imageUrl = `/images/products/${encodePath(LAVA_AGNI_4_FOLDER)}/${encodeURIComponent(LAVA_AGNI_4_HERO_IMAGES[0])}`;
    const title = `Lava Agni 4 at ₹21,599 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'Lava Agni 4 — 6.78" 120Hz curved AMOLED display, 5000mAh battery, Dimensity 7300, 66W fast charging, bloat-free Stock Android 16. Get it at 20% OFF — ₹21,599 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/lava-agni-4`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/lava-agni-4`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Lava Agni 4",
          },
        ],
      },
    };
  }

  /* ── OPPO K13 Turbo 5G — custom metadata ── */
  if (slug === "oppo-k13-turbo-5g") {
    const imageUrl = `/images/products/${encodePath(OPPO_K13_TURBO_5G_FOLDER)}/${encodeURIComponent(OPPO_K13_TURBO_5G_HERO_IMAGES[0])}`;
    const title = `OPPO K13 Turbo 5G at ₹23,999 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'OPPO K13 Turbo 5G — 6.8" 120Hz AMOLED display, 7000mAh battery, MediaTek Dimensity 8450, 80W Super Flash Charge, 50MP AI camera. Get it at 20% OFF — ₹23,999 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/oppo-k13-turbo-5g`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/oppo-k13-turbo-5g`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "OPPO K13 Turbo 5G",
          },
        ],
      },
    };
  }

  /* ── iQOO 15R — custom metadata ── */
  if (slug === "iqoo-15r") {
    const imageUrl = `/images/products/${encodePath(IQOO_15R_FOLDER)}/${encodeURIComponent(IQOO_15R_HERO_IMAGES[0])}`;
    const title = `iQOO 15R at ₹39,998 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "iQOO 15R — Snapdragon 8 Gen 5 (3nm) processor, 7600mAh Silicon-Carbon battery, 144Hz 1.5K AMOLED display, 100W Super FlashCharge, 50MP Sony LYT 700V camera with OIS. Get it at 20% OFF — ₹39,998 only! Limited stock clearance.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/iqoo-15r`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/iqoo-15r`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "iQOO 15R",
          },
        ],
      },
    };
  }

  /* ── OnePlus Nord 6 — custom metadata ── */
  if (slug === "oneplus-nord-6") {
    const imageUrl = `/images/products/${encodePath(NORD_6_FOLDER)}/${encodeURIComponent(NORD_6_HERO_IMAGES[0])}`;
    const title = `OnePlus Nord 6 at ₹35,599 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'OnePlus Nord 6 — 6.74" 1.5K AMOLED 120Hz display, Snapdragon 8s Gen 4, 5500mAh battery with 100W SUPERVOOC, 50MP Sony IMX890 OIS camera and the iconic Alert Slider. Get it at 20% OFF — ₹35,599 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/oneplus-nord-6`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/oneplus-nord-6`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "OnePlus Nord 6",
          },
        ],
      },
    };
  }

  /* ── vivo V70 Elite — custom metadata ── */
  if (slug === "vivo-v70-elite") {
    const imageUrl = `/images/products/${encodePath(VIVO_V70_ELITE_FOLDER)}/${encodeURIComponent(VIVO_V70_ELITE_HERO_IMAGES[0])}`;
    const title = `vivo V70 Elite at ₹36,799 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "vivo V70 Elite — 6.78-inch 1.5K 3D Curved AMOLED 120Hz display, MediaTek Dimensity 8300, 50MP Eye-AF selfie and 50MP OIS main camera with Smart Aura Light, 5500mAh battery with 80W FlashCharge. Get it at 20% OFF — ₹36,799 only! Limited stock clearance.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/vivo-v70-elite`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/vivo-v70-elite`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "vivo V70 Elite",
          },
        ],
      },
    };
  }

  /* ── Motorola Edge 70 Pro+ 5G — custom metadata ── */
  if (slug === "motorola-edge-70-pro-plus") {
    const imageUrl = `/images/products/${encodePath(EDGE_70_PRO_PLUS_FOLDER)}/${encodeURIComponent(EDGE_70_PRO_PLUS_HERO_IMAGES[0])}`;
    const title = `Motorola Edge 70 Pro+ 5G at ₹37,474 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'Motorola Edge 70 Pro+ 5G — 6.7" 165Hz pOLED display, Snapdragon 8s Gen 4, dual 50MP cameras, 5000mAh battery with 125W wired and 50W wireless charging, IP68. Get it at 20% OFF — ₹37,474 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/motorola-edge-70-pro-plus`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/motorola-edge-70-pro-plus`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Motorola Edge 70 Pro+ 5G",
          },
        ],
      },
    };
  }

  /* ── Apple iPhone Air — custom metadata ── */
  if (slug === "apple-iphone-air") {
    const imageUrl = `/images/products/${encodePath(APPLE_IPHONE_AIR_FOLDER)}/${encodeURIComponent(APPLE_IPHONE_AIR_HERO_IMAGES[0])}`;
    const title = `Apple iPhone Air at ₹95,920 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'Apple iPhone Air — 6.6" Super Retina XDR OLED display, Apple A19 chip, 48MP Fusion camera, ultra-thin 5mm design with MagSafe. Get it at 20% OFF — ₹95,920 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/apple-iphone-air`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/apple-iphone-air`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Apple iPhone Air",
          },
        ],
      },
    };
  }

  /* ── Apple iPhone 17 Pro — custom metadata ── */
  if (slug === "apple-iphone-17-pro") {
    const imageUrl = `/images/products/${encodePath(APPLE_IPHONE_17_PRO_FOLDER)}/${encodeURIComponent(APPLE_IPHONE_17_PRO_HERO_IMAGES[0])}`;
    const title = `Apple iPhone 17 Pro at ₹1,14,665 | 15% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'Apple iPhone 17 Pro — 6.3" 120Hz ProMotion OLED display, A19 Pro (3nm), triple 48MP camera array, titanium design with Ceramic Shield 2. Get it at 15% OFF — ₹1,14,665 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/apple-iphone-17-pro`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/apple-iphone-17-pro`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Apple iPhone 17 Pro",
          },
        ],
      },
    };
  }

  /* ── POCO X8 Pro Max — custom metadata ── */
  if (slug === "poco-x8-pro-max") {
    const imageUrl = `/images/products/${encodePath(POCO_X8_PRO_MAX_FOLDER)}/${encodeURIComponent(POCO_X8_PRO_MAX_HERO_IMAGES[0])}`;
    const title = `POCO X8 Pro Max at ₹39,992 | 20% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      'POCO X8 Pro Max — 6.83" 120Hz 1.5K AMOLED display, Dimensity 9500s (3nm), 9000mAh silicon-carbon battery with 100W charging, 50MP Light Fusion 600 OIS camera, IP69K. Get it at 20% OFF — ₹39,992 only! Limited stock clearance.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/poco-x8-pro-max`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/poco-x8-pro-max`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "POCO X8 Pro Max",
          },
        ],
      },
    };
  }

  /* ── ErgoSlug Test — payment check page (noindex, nofollow) ── */
  if (slug === "ergoslug-test-test") {
    return {
      title: "Payment Check — Test Product",
      description: "Internal payment testing page. Not for public use.",
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
      alternates: {
        canonical: `${SITE_URL}/products/ergoslug-test-test`,
      },
    };
  }

  /* ── Messi Argentina 2026 Jersey — custom metadata ── */
  if (slug === "messi-argentina-2026-jersey") {
    const imageUrl = `/images/products/${encodePath(WC2026_FOLDER)}/${encodeURIComponent("Home/71DbIUtPvCL._AC_SX569_.jpg")}`;
    const title = `Messi Argentina 2026 World Cup Jersey at ₹499 | 50% OFF | ${SITE_METADATA.title}`;
    const description =
      "Dress like a champion with Messi's exact replica jersey for Argentina. ADIDAS original replica, breathable fabric, available in S-XXL. Buy 3 Get 1 Free! Limited stock.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/messi-argentina-2026-jersey`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/messi-argentina-2026-jersey`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Messi Argentina 2026 World Cup Jersey",
          },
        ],
      },
    };
  }

  const product = LOCAL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return { title: "Product Not Found" };
  }

  // Build the absolute URL to the primary product image
  const images = SLUG_TO_IMAGES[slug];
  const folder = SLUG_TO_FOLDER[slug] || slug;
  const imageUrl =
    images && images.length > 0
      ? `/images/products/${encodeURIComponent(folder)}/${encodeURIComponent(images[0])}`
      : SITE_METADATA.logo;

  const title = `${product.name} | ${SITE_METADATA.title}`;
  const description = product.description;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `${SITE_URL}/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${product.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
  };
}

/**
 * Product detail page — server component wrapper that provides
 * metadata / OG tags, structured data (Product, Breadcrumb, FAQ),
 * then delegates the interactive UI to the client component.
 */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  /* ── S23 Ultra — standalone page with JSON-LD ── */
  if (slug === "samsung-galaxy-s23-ultra") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Samsung Galaxy S23 Ultra",
        url: `${SITE_URL}/products/samsung-galaxy-s23-ultra`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={S23_PRODUCT}
          aggregateRating={{
            ratingValue: S23_REVIEW_SUMMARY.averageRating,
            reviewCount: S23_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={S23_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {S23_FAQS.length > 0 && <FaqSchema faqs={S23_FAQS} />}
        {/* Server-rendered content for Googlebot — visible until JS hydrates */}
        <div id="ssr-product-root" data-slug="samsung-galaxy-s23-ultra">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${S23_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(S23_HERO_IMAGES[0])}`}
                      alt="Samsung Galaxy S23 Ultra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {S23_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(S23_PRODUCT.price)}
                    </span>
                    {S23_PRODUCT.original_price > S23_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(S23_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{S23_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {S23_PRODUCT.description}
                  </p>
                  {S23_PRODUCT.features && S23_PRODUCT.features.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {S23_PRODUCT.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-apple-text-primary"
                          >
                            <svg
                              className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── S24 Ultra — standalone page with JSON-LD ── */
  if (slug === "samsung-galaxy-s24-ultra") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Samsung Galaxy S24 Ultra",
        url: `${SITE_URL}/products/samsung-galaxy-s24-ultra`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={S24_PRODUCT}
          aggregateRating={{
            ratingValue: S24_REVIEW_SUMMARY.averageRating,
            reviewCount: S24_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={S24_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {S24_FAQS.length > 0 && <FaqSchema faqs={S24_FAQS} />}
        {/* Server-rendered content for Googlebot — visible until JS hydrates */}
        <div id="ssr-product-root" data-slug="samsung-galaxy-s24-ultra">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${S24_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(S24_HERO_IMAGES[0])}`}
                      alt="Samsung Galaxy S24 Ultra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {S24_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(S24_PRODUCT.price)}
                    </span>
                    {S24_PRODUCT.original_price > S24_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(S24_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{S24_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {S24_PRODUCT.description}
                  </p>
                  {S24_PRODUCT.features && S24_PRODUCT.features.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {S24_PRODUCT.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-apple-text-primary"
                          >
                            <svg
                              className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── iPhone 15 Pro Max 512GB — standalone page with JSON-LD ── */
  if (slug === "iphone-15-pro-max-512gb") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "iPhone 15 Pro Max 512GB",
        url: `${SITE_URL}/products/iphone-15-pro-max-512gb`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={IPHONE_PRODUCT}
          aggregateRating={{
            ratingValue: IPHONE_REVIEW_SUMMARY.averageRating,
            reviewCount: IPHONE_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={IPHONE_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {IPHONE_FAQS.length > 0 && <FaqSchema faqs={IPHONE_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="iphone-15-pro-max-512gb">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${IPHONE_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(IPHONE_HERO_IMAGES[0])}`}
                      alt="iPhone 15 Pro Max 512GB"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {IPHONE_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(IPHONE_PRODUCT.price)}
                    </span>
                    {IPHONE_PRODUCT.original_price > IPHONE_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(IPHONE_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{IPHONE_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {IPHONE_PRODUCT.description}
                  </p>
                  {IPHONE_PRODUCT.features &&
                    IPHONE_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {IPHONE_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── Motorola Edge 70 Fusion — standalone page with JSON-LD ── */
  if (slug === "motorola-edge-70-fusion") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Motorola Edge 70 Fusion",
        url: `${SITE_URL}/products/motorola-edge-70-fusion`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={EDGE_70_FUSION_PRODUCT}
          aggregateRating={{
            ratingValue: EDGE_70_FUSION_REVIEW_SUMMARY.averageRating,
            reviewCount: EDGE_70_FUSION_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={EDGE_70_FUSION_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {EDGE_70_FUSION_FAQS.length > 0 && (
          <FaqSchema faqs={EDGE_70_FUSION_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="motorola-edge-70-fusion">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${EDGE_70_FUSION_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(EDGE_70_FUSION_HERO_IMAGES[0])}`}
                      alt="Motorola Edge 70 Fusion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {EDGE_70_FUSION_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(EDGE_70_FUSION_PRODUCT.price)}
                    </span>
                    {EDGE_70_FUSION_PRODUCT.original_price >
                      EDGE_70_FUSION_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(EDGE_70_FUSION_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{EDGE_70_FUSION_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {EDGE_70_FUSION_PRODUCT.description}
                  </p>
                  {EDGE_70_FUSION_PRODUCT.features &&
                    EDGE_70_FUSION_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {EDGE_70_FUSION_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── iQOO 15R — standalone page with JSON-LD ── */
  if (slug === "iqoo-15r") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "iQOO 15R",
        url: `${SITE_URL}/products/iqoo-15r`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={IQOO_15R_PRODUCT}
          aggregateRating={{
            ratingValue: IQOO_15R_REVIEW_SUMMARY.averageRating,
            reviewCount: IQOO_15R_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={IQOO_15R_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {IQOO_15R_FAQS.length > 0 && (
          <FaqSchema faqs={IQOO_15R_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="iqoo-15r">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${IQOO_15R_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(IQOO_15R_HERO_IMAGES[0])}`}
                      alt="iQOO 15R"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {IQOO_15R_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(IQOO_15R_PRODUCT.price)}
                    </span>
                    {IQOO_15R_PRODUCT.original_price >
                      IQOO_15R_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(IQOO_15R_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{IQOO_15R_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {IQOO_15R_PRODUCT.description}
                  </p>
                  {IQOO_15R_PRODUCT.features &&
                    IQOO_15R_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {IQOO_15R_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── OnePlus Nord 6 — standalone page with JSON-LD ── */
  if (slug === "oneplus-nord-6") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "OnePlus Nord 6",
        url: `${SITE_URL}/products/oneplus-nord-6`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={NORD_6_PRODUCT}
          aggregateRating={{
            ratingValue: NORD_6_REVIEW_SUMMARY.averageRating,
            reviewCount: NORD_6_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={NORD_6_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {NORD_6_FAQS.length > 0 && (
          <FaqSchema faqs={NORD_6_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="oneplus-nord-6">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${NORD_6_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(NORD_6_HERO_IMAGES[0])}`}
                      alt="OnePlus Nord 6"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {NORD_6_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(NORD_6_PRODUCT.price)}
                    </span>
                    {NORD_6_PRODUCT.original_price >
                      NORD_6_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(NORD_6_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{NORD_6_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {NORD_6_PRODUCT.description}
                  </p>
                  {NORD_6_PRODUCT.features &&
                    NORD_6_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {NORD_6_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── vivo V70 Elite — standalone page with JSON-LD ── */
  if (slug === "vivo-v70-elite") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "vivo V70 Elite",
        url: `${SITE_URL}/products/vivo-v70-elite`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={VIVO_V70_ELITE_PRODUCT}
          aggregateRating={{
            ratingValue: VIVO_V70_ELITE_REVIEW_SUMMARY.averageRating,
            reviewCount: VIVO_V70_ELITE_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={VIVO_V70_ELITE_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {VIVO_V70_ELITE_FAQS.length > 0 && (
          <FaqSchema faqs={VIVO_V70_ELITE_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="vivo-v70-elite">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${VIVO_V70_ELITE_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(VIVO_V70_ELITE_HERO_IMAGES[0])}`}
                      alt="vivo V70 Elite"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {VIVO_V70_ELITE_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(VIVO_V70_ELITE_PRODUCT.price)}
                    </span>
                    {VIVO_V70_ELITE_PRODUCT.original_price >
                      VIVO_V70_ELITE_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(VIVO_V70_ELITE_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{VIVO_V70_ELITE_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {VIVO_V70_ELITE_PRODUCT.description}
                  </p>
                  {VIVO_V70_ELITE_PRODUCT.features &&
                    VIVO_V70_ELITE_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {VIVO_V70_ELITE_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── Motorola Edge 70 Pro+ 5G — standalone page with JSON-LD ── */
  if (slug === "motorola-edge-70-pro-plus") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Motorola Edge 70 Pro+ 5G",
        url: `${SITE_URL}/products/motorola-edge-70-pro-plus`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={EDGE_70_PRO_PLUS_PRODUCT}
          aggregateRating={{
            ratingValue: EDGE_70_PRO_PLUS_REVIEW_SUMMARY.averageRating,
            reviewCount: EDGE_70_PRO_PLUS_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={EDGE_70_PRO_PLUS_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {EDGE_70_PRO_PLUS_FAQS.length > 0 && (
          <FaqSchema faqs={EDGE_70_PRO_PLUS_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="motorola-edge-70-pro-plus">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${EDGE_70_PRO_PLUS_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(EDGE_70_PRO_PLUS_HERO_IMAGES[0])}`}
                      alt="Motorola Edge 70 Pro+ 5G"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {EDGE_70_PRO_PLUS_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(EDGE_70_PRO_PLUS_PRODUCT.price)}
                    </span>
                    {EDGE_70_PRO_PLUS_PRODUCT.original_price >
                      EDGE_70_PRO_PLUS_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(EDGE_70_PRO_PLUS_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{EDGE_70_PRO_PLUS_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {EDGE_70_PRO_PLUS_PRODUCT.description}
                  </p>
                  {EDGE_70_PRO_PLUS_PRODUCT.features &&
                    EDGE_70_PRO_PLUS_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {EDGE_70_PRO_PLUS_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── Apple iPhone Air — standalone page with JSON-LD ── */
  if (slug === "apple-iphone-air") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Apple iPhone Air",
        url: `${SITE_URL}/products/apple-iphone-air`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={APPLE_IPHONE_AIR_PRODUCT}
          aggregateRating={{
            ratingValue: APPLE_IPHONE_AIR_REVIEW_SUMMARY.averageRating,
            reviewCount: APPLE_IPHONE_AIR_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={APPLE_IPHONE_AIR_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {APPLE_IPHONE_AIR_FAQS.length > 0 && (
          <FaqSchema faqs={APPLE_IPHONE_AIR_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="apple-iphone-air">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${APPLE_IPHONE_AIR_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(APPLE_IPHONE_AIR_HERO_IMAGES[0])}`}
                      alt="Apple iPhone Air"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {APPLE_IPHONE_AIR_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(APPLE_IPHONE_AIR_PRODUCT.price)}
                    </span>
                    {APPLE_IPHONE_AIR_PRODUCT.original_price >
                      APPLE_IPHONE_AIR_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(APPLE_IPHONE_AIR_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{APPLE_IPHONE_AIR_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {APPLE_IPHONE_AIR_PRODUCT.description}
                  </p>
                  {APPLE_IPHONE_AIR_PRODUCT.features &&
                    APPLE_IPHONE_AIR_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {APPLE_IPHONE_AIR_PRODUCT.features.map(
                            (feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-apple-text-primary"
                              >
                                <svg
                                  className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                {feature}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── Apple iPhone 17 Pro — standalone page with JSON-LD ── */
  if (slug === "apple-iphone-17-pro") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Apple iPhone 17 Pro",
        url: `${SITE_URL}/products/apple-iphone-17-pro`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={APPLE_IPHONE_17_PRO_PRODUCT}
          aggregateRating={{
            ratingValue: APPLE_IPHONE_17_PRO_REVIEW_SUMMARY.averageRating,
            reviewCount: APPLE_IPHONE_17_PRO_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={APPLE_IPHONE_17_PRO_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {APPLE_IPHONE_17_PRO_FAQS.length > 0 && (
          <FaqSchema faqs={APPLE_IPHONE_17_PRO_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="apple-iphone-17-pro">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${APPLE_IPHONE_17_PRO_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(APPLE_IPHONE_17_PRO_HERO_IMAGES[0])}`}
                      alt="Apple iPhone 17 Pro"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {APPLE_IPHONE_17_PRO_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(APPLE_IPHONE_17_PRO_PRODUCT.price)}
                    </span>
                    {APPLE_IPHONE_17_PRO_PRODUCT.original_price >
                      APPLE_IPHONE_17_PRO_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(APPLE_IPHONE_17_PRO_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{APPLE_IPHONE_17_PRO_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {APPLE_IPHONE_17_PRO_PRODUCT.description}
                  </p>
                  {APPLE_IPHONE_17_PRO_PRODUCT.features &&
                    APPLE_IPHONE_17_PRO_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {APPLE_IPHONE_17_PRO_PRODUCT.features.map(
                            (feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-apple-text-primary"
                              >
                                <svg
                                  className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                {feature}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── POCO X8 Pro Max — standalone page with JSON-LD ── */
  if (slug === "poco-x8-pro-max") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "POCO X8 Pro Max",
        url: `${SITE_URL}/products/poco-x8-pro-max`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={POCO_X8_PRO_MAX_PRODUCT}
          aggregateRating={{
            ratingValue: POCO_X8_PRO_MAX_REVIEW_SUMMARY.averageRating,
            reviewCount: POCO_X8_PRO_MAX_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={POCO_X8_PRO_MAX_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {POCO_X8_PRO_MAX_FAQS.length > 0 && (
          <FaqSchema faqs={POCO_X8_PRO_MAX_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="poco-x8-pro-max">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${POCO_X8_PRO_MAX_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(POCO_X8_PRO_MAX_HERO_IMAGES[0])}`}
                      alt="POCO X8 Pro Max"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {POCO_X8_PRO_MAX_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(POCO_X8_PRO_MAX_PRODUCT.price)}
                    </span>
                    {POCO_X8_PRO_MAX_PRODUCT.original_price >
                      POCO_X8_PRO_MAX_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(POCO_X8_PRO_MAX_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{POCO_X8_PRO_MAX_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {POCO_X8_PRO_MAX_PRODUCT.description}
                  </p>
                  {POCO_X8_PRO_MAX_PRODUCT.features &&
                    POCO_X8_PRO_MAX_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {POCO_X8_PRO_MAX_PRODUCT.features.map(
                            (feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-apple-text-primary"
                              >
                                <svg
                                  className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                {feature}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── Motorola Edge 70 — standalone page with JSON-LD ── */
  if (slug === "motorola-edge-70") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Motorola Edge 70",
        url: `${SITE_URL}/products/motorola-edge-70`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={EDGE_70_PRODUCT}
          aggregateRating={{
            ratingValue: EDGE_70_REVIEW_SUMMARY.averageRating,
            reviewCount: EDGE_70_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={EDGE_70_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {EDGE_70_FAQS.length > 0 && <FaqSchema faqs={EDGE_70_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="motorola-edge-70">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${EDGE_70_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(EDGE_70_HERO_IMAGES[0])}`}
                      alt="Motorola Edge 70"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {EDGE_70_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(EDGE_70_PRODUCT.price)}
                    </span>
                    {EDGE_70_PRODUCT.original_price > EDGE_70_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(EDGE_70_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{EDGE_70_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {EDGE_70_PRODUCT.description}
                  </p>
                  {EDGE_70_PRODUCT.features &&
                    EDGE_70_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {EDGE_70_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── OnePlus Nord CE 6 5G — standalone page with JSON-LD ── */
  if (slug === "oneplus-nord-ce-6-5g") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "OnePlus Nord CE 6 5G",
        url: `${SITE_URL}/products/oneplus-nord-ce-6-5g`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={NORD_CE6_PRODUCT}
          aggregateRating={{
            ratingValue: NORD_CE6_REVIEW_SUMMARY.averageRating,
            reviewCount: NORD_CE6_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={NORD_CE6_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {NORD_CE6_FAQS.length > 0 && <FaqSchema faqs={NORD_CE6_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="oneplus-nord-ce-6-5g">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${NORD_CE6_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(NORD_CE6_HERO_IMAGES[0])}`}
                      alt="OnePlus Nord CE 6 5G"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {NORD_CE6_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(NORD_CE6_PRODUCT.price)}
                    </span>
                    {NORD_CE6_PRODUCT.original_price >
                      NORD_CE6_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(NORD_CE6_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{NORD_CE6_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {NORD_CE6_PRODUCT.description}
                  </p>
                  {NORD_CE6_PRODUCT.features &&
                    NORD_CE6_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {NORD_CE6_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── realme P4 Power — standalone page with JSON-LD ── */
  if (slug === "realme-p4-power") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "realme P4 Power",
        url: `${SITE_URL}/products/realme-p4-power`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={P4POWER_PRODUCT}
          aggregateRating={{
            ratingValue: P4POWER_REVIEW_SUMMARY.averageRating,
            reviewCount: P4POWER_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={P4POWER_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {P4POWER_FAQS.length > 0 && <FaqSchema faqs={P4POWER_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="realme-p4-power">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${P4POWER_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(P4POWER_HERO_IMAGES[0])}`}
                      alt="realme P4 Power"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {P4POWER_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(P4POWER_PRODUCT.price)}
                    </span>
                    {P4POWER_PRODUCT.original_price > P4POWER_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(P4POWER_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{P4POWER_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {P4POWER_PRODUCT.description}
                  </p>
                  {P4POWER_PRODUCT.features &&
                    P4POWER_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {P4POWER_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── iQOO Z11x — standalone page with JSON-LD ── */
  if (slug === "iqoo-z11x") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "iQOO Z11x",
        url: `${SITE_URL}/products/iqoo-z11x`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={IQOO_Z11X_PRODUCT}
          aggregateRating={{
            ratingValue: IQOO_Z11X_REVIEW_SUMMARY.averageRating,
            reviewCount: IQOO_Z11X_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={IQOO_Z11X_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {IQOO_Z11X_FAQS.length > 0 && <FaqSchema faqs={IQOO_Z11X_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="iqoo-z11x">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${IQOO_Z11X_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(IQOO_Z11X_HERO_IMAGES[0])}`}
                      alt="iQOO Z11x"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {IQOO_Z11X_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(IQOO_Z11X_PRODUCT.price)}
                    </span>
                    {IQOO_Z11X_PRODUCT.original_price >
                      IQOO_Z11X_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(IQOO_Z11X_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{IQOO_Z11X_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {IQOO_Z11X_PRODUCT.description}
                  </p>
                  {IQOO_Z11X_PRODUCT.features &&
                    IQOO_Z11X_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {IQOO_Z11X_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── Lava Agni 4 — standalone page with JSON-LD ── */
  if (slug === "lava-agni-4") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Lava Agni 4",
        url: `${SITE_URL}/products/lava-agni-4`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={LAVA_AGNI_4_PRODUCT}
          aggregateRating={{
            ratingValue: LAVA_AGNI_4_REVIEW_SUMMARY.averageRating,
            reviewCount: LAVA_AGNI_4_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={LAVA_AGNI_4_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {LAVA_AGNI_4_FAQS.length > 0 && <FaqSchema faqs={LAVA_AGNI_4_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="lava-agni-4">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${LAVA_AGNI_4_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(LAVA_AGNI_4_HERO_IMAGES[0])}`}
                      alt="Lava Agni 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {LAVA_AGNI_4_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(LAVA_AGNI_4_PRODUCT.price)}
                    </span>
                    {LAVA_AGNI_4_PRODUCT.original_price >
                      LAVA_AGNI_4_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(LAVA_AGNI_4_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{LAVA_AGNI_4_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {LAVA_AGNI_4_PRODUCT.description}
                  </p>
                  {LAVA_AGNI_4_PRODUCT.features &&
                    LAVA_AGNI_4_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {LAVA_AGNI_4_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── OPPO K13 Turbo 5G — standalone page with JSON-LD ── */
  if (slug === "oppo-k13-turbo-5g") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "OPPO K13 Turbo 5G",
        url: `${SITE_URL}/products/oppo-k13-turbo-5g`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={OPPO_K13_TURBO_5G_PRODUCT}
          aggregateRating={{
            ratingValue: OPPO_K13_TURBO_5G_REVIEW_SUMMARY.averageRating,
            reviewCount: OPPO_K13_TURBO_5G_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={OPPO_K13_TURBO_5G_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {OPPO_K13_TURBO_5G_FAQS.length > 0 && (
          <FaqSchema faqs={OPPO_K13_TURBO_5G_FAQS} />
        )}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="oppo-k13-turbo-5g">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                    <img
                      src={`/images/products/${OPPO_K13_TURBO_5G_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(OPPO_K13_TURBO_5G_HERO_IMAGES[0])}`}
                      alt="OPPO K13 Turbo 5G"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {OPPO_K13_TURBO_5G_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.price)}
                    </span>
                    {OPPO_K13_TURBO_5G_PRODUCT.original_price >
                      OPPO_K13_TURBO_5G_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(
                            OPPO_K13_TURBO_5G_PRODUCT.original_price,
                          )}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{OPPO_K13_TURBO_5G_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {OPPO_K13_TURBO_5G_PRODUCT.description}
                  </p>
                  {OPPO_K13_TURBO_5G_PRODUCT.features &&
                    OPPO_K13_TURBO_5G_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {OPPO_K13_TURBO_5G_PRODUCT.features.map(
                            (feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-apple-text-primary"
                              >
                                <svg
                                  className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                {feature}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── ErgoSlug Test — payment check page (no JSON-LD, no indexing) ── */
  if (slug === "ergoslug-test-test") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Payment Check — Test Product",
        url: `${SITE_URL}/products/ergoslug-test-test`,
      },
    ];

    return (
      <>
        <BreadcrumbSchema items={breadcrumbItems} />
        <ProductDetailClient />
      </>
    );
  }

  /* ── Messi Argentina 2026 Jersey — standalone page with JSON-LD ── */
  if (slug === "messi-argentina-2026-jersey") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Messi Argentina 2026 Jersey",
        url: `${SITE_URL}/products/messi-argentina-2026-jersey`,
      },
    ];

    const heroImageUrl = `/images/products/${WC2026_FOLDER.split("/").map(encodeURIComponent).join("/")}/${WC2026_PRODUCT_IMAGES[0].split("/").map(encodeURIComponent).join("/")}`;

    return (
      <>
        <ProductSchema
          product={WC2026_PRODUCT}
          aggregateRating={{
            ratingValue: WC2026_REVIEW_SUMMARY.averageRating,
            reviewCount: WC2026_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={WC2026_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {WC2026_FAQS.length > 0 && <FaqSchema faqs={WC2026_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="messi-argentina-2026-jersey">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden flex items-center justify-center">
                    <img
                      src={heroImageUrl}
                      alt="Messi Argentina 2026 Jersey"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {WC2026_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(WC2026_PRODUCT.price)}
                    </span>
                    {WC2026_PRODUCT.original_price > WC2026_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(WC2026_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{WC2026_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {WC2026_PRODUCT.description}
                  </p>
                  {WC2026_PRODUCT.features &&
                    WC2026_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {WC2026_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  const product = LOCAL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return <ProductDetailClient />;
  }

  const content = PRODUCT_RICH_CONTENT[slug];
  const reviewSummary = PRODUCT_REVIEW_SUMMARIES[slug];
  const reviews = PRODUCT_REVIEWS[slug] || [];

  // Build breadcrumb items: Home > Products > Product Name
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/products` },
    { name: product.name, url: `${SITE_URL}/products/${product.slug}` },
  ];

  const localImageUrls = getProductImages(slug);

  return (
    <>
      {/* JSON-LD Structured Data for this product */}
      <ProductSchema
        product={product}
        aggregateRating={
          reviewSummary
            ? {
                ratingValue: reviewSummary.averageRating,
                reviewCount: reviewSummary.totalReviews,
              }
            : undefined
        }
        reviews={reviews.slice(0, 10).map((r) => ({
          name: r.name,
          rating: r.rating,
          text: r.text,
          date: r.date,
        }))}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* FAQ Schema from rich content — enables FAQ rich results in SERP */}
      {content?.faqs && content.faqs.length > 0 && (
        <FaqSchema faqs={content.faqs} />
      )}

      {/* Server-rendered product content for Googlebot */}
      <div id="ssr-product-root" data-slug={product.slug}>
        <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {/* Image placeholder */}
              <div className="lg:col-span-2 space-y-4">
                <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
                  {localImageUrls.length > 0 ? (
                    <img
                      src={localImageUrls[0]}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex items-center justify-center p-4 h-full">
                      <span className="text-apple-text-secondary">
                        {product.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product info */}
              <div className="space-y-6">
                {/* Page Title (SEO-optimised) */}
                {content?.pageTitle ? (
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {content.pageTitle}
                  </h1>
                ) : (
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {product.name}
                  </h1>
                )}

                {/* Tagline */}
                {content?.tagline && (
                  <p className="text-lg text-apple-text-secondary leading-relaxed italic">
                    {content.tagline}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-apple-text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price > product.price && (
                    <>
                      <span className="text-lg text-apple-text-secondary line-through">
                        {formatPrice(product.original_price)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        -{product.discount_percentage}%
                      </span>
                    </>
                  )}
                </div>

                {/* Stock warning */}
                {content?.stockWarning && (
                  <p className="text-sm font-medium text-red-500">
                    ⚡ {content.stockWarning}
                  </p>
                )}

                {/* Description */}
                <p className="text-apple-text-secondary leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-apple-text-primary"
                        >
                          <svg
                            className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications &&
                  Object.keys(product.specifications).length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                        Specifications
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div key={key} className="contents">
                              <span className="text-apple-text-secondary">
                                {key}
                              </span>
                              <span className="text-apple-text-primary">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailClient />
    </>
  );
}
