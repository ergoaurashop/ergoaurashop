import { getAllCollections, getShopInfo } from "@/lib/shopify";
import { getHomepageMetaobjects } from "@/lib/shopify/metaobjects";

// Import layout components
import { TopCategoryNav } from "@/components/homepage/TopCategoryNav";
import { HeroStack } from "@/components/homepage/HeroStack";
import { ProductShelf } from "@/components/home/ProductShelf";
import { DepartmentGrid } from "@/components/home/DepartmentGrid";

export const revalidate = 900; // ISR: 15 minutes

export default async function Home() {
  const [allCollections, meta, shop] = await Promise.all([
    getAllCollections(),
    getHomepageMetaobjects(),
    getShopInfo()
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": shop?.name || "ErgoAura",
    "description": shop?.description || "",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://ergoaurashop.com",
    "logo": shop?.brand?.logo?.image?.url || "https://ergoaurashop.com/logo.png",
    "email": "support@ergoaurashop.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Hilal Building, Qusais 1",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    }
  };

  return (
    <div className="flex flex-col w-full font-sans pb-16 md:pb-0 bg-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Maximum width wrapper for main application stacks */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 flex flex-col gap-4 md:gap-5">
        
        <HeroStack meta={meta} />

        {allCollections.map((collection) => {
            const hasProducts = collection.products?.edges?.length > 0;

            // Step 4: Skip empty collections completely
            if (!hasProducts) {
               return null;
            }

            return (
              <ProductShelf 
                key={collection.id} 
                collection={collection} 
              />
            );
        })}

        <div className="mt-4 md:mt-5">
          <DepartmentGrid 
            title="Shop Departments" 
            collections={allCollections} 
            linkHref="/collections" 
          />
        </div>
        
      </div>
    </div>
  );
}
