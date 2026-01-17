"use client";

import { MapPin, Calendar, Briefcase, FolderGit2 } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";

interface StatsCardsProps {
  data: PortfolioData;
}

export function StatsCards({ data }: StatsCardsProps) {
  // Calculate years of experience
  const yearsOfExperience = data.experience?.length
    ? Math.max(
        ...data.experience.map((exp) => {
          const start = parseInt(exp.startDate || "0");
          const end = exp.current
            ? new Date().getFullYear()
            : parseInt(exp.endDate || "0");
          return end - start;
        })
      )
    : 0;

  // Calculate total projects
  const totalProjects = data.projects?.length || 0;

  // Calculate total companies worked
  const companiesWorked = data.experience?.length || 0;

  return (
    <>
      {/* Location Card */}
      <div className="col-span-6 lg:col-span-3 bg-zinc-900 rounded-3xl p-6 border border-white/5 flex flex-col justify-between min-h-[140px]">
        <MapPin className="w-5 h-5 text-zinc-600" />
        <div className="mt-auto">
          <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">
            Location
          </p>
          <p className="text-lg font-medium">
            {data.location || "Remote"}
          </p>
          {data.timezone && (
            <p className="text-xs text-zinc-600 mt-0.5">{data.timezone}</p>
          )}
        </div>
      </div>

      {/* Experience Years Card */}
      <div className="col-span-6 lg:col-span-3 bg-zinc-900 rounded-3xl p-6 border border-white/5 flex flex-col justify-between min-h-[140px]">
        <Calendar className="w-5 h-5 text-zinc-600" />
        <div className="mt-auto">
          <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">
            Experience
          </p>
          <p className="text-lg font-medium">
            {yearsOfExperience}+ years
          </p>
        </div>
      </div>

      {/* Companies Worked Card */}
      {companiesWorked > 0 && (
        <div className="col-span-6 lg:col-span-3 bg-zinc-900 rounded-3xl p-6 border border-white/5 flex flex-col justify-between min-h-[140px]">
          <Briefcase className="w-5 h-5 text-zinc-600" />
          <div className="mt-auto">
            <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">
              Companies
            </p>
            <p className="text-lg font-medium">
              {companiesWorked} worked
            </p>
          </div>
        </div>
      )}

      {/* Projects Count Card */}
      {totalProjects > 0 && (
        <div className="col-span-6 lg:col-span-3 bg-zinc-900 rounded-3xl p-6 border border-white/5 flex flex-col justify-between min-h-[140px]">
          <FolderGit2 className="w-5 h-5 text-zinc-600" />
          <div className="mt-auto">
            <p className="text-xs text-zinc-600 uppercase tracking-wider mb-1">
              Projects
            </p>
            <p className="text-lg font-medium">
              {totalProjects}+ built
            </p>
          </div>
        </div>
      )}
    </>
  );
}
