"use client";

import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, Dribbble, Figma, Palette, ArrowUpRight, Eye, Layers } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface DesignerTemplateProps {
  data: PortfolioData;
}

export function DesignerTemplate({ data }: DesignerTemplateProps) {
  const primaryColor = data.primaryColor || "#6366f1";

  return (
    <div className="min-h-screen bg-[#fafafa]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-black/5">
          <a href="#work" className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Work</a>
          <a href="#about" className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">About</a>
          <a href="#skills" className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Skills</a>
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              Hire Me
            </a>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-6 pt-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-600 mb-8">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                Available for new projects
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]">
                {data.title || "Product Designer"} <br />
                <span className="text-gray-400">crafting digital</span><br />
                <span style={{ color: primaryColor }}>experiences</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-md leading-relaxed">
                {data.bio || "I design beautiful, functional products that solve real problems and delight users."}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all hover:scale-105 hover:shadow-xl"
                  style={{ backgroundColor: primaryColor }}
                >
                  View My Work
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <div className="flex items-center gap-3">
                  {data.linkedin && (
                    <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {data.twitter && (
                    <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-all">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {data.website && (
                    <a href={data.website} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-all">
                      <Dribbble className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Avatar with decorative frame */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] opacity-20" style={{ background: `linear-gradient(135deg, ${primaryColor}, transparent)` }} />
              {data.avatar ? (
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl">
                  <img
                    src={data.avatar}
                    alt={data.fullName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-2xl font-bold">{data.fullName}</p>
                    {data.location && (
                      <p className="text-white/70 flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        {data.location}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative rounded-[2rem] aspect-[4/5] flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <Palette className="w-32 h-32" style={{ color: primaryColor, opacity: 0.3 }} />
                </div>
              )}
              {/* Floating badges */}
              <div className="absolute -right-4 top-1/4 px-4 py-3 rounded-2xl bg-white shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <Figma className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Figma Expert</p>
                  <p className="text-sm text-gray-500">5+ years</p>
                </div>
              </div>
              <div className="absolute -left-4 bottom-1/4 px-4 py-3 rounded-2xl bg-white shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <Layers className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{data.projects?.length || 0}+ Projects</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      {data.projects && data.projects.length > 0 && (
        <section id="work" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Portfolio</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Selected Work</h2>
              </div>
              <p className="text-gray-500 max-w-sm hidden md:block">
                A collection of projects I&apos;ve designed and built over the years.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-500"
                >
                  {/* Project preview placeholder */}
                  <div
                    className="aspect-[16/10] flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: `${primaryColor}${(index % 4 + 1) * 10}` }}
                  >
                    <span className="text-6xl font-black text-white/20">{String(index + 1).padStart(2, '0')}</span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    {/* View button */}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-xl"
                      >
                        <Eye className="w-6 h-6 text-gray-900" />
                      </a>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">{project.name}</h3>
                      <div className="flex gap-2 shrink-0">
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>About Me</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Passionate about creating meaningful experiences
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {data.bio || "I'm a designer who believes in the power of thoughtful design to solve complex problems and create delightful user experiences."}
              </p>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="inline-flex items-center gap-2 text-lg font-semibold transition-colors"
                  style={{ color: primaryColor }}
                >
                  <Mail className="w-5 h-5" />
                  {data.email}
                </a>
              )}
            </div>

            {/* Experience Timeline */}
            {data.experience && data.experience.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Experience</h3>
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
                        {index < data.experience!.length - 1 && (
                          <div className="w-px flex-1 bg-gray-200 my-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="text-sm text-gray-500 mb-1">
                          {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                        </p>
                        <h4 className="font-bold text-gray-900">{exp.position}</h4>
                        <p style={{ color: primaryColor }}>{exp.company}</p>
                        {exp.description && (
                          <p className="text-gray-600 mt-2 text-sm">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section id="skills" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Expertise</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Skills & Tools</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {skill.name.charAt(0)}
                  </div>
                  <p className="font-semibold text-gray-900">{skill.name}</p>
                  {skill.level && (
                    <p className="text-sm text-gray-500 capitalize mt-1">{skill.level}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {(data.education?.length || data.certifications?.length) && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Education */}
              {data.education && data.education.length > 0 && (
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Education</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Academic Background</h3>
                  <div className="space-y-6">
                    {data.education.map((edu, index) => (
                      <div key={index} className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                        <p className="text-sm text-gray-500 mb-2">
                          {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                        </p>
                        <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                        {edu.field && <p style={{ color: primaryColor }} className="font-medium">{edu.field}</p>}
                        <p className="text-gray-600">{edu.institution}</p>
                        {edu.gpa && <p className="text-sm text-gray-500 mt-2">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Certifications</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Professional Credentials</h3>
                  <div className="space-y-4">
                    {data.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${primaryColor}20` }}
                        >
                          <span className="text-lg" style={{ color: primaryColor }}>✓</span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-900">{cert.name}</h4>
                          <p className="text-sm text-gray-500">{cert.issuer} • {cert.date}</p>
                        </div>
                        {cert.url && (
                          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                            <ArrowUpRight className="w-5 h-5" />
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

      {/* Contact Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Get in Touch</p>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Let&apos;s work together
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Drop me a line and let&apos;s create something amazing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: primaryColor }}
              >
                <Mail className="w-5 h-5" />
                Send me an email
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 font-semibold transition-all hover:bg-gray-50"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold" style={{ color: primaryColor }}>
              {data.fullName?.split(' ').map(n => n[0]).join('') || 'D'}
            </span>
            <span className="text-gray-400">•</span>
            <p className="text-gray-500">© {new Date().getFullYear()} All rights reserved</p>
          </div>
          <div className="flex gap-4">
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {data.website && (
              <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
