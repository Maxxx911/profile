import Link from "next/link";
import type { JobApplicationDto } from "@/server/dto/job-application.dto";
import { StatusBadge } from "./StatusBadge";

export function ApplicationCard({ app }: { app: JobApplicationDto }) {
  return (
    <Link
      href={`/applications/${app.id}`}
      className="block p-5 bg-white rounded-xl border border-zinc-200 hover:border-indigo-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <p className="text-xs text-zinc-400 mb-0.5">{app.company}</p>
          <h3 className="text-sm font-semibold text-zinc-900 truncate">{app.title}</h3>
        </div>
        <StatusBadge status={app.status} />
      </div>
      <p className="text-xs text-zinc-400">
        {new Date(app.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </Link>
  );
}
