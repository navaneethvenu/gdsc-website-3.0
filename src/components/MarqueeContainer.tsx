import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

const data = [
  "GDSC MBCET has officially shut its doors.",
  <Link href={"/blog/the-journey-continues"} key={1} className="flex">
    Learn more
    <ArrowUpRight width={16}></ArrowUpRight>
  </Link>,
];

const MarqueeContainer = () => {
  return (
    <div className="h-8 bg-onBackgroundEmPrimary text-backgroundEmPrimary flex justify-center items-center">
      <Marquee pauseOnHover play delay={0} autoFill>
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            <span>{item}</span>
            <div className=" justify-center rounded-full bg-backgroundEmPrimary h-2 w-2 mx-4"></div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeContainer;
