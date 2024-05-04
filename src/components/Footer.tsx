"use client";

import React from "react";
import Image from "next/image";
import { Body, BodySmall, Heading3 } from "./type-styles";
import SocialRow from "@/app/contributors/components/social-row";

import Link from "next/link";
import { useTheme } from "next-themes";

const Footer = () => {
  const {resolvedTheme} = useTheme();

  return (
    <div className="flex flex-col bg-backgroundPrimary">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-[84px] px-6 py-12 md:py-[84px] lg:py-[84px] bg-backgroundPrimary">
        <div className="col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col items-center gap-24">
          <div className="w-full flex justify-between flex-col md:flex-row gap-16">
            <Image
              className="h-fit w-auto max-w-64"
              src={
                resolvedTheme == "light"
                  ? "/assets/logos/gdsc-horizontal-logo.svg"
                  : "/assets/logos/gdsc-horizontal-logo-dark.svg"
              }
              height={0} // Desired size with correct aspect ratio
              width={0} // Desired size with correct aspect ratio
              alt="logo"
            />

            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col gap-4">
                  <Heading3>About</Heading3>
                  <div className="flex flex-col gap-2">
                    <NavbarItem href="/">Who we are</NavbarItem>
                    <NavbarItem href="/">Events</NavbarItem>
                    <NavbarItem href="/">Magazine</NavbarItem>
                    <NavbarItem href="/">Community Guidelines</NavbarItem>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Heading3>Curations</Heading3>
                  <div className="flex flex-col gap-2">
                    <NavbarItem href="/">Opportunities</NavbarItem>
                    <NavbarItem href="/">Resources</NavbarItem>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full flex justify-center sm:justify-start md:justify-end">
            <SocialRow
              grow={false}
              socials={{
                twitter: "gdscmbcet",
                linkedin: "gdscmbcet",
                instagram: "gdscmbcet",
                github: "dscmbcet",
              }}
            ></SocialRow>
          </div> */}

          <div className="flex gap-4 sm:gap-24 justify-between items-center flex-col sm:flex-row">
            <BodySmall className="text-onBackgroundSecondary">
              GDSC MBCET © 2024. All Rights Reserved.
            </BodySmall>
            <SocialRow
              grow={false}
              socials={{
                twitter: "gdscmbcet",
                linkedin: "gdscmbcet",
                instagram: "gdscmbcet",
                github: "dscmbcet",
              }}
            ></SocialRow>
            <BodySmall className="text-onBackgroundSecondary">
              Made with 💙 by some{" "}
              <Link
                href="/contributors"
                className="underline hover:text-onBackgroundEmPrimary"
              >
                cool frens
              </Link>
            </BodySmall>
          </div>
        </div>
      </div>
      <div className="imageCropper flex items-center justify-center">
        <Image
          src="/images/doodles.svg" // Route of the image file
          height={0} // Desired size with correct aspect ratio
          width={0} // Desired size with correct aspect ratio
          className="w-full min-w-[1000px]" // Style of the image
          alt="doodles"
        />
      </div>
    </div>
  );
};

interface NavbarItemProps {
  children: React.ReactNode;
  href: string;
}

function NavbarItem({ children, href }: NavbarItemProps) {
  return (
    <Link
      className="menu-item text-onBackgroundSecondary hover:text-onBackgroundEmPrimary"
      href={href}
    >
      <Body>{children}</Body>
    </Link>
  );
}

export default Footer;
