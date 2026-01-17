"use client";

import { MapPin } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface HeroSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

export function HeroSection({ data, primaryColor }: HeroSectionProps) {
  return (
    <section id="about" className="pt-20 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Avatar with glow effect */}
          {data.avatar && (
            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                style={{ backgroundColor: primaryColor }}
              />
              <img
                src={data.avatar}
                alt={data.fullName || "Profile"}
                className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-3xl object-cover border-2 border-white/10"
              />
            </div>
          )}

          <div className="flex-1 text-center lg:text-left">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: primaryColor }}
              />
              {data.tagline || "Available for work"}
            </div>

            {/* Name */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {data.fullName || "Developer"}
              </span>
            </h1>

            {/* Title */}
            {data.title && (
              <p
                className="text-2xl lg:text-3xl font-medium mb-6"
                style={{ color: primaryColor }}
              >
                {data.title}
              </p>
            )}

            {/* Bio */}
            {data.bio && (
              <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                {data.bio}
              </p>
            )}

            {/* Location & Languages */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              {data.location && (
                <p className="flex items-center gap-2 text-white/50">
                  <MapPin className="w-5 h-5" />
                  {data.location}
                </p>
              )}
              {data.timezone && (
                <span className="text-white/30">({data.timezone})</span>
              )}
            </div>

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                {data.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/60 border border-white/10"
                  >
                    {lang.name} • {lang.level}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
