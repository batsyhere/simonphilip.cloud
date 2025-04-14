import { generateTailoredContent } from "./openai";

export const tailorResume = async (jobDescription: string, profileData: object) => {
  try {
    const rawContent = await generateTailoredContent(jobDescription, profileData);
    const parsed = JSON.parse(rawContent || "");

    return parsed;

  } catch (error) {
    console.error("Error tailoring resume:", error);
    throw new Error("Failed to tailor resume.");
  }
};
