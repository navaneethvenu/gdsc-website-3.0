import { Body, BodyLarge } from "@/components/type-styles";
import {
  CaretLeft,
  CaretRight,
  CheckCircle,
  DotsThree,
  User,
  X,
} from "@phosphor-icons/react";
import linkedinIcon from "@/../public/assets/icons/linkedin-logo.svg";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dateToElapsed from "@/utils/date-to-elapsed";
import Contribution from "@/models/contributions";
import ProfileImage from "@/../public/assets/images/team-photos/bengeorgenetto.png";
import SocialRow from "@/components/social-row";

interface FigmaCardProps {
  contribution: Contribution;
  avatarColor: string;
}

export default function FigmaCard({
  contribution,
  avatarColor,
}: FigmaCardProps) {
  let [elapsedTime, setElapsedTime] = useState<string>("");
  useEffect(() => {
    setElapsedTime(dateToElapsed(contribution.time));
  }, [contribution.time]);
  return (
    <div className="bg-surfacePrimary border-solid border-[1px] border-borderPrimary w-1fr rounded-lg p-6 flex flex-col gap-4 overflow-hidden">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <CaretLeft
            className="text-onBackgroundTertiary"
            width={20}
            height={20}
          ></CaretLeft>
          <CaretRight width={20} height={20}></CaretRight>
        </div>
        <div className="flex gap-2">
          <DotsThree
            className="text-onBackgroundTertiary"
            width={24}
            height={24}
          ></DotsThree>
          <CheckCircle
            className="text-onBackgroundTertiary"
            width={24}
            height={24}
          ></CheckCircle>
          <X className="text-onBackgroundTertiary" width={24} height={24}></X>
        </div>
      </div>
      <div className="h-[1px] w-full bg-borderPrimary"> </div>
      <div className="flex flex-col gap-8 justify-between h-full">
        <div className="flex gap-3">
          <div
            className={
              "bg-" +
              avatarColor +
              " h-10 w-10 rounded-full grow-0 shrink-0 overflow-hidden"
            }
          >
            <Image src={ProfileImage} alt="" width={40} height={40}></Image>
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap gap-y-0">
                <BodyLarge className="!text-[18px] lg:!text-[20px] !font-medium">
                  {contribution.contributor.name}
                </BodyLarge>
                <Body className="text-onBackgroundTertiary">{elapsedTime}</Body>
              </div>
              <div className="changes">
                <ul className="ml-2">
                  {contribution.changes.map((change, index) => (
                    <li key={index} className="list-['-_']">
                      <Body className="text-onBackgroundSecondary">
                        {change}
                      </Body>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <SocialRow socials={contribution.contributor.socials}></SocialRow>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div
            className={
              "bg-" +
              avatarColor +
              " h-10 w-10 rounded-full grow-0 shrink-0 overflow-hidden flex justify-center items-center"
            }
          >
            <User
              weight="fill"
              className="text-black opacity-20"
              width={24}
              height={24}
            ></User>
            {/* <Image src={BenGeorgeNetto} alt="" width={40} height={40}></Image> */}
          </div>
          <div className="px-4 py-3 bg-backgroundNeutralPrimary rounded-lg w-full text-onBackgroundTertiary select-none">
            Reply
          </div>
        </div>
      </div>
    </div>
  );
}
