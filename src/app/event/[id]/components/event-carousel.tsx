import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@/components/Button";
import { BodyLarge, Heading3 } from "@/components/type-styles";
import useIsVerySmallScreen from "@/components/hooks/useIsVerySmallScreen";

interface EventCarouselProps {
  children: React.ReactNode[];
  title: string;
  limit?: {
    sm?: number;
    lg?: number;
    xl?: number;
  };
}

const defaultLimit = {
  sm: 2,
  lg: 3,
  xl: 3,
};

export default function EventCarousel({
  children,
  title,
  limit = defaultLimit,
}: EventCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const length = children.length;
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isSmallScreen = useIsVerySmallScreen();

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
      <div className="flex justify-between items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <Heading3>{title}</Heading3>
          <BodyLarge className="text-onBackgroundTertiary">{`(${children.length})`}</BodyLarge>
        </div>
        {!isSmallScreen && (
          <div
            className={`flex items-center gap-2 ${
              length <= (limit.xl || defaultLimit.xl) ? "xl:hidden" : ""
            } ${length <= (limit.lg || defaultLimit.lg) ? "lg:hidden" : ""} ${
              length <= (limit.sm || defaultLimit.sm) ? "sm:hidden" : ""
            }`}
          >
            <Button
              onClick={carouselPrev}
              disabled={!api?.canScrollPrev()}
              variant="secondary"
            >
              <Icon icon="maki:arrow" className="w-auto h-auto rotate-180	" />
            </Button>
            <Button
              onClick={carouselNext}
              disabled={!api?.canScrollNext()}
              variant="secondary"
            >
              <Icon icon="maki:arrow" className="w-auto h-auto " />
            </Button>
          </div>
        )}
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
        setApi={setApi}
        overflow={isSmallScreen}
      >
        <CarouselContent>
          {children.map((child, index) => (
            <CarouselItem
              className={`${
                limit.sm === 1
                  ? "sm:basis-full"
                  : `sm:basis-1/${Math.min(
                      length,
                      limit.sm || defaultLimit.sm,
                      limit.lg || defaultLimit.lg,
                      limit.xl || defaultLimit.xl
                    )}`
              } ${
                limit.lg === 1
                  ? "lg:basis-full"
                  : `lg:basis-1/${Math.min(
                      length,
                      limit.lg || defaultLimit.lg,
                      limit.xl || defaultLimit.xl
                    )}`
              } ${
                limit.xl === 1
                  ? "xl:basis-full"
                  : `xl:basis-1/${Math.min(
                      length,
                      limit.xl || defaultLimit.xl
                    )}`
              }`}
              key={index}
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
