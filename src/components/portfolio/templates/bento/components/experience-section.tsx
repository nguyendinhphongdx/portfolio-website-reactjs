"use client";

import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import type { Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  experiences: Experience[];
  primaryColor: string;
}

export function ExperienceSection({ experiences, primaryColor }: ExperienceSectionProps) {
  return (
    <div id="experience" className="col-span-12 bg-zinc-900 rounded-3xl p-6 border border-white/5">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-4 h-4 text-zinc-600" />
        <p className="text-xs text-zinc-600 uppercase tracking-wider">
          Work Experience
        </p>
      </div>

      <div className="space-y-1">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            experience={exp}
            isFirst={index === 0}
            isLast={index === experiences.length - 1}
            primaryColor={primaryColor}
          />
        ))}
      </div>
    </div>
  );
}

interface ExperienceItemProps {
  experience: Experience;
  isFirst: boolean;
  isLast: boolean;
  primaryColor: string;
}

function ExperienceItem({ experience, isFirst, isLast, primaryColor }: ExperienceItemProps) {
  return (
    <div className="group relative flex gap-4 pb-6 last:pb-0">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-4 bottom-0 w-px bg-zinc-800" />
      )}

      {/* Timeline dot */}
      <div className="relative z-10 mt-1.5 shrink-0">
        <div
          className="w-3.5 h-3.5 rounded-full border-2 bg-zinc-900"
          style={{
            borderColor: isFirst ? primaryColor : "#3f3f46",
            backgroundColor: isFirst ? primaryColor : "transparent",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-4 border-b border-white/5 last:border-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-white text-lg">
              {experience.position}
            </h3>
            <p className="text-zinc-400 flex items-center gap-2">
              <span>{experience.company}</span>
              {experience.location && (
                <>
                  <span className="text-zinc-700">•</span>
                  <span className="flex items-center gap-1 text-sm text-zinc-500">
                    <MapPin className="w-3 h-3" />
                    {experience.location}
                  </span>
                </>
              )}
            </p>
          </div>
          <span className="text-sm text-zinc-600 whitespace-nowrap">
            {experience.startDate} — {experience.current ? "Present" : experience.endDate}
          </span>
        </div>

        {experience.description && (
          <p className="text-sm text-zinc-500 leading-relaxed mb-3">
            {experience.description}
          </p>
        )}

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <ul className="space-y-1.5">
            {experience.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-zinc-400"
              >
                <span
                  className="w-1 h-1 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: primaryColor }}
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
