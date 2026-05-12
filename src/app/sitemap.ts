import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  "http://localhost:5444";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/login`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/register`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    const portfolios = await prisma.portfolio.findMany({
      where: {
        isPublished: true,
        user: { username: { not: null } },
      },
      select: {
        updatedAt: true,
        user: { select: { username: true } },
      },
    });

    const portfolioEntries: MetadataRoute.Sitemap = portfolios
      .filter((p) => p.user.username)
      .map((p) => ({
        url: `${siteUrl}/${p.user.username}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [...staticEntries, ...portfolioEntries];
  } catch (error) {
    console.error("Failed to build sitemap:", error);
    return staticEntries;
  }
}
