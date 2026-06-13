// =====================================================================
// WebSite + SearchAction Structured Data
// Enables Sitelinks Search Box in Google SERP and helps AI search
// engines understand your site is a searchable e-commerce store.
// =====================================================================

import { SITE_METADATA } from "@/lib/constants";
import JsonLd from "./JsonLd";

export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_METADATA.title,
    url: SITE_METADATA.url,
    description: SITE_METADATA.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_METADATA.url}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd schema={schema} id="website-schema" />;
}
