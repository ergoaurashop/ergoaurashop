import type { Metadata } from "next";
import Link from "next/link";
import { SITE_METADATA, SITE_URL, CATEGORIES } from "@/lib/constants";
import { LOCAL_PRODUCTS } from "@/lib/products-data";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse all product categories at ErgoAura Shop — Wellness, Home & Kitchen, Accessories, and Personal Care.",
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
  openGraph: {
    title: `Categories | ${SITE_METADATA.title}`,
    description:
      "Browse all product categories at ErgoAura Shop — Wellness, Home & Kitchen, Accessories, and Personal Care.",
    url: `${SITE_URL}/categories`,
  },
};

export default function CategoriesPage() {
  // Compute product counts per category from local data
  const categoriesWithCount = CATEGORIES.map((cat) => {
    const count = LOCAL_PRODUCTS.filter((p) => p.category === cat.slug).length;
    return { ...cat, count };
  });

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Categories", url: `${SITE_URL}/categories` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="bg-[#F5F1EB] min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 md:pt-36 md:pb-16 overflow-hidden">
          <div className="section-container">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#86868B] mb-6">
              <Link
                href="/"
                className="hover:text-apple-black transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-apple-black font-medium">Categories</span>
            </nav>
            <h1 className="type-h1 text-center">Categories</h1>
            <p className="text-center text-[#86868B] mt-3 max-w-2xl mx-auto">
              Explore our curated collection of wellness, kitchen, accessories,
              and personal care products designed for your everyday comfort.
            </p>
          </div>
        </section>

        {/* Category Grid */}
        <div className="section-container pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categoriesWithCount.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group block bg-white rounded-apple border border-apple-border p-8
                         hover:shadow-lg hover:border-apple-black/20 transition-all duration-300"
              >
                <h2 className="type-h3 group-hover:text-apple-black transition-colors">
                  {cat.name}
                </h2>
                <p className="text-sm text-[#86868B] mt-2">
                  {cat.count} product{cat.count !== 1 ? "s" : ""}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-apple-black/60 group-hover:text-apple-black transition-colors">
                  Browse &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
