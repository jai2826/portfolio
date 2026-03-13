import { Stack } from "@/lib/tech-stack";

export const TechStack = () => {
  const stack = Stack;
  return (
    // h-full makes it fill the flex-1 parent
    // flex-col lets us split the header and the list
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="text-xl font-semibold shrink-0">Tech Stack</h1>
      
      {/* flex-1 here takes up all remaining space in the card */}
      <div className="w-full  flex flex-wrap gap-2 overflow-y-auto max-h-[300px] lg:max-h-[500px]">
        {stack.map((tech, index) => (
          <div key={index} className="p-2 md:p-4 rounded-lg w-fit h-fit">
            <div className="flex items-center gap-1 md:gap-2">
              {tech.Icon}
              <h2 className="text-md sm:text-xl font-semibold">
                {tech.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};