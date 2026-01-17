"use client";

import { Quote, Linkedin } from "lucide-react";
import type { Testimonial } from "@/types/portfolio";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Quote className="w-5 h-5 text-white" />
          </div>
          Testimonials
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
      <Quote className="w-8 h-8 text-white/20 mb-4" />

      <p className="text-white/80 leading-relaxed mb-4">
        "{testimonial.content}"
      </p>

      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border border-white/20"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
            {testimonial.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-white">{testimonial.name}</p>
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
