'use client';

import { AnimatedSection } from '@/components/ui/animated-section';
import { useTilt } from '@/hooks/use-tilt';
import experiences from '@/data/experience.json';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  technologies?: string[];
  bullets: string[];
}

function ExperienceCard({ experience }: { experience: ExperienceItem }) {
  const { ref, style } = useTilt(5);

  return (
    <div
      ref={ref}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      className="rounded-xl border border-zinc-800/80 bg-[#0a0a0a]/80 backdrop-blur-md p-6 md:p-8 transition-all duration-300 hover:border-[#38BDF8]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800/60 pb-5 mb-5">
          <div>
            <h3 className="text-2xl font-bold text-zinc-50">{experience.role}</h3>
            <p className="text-neon text-base font-mono mt-1 font-medium">{experience.company}</p>
          </div>
          <div className="self-start sm:self-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 text-xs font-mono text-zinc-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38BDF8]">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {experience.period}
            </span>
          </div>
        </div>

        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/90 px-2.5 py-0.5 text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {experience.bullets && experience.bullets.length > 0 && (
          <ul className="space-y-3">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-neon mt-1 text-xs shrink-0">◆</span>
                <span className="text-sm text-zinc-400 leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-10 md:py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50">Work Experience</h2>
          </div>

          <div className="space-y-6">
            {(experiences as ExperienceItem[]).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Experience;
