// =====================================================================
// BreadcrumbList Structured Data (Client-Compatible)
// Use this in "use client" pages where server components can't be imported.
// =====================================================================
"use client";

import { breadcrumbItem } from "@/lib/seo/json-ld";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbSchemaClient({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) =>
      breadcrumbItem(index + 1, item.name, item.url),
    ),
  };

  return (
    <script
      type="application/ld+json"
      id="breadcrumb-schema"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
