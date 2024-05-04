import React from "react";
import Image from "next/image";
import { Heading2, Body } from "./type-styles";

import { Icon } from "@iconify/react";
import Button from "./Button";

interface GridCardProps {
  image: string;
  heading: string;
  body: string;
  buttonText: string;
  backgroundColor: string;
  iconBackgroundColor: string;
  cardBorderColor: string;
  variant?: "primary" | "secondary";
}

const GridCard = ({
  image,
  heading,
  body,
  buttonText,
  backgroundColor,
  iconBackgroundColor,
  cardBorderColor,
  variant = "secondary",
}: GridCardProps) => {
  return (
    <div
      className={`text-start flex flex-col items-start gap-16 py-12 px-8 md:py-16 md:px-12 rounded-xl justify-between ${backgroundColor} hover:outline hover:outline-[1px] hover:outline-${cardBorderColor}`}
    >
      <div className="flex flex-col gap-12">
        <div
          className={`flex !grow-0 justify-center items-center w-16 h-16 ${iconBackgroundColor} rounded-2xl`}
        >
          <Icon
            icon={image}
            width={"2rem"}
            height={"2rem"}
            className={`text-${backgroundColor.substring(3)}`}
          />
        </div>
        <div className="flex flex-col gap-y-6 items-start">
          <Heading2>{heading}</Heading2>
          <Body className="text-left text-onBackgroundSecondary">{body}</Body>
        </div>
      </div>

      <Button
        highlightColor={iconBackgroundColor.substring(3)}
        variant={variant}
        className="w-full sm:w-auto"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default GridCard;
