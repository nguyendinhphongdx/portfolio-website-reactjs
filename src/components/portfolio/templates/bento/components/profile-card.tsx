"use client";

import type { PortfolioData } from "@/types/portfolio";

interface ProfileCardProps {
  data: PortfolioData;
  primaryColor: string;
}

export function ProfileCard({ data, primaryColor }: ProfileCardProps) {
  return (
    <div className="col-span-12 lg:col-span-4 bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden relative aspect-square lg:aspect-auto">
      {data.avatar ? (
        <img
          src={data.avatar}
          alt={data.fullName || "Profile"}
          className="w-full h-full object-cover"
        />
      ) : data.coverImage ? (
        <img
          src={data.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 min-h-[200px]">
          <span
            className="text-8xl font-bold opacity-20"
            style={{ color: primaryColor }}
          >
            {data.fullName?.charAt(0) || "?"}
          </span>
        </div>
      )}

      {/* Overlay with contact info on hover */}
      {(data.email || data.phone) && (
        <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="text-sm text-zinc-300 hover:text-white transition-colors"
            >
              {data.email}
            </a>
          )}
          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="text-sm text-zinc-300 hover:text-white transition-colors"
            >
              {data.phone}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
