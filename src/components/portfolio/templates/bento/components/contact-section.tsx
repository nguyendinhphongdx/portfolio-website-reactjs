"use client";

import { Mail, ArrowUpRight, Phone, MapPin } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface ContactSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

export function ContactSection({ data, primaryColor }: ContactSectionProps) {
  return (
    <div
      id="contact"
      className="col-span-12 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Let's build something great together
          </h2>
          <p className="text-white/70 mb-4">
            I'm currently available for freelance work and full-time positions.
          </p>

          {/* Contact details */}
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {data.email}
              </a>
            )}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {data.phone}
              </a>
            )}
            {data.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {data.location}
              </span>
            )}
          </div>
        </div>

        {data.email && (
          <a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors shrink-0 group"
          >
            <Mail className="w-4 h-4" />
            Get in touch
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/20" />
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border border-white/10" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-white/10" />
    </div>
  );
}
