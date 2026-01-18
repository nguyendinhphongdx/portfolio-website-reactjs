"use client";

import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Instagram,
  Youtube,
} from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import { getAllSocialLinks } from "../../_shared/utils";

interface HeaderProps {
  data: PortfolioData;
  primaryColor: string;
}

function getSocialIcon(type: string) {
  switch (type) {
    case "github": return Github;
    case "linkedin": return Linkedin;
    case "twitter": return Twitter;
    case "website": return Globe;
    case "instagram": return Instagram;
    case "youtube": return Youtube;
    default: return Globe;
  }
}

export function Header({ data, primaryColor }: HeaderProps) {
  const socialLinks = getAllSocialLinks(data).slice(0, 4);

  return (
    <nav className="relative z-50 sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
            style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
          >
            {data.fullName?.charAt(0) || "P"}
          </div>
          <span className="font-semibold text-white/90 hidden sm:block">
            {data.fullName?.split(" ")[0]}
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm text-white/60 hover:text-white transition-colors">
            About
          </a>
          {data.showExperience !== false && data.experience?.length && (
            <a href="#experience" className="text-sm text-white/60 hover:text-white transition-colors">
              Experience
            </a>
          )}
          {data.showProjects !== false && data.projects?.length && (
            <a href="#projects" className="text-sm text-white/60 hover:text-white transition-colors">
              Projects
            </a>
          )}
          <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Social & CTA */}
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            const Icon = getSocialIcon(link.type);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-105"
                aria-label={link.label || link.type}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="ml-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: primaryColor, boxShadow: `0 4px 20px -5px ${primaryColor}50` }}
            >
              Hire Me
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
