import Link from "next/link";
import type { KnowledgeEntryDto } from "@/server/dto/knowledge.dto";
import { TypeBadge } from "./TypeBadge";

export function EntryCard({ entry }: { entry: KnowledgeEntryDto }) {
  return (
    <Link
      href={`/knowledge/${entry.slug}`}
      className="group flex flex-col gap-3 bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-sm hover:border-zinc-300 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors leading-snug">
          {entry.title}
        </h3>
        <TypeBadge type={entry.type} />
      </div>

      {entry.summary && (
        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
          {entry.summary}
        </p>
      )}

      {entry.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {entry.skills.map((skill) => (
            <span
              key={skill.id}
              className="px-2 py-0.5 text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-full"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-zinc-400">
        {new Date(entry.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </Link>
  );
}
