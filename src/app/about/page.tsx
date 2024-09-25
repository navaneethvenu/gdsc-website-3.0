"use client";

import {
  Body,
  BodyLarge,
  Heading1,
  Heading2,
  Heading3,
  Title,
} from "@/components/type-styles";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TeamCard from "./components/team-card";
import { tenureList } from "@/data/team-members";
import CloudBottomImage from "@/../public/assets/images/clouds-bottom.png";
import CloudBottomImageDark from "@/../public/assets/images/clouds-bottom-dark.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import teamMember from "@/models/team-members";
import { ArrowUpRight, MoreVertical } from "lucide-react";

const transformTenureTitle = (shortTitle: string): string => {
  const [start, end] = shortTitle.split("-");
  const startYear = parseInt(start) < 50 ? `20${start}` : `19${start}`;
  const endYear = parseInt(end) < 50 ? `20${end}` : `19${end}`;
  return `Tenure ${startYear.substring(2, 4)}-${endYear.substring(2, 4)}`;
};

export default function About() {
  const { systemTheme, theme } = useTheme();
  const resultantTheme = theme === "system" ? systemTheme : theme;
  const [isMobileView, setIsMobileView] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    setMounted(true);

    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);

  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden border-b border-borderPrimary">
      <div className="relative bg-backgroundEmPrimary bg-center bg-no-repeat bg-cover pt-8 pb-32 md:pb-40 min-h-[50vh] flex flex-col justify-center overflow-hidden">
        <div className="text-center flex flex-col gap-8 items-center justify-center p-6 lg:p-16">
          <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
            <Heading3 className="text-onBackgroundSecondary w-full">
              Who we are
            </Heading3>
            <Title className="w-full">
              Since our inception in 2019, we&apos;ve been helping students keep
              their heads in the clouds ... while having their feet on the
              ground.
            </Title>
          </div>
        </div>
        {mounted && (
          <div className="absolute bottom-0 left-0 right-0 w-full">
            <Image
              className="w-full h-auto object-cover object-top"
              src={
                resultantTheme === "light"
                  ? CloudBottomImage
                  : CloudBottomImageDark
              }
              alt={`${
                resultantTheme === "light" ? "Light" : "Dark"
              } theme cloud image`}
              layout="responsive"
              width={1920}
              height={200}
            />
          </div>
        )}
      </div>

      {/* About */}
      <div className="bg-backgroundPrimary grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-12 md:py-[84px] -mt-24 lg:-mt-48">
        <div className="z-[2] col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-16">
          <div className="flex flex-col text-left gap-5 lg:flex-row">
            <div className="bg-backgroundSecondary flex flex-col gap-6 items-left rounded-lg py-12 px-8 md:py-16 md:px-12 h-fit">
              <Heading2 className="text-onBackgroundPrimary w-full">
                About Google Developer Student Clubs
              </Heading2>
              <BodyLarge className="w-full text-onBackgroundSecondary">
                Google collaborates with university students who are passionate
                about growing developer communities. Google Developer Student
                Club powered by Google Developers is an initiative to grow their
                knowledge on developer technologies and more through peer to
                peer workshops and events, and gain relevant industry
                experience.
                <br />
                <br />
                <a
                  className="text-onBackgroundPrimary underline underline-offset-4 "
                  href="https://developers.google.com/programs/dsc/"
                >
                  <span className="flex flex-nowrap ">
                    <span>Learn more about the Programme</span>
                    <span>
                      <ArrowUpRight />
                    </span>
                  </span>
                </a>
              </BodyLarge>
            </div>
            <div className="bg-backgroundEmSecondary flex flex-col gap-6 items-left rounded-lg py-12 px-8 md:py-16 md:px-12 h-fit">
              <Heading2 className="text-onBackgroundPrimary w-full">
                About GDSC MBCET
              </Heading2>
              <BodyLarge className="w-full text-onBackgroundSecondary">
                GDSC MBCET&rsquo;s legacy is one of bold thinking, creative
                excellence, and profound impact. Our members are creative
                powerhouses who have made groundbreaking contributions to our
                community and the way it runs.
                <br />
                <br />
                We believe in fostering a diverse skillset – from technical
                prowess, event organization and marketing to communication,
                collaboration and knowledge sharing. Each day, we create a
                collaborative environment where our community, equipped with
                these tools, can learn, empower others to learn, and ultimately
                leverage their talents to become change-makers in the world.
                <br />
                <br />
                This spirit of innovation and collaboration has guided us since
                2019, and we&rsquo;re excited to see where it takes us in the
                years and decades to come.
              </BodyLarge>
            </div>
          </div>
        </div>
      </div>

      {/* Our Incredible Team  */}
      <div className="bg-backgroundPrimary grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-12 md:py-[84px]">
        <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-16">
          <div className="flex flex-col items-start gap-6 text-center">
            <div className="flex flex-col gap-4">
              <Heading1 className="text-left">Our Incredible Team</Heading1>

              <BodyLarge className="lg:w-2/4 text-left text-onBackgroundSecondary">
                GDSC MBCET brings together ordinary humans with the
                extraordinary ability to chase their dreams.
              </BodyLarge>
            </div>

            <div className="w-full overflow-hidden">
              <OverflowingTabs
                tabs={Object.keys(tenureList)}
                tabLimit={isMobileView ? 2 : 5}
                tabContent={(currentTab) => {
                  const data = tenureList[currentTab];

                  return (
                    <TenureEntry
                      title={currentTab}
                      description={data.description}
                      members={data.teamMembers}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface OverflowingTabsProps {
  tabs: string[];
  tabLimit?: number;
  tabContent: (currentTab: string) => JSX.Element;
}

function getRange(max: number, limit: number, testValue: number): number[] {
  // Calculate the starting point of the range
  const start = Math.max(0, Math.min(testValue, max - limit));
  console.log([max, limit, testValue, start].join("-"));

  // Create an array with the result of length 'limit'
  return Array.from({ length: limit + 1 }, (_, i) => start + i);
}

function OverflowingTabs({ tabs, tabLimit, tabContent }: OverflowingTabsProps) {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const currentTabLimit = useMemo(() => tabLimit ?? 5, [tabLimit]);

  const tabsInTabBar = useMemo(() => {
    const indexRange = getRange(
      tabs.length,
      currentTabLimit,
      tabs.indexOf(currentTab)
    );
    console.log(indexRange);
    return tabs.slice(indexRange[0], indexRange[indexRange.length - 1]);
  }, [tabs, currentTabLimit, currentTab]);

  const overflowTabs = useMemo(
    () => tabs.slice(currentTabLimit),
    [tabs, currentTabLimit]
  );

  return (
    <div>
      <div className="flex justify-end items-end">
        <ul className="flex gap-x-2 pr-8">
          {tabsInTabBar.map((tab, tabIndex) => (
            <ol
              className={
                tab !== currentTab
                  ? "px-5 py-2 rounded-t-md shadow-[inset_0_1px_0px_0px,inset_1px_0_0px_0px,inset_-1px_0_0px_0px] shadow-borderPrimary"
                  : "px-5 py-2 rounded-t-md bg-backgroundSecondary"
              }
              key={tabIndex}
            >
              <button onClick={() => setCurrentTab(tab)}>{tab}</button>
            </ol>
          ))}
          {overflowTabs.length === 0 ? (
            <></>
          ) : (
            <Popover>
              <PopoverTrigger>
                <ol className="group px-5 py-3 rounded-t-md border-t border-x border-borderPrimary flex items-center focus-within:border-onBackgroundPrimary">
                  <button
                    className="focus:outline-none"
                    aria-label="More options"
                  >
                    <MoreVertical
                      height={16}
                      width={16}
                      className="fill-onBackgroundPrimary group-focus-within:fill-onBackgroundEmPrimary"
                    ></MoreVertical>
                  </button>
                </ol>
              </PopoverTrigger>
              <PopoverContent className="p-1 bg-backgroundPrimary border-borderPrimary">
                <ul>
                  {tabs.map((e, i) => (
                    <ol key={i}>
                      <button
                        className={`
                                    w-full text-left p-2
                                    transition-all duration-200
                                    ${
                                      e == currentTab
                                        ? "bg-backgroundEmPrimary text-onBackgroundPrimary"
                                        : "hover:bg-backgroundSecondary hover:text-onBackgroundPrimary"
                                    }
                                    focus:outline-none focus:border-1 focus:border-onBackgroundPrimary
                                  `}
                        onClick={() => setCurrentTab(e)}
                      >
                        {e}
                      </button>
                    </ol>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          )}
        </ul>
      </div>
      <div className="bg-backgroundPrimary">{tabContent(currentTab)}</div>
    </div>
  );
}

interface TenureEntryProps {
  title: string;
  description: string;
  members: teamMember[];
}

function TenureEntry({ title, description, members }: TenureEntryProps) {
  const transformedTitle = transformTenureTitle(title);

  return (
    <div className="bg-backgroundSecondary rounded-lg">
      <div className="p-4 md:p-8 lg:p-[64px] !py-[64px] flex flex-col text-left items-start gap-5 text-onBackgroundSecondary  grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Heading2>{transformedTitle}</Heading2>
        <BodyLarge className="text-onBackgroundSecondary">
          {description}
        </BodyLarge>
      </div>

      <div className=" p-4 md:p-8 lg:p-[64px] !pt-0 grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {Object.entries(members).map(([key, teammember]) => (
          <TeamCard key={key} teammember={teammember} />
        ))}
      </div>
    </div>
  );
}
