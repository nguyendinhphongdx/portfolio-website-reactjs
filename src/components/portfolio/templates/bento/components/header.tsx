"use client";

import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import type { PortfolioData, SocialLink } from "@/types/portfolio";

interface HeaderProps {
  data: PortfolioData;
  primaryColor: string;
}

// Helper to get all social links (combining legacy and new format)
function getAllSocialLinks(data: PortfolioData): SocialLink[] {
  if (data.socialLinks && data.socialLinks.length > 0) {
    return data.socialLinks;
  }

  // Fallback to legacy fields
  const links: SocialLink[] = [];
  if (data.github) links.push({ id: "github", type: "github", url: data.github });
  if (data.linkedin) links.push({ id: "linkedin", type: "linkedin", url: data.linkedin });
  if (data.twitter) links.push({ id: "twitter", type: "twitter", url: data.twitter });
  if (data.website) links.push({ id: "website", type: "website", url: data.website });
  if (data.instagram) links.push({ id: "instagram", type: "instagram", url: data.instagram });
  if (data.youtube) links.push({ id: "youtube", type: "youtube", url: data.youtube });

  return links;
}

// Get icon for social link type
function getSocialIcon(type: string) {
  switch (type) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "twitter":
      return Twitter;
    case "website":
      return Globe;
    case "instagram":
      return Instagram;
    case "youtube":
      return Youtube;
    case "discord":
    case "telegram":
      return MessageCircle;
    default:
      return Globe;
  }
}

export function Header({ data, primaryColor }: HeaderProps) {
  const socialLinks = getAllSocialLinks(data);
  const displayLinks = socialLinks.slice(0, 3); // Show max 3 in header

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <nav className="flex items-center justify-between rounded-full bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3">
          {/* Logo / Name */}
          <span className="font-semibold tracking-tight">
            {data.fullName?.split(" ")[0]?.toLowerCase() || "portfolio"}
          </span>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#about"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              About
            </a>
            {data.showExperience !== false && data.experience?.length && (
              <a
                href="#experience"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Experience
              </a>
            )}
            {data.showProjects !== false && data.projects?.length && (
              <a
                href="#projects"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Projects
              </a>
            )}
            <a
              href="#contact"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social Links & CTA */}
          <div className="flex items-center gap-1">
            {displayLinks.map((link) => {
              const Icon = getSocialIcon(link.type);
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={link.label || link.type}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="ml-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                style={{ backgroundColor: primaryColor, color: "white" }}
              >
                Contact
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
