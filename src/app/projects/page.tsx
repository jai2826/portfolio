import Image from "next/image";
import { projects } from "@/lib/projects-data";
import { Layers } from "lucide-react"; // Example "Hand-Drawn" Dev Icon choice
import ProjectCard from "@/app/_components/ProjectCard";

// Helper function to map data span to Tailwind classes
// const getSpanClasses = (span: string) => {
//   if (span === "double-wide")
//     return "col-span-1 lg:col-span-2";
//   return "col-span-1";
// };

export default function ProjectsPage() {
  return (
    <main className="py-4 w-full min-h-screen flex flex-col gap-2 items-stretch">
      <div className="bg-background rounded-3xl p-4 flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-3 border-b-2 border-primary pb-5">
          <Layers className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold font-sans tracking-tight">
            Active Deployments
          </h1>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-full w-full">
          {projects.map((project) => {
            return (
              <div
                key={project.projectId}
                className={` w-full h-full border rounded-2xl`}>
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
