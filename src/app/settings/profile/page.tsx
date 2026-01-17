"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  Save,
  User,
  Mail,
  Briefcase,
  Sparkles,
  Code2,
  FolderKanban,
  GraduationCap,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { SkillsEditor } from "@/components/settings/skills-editor";
import { ExperienceEditor } from "@/components/settings/experience-editor";
import { ProjectsEditor } from "@/components/settings/projects-editor";
import { EducationEditor } from "@/components/settings/education-editor";
import { SocialLinksEditor } from "@/components/settings/social-links-editor";
import { CollapsibleSection } from "@/components/settings/collapsible-section";
import type {
  Skill,
  Experience,
  Project,
  Education,
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

// Helper to migrate legacy social links
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

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Content states
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

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
          setSocialLinks(migrateLegacyLinks(data));
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

  async function handleSave() {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    try {
      const formValues = form.getValues();
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          skills,
          experience: experiences,
          projects,
          education,
          socialLinks,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      toast.success("Portfolio saved successfully");
    } catch {
      toast.error("Failed to save portfolio");
    } finally {
      setIsLoading(false);
    }
  }

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
    <div className="space-y-6 animate-fade-up pb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 shrink-0">
            <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground mt-1">
              Manage all your portfolio information
            </p>
          </div>
        </div>

        <Button onClick={handleSave} disabled={isLoading} size="lg">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save All
        </Button>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          {/* Basic Info Section */}
          <CollapsibleSection
            title="Basic Information"
            description="Your name, title, and bio"
            icon={User}
            iconColor="text-blue-600 dark:text-blue-400"
            bgColor="bg-blue-500/10"
            defaultOpen={true}
          >
            <div className="space-y-5 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Full Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="h-11" {...field} />
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
                      <FormLabel className="text-[13px]">Professional Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Software Engineer" className="h-11" {...field} />
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
                    <FormLabel className="text-[13px] flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                      Tagline
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Building the future, one line of code at a time"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-[12px]">
                      A short, catchy phrase that describes you
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px]">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell visitors about yourself..."
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleSection>

          {/* Contact Info Section */}
          <CollapsibleSection
            title="Contact Information"
            description="How people can reach you"
            icon={Mail}
            iconColor="text-emerald-600 dark:text-emerald-400"
            bgColor="bg-emerald-500/10"
          >
            <div className="space-y-5 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@example.com" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 890" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[13px]">Location</FormLabel>
                    <FormControl>
                      <Input placeholder="San Francisco, CA" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleSection>

          {/* Social Links Section */}
          <CollapsibleSection
            title="Social Links"
            description={`${socialLinks.length} link${socialLinks.length !== 1 ? "s" : ""} added`}
            icon={LinkIcon}
            iconColor="text-violet-600 dark:text-violet-400"
            bgColor="bg-violet-500/10"
          >
            <div className="pt-3">
              <SocialLinksEditor links={socialLinks} onChange={setSocialLinks} />
            </div>
          </CollapsibleSection>

          {/* Skills Section */}
          <CollapsibleSection
            title="Skills"
            description={`${skills.length} skill${skills.length !== 1 ? "s" : ""} added`}
            icon={Code2}
            iconColor="text-purple-600 dark:text-purple-400"
            bgColor="bg-purple-500/10"
          >
            <div className="pt-3">
              <SkillsEditor skills={skills} onChange={setSkills} />
            </div>
          </CollapsibleSection>

          {/* Experience Section */}
          <CollapsibleSection
            title="Experience"
            description={`${experiences.length} position${experiences.length !== 1 ? "s" : ""} added`}
            icon={Briefcase}
            iconColor="text-sky-600 dark:text-sky-400"
            bgColor="bg-sky-500/10"
          >
            <div className="pt-3">
              <ExperienceEditor experiences={experiences} onChange={setExperiences} />
            </div>
          </CollapsibleSection>

          {/* Projects Section */}
          <CollapsibleSection
            title="Projects"
            description={`${projects.length} project${projects.length !== 1 ? "s" : ""} added`}
            icon={FolderKanban}
            iconColor="text-teal-600 dark:text-teal-400"
            bgColor="bg-teal-500/10"
          >
            <div className="pt-3">
              <ProjectsEditor projects={projects} onChange={setProjects} />
            </div>
          </CollapsibleSection>

          {/* Education Section */}
          <CollapsibleSection
            title="Education"
            description={`${education.length} entr${education.length !== 1 ? "ies" : "y"} added`}
            icon={GraduationCap}
            iconColor="text-amber-600 dark:text-amber-400"
            bgColor="bg-amber-500/10"
          >
            <div className="pt-3">
              <EducationEditor education={education} onChange={setEducation} />
            </div>
          </CollapsibleSection>
        </div>
      </Form>

      {/* Sticky Save Button (mobile) */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <Button onClick={handleSave} disabled={isLoading} size="lg" className="shadow-lg">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save
        </Button>
      </div>
    </div>
  );
}
