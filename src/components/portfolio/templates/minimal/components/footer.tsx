"use client";

import type { PortfolioData } from "@/types/portfolio";
import { getAllSocialLinks, getSocialLabel } from "../../_shared/utils";

interface FooterProps {
  data: PortfolioData;
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
