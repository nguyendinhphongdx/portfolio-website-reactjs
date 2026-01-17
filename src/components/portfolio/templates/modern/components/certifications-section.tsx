"use client";

import { Award, ExternalLink, Calendar, Hash } from "lucide-react";
import type { Certification } from "@/types/portfolio";

interface CertificationsSectionProps {
  certifications: Certification[];
  primaryColor: string;
}

export function CertificationsSection({ certifications, primaryColor }: CertificationsSectionProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Award className="w-6 h-6" style={{ color: primaryColor }} />
          <h2 className="text-3xl font-bold">Certifications</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
      <h3 className="font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">
        {certification.name}
      </h3>

      <p className="text-sm text-white/50 mb-3">
        {certification.issuer}
      </p>

      <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
        {certification.date && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {certification.date}
          </span>
        )}
        {certification.expiryDate && (
          <span className="text-amber-500">
            Expires: {certification.expiryDate}
          </span>
        )}
        {certification.credentialId && (
          <span className="flex items-center gap-1">
            <Hash className="w-3 h-3" />
            {certification.credentialId}
          </span>
        )}
      </div>

      {certification.url && (
        <div className="flex items-center justify-end mt-3 pt-3 border-t border-white/5">
          <span
            className="text-xs font-medium flex items-center gap-1 group-hover:underline"
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
