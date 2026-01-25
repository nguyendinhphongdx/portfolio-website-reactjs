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

  // ========== TEMPLATE-SPECIFIC SETTINGS ==========
  // Flexible JSON object to store template-specific settings
  // Each template can define its own fields
  templateSettings: Record<string, unknown> | null;

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

// Template-specific field configuration
export interface TemplateFieldConfig {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "boolean";
  placeholder?: string;
  description?: string;
  options?: { value: string; label: string }[]; // For select type
  defaultValue?: string | number | boolean;
}

export interface TemplateSettingsConfig {
  templateId: TemplateType;
  fields: TemplateFieldConfig[];
}

// Define fields for each template
export const TEMPLATE_SETTINGS_CONFIG: TemplateSettingsConfig[] = [
  {
    templateId: "glassmorphism",
    fields: [
      {
        key: "yearsExperience",
        label: "Years of Experience",
        type: "number",
        placeholder: "e.g., 5",
        description: "Override auto-calculated years (leave empty to auto-calculate)",
      },
      {
        key: "skillsCount",
        label: "Skills Count",
        type: "number",
        placeholder: "e.g., 20",
        description: "Override skills count (leave empty to use actual count)",
      },
      {
        key: "projectsCount",
        label: "Projects Count",
        type: "number",
        placeholder: "e.g., 10",
        description: "Override projects count (leave empty to use actual count)",
      },
      {
        key: "showStatsWidgets",
        label: "Show Stats Widgets",
        type: "boolean",
        description: "Show floating stats widgets around avatar",
        defaultValue: true,
      },
      {
        key: "heroStyle",
        label: "Hero Section Style",
        type: "select",
        options: [
          { value: "default", label: "Default (with particles)" },
          { value: "minimal", label: "Minimal (clean)" },
          { value: "animated", label: "Animated (more effects)" },
        ],
        defaultValue: "default",
      },
    ],
  },
  {
    templateId: "bento",
    fields: [
      {
        key: "gridStyle",
        label: "Grid Layout Style",
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "compact", label: "Compact" },
          { value: "spacious", label: "Spacious" },
        ],
        defaultValue: "default",
      },
      {
        key: "showQuote",
        label: "Show Quote Card",
        type: "boolean",
        description: "Display a quote/motto card in the grid",
        defaultValue: true,
      },
      {
        key: "quoteText",
        label: "Quote Text",
        type: "textarea",
        placeholder: "Your favorite quote or motto...",
      },
    ],
  },
  {
    templateId: "minimal",
    fields: [
      {
        key: "accentStyle",
        label: "Accent Style",
        type: "select",
        options: [
          { value: "underline", label: "Underline" },
          { value: "highlight", label: "Highlight" },
          { value: "none", label: "None" },
        ],
        defaultValue: "underline",
      },
    ],
  },
  {
    templateId: "modern",
    fields: [
      {
        key: "gradientIntensity",
        label: "Gradient Intensity",
        type: "select",
        options: [
          { value: "subtle", label: "Subtle" },
          { value: "medium", label: "Medium" },
          { value: "vibrant", label: "Vibrant" },
        ],
        defaultValue: "medium",
      },
      {
        key: "enableGlow",
        label: "Enable Glow Effects",
        type: "boolean",
        defaultValue: true,
      },
    ],
  },
  {
    templateId: "neubrutalism",
    fields: [
      {
        key: "shadowOffset",
        label: "Shadow Style",
        type: "select",
        options: [
          { value: "small", label: "Small (4px)" },
          { value: "medium", label: "Medium (8px)" },
          { value: "large", label: "Large (12px)" },
        ],
        defaultValue: "medium",
      },
      {
        key: "borderWidth",
        label: "Border Width",
        type: "select",
        options: [
          { value: "thin", label: "Thin (2px)" },
          { value: "medium", label: "Medium (3px)" },
          { value: "thick", label: "Thick (4px)" },
        ],
        defaultValue: "medium",
      },
    ],
  },
];

// Helper to get settings config for a template
export function getTemplateSettingsConfig(templateId: TemplateType): TemplateFieldConfig[] {
  const config = TEMPLATE_SETTINGS_CONFIG.find((c) => c.templateId === templateId);
  return config?.fields || [];
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
