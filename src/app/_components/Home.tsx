import GithubContribution from "@/app/_components/GithubActivityCard";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { TechStack } from "@/app/_components/TechStack";
import FeaturedProject from "@/app/_components/FeaturedProject";

export const HomeHero = () => {
  return (
    <div className=" py-4 w-full min-h-screen flex flex-col gap-2 items-stretch">
      <div className="w-full flex flex-col lg:flex-row gap-2 items-stretch">
        <div className="lg:w-fit min-w-fit  flex items-center justify-center space-x-5 p-6 bg-background border  rounded-3xl">
          <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-50 aspect-square">
            <Image
              src="/TestGhibli.jpg"
              alt="Profile"
              fill
              className="rounded-full object-cover border-2 border-primary/20"
            />
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
          </div>
          <div>
            <h2 className="mt-4 text-xl md:text-3xl font-bold font-sans">
              Jai Lakhmani
            </h2>
            <p className="text-primary-foreground  font-semibold font-mono text-xs md:text-xl uppercase tracking-widest">
              Full Stack Developer
            </p>
            <div className="pt-2 ">
              <div className="flex w-full justify-between items-center md:text-xl">
                Skills
                <span className="bg-zinc-400 rounded-md p-1">
                  <ArrowRightIcon size={15} />
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                  TypeScript
                </span>
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                  React
                </span>
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                  Node.js
                </span>
              </div>
            </div>
            <div className="flex text-xs md:text-lg items-center pt-2">
              <MapPinIcon
                size={15}
                className="inline-block mr-1"
              />
              Uttar Pradesh, India
            </div>
          </div>
        </div>
        <div className="w-full flex items-start p-6 bg-background rounded-3xl overflow-hidden">
          <GithubContribution />
        </div>
      </div>
      <div className="w-full  flex-1 flex flex-col lg:flex-row gap-2 items-stretch">
        {/* Added flex-1 above ^ to force this row to take up remaining screen space */}
        <div className="p-6 flex-1 bg-background rounded-3xl border min-h-[300px]">
          <TechStack />
        </div>
        <div className="p-6  bg-background rounded-3xl border min-h-[300px]">
          <FeaturedProject />
        </div>
      </div>
    </div>
  );
};
