"use client";

import { useTransition } from "react";
import type { ApplicationStatus } from "@prisma/client";
import { updateStatus } from "../actions";

const STATUSES: ApplicationStatus[] = [
  "APPLIED",
  "HR_SCREENING",
  "TECH_INTERVIEW",
  "TEAM_INTERVIEW",
  "CTO_INTERVIEW",
  "REJECTED",
  "DONE",
];

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  HR_SCREENING: "HR Screening",
  TECH_INTERVIEW: "Tech Interview",
  TEAM_INTERVIEW: "Team Interview",
  CTO_INTERVIEW: "CTO Interview",
  REJECTED: "Rejected",
  DONE: "Done",
};

export function StatusSelect({ id, current }: { id: string; current: ApplicationStatus }) {
  const [pending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value as ApplicationStatus;
    startTransition(() => updateStatus(id, status));
  }

  return (
    <select
      defaultValue={current}
      onChange={handleChange}
      disabled={pending}
      className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
