"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, GraduationCap, Calendar, MapPin } from "lucide-react";
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
import { SortableList } from "@/components/ui/sortable-list";
import type { Education } from "@/types/portfolio";

interface EducationEditorProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const emptyEducation: Education = {
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  current: false,
  gpa: "",
  description: "",
};

export function EducationEditor({ education, onChange }: EducationEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Education>(emptyEducation);

  const handleOpenDialog = (edu?: Education, index?: number) => {
    if (edu && index !== undefined) {
      setFormData(edu);
      setEditingIndex(index);
    } else {
      setFormData(emptyEducation);
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.institution || !formData.degree || !formData.startDate) return;

    const updated = [...education];
    if (editingIndex !== null) {
      updated[editingIndex] = formData;
    } else {
      updated.unshift(formData);
    }
    onChange(updated);
    setIsDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
            <GraduationCap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Education</h3>
            <p className="text-[11px] text-muted-foreground">
              {education.length} entr{education.length !== 1 ? "ies" : "y"} added
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-1" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Education" : "Add Education"}
              </DialogTitle>
              <DialogDescription>
                Add your educational background
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Institution *</Label>
                <Input
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  placeholder="University or School name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    value={formData.degree}
                    onChange={(e) =>
                      setFormData({ ...formData, degree: e.target.value })
                    }
                    placeholder="e.g., Bachelor's, Master's"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={formData.field || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, field: e.target.value })
                    }
                    placeholder="e.g., Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    placeholder="e.g., Sep 2018"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    value={formData.endDate || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    placeholder="e.g., Jun 2022"
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current-edu"
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
                  htmlFor="current-edu"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Currently studying here
                </label>
              </div>

              <div className="space-y-2">
                <Label>GPA (Optional)</Label>
                <Input
                  value={formData.gpa || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, gpa: e.target.value })
                  }
                  placeholder="e.g., 3.8/4.0"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Relevant coursework, achievements, activities..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.institution || !formData.degree || !formData.startDate}
              >
                {editingIndex !== null ? "Save Changes" : "Add Education"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Education List */}
      {education.length > 0 ? (
        <SortableList
          items={education}
          onReorder={onChange}
          getItemId={(_, index) => `edu-${index}`}
          className="space-y-3"
          renderItem={(edu, index) => (
            <div className="group relative rounded-xl border bg-card p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[14px]">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                    </h4>
                    <p className="text-[13px] text-muted-foreground">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                      </span>
                      {edu.gpa && (
                        <span>GPA: {edu.gpa}</span>
                      )}
                    </div>
                    {edu.description && (
                      <p className="text-[12px] text-muted-foreground mt-2 line-clamp-2">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(edu, index)}
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

              {edu.current && (
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-amber-500/10 text-amber-600 text-[10px] font-medium rounded-full">
                  Current
                </div>
              )}
            </div>
          )}
        />
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <GraduationCap className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No education added yet</p>
          <p className="text-[11px] text-muted-foreground mb-4">
            Add your educational background
          </p>
        </div>
      )}
    </div>
  );
}
