"use client";

import { GraduationCap, Award } from "lucide-react";
import type { Education } from "@/types/portfolio";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-12 px-6 bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Education
        </h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <EducationItem key={index} education={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface EducationItemProps {
  education: Education;
}

function EducationItem({ education }: EducationItemProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4">
      {/* Date */}
      <div className="md:w-48 shrink-0">
        <p className="text-sm font-medium text-gray-400">
          {education.startDate} — {education.current ? "Present" : education.endDate}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">
          {education.degree}
        </h3>

        {education.field && (
          <p className="text-gray-600">{education.field}</p>
        )}

        <p className="text-gray-500">{education.institution}</p>

        {education.gpa && (
          <p className="flex items-center gap-1.5 text-sm text-gray-400 mt-2">
            <Award className="w-3.5 h-3.5" />
            GPA: {education.gpa}
          </p>
        )}

        {education.description && (
          <p className="text-gray-600 mt-3 leading-relaxed text-sm">
            {education.description}
          </p>
        )}
      </div>
    </div>
  );
}
