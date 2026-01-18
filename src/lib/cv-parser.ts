import { generateText } from "ai";
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

const systemPrompt = `You are an expert CV/Resume parser. Your task is to extract ALL available information from the CV text.

EXTRACT THESE FIELDS:

1. PERSONAL INFO:
   - fullName: The person's full name (usually at the top)
   - title: Job title, position, or professional headline
   - bio: Summary, objective, or about section text
   - email: Email address (look for @ symbol)
   - phone: Phone number (any format)
   - location: City, Country, or address

2. SOCIAL/LINKS:
   - github: GitHub URL (github.com/...)
   - linkedin: LinkedIn URL (linkedin.com/in/...)
   - twitter: Twitter/X URL
   - website: Personal website or portfolio URL

3. SKILLS:
   Extract ALL skills mentioned. For each skill:
   - name: The skill name exactly as written
   - level: Only if explicitly stated (beginner/intermediate/advanced/expert)
   - category: Categorize as Frontend/Backend/DevOps/Database/Mobile/Other

4. EXPERIENCE:
   Extract ALL work experiences. For each:
   - company: Company/organization name
   - position: Job title
   - startDate: Start date (YYYY-MM or YYYY format)
   - endDate: End date (YYYY-MM or YYYY, or null if current)
   - current: true if "Present", "Current", "Now", or ongoing
   - description: Job description text
   - highlights: Array of achievements/responsibilities
   - location: Work location if mentioned

5. EDUCATION:
   Extract ALL education entries. For each:
   - institution: School/university name
   - degree: Degree type (Bachelor, Master, PhD, etc.)
   - field: Field of study/major
   - startDate: Start year
   - endDate: End year (null if current)
   - gpa: GPA if mentioned

6. PROJECTS:
   Extract ALL projects mentioned. For each:
   - name: Project name
   - description: What the project does
   - url: Live URL if provided
   - github: GitHub repo URL if provided
   - technologies: Array of technologies used

7. CERTIFICATIONS:
   Extract ALL certifications. For each:
   - name: Certification name
   - issuer: Issuing organization
   - date: Date obtained
   - credentialId: ID if provided

IMPORTANT:
- Extract as much information as possible
- For dates, convert to YYYY-MM or YYYY format
- If "Present" or "Current" is used for end date, set endDate to null and current to true
- Include ALL skills listed, even if in a comma-separated list
- Look for skills in dedicated sections AND in job descriptions`;

export async function parseCV(
  cvText: string,
  provider: LLMProvider,
  apiKey: string,
  model: string
): Promise<ParsedCV> {
  const languageModel = getLanguageModel(provider, apiKey, model);

  // Log CV text length for debugging (not content for PII safety)
  console.log("CV parsing: textLength=%d, provider=%s, model=%s", cvText.length, provider, model);

  const jsonPrompt = `${systemPrompt}

RESPONSE FORMAT:
You MUST respond with ONLY a valid JSON object (no markdown, no code blocks, no explanation).
The JSON must follow this exact structure:
{
  "fullName": "string or null",
  "title": "string or null",
  "bio": "string or null",
  "email": "string or null",
  "phone": "string or null",
  "location": "string or null",
  "github": "string or null",
  "linkedin": "string or null",
  "twitter": "string or null",
  "website": "string or null",
  "skills": [{"name": "string", "level": "beginner|intermediate|advanced|expert or null", "category": "string or null"}],
  "experience": [{"company": "string", "position": "string", "startDate": "YYYY-MM", "endDate": "YYYY-MM or null", "current": true/false, "description": "string or null", "highlights": ["string"], "location": "string or null"}],
  "education": [{"institution": "string", "degree": "string", "field": "string or null", "startDate": "YYYY", "endDate": "YYYY or null", "current": true/false, "gpa": "string or null"}],
  "projects": [{"name": "string", "description": "string or null", "url": "string or null", "github": "string or null", "technologies": ["string"]}],
  "certifications": [{"name": "string", "issuer": "string", "date": "string or null", "credentialId": "string or null"}]
}

CV Content:
${cvText}

RESPOND WITH JSON ONLY:`;

  const { text } = await generateText({
    model: languageModel,
    temperature: 0.1,
    prompt: jsonPrompt,
  });

  // Log raw response for debugging
  console.log("CV parse raw response length:", text?.length || 0);

  // Parse JSON from response
  try {
    // Clean up response - remove markdown code blocks if present
    let jsonStr = text || "{}";
    jsonStr = jsonStr.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const parsed = JSON.parse(jsonStr);

    // Validate with schema (will strip extra fields and provide defaults)
    const validated = cvSchema.safeParse(parsed);

    if (validated.success) {
      console.log("CV parsed fields:", Object.keys(validated.data).filter(k => validated.data[k as keyof typeof validated.data] !== undefined));
      return validated.data;
    } else {
      console.error("CV schema validation failed:", validated.error.issues);
      // Return parsed data anyway, even if it doesn't fully match schema
      return parsed as ParsedCV;
    }
  } catch (err) {
    console.error("CV JSON parse error:", err instanceof Error ? err.message : "Unknown error");
    console.error("Raw response preview:", text?.substring(0, 200));
    throw new Error("Failed to parse CV response. Please try again.");
  }
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

  // PDF extraction using pdf-parse-new
  if (fileType === "application/pdf" || fileName?.endsWith(".pdf")) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse-new");
      const result = await pdfParse(buffer);
      const extractedText = result.text || "";

      // Log non-sensitive metadata
      console.log("PDF extraction: pages=%d, textLength=%d", result.numpages, extractedText.length);

      if (extractedText.trim().length > 0) {
        return extractedText;
      }

      // If no text extracted, the PDF might be image-based
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
