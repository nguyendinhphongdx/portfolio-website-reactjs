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

// NEW: Testimonial type
export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  linkedinUrl?: string;
}

// NEW: Achievement type
export interface Achievement {
  title: string;
  description?: string;
  date?: string;
  icon?: "trophy" | "medal" | "star" | "award" | "certificate";
  url?: string;
}

// NEW: BlogPost type
export interface BlogPost {
  title: string;
  description?: string;
  url: string;
  publishedAt?: string;
  platform?: "medium" | "devto" | "hashnode" | "personal" | "other";
  thumbnail?: string;
}

// NEW: Language type
export interface Language {
  name: string;
  level: "native" | "fluent" | "intermediate" | "beginner";
}

// Dynamic Social Link
export interface SocialLink {
  id: string;
  type: SocialLinkType;
  url: string;
  label?: string; // Custom label, e.g., "Work GitHub" vs "Personal GitHub"
}

export type SocialLinkType =
  | "github"
  | "linkedin"
  | "twitter"
  | "website"
  | "dribbble"
  | "behance"
  | "youtube"
  | "instagram"
  | "medium"
  | "devto"
  | "stackoverflow"
  | "codepen"
  | "facebook"
  | "tiktok"
  | "discord"
  | "telegram"
  | "email"
  | "phone"
  | "other";

// Social Link Config for UI
export interface SocialLinkConfig {
  type: SocialLinkType;
  label: string;
  placeholder: string;
  icon: string; // lucide icon name
  color: string; // brand color
}

export interface PortfolioData {
  id: string;
  userId: string;

  // ========== PERSONAL INFO ==========
  fullName: string | null;
  title: string | null;
  tagline: string | null;
  bio: string | null;
  avatar: string | null;
  coverImage: string | null;
  cvUrl: string | null;

  // ========== CONTACT ==========
  email: string | null;
  phone: string | null;
  location: string | null;
  timezone: string | null;

  // ========== SOCIAL LINKS (Dynamic) ==========
  socialLinks: SocialLink[] | null;

  // ========== THEME & CUSTOMIZATION ==========
  template: TemplateType;
  primaryColor: string;
  secondaryColor: string | null;
  accentColor: string | null;
  fontFamily: string | null;
  darkMode: boolean;

  // ========== SECTION VISIBILITY ==========
  showSkills: boolean;
  showExperience: boolean;
  showProjects: boolean;
  showEducation: boolean;
  showCertifications: boolean;
  showTestimonials: boolean;
  showBlog: boolean;
  showAchievements: boolean;

  // ========== CONTENT (JSON) ==========
  skills: Skill[] | null;
  experience: Experience[] | null;
  education: Education[] | null;
  projects: Project[] | null;
  certifications: Certification[] | null;
  testimonials: Testimonial[] | null;
  achievements: Achievement[] | null;
  blogPosts: BlogPost[] | null;
  languages: Language[] | null;
  interests: string[] | null;

  // ========== SEO & ANALYTICS ==========
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
  googleAnalyticsId: string | null;

  // ========== STATUS ==========
  isPublished: boolean;
  customDomain: string | null;
  viewCount: number;

  createdAt: Date;
  updatedAt: Date;
}

export type TemplateType =
  | "minimal"
  | "modern"
  | "glassmorphism"
  | "neubrutalism"
  | "bento";

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "bento",
    name: "Bento Grid",
    description: "Apple-inspired asymmetric grid, card-based sections",
    preview: "/templates/bento.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design with focus on content",
    preview: "/templates/minimal.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Gradient backgrounds, glow effects, smooth animations",
    preview: "/templates/modern.png",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Frosted glass effects, floating cards, gradient mesh backgrounds",
    preview: "/templates/glassmorphism.png",
  },
  {
    id: "neubrutalism",
    name: "Neubrutalism",
    description: "Bold borders, offset shadows, raw aesthetic, high contrast",
    preview: "/templates/neubrutalism.png",
  },
];
