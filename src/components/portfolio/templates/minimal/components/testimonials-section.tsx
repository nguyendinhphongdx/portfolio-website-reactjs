"use client";

import { Quote, Linkedin } from "lucide-react";
import type { Testimonial } from "@/types/portfolio";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  primaryColor: string;
}

export function TestimonialsSection({ testimonials, primaryColor }: TestimonialsSectionProps) {
  return (
    <section className="py-12 px-6 bg-white border-y border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8 flex items-center gap-2">
          <Quote className="w-4 h-4" />
          Testimonials
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              primaryColor={primaryColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  primaryColor: string;
}

function TestimonialCard({ testimonial, primaryColor }: TestimonialCardProps) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      {/* Quote Icon */}
      <Quote
        className="w-8 h-8 mb-4 opacity-20"
        style={{ color: primaryColor }}
      />

      {/* Content */}
      <p className="text-gray-600 leading-relaxed italic mb-6">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {testimonial.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 text-sm">
              {testimonial.name}
            </span>
            {testimonial.linkedinUrl && (
              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate">
            {testimonial.role}
            {testimonial.company && ` at ${testimonial.company}`}
          </p>
        </div>
      </div>
    </div>
  );
}
