"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Loader2,
  Check,
  Eye,
  EyeOff,
  Palette,
  Globe,
  Sparkles,
  Monitor,
  Save,
  Box,
  Square,
  LayoutGrid,
  Moon,
  Sun,
  Type,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TEMPLATES, type TemplateType, type PortfolioData } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { LivePreview } from "./live-preview";

interface TemplatePreviewProps {
  type: TemplateType;
  isSelected: boolean;
  onClick: () => void;
}

const templateMeta: Record<
  TemplateType,
  {
    icon: React.ElementType;
    gradient: string;
    preview: string;
    accent: string;
  }
> = {
  minimal: {
    icon: Monitor,
    gradient: "from-slate-100 to-gray-50 dark:from-slate-800 dark:to-slate-900",
    preview: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700",
    accent: "bg-slate-200 dark:bg-slate-700",
  },
  modern: {
    icon: Sparkles,
    gradient: "from-blue-500 to-violet-600",
    preview: "bg-gradient-to-br from-blue-500 to-violet-600",
    accent: "bg-white/30",
  },
  glassmorphism: {
    icon: Box,
    gradient: "from-cyan-400 to-blue-500",
    preview: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    accent: "bg-white/20",
  },
  neubrutalism: {
    icon: Square,
    gradient: "from-yellow-400 to-lime-500",
    preview: "bg-yellow-300",
    accent: "bg-black",
  },
  bento: {
    icon: LayoutGrid,
    gradient: "from-gray-800 to-gray-900",
    preview: "bg-[#0a0a0a]",
    accent: "bg-white/10",
  },
};

function TemplatePreviewCard({ type, isSelected, onClick }: TemplatePreviewProps) {
  const template = TEMPLATES.find((t) => t.id === type);
  if (!template) return null;

  const meta = templateMeta[type];
  const IconComponent = meta.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative rounded-xl border-2 p-1 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-0.5",
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-border hover:border-primary/30"
      )}
    >
      {isSelected && (
        <div className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-lg animate-scale-in">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}

      <div
        className={cn(
          "aspect-[4/3] rounded-lg flex items-center justify-center overflow-hidden relative",
          meta.preview
        )}
      >
        {type === "minimal" && (
          <div className="text-center p-2 w-full">
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-2" />
            <div className="h-1.5 w-12 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-1" />
            <div className="h-1 w-8 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto" />
          </div>
        )}
        {type === "modern" && (
          <div className="text-center text-white p-2 w-full">
            <div className="w-8 h-8 rounded-xl bg-white/20 mx-auto mb-2 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="h-1.5 w-14 bg-white/40 rounded-full mx-auto" />
          </div>
        )}
        {type === "glassmorphism" && (
          <div className="text-center text-white p-2 w-full">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm mx-auto mb-2 flex items-center justify-center border border-white/30">
              <Box className="w-4 h-4" />
            </div>
            <div className="h-1.5 w-12 bg-white/30 backdrop-blur-sm rounded-full mx-auto" />
          </div>
        )}
        {type === "neubrutalism" && (
          <div className="text-center p-2 w-full">
            <div className="w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mx-auto mb-2 flex items-center justify-center">
              <Square className="w-4 h-4" />
            </div>
            <div className="h-2 w-14 bg-black rounded-none mx-auto" />
          </div>
        )}
        {type === "bento" && (
          <div className="text-center text-white p-2 w-full">
            <div className="grid grid-cols-2 gap-1 mx-auto w-fit mb-2">
              <div className="w-4 h-4 bg-white/10 rounded" />
              <div className="w-4 h-6 bg-white/15 rounded row-span-2" />
              <div className="w-4 h-3 bg-white/10 rounded" />
            </div>
            <div className="h-1.5 w-10 bg-white/20 rounded-full mx-auto" />
          </div>
        )}

        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-lg" />
      </div>

      <div className="p-2 text-left">
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "w-5 h-5 rounded-md flex items-center justify-center bg-gradient-to-br",
              meta.gradient
            )}
          >
            <IconComponent
              className={cn(
                "h-3 w-3",
                type === "minimal" || type === "neubrutalism"
                  ? "text-slate-600 dark:text-slate-300"
                  : "text-white"
              )}
            />
          </div>
          <span className="font-medium text-[12px]">{template.name}</span>
        </div>
      </div>
    </button>
  );
}

const presetColors = [
  { color: "#3b82f6", name: "Blue" },
  { color: "#10b981", name: "Emerald" },
  { color: "#f59e0b", name: "Amber" },
  { color: "#ef4444", name: "Red" },
  { color: "#8b5cf6", name: "Violet" },
  { color: "#ec4899", name: "Pink" },
  { color: "#06b6d4", name: "Cyan" },
  { color: "#f97316", name: "Orange" },
  { color: "#84cc16", name: "Lime" },
  { color: "#14b8a6", name: "Teal" },
];

