import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseCV, parseCVWithFile } from "@/lib/cv-parser";
import type { LLMProvider } from "@/types/llm";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const cvText = formData.get("text") as string | null;

    // Get user's default LLM config first
    const llmConfig = await prisma.lLMConfig.findFirst({
      where: {
        userId: session.user.id,
        isDefault: true,
      },
    });

    if (!llmConfig) {
      return NextResponse.json(
        {
          error:
            "No LLM configured. Please configure an AI provider in LLM Config settings.",
        },
        { status: 400 }
      );
    }

    let parsedData;

    // If file is provided, extract text and parse
    if (file) {
      const arrayBuffer = await file.arrayBuffer();

      // Supported file types: PDF, DOCX, TXT
      const supportedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
      ];

      const isSupported =
        supportedTypes.includes(file.type) ||
        file.name.endsWith(".pdf") ||
        file.name.endsWith(".docx") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".txt");

      if (!isSupported) {
        return NextResponse.json(
          { error: "Unsupported file type. Please upload PDF, DOCX, or TXT file." },
          { status: 400 }
        );
      }

      // Extract text from file and parse with LLM
      parsedData = await parseCVWithFile(
        arrayBuffer,
        file.type,
        llmConfig.provider as LLMProvider,
        llmConfig.apiKey,
        llmConfig.model,
        file.name
      );
    } else if (cvText) {
      // Use text-based parsing
      parsedData = await parseCV(
        cvText,
        llmConfig.provider as LLMProvider,
        llmConfig.apiKey,
        llmConfig.model
      );
    } else {
      return NextResponse.json(
        { error: "No CV content provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    // Only log error type, not CV content (PII safety)
    console.error("CV parse error:", error instanceof Error ? error.message : "Unknown error");

    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Text extraction errors
    if (errorMessage.includes("Could not extract text") || errorMessage.includes("Unsupported file type")) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    // No output generated - model couldn't parse
    if (errorMessage.includes("NoOutputGeneratedError") || errorMessage.includes("No output generated")) {
      return NextResponse.json(
        {
          error: "Could not extract CV data. The AI model couldn't parse the document. Try using a different model (GPT-4o, Claude 3.5, or Gemini 1.5) or paste your CV as text instead."
        },
        { status: 422 }
      );
    }

    // JSON parsing error
    if (errorMessage.includes("JSONParseError") || errorMessage.includes("JSON parsing failed")) {
      return NextResponse.json(
        {
          error: "AI returned invalid data format. Please try again or use text input."
        },
        { status: 422 }
      );
    }

    if (errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("403")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your LLM configuration." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to parse CV. Please check your LLM configuration and try again." },
      { status: 500 }
    );
  }
}
