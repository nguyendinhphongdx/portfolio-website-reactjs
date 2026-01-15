import { generateText, Output } from "ai";
import { z } from "zod";
import { getLanguageModel } from "./llm/providers";
import type { LLMProvider } from "@/types/llm";
import * as mammoth from "mammoth";

const cvSchema = z.object({
  fullName: z.string().optional().describe("Full name of the person"),
  title: z.string().optional().describe("Professional title or current position"),
  bio: z.string().optional().describe("Brief professional summary or bio"),
  email: z.string().optional().describe("Contact email"),
  phone: z.string().optional().describe("Phone number"),
  location: z.string().optional().describe("City, Country or full address"),
  github: z.string().optional().describe("GitHub profile URL"),
  linkedin: z.string().optional().describe("LinkedIn profile URL"),
  twitter: z.string().optional().describe("Twitter/X profile URL"),
  website: z.string().optional().describe("Personal website URL"),
  skills: z
    .array(
      z.object({
        name: z.string().describe("Skill name as written"),
        level: z
          .enum(["beginner", "intermediate", "advanced", "expert"])
          .optional()
          .describe("Only if EXPLICITLY stated in CV (e.g. Advanced, Expert, 5+ years)"),
        category: z.string().optional().describe("Frontend/Backend/DevOps/Database/Mobile/Other"),
      })
    )
    .optional()
    .describe("Skills explicitly listed in CV"),
  experience: z
    .array(
      z.object({
        company: z.string().describe("Company name"),
        position: z.string().describe("Job title"),
        startDate: z.string().describe("Start date in YYYY-MM or YYYY format"),
        endDate: z.string().nullable().optional().describe("End date in YYYY-MM or YYYY format. null if current job"),
        current: z.boolean().optional().describe("true only if explicitly stated as Present/Current"),
        description: z.string().optional().describe("Job description as written"),
        highlights: z.array(z.string()).optional().describe("Key achievements or responsibilities"),
        location: z.string().optional().describe("Work location"),
      })
    )
    .optional()
    .describe("Work experience"),
  education: z
    .array(
      z.object({
        institution: z.string().describe("School or university name"),
        degree: z.string().describe("Degree type like Bachelor, Master, PhD"),
        field: z.string().optional().describe("Field of study"),
        startDate: z.string().describe("Start date in YYYY-MM or YYYY format"),
        endDate: z.string().nullable().optional().describe("End date in YYYY-MM or YYYY format. null if currently studying"),
        current: z.boolean().optional().describe("true only if explicitly stated as current/ongoing"),
        gpa: z.string().optional().describe("GPA or grade if stated"),
        description: z.string().optional().describe("Additional details"),
      })
    )
    .optional()
    .describe("Educational background"),
  projects: z
    .array(
      z.object({
        name: z.string().describe("Project name"),
        description: z.string().optional().describe("Project description"),
        url: z.string().optional().describe("Live project URL"),
        github: z.string().optional().describe("GitHub repository URL"),
        technologies: z.array(z.string()).optional().describe("Technologies used"),
        startDate: z.string().optional().describe("Start date"),
        endDate: z.string().optional().describe("End date"),
      })
    )
    .optional()
    .describe("Personal or work projects"),
  certifications: z
    .array(
      z.object({
        name: z.string().describe("Certification name"),
        issuer: z.string().describe("Issuing organization"),
        date: z.string().optional().describe("Date obtained"),
        expiryDate: z.string().optional().describe("Expiry date if applicable"),
        url: z.string().optional().describe("Verification URL"),
        credentialId: z.string().optional().describe("Credential ID"),
      })
    )
    .optional()
    .describe("Professional certifications"),
});

export type ParsedCV = z.infer<typeof cvSchema>;

const systemPrompt = `You are a CV/Resume parser. Extract ONLY explicitly stated information.

SECTIONS TO LOOK FOR:
- Summary / Profile / About
- Experience / Work History / Employment
- Education / Academic Background
- Skills / Technical Skills / Competencies
- Projects / Portfolio
- Certifications / Licenses

SCHEMA FIELDS:
- fullName: Person's full name only
- title: Current/most recent job title as written
- bio: Professional summary paragraph if present
- email: Email address
- phone: Phone number
- location: City, Country
- github: GitHub URL (https://github.com/...)
- linkedin: LinkedIn URL (https://linkedin.com/in/...)
- twitter: Twitter/X URL
- website: Personal website URL
- skills: Array of {name, level?, category?}
  - level: ONLY if explicitly stated (e.g. "Advanced", "Expert", "5 years")
  - category: Frontend/Backend/DevOps/Database/Mobile/Other
- experience: Array of {company, position, startDate, endDate?, current?, description?, highlights?, location?}
- education: Array of {institution, degree, field?, startDate, endDate?}
- projects: Array of {name, description?, url?, github?, technologies?}
- certifications: Array of {name, issuer, date?, url?}

STRICT RULES:
1. Extract ONLY what is EXPLICITLY written - do NOT infer or guess
2. Do NOT derive skills from job titles or descriptions
3. Do NOT assume skill levels - only extract if clearly stated
4. Do NOT guess current employment - only set current=true if "Present" or "Current" is written
5. Dates: Use "YYYY-MM" or "YYYY" format. If "Present"/"Current", set endDate=null and current=true
6. If a field is unclear or ambiguous, OMIT it entirely
7. URLs must be clean without tracking parameters
8. Preserve original text - do not paraphrase or summarize job descriptions`;

