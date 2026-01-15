"use client";

import { Github, Linkedin, Twitter, Globe, Mail, Phone, Terminal, Code2, Folder, FileCode, GitBranch, ExternalLink, ChevronRight } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface DeveloperTemplateProps {
  data: PortfolioData;
}

export function DeveloperTemplate({ data }: DeveloperTemplateProps) {
  const primaryColor = data.primaryColor || "#10b981";

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono">
      {/* Terminal Header */}
      <header className="sticky top-0 z-50 bg-[#161b22]/95 backdrop-blur-sm border-b border-[#30363d]">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[#8b949e] text-sm hidden sm:block">
                ~/{data.fullName?.toLowerCase().replace(/\s+/g, "-") || "dev"} — zsh
              </span>
            </div>
            <div className="flex items-center gap-3">
              {data.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {data.twitter && (
                <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {data.website && (
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Terminal */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden shadow-2xl">
            <div className="bg-[#21262d] px-4 py-2 border-b border-[#30363d] flex items-center gap-2">
              <Terminal className="w-4 h-4" style={{ color: primaryColor }} />
              <span className="text-sm text-[#8b949e]">portfolio.sh</span>
            </div>
            <div className="p-6 space-y-4 text-sm">
              {/* whoami */}
              <div className="flex items-start gap-2">
                <span style={{ color: primaryColor }}>❯</span>
                <span className="text-[#8b949e]">whoami</span>
              </div>
              <div className="pl-4">
                <p className="text-2xl md:text-3xl font-bold text-white">{data.fullName || "Developer"}</p>
              </div>

              {/* cat role.txt */}
              <div className="flex items-start gap-2 pt-4">
                <span style={{ color: primaryColor }}>❯</span>
                <span className="text-[#8b949e]">cat role.txt</span>
              </div>
              <div className="pl-4">
                <p className="text-lg" style={{ color: primaryColor }}>{data.title || "Software Engineer"}</p>
              </div>

              {/* cat about.md */}
              {data.bio && (
                <>
                  <div className="flex items-start gap-2 pt-4">
                    <span style={{ color: primaryColor }}>❯</span>
                    <span className="text-[#8b949e]">cat about.md</span>
                  </div>
                  <div className="pl-4 border-l-2 border-[#30363d] ml-2 text-[#c9d1d9] leading-relaxed">
                    {data.bio}
                  </div>
                </>
              )}

              {/* echo $LOCATION */}
              {data.location && (
                <>
                  <div className="flex items-start gap-2 pt-4">
                    <span style={{ color: primaryColor }}>❯</span>
                    <span className="text-[#8b949e]">echo $LOCATION</span>
                  </div>
                  <div className="pl-4 text-[#8b949e]">{data.location}</div>
                </>
              )}

              {/* Contact buttons */}
              <div className="flex flex-wrap gap-3 pt-6">
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-[#21262d]"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                )}
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#21262d] border border-[#30363d] hover:border-[#8b949e] transition-all"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills as JSON */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="text-xl font-bold text-white">tech_stack.json</h2>
            </div>
            <div className="bg-[#161b22] rounded-xl border border-[#30363d] p-6 overflow-x-auto">
              <pre className="text-sm">
                <code>
                  <span className="text-[#8b949e]">{"{"}</span>{"\n"}
                  <span className="text-[#8b949e]">{"  "}</span>
                  <span className="text-[#79c0ff]">&quot;skills&quot;</span>
                  <span className="text-[#8b949e]">: [</span>{"\n"}
                  {data.skills.map((skill, index) => (
                    <span key={index}>
                      {"    "}
                      <span style={{ color: primaryColor }}>&quot;{skill.name}&quot;</span>
                      {index < data.skills!.length - 1 && <span className="text-[#8b949e]">,</span>}
                      {"\n"}
                    </span>
                  ))}
                  <span className="text-[#8b949e]">{"  "}],</span>{"\n"}
                  <span className="text-[#8b949e]">{"  "}</span>
                  <span className="text-[#79c0ff]">&quot;status&quot;</span>
                  <span className="text-[#8b949e]">: </span>
                  <span className="text-[#a5d6ff]">&quot;always_learning&quot;</span>{"\n"}
                  <span className="text-[#8b949e]">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <GitBranch className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="text-xl font-bold text-white">git log --oneline career</h2>
            </div>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-[#161b22] rounded-xl border border-[#30363d] p-6 hover:border-[#8b949e] transition-all"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                      {exp.startDate} → {exp.current ? "HEAD" : exp.endDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{exp.position}</h3>
                  <p className="text-[#8b949e] mb-3">
                    <span className="text-[#79c0ff]">@</span> {exp.company}
                    {exp.location && <span className="text-[#6e7681]"> • {exp.location}</span>}
                  </p>
                  {exp.description && (
                    <p className="text-[#8b949e] text-sm mb-3">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#8b949e]">
                          <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: primaryColor }} />
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

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Folder className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="text-xl font-bold text-white">ls ~/projects/</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-[#161b22] rounded-xl border border-[#30363d] p-6 hover:border-[#8b949e] transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-[#8b949e]" />
                      <h3 className="font-bold text-white">{project.name}</h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-white transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: primaryColor }}>
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-[#8b949e] text-sm mb-4">
                      <span className="text-[#6e7681]"># </span>
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded border"
                          style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30`, color: primaryColor }}
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

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl" style={{ color: primaryColor }}>📚</span>
              <h2 className="text-xl font-bold text-white">education.md</h2>
            </div>
            <div className="bg-[#161b22] rounded-xl border border-[#30363d] divide-y divide-[#30363d]">
              {data.education.map((edu, index) => (
                <div key={index} className="p-6">
                  <div className="text-sm text-[#8b949e] mb-2">
                    <span className="text-[#6e7681]">## </span>
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </div>
                  <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                  {edu.field && <p style={{ color: primaryColor }}>{edu.field}</p>}
                  <p className="text-[#8b949e]">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-[#6e7681] mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#161b22] rounded-xl border border-[#30363d] p-6">
            <div className="flex items-start gap-2 mb-4">
              <span style={{ color: primaryColor }}>❯</span>
              <span className="text-[#8b949e]">cat contact.txt</span>
            </div>
            <div className="pl-4 space-y-2">
              {data.email && (
                <div className="flex items-center gap-2">
                  <span className="text-[#6e7681] w-20">email:</span>
                  <a href={`mailto:${data.email}`} className="hover:underline" style={{ color: primaryColor }}>{data.email}</a>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <span className="text-[#6e7681] w-20">phone:</span>
                  <a href={`tel:${data.phone}`} className="hover:underline" style={{ color: primaryColor }}>{data.phone}</a>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2">
                  <span className="text-[#6e7681] w-20">location:</span>
                  <span className="text-[#c9d1d9]">{data.location}</span>
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-[#30363d]">
              <span className="text-[#6e7681] text-sm"># Open for opportunities. Feel free to reach out!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#30363d]">
        <div className="max-w-4xl mx-auto text-center text-[#6e7681] text-sm">
          <p>
            <span style={{ color: primaryColor }}>©</span> {new Date().getFullYear()} {data.fullName}
            <span className="mx-2">|</span>
            Built with <span style={{ color: primaryColor }}>&lt;code/&gt;</span> and ☕
          </p>
        </div>
      </footer>
    </div>
  );
}
