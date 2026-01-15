"use client";

import { useRouter } from "next/navigation";
import { CVUploader } from "@/components/settings/cv-uploader";
import { FileText, Sparkles } from "lucide-react";

export default function CVParserPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="animate-fade-up">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/10">
            <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              CV Parser
            </h1>
            <p className="text-muted-foreground mt-1 text-[15px]">
              Upload your CV and let AI automatically extract your professional
              information to populate your portfolio.
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 border border-emerald-500/10">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                AI-Powered extraction
              </p>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                Our AI will analyze your CV and intelligently extract skills,
                experience, education, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CV Uploader */}
      <div className="animate-fade-up stagger-2">
        <CVUploader
          onParsed={() => {
            router.push("/settings/profile");
          }}
        />
      </div>
    </div>
  );
}
