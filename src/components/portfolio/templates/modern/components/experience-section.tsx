"use client";

import { Briefcase, ArrowUpRight, MapPin } from "lucide-react";
import type { Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  experiences: Experience[];
  primaryColor: string;
}

export function ExperienceSection({ experiences, primaryColor }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="w-6 h-6" style={{ color: primaryColor }} />
          <h2 className="text-3xl font-bold">Work Experience</h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              primaryColor={primaryColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: Experience;
  primaryColor: string;
}

function ExperienceCard({ experience, primaryColor }: ExperienceCardProps) {
  return (
    <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
      {/* Date badge */}
      <div
        className="absolute top-8 right-8 px-4 py-1.5 rounded-full text-sm font-medium"
        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
      >
        {experience.startDate} — {experience.current ? "Present" : experience.endDate}
      </div>

      {/* Position */}
      <h3 className="text-2xl font-bold text-white mb-2 pr-40">
        {experience.position}
      </h3>

      {/* Company & Location */}
      <p className="text-lg font-medium mb-4" style={{ color: primaryColor }}>
        {experience.company}
        {experience.location && (
          <span className="text-white/40 font-normal inline-flex items-center gap-1 ml-2">
            <MapPin className="w-4 h-4" />
            {experience.location}
          </span>
        )}
      </p>

      {/* Description */}
      {experience.description && (
        <p className="text-white/60 leading-relaxed mb-4">
          {experience.description}
        </p>
      )}

      {/* Highlights */}
      {experience.highlights && experience.highlights.length > 0 && (
        <ul className="space-y-2">
          {experience.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-white/60"
            >
              <ArrowUpRight
                className="w-5 h-5 mt-0.5 shrink-0"
                style={{ color: primaryColor }}
              />
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
