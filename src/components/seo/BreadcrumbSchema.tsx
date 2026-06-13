// =====================================================================
// BreadcrumbList Structured Data
// Helps search engines and AI understand the navigation hierarchy.
// =====================================================================

import JsonLd from "./JsonLd";
import { breadcrumbItem } from "@/lib/seo/json-ld";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbSchema({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) =>
      breadcrumbItem(index + 1, item.name, item.url),
    ),
  };

  return <JsonLd schema={schema} id="breadcrumb-schema" />;
}
