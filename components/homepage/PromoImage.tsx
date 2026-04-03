"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PromoImage as PromoImageType } from "@/lib/shopify/metaobjects";
import { CarouselArrows } from "./CarouselArrows";

interface PromoImageProps {
  images: PromoImageType[];
}

export function PromoImage({ images }: PromoImageProps) {
  const isSlider = images.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "ltr", active: isSlider }, [
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: false }),
  ]);

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, images]);

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-ergo-green flex items-center justify-center text-white/20 font-bold bg-gradient-to-br from-green-700 to-ergo-green">
        PROMO IMAGE
      </div>
    );
  }

  return (
    <div className="embla overflow-hidden w-full h-full relative" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {images.map((img) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0 relative h-full" key={img.id}>
            <Link href={img.link} className="block w-full h-full relative group overflow-hidden">
              {img.image && (
                <Image
                  src={img.image.url}
                  alt={img.image.altText || "ErgoAura Promo"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </Link>
          </div>
        ))}
      </div>

      {isSlider && (
        <CarouselArrows
          onPrev={() => emblaApi?.scrollPrev()}
          onNext={() => emblaApi?.scrollNext()}
          canPrev={canPrev}
          canNext={canNext}
        />
      )}
    </div>
  );
}
