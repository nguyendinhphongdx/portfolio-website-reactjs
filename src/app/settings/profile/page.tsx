"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  User,
  Briefcase,
  Sparkles,
  Code2,
  FolderKanban,
  GraduationCap,
  Award,
  Link as LinkIcon,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SkillsEditor } from "@/components/settings/skills-editor";
import { ExperienceEditor } from "@/components/settings/experience-editor";
import { ProjectsEditor } from "@/components/settings/projects-editor";
import { EducationEditor } from "@/components/settings/education-editor";
import { CertificationsEditor } from "@/components/settings/certifications-editor";
import { SocialLinksEditor } from "@/components/settings/social-links-editor";
import { CollapsibleSection } from "@/components/settings/collapsible-section";
import { FileUploader } from "@/components/settings/file-uploader";
import type {
  Skill,
  Experience,
  Project,
  Education,
  Certification,
  SocialLink,
  SocialLinkType,
} from "@/types/portfolio";

const profileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  title: z.string().optional(),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function migrateLegacyLinks(data: Record<string, unknown>): SocialLink[] {
  if (data.socialLinks && Array.isArray(data.socialLinks)) {
    return data.socialLinks as SocialLink[];
  }

  const links: SocialLink[] = [];
  const legacyFields: SocialLinkType[] = [
    "github", "linkedin", "twitter", "website", "dribbble",
    "behance", "youtube", "instagram", "medium", "devto",
    "stackoverflow", "codepen",
  ];

  legacyFields.forEach((field) => {
    const url = data[field] as string | null;
    if (url && url.trim()) {
      links.push({
        id: Math.random().toString(36).substring(2, 9),
        type: field,
        url: url.trim(),
      });
    }
  });

  return links;
}

type SavingSection = "basic" | "social" | "skills" | "experience" | "projects" | "education" | "certifications" | "media" | null;

