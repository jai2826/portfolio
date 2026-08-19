import { AnimatedSection } from '@/components/ui/animated-section';

const skills = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'shadcn/ui', 'Material UI', 'Redux', 'Jotai'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Hono.js'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'SQL', 'Appwrite Database', 'Convex'],
  },
  {
    category: 'APIs',
    items: ['REST API', 'GraphQL'],
  },
  {
    category: 'Authentication',
    items: ['Better Auth', 'Next Auth', 'Clerk', 'JWT', 'Session Management'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Vercel', 'Git', 'GitHub'],
  },
  {
    category: 'AI',
    items: ['RAG', 'Embeddings', 'Tool Calling', 'AI SDK', 'Vapi'],
  },
  {
    category: 'CS Fundamentals',
    items: ['OOP', 'DBMS', 'Data Structures', 'Algorithms'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-10 md:py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="rounded-2xl border border-zinc-800/60 bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-12">Skills</h2>
            <div className="flex flex-col gap-8">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h3 className="text-sm uppercase tracking-wider font-mono text-neon mb-4">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-md border border-zinc-800/90 bg-zinc-900/80 px-3 py-1.5 text-sm font-mono text-zinc-300 hover:border-neon-glow/40 hover:text-white transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Skills;
