"use client";

import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, ExternalLink, Calendar, Building2, GraduationCap, Award, ChevronRight } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface MinimalTemplateProps {
  data: PortfolioData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const primaryColor = data.primaryColor || "#0f172a";

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight" style={{ color: primaryColor }}>
            {data.fullName?.split(" ")[0] || "Portfolio"}
          </span>
          <div className="flex items-center gap-1">
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Github className="w-4 h-4 text-gray-600" />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Linkedin className="w-4 h-4 text-gray-600" />
              </a>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`} className="ml-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90" style={{ backgroundColor: primaryColor }}>
                Contact
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {data.avatar && (
              <div className="shrink-0">
                <img
                  src={data.avatar}
                  alt={data.fullName || "Profile"}
                  className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-3">
                {data.fullName || "Your Name"}
              </h1>
              {data.title && (
                <p className="text-xl text-gray-600 font-medium mb-4">{data.title}</p>
              )}
              {data.location && (
                <p className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {data.location}
                </p>
              )}
              {data.bio && (
                <p className="text-gray-600 leading-relaxed max-w-2xl">
                  {data.bio}
                </p>
              )}

              {/* Quick Links */}
              <div className="flex flex-wrap gap-3 mt-6">
                {data.website && (
                  <a href={data.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all">
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
                {data.twitter && (
                  <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-12 px-6 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Work Experience
            </h2>
            <div className="space-y-10">
              {data.experience.map((exp, index) => (
                <div key={index} className="group">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-48 shrink-0">
                      <p className="text-sm font-medium text-gray-400">
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-gray-600 font-medium" style={{ color: primaryColor }}>
                        {exp.company}
                        {exp.location && <span className="text-gray-400 font-normal"> · {exp.location}</span>}
                      </p>
                      {exp.description && (
                        <p className="text-gray-600 mt-3 leading-relaxed">{exp.description}</p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
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

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8">Featured Projects</h2>
            <div className="grid gap-6">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="text-gray-600 mt-2 leading-relaxed">{project.description}</p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {(project.url || project.github) && (
                      <div className="flex gap-2 shrink-0">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Github className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          </a>
                        )}
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <ExternalLink className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="py-12 px-6 bg-white border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h2>
            <div className="space-y-8">
              {data.education.map((edu, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-48 shrink-0">
                    <p className="text-sm font-medium text-gray-400">
                      {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    <p className="text-gray-500">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-400 mt-1">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.certifications.map((cert, index) => (
                <div key={index} className="p-4 bg-white border border-gray-200 rounded-xl">
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  {cert.date && (
                    <p className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                      <Calendar className="w-3 h-3" />
                      {cert.date}
                    </p>
                  )}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium mt-2 hover:underline" style={{ color: primaryColor }}>
                      View credential <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Let's work together</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {data.email && (
              <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                <Mail className="w-5 h-5" />
                {data.email}
              </a>
            )}
            {data.phone && (
              <a href={`tel:${data.phone}`} className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-lg font-medium hover:border-gray-600 transition-colors">
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 bg-gray-900 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {data.fullName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
