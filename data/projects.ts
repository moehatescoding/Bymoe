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
    id: 'project-1',
    title: '[QUESTION FOR MOE: First Project Title?]',
    description: '[QUESTION FOR MOE: Short description of the project?]',
    category: 'Technology',
    year: 2026,
    status: 'Live',
    isPublic: true,
    images: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop' // [QUESTION FOR MOE: Project Image?]
    ],
    role: '[QUESTION FOR MOE: Your Role?]'
  },
  {
    id: 'stealth-ai',
    title: 'Stealth AI Tool',
    description: 'An experimental autonomous agent interface focusing on voice-driven hardware interactions. Currently in closed alpha.',
    category: 'AI',
    year: 2026,
    status: 'In Progress',
    isPublic: true,
    images: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop'
    ],
    role: 'Founder'
  },
  {
    id: 'tracker-build',
    title: 'GT650 Tracker',
    description: 'Documenting and building a custom flat-tracker out of a Royal Enfield Continental GT 650. Stripping weight, upgrading suspension, and fabricating custom subframes.',
    category: 'Automotive',
    year: 2025,
    status: 'In Progress',
    isPublic: true,
    images: [
      'https://images.unsplash.com/photo-1609528148810-7db0774df2eb?q=80&w=1200&auto=format&fit=crop'
    ],
    externalUrl: '/garage'
  },
  {
    id: 'hidden-biz',
    title: 'Project X',
    description: 'A hardware supply chain logistics platform.',
    category: 'Business',
    year: 2024,
    status: 'Private',
    isPublic: false, // This will NOT render on the site
    images: [],
  },
  {
    id: 'bymoe-apparel',
    title: 'BYMOE Apparel',
    description: 'The original BYMOE e-commerce brand. Designed, sourced, and shipped premium streetwear globally before archiving the brand to pivot toward technology and content.',
    category: 'Business',
    year: 2023,
    status: 'Archived',
    isPublic: true,
    images: [
      'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1200&auto=format&fit=crop'
    ],
    role: 'Founder & Designer'
  }
];

// Helper to safely fetch only public projects
export function getPublicProjects(): Project[] {
  return projects.filter(p => p.isPublic);
}

// Get all unique categories that have at least one public project
export function getActiveCategories(): ProjectCategory[] {
  const publicProjects = getPublicProjects();
  const categories = new Set(publicProjects.map(p => p.category));
  return Array.from(categories);
}
