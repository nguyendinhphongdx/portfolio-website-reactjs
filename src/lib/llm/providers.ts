import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import type { LLMProvider } from "@/types/llm";

export function createLLMProvider(provider: LLMProvider, apiKey: string) {
  switch (provider) {
    case "openai":
      return createOpenAI({ apiKey });
    case "anthropic":
      return createAnthropic({ apiKey });
    case "google":
      return createGoogleGenerativeAI({ apiKey });
    case "groq":
      return createGroq({ apiKey });
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export function getLanguageModel(
  provider: LLMProvider,
  apiKey: string,
  modelId: string
) {
  const llmProvider = createLLMProvider(provider, apiKey);

  switch (provider) {
    case "openai":
      return (llmProvider as ReturnType<typeof createOpenAI>)(modelId);
    case "anthropic":
      return (llmProvider as ReturnType<typeof createAnthropic>)(modelId);
    case "google":
      return (llmProvider as ReturnType<typeof createGoogleGenerativeAI>)(modelId);
    case "groq":
      return (llmProvider as ReturnType<typeof createGroq>)(modelId);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
