"use client";
import {
  Body,
  BodyLarge,
  BodySmall,
  Heading1,
  Title,
} from "@/components/type-styles";
import React, { useEffect, useState } from "react";

import { sponsors } from "@/data/sponsors";
import Image from "next/image";
import SponsorCard from "./components/sponsor-card";
import { useTheme } from "next-themes";

import CloudBottomImage from "@/../public/assets/images/clouds-bottom.png";
import CloudBottomImageDark from "@/../public/assets/images/clouds-bottom-green.png";
import Button from "@/components/Button";
import Loading from "../loading";

export default function Sponsors() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loading />;

  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden">
      <div className="relative bg-backgroundEmSecondary flex flex-col pb-12 pb-[84px]">
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
                <Body className="text-onBackgroundSecondary w-full">
                  Sponsorships and support
                </Body>
                <Title className="md:max-w-[75%]">
                  We believe education should be free.
                </Title>
              </div>
              <BodyLarge className="text-onBackgroundSecondary w-full md:w-[75%] lg:w-[50%]">
                {
                  "We’d love to have your support for the keeping our events free-of-cost, and in-turn help your brand get exposure within the community."
                }
              </BodyLarge>
            </div>
            <Button href="/" highlightColor="onBackgroundEmSecondary">
              Sponsor Us
            </Button>
          </div>
          <Image
            src={`/assets/images/books${
              resolvedTheme === "light" ? "" : "-dark"
            }.svg`}
            height={0}
            width={0}
            className="w-auto h-auto max-w-[300px] lg:max-w-[400px] xl:max-w-[600px] lg:mb-24"
            alt="books"
          />
        </div>

        <Image
          className="w-lvw max-w-[100vw] absolute bottom-0 left-0 right-0"
          src={
            resolvedTheme === "light" ? CloudBottomImage : CloudBottomImageDark
          }
          alt=""
        ></Image>
      </div>
      <div className="bg-backgroundSecondary grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-6 md:py-[84px]">
        <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Heading1>Previous Partners and Sponsors</Heading1>
            <Body className="text-onBackgroundSecondary">
              GDSC MBCET brings together ordinary humans with the extraordinary
              ability to chase their dreams.
            </Body>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor}></SponsorCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const avatarColors = [
  "backgroundEmPrimary",
  "backgroundEmSecondary",
  "backgroundEmTertiary",
];
