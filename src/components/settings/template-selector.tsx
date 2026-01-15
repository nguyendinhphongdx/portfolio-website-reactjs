"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Check,
  Eye,
  Palette,
  Globe,
  Sparkles,
  Monitor,
  Code2,
  Zap,
  Paintbrush,
  Save,
  Layers,
  Camera,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TEMPLATES, type TemplateType } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface TemplatePreviewProps {
  type: TemplateType;
  isSelected: boolean;
  onClick: () => void;
}

const templateMeta: Record<
  TemplateType,
  {
    icon: React.ElementType;
    gradient: string;
    preview: string;
    accent: string;
  }
> = {
  minimal: {
    icon: Monitor,
    gradient: "from-slate-100 to-gray-50 dark:from-slate-800 dark:to-slate-900",
    preview: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700",
    accent: "bg-slate-200 dark:bg-slate-700",
  },
  modern: {
    icon: Sparkles,
    gradient: "from-blue-500 to-violet-600",
    preview: "bg-gradient-to-br from-blue-500 to-violet-600",
    accent: "bg-white/30",
  },
  creative: {
    icon: Paintbrush,
    gradient: "from-pink-500 via-rose-500 to-orange-400",
    preview: "bg-[#1a1a2e]",
    accent: "bg-white/40",
  },
  developer: {
    icon: Code2,
    gradient: "from-emerald-500 to-teal-600",
    preview: "bg-slate-950",
    accent: "bg-emerald-500/20",
  },
  designer: {
    icon: Layers,
    gradient: "from-indigo-500 to-purple-500",
    preview: "bg-[#fafafa]",
    accent: "bg-indigo-500/20",
  },
  photographer: {
    icon: Camera,
    gradient: "from-amber-500 to-orange-600",
    preview: "bg-black",
    accent: "bg-amber-500/20",
  },
  executive: {
    icon: Briefcase,
    gradient: "from-slate-700 to-slate-900",
    preview: "bg-white border border-slate-200",
    accent: "bg-slate-700/20",
  },
};

function TemplatePreview({ type, isSelected, onClick }: TemplatePreviewProps) {
  const template = TEMPLATES.find((t) => t.id === type)!;
  const meta = templateMeta[type];
  const IconComponent = meta.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative rounded-2xl border-2 p-1.5 transition-all duration-300",
        "hover:shadow-elevated hover:-translate-y-1",
        isSelected
          ? "border-primary ring-4 ring-primary/10 shadow-elegant"
          : "border-border hover:border-primary/30"
      )}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-scale-in">
          <Check className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}

      {/* Preview area */}
      <div
        className={cn(
          "aspect-[4/3] rounded-xl flex items-center justify-center overflow-hidden relative",
          meta.preview
        )}
      >
        {type === "minimal" && (
          <div className="text-center p-4 w-full">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-3" />
            <div className="h-2.5 w-20 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-2" />
            <div className="h-2 w-14 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto" />
            <div className="mt-4 flex justify-center gap-2">
              <div className="h-1.5 w-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="h-1.5 w-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="h-1.5 w-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
          </div>
        )}
        {type === "modern" && (
          <div className="text-center text-white p-4 w-full">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm mx-auto mb-3 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="h-2.5 w-24 bg-white/40 rounded-full mx-auto mb-2" />
            <div className="h-2 w-16 bg-white/20 rounded-full mx-auto" />
          </div>
        )}
        {type === "creative" && (
          <div className="text-center text-white p-4 w-full relative">
            <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-white/20 rotate-12" />
            <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-white/30" />
            <div className="w-14 h-14 rounded-2xl bg-white/30 mx-auto mb-3 rotate-6 flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6 -rotate-6" />
            </div>
            <div className="h-3 w-20 bg-white/50 rounded-full mx-auto" />
          </div>
        )}
        {type === "developer" && (
          <div className="text-left font-mono text-[10px] p-3 w-full">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="text-emerald-400 mb-0.5">$ whoami</div>
            <div className="text-slate-400 mb-1.5">developer</div>
            <div className="text-emerald-400">$ cat skills.json</div>
            <div className="text-blue-400 text-[9px]">{"{ ... }"}</div>
          </div>
        )}
        {type === "designer" && (
          <div className="text-center p-4 w-full">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 mx-auto mb-3 flex items-center justify-center">
              <Layers className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="h-2.5 w-20 bg-gray-200 rounded-full mx-auto mb-2" />
            <div className="h-2 w-16 bg-indigo-200 rounded-full mx-auto" />
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <div className="h-6 bg-gray-100 rounded" />
              <div className="h-6 bg-gray-100 rounded" />
            </div>
          </div>
        )}
        {type === "photographer" && (
          <div className="text-center text-white p-3 w-full">
            <Camera className="w-8 h-8 mx-auto mb-2 opacity-60" />
            <div className="h-2.5 w-20 bg-white/30 rounded-full mx-auto mb-1.5" />
            <div className="h-1.5 w-12 bg-amber-500/50 rounded-full mx-auto" />
            <div className="mt-3 flex gap-1 justify-center">
              <div className="w-4 h-6 bg-white/20 rounded-sm" />
              <div className="w-4 h-8 bg-white/15 rounded-sm" />
              <div className="w-4 h-5 bg-white/20 rounded-sm" />
            </div>
          </div>
        )}
        {type === "executive" && (
          <div className="text-center p-4 w-full">
            <div className="w-10 h-10 rounded bg-slate-800 mx-auto mb-3 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="h-2.5 w-24 bg-slate-200 rounded mx-auto mb-2" />
            <div className="h-1.5 w-16 bg-slate-800 rounded mx-auto" />
            <div className="mt-3 flex justify-center gap-4">
              <div className="text-center">
                <div className="text-[10px] font-bold text-slate-700">10+</div>
                <div className="text-[8px] text-slate-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-bold text-slate-700">50+</div>
                <div className="text-[8px] text-slate-400">Projects</div>
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-xl" />
      </div>

      {/* Info */}
      <div className="p-3 text-left">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br",
              meta.gradient
            )}
          >
            <IconComponent
              className={cn(
                "h-3.5 w-3.5",
                type === "minimal" || type === "designer" || type === "executive"
                  ? "text-slate-600 dark:text-slate-300"
                  : "text-white"
              )}
            />
          </div>
          <span className="font-semibold text-[14px]">{template.name}</span>
        </div>
        <p className="text-[12px] text-muted-foreground mt-1.5 line-clamp-2">
          {template.description}
        </p>
      </div>
    </button>
  );
}

