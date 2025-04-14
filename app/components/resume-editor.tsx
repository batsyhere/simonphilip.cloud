"use client"

import type React from "react"
import { useState } from "react"
import { Save, X, Plus, Trash2 } from "lucide-react"

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

interface ResumeEditorProps {
  resumeData: ResumeData
  onSave: (updatedData: ResumeData) => void
  onCancel: () => void
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resumeData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState<ResumeData>({ ...resumeData })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")

      // Add type safety for nested objects
      type NestedKeys = keyof Pick<ResumeData, "contact" | "experience" | "education" | "projects">

      // Type guard to ensure valid nested keys
      const isNestedKey = (key: string): key is NestedKeys =>
        ["contact", "experience", "education", "projects"].includes(key)

      if (isNestedKey(parent)) {
        setEditedData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }))
      }
    } else {
      // Handle top-level properties
      setEditedData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...editedData.skills]
    updatedSkills[index] = value
    setEditedData({
      ...editedData,
      skills: updatedSkills,
    })
  }

  const handleAddSkill = () => {
    setEditedData({
      ...editedData,
      skills: [...editedData.skills, ""],
    })
  }

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...editedData.skills]
    updatedSkills.splice(index, 1)
    setEditedData({
      ...editedData,
      skills: updatedSkills,
    })
  }

  const handleExperienceChange = (expIndex: number, field: string, value: string) => {
    const updatedExperience = [...editedData.experience]
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      [field]: value,
    }
    setEditedData({
      ...editedData,
      experience: updatedExperience,
    })
  }

  const handleHighlightChange = (expIndex: number, highlightIndex: number, value: string) => {
    const updatedExperience = [...editedData.experience]
    const updatedHighlights = [...updatedExperience[expIndex].highlights]
    updatedHighlights[highlightIndex] = value
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      highlights: updatedHighlights,
    }
    setEditedData({
      ...editedData,
      experience: updatedExperience,
    })
  }

  const handleAddHighlight = (expIndex: number) => {
    const updatedExperience = [...editedData.experience]
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      highlights: [...updatedExperience[expIndex].highlights, ""],
    }
    setEditedData({
      ...editedData,
      experience: updatedExperience,
    })
  }

  const handleRemoveHighlight = (expIndex: number, highlightIndex: number) => {
    const updatedExperience = [...editedData.experience]
    const updatedHighlights = [...updatedExperience[expIndex].highlights]
    updatedHighlights.splice(highlightIndex, 1)
    updatedExperience[expIndex] = {
      ...updatedExperience[expIndex],
      highlights: updatedHighlights,
    }
    setEditedData({
      ...editedData,
      experience: updatedExperience,
    })
  }

  const handleSaveClick = () => {
    onSave(editedData)
  }

  return (
    <div className="bg-white p-4 rounded-md border border-zinc-200 max-h-[600px] overflow-y-auto">
      <div className="space-y-4">
        {/* Personal Info */}
        <div>
          <h3 className="font-bold text-lg mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                className="w-full p-2 border border-zinc-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={editedData.title}
                onChange={handleChange}
                className="w-full p-2 border border-zinc-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="contact.email"
                value={editedData.contact.email}
                onChange={handleChange}
                className="w-full p-2 border border-zinc-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="contact.phone"
                value={editedData.contact.phone}
                onChange={handleChange}
                className="w-full p-2 border border-zinc-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            value={editedData.summary}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-zinc-300 rounded-md"
          />
        </div>

        {/* Skills */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Skills</label>
            <button
              type="button"
              onClick={handleAddSkill}
              className="text-xs flex items-center gap-1 text-violet-600 hover:text-violet-800"
            >
              <Plus size={14} /> Add Skill
            </button>
          </div>
          <div className="space-y-2">
            {editedData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="flex-1 p-2 border border-zinc-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="font-bold text-lg mb-2">Experience</h3>
          {editedData.experience.map((exp, expIndex) => (
            <div key={expIndex} className="mb-4 p-3 border border-zinc-200 rounded-md bg-zinc-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(expIndex, "role", e.target.value)}
                    className="w-full p-2 border border-zinc-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(expIndex, "company", e.target.value)}
                    className="w-full p-2 border border-zinc-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(expIndex, "duration", e.target.value)}
                    className="w-full p-2 border border-zinc-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Highlights</label>
                  <button
                    type="button"
                    onClick={() => handleAddHighlight(expIndex)}
                    className="text-xs flex items-center gap-1 text-violet-600 hover:text-violet-800"
                  >
                    <Plus size={14} /> Add Highlight
                  </button>
                </div>
                <div className="space-y-2">
                  {exp.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(expIndex, highlightIndex, e.target.value)}
                        className="flex-1 p-2 border border-zinc-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(expIndex, highlightIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <h3 className="font-bold text-lg mb-2">Education</h3>
          {editedData.education.map((edu, eduIndex) => (
            <div key={eduIndex} className="mb-4 p-3 border border-zinc-200 rounded-md bg-zinc-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const updatedEducation = [...editedData.education]
                      updatedEducation[eduIndex] = {
                        ...updatedEducation[eduIndex],
                        degree: e.target.value,
                      }
                      setEditedData({
                        ...editedData,
                        education: updatedEducation,
                      })
                    }}
                    className="w-full p-2 border border-zinc-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      const updatedEducation = [...editedData.education]
                      updatedEducation[eduIndex] = {
                        ...updatedEducation[eduIndex],
                        institution: e.target.value,
                      }
                      setEditedData({
                        ...editedData,
                        education: updatedEducation,
                      })
                    }}
                    className="w-full p-2 border border-zinc-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => {
                      const updatedEducation = [...editedData.education]
                      updatedEducation[eduIndex] = {
                        ...updatedEducation[eduIndex],
                        year: e.target.value,
                      }
                      setEditedData({
                        ...editedData,
                        education: updatedEducation,
                      })
                    }}
                    className="w-full p-2 border border-zinc-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Certifications</h3>
            <button
              type="button"
              onClick={() => {
                setEditedData({
                  ...editedData,
                  certifications: [...editedData.certifications, ""],
                })
              }}
              className="text-xs flex items-center gap-1 text-violet-600 hover:text-violet-800"
            >
              <Plus size={14} /> Add Certification
            </button>
          </div>
          <div className="space-y-2">
            {editedData.certifications.map((cert, certIndex) => (
              <div key={certIndex} className="flex items-center gap-2">
                <input
                  type="text"
                  value={cert}
                  onChange={(e) => {
                    const updatedCertifications = [...editedData.certifications]
                    updatedCertifications[certIndex] = e.target.value
                    setEditedData({
                      ...editedData,
                      certifications: updatedCertifications,
                    })
                  }}
                  className="flex-1 p-2 border border-zinc-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedCertifications = [...editedData.certifications]
                    updatedCertifications.splice(certIndex, 1)
                    setEditedData({
                      ...editedData,
                      certifications: updatedCertifications,
                    })
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        {editedData.projects && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">Projects</h3>
              <button
                type="button"
                onClick={() => {
                  setEditedData({
                    ...editedData,
                    projects: [...(editedData.projects || []), { name: "", description: "" }],
                  })
                }}
                className="text-xs flex items-center gap-1 text-violet-600 hover:text-violet-800"
              >
                <Plus size={14} /> Add Project
              </button>
            </div>
            <div className="space-y-4">
              {editedData.projects.map((project, projectIndex) => (
                <div key={projectIndex} className="p-3 border border-zinc-200 rounded-md bg-zinc-50">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Project Name</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => {
                          const updatedProjects = [...editedData.projects!]
                          updatedProjects[projectIndex] = {
                            ...updatedProjects[projectIndex],
                            name: e.target.value,
                          }
                          setEditedData({
                            ...editedData,
                            projects: updatedProjects,
                          })
                        }}
                        className="w-full p-2 border border-zinc-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const updatedProjects = [...editedData.projects!]
                          updatedProjects[projectIndex] = {
                            ...updatedProjects[projectIndex],
                            description: e.target.value,
                          }
                          setEditedData({
                            ...editedData,
                            projects: updatedProjects,
                          })
                        }}
                        rows={2}
                        className="w-full p-2 border border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const updatedProjects = [...editedData.projects!]
                          updatedProjects.splice(projectIndex, 1)
                          setEditedData({
                            ...editedData,
                            projects: updatedProjects,
                          })
                        }}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                      >
                        <Trash2 size={14} /> Remove Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-zinc-300 rounded-md hover:bg-zinc-100 flex items-center gap-2"
          >
            <X size={16} />
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveClick}
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeEditor
