import React from "react";
import { Button as ButtonComponent } from "./ui/button";
import { Body } from "./type-styles";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  highlightColor?: string;
  href?: string;
}

export default function Button({
  variant = "primary",
  highlightColor,
  href,
  ...props
}: ButtonProps) {
  return (
    <ButtonComponent
      className={`rounded-full ${
        variant === "primary" ? "bg-backgroundInversePrimary" : "bg-transparent"
      } ${
        variant === "primary"
          ? "text-onBackgroundInversePrimary"
          : "text-onBackgroundPrimary"
      }
      ${
        variant === "primary"
          ? "border-none"
          : "border border-onBackgroundPrimary"
      }
      ${
        variant === "primary"
          ? `hover:bg-${
              highlightColor !== undefined
                ? highlightColor
                : "onBackgroundEmPrimary"
            }`
          : `hover:bg-white/50 dark:hover:bg-white/10 hover:border-${
              highlightColor !== undefined
                ? highlightColor
                : "onBackgroundEmPrimary"
            } hover:text-${
              highlightColor != undefined
                ? highlightColor
                : "onBackgroundEmPrimary"
            }`
      } ${props.className}`}
      onClick={props.onClick}
    >
      {href !== undefined ? (
        <Link href={href}>
          <Body>{props.children}</Body>
        </Link>
      ) : (
        <Body>{props.children}</Body>
      )}
    </ButtonComponent>
  );
}
