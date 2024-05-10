import { Heading5, BodySmall } from "@/components/type-styles";
import { Card } from "@/components/ui/card";
import { GithubLogo } from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

export default function SkillsCard() {
  return (
    <Card className="bg-surfacePrimary border-borderPrimary flex items-center p-3 py-4 gap-3 overflow-hidden shadow-none">
      <div className="p-3 rounded-xl bg-backgroundEmPrimary">
        <GithubLogo
          size={32}
          weight="fill"
          className="text-onBackgroundEmPrimary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Heading5>Web Development</Heading5>
        <BodySmall className="text-onBackgroundSecondary">
          Fundamentals of Developing Web Applications
        </BodySmall>
      </div>
    </Card>
  );
}
