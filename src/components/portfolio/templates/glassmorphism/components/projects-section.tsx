"use client";

import { Folder, Github, ExternalLink, Calendar } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: Project[];
  primaryColor: string;
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Folder className="w-5 h-5 text-white" />
          </div>
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all overflow-hidden">
      {/* Project Image */}
      {project.image && (
        <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-white/5">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

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

      {/* Date */}
      {(project.startDate || project.endDate) && (
        <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
          <Calendar className="w-3 h-3" />
          {project.startDate}
          {project.endDate && ` — ${project.endDate}`}
        </div>
      )}

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
