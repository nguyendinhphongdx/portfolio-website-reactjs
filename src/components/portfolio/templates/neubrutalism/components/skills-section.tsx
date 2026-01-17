"use client";

import type { PortfolioData, Skill } from "@/types/portfolio";

interface SkillsSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function getSkillLevelWidth(level?: string): string {
  const widths: Record<string, string> = {
    beginner: "25%",
    intermediate: "50%",
    advanced: "75%",
    expert: "100%",
  };
  return widths[level || "intermediate"] || "50%";
}

function getSkillLevelLabel(level?: string): string {
  const labels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
  };
  return labels[level || "intermediate"] || "Intermediate";
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

const categoryColors: Record<string, string> = {
  "Frontend": "#FF6B6B",
  "Backend": "#4ECDC4",
  "Database": "#45B7D1",
  "DevOps": "#96CEB4",
  "Mobile": "#DDA0DD",
  "Design": "#FFE66D",
  "Tools": "#A8E6CF",
  "Other": "#F7DC6F",
};

export function SkillsSection({ data, primaryColor }: SkillsSectionProps) {
  const skills = data.skills || [];
  const groupedSkills = groupSkillsByCategory(skills);
  const hasCategories = Object.keys(groupedSkills).length > 1 || !groupedSkills["Other"];

  return (
    <section id="skills" className="py-16 px-6 bg-[#FFE66D] border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2
            className="inline-block px-6 py-3 text-4xl font-black uppercase border-4 border-black bg-white"
            style={{ boxShadow: "6px 6px 0px 0px #000" }}
          >
            Skills
          </h2>
        </div>

        {hasCategories ? (
          // Grouped Skills by Category
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <div
                  className="inline-block px-4 py-2 border-4 border-black font-bold text-lg uppercase mb-6"
                  style={{
                    backgroundColor: categoryColors[category] || primaryColor,
                    boxShadow: "4px 4px 0px 0px #000",
                  }}
                >
                  {category}
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} color={categoryColors[category] || primaryColor} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Flat Skills List
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} color={primaryColor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SkillCard({ skill, color }: { skill: Skill; color: string }) {
  return (
    <div
      className="p-4 border-4 border-black bg-white"
      style={{ boxShadow: "4px 4px 0px 0px #000" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">{skill.name}</span>
        <span
          className="px-2 py-1 border-2 border-black text-xs font-bold uppercase"
          style={{ backgroundColor: color }}
        >
          {getSkillLevelLabel(skill.level)}
        </span>
      </div>
      {/* Skill Bar */}
      <div className="h-4 border-2 border-black bg-gray-100">
        <div
          className="h-full border-r-2 border-black transition-all duration-500"
          style={{
            width: getSkillLevelWidth(skill.level),
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
