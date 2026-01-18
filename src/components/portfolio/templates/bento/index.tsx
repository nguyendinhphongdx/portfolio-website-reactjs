"use client";

import type { PortfolioData } from "@/types/portfolio";
import Image from "next/image";
import type { ReactNode } from "react";
import { getAllSocialLinks } from "../_shared/utils";

interface BentoTemplateProps {
  data: PortfolioData;
}

function getSocialIcon(type: string): ReactNode {
  const icons: Record<string, ReactNode> = {
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    website: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };
  return icons[type] || icons.website;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Bento Card Component
function BentoCard({
  children,
  className = "",
  hover = true,
  gradient = false,
  primaryColor,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  primaryColor?: string;
}) {
  return (
    <div
      className={`
        rounded-3xl border border-white/[0.08] backdrop-blur-sm
        ${gradient
          ? ""
          : "bg-gradient-to-br from-white/[0.05] to-white/[0.02]"
        }
        ${hover ? "hover:border-white/20 hover:shadow-2xl hover:shadow-black/20 transition-all duration-500" : ""}
        ${className}
      `}
      style={gradient ? { background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}05)` } : undefined}
    >
      {children}
    </div>
  );
}

export function BentoTemplate({ data }: BentoTemplateProps) {
  const primaryColor = data.primaryColor || "#6366f1";
  const socialLinks = getAllSocialLinks(data);
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Calculate stats
  const yearsOfExperience = experience.length > 0
    ? Math.max(1, new Date().getFullYear() - new Date(experience[experience.length - 1]?.startDate || "").getFullYear())
    : 0;

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full blur-[130px] opacity-15"
          style={{ backgroundColor: primaryColor }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIiBkPSJNMCAwaDYwdjYwSDB6Ii8+PC9nPjwvc3ZnPg==')] opacity-40" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* ===== HERO SECTION - Bento Grid ===== */}
        <div className="grid grid-cols-12 gap-4 lg:gap-5">

          {/* Main Hero Card */}
          <BentoCard className="col-span-12 lg:col-span-8 p-8 lg:p-10 relative overflow-hidden group" hover={false}>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundColor: primaryColor }} />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-[80px] opacity-10" style={{ backgroundColor: primaryColor }} />

            <div className="relative z-10">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: primaryColor }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: primaryColor }} />
                </span>
                <span className="text-sm text-white/70">{data.tagline || "Available for work"}</span>
              </div>

              {/* Name & Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                {data.fullName || "Your Name"}
              </h1>

              <p className="text-xl sm:text-2xl lg:text-3xl text-white/50 font-light mb-8">
                {data.title || "Your Title"}
              </p>

              {/* Bio */}
              {data.bio && (
                <p className="text-white/40 text-lg leading-relaxed max-w-2xl mb-10">
                  {data.bio}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {/* Download CV Button */}
                {data.cvUrl && (
                  <a
                    href={data.cvUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: primaryColor, boxShadow: `0 0 30px ${primaryColor}40` }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download CV</span>
                  </a>
                )}
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className={`group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${data.cvUrl ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white" : "text-black hover:shadow-lg"}`}
                    style={!data.cvUrl ? { backgroundColor: primaryColor, boxShadow: `0 0 30px ${primaryColor}40` } : undefined}
                  >
                    <span>Get in Touch</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
                {projects.length > 0 && (
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <span>View Projects</span>
                  </a>
                )}
              </div>
            </div>
          </BentoCard>

          {/* Avatar Card */}
          <BentoCard className="col-span-12 sm:col-span-6 lg:col-span-4 aspect-square lg:aspect-auto overflow-hidden relative group">
            {data.avatar ? (
              <>
                <Image
                  src={data.avatar}
                  alt={data.fullName || "Avatar"}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Location Badge */}
                {data.location && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-white/70">{data.location}</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                <div className="text-9xl font-bold opacity-10" style={{ color: primaryColor }}>
                  {data.fullName?.charAt(0) || "?"}
                </div>
              </div>
            )}
          </BentoCard>

          {/* Social Links Card */}
          <BentoCard className="col-span-12 sm:col-span-6 lg:col-span-4 p-6" gradient primaryColor={primaryColor}>
            <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
                >
                  {getSocialIcon(link.type)}
                </a>
              ))}
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
                >
                  {getSocialIcon("email")}
                </a>
              )}
            </div>
          </BentoCard>

          {/* Stats Cards */}
          <BentoCard className="col-span-6 sm:col-span-4 lg:col-span-2 p-6 flex flex-col justify-between min-h-[140px]">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Experience</span>
            <div>
              <span className="text-4xl lg:text-5xl font-bold" style={{ color: primaryColor }}>{yearsOfExperience}+</span>
              <span className="block text-sm text-white/40">Years</span>
            </div>
          </BentoCard>

          <BentoCard className="col-span-6 sm:col-span-4 lg:col-span-2 p-6 flex flex-col justify-between min-h-[140px]">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Projects</span>
            <div>
              <span className="text-4xl lg:text-5xl font-bold" style={{ color: primaryColor }}>{projects.length}</span>
              <span className="block text-sm text-white/40">Completed</span>
            </div>
          </BentoCard>

          <BentoCard className="col-span-6 sm:col-span-4 lg:col-span-2 p-6 flex flex-col justify-between min-h-[140px]">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Skills</span>
            <div>
              <span className="text-4xl lg:text-5xl font-bold" style={{ color: primaryColor }}>{skills.length}+</span>
              <span className="block text-sm text-white/40">Technologies</span>
            </div>
          </BentoCard>

          <BentoCard className="col-span-6 sm:col-span-12 lg:col-span-2 p-6 flex flex-col justify-between min-h-[140px]">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Companies</span>
            <div>
              <span className="text-4xl lg:text-5xl font-bold" style={{ color: primaryColor }}>{experience.length}</span>
              <span className="block text-sm text-white/40">Worked with</span>
            </div>
          </BentoCard>

          {/* ===== SKILLS SECTION ===== */}
          {data.showSkills !== false && skills.length > 0 && (
            <BentoCard className="col-span-12 lg:col-span-6 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Skills & Technologies</h2>
              </div>

              <div className="space-y-5">
                {Object.entries(groupedSkills).slice(0, 4).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          )}

          {/* ===== EXPERIENCE SECTION ===== */}
          {data.showExperience !== false && experience.length > 0 && (
            <BentoCard className="col-span-12 lg:col-span-6 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Experience</h2>
              </div>

              <div className="space-y-6">
                {experience.slice(0, 4).map((exp, index) => (
                  <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-current" style={{ color: primaryColor }}>
                    <div className="text-white">
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-white/60">{exp.company}</p>
                      <p className="text-sm text-white/40 mt-1">
                        {formatDate(exp.startDate)} — {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          )}

          {/* ===== PROJECTS SECTION ===== */}
          {data.showProjects !== false && projects.length > 0 && (
            <>
              <div className="col-span-12 mt-8 mb-2" id="projects">
                <h2 className="text-2xl lg:text-3xl font-bold">Featured Projects</h2>
                <p className="text-white/50 mt-1">Some things I&apos;ve built</p>
              </div>

              {projects.slice(0, 4).map((project, index) => (
                <BentoCard
                  key={index}
                  className={`
                    ${index === 0 ? "col-span-12 lg:col-span-8" : "col-span-12 sm:col-span-6 lg:col-span-4"}
                    ${index === 0 ? "min-h-[400px]" : "min-h-[300px]"}
                    overflow-hidden relative group
                  `}
                >
                  {/* Background Image */}
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${primaryColor}, transparent)` }} />
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 lg:p-8 flex flex-col justify-end">
                    {/* Tags */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, index === 0 ? 5 : 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/10 backdrop-blur-sm text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="text-xl lg:text-2xl font-bold mb-2">{project.name}</h3>

                    {project.description && (
                      <p className={`text-white/60 mb-4 ${index === 0 ? "line-clamp-3" : "line-clamp-2"}`}>
                        {project.description}
                      </p>
                    )}

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                          style={{ color: primaryColor }}
                        >
                          <span>Live Demo</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </BentoCard>
              ))}
            </>
          )}

          {/* ===== EDUCATION SECTION ===== */}
          {data.showEducation !== false && education.length > 0 && (
            <BentoCard className="col-span-12 lg:col-span-6 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Education</h2>
              </div>

              <div className="space-y-6">
                {education.slice(0, 3).map((edu, index) => (
                  <div key={index} className="group">
                    <h3 className="font-semibold text-lg text-white">{edu.degree}</h3>
                    <p className="text-white/60">{edu.institution}</p>
                    {edu.field && <p className="text-white/40 text-sm">{edu.field}</p>}
                    <p className="text-sm text-white/30 mt-1">
                      {formatDate(edu.startDate)} — {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                    </p>
                  </div>
                ))}
              </div>
            </BentoCard>
          )}

          {/* ===== CONTACT CTA SECTION ===== */}
          <div
            className="col-span-12 lg:col-span-6 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}99)` }}
          >
            {/* Decorative */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-black/20 blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Let&apos;s work together
              </h2>
              <p className="text-white/80 mb-6 max-w-md">
                Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something amazing.
              </p>

              <div className="flex flex-wrap gap-4">
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Send Email</span>
                  </a>
                )}
                {socialLinks.find(l => l.type === "linkedin") && (
                  <a
                    href={socialLinks.find(l => l.type === "linkedin")?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {data.fullName}. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