export async function parseCV(
  cvText: string,
  provider: LLMProvider,
  apiKey: string,
  model: string
): Promise<ParsedCV> {
  const languageModel = getLanguageModel(provider, apiKey, model);

  const { output } = await generateText({
    model: languageModel,
    temperature: 0, // Deterministic output for CV parsing - no creativity needed
    output: Output.object({
      schema: cvSchema,
    }),
    prompt: `${systemPrompt}

CV Content:
${cvText}`,
  });

  return output ?? {};
}

/**
 * Extract text from various file types
 */
async function extractTextFromFile(
  fileBuffer: ArrayBuffer,
  fileType: string,
  fileName?: string
): Promise<string> {
  const buffer = Buffer.from(fileBuffer);

  // PDF extraction
  if (fileType === "application/pdf" || fileName?.endsWith(".pdf")) {
    try {
      const { extractText, getDocumentProxy } = await import("unpdf");

      // First create a document proxy from the PDF buffer
      const pdf = await getDocumentProxy(new Uint8Array(buffer));

      // Then extract text with mergePages option
      const result = await extractText(pdf, { mergePages: true });
      // Only log non-sensitive metadata
      console.log("PDF extraction: pages=%d, textLength=%d", result.totalPages, typeof result.text === 'string' ? result.text.length : 0);

      const extractedText = typeof result.text === 'string' ? result.text : '';

      // Clean up PDF document
      await pdf.destroy();

      if (extractedText.trim().length > 0) {
        return extractedText;
      }

      // If unpdf returns empty, the PDF might be image-based
      throw new Error("PDF appears to be image-based or has no extractable text. Please use a text-based PDF or DOCX file.");
    } catch (err) {
      // Only log error type, not content (PII safety)
      console.error("PDF extraction failed:", err instanceof Error ? err.message : "Unknown error");
      if (err instanceof Error && err.message.includes("image-based")) {
        throw err;
      }
      throw new Error("Could not extract text from PDF. The file may be image-based, scanned, or corrupted. Please try a text-based PDF or DOCX file.");
    }
  }

  // DOCX extraction
  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName?.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  // DOC extraction (older format) - mammoth can handle some
  if (fileType === "application/msword" || fileName?.endsWith(".doc")) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch {
      throw new Error("Cannot extract text from .doc file. Please convert to .docx or PDF.");
    }
  }

  // Plain text
  if (fileType === "text/plain" || fileName?.endsWith(".txt")) {
    return buffer.toString("utf-8");
  }

  throw new Error(`Unsupported file type: ${fileType}. Please upload PDF, DOCX, or TXT file.`);
}

/**
 * Clean and normalize extracted text
 */
function normalizeText(text: string): string {
  return text
    // Remove common PDF artifacts (control characters)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    // Normalize horizontal whitespace only (preserve newlines for structure)
    .replace(/[ \t]+/g, " ")
    // Remove page numbers like "Page 1 of 3"
    .replace(/page\s*\d+\s*(of\s*\d+)?/gi, "")
    // Normalize excessive line breaks but keep structure
    .replace(/\n{4,}/g, "\n\n\n")
    // Clean up lines that are only whitespace
    .replace(/\n[ \t]+\n/g, "\n\n")
    .trim();
}

export async function parseCVWithFile(
  fileBuffer: ArrayBuffer,
  fileType: string,
  provider: LLMProvider,
  apiKey: string,
  model: string,
  fileName?: string
): Promise<ParsedCV> {
  // Step 1: Extract text from file
  const rawText = await extractTextFromFile(fileBuffer, fileType, fileName);

  if (!rawText || rawText.trim().length < 50) {
    throw new Error("Could not extract text from file. The file may be empty, scanned, or corrupted.");
  }

  // Step 2: Normalize text
  const normalizedText = normalizeText(rawText);

  // Step 3: Use the text-based parser
  return parseCV(normalizedText, provider, apiKey, model);
}
