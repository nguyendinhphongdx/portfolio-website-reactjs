"use client";

import { Github, Linkedin, Twitter, Globe, Instagram } from "lucide-react";
import type { PortfolioData, SocialLink } from "@/types/portfolio";

interface HeaderProps {
  data: PortfolioData;
  primaryColor: string;
}

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

  return links;
}

function getSocialIcon(type: string) {
  switch (type) {
    case "github": return Github;
    case "linkedin": return Linkedin;
    case "twitter": return Twitter;
    case "instagram": return Instagram;
    default: return Globe;
  }
}

export function Header({ data }: HeaderProps) {
  const socialLinks = getAllSocialLinks(data).slice(0, 3);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-white drop-shadow-lg">
          {data.fullName?.split(" ")[0] || "Portfolio"}
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm text-white/70 hover:text-white transition-colors">
            About
          </a>
          {data.showExperience !== false && data.experience?.length && (
            <a href="#experience" className="text-sm text-white/70 hover:text-white transition-colors">
              Experience
            </a>
          )}
          {data.showProjects !== false && data.projects?.length && (
            <a href="#projects" className="text-sm text-white/70 hover:text-white transition-colors">
              Projects
            </a>
          )}
          <a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            const Icon = getSocialIcon(link.type);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all text-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="ml-2 px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 font-medium text-white hover:bg-white/30 transition-all"
            >
              Contact
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
