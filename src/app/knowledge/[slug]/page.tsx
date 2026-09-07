import { notFound } from "next/navigation";
import Link from "next/link";
import { knowledgeComposition } from "@/server/container";
import { TypeBadge } from "@/components/knowledge/TypeBadge";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const entry = await knowledgeComposition.getBySlug(slug);
    return { title: entry.title, description: entry.summary ?? undefined };
  } catch {
    return {};
  }
}

export default async function EntryPage({ params }: Props) {
  const { slug } = await params;

  let entry;
  try {
    entry = await knowledgeComposition.getBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-10">
        <Link href="/knowledge" className="hover:text-zinc-600 transition-colors">
          Knowledge
        </Link>
        <span>/</span>
        <span className="text-zinc-600 truncate">{entry.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <TypeBadge type={entry.type} />
          <span className="text-sm text-zinc-400">
            {new Date(entry.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight leading-snug mb-4">
          {entry.title}
        </h1>

        {entry.summary && (
          <p className="text-lg text-zinc-500 leading-relaxed">{entry.summary}</p>
        )}

        {entry.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {entry.skills.map((skill) => (
              <Link
                key={skill.id}
                href={`/knowledge?skill=${skill.id}`}
                className="px-3 py-1 text-sm text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full hover:bg-indigo-100 transition-colors"
              >
                {skill.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="border-t border-zinc-200 mb-10" />

      {/* Content */}
      <article className="text-zinc-700 leading-relaxed space-y-5">
        {entry.content.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
