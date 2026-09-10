import type { ApplicationStatus } from "@prisma/client";

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  HR_SCREENING: "HR Screening",
  TECH_INTERVIEW: "Tech Interview",
  TEAM_INTERVIEW: "Team Interview",
  CTO_INTERVIEW: "CTO Interview",
  REJECTED: "Rejected",
  DONE: "Done",
};

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  APPLIED: "bg-blue-100 text-blue-700",
  HR_SCREENING: "bg-violet-100 text-violet-700",
  TECH_INTERVIEW: "bg-amber-100 text-amber-700",
  TEAM_INTERVIEW: "bg-orange-100 text-orange-700",
  CTO_INTERVIEW: "bg-indigo-100 text-indigo-700",
  REJECTED: "bg-red-100 text-red-600",
  DONE: "bg-green-100 text-green-700",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
