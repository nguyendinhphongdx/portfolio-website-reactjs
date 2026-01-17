"use client";

import type { PortfolioData, Project } from "@/types/portfolio";
import Image from "next/image";

interface ProjectsSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ProjectsSection({ data, primaryColor }: ProjectsSectionProps) {
  const projects = data.projects || [];

  return (
    <section id="projects" className="py-16 px-6 bg-[#A8E6CF] border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2
            className="inline-block px-6 py-3 text-4xl font-black uppercase border-4 border-black bg-white"
            style={{ boxShadow: "6px 6px 0px 0px #000" }}
          >
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} primaryColor={primaryColor} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  primaryColor,
}: {
  project: Project;
  index: number;
  primaryColor: string;
}) {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#DDA0DD", "#45B7D1", "#F7DC6F"];
  const cardColor = colors[index % colors.length];

  return (
    <div
      className="border-4 border-black bg-white overflow-hidden"
      style={{ boxShadow: "8px 8px 0px 0px #000" }}
    >
      {/* Project Image */}
      {project.image && (
        <div className="relative h-48 border-b-4 border-black">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
          {/* Overlay Badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 border-3 border-black font-bold text-sm"
            style={{ backgroundColor: cardColor }}
          >
            #{String(index + 1).padStart(2, "0")}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-2xl font-black uppercase">{project.name}</h3>

          {/* Links */}
          <div className="flex gap-2">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-3 border-black font-bold flex items-center justify-center bg-[#FFE66D] hover:bg-[#F7DC6F] transition-colors"
                style={{ boxShadow: "2px 2px 0px 0px #000" }}
                title="Live Demo"
              >
                🔗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-3 border-black font-bold flex items-center justify-center bg-gray-900 text-white hover:bg-black transition-colors"
                style={{ boxShadow: "2px 2px 0px 0px #000" }}
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Date Range */}
        {(project.startDate || project.endDate) && (
          <div
            className="inline-block px-3 py-1 border-3 border-black font-semibold text-sm mb-4"
            style={{ backgroundColor: cardColor }}
          >
            {project.startDate && formatDate(project.startDate)}
            {project.startDate && project.endDate && " — "}
            {project.endDate && formatDate(project.endDate)}
          </div>
        )}

        {/* Description */}
        {project.description && (
          <p className="text-gray-700 mb-4">{project.description}</p>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 border-2 border-black font-semibold text-sm bg-gray-100"
                style={{ boxShadow: "2px 2px 0px 0px #000" }}
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
