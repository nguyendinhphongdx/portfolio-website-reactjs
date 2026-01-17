"use client";

import {
  Eye,
  EyeOff,
  Settings2,
  Code2,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Award,
  Quote,
  Trophy,
  BookOpen,
  Languages,
  Heart,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SectionVisibility {
  showSkills: boolean;
  showExperience: boolean;
  showProjects: boolean;
  showEducation: boolean;
  showCertifications: boolean;
  showTestimonials: boolean;
  showBlog: boolean;
  showAchievements: boolean;
}

interface SectionSettingsProps {
  visibility: SectionVisibility;
  onChange: (key: keyof SectionVisibility, value: boolean) => void;
}

const sections: {
  key: keyof SectionVisibility;
  label: string;
  icon: React.ElementType;
  description?: string;
}[] = [
  {
    key: "showSkills",
    label: "Skills",
    icon: Code2,
    description: "Technical skills and technologies",
  },
  {
    key: "showExperience",
    label: "Experience",
    icon: Briefcase,
    description: "Work history and positions",
  },
  {
    key: "showProjects",
    label: "Projects",
    icon: FolderKanban,
    description: "Featured projects and work samples",
  },
  {
    key: "showEducation",
    label: "Education",
    icon: GraduationCap,
    description: "Academic background",
  },
  {
    key: "showCertifications",
    label: "Certifications",
    icon: Award,
    description: "Professional certifications",
  },
  {
    key: "showTestimonials",
    label: "Testimonials",
    icon: Quote,
    description: "Recommendations from colleagues",
  },
  {
    key: "showAchievements",
    label: "Achievements",
    icon: Trophy,
    description: "Awards and accomplishments",
  },
  {
    key: "showBlog",
    label: "Blog",
    icon: BookOpen,
    description: "Blog posts and articles",
  },
];

export function SectionSettings({ visibility, onChange }: SectionSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
          <Settings2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-[15px]">Section Visibility</h3>
          <p className="text-[11px] text-muted-foreground">
            Choose which sections to display on your portfolio
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card divide-y">
        {sections.map((section) => {
          const Icon = section.icon;
          const isVisible = visibility[section.key];

          return (
            <div
              key={section.key}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isVisible
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <Label className="text-[13px] font-medium cursor-pointer">
                    {section.label}
                  </Label>
                  {section.description && (
                    <p className="text-[11px] text-muted-foreground">
                      {section.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isVisible ? (
                  <Eye className="h-4 w-4 text-primary" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
                <Switch
                  checked={isVisible}
                  onCheckedChange={(checked) => onChange(section.key, checked)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground text-center">
        Hidden sections will not appear on your public portfolio
      </p>
    </div>
  );
}
