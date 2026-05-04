"use client";

import { FaCode, FaAws, FaRocket } from "react-icons/fa6";

const NOW_CONFIG = {
  lastUpdated: "January 2026",

  intro: {
    title: "What I'm Focused On Right Now",
    description:
      "A snapshot of my current activities, projects, and learning journey. This page follows the /now movement started by Derek Sivers—a simple way to share what I'm actively working on today, not my full biography.",
  },

  projects: [
    {
      title: "AI-Powered Fault Detection System",
      status: "In Development",
      description:
        "Building an intelligent system to identify and analyze faults in power transmission infrastructure using AWS Bedrock and Nova Pro models.",
      technologies: ["Next.js 16", "AWS Bedrock", "TypeScript"],
      icon: FaRocket,
      progress: "70%",
    },
    {
      title: "Automation Tools for Cloud Infrastructure",
      status: "Learning",
      description:
        "Deepening my understanding of Terraform and Kubernetes for scalable cloud infrastructure deployment and management.",
      technologies: ["Terraform", "Kubernetes"],
      icon: FaCode,
      progress: "Completing",
    },
  ],

  learning: [
    {
      topic: "AWS Cloud Practitioner Certification",
      description:
        "Re-attempting the CLF-02 exam. Focused on mastering core AWS services, pricing models, and cloud architecture best practices.",
      resource: "AWS official documentation & practice exams",
      icon: FaAws,
    },
    {
      topic: "AWS Cloud Developer Associate Certification",
      description:
        "Preparing for the DVA-C02 exam. Concentrating on developing, deploying, and debugging cloud-based applications using AWS services.",
      resource: "AWS official study guides & hands-on labs",
      icon: FaAws,
    },
  ],

  interests: [
    "Cloud security and IAM best practices",
    "Serverless Infrastructure and architecture",
    "DevOps automation and CI/CD pipelines",
    "Technical writing and knowledge sharing",
  ],

  consuming: [
    {
      type: "Reading",
      title: "Related to AWS Certifications",
      author: "AWS",
    },
    {
      type: "Following",
      title: "Google IO 2026 and AWS re:Invent 2026",
      author:
        "Just keeping an eye on the latest announcements and trends in cloud computing",
    },
  ],

  goals: [
    "Complete AWS Cloud Practitioner certification by Q1 2026",
    "Launch the Fault Detection System MVP",
    "Contribute to open-source infrastructure tools",
    "Write 2 technical blog posts per month",
  ],

  notDoing: [
    "Taking on freelance projects (focusing on learning/building/certifications)",
    "Learning new programming languages outside my current stack",
    "Attending non-essential meetups or conferences",
  ],
};

