"use client";

import type { PortfolioData } from "@/types/portfolio";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { ProfileCard } from "./components/profile-card";
import { StatsCards } from "./components/stats-cards";
import { SkillsSection } from "./components/skills-section";
import { ExperienceSection } from "./components/experience-section";
import { ProjectsSection } from "./components/projects-section";
import { EducationSection } from "./components/education-section";
import { CertificationsSection } from "./components/certifications-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { ContactSection } from "./components/contact-section";
import { Footer } from "./components/footer";

interface BentoTemplateProps {
  data: PortfolioData;
}

export function BentoTemplate({ data }: BentoTemplateProps) {
  const primaryColor = data.primaryColor || "#3b82f6";

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      <Header data={data} primaryColor={primaryColor} />

      <main className="pt-28 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Hero - Main intro card */}
            <HeroSection data={data} primaryColor={primaryColor} />

            {/* Profile Photo */}
            <ProfileCard data={data} primaryColor={primaryColor} />

            {/* Stats Cards - Location & Experience */}
            <StatsCards data={data} />

            {/* Skills */}
            {data.showSkills !== false && data.skills && data.skills.length > 0 && (
              <SkillsSection skills={data.skills} />
            )}

            {/* Experience */}
            {data.showExperience !== false && data.experience && data.experience.length > 0 && (
              <ExperienceSection experiences={data.experience} primaryColor={primaryColor} />
            )}

            {/* Projects */}
            {data.showProjects !== false && data.projects && data.projects.length > 0 && (
              <ProjectsSection projects={data.projects} />
            )}

            {/* Education */}
            {data.showEducation !== false && data.education && data.education.length > 0 && (
              <EducationSection education={data.education} primaryColor={primaryColor} />
            )}

            {/* Certifications */}
            {data.showCertifications !== false && data.certifications && data.certifications.length > 0 && (
              <CertificationsSection certifications={data.certifications} primaryColor={primaryColor} />
            )}

            {/* Testimonials */}
            {data.showTestimonials !== false && data.testimonials && data.testimonials.length > 0 && (
              <TestimonialsSection testimonials={data.testimonials} primaryColor={primaryColor} />
            )}

            {/* Contact CTA */}
            <ContactSection data={data} primaryColor={primaryColor} />
          </div>
        </div>
      </main>

      <Footer data={data} />
    </div>
  );
}
