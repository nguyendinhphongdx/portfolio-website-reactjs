"use client";

import { Building2, ArrowRight, MapPin } from "lucide-react";
import type { Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  experiences: Experience[];
  primaryColor: string;
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          Experience
        </h2>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">
            {experience.position}
          </h3>

          <p className="text-white/70 font-medium flex items-center gap-2 flex-wrap">
            {experience.company}
            {experience.location && (
              <span className="text-white/50 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {experience.location}
              </span>
            )}
          </p>

          {experience.description && (
            <p className="text-white/60 mt-3 leading-relaxed">
              {experience.description}
            </p>
          )}

          {experience.highlights && experience.highlights.length > 0 && (
            <ul className="mt-3 space-y-2">
              {experience.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-white/60 text-sm"
                >
                  <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="shrink-0">
          <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
            {experience.startDate} — {experience.current ? "Present" : experience.endDate}
          </span>
        </div>
      </div>
    </div>
  );
}
