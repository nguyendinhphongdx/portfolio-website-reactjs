import type { PortfolioData, TemplateType } from "@/types/portfolio";
import { MinimalTemplate } from "./minimal";
import { ModernTemplate } from "./modern";
import { CreativeTemplate } from "./creative";
import { DeveloperTemplate } from "./developer";

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
    case "creative":
      return <CreativeTemplate data={data} />;
    case "developer":
      return <DeveloperTemplate data={data} />;
    default:
      return <MinimalTemplate data={data} />;
  }
}
