"use client";

import teamMember from "@/models/team-members";
import Image from "next/image";
import SocialRow from "@/components/social-row";
import { Body, BodyLarge, BodySmall } from "@/components/type-styles";

interface TeamCardProps {
  teammember: teamMember;
}

const getTeamStyles = (
  team: string
): { avatar: string; border: string; badge: string } => {
  const styleMap: {
    [key: string]: { avatar: string; border: string; badge: string };
  } = {
    "Operations Team": {
      avatar: "bg-backgroundEmTertiary",
      border: "border-borderEmTertiary",
      badge: "bg-backgroundEmTertiary",
    },
    "Technical Team": {
      avatar: "bg-backgroundEmSecondary",
      border: "border-borderEmSecondary",
      badge: "bg-backgroundEmSecondary",
    },
    "Design Team": {
      avatar: "bg-backgroundEmPrimary",
      border: "border-borderEmPrimary",
      badge: "bg-backgroundEmPrimary",
    },
    "Social Media Team": {
      avatar: "bg-backgroundEmQuaternary",
      border: "border-borderEmQuaternary",
      badge: "bg-backgroundEmQuaternary",
    },
    "All Teams": {
      avatar: "bg-backgroundEmTertiary",
      border: "border-borderSecondary",
      badge: "bg-transparent",
    },
  };
  return styleMap[team] || styleMap["Technical Team"]; // Default to Technical Team if not found
};

export default function TeamCard({ teammember }: TeamCardProps) {
  const teamStyles = getTeamStyles(teammember.team);

  return (
    <div className="bg-surfacePrimary border-solid border-[1px] border-borderPrimary rounded-lg p-8 pb-6 flex flex-col w-full">
      <div className="flex flex-col gap-8">
        <div
          className={`${teamStyles.avatar} h-20 w-20 rounded-full grow-0 shrink-0 overflow-hidden`}
        >
          <Image
            src={teammember.imageURL}
            alt={`${teammember.name}'s profile picture`}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start text-left">
            <BodyLarge className="!text-[18px] lg:!text-[20px] !font-medium">
              {teammember.name}
            </BodyLarge>
            <Body className="text-onBackgroundTertiary">{teammember.role}</Body>
          </div>
          <div>
            <BodySmall
              className={`rounded-lg border ${teamStyles.badge} ${teamStyles.border} text-onBackgroundSecondary flex w-fit items-center gap-2 py-2 px-3`}
            >
              {teammember.team}
            </BodySmall>
          </div>
        </div>
        <div className="pt-6">
          <SocialRow socials={teammember.socials} />
        </div>
      </div>
    </div>
  );
}
