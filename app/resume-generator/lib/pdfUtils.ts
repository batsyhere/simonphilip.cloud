import html2pdf from "html2pdf.js";
import ReactDOMServer from "react-dom/server";
import { ResumePreview } from "../../components/resume-preview";

interface ResumeData {
  name: string;
  title: string;
  phone: string;
  email: string;
  summary: string;
  certifications: string[];
  skills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }[];
  projects: {
    name: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export function handleDownloadPdf(data: ResumeData | string | any, fileName = "resume.pdf") {
  

  if (typeof data === "string") {
    const element = document.createElement("div");
    // It's a cover letter
    element.innerHTML = `<pre style="font-family: sans-serif; white-space: pre-wrap;">${data}</pre>`;
    const opt = {
        margin: 0.5,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };
    
      html2pdf().set(opt).from(element).save();
  } else {
    // It's a resume
    const opt = {
        margin: 0.5,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
    
      try {
        html2pdf().set(opt).from(data).save();
        console.log("PDF downloaded successfully");
      } catch (error) {
        console.error("Failed to generate PDF:", error);
      }
  }
}
