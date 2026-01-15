import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

/**
 * Generate a unique username from email
 * Example: john.doe@example.com -> johndoe
 * If already exists, add random suffix: johndoe -> johndoe7x3k
 */
async function generateUsername(email: string): Promise<string> {
  // Extract local part of email and clean it
  const localPart = email.split("@")[0];
  const baseUsername = localPart
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // Remove special chars
    .slice(0, 20); // Limit length

  // Check if base username is available
  const existingUser = await prisma.user.findUnique({
    where: { username: baseUsername },
  });

  if (!existingUser) {
    return baseUsername;
  }

  // Generate unique suffix
  let attempts = 0;
  while (attempts < 10) {
    const suffix = Math.random().toString(36).slice(2, 6);
    const newUsername = `${baseUsername.slice(0, 16)}${suffix}`;

    const exists = await prisma.user.findUnique({
      where: { username: newUsername },
    });

    if (!exists) {
      return newUsername;
    }
    attempts++;
  }

  // Fallback: use timestamp
  return `${baseUsername.slice(0, 12)}${Date.now().toString(36)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Generate unique username
    const username = await generateUsername(email);

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user with portfolio
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
        portfolio: {
          create: {
            template: "minimal",
            primaryColor: "#3b82f6",
          },
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error?.issues?.[0]?.message },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
