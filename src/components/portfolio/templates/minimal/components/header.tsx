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
    <nav className="sticky top-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <span
          className="text-sm font-semibold tracking-tight"
          style={{ color: primaryColor }}
        >
          {data.fullName?.split(" ")[0] || "Portfolio"}
        </span>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {data.showExperience !== false && data.experience?.length && (
            <a href="#experience" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Experience
            </a>
          )}
          {data.showProjects !== false && data.projects?.length && (
            <a href="#projects" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Projects
            </a>
          )}
          {data.showEducation !== false && data.education?.length && (
            <a href="#education" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Education
            </a>
          )}
          <a href="#contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-1">
          {socialLinks.map((link) => {
            const Icon = getSocialIcon(link.type);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={link.label || link.type}
              >
                <Icon className="w-4 h-4 text-gray-600" />
              </a>
            );
          })}
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="ml-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              Contact
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
