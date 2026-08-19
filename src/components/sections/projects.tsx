'use client';

import { useState, useEffect } from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { useTilt } from '@/hooks/use-tilt';
import { Project } from '@/types/project';

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'fynco',
    title: 'Fynco',
    tagline: 'SaaS Task Management Platform',
    technologies: ['Next.js', 'TypeScript', 'Appwrite', 'Hono', 'TanStack Query', 'Shadcn UI', 'Tailwind CSS'],
    bullets: [
      'Developed a scalable SaaS task management platform using Next.js, TypeScript, Appwrite, Hono, and TanStack Query',
      'Implemented Kanban, Calendar, and Table views with real-time synchronization and optimized state management',
      'Built reusable UI components using React, Tailwind CSS, and shadcn/ui, improving maintainability',
      'Integrated REST APIs and optimized client-side caching for faster data retrieval',
      'Improved application performance through efficient rendering and optimized API requests',
    ],
    links: [
      { label: 'Live Dashboard', url: '#' },
      { label: 'GitHub', url: '#' },
    ],
    order: 1,
  },
  {
    id: 'trellis',
    title: 'Trellis',
    tagline: 'AI-Driven Customer Support Bot',
    technologies: ['Next.js', 'Vapi', 'Vercel AI SDK', 'Convex', 'Monorepo', 'Shadcn UI', 'RAG'],
    bullets: [
      'Implemented Retrieval-Augmented Generation (RAG) using embeddings for contextual AI responses',
      'Built reusable chatbot widgets with secure cross-origin embedding',
      'Integrated voice AI using Vapi and AI SDK',
      'Designed a multi-tenant dashboard for organization-level bot management',
    ],
    links: [
      { label: 'Live Dashboard', url: 'https://trellis-web-kappa.vercel.app/' },
      { label: 'Widget Demo', url: '#' },
      { label: 'GitHub', url: 'https://github.com/jai2826/trellis' },
    ],
    order: 2,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const { ref, style } = useTilt(7);

  return (
    <div 
      ref={ref}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      className="rounded-xl border border-zinc-800/80 bg-[#0a0a0a]/80 backdrop-blur-md p-6 md:p-8 transition-all duration-300 hover:border-[#38BDF8]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] flex flex-col justify-between"
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-2xl font-bold text-zinc-50">{project.title}</h3>
        <p className="text-[#00D9FF] text-sm font-mono mt-1">{project.tagline}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap mt-4 gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/90 px-2.5 py-0.5 text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {project.bullets && project.bullets.length > 0 && (
          <ul className="mt-6 space-y-3">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#00D9FF] mt-1 text-xs shrink-0">◆</span>
                <span className="text-sm text-zinc-400 leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {project.links && project.links.length > 0 && (
        <div style={{ transform: 'translateZ(25px)' }} className="pt-8 flex flex-wrap gap-3">
          {project.links.map((link, idx) => (
            <a 
              key={idx}
              href={link.url || '#'} 
              target={link.url && link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url && link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 hover:border-[#38BDF8]/50 hover:text-white hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all"
            >
              <span>{link.label}</span>
              <ExternalLinkIcon />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Projects({ initialProjects }: { initialProjects?: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || DEFAULT_PROJECTS);

  useEffect(() => {
    let isSubscribed = true;

    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data: Project[] = await res.json();
          if (isSubscribed && Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        console.error('Could not fetch projects:', err);
      }
    }

    loadProjects();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <section id="projects" className="py-10 md:py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50">Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Projects;
