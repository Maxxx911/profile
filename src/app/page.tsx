import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";

const experience = [
  {
    role: "Senior Full-Stack Developer",
    company: "Guidepost Global Education · Contract, Remote",
    period: "Dec 2024 – Aug 2026",
    bullets: [
      "Own architecture and full-stack development for a Montessori education platform serving 5,000+ active users across 50+ campuses in the US and Asia",
      "Led migration from legacy React/Ember to modern React, and redesigned the architecture from a tightly-coupled monolith with forked dependencies into a distributed service structure",
      "Designed backend architecture enabling fast interaction across 50+ campuses, supporting the onboarding of 5 new campuses onto the platform",
      "Built APIs and third-party integrations that cut operator/guide interaction time with the platform by ~30%",
      "Replaced legacy Zapier/Power Automate workflows with n8n, reducing monthly automation costs by $2,000+",
      "Built a sync service with Transparent Classroom for student progress tracking, increasing guide engagement by 40%",
      "Developed an AI-powered review system to assess guides' Montessori knowledge, reducing mentors' manual screening workload",
      "Automated guide transfers from third-party platforms, cutting developer time from ~30 hrs/month to 5–6 hrs/month",
      "Built a system enabling non-technical operators to deploy AI-agent-generated applications into an access-restricted environment via a chatbot interface",
    ],
    stack: "Next.js · React · TypeScript · Node.js · Python · FastAPI · Redis · PostgreSQL · Semantic Search · AWS (S3, SNS/SQS, Lambda) · Google ADK · Google GenAI · Prisma · Docker · Apache Airflow · Power BI",
  },
  {
    role: "Full-Stack Developer",
    company: "Sales Pipe Pro · Contract, Remote",
    period: "Mar 2024 – Dec 2024",
    bullets: [
      "Led architecture design and development of a web platform integrating a headless CMS with dynamic page generation, managing the project end-to-end across backend, API integrations, and deployment",
      "Implemented technical SEO architecture, improving search visibility from approximately position 100–150 to position 2–3 for target keywords",
      "Integrated the platform with Odoo and other third-party services, reducing lead loss by 10%",
      "Built an integration between CallTrackingMetrics and Google Ads for marketing attribution",
      "Designed and implemented an AI-powered assistant for customer support operators",
      "Improved an existing early-stage system to production-ready MVP status",
      "Integrated Jira, Slack, and Gmail into the platform workflow",
    ],
    stack: "Next.js · React · TypeScript · Node.js · Python · REST APIs · Google Ads API · CallTrackingMetrics API · Headless CMS · Docker · AI/LLM integrations",
  },
  {
    role: "Full-Stack Developer (React, Django)",
    company: "InventoLabs · Minsk",
    period: "Aug 2023 – Feb 2024",
    bullets: [
      "Built cross-platform features for a large-scale gambling platform with an active user base across web and mobile channels",
      "Designed and implemented new features and application components for a cross-platform mobile product (iOS and Android)",
      "Extended backend API functionality and integrated frontend components with backend services",
      "Enhanced CMS capabilities to support content management for the platform",
      "Maintained and supported existing systems, troubleshooting production issues",
    ],
    stack: "React · JavaScript · Python · Django · Strapi CMS · PostgreSQL · HTML · CSS",
  },
  {
    role: "Full-Stack Developer (React, FastAPI)",
    company: "InventoLabs",
    period: "Mar 2023 – Aug 2023",
    bullets: [
      "Built a data management system tracking and reporting on various operational metrics",
      "Built a closed-circuit network for secure internal data handling",
      "Developed a data management and monitoring system aggregating data across multiple environments",
      "Integrated the system with third-party data services",
    ],
    stack: "Python · FastAPI · React · TypeScript · PostgreSQL · Greenplum · ClickHouse · HTML · CSS",
  },
  {
    role: "Frontend Developer (React)",
    company: "InventoLabs",
    period: "Jul 2022 – Feb 2023",
    bullets: [
      "Developed the UI system structure for automated processing of job vacancies and resumes",
      "Built system elements and components, and integrated with backend APIs",
    ],
    stack: "React · TypeScript · HTML · CSS",
  },
  {
    role: "Frontend Developer (React)",
    company: "InventoLabs",
    period: "Mar 2022 – Jun 2022",
    bullets: [
      "Developed UI elements and components for a skills-accounting system supporting migrants and refugees",
      "Integrated the frontend with backend APIs and third-party services",
    ],
    stack: "React · TypeScript · HTML · CSS",
  },
  {
    role: "Frontend Developer (Vue.js)",
    company: "InventoLabs",
    period: "Apr 2021 – Feb 2022",
    bullets: [
      "Developed the core UI architecture and structure for a government electronic passport system",
      "Built and updated system components and elements as requirements evolved",
    ],
    stack: "Vue.js · MongoDB · HTML · CSS",
  },
  {
    role: "Full-Stack Developer (React, Django REST Framework)",
    company: "InventoLabs",
    period: "Sep 2020 – Apr 2021",
    bullets: [
      "Developed UI elements and components for a telecom operator's data warehouse system",
      "Built and integrated REST APIs connecting the frontend to backend data services",
    ],
    stack: "React · Python · Django REST Framework · PostgreSQL · MongoDB · HTML · CSS",
  },
  {
    role: "Full-Stack Developer (React, Django REST Framework)",
    company: "InventoLabs",
    period: "Feb 2020 – Aug 2020",
    bullets: [
      "Developed AI services for object recognition using TensorFlow and PyTorch",
      "Built web scraping services to extract and process data from external websites",
      "Developed Chrome browser extensions to support the platform's data workflows",
    ],
    stack: "React · Python · TensorFlow · PyTorch · Django REST Framework · HTML · CSS",
  },
  {
    role: "Full-Stack Developer (Ruby on Rails, React)",
    company: "InventoLabs",
    period: "Oct 2019 – Feb 2020",
    bullets: [
      "Extended and customized a Ruby on Rails-based marketplace platform for digital products",
      "Built and integrated API functionality connecting backend services to the React frontend",
    ],
    stack: "Ruby · Ruby on Rails · React · PostgreSQL · HTML · CSS",
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      {/* Hero */}
      <section className="flex flex-col sm:flex-row gap-10 items-start">
        <div className="shrink-0 w-28 h-28 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-300 text-3xl font-bold select-none">
          MS
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Maxim Spasyonov
            </h1>
            <p className="text-lg text-indigo-600 font-medium mt-1">
              Senior Full-Stack Engineer
            </p>
            <p className="text-sm text-zinc-400 mt-0.5">Batumi, Georgia</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-1">
            <a
              href="https://github.com/Maxxx911"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/maxim-spaseonav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://t.me/maxrikal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <TelegramIcon className="w-4 h-4" />
              Telegram
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-zinc-200 my-14" />

      {/* About */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-900 mb-5">About Me</h2>
        <p className="text-zinc-600 leading-relaxed max-w-2xl">
          Senior Full-Stack Engineer with 6+ years of experience designing system
          architecture, building backend services and APIs, and developing modern
          frontend applications for platforms serving thousands of users. Specializes
          in migrating legacy monoliths to distributed service architectures and
          integrating AI/LLM capabilities — semantic search, AI agents, automated
          review systems — into production platforms. Track record of delivering
          measurable business impact through architecture decisions, workflow
          automation, and full-stack ownership from design through deployment.
        </p>
      </section>

      <div className="border-t border-zinc-200 my-14" />

      {/* Experience */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-900 mb-10">Experience</h2>
        <div className="space-y-12">
          {experience.map((job, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                <div>
                  <p className="font-semibold text-zinc-900">{job.role}</p>
                  <p className="text-sm text-zinc-500">{job.company}</p>
                </div>
                <span className="text-sm text-zinc-400 shrink-0">{job.period}</span>
              </div>
              <ul className="space-y-1.5">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 text-sm text-zinc-600 leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-indigo-400" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-400">{job.stack}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-zinc-200 my-14" />

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-900 mb-5">Education</h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <p className="font-medium text-zinc-900">
              Bachelor&apos;s Degree, Computer Science and Software Engineering
            </p>
            <p className="text-sm text-zinc-500">
              Belarusian State University of Informatics and Radioelectronics
            </p>
          </div>
          <span className="text-sm text-zinc-400 shrink-0">2016 – 2020</span>
        </div>
      </section>
    </main>
  );
}
