"use client";

import { ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/portfolio";

interface ExperienceCardProps {
  experience: Experience;
  variant?: "default" | "glass" | "brutal" | "bento";
  primaryColor?: string;
  className?: string;
}

export function ExperienceCard({
  experience: exp,
  variant = "default",
  primaryColor,
  className,
}: ExperienceCardProps) {
  const dateRange = `${exp.startDate} — ${exp.current ? "Present" : exp.endDate}`;

  if (variant === "bento") {
    return (
      <div className={cn("border-l-2 border-white/10 pl-4", className)}>
        <p className="text-xs text-white/40 mb-1">{dateRange}</p>
        <p className="font-medium text-sm">{exp.position}</p>
        <p className="text-sm text-white/50">{exp.company}</p>
      </div>
    );
  }

  if (variant === "glass") {
    return (
      <div
        className={cn(
          "backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all",
          className
        )}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
            <p className="text-white/70 font-medium">
              {exp.company}
              {exp.location && (
                <span className="text-white/50"> · {exp.location}</span>
              )}
            </p>
            {exp.description && (
              <p className="text-white/60 mt-3 leading-relaxed">
                {exp.description}
              </p>
            )}
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-3 space-y-2">
                {exp.highlights.map((highlight, i) => (
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
              {dateRange}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "brutal") {
    return (
      <div
        className={cn(
          "border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
          className
        )}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-black uppercase text-black">
              {exp.position}
            </h3>
            <p className="text-lg font-bold">
              {exp.company}
              {exp.location && (
                <span className="text-black/50 font-medium">
                  {" "}
                  · {exp.location}
                </span>
              )}
            </p>
            {exp.description && (
              <p className="text-black/70 mt-3 leading-relaxed">
                {exp.description}
              </p>
            )}
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-4 space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-black/70">
                    <ArrowRight className="w-5 h-5 mt-0.5 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            className="shrink-0 px-4 py-2 border-3 border-black font-bold text-sm uppercase"
            style={{ backgroundColor: primaryColor || "#facc15" }}
          >
            {exp.startDate} — {exp.current ? "Now" : exp.endDate}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("group", className)}>
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="md:w-48 shrink-0">
          <p className="text-sm font-medium text-gray-400">{dateRange}</p>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            {exp.position}
          </h3>
          <p className="text-gray-600 font-medium" style={{ color: primaryColor }}>
            {exp.company}
            {exp.location && (
              <span className="text-gray-400 font-normal"> · {exp.location}</span>
            )}
          </p>
          {exp.description && (
            <p className="text-gray-600 mt-3 leading-relaxed">
              {exp.description}
            </p>
          )}
          {exp.highlights && exp.highlights.length > 0 && (
            <ul className="mt-3 space-y-2">
              {exp.highlights.map((highlight, i) => (
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
