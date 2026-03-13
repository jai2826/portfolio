import { ProjectProps } from "@/lib/projects-data";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LayoutDashboard } from "lucide-react"; // Better icons
import { FaGithub } from "react-icons/fa6";

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  return (
    <div className="group h-full bg-secondary border border-border rounded-2xl overflow-hidden flex flex-col transition-all duration-300  hover:shadow-2xl hover:shadow-emerald-500/5">

      {/* 1. Image Section - Now scales properly in the grid */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          priority={project.gridSpan === 'double-wide'} // Performance for hero project
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-col flex-grow p-6">
        <h2 className="text-xl font-bold text-primary font-sans tracking-tight">
          {project.title}
        </h2>

        <p className="mt-2 text-sm text-primary-foreground font-mono leading-relaxed line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* 3. Tech Stack - Fixed the horizontal scroll junk */}
        <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-zinc-800">
          {project.technologies.map((tech) => {
            const Icon = tech.Icon;
            return (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-accent  text-primary-foreground px-2.5 py-1 rounded-full"
              >
                <Icon size={12} style={{ color: tech.iconColor }} className="shrink-0" />
                {tech.name}
              </span>
            );
          })}
        </div>

        {/* 4. Action Links - Styled as clear buttons */}

        <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
          {project.links?.map(link => {
            return (
              <Link 
                key={link.name}
                href={link.url}
                target="_blank"
                className={`inline-flex items-center gap-2 text-xs font-mono ${link.color} hover:underline`}
              >
                <link.Icon size={14} /> {link.name}

              </Link>
            )
          })}


        </div>
      </div>
    </div>
  );
};

export default ProjectCard;