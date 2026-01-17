"use client";

import { GraduationCap, Award } from "lucide-react";
import type { Education } from "@/types/portfolio";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          Education
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6"
            >
              <p className="text-sm text-white/50 mb-2">
                {edu.startDate} — {edu.current ? "Present" : edu.endDate}
              </p>

              <h3 className="text-lg font-semibold text-white">
                {edu.degree}
              </h3>

              {edu.field && (
                <p className="text-white/70">{edu.field}</p>
              )}

              <p className="text-white/50">{edu.institution}</p>

              {edu.gpa && (
                <p className="flex items-center gap-1.5 text-sm text-white/40 mt-2">
                  <Award className="w-3.5 h-3.5" />
                  GPA: {edu.gpa}
                </p>
              )}

              {edu.description && (
                <p className="text-white/50 text-sm mt-3 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
