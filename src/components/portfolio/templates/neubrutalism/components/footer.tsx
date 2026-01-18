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
    <footer className="py-8 px-6 bg-black text-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <div
            className="px-4 py-2 border-4 border-white font-black text-xl uppercase"
            style={{ backgroundColor: primaryColor, color: "black" }}
          >
            {data.fullName?.split(" ")[0] || "Portfolio"}
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border-3 border-white font-bold text-sm uppercase hover:bg-white hover:text-black transition-colors"
                >
                  {link.label || getSocialLabel(link.type)}
                </a>
              ))}
            </div>
          )}

          {/* Copyright */}
          <p className="font-bold text-sm">
            © {currentYear} {data.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
