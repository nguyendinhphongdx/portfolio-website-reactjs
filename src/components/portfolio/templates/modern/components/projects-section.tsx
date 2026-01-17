"use client";

import { Folder, Github, ExternalLink, Calendar } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: Project[];
  primaryColor: string;
}

export function ProjectsSection({ projects, primaryColor }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Folder className="w-6 h-6" style={{ color: primaryColor }} />
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} primaryColor={primaryColor} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  primaryColor: string;
}

function ProjectCard({ project, primaryColor }: ProjectCardProps) {
  return (
    <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/20 transition-all overflow-hidden">
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at top right, ${primaryColor}10, transparent 50%)`,
        }}
      />

      <div className="relative">
        {/* Project Image */}
        {project.image && (
          <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-white/5">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
            {project.name}
          </h3>
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <ExternalLink className="w-5 h-5" style={{ color: primaryColor }} />
              </a>
            )}
          </div>
        </div>

        {/* Date Range */}
        {(project.startDate || project.endDate) && (
          <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
            <Calendar className="w-4 h-4" />
            {project.startDate}
            {project.endDate && ` — ${project.endDate}`}
          </div>
        )}

        {/* Description */}
        {project.description && (
          <p className="text-white/60 mb-6 leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/70 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
