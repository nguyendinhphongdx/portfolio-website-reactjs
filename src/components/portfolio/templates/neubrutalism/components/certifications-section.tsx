"use client";

import type { PortfolioData, Certification } from "@/types/portfolio";

interface CertificationsSectionProps {
  data: PortfolioData;
  primaryColor: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function CertificationsSection({ data, primaryColor }: CertificationsSectionProps) {
  const certifications = data.certifications || [];

  return (
    <section id="certifications" className="py-16 px-6 bg-[#4ECDC4] border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2
            className="inline-block px-6 py-3 text-4xl font-black uppercase border-4 border-black bg-white"
            style={{ boxShadow: "6px 6px 0px 0px #000" }}
          >
            Certifications
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} certification={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationCard({
  certification,
  index,
}: {
  certification: Certification;
  index: number;
}) {
  const colors = ["#FF6B6B", "#FFE66D", "#DDA0DD", "#A8E6CF", "#45B7D1", "#F7DC6F"];
  const cardColor = colors[index % colors.length];

  return (
    <div
      className="border-4 border-black bg-white p-5"
      style={{ boxShadow: "5px 5px 0px 0px #000" }}
    >
      {/* Certificate Icon */}
      <div
        className="w-12 h-12 border-3 border-black flex items-center justify-center font-bold text-2xl mb-4"
        style={{ backgroundColor: cardColor, boxShadow: "3px 3px 0px 0px #000" }}
      >
        🏆
      </div>

      {/* Name */}
      <h3 className="text-xl font-black uppercase mb-2">{certification.name}</h3>

      {/* Issuer */}
      <div
        className="inline-block px-3 py-1 border-3 border-black font-semibold text-sm mb-4"
        style={{ backgroundColor: cardColor }}
      >
        {certification.issuer}
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        {certification.date && (
          <div className="flex items-center gap-2">
            <span className="font-bold">Issued:</span>
            <span>{formatDate(certification.date)}</span>
          </div>
        )}

        {certification.expiryDate && (
          <div className="flex items-center gap-2">
            <span className="font-bold">Expires:</span>
            <span>{formatDate(certification.expiryDate)}</span>
          </div>
        )}

        {certification.credentialId && (
          <div className="flex items-center gap-2">
            <span className="font-bold">ID:</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 border border-black">
              {certification.credentialId}
            </span>
          </div>
        )}
      </div>

      {/* View Link */}
      {certification.url && (
        <a
          href={certification.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 border-3 border-black font-bold text-sm uppercase bg-[#FFE66D] hover:bg-[#F7DC6F] transition-colors"
          style={{ boxShadow: "3px 3px 0px 0px #000" }}
        >
          View Certificate →
        </a>
      )}
    </div>
  );
}
