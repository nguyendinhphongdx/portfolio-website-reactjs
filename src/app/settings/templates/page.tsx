import { TemplateSelector } from "@/components/settings/template-selector";
import { Layout } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 shrink-0">
          <Layout className="h-6 w-6 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Portfolio Templates</h2>
          <p className="text-muted-foreground mt-1">
            Choose a template and customize your portfolio appearance
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-rose-500/5">
        <p className="text-[13px] text-muted-foreground">
          <span className="font-medium text-foreground">Preview tip:</span>{" "}
          After saving your template selection, visit the homepage to see your live portfolio.
          Changes will be reflected immediately.
        </p>
      </div>

      <TemplateSelector />
    </div>
  );
}
