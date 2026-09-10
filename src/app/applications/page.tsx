import { jobApplicationComposition } from "@/server/container";
import { ApplicationCard } from "./_components/ApplicationCard";
import { AddApplicationModal } from "./_components/AddApplicationModal";
import type { ApplicationStatus } from "@prisma/client";

type SearchParams = Promise<{ status?: string }>;

const STATUSES: { value: ApplicationStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "APPLIED", label: "Applied" },
  { value: "HR_SCREENING", label: "HR" },
  { value: "TECH_INTERVIEW", label: "Tech" },
  { value: "TEAM_INTERVIEW", label: "Team" },
  { value: "CTO_INTERVIEW", label: "CTO" },
  { value: "REJECTED", label: "Rejected" },
  { value: "DONE", label: "Done" },
];

const VALID_STATUSES = new Set<string>(["APPLIED", "HR_SCREENING", "TECH_INTERVIEW", "TEAM_INTERVIEW", "CTO_INTERVIEW", "REJECTED", "DONE"]);

export default async function ApplicationsPage({ searchParams }: { searchParams: SearchParams }) {
  const { status } = await searchParams;
  const activeStatus = status && VALID_STATUSES.has(status) ? (status as ApplicationStatus) : undefined;

  const apps = await jobApplicationComposition.getAll(activeStatus);

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Job Applications</h1>
          <p className="text-zinc-500 mt-2">{apps.length} application{apps.length !== 1 ? "s" : ""}</p>
        </div>
        <AddApplicationModal />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {STATUSES.map(({ value, label }) => (
          <a
            key={value}
            href={value === "ALL" ? "/applications" : `/applications?status=${value}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              (value === "ALL" && !activeStatus) || value === activeStatus
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {apps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-zinc-400 text-lg">No applications yet</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {apps.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </main>
  );
}
