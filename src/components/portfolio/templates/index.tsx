import type { PortfolioData, TemplateType } from "@/types/portfolio";
import { MinimalTemplate } from "./minimal";
import { ModernTemplate } from "./modern";
import { GlassmorphismTemplate } from "./glassmorphism";
import { NeubrutalismTemplate } from "./neubrutalism";
import { BentoTemplate } from "./bento";

interface PortfolioTemplateProps {
  data: PortfolioData;
}

export function PortfolioTemplate({ data }: PortfolioTemplateProps) {
  const template = data.template as TemplateType;

  switch (template) {
    case "minimal":
      return <MinimalTemplate data={data} />;
    case "modern":
      return <ModernTemplate data={data} />;
    case "glassmorphism":
      return <GlassmorphismTemplate data={data} />;
    case "neubrutalism":
      return <NeubrutalismTemplate data={data} />;
    case "bento":
      return <BentoTemplate data={data} />;
    default:
      return <MinimalTemplate data={data} />;
  }
}
