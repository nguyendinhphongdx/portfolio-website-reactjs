"use client";

import { Award, Calendar, ExternalLink, Hash } from "lucide-react";
import type { Certification } from "@/types/portfolio";

interface CertificationsSectionProps {
  certifications: Certification[];
  primaryColor: string;
}

export function CertificationsSection({ certifications, primaryColor }: CertificationsSectionProps) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-8 flex items-center gap-2">
          <Award className="w-4 h-4" />
          Certifications
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={index}
              certification={cert}
              primaryColor={primaryColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CertificationCardProps {
  certification: Certification;
  primaryColor: string;
}

function CertificationCard({ certification, primaryColor }: CertificationCardProps) {
  const content = (
    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all group">
      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
        {certification.name}
      </h3>

      <p className="text-sm text-gray-600 mt-1">{certification.issuer}</p>

      <div className="flex flex-wrap items-center gap-3 mt-3">
        {certification.date && (
          <p className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            {certification.date}
          </p>
        )}

        {certification.expiryDate && (
          <p className="text-xs text-amber-600">
            Expires: {certification.expiryDate}
          </p>
        )}

        {certification.credentialId && (
          <p className="flex items-center gap-1 text-xs text-gray-400">
            <Hash className="w-3 h-3" />
            {certification.credentialId}
          </p>
        )}
      </div>

      {certification.url && (
        <div className="mt-3">
          <span
            className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
            style={{ color: primaryColor }}
          >
            View credential
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      )}
    </div>
  );

  if (certification.url) {
    return (
      <a href={certification.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
