import { jsPDF } from "jspdf"

interface ResumeData {
  name?: string
  title?: string
  contact?: {
    email: string
    phone: string
  }
  summary?: string
  skills?: string[]
  experience?: {
    role: string
    company: string
    duration: string
    highlights: string[]
  }[]
  education?: {
    degree: string
    institution: string
    year: string
  }[]
  certifications?: string[]
  projects?: {
    name: string
    description: string
    url?: string
  }[]
  content?: string // For cover letter
}

export const handleDownloadPdf = (data: ResumeData, filename: string) => {
  const doc = new jsPDF()

  // Check if this is a cover letter (has content property)
  if (data.content) {
    generateCoverLetterPdf(doc, data.content)
  } else {
    console.log("resumeData", data)
    generateResumePdf(doc, data)
  }

  doc.save(filename)
}

const generateResumePdf = (doc: jsPDF, data: ResumeData) => {
  // Set initial positions with tighter spacing
  let yPosition = 10 // Reduced from 20
  const lineHeight = 4.5 // Reduced from 5
  const sectionSpacing = 5 // Reduced from 8

  // Name and title
  doc.setFont("helvetica", "bold")
  doc.setFontSize(16) // Slightly smaller
  doc.text(data.name || "", 14, yPosition)
  yPosition += 6 // Reduced from 6

  doc.setFontSize(11) // Reduced from 12
  doc.setFont("helvetica", "normal")
  doc.text(data.title || "", 14, yPosition)
  yPosition += 6 // Reduced from 6

  // Contact info
  if (data.contact) {
    doc.setFontSize(9) // Reduced from 10
    doc.text(`${data.contact.email} | ${data.contact.phone}`, 14, yPosition)
    yPosition += 6 // Reduced from 6
  }

  // Summary
  yPosition += sectionSpacing
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text("SUMMARY", 14, yPosition)
  doc.line(14, yPosition + 1, 196, yPosition + 1)
  yPosition += 7 // Reduced spacing after heading

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9.5) // Slightly smaller
  const summaryLines = doc.splitTextToSize(data.summary || "", 180)
  doc.text(summaryLines, 14, yPosition)
  yPosition += summaryLines.length * lineHeight + sectionSpacing

  // Certifications (moved above education)
  if (data.certifications && data.certifications.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("CERTIFICATIONS", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)
    yPosition += 7

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9.5)
    data.certifications.forEach((cert) => {
      const bulletPoint = "• "
      const certLines = doc.splitTextToSize(cert, 175)
      doc.text(bulletPoint, 14, yPosition)
      doc.text(certLines, 20, yPosition)
      yPosition += certLines.length * lineHeight + 2
    })
    yPosition += sectionSpacing
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("SKILLS", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)
    yPosition += 7

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9.5)
    const skillsText = data.skills.join(" • ") // More compact separator
    const skillsLines = doc.splitTextToSize(skillsText, 180)
    doc.text(skillsLines, 14, yPosition)
    yPosition += skillsLines.length * lineHeight + sectionSpacing
  }

  // Experience - Modified to be more compact
  if (data.experience && data.experience.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("EXPERIENCE", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)
    yPosition += 7

    data.experience.forEach((exp) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(10)
      doc.text(exp.role, 14, yPosition)

      // Add spacing between role and company
      yPosition += 5

      // Company and duration on same line
      doc.setFont("helvetica", "normal")
      const companyDuration = `${exp.company} | ${exp.duration}`
      doc.text(companyDuration, 14, yPosition)
      yPosition += 8

      // Highlights with larger font
      doc.setFontSize(10) // Increased from 9
      exp.highlights.forEach((highlight) => {
        const bulletPoint = "• "
        const highlightLines = doc.splitTextToSize(highlight, 175)
        doc.text(bulletPoint, 14, yPosition)
        doc.text(highlightLines, 20, yPosition)
        yPosition += highlightLines.length * lineHeight + 2 // Slightly increased spacing
      })
      yPosition += 4
    })

  }

  // Projects section 
  if (data.projects && data.projects.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("PROJECTS", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)
    yPosition += 7

    data.projects.forEach((project) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(10)
      doc.text(project.name, 14, yPosition)
      yPosition += 5

      // Add URL if available
      if (project.url) {
        doc.setFont("helvetica", "italic")
        doc.setFontSize(9)
        doc.text(`URL: ${project.url}`, 14, yPosition)
        yPosition += 5
      }

      doc.setFont("helvetica", "normal")
      doc.setFontSize(9.5)
      const descriptionLines = doc.splitTextToSize(project.description, 175)
      doc.text(descriptionLines, 14, yPosition)
      yPosition += descriptionLines.length * lineHeight + 4
    })
  }

  // Education (moved below certifications)
  if (data.education && data.education.length > 0) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.text("EDUCATION", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)
    yPosition += 7

    data.education.forEach((edu) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(10)
      doc.text(edu.degree, 14, yPosition)

      doc.setFont("helvetica", "normal")
      doc.text(`${edu.institution} | ${edu.year}`, 14, yPosition + 4)
      yPosition += 8 // Compact spacing
    })
  }

  // Final check for single page
  if (yPosition > 280) {
    // A4 page height is ~297mm
    // Optional: Automatically adjust font sizes
    doc.setFontSize(doc.getFontSize() * 0.95)
  }
}

const generateCoverLetterPdf = (doc: jsPDF, content: string) => {
  // Set font
  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)

  const today = new Date()
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

  // Add sender info (using placeholder - this could be made dynamic)
  doc.text("Simon Philip", 14, 20)
  doc.text("Cloud Operations Engineer", 14, 26)
  doc.text("simonphilip137@gmail.com", 14, 32)
  doc.text("+91-7528893077", 14, 38)

  // Date
  doc.text(formattedDate, 14, 50)

  // Recipient (placeholder)
  doc.text("Hiring Manager", 14, 62)
  doc.text("Company Name", 14, 68)

  // Content with proper spacing and formatting
  const contentLines = doc.splitTextToSize(content, 180)
  doc.text(contentLines, 14, 90)

  // Closing
  const lastLineY = 90 + contentLines.length * 5
}
