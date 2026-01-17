"use client";

import { Sparkles } from "lucide-react";
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

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groupedSkills = groupSkillsByCategory(skills);
  const categories = Object.keys(groupedSkills);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          Skills & Expertise
        </h2>

        {categories.length > 1 ? (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-white/70 mb-4">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {groupedSkills[category].map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="group backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4 hover:bg-white/20 transition-all hover:scale-105 hover:border-white/40">
      <p className="font-medium text-white text-center">
        {skill.name}
      </p>
      {skill.level && (
        <p className="text-xs text-white/50 text-center capitalize mt-1">
          {skill.level}
        </p>
      )}
    </div>
  );
}
