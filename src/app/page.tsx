"use client";

import React, { useEffect, useState } from "react";
import { Body, BodyLarge, Heading1, Title } from "@/components/type-styles";
import Button from "@/components/Button";
import GridCard from "@/components//GridCard";
import Image from "next/image";
import EventGallery from "@/components/EventGallery";
import { useTheme } from "next-themes";
import Loading from "./loading";

function HomePage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loading />;

  return (
    <>
      <div className="z-0 relative flex flex-col items-center justify-center text-center my-0 bg-backgroundEmPrimary bg-contain	 bg-no-repeat	gap-16 px-6 py-12 md:py-[84px] !pb-0 min-h-[50vh]">
        <div className="z-[1] text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-6 items-center justify-center">
          <Title className="xl:max-w-[50%]">
            Let’s build cool things that matter, together
          </Title>
          <BodyLarge className="text-onBackgroundSecondary w-full md:w-[75%] lg:w-[50%]">
            We’re a student community powered by Google Developers, for all
            things developer-centric and beyond.{" "}
            <span className="text-onBackgroundEmPrimary">
              We help students keep their heads in the clouds ... while having
              their feet on the ground.
            </span>
          </BodyLarge>
        </div>
        <div className="z-[1] flex flex-col sm:flex-row items-center gap-3 relative w-full align-stretch sm:w-[360px]">
          <Button className="w-full">Become a Member</Button>
          <Button variant="secondary" className="w-full">
            View Events
          </Button>
        </div>
        <Image
          src="./images/woman-looking-up.svg"
          priority={true}
          width={0}
          height={0}
          className="w-auto min-w-[60%] h-auto z-[1]"
          alt={"woman looking up"}
        />{" "}
        {resolvedTheme == "dark" && (
          <Image
            src={"/assets/images/stars-background.svg"}
            width={0}
            height={0}
            className="absolute bottom-0 z-0 w-full h-auto animate-pulse"
            alt=""
          ></Image>
        )}
        <Image
          src={
            resolvedTheme == "light"
              ? "/images/clouds.svg"
              : "/images/clouds-dark.svg"
          }
          width={200}
          height={200}
          priority={true}
          className="absolute w-full bottom-0 z-0"
          alt={""}
        ></Image>
      </div>

      {/* Building a local ecosystem  */}
      <div className="bg-backgroundPrimary grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-12 md:py-[84px]">
        <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <Heading1>Building a local ecosystem of makers</Heading1>
            <Body className="text-onBackgroundSecondary lg:max-w-[50%]">
              We aim to bring together individuals with a shared passion of
              technology and empower them to build upon their dreams, while
              having fun doing it.
            </Body>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <GridCard
              image="mingcute:calendar-fill"
              heading="Events"
              body="We organize various events such as study jams, hackathons, and conferences to help members learn about the latest technologies"
              buttonText="Explore our events"
              backgroundColor="bg-backgroundEmPrimary"
              iconBackgroundColor="bg-onBackgroundEmPrimary"
              cardBorderColor="borderEmPrimary"
            />
            <GridCard
              image="mdi:heart"
              heading="Community and Learning"
              body="We aim to carve a niche for students in and around the campus, fostering a community that learns together, and creates together."
              buttonText="Join our community"
              backgroundColor="bg-backgroundEmSecondary"
              iconBackgroundColor="bg-onBackgroundEmSecondary"
              cardBorderColor="borderEmSecondary"
            />
            <GridCard
              image="iconamoon:box-fill"
              heading="Resources"
              body="We’re building a growing repository of useful resources across different verticals that you can use as well as contribute to."
              buttonText="View Resources"
              backgroundColor="bg-backgroundEmTertiary"
              iconBackgroundColor="bg-onBackgroundEmTertiary"
              cardBorderColor="borderEmTertiary"
            />
            <GridCard
              image="ic:round-stairs"
              heading="& Beyond"
              body="Powered by the Google Developers' family, we are a students’ club whose spirit of innovation and collaboration has guided us since 2019."
              buttonText="More about us"
              backgroundColor="bg-backgroundNeutralPrimary"
              iconBackgroundColor="bg-onBackgroundNeutralPrimary"
              variant="primary"
              cardBorderColor="borderSecondary"
            />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-12 md:py-[84px] lg:py-[84px] bg-backgroundSecondary">
        <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-4 lg:gap-16 flex flex-col-reverse lg:flex-row items-center text-center lg:text-left w-full">
          <div className="flex flex-col mx-auto w-full bg-backgroundSecondary gap-12">
            <span className=" flex flex-col gap-6">
              <Heading1>What’s happening</Heading1>
              <Body className="text-onBackgroundSecondary">
                Explore the latest events and activities from GDSC MBCET
              </Body>
            </span>
            <EventGallery />
          </div>
        </div>
      </div>

      {/* Books and education */}
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-12 pt-6 md:py-[84px] md:pt-[64px] lg:py-[84px] bg-backgroundEmSecondary">
        <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-4 lg:gap-16 flex flex-col-reverse lg:flex-row items-center text-center lg:text-left w-full justify-between mx-auto my-0">
          <div className="flex flex-col items-center lg:items-start gap-12 w-full items-start max-w-[600px]">
            <div className="flex flex-col gap-6 items-start">
              <Heading1>We believe education should be free.</Heading1>
              <Body className="text-onBackgroundSecondary">
                All the events we do at GDSC MBCET are free-of-cost. However,
                some of the bigger events that we do at scale, require some
                financial backing to help us continue that way. We’d love to
                have your support for the same, and in-turn help your brand get
                exposure within the community.
              </Body>
            </div>
            <Button
              variant="secondary"
              highlightColor="onBackgroundEmSecondary"
              className="w-full sm:w-auto"
              href="/sponsors"
            >
              Learn more
            </Button>
          </div>
          <div>
            <Image
              src={`/assets/images/books${
                resolvedTheme === "light" ? "" : "-dark"
              }.svg`}
              height={0}
              width={0}
              className="w-auto h-auto max-w-[300px] lg:max-w-[400px] xl:max-w-[600px]"
              alt="books"
            />
          </div>
        </div>
      </div>

      {/* hardest step */}
      <div>
        <Image
          src={`./images/boy-kicking-ball${
            resolvedTheme === "dark" ? "-dark" : ""
          }.svg`}
          width={0}
          height={0}
          className="w-full h-auto"
          alt={"boy kicking ball"}
        />
        <div className="z-0 relative flex flex-col items-center justify-center text-center my-0 bg-illoSurfacePrimary bg-contain	 bg-no-repeat !pt-0	gap-16 px-6 py-12 md:py-[84px]">
          <div className="z-[1] text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-6 items-center justify-center">
            <Title className="xl:max-w-[75%]">
              The hardest part is taking that first step
            </Title>
            <BodyLarge className="text-onBackgroundSecondary w-full md:w-[75%] lg:w-[50%]">
              It’s time to plant your feet on the ground and start building out
              your dreams.
            </BodyLarge>
          </div>
          <div className="z-[1] flex flex-col sm:flex-row items-center gap-3 relative w-full align-stretch sm:w-[360px]">
            <Button className="w-full">Become a Member</Button>
            <Button variant="secondary" className="w-full">
              View Events
            </Button>
          </div>
        </div>
      </div>

      {/* ps */}
      <div className="flex flex-wrap items-center text-center justify-center w-full mx-auto my-0 bg-backgroundEmPrimary p-8 gap-3">
        <Body>
          P.S. This website was made with by some cool frens who dared to take
          the first step
        </Body>
        <Button className="w-full sm:w-auto" variant="secondary">
          Learn more
        </Button>
      </div>
    </>
  );
}

export default HomePage;
