"use client";

import type { PortfolioData, SocialLink } from "@/types/portfolio";

interface FooterProps {
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
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

export function Footer({ data, primaryColor }: FooterProps) {
  const socialLinks = getAllSocialLinks(data);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <p>
          © {currentYear} {data.fullName}. Crafted with passion.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              {link.label || getSocialLabel(link.type)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
