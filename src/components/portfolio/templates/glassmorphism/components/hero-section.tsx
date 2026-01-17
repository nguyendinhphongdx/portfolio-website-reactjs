"use client";

import { MapPin, Sparkles } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface HeroSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

export function HeroSection({ data, primaryColor }: HeroSectionProps) {
  return (
    <section id="about" className="pt-20 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar with glow */}
            {data.avatar && (
              <div className="relative group">
                <div
                  className="absolute -inset-1 rounded-full opacity-75 blur group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(to right, ${primaryColor}, #ec4899, #06b6d4)`,
                  }}
                />
                <img
                  src={data.avatar}
                  alt={data.fullName || "Profile"}
                  className="relative w-40 h-40 rounded-full object-cover border-4 border-white/50"
                />
              </div>
            )}

            <div className="flex-1 text-center md:text-left">
              {/* Tagline */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                {data.tagline || "Available for work"}
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {data.fullName || "Your Name"}
              </h1>

              {/* Title */}
              {data.title && (
                <p className="text-xl md:text-2xl text-white/80 font-medium mb-4">
                  {data.title}
                </p>
              )}

              {/* Location & Timezone */}
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-4">
                {data.location && (
                  <p className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4" />
                    {data.location}
                  </p>
                )}
                {data.timezone && (
                  <span className="text-white/40">({data.timezone})</span>
                )}
              </div>

              {/* Bio */}
              {data.bio && (
                <p className="text-white/70 leading-relaxed max-w-2xl">
                  {data.bio}
                </p>
              )}

              {/* Languages */}
              {data.languages && data.languages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  {data.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/70 border border-white/20"
                    >
                      {lang.name} • {lang.level}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
