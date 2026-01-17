"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, FolderKanban, ExternalLink, Github, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/types/portfolio";

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const emptyProject: Project = {
  name: "",
  description: "",
  url: "",
  github: "",
  technologies: [],
  image: "",
};

export function ProjectsEditor({ projects, onChange }: ProjectsEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Project>(emptyProject);
  const [techInput, setTechInput] = useState("");

  const handleOpenDialog = (project?: Project, index?: number) => {
    if (project && index !== undefined) {
      setFormData(project);
      setEditingIndex(index);
    } else {
      setFormData(emptyProject);
      setEditingIndex(null);
    }
    setTechInput("");
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) return;

    const updated = [...projects];
    if (editingIndex !== null) {
      updated[editingIndex] = formData;
    } else {
      updated.unshift(formData);
    }
    onChange(updated);
    setIsDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const addTechnology = () => {
    if (!techInput.trim()) return;
    if (formData.technologies?.includes(techInput.trim())) return;
    setFormData({
      ...formData,
      technologies: [...(formData.technologies || []), techInput.trim()],
    });
    setTechInput("");
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((t) => t !== tech),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10">
            <FolderKanban className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Projects</h3>
            <p className="text-[11px] text-muted-foreground">
              {projects.length} project{projects.length !== 1 ? "s" : ""} added
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Project" : "Add Project"}
              </DialogTitle>
              <DialogDescription>
                Showcase your best work and side projects
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="My Awesome Project"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe what the project does..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input
                    value={formData.url || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://myproject.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input
                    value={formData.github || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Image URL</Label>
                <Input
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/screenshot.png"
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addTechnology}>
                    Add
                  </Button>
                </div>
                {formData.technologies && formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="gap-1">
                        {tech}
                        <button onClick={() => removeTechnology(tech)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!formData.name}>
                {editingIndex !== null ? "Save Changes" : "Add Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects List */}
      {projects.length > 0 ? (
        <div className="grid gap-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-xl border bg-card p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <FolderKanban className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-[14px]">{project.name}</h4>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-muted"
                        >
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-muted"
                        >
                          <Github className="h-4 w-4 text-muted-foreground" />
                        </a>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleOpenDialog(project, index)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {project.description && (
                    <p className="text-[12px] text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] bg-muted rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-0.5 text-[10px] text-muted-foreground">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <FolderKanban className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No projects added yet</p>
          <p className="text-[11px] text-muted-foreground mb-4">
            Showcase your best work and side projects
          </p>
        </div>
      )}
    </div>
  );
}
