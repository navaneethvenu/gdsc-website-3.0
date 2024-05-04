import { Body, BodySmall } from "@/components/type-styles";
import { Card } from "@/components/ui/card";
import { GithubLogo } from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

export default function SkillsCard() {
  return (
    <div>
      <Card className="w-[1fr] max-w-[350px] md:max-w-full bg-backgroundSecondary border-borderPrimary flex items-center p-3 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="p-3 rounded-xl bg-backgroundEmPrimary">
            <GithubLogo size={32} weight="fill" className="text-onBackgroundEmPrimary"/>
          </div>
          <div>
            <Body>Web Development</Body>
            <BodySmall>Fundamentals of Developing Web Applications</BodySmall>
          </div>
        </div>
      </Card>
    </div>
  );
}
