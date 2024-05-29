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
} from "@/components/ui/popover"
import TeamCard from "./components/team-card";
import { tenureList } from "@/data/team-members";
import CloudBottomImage from "@/../public/assets/images/clouds-bottom.png";
import CloudBottomImageDark from "@/../public/assets/images/clouds-bottom-dark.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import teamMember from "@/models/team-members";

export default function About() {
  const { systemTheme, theme } = useTheme();
  const resultantTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden border-b border-borderPrimary">
      <div className="relative bg-backgroundEmPrimary bg-center bg-no-repeat bg-cover pt-8 !pb-20 min-h-[50vh] justify-center overflow-hidden">
        <div className="text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8 items-center justify-center p-6 lg:p-16">
          <div className="flex flex-col gap-6 items-center">
            <Heading3 className="text-onBackgroundSecondary w-full">
              Who we are
            </Heading3>
            <Title className="w-full md:w-[75%] lg:w-[75%]">
              Since our inception in 2019, we’ve been helping students keep
              their heads in the clouds ... while having their feet on the
              ground.
            </Title>
          </div>
        </div>
        {typeof window !== "undefined" && resultantTheme === "light" && (
          <Image
            className="w-lvw max-w-[100vw] absolute bottom-[-75px] left-0 right-0"
            src={CloudBottomImage}
            alt="Light theme cloud image"
            layout="fill"
          />
        )}
        {typeof window !== "undefined" && resultantTheme === "dark" && (
          <Image
            className="w-lvw max-w-[100vw] absolute bottom-[-75px] left-0 right-0"
            src={CloudBottomImageDark}
            alt="Dark theme cloud image"
            layout="fill"
          />
        )}
      </div>

      <div className="relative bg-center bg-no-repeat bg-cover p-10 lg:p-32 !pb-0 min-h-[50vh] justify-center">
        <div className="text-center flex flex-col gap-8 items-center justify-center -mt-28 lg:-mt-48">
          <div className="flex flex-col text-left gap-12 lg:flex-row lg:gap-16">
            <div className="bg-backgroundSecondary flex flex-col gap-4 items-left p-8 h-fit lg:p-20">
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
                  href="/"
                >
                  Learn more about the Programme.
                </a>
              </BodyLarge>
            </div>
            <div className="bg-backgroundEmSecondary flex flex-col gap-4 items-left p-8 h-fit lg:p-20">
              <Heading2 className="text-onBackgroundPrimary w-full">
                About GDSC MBCET
              </Heading2>
              <BodyLarge className="w-full text-onBackgroundSecondary">
                GDSC MBCET’s legacy is one of bold thinking, creative
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
                2019, and we’re excited to see where it takes us in the years
                and decades to come.
              </BodyLarge>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-center bg-no-repeat bg-cover p-10 gap-4 lg:p-32 !pb-0 min-h-[50vh] justify-center">
        <div className="flex flex-col gap-4 pb-12">
          <Heading1>Our Incredible Team</Heading1>

          <BodyLarge className="lg:w-2/4">
            GDSC MBCET brings together ordinary humans with the extraordinary
            ability to chase their dreams.
          </BodyLarge>
        </div>

        <div className="bg-backgroundSecondary p-4 rounded-lg">
          <OverflowingTabs
              tabs={Object.keys(tenureList)}
              tabLimit={5}
              tabContent={(currentTab) => {
                const data = tenureList[currentTab]

                return (
                  <TenureEntry title={currentTab} description={data.description} members={data.teamMembers} />
                )
              }}
          />
        </div>
      </div>
    </div>
  );
}

interface OverflowingTabsProps {
  tabs: string[],
  tabLimit?: number,
  tabContent: (currentTab: string) => JSX.Element
}

function OverflowingTabs({ tabs, tabLimit, tabContent }: OverflowingTabsProps) {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  const currentTabLimit = useMemo(() => tabLimit ?? 5, [tabLimit])
  
  const tabsInTabBar = useMemo(() => tabs.slice(0, currentTabLimit), [tabs, currentTabLimit])
  const overflowTabs = useMemo(() => tabs.slice(currentTabLimit), [tabs, currentTabLimit])

  return (
    <div>
      <div className="flex justify-end items-end">
        <ul className="flex gap-x-5">
          {tabsInTabBar.map((el, i) => (
            <ol 
              className={
                el !== currentTab
                  ? "px-5 py-1 rounded-t-md border-t border-x"
                  : "px-5 py-1 rounded-t-md bg-[#fafafa] border-none"
              }
              key={i}
            >
              <button onClick={() => setCurrentTab(el)}>{ el }</button>
            </ol>
          ))}
          {
            overflowTabs.length === 0
              ? (<></>)
              : (
                <Popover>
                  <PopoverTrigger>
                    <ol className="px-5 py-1 rounded-t-md border-t border-x flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M8.00008 2.5C7.26675 2.5 6.66675 3.1 6.66675 3.83333C6.66675 4.56667 7.26675 5.16667 8.00008 5.16667C8.73341 5.16667 9.33341 4.56667 9.33341 3.83333C9.33341 3.1 8.73341 2.5 8.00008 2.5ZM8.00008 11.8333C7.26675 11.8333 6.66675 12.4333 6.66675 13.1667C6.66675 13.9 7.26675 14.5 8.00008 14.5C8.73341 14.5 9.33341 13.9 9.33341 13.1667C9.33341 12.4333 8.73341 11.8333 8.00008 11.8333ZM8.00008 7.16667C7.26675 7.16667 6.66675 7.76667 6.66675 8.5C6.66675 9.23333 7.26675 9.83333 8.00008 9.83333C8.73341 9.83333 9.33341 9.23333 9.33341 8.5C9.33341 7.76667 8.73341 7.16667 8.00008 7.16667Z" fill="black"/>
                      </svg>
                    </ol>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ul>
                      {
                        overflowTabs.map((e, i) => (
                          <ol key={i}>
                            <button
                              className={
                                e == currentTab
                                  ? "w-full text-left p-2 bg-[#e3f2fd]"
                                  : "w-full text-left p-2"
                              }
                              onClick={() => setCurrentTab(e)}
                            >
                              {e}
                            </button>
                          </ol>
                        ))
                      }
                    </ul>
                  </PopoverContent>
                </Popover>
              )
          }
        </ul>
      </div>
      <div className="bg-[#fafafa]">
        {tabContent(currentTab)}
      </div>
    </div>
  )
}

interface TenureEntryProps {
  title: string,
  description: string,
  members: teamMember[]
}

function TenureEntry({ title, description, members }: TenureEntryProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 lg:px-32 lg:py-24">
        <Heading2>{ title }</Heading2>
        <Body>{ description }</Body>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {Object.entries(members).map(([key, teammember]) => (
            <TeamCard key={key} teammember={teammember} />
          ))}
        </div>
      </div>
    </div>
  );
}