"use client"

import { useState } from "react"
import { handleDownloadPdf } from "./lib/pdfUtils"
import ResumePreview from "../components/resume-preview"
import ResumeEditor from "../components/resume-editor"
import { Loader2, FileDown, Edit, RefreshCw } from "lucide-react"

// Transform API response to match our component structure
const transformResumeData = (apiResponse: any) => {
  if (!apiResponse) return null

  // Extract the resume data from the API response
  const resumeData = apiResponse.resume || apiResponse

  return {
    name: resumeData.name || "",
    title: resumeData.title || "",
    contact: {
      email: resumeData.email || "",
      phone: resumeData.phone || "",
    },
    summary: resumeData.summary || "",
    skills: resumeData.skills || [],
    experience: (resumeData.experience || []).map((exp: any) => ({
      role: exp.role || "",
      company: exp.company || "",
      duration: exp.duration || "",
      highlights: exp.responsibilities || exp.highlights || [],
    })),
    education: (resumeData.education || []).map((edu: any) => ({
      degree: edu.degree || "",
      institution: edu.institution || "",
      year: edu.year || "",
    })),
    certifications: resumeData.certifications || [],
    projects: resumeData.projects || [],
  }
}

export default function ResumeGeneratorPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [generatedResume, setGeneratedResume] = useState<any>(null)
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description.")
      return
    }
  
    setLoading(true)
    setGeneratedResume(null)
    setGeneratedCoverLetter(null)
    setApiResponse(null)
    setError(null)
  
    try {
      const response = await fetch(
        "https://vuzzkjy7gnsfch4udccmxel5pi0aepbv.lambda-url.ap-south-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobDescription }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
  
      const data = await response.json()
      setApiResponse(data)
  
      try {
        const transformedResume = transformResumeData(data)
        setGeneratedResume(transformedResume)
      } catch (e) {
        console.error("🔥 Transform error:", e, "Data:", data)
        setError("Something went wrong processing the resume.")
      }
  
      setGeneratedCoverLetter(data.coverLetter || null)
    } catch (error) {
      console.error("Error generating a response from the API:", error)
      setError("Failed to generate resume. Please try again later.")
    } finally {
      setLoading(false)
    }
  }
  

  const handleEdit = () => setIsEditing(true)

  const handleCancelEdit = () => setIsEditing(false)

  const handleSaveEdit = (updatedData: any) => {
    setGeneratedResume(updatedData)
    setIsEditing(false)
  }

  const handleReset = () => {
    setGeneratedResume(null)
    setGeneratedCoverLetter(null)
    setApiResponse(null)
    setJobDescription("")
    setIsEditing(false)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-white p-4 md:p-8 text-zinc-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">AI Resume Tailoring</h1>
          {generatedResume && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-200 text-zinc-800 rounded-md hover:bg-zinc-300 transition-colors"
            >
              <RefreshCw size={16} />
              Start Over
            </button>
          )}
        </div>

        {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}

        {!generatedResume && !loading && (
          <div className="bg-zinc-50 p-6 rounded-lg shadow-sm border border-zinc-200">
            <div>
              <label className="block font-medium mb-2 text-zinc-800">Paste Job Description</label>
              <textarea
                placeholder="Paste full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-64 border border-zinc-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!jobDescription.trim() || loading}
              className="mt-4 rounded-md bg-violet-600 text-white px-6 py-2 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Tailored Resume"
              )}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={48} className="animate-spin text-violet-600 mb-4" />
            <p className="text-lg text-zinc-600">Analyzing job description and tailoring your resume...</p>
            <p className="text-sm text-zinc-500 mt-2">This may take up to a minute</p>
          </div>
        )}

        {/* Generated Content */}
        {generatedResume && !loading && (
          <div className="mt-8 rounded-lg shadow-md overflow-hidden">
            <div className="bg-violet-600 text-white p-4">
              <h2 className="text-xl font-bold">Your Tailored Application</h2>
              <p className="text-violet-100">
                Your resume and cover letter have been tailored to match the job description
              </p>
            </div>

            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="col-span-1">
                  <h3 className="font-bold text-xl mb-4 pb-2 border-b border-zinc-200">Resume</h3>

                  {!isEditing ? (
                    <>
                      <div className="bg-zinc-50 border border-zinc-200 rounded-md p-4 mb-4 max-h-[600px] overflow-y-auto">
                        <ResumePreview resumeData={generatedResume} />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleEdit}
                          className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors flex items-center gap-2"
                        >
                          <Edit size={16} />
                          Edit Resume
                        </button>
                        <button
                          onClick={() => handleDownloadPdf(generatedResume, "tailored_resume.pdf")}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <FileDown size={16} />
                          Download Resume (PDF)
                        </button>
                      </div>
                    </>
                  ) : (
                    <ResumeEditor resumeData={generatedResume} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
                  )}
                </div>

                <div className="col-span-1">
                  <h3 className="font-bold text-xl mb-4 pb-2 border-b border-zinc-200">Cover Letter</h3>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-md p-4 mb-4 max-h-[600px] overflow-y-auto whitespace-pre-line">
                    {generatedCoverLetter || "No cover letter generated."}
                  </div>
                  {generatedCoverLetter && (
                    <button
                      onClick={() => handleDownloadPdf({ content: generatedCoverLetter || "" }, "cover_letter.pdf")}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <FileDown size={16} />
                      Download Cover Letter (PDF)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
