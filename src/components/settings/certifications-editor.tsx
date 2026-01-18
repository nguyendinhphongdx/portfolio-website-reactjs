"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, Award, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { Certification } from "@/types/portfolio";

interface CertificationsEditorProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

const emptyCertification: Certification = {
  name: "",
  issuer: "",
  date: "",
  expiryDate: "",
  url: "",
  credentialId: "",
};

export function CertificationsEditor({ certifications, onChange }: CertificationsEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Certification>(emptyCertification);

  const handleOpenDialog = (cert?: Certification, index?: number) => {
    if (cert && index !== undefined) {
      setFormData(cert);
      setEditingIndex(index);
    } else {
      setFormData(emptyCertification);
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.issuer) return;

    const updated = [...certifications];
    if (editingIndex !== null) {
      updated[editingIndex] = formData;
    } else {
      updated.unshift(formData);
    }
    onChange(updated);
    setIsDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10">
            <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Certifications</h3>
            <p className="text-[11px] text-muted-foreground">
              {certifications.length} certification{certifications.length !== 1 ? "s" : ""} added
            </p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-1" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Certification" : "Add Certification"}
              </DialogTitle>
              <DialogDescription>
                Add your professional certifications
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Certification Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., AWS Solutions Architect"
                />
              </div>

              <div className="space-y-2">
                <Label>Issuing Organization *</Label>
                <Input
                  value={formData.issuer}
                  onChange={(e) =>
                    setFormData({ ...formData, issuer: e.target.value })
                  }
                  placeholder="e.g., Amazon Web Services"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input
                    value={formData.date || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="e.g., Jan 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input
                    value={formData.expiryDate || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    placeholder="e.g., Jan 2027 (if applicable)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Credential ID</Label>
                <Input
                  value={formData.credentialId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, credentialId: e.target.value })
                  }
                  placeholder="e.g., ABC123XYZ"
                />
              </div>

              <div className="space-y-2">
                <Label>Credential URL</Label>
                <Input
                  value={formData.url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.name || !formData.issuer}
              >
                {editingIndex !== null ? "Save Changes" : "Add Certification"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Certifications List */}
      {certifications.length > 0 ? (
        <SortableList
          items={certifications}
          onReorder={onChange}
          getItemId={(_, index) => `cert-${index}`}
          className="space-y-3"
          renderItem={(cert, index) => (
            <div className="group relative rounded-xl border bg-card p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[14px]">
                      {cert.name}
                    </h4>
                    <p className="text-[13px] text-muted-foreground">
                      {cert.issuer}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-muted-foreground">
                      {cert.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {cert.date}
                          {cert.expiryDate && ` - ${cert.expiryDate}`}
                        </span>
                      )}
                      {cert.credentialId && (
                        <span>ID: {cert.credentialId}</span>
                      )}
                    </div>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[11px] text-emerald-600 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Credential
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(cert, index)}
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
          <Award className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No certifications added yet</p>
          <p className="text-[11px] text-muted-foreground mb-4">
            Add your professional certifications
          </p>
        </div>
      )}
    </div>
  );
}
