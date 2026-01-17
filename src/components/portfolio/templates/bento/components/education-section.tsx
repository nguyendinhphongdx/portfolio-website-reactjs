"use client";

import { GraduationCap, MapPin, Award } from "lucide-react";
import type { Education } from "@/types/portfolio";

interface EducationSectionProps {
  education: Education[];
  primaryColor: string;
}

export function EducationSection({ education, primaryColor }: EducationSectionProps) {
  return (
    <div className="col-span-12 lg:col-span-6 bg-zinc-900 rounded-3xl p-6 border border-white/5">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-4 h-4 text-zinc-600" />
        <p className="text-xs text-zinc-600 uppercase tracking-wider">
          Education
        </p>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <EducationItem
            key={index}
            education={edu}
            isFirst={index === 0}
            primaryColor={primaryColor}
          />
        ))}
      </div>
    </div>
  );
}

interface EducationItemProps {
  education: Education;
  isFirst: boolean;
  primaryColor: string;
}

function EducationItem({ education, isFirst, primaryColor }: EducationItemProps) {
  return (
    <div className="flex items-start gap-4 group">
      {/* Timeline dot */}
      <div
        className="w-2 h-2 rounded-full mt-2 shrink-0"
        style={{
          backgroundColor: isFirst ? primaryColor : "#3f3f46",
        }}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap mb-1">
          <h3 className="font-medium text-white">
            {education.degree}
          </h3>
          {education.field && (
            <>
              <span className="text-zinc-600">in</span>
              <span className="text-zinc-400">{education.field}</span>
            </>
          )}
        </div>

        <p className="text-sm text-zinc-500 mb-1">
          {education.institution}
        </p>

        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span>
            {education.startDate} — {education.current ? "Present" : education.endDate}
          </span>
          {education.gpa && (
            <>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                GPA: {education.gpa}
              </span>
            </>
          )}
        </div>

        {education.description && (
          <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
            {education.description}
          </p>
        )}
      </div>
    </div>
  );
}
