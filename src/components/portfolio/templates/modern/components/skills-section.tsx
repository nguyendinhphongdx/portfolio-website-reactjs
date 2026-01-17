"use client";

import { Zap } from "lucide-react";
import type { Skill } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: Skill[];
  primaryColor: string;
}

function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    const category = skill.category || "Technologies";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

export function SkillsSection({ skills, primaryColor }: SkillsSectionProps) {
  const groupedSkills = groupSkillsByCategory(skills);
  const categories = Object.keys(groupedSkills);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Zap className="w-6 h-6" style={{ color: primaryColor }} />
          <h2 className="text-3xl font-bold">Skills & Expertise</h2>
        </div>

        {categories.length > 1 ? (
          <div className="space-y-10">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-white/70 mb-4">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {groupedSkills[category].map((skill, index) => (
                    <SkillCard key={index} skill={skill} primaryColor={primaryColor} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} primaryColor={primaryColor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface SkillCardProps {
  skill: Skill;
  primaryColor: string;
}

function SkillCard({ skill, primaryColor }: SkillCardProps) {
  return (
    <div className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all hover:scale-105 cursor-default">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 font-bold transition-colors"
        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
      >
        {skill.name.charAt(0)}
      </div>
      <p className="font-medium text-white/90">{skill.name}</p>
      {skill.level && (
        <p className="text-sm text-white/40 capitalize mt-1">{skill.level}</p>
      )}
    </div>
  );
}
