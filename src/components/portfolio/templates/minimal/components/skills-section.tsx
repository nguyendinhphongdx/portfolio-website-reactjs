"use client";

import type { Skill } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: Skill[];
}

function getLevelBadge(level?: string): string {
  switch (level) {
    case "expert": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "advanced": return "bg-blue-100 text-blue-700 border-blue-200";
    case "intermediate": return "bg-amber-100 text-amber-700 border-amber-200";
    case "beginner": return "bg-gray-100 text-gray-600 border-gray-200";
    default: return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

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
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
          Skills & Technologies
        </h2>

        {hasCategories ? (
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-600 mb-3">{category}</h3>
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
    </section>
  );
}

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <span
      className={`
        px-3 py-1.5 bg-white border rounded-lg text-sm font-medium
        hover:shadow-sm transition-all cursor-default
        ${skill.level ? getLevelBadge(skill.level) : "border-gray-200 text-gray-700"}
      `}
      title={skill.level ? `Level: ${skill.level}` : undefined}
    >
      {skill.name}
      {skill.level && (
        <span className="ml-1.5 text-xs opacity-60">
          • {skill.level}
        </span>
      )}
    </span>
  );
}
