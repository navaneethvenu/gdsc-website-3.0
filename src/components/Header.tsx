"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import Navbar from "./Navbar";
import { SideBar } from "./SideBar";
import useIsSmallScreen from "./hooks/useIsSmallScreen";
import Link from "next/link";
import { useTheme } from "next-themes";
import MarqueeContainer from "./MarqueeContainer";

const Header = () => {
  const isSmallScreen = useIsSmallScreen();
  const {resolvedTheme} = useTheme();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 120) {
        setHeaderTop(-120);
      } else {
        setHeaderTop(0);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  if (!mounted) return null;

  return (
    <div
      style={{ top: headerTop }}
      className="fixed left-0 w-full z-10 transition-[top] duration-500"
    >
      <MarqueeContainer />
      <div className="z-[1] h-76 bg-backgroundPrimary grid grid-cols-12 p-x-4 items-center min-h-[72px] py-4 top-0">
        <div className="flex gap-8 !col-start-2 col-span-4 lg:col-span-4">
          <Link href={"/"}>
            {isSmallScreen ? (
              <Image
                src={
                  resolvedTheme == "light"
                    ? "/assets/logos/gdsc-standalone-logo.svg"
                    : "/assets/logos/gdsc-standalone-logo-dark.svg"
                } // Route of the image file
                width={48}
                height={48}
                priority
                alt="logo"
              />
            ) : (
              <Image
                src={
                  resolvedTheme == "light"
                    ? "/assets/logos/gdsc-horizontal-logo.svg"
                    : "/assets/logos/gdsc-horizontal-logo-dark.svg"
                } // Route of the image file
                width={0}
                height={0}
                priority
                alt="logo"
                className="w-auto	h-auto"
              />
            )}
          </Link>
          {!isSmallScreen && <ThemeToggle />}
        </div>

        {isSmallScreen && (
          <div className="toggleContainer col-span-2 flex items-center justify-center">
            <ThemeToggle />
          </div>
        )}

        {isSmallScreen ? (
          <div className="sidebarContainer col-end-12 col-span-4 flex items-center justify-end">
            <SideBar />
          </div>
        ) : (
          <Navbar className="col-start-8 col-span-4 lg:col-span-6 lg:col-start-6 justify-end" />
        )}
      </div>
    </div>
  );
};

export default Header;
