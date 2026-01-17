
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UserData, GenerationResult } from "../types";

// Correctly initialize GoogleGenAI using process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Executes a function with exponential backoff retries.
 * Handles 429 (Rate Limit) errors specifically.
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isRateLimit = error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED';
      
      if (isRateLimit && i < maxRetries - 1) {
        // Wait longer each time: 2s, 4s, 8s...
        const waitTime = Math.pow(2, i + 1) * 1000;
        console.warn(`Rate limit hit. Retrying in ${waitTime}ms... (Attempt ${i + 1}/${maxRetries})`);
        await sleep(waitTime);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export const generateCareerContent = async (data: UserData): Promise<GenerationResult> => {
  // Using gemini-3-flash-preview for text generation tasks as recommended.
  const model = "gemini-3-flash-preview";

  const resumePrompt = `
    You are a professional HR resume writer.
    Write a high-impact, professional resume summary (approx 3-5 sentences) for the following individual:
    Name: ${data.name}
    Target Job Title: ${data.jobTitle}
    Experience: ${data.experience}
    Skills: ${data.skills}
    
    Focus on achievements, keywords relevant to ${data.jobTitle}, and a professional tone. 
    Return ONLY the summary text.
  `;

  const coverLetterPrompt = `
    You are a professional career coach.
    Write a customized, persuasive cover letter for:
    Name: ${data.name}
    Target Job Title: ${data.jobTitle}
    Target Company: ${data.company || "Prospective Employer"}
    Experience: ${data.experience}
    Skills: ${data.skills}
    
    The letter should be professional, engaging, and highlight how the candidate's background solves the company's needs.
    Use standard business letter formatting.
    Return ONLY the cover letter text.
  `;

  try {
    // Explicitly typing withRetry as GenerateContentResponse to resolve 'unknown' property access errors.
    const resumeResponse = await withRetry<GenerateContentResponse>(() => 
      ai.models.generateContent({
        model,
        contents: resumePrompt,
      })
    );

    // Short pause between requests to reduce 429 risk
    await sleep(500);

    // Explicitly typing withRetry as GenerateContentResponse to resolve 'unknown' property access errors.
    const coverLetterResponse = await withRetry<GenerateContentResponse>(() => 
      ai.models.generateContent({
        model,
        contents: coverLetterPrompt,
      })
    );

    // Extracting text directly from the response object as per Gemini API guidelines.
    const resumeSummary = resumeResponse.text || "Failed to generate resume summary.";
    const coverLetter = coverLetterResponse.text || "Failed to generate cover letter.";

    return {
      resumeSummary: resumeSummary.trim(),
      coverLetter: coverLetter.trim(),
    };
  } catch (error: any) {
    console.error("Error generating content:", error);
    
    if (error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED') {
      throw new Error("The AI service is currently at capacity. Please wait a moment and try again.");
    }
    
    throw new Error("Failed to generate content. Please check your network connection or try again later.");
  }
};
