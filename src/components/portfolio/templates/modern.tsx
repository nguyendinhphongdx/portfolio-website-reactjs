import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface ModernTemplateProps {
  data: PortfolioData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const primaryColor = data.primaryColor || "#3b82f6";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section with Gradient */}
      <section
        className="relative py-32 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}20 0%, ${primaryColor}05 50%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {data.avatar && (
              <div
                className="relative p-1 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, transparent)`,
                }}
              >
                <img
                  src={data.avatar}
                  alt={data.fullName || "Profile"}
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {data.fullName || "Your Name"}
              </h1>
              {data.title && (
                <p
                  className="text-xl md:text-2xl font-medium mb-4"
                  style={{ color: primaryColor }}
                >
                  {data.title}
                </p>
              )}
              {data.location && (
                <p className="flex items-center gap-2 text-slate-400 justify-center md:justify-start">
                  <MapPin className="w-4 h-4" />
                  {data.location}
                </p>
              )}
            </div>
          </div>

          {data.bio && (
            <p className="mt-8 text-lg text-slate-300 max-w-2xl leading-relaxed">
              {data.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur transition-all hover:scale-105"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur transition-all hover:scale-105"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a
                href={data.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur transition-all hover:scale-105"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur transition-all hover:scale-105"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${primaryColor}, white)`,
                }}
              >
                Skills & Technologies
              </span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur border transition-all hover:scale-105"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    borderColor: `${primaryColor}30`,
                  }}
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
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <p style={{ color: primaryColor }}>{exp.company}</p>
                    </div>
                    <p className="text-slate-400 text-sm mt-2 md:mt-0">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-slate-300">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-slate-400 text-sm"
                        >
                          <ArrowRight
                            className="w-4 h-4 mt-0.5 shrink-0"
                            style={{ color: primaryColor }}
                          />
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
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]"
                >
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  {project.description && (
                    <p className="text-slate-400 text-sm mb-4">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded text-xs bg-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {(project.url || project.github) && (
                    <div className="flex gap-4">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                          style={{ color: primaryColor }}
                        >
                          Live Demo <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  {edu.field && (
                    <p style={{ color: primaryColor }}>{edu.field}</p>
                  )}
                  <p className="text-slate-400 mt-2">{edu.institution}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Let&apos;s Connect</h2>
          <div className="flex flex-col items-center gap-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                {data.email}
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                {data.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-slate-500 text-sm border-t border-white/5">
        <p>
          © {new Date().getFullYear()} {data.fullName}. Built with passion.
        </p>
      </footer>
    </div>
  );
}
