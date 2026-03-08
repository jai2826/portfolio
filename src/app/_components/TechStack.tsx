import { Stack } from "@/lib/tech-stack";
export const TechStack = () => {
  const stack = Stack;
  return (
    <div className="w-full  flex flex-col gap-4 h-52   ">
      <h1 className="text-xl font-semibold ">Tech Stack</h1>
      <div className="w-full flex flex-wrap gap-2 overflow-auto">
        {stack.map((tech, index) => {
          return (
            <div
              key={index}
              className=" p-2 md:p-4 rounded-lg w-fit">
              <div className="flex items-center gap-1 md:gap-2">
                {tech.Icon}
                <h2 className="text-md sm:text-xl md:text-2xl font-semibold">
                  {tech.name}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
