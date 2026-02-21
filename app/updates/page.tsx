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
    <div className="min-h-screen pt-16 md:pt-24 bg-[#313131] text-gray-200  selection:bg-green-500 selection:text-black">
      <div className="max-w-4xl pt-10 mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Block */}
        <header className="mb-12 border-b border-[#444] pb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
            Current Workings
          </h1>
          <p className="text-lg text-gray-300 font-medium mb-6">
            My focus and progress in real-time
          </p>
          <div className="text-sm font-mono text-gray-100 inline-block px-3 py-1.5 rounded-sm">
            Last updated:{" "}
            <span className="text-green-300">{NOW_CONFIG.lastUpdated}</span> |
            Cycle: Every 2 months
          </div>

          <div className="mt-8 max-w-3xl">
            <h2 className="text-xl font-semibold text-white mb-3">
              {NOW_CONFIG.intro.title}
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              {NOW_CONFIG.intro.description}
            </p>
          </div>
        </header>

        <div className="space-y-16">
          {/* 1. Current Projects */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
              <span className="text-green-500 font-mono text-lg">1.</span>{" "}
              Active Projects
            </h2>

            <div className="space-y-8">
              {NOW_CONFIG.projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <div
                    key={index}
                    className="pl-4 border-l-2 border-[#444] hover:border-green-500 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Icon className="text-green-500 w-4 h-4" />
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono font-medium text-black bg-green-500 px-2 py-0.5 rounded-sm w-fit">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed max-w-2xl">
                      {project.description}
                    </p>

                    <dl className="grid sm:grid-cols-[120px_1fr] gap-x-4 gap-y-2 text-sm">
                      <dt className="text-gray-500 font-mono">Stack:</dt>
                      <dd className="text-gray-300 flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-[#282828] border border-[#555] px-2 py-0.5 rounded-sm text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </dd>

                      {project.progress && (
                        <>
                          <dt className="text-gray-500 font-mono">Progress:</dt>
                          <dd className="text-green-400 font-medium">
                            {project.progress}
                          </dd>
                        </>
                      )}
                    </dl>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 2. Currently Learning */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
              <span className="text-green-500 font-mono text-lg">2.</span>{" "}
              Currently Learning
            </h2>

            <div className="space-y-8">
              {NOW_CONFIG.learning.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="pl-4 border-l-2 border-[#444] hover:border-green-500 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Icon className="text-green-500 w-4 h-4" />
                      {item.topic}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-3 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                    <div className="text-sm font-mono text-gray-400">
                      &gt; Source:{" "}
                      <span className="text-gray-300 font-sans">
                        {item.resource}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. Interests & Goals Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
                <span className="text-green-500 font-mono text-lg">3.</span> Key
                Interests
              </h2>
              <ul className="space-y-3">
                {NOW_CONFIG.interests.map((interest, index) => (
                  <li
                    key={index}
                    className="text-gray-300 text-sm sm:text-base flex items-start"
                  >
                    <span className="text-green-500 mr-3 mt-1 text-xs">■</span>
                    {interest}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
                <span className="text-green-500 font-mono text-lg">4.</span>{" "}
                Current Goals
              </h2>
              <ul className="space-y-3">
                {NOW_CONFIG.goals.map((goal, index) => (
                  <li
                    key={index}
                    className="text-gray-300 text-sm sm:text-base flex items-start"
                  >
                    <span className="text-green-500 mr-3 mt-1 text-xs">■</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 5. Reading & Following */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6 border-b border-[#444] pb-2 flex items-center gap-2">
              <span className="text-green-500 font-mono text-lg">5.</span>{" "}
              Reading & Following
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 bg-[#282828] border border-[#444] p-6 rounded-sm">
              {NOW_CONFIG.consuming.map((item, index) => (
                <div key={index}>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                    [{item.type}]
                  </div>
                  <div className="text-white font-medium mb-1">
                    {item.title}
                  </div>
                  <div className="text-sm text-green-400">{item.author}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Not Doing */}
          {NOW_CONFIG.notDoing && NOW_CONFIG.notDoing.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-b border-[#444] pb-2 flex items-center gap-2">
                <span className="text-gray-500 font-mono text-lg">6.</span> Not
                Doing Right Now
              </h2>
              <p className="text-sm text-gray-400 mb-6 italic">
                Being intentional about focus means being clear about what to
                avoid.
              </p>
              <ul className="space-y-3">
                {NOW_CONFIG.notDoing.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-400 text-sm sm:text-base flex items-start"
                  >
                    <span className="text-gray-600 mr-3 mt-0.5 font-mono">
                      -
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Footer Note */}
        <footer className="mt-20 pt-8 border-t border-[#444]">
          <p className="text-sm text-gray-500 leading-relaxed font-mono">
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white underline underline-offset-4 transition-colors"
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