export default function CurrentWorkings() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#333333]  selection:bg-[#006600] selection:text-white pb-16">
      {/* Top Green Bar */}
      <div className="h-2 w-full bg-[#252525]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Header Block */}
        <header className="mb-10  p-5 sm:p-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center">
            <span className="w-3 h-6 bg-green-500 mr-3 inline-block"></span>
            Current Workings
          </h1>
          <p className="text-[15px] font-bold text-white/80 mb-4">
            My focus and progress in real-time
          </p>
          <div className="text-[13px]  text-white inline-block px-2 py-1 mb-6">
            <strong>Last updated:</strong> {NOW_CONFIG.lastUpdated} |{" "}
            <strong>Cycle:</strong> Every 2 months
          </div>

          <div className="border-t border-[#cccccc] pt-4">
            <h2 className="text-[16px] font-bold text-white  mb-2">
              {NOW_CONFIG.intro.title}
            </h2>
            <p className="text-[14px] text-gray-300 leading-relaxed border-l-2 border-[#cccccc] pl-3">
              {NOW_CONFIG.intro.description}
            </p>
          </div>
        </header>

        <div className="space-y-10">
          {/* 1. Current Projects */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 pb-1 flex items-center gap-2">
              <span className="w-2 h-4 bg-green-500 mr-2 inline-block"></span>
              1. Active Projects
            </h2>

            <div className="space-y-4">
              {NOW_CONFIG.projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <div
                    key={index}
                    className="border-2 border-[#444444] bg-[#252525] rounded-md p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 ">
                      <h3 className="text-[16px] font-bold text-green-500 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-green-500" />
                        {project.title}
                      </h3>
                      <span className="text-[12px]  font-semibold text-black rounded-sm bg-[#ff9100]  px-2 py-1 whitespace-nowrap">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-[14px] mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <table className="w-full text-left text-[13px] pt-2">
                      <tbody>
                        <tr>
                          <th className="py-1 pr-4 font-bold text-white align-top w-24">
                            Stack:
                          </th>
                          <td className="py-1 text-white  flex flex-wrap gap-1">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="bg-[#181818] rounded-sm px-1 py-1"
                              >
                                {tech}
                              </span>
                            ))}
                          </td>
                        </tr>
                        {project.progress && (
                          <tr>
                            <th className="py-1 pr-4 font-bold text-white align-top">
                              Progress:
                            </th>
                            <td className="py-1  font-bold text-white">
                              {project.progress}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 2. Currently Learning */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4  pb-1 flex items-center gap-2">
              <span className="w-2 h-4 bg-green-500 mr-2 inline-block"></span>
              2. Currently Learning
            </h2>

            <div className="space-y-4">
              {NOW_CONFIG.learning.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="border-2 rounded-md border-[#444444] bg-[#252525] p-4"
                  >
                    <h3 className="text-[16px] font-bold text-green-500 mb-2 flex items-center gap-2  pb-2">
                      <Icon className="w-4 h-4 text-green-500" />
                      {item.topic}
                    </h3>
                    <p className="text-gray-300 text-[14px] mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[12px]  text-blue-300  px-2 py-1  inline-block">
                      <strong>Source:</strong> {item.resource}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. Interests & Goals Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-4  pb-1 flex items-center gap-2">
                <span className="w-2 h-4 bg-green-500 mr-2 inline-block"></span>
                3. Key Interests
              </h2>
              <ul className="space-y-2 border-2 border-[#444444] bg-[#252525] rounded-md p-4">
                {NOW_CONFIG.interests.map((interest, index) => (
                  <li
                    key={index}
                    className="text-gray-200 text-[14px] flex items-start"
                  >
                    <span className="text-green-500 mr-2 font-bold leading-tight">
                      ■
                    </span>
                    {interest}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4  pb-1 flex items-center gap-2">
                <span className="w-2 h-4 bg-green-500 mr-2 inline-block"></span>
                4. Current Goals
              </h2>
              <ul className="space-y-2 border-2 rounded-md border-[#444444] bg-[#252525] p-4">
                {NOW_CONFIG.goals.map((goal, index) => (
                  <li
                    key={index}
                    className="text-gray-200 text-[14px] flex items-start"
                  >
                    <span className="text-green-500 mr-2 font-bold leading-tight">
                      ■
                    </span>
                    {goal}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 5. Reading & Following */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4  pb-1 flex items-center gap-2">
              <span className="w-2 h-4 bg-green-500 mr-2 inline-block"></span>
              5. Reading & Following
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {NOW_CONFIG.consuming.map((item, index) => (
                <div
                  key={index}
                  className="border-2 rounded-md border-[#444444] bg-[#252525] p-4"
                >
                  <div className="text-[12px]  text-white uppercase font-semibold tracking-wider mb-2 pb-1">
                    {item.type}
                  </div>
                  <div className="text-gray-200 font-bold text-[15px] mb-1">
                    {item.title}
                  </div>
                  <div className="text-[13px] text-[#ff9100] font-bold italic">
                    {item.author}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Not Doing */}
          {NOW_CONFIG.notDoing && NOW_CONFIG.notDoing.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4  pb-1 flex items-center gap-2">
                <span className="w-2 h-4 bg-green-500 mr-2 inline-block"></span>
                6. Not Doing Right Now
              </h2>
              <div className="border-2 rounded-md border-[#444444] bg-[#252525] p-4">
                <p className="text-[13px] text-gray-300 mb-3 italic">
                  Being intentional about focus means being clear about what to
                  avoid.
                </p>
                <ul className="space-y-2">
                  {NOW_CONFIG.notDoing.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-200 text-[14px] flex items-start"
                    >
                      <span className="text-white mr-2  font-bold">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Footer Note */}
        <footer className="mt-12 pt-6 border-t border-[#cccccc]">
          <p className="text-[12px] text-white">
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline  transition-none"
            >
              /now movement
            </a>
            . It is a living document that changes as my focus shifts. EOF.
          </p>
        </footer>
      </div>
    </div>
  );
}
