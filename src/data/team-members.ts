import teamMember from "@/models/team-members";

interface TenureEntry {
  description: string,
  teamMembers: teamMember[]
}

export const tenureList: Record<string, TenureEntry> = {
  "19-20": {
    description: "The 2019-2020 team laid the foundation for our community's growth and impact, setting the stage for future innovations.",
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
    description: "In 2020-2021, our team adapted to new challenges, expanding our online presence and creating innovative virtual events.",
    teamMembers: [
      {
        name: "Casey Zhang",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Community Lead",
        team: "All Teams",
        socials: {
          twitter: "casey_pm",
          linkedin: "casey-zhang-pm",
          instagram: "casey.pm",
          website: "caseyzhang.pro",
        },
      },
      {
        name: "Riley Brown",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Frontend Developer",
        team: "Technical Team",
        socials: {
          twitter: "riley_codes",
          linkedin: "riley-brown-dev",
          instagram: "riley.codes",
          website: "rileybrown.dev",
        },
      },
      {
        name: "Avery Martinez",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "UX Researcher",
        team: "Design Team",
        socials: {
          twitter: "avery_ux",
          linkedin: "avery-martinez-ux",
          instagram: "avery.ux",
          website: "averymartinez.design",
        },
      },
      {
        name: "Skyler Wong",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Content Creator",
        team: "Social Media Team",
        socials: {
          twitter: "skyler_creates",
          linkedin: "skyler-wong-content",
          instagram: "skyler.creates",
          website: "skylerwong.media",
        },
      },
      {
        name: "Jamie Gupta",
        imageURL: "/assets/images/team-photos/bengeorgenetto.png",
        role: "Community Manager",
        team: "Operations Team",
        socials: {
          twitter: "jamie_community",
          linkedin: "jamie-gupta-community",
          instagram: "jamie.community",
          website: "jamiegupta.community",
        },
      },
    ],
  },
  "21-22": {
    description: "The 2021-2022 team focused on innovation and community engagement, launching several successful projects and initiatives.",
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
    description: "In 2022-2023, we expanded our reach and launched groundbreaking projects, solidifying our position as a leading tech community.",
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
    description: "The 2023-2024 team is driving innovation and community growth to new heights, focusing on emerging technologies and global collaboration.",
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