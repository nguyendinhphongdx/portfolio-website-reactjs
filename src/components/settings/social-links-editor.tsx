"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Dribbble,
  Youtube,
  Instagram,
  BookOpen,
  Code,
  Codepen,
  Facebook,
  MessageCircle,
  Send,
  Mail,
  Phone,
  MoreHorizontal,
  Pencil,
  Link as LinkIcon,
} from "lucide-react";
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
import type { SocialLink, SocialLinkType } from "@/types/portfolio";

interface SocialLinksEditorProps {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

// Social link configurations
const socialLinkConfigs: Record<
  SocialLinkType,
  { label: string; icon: React.ElementType; placeholder: string; color: string }
> = {
  github: {
    label: "GitHub",
    icon: Github,
    placeholder: "https://github.com/username",
    color: "text-gray-900 dark:text-white",
  },
  linkedin: {
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "https://linkedin.com/in/username",
    color: "text-blue-600",
  },
  twitter: {
    label: "Twitter / X",
    icon: Twitter,
    placeholder: "https://twitter.com/username",
    color: "text-sky-500",
  },
  website: {
    label: "Website",
    icon: Globe,
    placeholder: "https://yourwebsite.com",
    color: "text-emerald-600",
  },
  dribbble: {
    label: "Dribbble",
    icon: Dribbble,
    placeholder: "https://dribbble.com/username",
    color: "text-pink-500",
  },
  behance: {
    label: "Behance",
    icon: Globe,
    placeholder: "https://behance.net/username",
    color: "text-blue-500",
  },
  youtube: {
    label: "YouTube",
    icon: Youtube,
    placeholder: "https://youtube.com/@username",
    color: "text-red-600",
  },
  instagram: {
    label: "Instagram",
    icon: Instagram,
    placeholder: "https://instagram.com/username",
    color: "text-pink-600",
  },
  medium: {
    label: "Medium",
    icon: BookOpen,
    placeholder: "https://medium.com/@username",
    color: "text-gray-800 dark:text-gray-200",
  },
  devto: {
    label: "Dev.to",
    icon: Code,
    placeholder: "https://dev.to/username",
    color: "text-gray-900 dark:text-white",
  },
  stackoverflow: {
    label: "Stack Overflow",
    icon: Code,
    placeholder: "https://stackoverflow.com/users/123456",
    color: "text-orange-500",
  },
  codepen: {
    label: "CodePen",
    icon: Codepen,
    placeholder: "https://codepen.io/username",
    color: "text-gray-900 dark:text-white",
  },
  facebook: {
    label: "Facebook",
    icon: Facebook,
    placeholder: "https://facebook.com/username",
    color: "text-blue-600",
  },
  tiktok: {
    label: "TikTok",
    icon: MessageCircle,
    placeholder: "https://tiktok.com/@username",
    color: "text-gray-900 dark:text-white",
  },
  discord: {
    label: "Discord",
    icon: MessageCircle,
    placeholder: "https://discord.gg/invite",
    color: "text-indigo-500",
  },
  telegram: {
    label: "Telegram",
    icon: Send,
    placeholder: "https://t.me/username",
    color: "text-sky-500",
  },
  email: {
    label: "Email",
    icon: Mail,
    placeholder: "mailto:email@example.com",
    color: "text-gray-600",
  },
  phone: {
    label: "Phone",
    icon: Phone,
    placeholder: "tel:+1234567890",
    color: "text-green-600",
  },
  other: {
    label: "Other",
    icon: MoreHorizontal,
    placeholder: "https://example.com",
    color: "text-gray-500",
  },
};

const socialLinkTypes = Object.keys(socialLinkConfigs) as SocialLinkType[];

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function SocialLinksEditor({ links, onChange }: SocialLinksEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<SocialLink>({
    id: "",
    type: "website",
    url: "",
    label: "",
  });

  const handleOpenDialog = (link?: SocialLink, index?: number) => {
    if (link && index !== undefined) {
      setFormData(link);
      setEditingIndex(index);
    } else {
      setFormData({
        id: generateId(),
        type: "website",
        url: "",
        label: "",
      });
      setEditingIndex(null);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.url.trim()) return;

    const updated = [...links];
    if (editingIndex !== null) {
      updated[editingIndex] = formData;
    } else {
      updated.push(formData);
    }
    onChange(updated);
    setIsDialogOpen(false);
  };

  const handleDelete = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
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
            onClick={() => handleOpenDialog()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingIndex !== null ? "Edit Link" : "Add Link"}
              </DialogTitle>
              <DialogDescription>
                Add a social media or website link
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: SocialLinkType) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {socialLinkTypes.map((type) => {
                      const config = socialLinkConfigs[type];
                      const Icon = config.icon;
                      return (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            <Icon className={cn("h-4 w-4", config.color)} />
                            {config.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder={socialLinkConfigs[formData.type].placeholder}
                />
              </div>

              <div className="space-y-2">
                <Label>Custom Label (Optional)</Label>
                <Input
                  value={formData.label || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  placeholder={`e.g., "Work ${socialLinkConfigs[formData.type].label}"`}
                />
                <p className="text-[11px] text-muted-foreground">
                  Leave empty to use default label
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!formData.url.trim()}>
                {editingIndex !== null ? "Save Changes" : "Add Link"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      {/* Links List */}
      {links.length > 0 ? (
        <SortableList
          items={links}
          onReorder={onChange}
          getItemId={(link) => link.id}
          className="space-y-2"
          renderItem={(link, index) => {
            const config = socialLinkConfigs[link.type];
            const Icon = config.icon;
            return (
              <div className="group flex items-center gap-3 p-3 rounded-xl border bg-card hover:shadow-sm transition-all">
                <div className={cn("flex items-center justify-center w-9 h-9 rounded-lg bg-muted")}>
                  <Icon className={cn("h-5 w-5", config.color)} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[13px]">
                    {link.label || config.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {link.url}
                  </p>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleOpenDialog(link, index)}
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
            );
          }}
        />
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <LinkIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No social links added yet</p>
          <p className="text-[11px] text-muted-foreground mb-4">
            Add your social media profiles and websites
          </p>
        </div>
      )}

      {/* Quick Add Suggestions */}
      {links.length < 5 && (
        <div className="space-y-2">
          <p className="text-[11px] text-muted-foreground">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {["github", "linkedin", "twitter", "website"].map((type) => {
              const config = socialLinkConfigs[type as SocialLinkType];
              const Icon = config.icon;
              const alreadyAdded = links.some((l) => l.type === type);
              if (alreadyAdded) return null;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setFormData({
                      id: generateId(),
                      type: type as SocialLinkType,
                      url: "",
                      label: "",
                    });
                    setEditingIndex(null);
                    setIsDialogOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-[12px] rounded-lg border border-dashed hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <Icon className={cn("h-4 w-4", config.color)} />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
