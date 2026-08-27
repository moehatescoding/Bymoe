export type ProjectCategory = 'Technology' | 'AI' | 'Business' | 'Automotive' | 'Creative' | 'Experiments';
export type ProjectStatus = 'Live' | 'In Progress' | 'Private' | 'Archived';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  isPublic: boolean; // Controls whether it renders on the public site
  images: string[];
  videoUrl?: string;
  externalUrl?: string; // Optional (e.g., if private or just an experiment without a link)
  role?: string;
}

export const projects: Project[] = [
  {
    id: 'z900-build',
    title: 'Kawasaki Z900 — The Build',
    description: 'My personal 2018 Kawasaki Z900 build, focused on keeping the raw character of the inline-four while adding carefully chosen performance, protection and aesthetic upgrades. A mix of DIY work, aftermarket parts and plenty of personal touches.',
    category: 'Automotive',
    year: 2026,
    status: 'Live',
    isPublic: true,
    images: [
      '/z900.png'
    ],
    role: 'Owner • Builder • Content Creator'
  }
];

export function getPublicProjects(): Project[] {
  return projects.filter(p => p.isPublic);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getActiveCategories(): ProjectCategory[] {
  const categories = new Set(getPublicProjects().map(p => p.category));
  return Array.from(categories);
}
