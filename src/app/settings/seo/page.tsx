"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Share2,
  Globe,
  Image,
  BarChart3,
  Save,
  Loader2,
  ExternalLink,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SEOData {
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
  googleAnalyticsId: string | null;
  fullName: string | null;
  username: string | null;
}

export default function SEOSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState<SEOData>({
    seoTitle: null,
    seoDescription: null,
    ogImage: null,
    googleAnalyticsId: null,
    fullName: null,
    username: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/portfolio");
        if (response.ok) {
          const portfolio = await response.json();
          setData({
            seoTitle: portfolio.seoTitle || null,
            seoDescription: portfolio.seoDescription || null,
            ogImage: portfolio.ogImage || null,
            googleAnalyticsId: portfolio.googleAnalyticsId || null,
            fullName: portfolio.fullName || null,
            username: portfolio.username || null,
          });
        }
      } catch (error) {
        console.error("Failed to fetch SEO data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          ogImage: data.ogImage,
          googleAnalyticsId: data.googleAnalyticsId,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");
      toast.success("SEO settings saved!");
    } catch {
      toast.error("Failed to save SEO settings");
    } finally {
      setIsSaving(false);
    }
  };

  const defaultTitle = data.fullName
    ? `${data.fullName} - Portfolio`
    : "Portfolio";
  const defaultDescription = data.fullName
    ? `Professional portfolio of ${data.fullName}`
    : "Professional portfolio";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">SEO Settings</h1>
        <p className="text-muted-foreground">
          Optimize your portfolio for search engines and social media sharing
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Meta Tags */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
                <Search className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Meta Tags</CardTitle>
                <CardDescription className="text-xs">
                  Control how your site appears in search results
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>SEO Title</Label>
              <Input
                value={data.seoTitle || ""}
                onChange={(e) =>
                  setData({ ...data, seoTitle: e.target.value || null })
                }
                placeholder={defaultTitle}
              />
              <p className="text-[11px] text-muted-foreground">
                {(data.seoTitle || defaultTitle).length}/60 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea
                value={data.seoDescription || ""}
                onChange={(e) =>
                  setData({ ...data, seoDescription: e.target.value || null })
                }
                placeholder={defaultDescription}
                rows={3}
              />
              <p className="text-[11px] text-muted-foreground">
                {(data.seoDescription || defaultDescription).length}/160
                characters recommended
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Open Graph */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
                <Share2 className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-base">Social Sharing</CardTitle>
                <CardDescription className="text-xs">
                  Customize how your site looks when shared
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Open Graph Image URL</Label>
              <Input
                value={data.ogImage || ""}
                onChange={(e) =>
                  setData({ ...data, ogImage: e.target.value || null })
                }
                placeholder="https://example.com/og-image.png"
              />
              <p className="text-[11px] text-muted-foreground">
                Recommended size: 1200x630 pixels
              </p>
            </div>

            {data.ogImage && (
              <div className="rounded-lg border overflow-hidden">
                <img
                  src={data.ogImage}
                  alt="OG Image Preview"
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Google Analytics */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10">
                <BarChart3 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-base">Analytics</CardTitle>
                <CardDescription className="text-xs">
                  Track your portfolio visitors
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Google Analytics ID</Label>
              <Input
                value={data.googleAnalyticsId || ""}
                onChange={(e) =>
                  setData({ ...data, googleAnalyticsId: e.target.value || null })
                }
                placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X"
              />
              <p className="text-[11px] text-muted-foreground">
                Find this in your Google Analytics dashboard
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
                <Eye className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <CardTitle className="text-base">Search Preview</CardTitle>
                <CardDescription className="text-xs">
                  How your site appears in Google
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-white p-4 space-y-1">
              <div className="flex items-center gap-2 text-[12px] text-green-700">
                <Globe className="h-3.5 w-3.5" />
                {data.username
                  ? `yoursite.com/${data.username}`
                  : "yoursite.com/username"}
              </div>
              <h3 className="text-[16px] text-blue-700 hover:underline cursor-pointer font-medium">
                {data.seoTitle || defaultTitle}
              </h3>
              <p className="text-[13px] text-gray-600 line-clamp-2">
                {data.seoDescription || defaultDescription}
              </p>
            </div>

            <div className="mt-4 rounded-lg border bg-[#1877f2] p-4 text-white">
              <p className="text-[10px] uppercase tracking-wider opacity-70 mb-2">
                Facebook Preview
              </p>
              {data.ogImage ? (
                <div className="rounded overflow-hidden mb-2">
                  <img
                    src={data.ogImage}
                    alt="OG Preview"
                    className="w-full h-24 object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-24 bg-white/10 rounded mb-2 flex items-center justify-center">
                  <Image className="h-8 w-8 opacity-50" />
                </div>
              )}
              <p className="text-[11px] opacity-70 uppercase">
                yoursite.com
              </p>
              <p className="text-[14px] font-medium">
                {data.seoTitle || defaultTitle}
              </p>
              <p className="text-[12px] opacity-80 line-clamp-1">
                {data.seoDescription || defaultDescription}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
}
