"use client";

import { Github, ExternalLink, Calendar, Image } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: Project[];
  primaryColor: string;
}

export function ProjectsSection({ projects, primaryColor }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8">
          Featured Projects
        </h2>

        <div className="grid gap-6">
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
    <div className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Project Image */}
        {project.image && (
          <div className="md:w-48 shrink-0">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                {project.name}
              </h3>

              {/* Date Range */}
              {(project.startDate || project.endDate) && (
                <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <Calendar className="w-3 h-3" />
                  {project.startDate}
                  {project.endDate && ` — ${project.endDate}`}
                </p>
              )}
            </div>

            {/* Links */}
            <div className="flex gap-2 shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="GitHub Repository"
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
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-gray-600 mt-3 leading-relaxed flex-grow">
              {project.description}
            </p>
          )}

          {/* Technologies */}
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
      </div>
    </div>
  );
}
