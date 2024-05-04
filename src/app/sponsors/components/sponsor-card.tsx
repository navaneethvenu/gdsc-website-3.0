import React from "react";

import Image from "next/image";
import Sponsor from "@/models/sponsor";
import {
  Body,
  BodyLarge,
  BodySmall,
  Heading2,
  Heading3,
} from "@/components/type-styles";
import { ResponsiveSheet } from "@/components/ui/responsive-sheet";
import Button from "@/components/Button";

interface SponsorCardProps {
  sponsor: Sponsor;
}

export default function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <ResponsiveSheet
      trigger={
        <div className="bg-surfacePrimary border-solid border-[1px] border-borderPrimary w-1fr rounded-xl p-6 flex flex-col gap-4 overflow-hidden">
          <div className="w-12 h-12 bg-surfaceSecondary rounded-md overflow-hidden">
            <Image
              src={sponsor.imageURL}
              width={48}
              height={48}
              alt={sponsor.name + " Logo"}
            ></Image>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <BodyLarge>{sponsor.name}</BodyLarge>
              <Body className="text-onBackgroundSecondary">
                {sponsor.events.length == 1 || sponsor.events.length == 2
                  ? sponsor.events.map((event) => event.name).join(", ")
                  : sponsor.events[0].name +
                    ", " +
                    sponsor.events[1].name +
                    " and " +
                    (sponsor.events.length - 2) +
                    " Others"}
              </Body>
            </div>

            <Button className="w-auto sm:w-max" variant={"secondary"}>
              Learn more
            </Button>
          </div>
        </div>
      }
      content={
        <div className="bg-backgroundSecondary flex flex-col gap-8 p-4 grow overflow-auto">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 bg-surfaceSecondary rounded-md overflow-hidden">
              <Image
                src={sponsor.imageURL}
                width={64}
                height={64}
                alt={sponsor.name + " Logo"}
              ></Image>
            </div>
            <div className="flex flex-col gap-2">
              <Heading2>{sponsor.name}</Heading2>
              <Body className="text-onBackgroundSecondary">
                {sponsor.description}
              </Body>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {sponsor.events.map((event, index) => (
              <div
                key={index}
                className="bg-surfacePrimary flex flex-wrap sm:flex-nowrap w-full p-4 gap-3 border-borderPrimary border-solid border-[1px] rounded-lg overflow-hidden"
              >
                <div className=" bg-surfaceSecondary h-12 aspect-square rounded-lg overflow-hidden shrink-0">
                  <Image src={""} alt={event.name} width={48} height={48} />
                </div>

                <div className="flex flex-col">
                  <Heading3>{event.name}</Heading3>
                  <Body className="text-onBackgroundSecondary">
                    {event.type}
                  </Body>
                  <BodySmall className="text-onBackgroundTertiary">
                    {event.year}
                  </BodySmall>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    ></ResponsiveSheet>
  );
}
