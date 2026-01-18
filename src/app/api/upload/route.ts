import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabaseAdmin, STORAGE_BUCKET, getPublicUrl } from "@/lib/supabase";

// Allowed file types
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const ALLOWED_CV_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_CV_SIZE = 10 * 1024 * 1024; // 10MB

// Get file extension from mime type
function getExtFromMime(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  };
  return mimeToExt[mimeType] || "";
}

export async function POST(req: NextRequest) {
  try {
    // Parse formData FIRST before auth() to avoid body consumption issue
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null; // "avatar" or "cv"

    // Now check auth
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!type || !["avatar", "cv"].includes(type)) {
      return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
    }

    // Validate file type and size
    if (type === "avatar") {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP)" },
          { status: 400 }
        );
      }
      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 5MB" },
          { status: 400 }
        );
      }
    } else if (type === "cv") {
      if (!ALLOWED_CV_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload a PDF or Word document" },
          { status: 400 }
        );
      }
      if (file.size > MAX_CV_SIZE) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 10MB" },
          { status: 400 }
        );
      }
    }

    // Generate unique filename
    const ext = getExtFromMime(file.type);
    const timestamp = Date.now();
    const filename = type === "avatar"
      ? `avatar-${timestamp}${ext}`
      : `cv-${timestamp}${ext}`;

    // Storage path: {userId}/{type}/{filename}
    const storagePath = `${session.user.id}/${type}/${filename}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Delete old file if exists (for avatar/cv replacement)
    const { data: existingFiles } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .list(`${session.user.id}/${type}`);

    if (existingFiles && existingFiles.length > 0) {
      const filesToDelete = existingFiles.map(f => `${session.user.id}/${type}/${f.name}`);
      await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .remove(filesToDelete);
    }

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file to storage" },
        { status: 500 }
      );
    }

    // Get public URL
    const publicUrl = getPublicUrl(storagePath);

    return NextResponse.json({
      url: publicUrl,
      filename: filename,
      type: type
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
