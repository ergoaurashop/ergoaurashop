"use client";

import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { HeroSlide } from "@/lib/shopify/metaobjects";
import { CarouselArrows } from "./CarouselArrows";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  console.log("Slides found:", slides.length);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "ltr" }, [
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, slides]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (slides.length === 0) return (
    <div className="w-full h-full bg-ergo-navy flex items-center justify-center text-white/20 font-bold tracking-widest leading-none bg-gradient-to-br from-ergo-navy-deep to-ergo-navy">
      ERGOAURA
    </div>
  );

  return (
    <div className="embla overflow-hidden w-full h-full relative" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {slides.map((slide, index) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0 relative h-full" key={slide.id}>
            <Link href={slide.button_link} className="block w-full h-full relative group">
              {slide.image && (
                <Image
                  src={slide.image.url}
                  alt={slide.image.altText || slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              )}
              {slide.title && (
                <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-8 md:p-12">
                   <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight drop-shadow-lg max-w-xl">
                      {slide.title}
                   </h2>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
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
