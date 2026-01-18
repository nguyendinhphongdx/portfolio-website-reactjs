"use client";

import type { PortfolioData } from "@/types/portfolio";
import Image from "next/image";
import type { ReactNode } from "react";
import { getAllSocialLinks } from "../_shared/utils";

interface NeubrutalismTemplateProps {
  data: PortfolioData;
}

function getSocialIcon(type: string): ReactNode {
  const icons: Record<string, ReactNode> = {
    github: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    twitter: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    website: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    instagram: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    youtube: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  };
  return icons[type] || icons.website;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function NeubrutalismTemplate({ data }: NeubrutalismTemplateProps) {
  const primaryColor = data.primaryColor || "#FF6B6B";
  const socialLinks = getAllSocialLinks(data);

  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];
  const certifications = data.certifications || [];
  const testimonials = data.testimonials || [];
  const languages = data.languages || [];
  const interests = data.interests || [];

  const yearsOfExperience = experience.length > 0
    ? new Date().getFullYear() - new Date(experience[experience.length - 1]?.startDate || new Date()).getFullYear()
    : 0;

  // Brutalist color palette
  const colors = {
    cream: "#FFFEF0",
    black: "#1a1a1a",
    yellow: "#FFE156",
    cyan: "#00D4FF",
    pink: "#FF6B9D",
    green: "#7CFF6B",
    orange: "#FF9F43",
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0] text-black font-mono">
      {/* Brutalist Header */}
      <header className="sticky top-0 z-50 bg-[#FFFEF0] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 border-4 border-black flex items-center justify-center text-xl font-black"
                style={{ backgroundColor: primaryColor }}
              >
                {data.fullName?.charAt(0) || "P"}
              </div>
              <span className="text-xl font-black uppercase tracking-tight hidden md:block">
                {data.fullName?.split(" ")[0] || "Portfolio"}
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "#about", label: "About" },
                ...(data.showSkills !== false && skills.length > 0 ? [{ href: "#skills", label: "Skills" }] : []),
                ...(data.showExperience !== false && experience.length > 0 ? [{ href: "#experience", label: "Work" }] : []),
                ...(data.showProjects !== false && projects.length > 0 ? [{ href: "#projects", label: "Projects" }] : []),
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 font-bold uppercase text-sm border-4 border-transparent hover:border-black hover:bg-black hover:text-white transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="px-6 py-3 font-black uppercase text-sm border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                Hire Me
              </a>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="about" className="py-20 px-6 border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Avatar Side */}
              <div className="relative">
                <div
                  className="absolute inset-0 border-4 border-black translate-x-4 translate-y-4"
                  style={{ backgroundColor: colors.yellow }}
                />
                <div className="relative border-4 border-black bg-white overflow-hidden">
                  {data.avatar ? (
                    <div className="aspect-square relative">
                      <Image
                        src={data.avatar}
                        alt={data.fullName || "Avatar"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-square flex items-center justify-center text-[150px] font-black"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {data.fullName?.charAt(0) || "?"}
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 border-4 border-black bg-[#7CFF6B] font-bold uppercase text-sm shadow-[4px_4px_0px_0px_#000]">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-black rounded-full animate-pulse" />
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Side */}
              <div>
                <div className="mb-6">
                  <p
                    className="inline-block px-4 py-2 border-4 border-black font-bold uppercase text-sm mb-4 shadow-[4px_4px_0px_0px_#000]"
                    style={{ backgroundColor: colors.cyan }}
                  >
                    {data.title || "Creative Developer"}
                  </p>
                  <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4">
                    {data.fullName || "Your Name"}
                  </h1>
                  {data.tagline && (
                    <p className="text-xl font-bold border-l-4 border-black pl-4 italic">
                      &ldquo;{data.tagline}&rdquo;
                    </p>
                  )}
                </div>

                {data.bio && (
                  <p className="text-lg mb-8 leading-relaxed">
                    {data.bio}
                  </p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="border-4 border-black p-4 text-center" style={{ backgroundColor: colors.yellow }}>
                    <p className="text-3xl font-black">{yearsOfExperience}+</p>
                    <p className="text-xs font-bold uppercase">Years</p>
                  </div>
                  <div className="border-4 border-black p-4 text-center" style={{ backgroundColor: colors.cyan }}>
                    <p className="text-3xl font-black">{projects.length}</p>
                    <p className="text-xs font-bold uppercase">Projects</p>
                  </div>
                  <div className="border-4 border-black p-4 text-center" style={{ backgroundColor: colors.pink }}>
                    <p className="text-3xl font-black">{skills.length}</p>
                    <p className="text-xs font-bold uppercase">Skills</p>
                  </div>
                  <div className="border-4 border-black p-4 text-center" style={{ backgroundColor: colors.green }}>
                    <p className="text-3xl font-black">{certifications.length || "∞"}</p>
                    <p className="text-xs font-bold uppercase">Certs</p>
                  </div>
                </div>

                {/* CTA Buttons & Social Links */}
                <div className="flex flex-wrap gap-3">
                  {/* Download CV Button */}
                  {data.cvUrl && (
                    <a
                      href={data.cvUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 border-4 border-black font-black uppercase hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                      style={{ backgroundColor: colors.pink }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download CV
                    </a>
                  )}

                  {/* Social Links */}
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border-4 border-black bg-white hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                      {getSocialIcon(link.type)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {data.showSkills !== false && skills.length > 0 && (
          <section id="skills" className="py-20 px-6 border-b-4 border-black" style={{ backgroundColor: colors.yellow }}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 flex items-center gap-4">
                <span className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                  ⚡
                </span>
                Skills
              </h2>

              {(() => {
                const categories = skills.reduce((acc, skill) => {
                  const cat = skill.category || "Other";
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(skill);
                  return acc;
                }, {} as Record<string, typeof skills>);

                return Object.entries(categories).map(([category, categorySkills]) => (
                  <div key={category} className="mb-10 last:mb-0">
                    <h3 className="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2 inline-block">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {categorySkills.map((skill, index) => {
                        const levelColors: Record<string, string> = {
                          expert: colors.green,
                          advanced: colors.cyan,
                          intermediate: colors.orange,
                          beginner: colors.pink,
                        };
                        const bgColor = levelColors[skill.level || "intermediate"] || colors.cream;

                        return (
                          <div
                            key={index}
                            className="px-4 py-2 border-4 border-black font-bold uppercase text-sm shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-default"
                            style={{ backgroundColor: bgColor }}
                          >
                            {skill.name}
                            {skill.level && (
                              <span className="ml-2 text-xs opacity-70">• {skill.level}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.showExperience !== false && experience.length > 0 && (
          <section id="experience" className="py-20 px-6 border-b-4 border-black">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 flex items-center gap-4">
                <span className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                  💼
                </span>
                Experience
              </h2>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    {exp.current && (
                      <div
                        className="absolute -top-4 -right-4 px-4 py-2 border-4 border-black font-bold uppercase text-sm"
                        style={{ backgroundColor: colors.green }}
                      >
                        Current
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      <div
                        className="w-16 h-16 border-4 border-black flex items-center justify-center text-2xl font-black flex-shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {exp.company.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                          <div>
                            <h3 className="text-2xl font-black uppercase">{exp.position}</h3>
                            <p className="text-lg font-bold">{exp.company}</p>
                          </div>
                          <div className="px-4 py-2 border-4 border-black bg-[#FFFEF0] font-bold text-sm">
                            {formatDate(exp.startDate)} — {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                          </div>
                        </div>

                        {exp.location && (
                          <p className="text-sm font-bold mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs">📍</span>
                            {exp.location}
                          </p>
                        )}

                        {exp.description && (
                          <p className="mb-4 leading-relaxed">{exp.description}</p>
                        )}

                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="space-y-2">
                            {exp.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span
                                  className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                                  style={{ backgroundColor: primaryColor }}
                                >
                                  ✓
                                </span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.showProjects !== false && projects.length > 0 && (
          <section id="projects" className="py-20 px-6 border-b-4 border-black" style={{ backgroundColor: colors.cyan }}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 flex items-center gap-4">
                <span className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                  🚀
                </span>
                Projects
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all overflow-hidden"
                  >
                    {project.image && (
                      <div className="relative h-48 border-b-4 border-black overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-2xl font-black uppercase mb-2">{project.name}</h3>

                      {project.description && (
                        <p className="mb-4 line-clamp-3">{project.description}</p>
                      )}

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 border-2 border-black text-xs font-bold uppercase"
                              style={{ backgroundColor: colors.yellow }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 border-4 border-black font-black uppercase text-sm text-center shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                            style={{ backgroundColor: primaryColor }}
                          >
                            Live Demo →
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-4 border-4 border-black bg-black text-white font-black uppercase text-sm shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.showEducation !== false && education.length > 0 && (
          <section id="education" className="py-20 px-6 border-b-4 border-black">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 flex items-center gap-4">
                <span className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                  🎓
                </span>
                Education
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 border-4 border-black flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ backgroundColor: colors.pink }}
                      >
                        📚
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase">{edu.degree}</h3>
                        {edu.field && <p className="font-bold">{edu.field}</p>}
                        <p className="text-sm">{edu.institution}</p>
                        <p className="text-xs font-bold mt-2 px-2 py-1 border-2 border-black inline-block" style={{ backgroundColor: colors.yellow }}>
                          {formatDate(edu.startDate)} — {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                        </p>
                        {edu.gpa && (
                          <p className="mt-2 font-bold">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {data.showCertifications !== false && certifications.length > 0 && (
          <section id="certifications" className="py-20 px-6 border-b-4 border-black" style={{ backgroundColor: colors.pink }}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 flex items-center gap-4">
                <span className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                  🏆
                </span>
                Certifications
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    <div
                      className="w-12 h-12 border-4 border-black flex items-center justify-center text-xl mb-4"
                      style={{ backgroundColor: colors.yellow }}
                    >
                      🎖️
                    </div>
                    <h3 className="text-lg font-black uppercase mb-1">{cert.name}</h3>
                    <p className="font-bold text-sm mb-2">{cert.issuer}</p>
                    {cert.date && (
                      <p className="text-xs px-2 py-1 border-2 border-black inline-block" style={{ backgroundColor: colors.cream }}>
                        {formatDate(cert.date)}
                      </p>
                    )}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-4 text-sm font-bold underline hover:no-underline"
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {data.showTestimonials !== false && testimonials.length > 0 && (
          <section id="testimonials" className="py-20 px-6 border-b-4 border-black">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 flex items-center gap-4">
                <span className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_#000]">
                  💬
                </span>
                Testimonials
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_#000]"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="border-4 border-black"
                        />
                      ) : (
                        <div
                          className="w-16 h-16 border-4 border-black flex items-center justify-center text-xl font-black"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-black uppercase">{testimonial.name}</h3>
                        <p className="text-sm font-bold">
                          {testimonial.role}{testimonial.company ? ` @ ${testimonial.company}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute -top-4 -left-2 text-6xl font-black opacity-20">&ldquo;</span>
                      <p className="pl-6 text-lg italic leading-relaxed">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Languages & Interests */}
        {(languages.length > 0 || interests.length > 0) && (
          <section className="py-20 px-6 border-b-4 border-black" style={{ backgroundColor: colors.green }}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Languages */}
                {languages.length > 0 && (
                  <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000]">
                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 border-4 border-black flex items-center justify-center text-lg" style={{ backgroundColor: colors.cyan }}>
                        🌍
                      </span>
                      Languages
                    </h3>
                    <div className="space-y-4">
                      {languages.map((lang, index) => {
                        const levelWidth: Record<string, string> = {
                          native: "100%",
                          fluent: "85%",
                          intermediate: "60%",
                          beginner: "30%",
                        };
                        return (
                          <div key={index}>
                            <div className="flex justify-between font-bold text-sm uppercase mb-2">
                              <span>{lang.name}</span>
                              <span>{lang.level}</span>
                            </div>
                            <div className="h-6 border-4 border-black bg-[#FFFEF0]">
                              <div
                                className="h-full"
                                style={{
                                  width: levelWidth[lang.level] || "50%",
                                  backgroundColor: primaryColor
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Interests */}
                {interests.length > 0 && (
                  <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000]">
                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 border-4 border-black flex items-center justify-center text-lg" style={{ backgroundColor: colors.pink }}>
                        ✨
                      </span>
                      Interests
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 border-4 border-black font-bold uppercase text-sm shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-default"
                          style={{ backgroundColor: [colors.yellow, colors.cyan, colors.pink, colors.orange][index % 4] }}
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA Section */}
        <section id="contact" className="py-20 px-6" style={{ backgroundColor: primaryColor }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[12px_12px_0px_0px_#000]">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
                Let&apos;s Work Together!
              </h2>
              <p className="text-xl mb-8">
                Have a project in mind? I&apos;d love to hear about it.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="px-8 py-4 border-4 border-black bg-black text-white font-black uppercase text-lg hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all"
                    style={{ boxShadow: `6px 6px 0px 0px ${primaryColor}` }}
                  >
                    📧 Send Email
                  </a>
                )}
                {socialLinks.length > 0 && (
                  <div className="flex justify-center gap-3">
                    {socialLinks.slice(0, 3).map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                      >
                        {getSocialIcon(link.type)}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {(data.location || data.timezone) && (
                <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
                  {data.location && (
                    <span className="px-4 py-2 border-4 border-black" style={{ backgroundColor: colors.yellow }}>
                      📍 {data.location}
                    </span>
                  )}
                  {data.timezone && (
                    <span className="px-4 py-2 border-4 border-black" style={{ backgroundColor: colors.cyan }}>
                      🕐 {data.timezone}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t-4 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 border-4 border-white flex items-center justify-center text-lg font-black"
              style={{ backgroundColor: primaryColor, color: "black" }}
            >
              {data.fullName?.charAt(0) || "P"}
            </div>
            <span className="font-bold uppercase">
              © {new Date().getFullYear()} {data.fullName}
            </span>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-white hover:bg-white hover:text-black transition-colors"
                >
                  {getSocialIcon(link.type)}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
