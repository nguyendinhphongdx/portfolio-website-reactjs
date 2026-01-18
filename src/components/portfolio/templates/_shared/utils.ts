import type { PortfolioData, SocialLink } from "@/types/portfolio";

/**
 * Get all social links from portfolio data
 * Returns socialLinks array or empty array if none
 */
export function getAllSocialLinks(data: PortfolioData): SocialLink[] {
  return data.socialLinks || [];
}

/**
 * Get label for social link type
 */
export function getSocialLabel(type: string): string {
  const labels: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    website: "Website",
    instagram: "Instagram",
    youtube: "YouTube",
    medium: "Medium",
    devto: "Dev.to",
    dribbble: "Dribbble",
    behance: "Behance",
    stackoverflow: "Stack Overflow",
    codepen: "CodePen",
    facebook: "Facebook",
    tiktok: "TikTok",
    discord: "Discord",
    telegram: "Telegram",
    email: "Email",
    phone: "Phone",
    other: "Link",
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}
