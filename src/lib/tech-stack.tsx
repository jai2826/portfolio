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

export const Stack = [
  {
    name: "React",
    Icon: (
      <FaReact
        color="#61DAFB"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description:
      "A JavaScript library for building user interfaces.",
  },
  {
    name: "TypeScript",
    Icon: (
      <SiTypescript
        color="#3178C6"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description:
      "A strongly typed programming language that builds on JavaScript.",
  },
  {
    name: "Node.js",
    Icon: (
      <FaNodeJs
        color="#339933"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description:
      "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
  },
  {
    name: "Next.js",
    Icon: (
      <TbBrandNextjs
        color="#000000"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description:
      "A React framework for server-rendered applications.",
  },
  {
    name: "Express.js",
    Icon: (
      <FaNodeJs
        color="#000000"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description: "A web application framework for Node.js.",
  },
  {
    name: "MongoDB",
    Icon: (
      <DiMongodb
        color="#00ED64"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description:
      "A NoSQL database for modern applications.",
  },
  {
    name: "Convex",
    Icon: (
      <ConvexIcon className="size-5 sm:size-6 md:size-7" />
    ),
    description:
      "A serverless backend for modern applications.",
  },
  {
    name: "Tailwind CSS",
    Icon: (
      <RiTailwindCssFill
        color="#0ea5e9"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description:
      "A utility-first CSS framework for rapid UI development.",
  },
  {
    name: "Prisma",
    Icon: (
      <SiPrisma
        color="#0c344b"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description:
      "A next-generation ORM for Node.js and TypeScript.",
  },
  {
    name: "Git",
    Icon: (
      <FaGitAlt
        color="#F05032"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description: "A distributed version control system.",
  },
  {
    name: "GitHub",
    Icon: (
      <FaGithub
        color="#181717"
        className="size-5 sm:size-6 md:size-7"
      />
    ),
    description:
      "A web-based platform for version control and collaboration.",
  },
];
