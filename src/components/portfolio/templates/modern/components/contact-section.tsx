"use client";

import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface ContactSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

export function ContactSection({ data, primaryColor }: ContactSectionProps) {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Let's Build Something{" "}
          <span
            className="bg-gradient-to-r bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, white)` }}
          >
            Amazing
          </span>
        </h2>

        <p className="text-xl text-white/50 mb-10 max-w-xl mx-auto">
          Have a project in mind? Let's discuss how we can work together.
        </p>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {data.location && (
            <div className="flex items-center gap-2 text-white/50">
              <MapPin className="w-5 h-5" />
              {data.location}
            </div>
          )}
          {data.timezone && (
            <div className="text-white/30">({data.timezone})</div>
          )}
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold transition-all hover:scale-105 hover:shadow-xl group"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 20px 40px -10px ${primaryColor}50`,
              }}
            >
              <Mail className="w-5 h-5" />
              {data.email}
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          )}
          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />
              {data.phone}
            </a>
          )}
        </div>

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/5">
            <p className="text-sm text-white/40 mb-4">Interests & Hobbies</p>
            <div className="flex flex-wrap justify-center gap-2">
              {data.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm border border-white/5"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
