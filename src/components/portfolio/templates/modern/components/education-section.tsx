"use client";

import { GraduationCap, Award } from "lucide-react";
import type { Education } from "@/types/portfolio";

interface EducationSectionProps {
  education: Education[];
  primaryColor: string;
}

export function EducationSection({ education, primaryColor }: EducationSectionProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <GraduationCap className="w-6 h-6" style={{ color: primaryColor }} />
          <h2 className="text-3xl font-bold">Education</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} primaryColor={primaryColor} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface EducationCardProps {
  education: Education;
  primaryColor: string;
}

function EducationCard({ education, primaryColor }: EducationCardProps) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
      {/* Date */}
      <p
        className="text-sm font-medium mb-3"
        style={{ color: primaryColor }}
      >
        {education.startDate} — {education.current ? "Present" : education.endDate}
      </p>

      {/* Degree */}
      <h3 className="text-xl font-bold text-white mb-1">
        {education.degree}
      </h3>

      {/* Field */}
      {education.field && (
        <p className="text-white/70 mb-2">{education.field}</p>
      )}

      {/* Institution */}
      <p className="text-white/50">{education.institution}</p>

      {/* GPA */}
      {education.gpa && (
        <p className="flex items-center gap-1.5 text-sm text-white/40 mt-3">
          <Award className="w-4 h-4" />
          GPA: {education.gpa}
        </p>
      )}

      {/* Description */}
      {education.description && (
        <p className="text-white/50 text-sm mt-3 leading-relaxed">
          {education.description}
        </p>
      )}
    </div>
  );
}
