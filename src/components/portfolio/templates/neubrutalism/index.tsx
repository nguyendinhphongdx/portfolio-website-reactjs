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

interface NeubrutalismTemplateProps {
  data: PortfolioData;
}

export function NeubrutalismTemplate({ data }: NeubrutalismTemplateProps) {
  const primaryColor = data.primaryColor || "#FF6B6B";

  return (
    <div className="min-h-screen bg-[#FFFEF0] text-black font-sans">
      <Header data={data} primaryColor={primaryColor} />

      <main>
        <HeroSection data={data} primaryColor={primaryColor} />

        {data.showSkills !== false && data.skills && data.skills.length > 0 && (
          <SkillsSection data={data} primaryColor={primaryColor} />
        )}

        {data.showExperience !== false && data.experience && data.experience.length > 0 && (
          <ExperienceSection data={data} primaryColor={primaryColor} />
        )}

        {data.showProjects !== false && data.projects && data.projects.length > 0 && (
          <ProjectsSection data={data} primaryColor={primaryColor} />
        )}

        {data.showEducation !== false && data.education && data.education.length > 0 && (
          <EducationSection data={data} primaryColor={primaryColor} />
        )}

        {data.showCertifications !== false && data.certifications && data.certifications.length > 0 && (
          <CertificationsSection data={data} primaryColor={primaryColor} />
        )}

        {data.showTestimonials !== false && data.testimonials && data.testimonials.length > 0 && (
          <TestimonialsSection data={data} primaryColor={primaryColor} />
        )}

        <ContactSection data={data} primaryColor={primaryColor} />
      </main>

      <Footer data={data} primaryColor={primaryColor} />
    </div>
  );
}
