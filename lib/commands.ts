export function executeCommand(
  command: string,
  sections: any[],
  currentSection: number,
  onSectionChange: (sectionIndex: number) => void,
): string {
  const cmd = command.toLowerCase().trim()
  const args = cmd.split(" ")
  const mainCommand = args[0]

  switch (mainCommand) {
    case "help":
      return `
Available commands:
- help: Display this help message
- clear: Clear the terminal
- ls: List all available sections
- cd [section]: Navigate to a specific section
- about: Show about section
- skills: Show skills section
- projects: Show projects section
- experience: Show work experience section
- education: Show education section
- contact: Show contact information
      `

    case "clear":
      // This is handled in the Terminal component
      return "Terminal cleared."

    case "ls":
      return sections
        .map((section, index) => {
          const isLocked = index > 0 && index > currentSection + 1
          return `${section.title}${isLocked ? " [LOCKED]" : ""}`
        })
        .join("\n")

    case "cd":
      if (!args[1]) {
        return "Please specify a section to navigate to."
      }

      const sectionArg = args[1].toLowerCase()
      const sectionIndex = sections.findIndex((s) => s.title.toLowerCase().includes(sectionArg))

      if (sectionIndex === -1) {
        return `Section "${args[1]}" not found.`
      }

      const isLocked = sectionIndex > 0 && sectionIndex > currentSection + 1
      if (isLocked) {
        return `Section "${sections[sectionIndex].title}" is locked. Complete previous sections first.`
      }

      onSectionChange(sectionIndex)
      return `Navigating to ${sections[sectionIndex].title}...`

    case "about":
      return navigateToSection("about", sections, currentSection, onSectionChange)

    case "skills":
      return navigateToSection("skills", sections, currentSection, onSectionChange)

    case "projects":
      return navigateToSection("projects", sections, currentSection, onSectionChange)

    case "experience":
      return navigateToSection("experience", sections, currentSection, onSectionChange)

    case "education":
      return navigateToSection("education", sections, currentSection, onSectionChange)

    case "contact":
      return navigateToSection("contact", sections, currentSection, onSectionChange)

    default:
      return `Command not found: ${command}. Type 'help' for available commands.`
  }
}

function navigateToSection(
  sectionName: string,
  sections: any[],
  currentSection: number,
  onSectionChange: (sectionIndex: number) => void,
): string {
  const sectionIndex = sections.findIndex((s) => s.title.toLowerCase().includes(sectionName))

  if (sectionIndex === -1) {
    return `Section "${sectionName}" not found.`
  }

  const isLocked = sectionIndex > 0 && sectionIndex > currentSection + 1
  if (isLocked) {
    return `Section "${sections[sectionIndex].title}" is locked. Complete previous sections first.`
  }

  onSectionChange(sectionIndex)
  return `Navigating to ${sections[sectionIndex].title}...`
}
