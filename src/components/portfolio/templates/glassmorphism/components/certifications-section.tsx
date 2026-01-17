"use client";

import { Award, ExternalLink, Calendar, Hash } from "lucide-react";
import type { Certification } from "@/types/portfolio";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          Certifications
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} certification={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationCard({ certification }: { certification: Certification }) {
  const content = (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-5 hover:bg-white/15 transition-all group">
      <h3 className="font-semibold text-white mb-1 group-hover:text-white/90">
        {certification.name}
      </h3>

      <p className="text-sm text-white/60">{certification.issuer}</p>

      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-white/40">
        {certification.date && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {certification.date}
          </span>
        )}
        {certification.expiryDate && (
          <span className="text-amber-400">
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
        <span className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white mt-3">
          View credential <ExternalLink className="w-3 h-3" />
        </span>
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
