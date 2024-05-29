"use client";

import teamMember from "@/models/team-members";
import Image from "next/image";
import SocialRow from "./social-row";


interface TeamCardProps {
  teammember: teamMember;
}

export default function TeamCard({ teammember }: TeamCardProps) {
  return (
    <div className="flex flex-col w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow">
      <div className="flex flex-col justify-center m-8">
        <Image
          className="mb-4 h-24 w-24 rounded-full bg-[#E3F2FD] pt-2 shadow-lg"
          src={teammember.imageURL}
          alt={`${teammember.name} image`} // Dynamic alt text
          width={96}
          height={96}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{teammember.name}</h5>
        <span className="text-sm text-gray-500">Visual Designer</span>
        <div className="mt-4 flex md:mt-6">
          <p className="inline-flex items-center rounded-lg border-2 border-[#BBDEFB] bg-[#E3F2FD] px-4 py-2 text-center text-sm font-medium text-black">
            Design Team
          </p>
        </div>
      </div>

      <div className="flex m-8 gap-6">
      <SocialRow socials={teammember.socials}></SocialRow>
      </div>
    </div>
  );
}
