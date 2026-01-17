"use client";

import { Code2 } from "lucide-react";
import type { Skill } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: Skill[];
}

// Get level indicator color
function getLevelColor(level?: string): string {
  switch (level) {
    case "expert":
      return "bg-emerald-500";
    case "advanced":
      return "bg-blue-500";
    case "intermediate":
      return "bg-yellow-500";
    case "beginner":
      return "bg-zinc-500";
    default:
      return "bg-zinc-600";
  }
}

// Get level percentage for bar
function getLevelPercentage(level?: string): number {
  switch (level) {
    case "expert":
      return 100;
    case "advanced":
      return 75;
    case "intermediate":
      return 50;
    case "beginner":
      return 25;
    default:
      return 50;
  }
}

// Group skills by category
function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groupedSkills = groupSkillsByCategory(skills);
  const categories = Object.keys(groupedSkills);
  const hasCategories = categories.length > 1 || (categories.length === 1 && categories[0] !== "Other");

  return (
    <div className="col-span-12 bg-zinc-900 rounded-3xl p-6 border border-white/5">
      <div className="flex items-center gap-2 mb-6">
        <Code2 className="w-4 h-4 text-zinc-600" />
        <p className="text-xs text-zinc-600 uppercase tracking-wider">
          Technologies & Skills
        </p>
      </div>

      {hasCategories ? (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-zinc-400 mb-3">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {groupedSkills[category].map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <SkillBadge key={index} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}

function SkillBadge({ skill }: { skill: Skill }) {
  const levelColor = getLevelColor(skill.level);

  return (
    <span className="group relative px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 transition-colors cursor-default">
      <span className="flex items-center gap-2">
        {skill.level && (
          <span className={`w-1.5 h-1.5 rounded-full ${levelColor}`} />
        )}
        {skill.name}
      </span>

      {/* Tooltip with level */}
      {skill.level && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-zinc-800 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
        </span>
      )}
    </span>
  );
}
