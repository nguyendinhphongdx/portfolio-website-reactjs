"use client";

import type { PortfolioData, SocialLink } from "@/types/portfolio";
import Image from "next/image";

interface HeroSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function getAllSocialLinks(data: PortfolioData): SocialLink[] {
  if (data.socialLinks && data.socialLinks.length > 0) {
    return data.socialLinks;
  }

  const links: SocialLink[] = [];
  if (data.github) links.push({ id: "github", type: "github", url: data.github });
  if (data.linkedin) links.push({ id: "linkedin", type: "linkedin", url: data.linkedin });
  if (data.twitter) links.push({ id: "twitter", type: "twitter", url: data.twitter });
  if (data.website) links.push({ id: "website", type: "website", url: data.website });
  if (data.instagram) links.push({ id: "instagram", type: "instagram", url: data.instagram });
  if (data.youtube) links.push({ id: "youtube", type: "youtube", url: data.youtube });

  return links;
}

function getSocialLabel(type: string): string {
  const labels: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    website: "Website",
    instagram: "Instagram",
    youtube: "YouTube",
    medium: "Medium",
    devto: "Dev.to",
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

function getLanguageLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    native: "Native",
    fluent: "Fluent",
    intermediate: "Intermediate",
    beginner: "Beginner",
  };
  return labels[level] || level;
}

export function HeroSection({ data, primaryColor }: HeroSectionProps) {
  const socialLinks = getAllSocialLinks(data);

  return (
    <section id="about" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8">
            {/* Tagline Badge */}
            {data.tagline && (
              <div
                className="inline-block px-4 py-2 border-4 border-black font-bold text-sm uppercase tracking-wide"
                style={{ backgroundColor: "#FFE66D", boxShadow: "4px 4px 0px 0px #000" }}
              >
                {data.tagline}
              </div>
            )}

            {/* Name */}
            <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tight leading-none">
              {data.fullName || "Your Name"}
            </h1>

            {/* Title */}
            {data.title && (
              <div
                className="inline-block px-6 py-3 border-4 border-black font-bold text-2xl"
                style={{ backgroundColor: primaryColor, boxShadow: "6px 6px 0px 0px #000" }}
              >
                {data.title}
              </div>
            )}

            {/* Bio */}
            {data.bio && (
              <p className="text-lg leading-relaxed border-l-4 border-black pl-6 max-w-xl">
                {data.bio}
              </p>
            )}

            {/* Location & Timezone */}
            <div className="flex flex-wrap gap-3">
              {data.location && (
                <div
                  className="px-4 py-2 border-4 border-black font-bold text-sm bg-[#A8E6CF]"
                  style={{ boxShadow: "3px 3px 0px 0px #000" }}
                >
                  📍 {data.location}
                </div>
              )}
              {data.timezone && (
                <div
                  className="px-4 py-2 border-4 border-black font-bold text-sm bg-[#DDA0DD]"
                  style={{ boxShadow: "3px 3px 0px 0px #000" }}
                >
                  🕐 {data.timezone}
                </div>
              )}
            </div>

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 border-3 border-black font-semibold text-sm bg-white"
                    style={{ boxShadow: "2px 2px 0px 0px #000" }}
                  >
                    {lang.name} ({getLanguageLevelLabel(lang.level)})
                  </div>
                ))}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-4 border-black font-bold text-sm uppercase bg-white hover:bg-black hover:text-white transition-colors"
                    style={{ boxShadow: "4px 4px 0px 0px #000" }}
                  >
                    {link.label || getSocialLabel(link.type)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right - Avatar */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background Shape */}
              <div
                className="absolute inset-0 border-4 border-black translate-x-4 translate-y-4"
                style={{ backgroundColor: primaryColor }}
              />

              {/* Avatar Container */}
              <div className="relative border-4 border-black bg-white overflow-hidden w-80 h-80 lg:w-96 lg:h-96">
                {data.avatar ? (
                  <Image
                    src={data.avatar}
                    alt={data.fullName || "Avatar"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-8xl font-black text-gray-300">
                      {data.fullName?.charAt(0) || "?"}
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div
                className="absolute -top-4 -right-4 w-12 h-12 border-4 border-black"
                style={{ backgroundColor: "#FFE66D" }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-8 h-8 border-4 border-black rotate-45"
                style={{ backgroundColor: "#A8E6CF" }}
              />
            </div>
          </div>
        </div>

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <div className="mt-16">
            <div
              className="inline-block px-4 py-2 border-4 border-black font-bold text-sm uppercase mb-6"
              style={{ backgroundColor: "#88D8B0", boxShadow: "3px 3px 0px 0px #000" }}
            >
              Interests
            </div>
            <div className="flex flex-wrap gap-3">
              {data.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border-4 border-black font-semibold bg-white"
                  style={{ boxShadow: "3px 3px 0px 0px #000" }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
