"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import banner from "@/../../public/assets/images/image 3.png";
import {
  ShareNetwork,
  CalendarBlank,
  MapPin,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { Body, Heading3, Title } from "@/components/type-styles";
import SkillsCard from "./components/skill-card";
import MentorCard from "./components/mentor-card";
import Loading from "@/app/loading";
import EventCarousel from "./components/event-carousel";
import { CarouselItem } from "@/components/ui/carousel";
import SponsorCard from "./components/sponsor-card";
import EventCard from "./components/event-gallery";
import TestimonialCard from "./components/testimonial-card";
import Button from "@/components/Button";

function Event() {
  const [mounted, setMounted] = useState(false);

  const gridStyle = "grid gap-3 grid-cols-1 md:grid-cols-2";
  const carouselItems = "sm:basis-1/2 lg:basis-1/3 xl:basis-1/4";
  const newSection = "flex flex-col gap-2 mt-12";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loading />;
  return (
    <div className="h-full w-full bg-backgroundPrimary">
      <section
        id="Event_banner"
        className="relative overflow-hidden flex p-16 items-center justify-center"
      >
        <Image
          src={banner}
          alt={""}
          className="w-[200px] h-[200px] object-cover rounded-xl z-[1]"
        />
        <Image
          src={banner}
          alt={""}
          className="absolute w-full h-full object-fill blur-3xl"
        />
      </section>

      <section
        id="Event_Details"
        className="max-w-full md:max-w-[780px] mx-auto mt-8 p-2 md:p-0"
      >
        <div className="w-full flex flex-col items-center gap-7 ">
          <div className="flex justify-center gap-2">
            <Body>Featured in</Body>
            <Badge className="bg-backgroundEmPrimary font-normal hover:bg-onBackgroundEmPrimary text-onBackgroundPrimary">
              Design
            </Badge>
          </div>
          <Title>UXTopia: Design Week</Title>
          <div className=" w-11/12 flex justify-between flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-onBackgroundInverseSecondary text-onBackgroundInversePrimary rounded-xl p-2 ">
                <CalendarBlank size={32} weight="fill" />
              </div>
              <div>
                <p className="font-semibold">Monday, 12th Jan</p>
                <Body>10:00 AM-Apr 16, 8:00 PM GMT+4</Body>
              </div>
            </div>
            <div className="flex items-center gap-3 ">
              <div className="bg-onBackgroundInverseSecondary text-onBackgroundInversePrimary rounded-lg p-2 ">
                <MapPin size={32} weight="fill" />
              </div>
              <div>
                <p className="flex items-center gap-1 font-semibold">
                  XYZ Room, MBCET <ArrowUpRight />
                </p>
                <Body>Thiruvananthapuram</Body>
              </div>
            </div>
          </div>
          <div className="w-full p-2 md:p-8 bg-backgroundSecondary border-solid border-[1px] border-borderPrimary rounded-lg">
            <h3 className="text-lg font-bold">Registration</h3>
            <Body>Welcome! To the event, please register below</Body>
            <div className="mt-6 flex justify-between gap-3 ">
              <div className="grow-[9]">
                <Button className=" w-full p-5">RegisterNow</Button>
              </div>
              <div className="grow-[1]">
                <Button
                  className=" w-full p-5 hover:text-onBackgroundEmPrimary"
                  variant="secondary"
                >
                  <ShareNetwork size={32} className="" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className={newSection}>
          <Heading3>About the event</Heading3>
          <Body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            eaque ut omnis fuga, corporis, officiis repellat porro velit quo
            facilis sunt nihil cum voluptates minima debitis possimus!
            Provident, modi perferendis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Facere, eaque ut omnis fuga, corporis, officiis
            repellat porro velit quo facilis sunt nihil cum voluptates minima
            debitis possimus! Provident, modi perferendis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Facere, eaque ut omnis fuga,
            corporis, officiis repellat porro velit quo facilis sunt nihil cum
            voluptates minima debitis possimus! Provident, modi perferendis.
          </Body>
        </div>

        <div className={newSection}>
          <Heading3>Skills Gained</Heading3>
          <div className={gridStyle}>
            <SkillsCard />
            <SkillsCard />
            <SkillsCard />
          </div>
        </div>

        <div className={newSection}>
          <Heading3>Prerequisites</Heading3>
          <div className={gridStyle}>
            <SkillsCard />
            <SkillsCard />
            <SkillsCard />
          </div>
        </div>

        <div className={newSection}>
          <Heading3>Mentors</Heading3>
          <div className={gridStyle}>
            <MentorCard />
            <MentorCard />
            <MentorCard />
          </div>
        </div>
      </section>

      <section className="p-2 md:p-0 max-w-[calc(780px+(100%-780px)/2)] ml-auto flex flex-col gap-12 my-12">
        <EventCarousel title="Sponsors">
          <CarouselItem className={carouselItems}>
            <SponsorCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <SponsorCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <SponsorCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <SponsorCard />
          </CarouselItem>
        </EventCarousel>

        <EventCarousel title="Gallery">
          <CarouselItem className={carouselItems}>
            <EventCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <EventCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <EventCard />
          </CarouselItem>
        </EventCarousel>

        <EventCarousel title="Testimonials">
          <CarouselItem className={carouselItems}>
            <TestimonialCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <TestimonialCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <TestimonialCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <TestimonialCard />
          </CarouselItem>
          <CarouselItem className={carouselItems}>
            <TestimonialCard />
          </CarouselItem>
        </EventCarousel>
      </section>
    </div>
  );
}

export default Event;
