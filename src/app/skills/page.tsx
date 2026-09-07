const skillGroups = [
  {
    category: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Vue.js", "Redux", "HTML / CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "Django", "Django REST Framework", "FastAPI", "Ruby on Rails"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Greenplum", "ClickHouse"],
  },
  {
    category: "Cloud & Infra",
    skills: ["AWS S3", "AWS SNS/SQS", "AWS Lambda", "Docker", "Docker Compose"],
  },
  {
    category: "AI & Data",
    skills: ["LLM / GenAI", "Semantic Search", "AI Agents", "TensorFlow", "PyTorch", "Apache Airflow", "Power BI"],
  },
  {
    category: "Tools & Integrations",
    skills: ["System Architecture", "Microservices", "REST APIs", "WebSockets", "Prisma", "n8n"],
  },
];

export default function Skills() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Skills</h1>
        <p className="text-zinc-500 mt-2">Technologies and tools I work with</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map(({ category, skills }) => (
          <div
            key={category}
            className="bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-sm transition-shadow"
          >
            <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-4">
              {category}
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
