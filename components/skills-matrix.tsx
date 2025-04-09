"use client"

import { motion } from "framer-motion"

const skillCategories = [
  {
    name: "Cloud Platforms",
    skills: [
      { name: "AWS", level: 90 },
      { name: "Azure", level: 75 },
      { name: "GCP", level: 65 },
    ],
  },
  {
    name: "Infrastructure as Code",
    skills: [
      { name: "Terraform", level: 85 },
      { name: "CloudFormation", level: 80 },
      { name: "Ansible", level: 75 },
      { name: "Pulumi", level: 70 },
    ],
  },
  {
    name: "Containerization & Orchestration",
    skills: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 85 },
      { name: "Helm", level: 80 },
      { name: "Docker Swarm", level: 70 },
    ],
  },
  {
    name: "CI/CD & Automation",
    skills: [
      { name: "Jenkins", level: 85 },
      { name: "GitHub Actions", level: 90 },
      { name: "GitLab CI", level: 80 },
      { name: "ArgoCD", level: 75 },
    ],
  },
  {
    name: "Monitoring & Logging",
    skills: [
      { name: "Prometheus", level: 85 },
      { name: "Grafana", level: 85 },
      { name: "ELK Stack", level: 80 },
      { name: "Datadog", level: 75 },
    ],
  },
]

export default function SkillsMatrix() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + categoryIndex * 0.1 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">{category.name}</h3>
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.4 + skillIndex * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
