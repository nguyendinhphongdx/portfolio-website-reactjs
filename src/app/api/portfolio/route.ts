import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const portfolioUpdateSchema = z.object({
  // Personal info
  fullName: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  cvUrl: z.string().optional().nullable(),

  // Contact
  email: z.string().email().optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),

  // Theme & Customization
  template: z.enum([
    "minimal", "modern", "creative", "developer",
    "designer", "photographer", "executive",
    "glassmorphism", "neubrutalism", "bento"
  ]).optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional().nullable(),
  accentColor: z.string().optional().nullable(),
  fontFamily: z.string().optional().nullable(),
  darkMode: z.boolean().optional(),

  // Section visibility
  showSkills: z.boolean().optional(),
  showExperience: z.boolean().optional(),
  showProjects: z.boolean().optional(),
  showEducation: z.boolean().optional(),
  showCertifications: z.boolean().optional(),
  showTestimonials: z.boolean().optional(),
  showBlog: z.boolean().optional(),
  showAchievements: z.boolean().optional(),

  // Social links (dynamic array)
  socialLinks: z.array(z.object({
    id: z.string(),
    type: z.string(),
    url: z.string(),
    label: z.string().optional(),
  })).optional().nullable(),

  // Content (JSON)
  skills: z.array(z.any()).optional().nullable(),
  experience: z.array(z.any()).optional().nullable(),
  education: z.array(z.any()).optional().nullable(),
  projects: z.array(z.any()).optional().nullable(),
  certifications: z.array(z.any()).optional().nullable(),
  testimonials: z.array(z.any()).optional().nullable(),
  achievements: z.array(z.any()).optional().nullable(),
  blogPosts: z.array(z.any()).optional().nullable(),
  languages: z.array(z.any()).optional().nullable(),
  interests: z.array(z.string()).optional().nullable(),

  // SEO & Analytics
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  googleAnalyticsId: z.string().optional().nullable(),

  // Status
  isPublished: z.boolean().optional(),
  customDomain: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { portfolio: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.portfolio) {
      // Create default portfolio if not exists
      const newPortfolio = await prisma.portfolio.create({
        data: {
          userId: session.user.id,
          template: "minimal",
          primaryColor: "#3b82f6",
        },
      });
      return NextResponse.json({ ...newPortfolio, username: user.username });
    }

    return NextResponse.json({ ...user.portfolio, username: user.username });
  } catch (error) {
    console.error("Get portfolio error:", error);
    return NextResponse.json(
      { error: "Failed to get portfolio" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = portfolioUpdateSchema.parse(body);

    // Handle null values for JSON fields
    const sanitizedData = {
      ...data,
      socialLinks: data.socialLinks === null ? undefined : data.socialLinks,
      skills: data.skills === null ? undefined : data.skills,
      experience: data.experience === null ? undefined : data.experience,
      education: data.education === null ? undefined : data.education,
      projects: data.projects === null ? undefined : data.projects,
      certifications: data.certifications === null ? undefined : data.certifications,
      testimonials: data.testimonials === null ? undefined : data.testimonials,
      achievements: data.achievements === null ? undefined : data.achievements,
      blogPosts: data.blogPosts === null ? undefined : data.blogPosts,
      languages: data.languages === null ? undefined : data.languages,
      interests: data.interests === null ? undefined : data.interests,
    };

    const portfolio = await prisma.portfolio.upsert({
      where: { userId: session.user.id },
      update: sanitizedData,
      create: {
        userId: session.user.id,
        ...sanitizedData,
        template: sanitizedData.template || "minimal",
        primaryColor: sanitizedData.primaryColor || "#3b82f6",
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Update portfolio error:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}
