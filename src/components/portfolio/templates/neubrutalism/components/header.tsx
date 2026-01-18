"use client";

import type { PortfolioData } from "@/types/portfolio";
import { getAllSocialLinks, getSocialLabel } from "../../_shared/utils";

interface HeaderProps {
  data: PortfolioData;
  primaryColor: string;
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
