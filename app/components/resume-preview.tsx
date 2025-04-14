import type React from "react"

interface ResumeData {
  name: string
  title: string
  contact: {
    email: string
    phone: string
  }
  summary: string
  skills: string[]
  experience: {
    role: string
    company: string
    duration: string
    highlights: string[]
  }[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  certifications: string[]
  projects?: {
    name: string
    description: string
  }[]
}

interface ResumePreviewProps {
  resumeData: ResumeData
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  // Safety check to prevent errors if data is missing
  if (!resumeData || !resumeData.contact) {
    return <div className="p-4 text-red-500">Resume data is incomplete or invalid.</div>
  }

  return (
    <div className="font-sans text-zinc-900">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{resumeData.name}</h1>
        <h2 className="text-lg text-zinc-600">{resumeData.title}</h2>
        <div className="mt-1 text-sm text-zinc-500">
          <p>
            {resumeData.contact.email} | {resumeData.contact.phone}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h3 className="text-md font-bold border-b border-zinc-300 pb-1 mb-2">SUMMARY</h3>
        <p className="text-sm">{resumeData.summary}</p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h3 className="text-md font-bold border-b border-zinc-300 pb-1 mb-2">SKILLS</h3>
        <div className="flex flex-wrap gap-1">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="text-sm bg-zinc-100 px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h3 className="text-md font-bold border-b border-zinc-300 pb-1 mb-2">EXPERIENCE</h3>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold">{exp.role}</h4>
                <h5 className="text-sm">{exp.company}</h5>
              </div>
              <span className="text-xs text-zinc-500">{exp.duration}</span>
            </div>
            <ul className="mt-1 pl-5 text-sm list-disc">
              {exp.highlights.map((highlight, idx) => (
                <li key={idx} className="mb-1">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects (if available) */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-bold border-b border-zinc-300 pb-1 mb-2">PROJECTS</h3>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-2">
              <h4 className="text-sm font-bold">{project.name}</h4>
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      <div className="mb-4">
        <h3 className="text-md font-bold border-b border-zinc-300 pb-1 mb-2">EDUCATION</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-bold">{edu.degree}</h4>
              <span className="text-xs text-zinc-500">{edu.year}</span>
            </div>
            <p className="text-sm">{edu.institution}</p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-md font-bold border-b border-zinc-300 pb-1 mb-2">CERTIFICATIONS</h3>
        <ul className="pl-5 text-sm list-disc">
          {resumeData.certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ResumePreview
