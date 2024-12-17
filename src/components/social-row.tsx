import React from "react";
import LinkedinIcon from "@/../public/assets/icons/linkedin-logo.svg";
import { Globe, InstagramLogo, TwitterLogo } from "@phosphor-icons/react";
import GitHubLogo from "@/../public/assets/icons/github-logo.svg";
import DiscordLogo from "@/../public/assets/icons/discord-logo.svg";
import FacebookLogo from "@/../public/assets/icons/facebook-logo.svg";
import MediumLogo from "@/../public/assets/icons/medium-logo.svg";
import Socials from "@/models/firebase/socials";
import { platform } from "os";

interface SocialRowProps {
  grow?: boolean;
  socials: Socials;
}

interface SocialTileProps {
  href: string;
  icon: JSX.Element;
}

export default function SocialRow({ socials, grow = true }: SocialRowProps) {
  const hoverClass = " group-hover/socialtile:text-onBackgroundEmPrimary";
  return (
    <div className={`socials flex flex-wrap gap-2 ${grow ? "w-full" : ""}`}>
      {Object.entries(socials).map(([platform, handle]) => {
        if (handle && handle.trim() !== "") {
          let baseURL = "";
          let finalURL = "";
          Object.keys(SocialURLs).find((socialURLplatform) => {
            if (socialURLplatform.toLowerCase() === platform.toLowerCase()) {
              baseURL =
                SocialURLs[socialURLplatform as keyof typeof SocialURLs];
            }
          });

          if (handle.includes(baseURL.replace("https://", ""))) {
            if (handle.includes("https://")) {
              finalURL = handle;
            } else finalURL = "https://" + handle;
          } else {
            finalURL = baseURL + handle;
          }
          return (
            <SocialTile
              key={platform}
              href={finalURL}
              icon={getSocialIcon(
                platform.toLowerCase(),
                "text-onBackgroundSecondary" + hoverClass
              )}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

function SocialTile({ href, icon }: SocialTileProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <div className="group/socialtile bg-backgroundNeutralPrimary hover:bg-surfaceTertiary h-9 w-9 rounded-lg flex justify-center items-center">
        {icon}
      </div>
    </a>
  );
}

enum SocialURLs {
  Instagram = "https://instagram.com/",
  Twitter = "https://x.com/",
  Discord = "https://discord.com/",
  Linkedin = "https://www.linkedin.com/in/",
  LinkedinCompany = "https://www.linkedin.com/company/",
  Facebook = "https://www.facebook.com/",
  Medium = "https://www.medium.com/@",
  Email = "mailto:",
  Behance = "https://behance.com/",
  Github = "https://github.com/",
  Website = "https://",
}

function getSocialIcon(platform: string, className: string): JSX.Element {
  let icon;
  switch (platform) {
    case "instagram":
      icon = (
        <InstagramLogo
          className={className}
          weight="fill"
          width={20}
          height={20}
        ></InstagramLogo>
      );
      break;
    case "twitter":
      icon = (
        <TwitterLogo
          className={className}
          weight="fill"
          width={20}
          height={20}
        ></TwitterLogo>
      );
      break;
    case "linkedin":
    case "linkedincompany":
      icon = (
        <LinkedinIcon
          className={className}
          width={20}
          height={20}
        ></LinkedinIcon>
      );
      break;
    case "facebook":
      icon = (
        <FacebookLogo
          className={className}
          width={20}
          height={20}
        ></FacebookLogo>
      );
      break;
    case "medium":
      icon = (
        <MediumLogo className={className} width={20} height={20}></MediumLogo>
      );
      break;
    case "discord":
      icon = (
        <DiscordLogo className={className} width={20} height={20}></DiscordLogo>
      );
      break;
    case "github":
      icon = (
        <GitHubLogo className={className} width={20} height={20}></GitHubLogo>
      );
      break;
    case "website":
      icon = <Globe className={className} width={20} height={20}></Globe>;
      break;
    default:
      icon = <p>{platform.toUpperCase().substring(0, 1)}</p>;
      break;
  }

  return icon;
}
