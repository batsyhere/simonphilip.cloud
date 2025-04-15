import { OpenAI } from "openai";

// Set up OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export const generateTailoredContent = async (
  jobDescription: string,
  profileData: object
) => {
  try {
    const prompt = `
                    Given the following job description and profile data, generate a tailored resume, cover letter, and summary statement. 
                    Return the result in the following JSON format (valid, parsable JSON only — no commentary):

                    {
                      "resume": {
                        "name": "Simon Philip",
                        "title": "Cloud Operations Engineer",
                        "summary": "...",
                        "skills": ["AWS", "Terraform", "CI/CD", "React", "TypeScript"],
                        "experience": [
                          {
                            "role": "Cloud Operations Engineer",
                            "company": "Safe Security",
                            "duration": "2022 - 2024",
                            "responsibilities": [
                              "Led cloud operations, automation, and security initiatives in AWS environments to ensure high availability and efficient deployments.",
                              "Implemented Disaster Recovery Automation using Jenkins to restore customer data within the past 35 days.",
                              "Automated 80% of manual deployment tasks, enabling over 100 stack upgrades per sprint.",
                              "Reduced operational time by 95% through Slack-integrated scripts.",
                              "Migrated code repositories from Bitbucket to GitHub for improved collaboration.",
                              "Led security patching and vulnerability analysis using CrowdStrike and Wiz.",
                              "Supported SecOps in applying AWS security best practices across the organization.",
                              "Maintained 99.99% uptime while driving 20% cost savings through optimization.",
                              "Collaborated with product teams and managed code cherry-picks for releases."
                            ]
                          },
                          "role": "Customer Support Engineer",
                          "company": "Safe Security",
                          "duration": "2021 - 2022",
                          "responsibilities": [
                            "Delivered full-stack feature enhancements and customer support for SAFE, a serverless React application hosted on AWS.",
                            "Integrated new features and design changes in the React-based flagship product.",
                            "Resolved customer issues efficiently, ensuring smooth user experience.",
                            "Maintained daily follow-ups for bug tracking and resolution.",
                            "Owned feature delivery for a serverless web application on AWS infrastructure."
                          ]
                        ],
                        "projects": [
                          {
                            "name": "simonphilip.cloud",
                            "description": "Futuristic portfolio site using AWS S3, CloudFront, Terraform, etc."
                          }
                        ],
                        "certifications": ["AWS Certified Solutions Architect – Associate", "Full Stack Development (upGrad)"],
                        "education": [
                          {
                            "degree": "B.Tech in Computer Science",
                            "institution": "Lovely Professional University",
                            "year": "2016 - 2020"
                          }
                        ]
                      },
                      "coverLetter": "....",
                      "summaryStatement": "...."
                    }

                    Job Description:
                    ${jobDescription}

                    Profile Data:
                    ${JSON.stringify(profileData)}
                    `;


    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
    });

    const tailoredContent = response.choices[0].message.content;

    return tailoredContent;
  } catch (error) {
    console.error("Error generating tailored content:", error);
    throw new Error("Failed to generate tailored content.");
  }
};
