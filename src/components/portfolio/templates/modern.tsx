"use client";

import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, ExternalLink, ArrowUpRight, Briefcase, GraduationCap, Award, Zap } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface ModernTemplateProps {
  data: PortfolioData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const primaryColor = data.primaryColor || "#6366f1";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: primaryColor }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15" style={{ backgroundColor: primaryColor }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIwMjAzMCIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
              {data.fullName?.charAt(0) || "P"}
            </div>
            <span className="font-semibold text-white/90 hidden sm:block">{data.fullName?.split(" ")[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-105">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-105">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-105">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`} className="ml-2 px-5 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25" style={{ backgroundColor: primaryColor }}>
                Hire Me
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {data.avatar && (
              <div className="relative group">
                <div className="absolute -inset-1 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" style={{ backgroundColor: primaryColor }} />
                <img
                  src={data.avatar}
                  alt={data.fullName || "Profile"}
                  className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-3xl object-cover border-2 border-white/10"
                />
              </div>
            )}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                Available for work
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{data.fullName || "Developer"}</span>
              </h1>
              {data.title && (
                <p className="text-2xl lg:text-3xl font-medium mb-6" style={{ color: primaryColor }}>
                  {data.title}
                </p>
              )}
              {data.bio && (
                <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                  {data.bio}
                </p>
              )}
              {data.location && (
                <p className="flex items-center gap-2 text-white/50 justify-center lg:justify-start">
                  <MapPin className="w-5 h-5" />
                  {data.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Zap className="w-6 h-6" style={{ color: primaryColor }} />
              <h2 className="text-3xl font-bold">Skills & Expertise</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all hover:scale-105 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 font-bold transition-colors" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                    {skill.name.charAt(0)}
                  </div>
                  <p className="font-medium text-white/90">{skill.name}</p>
                  {skill.level && (
                    <p className="text-sm text-white/40 capitalize mt-1">{skill.level}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="w-6 h-6" style={{ color: primaryColor }} />
              <h2 className="text-3xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 pr-40">{exp.position}</h3>
                  <p className="text-lg font-medium mb-4" style={{ color: primaryColor }}>
                    {exp.company}
                    {exp.location && <span className="text-white/40 font-normal"> • {exp.location}</span>}
                  </p>
                  {exp.description && (
                    <p className="text-white/60 leading-relaxed mb-4">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/60">
                          <ArrowUpRight className="w-5 h-5 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/20 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at top right, ${primaryColor}10, transparent 50%)` }} />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex gap-2 shrink-0">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/10 transition-colors" style={{ backgroundColor: `${primaryColor}20` }}>
                            <ExternalLink className="w-5 h-5" style={{ color: primaryColor }} />
                          </a>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-white/60 mb-6 leading-relaxed">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/70 border border-white/10">
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

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <GraduationCap className="w-6 h-6" style={{ color: primaryColor }} />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.education.map((edu, index) => (
                <div key={index} className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <p className="text-sm font-medium mb-3" style={{ color: primaryColor }}>
                    {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                  {edu.field && <p className="text-white/70 mb-2">{edu.field}</p>}
                  <p className="text-white/50">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-white/40 mt-2">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <Award className="w-6 h-6" style={{ color: primaryColor }} />
              <h2 className="text-3xl font-bold">Certifications</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.certifications.map((cert, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <h3 className="font-semibold text-white mb-1">{cert.name}</h3>
                  <p className="text-sm text-white/50 mb-3">{cert.issuer}</p>
                  <div className="flex items-center justify-between">
                    {cert.date && <span className="text-xs text-white/40">{cert.date}</span>}
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:underline" style={{ color: primaryColor }}>
                        View →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, white)` }}>
              Amazing
            </span>
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-xl mx-auto">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold transition-all hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: primaryColor, boxShadow: `0 20px 40px -10px ${primaryColor}50` }}
              >
                <Mail className="w-5 h-5" />
                {data.email}
              </a>
            )}
            {data.phone && (
              <a href={`tel:${data.phone}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-all">
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} {data.fullName}. Crafted with passion.</p>
          <div className="flex items-center gap-4">
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">GitHub</a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">LinkedIn</a>
            )}
            {data.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Twitter</a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
