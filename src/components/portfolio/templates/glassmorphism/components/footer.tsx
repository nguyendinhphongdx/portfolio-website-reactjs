"use client";

import type { PortfolioData } from "@/types/portfolio";

interface FooterProps {
  data: PortfolioData;
}

export function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white/40 text-sm">
          © {currentYear} {data.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
