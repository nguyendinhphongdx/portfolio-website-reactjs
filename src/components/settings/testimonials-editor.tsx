"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, Quote, User, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import type { Testimonial } from "@/types/portfolio";

interface TestimonialsEditorProps {
  testimonials: Testimonial[];
  onChange: (testimonials: Testimonial[]) => void;
}

const emptyTestimonial: Testimonial = {
  name: "",
  role: "",
  company: "",
  avatar: "",
  content: "",
  linkedinUrl: "",
};

export function TestimonialsEditor({ testimonials, onChange }: TestimonialsEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Testimonial>(emptyTestimonial);

  const handleOpenDialog = (testimonial?: Testimonial, index?: number) => {
    if (testimonial && index !== undefined) {
      setFormData(testimonial);
      setEditingIndex(index);
    } else {
      setFormData(emptyTestimonial);
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.content || !formData.role) return;

    const updated = [...testimonials];
    if (editingIndex !== null) {
      updated[editingIndex] = formData;
    } else {
      updated.push(formData);
    }
    onChange(updated);
    setIsDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    onChange(testimonials.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10">
            <Quote className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Testimonials</h3>
            <p className="text-[11px] text-muted-foreground">
              {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""} added
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-1" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
              <DialogDescription>
                Add recommendations from colleagues or clients
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Testimonial Content *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write the testimonial..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role/Title *</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="Product Manager"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={formData.company || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Company name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Avatar URL</Label>
                  <Input
                    value={formData.avatar || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, avatar: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn URL</Label>
                  <Input
                    value={formData.linkedinUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedinUrl: e.target.value })
                    }
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.name || !formData.content || !formData.role}
              >
                {editingIndex !== null ? "Save Changes" : "Add Testimonial"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Testimonials List */}
      {testimonials.length > 0 ? (
        <SortableList
          items={testimonials}
          onReorder={onChange}
          getItemId={(_, index) => `testimonial-${index}`}
          className="space-y-3"
          renderItem={(testimonial, index) => (
            <div className="group relative rounded-xl border bg-card p-4 hover:shadow-md transition-all">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/10" />

              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 pr-8 line-clamp-3">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-[13px] flex items-center gap-2">
                      {testimonial.name}
                      {testimonial.linkedinUrl && (
                        <a
                          href={testimonial.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(testimonial, index)}
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
            </div>
          )}
        />
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <Quote className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No testimonials added yet</p>
          <p className="text-[11px] text-muted-foreground mb-4">
            Add recommendations from colleagues or clients
          </p>
        </div>
      )}
    </div>
  );
}
