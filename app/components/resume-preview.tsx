import React from "react";

interface ResumeData {
  name: string;
  title: string;
  phone: string;
  email: string;
  summary: string;
  certifications: string[];
  skills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }[];
  projects: {
    name: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export const ResumePreview = ({
  resumeData,
  multiColumnSkills = false,
}: {
  resumeData: ResumeData;
  multiColumnSkills?: boolean;
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-zinc-200 print:p-4 print:shadow-none">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">{resumeData.name}</h1>
        <p className="text-sm text-zinc-600">{resumeData.title}</p>
        <p className="text-sm">{resumeData.phone} • {resumeData.email}</p>
      </header>

      <section className="mb-4">
        <h2 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-2">Summary</h2>
        <p className="text-sm text-zinc-800">{resumeData.summary}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-2">Certifications</h2>
        <ul
          className={`text-sm text-zinc-800 ${
            multiColumnSkills ? "grid grid-cols-1 sm:grid-cols-2 gap-1" : "list-disc list-inside"
          }`}
        >
          {resumeData.certifications.map((cert, idx) => (
            <li key={idx}>{cert}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-2">Skills</h2>
        <ul
          className={`text-sm text-zinc-800 ${
            multiColumnSkills ? "grid grid-cols-2 sm:grid-cols-3 gap-1" : "list-disc list-inside"
          }`}
        >
          {resumeData.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-2">Experience</h2>
        {resumeData.experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-medium text-sm">
              {exp.role} @ {exp.company} ({exp.duration})
            </p>
            <ul className="list-disc list-inside text-sm text-zinc-800">
              {exp.responsibilities.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-2">Projects</h2>
        <div className={multiColumnSkills ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : ""}>
          {resumeData.projects.map((project, idx) => (
            <div key={idx} className="text-sm">
              <p className="font-medium">{project.name}</p>
              <p className="text-zinc-700">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-2">Education</h2>
        {resumeData.education.map((edu, idx) => (
          <div key={idx} className="text-sm text-zinc-800">
            <p className="font-medium">{edu.degree}</p>
            <p>{edu.institution} ({edu.year})</p>
          </div>
        ))}
      </section>
    </div>
  );
};
