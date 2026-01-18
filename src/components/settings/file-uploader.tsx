"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, FileText, Image as ImageIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FileUploaderProps {
  type: "avatar" | "cv";
  value: string | null;
  onChange: (url: string | null) => void;
  onSave?: () => void;
}

export function FileUploader({ type, value, onChange, onSave }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = type === "avatar"
    ? "image/jpeg,image/png,image/gif,image/webp"
    : "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const maxSize = type === "avatar" ? "5MB" : "10MB";
  const fileTypeText = type === "avatar" ? "PNG, JPG, GIF or WebP" : "PDF or Word document";

  const handleFileSelect = useCallback(async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
      toast.success(`${type === "avatar" ? "Avatar" : "CV"} uploaded successfully`);

      // Auto-save after upload if onSave is provided
      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  }, [type, onChange, onSave]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Avatar preview
  if (type === "avatar" && value) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl border bg-card">
        <div className="relative shrink-0">
          <img
            src={value}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-border"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Profile Photo</p>
          <p className="text-xs text-muted-foreground">Your avatar is set</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Change"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    );
  }

  // CV preview
  if (type === "cv" && value) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl border bg-card">
        <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
          <FileText className="h-6 w-6 text-red-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">CV / Resume</p>
          <p className="text-xs text-muted-foreground">Your CV is uploaded</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            asChild
          >
            <a href={value} download target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Replace"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    );
  }

  // Empty state / Upload dropzone
  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer",
        isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50",
        isUploading && "pointer-events-none opacity-60"
      )}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
            <p className="text-sm font-medium">Uploading...</p>
          </>
        ) : (
          <>
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              type === "avatar" ? "bg-blue-500/10" : "bg-red-500/10"
            )}>
              {type === "avatar" ? (
                <ImageIcon className="h-6 w-6 text-blue-600" />
              ) : (
                <FileText className="h-6 w-6 text-red-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {type === "avatar" ? "Upload Profile Photo" : "Upload CV/Resume"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                {fileTypeText} (max {maxSize})
              </p>
            </div>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
