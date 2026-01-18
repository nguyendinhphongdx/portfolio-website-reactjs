"use client";

import type { PortfolioData } from "@/types/portfolio";
import { getAllSocialLinks, getSocialLabel } from "../../_shared/utils";

interface ContactSectionProps {
  data: PortfolioData;
  primaryColor: string;
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
