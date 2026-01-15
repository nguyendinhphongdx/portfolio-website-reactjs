import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface CreativeTemplateProps {
  data: PortfolioData;
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const primaryColor = data.primaryColor || "#ec4899";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "#fbbf24" }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur text-sm font-medium mb-6 shadow-sm">
                <Sparkles className="w-4 h-4" style={{ color: primaryColor }} />
                Welcome to my portfolio
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                <span className="block">Hi, I&apos;m</span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #f59e0b)`,
                  }}
                >
                  {data.fullName?.split(" ")[0] || "Creative"}
                </span>
              </h1>
              {data.title && (
                <p className="text-2xl text-gray-600 mb-6 font-medium">
                  {data.title}
                </p>
              )}
              {data.bio && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {data.bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex gap-3 mt-8">
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {data.twitter && (
                  <a
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
                {data.website && (
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <Globe className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>

            {data.avatar && (
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl rotate-6 opacity-50"
                  style={{ backgroundColor: primaryColor }}
                />
                <img
                  src={data.avatar}
                  alt={data.fullName || "Profile"}
                  className="relative w-full aspect-square rounded-3xl object-cover shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center">
              My <span style={{ color: primaryColor }}>Superpowers</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-center group"
                >
                  <div
                    className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {skill.name.charAt(0)}
                  </div>
                  <span className="font-semibold">{skill.name}</span>
                  {skill.level && (
                    <p className="text-sm text-gray-500 capitalize mt-1">
                      {skill.level}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center">
              My <span style={{ color: primaryColor }}>Journey</span>
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full"
                  style={{ "--tw-before-bg": primaryColor } as React.CSSProperties}
                >
                  <div
                    className="absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-1.5"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{exp.position}</h3>
                        <p
                          className="text-lg font-medium"
                          style={{ color: primaryColor }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm mt-2 md:mt-0">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-600">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center">
              Featured <span style={{ color: primaryColor }}>Work</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div
                    className="w-full h-2 rounded-full mb-6"
                    style={{
                      background: `linear-gradient(to right, ${primaryColor}, #f59e0b)`,
                    }}
                  />
                  <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-600 mb-4">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-sm font-medium"
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
                  {(project.url || project.github) && (
                    <div className="flex gap-4">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 rounded-full text-white font-medium transition-transform hover:scale-105"
                          style={{ backgroundColor: primaryColor }}
                        >
                          View Project
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 rounded-full border-2 font-medium transition-colors hover:bg-gray-50"
                          style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                          GitHub
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

      {/* Contact Section */}
      <section
        className="py-20 px-4 text-white"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, #f59e0b)`,
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-8">Let&apos;s Create Together</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full text-gray-900 font-semibold hover:scale-105 transition-transform"
              >
                <Mail className="w-5 h-5" />
                {data.email}
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 rounded-full font-semibold hover:bg-white/30 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
            )}
          </div>
          {data.location && (
            <p className="flex items-center justify-center gap-2 mt-8 opacity-80">
              <MapPin className="w-5 h-5" />
              {data.location}
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-500">
        <p>Made with love by {data.fullName} © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
