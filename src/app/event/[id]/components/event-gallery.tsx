import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function EventCard() {
  return (
    <Card className="w-full rounded-lg aspect-square overflow-hidden shadow-none">
      <Image
        src={"/images/9cb106030ddb6e6761ba6e6237de936e.png"}
        alt={""}
        width={1920}
        height={1080}
        className="w-1fr aspect-square object-cover mx-auto"
      />
    </Card>
  );
}
