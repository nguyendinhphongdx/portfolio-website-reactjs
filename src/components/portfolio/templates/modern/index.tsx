"use client";

import type { PortfolioData } from "@/types/portfolio";
import Image from "next/image";
import type { ReactNode } from "react";
import { getAllSocialLinks } from "../_shared/utils";

interface ModernTemplateProps {
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
  };
  return icons[type] || icons.website;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const primaryColor = data.primaryColor || "#8B5CF6";
  const socialLinks = getAllSocialLinks(data);
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];
  const certifications = data.certifications || [];
  const testimonials = data.testimonials || [];
  const languages = data.languages || [];
  const interests = data.interests || [];

  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          className="absolute top-0 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 animate-pulse"
          style={{ backgroundColor: primaryColor, animationDuration: "4s" }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-pulse"
          style={{ backgroundColor: primaryColor, animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full blur-[80px] opacity-25 animate-pulse"
          style={{ backgroundColor: "#EC4899", animationDuration: "5s", animationDelay: "1s" }}
        />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${primaryColor} 1px, transparent 1px), linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3">
            <span className="font-bold text-lg bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {data.fullName?.split(" ")[0] || "Portfolio"}
            </span>
            <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="px-5 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, #EC4899)` }}
              >
                Contact Me
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex items-center pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div className="order-2 lg:order-1">
                {data.tagline && (
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
                    style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}30`, color: primaryColor }}
                  >
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                    {data.tagline}
                  </div>
                )}

                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                    {data.fullName || "Your Name"}
                  </span>
                </h1>

                <p
                  className="text-2xl lg:text-3xl font-light mb-6"
                  style={{ color: primaryColor }}
                >
                  {data.title || "Your Title"}
                </p>

                {data.bio && (
                  <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
                    {data.bio}
                  </p>
                )}

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {data.location && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {data.location}
                    </div>
                  )}
                  {experience.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {new Date().getFullYear() - new Date(experience[experience.length - 1]?.startDate || "").getFullYear()}+ Years Experience
                    </div>
                  )}
                </div>

                {/* CTA Buttons & Social Links */}
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Download CV Button */}
                  {data.cvUrl && (
                    <a
                      href={data.cvUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, #EC4899)` }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300"
                    >
                      {getSocialIcon(link.type)}
                    </a>
                  ))}
                </div>
              </div>

              {/* Avatar */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, #EC4899)` }}
                  />
                  {/* Avatar Container */}
                  <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-2 border-white/10">
                    {data.avatar ? (
                      <Image
                        src={data.avatar}
                        alt={data.fullName || "Avatar"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-8xl font-bold"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}50, #EC489950)` }}
                      >
                        {data.fullName?.charAt(0) || "?"}
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
                  </div>
                  {/* Decorative Elements */}
                  <div
                    className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl rotate-12 opacity-60 blur-sm"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div
                    className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl -rotate-12 opacity-60 blur-sm"
                    style={{ backgroundColor: "#EC4899" }}
                  />
                </div>
              </div>
            </div>

            {/* Languages & Interests */}
            {(languages.length > 0 || interests.length > 0) && (
              <div className="mt-20 grid md:grid-cols-2 gap-8">
                {languages.length > 0 && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
                        >
                          {lang.name} <span className="text-white/40">• {lang.level}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {interests.length > 0 && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-xl text-sm"
                          style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        {data.showSkills !== false && skills.length > 0 && (
          <section id="skills" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Skills & Expertise
                  </span>
                </h2>
                <p className="text-white/50 max-w-xl mx-auto">Technologies and tools I work with</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">{skill.name}</span>
                      <span
                        className="text-xs px-2 py-1 rounded-lg capitalize"
                        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                      >
                        {skill.level || "intermediate"}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 group-hover:animate-pulse"
                        style={{
                          width: skill.level === "expert" ? "100%" : skill.level === "advanced" ? "75%" : skill.level === "intermediate" ? "50%" : "25%",
                          background: `linear-gradient(90deg, ${primaryColor}, #EC4899)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education & Certifications - Before Experience */}
        {((data.showEducation !== false && education.length > 0) || (data.showCertifications !== false && certifications.length > 0)) && (
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Education */}
                {data.showEducation !== false && education.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-8">
                      <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Education
                      </span>
                    </h2>
                    <div className="space-y-6">
                      {education.map((edu, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: `linear-gradient(135deg, ${primaryColor}30, #EC489930)` }}
                            >
                              <svg className="w-6 h-6" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                                  <p className="text-sm" style={{ color: primaryColor }}>{edu.institution}</p>
                                </div>
                                <span className="text-xs text-white/40 px-3 py-1 rounded-lg bg-white/5 whitespace-nowrap">
                                  {formatDate(edu.startDate)} — {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                                </span>
                              </div>
                              {edu.field && (
                                <p className="text-white/60 text-sm mt-2">
                                  <span className="text-white/40">Field:</span> {edu.field}
                                </p>
                              )}
                              {edu.gpa && (
                                <p className="text-white/60 text-sm mt-1">
                                  <span className="text-white/40">GPA:</span> <span className="font-medium text-white">{edu.gpa}</span>
                                </p>
                              )}
                              {edu.description && (
                                <p className="text-white/50 text-sm mt-3 italic">{edu.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {data.showCertifications !== false && certifications.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-8">
                      <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Certifications
                      </span>
                    </h2>
                    <div className="space-y-4">
                      {certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `linear-gradient(135deg, ${primaryColor}30, #EC489930)` }}
                          >
                            <svg className="w-6 h-6" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{cert.name}</h3>
                            <p className="text-white/50 text-sm">{cert.issuer}</p>
                            {cert.date && (
                              <p className="text-white/40 text-xs mt-1">{cert.date}</p>
                            )}
                          </div>
                          {cert.url && (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:underline"
                              style={{ color: primaryColor }}
                            >
                              View →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.showExperience !== false && experience.length > 0 && (
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Experience
                  </span>
                </h2>
                <p className="text-white/50">My professional journey</p>
              </div>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-8 border-l border-white/10 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px] ring-4 ring-[#030014]"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, #EC4899)` }}
                    />

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{exp.position}</h3>
                          <p style={{ color: primaryColor }}>{exp.company}</p>
                        </div>
                        <div className="text-sm text-white/40 px-3 py-1 rounded-lg bg-white/5">
                          {formatDate(exp.startDate)} — {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : "Present"}
                        </div>
                      </div>

                      {exp.location && (
                        <p className="text-sm text-white/40 mb-3 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {exp.location}
                        </p>
                      )}

                      {exp.description && (
                        <p className="text-white/60 mb-4">{exp.description}</p>
                      )}

                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                              <span style={{ color: primaryColor }}>▸</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.showProjects !== false && projects.length > 0 && (
          <section id="projects" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Featured Projects
                  </span>
                </h2>
                <p className="text-white/50">Some of my recent work</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500"
                  >
                    {project.image && (
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/50 to-transparent" />
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                      {project.description && (
                        <p className="text-white/50 text-sm mb-4 line-clamp-2">{project.description}</p>
                      )}

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg text-xs bg-white/10 text-white/70"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:underline"
                            style={{ color: primaryColor }}
                          >
                            Live Demo →
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/50 hover:text-white"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at center, ${primaryColor}, transparent 70%)` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {data.showTestimonials !== false && testimonials.length > 0 && (
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="from-white to-white/60 bg-clip-text text-transparent">
                    What People Say
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden"
                  >
                    {/* Quote mark */}
                    <div className="absolute top-4 right-4 text-6xl font-serif opacity-10" style={{ color: primaryColor }}>
                      &ldquo;
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="rounded-full object-cover ring-2 ring-white/10"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold"
                          style={{ background: `linear-gradient(135deg, ${primaryColor}, #EC4899)` }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-white/50 text-sm">
                          {testimonial.role}{testimonial.company && ` @ ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/70 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div
              className="relative p-12 rounded-3xl overflow-hidden text-center"
              style={{ background: `linear-gradient(135deg, ${primaryColor}30, #EC489930)` }}
            >
              {/* Background decorations */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: primaryColor }}
                />
                <div
                  className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: "#EC4899" }}
                />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
                <p className="text-white/70 mb-8 max-w-md mx-auto">
                  Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something amazing together.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {data.email && (
                    <a
                      href={`mailto:${data.email}`}
                      className="px-8 py-4 rounded-xl font-medium text-white transition-all hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, #EC4899)` }}
                    >
                      Get in Touch
                    </a>
                  )}
                  {socialLinks.find(l => l.type === "linkedin") && (
                    <a
                      href={socialLinks.find(l => l.type === "linkedin")?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-xl font-medium bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {data.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.slice(0, 4).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                {getSocialIcon(link.type)}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
