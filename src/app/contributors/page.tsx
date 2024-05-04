"use client";

import {
  Body,
  BodyLarge,
  BodySmall,
  Heading1,
  Title,
} from "@/components/type-styles";
import React, { useEffect, useState } from "react";
import FigmaCard from "./components/figma-card";
import GithubCard from "./components/github-card";
import { contributions } from "@/data/contributors";
import GitHubLogo from "@/../public/assets/icons/github-logo.svg";
import CloudBottomImage from "@/../public/assets/images/clouds-bottom.png";
import CloudBottomImageDark from "@/../public/assets/images/clouds-bottom-dark.png";
import FigmaFrameLight from "@/../public/assets/images/figma-frame-light.png";
import FigmaFrameDark from "@/../public/assets/images/figma-frame-dark.png";
import {
  FigmaLogo,
  CaretDown,
  GitFork,
  GitBranch,
} from "@phosphor-icons/react";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Loading from "../loading";

export default function Contributors() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loading />;

  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden border-b border-borderPrimary">
      <div className="relative bg-backgroundEmPrimary bg-center	bg-no-repeat bg-cover grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-6 md:gap-y-12 px-6 py-6 md:py-[84px] !pb-0 min-h-[50vh] justify-center">
        <div className=" text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8 items-center justify-center">
          <div className="flex flex-col gap-4 items-center">
            <Body className="text-onBackgroundSecondary w-full">
              The Community Project
            </Body>
            <Title className="w-full md:w-[75%] lg:w-[75%]">
              We’re truly built by our community.
            </Title>
          </div>
          <BodyLarge className="text-onBackgroundSecondary w-full md:w-[75%] lg:w-[50%]">
            Meet the community at GDSC MBCET who spent countless hours fleshing
            out this website
          </BodyLarge>
        </div>
        <div className=" text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8 items-center justify-center">
          {resolvedTheme == "light" && (
            <Image
              className="w-full max-w-[100vw]"
              src={FigmaFrameLight}
              alt=""
            ></Image>
          )}
          {resolvedTheme == "dark" && (
            <Image
              className="w-full max-w-[100vw]"
              src={FigmaFrameDark}
              alt=""
            ></Image>
          )}
        </div>

        {resolvedTheme == "light" && (
          <Image
            className="w-lvw max-w-[100vw] absolute bottom-0 left-0 right-0"
            src={CloudBottomImage}
            alt=""
          ></Image>
        )}
        {resolvedTheme == "dark" && (
          <Image
            className="w-lvw max-w-[100vw] absolute bottom-0 left-0 right-0"
            src={CloudBottomImageDark}
            alt=""
          ></Image>
        )}
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-6 md:py-[84px]">
        <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <Heading1>The Architects</Heading1>
            <Body>
              GDSC MBCET brings together ordinary humans with the extraordinary
              ability to chase their dreams.
            </Body>
          </div>
          <div className="w-full bg-backgroundSecondary rounded-lg overflow-hidden">
            <div className="flex bg-backgroundInversePrimary w-100 p-3 justify-between items-center gap-2">
              <div className="shrink-0 flex justify-center items-center gap-1">
                <FigmaLogo
                  className="text-backgroundPrimary"
                  width={20}
                  height={20}
                ></FigmaLogo>
                <CaretDown
                  height={8}
                  width={8}
                  className="text-backgroundPrimary"
                ></CaretDown>
              </div>

              <BodySmall className="text-center">
                <span className="text-onBackgroundInverseSecondary">
                  GDSC MBCET Community Project/
                </span>
                <span className="text-onBackgroundInversePrimary">
                  Website 3.0
                </span>
              </BodySmall>
              <div className="h-5 w-5 rounded-lg shrink-0"></div>
            </div>
            <div className=" p-4 md:p-8 lg:p-[64px] grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {contributions
                .filter((contribution) => contribution.type === "design")
                .map((contribution, index) => (
                  <FigmaCard
                    key={index}
                    contribution={contribution}
                    avatarColor={avatarColors[index % avatarColors.length]}
                  ></FigmaCard>
                ))}
            </div>
          </div>
        </div>
        <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <Heading1>The Builders</Heading1>
            <Body>
              GDSC MBCET brings together ordinary humans with the extraordinary
              ability to chase their dreams.
            </Body>
          </div>
          <div className="w-full bg-backgroundSecondary rounded-lg overflow-hidden">
            <div className="flex bg-backgroundInversePrimary w-100 flex-col lg:flex-row items-center">
              <div className="shrink-0 flex justify-center items-center gap-1 p-3 border-solid border-b-[1px] w-full lg:w-auto lg:border-b-0 border-slate-600">
                <GitHubLogo className="text-onBackgroundInversePrimary"></GitHubLogo>
              </div>
              <div className="flex w-full border-solid  border-slate-600 border-b-[1px] border-l-0 lg:border-l-[1px] lg:border-b-0 flex-col md:flex-row">
                <div className="flex py-3 px-6 gap-2 justify-between w-full border-solid border-r-0 border-b-[1px] md:border-r-[1px] md:border-b-0 border-slate-600 items-center">
                  <div className="flex gap-2">
                    <GitFork
                      height={16}
                      width={16}
                      className="text-onBackgroundInversePrimary"
                    ></GitFork>
                    <div className="flex flex-col">
                      <BodySmall className="text-onBackgroundInverseSecondary">
                        Current Repository
                      </BodySmall>
                      <BodySmall className="text-onBackgroundInversePrimary">
                        gdsc-website-3.0
                      </BodySmall>
                    </div>
                  </div>
                  <CaretDown
                    height={8}
                    width={8}
                    className="text-white"
                  ></CaretDown>
                </div>
                <div className="flex py-3 px-6 gap-2 justify-between w-full border-solid border-r-[1px] border-slate-600 items-center">
                  <div className="flex gap-2">
                    <GitBranch
                      height={16}
                      width={16}
                      className="text-onBackgroundInversePrimary"
                    ></GitBranch>
                    <div className="flex flex-col">
                      <BodySmall className="text-onBackgroundInverseSecondary">
                        Current Repository
                      </BodySmall>
                      <BodySmall className="text-onBackgroundInversePrimary">
                        gdsc-website-3.0
                      </BodySmall>
                    </div>
                  </div>
                  <CaretDown
                    height={8}
                    width={8}
                    className="text-white"
                  ></CaretDown>
                </div>
              </div>

              <div className="flex py-3 px-6 gap-2 w-full gap-2">
                <RefreshCw
                  height={16}
                  width={16}
                  className="text-onBackgroundInversePrimary"
                ></RefreshCw>
                <div className="flex flex-col">
                  <BodySmall className="text-onBackgroundInversePrimary">
                    Fetch Origin
                  </BodySmall>
                  <BodySmall className="text-onBackgroundInverseSecondary">
                    Last fetched 1 minute ago
                  </BodySmall>
                </div>
              </div>
            </div>
            <div className=" p-4 md:p-8 lg:p-[64px] grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {contributions
                .filter((contribution) => contribution.type === "code")
                .map((contribution, index) => (
                  <GithubCard
                    key={index}
                    contribution={contribution}
                    avatarColor={avatarColors[index % avatarColors.length]}
                  ></GithubCard>
                ))}
            </div>
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
