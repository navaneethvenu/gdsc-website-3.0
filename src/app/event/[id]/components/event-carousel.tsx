import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useIsSmallScreen from "@/components/hooks/useIsSmallScreen";
import Button from "@/components/Button";
import { Heading3 } from "@/components/type-styles";

interface EventCarouselProps{
  children: React.ReactNode[]
  title: string
}

export default function EventCarousel({children, title} : EventCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function carouselNext() {
    if (api) api.scrollNext();
  }

  function carouselPrev() {
    if (api) api.scrollPrev();
  }

  return (
    <div className="w-full flex flex-col gap-4 md:gap-4 mt-3">
      {isSmallScreen && (
        <div className="flex items-center gap-2">
          <Button onClick={carouselPrev} variant="primary">
            <Icon icon="maki:arrow" className="w-auto h-auto rotate-180	" />
          </Button>
          <Button onClick={carouselNext} variant="primary">
            <Icon icon="maki:arrow" className="w-auto h-auto " />
          </Button>
        </div>
      )}
      {!isSmallScreen && (
        <div className="max-w-[780px] flex justify-between items-center gap-x-8 gap-y-4">
          <div className="">
          <Heading3>{title}</Heading3>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={carouselPrev} variant="primary">
              <Icon icon="maki:arrow" className="w-auto h-auto rotate-180	" />
            </Button>
            <Button onClick={carouselNext} variant="primary">
              <Icon icon="maki:arrow" className="w-auto h-auto " />
            </Button>
          </div>
        </div>
      )}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>{children}</CarouselContent>
      </Carousel>{" "}
    </div>
  );
}
