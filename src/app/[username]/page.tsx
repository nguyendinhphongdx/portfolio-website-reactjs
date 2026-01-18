import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PortfolioTemplate } from "@/components/portfolio/templates";
import type {
  PortfolioData,
  Skill,
  Experience,
  Education,
  Project,
  Certification,
  Testimonial,
  Achievement,
  BlogPost,
  Language,
  SocialLink,
  TemplateType,
} from "@/types/portfolio";

interface PageProps {
  params: Promise<{ username: string }>;
}

async function getPortfolioByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        portfolio: true,
      },
    });

    if (!user || !user.portfolio || !user.portfolio.isPublished) {
      return null;
    }

    return user.portfolio;
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;
  const portfolio = await getPortfolioByUsername(username);

  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
    };
  }

  return {
    title: portfolio.fullName
      ? `${portfolio.fullName} | Portfolio`
      : `@${username} | Portfolio`,
    description: portfolio.bio || `${portfolio.fullName}'s professional portfolio`,
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const portfolio = await getPortfolioByUsername(username);

  if (!portfolio) {
    notFound();
  }

  const portfolioData: PortfolioData = {
    id: portfolio.id,
    userId: portfolio.userId,

    // Personal Info
    fullName: portfolio.fullName,
    title: portfolio.title,
    tagline: portfolio.tagline,
    bio: portfolio.bio,
    avatar: portfolio.avatar,
    coverImage: portfolio.coverImage,
    cvUrl: portfolio.cvUrl,

    // Contact
    email: portfolio.email,
    phone: portfolio.phone,
    location: portfolio.location,
    timezone: portfolio.timezone,

    // Social Links (Dynamic)
    socialLinks: portfolio.socialLinks as SocialLink[] | null,

    // Theme & Customization
    template: portfolio.template as TemplateType,
    primaryColor: portfolio.primaryColor,
    secondaryColor: portfolio.secondaryColor,
    accentColor: portfolio.accentColor,
    fontFamily: portfolio.fontFamily,
    darkMode: portfolio.darkMode,

    // Section Visibility
    showSkills: portfolio.showSkills,
    showExperience: portfolio.showExperience,
    showProjects: portfolio.showProjects,
    showEducation: portfolio.showEducation,
    showCertifications: portfolio.showCertifications,
    showTestimonials: portfolio.showTestimonials,
    showBlog: portfolio.showBlog,
    showAchievements: portfolio.showAchievements,

    // Content (JSON)
    skills: portfolio.skills as Skill[] | null,
    experience: portfolio.experience as Experience[] | null,
    education: portfolio.education as Education[] | null,
    projects: portfolio.projects as Project[] | null,
    certifications: portfolio.certifications as Certification[] | null,
    testimonials: portfolio.testimonials as Testimonial[] | null,
    achievements: portfolio.achievements as Achievement[] | null,
    blogPosts: portfolio.blogPosts as BlogPost[] | null,
    languages: portfolio.languages as Language[] | null,
    interests: portfolio.interests as string[] | null,

    // SEO & Analytics
    seoTitle: portfolio.seoTitle,
    seoDescription: portfolio.seoDescription,
    ogImage: portfolio.ogImage,
    googleAnalyticsId: portfolio.googleAnalyticsId,

    // Status
    isPublished: portfolio.isPublished,
    customDomain: portfolio.customDomain,
    viewCount: portfolio.viewCount,

    createdAt: portfolio.createdAt,
    updatedAt: portfolio.updatedAt,
  };

  return <PortfolioTemplate data={portfolioData} />;
}
