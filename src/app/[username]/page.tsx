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
    fullName: portfolio.fullName,
    title: portfolio.title,
    bio: portfolio.bio,
    avatar: portfolio.avatar,
    email: portfolio.email,
    phone: portfolio.phone,
    location: portfolio.location,
    github: portfolio.github,
    linkedin: portfolio.linkedin,
    twitter: portfolio.twitter,
    website: portfolio.website,
    template: portfolio.template as "minimal" | "modern" | "creative" | "developer",
    primaryColor: portfolio.primaryColor,
    skills: portfolio.skills as Skill[] | null,
    experience: portfolio.experience as Experience[] | null,
    education: portfolio.education as Education[] | null,
    projects: portfolio.projects as Project[] | null,
    certifications: portfolio.certifications as Certification[] | null,
    isPublished: portfolio.isPublished,
    createdAt: portfolio.createdAt,
    updatedAt: portfolio.updatedAt,
  };

  return <PortfolioTemplate data={portfolioData} />;
}
