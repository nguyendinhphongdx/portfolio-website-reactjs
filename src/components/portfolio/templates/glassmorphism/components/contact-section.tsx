"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import { getAllSocialLinks } from "../../_shared/utils";

interface ContactSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function getSocialIcon(type: string) {
  switch (type) {
    case "github": return Github;
    case "linkedin": return Linkedin;
    case "twitter": return Twitter;
    default: return Globe;
  }
}

export function ContactSection({ data }: ContactSectionProps) {
  const socialLinks = getAllSocialLinks(data);

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Create Something Beautiful
          </h2>

          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Have a project in mind? I'd love to hear about it.
          </p>

          {/* Contact Info */}
          {data.location && (
            <div className="flex items-center justify-center gap-2 text-white/50 mb-6">
              <MapPin className="w-4 h-4" />
              {data.location}
              {data.timezone && <span className="text-white/30">({data.timezone})</span>}
            </div>
          )}

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium hover:bg-white/30 transition-all"
              >
                <Mail className="w-5 h-5" />
                {data.email}
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
              >
                <Phone className="w-5 h-5" />
                {data.phone}
              </a>
            )}
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-3">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.type);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-white"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-white/40 mb-4">Interests & Hobbies</p>
              <div className="flex flex-wrap justify-center gap-2">
                {data.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-sm border border-white/10"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