export default function ProfilePage() {
  const [isFetching, setIsFetching] = useState(true);
  const [savingSection, setSavingSection] = useState<SavingSection>(null);

  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      title: "",
      tagline: "",
      bio: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const response = await fetch("/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          form.reset({
            fullName: data.fullName || "",
            title: data.title || "",
            tagline: data.tagline || "",
            bio: data.bio || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
          });
          setSkills(data.skills || []);
          setExperiences(data.experience || []);
          setProjects(data.projects || []);
          setEducation(data.education || []);
          setCertifications(data.certifications || []);
          setSocialLinks(migrateLegacyLinks(data));
          setAvatar(data.avatar || null);
          setCvUrl(data.cvUrl || null);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
        toast.error("Failed to load portfolio data");
      } finally {
        setIsFetching(false);
      }
    }

    fetchPortfolio();
  }, [form]);

  const saveSection = useCallback(async (section: SavingSection, data: Record<string, unknown>) => {
    setSavingSection(section);
    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      toast.success("Saved successfully");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSavingSection(null);
    }
  }, []);

  const handleSaveBasicInfo = useCallback(async () => {
    const isValid = await form.trigger(["fullName", "title", "tagline", "bio", "email", "location"]);
    if (!isValid) {
      toast.error("Please fix the errors");
      return;
    }
    const values = form.getValues();
    await saveSection("basic", {
      fullName: values.fullName,
      title: values.title,
      tagline: values.tagline,
      bio: values.bio,
      email: values.email,
      location: values.location,
    });
  }, [form, saveSection]);

  const handleSaveSocialLinks = useCallback(async () => {
    await saveSection("social", { socialLinks });
  }, [saveSection, socialLinks]);

  const handleSaveSkills = useCallback(async () => {
    await saveSection("skills", { skills });
  }, [saveSection, skills]);

  const handleSaveExperience = useCallback(async () => {
    await saveSection("experience", { experience: experiences });
  }, [saveSection, experiences]);

  const handleSaveProjects = useCallback(async () => {
    await saveSection("projects", { projects });
  }, [saveSection, projects]);

  const handleSaveEducation = useCallback(async () => {
    await saveSection("education", { education });
  }, [saveSection, education]);

  const handleSaveCertifications = useCallback(async () => {
    await saveSection("certifications", { certifications });
  }, [saveSection, certifications]);

  const handleSaveMedia = useCallback(async () => {
    await saveSection("media", { avatar, cvUrl });
  }, [saveSection, avatar, cvUrl]);

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-muted animate-pulse" />
          <Loader2 className="absolute inset-0 m-auto h-5 w-5 animate-spin text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your portfolio information
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-3">
          {/* Media - Avatar & CV */}
          <CollapsibleSection
            title="Media"
            icon={FileText}
            iconColor="text-rose-600 dark:text-rose-400"
            bgColor="bg-rose-500/10"
            defaultOpen={true}
            onSave={handleSaveMedia}
            isSaving={savingSection === "media"}
          >
            <div className="space-y-4 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-medium">Profile Photo</label>
                  <FileUploader
                    type="avatar"
                    value={avatar}
                    onChange={setAvatar}
                  />
                </div>

                {/* CV Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-medium">CV / Resume</label>
                  <FileUploader
                    type="cv"
                    value={cvUrl}
                    onChange={setCvUrl}
                  />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Basic Info */}
          <CollapsibleSection
            title="Basic Information"
            icon={User}
            iconColor="text-blue-600 dark:text-blue-400"
            bgColor="bg-blue-500/10"
            onSave={handleSaveBasicInfo}
            isSaving={savingSection === "basic"}
          >
            <div className="space-y-4 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Full Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="h-9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" className="h-9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" className="h-9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Location</FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco, CA" className="h-9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Tagline
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Building the future, one line of code at a time..."
                        className="h-9"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell visitors about yourself..."
                        className="min-h-20 resize-none text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleSection>

          {/* Social Links */}
          <CollapsibleSection
            title="Social Links"
            icon={LinkIcon}
            iconColor="text-violet-600 dark:text-violet-400"
            bgColor="bg-violet-500/10"
            badge={socialLinks.length}
            onSave={handleSaveSocialLinks}
            isSaving={savingSection === "social"}
          >
            <div className="pt-3">
              <SocialLinksEditor links={socialLinks} onChange={setSocialLinks} />
            </div>
          </CollapsibleSection>

          {/* Skills */}
          <CollapsibleSection
            title="Skills"
            icon={Code2}
            iconColor="text-purple-600 dark:text-purple-400"
            bgColor="bg-purple-500/10"
            badge={skills.length}
            onSave={handleSaveSkills}
            isSaving={savingSection === "skills"}
          >
            <div className="pt-3">
              <SkillsEditor skills={skills} onChange={setSkills} />
            </div>
          </CollapsibleSection>

          {/* Experience */}
          <CollapsibleSection
            title="Experience"
            icon={Briefcase}
            iconColor="text-sky-600 dark:text-sky-400"
            bgColor="bg-sky-500/10"
            badge={experiences.length}
            onSave={handleSaveExperience}
            isSaving={savingSection === "experience"}
          >
            <div className="pt-3">
              <ExperienceEditor experiences={experiences} onChange={setExperiences} />
            </div>
          </CollapsibleSection>

          {/* Projects */}
          <CollapsibleSection
            title="Projects"
            icon={FolderKanban}
            iconColor="text-teal-600 dark:text-teal-400"
            bgColor="bg-teal-500/10"
            badge={projects.length}
            onSave={handleSaveProjects}
            isSaving={savingSection === "projects"}
          >
            <div className="pt-3">
              <ProjectsEditor projects={projects} onChange={setProjects} />
            </div>
          </CollapsibleSection>

          {/* Education */}
          <CollapsibleSection
            title="Education"
            icon={GraduationCap}
            iconColor="text-amber-600 dark:text-amber-400"
            bgColor="bg-amber-500/10"
            badge={education.length}
            onSave={handleSaveEducation}
            isSaving={savingSection === "education"}
          >
            <div className="pt-3">
              <EducationEditor education={education} onChange={setEducation} />
            </div>
          </CollapsibleSection>

          {/* Certifications */}
          <CollapsibleSection
            title="Certifications"
            icon={Award}
            iconColor="text-emerald-600 dark:text-emerald-400"
            bgColor="bg-emerald-500/10"
            badge={certifications.length}
            onSave={handleSaveCertifications}
            isSaving={savingSection === "certifications"}
          >
            <div className="pt-3">
              <CertificationsEditor certifications={certifications} onChange={setCertifications} />
            </div>
          </CollapsibleSection>
        </div>
      </Form>
    </div>
  );
}
