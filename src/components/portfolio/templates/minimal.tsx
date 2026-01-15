import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface MinimalTemplateProps {
  data: PortfolioData;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {data.avatar && (
            <img
              src={data.avatar}
              alt={data.fullName || "Profile"}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {data.fullName || "Your Name"}
          </h1>
          {data.title && (
            <p className="text-xl text-gray-600 mb-6">{data.title}</p>
          )}
          {data.bio && (
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {data.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-8">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.twitter && (
              <a
                href={data.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium border border-gray-200"
                  style={{ borderColor: data.primaryColor }}
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
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-2 pl-6 pb-2" style={{ borderColor: data.primaryColor }}>
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-gray-600 mt-3">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-600 text-sm">
                          • {highlight}
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

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  {edu.field && <p className="text-gray-600">{edu.field}</p>}
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Projects</h2>
            <div className="grid gap-6">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-600 mt-2">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {(project.url || project.github) && (
                    <div className="flex gap-3 mt-4">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:underline"
                          style={{ color: data.primaryColor }}
                        >
                          View Project →
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:underline"
                          style={{ color: data.primaryColor }}
                        >
                          GitHub →
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
          <div className="flex flex-col items-center gap-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {data.email}
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
            )}
            {data.location && (
              <span className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                {data.location}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} {data.fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
}
