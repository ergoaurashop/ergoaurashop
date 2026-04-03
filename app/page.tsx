import { getAllCollections } from "@/lib/shopify";
import { getHomepageMetaobjects } from "@/lib/shopify/metaobjects";

// Import layout components
import { TopCategoryNav } from "@/components/homepage/TopCategoryNav";
import { HeroStack } from "@/components/homepage/HeroStack";
import { ProductShelf } from "@/components/home/ProductShelf";
import { DepartmentGrid } from "@/components/home/DepartmentGrid";

export const revalidate = 900; // ISR: 15 minutes

export default async function Home() {
  const [allCollections, meta] = await Promise.all([
    getAllCollections(),
    getHomepageMetaobjects()
  ]);

  return (
    <div className="flex flex-col w-full font-sans pb-16 md:pb-0 bg-white overflow-hidden">
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
