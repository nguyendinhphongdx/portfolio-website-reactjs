import { LLMConfigForm } from "@/components/settings/llm-config-form";
import { Cpu, Sparkles } from "lucide-react";

export default function LLMConfigPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/10">
            <Cpu className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              AI Configuration
            </h1>
            <p className="text-muted-foreground mt-1 text-[15px]">
              Connect your preferred AI providers to enable intelligent CV parsing
              and content generation features.
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 border border-violet-500/10">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-violet-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Bring your own API keys
              </p>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                Your API keys are encrypted and stored securely. They are only used
                for features within this application.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LLM Config Form */}
      <div className="animate-fade-up stagger-2">
        <LLMConfigForm />
      </div>
    </div>
  );
}
