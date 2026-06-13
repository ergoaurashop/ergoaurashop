// =====================================================================
// JSON-LD Structured Data — Builder Utilities
// =====================================================================

/** Base JSON-LD wrapper — creates a safe, deduplicated script payload */
export function jsonLd<T>(schema: T): T {
  return {
    "@context": "https://schema.org",
    ...schema,
  } as T;
}

/** Build a breadcrumb item element for BreadcrumbList */
export function breadcrumbItem(position: number, name: string, url: string) {
  return {
    "@type": "ListItem",
    position,
    name,
    item: url,
  };
}

/** Build a product offer with Indian pricing and return policy */
export function buildOffer(
  url: string,
  price: number,
  currency: string = "INR",
  stock: number = 10,
) {
  return {
    "@type": "Offer",
    url,
    priceCurrency: currency,
    price,
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    itemCondition: "https://schema.org/NewCondition",
    availability:
      stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency,
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 3,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 3,
          maxValue: 7,
          unitCode: "DAY",
        },
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "IN",
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 7,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
  };
}
