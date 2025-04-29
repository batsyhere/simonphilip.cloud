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
  const sectionSpacing = 2 // Reduced from 8

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
    const contactText = `${data.contact.email} | ${data.contact.phone} | `
    doc.text(contactText, 14, yPosition)

    // Calculate the width of the contactText to know where the link starts
    const textWidth = doc.getTextWidth(contactText)

    // Set LinkedIn link
    const linkedinUrl = "https://www.linkedin.com/in/simon-philip/"
    doc.setTextColor(0, 0, 255) // Make it look like a link
    doc.textWithLink("LinkedIn", 14 + textWidth, yPosition, { url: linkedinUrl })

    // Reset text color
    doc.setTextColor(0, 0, 0)
    yPosition += 6 // Reduced from 6
  }

  // Summary
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.text("SUMMARY", 14, yPosition)
  doc.line(14, yPosition + 1, 196, yPosition + 1)
  yPosition += 7 // Reduced spacing after heading

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9.5) // Slightly smaller
  const summaryLines = doc.splitTextToSize(data.summary || "", 180)
  doc.text(summaryLines, 14, yPosition)
  yPosition += summaryLines.length * lineHeight + 2

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
        yPosition += highlightLines.length * lineHeight  // Slightly increased spacing
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
      doc.setTextColor(0, 0, 255)
      doc.textWithLink(project.name, 14, yPosition, { url: project.url })
      doc.setTextColor(0, 0, 0)
      yPosition += 5

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

  var newContent = `Hiring Manager
JPMorgan Chase

Dear Hiring Manager,

I'm writing to express my strong interest in the Site Reliability Engineer position at JPMorgan Chase. With over 4 years of experience in cloud operations and a proven track record in driving reliability culture, I bring both the technical depth and hands-on expertise required to thrive in your team. As an AWS Certified Solutions Architect with a background in software engineering and full-stack development, I am confident in my ability to meet and exceed the expectations outlined in the role.

In my current role at Safe Security, I have led initiatives to improve application stability and service levels using data-driven analytics. I championed site reliability best practices across teams, automated 80% of manual deployment tasks using CI/CD pipelines, and helped define SLIs, SLOs, and error budgets in collaboration with stakeholders. I also acted as the primary point of contact during major incidents, quickly identifying and resolving issues to avoid downtime or customer impact—mirroring the exact responsibilities in your job posting.

Technically, I bring strong proficiency in AWS, Python, Terraform, Docker, Kubernetes, and observability tools like Datadog, Observe, etc. My experience includes building serverless applications, automating disaster recovery pipelines, and integrating security best practices with tools like Wiz and CrowdStrike. I'm particularly proud of maintaining 99.99% uptime while also achieving a 20% cost reduction—showcasing my commitment to both reliability and optimization.

Beyond my technical capabilities, I’m passionate about knowledge sharing, mentoring, and continuous learning. I've built projects like simonphilip.cloud, a portfolio platform hosted entirely on AWS and deployed via Terraform and GitHub Actions, and an AI-based Resume Generator to streamline job applications—demonstrating my curiosity and initiative beyond the workplace.

I am enthusiastic about the opportunity to bring this mindset and expertise to JPMorgan Chase and contribute to the innovation and operational excellence the company is known for. I would welcome the chance to further discuss how I can add value to your team.

Thank you for considering my application.

Best regards,
Simon Philip`
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
  doc.text(formattedDate, 14, 10)

  

  // Content with proper spacing and formatting
  const contentLines = doc.splitTextToSize(newContent, 180)
  doc.text(contentLines, 14, 50)

  // Closing
  const lastLineY = 90 + contentLines.length * 5
}
