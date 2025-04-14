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
  }[]
  content?: string // For cover letter
}

export const handleDownloadPdf = (data: ResumeData, filename: string) => {
  const doc = new jsPDF()

  // Check if this is a cover letter (has content property)
  if (data.content) {
    generateCoverLetterPdf(doc, data.content)
  } else {
    // It's a resume
    generateResumePdf(doc, data)
  }

  doc.save(filename)
}

const generateResumePdf = (doc: jsPDF, data: ResumeData) => {
  // Set font
  doc.setFont("helvetica", "bold")

  // Name and title
  doc.setFontSize(18)
  doc.text(data.name || "", 14, 20)

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(data.title || "", 14, 26)

  // Contact info
  if (data.contact) {
    doc.setFontSize(10)
    doc.text(`${data.contact.email} | ${data.contact.phone}`, 14, 32)
  }

  // Summary
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("SUMMARY", 14, 40)
  doc.line(14, 41, 196, 41)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)

  const summaryLines = doc.splitTextToSize(data.summary || "", 180)
  doc.text(summaryLines, 14, 46)

  let yPosition = 46 + summaryLines.length * 5

  // Skills
  if (data.skills && data.skills.length > 0) {
    yPosition += 8
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("SKILLS", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    const skillsText = data.skills.join(", ")
    const skillsLines = doc.splitTextToSize(skillsText, 180)
    doc.text(skillsLines, 14, yPosition + 6)

    yPosition += 6 + skillsLines.length * 5
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    yPosition += 8
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("EXPERIENCE", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)

    yPosition += 6

    data.experience.forEach((exp) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.text(exp.role, 14, yPosition)

      // Company and duration on the same line
      doc.setFont("helvetica", "normal")
      doc.text(exp.company, 14, yPosition + 5)

      const durationWidth = doc.getTextWidth(exp.duration)
      doc.text(exp.duration, 196 - durationWidth, yPosition + 5)

      yPosition += 10

      // Highlights
      doc.setFontSize(10)
      exp.highlights.forEach((highlight) => {
        const bulletPoint = "• "
        const highlightLines = doc.splitTextToSize(highlight, 175)

        doc.text(bulletPoint, 14, yPosition)
        doc.text(highlightLines, 20, yPosition)

        yPosition += highlightLines.length * 5 + 2

        // Check if we need a new page
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
      })

      yPosition += 5
    })
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    yPosition += 8

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("PROJECTS", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)

    yPosition += 6

    data.projects.forEach((project) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.text(project.name, 14, yPosition)

      yPosition += 5

      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      const descLines = doc.splitTextToSize(project.description, 180)
      doc.text(descLines, 14, yPosition)

      yPosition += descLines.length * 5 + 5

      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
    })
  }

  // Education
  if (data.education && data.education.length > 0) {
    yPosition += 8

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("EDUCATION", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)

    yPosition += 6

    data.education.forEach((edu) => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      doc.text(edu.degree, 14, yPosition)

      const yearWidth = doc.getTextWidth(edu.year)
      doc.setFont("helvetica", "normal")
      doc.text(edu.year, 196 - yearWidth, yPosition)

      yPosition += 5

      doc.setFontSize(10)
      doc.text(edu.institution, 14, yPosition)

      yPosition += 8
    })
  }

  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    yPosition += 8

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("CERTIFICATIONS", 14, yPosition)
    doc.line(14, yPosition + 1, 196, yPosition + 1)

    yPosition += 6

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)

    data.certifications.forEach((cert) => {
      const bulletPoint = "• "
      const certLines = doc.splitTextToSize(cert, 175)

      doc.text(bulletPoint, 14, yPosition)
      doc.text(certLines, 20, yPosition)

      yPosition += certLines.length * 5 + 2
    })
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

  // Salutation
  doc.text("Dear Hiring Manager,", 14, 80)

  // Content with proper spacing and formatting
  const contentLines = doc.splitTextToSize(content, 180)
  doc.text(contentLines, 14, 90)

  // Closing
  const lastLineY = 90 + contentLines.length * 5
  doc.text("Sincerely,", 14, lastLineY + 15)
  doc.text("Simon Philip", 14, lastLineY + 25)
}
