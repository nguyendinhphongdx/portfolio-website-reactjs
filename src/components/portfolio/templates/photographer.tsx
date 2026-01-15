"use client";

import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, Camera, Instagram, Aperture, Image, ArrowUpRight, X } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import { useState } from "react";

interface PhotographerTemplateProps {
  data: PortfolioData;
}

export function PhotographerTemplate({ data }: PhotographerTemplateProps) {
  const primaryColor = data.primaryColor || "#f59e0b";
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-wider">
            {data.fullName?.split(' ').map(n => n[0]).join('') || 'P'}
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">Portfolio</a>
            <a href="#about" className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">About</a>
            <a href="#contact" className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            {data.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`} className="hover:opacity-60 transition-opacity">
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero - Full Screen Image */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {data.avatar ? (
          <>
            <div className="absolute inset-0">
              <img
                src={data.avatar}
                alt={data.fullName || "Hero"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}

        <div className="relative z-10 text-center px-6">
          <Camera className="w-12 h-12 mx-auto mb-8 opacity-60" />
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
            {data.fullName || "Photographer"}
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-80 mb-4">
            {data.title || "Visual Storyteller"}
          </p>
          {data.location && (
            <p className="flex items-center justify-center gap-2 text-sm tracking-widest uppercase opacity-60">
              <MapPin className="w-4 h-4" />
              {data.location}
            </p>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase opacity-60">Scroll</span>
          <div className="w-px h-12 bg-white/30" />
        </div>
      </section>

      {/* Bio Section */}
      {data.bio && (
        <section className="py-32 px-6 bg-zinc-950">
          <div className="max-w-4xl mx-auto text-center">
            <Aperture className="w-10 h-10 mx-auto mb-8" style={{ color: primaryColor }} />
            <p className="text-2xl md:text-4xl font-light leading-relaxed italic text-gray-300">
              &ldquo;{data.bio}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* Portfolio Gallery */}
      {data.projects && data.projects.length > 0 && (
        <section id="portfolio" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: primaryColor }}>Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-bold">Selected Works</h2>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="break-inside-avoid group relative cursor-pointer"
                  onClick={() => setSelectedProject(index)}
                >
                  <div
                    className="aspect-[3/4] md:aspect-auto rounded-lg overflow-hidden relative"
                    style={{
                      backgroundColor: `${primaryColor}${(index % 5 + 1) * 15}`,
                      minHeight: index % 3 === 0 ? '400px' : index % 3 === 1 ? '300px' : '500px'
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image className="w-16 h-16 text-white/20" />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                        {project.description && (
                          <p className="text-sm text-gray-300 max-w-xs">{project.description}</p>
                        )}
                        <div className="mt-4 flex justify-center gap-3">
                          {project.url && (
                            <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                              <ArrowUpRight className="w-5 h-5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedProject !== null && data.projects && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full">
            <div
              className="aspect-video rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${primaryColor}30` }}
            >
              <Image className="w-24 h-24 text-white/30" />
            </div>
            <h3 className="text-3xl font-bold mb-2">{data.projects[selectedProject].name}</h3>
            {data.projects[selectedProject].description && (
              <p className="text-gray-400 mb-4">{data.projects[selectedProject].description}</p>
            )}
            {data.projects[selectedProject].technologies && (
              <div className="flex flex-wrap gap-2 mb-6">
                {data.projects[selectedProject].technologies?.map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-sm bg-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-4">
              {data.projects[selectedProject].url && (
                <a
                  href={data.projects[selectedProject].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105"
                  style={{ backgroundColor: primaryColor, color: 'black' }}
                >
                  View Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {data.projects[selectedProject].github && (
                <a
                  href={data.projects[selectedProject].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: primaryColor }}>About</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">The Artist Behind the Lens</h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {data.bio || "Every frame tells a story. I capture moments that speak to the soul, transforming fleeting instances into timeless memories."}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <p className="text-4xl font-bold" style={{ color: primaryColor }}>{data.experience?.length || 0}+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Years</p>
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: primaryColor }}>{data.projects?.length || 0}+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Projects</p>
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: primaryColor }}>{data.certifications?.length || 0}+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Awards</p>
                </div>
              </div>
            </div>

            {/* Skills/Expertise */}
            {data.skills && data.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-6 tracking-wider">Expertise</h3>
                <div className="space-y-4">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                      <span className="text-lg text-gray-300">{skill.name}</span>
                      {skill.level && (
                        <span className="ml-auto text-sm text-gray-500 capitalize">{skill.level}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: primaryColor }}>Journey</p>
              <h2 className="text-4xl md:text-5xl font-bold">Professional Experience</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {data.experience.map((exp, index) => (
                <div key={index} className="flex gap-8 mb-12 last:mb-0">
                  <div className="text-right w-32 shrink-0">
                    <p className="text-sm text-gray-500">{exp.startDate}</p>
                    <p className="text-sm text-gray-500">{exp.current ? "Present" : exp.endDate}</p>
                  </div>
                  <div className="relative pl-8 border-l border-gray-800">
                    <div className="absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-1/2" style={{ backgroundColor: primaryColor }} />
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <p className="mb-2" style={{ color: primaryColor }}>{exp.company}</p>
                    {exp.description && (
                      <p className="text-gray-400">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {(data.education?.length || data.certifications?.length) && (
        <section className="py-24 px-6 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {data.education && data.education.length > 0 && (
                <div>
                  <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: primaryColor }}>Education</p>
                  <div className="space-y-6">
                    {data.education.map((edu, index) => (
                      <div key={index} className="border-b border-gray-800 pb-6">
                        <p className="text-sm text-gray-500 mb-2">
                          {edu.startDate} — {edu.current ? "Present" : edu.endDate}
                        </p>
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                        {edu.field && <p style={{ color: primaryColor }}>{edu.field}</p>}
                        <p className="text-gray-400">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.certifications && data.certifications.length > 0 && (
                <div>
                  <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: primaryColor }}>Recognition</p>
                  <div className="space-y-4">
                    {data.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${primaryColor}30` }}>
                          <span style={{ color: primaryColor }}>★</span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold">{cert.name}</h4>
                          <p className="text-sm text-gray-500">{cert.issuer}</p>
                        </div>
                        {cert.url && (
                          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
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
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: primaryColor }}>Contact</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Let&apos;s Create Together</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Available for collaborations, commissioned work, and creative projects. Let&apos;s bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium tracking-wider transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor, color: 'black' }}
              >
                <Mail className="w-5 h-5" />
                {data.email}
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 font-medium tracking-wider hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm tracking-wider">
            © {new Date().getFullYear()} {data.fullName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {data.twitter && (
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.website && (
              <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
