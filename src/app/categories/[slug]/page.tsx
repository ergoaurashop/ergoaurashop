import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_METADATA, SITE_URL, CATEGORIES } from "@/lib/constants";
import { LOCAL_PRODUCTS } from "@/lib/products-data";
import { getProductImages } from "@/lib/utils";
import CategoryProducts from "./CategoryProducts";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Dynamically generates metadata for each category page.
 * Includes canonical URL and Open Graph tags.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };

  const count = LOCAL_PRODUCTS.filter((p) => p.category === slug).length;
  const categoryProducts = LOCAL_PRODUCTS.filter((p) => p.category === slug);
  const ogImage =
    categoryProducts.length > 0
      ? getProductImages(categoryProducts[0].slug)?.[0]
      : undefined;

  return {
    title: category.name,
    description: `Shop ${category.name.toLowerCase()} products at ErgoAura Shop — ${count} premium products for your everyday comfort and well-being.`,
    alternates: {
      canonical: `${SITE_URL}/categories/${slug}`,
    },
    openGraph: {
      title: `${category.name} | ${SITE_METADATA.title}`,
      description: `Shop ${category.name.toLowerCase()} products at ErgoAura Shop — ${count} premium products for your everyday comfort and well-being.`,
      url: `${SITE_URL}/categories/${slug}`,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 900 }],
      }),
    },
  };
}

/**
 * Category product listing page.
 * Filters LOCAL_PRODUCTS by category and renders them in a responsive grid.
 */
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = LOCAL_PRODUCTS.filter((p) => p.category === slug);

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Categories", url: `${SITE_URL}/categories` },
    { name: category.name, url: `${SITE_URL}/categories/${slug}` },
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
              <Link
                href="/categories"
                className="hover:text-apple-black transition-colors"
              >
                Categories
              </Link>
              <span>/</span>
              <span className="text-apple-black font-medium">
                {category.name}
              </span>
            </nav>

            <h1 className="type-h1 text-center">{category.name}</h1>
            <p className="text-center text-[#86868B] mt-3 max-w-2xl mx-auto">
              {products.length} product{products.length !== 1 ? "s" : ""}{" "}
              available in this category
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <div className="section-container pb-16">
          <CategoryProducts products={products} categoryName={category.name} />
        </div>
      </div>
    </>
  );
}
