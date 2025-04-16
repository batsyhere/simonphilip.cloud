import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  
  const openaiApiKey = process.env.OPENAI_API_KEY;
  console.log("open178", process.env.OPENAI_API_KEY)
  const openai = new OpenAI({ apiKey: openaiApiKey });
  try {
    const { jobDescription, profileData } = await req.json();
    if (!jobDescription || !profileData) {
      return NextResponse.json(
        { error: "Missing jobDescription or profileData" },
        { status: 400 }
      );
    }

    const systemPrompt = `
            You are a professional resume writer.

            Your job is to tailor the user's resume to match the given job description in a way that maximizes relevance for the role while **preserving all original experiences** exactly as provided.

            - Do not omit, remove, or summarize any experiences.
            - Retain all work experience entries.
            - Format the output cleanly for a one-page resume.
            - Optimize only the language (rewording) and structure, but do not lose any data.
            - Add job-specific keywords where necessary to increase ATS compatibility.
            - Return a JSON object like this:

            {
              "resume": {
                "name": "Candidate Name",
                "title": "Professional Title",
                "phone": "Phone Number",
                "email": "Email Address",
                "summary": "Updated summary tailored to the job",
                "skills": ["Skill 1", "Skill 2"],
                "experience": [
                  {
                    "role": "...",
                    "company": "...",
                    "duration": "...",
                    "responsibilities": ["..."]
                  }
                ],
                "projects": [
                  { "name": "...", "description": "..." }
                ],
                "certifications": ["..."],
                "education": [
                  { "degree": "...", "institution": "...", "year": "..." }
                ]
              },
              "coverLetter": "Tailored cover letter based on the job description",
              "summaryStatement": "One-line value proposition summary for the resume"
            }

            Do not invent fake data. Keep everything truthful and within one page.
            `;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `Job Description:\n${jobDescription}`,
      },
      {
        role: "user",
        content: `Candidate Profile:\n${JSON.stringify(profileData, null, 2)}`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.3,
    });

    const content = response.choices[0].message?.content;
    if (!content) {
      return NextResponse.json({ error: "No content generated." }, { status: 500 });
    }

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Tailor error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
