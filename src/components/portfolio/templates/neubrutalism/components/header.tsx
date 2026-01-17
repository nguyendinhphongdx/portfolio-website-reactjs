"use client";

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

  return links;
}

function getSocialLabel(type: string): string {
  const labels: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    website: "Web",
    instagram: "Instagram",
    youtube: "YouTube",
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

export function Header({ data, primaryColor }: HeaderProps) {
  const socialLinks = getAllSocialLinks(data);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFEF0] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div
            className="px-4 py-2 border-4 border-black font-black text-xl uppercase tracking-tight"
            style={{ backgroundColor: primaryColor, boxShadow: "4px 4px 0px 0px #000" }}
          >
            {data.fullName?.split(" ")[0] || "Portfolio"}
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 border-4 border-black font-bold text-sm uppercase tracking-wide bg-white hover:bg-black hover:text-white transition-colors"
                style={{ boxShadow: "3px 3px 0px 0px #000" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="hidden lg:flex items-center gap-2">
            {socialLinks.slice(0, 3).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 border-4 border-black font-bold text-xs uppercase bg-[#A8E6CF] hover:bg-[#88D8B0] transition-colors"
                style={{ boxShadow: "3px 3px 0px 0px #000" }}
              >
                {link.label || getSocialLabel(link.type)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
