"use client";

import type { PortfolioData, Education } from "@/types/portfolio";

interface EducationSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function EducationSection({ data, primaryColor }: EducationSectionProps) {
  const education = data.education || [];

  return (
    <section id="education" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2
            className="inline-block px-6 py-3 text-4xl font-black uppercase border-4 border-black"
            style={{ backgroundColor: "#DDA0DD", boxShadow: "6px 6px 0px 0px #000" }}
          >
            Education
          </h2>
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  education,
  index,
}: {
  education: Education;
  index: number;
}) {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF", "#DDA0DD", "#45B7D1"];
  const cardColor = colors[index % colors.length];

  return (
    <div
      className="border-4 border-black bg-white p-6"
      style={{ boxShadow: "6px 6px 0px 0px #000" }}
    >
      {/* Institution Badge */}
      <div
        className="inline-block px-4 py-2 border-4 border-black font-bold text-sm uppercase mb-4"
        style={{ backgroundColor: cardColor, boxShadow: "3px 3px 0px 0px #000" }}
      >
        🎓 {education.institution}
      </div>

      {/* Degree & Field */}
      <h3 className="text-2xl font-black uppercase mb-2">{education.degree}</h3>
      {education.field && (
        <p className="text-lg font-semibold text-gray-700 mb-4">{education.field}</p>
      )}

      {/* Date & GPA Row */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div
          className="px-3 py-1 border-3 border-black font-semibold text-sm bg-[#FFE66D]"
          style={{ boxShadow: "2px 2px 0px 0px #000" }}
        >
          {formatDate(education.startDate)} — {education.current ? "Present" : education.endDate ? formatDate(education.endDate) : "Present"}
        </div>

        {education.gpa && (
          <div
            className="px-3 py-1 border-3 border-black font-bold text-sm bg-[#A8E6CF]"
            style={{ boxShadow: "2px 2px 0px 0px #000" }}
          >
            GPA: {education.gpa}
          </div>
        )}
      </div>

      {/* Description */}
      {education.description && (
        <p className="text-gray-600 border-l-4 border-black pl-4">
          {education.description}
        </p>
      )}
    </div>
  );
}
