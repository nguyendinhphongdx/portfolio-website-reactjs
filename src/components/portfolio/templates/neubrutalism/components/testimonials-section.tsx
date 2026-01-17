"use client";

import type { PortfolioData, Testimonial } from "@/types/portfolio";
import Image from "next/image";

interface TestimonialsSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

export function TestimonialsSection({ data, primaryColor }: TestimonialsSectionProps) {
  const testimonials = data.testimonials || [];

  return (
    <section id="testimonials" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2
            className="inline-block px-6 py-3 text-4xl font-black uppercase border-4 border-black"
            style={{ backgroundColor: "#FFE66D", boxShadow: "6px 6px 0px 0px #000" }}
          >
            Testimonials
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const colors = ["#FF6B6B", "#4ECDC4", "#A8E6CF", "#DDA0DD", "#45B7D1", "#FFE66D"];
  const cardColor = colors[index % colors.length];

  return (
    <div
      className="border-4 border-black bg-white p-6 relative"
      style={{ boxShadow: "6px 6px 0px 0px #000" }}
    >
      {/* Quote Mark */}
      <div
        className="absolute -top-4 -left-4 w-12 h-12 border-4 border-black flex items-center justify-center text-3xl font-black"
        style={{ backgroundColor: cardColor }}
      >
        "
      </div>

      {/* Content */}
      <div className="pt-4">
        <p className="text-lg leading-relaxed mb-6 italic">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="w-14 h-14 border-3 border-black overflow-hidden flex-shrink-0"
            style={{ boxShadow: "3px 3px 0px 0px #000" }}
          >
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center font-black text-xl text-white"
                style={{ backgroundColor: cardColor }}
              >
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h4 className="font-black uppercase">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">
              {testimonial.role}
              {testimonial.company && ` @ ${testimonial.company}`}
            </p>
          </div>

          {/* LinkedIn Link */}
          {testimonial.linkedinUrl && (
            <a
              href={testimonial.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border-3 border-black font-bold flex items-center justify-center bg-[#0077B5] text-white hover:opacity-90 transition-opacity"
              style={{ boxShadow: "2px 2px 0px 0px #000" }}
              title="LinkedIn Profile"
            >
              in
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
