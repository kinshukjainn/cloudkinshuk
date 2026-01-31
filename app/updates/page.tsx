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
      title: "Currently Nothing Specific",
      author: "Just focusing on hands-on learning",
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
    <div className="min-h-screen pt-10 bg-white antialiased">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-20 sm:mb-24">
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Current Workings
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-4 font-medium">
              My focus and progress in real-time
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Last updated:{" "}
              <span className="text-gray-900">{NOW_CONFIG.lastUpdated}</span> •
              Updated every 2 months
            </p>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {NOW_CONFIG.intro.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              {NOW_CONFIG.intro.description}
            </p>
          </div>
        </header>

        {/* Current Projects */}
        <section className="mb-20">
          <h2 className="text-sm uppercase tracking-widest text-gray-900 font-bold mb-10 border-b border-gray-100 pb-2">
            Current Projects
          </h2>
          <div className="space-y-16">
            {NOW_CONFIG.projects.map((project, index) => {
              return (
                <div key={index} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full w-fit">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-lg text-gray-700 mb-5 leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-sm font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.progress && (
                    <p className="text-sm font-medium text-gray-500">
                      Progress:{" "}
                      <span className="text-gray-900">{project.progress}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Current Learning */}
        <section className="mb-20">
          <h2 className="text-sm uppercase tracking-widest text-gray-900 font-bold mb-10 border-b border-gray-100 pb-2">
            Currently Learning
          </h2>
          <div className="space-y-12">
            {NOW_CONFIG.learning.map((item, index) => {
              return (
                <div key={index}>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    {item.topic}
                  </h3>
                  <p className="text-lg text-gray-700 mb-3 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    Resource:{" "}
                    <span className="text-gray-800">{item.resource}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Current Interests */}
        <section className="mb-20">
          <h2 className="text-sm uppercase tracking-widest text-gray-900 font-bold mb-8 border-b border-gray-100 pb-2">
            Current Interests
          </h2>
          <ul className="space-y-4">
            {NOW_CONFIG.interests.map((interest, index) => (
              <li
                key={index}
                className="text-lg text-gray-900 font-semibold leading-relaxed flex items-start"
              >
                <span className="mr-3 text-gray-900">•</span>
                {interest}
              </li>
            ))}
          </ul>
        </section>

        {/* Currently Consuming */}
        <section className="mb-20">
          <h2 className="text-sm uppercase tracking-widest text-gray-900 font-bold mb-10 border-b border-gray-100 pb-2">
            Reading & Following
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {NOW_CONFIG.consuming.map((item, index) => (
              <div key={index}>
                <p className="text-xs uppercase tracking-wider text-gray-900 underline font-semibold mb-2">
                  {item.type}
                </p>
                <p className="text-lg text-gray-900 font-bold mb-1 tracking-tight">
                  {item.title}
                </p>
                <p className="text-base text-gray-600">{item.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Goals */}
        <section className="mb-20">
          <h2 className="text-sm uppercase tracking-widest text-gray-900 font-bold mb-8 border-b border-gray-100 pb-2">
            Current Goals
          </h2>
          <ul className="space-y-4">
            {NOW_CONFIG.goals.map((goal, index) => (
              <li
                key={index}
                className="text-lg text-gray-900 leading-relaxed flex items-start"
              >
                <span className="mr-3 text-gray-900">•</span>
                {goal}
              </li>
            ))}
          </ul>
        </section>

        {/* Not Doing */}
        {NOW_CONFIG.notDoing && NOW_CONFIG.notDoing.length > 0 && (
          <section className="mb-20  transition-opacity">
            <h2 className="text-sm uppercase tracking-widest text-gray-900 font-bold mb-8 border-b border-gray-100 pb-2">
              Not Doing Right Now
            </h2>
            <p className="text-lg text-gray-900 mb-6 leading-relaxed max-w-2xl">
              Being intentional about what to focus on also means being clear
              about what to avoid.
            </p>
            <ul className="space-y-4">
              {NOW_CONFIG.notDoing.map((item, index) => (
                <li
                  key={index}
                  className="text-lg text-gray-900 italic leading-relaxed flex items-start"
                >
                  <span className="mr-3 text-gray-300 not-italic">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer Note */}
        <footer className="text-center py-12 border-t border-gray-100 mt-12">
          <p className="text-sm text-gray-500 leading-relaxed">
            This page is inspired by the{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 font-semibold underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900 transition-all"
            >
              /now movement
            </a>
            . It&apos;s a living document that changes as my focus shifts.
          </p>
        </footer>
      </div>
    </div>
  );
}
