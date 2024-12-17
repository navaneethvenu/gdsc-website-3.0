import teamMember from "@/models/team-members";

interface TenureEntry {
  description: string;
  teamMembers: teamMember[];
}

export const tenureList: Record<string, TenureEntry> = {
  "19-20": {
    description:
      "The 2019-2020 team laid the foundation for our community's growth and impact, setting the stage for future innovations.",
    teamMembers: [
      {
        name: "Alex Johnson",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Community Lead",
        team: "All Teams",
        socials: {
          twitter: "alex_johnson",
          linkedin: "alex-johnson",
          instagram: "alex.johnson",
          website: "alexjohnson.me",
        },
      },
      {
        name: "Sam Lee",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Technical Coordinator",
        team: "Technical Team",
        socials: {
          twitter: "sam_lee_tech",
          linkedin: "sam-lee-tech",
          instagram: "sam.lee.tech",
          website: "samlee.dev",
        },
      },
      {
        name: "Jordan Patel",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Design Lead",
        team: "Design Team",
        socials: {
          twitter: "jordan_designs",
          linkedin: "jordan-patel-design",
          instagram: "jordan.designs",
          website: "jordanpatel.design",
        },
      },
      {
        name: "Taylor Kim",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Marketing Specialist",
        team: "Social Media Team",
        socials: {
          twitter: "taylor_markets",
          linkedin: "taylor-kim-marketing",
          instagram: "taylor.markets",
          website: "taylorkim.marketing",
        },
      },
      {
        name: "Morgan Singh",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Event Organizer",
        team: "Operations Team",
        socials: {
          twitter: "morgan_events",
          linkedin: "morgan-singh-events",
          instagram: "morgan.events",
          website: "morgansingh.events",
        },
      },
    ],
  },
  "20-21": {
    description:
      "In 2020-2021, our team adapted to new challenges, expanding our online presence and creating innovative virtual events.",
    teamMembers: [
      {
        name: "Jinu Baby",
        imageURL: "/assets/images/team/faculty-in-charge/Jinu Baby.png",
        role: "Faculty in Charge",
        team: "All Teams",
        socials: {
          website: "mbcet.ac.in/faculty/mr-jinu-baby",
          facebook: "jinus.bj",
          //TODO: UPDATE SOCIAL WIDGET TO HANDLE FACEBOOK LINKS
        },
      },

      {
        name: "Advaith U",
        imageURL: "/assets/images/team/2020-2021/Advaith U.png",
        role: "Community Lead",
        team: "All Teams",
        socials: {
          medium: "advaithunni2000",
          twitter: "advaith_unni",
          linkedin: "advaithu",
          discord: "iamadvaith#5749",
        },
      },
      {
        name: "Aravind Venugopal",
        imageURL: "/assets/images/team/2020-2021/Aravind.png",
        role: "Community Mentor",
        team: "All Teams",
        socials: {
          medium: "aravindvenugopal02",
          twitter: "AravindV1444",
          facebook: "aravind.venugopal.03",
          linkedin: "aravind1444",
        },
      },
      {
        name: "Kesia Mary Joies",
        imageURL: "/assets/images/team/2020-2021/kesia.png",
        role: "Community Organizer",
        team: "Organizing Team",
        socials: {
          linkedin: "kesia-joies",
          discord: "Kesia#8707",
        },
      },
      {
        name: "M Aswin Kishore",
        imageURL: "/assets/images/team/2020-2021/aswin.png",
        role: "Community Organizer",
        team: "Organizing Team",
        socials: {
          linkedin: "maswinkishore",
          discord: "mak#6604",
          github: "https://github.com/mak626",
        },
      },
      {
        name: "Roshni Roy",
        imageURL: "/assets/images/team/2020-2021/roshni.png",
        role: "Community Organizer",
        team: "Organizing Team",
        socials: {
          linkedin: "roshni-roy-7291a21b5",
        },
      },
      {
        name: "Meenakshy Sunil",
        imageURL: "/assets/images/team/2020-2021/meenakshi.png",
        role: "Community Organizer",
        team: "Organizing Team",
        socials: {
          linkedin: "meenakshy-sunil-7bb3b41b4",
        },
      },
      {
        name: "Riya P Mathew",
        imageURL: "/assets/images/team/2020-2021/riya.png",
        role: "AI/ML Lead",
        team: "Technical Team",
        socials: {
          linkedin: "riyapmathew",
          discord: "Riya_Mathew_1120#6367",
          github: "RiyaMathew-11",
          instagram: "riya_mathew1111",
          twitter: "riya_mathew_11",
        },
      },
      {
        name: "Don Kora Jacob",
        imageURL: "/assets/images/team/2020-2021/Don.PNG",
        role: "Android Lead",
        team: "Technical Team",
        socials: {
          facebook: "don.k.1004",
          linkedin: "don-kora-jacob-70519a178",
          discord: "don_k_jacob#4143",
        },
      },
      {
        name: "Mohammed Shahan",
        imageURL: "/assets/images/team/2020-2021/Shahan.PNG",
        role: "Design Lead",
        team: "Design Team",
        socials: {
          linkedin: "mohammed-shahan-b17b57150",
          discord: "Mohammed Shahan#2735",
        },
      },
      {
        name: "Kevin Jacob",
        imageURL: "/assets/images/team/2020-2021/kevin.png",
        role: "Web Tech Lead",
        team: "Technical Team",
        socials: {
          linkedin: "kevinjacob2001",
          discord: "Kevinjacob²⁰⁰¹#3354",
        },
      },
      {
        name: "B S Meenakshy",
        imageURL: "/assets/images/team/2020-2021/meenakshy.png",
        role: "Social Media Manager",
        team: "Social Media Team",
        socials: {
          facebook: "MeenakshyOfficial",
          linkedin: "b-s-meenakshy-0010721a0",
        },
      },
      {
        name: "Sanna Pramod",
        imageURL: "/assets/images/team/2020-2021/sanna.png",
        role: "Social Media Manager",
        team: "Social Media Team",
        socials: {
          linkedin: "sanna-pramod-2565b7187",
          discord: "Sanna#2109",
        },
      },
      {
        name: "Salman Faariz",
        imageURL: "/assets/images/team/2020-2021/salman.png",
        role: "UI/UX Designer",
        team: "Design Team",
        socials: {
          linkedin: "salman-faariz-37b892194",
          discord: "Salman Faariz#0524",
        },
      },
      {
        name: "Venkitesh S. Anand",
        imageURL: "/assets/images/team/2020-2021/Venkitesh.PNG",
        role: "App Developer",
        team: "Technical Team",
        socials: {
          discord: "SoulPlayer23#7948",
        },
      },
      {
        name: "Amal Joe R S",
        imageURL: "/assets/images/team/2020-2021/amal.png",
        role: "App Developer",
        team: "Technical Team",
        socials: {
          linkedin: "amal-joe-r-s-16a50918b",
          discord: "Amal Joe#6191",
        },
      },
      {
        name: "Navaneeth Venu",
        imageURL: "/assets/images/team/2020-2021/navaneeth.png",
        role: "Graphic Designer",
        team: "Design Team",
        socials: {
          linkedin: "navaneethvenu",
          github: "navaneethvenu",
          instagram: "nauaneeth",
          twitter: "navaneethvenu",
          discord: "Alternaet#6890",
        },
      },
      {
        name: "Govind B Chandran",
        imageURL: "/assets/images/team/2020-2021/govind.png",
        role: "Web Developer",
        team: "Technical Team",
        socials: {
          linkedin: "govind-chandran-46821a193",
        },
      },
    ],
  },
  "21-22": {
    description:
      "The 2021-2022 team focused on innovation and community engagement, launching several successful projects and initiatives.",
    teamMembers: [
      {
        name: "Reese Thompson",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Community Lead",
        team: "All Teams",
        socials: {
          twitter: "reese_outreach",
          linkedin: "reese-thompson-outreach",
          instagram: "reese.outreach",
          website: "reesethompson.com",
        },
      },
      {
        name: "Blake Nguyen",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Technical Lead",
        team: "Technical Team",
        socials: {
          twitter: "blake_tech",
          linkedin: "blake-nguyen-tech",
          instagram: "blake.tech",
          website: "blakenguyen.dev",
        },
      },
      {
        name: "Harper Wilson",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "UI Designer",
        team: "Design Team",
        socials: {
          twitter: "harper_designs",
          linkedin: "harper-wilson-design",
          instagram: "harper.designs",
          website: "harperwilson.design",
        },
      },
      {
        name: "Emerson Davis",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Social Media Manager",
        team: "Social Media Team",
        socials: {
          twitter: "emerson_social",
          linkedin: "emerson-davis-social",
          instagram: "emerson.social",
          website: "emersondavis.social",
        },
      },
      {
        name: "Quinn Foster",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Workshop Coordinator",
        team: "Operations Team",
        socials: {
          twitter: "quinn_workshops",
          linkedin: "quinn-foster-workshops",
          instagram: "quinn.workshops",
          website: "quinnfoster.events",
        },
      },
    ],
  },
  "22-23": {
    description:
      "In 2022-2023, we expanded our reach and launched groundbreaking projects, solidifying our position as a leading tech community.",
    teamMembers: [
      {
        name: "Kai Patel",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Community Lead",
        team: "All Teams",
        socials: {
          twitter: "kai_mentors",
          linkedin: "kai-patel-mentorship",
          instagram: "kai.mentors",
          website: "kaipatel.mentor",
        },
      },
      {
        name: "Finley Park",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Backend Developer",
        team: "Technical Team",
        socials: {
          twitter: "finley_backend",
          linkedin: "finley-park-dev",
          instagram: "finley.backend",
          website: "finleypark.tech",
        },
      },
      {
        name: "Drew Sanchez",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Motion Designer",
        team: "Design Team",
        socials: {
          twitter: "drew_motion",
          linkedin: "drew-sanchez-motion",
          instagram: "drew.motion",
          website: "drewsanchez.design",
        },
      },
      {
        name: "Arden Chen",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Brand Strategist",
        team: "Social Media Team",
        socials: {
          twitter: "arden_brand",
          linkedin: "arden-chen-brand",
          instagram: "arden.brand",
          website: "ardenchen.marketing",
        },
      },
      {
        name: "Sage Roberts",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Finance Coordinator",
        team: "Operations Team",
        socials: {
          twitter: "sage_finance",
          linkedin: "sage-roberts-finance",
          instagram: "sage.finance",
          website: "sageroberts.finance",
        },
      },
    ],
  },
  "23-24": {
    description:
      "The 2023-2024 team is driving innovation and community growth to new heights, focusing on emerging technologies and global collaboration.",
    teamMembers: [
      {
        name: "Jude Patel",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Community Lead",
        team: "All Teams",
        socials: {
          twitter: "jude_innovates",
          linkedin: "jude-patel-innovation",
          instagram: "jude.innovates",
          website: "judepatel.innovate",
        },
      },
      {
        name: "River Kim",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "AI/ML Specialist",
        team: "Technical Team",
        socials: {
          twitter: "river_ai",
          linkedin: "river-kim-ai",
          instagram: "river.ai",
          website: "riverkim.ai",
        },
      },
      {
        name: "Phoenix Wright",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Product Designer",
        team: "Design Team",
        socials: {
          twitter: "phoenix_product",
          linkedin: "phoenix-wright-product",
          instagram: "phoenix.product",
          website: "phoenixwright.design",
        },
      },
      {
        name: "Charlie Garcia",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Growth Hacker",
        team: "Social Media Team",
        socials: {
          twitter: "charlie_growth",
          linkedin: "charlie-garcia-growth",
          instagram: "charlie.growth",
          website: "charliegarcia.growth",
        },
      },
      {
        name: "Aubrey Taylor",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Sustainability Coordinator",
        team: "Operations Team",
        socials: {
          twitter: "aubrey_sustain",
          linkedin: "aubrey-taylor-sustainability",
          instagram: "aubrey.sustain",
          website: "aubreytaylor.eco",
        },
      },
    ],
  },
};
