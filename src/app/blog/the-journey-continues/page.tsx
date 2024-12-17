"use client";

import React, { useEffect, useState } from "react";
import {
  Body,
  BodyLarge,
  BodySmall,
  Heading1,
  Heading3,
  Title,
} from "@/components/type-styles";
import Button from "@/components/Button";
import GridCard from "@/components//GridCard";
import Image from "next/image";
import EventGallery from "@/components/EventGallery";
import { useTheme } from "next-themes";
import Loading from "../../loading";

function BlogPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Loading />;

  return (
    <div className="bg-backgroundSecondary grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-12 md:py-[84px]">
      <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 gap-16 grid grid-cols-subgrid">
        <div className="col-start-1 md:col-start-1 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4">
              <Heading3 className="text-onBackgroundSecondary w-full">
                Announcements
              </Heading3>
              <Title className="w-full">
                The Journey Continues:<br></br>A Closure to GDSC MBCET{" "}
              </Title>
            </div>

            <BodyLarge className="text-onBackgroundSecondary">
              An official testament that we are no longer <br></br> functioning
              as an active entity
            </BodyLarge>
          </div>
          <div className="text-onBackgroundTertiary flex gap-2 items-center">
            <Body>By Riya P Mathew (GDSC Lead, 21-22)</Body>
            <div className="bg-onBackgroundTertiary w-1 h-1 rounded-lg"></div>
            <Body>Published December 19, 2024</Body>
          </div>
        </div>
        <div className="col-start-1 md:col-start-1 col-end-5 md:col-end-8 lg:col-end-12 bg-backgroundPrimary border border-borderPrimary w-full aspect-video rounded-md"></div>
        <div className="col-start-1 md:col-start-1  lg:col-start-3 col-end-5 md:col-end-8 lg:col-end-9 flex flex-col gap-16 text-balance">
          <BodyLarge>
            {`As the saying goes, all beautiful journeys must come to an end.
            After five remarkable years, GDSC MBCET draws to a close in 2024.
            This transition comes as Google Developer Community reimagines its
            campus presence, shifting from the Google Developer Student Clubs to
            the new GDG on-campus Ambassadors program.`}
          </BodyLarge>
          <BodyLarge>
            {`While an ambassador wasn’t selected from MBCET this year, this is
            far more due to an institutional change. It's a testament to the
            evolving landscape of student communities and the natural ebb and
            flow of campus life. Over the years, we witnessed the emergence of
            diverse technical communities. . In a way, this diversity itself
            speaks to our success – we helped cultivate an environment where
            multiple communities could thrive and serve different student needs`}
          </BodyLarge>
          <BodyLarge>
            Looking back, we recognise the challenges that contributed to our
            gradual transition. The demanding balance between academics and
            extracurriculars, the natural evolution of student interests, and
            the changing dynamics of campus life all played their part.
          </BodyLarge>
          <div className="flex flex-col gap-4">
            <BodyLarge>
              {` But this isn't a goodbye – it's a transformation.`}
            </BodyLarge>
            <div className="bg-backgroundPrimary border border-borderPrimary w-full aspect-video rounded-md"></div>
          </div>
          <BodyLarge>
            The true value of GDSC MBCET lives on in the countless students who
            found their passion for technology within our community. It
            continues through the friendships and the professional networks
            built through our events. Though our official chapter closes, our
            legacy endures through the alumni , and through the spirit of
            community we cultivated at MBCET.
          </BodyLarge>
          <BodyLarge>
            {`This may be the end of a chapter, but the story of GDSC MBCET
            continues through each member who carries forward the values of
            learning, sharing, and growing together. Here's to the beautiful
            chapters yet to be written, and to all those who will write them.`}
          </BodyLarge>
          <BodyLarge>The journey continues...</BodyLarge>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
