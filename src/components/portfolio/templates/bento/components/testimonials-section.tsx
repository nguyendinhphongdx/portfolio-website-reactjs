"use client";

import { Quote, Linkedin, Star } from "lucide-react";
import type { Testimonial } from "@/types/portfolio";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  primaryColor: string;
}

export function TestimonialsSection({ testimonials, primaryColor }: TestimonialsSectionProps) {
  return (
    <div className="col-span-12 bg-zinc-900 rounded-3xl p-6 border border-white/5">
      <div className="flex items-center gap-2 mb-6">
        <Quote className="w-4 h-4 text-zinc-600" />
        <p className="text-xs text-zinc-600 uppercase tracking-wider">
          Testimonials
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            primaryColor={primaryColor}
          />
        ))}
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  primaryColor: string;
}

function TestimonialCard({ testimonial, primaryColor }: TestimonialCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
      {/* Quote icon */}
      <Quote
        className="w-8 h-8 mb-4 opacity-20"
        style={{ color: primaryColor }}
      />

      {/* Content */}
      <p className="text-sm text-zinc-400 leading-relaxed flex-grow mb-4">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
            style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
          >
            {testimonial.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white text-sm">
              {testimonial.name}
            </span>
            {testimonial.linkedinUrl && (
              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-xs text-zinc-500 truncate">
            {testimonial.role}
            {testimonial.company && ` @ ${testimonial.company}`}
          </p>
        </div>
      </div>
    </div>
  );
}
