"use client";

import { cn } from "@/lib/utils";
import type { Skill } from "@/types/portfolio";

interface SkillBadgeProps {
  skill: Skill;
  variant?: "default" | "glass" | "brutal" | "bento";
  primaryColor?: string;
  className?: string;
  index?: number;
}

export function SkillBadge({
  skill,
  variant = "default",
  primaryColor,
  className,
  index = 0,
}: SkillBadgeProps) {
  const brutalColors = ["#facc15", "#a5f3fc", "#fda4af"];

  const variants = {
    default: {
      base: "px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors",
    },
    glass: {
      base: "px-4 py-2 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105 cursor-default",
    },
    brutal: {
      base: "px-5 py-3 border-3 border-black font-bold uppercase text-sm bg-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default",
    },
    bento: {
      base: "px-3 py-1.5 rounded-lg text-sm font-medium",
    },
  };

  const style = variants[variant];

  const getBrutalBg = () => brutalColors[index % brutalColors.length];

  return (
    <span
      className={cn(style.base, className)}
      style={
        variant === "brutal"
          ? { backgroundColor: getBrutalBg() }
          : variant === "bento" && primaryColor
          ? { backgroundColor: `${primaryColor}20`, color: primaryColor }
          : undefined
      }
    >
      {variant === "brutal" ? skill.name.toUpperCase() : skill.name}
      {variant === "glass" && skill.level && (
        <span className="text-xs text-white/50 ml-2 capitalize">
          {skill.level}
        </span>
      )}
    </span>
  );
}

interface SkillsGridProps {
  skills: Skill[];
  variant?: "default" | "glass" | "brutal" | "bento";
  primaryColor?: string;
  className?: string;
  maxItems?: number;
}

export function SkillsGrid({
  skills,
  variant = "default",
  primaryColor,
  className,
  maxItems,
}: SkillsGridProps) {
  const displaySkills = maxItems ? skills.slice(0, maxItems) : skills;
  const remaining = maxItems && skills.length > maxItems ? skills.length - maxItems : 0;

  const containerStyles = {
    default: "flex flex-wrap gap-2",
    glass: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3",
    brutal: "flex flex-wrap gap-3",
    bento: "flex flex-wrap gap-2",
  };

  return (
    <div className={cn(containerStyles[variant], className)}>
      {displaySkills.map((skill, index) => (
        <SkillBadge
          key={index}
          skill={skill}
          variant={variant}
          primaryColor={primaryColor}
          index={index}
        />
      ))}
      {remaining > 0 && (
        <span
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm",
            variant === "bento"
              ? "bg-white/10 text-white/50"
              : "bg-gray-100 text-gray-500"
          )}
        >
          +{remaining} more
        </span>
      )}
    </div>
  );
}
