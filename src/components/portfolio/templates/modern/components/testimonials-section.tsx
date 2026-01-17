"use client";

import { Quote, Linkedin, Star } from "lucide-react";
import type { Testimonial } from "@/types/portfolio";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  primaryColor: string;
}

export function TestimonialsSection({ testimonials, primaryColor }: TestimonialsSectionProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Quote className="w-6 h-6" style={{ color: primaryColor }} />
          <h2 className="text-3xl font-bold">What People Say</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col">
      {/* Quote icon */}
      <Quote
        className="w-10 h-10 mb-4 opacity-30"
        style={{ color: primaryColor }}
      />

      {/* Content */}
      <p className="text-white/70 leading-relaxed flex-grow mb-6">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border border-white/10"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
          >
            {testimonial.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {testimonial.name}
            </span>
            {testimonial.linkedinUrl && (
              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-sm text-white/50 truncate">
            {testimonial.role}
            {testimonial.company && ` at ${testimonial.company}`}
          </p>
        </div>
      </div>
    </div>
  );
}
