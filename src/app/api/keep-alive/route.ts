import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Simple query to keep Supabase database active
    const count = await prisma.user.count();

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      users: count,
    });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json(
      { ok: false, error: "Database query failed" },
      { status: 500 }
    );
  }
}
