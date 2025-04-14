"use client";

import { useState } from "react";
import { handleDownloadPdf } from "./lib/pdfUtils";
import { ResumePreview } from "../components/resume-preview";
import { ResumeEditor } from "../components/resume-editor";

export default function ResumeGeneratorPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a job description.");
      return;
    }

    setLoading(true);
    setGeneratedResume(null);
    setGeneratedCoverLetter(null);

    try {
      const response = await fetch("/api/tailor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          profileData: {
            name: "Simon Philip",
            title: "Cloud Operations Engineer",
            phone: "+91-7528893077",
            email: "simonphilip137@gmail.com",
            summary:
              "AWS Certified Cloud Operations Engineer with four years of experience. Designed cost-effective, scalable cloud solutions, achieving 99.99% uptime and reducing costs by 20%. Automated deployments, cutting release time by 50%. Skilled in cross-functional collaboration and scripting for operational efficiency.",
            certifications: [
              "AWS Certified Solutions Architect – Associate",
              "Full Stack Development (upGrad)",
            ],
            skills: [
              "AWS",
              "Terraform",
              "CI/CD",
              "React",
              "TypeScript",
              "S3",
              "CloudFront",
              "GitHub Actions",
              "Docker",
              "Linux",
            ],
            experience: [
              {
                role: "Customer Support Engineer",
                company: "Safe Security",
                duration: "2021 - 2022",
                responsibilities: [
                  "Delivered full-stack feature enhancements and customer support for SAFE, a serverless React application hosted on AWS.",
                  "Integrated new features and design changes in the React-based flagship product.",
                  "Resolved customer issues efficiently, ensuring smooth user experience.",
                  "Maintained daily follow-ups for bug tracking and resolution.",
                  "Owned feature delivery for a serverless web application on AWS infrastructure.",
                ],
              },
              {
                role: "Cloud Operations Engineer",
                company: "Safe Security",
                duration: "2022 - 2024",
                responsibilities: [
                  "Led cloud operations, automation, and security initiatives in AWS environments to ensure high availability and efficient deployments.",
                  "Implemented Disaster Recovery Automation using Jenkins to restore customer data within the past 35 days.",
                  "Automated 80% of manual deployment tasks, enabling over 100 stack upgrades per sprint.",
                  "Reduced operational time by 95% through Slack-integrated scripts.",
                  "Migrated code repositories from Bitbucket to GitHub for improved collaboration.",
                  "Led security patching and vulnerability analysis using CrowdStrike and Wiz.",
                  "Supported SecOps in applying AWS security best practices across the organization.",
                  "Maintained 99.99% uptime while driving 20% cost savings through optimization.",
                  "Collaborated with product teams and managed code cherry-picks for releases",
                ],
              },
            ],
            projects: [
              {
                name: "simonphilip.cloud",
                description:
                  "Futuristic cloud portfolio site using React, Tailwind, AWS S3, CloudFront, Route53, and Terraform.",
              },
              {
                name: "AI Resume Generator",
                description:
                  "AI Resume Generator/enhancer according to a given JD using React, Tailwind, openAI, hosted on AWS S3",
              },
            ],
            education: [
              {
                degree: "Bachelor of Technology in Computer Science",
                institution: "Lovely Professional University",
                year: "2016 - 2020",
              },
            ],
          },
        })
      });

      const data = await response.json();
      setGeneratedResume(data.resume);
      setGeneratedCoverLetter(data.coverLetter);
      console.log("cover letter type", generatedCoverLetter)
    } catch (error) {
      console.error("Error generating tailored content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  return (
    <main className="min-h-screen bg-white p-8 text-zinc-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">AI Resume Tailoring</h1>

        {!generatedResume && !loading && (
          <>
            <div>
              <label className="block font-medium mb-1">Paste Job Description</label>
              <textarea
                placeholder="Paste full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-48 border border-zinc-300 rounded-md px-4 py-2"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!jobDescription || loading}
              className="rounded-md bg-zinc-900 text-white px-6 py-2 hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Tailored Resume"}
            </button>
          </>
        )}

        {/* Generated Content */}
        {generatedResume && (
          <div className="mt-8 p-4 bg-zinc-100 rounded-md shadow space-y-4">
            <div className="grid grid-cols-2 gap-8">
              <div className="col-span-1">
                {!isEditing ? (
                  <>
                    <ResumePreview resumeData={generatedResume} />
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={handleEdit}
                        className="px-6 py-2 bg-yellow-500 text-white rounded-md"
                      >
                        Edit Resume
                      </button>
                      <button
                        onClick={() => handleDownloadPdf(generatedResume, "tailored_resume.pdf")}
                        className="px-6 py-2 bg-green-500 text-white rounded-md"
                      >
                        Download Resume (PDF)
                      </button>
                    </div>
                  </>
                ) : (
                  <ResumeEditor
                    resumeData={generatedResume}
                    onCancel={handleCancelEdit}
                    onSave={(updatedData) => setGeneratedResume(updatedData)}
                  />
                )}
              </div>
              <div className="col-span-1">
                <h2 className="font-bold text-xl">Cover Letter</h2>
                <p>{generatedCoverLetter}</p>
                <button
                  onClick={() => handleDownloadPdf(generatedCoverLetter, "cover_letter.pdf")}
                  className="px-6 py-2 bg-green-500 text-white rounded-md mt-4"
                >
                  Download Cover Letter (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
