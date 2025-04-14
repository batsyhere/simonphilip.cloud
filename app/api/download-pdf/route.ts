import { NextResponse } from "next/server";
import { generatePdf } from "../../resume-generator/lib/generatePdf";

export async function POST(req: Request) {
  const body = await req.json();
  const { content, filename } = body;

  if (!content || !filename) {
    return NextResponse.json({ error: "Missing content or filename" }, { status: 400 });
  }

  try {
    const pdfBuffer = await generatePdf(content, filename);
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
