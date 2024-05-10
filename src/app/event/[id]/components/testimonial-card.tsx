import { Body, BodySmall, Heading5 } from "@/components/type-styles";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function TestimonialCard() {
  return (
    <Card className="bg-surfacePrimary border-borderPrimary rounded-lg rounded-bl-none gap-2 flex flex-col overflow-hidden shadow-none">
      <CardHeader>
        <Body className="text-onBackgroundSecondary">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          soluta quos impedit, laboriosam ipsum aspernatur provident id quam
          nihil aliquid voluptatem molestiae tempore molestias tempora obcaecati
          dolore, harum sapiente iusto.
        </Body>
      </CardHeader>
      <CardFooter>
        <Image
          src="/assets/images/team-photos/bengeorgenetto.png"
          alt={""}
          width={42}
          height={42}
          className="bg-backgroundEmPrimary rounded-xl w-[42px] h-[42px] object-cover"
        />
        <div className="px-3">
          <Heading5>Ben George Netto</Heading5>
          <BodySmall className="text-onBackgroundTertiary">
            1 year ago
          </BodySmall>
        </div>
      </CardFooter>
    </Card>
  );
}
