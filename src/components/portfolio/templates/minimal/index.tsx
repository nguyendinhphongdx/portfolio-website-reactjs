"use client";

import type { PortfolioData } from "@/types/portfolio";
import Image from "next/image";
import type { ReactNode } from "react";
import { getAllSocialLinks } from "../_shared/utils";

interface MinimalTemplateProps {
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

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const primaryColor = data.primaryColor || "#000000";
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-semibold text-lg">{data.fullName?.split(" ")[0] || "Portfolio"}</span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#experience" className="hover:text-gray-900 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-gray-900 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
          </nav>
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="px-4 py-2 text-sm font-medium rounded-full transition-colors"
              style={{ backgroundColor: primaryColor, color: "white" }}
            >
              Hire Me
            </a>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section id="about" className="mb-24">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div
                  className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden"
                  style={{ boxShadow: `0 25px 50px -12px ${primaryColor}30` }}
                >
                  {data.avatar ? (
                    <Image
                      src={data.avatar}
                      alt={data.fullName || "Avatar"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-6xl font-bold text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {data.fullName?.charAt(0) || "?"}
                    </div>
                  )}
                </div>
                {/* Status indicator */}
                <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full shadow-lg">
                  Available
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              {data.tagline && (
                <div
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                  style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                >
                  {data.tagline}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                {data.fullName || "Your Name"}
              </h1>

              <p className="text-xl text-gray-600 mb-4">{data.title || "Your Title"}</p>

              {data.bio && (
                <p className="text-gray-500 leading-relaxed mb-6 max-w-xl">
                  {data.bio}
                </p>
              )}

              {/* Location & Contact */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                {data.location && (
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {data.location}
                  </div>
                )}
                {data.email && (
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {data.email}
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Download CV Button */}
                {data.cvUrl && (
                  <a
                    href={data.cvUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"
                  >
                    {getSocialIcon(link.type)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Languages & Interests */}
          {(languages.length > 0 || interests.length > 0) && (
            <div className="mt-12 pt-8 border-t border-gray-100 grid md:grid-cols-2 gap-8">
              {languages.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {lang.name} <span className="text-gray-400">• {lang.level}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {interests.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Skills Section */}
        {data.showSkills !== false && skills.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: skill.level === "expert" ? "100%" : skill.level === "advanced" ? "75%" : skill.level === "intermediate" ? "50%" : "25%",
                        backgroundColor: primaryColor,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 capitalize mt-1 block">{skill.level || "intermediate"}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.showExperience !== false && experience.length > 0 && (
          <section id="experience" className="mb-24">
            <h2 className="text-2xl font-bold mb-8">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l-2 border-gray-100 last:pb-0">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px]"
                    style={{ backgroundColor: primaryColor }}
                  />

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </div>
                  </div>

                  {exp.location && (
                    <p className="text-sm text-gray-400 mb-2 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {exp.location}
                    </p>
                  )}

                  {exp.description && (
                    <p className="text-gray-500 mb-3">{exp.description}</p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-gray-500 flex items-start gap-2">
                          <span style={{ color: primaryColor }}>•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.showProjects !== false && projects.length > 0 && (
          <section id="projects" className="mb-24">
            <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {project.image && (
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                    {project.description && (
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600"
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
                          View Project →
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        {((data.showEducation !== false && education.length > 0) || (data.showCertifications !== false && certifications.length > 0)) && (
          <section className="mb-24 grid md:grid-cols-2 gap-12">
            {/* Education */}
            {data.showEducation !== false && education.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-8">Education</h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="p-5 rounded-xl bg-gray-50">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      {edu.field && <p className="text-gray-500 text-sm">{edu.field}</p>}
                      <p className="text-gray-400 text-sm mt-2">
                        {formatDate(edu.startDate)} — {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm mt-2">
                          <span className="font-medium">GPA:</span> {edu.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.showCertifications !== false && certifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-8">Certifications</h2>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${primaryColor}10` }}
                      >
                        <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-gray-500 text-sm">{cert.issuer}</p>
                        {cert.date && <p className="text-gray-400 text-xs mt-1">{formatDate(cert.date)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Testimonials */}
        {data.showTestimonials !== false && testimonials.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-8">What People Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}{testimonial.company && ` @ ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section id="contact" className="text-center py-16 px-8 rounded-3xl" style={{ backgroundColor: `${primaryColor}05` }}>
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            I&apos;m currently available for freelance work and full-time positions. Let&apos;s build something great together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="px-8 py-3 text-white font-medium rounded-full transition-opacity hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Get in Touch
              </a>
            )}
            {socialLinks.find(l => l.type === "linkedin") && (
              <a
                href={socialLinks.find(l => l.type === "linkedin")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 font-medium rounded-full border-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                LinkedIn
              </a>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} {data.fullName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
