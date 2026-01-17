"use client";

import { Building2, ChevronRight, MapPin } from "lucide-react";
import type { Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  experiences: Experience[];
  primaryColor: string;
}

export function ExperienceSection({ experiences, primaryColor }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-12 px-6 bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Work Experience
        </h2>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <ExperienceItem
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

interface ExperienceItemProps {
  experience: Experience;
  primaryColor: string;
}

function ExperienceItem({ experience, primaryColor }: ExperienceItemProps) {
  return (
    <div className="group">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Date */}
        <div className="md:w-48 shrink-0">
          <p className="text-sm font-medium text-gray-400">
            {experience.startDate} — {experience.current ? "Present" : experience.endDate}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            {experience.position}
          </h3>

          <p className="font-medium" style={{ color: primaryColor }}>
            {experience.company}
            {experience.location && (
              <span className="text-gray-400 font-normal flex items-center gap-1 inline-flex ml-2">
                <MapPin className="w-3 h-3" />
                {experience.location}
              </span>
            )}
          </p>

          {experience.description && (
            <p className="text-gray-600 mt-3 leading-relaxed">
              {experience.description}
            </p>
          )}

          {experience.highlights && experience.highlights.length > 0 && (
            <ul className="mt-3 space-y-2">
              {experience.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-gray-600 text-sm"
                >
                  <ChevronRight
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: primaryColor }}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
