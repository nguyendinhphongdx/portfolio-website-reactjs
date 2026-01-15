import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const llmConfigSchema = z.object({
  provider: z.enum(["openai", "anthropic", "google", "groq"]),
  apiKey: z.string().min(1, "API key is required"),
  model: z.string().min(1, "Model is required"),
  isDefault: z.boolean().optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const configs = await prisma.lLMConfig.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        provider: true,
        model: true,
        isDefault: true,
        createdAt: true,
        updatedAt: true,
        // Don't send full API key, only masked version
        apiKey: true,
      },
    });

    // Mask API keys
    const maskedConfigs = configs.map((config) => ({
      ...config,
      apiKey: maskApiKey(config.apiKey),
    }));

    return NextResponse.json(maskedConfigs);
  } catch (error) {
    console.error("Get LLM configs error:", error);
    return NextResponse.json(
      { error: "Failed to get LLM configs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = llmConfigSchema.parse(body);

    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.lLMConfig.updateMany({
        where: { userId: session.user.id },
        data: { isDefault: false },
      });
    }

    // Check if config for this provider already exists
    const existing = await prisma.lLMConfig.findUnique({
      where: {
        userId_provider: {
          userId: session.user.id,
          provider: data.provider,
        },
      },
    });

    let config;
    if (existing) {
      // Update existing
      config = await prisma.lLMConfig.update({
        where: { id: existing.id },
        data: {
          apiKey: data.apiKey,
          model: data.model,
          isDefault: data.isDefault ?? existing.isDefault,
        },
      });
    } else {
      // Create new
      // If this is the first config, make it default
      const count = await prisma.lLMConfig.count({
        where: { userId: session.user.id },
      });

      config = await prisma.lLMConfig.create({
        data: {
          userId: session.user.id,
          provider: data.provider,
          apiKey: data.apiKey,
          model: data.model,
          isDefault: data.isDefault ?? count === 0,
        },
      });
    }

    return NextResponse.json({
      ...config,
      apiKey: maskApiKey(config.apiKey),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Save LLM config error:", error);
    return NextResponse.json(
      { error: "Failed to save LLM config" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Config ID required" }, { status: 400 });
    }

    // Verify ownership
    const config = await prisma.lLMConfig.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!config) {
      return NextResponse.json({ error: "Config not found" }, { status: 404 });
    }

    await prisma.lLMConfig.delete({ where: { id } });

    // If deleted was default, set another as default
    if (config.isDefault) {
      const another = await prisma.lLMConfig.findFirst({
        where: { userId: session.user.id },
      });
      if (another) {
        await prisma.lLMConfig.update({
          where: { id: another.id },
          data: { isDefault: true },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete LLM config error:", error);
    return NextResponse.json(
      { error: "Failed to delete LLM config" },
      { status: 500 }
    );
  }
}

function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 8) {
    return "****";
  }
  return apiKey.slice(0, 4) + "****" + apiKey.slice(-4);
}
