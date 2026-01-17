"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-2xl border bg-card overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors text-left">
            <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl", bgColor)}>
              <Icon className={cn("h-5 w-5", iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[15px]">{title}</h3>
              <p className="text-[12px] text-muted-foreground">{description}</p>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-5 pb-5 pt-2 border-t">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
