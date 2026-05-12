import type { MetadataRoute } from "next";

const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  "http://localhost:5444";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/settings/", "/login", "/register"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
