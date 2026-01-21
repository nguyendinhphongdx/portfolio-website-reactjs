import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get portfolio for current user
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: session.user.id },
      select: { id: true, viewCount: true },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Get query params
    const searchParams = req.nextUrl.searchParams;
    const period = searchParams.get("period") || "7d"; // 7d, 30d, 90d, all

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    switch (period) {
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0); // All time
    }

    // Get page views for the period
    const pageViews = await prisma.pageView.findMany({
      where: {
        portfolioId: portfolio.id,
        createdAt: { gte: startDate },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate stats
    const totalViews = pageViews.length;
    const uniqueVisitors = new Set(
      pageViews.filter((pv) => pv.visitorId).map((pv) => pv.visitorId)
    ).size;
    const avgDuration =
      pageViews.filter((pv) => pv.duration).length > 0
        ? Math.round(
            pageViews
              .filter((pv) => pv.duration)
              .reduce((sum, pv) => sum + (pv.duration || 0), 0) /
              pageViews.filter((pv) => pv.duration).length
          )
        : 0;

    // Group by day for chart
    const viewsByDay: Record<string, number> = {};
    pageViews.forEach((pv) => {
      const day = pv.createdAt.toISOString().split("T")[0];
      viewsByDay[day] = (viewsByDay[day] || 0) + 1;
    });

    // Fill in missing days
    const chartData: { date: string; views: number }[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= now) {
      const dateStr = currentDate.toISOString().split("T")[0];
      chartData.push({
        date: dateStr,
        views: viewsByDay[dateStr] || 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Top referrers
    const referrerCounts: Record<string, number> = {};
    pageViews.forEach((pv) => {
      if (pv.referrer) {
        try {
          const url = new URL(pv.referrer);
          const domain = url.hostname.replace("www.", "");
          referrerCounts[domain] = (referrerCounts[domain] || 0) + 1;
        } catch {
          referrerCounts[pv.referrer] = (referrerCounts[pv.referrer] || 0) + 1;
        }
      } else {
        referrerCounts["Direct"] = (referrerCounts["Direct"] || 0) + 1;
      }
    });
    const topReferrers = Object.entries(referrerCounts)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top countries
    const countryCounts: Record<string, number> = {};
    pageViews.forEach((pv) => {
      const country = pv.country || "Unknown";
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Device breakdown
    const deviceCounts: Record<string, number> = {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    };
    pageViews.forEach((pv) => {
      const device = pv.device || "desktop";
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });
    const devices = Object.entries(deviceCounts).map(([device, count]) => ({
      device,
      count,
      percentage: totalViews > 0 ? Math.round((count / totalViews) * 100) : 0,
    }));

    // Browser breakdown
    const browserCounts: Record<string, number> = {};
    pageViews.forEach((pv) => {
      const browser = pv.browser || "Unknown";
      browserCounts[browser] = (browserCounts[browser] || 0) + 1;
    });
    const browsers = Object.entries(browserCounts)
      .map(([browser, count]) => ({
        browser,
        count,
        percentage: totalViews > 0 ? Math.round((count / totalViews) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recent views (last 10)
    const recentViews = pageViews.slice(0, 10).map((pv) => ({
      id: pv.id,
      path: pv.path,
      country: pv.country,
      city: pv.city,
      device: pv.device,
      browser: pv.browser,
      referrer: pv.referrer,
      duration: pv.duration,
      createdAt: pv.createdAt,
    }));

    return NextResponse.json({
      totalViews: portfolio.viewCount,
      periodViews: totalViews,
      uniqueVisitors,
      avgDuration,
      chartData,
      topReferrers,
      topCountries,
      devices,
      browsers,
      recentViews,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
