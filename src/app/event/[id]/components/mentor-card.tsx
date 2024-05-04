import SocialRow from "@/app/contributors/components/social-row";
import { Body, Heading3 } from "@/components/type-styles";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function MentorCard() {
  return (
    <Card className="w-1fr max-w-[420px] aspect-square border-borderPrimary flex flex-col justify-between ">
      <CardHeader className="flex flex-col justify-around">
        <Image src="/assets/images/team-photos/bengeorgenetto.png" alt={""} width={100} height={100} className="bg-backgroundEmPrimary rounded-full w-[100px] h-[100px] object-cover mb-4"/>
        <Heading3>Ben George Netto</Heading3>
        <Body>Community Lead</Body>
      </CardHeader>
      <CardFooter className=" flex gap-3 ">
        <SocialRow
              socials={{
                twitter: "gdscmbcet",
                linkedin: "gdscmbcet",
                website: "gdscmbcet"
              }}
            ></SocialRow>
      </CardFooter>
    </Card>
  );
}
