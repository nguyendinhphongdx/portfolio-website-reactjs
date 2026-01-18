"use client";

import { useState } from "react";
import { ChevronDown, Loader2, Save, Check } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  icon: React.ElementType;
  iconColor?: string;
  bgColor?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onSave?: () => Promise<void>;
  isSaving?: boolean;
  badge?: string | number;
}

export function CollapsibleSection({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  bgColor = "bg-primary/10",
  children,
  defaultOpen = false,
  onSave,
  isSaving = false,
  badge,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = async () => {
    if (onSave) {
      await onSave();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-sm">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left">
            <div className={cn("flex items-center justify-center w-9 h-9 rounded-lg", bgColor)}>
              <Icon className={cn("h-4 w-4", iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm">{title}</h3>
                {badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground">
                    {badge}
                  </span>
                )}
              </div>
              {description && (
                <p className="text-[11px] text-muted-foreground truncate">{description}</p>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 pt-1 border-t bg-muted/30">
            {children}

            {/* Save button at bottom of content */}
            {onSave && (
              <div className="mt-4 pt-4 border-t flex justify-end">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className={cn(
                    "h-9 px-4",
                    justSaved && "bg-green-600 hover:bg-green-700"
                  )}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : justSaved ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
