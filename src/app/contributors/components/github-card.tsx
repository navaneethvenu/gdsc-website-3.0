import { Body, BodyLarge, BodySmall } from "@/components/type-styles";
import { Globe, TwitterLogo } from "@phosphor-icons/react";
import { LucideAArrowDown, LucideCopy, LucideGitCommit } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LinkedinIcon from "@/../public/assets/icons/linkedin-logo.svg";
import dateToElapsed from "@/utils/date-to-elapsed";
import Contribution from "@/models/contributions";
import ProfileImage from "@/../public/assets/images/team-photos/bengeorgenetto.png";
import SocialRow from "@/components/social-row";

type GithubCardProps = {
  contribution: Contribution;
  avatarColor: string;
};

export default function GithubCard({
  contribution,
  avatarColor,
}: GithubCardProps) {
  const [commitIds, setCommitIds] = useState<string[]>([]);

  let [elapsedTime, setElapsedTime] = useState<string>("");

  useEffect(() => {
    const generateCommitId = (index: number) => {
      const randomId = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0");
      return `${randomId}`;
    };

    const newCommitIds = contribution.changes.map((_, index) =>
      generateCommitId(index)
    );
    setCommitIds(newCommitIds);

    setElapsedTime(dateToElapsed(contribution.time));
  }, [contribution.changes, contribution.time]);

  return (
    <div className="bg-surfacePrimary border-solid border-[1px] border-borderPrimary w-1fr rounded-lg p-6 flex flex-col gap-4 overflow-hidden">
      <div
        className={
          "bg-" +
          avatarColor +
          " h-10 w-10 rounded-full grow-0 shrink-0 overflow-hidden"
        }
      >
        <Image src={ProfileImage} alt="" width={40} height={40}></Image>
      </div>
      <div className="flex flex-col gap-8 justify-between h-full">
        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            <BodyLarge className="!text-[18px] lg:!text-[20px] !font-medium">
              {contribution.contributor.name}
            </BodyLarge>
            <Body className="text-onBackgroundTertiary">{elapsedTime}</Body>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center gap-3">
              <LucideGitCommit></LucideGitCommit>
              <div className="w-[1px] h-full bg-borderPrimary"></div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              Committed to this repository
              <div className="changes flex flex-col border-solid border-[1px] border-borderPrimary rounded-lg bg-borderPrimary gap-[1px] overflow-hidden">
                {contribution.changes.map((change, index) => (
                  <div
                    className="bg-surfacePrimary flex justify-between items-center gap-4 p-2 pl-3 flex-wrap gap-y-2"
                    key={index}
                  >
                    <Body className="text-onBackgroundSecondary">{change}</Body>
                    <div className="flex border-solid border-[1px] border-borderSecondary rounded-sm bg-borderSecondary gap-[1px] overflow-hidden select-none	">
                      <div className="flex p-1 bg-surfaceSecondary">
                        <LucideCopy
                          width={16}
                          height={16}
                          className="text-onBackgroundSecondary"
                        />
                      </div>
                      <div className="flex px-1 py-2 h-6 items-center bg-surfaceSecondary">
                        <BodySmall className="text-onBackgroundEmPrimary">
                          {commitIds[index]}
                        </BodySmall>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SocialRow socials={contribution.contributor.socials}></SocialRow>
      </div>
    </div>
  );
}
