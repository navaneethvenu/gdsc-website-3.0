"use client";

import { Body, BodyLarge, Title } from "@/components/type-styles";
import React, { useEffect, useState } from "react";
import Clouds4 from "@/../public/assets/images/clouds-4.svg";
import Clouds0 from "@/../public/assets/images/clouds-0.svg";
import Image from "next/image";
import CloudBottomImage from "@/../public/assets/images/clouds-bottom.png";
import CloudBottomImageDark from "@/../public/assets/images/clouds-bottom-dark.png";
import Button from "@/components/Button";
import { useTheme } from "next-themes";
import Loading from "./loading";

export default function NotFound() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <Loading />
  return (
    <div className="relative bg-backgroundEmPrimary flex flex-col min-h-[100vh] pb-12 pb-[84px]">
      {resolvedTheme == "dark" && (
        <Image
          layout="fill"
          src={"/assets/images/stars-background.svg"}
          width={0}
          height={0}
          className="absolute top-0 z-0 w-full h-full animate-pulse object-cover md:object-center repeat bg-repeat"
          alt=""
        ></Image>
      )}
      <div className="z-[1] text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-6 items-center justify-start px-6 py-12 md:py-[84px] !pb-0 ">
        <div className="flex flex-col gap-12 items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
              <Body className="text-onBackgroundSecondary w-full">Uh Oh</Body>
              <Title className="md:max-w-[75%]">
                You’re in uncharted teritory
              </Title>
            </div>
            <BodyLarge className="text-onBackgroundSecondary w-full md:w-[75%] lg:w-[50%]">
              {
                "You can either head back to our homepage to explore more or take a moment to watch the clouds"
              }
            </BodyLarge>
          </div>
          <Button href="/">Return Home</Button>
        </div>
        <div className="flex gap-4 mt-12 lg:mt-16 w-full justify-center">
          <Clouds4 className="text-illoSurfacePrimary animate-[bounce_8s_ease-in-out_infinite] max-w-32 sm:max-w-40 md:max-w-48 lg:max-w-56"></Clouds4>
          <Clouds0 className="text-illoSurfacePrimary animate-[bounce_12s_ease-in-out_infinite] max-w-32 sm:max-w-40 md:max-w-48 lg:max-w-56"></Clouds0>
          <Clouds4 className="text-illoSurfacePrimary animate-[bounce_16s_ease-in-out_infinite] max-w-32 sm:max-w-40 md:max-w-48 lg:max-w-56"></Clouds4>
        </div>
      </div>
      {resolvedTheme == "light" && (
        <Image
          className="w-lvw max-w-[100vw] absolute bottom-0 left-0 right-0"
          src={CloudBottomImage}
          alt=""
        ></Image>
      )}
      {resolvedTheme == "dark" && (
        <Image
          className="w-lvw max-w-[100vw] absolute bottom-0 left-0 right-0"
          src={CloudBottomImageDark}
          alt=""
        ></Image>
      )}
    </div>
  );
}
