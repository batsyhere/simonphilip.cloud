type ParsedJobDescription = {
    title?: string
    company?: string
    location?: string
    experienceLevel?: string
    responsibilities: string[]
    hardSkills: string[]
    softSkills: string[]
    rawText: string
  }
  
  const softSkillsList = [
    "communication", "teamwork", "leadership", "problem-solving", "adaptability",
    "creativity", "time management", "critical thinking", "collaboration", "empathy"
  ]
  
  const experienceLevels = ["intern", "junior", "entry level", "mid level", "senior", "lead", "principal"]
  
  const knownTechStack = [
    "javascript", "typescript", "react", "next.js", "node.js", "aws", "azure", "docker",
    "kubernetes", "graphql", "python", "java", "html", "css", "tailwind", "sql", "mongodb",
    "postgresql", "redis", "git", "ci/cd", "terraform", "linux"
  ]
  
  export function parseJobDescription(raw: string): ParsedJobDescription {
    const text = raw.toLowerCase()
  
    // Experience level
    const experienceLevel = experienceLevels.find(level => text.includes(level)) || undefined
  
    // Extract soft skills
    const softSkills = softSkillsList.filter(skill => text.includes(skill))
  
    // Extract tech stack
    const hardSkills = knownTechStack.filter(skill => text.includes(skill))
  
    // Attempt to extract responsibilities via keyword
    const responsibilities = raw
      .split(/[\n•\-]/)
      .map(s => s.trim())
      .filter(s =>
        s.length > 20 &&
        (s.toLowerCase().includes("responsible") || s.toLowerCase().includes("develop") || s.toLowerCase().includes("manage") || s.toLowerCase().includes("implement"))
      )
  
    // Extract job title (naive)
    const titleMatch = raw.match(/(?:(?:hiring|position|role):?\s*)?([A-Z][a-zA-Z\s]{3,50})(?:\n| at|@| -)/i)
    const title = titleMatch?.[1]?.trim()
  
    // Extract company name
    const companyMatch = raw.match(/(?:(?:at|@)\s)([A-Z][\w\s&]+)/)
    const company = companyMatch?.[1]?.trim()
  
    // Extract location (naive)
    const locationMatch = raw.match(/\b(?:remote|hybrid|on[- ]?site|[A-Z][a-z]+,\s?[A-Z]{2})\b/)
    const location = locationMatch?.[0]
  
    return {
      title,
      company,
      location,
      experienceLevel,
      responsibilities,
      hardSkills,
      softSkills,
      rawText: raw
    }
  }
  