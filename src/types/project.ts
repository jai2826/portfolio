export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  technologies: string[];
  bullets: string[];
  links: ProjectLink[];
  order?: number;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectFormData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
