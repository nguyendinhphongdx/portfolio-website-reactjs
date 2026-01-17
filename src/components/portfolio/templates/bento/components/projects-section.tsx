"use client";

import { Folder, ExternalLink, Github, Calendar } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <div id="projects" className="col-span-12 bg-zinc-900 rounded-3xl p-6 border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-zinc-600" />
          <p className="text-xs text-zinc-600 uppercase tracking-wider">
            Featured Projects
          </p>
        </div>
        <span className="text-xs text-zinc-600">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const hasLink = project.url || project.github;

  const CardWrapper = hasLink ? "a" : "div";
  const cardProps = hasLink
    ? {
        href: project.url || project.github || "#",
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <CardWrapper
      {...cardProps}
      className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all flex flex-col"
    >
      {/* Project Image */}
      {project.image && (
        <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-zinc-800">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-white group-hover:text-white/90">
          {project.name}
        </h3>
        <div className="flex items-center gap-1.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4 text-zinc-500 hover:text-zinc-300" />
            </a>
          )}
          {project.url && (
            <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          )}
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-sm text-zinc-500 line-clamp-2 mb-3 flex-grow">
          {project.description}
        </p>
      )}

      {/* Date Range */}
      {(project.startDate || project.endDate) && (
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 mb-3">
          <Calendar className="w-3 h-3" />
          <span>
            {project.startDate}
            {project.endDate && ` — ${project.endDate}`}
          </span>
        </div>
      )}

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-zinc-500"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </CardWrapper>
  );
}
