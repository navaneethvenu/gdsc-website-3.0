import Link from "next/link";
import React from "react";
import Button from "./Button";
import { Body } from "./type-styles";
import { link } from "fs";

interface NavbarProps {
  className?: string;
  isCol?: boolean;
}

export const NavbarLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
    children: [
      {
        name: "Who we are",
        href: "/about",
        description: "What makes us different",
      },
      {
        name: "Contributors",
        href: "/contributors",
        description: "People who've contribute to this website",
      },
    ],
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Contributors",
    href: "/contributors",
    description: "People who've contribute to this website",
  },
  {
    name: "Resources",
    href: "/resources",
    description: "Resources that are being used",
  },

  // {
  //   name: "Initiatives",
  //   href: "",
  //   children: [
  //     {
  //       name: "Projects (Coming Soon)",
  //       href: "/projects",
  //       description: "Projects that are being worked on",
  //     },

  //   ],
  // },
];

const Navbar = ({ isCol = false, className }: NavbarProps) => {
  return (
    <div
      className={`flex ${
        !isCol ? "justify-end" : "flex-col justify-between h-full"
      } gap-2 items-center overflow-hidden ${className}`}
    >
      <div
        className={`buttonContainer flex ${
          !isCol ? "" : "flex-col"
        } justify-center items-center`}
      >
        {NavbarLinks.filter((link) => link.name !== "Home").map((link) => (
          <NavbarItem key={link.name} href={link.href}>
            {link.name}
          </NavbarItem>
        ))}
      </div>
      <div
        className={`buttonContainer flex ${
          !isCol ? "" : "flex-col w-full"
        }  justify-center items-center gap-2`}
      >
        <Button className={`${isCol ? "w-full" : ""}`}>Become a member</Button>
      </div>
    </div>
  );
};

interface NavbarItemProps {
  children: React.ReactNode;
  href: string;
}

export function NavbarItem({ children, href }: NavbarItemProps) {
  return (
    <Link
      className="menu-item p-2 hover:text-onBackgroundEmPrimary"
      href={href}
    >
      <Body>{children}</Body>
    </Link>
  );
}

export default Navbar;
