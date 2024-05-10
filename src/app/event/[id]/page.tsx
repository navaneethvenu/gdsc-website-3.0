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
import {
  Body,
  BodySmall,
  Heading3,
  Heading4,
  Heading5,
  Title,
} from "@/components/type-styles";
import SkillsCard from "./components/skill-card";
import MentorCard from "./components/mentor-card";
import Loading from "@/app/loading";
import EventCarousel from "./components/event-carousel";
import SponsorCard from "./components/sponsor-card";
import EventCard from "./components/event-gallery";
import TestimonialCard from "./components/testimonial-card";
import Button from "@/components/Button";

function Event() {
  const [mounted, setMounted] = useState(false);
  const newSection = "flex flex-col gap-4";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loading />;
  return (
    <div>
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
      <div className="h-full w-full bg-backgroundSecondary grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-6 md:py-[84px]">
        <section
          id="Event_Details"
          className="col-start-1 md:col-start-2 lg:col-start-3 xl:col-start-4 col-end-5 md:col-end-8 lg:col-end-11 xl:col-end-10 flex flex-col gap-16"
        >
          <div className="w-full flex flex-col items-center gap-8 ">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center gap-2">
                <Body className="text-onBackgroundSecondary">Featured in</Body>
                <Badge className="bg-backgroundEmPrimary hover:bg-onBackgroundEmPrimary hover:text-onBackgroundInversePrimary text-onBackgroundPrimary">
                  <BodySmall>Design</BodySmall>
                </Badge>
              </div>
              <Title>UXTopia: Design Week</Title>
            </div>

            <div className=" w-full flex justify-between flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 p-4 bg-surfacePrimary border border-borderPrimary rounded-lg w-full">
                <div className="bg-backgroundInversePrimary text-onBackgroundInversePrimary rounded-lg h-12 aspect-square flex items-center justify-center">
                  <CalendarBlank size={24} weight="fill" />
                </div>
                <div>
                  <Heading5>Monday, 12th Jan</Heading5>
                  <Body>10:00 AM-Apr 16, 8:00 PM GMT+4</Body>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-surfacePrimary border border-borderPrimary rounded-lg w-full">
                <div className="bg-backgroundInversePrimary text-onBackgroundInversePrimary rounded-lg h-12 aspect-square flex items-center justify-center">
                  <MapPin size={24} weight="fill" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Heading5>XYZ Room, MBCET</Heading5>{" "}
                    <ArrowUpRight size={16} />
                  </div>
                  <Body>Thiruvananthapuram</Body>
                </div>
              </div>
            </div>
            <div className="w-full p-8 bg-surfacePrimary border-solid border-[1px] border-borderPrimary rounded-lg">
              <Heading4>Registration</Heading4>
              <Body className="text-onBackgroundSecondary">
                Welcome! To the event, please register below
              </Body>
              <div className="mt-6 flex justify-between gap-2 ">
                <Button className=" w-full p-5">Register Now</Button>
                <Button
                  className="p-5 hover:text-onBackgroundEmPrimary"
                  variant="secondary"
                >
                  <ShareNetwork size={16} weight="fill" />
                </Button>
              </div>
            </div>
          </div>

          <div className={newSection}>
            <Heading3>About the event</Heading3>
            <Body className="text-onBackgroundSecondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
              eaque ut omnis fuga, corporis, officiis repellat porro velit quo
              facilis sunt nihil cum voluptates minima debitis possimus!
              Provident, modi perferendis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Facere, eaque ut omnis fuga,
              corporis, officiis repellat porro velit quo facilis sunt nihil cum
              voluptates minima debitis possimus! Provident, modi perferendis.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
              eaque ut omnis fuga, corporis, officiis repellat porro velit quo
              facilis sunt nihil cum voluptates minima debitis possimus!
              Provident, modi perferendis.
            </Body>
          </div>

          <div className={newSection}>
            <EventCarousel title="Skills Gained">
              {[1, 2].map((skill, index) => (
                <SkillsCard key={index} />
              ))}
            </EventCarousel>
          </div>

          <div className={newSection}>
            <EventCarousel title="Prerequisites">
              {[1, 2, 3, 4].map((skill, index) => (
                <SkillsCard key={index} />
              ))}
            </EventCarousel>
          </div>

          <div className={newSection}>
            <EventCarousel title="Mentors" limit={{ xl: 2 }}>
              {[1, 2, 3, 4].map((skill, index) => (
                <MentorCard key={index} />
              ))}
            </EventCarousel>
          </div>

          <div className={newSection}>
            <EventCarousel title="Sponsors">
              {[1, 2, 3, 4].map((skill, index) => (
                <SponsorCard key={index} />
              ))}
            </EventCarousel>
          </div>

          <div className={newSection}>
            <EventCarousel title="Gallery">
              {[1, 2, 3, 4, 5, 6].map((skill, index) => (
                <EventCard key={index} />
              ))}
            </EventCarousel>
          </div>

          <div className={newSection}>
            <EventCarousel title="Testimonials" limit={{ xl: 2 }}>
              {[1, 2, 3, 4].map((skill, index) => (
                <TestimonialCard key={index} />
              ))}
            </EventCarousel>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Event;
