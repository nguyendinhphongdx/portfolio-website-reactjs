"use client";

import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  Heart,
} from "lucide-react";
import type { PortfolioData, SocialLink } from "@/types/portfolio";

interface FooterProps {
  data: PortfolioData;
}

// Helper to get all social links
function getAllSocialLinks(data: PortfolioData): SocialLink[] {
  if (data.socialLinks && data.socialLinks.length > 0) {
    return data.socialLinks;
  }

  const links: SocialLink[] = [];
  if (data.github) links.push({ id: "github", type: "github", url: data.github });
  if (data.linkedin) links.push({ id: "linkedin", type: "linkedin", url: data.linkedin });
  if (data.twitter) links.push({ id: "twitter", type: "twitter", url: data.twitter });
  if (data.website) links.push({ id: "website", type: "website", url: data.website });
  if (data.instagram) links.push({ id: "instagram", type: "instagram", url: data.instagram });
  if (data.youtube) links.push({ id: "youtube", type: "youtube", url: data.youtube });
  if (data.medium) links.push({ id: "medium", type: "medium", url: data.medium });
  if (data.devto) links.push({ id: "devto", type: "devto", url: data.devto });

  return links;
}

// Get label for social link type
function getSocialLabel(type: string): string {
  const labels: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    website: "Website",
    instagram: "Instagram",
    youtube: "YouTube",
    medium: "Medium",
    devto: "Dev.to",
    dribbble: "Dribbble",
    behance: "Behance",
    stackoverflow: "Stack Overflow",
    codepen: "CodePen",
    facebook: "Facebook",
    tiktok: "TikTok",
    discord: "Discord",
    telegram: "Telegram",
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

export function Footer({ data }: FooterProps) {
  const socialLinks = getAllSocialLinks(data);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Top section with social links */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                {link.label || getSocialLabel(link.type)}
              </a>
            ))}
          </div>
        )}

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-600">
          <p>
            © {currentYear} {data.fullName || "Portfolio"}. All rights reserved.
          </p>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
