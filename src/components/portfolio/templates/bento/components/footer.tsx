"use client";

import {
  Heart,
} from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import { getAllSocialLinks, getSocialLabel } from "../../_shared/utils";

interface FooterProps {
  data: PortfolioData;
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
