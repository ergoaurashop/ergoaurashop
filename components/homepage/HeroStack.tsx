import { HeroSlider } from "./HeroSlider";
import { PromoVideo } from "./PromoVideo";
import { PromoImage } from "./PromoImage";
import { HomepageMetaobjects } from "@/lib/shopify/metaobjects";

interface HeroStackProps {
  meta: HomepageMetaobjects;
}

export function HeroStack({ meta }: HeroStackProps) {
  return (
    <div className="w-full">
      {/* Desktop Layout -> hidden md:grid */}
      <div className="hidden md:grid grid-cols-3 gap-4 w-full h-[380px] lg:h-[450px]">
        {/* Left Side -> Slider (Main Banner) */}
        <div className="col-span-2 rounded-none overflow-hidden relative border border-ergo-border">
          <HeroSlider slides={meta.heroSlides} />
        </div>
        
        {/* Right Side -> Promo 1 (Videos) and Promo 2 (Images) */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="flex-1 rounded-none overflow-hidden relative border border-ergo-border">
            <PromoVideo videos={meta.promoVideos} />
          </div>
          <div className="flex-1 rounded-none overflow-hidden relative border border-ergo-border">
            <PromoImage images={meta.promoImages} />
          </div>
        </div>
      </div>

      {/* Mobile Layout -> Hero Slider taking full width */}
      <div className="flex md:hidden w-full h-[350px] relative border border-ergo-border mb-4">
        <HeroSlider slides={meta.heroSlides} />
      </div>
    </div>
  );
}

