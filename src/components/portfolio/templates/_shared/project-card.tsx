"use client";

import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "glass" | "brutal" | "bento";
  primaryColor?: string;
  className?: string;
  index?: number;
}

export function ProjectCard({
  project,
  variant = "default",
  primaryColor,
  className,
  index = 0,
}: ProjectCardProps) {
  const brutalColors = ["#facc15", "#a5f3fc", "#fda4af"];

  if (variant === "bento") {
    return (
      <div
        className={cn(
          "group p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all",
          className
        )}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium">{project.name}</h3>
          {(project.url || project.github) && (
            <a
              href={project.url || project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
        {project.description && (
          <p className="text-xs text-white/50 line-clamp-2">
            {project.description}
          </p>
        )}
      </div>
    );
  }

  if (variant === "glass") {
    return (
      <div
        className={cn(
          "group backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-white group-hover:text-white/90">
            {project.name}
          </h3>
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        </div>
        {project.description && (
          <p className="text-white/60 text-sm mb-4 leading-relaxed">
            {project.description}
          </p>
        )}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === "brutal") {
    const bgColor = brutalColors[index % brutalColors.length];
    return (
      <div
        className={cn(
          "border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
          className
        )}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-black uppercase">{project.name}</h3>
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-black bg-white hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-black bg-white hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        {project.description && (
          <p className="text-black/80 mb-4">{project.description}</p>
        )}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 border-2 border-black bg-white text-xs font-bold uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-gray-600 mt-2 leading-relaxed">
              {project.description}
            </p>
          )}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        {(project.url || project.github) && (
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
