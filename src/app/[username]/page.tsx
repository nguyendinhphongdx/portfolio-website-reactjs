import { cache } from "react";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PortfolioTemplate } from "@/components/portfolio/templates";
import { AnalyticsTracker } from "@/components/portfolio/analytics-tracker";
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

const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  "http://localhost:5444";

const getPortfolioByUsername = cache(async (username: string) => {
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
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const portfolio = await getPortfolioByUsername(username);

  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
      robots: { index: false, follow: false },
    };
  }

  const displayName = portfolio.fullName || `@${username}`;
  const fallbackTitle = portfolio.title
    ? `${displayName} — ${portfolio.title}`
    : displayName;
  const title = portfolio.seoTitle || fallbackTitle;
  const description =
    portfolio.seoDescription ||
    portfolio.bio ||
    portfolio.tagline ||
    `${displayName}'s professional portfolio`;

  const url = `${getSiteUrl()}/${username}`;
  const image = portfolio.ogImage || portfolio.coverImage || portfolio.avatar;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      siteName: "Portfolio Builder",
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: displayName }]
        : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : [],
    },
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
    templateSettings: portfolio.templateSettings as Record<string, unknown> | null,
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

  const siteUrl = getSiteUrl();
  const portfolioUrl = `${siteUrl}/${username}`;
  const socialLinks = (portfolio.socialLinks as SocialLink[] | null) ?? [];
  const experienceList = (portfolio.experience as Experience[] | null) ?? [];
  const currentJob = experienceList.find((e) => e?.current) ?? experienceList[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.fullName || username,
    ...(portfolio.title && { jobTitle: portfolio.title }),
    ...(portfolio.bio && { description: portfolio.bio }),
    ...(portfolio.avatar && { image: portfolio.avatar }),
    ...(portfolio.email && { email: portfolio.email }),
    ...(portfolio.phone && { telephone: portfolio.phone }),
    ...(portfolio.location && {
      address: { "@type": "PostalAddress", addressLocality: portfolio.location },
    }),
    url: portfolioUrl,
    ...(socialLinks.length > 0 && {
      sameAs: socialLinks.map((s) => s.url).filter(Boolean),
    }),
    ...(currentJob?.company && {
      worksFor: { "@type": "Organization", name: currentJob.company },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {portfolio.googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${portfolio.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${portfolio.googleAnalyticsId}');`}
          </Script>
        </>
      )}
      <AnalyticsTracker portfolioId={portfolio.id} path={`/${username}`} />
      <PortfolioTemplate data={portfolioData} />
    </>
  );
}
