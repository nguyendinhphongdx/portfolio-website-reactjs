"use client";

import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface ContactSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

export function ContactSection({ data, primaryColor }: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 px-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Let's work together</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          I'm always open to discussing new projects, creative ideas or opportunities.
        </p>

        {/* Contact Details */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {data.location && (
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
          )}
          {data.timezone && (
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{data.timezone}</span>
            </div>
          )}
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              {data.email}
            </a>
          )}
          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-lg font-medium hover:border-gray-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {data.phone}
            </a>
          )}
        </div>

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500 mb-4">Interests & Hobbies</p>
            <div className="flex flex-wrap justify-center gap-2">
              {data.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-400"
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