const presetColors = [
  { color: "#3b82f6", name: "Blue" },
  { color: "#10b981", name: "Emerald" },
  { color: "#f59e0b", name: "Amber" },
  { color: "#ef4444", name: "Red" },
  { color: "#8b5cf6", name: "Violet" },
  { color: "#ec4899", name: "Pink" },
  { color: "#06b6d4", name: "Cyan" },
  { color: "#f97316", name: "Orange" },
];

export function TemplateSelector() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("minimal");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [isPublished, setIsPublished] = useState(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const response = await fetch("/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          setSelectedTemplate(data.template || "minimal");
          setPrimaryColor(data.primaryColor || "#3b82f6");
          setIsPublished(data.isPublished || false);
          setUsername(data.username || "");
        }
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  async function handleSave() {
    setIsSaving(true);
    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: selectedTemplate,
          primaryColor,
          isPublished,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      toast.success("Template settings saved!");
    } catch {
      toast.error("Failed to save template settings");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-muted animate-pulse" />
          <Loader2 className="absolute inset-0 m-auto h-5 w-5 animate-spin text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Template Selection */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10">
            <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Choose Template</h3>
            <p className="text-[12px] text-muted-foreground">
              Select a layout style for your portfolio
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES.map((template, index) => (
            <div
              key={template.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TemplatePreview
                type={template.id}
                isSelected={selectedTemplate === template.id}
                onClick={() => setSelectedTemplate(template.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Customization */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
            <Palette className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Customization</h3>
            <p className="text-[12px] text-muted-foreground">
              Personalize your portfolio appearance
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium">Primary Color</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-xl border-2 border-border shadow-sm relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: primaryColor }}
                >
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-24 font-mono text-[13px] h-9"
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {presetColors.map(({ color, name }) => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className={cn(
                    "group relative w-9 h-9 rounded-xl transition-all duration-200",
                    "hover:scale-110 hover:shadow-lg",
                    primaryColor === color
                      ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110"
                      : "hover:ring-2 hover:ring-offset-2 hover:ring-offset-background hover:ring-border"
                  )}
                  style={{ backgroundColor: color }}
                  title={name}
                >
                  {primaryColor === color && (
                    <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Publishing */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10">
            <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Publishing</h3>
            <p className="text-[12px] text-muted-foreground">
              Control the visibility of your portfolio
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[14px] font-medium">Publish Portfolio</span>
              {username ? (
                <p className="text-[13px] text-muted-foreground">
                  Your portfolio URL:{" "}
                  <a
                    href={`/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-primary hover:underline"
                  >
                    /{username}
                  </a>
                </p>
              ) : (
                <p className="text-[13px] text-muted-foreground">
                  Make your portfolio visible to visitors
                </p>
              )}
            </div>
            <Switch
              checked={isPublished}
              onCheckedChange={setIsPublished}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          {isPublished && username && (
            <div className="flex items-center gap-4 p-4 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 animate-fade-up">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[14px] text-emerald-700 dark:text-emerald-300">
                  Your portfolio is live!
                </p>
                <p className="text-[12px] text-emerald-600/80 dark:text-emerald-400/80 truncate">
                  Available at: <span className="font-mono">/{username}</span>
                </p>
              </div>
              <a
                href={`/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t">
        <p className="text-[13px] text-muted-foreground">
          Template changes will be reflected immediately
        </p>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="shadow-elegant min-w-[140px]"
        >
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
