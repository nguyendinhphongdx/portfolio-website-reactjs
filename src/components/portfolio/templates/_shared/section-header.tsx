"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  variant?: "default" | "minimal" | "glass" | "brutal";
  primaryColor?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  className,
  iconClassName,
  titleClassName,
  variant = "default",
  primaryColor,
}: SectionHeaderProps) {
  const variants = {
    default: {
      container: "flex items-center gap-3 mb-8",
      icon: "w-5 h-5 text-gray-600",
      title: "text-xs font-semibold uppercase tracking-wider text-gray-400",
    },
    minimal: {
      container: "flex items-center gap-2 mb-6",
      icon: "w-4 h-4",
      title: "text-xs font-semibold uppercase tracking-wider text-gray-400",
    },
    glass: {
      container: "flex items-center gap-3 mb-8",
      icon: "w-5 h-5 text-white",
      title: "text-2xl font-bold text-white",
    },
    brutal: {
      container: "flex items-center gap-3 mb-8",
      icon: "w-8 h-8",
      title: "text-3xl font-black uppercase",
    },
  };

  const style = variants[variant];

  return (
    <div className={cn(style.container, className)}>
      {Icon && (
        <div
          className={cn(
            variant === "glass" &&
              "w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          )}
        >
          <Icon
            className={cn(style.icon, iconClassName)}
            style={primaryColor ? { color: primaryColor } : undefined}
          />
        </div>
      )}
      <h2 className={cn(style.title, titleClassName)}>{title}</h2>
    </div>
  );
}
