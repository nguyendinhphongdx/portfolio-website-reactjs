import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q") || "";

    // Only return published portfolios
    const users = await prisma.user.findMany({
      where: {
        username: {
          not: null,
          ...(query ? { contains: query, mode: "insensitive" as const } : {}),
        },
        portfolio: {
          isPublished: true,
        },
      },
      select: {
        username: true,
        name: true,
        portfolio: {
          select: {
            title: true,
            avatar: true,
            fullName: true,
          },
        },
      },
      take: 8,
      orderBy: { createdAt: "desc" },
    });

    const results = users.map((user) => ({
      username: user.username,
      name: user.portfolio?.fullName || user.name || user.username,
      title: user.portfolio?.title || null,
      avatar: user.portfolio?.avatar || null,
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search users error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
