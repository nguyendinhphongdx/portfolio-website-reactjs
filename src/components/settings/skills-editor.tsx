"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical, Code2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types/portfolio";

interface SkillsEditorProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const skillLevels = [
  { value: "beginner", label: "Beginner", color: "bg-gray-500" },
  { value: "intermediate", label: "Intermediate", color: "bg-blue-500" },
  { value: "advanced", label: "Advanced", color: "bg-purple-500" },
  { value: "expert", label: "Expert", color: "bg-emerald-500" },
];

const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "Design",
  "AI/ML",
  "Other",
];

const suggestedSkills = [
  "React", "TypeScript", "JavaScript", "Next.js", "Node.js",
  "Python", "Java", "Go", "Rust", "SQL",
  "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes",
  "AWS", "GCP", "Azure", "Git", "GraphQL",
  "Tailwind CSS", "Figma", "REST API", "CI/CD",
];

export function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    level: "intermediate",
    category: "",
  });

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;

    if (editingIndex !== null) {
      const updated = [...skills];
      updated[editingIndex] = newSkill;
      onChange(updated);
    } else {
      onChange([...skills, newSkill]);
    }

    setNewSkill({ name: "", level: "intermediate", category: "" });
    setEditingIndex(null);
    setIsDialogOpen(false);
  };

  const handleEditSkill = (skill: Skill, index: number) => {
    setNewSkill(skill);
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleQuickAdd = (skillName: string) => {
    if (skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      return;
    }
    onChange([...skills, { name: skillName, level: "intermediate" }]);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10">
            <Code2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Skills</h3>
            <p className="text-[11px] text-muted-foreground">
              {skills.length} skill{skills.length !== 1 ? "s" : ""} added
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              onClick={() => {
                setNewSkill({ name: "", level: "intermediate", category: "" });
                setEditingIndex(null);
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Skill" : "Add Skill"}
              </DialogTitle>
              <DialogDescription>
                Add your technical skills and expertise level
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  placeholder="e.g., React, Python, Figma"
                />
              </div>

              <div className="space-y-2">
                <Label>Proficiency Level</Label>
                <Select
                  value={newSkill.level || "intermediate"}
                  onValueChange={(value) =>
                    setNewSkill({
                      ...newSkill,
                      level: value as Skill["level"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className={cn("w-2 h-2 rounded-full", level.color)}
                          />
                          {level.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category (Optional)</Label>
                <Select
                  value={newSkill.category || ""}
                  onValueChange={(value) =>
                    setNewSkill({ ...newSkill, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSkill} disabled={!newSkill.name.trim()}>
                {editingIndex !== null ? "Save Changes" : "Add Skill"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills List */}
      {skills.length > 0 ? (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="space-y-2">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => {
                  const skillIndex = skills.findIndex((s) => s === skill);
                  const levelInfo = skillLevels.find(
                    (l) => l.value === skill.level
                  );
                  return (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="group px-3 py-1.5 text-[12px] cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => handleEditSkill(skill, skillIndex)}
                    >
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full mr-2",
                          levelInfo?.color || "bg-gray-500"
                        )}
                      />
                      {skill.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSkill(skillIndex);
                        }}
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <Code2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No skills added yet</p>
          <p className="text-[11px] text-muted-foreground mb-4">
            Add your technical skills to showcase your expertise
          </p>
        </div>
      )}

      {/* Quick Add Suggestions */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          Quick add suggestions
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedSkills
            .filter(
              (s) => !skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase())
            )
            .slice(0, 10)
            .map((skill) => (
              <button
                key={skill}
                onClick={() => handleQuickAdd(skill)}
                className="px-2.5 py-1 text-[11px] rounded-md border border-dashed hover:border-primary hover:bg-primary/5 transition-colors"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
