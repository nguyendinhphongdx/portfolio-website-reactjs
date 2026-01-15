import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const portfolioUpdateSchema = z.object({
  fullName: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  template: z.enum(["minimal", "modern", "creative", "developer"]).optional(),
  primaryColor: z.string().optional(),
  skills: z.array(z.any()).optional().nullable(),
  experience: z.array(z.any()).optional().nullable(),
  education: z.array(z.any()).optional().nullable(),
  projects: z.array(z.any()).optional().nullable(),
  certifications: z.array(z.any()).optional().nullable(),
  isPublished: z.boolean().optional(),
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

    const portfolio = await prisma.portfolio.upsert({
      where: { userId: session.user.id },
      update: data,
      create: {
        userId: session.user.id,
        ...data,
        template: data.template || "minimal",
        primaryColor: data.primaryColor || "#3b82f6",
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
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
