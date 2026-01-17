"use client";

import type { PortfolioData, Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ExperienceSection({ data, primaryColor }: ExperienceSectionProps) {
  const experiences = data.experience || [];

  return (
    <section id="experience" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2
            className="inline-block px-6 py-3 text-4xl font-black uppercase border-4 border-black"
            style={{ backgroundColor: primaryColor, boxShadow: "6px 6px 0px 0px #000" }}
          >
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-black hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                primaryColor={primaryColor}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  primaryColor,
  index,
}: {
  experience: Experience;
  primaryColor: string;
  index: number;
}) {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF", "#DDA0DD", "#45B7D1"];
  const cardColor = colors[index % colors.length];

  return (
    <div className="relative md:pl-20">
      {/* Timeline Dot */}
      <div
        className="absolute left-4 w-8 h-8 border-4 border-black hidden md:flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: cardColor }}
      >
        {index + 1}
      </div>

      {/* Card */}
      <div
        className="border-4 border-black bg-white p-6"
        style={{ boxShadow: "6px 6px 0px 0px #000" }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-black uppercase">{experience.position}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span
                className="px-3 py-1 border-3 border-black font-bold text-sm"
                style={{ backgroundColor: cardColor }}
              >
                {experience.company}
              </span>
              {experience.location && (
                <span className="px-3 py-1 border-3 border-black font-semibold text-sm bg-gray-100">
                  📍 {experience.location}
                </span>
              )}
            </div>
          </div>

          {/* Date Badge */}
          <div
            className="px-4 py-2 border-4 border-black font-bold text-sm bg-[#FFE66D]"
            style={{ boxShadow: "3px 3px 0px 0px #000" }}
          >
            {formatDate(experience.startDate)} — {experience.current ? "Present" : experience.endDate ? formatDate(experience.endDate) : "Present"}
          </div>
        </div>

        {/* Description */}
        {experience.description && (
          <p className="text-gray-700 mb-4 border-l-4 border-black pl-4">
            {experience.description}
          </p>
        )}

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <div className="mt-4">
            <div className="font-bold text-sm uppercase mb-2">Key Achievements:</div>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 flex-shrink-0 border-2 border-black flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: cardColor }}
                  >
                    ✓
                  </span>
                  <span className="text-sm">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
