"use client";

import { MapPin, Globe, Twitter, Linkedin, Github, Download } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import { getAllSocialLinks, getSocialLabel } from "../../_shared/utils";

interface HeroSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function getSocialIcon(type: string) {
  switch (type) {
    case "github": return Github;
    case "linkedin": return Linkedin;
    case "twitter": return Twitter;
    case "website": return Globe;
    default: return Globe;
  }
}

export function HeroSection({ data, primaryColor }: HeroSectionProps) {
  const socialLinks = getAllSocialLinks(data).slice(0, 3);

  return (
    <section className="pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Avatar */}
          {data.avatar && (
            <div className="shrink-0">
              <img
                src={data.avatar}
                alt={data.fullName || "Profile"}
                className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white shadow-lg"
              />
            </div>
          )}

          <div className="flex-1">
            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-3">
              {data.fullName || "Your Name"}
            </h1>

            {/* Title & Tagline */}
            {data.title && (
              <p className="text-xl text-gray-600 font-medium mb-2">{data.title}</p>
            )}
            {data.tagline && (
              <p className="text-lg text-gray-500 italic mb-4">"{data.tagline}"</p>
            )}

            {/* Location & Timezone */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {data.location && (
                <p className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  {data.location}
                </p>
              )}
              {data.timezone && (
                <p className="text-gray-400 text-sm">
                  ({data.timezone})
                </p>
              )}
            </div>

            {/* Bio */}
            {data.bio && (
              <p className="text-gray-600 leading-relaxed max-w-2xl mb-6">
                {data.bio}
              </p>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-gray-400">Languages:</span>
                {data.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                  >
                    {lang.name} ({lang.level})
                  </span>
                ))}
              </div>
            )}

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.type);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {link.label || getSocialLabel(link.type)}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
