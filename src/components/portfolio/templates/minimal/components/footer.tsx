"use client";

import type { PortfolioData, SocialLink } from "@/types/portfolio";

interface FooterProps {
  data: PortfolioData;
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
  if (data.youtube) links.push({ id: "youtube", type: "youtube", url: data.youtube });

  return links;
}

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
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

export function Footer({ data }: FooterProps) {
  const socialLinks = getAllSocialLinks(data);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-6 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {link.label || getSocialLabel(link.type)}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center">
          © {currentYear} {data.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
