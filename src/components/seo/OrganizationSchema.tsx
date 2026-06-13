// =====================================================================
// Organization Structured Data
// Defines the ErgoAura brand entity for knowledge panels and AI search.
// =====================================================================

import { SITE_METADATA, SOCIAL_LINKS } from "@/lib/constants";
import JsonLd from "./JsonLd";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ErgoAura Shop",
    url: SITE_METADATA.url,
    logo: `${SITE_METADATA.url}/images/logo/ergoauralogo.webp`,
    description: SITE_METADATA.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@ergoaurashop.com",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };

  return <JsonLd schema={schema} id="organization-schema" />;
}
