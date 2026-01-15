export type LLMProvider = "openai" | "anthropic" | "google" | "groq";

export interface LLMProviderConfig {
  id: LLMProvider;
  name: string;
  models: LLMModel[];
  description: string;
  website: string;
}

export interface LLMModel {
  id: string;
  name: string;
  description?: string;
}

export interface LLMConfigData {
  id: string;
  userId: string;
  provider: LLMProvider;
  apiKey: string;
  model: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const LLM_PROVIDERS: LLMProviderConfig[] = [
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT-4 and GPT-3.5 models",
    website: "https://platform.openai.com",
    models: [
      { id: "gpt-4o", name: "GPT-4o", description: "Most capable model" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Fast and affordable" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Latest GPT-4" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and cost-effective" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude models",
    website: "https://console.anthropic.com",
    models: [
      { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", description: "Latest Claude model" },
      { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet", description: "Balanced performance" },
      { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku", description: "Fast and affordable" },
    ],
  },
  {
    id: "google",
    name: "Google AI",
    description: "Gemini models",
    website: "https://aistudio.google.com",
    models: [
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", description: "Latest Gemini" },
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "Best performance" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", description: "Fast responses" },
    ],
  },
  {
    id: "groq",
    name: "Groq",
    description: "Fast inference with Llama and Mixtral",
    website: "https://console.groq.com",
    models: [
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B", description: "Most capable" },
      { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B", description: "Fast responses" },
      { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", description: "Good balance" },
    ],
  },
];

export function getProviderConfig(provider: LLMProvider): LLMProviderConfig | undefined {
  return LLM_PROVIDERS.find((p) => p.id === provider);
}

export function getModelName(provider: LLMProvider, modelId: string): string {
  const providerConfig = getProviderConfig(provider);
  const model = providerConfig?.models.find((m) => m.id === modelId);
  return model?.name || modelId;
}
