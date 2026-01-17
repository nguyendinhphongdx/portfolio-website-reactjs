"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import type { Experience } from "@/types/portfolio";

interface ExperienceEditorProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

const emptyExperience: Experience = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  highlights: [],
  location: "",
};

export function ExperienceEditor({ experiences, onChange }: ExperienceEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Experience>(emptyExperience);
  const [highlightInput, setHighlightInput] = useState("");

  const handleOpenDialog = (experience?: Experience, index?: number) => {
    if (experience && index !== undefined) {
      setFormData(experience);
      setEditingIndex(index);
    } else {
      setFormData(emptyExperience);
      setEditingIndex(null);
    }
    setHighlightInput("");
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.company || !formData.position || !formData.startDate) return;

    const updated = [...experiences];
    if (editingIndex !== null) {
      updated[editingIndex] = formData;
    } else {
      updated.unshift(formData);
    }
    onChange(updated);
    setIsDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setFormData({
      ...formData,
      highlights: [...(formData.highlights || []), highlightInput.trim()],
    });
    setHighlightInput("");
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
            <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Experience</h3>
            <p className="text-[11px] text-muted-foreground">
              {experiences.length} position{experiences.length !== 1 ? "s" : ""} added
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-1" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
              <DialogDescription>
                Add your work history and achievements
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position *</Label>
                  <Input
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    placeholder="Job title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="City, Country or Remote"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    placeholder="e.g., Jan 2022"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    value={formData.endDate || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    placeholder="e.g., Dec 2023"
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={formData.current}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      current: checked as boolean,
                      endDate: checked ? "" : formData.endDate,
                    })
                  }
                />
                <label
                  htmlFor="current"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I currently work here
                </label>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your role and responsibilities..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Key Achievements</Label>
                <div className="flex gap-2">
                  <Input
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    placeholder="Add an achievement..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addHighlight();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addHighlight}>
                    Add
                  </Button>
                </div>
                {formData.highlights && formData.highlights.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {formData.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm p-2 bg-muted rounded-lg"
                      >
                        <span className="flex-1">{highlight}</span>
                        <button
                          onClick={() => removeHighlight(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.company || !formData.position || !formData.startDate}
              >
                {editingIndex !== null ? "Save Changes" : "Add Experience"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Experience List */}
      {experiences.length > 0 ? (
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative rounded-xl border bg-card p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[14px]">{exp.position}</h4>
                    <p className="text-[13px] text-muted-foreground">
                      {exp.company}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-[12px] text-muted-foreground mt-2 line-clamp-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(exp, index)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {exp.current && (
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-medium rounded-full">
                  Current
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <Briefcase className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No experience added yet</p>
          <p className="text-[11px] text-muted-foreground mb-4">
            Add your work history to showcase your career journey
          </p>
        </div>
      )}
    </div>
  );
}
