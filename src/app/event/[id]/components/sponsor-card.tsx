import Button from "@/components/Button";
import { Body, Heading3 } from "@/components/type-styles";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import SponsorImage from "@/../public/assets/images/sponsors/sticker-mule.png";

export default function SponsorCard() {
  return (
    <Card className="flex flex-col justify-between bg-surfacePrimary border-borderPrimary overflow-hidden shadow-none">
      <CardHeader className="flex flex-col justify-around">
        <Image
          src={SponsorImage}
          alt={""}
          width={100}
          height={100}
          className="bg-backgroundEmPrimary rounded-xl w-[48px] h-[48px] object-cover mb-4"
        />
        <Heading3>Devfolio</Heading3>
        <Body className="text-onBackgroundSecondary">Gold Sponsor</Body>
      </CardHeader>
      <CardFooter className=" flex gap-3 ">
        <Button variant="secondary" className="w-full">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
}
