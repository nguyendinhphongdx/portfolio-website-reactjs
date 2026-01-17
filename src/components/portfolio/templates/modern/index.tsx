"use client";

import type { PortfolioData } from "@/types/portfolio";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { SkillsSection } from "./components/skills-section";
import { ExperienceSection } from "./components/experience-section";
import { ProjectsSection } from "./components/projects-section";
import { EducationSection } from "./components/education-section";
import { CertificationsSection } from "./components/certifications-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { ContactSection } from "./components/contact-section";
import { Footer } from "./components/footer";
import { AnimatedBackground } from "./components/animated-background";

interface ModernTemplateProps {
  data: PortfolioData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const primaryColor = data.primaryColor || "#6366f1";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <AnimatedBackground primaryColor={primaryColor} />
      <Header data={data} primaryColor={primaryColor} />

      <main className="relative z-10">
        <HeroSection data={data} primaryColor={primaryColor} />

        {data.showSkills !== false && data.skills && data.skills.length > 0 && (
          <SkillsSection skills={data.skills} primaryColor={primaryColor} />
        )}

        {data.showExperience !== false && data.experience && data.experience.length > 0 && (
          <ExperienceSection experiences={data.experience} primaryColor={primaryColor} />
        )}

        {data.showProjects !== false && data.projects && data.projects.length > 0 && (
          <ProjectsSection projects={data.projects} primaryColor={primaryColor} />
        )}

        {data.showEducation !== false && data.education && data.education.length > 0 && (
          <EducationSection education={data.education} primaryColor={primaryColor} />
        )}

        {data.showCertifications !== false && data.certifications && data.certifications.length > 0 && (
          <CertificationsSection certifications={data.certifications} primaryColor={primaryColor} />
        )}

        {data.showTestimonials !== false && data.testimonials && data.testimonials.length > 0 && (
          <TestimonialsSection testimonials={data.testimonials} primaryColor={primaryColor} />
        )}

        <ContactSection data={data} primaryColor={primaryColor} />
      </main>

      <Footer data={data} primaryColor={primaryColor} />
    </div>
  );
}
