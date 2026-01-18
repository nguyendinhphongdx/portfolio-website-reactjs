"use client";

import { useState } from "react";
import { Plus, Code2, Sparkles, Pencil, Trash2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { SortableList } from "@/components/ui/sortable-list";
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

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-dashed"
            onClick={() => {
              setNewSkill({ name: "", level: "intermediate", category: "" });
              setEditingIndex(null);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
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

      {/* Skills List */}
      {skills.length > 0 ? (
        <SortableList
          items={skills}
          onReorder={onChange}
          getItemId={(skill, index) => `skill-${index}-${skill.name}`}
          className="space-y-2"
          renderItem={(skill, index) => {
            const levelInfo = skillLevels.find((l) => l.value === skill.level);
            return (
              <div className="group flex items-center gap-3 p-3 rounded-xl border bg-card hover:shadow-sm transition-all">
                <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", levelInfo?.color || "bg-gray-500")} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[13px]">{skill.name}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{levelInfo?.label || "Intermediate"}</span>
                    {skill.category && (
                      <>
                        <span>•</span>
                        <span>{skill.category}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditSkill(skill, index)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDeleteSkill(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          }}
        />
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <Code2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No skills added yet</p>
          <p className="text-[11px] text-muted-foreground">
            Add your technical skills to showcase your expertise
          </p>
        </div>
      )}

      {/* Quick Add Suggestions */}
      {suggestedSkills.filter(
        (s) => !skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase())
      ).length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Quick add
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills
              .filter(
                (s) => !skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase())
              )
              .slice(0, 8)
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
      )}
    </div>
  );
}
