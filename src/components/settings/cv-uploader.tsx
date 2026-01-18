"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Loader2,
  Upload,
  FileText,
  Check,
  AlertCircle,
  Sparkles,
  X,
  Clipboard,
  Briefcase,
  GraduationCap,
  Code,
  Award,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { ParsedCV } from "@/lib/cv-parser";
import { cn } from "@/lib/utils";

interface CVUploaderProps {
  onParsed: (data: ParsedCV) => void;
}

export function CVUploader({ onParsed }: CVUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [parsedData, setParsedData] = useState<ParsedCV | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setParsedData(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  async function handleParse(type: "file" | "text") {
    setIsLoading(true);
    setParsedData(null);

    try {
      const formData = new FormData();

      if (type === "file" && file) {
        formData.append("file", file);
      } else if (type === "text" && cvText) {
        formData.append("text", cvText);
      } else {
        toast.error("Please provide a CV file or text");
        return;
      }

      const response = await fetch("/api/cv/parse", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to parse CV");
      }

      setParsedData(data);
      toast.success("CV parsed successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to parse CV";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleApply() {
    if (!parsedData) return;

    try {
      // Convert legacy social link fields to socialLinks array
      const socialLinks: { id: string; type: string; url: string }[] = [];

      if (parsedData.github) {
        socialLinks.push({ id: crypto.randomUUID(), type: "github", url: parsedData.github });
      }
      if (parsedData.linkedin) {
        socialLinks.push({ id: crypto.randomUUID(), type: "linkedin", url: parsedData.linkedin });
      }
      if (parsedData.twitter) {
        socialLinks.push({ id: crypto.randomUUID(), type: "twitter", url: parsedData.twitter });
      }
      if (parsedData.website) {
        socialLinks.push({ id: crypto.randomUUID(), type: "website", url: parsedData.website });
      }

      // Prepare data without legacy fields
      const { github, linkedin, twitter, website, ...restData } = parsedData;
      const dataToSend = {
        ...restData,
        ...(socialLinks.length > 0 && { socialLinks }),
      };

      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to apply data");
      }

      onParsed(parsedData);
      toast.success("CV data applied to your portfolio!");
    } catch {
      toast.error("Failed to apply CV data");
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger
            value="upload"
            className="rounded-lg data-[state=active]:shadow-sm gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger
            value="paste"
            className="rounded-lg data-[state=active]:shadow-sm gap-2"
          >
            <Clipboard className="h-4 w-4" />
            Paste Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <div className="space-y-4">
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={cn(
                "relative rounded-2xl border-2 border-dashed p-8 md:p-12 text-center cursor-pointer transition-all duration-200",
                isDragActive
                  ? "border-emerald-500 bg-emerald-500/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
                    isDragActive
                      ? "bg-emerald-500/10"
                      : "bg-muted"
                  )}
                >
                  <Upload
                    className={cn(
                      "h-7 w-7 transition-colors",
                      isDragActive
                        ? "text-emerald-500"
                        : "text-muted-foreground"
                    )}
                  />
                </div>
                {isDragActive ? (
                  <div>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">
                      Drop your file here
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-[15px]">
                      Drag & drop your CV here
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse files
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      Supports PDF, DOCX, DOC, TXT • Max 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Selected file */}
            {file && (
              <div className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[14px] truncate">{file.name}</p>
                  <p className="text-[12px] text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleParse("file")}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    Parse with AI
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="paste" className="mt-6">
          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-5">
              <Textarea
                placeholder="Paste your CV content here...&#10;&#10;Include your work experience, education, skills, and any other relevant information."
                className="min-h-[240px] resize-none border-0 p-0 focus-visible:ring-0 text-[14px]"
                value={cvText}
                onChange={(e) => {
                  setCvText(e.target.value);
                  setParsedData(null);
                }}
              />
            </div>
            <Button
              onClick={() => handleParse("text")}
              disabled={isLoading || !cvText.trim()}
              className="w-full h-11 gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Parse with AI
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Parsed Results */}
      {parsedData && (
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 overflow-hidden animate-fade-up">
          <div className="p-5 border-b border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px]">Parsed Successfully</h3>
                  <p className="text-[12px] text-muted-foreground">
                    Review the extracted information below
                  </p>
                </div>
              </div>
              <Button onClick={handleApply} className="gap-2">
                <Check className="h-4 w-4" />
                Apply to Portfolio
              </Button>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Basic Info */}
            {(parsedData.fullName || parsedData.title) && (
              <div className="space-y-2">
                {parsedData.fullName && (
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-muted-foreground w-16">Name</span>
                    <span className="font-medium">{parsedData.fullName}</span>
                  </div>
                )}
                {parsedData.title && (
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-muted-foreground w-16">Title</span>
                    <span className="font-medium">{parsedData.title}</span>
                  </div>
                )}
              </div>
            )}

            {/* Skills */}
            {parsedData.skills && parsedData.skills.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[13px] font-medium">
                    Skills ({parsedData.skills.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {parsedData.skills.slice(0, 12).map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-background/80 text-[12px]"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                  {parsedData.skills.length > 12 && (
                    <Badge variant="outline" className="text-[12px]">
                      +{parsedData.skills.length - 12} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {parsedData.experience && parsedData.experience.length > 0 && (
                <div className="p-3 rounded-xl bg-background/60 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="h-4 w-4 text-blue-500" />
                    <span className="text-[12px] text-muted-foreground">Experience</span>
                  </div>
                  <p className="font-semibold">{parsedData.experience.length} positions</p>
                </div>
              )}
              {parsedData.education && parsedData.education.length > 0 && (
                <div className="p-3 rounded-xl bg-background/60 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="h-4 w-4 text-violet-500" />
                    <span className="text-[12px] text-muted-foreground">Education</span>
                  </div>
                  <p className="font-semibold">{parsedData.education.length} entries</p>
                </div>
              )}
              {parsedData.projects && parsedData.projects.length > 0 && (
                <div className="p-3 rounded-xl bg-background/60 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-orange-500" />
                    <span className="text-[12px] text-muted-foreground">Projects</span>
                  </div>
                  <p className="font-semibold">{parsedData.projects.length} projects</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Warning Card */}
      <div className="flex items-start gap-4 p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="font-medium text-[14px]">LLM Provider Required</p>
          <p className="text-[13px] text-muted-foreground mt-1">
            Make sure you have configured an AI provider in the LLM Config section.
            The AI will extract and structure information from your CV for your portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}
