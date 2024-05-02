"use client";

import Button from "@/components/Button";
import { Event } from "@/models/firebase/event/event";
import { EntityType } from "@/models/firebase/entity/test";
import React from "react";
import { EventCategory } from "@/models/firebase/event/event-category";
import { EventStatus } from "@/models/firebase/event/event-status.d";
import { EventType } from "@/models/firebase/event/event-type.d";
import addData from "@/lib/firebase/firestore/addData";
import { EventShort } from "@/models/firebase/event/event-short.d";

const longEventData: Event = {
  id: "event-promptcraft-eafc",
  name: "PromptCraft: Mastering the art of Prompt Engineering",
  description:
    "## About this event: \nDive into the world of AI-Prompt Engineering with our immersive session where you'll learn the art and science of crafting inputs to elicit optimal responses from AI systems. Whether you're a novice exploring the possibilities of AI or an experienced practitioner seeking to enhance your techniques, this event offers a comprehensive journey into the realm of AI customization and efficiency. Join us to discover how you can harness the power of AI to achieve your desired outcomes!",
  schedule: [
    {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      display: false,
    },
  ],
  skills: {},
  prerequisites: {},
  mentors: {
    eeee: {
      id: "eeee",
      name: "Ben George Netto",
      imageURL:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&s=200",
      description:
        "A passionate and curious AI enthusiast with a passion for artificial intelligence and the art of crafting inputs to elicit optimal responses from AI systems.",
      entityType: EntityType.Individual,
      roles: [
        {
          name: "Software Engineer",
          organisation: {
            id: "org-Signify",
            name: "Signify",
            entityType: EntityType.Organisation,
            imageURL: "",
            description: "",
            socials: undefined,
          },
          date_start: "2021-05-01",
          date_end: "current",
        },
      ],
      socials: {
        github: "signifyai",
        linkedin: "signifyai/",
        twitter: "signifyai",
      },
    },
  },
  gallery: [],
  testimonials: {},
  sponsors: {},
  displayShedule: false,
  imageURL: "",
  description_short:
    "Unlock the full potential of AI with our AI-Prompt Engineering session! Learn to shape inputs for desired outputs using advanced models like GPT and stable diffusion techniques. Perfect for beginners and experts alike, this event will equip you with essential skills to maximize AI efficiency and customization.",
  start_date: "",
  status: EventStatus.Completed,
  category: [EventCategory.AI, EventCategory.Design],
  type: EventType.Virtual,
};

const shortEventData: EventShort[] = [
  {
    id: "event-promptcraftmasteringtheartofpromptengineering-g2f4",
    name: "PromptCraft: Mastering the art of Prompt Engineering",
    description_short:
      "Unlock the full potential of AI with our AI-Prompt Engineering session! Learn to shape inputs for desired outputs using advanced models like GPT and stable diffusion techniques. Perfect for beginners and experts alike, this event will equip you with essential skills to maximize AI efficiency and customization.",
    start_date: "1710941400",
    status: EventStatus.Completed,
    category: [EventCategory.AI],
    type: EventType.Virtual,
    imageURL:
      "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/event_banners/prompt_eng_ben_banner.png",
  },
  {
    id: "event-introducdin-g435",
    name: "Introduction to Linksedin",
    imageURL:
      "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/event_banners/Event%20Banner%20%281%29_iifqAGi.png",
    description_short:
      "Set up your LinkedIn profile, leverage it effectively - kickstart your career journey!!",
    start_date: "1709215200",
    status: EventStatus.Completed,
    category: [EventCategory.Others],
    type: EventType.Virtual,
  },
  {
    id: "event-ledebut-4-fgfc",
    name: "LeDebut",
    imageURL:
      "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/event_banners/Frame%201%20%285%29_uk0VYYq.png",
    description_short:
      "A session focused on providing insights regarding the various career opportunities available in the industry right now.",
    start_date: "1718890200",
    status: EventStatus.Upcoming,
    category: [
      EventCategory.Others,
      EventCategory.App,
      EventCategory.Design,
      EventCategory.Web,
      EventCategory.Writing,
    ],
    type: EventType.Virtual,
  },
];

async function updateEvent() {
  console.log("updateEvent");
  console.log(shortEventData);
  const data = shortEventData.reduce(
    (acc: { [key: string]: EventShort }, event) => {
      acc[event.id] = event;
      return acc;
    },
    {}
  );

  const compData = {
    events: data,
  };
  console.log(compData);
  const x = await addData(
    "data",
    "events",
    JSON.parse(JSON.stringify(compData))
  );
  console.log(x);
}

export default function page() {
  return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <Button onClick={updateEvent}>Update Firebase</Button>
    </div>
  );
}
