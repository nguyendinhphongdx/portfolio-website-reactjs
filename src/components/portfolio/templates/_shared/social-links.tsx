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
  Facebook,
  MessageCircle,
  Send,
  Mail,
  Phone,
  LinkIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types/portfolio";

interface SocialLinksProps {
  links: SocialLink[] | null;
  variant?: "default" | "glass" | "brutal" | "minimal";
  className?: string;
  iconClassName?: string;
}

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  dribbble: Dribbble,
  behance: Globe,
  youtube: Youtube,
  instagram: Instagram,
  medium: BookOpen,
  devto: Code,
  stackoverflow: Code,
  codepen: Codepen,
  facebook: Facebook,
  tiktok: Globe,
  discord: MessageCircle,
  telegram: Send,
  email: Mail,
  phone: Phone,
  other: LinkIcon,
};

export function SocialLinks({
  links,
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

  if (!links || links.length === 0) return null;

  return (
    <div className={cn(style.container, className)}>
      {links.map((link) => {
        const Icon = iconMap[link.type] || LinkIcon;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
            title={link.label || link.type}
          >
            <Icon className={cn(style.icon, iconClassName)} />
          </a>
        );
      })}
    </div>
  );
}
