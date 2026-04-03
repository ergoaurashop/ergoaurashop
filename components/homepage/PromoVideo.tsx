"use client";

import React, { useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PromoVideo as PromoVideoType } from "@/lib/shopify/metaobjects";
import { CarouselArrows } from "./CarouselArrows";

interface PromoVideoProps {
  videos: PromoVideoType[];
}

export function PromoVideo({ videos }: PromoVideoProps) {
  const isSlider = videos.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "ltr", active: isSlider }, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false }),
  ]);

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, videos]);

  if (videos.length === 0) {
    return (
      <div className="w-full h-full bg-ergo-orange flex items-center justify-center text-white/20 font-bold bg-gradient-to-br from-orange-600 to-ergo-orange">
        PROMO VIDEO
      </div>
    );
  }

  return (
    <div className="embla overflow-hidden w-full h-full relative bg-black" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {videos.map((video) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0 relative h-full" key={video.id}>
            <VideoItem video={video} />
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

function VideoItem({ video }: { video: PromoVideoType }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Explicitly set muted property to bypass browser restrictions
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented:", err);
      });
    }
  }, [video]);

  if (!video.video_url) return null;

  return (
    <video
      ref={videoRef}
      src={video.video_url}
      poster={video.poster_image?.url || ""}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      style={{ pointerEvents: "none" }}
    />
  );
}
