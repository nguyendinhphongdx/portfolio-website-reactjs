import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

// Helper to parse user agent
function parseUserAgent(ua: string | null): {
  browser: string | null;
  os: string | null;
  device: string | null;
} {
  if (!ua) return { browser: null, os: null, device: null };

  let browser: string | null = null;
  let os: string | null = null;
  let device: string | null = "desktop";

  // Browser detection
  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  // OS detection
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad"))
    os = "iOS";

  // Device detection
  if (ua.includes("Mobile") || ua.includes("Android")) device = "mobile";
  else if (ua.includes("Tablet") || ua.includes("iPad")) device = "tablet";

  return { browser, os, device };
}

// Track page view
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { portfolioId, path, visitorId, sessionId, referrer, duration } =
      body;

    if (!portfolioId || !path) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get headers
    const headersList = await headers();
    const userAgent = headersList.get("user-agent");
    const { browser, os, device } = parseUserAgent(userAgent);

    // Get geo info from Vercel headers (if deployed on Vercel)
    const country = headersList.get("x-vercel-ip-country") || null;
    const city = headersList.get("x-vercel-ip-city") || null;
    const region = headersList.get("x-vercel-ip-country-region") || null;

    // Create page view record
    const pageView = await prisma.pageView.create({
      data: {
        portfolioId,
        path,
        visitorId: visitorId || null,
        sessionId: sessionId || null,
        referrer: referrer || null,
        userAgent,
        country,
        city,
        region,
        device,
        browser,
        os,
        duration: duration || null,
      },
    });

    // Update viewCount on portfolio
    await prisma.portfolio.update({
      where: { id: portfolioId },
      data: { viewCount: { increment: 1 } },
    });

    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyStats.upsert({
      where: {
        portfolioId_date: {
          portfolioId,
          date: today,
        },
      },
      create: {
        portfolioId,
        date: today,
        views: 1,
        uniqueVisitors: visitorId ? 1 : 0,
      },
      update: {
        views: { increment: 1 },
        // Only increment uniqueVisitors if this is a new visitor today
        // This is a simplified approach - for more accuracy, track visitors separately
      },
    });

    return NextResponse.json({ success: true, id: pageView.id });
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json(
      { error: "Failed to track page view" },
      { status: 500 }
    );
  }
}

// Update page view duration (when user leaves)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageViewId, duration } = body;

    if (!pageViewId || typeof duration !== "number") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.pageView.update({
      where: { id: pageViewId },
      data: { duration },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating page view:", error);
    return NextResponse.json(
      { error: "Failed to update page view" },
      { status: 500 }
    );
  }
}
