import { Suspense } from "react";
import { knowledgeComposition, skillComposition } from "@/server/container";
import { EntryCard } from "@/components/knowledge/EntryCard";
import { EntryFilter } from "@/components/knowledge/EntryFilter";
import type { EntryType } from "@prisma/client";

type SearchParams = Promise<{ type?: string; skill?: string }>;

export default async function KnowledgePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { type, skill } = await searchParams;

  const [entries, skills] = await Promise.all([
    knowledgeComposition.getAll(),
    skillComposition.getAll(),
  ]);

  const filtered = entries.filter((entry) => {
    if (type && type !== "ALL" && entry.type !== (type as EntryType)) return false;
    if (skill && !entry.skills.some((s) => s.id === skill)) return false;
    return true;
  });

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Knowledge Base</h1>
        <p className="text-zinc-500 mt-2">Articles, examples and explanations from my experience</p>
      </div>

      <Suspense>
        <div className="mb-8">
          <EntryFilter skills={skills} />
        </div>
      </Suspense>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-zinc-400 text-lg">No entries yet</p>
          <p className="text-zinc-300 text-sm mt-1">Knowledge base is being built</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </main>
  );
}
