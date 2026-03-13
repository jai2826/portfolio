// lib/projects-data.ts
import { Stack } from "@/lib/tech-stack";
import { ImageProps } from "next/image";
import { JSX } from "react";
import { IconType } from "react-icons";

import { ConvexIcon } from "@/components/ConvexIcon";
import { DiMongodb } from "react-icons/di";
import {
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiPrisma, SiTypescript } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { ExternalLink, LayoutDashboard } from "lucide-react";

export type ProjectProps = {
  projectId: number;
  title: string;
  description: string;
  technologies: {
    name: string;
    Icon: React.ElementType;
    iconColor?: string;
    link?: string;
  }[];
  image: ImageProps["src"];
  links?: {
    name: string;
    url: string;
    Icon: IconType;
    color?: string;
  }[];
  liveUrl?: string;
  dashboardUrl?: string;
  repoUrl?: string;
  gridSpan?: "single" | "double-wide" | "double-tall";
};

export const projects: ProjectProps[] = [
  {
    projectId: 3,
    title: "Trellis Ai Chatbot",
    description:
      "Trellis AI Chatbot (with React, Tailwind, and Node.js icons, and a dashboard screenshot from the visual).",
    technologies: [
      {
        name: "React",
        Icon: FaReact,
        iconColor: "#61DAFB",
        link: "https://reactjs.org/",
      },
      {
        name: "Tailwind CSS",
        Icon: RiTailwindCssFill,
        iconColor: "#0ea5e9",
        link: "https://tailwindcss.com/",
      },
      {
        name: "Node.js",
        Icon: FaNodeJs,
        iconColor: "#339933",
        link: "https://nodejs.org/",
      },
      {
        name: "Next.js",
        Icon: TbBrandNextjs,
        link: "https://nextjs.org/",
      },
      {
        name: "Convex",
        Icon: ConvexIcon,
        link: "https://www.convex.dev/",
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        iconColor: "#3178C6",
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Github",
        Icon: FaGithub,
        iconColor: "#181717",
        link: "https://www.github.com/",
      },
    ],
    image: "/TestGhibli.jpg",

    links: [
      {
        name: "Live Demo",
        url: "https://trellis-widget.vercel.app/?organizationId=org_350P1wrI0kNxDhjYbIP6w9s8JEe",
        Icon: ExternalLink,
        color: "text-emerald-500",
      },
      {
        name: "Dashboard",
        url: "https://trellis-web-kappa.vercel.app",
        Icon: LayoutDashboard,
        color: "text-indigo-400",
      },
      {
        name: "REPO",
        url: "https://github.com/jai2826/trellis",
        Icon: FaGithub,
        color: "text-zinc-500",
      },
    ],
  },
  {
    projectId: 4,
    title: "Trellis Ai Chatbot",
    description:
      "Trellis AI Chatbot (with React, Tailwind, and Node.js icons, and a dashboard screenshot from the visual).",
    technologies: [
      {
        name: "React",
        Icon: FaReact,
        iconColor: "#61DAFB",
        link: "https://reactjs.org/",
      },
      {
        name: "Tailwind CSS",
        Icon: RiTailwindCssFill,
        iconColor: "#0ea5e9",
        link: "https://tailwindcss.com/",
      },
      {
        name: "Node.js",
        Icon: FaNodeJs,
        iconColor: "#339933",
        link: "https://nodejs.org/",
      },
      {
        name: "Next.js",
        Icon: TbBrandNextjs,
        link: "https://nextjs.org/",
      },
      {
        name: "Convex",
        Icon: ConvexIcon,
        link: "https://www.convex.dev/",
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        iconColor: "#3178C6",
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Github",
        Icon: FaGithub,
        iconColor: "#181717",
        link: "https://www.github.com/",
      },
    ],
    image: "/TestGhibli.jpg",

    links: [
      {
        name: "Live Demo",
        url: "https://trellis-widget.vercel.app/?organizationId=org_350P1wrI0kNxDhjYbIP6w9s8JEe",
        Icon: ExternalLink,
        color: "text-emerald-500",
      },
      {
        name: "Dashboard",
        url: "https://trellis-web-kappa.vercel.app",
        Icon: LayoutDashboard,
        color: "text-indigo-400",
      },
      {
        name: "REPO",
        url: "https://github.com/jai2826/trellis",
        Icon: FaGithub,
        color: "text-zinc-500",
      },
    ],
  },
  {
    projectId: 5,
    title: "Trellis Ai Chatbot",
    description:
      "Trellis AI Chatbot (with React, Tailwind, and Node.js icons, and a dashboard screenshot from the visual).",
    technologies: [
      {
        name: "React",
        Icon: FaReact,
        iconColor: "#61DAFB",
        link: "https://reactjs.org/",
      },
      {
        name: "Tailwind CSS",
        Icon: RiTailwindCssFill,
        iconColor: "#0ea5e9",
        link: "https://tailwindcss.com/",
      },
      {
        name: "Node.js",
        Icon: FaNodeJs,
        iconColor: "#339933",
        link: "https://nodejs.org/",
      },
      {
        name: "Next.js",
        Icon: TbBrandNextjs,
        link: "https://nextjs.org/",
      },
      {
        name: "Convex",
        Icon: ConvexIcon,
        link: "https://www.convex.dev/",
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        iconColor: "#3178C6",
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Github",
        Icon: FaGithub,
        iconColor: "#181717",
        link: "https://www.github.com/",
      },
    ],
    image: "/TestGhibli.jpg",

    links: [
      {
        name: "Live Demo",
        url: "https://trellis-widget.vercel.app/?organizationId=org_350P1wrI0kNxDhjYbIP6w9s8JEe",
        Icon: ExternalLink,
        color: "text-emerald-500",
      },
      {
        name: "Dashboard",
        url: "https://trellis-web-kappa.vercel.app",
        Icon: LayoutDashboard,
        color: "text-indigo-400",
      },
      {
        name: "REPO",
        url: "https://github.com/jai2826/trellis",
        Icon: FaGithub,
        color: "text-zinc-500",
      },
    ],
  },
  {
    projectId: 6,
    title: "Trellis Ai Chatbot",
    description:
      "Trellis AI Chatbot (with React, Tailwind, and Node.js icons, and a dashboard screenshot from the visual).",
    technologies: [
      {
        name: "React",
        Icon: FaReact,
        iconColor: "#61DAFB",
        link: "https://reactjs.org/",
      },
      {
        name: "Tailwind CSS",
        Icon: RiTailwindCssFill,
        iconColor: "#0ea5e9",
        link: "https://tailwindcss.com/",
      },
      {
        name: "Node.js",
        Icon: FaNodeJs,
        iconColor: "#339933",
        link: "https://nodejs.org/",
      },
      {
        name: "Next.js",
        Icon: TbBrandNextjs,
        link: "https://nextjs.org/",
      },
      {
        name: "Convex",
        Icon: ConvexIcon,
        link: "https://www.convex.dev/",
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        iconColor: "#3178C6",
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Github",
        Icon: FaGithub,
        iconColor: "#181717",
        link: "https://www.github.com/",
      },
    ],
    image: "/TestGhibli.jpg",

    links: [
      {
        name: "Live Demo",
        url: "https://trellis-widget.vercel.app/?organizationId=org_350P1wrI0kNxDhjYbIP6w9s8JEe",
        Icon: ExternalLink,
        color: "text-emerald-500",
      },
      {
        name: "Dashboard",
        url: "https://trellis-web-kappa.vercel.app",
        Icon: LayoutDashboard,
        color: "text-indigo-400",
      },
      {
        name: "REPO",
        url: "https://github.com/jai2826/trellis",
        Icon: FaGithub,
        color: "text-zinc-500",
      },
    ],
  },
  
];
