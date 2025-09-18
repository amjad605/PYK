"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ImageProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full overflow-hidden shadow-lg aspect-video h-auto max-h-[80vh]">
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent className="h-full">
          {images.map((img, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={img || "/placeholder.svg"}
                  alt={`property-${index}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls - Responsive sizing */}
        <CarouselPrevious className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 rounded-full !bg-gray-400/60 text-white hover:bg-black/70 w-8 h-8 md:w-10 md:h-10" />
        <CarouselNext className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 rounded-full !bg-gray-400/60 text-white hover:bg-black/70 w-8 h-8 md:w-10 md:h-10" />

        {/* Counter - Fixed to always be visible within container */}
      </Carousel>
      {count > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-sm text-white z-10">
          {current} / {count}
        </div>
      )}
    </div>
  );
}
