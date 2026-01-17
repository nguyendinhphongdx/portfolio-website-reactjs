"use client";

import { Award, ExternalLink, Calendar, Hash } from "lucide-react";
import type { Certification } from "@/types/portfolio";

interface CertificationsSectionProps {
  certifications: Certification[];
  primaryColor: string;
}

export function CertificationsSection({ certifications, primaryColor }: CertificationsSectionProps) {
  return (
    <div className="col-span-12 lg:col-span-6 bg-zinc-900 rounded-3xl p-6 border border-white/5">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-4 h-4 text-zinc-600" />
        <p className="text-xs text-zinc-600 uppercase tracking-wider">
          Certifications
        </p>
      </div>

      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <CertificationItem
            key={index}
            certification={cert}
            primaryColor={primaryColor}
          />
        ))}
      </div>
    </div>
  );
}

interface CertificationItemProps {
  certification: Certification;
  primaryColor: string;
}

function CertificationItem({ certification, primaryColor }: CertificationItemProps) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all group">
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${primaryColor}20` }}
      >
        <Award className="w-5 h-5" style={{ color: primaryColor }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-white group-hover:text-white/90">
            {certification.name}
          </h3>
          {certification.url && (
            <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
          )}
        </div>

        <p className="text-sm text-zinc-500 mt-0.5">
          {certification.issuer}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-600">
          {certification.date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {certification.date}
            </span>
          )}
          {certification.expiryDate && (
            <span className="text-zinc-700">
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
      </div>
    </div>
  );

  if (certification.url) {
    return (
      <a
        href={certification.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
}
