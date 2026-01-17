"use client";

import type { PortfolioData, SocialLink } from "@/types/portfolio";

interface ContactSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function getAllSocialLinks(data: PortfolioData): SocialLink[] {
  if (data.socialLinks && data.socialLinks.length > 0) {
    return data.socialLinks;
  }

  const links: SocialLink[] = [];
  if (data.github) links.push({ id: "github", type: "github", url: data.github });
  if (data.linkedin) links.push({ id: "linkedin", type: "linkedin", url: data.linkedin });
  if (data.twitter) links.push({ id: "twitter", type: "twitter", url: data.twitter });
  if (data.website) links.push({ id: "website", type: "website", url: data.website });
  if (data.instagram) links.push({ id: "instagram", type: "instagram", url: data.instagram });
  if (data.youtube) links.push({ id: "youtube", type: "youtube", url: data.youtube });

  return links;
}

function getSocialLabel(type: string): string {
  const labels: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    website: "Website",
    instagram: "Instagram",
    youtube: "YouTube",
    medium: "Medium",
    devto: "Dev.to",
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

export function ContactSection({ data, primaryColor }: ContactSectionProps) {
  const socialLinks = getAllSocialLinks(data);

  return (
    <section id="contact" className="py-16 px-6 bg-[#FF6B6B] border-y-4 border-black">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <h2
          className="inline-block px-6 py-3 text-4xl font-black uppercase border-4 border-black bg-white mb-8"
          style={{ boxShadow: "6px 6px 0px 0px #000" }}
        >
          Let's Connect!
        </h2>

        {/* Tagline */}
        <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">
          Have a project in mind? Want to collaborate? Or just want to say hello?
          I'd love to hear from you!
        </p>

        {/* Contact Methods */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="px-8 py-4 border-4 border-black font-black text-xl uppercase bg-white hover:bg-[#FFE66D] transition-colors"
              style={{ boxShadow: "6px 6px 0px 0px #000" }}
            >
              ✉️ {data.email}
            </a>
          )}

          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="px-8 py-4 border-4 border-black font-black text-xl uppercase bg-white hover:bg-[#A8E6CF] transition-colors"
              style={{ boxShadow: "6px 6px 0px 0px #000" }}
            >
              📞 {data.phone}
            </a>
          )}
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-4 border-black font-bold uppercase bg-white hover:bg-black hover:text-white transition-colors"
                style={{ boxShadow: "4px 4px 0px 0px #000" }}
              >
                {link.label || getSocialLabel(link.type)}
              </a>
            ))}
          </div>
        )}

        {/* Location */}
        {data.location && (
          <div
            className="inline-block mt-12 px-6 py-3 border-4 border-black font-bold text-lg bg-white"
            style={{ boxShadow: "4px 4px 0px 0px #000" }}
          >
            📍 Based in {data.location}
          </div>
        )}
      </div>
    </section>
  );
}
