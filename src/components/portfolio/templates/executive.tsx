"use client";

import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, Briefcase, Award, GraduationCap, TrendingUp, Users, Target, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface ExecutiveTemplateProps {
  data: PortfolioData;
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  const primaryColor = data.primaryColor || "#1e3a5f";

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
      {/* Elegant Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="font-semibold text-xl tracking-wide" style={{ color: primaryColor }}>
              {data.fullName?.split(' ')[0]?.toUpperCase() || 'EXECUTIVE'}
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#experience" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Experience</a>
              <a href="#achievements" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Achievements</a>
              <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="px-5 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Get in Touch
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: primaryColor }}>
                {data.title || "Executive Leadership"}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {data.fullName || "Professional Name"}
              </h1>
              <div className="w-20 h-1 mb-8" style={{ backgroundColor: primaryColor }} />
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
                {data.bio || "Driving organizational excellence through strategic vision, decisive leadership, and a commitment to delivering exceptional results."}
              </p>
              <div className="flex flex-wrap gap-6">
                {data.location && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-5 h-5" />
                    <span>{data.location}</span>
                  </div>
                )}
                {data.phone && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Phone className="w-5 h-5" />
                    <span>{data.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Avatar */}
            <div className="lg:col-span-5">
              {data.avatar ? (
                <div className="relative">
                  <div className="absolute -inset-4 border-2 border-gray-100" style={{ borderColor: `${primaryColor}20` }} />
                  <img
                    src={data.avatar}
                    alt={data.fullName || "Profile"}
                    className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] flex items-center justify-center" style={{ backgroundColor: `${primaryColor}10` }}>
                  <Briefcase className="w-24 h-24" style={{ color: `${primaryColor}30` }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 px-6" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">{data.experience?.length || 0}+</p>
              <p className="text-sm tracking-wider opacity-80 uppercase">Years Leadership</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">{data.projects?.length || 0}+</p>
              <p className="text-sm tracking-wider opacity-80 uppercase">Key Initiatives</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">{data.skills?.length || 0}+</p>
              <p className="text-sm tracking-wider opacity-80 uppercase">Core Competencies</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">{data.certifications?.length || 0}+</p>
              <p className="text-sm tracking-wider opacity-80 uppercase">Certifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: primaryColor }}>Profile</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Professional Summary</h2>
              <div className="w-16 h-1 mb-8" style={{ backgroundColor: primaryColor }} />
              <p className="text-lg text-gray-600 leading-relaxed">
                {data.bio || "A results-driven executive with extensive experience in strategic planning, organizational development, and operational excellence. Proven track record of leading high-performing teams and driving sustainable growth."}
              </p>
            </div>

            {/* Core Competencies */}
            {data.skills && data.skills.length > 0 && (
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: primaryColor }}>Expertise</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Competencies</h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <ChevronRight className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                      <span className="text-gray-700">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section id="experience" className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: primaryColor }}>Career</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Professional Experience</h2>
            </div>

            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <div key={index} className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="md:w-48 shrink-0">
                      <p className="text-sm font-medium" style={{ color: primaryColor }}>
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </p>
                      {exp.location && (
                        <p className="text-sm text-gray-500 mt-1">{exp.location}</p>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                          <p className="text-lg" style={{ color: primaryColor }}>{exp.company}</p>
                        </div>
                        <div className="w-12 h-12 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: `${primaryColor}10` }}>
                          <Briefcase className="w-6 h-6" style={{ color: primaryColor }} />
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600">
                              <Target className="w-5 h-5 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                              {highlight}
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

      {/* Projects/Initiatives */}
      {data.projects && data.projects.length > 0 && (
        <section id="achievements" className="py-24 px-6 border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: primaryColor }}>Achievements</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Key Initiatives & Projects</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <div key={index} className="group border border-gray-100 p-8 hover:border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: primaryColor }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm border border-gray-200 text-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {(data.education?.length || data.certifications?.length) && (
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Education */}
              {data.education && data.education.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: `${primaryColor}10` }}>
                      <GraduationCap className="w-6 h-6" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                  </div>
                  <div className="space-y-6">
                    {data.education.map((edu, index) => (
                      <div key={index} className="bg-white p-6 border border-gray-100">
                        <p className="text-sm mb-2" style={{ color: primaryColor }}>
                          {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                        </p>
                        <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                        {edu.field && <p style={{ color: primaryColor }}>{edu.field}</p>}
                        <p className="text-gray-600">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-500 mt-2">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: `${primaryColor}10` }}>
                      <Award className="w-6 h-6" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
                  </div>
                  <div className="space-y-4">
                    {data.certifications.map((cert, index) => (
                      <div key={index} className="bg-white p-6 border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: `${primaryColor}10` }}>
                          <Award className="w-5 h-5" style={{ color: primaryColor }} />
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
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: primaryColor }}>Connect</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Let&apos;s Discuss Opportunities
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Open to executive roles, board positions, advisory opportunities, and strategic consulting engagements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                <Mail className="w-5 h-5" />
                {data.email}
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {data.fullName}. All rights reserved.
          </p>
          <div className="flex gap-6">
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
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
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
