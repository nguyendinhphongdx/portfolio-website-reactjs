"use client";

import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, Star, ArrowUpRight, Zap, Heart } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface CreativeTemplateProps {
  data: PortfolioData;
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const primaryColor = data.primaryColor || "#ff6b6b";
  const accentColor = "#ffd93d";
  const secondaryColor = "#6bcb77";

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white overflow-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full" style={{ backgroundColor: primaryColor, opacity: 0.1 }} />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.1 }} />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full" style={{ backgroundColor: secondaryColor, opacity: 0.1 }} />
        {/* Geometric shapes */}
        <div className="absolute top-1/3 right-10 w-20 h-20 rotate-45" style={{ border: `2px solid ${primaryColor}`, opacity: 0.2 }} />
        <div className="absolute bottom-1/3 left-20 w-16 h-16" style={{ border: `2px solid ${accentColor}`, borderRadius: "30%", opacity: 0.2, transform: "rotate(15deg)" }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black" style={{ backgroundColor: primaryColor }}>
              {data.fullName?.charAt(0) || "C"}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`} className="px-5 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105" style={{ backgroundColor: primaryColor }}>
                Contact Me
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Bento Grid Style */}
      <section className="min-h-screen pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-[minmax(100px,auto)]">
            {/* Main intro card */}
            <div className="lg:col-span-7 lg:row-span-3 rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ backgroundColor: accentColor }} />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  Available for projects
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-[0.9]">
                  {data.fullName || "Creative Professional"}
                </h1>
                <p className="text-xl md:text-2xl font-medium opacity-90 mb-6">
                  {data.title || "Making ideas come alive"}
                </p>
                {data.bio && (
                  <p className="text-lg opacity-80 max-w-xl leading-relaxed">
                    {data.bio}
                  </p>
                )}
              </div>
              {/* Decorative elements */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                <div className="w-4 h-4 rounded-full bg-white/30" />
                <div className="w-4 h-4 rounded-full bg-white/50" />
                <div className="w-4 h-4 rounded-full bg-white/70" />
              </div>
            </div>

            {/* Avatar card */}
            {data.avatar ? (
              <div className="lg:col-span-5 lg:row-span-2 rounded-3xl overflow-hidden relative group">
                <img
                  src={data.avatar}
                  alt={data.fullName || "Profile"}
                  className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ) : (
              <div className="lg:col-span-5 lg:row-span-2 rounded-3xl flex items-center justify-center" style={{ backgroundColor: secondaryColor }}>
                <span className="text-8xl font-black opacity-50">{data.fullName?.charAt(0) || "?"}</span>
              </div>
            )}

            {/* Location card */}
            {data.location && (
              <div className="lg:col-span-5 rounded-3xl bg-white/5 backdrop-blur p-6 flex items-center gap-4 border border-white/10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <MapPin className="w-6 h-6 text-[#1a1a2e]" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Based in</p>
                  <p className="text-xl font-bold">{data.location}</p>
                </div>
              </div>
            )}

            {/* Quick stats */}
            <div className="lg:col-span-4 rounded-3xl p-6 flex flex-col justify-center" style={{ backgroundColor: accentColor, color: "#1a1a2e" }}>
              <p className="text-5xl font-black">{data.experience?.length || 0}+</p>
              <p className="font-semibold">Years of Experience</p>
            </div>

            <div className="lg:col-span-4 rounded-3xl p-6 flex flex-col justify-center" style={{ backgroundColor: secondaryColor, color: "#1a1a2e" }}>
              <p className="text-5xl font-black">{data.projects?.length || 0}+</p>
              <p className="font-semibold">Projects Completed</p>
            </div>

            <div className="lg:col-span-4 rounded-3xl bg-white/5 backdrop-blur p-6 flex flex-col justify-center border border-white/10">
              <p className="text-5xl font-black" style={{ color: primaryColor }}>{data.skills?.length || 0}+</p>
              <p className="font-semibold text-white/80">Skills Mastered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Marquee style */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-16 border-y border-white/10">
          <div className="mb-8 px-6">
            <h2 className="text-center text-3xl font-black">
              <span style={{ color: accentColor }}>★</span> Skills & Expertise <span style={{ color: accentColor }}>★</span>
            </h2>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
              {[...data.skills, ...data.skills].map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 shrink-0"
                >
                  <Star className="w-5 h-5" style={{ color: primaryColor }} />
                  <span className="text-lg font-semibold">{skill.name}</span>
                  {skill.level && (
                    <span className="px-2 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}>
                      {skill.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: secondaryColor }}>
                <Zap className="w-8 h-8 text-[#1a1a2e]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black">Career Journey</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="group rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 md:p-8 hover:bg-white/10 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
                        style={{ backgroundColor: index % 3 === 0 ? primaryColor : index % 3 === 1 ? accentColor : secondaryColor, color: "#1a1a2e" }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">{exp.position}</h3>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10">
                          {exp.startDate} → {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <p className="text-xl mb-2" style={{ color: primaryColor }}>{exp.company}</p>
                      {exp.location && <p className="text-white/60 mb-3">{exp.location}</p>}
                      {exp.description && (
                        <p className="text-white/80 leading-relaxed">{exp.description}</p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/70">
                              <span style={{ color: accentColor }}>→</span>
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
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black">Featured Work</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="group rounded-3xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden hover:border-white/30 transition-all"
                >
                  <div className="h-3" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${accentColor}, ${secondaryColor})` }} />
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-bold">{project.name}</h3>
                      <div className="flex gap-2 shrink-0">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-white/70 mb-4 leading-relaxed">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-xl text-sm font-medium bg-white/10"
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

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <span className="text-2xl">🎓</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black">Education</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 hover:bg-white/10 transition-all"
                >
                  <div className="text-sm text-white/60 mb-2">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                  {edu.field && <p style={{ color: secondaryColor }} className="font-medium mb-2">{edu.field}</p>}
                  <p className="text-white/70">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-white/50 mt-2">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: secondaryColor }}>
                <span className="text-2xl">🏆</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black">Certifications</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {data.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 px-6 py-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-sm text-white/60">{cert.issuer} • {cert.date}</p>
                  </div>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-white/40 hover:text-white transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12 text-center" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}>
            <Heart className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#1a1a2e]">
              Let&apos;s Create Something Amazing
            </h2>
            <p className="text-xl mb-8 text-[#1a1a2e]/80 max-w-xl mx-auto">
              Have an exciting project? Let&apos;s talk and make it happen together!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1a2e] rounded-2xl text-white font-bold hover:scale-105 transition-transform"
                >
                  <Mail className="w-5 h-5" />
                  {data.email}
                </a>
              )}
              {data.phone && (
                <a
                  href={`tel:${data.phone}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/30 backdrop-blur rounded-2xl text-[#1a1a2e] font-bold hover:bg-white/50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {data.phone}
                </a>
              )}
            </div>
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-[#1a1a2e]/80 hover:text-[#1a1a2e] font-medium"
              >
                <Globe className="w-5 h-5" />
                {data.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60">
            © {new Date().getFullYear()} {data.fullName}. Made with <Heart className="w-4 h-4 inline" style={{ color: primaryColor }} />
          </p>
          <div className="flex gap-4">
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
