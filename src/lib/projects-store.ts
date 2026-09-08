import fs from 'fs/promises';
import path from 'path';
import { Project, ProjectFormData } from '@/types/project';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'projects.json');

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'infragen',
    title: 'Infragen',
    tagline: 'Autonomous DevOps & Kubernetes AI Agent',
    technologies: [
      'Next.js',
      'TypeScript',
      'Docker',
      'Kubernetes',
      'Gemini AI',
      'Prisma',
      'PostgreSQL',
      'SSE',
      'Tailwind CSS',
    ],
    bullets: [
      'Developed an autonomous AI agent translating natural-language app descriptions into production-grade Dockerfiles & Kubernetes manifests',
      'Orchestrated a 4-phase state-machine pipeline (Parse, Multi-Generate, Validate, Cost Estimate) powered by Google Gemini',
      'Engineered a deterministic self-healing validation loop that detects security flaws and unpinned images, automatically auto-fixing configs',
      'Integrated real-time Server-Sent Events (SSE) streaming for live lifecycle updates with interactive Monaco Editor previews',
      'Formulated itemized monthly cloud cost estimates ($/mo) covering CPU, memory, storage, and cluster control plane resources',
    ],
    links: [
      { label: 'Live Demo', url: 'https://infragen-theta.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/jai2826/infragen' },
    ],
    order: 1,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fynco',
    title: 'Fynco',
    tagline: 'SaaS Task Management Platform',
    technologies: [
      'Next.js',
      'TypeScript',
      'Appwrite',
      'Hono',
      'TanStack Query',
      'Shadcn UI',
      'Tailwind CSS',
    ],
    bullets: [
      'Developed a scalable SaaS task management platform using Next.js, TypeScript, Appwrite, Hono, and TanStack Query',
      'Implemented Kanban, Calendar, and Table views with real-time synchronization and optimized state management',
      'Built reusable UI components using React, Tailwind CSS, and shadcn/ui, improving maintainability',
      'Integrated REST APIs and optimized client-side caching for faster data retrieval',
      'Improved application performance through efficient rendering and optimized API requests',
    ],
    links: [
      { label: 'Live Dashboard', url: 'https://fynco-two.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/jai2826/fynco' },
    ],
    order: 2,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'trellis',
    title: 'Trellis',
    tagline: 'AI-Driven Customer Support Bot',
    technologies: [
      'Next.js',
      'Vapi',
      'Vercel AI SDK',
      'Convex',
      'Monorepo',
      'Shadcn UI',
      'RAG',
    ],
    bullets: [
      'Implemented Retrieval-Augmented Generation (RAG) using embeddings for contextual AI responses',
      'Built reusable chatbot widgets with secure cross-origin embedding',
      'Integrated voice AI using Vapi and AI SDK',
      'Designed a multi-tenant dashboard for organization-level bot management',
    ],
    links: [
      { label: 'Live Dashboard', url: 'https://trellis-web-kappa.vercel.app/' },
      { label: 'Widget Demo', url: 'https://trellis-widget.vercel.app/?organizationId=org_3DZJSzB9zejhwvPo0VMSPu2Gnik' },
      { label: 'GitHub', url: 'https://github.com/jai2826/trellis' },
    ],
    order: 3,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function ensureDataFileExists(): Promise<void> {
  try {
    await fs.access(DATA_FILE_PATH);
  } catch {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(INITIAL_PROJECTS, null, 2), 'utf-8');
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    await ensureDataFileExists();
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const projects: Project[] = JSON.parse(data);
    return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  } catch (error) {
    console.error('Error reading projects:', error);
    return INITIAL_PROJECTS;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id) || null;
}

export async function createProject(data: ProjectFormData): Promise<Project> {
  const projects = await getProjects();
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = `${slug || 'project'}-${Date.now().toString(36)}`;

  const newProject: Project = {
    ...data,
    id,
    order: data.order ?? projects.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projects.push(newProject);
  await saveProjects(projects);
  return newProject;
}

export async function updateProject(id: string, data: Partial<ProjectFormData>): Promise<Project | null> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = projects[index];
  const updated: Project = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  projects[index] = updated;
  await saveProjects(projects);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;

  await saveProjects(filtered);
  return true;
}

export async function reorderProjects(orderedIds: string[]): Promise<Project[]> {
  const projects = await getProjects();
  const projectMap = new Map(projects.map((p) => [p.id, p]));

  const updated: Project[] = [];
  orderedIds.forEach((id, index) => {
    const proj = projectMap.get(id);
    if (proj) {
      proj.order = index + 1;
      proj.updatedAt = new Date().toISOString();
      updated.push(proj);
      projectMap.delete(id);
    }
  });

  projectMap.forEach((proj) => {
    proj.order = updated.length + 1;
    updated.push(proj);
  });

  await saveProjects(updated);
  return updated;
}

async function saveProjects(projects: Project[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(projects, null, 2), 'utf-8');
}
