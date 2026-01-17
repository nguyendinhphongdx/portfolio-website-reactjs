"use client";

import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Dribbble,
  Youtube,
  Instagram,
  BookOpen,
  Code,
  Codepen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioData } from "@/types/portfolio";

interface SocialLinksProps {
  data: Pick<
    PortfolioData,
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
  >;
  variant?: "default" | "glass" | "brutal" | "minimal";
  className?: string;
  iconClassName?: string;
}

const socialConfig = [
  { key: "github", icon: Github, label: "GitHub" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", icon: Twitter, label: "Twitter" },
  { key: "website", icon: Globe, label: "Website" },
  { key: "dribbble", icon: Dribbble, label: "Dribbble" },
  { key: "youtube", icon: Youtube, label: "YouTube" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "medium", icon: BookOpen, label: "Medium" },
  { key: "devto", icon: Code, label: "Dev.to" },
  { key: "codepen", icon: Codepen, label: "CodePen" },
] as const;

export function SocialLinks({
  data,
  variant = "default",
  className,
  iconClassName,
}: SocialLinksProps) {
  const variants = {
    default: {
      container: "flex items-center gap-2",
      link: "p-2 rounded-lg hover:bg-gray-100 transition-colors",
      icon: "w-5 h-5 text-gray-600",
    },
    glass: {
      container: "flex items-center gap-3",
      link: "p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-white",
      icon: "w-5 h-5",
    },
    brutal: {
      container: "flex items-center gap-4",
      link: "p-3 border-3 border-black bg-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all",
      icon: "w-6 h-6",
    },
    minimal: {
      container: "flex items-center gap-1",
      link: "p-2 rounded-lg hover:bg-gray-100 transition-colors",
      icon: "w-4 h-4 text-gray-600",
    },
  };

  const style = variants[variant];

  const links = socialConfig.filter(
    (social) => data[social.key as keyof typeof data]
  );

  if (links.length === 0) return null;

  return (
    <div className={cn(style.container, className)}>
      {links.map((social) => {
        const Icon = social.icon;
        const url = data[social.key as keyof typeof data];
        return (
          <a
            key={social.key}
            href={url as string}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
            title={social.label}
          >
            <Icon className={cn(style.icon, iconClassName)} />
          </a>
        );
      })}
    </div>
  );
}
