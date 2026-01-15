import { Github, Linkedin, Twitter, Globe, Mail, Terminal, Code, Database, Server } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface DeveloperTemplateProps {
  data: PortfolioData;
}

export function DeveloperTemplate({ data }: DeveloperTemplateProps) {
  const primaryColor = data.primaryColor || "#22c55e";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-mono">
      {/* Terminal Header */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-400 text-sm ml-2">
              ~/{data.fullName?.toLowerCase().replace(/\s+/g, "-") || "developer"}/portfolio
            </span>
          </div>
          <div className="flex gap-4">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a
                href={data.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" style={{ color: primaryColor }} />
              <span className="text-sm text-gray-400">bash</span>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span style={{ color: primaryColor }}>$</span>{" "}
                <span className="text-gray-400">whoami</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold">
                {data.fullName || "Anonymous Developer"}
              </div>

              <div>
                <span style={{ color: primaryColor }}>$</span>{" "}
                <span className="text-gray-400">cat title.txt</span>
              </div>
              <div className="text-xl" style={{ color: primaryColor }}>
                {data.title || "Software Engineer"}
              </div>

              {data.bio && (
                <>
                  <div>
                    <span style={{ color: primaryColor }}>$</span>{" "}
                    <span className="text-gray-400">cat about.md</span>
                  </div>
                  <div className="text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
                    {data.bio}
                  </div>
                </>
              )}

              {data.location && (
                <div className="text-gray-500">
                  <span style={{ color: primaryColor }}>$</span> echo $LOCATION
                  <br />
                  <span className="text-gray-400">{data.location}</span>
                </div>
              )}

              <div className="pt-4 flex gap-4">
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded border hover:bg-gray-800 transition-colors"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </a>
                )}
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
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

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Code className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="text-2xl font-bold">tech_stack.json</h2>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <pre className="text-sm overflow-x-auto">
                <code>
                  <span className="text-gray-500">{"{"}</span>
                  {"\n"}
                  <span className="text-gray-500">{"  "}"skills":</span> [
                  {data.skills.map((skill, index) => (
                    <span key={index}>
                      {"\n    "}
                      <span style={{ color: primaryColor }}>"{skill.name}"</span>
                      {index < data.skills!.length - 1 && ","}
                    </span>
                  ))}
                  {"\n  "}],
                  {"\n"}
                  <span className="text-gray-500">{"  "}"proficiency":</span>{" "}
                  <span className="text-yellow-400">"expert"</span>,
                  {"\n"}
                  <span className="text-gray-500">{"  "}"learning":</span>{" "}
                  <span className="text-blue-400">true</span>
                  {"\n"}
                  <span className="text-gray-500">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Server className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="text-2xl font-bold">work_history.log</h2>
            </div>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg border border-gray-800 p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <span className="text-gray-500">[</span>
                      <span style={{ color: primaryColor }}>{exp.startDate}</span>
                      <span className="text-gray-500"> - </span>
                      <span style={{ color: primaryColor }}>
                        {exp.current ? "present" : exp.endDate}
                      </span>
                      <span className="text-gray-500">]</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                  <p className="text-gray-400 mb-4">@ {exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                          <span style={{ color: primaryColor }}>→</span>
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
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Database className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="text-2xl font-bold">projects/</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: primaryColor }}>$</span>
                    <span className="font-bold">{project.name}</span>
                  </div>
                  {project.description && (
                    <p className="text-gray-400 text-sm mb-4">
                      # {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded"
                          style={{
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 text-sm">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: primaryColor }}
                      >
                        [live]
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        [source]
                      </a>
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
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <span style={{ color: primaryColor }}>📚</span>
              <h2 className="text-2xl font-bold">education.md</h2>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="text-gray-500 text-sm mb-1">
                    ## {edu.startDate} - {edu.current ? "present" : edu.endDate}
                  </div>
                  <h3 className="text-lg font-bold">{edu.degree}</h3>
                  {edu.field && (
                    <p style={{ color: primaryColor }}>{edu.field}</p>
                  )}
                  <p className="text-gray-400">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="mb-4">
              <span style={{ color: primaryColor }}>$</span> cat contact.txt
            </div>
            <div className="space-y-2 text-gray-300">
              {data.email && (
                <div>
                  <span className="text-gray-500">email:</span>{" "}
                  <a
                    href={`mailto:${data.email}`}
                    className="hover:underline"
                    style={{ color: primaryColor }}
                  >
                    {data.email}
                  </a>
                </div>
              )}
              {data.phone && (
                <div>
                  <span className="text-gray-500">phone:</span>{" "}
                  <a
                    href={`tel:${data.phone}`}
                    className="hover:underline"
                    style={{ color: primaryColor }}
                  >
                    {data.phone}
                  </a>
                </div>
              )}
              {data.location && (
                <div>
                  <span className="text-gray-500">location:</span> {data.location}
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <span className="text-gray-500">
                # Feel free to reach out for collaborations or just to say hi!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-600 border-t border-gray-800">
        <p>
          <span style={{ color: primaryColor }}>©</span> {new Date().getFullYear()}{" "}
          {data.fullName} <span className="text-gray-700">|</span> Built with{" "}
          <span style={{ color: primaryColor }}>&lt;code/&gt;</span>
        </p>
      </footer>
    </div>
  );
}
