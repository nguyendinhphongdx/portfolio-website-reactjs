export interface Skill {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  category?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  highlights?: string[];
  location?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  gpa?: string;
  description?: string;
}

export interface Project {
  name: string;
  description?: string;
  url?: string;
  github?: string;
  technologies?: string[];
  image?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  expiryDate?: string;
  url?: string;
  credentialId?: string;
}

export interface PortfolioData {
  id: string;
  userId: string;

  // Personal info
  fullName: string | null;
  title: string | null;
  bio: string | null;
  avatar: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;

  // Social links
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  website: string | null;

  // Layout & Theme
  template: "minimal" | "modern" | "creative" | "developer";
  primaryColor: string;

  // Parsed CV data
  skills: Skill[] | null;
  experience: Experience[] | null;
  education: Education[] | null;
  projects: Project[] | null;
  certifications: Certification[] | null;

  isPublished: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export type TemplateType = "minimal" | "modern" | "creative" | "developer";

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design with focus on content",
    preview: "/templates/minimal.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Gradient backgrounds, glassmorphism effects, smooth animations",
    preview: "/templates/modern.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold colors, unique layouts, interactive elements",
    preview: "/templates/creative.png",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Terminal-inspired, code-focused, dark theme",
    preview: "/templates/developer.png",
  },
];
