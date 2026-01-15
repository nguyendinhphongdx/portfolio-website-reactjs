"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  Plus,
  Trash2,
  Star,
  ExternalLink,
  Check,
  Key,
  Zap,
  Sparkles,
  Bot,
  CircuitBoard,
  Brain,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { LLM_PROVIDERS, type LLMProvider } from "@/types/llm";
import { cn } from "@/lib/utils";

interface LLMConfigItem {
  id: string;
  provider: string;
  model: string;
  apiKey: string;
  isDefault: boolean;
}

const configSchema = z.object({
  provider: z.enum(["openai", "anthropic", "google", "groq"]),
  apiKey: z.string().min(1, "API key is required"),
  model: z.string().min(1, "Please select a model"),
  isDefault: z.boolean(),
});

type ConfigFormValues = z.infer<typeof configSchema>;

// Provider icons and colors
const providerMeta: Record<
  string,
  { icon: React.ElementType; gradient: string; color: string }
> = {
  openai: {
    icon: Bot,
    gradient: "from-emerald-500/20 to-teal-500/20",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  anthropic: {
    icon: Brain,
    gradient: "from-orange-500/20 to-amber-500/20",
    color: "text-orange-600 dark:text-orange-400",
  },
  google: {
    icon: Sparkles,
    gradient: "from-blue-500/20 to-indigo-500/20",
    color: "text-blue-600 dark:text-blue-400",
  },
  groq: {
    icon: Zap,
    gradient: "from-violet-500/20 to-purple-500/20",
    color: "text-violet-600 dark:text-violet-400",
  },
};

export function LLMConfigForm() {
  const [configs, setConfigs] = useState<LLMConfigItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider | null>(
    null
  );

  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      provider: "openai",
      apiKey: "",
      model: "",
      isDefault: false,
    },
  });

  const watchProvider = form.watch("provider");
  const currentProviderConfig = LLM_PROVIDERS.find(
    (p) => p.id === watchProvider
  );

  useEffect(() => {
    fetchConfigs();
  }, []);

  async function fetchConfigs() {
    try {
      const response = await fetch("/api/llm");
      if (response.ok) {
        const data = await response.json();
        setConfigs(data);
      }
    } catch (error) {
      console.error("Failed to fetch configs:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(values: ConfigFormValues) {
    setIsSaving(true);
    try {
      const response = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save");
      }

      toast.success("Configuration saved successfully!");
      setIsDialogOpen(false);
      form.reset();
      fetchConfigs();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/llm?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      toast.success("Configuration removed");
      fetchConfigs();
    } catch {
      toast.error("Failed to delete configuration");
    }
  }

  async function setAsDefault(id: string, provider: string) {
    try {
      const config = configs.find((c) => c.id === id);
      if (!config) return;

      const response = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          apiKey: config.apiKey,
          model: config.model,
          isDefault: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      toast.success("Default provider updated");
      fetchConfigs();
    } catch {
      toast.error("Failed to update default");
    }
  }

  function openAddDialog(provider?: LLMProvider) {
    if (provider) {
      form.setValue("provider", provider);
      setSelectedProvider(provider);
    } else {
      form.reset();
      setSelectedProvider(null);
    }
    setIsDialogOpen(true);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-muted animate-pulse" />
          <Loader2 className="absolute inset-0 m-auto h-5 w-5 animate-spin text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Loading configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Active Configurations Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold">Active Providers</h3>
            <p className="text-sm text-muted-foreground">
              {configs.length === 0
                ? "No providers configured yet"
                : `${configs.length} provider${configs.length > 1 ? "s" : ""} configured`}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => openAddDialog()}
                className="shadow-elegant"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Provider
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                    <CircuitBoard className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg">Add AI Provider</DialogTitle>
                    <DialogDescription className="text-[13px]">
                      Configure API credentials for AI features
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px]">Provider</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue("model", "");
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select a provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LLM_PROVIDERS.map((provider) => {
                              const meta = providerMeta[provider.id];
                              const Icon = meta?.icon || Bot;
                              return (
                                <SelectItem
                                  key={provider.id}
                                  value={provider.id}
                                  className="py-2.5"
                                >
                                  <div className="flex items-center gap-2">
                                    <Icon className={cn("h-4 w-4", meta?.color)} />
                                    <span>{provider.name}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        {currentProviderConfig && (
                          <FormDescription className="flex items-center gap-1.5 text-[12px]">
                            <ExternalLink className="h-3 w-3" />
                            <a
                              href={currentProviderConfig.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Get your API key from {currentProviderConfig.name}
                            </a>
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px]">API Key</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="password"
                              placeholder="sk-..."
                              className="pl-10 h-11 font-mono text-sm"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[13px]">Model</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currentProviderConfig?.models.map((model) => (
                              <SelectItem
                                key={model.id}
                                value={model.id}
                                className="py-2.5"
                              >
                                <div>
                                  <div className="font-medium">{model.name}</div>
                                  {model.description && (
                                    <div className="text-[11px] text-muted-foreground">
                                      {model.description}
                                    </div>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isDefault"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-border/50 p-4 bg-muted/30">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-[13px] font-medium">
                            Set as default provider
                          </FormLabel>
                          <FormDescription className="text-[12px]">
                            This provider will be used for all AI features
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save Configuration
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {configs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <CircuitBoard className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="font-medium text-foreground mb-1">No providers configured</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Add an AI provider to start using intelligent features
            </p>
            <Button
              variant="outline"
              onClick={() => openAddDialog()}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add your first provider
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {configs.map((config, index) => {
              const providerInfo = LLM_PROVIDERS.find(
                (p) => p.id === config.provider
              );
              const meta = providerMeta[config.provider];
              const Icon = meta?.icon || Bot;

              return (
                <div
                  key={config.id}
                  className={cn(
                    "group relative rounded-2xl border bg-card p-5 transition-all duration-200 hover:shadow-elegant animate-fade-up",
                    config.isDefault && "border-primary/30 bg-primary/[0.02]"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Provider Icon */}
                    <div
                      className={cn(
                        "flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br shrink-0",
                        meta?.gradient
                      )}
                    >
                      <Icon className={cn("h-5 w-5", meta?.color)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[15px]">
                          {providerInfo?.name || config.provider}
                        </h4>
                        {config.isDefault && (
                          <Badge
                            variant="secondary"
                            className="gap-1 text-[10px] px-1.5 py-0 h-5 bg-primary/10 text-primary border-0"
                          >
                            <Star className="h-2.5 w-2.5 fill-current" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-[13px] text-muted-foreground mb-3">
                        {providerInfo?.description}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Model:</span>
                          <code className="font-mono text-[12px] bg-muted px-1.5 py-0.5 rounded">
                            {config.model}
                          </code>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Key:</span>
                          <code className="font-mono text-[12px] bg-muted px-1.5 py-0.5 rounded">
                            {config.apiKey}
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!config.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAsDefault(config.id, config.provider)}
                          className="h-8 text-[12px] gap-1"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(config.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Available Providers */}
      <div>
        <div className="mb-4">
          <h3 className="text-base font-semibold">Available Providers</h3>
          <p className="text-sm text-muted-foreground">
            Click to add a provider to your configuration
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {LLM_PROVIDERS.map((provider, index) => {
            const isConfigured = configs.some((c) => c.provider === provider.id);
            const meta = providerMeta[provider.id];
            const Icon = meta?.icon || Bot;

            return (
              <button
                key={provider.id}
                onClick={() => openAddDialog(provider.id)}
                className={cn(
                  "group relative p-4 rounded-xl border text-left transition-all duration-200 animate-fade-up",
                  "hover:shadow-elegant hover:border-border",
                  isConfigured
                    ? "bg-primary/[0.03] border-primary/20"
                    : "bg-card border-border/50 hover:bg-muted/30"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br mb-3 transition-transform group-hover:scale-105",
                    meta?.gradient
                  )}
                >
                  <Icon className={cn("h-5 w-5", meta?.color)} />
                </div>

                {/* Text */}
                <div className="font-medium text-[13px] mb-0.5">
                  {provider.name}
                </div>
                <div className="text-[11px] text-muted-foreground line-clamp-2">
                  {provider.description}
                </div>

                {/* Configured badge */}
                {isConfigured && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
