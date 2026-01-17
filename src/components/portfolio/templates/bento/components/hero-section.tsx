"use client";

import type { PortfolioData } from "@/types/portfolio";

interface HeroSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

export function HeroSection({ data, primaryColor }: HeroSectionProps) {
  return (
    <div
      id="about"
      className="col-span-12 lg:col-span-8 bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-3xl p-8 lg:p-12 border border-white/5 relative overflow-hidden"
    >
      {/* Background gradient accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: primaryColor }}
      />

      <div className="relative z-10">
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: primaryColor }}
            />
            <span
              className="relative inline-flex rounded-full h-3 w-3"
              style={{ backgroundColor: primaryColor }}
            />
          </span>
          <span className="text-sm text-zinc-400">
            {data.tagline || "Available for work"}
          </span>
        </div>

        {/* Name */}
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4">
          {data.fullName || "Your Name"}
        </h1>

        {/* Title */}
        <p className="text-xl lg:text-2xl text-zinc-400 mb-6 max-w-2xl">
          {data.title || "Your Title"}
        </p>

        {/* Bio */}
        {data.bio && (
          <p className="text-zinc-500 leading-relaxed max-w-xl text-base lg:text-lg">
            {data.bio}
          </p>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {data.languages.map((lang, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-zinc-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                {lang.name}
                <span className="text-zinc-600">• {lang.level}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
