// /app/api/tailor/ai/route.ts

import { profile } from "../../../resume-generator/data/profile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { jobDescription } = body;

  if (!jobDescription) {
    return NextResponse.json({ error: "Missing job description" }, { status: 400 });
  }

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPEN_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a resume expert. Tailor the user's resume based on the job description."
        },
        {
          role: "user",
          content: `Job Description:\n${jobDescription}\n\nUser Profile:\n${JSON.stringify(profile, null, 2)}\n\nRespond in JSON with keys: name, title, skills, experience, projects. Only include relevant items.`
        }
      ],
      temperature: 0.7
    })
  });

  const json = await openaiRes.json();
  const tailored = json.choices?.[0]?.message?.content;

  try {
    const parsed = JSON.parse(tailored);
    return NextResponse.json({ resume: parsed });
  } catch (err) {
    return NextResponse.json({ error: "AI response parse failed", raw: tailored }, { status: 500 });
  }
}