const fontFamilies = [
  { value: "inter", label: "Inter" },
  { value: "poppins", label: "Poppins" },
  { value: "roboto", label: "Roboto" },
  { value: "playfair", label: "Playfair Display" },
  { value: "space-grotesk", label: "Space Grotesk" },
  { value: "dm-sans", label: "DM Sans" },
];

const defaultPortfolioData: PortfolioData = {
  id: "",
  userId: "",
  fullName: "John Doe",
  title: "Senior Frontend Developer",
  tagline: "Building beautiful web experiences",
  bio: "Passionate developer with 5+ years of experience in React, TypeScript, and modern web technologies. I love creating intuitive user interfaces and solving complex problems.",
  avatar: null,
  coverImage: null,
  email: "john@example.com",
  phone: "+1 234 567 890",
  location: "San Francisco, CA",
  timezone: null,
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  twitter: "https://twitter.com/johndoe",
  website: "https://johndoe.dev",
  dribbble: null,
  behance: null,
  youtube: null,
  instagram: null,
  medium: null,
  devto: null,
  stackoverflow: null,
  codepen: null,
  socialLinks: [
    { id: "1", type: "github", url: "https://github.com/johndoe" },
    { id: "2", type: "linkedin", url: "https://linkedin.com/in/johndoe" },
    { id: "3", type: "twitter", url: "https://twitter.com/johndoe" },
    { id: "4", type: "website", url: "https://johndoe.dev" },
  ],
  template: "minimal",
  primaryColor: "#3b82f6",
  secondaryColor: null,
  accentColor: null,
  fontFamily: null,
  darkMode: false,
  showSkills: true,
  showExperience: true,
  showProjects: true,
  showEducation: true,
  showCertifications: true,
  showTestimonials: true,
  showBlog: false,
  showAchievements: true,
  skills: [
    { name: "React", level: "expert" },
    { name: "TypeScript", level: "expert" },
    { name: "Next.js", level: "advanced" },
    { name: "Node.js", level: "advanced" },
    { name: "Tailwind CSS", level: "expert" },
    { name: "PostgreSQL", level: "intermediate" },
  ],
  experience: [
    {
      company: "Tech Corp",
      position: "Senior Frontend Developer",
      startDate: "2022",
      current: true,
      description: "Leading frontend architecture and mentoring junior developers.",
      highlights: ["Reduced bundle size by 40%", "Implemented design system"],
      location: "San Francisco, CA",
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      startDate: "2019",
      endDate: "2022",
      description: "Built customer-facing applications with React and TypeScript.",
      location: "Remote",
    },
  ],
  education: [
    {
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015",
      endDate: "2019",
    },
  ],
  projects: [
    {
      name: "Portfolio Builder",
      description: "A modern portfolio website builder with multiple templates.",
      url: "https://portfolio.dev",
      github: "https://github.com/johndoe/portfolio",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    },
    {
      name: "Task Manager",
      description: "A collaborative task management application with real-time updates.",
      url: "https://tasks.dev",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    },
  ],
  certifications: [
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
  ],
  testimonials: [
    {
      name: "Jane Smith",
      role: "Product Manager",
      company: "Tech Corp",
      content: "John is an exceptional developer who consistently delivers high-quality work.",
    },
  ],
  achievements: [
    {
      title: "Employee of the Year",
      description: "Recognized for outstanding contributions",
      date: "2023",
      icon: "trophy",
    },
  ],
  blogPosts: null,
  languages: [
    { name: "English", level: "native" },
    { name: "Spanish", level: "intermediate" },
  ],
  interests: ["Open Source", "UI/UX Design", "Music Production"],
  seoTitle: null,
  seoDescription: null,
  ogImage: null,
  googleAnalyticsId: null,
  isPublished: false,
  customDomain: null,
  viewCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function TemplateSelector() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("minimal");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [username, setUsername] = useState<string>("");

  // Section visibility
  const [showSkills, setShowSkills] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showEducation, setShowEducation] = useState(true);
  const [showCertifications, setShowCertifications] = useState(true);
  const [showTestimonials, setShowTestimonials] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const response = await fetch("/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          setPortfolioData({ ...defaultPortfolioData, ...data });
          setSelectedTemplate(data.template || "minimal");
          setPrimaryColor(data.primaryColor || "#3b82f6");
          setSecondaryColor(data.secondaryColor || null);
          setFontFamily(data.fontFamily || null);
          setDarkMode(data.darkMode || false);
          setIsPublished(data.isPublished || false);
          setUsername(data.username || "");
          setShowSkills(data.showSkills ?? true);
          setShowExperience(data.showExperience ?? true);
          setShowProjects(data.showProjects ?? true);
          setShowEducation(data.showEducation ?? true);
          setShowCertifications(data.showCertifications ?? true);
          setShowTestimonials(data.showTestimonials ?? true);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  // Preview data that updates in real-time
  const previewData = useMemo<PortfolioData>(() => ({
    ...portfolioData,
    template: selectedTemplate,
    primaryColor,
    secondaryColor,
    fontFamily,
    darkMode,
    showSkills,
    showExperience,
    showProjects,
    showEducation,
    showCertifications,
    showTestimonials,
  }), [
    portfolioData,
    selectedTemplate,
    primaryColor,
    secondaryColor,
    fontFamily,
    darkMode,
    showSkills,
    showExperience,
    showProjects,
    showEducation,
    showCertifications,
    showTestimonials,
  ]);

  async function handleSave() {
    setIsSaving(true);
    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: selectedTemplate,
          primaryColor,
          secondaryColor,
          fontFamily,
          darkMode,
          isPublished,
          showSkills,
          showExperience,
          showProjects,
          showEducation,
          showCertifications,
          showTestimonials,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      toast.success("Template settings saved!");
    } catch {
      toast.error("Failed to save template settings");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-muted animate-pulse" />
          <Loader2 className="absolute inset-0 m-auto h-5 w-5 animate-spin text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10">
            <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Choose Template</h3>
            <p className="text-[11px] text-muted-foreground">
              Select a layout style for your portfolio
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {TEMPLATES.map((template) => (
            <TemplatePreviewCard
              key={template.id}
              type={template.id}
              isSelected={selectedTemplate === template.id}
              onClick={() => setSelectedTemplate(template.id)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setShowPreview(true)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          Preview Template
        </Button>
      </div>

      {/* Theme Customization */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
            <Palette className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Theme</h3>
            <p className="text-[11px] text-muted-foreground">
              Customize colors and typography
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-4">
          {/* Primary Color */}
          <div className="space-y-2">
            <Label className="text-[12px] font-medium">Primary Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg border-2 border-border shadow-sm relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-24 font-mono text-[12px] h-8"
                placeholder="#3b82f6"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presetColors.map(({ color, name }) => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className={cn(
                    "w-6 h-6 rounded-lg transition-all duration-200",
                    "hover:scale-110",
                    primaryColor === color
                      ? "ring-2 ring-offset-1 ring-offset-background ring-primary scale-110"
                      : ""
                  )}
                  style={{ backgroundColor: color }}
                  title={name}
                >
                  {primaryColor === color && (
                    <Check className="h-3 w-3 text-white m-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label className="text-[12px] font-medium flex items-center gap-2">
              <Type className="h-3.5 w-3.5" />
              Font Family
            </Label>
            <Select value={fontFamily || "inter"} onValueChange={setFontFamily}>
              <SelectTrigger className="h-9 text-[12px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value} className="text-[12px]">
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium flex items-center gap-2">
              {darkMode ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
              Dark Mode
            </Label>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="scale-90"
            />
          </div>
        </div>
      </div>

      {/* Section Visibility */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
            <Settings2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Sections</h3>
            <p className="text-[11px] text-muted-foreground">
              Toggle visibility of sections
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-3">
          {[
            { key: "skills", label: "Skills", state: showSkills, setter: setShowSkills },
            { key: "experience", label: "Experience", state: showExperience, setter: setShowExperience },
            { key: "projects", label: "Projects", state: showProjects, setter: setShowProjects },
            { key: "education", label: "Education", state: showEducation, setter: setShowEducation },
            { key: "certifications", label: "Certifications", state: showCertifications, setter: setShowCertifications },
            { key: "testimonials", label: "Testimonials", state: showTestimonials, setter: setShowTestimonials },
          ].map((section) => (
            <div key={section.key} className="flex items-center justify-between">
              <Label className="text-[12px] font-medium flex items-center gap-2">
                {section.state ? (
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                {section.label}
              </Label>
              <Switch
                checked={section.state}
                onCheckedChange={section.setter}
                className="scale-90"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Publishing */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10">
            <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Publishing</h3>
            <p className="text-[11px] text-muted-foreground">
              Control the visibility of your portfolio
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[13px] font-medium">Publish Portfolio</span>
              {username && (
                <p className="text-[11px] text-muted-foreground">
                  URL:{" "}
                  <a
                    href={`/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-primary hover:underline"
                  >
                    /{username}
                  </a>
                </p>
              )}
            </div>
            <Switch
              checked={isPublished}
              onCheckedChange={setIsPublished}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          {isPublished && username && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-emerald-700 dark:text-emerald-300">
                  Your portfolio is live!
                </p>
              </div>
              <a href={`/${username}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                  <Eye className="h-3 w-3" />
                  View
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full shadow-lg"
      >
        {isSaving ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Save Changes
      </Button>

      {/* Live Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Live Preview</DialogTitle>
          </DialogHeader>
          <LivePreview data={previewData} className="h-full" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
