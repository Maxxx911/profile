"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { SkillDto } from "@/server/dto/skill.dto";
import type { EntryType } from "@prisma/client";

const TYPES: { value: EntryType | "ALL"; label: string }[] = [
  { value: "ALL",         label: "All" },
  { value: "ARTICLE",     label: "Articles" },
  { value: "EXAMPLE",     label: "Examples" },
  { value: "EXPLANATION", label: "Explanations" },
  { value: "NOTE",        label: "Notes" },
];

export function EntryFilter({ skills }: { skills: SkillDto[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const activeType = params.get("type") ?? "ALL";
  const activeSkill = params.get("skill") ?? "";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "ALL") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Type filter */}
      <div className="flex flex-wrap gap-2">
        {TYPES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => update("type", value)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              activeType === value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Skill filter */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update("skill", "")}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              !activeSkill
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            All skills
          </button>
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => update("skill", skill.id)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                activeSkill === skill.id
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {skill.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
