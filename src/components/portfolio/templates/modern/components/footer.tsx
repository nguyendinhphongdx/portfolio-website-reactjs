"use client";

import type { PortfolioData } from "@/types/portfolio";
import { getAllSocialLinks, getSocialLabel } from "../../_shared/utils";

interface FooterProps {
  data: PortfolioData;
  primaryColor: string;
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
